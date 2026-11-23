/**
 * Deep Test Suite for Jewellery Barcode Tag Printing & Hardware Calibration
 */
const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== RUNNING JEWELLERY TAG PRINTING & CALIBRATION TEST SUITE ===\n');

const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const jsContent = fs.readFileSync(path.join(__dirname, 'js', 'app.js'), 'utf8');

// Test Suite 1: index.html Structure & UI Controls
console.log('[Suite 1] UI Controls & Preset Structure Verification:');

// Presets
assert(htmlContent.includes('id="tag-preset-butterfly-84"'), 'Missing tag-preset-butterfly-84');
assert(htmlContent.includes('id="tag-preset-rattail-84"'), 'Missing tag-preset-rattail-84');
assert(htmlContent.includes('id="tag-preset-rattail-75"'), 'Missing tag-preset-rattail-75');
assert(htmlContent.includes('id="tag-preset-butterfly"'), 'Missing tag-preset-butterfly');
assert(htmlContent.includes('id="tag-preset-dumbbell"'), 'Missing tag-preset-dumbbell');
assert(htmlContent.includes('id="tag-preset-pouch"'), 'Missing tag-preset-pouch');
assert(htmlContent.includes('id="tag-preset-custom"'), 'Missing tag-preset-custom');
console.log('  ✓ All Jewellery Tag presets (Butterfly 84x12, Rat-Tail 84x12, 75x12, 50x12, 48x26, 60x30, Custom) verified.');

// Inputs
assert(htmlContent.includes('id="tag-print-width"'), 'Missing tag-print-width input');
assert(htmlContent.includes('id="tag-print-height"'), 'Missing tag-print-height input');
assert(htmlContent.includes('id="tag-print-unit"'), 'Missing tag-print-unit select');
assert(htmlContent.includes('id="tag-print-layout"'), 'Missing tag-print-layout select');
console.log('  ✓ Dimension inputs and Layout Zone selector verified.');

// Hardware Calibration
assert(htmlContent.includes('id="tag-cal-top"'), 'Missing tag-cal-top input');
assert(htmlContent.includes('id="tag-cal-left"'), 'Missing tag-cal-left input');
assert(htmlContent.includes('id="tag-cal-bottom"'), 'Missing tag-cal-bottom input');
assert(htmlContent.includes('id="tag-cal-gap"'), 'Missing tag-cal-gap input (Bridge / Notch Gap)');
assert(htmlContent.includes('id="tag-cal-font-scale"'), 'Missing tag-cal-font-scale input');
console.log('  ✓ Thermal printer hardware margin calibration controls (Top, Left, Bottom, Bridge Gap, Font Zoom) verified.');

// Action Buttons
assert(htmlContent.includes('id="btn-print-tags"'), 'Missing btn-print-tags');
assert(htmlContent.includes('id="btn-print-tags-bottom"'), 'Missing btn-print-tags-bottom');
assert(htmlContent.includes('id="btn-open-tag-tab"'), 'Missing btn-open-tag-tab');
assert(htmlContent.includes('id="btn-open-tag-tab-bottom"'), 'Missing btn-open-tag-tab-bottom');
console.log('  ✓ Print Tags and Preview/PDF export buttons verified.');

// Test Suite 2: Mock DOM Execution of Tag Engine & Real app.js Loading
console.log('\n[Suite 2] JS Tag Engine Execution & Calibration Logic:');

// Create mock browser environment
const mockElements = {
  'tag-print-width': { value: '84' },
  'tag-print-height': { value: '12' },
  'tag-print-unit': { value: 'mm' },
  'tag-print-layout': { value: 'split' },
  'tag-cal-top': { value: '0.8' },
  'tag-cal-left': { value: '1.2' },
  'tag-cal-bottom': { value: '0.8' },
  'tag-cal-gap': { value: '12' },
  'tag-cal-font-scale': { value: '100' },
  'tag-opt-cust': { checked: true },
  'tag-opt-ornament': { checked: true },
  'tag-opt-huid': { checked: true },
  'tag-opt-qr': { checked: true },
  'btn-print-tags': { disabled: true, classList: { remove() {}, add() {} }, setAttribute() {}, removeAttribute() {} },
  'btn-print-tags-bottom': { disabled: true, classList: { remove() {}, add() {} }, setAttribute() {}, removeAttribute() {} },
  'btn-open-tag-tab': { disabled: true, classList: { remove() {}, add() {} }, setAttribute() {}, removeAttribute() {} },
  'btn-open-tag-tab-bottom': { disabled: true, classList: { remove() {}, add() {} }, setAttribute() {}, removeAttribute() {} },
  'tag-mini-preview': { style: {}, innerHTML: '' },
  'tag-preview-dims-label': { textContent: '' },
  'tag-preset-butterfly-84': { className: '' },
  'tag-preset-rattail-84': { className: '' },
  'tag-preset-rattail-75': { className: '' },
  'tag-preset-butterfly': { className: '' },
  'tag-preset-dumbbell': { className: '' },
  'tag-preset-pouch': { className: '' },
  'tag-preset-custom': { className: '' }
};

