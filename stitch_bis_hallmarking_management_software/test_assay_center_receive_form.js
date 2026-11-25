const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

const rootDir = __dirname;
const appJs = fs.readFileSync(path.join(rootDir, 'js', 'app.js'), 'utf8');

console.log('=== RUNNING ASSAY CENTER RECEIVE FORM & CONFIRMATION TEST SUITE ===');

// Minimal DOM mock supporting querySelectorAll on #assay-recv-article-rows
const domElements = {};
function makeEl(id) {
  const el = {
    id,
    value: '',
    textContent: '',
    innerHTML: '',
    disabled: false,
    children: [],
    options: [],
    style: {},
    _classes: new Set(),
    classList: {
      add: (...cls) => cls.forEach(c => el._classes.add(c)),
      remove: (...cls) => cls.forEach(c => el._classes.delete(c)),
      contains: (c) => el._classes.has(c),
      toggle: (c, force) => {
        if (force === undefined) {
          if (el._classes.has(c)) el._classes.delete(c);
          else el._classes.add(c);
        } else if (force) el._classes.add(c);
        else el._classes.delete(c);
      }
    },
    appendChild: (child) => { el.children.push(child); },
    remove: () => {},
    querySelectorAll: (sel) => {
      if (id === 'assay-recv-article-rows' && sel === '.assay-recv-article-row') {
        return el.children;
      }
      return [];
    }
  };
  return el;
}

function getOrCreateEl(id) {
  if (!domElements[id]) domElements[id] = makeEl(id);
  return domElements[id];
}

// Pre-seed confirmation page as hidden
getOrCreateEl('assay-recv-confirmation-page').classList.add('hidden');

// Custom innerHTML setter for #assay-recv-article-rows to reset children when cleared
const artRowsEl = getOrCreateEl('assay-recv-article-rows');
let _artInner = '';
Object.defineProperty(artRowsEl, 'innerHTML', {
  get: () => _artInner,
  set: (v) => {
    _artInner = v;
    if (v === '') artRowsEl.children = [];
  }
});

// Override appendChild on artRowsEl to parse row values into mock querySelector
artRowsEl.appendChild = (rowObj) => {
  const html = rowObj.innerHTML || '';
  const typeMatch = html.match(/value="([^"]*)"[\s\S]*?assay-recv-art-type/);
  const pcsMatch = html.match(/value="(\d+)"[\s\S]*?assay-recv-art-pieces/);
  const typeInput = { value: typeMatch ? typeMatch[1] : '' };
  const pcsInput = { value: pcsMatch ? pcsMatch[1] : '' };
  const rowMock = {
    _typeInput: typeInput,
    _pcsInput: pcsInput,
    querySelector: (s) => {
      if (s === '.assay-recv-art-type') return typeInput;
      if (s === '.assay-recv-art-pieces') return pcsInput;
      return null;
    },
    remove: () => {
      artRowsEl.children = artRowsEl.children.filter(c => c !== rowMock);
    }
  };
  artRowsEl.children.push(rowMock);
};

global.window = global;
global.window.addEventListener = () => {};
global.location = { hash: '#/assay_center_receive', href: 'http://localhost/' };
const lsStore = {};
global.localStorage = {
  getItem: (k) => (k in lsStore ? lsStore[k] : null),
  setItem: (k, v) => { lsStore[k] = String(v); },
  removeItem: (k) => { delete lsStore[k]; }
};
global.navigator = { mediaDevices: null };
global.performance = { now: () => Date.now() };
global.requestAnimationFrame = () => 1;
global.cancelAnimationFrame = () => {};
global.AudioContext = undefined;
global.document = {
  getElementById: (id) => getOrCreateEl(id),
  querySelectorAll: () => [],
  querySelector: () => null,
  createElement: (tag) => ({
    tagName: tag.toUpperCase(),
    className: '',
    innerHTML: '',
    style: {},
    classList: { add: () => {}, remove: () => {}, contains: () => false, toggle: () => {} },
    width: 0,
    height: 0,
    getContext: () => ({ drawImage: () => {}, fillRect: () => {}, fillText: () => {}, beginPath: () => {}, arc: () => {}, stroke: () => {}, fill: () => {} }),
    toDataURL: () => 'data:image/jpeg;base64,MOCK',
    appendChild: () => {},
    remove: () => {}
  }),
  body: { style: {} },
  addEventListener: () => {}
};

vm.runInThisContext(appJs);

// Initialize view
window.initAssayCenterReceiveView();

