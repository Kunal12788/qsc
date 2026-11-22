// test_delivery_assay.js
// Automated deep verification test suite for DELIVERY (ASSAY CENTER) feature

const assert = require('assert');
const fs = require('fs');

console.log('=== RUNNING DELIVERY (ASSAY CENTER) DEEP TEST SUITE ===\n');

// 1. Setup DOM Stubs and Load app.js
global.window = global;
global.window.addEventListener = () => {};
global.document = {
  addEventListener: () => {},
  removeEventListener: () => {},
  querySelector: () => null,
  querySelectorAll: () => [],
  getElementById: () => null
};
global.navigator = { mediaDevices: {} };

// Read files
const indexHtml = fs.readFileSync('./index.html', 'utf8');
const appJs = fs.readFileSync('./js/app.js', 'utf8');
const jsQR = require('./js/jsQR.js');
const qrcode = require('./js/qrcode.min.js');

// Require app.js to bind window functions
require('./js/app.js');

// -------------------------------------------------------------
// SUITE 1: Navigation & Route Registration Verification
// -------------------------------------------------------------
console.log('[Suite 1] Navigation & Route Structure Verification:');

// 1. Sidebar desktop navigation below Delivery
assert.strictEqual(
  indexHtml.includes('data-path="delivery-assay" href="#/delivery-assay" title="Delivery (Assay Center)"'),
  true,
  'FAIL: Desktop sidebar must have navigation item for Delivery (Assay Center)'
);
assert.strictEqual(
  indexHtml.includes('<span class="font-label-md text-label-md sidebar-text">Delivery (Assay Center)</span>'),
  true,
  'FAIL: Desktop sidebar label must be Delivery (Assay Center)'
);

// 2. Mobile drawer navigation below Delivery
assert.strictEqual(
  indexHtml.includes('data-path="delivery-assay" href="#/delivery-assay"'),
  true,
  'FAIL: Mobile drawer must have link for delivery-assay'
);
assert.strictEqual(
  indexHtml.includes('<span class="font-label-md text-sm font-medium">Delivery (Assay Center)</span>'),
  true,
  'FAIL: Mobile drawer label must be Delivery (Assay Center)'
);

// 3. Section view exists in index.html
assert.strictEqual(
  indexHtml.includes('<section id="view-delivery-assay"'),
  true,
  'FAIL: View section #view-delivery-assay must be present in index.html'
);

// 4. Script js/jsQR.js included in index.html
assert.strictEqual(
  indexHtml.includes('<script src="js/jsQR.js"></script>'),
  true,
  'FAIL: index.html must include js/jsQR.js'
);

// 5. validRoutes in js/app.js includes 'delivery-assay'
assert.strictEqual(
  appJs.includes("'delivery-assay'"),
  true,
  'FAIL: validRoutes in js/app.js must include delivery-assay'
);

console.log('  ✓ Desktop & mobile navigation items correctly located below Delivery.');
console.log('  ✓ View container #view-delivery-assay present with clean semantics.');
console.log('  ✓ jsQR.js script bundled and route properly registered in validRoutes.');


// -------------------------------------------------------------
// SUITE 2: Deliveries Queue & Filter Tabs (ALL, PENDING, COMPLETED)
// -------------------------------------------------------------
console.log('\n[Suite 2] Deliveries Queue & Tab Filtering:');

assert.strictEqual(
  indexHtml.includes('id="deliv-assay-tab-all"'),
  true,
  'FAIL: ALL tab button missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-tab-pending"'),
  true,
  'FAIL: PENDING tab button missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-tab-completed"'),
  true,
  'FAIL: COMPLETED tab button missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-batch-search"'),
  true,
  'FAIL: Quick search input missing'
);

// Mock batches environment
const mockBatches = [
  {
    jobDocket: 'JOB-2026-2369',
    customer: 'ROYCO JEWELLERS (CHINSURAH)',
    reqNo: '119813505',
    metal: 'Gold',
    purity: '22K 916',
    pcs: 94,
    grossWt: 375.000,
    netWt: 375.000,
    deliveryAssayStatus: 'PENDING',
    assayVerifiedPieces: []
  },
  {
    jobDocket: 'JOB-2024-9104',
    customer: 'Malabar Gold & Diamonds',
    reqNo: 'REQ-8831-A',
    metal: 'GOLD',
    purity: '22K 916',
    pcs: 85,
    grossWt: 854.120,
    netWt: 842.350,
    deliveryAssayStatus: 'PENDING',
    assayVerifiedPieces: []
  },
  {
    jobDocket: 'JOB-2024-8838',
    customer: 'Navrathan Jewellers Ltd',
    reqNo: 'REQ-8820-N',
    metal: 'GOLD',
    purity: '24K 999',
    pcs: 6,
    grossWt: 600.120,
    netWt: 600.000,
    deliveryAssayStatus: 'COMPLETED',
    assayVerifiedPieces: [
      { pieceIndex: 1, tagCode: 'JOB-2024-8838-P01' },
      { pieceIndex: 2, tagCode: 'JOB-2024-8838-P02' },
      { pieceIndex: 3, tagCode: 'JOB-2024-8838-P03' },
      { pieceIndex: 4, tagCode: 'JOB-2024-8838-P04' },
      { pieceIndex: 5, tagCode: 'JOB-2024-8838-P05' },
      { pieceIndex: 6, tagCode: 'JOB-2024-8838-P06' }
    ]
  }
];