global.document = {
  getElementById(id) {
    return mockElements[id] || null;
  },
  querySelectorAll() {
    return [];
  },
  createElement(tag) {
    return { id: '', style: {}, setAttribute() {}, remove() {}, contentWindow: { document: { open() {}, write() {}, close() {} } } };
  },
  body: { appendChild() {}, removeChild() {} }
};

global.window = {
  addEventListener() {},
  open() { return { document: { open() {}, write() {}, close() {} }, focus() {} }; }
};

// Evaluate QRCode library and app.js
const qrcodeCode = fs.readFileSync(path.join(__dirname, 'js', 'qrcode.min.js'), 'utf8');
eval(qrcodeCode);
eval(jsContent);

assert(typeof window.onTagPresetChanged === 'function', 'Missing window.onTagPresetChanged');
assert(typeof window.updateTagMiniPreview === 'function', 'Missing window.updateTagMiniPreview');
assert(typeof window.buildTagPrintDocument === 'function', 'Missing window.buildTagPrintDocument');
assert(typeof window.printCustomTags === 'function', 'Missing window.printCustomTags');
assert(typeof window.openTagPrintTab === 'function', 'Missing window.openTagPrintTab');
console.log('  ✓ Core functions implemented and properly exported to window.');

// Test Suite 3: Print Document Geometry & Output Verification
console.log('\n[Suite 3] Print Document Geometry & Tag Layout Rendering:');

// Case 1: Butterfly Dual-Zone (84x12mm with 12mm Bridge Gap)
window.onTagPresetChanged('butterfly-84');
assert.strictEqual(mockElements['tag-print-width'].value, 84);
assert.strictEqual(mockElements['tag-print-height'].value, 12);
assert.strictEqual(mockElements['tag-cal-gap'].value, 12);
assert.strictEqual(mockElements['tag-print-layout'].value, 'split');

const butterflyDoc = window.buildTagPrintDocument(false);
assert(butterflyDoc.includes('size: 84mm 12mm'), 'Missing @page 84mm 12mm');
assert(butterflyDoc.includes('tag-head'), 'Missing tag-head container');
assert(butterflyDoc.includes('tag-bridge'), 'Missing tag-bridge gap container');
assert(butterflyDoc.includes('tag-tail'), 'Missing tag-tail container');
assert(butterflyDoc.includes('ROYCO JEWELLERS'), 'Missing customer name');
assert(butterflyDoc.includes('SCAN QR'), 'Missing SCAN QR in tail');
assert(butterflyDoc.includes('.print-tag:last-child'), 'Missing print-tag:last-child page break rule');
assert(butterflyDoc.includes('page-break-after: auto !important'), 'Missing page-break-after auto rule for last child');
console.log('  ✓ 84×12mm Butterfly dual-zone document verified (Head + 12mm Bridge Gap + Tail + Zero trailing blank pages).');

// Case 2: Rat-Tail (84x12mm with gap 0)
window.onTagPresetChanged('rattail-84');
assert.strictEqual(mockElements['tag-cal-gap'].value, 0);
const rattailDoc = window.buildTagPrintDocument(false);
assert(rattailDoc.includes('size: 84mm 12mm'), 'Missing @page 84mm 12mm');
assert(rattailDoc.includes('tag-head'), 'Missing tag-head container');
assert(rattailDoc.includes('tag-tail'), 'Missing tag-tail container');
console.log('  ✓ 84×12mm Rat-tail tag geometry verified.');

// Case 3: Compact Butterfly Tag (50x12mm)
window.onTagPresetChanged('butterfly');
assert.strictEqual(mockElements['tag-print-width'].value, 50);
assert.strictEqual(mockElements['tag-print-height'].value, 12);
assert.strictEqual(mockElements['tag-print-layout'].value, 'compact');
const compactDoc = window.buildTagPrintDocument(false);
assert(compactDoc.includes('size: 50mm 12mm'), 'Missing @page 50mm 12mm');
assert(compactDoc.includes('tag-compact-mode'), 'Missing tag-compact-mode container');
console.log('  ✓ 50×12mm Compact Butterfly tag geometry verified.');

// Case 4: Hardware Calibration Offset Adjustments
mockElements['tag-print-layout'].value = 'split';
mockElements['tag-cal-top'].value = 1.2;
mockElements['tag-cal-left'].value = 2.0;
mockElements['tag-cal-bottom'].value = 1.0;
mockElements['tag-cal-gap'].value = 14;
const calDoc = window.buildTagPrintDocument(false);
assert(calDoc.includes('padding-top:1.20mm'), 'Missing padding-top:1.20mm');
assert(calDoc.includes('padding-left:2.00mm'), 'Missing padding-left:2.00mm');
assert(calDoc.includes('padding-bottom:1.00mm'), 'Missing padding-bottom:1.00mm');
assert(calDoc.includes('width:14mm'), 'Missing bridge width:14mm');
console.log('  ✓ Hardware margin offsets (Top 1.2mm, Left 2.0mm, Bottom 1.0mm, Gap 14mm) applied with precision.');

console.log('\n=== ALL JEWELLERY TAG PRINTING & CALIBRATION TESTS PASSED SUCCESSFULLY! ===');