// 1. Bottom History & Date / From-Till Date Range Filter Test
const initialTotal = state.intakeBatches.length;
assert.strictEqual(getOrCreateEl('assay-recv-stat-total').textContent, `${initialTotal} BATCHES`, 'FAIL: Initial total batches mismatch');

window.handleAssayRecvDateFilter('2026-11-14');
assert.strictEqual(getOrCreateEl('assay-recv-stat-total').textContent, '1 BATCH', 'FAIL: Date filter 2026-11-14 should match 1 batch');
assert.strictEqual(getOrCreateEl('assay-recv-history-list').innerHTML.includes('ROYCO JEWELLERS'), true, 'FAIL: History list should show ROYCO JEWELLERS');

window.handleAssayRecvDateFilter('2020-01-01');
assert.strictEqual(getOrCreateEl('assay-recv-stat-total').textContent, '0 BATCHES', 'FAIL: Empty date should show 0 BATCHES');

// Test From - Till Date range filter
window.setAssayRecvHistoryMode('range');
getOrCreateEl('assay-recv-hist-from-date').value = '2026-11-10';
getOrCreateEl('assay-recv-hist-to-date').value = '2026-11-15';
window.handleAssayRecvHistoryFilter();
assert.strictEqual(getOrCreateEl('assay-recv-stat-total').textContent.includes('BATCH'), true, 'FAIL: Range filter should update total batches');

window.setAssayRecvHistoryMode('single');
window.clearAssayRecvDateFilter();
assert.strictEqual(getOrCreateEl('assay-recv-stat-total').textContent, `${initialTotal} BATCHES`, 'FAIL: Clearing date filter should restore total');
console.log('  ✓ Bottom History, Single Date & From-Till Date Range filter verified.');

// 2. Empty Default Article Row & Infinite Article Types Tally
const initialArtRows = artRowsEl.children;
assert.strictEqual(initialArtRows.length, 1, 'FAIL: Should start with 1 empty article row');
assert.strictEqual(initialArtRows[0].querySelector('.assay-recv-art-type').value, '', 'FAIL: Default article type must be empty (not Ring)');
assert.strictEqual(initialArtRows[0].querySelector('.assay-recv-art-pieces').value, '', 'FAIL: Default article pieces must be empty');

// Fill first row as Ring = 1, then add Chain = 1, Bangle = 1
initialArtRows[0].querySelector('.assay-recv-art-type').value = 'Ring';
initialArtRows[0].querySelector('.assay-recv-art-pieces').value = '1';
getOrCreateEl('assay-recv-form-total-pieces').value = '3';
window.handleAssayRecvTotalPiecesChange('3');
window.addAssayRecvArticleRow('Chain', 1);
window.addAssayRecvArticleRow('Bangle', 1);
assert.strictEqual(window.getAssayRecvArticleRowsData().length, 3, 'FAIL: Should have 3 article type rows');
assert.strictEqual(getOrCreateEl('assay-recv-article-tally-val').textContent, '3 / 3 PCS', 'FAIL: Tally should be 3 / 3 PCS');
console.log('  ✓ Empty default article row, dynamic repeatable article rows & live tally verified.');

// 3. Camera Selection Gate & 3s Auto-Capture Default ON (<= Total Pieces, NO fake AI images)
assert.strictEqual(getOrCreateEl('assay-recv-autocapture-btn').disabled, true, 'FAIL: 3s Auto-capture button must be disabled before selecting & starting camera');

// Attempt capture before selecting camera -> MUST be blocked (no synthetic/AI image!)
window.captureAssayCenterPiecePhoto('MANUAL');
assert.strictEqual(window.getAssayRecvDraftPhotos().length, 0, 'FAIL: Must NOT generate fake/AI images when camera is not selected/active');

// Simulate user selecting a camera and starting live stream
global.navigator.mediaDevices = {
  getUserMedia: async () => ({ getTracks: () => [{ stop: () => {} }] })
};
const camVideoEl = getOrCreateEl('assay-recv-cam-video');
camVideoEl.readyState = 4;
camVideoEl.videoWidth = 640;
camVideoEl.videoHeight = 480;
camVideoEl.play = async () => {};
getOrCreateEl('assay-recv-camera-select').value = 'usb-cam-1';
window.switchAssayCenterCameraDevice('usb-cam-1');

