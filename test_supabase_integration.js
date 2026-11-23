// test_supabase_integration.js
// Automated Deep Verification Test Suite for Supabase Authentication, Database, and Storage Integration

const assert = require('assert');
const fs = require('fs');

console.log('=== RUNNING SUPABASE INTEGRATION DEEP TEST SUITE ===\n');

// -------------------------------------------------------------
// SETUP DOM STUBS & ENVIRONMENT
// -------------------------------------------------------------
const localStore = {};
global.localStorage = {
  getItem: (k) => (k in localStore ? localStore[k] : null),
  setItem: (k, v) => { localStore[k] = String(v); },
  removeItem: (k) => { delete localStore[k]; },
  clear: () => { Object.keys(localStore).forEach(k => delete localStore[k]); }
};

// Global DOM mocks
global.window = global;
global.window.localStorage = global.localStorage;
global.window.addEventListener = () => {};
global.window.location = { hash: '#/dashboard', href: 'index.html#/dashboard' };
global.document = {
  addEventListener: () => {},
  removeEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: (id) => null,
  documentElement: { classList: { add: () => {}, remove: () => {} } },
  body: { style: {}, classList: { add: () => {}, remove: () => {} } }
};
global.navigator = { clipboard: { writeText: async () => {} } };

// Mock Toast
global.showToast = () => {};
global.navigateTo = () => {};

// Read Core Files
const indexHtml = fs.readFileSync('./index.html', 'utf8');
const signinHtml = fs.readFileSync('./signin.html', 'utf8');
const loginHtml = fs.readFileSync('./login.html', 'utf8');
const schemaSql = fs.readFileSync('./supabase_schema.sql', 'utf8');

// Load Supabase Client Module
const LabSupabase = require('./js/supabase-client.js');
global.LabSupabase = LabSupabase;

// Load App.js
require('./js/app.js');

// -------------------------------------------------------------
// SUITE 1: SQL SCHEMA VALIDATION & INTEGRITY
// -------------------------------------------------------------
console.log('[Suite 1] SQL Schema Validation & Table Architecture:');

// 1. Verify schema file exists and defines all 7 required tables
const expectedTables = [
  'public.customers',
  'public.intake_batches',
  'public.piece_custody_records',
  'public.bills',
  'public.delivery_records',
  'public.lab_settings',
  'public.user_profiles'
];

expectedTables.forEach(table => {
  const tableRegex = new RegExp(`create table if not exists ${table.replace('.', '\\.')}`, 'i');
  assert.strictEqual(tableRegex.test(schemaSql), true, `FAIL: Table ${table} not declared in supabase_schema.sql`);
  console.log(`  ✓ Table ${table} definition verified.`);
});

// 2. Verify Row-Level Security (RLS) is enabled on all tables
expectedTables.forEach(table => {
  const rlsRegex = new RegExp(`alter table ${table.replace('.', '\\.')} enable row level security`, 'i');
  assert.strictEqual(rlsRegex.test(schemaSql), true, `FAIL: RLS not enabled on table ${table}`);
});
console.log('  ✓ Row-Level Security (RLS) enabled across all tables.');

// 3. Verify Supabase Storage buckets creation
assert.strictEqual(schemaSql.includes("'article-photos'"), true, 'FAIL: article-photos bucket missing');
assert.strictEqual(schemaSql.includes("'custody-photos'"), true, 'FAIL: custody-photos bucket missing');
assert.strictEqual(schemaSql.includes("'dossiers'"), true, 'FAIL: dossiers bucket missing');
console.log('  ✓ Supabase Storage buckets (article-photos, custody-photos, dossiers) verified.');

// 4. Verify triggers for automatic updated_at timestamps
assert.strictEqual(schemaSql.includes('update_modified_column()'), true, 'FAIL: update_modified_column function missing');
assert.strictEqual(schemaSql.includes('handle_new_user()'), true, 'FAIL: handle_new_user trigger function missing');
assert.strictEqual(schemaSql.includes('unq_delivery_job unique (job_docket)'), true, 'FAIL: unq_delivery_job unique constraint missing on delivery_records');
assert.strictEqual(schemaSql.includes("coalesce(new.raw_user_meta_data->>'phone', '')"), true, 'FAIL: phone metadata handling missing in handle_new_user');
console.log('  ✓ Automatic updated_at triggers, phone metadata hook, and unq_delivery_job constraint verified.\n');

