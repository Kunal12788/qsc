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
assert(htmlContent.includes('id="tag-preset-50-15"'), 'Missing tag-preset-50-15 (Default 50x15mm preset)');
assert(htmlContent.includes('id="tag-preset-50-10"'), 'Missing tag-preset-50-10');
assert(htmlContent.includes('id="tag-preset-butterfly-84"'), 'Missing tag-preset-butterfly-84');
assert(htmlContent.includes('id="tag-preset-rattail-84"'), 'Missing tag-preset-rattail-84');
assert(htmlContent.includes('id="tag-preset-rattail-75"'), 'Missing tag-preset-rattail-75');
assert(htmlContent.includes('id="tag-preset-butterfly"'), 'Missing tag-preset-butterfly');
assert(htmlContent.includes('id="tag-preset-dumbbell"'), 'Missing tag-preset-dumbbell');
assert(htmlContent.includes('id="tag-preset-custom"'), 'Missing tag-preset-custom');
console.log('  ✓ All Jewellery Tag presets (Default 50x15, 50x10, Butterfly 84x12, Rat-Tail 84x12, 75x12, 50x12, 48x26, Custom) verified.');

// Inputs
assert(htmlContent.includes('id="tag-custom-width" value="50"'), 'Width custom input default not 50mm');
assert(htmlContent.includes('id="tag-custom-height" value="15"'), 'Height custom input default not 15mm');
assert(htmlContent.includes('id="tag-print-width" value="50"'), 'Width default not 50mm');
assert(htmlContent.includes('id="tag-print-height" value="15"'), 'Height default not 15mm');
assert(htmlContent.includes('id="tag-print-unit"'), 'Missing tag-print-unit select');
assert(htmlContent.includes('id="tag-print-layout"'), 'Missing tag-print-layout select');
console.log('  ✓ Dimension inputs (50mm width x 15mm height default) and Layout Zone selector verified.');

// Hardware Calibration
assert(htmlContent.includes('id="tag-cal-top" value="0.5"'), 'Top margin default not 0.5mm');
assert(htmlContent.includes('id="tag-cal-left" value="0.5"'), 'Left margin default not 0.5mm');
assert(htmlContent.includes('id="tag-cal-bottom" value="0.5"'), 'Bottom margin default not 0.5mm');
assert(htmlContent.includes('id="tag-cal-gap" value="0"'), 'Bridge gap default not 0mm');
assert(htmlContent.includes('id="tag-cal-font-scale"'), 'Missing tag-cal-font-scale input');
console.log('  ✓ Thermal printer hardware margin calibration controls (Little Margins 0.5mm, Bridge Gap 0mm, Font Zoom) verified.');

// Action Buttons
assert(htmlContent.includes('id="btn-print-tags"'), 'Missing btn-print-tags');
assert(htmlContent.includes('id="btn-print-tags-bottom"'), 'Missing btn-print-tags-bottom');
assert(htmlContent.includes('id="btn-open-tag-tab"'), 'Missing btn-open-tag-tab');
assert(htmlContent.includes('id="btn-open-tag-tab-bottom"'), 'Missing btn-open-tag-tab-bottom');
assert(htmlContent.includes('id="tag-weight-both"'), 'Missing tag-weight-both radio');
assert(htmlContent.includes('id="tag-weight-gross-only"'), 'Missing tag-weight-gross-only radio');
assert(htmlContent.includes('id="tag-no-with"'), 'Missing tag-no-with radio');
assert(htmlContent.includes('id="tag-no-without"'), 'Missing tag-no-without radio');
assert(htmlContent.includes('id="modal-tag-print-options"'), 'Missing modal-tag-print-options modal');
assert(htmlContent.includes('id="btn-confirm-print-with-tag"'), 'Missing btn-confirm-print-with-tag');
assert(htmlContent.includes('id="btn-confirm-print-without-tag"'), 'Missing btn-confirm-print-without-tag');
assert(htmlContent.includes('id="tag-tspl-dpi"'), 'Missing tag-tspl-dpi');
assert(htmlContent.includes('id="tag-tspl-density"'), 'Missing tag-tspl-density');
assert(htmlContent.includes('id="btn-tspl-print-usb"'), 'Missing btn-tspl-print-usb');
assert(htmlContent.includes('id="btn-tspl-download-prn"'), 'Missing btn-tspl-download-prn');
console.log('  ✓ Print Tags, Weight Display Mode, Tag No Display Mode (With vs Without), Print Prompt Modal & TSC TSPL2 controls verified.');

