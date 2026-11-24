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
  const pcsInput = { value: pcsMatch ? pcsMatch[1] : '1' };
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
global.localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
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

// 1. Date Filter Test
const initialTotal = state.intakeBatches.length;
assert.strictEqual(getOrCreateEl('assay-recv-stat-total').textContent, `${initialTotal} BATCHES`, 'FAIL: Initial total batches mismatch');

window.handleAssayRecvDateFilter('2026-11-14');
assert.strictEqual(getOrCreateEl('assay-recv-stat-total').textContent, '1 BATCH', 'FAIL: Date filter 2026-11-14 should match 1 batch');
assert.strictEqual(getOrCreateEl('assay-recv-date-results').innerHTML.includes('ROYCO JEWELLERS'), true, 'FAIL: Date results should show ROYCO JEWELLERS');

window.handleAssayRecvDateFilter('2020-01-01');
assert.strictEqual(getOrCreateEl('assay-recv-stat-total').textContent, '0 BATCHES', 'FAIL: Empty date should show 0 BATCHES');

window.clearAssayRecvDateFilter();
assert.strictEqual(getOrCreateEl('assay-recv-stat-total').textContent, `${initialTotal} BATCHES`, 'FAIL: Clearing date filter should restore total');
console.log('  ✓ Date filter & TOTAL INTAKE BATCHES verified.');

// 2. Infinite Article Types & Tally
getOrCreateEl('assay-recv-form-total-pieces').value = '3';
window.handleAssayRecvTotalPiecesChange('3');
// Currently 1 row ('Ring', 1). Add 2 more rows: 'Chain' (1), 'Bangle' (1)
window.addAssayRecvArticleRow('Chain', 1);
window.addAssayRecvArticleRow('Bangle', 1);
assert.strictEqual(window.getAssayRecvArticleRowsData().length, 3, 'FAIL: Should have 3 article type rows');
assert.strictEqual(getOrCreateEl('assay-recv-article-tally-val').textContent, '3 / 3 PCS', 'FAIL: Tally should be 3 / 3 PCS');
console.log('  ✓ Dynamic repeatable article type rows & live tally verified.');

// 3. Direct Camera Capture Cap (<= Total Pieces)
window.captureAssayCenterPiecePhoto('MANUAL');
window.captureAssayCenterPiecePhoto('MANUAL');
window.captureAssayCenterPiecePhoto('MANUAL');
assert.strictEqual(window.getAssayRecvDraftPhotos().length, 3, 'FAIL: Should capture 3 photos');
assert.strictEqual(getOrCreateEl('assay-recv-snap-btn').disabled, true, 'FAIL: Snap button must disable at max pieces');

// Attempt 4th capture - must be blocked!
window.captureAssayCenterPiecePhoto('MANUAL');
assert.strictEqual(window.getAssayRecvDraftPhotos().length, 3, 'FAIL: Must strictly block capturing > Total Pieces');

// Delete 1 photo & recapture
window.deleteAssayRecvDraftPhoto(1);
assert.strictEqual(window.getAssayRecvDraftPhotos().length, 2, 'FAIL: Should have 2 photos after delete');
assert.strictEqual(getOrCreateEl('assay-recv-snap-btn').disabled, false, 'FAIL: Snap button must re-enable after delete');

// Lower Total Pieces to 2 -> trims to 2
window.captureAssayCenterPiecePhoto('MANUAL');
assert.strictEqual(window.getAssayRecvDraftPhotos().length, 3);
getOrCreateEl('assay-recv-form-total-pieces').value = '2';
window.handleAssayRecvTotalPiecesChange('2');
assert.strictEqual(window.getAssayRecvDraftPhotos().length, 2, 'FAIL: Lowering total pieces must trim captured photos');
console.log('  ✓ Direct camera capture cap (<= Total Pieces), delete/retake, and auto-trim verified.');

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
assert.strictEqual(getOrCreateEl('assay-recv-confirmation-page').classList.contains('hidden'), true, 'FAIL: Confirmation page must close after submit');
assert.strictEqual(window.getAssayRecvDraftPhotos().length, 0, 'FAIL: Draft photos must reset after submit');
console.log('  ✓ Confirmation page, Edit/Back preservation, and Confirm & Submit verified.');

console.log('\n=== ALL ASSAY CENTER RECEIVE FORM & CONFIRMATION TESTS PASSED! ===');