// -------------------------------------------------------------
// SUITE 2: CLIENT CONFIGURATION & LIFECYCLE
// -------------------------------------------------------------
console.log('[Suite 2] Supabase Client Configuration & State Lifecycle:');

// 1. Initial offline state when unconfigured
LabSupabase.saveConfig('', '');
assert.strictEqual(LabSupabase.isConfigured(), false, 'FAIL: Should report unconfigured when keys are empty');
assert.strictEqual(LabSupabase.config.status, 'offline', 'FAIL: Default status should be offline');
console.log('  ✓ Unconfigured state correctly identifies offline mode.');

// 2. Mock Supabase Client Provider for tests
function createMockSupabaseClient() {
  const database = {
    customers: [],
    intake_batches: [],
    piece_custody_records: [],
    bills: [],
    delivery_records: [],
    lab_settings: [],
    user_profiles: []
  };

  const storageBuckets = {
    'custody-photos': {},
    'article-photos': {},
    'dossiers': {}
  };

  let mockUser = null;

  return {
    _db: database,
    _storage: storageBuckets,
    auth: {
      getSession: async () => ({ data: { session: mockUser ? { user: mockUser } : null }, error: null }),
      signInWithPassword: async ({ email, password }) => {
        if (password === 'WrongPass') {
          return { data: null, error: new Error('Invalid login credentials') };
        }
        mockUser = {
          id: 'usr-mock-' + Date.now(),
          email: email,
          user_metadata: {
            full_name: email.split('@')[0],
            role: email.includes('admin') ? 'Admin' : 'Assay Master'
          }
        };
        return { data: { user: mockUser, session: { access_token: 'mock-jwt-token' } }, error: null };
      },
      signUp: async ({ email, password, options }) => {
        mockUser = {
          id: 'usr-mock-' + Date.now(),
          email: email,
          user_metadata: options.data || { role: 'Quality Auditor' }
        };
        return { data: { user: mockUser }, error: null };
      },
      signOut: async () => {
        mockUser = null;
        return { error: null };
      },
      signInWithOAuth: async ({ provider }) => ({ data: { provider, url: 'https://accounts.google.com/o/oauth2/auth' }, error: null }),
      updateUser: async ({ data }) => {
        if (mockUser) {
          mockUser.user_metadata = Object.assign(mockUser.user_metadata || {}, data);
        }
        return { data: { user: mockUser }, error: null };
      },
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    },
    from: (tableName) => ({
      select: (cols, opts) => {
        const queryPromise = Promise.resolve({
          data: database[tableName] || [],
          count: (database[tableName] || []).length,
          error: null
        });
        queryPromise.limit = async (n) => ({
          data: (database[tableName] || []).slice(0, n),
          error: null
        });
        return queryPromise;
      },
      upsert: async (records, opts) => {
        const rows = Array.isArray(records) ? records : [records];
        if (!database[tableName]) database[tableName] = [];
        rows.forEach(r => {
          const keyField = tableName === 'intake_batches' ? 'job_docket' : (tableName === 'bills' ? 'bill_no' : (tableName === 'delivery_records' ? 'job_docket' : 'id'));
          const existingIdx = database[tableName].findIndex(x => {
            if (tableName === 'piece_custody_records') {
              return x.job_docket === r.job_docket && x.piece_index === r.piece_index;
            }
            return x[keyField] === r[keyField];
          });
          if (existingIdx >= 0) database[tableName][existingIdx] = Object.assign({}, database[tableName][existingIdx], r);
          else database[tableName].push(r);
        });
        return { data: rows, error: null };
      },
      update: (fields) => ({
        eq: async (col, val) => {
          if (database[tableName]) {
            database[tableName].forEach(r => {
              if (r[col] === val) Object.assign(r, fields);
            });
          }
          return { data: fields, error: null };
        }
      })
    }),
    storage: {
      from: (bucket) => ({
        upload: async (path, body, opts) => {
          if (!storageBuckets[bucket]) storageBuckets[bucket] = {};
          storageBuckets[bucket][path] = body;
          return { data: { path }, error: null };
        },
        getPublicUrl: (path) => ({
          data: { publicUrl: `https://mock-supabase.co/storage/v1/object/public/${bucket}/${path}` }
        })
      })
    }
  };
}