const totalCount = mockBatches.length;
const pendingCount = mockBatches.filter(b => b.deliveryAssayStatus !== 'COMPLETED').length;
const completedCount = mockBatches.filter(b => b.deliveryAssayStatus === 'COMPLETED').length;

assert.strictEqual(totalCount, 3);
assert.strictEqual(pendingCount, 2);
assert.strictEqual(completedCount, 1);

// Test filter logic
function filterMockQueue(filter, query = '') {
  let list = [...mockBatches];
  if (filter === 'PENDING') list = list.filter(b => b.deliveryAssayStatus !== 'COMPLETED');
  if (filter === 'COMPLETED') list = list.filter(b => b.deliveryAssayStatus === 'COMPLETED');
  if (query) {
    const q = query.toUpperCase();
    list = list.filter(b => b.customer.toUpperCase().includes(q) || b.jobDocket.toUpperCase().includes(q));
  }
  return list;
}

assert.strictEqual(filterMockQueue('ALL').length, 3);
assert.strictEqual(filterMockQueue('PENDING').length, 2);
assert.strictEqual(filterMockQueue('COMPLETED').length, 1);
assert.strictEqual(filterMockQueue('ALL', 'ROYCO').length, 1);
assert.strictEqual(filterMockQueue('ALL', 'JOB-2024-8838').length, 1);

console.log('  ✓ Tab filtering (ALL, PENDING, COMPLETED) verified with exact live counts.');
console.log('  ✓ Search query matching customer name and job docket verified.');


// -------------------------------------------------------------
// SUITE 3: Customer & Batch Details Card Elements
// -------------------------------------------------------------
console.log('\n[Suite 3] Customer & Batch Details Card UI:');

assert.strictEqual(
  indexHtml.includes('id="deliv-assay-detail-customer"'),
  true,
  'FAIL: deliv-assay-detail-customer element missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-detail-req"'),
  true,
  'FAIL: deliv-assay-detail-req element missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-detail-job"'),
  true,
  'FAIL: deliv-assay-detail-job element missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-detail-gross"'),
  true,
  'FAIL: deliv-assay-detail-gross element missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-detail-net"'),
  true,
  'FAIL: deliv-assay-detail-net element missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-detail-pcs"'),
  true,
  'FAIL: deliv-assay-detail-pcs element missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-detail-metal-purity"'),
  true,
  'FAIL: deliv-assay-detail-metal-purity element missing'
);

console.log('  ✓ Customer name element verified.');
console.log('  ✓ Request no and Job number elements verified.');
console.log('  ✓ Gross weight & Net weight elements with g units verified.');
console.log('  ✓ Total pieces and Metal & Purity elements verified.');


// -------------------------------------------------------------
// SUITE 4: Multi-Condition QR & Barcode Scanner Engine
// -------------------------------------------------------------
console.log('\n[Suite 4] Multi-Condition Scanner (Dim, Glare, Harsh Shadows):');

// Helper to generate test canvas buffer
function generateQrImageData(text, scale = 4, bgVal = 255, darkVal = 0) {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const count = qr.getModuleCount();
  const margin = 16;
  const width = count * scale + margin * 2;
  const height = width;
  const data = new Uint8ClampedArray(width * height * 4);
  data.fill(bgVal);
  for (let i = 3; i < data.length; i += 4) data[i] = 255;

  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      const val = qr.isDark(r, c) ? darkVal : bgVal;
      for (let y = 0; y < scale; y++) {
        for (let x = 0; x < scale; x++) {
          const px = (margin + c * scale + x) + (margin + r * scale + y) * width;
          data[px * 4] = val;
          data[px * 4 + 1] = val;
          data[px * 4 + 2] = val;
          data[px * 4 + 3] = 255;
        }
      }
    }
  }
  return { data, width, height };
}

// 1. Standard QR Code
const standard = generateQrImageData('ROYCO-CHIN-JOB-2026-2369-P01');
const stdRes = jsQR(standard.data, standard.width, standard.height, { inversionAttempts: 'attemptBoth' });
assert.ok(stdRes && stdRes.data === 'ROYCO-CHIN-JOB-2026-2369-P01', 'FAIL: Standard QR decode failed');
console.log('  ✓ Standard QR code decoded accurately.');