// Test Suite 2: Mock DOM Execution of Tag Engine & Real app.js Loading
console.log('\n[Suite 2] JS Tag Engine Execution & Calibration Logic:');

// Create mock browser environment
const mockElements = {
  'tag-print-width': { value: '50' },
  'tag-custom-width': { value: '50' },
  'tag-print-height': { value: '15' },
  'tag-custom-height': { value: '15' },
  'tag-print-unit': { value: 'mm' },
  'tag-print-layout': { value: 'split' },
  'tag-cal-top': { value: '0.5' },
  'tag-cal-left': { value: '0.5' },
  'tag-cal-bottom': { value: '0.5' },
  'tag-cal-gap': { value: '0' },
  'tag-cal-font-scale': { value: '100' },
  'tag-tspl-dpi': { value: '203' },
  'tag-tspl-density': { value: '12' },
  'tag-tspl-speed': { value: '3' },
  'tag-tspl-gap': { value: '2' },
  'tag-opt-cust': { checked: true },
  'tag-opt-ornament': { checked: true },
  'tag-opt-huid': { checked: true },
  'tag-opt-qr': { checked: true },
  'tag-weight-both': { checked: true },
  'tag-weight-gross-only': { checked: false },
  'tag-no-with': { checked: true },
  'tag-no-without': { checked: false },
  'btn-print-tags': { disabled: true, classList: { remove() {}, add() {} }, setAttribute() {}, removeAttribute() {} },
  'btn-print-tags-bottom': { disabled: true, classList: { remove() {}, add() {} }, setAttribute() {}, removeAttribute() {} },
  'btn-open-tag-tab': { disabled: true, classList: { remove() {}, add() {} }, setAttribute() {}, removeAttribute() {} },
  'btn-open-tag-tab-bottom': { disabled: true, classList: { remove() {}, add() {} }, setAttribute() {}, removeAttribute() {} },
  'tag-mini-preview': { style: {}, innerHTML: '' },
  'tag-preview-dims-label': { textContent: '' },
  'tag-preset-50-15': { className: '' },
  'tag-preset-50-10': { className: '' },
  'tag-preset-butterfly-84': { className: '' },
  'tag-preset-rattail-84': { className: '' },
  'tag-preset-rattail-75': { className: '' },
  'tag-preset-butterfly': { className: '' },
  'tag-preset-dumbbell': { className: '' },
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
assert(window.tagConfig && window.tagConfig.wMm === 50 && window.tagConfig.hMm === 15, 'tagConfig wMm: 50, hMm: 15 default verified');
console.log('  ✓ Core functions implemented, default tagConfig (wMm: 50, hMm: 15, layout: split) and properly exported to window.');

// Test Suite 3: Print Document Geometry & Output Verification
console.log('\n[Suite 3] Print Document Geometry & Tag Layout Rendering:');

// Case 0: Default 50x15mm Tag (5cm x 1.5cm) with 0.5mm little margins, 100% full-width customer name, 50/50 bottom split & even spacing
window.onTagPresetChanged('50-15');
assert.strictEqual(mockElements['tag-print-width'].value, 50);
assert.strictEqual(mockElements['tag-custom-width'].value, 50);
assert.strictEqual(mockElements['tag-print-height'].value, 15);
assert.strictEqual(mockElements['tag-custom-height'].value, 15);
assert.strictEqual(mockElements['tag-cal-top'].value, 0.5);
assert.strictEqual(mockElements['tag-cal-left'].value, 0.5);
assert.strictEqual(mockElements['tag-cal-bottom'].value, 0.5);
assert.strictEqual(mockElements['tag-cal-gap'].value, 0);
assert.strictEqual(mockElements['tag-print-layout'].value, 'split');

const defaultDoc = window.buildTagPrintDocument(false);
assert(defaultDoc.includes('size: 50mm 15mm'), 'Missing @page 50mm 15mm');
assert(defaultDoc.includes('padding-top:0.50mm'), 'Missing padding-top:0.50mm');
assert(defaultDoc.includes('padding-left:0.50mm'), 'Missing padding-left:0.50mm');
assert(defaultDoc.includes('padding-bottom:0.50mm'), 'Missing padding-bottom:0.50mm');
assert(defaultDoc.includes('tag-customer-header'), 'Missing 100% width tag-customer-header');
assert(defaultDoc.includes('width:24.5mm'), 'Missing equal 24.5mm left half');
assert(defaultDoc.includes('justify-content:flex-start; gap:0.22mm'), 'Missing uniform even line spacing');
assert(defaultDoc.includes('tag-head'), 'Missing tag-head container');
assert(defaultDoc.includes('tag-tail'), 'Missing tag-tail container');
assert(defaultDoc.includes('ROYCO JEWELLERS'), 'Missing customer name');
assert(defaultDoc.includes('TAG NO : Q1'), 'Missing TAG NO : Q1');
assert(defaultDoc.includes('GROSS WEIGHT:'), 'Missing GROSS WEIGHT');
assert(defaultDoc.includes('NET WEIGHT:'), 'Missing NET WEIGHT in Both mode');
assert(!defaultDoc.includes('SCAN QR'), 'SCAN QR should be removed from right half');

// Test Gross Weight Only mode
mockElements['tag-weight-both'].checked = false;
mockElements['tag-weight-gross-only'].checked = true;
const grossOnlyDoc = window.buildTagPrintDocument(false);
assert(grossOnlyDoc.includes('GROSS WEIGHT:'), 'Missing GROSS WEIGHT in Gross Only mode');
assert(!grossOnlyDoc.includes('NET WEIGHT:'), 'NET WEIGHT must not appear in Gross Weight Only mode');
mockElements['tag-weight-both'].checked = true;
mockElements['tag-weight-gross-only'].checked = false;
// Test Without Tag No mode
mockElements['tag-no-with'].checked = false;
mockElements['tag-no-without'].checked = true;
const withoutTagDoc = window.buildTagPrintDocument(false);
assert(!withoutTagDoc.includes('TAG NO'), 'TAG NO must not appear in Without Tag No mode');
assert(withoutTagDoc.includes('ARTICLE: Gold'), 'ARTICLE: Gold must appear in Without Tag No mode');
mockElements['tag-no-with'].checked = true;
mockElements['tag-no-without'].checked = false;

// Test 6-column With Tag Id and 5-column Without Tag Id Excel Paste Parsing
const sheetWithTag = [
  ['S No.', 'Item Category', 'No Of Unit', 'HUID', 'Tag Id', 'Weight of Article(Gms)'],
  ['1', 'RING', '1', '45GNA3', 'Q1', '11.990'],
  ['2', 'CHAIN', '1', '7K2P9X', 'T25', '24.500']
];
const parsedWithTag = window.convertExcelSheetToRows(sheetWithTag);
assert.strictEqual(parsedWithTag.length, 2);
assert.strictEqual(parsedWithTag[0].tagNo, 'Q1');
assert.strictEqual(parsedWithTag[0].huid, '45GNA3');
assert.strictEqual(parsedWithTag[0].grossWt, '11.990');
assert.strictEqual(parsedWithTag[1].tagNo, 'T25');

const sheetWithoutTag = [
  ['S No.', 'Item Category', 'No Of Unit', 'HUID', 'Weight of Article(Gms)'],
  ['1', 'BANGLE', '1', '9M4L2Z', '18.250']
];
const parsedWithoutTag = window.convertExcelSheetToRows(sheetWithoutTag);
assert.strictEqual(parsedWithoutTag.length, 1);
assert.strictEqual(parsedWithoutTag[0].tagNo, '');
assert.strictEqual(parsedWithoutTag[0].huid, '9M4L2Z');
assert.strictEqual(parsedWithoutTag[0].ornamentsType, 'BANGLE');
assert.strictEqual(parsedWithoutTag[0].grossWt, '18.250');

console.log('  ✓ 50×15mm default tag, With/Without Tag No modes, and 5/6-column Excel paste parsing verified.');

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
assert(butterflyDoc.includes('45GNA3'), 'Missing HUID in tail');
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

// Case 5: Custom Dimension Input & Bidirectional Synchronization
mockElements['tag-custom-width'].value = '65';
window.onTagDimensionInput({ target: mockElements['tag-custom-width'] });
assert.strictEqual(mockElements['tag-print-width'].value, '65');
assert.strictEqual(window.tagConfig.wMm, 65);
assert.strictEqual(window.tagConfig.preset, 'custom');

mockElements['tag-print-height'].value = '15';
window.onTagDimensionInput({ target: mockElements['tag-print-height'] });
assert.strictEqual(mockElements['tag-custom-height'].value, '15');
assert.strictEqual(window.tagConfig.hMm, 15);

// Reset back to 50x15 default
mockElements['tag-custom-width'].value = '50';
mockElements['tag-custom-height'].value = '15';
window.onTagDimensionInput({ target: mockElements['tag-custom-width'] });
assert.strictEqual(window.tagConfig.wMm, 50);
assert.strictEqual(window.tagConfig.hMm, 15);
assert.strictEqual(window.tagConfig.preset, '50-15');
console.log('  ✓ Bidirectional dimension synchronization and auto-preset toggling verified.');

// Case 6: TSC Brand Native TSPL2 Command Generation
assert(typeof window.buildTsplTagCommands === 'function', 'Missing window.buildTsplTagCommands');
mockElements['tag-cal-gap'].value = '0';
const tsplWithTag = window.buildTsplTagCommands('with');
assert(tsplWithTag.includes('SIZE 50.0 mm, 15.0 mm\r\n'), 'TSPL missing SIZE command with CRLF');
assert(tsplWithTag.includes('GAP 2.0 mm, 0 mm\r\n'), 'TSPL missing GAP command');
assert(tsplWithTag.includes('DENSITY 12\r\n'), 'TSPL missing DENSITY 12 command');
assert(tsplWithTag.includes('CLS\r\n'), 'TSPL missing CLS command');
assert(tsplWithTag.includes('TEXT '), 'TSPL missing TEXT command');
assert(tsplWithTag.includes('QRCODE '), 'TSPL missing hardware QRCODE command');
assert(tsplWithTag.includes('TAG:Q'), 'TSPL WITH tag mode must include TAG:Q...');
assert(tsplWithTag.includes('PRINT 1,1\r\n'), 'TSPL missing PRINT 1,1 command');

const tsplWithoutTag = window.buildTsplTagCommands('without');
assert(!tsplWithoutTag.includes('TAG:Q'), 'TSPL WITHOUT tag mode must omit TAG:');

mockElements['tag-tspl-dpi'].value = '300';
const cfg300 = window.getTsplPrinterConfig();
assert.strictEqual(cfg300.dpm, 12, '300 DPI must map to 12 dots/mm');
console.log('  ✓ TSC Brand TSPL2 generation (203/300 DPI, SIZE, GAP, DENSITY, TEXT, QRCODE, WITH/WITHOUT Tag No) verified.');

console.log('\n=== ALL JEWELLERY TAG PRINTING & CALIBRATION TESTS PASSED SUCCESSFULLY! ===');
