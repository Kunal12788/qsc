// js/supabase-client.js
// Sovereign BIS Hallmarking Management Software - Supabase Integration Engine
// Provides Supabase Auth, Database Synchronization, Storage Photo Pipeline, and Resilient Offline Fallback

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.LabSupabase = factory();
  }
})(typeof window !== 'undefined' ? window : global, function () {
  'use strict';

  // Available Laboratory Roles
  const LAB_ROLES = [
    'Admin',
    'Assay Master',
    'Quality Auditor',
    'Delivery Agent'
  ];

  // Role Color Badges for UI
  const ROLE_CONFIGS = {
    'Admin': { bg: 'bg-amber-500', text: 'text-amber-400', badgeClass: 'bg-amber-100 text-amber-900 border-amber-300' },
    'Assay Master': { bg: 'bg-blue-600', text: 'text-blue-500', badgeClass: 'bg-blue-100 text-blue-900 border-blue-300' },
    'Quality Auditor': { bg: 'bg-emerald-600', text: 'text-emerald-500', badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300' },
    'Delivery Agent': { bg: 'bg-purple-600', text: 'text-purple-500', badgeClass: 'bg-purple-100 text-purple-900 border-purple-300' }
  };

  // Safe localStorage helper
  const storage = {
    get: function (k, def) {
      try {
        if (typeof localStorage !== 'undefined') {
          const v = localStorage.getItem(k);
          return v !== null ? v : def;
        }
      } catch (e) {}
      return def;
    },
    set: function (k, v) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(k, v);
        }
      } catch (e) {}
    },
    remove: function (k) {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(k);
        }
      } catch (e) {}
    }
  };

  // Core Supabase Engine State
  const state = {
    url: storage.get('supabase_url', ''),
    anonKey: storage.get('supabase_anon_key', ''),
    autoSync: storage.get('supabase_auto_sync', 'true') === 'true',
    status: 'offline', // 'offline' | 'connecting' | 'connected' | 'syncing' | 'error'
    statusMessage: 'Local Storage Mode',
    lastSyncTime: storage.get('supabase_last_sync_time', null),
    client: null,
    currentUser: null,
    currentRole: storage.get('supabase_active_role', 'Admin'),
    syncStats: {
      syncedBatches: 0,
      syncedCustomers: 0,
      syncedPhotos: 0,
      lastError: null
    },
    listeners: []
  };

  // Helper: notify all registered subscribers of state transitions
  function notifyListeners(event, payload) {
    state.listeners.forEach(fn => {
      try { fn(event, payload, state); } catch (e) { console.error('Supabase listener error:', e); }
    });
    updateUIElements();
  }

  // Helper: convert Base64 Data URL to Uint8Array/Blob
  function dataUrlToBlob(dataUrl) {
    if (!dataUrl || typeof dataUrl !== 'string') return null;
    if (!dataUrl.startsWith('data:')) {
      // Already a plain URL or string
      return null;
    }
    try {
      const parts = dataUrl.split(',');
      const mime = parts[0].match(/:(.*?);/)[1];
      const binaryStr = (typeof atob !== 'undefined') ? atob(parts[1]) : Buffer.from(parts[1], 'base64').toString('binary');
      const n = binaryStr.length;
      const u8arr = new Uint8Array(n);
      for (let i = 0; i < n; i++) {
        u8arr[i] = binaryStr.charCodeAt(i);
      }
      if (typeof Blob !== 'undefined') {
        return new Blob([u8arr], { type: mime });
      }
      return u8arr;
    } catch (err) {
      console.warn('Failed to parse data URL to blob:', err);
      return null;
    }
  }

  // Determine if Supabase credentials are configured
  function isConfigured() {
    return Boolean(state.url && state.anonKey && state.url.trim().length > 8 && state.anonKey.trim().length > 10);
  }

  // Get active Supabase client instance
  function getClient() {
    return state.client;
  }

  // Initialize Supabase Client
  function init(customClient) {
    if (customClient) {
      state.client = customClient;
      state.status = 'connected';
      state.statusMessage = 'Cloud Connected (Custom Client)';
      notifyListeners('init', { client: customClient });
      return state.client;
    }

    if (!isConfigured()) {
      state.status = 'offline';
      state.statusMessage = 'Offline / Local State Mode';
      notifyListeners('status_change', { status: state.status });
      return null;
    }

    try {
      let createClientFn = null;
      if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
        createClientFn = window.supabase.createClient;
      } else if (typeof require === 'function') {
        try {
          const sb = require('@supabase/supabase-js');
          createClientFn = sb.createClient;
        } catch (e) {}
      }

      if (!createClientFn) {
        state.status = 'offline';
        state.statusMessage = 'Supabase JS SDK not loaded. Using local fallback.';
        notifyListeners('status_change', { status: state.status });
        return null;
      }

      state.status = 'connecting';
      state.statusMessage = 'Connecting to Supabase Cloud...';
      notifyListeners('status_change', { status: state.status });

      state.client = createClientFn(state.url.trim(), state.anonKey.trim(), {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });

      // Hook Auth State Listener
      if (state.client.auth && typeof state.client.auth.onAuthStateChange === 'function') {
        state.client.auth.onAuthStateChange((event, session) => {
          handleAuthStateChange(event, session);
        });
      }

      // Check current user session
      if (state.client.auth && typeof state.client.auth.getSession === 'function') {
        state.client.auth.getSession().then(({ data, error }) => {
          if (!error && data && data.session && data.session.user) {
            applyUserSession(data.session.user);
          }
        }).catch(() => {});
      }

      testConnection().then(res => {
        if (res.success) {
          state.status = 'connected';
          state.statusMessage = 'Cloud Synced';
        } else {
          state.status = 'error';
          state.statusMessage = 'Connection Check Failed: ' + (res.error || 'Unknown error');
        }
        notifyListeners('status_change', { status: state.status, res });
      });

      return state.client;
    } catch (err) {
      console.error('Error initializing Supabase client:', err);
      state.status = 'error';
      state.statusMessage = 'Initialization Error: ' + err.message;
      notifyListeners('status_change', { status: state.status, error: err });
      return null;
    }
  }

  // Handle Supabase Auth state transitions
  function handleAuthStateChange(event, session) {
    if (session && session.user) {
      applyUserSession(session.user);
      notifyListeners('auth_change', { event, user: session.user, session });
    } else if (event === 'SIGNED_OUT') {
      state.currentUser = null;
      storage.remove('ssr_authenticated');
      storage.remove('ssr_active_user');
      notifyListeners('auth_change', { event, user: null, session: null });
    }
  }

  // Populate active user metadata and role
  function applyUserSession(user) {
    if (!user) return;
    const metadata = user.user_metadata || {};
    const role = metadata.role || state.currentRole || 'Quality Auditor';
    const fullName = metadata.full_name || (user.email ? user.email.split('@')[0] : 'Lab Operator');

    state.currentUser = {
      id: user.id,
      email: user.email,
      fullName: fullName,
      role: role,
      phone: metadata.phone || '',
      lastSignIn: user.last_sign_in_at
    };
    state.currentRole = role;

    storage.set('ssr_authenticated', 'true');
    storage.set('ssr_active_user', user.email || 'operator');
    storage.set('supabase_active_role', role);

    updateUIElements();
  }

  // Save new Supabase credentials and re-initialize
  async function saveConfig(url, anonKey, autoSync = true) {
    state.url = (url || '').trim();
    state.anonKey = (anonKey || '').trim();
    state.autoSync = Boolean(autoSync);

    storage.set('supabase_url', state.url);
    storage.set('supabase_anon_key', state.anonKey);
    storage.set('supabase_auto_sync', state.autoSync ? 'true' : 'false');

    if (!state.url || !state.anonKey) {
      state.client = null;
      state.status = 'offline';
      state.statusMessage = 'Local Storage Mode (Credentials Cleared)';
      notifyListeners('config_saved', { configured: false });
      return { success: true, message: 'Configuration cleared. Switched to offline mode.' };
    }

    init();
    const testResult = await testConnection();
    notifyListeners('config_saved', { configured: true, testResult });
    return testResult;
  }

  // Test live connection to Supabase
  async function testConnection() {
    if (!state.client) {
      return { success: false, error: 'Supabase client not initialized. Check URL and Public Anon Key.' };
    }

    const startTime = Date.now();
    try {
      // 1. Try querying public.lab_settings or checking auth getSession
      let querySuccess = false;
      let errorMsg = null;

      if (state.client.from) {
        try {
          const { error } = await state.client.from('lab_settings').select('id', { head: true, count: 'exact' });
          if (!error || error.code === 'PGRST116' || (error.message && error.message.includes('permission denied'))) {
            querySuccess = true;
          } else if (error && error.code === '42P01') {
            // Table does not exist yet, but connection to Postgres succeeded!
            querySuccess = true;
          } else if (error) {
            errorMsg = error.message || 'Database query failed';
          }
        } catch (e) {
          errorMsg = e.message;
        }
      }

      if (!querySuccess && state.client.auth) {
        // Fallback test via auth ping
        const { error: authErr } = await state.client.auth.getSession();
        if (!authErr) {
          querySuccess = true;
        } else {
          errorMsg = errorMsg || authErr.message;
        }
      }

      const latencyMs = Date.now() - startTime;
      if (querySuccess) {
        state.status = 'connected';
        state.statusMessage = `Cloud Connected (${latencyMs}ms)`;
        notifyListeners('status_change', { status: 'connected', latencyMs });
        return { success: true, latencyMs, message: `Connected to Supabase in ${latencyMs}ms.` };
      } else {
        state.status = 'error';
        state.statusMessage = 'Connection Error: ' + (errorMsg || 'Unable to reach project');
        notifyListeners('status_change', { status: 'error', error: errorMsg });
        return { success: false, error: errorMsg || 'Could not verify database endpoint.' };
      }
    } catch (err) {
      state.status = 'error';
      state.statusMessage = 'Connection Error: ' + err.message;
      notifyListeners('status_change', { status: 'error', error: err.message });
      return { success: false, error: err.message };
    }
  }

  // ==========================================================================
  // AUTHENTICATION ENGINE
  // ==========================================================================

  // Sign In with Email & Password
  async function signIn(email, password) {
    if (!email || !password) {
      throw new Error('Please provide email and password.');
    }

    // 1. Real Supabase Auth if client is configured
    if (state.client && state.client.auth && typeof state.client.auth.signInWithPassword === 'function') {
      try {
        const { data, error } = await state.client.auth.signInWithPassword({
          email: email.trim(),
          password: password
        });

        if (error) {
          throw error;
        }

        if (data && data.user) {
          applyUserSession(data.user);
          return { success: true, user: state.currentUser, mode: 'cloud' };
        }
      } catch (cloudErr) {
        // If credentials failed on cloud, throw unless we are in offline fallback mode
        if (cloudErr.message && !cloudErr.message.includes('fetch') && !cloudErr.message.includes('Failed to fetch')) {
          throw cloudErr;
        }
        console.warn('Supabase cloud sign in unreachable, attempting local fallback:', cloudErr.message);
      }
    }

    // 2. Resilient Local / Demo Fallback Mode
    const defaultRole = (email.toLowerCase().includes('sarah') || email.toLowerCase().includes('admin')) ? 'Admin' : 'Quality Auditor';
    const fallbackUser = {
      id: 'local-' + Date.now(),
      email: email.trim(),
      fullName: email.split('@')[0].toUpperCase(),
      role: defaultRole
    };

    applyUserSession({
      id: fallbackUser.id,
      email: fallbackUser.email,
      user_metadata: {
        full_name: fallbackUser.fullName,
        role: defaultRole
      }
    });

    return { success: true, user: state.currentUser, mode: 'local_fallback' };
  }

  // Register New Laboratory Operator
  async function signUp(email, password, profileData = {}) {
    if (!email || !password) {
      throw new Error('Please provide email and password.');
    }

    const role = profileData.role || 'Quality Auditor';
    const fullName = profileData.fullName || email.split('@')[0];
    const phone = profileData.phone || '';

    if (!LAB_ROLES.includes(role)) {
      throw new Error(`Invalid laboratory role: ${role}. Must be one of: ${LAB_ROLES.join(', ')}`);
    }

    // 1. Supabase Cloud Sign-Up
    if (state.client && state.client.auth && typeof state.client.auth.signUp === 'function') {
      try {
        const { data, error } = await state.client.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName,
              role: role,
              phone: phone
            }
          }
        });

        if (error) throw error;

        if (data && data.user) {
          applyUserSession(data.user);
          // Sync profile to user_profiles table if connected
          if (state.client.from) {
            try {
              await state.client.from('user_profiles').upsert({
                id: data.user.id,
                email: email.trim(),
                full_name: fullName,
                role: role,
                phone: phone
              });
            } catch (pErr) {
              console.warn('Could not upsert user_profiles row:', pErr);
            }
          }
          return { success: true, user: state.currentUser, mode: 'cloud' };
        }
      } catch (cloudErr) {
        if (!cloudErr.message.includes('fetch')) {
          throw cloudErr;
        }
      }
    }

    // 2. Local Fallback Registration
    const fallbackUser = {
      id: 'usr-local-' + Date.now(),
      email: email.trim(),
      fullName: fullName,
      role: role
    };

    applyUserSession({
      id: fallbackUser.id,
      email: fallbackUser.email,
      user_metadata: {
        full_name: fullName,
        role: role,
        phone: phone
      }
    });

    return { success: true, user: state.currentUser, mode: 'local_fallback' };
  }

  // Sign In with OAuth provider (e.g. Google)
  async function signInWithOAuth(provider = 'google') {
    if (state.client && state.client.auth && typeof state.client.auth.signInWithOAuth === 'function') {
      try {
        let dest = 'index.html#/dashboard';
        if (typeof window !== 'undefined' && window.location) {
          const origin = window.location.origin || '';
          const path = (window.location.pathname || '').replace(/[^/]*$/, '');
          dest = origin + path + 'index.html#/dashboard';
        }
        const res = await state.client.auth.signInWithOAuth({
          provider: provider,
          options: { redirectTo: dest }
        });
        return res;
      } catch (err) {
        console.warn('OAuth sign-in exception:', err);
        throw err;
      }
    }
    return { success: false, error: 'Supabase client not connected. Configure credentials in Settings.' };
  }

  // Sign Out
  async function signOut() {
    if (state.client && state.client.auth && typeof state.client.auth.signOut === 'function') {
      try {
        await state.client.auth.signOut();
      } catch (e) {
        console.warn('Supabase sign-out error:', e);
      }
    }

    state.currentUser = null;
    storage.remove('ssr_authenticated');
    storage.remove('ssr_active_user');
    notifyListeners('signed_out', {});
    updateUIElements();
    return { success: true };
  }

  // Switch or Override Laboratory Role
  async function switchRole(newRole) {
    if (!LAB_ROLES.includes(newRole)) {
      throw new Error(`Invalid laboratory role: ${newRole}. Allowed: ${LAB_ROLES.join(', ')}`);
    }

    state.currentRole = newRole;
    storage.set('supabase_active_role', newRole);

    if (state.currentUser) {
      state.currentUser.role = newRole;
    }

    // If connected to Supabase and authenticated, update user metadata
    if (state.client && state.client.auth && typeof state.client.auth.updateUser === 'function') {
      try {
        await state.client.auth.updateUser({
          data: { role: newRole }
        });
        if (state.currentUser && state.currentUser.id && state.client.from) {
          await state.client.from('user_profiles').update({ role: newRole }).eq('id', state.currentUser.id);
        }
      } catch (err) {
        console.warn('Role update to cloud skipped:', err);
      }
    }

    notifyListeners('role_changed', { role: newRole });
    updateUIElements();
    return newRole;
  }

  // ==========================================================================
  // STORAGE PHOTO PIPELINE
  // ==========================================================================

  // Upload Jewellery Photo to Supabase Storage Bucket
  async function uploadJewelleryPhoto(base64OrBlob, bucketName = 'custody-photos', filePath = '') {
    if (!base64OrBlob) {
      return { success: false, url: '', error: 'No image data provided' };
    }

    // Default file path if omitted
    if (!filePath) {
      const timestamp = Date.now();
      const rand = Math.floor(Math.random() * 10000);
      filePath = `capture_${timestamp}_${rand}.jpg`;
    }

    // 1. If Supabase is not configured or offline, gracefully return base64 URL
    if (!state.client || !state.client.storage) {
      return {
        success: false,
        fallback: true,
        url: typeof base64OrBlob === 'string' ? base64OrBlob : '',
        path: filePath,
        message: 'Storage offline: Using local image store.'
      };
    }

    try {
      let uploadBody = base64OrBlob;
      let contentType = 'image/jpeg';

      if (typeof base64OrBlob === 'string' && base64OrBlob.startsWith('data:')) {
        uploadBody = dataUrlToBlob(base64OrBlob);
        const mimeMatch = base64OrBlob.match(/^data:([^;]+);/);
        if (mimeMatch) contentType = mimeMatch[1];
      }

      if (!uploadBody) {
        return {
          success: false,
          fallback: true,
          url: base64OrBlob,
          path: filePath,
          error: 'Could not create binary payload from photo data.'
        };
      }

      const { data, error } = await state.client.storage
        .from(bucketName)
        .upload(filePath, uploadBody, {
          contentType: contentType,
          upsert: true
        });

      if (error) {
        console.warn(`Supabase Storage upload to [${bucketName}] failed:`, error.message);
        return {
          success: false,
          fallback: true,
          url: typeof base64OrBlob === 'string' ? base64OrBlob : '',
          path: filePath,
          error: error.message
        };
      }

      // Retrieve Public CDN URL
      const { data: pubData } = state.client.storage.from(bucketName).getPublicUrl(filePath);
      const publicUrl = pubData ? pubData.publicUrl : '';

      state.syncStats.syncedPhotos += 1;
      return {
        success: true,
        fallback: false,
        url: publicUrl || (typeof base64OrBlob === 'string' ? base64OrBlob : ''),
        path: filePath,
        bucket: bucketName
      };
    } catch (err) {
      console.warn('Storage upload exception, using fallback:', err);
      return {
        success: false,
        fallback: true,
        url: typeof base64OrBlob === 'string' ? base64OrBlob : '',
        path: filePath,
        error: err.message
      };
    }
  }

  // ==========================================================================
  // DATABASE SYNCHRONIZATION ENGINE
  // ==========================================================================

  // Sync Customer Record
  async function syncCustomer(customer) {
    if (!customer || !customer.id) return { success: false, error: 'Invalid customer' };
    if (!state.client || !state.client.from) {
      return { success: false, fallback: true, message: 'Offline mode: customer retained locally' };
    }

    try {
      const payload = {
        id: customer.id,
        name: customer.name || 'UNKNOWN JEWELLER',
        code: customer.code || '',
        address: customer.address || '',
        area: customer.area || '',
        region: customer.region || '',
        mobile: customer.mobile || '',
        bis: customer.bis || '',
        gst: customer.gst || '',
        state_code: customer.stateCode || customer.state_code || '',
        active_jobs: parseInt(customer.activeJobs || 0, 10),
        since: customer.since || ''
      };

      const { data, error } = await state.client.from('customers').upsert(payload, { onConflict: 'id' });
      if (error) throw error;
      state.syncStats.syncedCustomers += 1;
      return { success: true, data };
    } catch (err) {
      console.warn('Sync customer error:', err.message);
      return { success: false, error: err.message };
    }
  }

  // Sync Intake Batch & Piece Custody Records
  async function syncBatch(batch) {
    if (!batch || !batch.jobDocket) return { success: false, error: 'Invalid batch docket' };
    if (!state.client || !state.client.from) {
      return { success: false, fallback: true, message: 'Offline mode: batch retained locally' };
    }

    try {
      const batchPayload = {
        job_docket: batch.jobDocket,
        receipt_no: batch.receiptNo || '',
        customer: batch.customer || '',
        customer_address: batch.customerAddress || '',
        bis: batch.bis || '',
        customer_gst: batch.customerGst || '',
        customer_state_code: batch.customerStateCode || '',
        req_no: batch.reqNo || '',
        metal: batch.metal || 'Gold',
        article_type: batch.articleType || '',
        product_breakdown: batch.productBreakdown || '',
        pcs: parseInt(batch.pcs || 1, 10),
        purity: batch.purity || '22K 916',
        rate: parseFloat(batch.rate || 75.00),
        stream: batch.stream || '',
        tray: batch.tray || '',
        net_wt: parseFloat(batch.netWt || 0),
        gross_wt: parseFloat(batch.grossWt || 0),
        depositor: batch.depositor || '',
        receiver: batch.receiver || '',
        date: batch.date || '',
        time: batch.time || '',
        status: batch.status || 'RECEIVED',
        bill_no: batch.billNo || '',
        stage1_status: batch.stage1Status || 'PENDING',
        stage2_status: batch.stage2Status || 'PENDING',
        stage3_status: batch.stage3Status || 'PENDING',
        stage4_status: batch.stage4Status || 'PENDING',
        delivery_photos: batch.deliveryPhotos || [],
        visual_custody: batch.visualCustody || []
      };

      const { data, error } = await state.client.from('intake_batches').upsert(batchPayload, { onConflict: 'job_docket' });
      if (error) throw error;

      // Sync piece custody records
      if (Array.isArray(batch.visualCustody) && batch.visualCustody.length > 0) {
        const custodyRows = batch.visualCustody.map(p => ({
          id: `${batch.jobDocket}_p${p.pieceIndex}`,
          job_docket: batch.jobDocket,
          piece_index: p.pieceIndex,
          hsn_article: p.hsnArticle || '',
          gross_wt: parseFloat(p.grossWt || 0),
          net_wt: parseFloat(p.netWt || 0),
          tag_code: p.tagCode || '',
          stage_a: p.stageA || {},
          stage_b: p.stageB || {},
          stage_c: p.stageC || {},
          stage_d: p.stageD || {},
          status: p.status || 'PENDING',
          supervisor_override: p.supervisorOverride || null
        }));

        const { error: custErr } = await state.client.from('piece_custody_records').upsert(custodyRows, {
          onConflict: 'job_docket,piece_index'
        });
        if (custErr) console.warn('Piece custody sync notice:', custErr.message);
      }

      state.syncStats.syncedBatches += 1;
      return { success: true, data };
    } catch (err) {
      console.warn('Sync batch error:', err.message);
      return { success: false, error: err.message };
    }
  }

  // Sync Bill / Invoice Record
  async function syncBill(bill) {
    if (!bill || !bill.billNo) return { success: false, error: 'Invalid bill record' };
    if (!state.client || !state.client.from) {
      return { success: false, fallback: true, message: 'Offline mode: bill retained locally' };
    }

    try {
      const payload = {
        id: bill.id || bill.billNo,
        bill_no: bill.billNo,
        job_docket: bill.jobDocket || '',
        customer_name: bill.customerName || bill.customer || '',
        customer_bis: bill.customerBis || bill.bis || '',
        customer_gst: bill.customerGst || '',
        metal: bill.metal || 'Gold',
        pcs: parseInt(bill.pcs || 0, 10),
        gross_weight: parseFloat(bill.grossWeight || bill.grossWt || 0),
        net_weight: parseFloat(bill.netWeight || bill.netWt || 0),
        rate_per_piece: parseFloat(bill.ratePerPiece || bill.rate || 0),
        subtotal: parseFloat(bill.subtotal || 0),
        cgst: parseFloat(bill.cgst || 0),
        sgst: parseFloat(bill.sgst || 0),
        total_amount: parseFloat(bill.totalAmount || bill.total || 0),
        status: bill.status || 'PAID',
        payment_mode: bill.paymentMode || 'CASH',
        date: bill.date || '',
        time: bill.time || ''
      };

      const { data, error } = await state.client.from('bills').upsert(payload, { onConflict: 'bill_no' });
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Sync bill error:', err.message);
      return { success: false, error: err.message };
    }
  }

  // Sync Delivery Record
  async function syncDelivery(delivery) {
    if (!delivery || !delivery.jobDocket) return { success: false, error: 'Invalid delivery record' };
    if (!state.client || !state.client.from) {
      return { success: false, fallback: true, message: 'Offline mode: delivery retained locally' };
    }

    try {
      const payload = {
        job_docket: delivery.jobDocket,
        customer_name: delivery.customerName || delivery.customer || '',
        verified_pieces: parseInt(delivery.verifiedPieces || 0, 10),
        total_pieces: parseInt(delivery.totalPieces || delivery.pcs || 0, 10),
        recipient_name: delivery.recipientName || '',
        recipient_phone: delivery.recipientPhone || '',
        gatepass_number: delivery.gatepassNumber || '',
        dispatch_time: delivery.dispatchTime || '',
        status: delivery.status || 'COMPLETED',
        dossier_url: delivery.dossierUrl || '',
        stage_d_verified: Boolean(delivery.stageDVerified)
      };

      const { data, error } = await state.client.from('delivery_records').upsert(payload, { onConflict: 'job_docket' });
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Sync delivery error:', err.message);
      return { success: false, error: err.message };
    }
  }

  // Sync Lab Settings
  async function syncSettings(settings) {
    if (!settings) return { success: false, error: 'Invalid settings' };
    if (!state.client || !state.client.from) {
      return { success: false, fallback: true, message: 'Offline mode: settings saved locally' };
    }

    try {
      const payload = {
        id: 'primary_config',
        legal_name: settings.legalName || 'SSR BULLION HALLMARK & ASSAY CENTER PRIVATE LIMITED',
        recognition_no: settings.recognitionNo || 'AHC/WZ/2019/88492',
        gstin: settings.gstin || '27AAACS1482E1Z8',
        address: settings.address || '',
        phone: settings.phone || '',
        email: settings.email || '',
        parameters: settings.parameters || {},
        auto_cloud_sync: state.autoSync
      };

      const { data, error } = await state.client.from('lab_settings').upsert(payload, { onConflict: 'id' });
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Sync settings error:', err.message);
      return { success: false, error: err.message };
    }
  }

  // Push All Local State to Supabase
  async function pushAllData(localState) {
    if (!localState) return { success: false, error: 'No local state provided' };
    if (!state.client || !state.client.from) {
      return { success: false, error: 'Supabase client not connected. Configure credentials in Settings.' };
    }

    state.status = 'syncing';
    state.statusMessage = 'Pushing local records to Supabase Cloud...';
    notifyListeners('sync_start', {});

    const results = {
      customersSynced: 0,
      batchesSynced: 0,
      billsSynced: 0,
      deliveriesSynced: 0,
      settingsSynced: false,
      errors: []
    };

    try {
      // 1. Customers
      if (Array.isArray(localState.customers)) {
        for (const cust of localState.customers) {
          const res = await syncCustomer(cust);
          if (res.success) results.customersSynced += 1;
          else if (res.error) results.errors.push(`Customer ${cust.id}: ${res.error}`);
        }
      }

      // 2. Intake Batches
      if (Array.isArray(localState.intakeBatches)) {
        for (const batch of localState.intakeBatches) {
          const res = await syncBatch(batch);
          if (res.success) results.batchesSynced += 1;
          else if (res.error) results.errors.push(`Batch ${batch.jobDocket}: ${res.error}`);
        }
      }

      // 3. Bills
      const bills = localState.historicalInvoices || localState.billingItems || [];
      if (Array.isArray(bills)) {
        for (const bill of bills) {
          const res = await syncBill(bill);
          if (res.success) results.billsSynced += 1;
          else if (res.error) results.errors.push(`Bill ${bill.billNo}: ${res.error}`);
        }
      }

      // 4. Delivery Records
      const deliveries = localState.deliveryLedger || [];
      if (Array.isArray(deliveries)) {
        for (const deliv of deliveries) {
          const res = await syncDelivery(deliv);
          if (res.success) results.deliveriesSynced += 1;
          else if (res.error) results.errors.push(`Delivery ${deliv.jobDocket}: ${res.error}`);
        }
      }

      // 5. Lab Settings
      if (localState.settings || localState.labSettings) {
        const sRes = await syncSettings(localState.settings || localState.labSettings);
        if (sRes.success) results.settingsSynced = true;
      }

      state.status = 'connected';
      state.statusMessage = 'Cloud Synced';
      state.lastSyncTime = new Date().toISOString();
      storage.set('supabase_last_sync_time', state.lastSyncTime);

      notifyListeners('sync_complete', results);
      return { success: true, results };
    } catch (err) {
      state.status = 'error';
      state.statusMessage = 'Sync Error: ' + err.message;
      notifyListeners('sync_error', { error: err.message });
      return { success: false, error: err.message, results };
    }
  }

  // Pull All Remote Data from Supabase into Local Workspace
  async function pullAllData() {
    if (!state.client || !state.client.from) {
      return { success: false, error: 'Supabase client not connected.' };
    }

    state.status = 'syncing';
    state.statusMessage = 'Pulling records from Supabase Cloud...';
    notifyListeners('pull_start', {});

    try {
      // 1. Fetch Customers
      const { data: customers, error: cErr } = await state.client.from('customers').select('*');
      if (cErr) throw cErr;

      // 2. Fetch Intake Batches
      const { data: batches, error: bErr } = await state.client.from('intake_batches').select('*');
      if (bErr) throw bErr;

      // 3. Fetch Custody Records
      const { data: custodyRecords, error: pErr } = await state.client.from('piece_custody_records').select('*');
      if (pErr) console.warn('Piece custody pull notice:', pErr.message);

      // 4. Fetch Bills
      const { data: bills, error: billErr } = await state.client.from('bills').select('*');
      if (billErr) console.warn('Bills pull notice:', billErr.message);

      // 5. Fetch Delivery Records
      let deliveryRecords = [];
      try {
        const { data: deliveries, error: delivErr } = await state.client.from('delivery_records').select('*');
        if (!delivErr && Array.isArray(deliveries)) {
          deliveryRecords = deliveries;
        } else if (delivErr) {
          console.warn('Delivery records pull notice:', delivErr.message);
        }
      } catch (e) {
        console.warn('Delivery records pull exception:', e);
      }

      // 6. Fetch Lab Settings
      let fetchedSettings = null;
      try {
        const { data: settingsRows, error: sErr } = await state.client.from('lab_settings').select('*').limit(1);
        if (!sErr && Array.isArray(settingsRows) && settingsRows.length > 0) {
          fetchedSettings = settingsRows[0];
        }
      } catch (e) {}

      // Re-map column names to app camelCase conventions
      const mappedCustomers = (customers || []).map(c => ({
        id: c.id,
        name: c.name,
        code: c.code,
        address: c.address,
        area: c.area,
        region: c.region,
        mobile: c.mobile,
        bis: c.bis,
        gst: c.gst,
        stateCode: c.state_code,
        activeJobs: c.active_jobs,
        since: c.since
      }));

      const mappedBatches = (batches || []).map(b => {
        // Attach any pulled custody pieces if visual_custody is not already rich
        let vc = b.visual_custody || [];
        if (Array.isArray(custodyRecords)) {
          const piecesForBatch = custodyRecords.filter(p => p.job_docket === b.job_docket);
          if (piecesForBatch.length > 0 && vc.length === 0) {
            vc = piecesForBatch.map(p => ({
              pieceIndex: p.piece_index,
              hsnArticle: p.hsn_article,
              grossWt: p.gross_wt,
              netWt: p.net_wt,
              tagCode: p.tag_code,
              stageA: p.stage_a || {},
              stageB: p.stage_b || {},
              stageC: p.stage_c || {},
              stageD: p.stage_d || {},
              status: p.status,
              supervisorOverride: p.supervisor_override
            }));
          }
        }

        return {
          jobDocket: b.job_docket,
          receiptNo: b.receipt_no,
          customer: b.customer,
          customerAddress: b.customer_address,
          bis: b.bis,
          customerGst: b.customer_gst,
          customerStateCode: b.customer_state_code,
          reqNo: b.req_no,
          metal: b.metal,
          articleType: b.article_type,
          productBreakdown: b.product_breakdown,
          pcs: b.pcs,
          purity: b.purity,
          rate: b.rate,
          stream: b.stream,
          tray: b.tray,
          netWt: b.net_wt,
          grossWt: b.gross_wt,
          depositor: b.depositor,
          receiver: b.receiver,
          date: b.date,
          time: b.time,
          status: b.status,
          billNo: b.bill_no,
          stage1Status: b.stage1_status,
          stage2Status: b.stage2_status,
          stage3Status: b.stage3_status,
          stage4Status: b.stage4_status,
          deliveryPhotos: b.delivery_photos || [],
          visualCustody: vc
        };
      });

      const mappedBills = (bills || []).map(bl => ({
        id: bl.id,
        billNo: bl.bill_no,
        jobDocket: bl.job_docket,
        customerName: bl.customer_name,
        customerBis: bl.customer_bis,
        customerGst: bl.customer_gst,
        metal: bl.metal,
        pcs: bl.pcs,
        grossWeight: bl.gross_weight,
        netWeight: bl.net_weight,
        ratePerPiece: bl.rate_per_piece,
        subtotal: bl.subtotal,
        cgst: bl.cgst,
        sgst: bl.sgst,
        totalAmount: bl.total_amount,
        status: bl.status,
        paymentMode: bl.payment_mode,
        date: bl.date,
        time: bl.time
      }));

      const mappedDeliveries = deliveryRecords.map(d => ({
        jobDocket: d.job_docket,
        customer: d.customer_name,
        customerName: d.customer_name,
        verifiedPieces: d.verified_pieces,
        totalPieces: d.total_pieces,
        pcs: d.total_pieces,
        collector: d.recipient_name,
        recipientName: d.recipient_name,
        collectorId: d.recipient_phone,
        recipientPhone: d.recipient_phone,
        gatePassNo: d.gatepass_number,
        gatepassNumber: d.gatepass_number,
        dispatchTime: d.dispatch_time,
        status: d.status,
        dossierUrl: d.dossier_url,
        stageDVerified: d.stage_d_verified
      }));

      state.status = 'connected';
      state.statusMessage = 'Cloud Synced';
      state.lastSyncTime = new Date().toISOString();
      storage.set('supabase_last_sync_time', state.lastSyncTime);

      const pullResult = {
        customers: mappedCustomers,
        intakeBatches: mappedBatches,
        bills: mappedBills,
        deliveries: mappedDeliveries,
        settings: fetchedSettings
      };

      notifyListeners('pull_complete', pullResult);
      return { success: true, data: pullResult };
    } catch (err) {
      state.status = 'error';
      state.statusMessage = 'Pull Error: ' + err.message;
      notifyListeners('pull_error', { error: err.message });
      return { success: false, error: err.message };
    }
  }

  // ==========================================================================
  // DOM / UI INTEGRATION HELPERS
  // ==========================================================================

  // Update UI indicators in the Header and Settings
  function updateUIElements() {
    if (typeof document === 'undefined') return;

    // 1. Supabase Status Badge in Header
    const statusPill = document.getElementById('supabase-status-pill');
    const statusDot = document.getElementById('supabase-status-dot');
    const statusLabel = document.getElementById('supabase-status-label');

    if (statusPill && statusDot && statusLabel) {
      if (state.status === 'connected') {
        statusDot.className = 'w-2 h-2 rounded-full bg-emerald-500 relative';
        statusLabel.textContent = 'Cloud Synced';
        statusPill.title = 'Supabase Cloud Connected • Auto-Sync Active';
        statusPill.className = 'flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold cursor-pointer shadow-2xs hover:bg-emerald-100 transition-colors';
      } else if (state.status === 'syncing') {
        statusDot.className = 'w-2 h-2 rounded-full bg-amber-500 animate-pulse relative';
        statusLabel.textContent = 'Syncing...';
        statusPill.title = 'Synchronizing with Supabase PostgreSQL...';
        statusPill.className = 'flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold cursor-pointer shadow-2xs hover:bg-amber-100 transition-colors';
      } else if (state.status === 'connecting') {
        statusDot.className = 'w-2 h-2 rounded-full bg-blue-500 animate-ping relative';
        statusLabel.textContent = 'Connecting...';
        statusPill.title = 'Connecting to Supabase...';
        statusPill.className = 'flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold cursor-pointer shadow-2xs';
      } else if (state.status === 'error') {
        statusDot.className = 'w-2 h-2 rounded-full bg-rose-500 relative';
        statusLabel.textContent = 'Cloud Offline';
        statusPill.title = 'Supabase Connection Error: Click to view details';
        statusPill.className = 'flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold cursor-pointer shadow-2xs hover:bg-rose-100 transition-colors';
      } else {
        // Offline / Local
        statusDot.className = 'w-2 h-2 rounded-full bg-slate-400 relative';
        statusLabel.textContent = 'Local Mode';
        statusPill.title = 'Running in Local Storage Mode (Click to connect Supabase)';
        statusPill.className = 'flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold cursor-pointer shadow-2xs hover:bg-slate-200 transition-colors';
      }
    }

    // 2. Active User Role Indicator in Header
    const roleIndicator = document.getElementById('header-role-indicator');
    const roleDot = document.getElementById('header-role-dot');
    const roleText = document.getElementById('header-role-text');
    const userEmailText = document.getElementById('header-user-email');

    const role = state.currentRole || 'Admin';
    const roleCfg = ROLE_CONFIGS[role] || ROLE_CONFIGS['Admin'];

    if (roleDot) roleDot.className = `w-2.5 h-2.5 rounded-full ${roleCfg.bg} ring-2 ring-surface-container-lowest`;
    if (roleText) roleText.textContent = role.toUpperCase();
    if (userEmailText) {
      userEmailText.textContent = state.currentUser ? (state.currentUser.fullName || state.currentUser.email) : 'Sarah Jenkins';
    }
    if (roleIndicator) {
      roleIndicator.title = `Active Role: ${role} • Click to switch profile / sign out`;
    }

    // 3. Settings Form Inputs (if present)
    const settingsUrl = document.getElementById('supabase-config-url');
    const settingsKey = document.getElementById('supabase-config-key');
    const settingsAutoSync = document.getElementById('supabase-config-autosync');
    const settingsStatusBadge = document.getElementById('supabase-settings-status-badge');

    if (settingsUrl && !settingsUrl.matches(':focus')) settingsUrl.value = state.url || '';
    if (settingsKey && !settingsKey.matches(':focus')) settingsKey.value = state.anonKey || '';
    if (settingsAutoSync) settingsAutoSync.checked = state.autoSync;
    if (settingsStatusBadge) {
      settingsStatusBadge.textContent = state.statusMessage || state.status.toUpperCase();
      if (state.status === 'connected') settingsStatusBadge.className = 'font-data-mono text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-300';
      else if (state.status === 'error') settingsStatusBadge.className = 'font-data-mono text-xs px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 font-bold border border-rose-300';
      else settingsStatusBadge.className = 'font-data-mono text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-300';
    }
  }

  // Subscribe to status & auth events
  function subscribe(callback) {
    if (typeof callback === 'function') {
      state.listeners.push(callback);
    }
    return function unsubscribe() {
      state.listeners = state.listeners.filter(fn => fn !== callback);
    };
  }

  // Attempt to load Vercel Environment Variables via /api/config if not in localStorage
  async function loadVercelEnvConfig() {
    if (state.url && state.anonKey) return;
    try {
      if (typeof fetch === 'function' && typeof window !== 'undefined' && window.location && window.location.protocol.startsWith('http')) {
        const res = await fetch('/api/config');
        if (res.ok) {
          const cfg = await res.json();
          if (cfg.supabaseUrl && cfg.supabaseAnonKey) {
            state.url = cfg.supabaseUrl;
            state.anonKey = cfg.supabaseAnonKey;
            storage.set('supabase_url', state.url);
            storage.set('supabase_anon_key', state.anonKey);
            init();
          }
        }
      }
    } catch (e) {}
  }

  // Auto-initialize if running in browser
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      if (!state.url || !state.anonKey) {
        loadVercelEnvConfig();
      }
      init();
    }, 100);
  }

  // Public Interface
  return {
    state,
    config: state,
    LAB_ROLES,
    ROLE_CONFIGS,
    init,
    isConfigured,
    getClient,
    saveConfig,
    testConnection,
    signIn,
    signInWithOAuth,
    signUp,
    signOut,
    switchRole,
    getCurrentUser: () => state.currentUser,
    getCurrentRole: () => state.currentRole,
    uploadJewelleryPhoto,
    syncCustomer,
    syncBatch,
    syncBill,
    syncDelivery,
    syncSettings,
    pushAllData,
    pullAllData,
    subscribe,
    updateUIElements,
    dataUrlToBlob
  };
});