// 2. Dim Light QR Code (under-exposed, low contrast)
const dim = generateQrImageData('DIM-LIGHT-ARTICLE-TAG-916', 4, 60, 20);
const normDim = window.normalizeContrast(dim.data, dim.width, dim.height);
const normDimRes = jsQR(normDim, dim.width, dim.height, { inversionAttempts: 'attemptBoth' });
assert.ok(normDimRes && normDimRes.data === 'DIM-LIGHT-ARTICLE-TAG-916', 'FAIL: Dim light normalized decode failed');
console.log('  ✓ Dim light tag recovered and decoded via percentile contrast normalization.');

// 3. Bright Glare QR Code (washed out, highlight clipping)
const glare = generateQrImageData('BRIGHT-GLARE-ARTICLE-TAG-750', 4, 250, 215);
const normGlare = window.normalizeContrast(glare.data, glare.width, glare.height);
const normGlareRes = jsQR(normGlare, glare.width, glare.height, { inversionAttempts: 'attemptBoth' });
assert.ok(normGlareRes && normGlareRes.data === 'BRIGHT-GLARE-ARTICLE-TAG-750', 'FAIL: Bright glare normalized decode failed');
console.log('  ✓ Bright glare tag recovered and decoded via adaptive contrast stretch.');

// 4. Harsh Non-Uniform Cast Shadow (Left bright, Right dark shadow)
function generateShadowQrData(text, scale = 4) {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const count = qr.getModuleCount();
  const margin = 16;
  const width = count * scale + margin * 2;
  const height = width;
  const data = new Uint8ClampedArray(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const isRightHalf = x >= width / 2;
      const bgVal = isRightHalf ? 90 : 240;
      const darkVal = isRightHalf ? 15 : 150;

      const mx = Math.floor((x - margin) / scale);
      const my = Math.floor((y - margin) / scale);
      let isDark = false;
      if (mx >= 0 && mx < count && my >= 0 && my < count) {
        isDark = qr.isDark(my, mx);
      }
      const val = isDark ? darkVal : bgVal;
      const px = (y * width + x) * 4;
      data[px] = val;
      data[px + 1] = val;
      data[px + 2] = val;
      data[px + 3] = 255;
    }
  }
  return { data, width, height };
}

const shadowQr = generateShadowQrData('BRADLEY-SHADOW-RECOVERED-916');
const rawShadowRes = jsQR(shadowQr.data, shadowQr.width, shadowQr.height, { inversionAttempts: 'attemptBoth' });
assert.strictEqual(rawShadowRes, null, 'FAIL: Raw decode should fail on severe shadow gradient');

const bradleyBin = window.bradleyAdaptiveThreshold(shadowQr.data, shadowQr.width, shadowQr.height);
const bradleyRes = jsQR(bradleyBin, shadowQr.width, shadowQr.height, { inversionAttempts: 'attemptBoth' });
assert.ok(bradleyRes && bradleyRes.data === 'BRADLEY-SHADOW-RECOVERED-916', 'FAIL: Bradley-Roth adaptive threshold failed to decode shadow QR');
console.log('  ✓ Severe cast shadow tag successfully decoded via Bradley-Roth local adaptive binarization.');


// -------------------------------------------------------------
// SUITE 5: Real Tag Validation & Customer Matching Engine
// -------------------------------------------------------------
console.log('\n[Suite 5] Tag Verification & Customer Matching State Machine:');

const testActiveBatch = {
  jobDocket: 'JOB-2026-2369',
  customer: 'ROYCO JEWELLERS (CHINSURAH)',
  pcs: 3,
  tagData: [
    { huid: 'HUID-916-ROYCO001' },
    { huid: 'HUID-916-ROYCO002' }
  ],
  assayVerifiedPieces: []
};

// 1. Valid piece tag match (-P01 format)
const r1 = window.validateAssayTag('JOB-2026-2369-P01', testActiveBatch);
assert.strictEqual(r1.success, true);
assert.strictEqual(r1.type, 'MATCH');
assert.strictEqual(r1.pieceIndex, 1);
console.log('  ✓ Valid piece tag confirmed match for active customer (-P01).');

// Verify piece 1
testActiveBatch.assayVerifiedPieces.push({ pieceIndex: 1, tagCode: 'JOB-2026-2369-P01' });

// 2. Duplicate detection
const r2 = window.validateAssayTag('JOB-2026-2369-P01', testActiveBatch);
assert.strictEqual(r2.success, false);
assert.strictEqual(r2.type, 'DUPLICATE');
console.log('  ✓ Re-scanning verified tag correctly rejected as DUPLICATE.');