const mockClient = createMockSupabaseClient();
LabSupabase.init(mockClient);
assert.strictEqual(LabSupabase.config.status, 'connected', 'FAIL: Custom client initialization should set status to connected');
console.log('  ✓ Custom Supabase Client successfully initialized and connected.\n');

// -------------------------------------------------------------
// SUITE 3: SUPABASE AUTHENTICATION & ROLE-BASED ACCESS
// -------------------------------------------------------------
console.log('[Suite 3] Supabase Authentication & Role-Based Access:');

(async () => {
  // 1. Sign Up new staff with laboratory role
  const signupRes = await LabSupabase.signUp('vikram.anand@ssrhallmark.com', 'SecurePass123', {
    fullName: 'Vikram Anand',
    role: 'Assay Master'
  });
  assert.strictEqual(signupRes.success, true, 'FAIL: Sign up should succeed');
  assert.strictEqual(LabSupabase.getCurrentRole(), 'Assay Master', 'FAIL: Role should be Assay Master');
  assert.strictEqual(localStorage.getItem('ssr_authenticated'), 'true', 'FAIL: ssr_authenticated flag missing');
  console.log('  ✓ Supabase staff registration and role assignment verified (Assay Master).');

  // 2. Role switching
  await LabSupabase.switchRole('Quality Auditor');
  assert.strictEqual(LabSupabase.getCurrentRole(), 'Quality Auditor', 'FAIL: Role should be switched to Quality Auditor');
  assert.strictEqual(localStorage.getItem('supabase_active_role'), 'Quality Auditor', 'FAIL: Active role should persist');
  console.log('  ✓ Role switcher dynamically updates authorization to Quality Auditor.');

  // 3. Rejection of invalid roles
  let caughtRoleErr = false;
  try {
    await LabSupabase.switchRole('SuperHackerRole');
  } catch (e) {
    caughtRoleErr = true;
  }
  assert.strictEqual(caughtRoleErr, true, 'FAIL: Invalid role should be rejected');
  console.log('  ✓ Invalid roles strictly rejected by security constraint.');

  // 4. Sign Out
  await LabSupabase.signOut();
  assert.strictEqual(LabSupabase.getCurrentUser(), null, 'FAIL: Current user should be cleared on sign out');
  assert.strictEqual(localStorage.getItem('ssr_authenticated'), null, 'FAIL: Auth token should be cleared');
  console.log('  ✓ Supabase Sign-Out tears down session and clears local tokens.');

  // 5. Sign In with password
  const signinRes = await LabSupabase.signIn('sarah.jenkins@ssrhallmark.com', 'LaboratoryPass#2025');
  assert.strictEqual(signinRes.success, true, 'FAIL: Sign-in should succeed');
  assert.strictEqual(LabSupabase.getCurrentUser().email, 'sarah.jenkins@ssrhallmark.com');
  console.log('  ✓ Supabase Sign-In establishes session for Sarah Jenkins.');

  // 6. Supabase OAuth provider verification
  const oauthRes = await LabSupabase.signInWithOAuth('google');
  assert.strictEqual(oauthRes.data.provider, 'google', 'FAIL: OAuth provider should be google');
  console.log('  ✓ Supabase OAuth flow verified for external providers.\n');

  // -------------------------------------------------------------
  // SUITE 4: DATABASE SYNCHRONIZATION ENGINE
  // -------------------------------------------------------------
  console.log('[Suite 4] Database Synchronization Engine (PostgreSQL Upsert):');

  // 1. Sync Customer
  const testCust = {
    id: 'CUST-999',
    name: 'TEST MAHALAXMI GOLDSMITHS',
    code: 'MLX-BOM',
    address: '42 Bullion Lane',
    region: 'Mumbai',
    bis: 'BIS-MH-2026-9999',
    gst: '27AAATM9999A1Z1',
    activeJobs: 5
  };
  const custRes = await LabSupabase.syncCustomer(testCust);
  assert.strictEqual(custRes.success, true, 'FAIL: Customer sync failed');
  assert.strictEqual(mockClient._db.customers.length, 1, 'FAIL: Customer should be saved in DB');
  console.log('  ✓ Customer record successfully synchronized to Supabase PostgreSQL.');

  // 2. Sync Intake Batch with 4-stage visual custody pieces
  const testBatch = {
    jobDocket: 'JOB-2026-SUPA1',
    receiptNo: 'REC-901',
    customer: 'TEST MAHALAXMI GOLDSMITHS',
    pcs: 2,
    metal: 'Gold',
    purity: '22K 916',
    netWt: 24.500,
    grossWt: 24.600,
    status: 'IN_PROCESS',
    visualCustody: [
      {
        pieceIndex: 1,
        hsnArticle: 'RING',
        grossWt: 12.300,
        netWt: 12.250,
        tagCode: 'JOB-2026-SUPA1-P01',
        stageA: { captured: true, timestamp: '10:00 AM', operator: 'Sarah Jenkins', photoUrl: 'data:image/jpeg;base64,mockA' },
        stageB: { captured: true, timestamp: '10:20 AM', matchScore: 98, status: 'MATCHED' },
        stageC: {},
        stageD: {},
        status: 'STAGE_B_VERIFIED'
      },
      {
        pieceIndex: 2,
        hsnArticle: 'BRACELET',
        grossWt: 12.300,
        netWt: 12.250,
        tagCode: 'JOB-2026-SUPA1-P02',
        stageA: { captured: true, timestamp: '10:00 AM', operator: 'Sarah Jenkins', photoUrl: 'data:image/jpeg;base64,mockB' },
        stageB: {},
        stageC: {},
        stageD: {},
        status: 'PENDING'
      }
    ]
  };

  const batchRes = await LabSupabase.syncBatch(testBatch);
  assert.strictEqual(batchRes.success, true, 'FAIL: Batch sync failed');
  assert.strictEqual(mockClient._db.intake_batches.length, 1, 'FAIL: Batch should be saved in DB');
  assert.strictEqual(mockClient._db.piece_custody_records.length, 2, 'FAIL: 2 custody pieces should be saved in DB');
  console.log('  ✓ Intake batch and piece custody records synchronized to PostgreSQL.');

  // 3. Sync Bill & Delivery
  const billRes = await LabSupabase.syncBill({
    billNo: '26-27/HM/SUPA1',
    jobDocket: 'JOB-2026-SUPA1',
    customerName: 'TEST MAHALAXMI GOLDSMITHS',
    totalAmount: 177.00
  });
  assert.strictEqual(billRes.success, true, 'FAIL: Bill sync failed');
  assert.strictEqual(mockClient._db.bills.length, 1, 'FAIL: Bill should be saved');

  const delivRes = await LabSupabase.syncDelivery({
    jobDocket: 'JOB-2026-SUPA1',
    customerName: 'TEST MAHALAXMI GOLDSMITHS',
    verifiedPieces: 2,
    totalPieces: 2,
    status: 'COMPLETED'
  });
  assert.strictEqual(delivRes.success, true, 'FAIL: Delivery sync failed');
  assert.strictEqual(mockClient._db.delivery_records.length, 1, 'FAIL: Delivery should be saved');
  console.log('  ✓ Bills and Delivery records synchronized.');

  // 4. Push All Data (Batch, Customer, Bill, Delivery, Settings)
  const pushRes = await LabSupabase.pushAllData({
    customers: [testCust],
    intakeBatches: [testBatch],
    historicalInvoices: [{
      billNo: '26-27/HM/SUPA1',
      jobDocket: 'JOB-2026-SUPA1',
      customerName: 'TEST MAHALAXMI GOLDSMITHS',
      totalAmount: 177.00
    }],
    deliveryLedger: [{
      jobDocket: 'JOB-2026-SUPA1',
      customerName: 'TEST MAHALAXMI GOLDSMITHS',
      totalPieces: 2,
      verifiedPieces: 2,
      recipientName: 'Devraj N.',
      gatepassNumber: 'GP-9012',
      dispatchTime: '11:15 AM IST',
      status: 'DELIVERED',
      stageDVerified: true
    }],
    labSettings: {
      legalName: 'SSR BULLION HALLMARK & ASSAY CENTER PRIVATE LIMITED'
    }
  });
  assert.strictEqual(pushRes.success, true, 'FAIL: Push all data failed');
  assert.strictEqual(pushRes.results.customersSynced, 1, 'FAIL: 1 customer synced');
  assert.strictEqual(pushRes.results.batchesSynced, 1, 'FAIL: 1 batch synced');
  assert.strictEqual(pushRes.results.billsSynced, 1, 'FAIL: 1 bill synced');
  assert.strictEqual(pushRes.results.deliveriesSynced, 1, 'FAIL: 1 delivery synced');
  assert.strictEqual(pushRes.results.settingsSynced, true, 'FAIL: lab settings should be synced');
  console.log('  ✓ Push All Data synchronizes batches, customers, bills, deliveries, and settings.');

  // 5. Bi-directional Pull & Merge
  const pullRes = await LabSupabase.pullAllData();
  assert.strictEqual(pullRes.success, true, 'FAIL: Pull all data failed');
  assert.strictEqual(pullRes.data.customers.length, 1, 'FAIL: 1 customer pulled');
  assert.strictEqual(pullRes.data.intakeBatches.length, 1, 'FAIL: 1 batch pulled');
  assert.strictEqual(pullRes.data.bills.length, 1, 'FAIL: 1 bill pulled');
  assert.strictEqual(pullRes.data.deliveries.length, 1, 'FAIL: 1 delivery pulled');
  console.log('  ✓ Bi-directional Pull & Merge correctly maps PostgreSQL rows into app state.\n');

  // -------------------------------------------------------------
  // SUITE 5: STORAGE PHOTO PIPELINE & RESILIENT FALLBACK
  // -------------------------------------------------------------
  console.log('[Suite 5] Supabase Storage Pipeline & Resilient Fallback:');

  // 1. Data URL to Blob converter
  const dummyBase64 = 'data:image/jpeg;base64,' + Buffer.from('MockJewelleryPhotoBinaryBytes').toString('base64');
  const blobObj = LabSupabase.dataUrlToBlob(dummyBase64);
  assert.strictEqual(blobObj !== null, true, 'FAIL: Blob conversion failed');
  console.log('  ✓ Base64 Data URL to binary byte buffer conversion verified.');

  // 2. Upload Jewellery Photo to custody-photos bucket
  const uploadRes = await LabSupabase.uploadJewelleryPhoto(dummyBase64, 'custody-photos', 'JOB-2026-SUPA1/piece_1_stage_a.jpg');
  assert.strictEqual(uploadRes.success, true, 'FAIL: Storage upload failed');
  assert.strictEqual(uploadRes.url.includes('https://mock-supabase.co/storage/v1/object/public/custody-photos'), true, 'FAIL: CDN URL missing');
  assert.strictEqual(uploadRes.fallback, false, 'FAIL: Should not be in fallback mode when connected');
  console.log('  ✓ Storage CDN upload succeeded. Public URL: ' + uploadRes.url);

  // 3. Upload to article-photos and dossiers buckets
  const articleUpload = await LabSupabase.uploadJewelleryPhoto(dummyBase64, 'article-photos', 'JOB-2026-SUPA1/sample_article.jpg');
  assert.strictEqual(articleUpload.success, true, 'FAIL: article-photos upload failed');
  assert.strictEqual(articleUpload.bucket, 'article-photos', 'FAIL: bucket should be article-photos');

  const dossierUpload = await LabSupabase.uploadJewelleryPhoto(dummyBase64, 'dossiers', 'JOB-2026-SUPA1/handover_dossier.jpg');
  assert.strictEqual(dossierUpload.success, true, 'FAIL: dossiers upload failed');
  assert.strictEqual(dossierUpload.bucket, 'dossiers', 'FAIL: bucket should be dossiers');
  console.log('  ✓ Supabase Storage multi-bucket pipeline (article-photos, dossiers) verified.');

  // 4. Fallback when disconnected / offline
  const tempClient = LabSupabase.getClient();
  LabSupabase.saveConfig('', ''); // Disconnect
  const fallbackUpload = await LabSupabase.uploadJewelleryPhoto(dummyBase64, 'custody-photos', 'piece_offline.jpg');
  assert.strictEqual(fallbackUpload.fallback, true, 'FAIL: Should report fallback when offline');
  assert.strictEqual(fallbackUpload.url, dummyBase64, 'FAIL: Should preserve original base64 URL');
  console.log('  ✓ Resilient offline fallback preserves base64 photo URL without crashing.');

  // Restore client
  LabSupabase.init(tempClient);

  // -------------------------------------------------------------
  // SUITE 6: SECURITY ENFORCEMENT, UI SANITIZATION & VERCEL CONFIG
  // -------------------------------------------------------------
  console.log('\n[Suite 6] DOM Structure, Security Sanitization & Vercel Env Management:');

  // 1. Header controls in index.html (Read-Only Status Pill)
  assert.strictEqual(indexHtml.includes('id="supabase-status-pill"'), true, 'FAIL: Header #supabase-status-pill missing');
  assert.strictEqual(indexHtml.includes('id="supabase-status-dot"'), true, 'FAIL: Header #supabase-status-dot missing');
  assert.strictEqual(indexHtml.includes('id="supabase-status-label"'), true, 'FAIL: Header #supabase-status-label missing');
  assert.strictEqual(indexHtml.includes('id="header-role-indicator"'), true, 'FAIL: Header #header-role-indicator missing');
  assert.strictEqual(indexHtml.includes('id="header-role-text"'), true, 'FAIL: Header #header-role-text missing');
  assert.strictEqual(indexHtml.includes('openSupabaseQuickModal()'), false, 'FAIL: Header status pill must NOT trigger modal or expose credentials');
  console.log('  ✓ Header Supabase Status Pill is read-only and Role Badges verified.');

  // 2. Settings 5th Tab and Credential Inputs completely removed from website UI
  assert.strictEqual(indexHtml.includes('switchSettingsTab(4)'), false, 'FAIL: 5th tab switchSettingsTab(4) must be removed from website');
  assert.strictEqual(indexHtml.includes('id="settings-section-supabase"'), false, 'FAIL: #settings-section-supabase panel must be removed');
  assert.strictEqual(indexHtml.includes('id="settings-panel-supabase"'), false, 'FAIL: #settings-panel-supabase must be removed');
  assert.strictEqual(indexHtml.includes('id="supabase-config-url"'), false, 'FAIL: #supabase-config-url input must be removed from website');
  assert.strictEqual(indexHtml.includes('id="supabase-config-key"'), false, 'FAIL: #supabase-config-key input must be removed from website');
  assert.strictEqual(indexHtml.includes('id="supabase-config-autosync"'), false, 'FAIL: #supabase-config-autosync checkbox must be removed from website');
  console.log('  ✓ Supabase Project URL & Anon Key inputs completely purged from Settings UI.');

  // 3. Quick Credential Modal completely removed
  assert.strictEqual(indexHtml.includes('id="supabase-quick-modal"'), false, 'FAIL: #supabase-quick-modal must be removed from website');
  console.log('  ✓ Quick modal purged from DOM so no user can access or edit credentials.');

  // 4. Vercel Serverless API Route & Environment Variable Management
  const configApiExists = fs.existsSync('./api/config.js');
  assert.strictEqual(configApiExists, true, 'FAIL: api/config.js must exist for Vercel deployment');
  const configApiCode = fs.readFileSync('./api/config.js', 'utf8');
  assert.strictEqual(configApiCode.includes('process.env.SUPABASE_URL'), true, 'FAIL: api/config.js must read SUPABASE_URL from environment');
  assert.strictEqual(configApiCode.includes('process.env.SUPABASE_ANON_KEY'), true, 'FAIL: api/config.js must read SUPABASE_ANON_KEY from environment');

  // Verify serverless route execution
  const vercelApiHandler = require('./api/config.js');
  let vercelResponse = {};
  const mockRes = {
    setHeader: () => {},
    status: (code) => ({
      json: (data) => { vercelResponse = { code, data }; },
      end: () => {}
    })
  };
  vercelApiHandler({ method: 'GET' }, mockRes);
  assert.strictEqual(vercelResponse.code, 200, 'FAIL: Vercel api/config must return 200 OK');
  assert.strictEqual('supabaseUrl' in vercelResponse.data, true, 'FAIL: response missing supabaseUrl property');
  assert.strictEqual('supabaseAnonKey' in vercelResponse.data, true, 'FAIL: response missing supabaseAnonKey property');
  assert.strictEqual(typeof LabSupabase.loadVercelEnvConfig, 'function', 'FAIL: LabSupabase.loadVercelEnvConfig missing');
  console.log('  ✓ Vercel serverless /api/config verified with environment variables.');

  // 5. Staff Auth Profile Modal and JavaScript SDKs preserved
  assert.strictEqual(indexHtml.includes('id="lab-auth-modal"'), true, 'FAIL: #lab-auth-modal missing');
  assert.strictEqual(indexHtml.includes('js/supabase-client.js'), true, 'FAIL: js/supabase-client.js script tag missing in index.html');
  assert.strictEqual(indexHtml.includes('@supabase/supabase-js'), true, 'FAIL: @supabase/supabase-js script tag missing in index.html');
  console.log('  ✓ Supabase JavaScript SDK bundled and Staff Auth Modal preserved.');

  // 6. Signin.html & Login.html integration
  assert.strictEqual(signinHtml.includes('js/supabase-client.js'), true, 'FAIL: supabase-client.js missing in signin.html');
  assert.strictEqual(loginHtml.includes('js/supabase-client.js'), true, 'FAIL: supabase-client.js missing in login.html');
  assert.strictEqual(signinHtml.includes('LabSupabase.signIn'), true, 'FAIL: LabSupabase.signIn missing in signin.html');
  assert.strictEqual(loginHtml.includes('LabSupabase.signIn'), true, 'FAIL: LabSupabase.signIn missing in login.html');
  console.log('  ✓ Sign-in & Login pages wired to Supabase Auth.');

  // 6. Window exports in app.js
  const expectedExports = [
    'openSupabaseQuickModal',
    'closeSupabaseQuickModal',
    'openFullSupabaseSettings',
    'openAuthProfileModal',
    'closeAuthProfileModal',
    'switchAuthTab',
    'toggleSupabaseKeyVisibility',
    'testSupabaseConnection',
    'saveSupabaseSettings',
    'pushAllToSupabase',
    'pullAllFromSupabase',
    'handleLabAuthSignIn',
    'handleLabAuthSignUp',
    'handleLabAuthSignOut',
    'handleRoleSwitch',
    'copySupabaseSchemaSql',
    'testStoragePhotoUpload'
  ];

  expectedExports.forEach(fnName => {
    assert.strictEqual(typeof window[fnName], 'function', `FAIL: window.${fnName} not exported in app.js`);
  });
  console.log('  ✓ All 17 Supabase Controller functions properly exported to window.');

  console.log('\n=== ALL SUPABASE INTEGRATION TESTS PASSED SUCCESSFULLY! ===\n');
})();