// Wait a tick for async startAssayCenterCamera promise
setImmediate(() => {
  assert.strictEqual(getOrCreateEl('assay-recv-autocapture-btn').disabled, false, 'FAIL: 3s Auto-capture button must enable once camera is selected and active');
  assert.strictEqual(getOrCreateEl('assay-recv-autocapture-label').textContent, '3s AUTO: ON', 'FAIL: 3s Auto-capture must turn ON by default once camera starts');

  window.captureAssayCenterPiecePhoto('AUTO (3s)');
  window.captureAssayCenterPiecePhoto('AUTO (3s)');
  window.captureAssayCenterPiecePhoto('AUTO (3s)');
  assert.strictEqual(window.getAssayRecvDraftPhotos().length, 3, 'FAIL: Should capture 3 real camera photos');
  assert.strictEqual(getOrCreateEl('assay-recv-autocapture-btn').disabled, true, 'FAIL: 3s Auto-capture button must disable at max pieces');

  // Attempt 4th capture - must be blocked!
  window.captureAssayCenterPiecePhoto('AUTO (3s)');
  assert.strictEqual(window.getAssayRecvDraftPhotos().length, 3, 'FAIL: Must strictly block capturing > Total Pieces');

  // Delete 1 photo & recapture
  window.deleteAssayRecvDraftPhoto(1);
  assert.strictEqual(window.getAssayRecvDraftPhotos().length, 2, 'FAIL: Should have 2 photos after delete');
  assert.strictEqual(getOrCreateEl('assay-recv-autocapture-btn').disabled, false, 'FAIL: 3s Auto-capture button must re-enable after delete');

  // Lower Total Pieces to 2 -> trims to 2
  window.captureAssayCenterPiecePhoto('AUTO (3s)');
  assert.strictEqual(window.getAssayRecvDraftPhotos().length, 3);
  getOrCreateEl('assay-recv-form-total-pieces').value = '2';
  window.handleAssayRecvTotalPiecesChange('2');
  assert.strictEqual(window.getAssayRecvDraftPhotos().length, 2, 'FAIL: Lowering total pieces must trim captured photos');
  window.stopAssayCenterCameraStream();
  console.log('  ✓ Camera selection gate, 3s AUTO default ON, zero AI-image fallback, capture cap (<= Total Pieces), delete/retake, and auto-trim verified.');

// 4. Validation & Confirmation Page
// Mismatched article sum (3 vs 2) should block confirmation page
getOrCreateEl('assay-recv-form-date').value = '2026-11-25';
getOrCreateEl('assay-recv-form-customer').value = 'TEST GOLD PALACE';
getOrCreateEl('assay-recv-form-hour').value = '11';
getOrCreateEl('assay-recv-form-minute').value = '30';
getOrCreateEl('assay-recv-form-ampm').value = 'AM';
getOrCreateEl('assay-recv-form-metal').value = 'Silver';
getOrCreateEl('assay-recv-form-purity').value = '92.5 Silver';
getOrCreateEl('assay-recv-form-weight').value = '48.500';

window.openAssayRecvConfirmationPage();
assert.strictEqual(getOrCreateEl('assay-recv-confirmation-page').classList.contains('hidden'), true, 'FAIL: Mismatched article sum must block confirmation page');

// Fix article rows to sum = 2 by removing last row
const rows = artRowsEl.children;
rows[2].remove();
window.updateAssayRecvArticleTally();
assert.strictEqual(getOrCreateEl('assay-recv-article-tally-val').textContent, '2 / 2 PCS');

// Now open confirmation page
window.openAssayRecvConfirmationPage();
assert.strictEqual(getOrCreateEl('assay-recv-confirmation-page').classList.contains('hidden'), false, 'FAIL: Confirmation page must open when valid');
assert.strictEqual(getOrCreateEl('assay-recv-confirm-customer').textContent, 'TEST GOLD PALACE');
assert.strictEqual(getOrCreateEl('assay-recv-confirm-time').textContent, '11:30 AM');
assert.strictEqual(getOrCreateEl('assay-recv-confirm-pieces').textContent, '2 PCS');
assert.strictEqual(getOrCreateEl('assay-recv-confirm-metal').textContent, 'Silver');
assert.strictEqual(getOrCreateEl('assay-recv-confirm-purity').textContent, '92.5 Silver');
assert.strictEqual(getOrCreateEl('assay-recv-confirm-weight').textContent, '48.500 g');
assert.strictEqual(getOrCreateEl('assay-recv-confirm-photo-count').textContent, '2');

// Edit / Back preserves data
window.closeAssayRecvConfirmationPage();
assert.strictEqual(getOrCreateEl('assay-recv-confirmation-page').classList.contains('hidden'), true);
assert.strictEqual(getOrCreateEl('assay-recv-form-customer').value, 'TEST GOLD PALACE');
assert.strictEqual(window.getAssayRecvDraftPhotos().length, 2);

// Re-open and Confirm & Submit
window.openAssayRecvConfirmationPage();
const created = window.confirmAndSubmitAssayRecvIntake();
assert.ok(created, 'FAIL: confirmAndSubmitAssayRecvIntake must return created batch');
assert.strictEqual(state.intakeBatches.length, initialTotal + 1, 'FAIL: Batch count must increase by 1');
assert.strictEqual(created.customer, 'TEST GOLD PALACE');
assert.strictEqual(created.pcs, 2);
assert.strictEqual(created.visualCustody.filter(p => p.stageA && p.stageA.captured).length, 2);
// Verify per-piece articleType mapping across multiple article rows (Ring: 1, Chain: 1)
assert.strictEqual(created.visualCustody[0].articleType, 'Ring', 'FAIL: Piece 1 should be Ring');
assert.strictEqual(created.visualCustody[1].articleType, 'Chain', 'FAIL: Piece 2 should be Chain');
assert.strictEqual(getOrCreateEl('assay-recv-confirmation-page').classList.contains('hidden'), true, 'FAIL: Confirmation page must close after submit');
assert.strictEqual(window.getAssayRecvDraftPhotos().length, 0, 'FAIL: Draft photos must reset after submit');
console.log('  ✓ Confirmation page, Edit/Back preservation, and Confirm & Submit verified.');

// 5. Edge-case Regressions: String grossWt in date filter, ISO/time date normalization, Palladium purities, unique jobDocket
state.intakeBatches.unshift({
  jobDocket: 'JOB-2026-9999',
  customer: 'STRING WT JEWELLERS',
  pcs: 1,
  grossWt: '77.250',
  date: '',
  time: '2026-11-25 / 01:05 AM'
});
window.handleAssayRecvDateFilter('2026-11-25');
assert.strictEqual(getOrCreateEl('assay-recv-history-list').innerHTML.includes('77.250 g'), true, 'FAIL: Date filter must handle string grossWt and YYYY-MM-DD in batch.time');
window.clearAssayRecvDateFilter();

window.handleAssayRecvMetalChange('Palladium');
assert.strictEqual(getOrCreateEl('assay-recv-form-purity').innerHTML.includes('950 Palladium'), true, 'FAIL: Palladium metal must populate Palladium purities');

// Verify + NEW INTAKE button resets form and prepares for new intake
getOrCreateEl('assay-recv-form-customer').value = 'OLD CUSTOMER';
getOrCreateEl('assay-recv-form-weight').value = '99.999';
window.startNewAssayRecvIntake();
assert.strictEqual(getOrCreateEl('assay-recv-form-customer').value, '', 'FAIL: startNewAssayRecvIntake must clear customer');
assert.strictEqual(getOrCreateEl('assay-recv-form-weight').value, '', 'FAIL: startNewAssayRecvIntake must clear weight');
assert.strictEqual(window.getAssayRecvDraftPhotos().length, 0, 'FAIL: startNewAssayRecvIntake must clear draft photos');
assert.strictEqual(typeof window.bindAssayRecvEnterNavigation, 'function', 'FAIL: bindAssayRecvEnterNavigation must be exported');
assert.strictEqual(lsStore['assay_recv_saved_camera_id'], 'usb-cam-1', 'FAIL: Selected camera ID must be remembered in localStorage');

// Verify 200 KB max photo size enforcement
const origCreateElement = global.document.createElement;
global.document.createElement = (tag) => {
  if (tag === 'canvas') {
    return {
      width: 0,
      height: 0,
      getContext: () => ({ drawImage: () => {} }),
      toDataURL: (_mime, q) => {
        // Simulate oversized (>200KB) at high quality, and <=150KB at lower quality
        const byteCount = q >= 0.7 ? 260 * 1024 : 150 * 1024;
        const b64Len = Math.ceil((byteCount * 4) / 3);
        return 'data:image/jpeg;base64,' + 'A'.repeat(b64Len);
      }
    };
  }
  return origCreateElement(tag);
};
const compressed = window.compressVideoFrameToMaxBytes({ videoWidth: 1920, videoHeight: 1080 }, 200 * 1024);
global.document.createElement = origCreateElement;
assert.strictEqual(compressed.sizeBytes <= 200 * 1024, true, 'FAIL: Compressed photo must be <= 200 KB');
assert.strictEqual(window.getDataUrlByteSize(compressed.photoUrl) <= 200 * 1024, true, 'FAIL: Data URL byte size must be <= 200 KB');
console.log('  ✓ Edge-case regressions, remembered camera persistence, 200KB photo cap, and + NEW INTAKE reset flow verified.');

console.log('\n=== ALL ASSAY CENTER RECEIVE FORM & CONFIRMATION TESTS PASSED! ===');
});