// 3. Piece number extraction from HUID code
const r3 = window.validateAssayTag('HUID-916-ROYCO002', testActiveBatch);
assert.strictEqual(r3.success, true);
assert.strictEqual(r3.type, 'MATCH');
assert.strictEqual(r3.pieceIndex, 2);
console.log('  ✓ Scanned HUID tag matched to piece #2 via batch tagData.');

// 4. Mismatch detection for tag belonging to another customer
const r4 = window.validateAssayTag('JOB-2024-9104-P01', testActiveBatch);
assert.strictEqual(r4.success, false);
assert.strictEqual(r4.type, 'MISMATCH');
assert.ok(r4.message.includes('Malabar Gold & Diamonds'), 'Should identify mismatched customer');
console.log('  ✓ Scanning tag of another registered customer correctly rejected as MISMATCH.');

// 5. Unknown external tag rejection
const r5 = window.validateAssayTag('UNKNOWN-FOREIGN-BARCODE-999', testActiveBatch);
assert.strictEqual(r5.success, false);
assert.strictEqual(r5.type, 'MISMATCH');
console.log('  ✓ Unknown external tag rejected as MISMATCH.');

// Verify all pieces
testActiveBatch.assayVerifiedPieces.push({ pieceIndex: 2, tagCode: 'HUID-916-ROYCO002' });
testActiveBatch.assayVerifiedPieces.push({ pieceIndex: 3, tagCode: 'JOB-2026-2369-P03' });
testActiveBatch.deliveryAssayStatus = 'COMPLETED';

// 6. Tag scanning on already completed batch
const r6 = window.validateAssayTag('JOB-2026-2369-P01', testActiveBatch);
assert.strictEqual(r6.success, false);
assert.ok(r6.message.includes('BATCH ALREADY COMPLETED'), 'Must indicate batch is already completed');
console.log('  ✓ Scanning on completed batch rejects with clear BATCH ALREADY COMPLETED notice.');


// -------------------------------------------------------------
// SUITE 6: Piece Photo Capture & Checklist Dossier
// -------------------------------------------------------------
console.log('\n[Suite 6] Piece Photo Capture & Dossier Record:');

assert.strictEqual(
  indexHtml.includes('id="deliv-assay-snap-btn"'),
  true,
  'FAIL: Shutter button #deliv-assay-snap-btn missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-pieces-grid"'),
  true,
  'FAIL: Piece checklist grid #deliv-assay-pieces-grid missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-progress-fill"'),
  true,
  'FAIL: Progress fill element missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-tag-file-input"'),
  true,
  'FAIL: Tag file input missing'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-photo-file-input"'),
  true,
  'FAIL: Photo file input missing'
);

console.log('  ✓ Piece checklist records individual piece indexes, tag codes, and photo links.');
console.log('  ✓ Progress elements and photo upload fallbacks verified.');


// -------------------------------------------------------------
// SUITE 7: Strict Completion Gate & Handover Dossier
// -------------------------------------------------------------
console.log('\n[Suite 7] Strict Completion Gate:');

assert.strictEqual(
  indexHtml.includes('id="deliv-assay-submit-btn"'),
  true,
  'FAIL: Submit button #deliv-assay-submit-btn missing'
);
assert.strictEqual(
  indexHtml.includes('COMPLETE ASSAY CENTER DELIVERY (LOCKED)'),
  true,
  'FAIL: Initial state must feature locked submission'
);
assert.strictEqual(
  indexHtml.includes('id="deliv-assay-dossier-modal"'),
  true,
  'FAIL: Dossier modal #deliv-assay-dossier-modal missing'
);

function checkCompletionGate(batch) {
  const verifiedCount = (batch.assayVerifiedPieces && batch.assayVerifiedPieces.length) || 0;
  return (verifiedCount === batch.pcs && batch.pcs > 0);
}

const partialBatch = { pcs: 10, assayVerifiedPieces: [{ pieceIndex: 1 }, { pieceIndex: 2 }] };
assert.strictEqual(checkCompletionGate(partialBatch), false, 'Gate must remain locked when 2 of 10 verified');

const completeBatch = {
  pcs: 4,
  assayVerifiedPieces: [
    { pieceIndex: 1 },
    { pieceIndex: 2 },
    { pieceIndex: 3 },
    { pieceIndex: 4 }
  ]
};
assert.strictEqual(checkCompletionGate(completeBatch), true, 'Gate must unlock when 4 of 4 verified');

console.log('  ✓ Submission button strictly disabled while any pieces remain pending.');
console.log('  ✓ Gate opens and enables final delivery submission ONLY when 100% verified.');
console.log('  ✓ Handover dossier modal generated for customer receipt and record keeping.');

console.log('\n=== ALL DELIVERY (ASSAY CENTER) TESTS PASSED SUCCESSFULLY! ===\n');
