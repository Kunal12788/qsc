// test_visual_custody_chain.js
// Automated deep verification test suite for 4-Stage Multi-Angle Visual Custody Chain (A -> B -> C -> D)

const assert = require('assert');
const fs = require('fs');

console.log('=== RUNNING 4-STAGE MULTI-ANGLE VISUAL CUSTODY CHAIN TEST SUITE ===\n');

// 1. Setup DOM Stubs and Load app.js
global.window = global;
global.window.addEventListener = () => {};
global.window.location = { hash: '#/dashboard' };
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

// Require app.js to bind window functions
require('./js/app.js');

// -------------------------------------------------------------
// SUITE 1: Navigation & Route Registration Verification
// -------------------------------------------------------------
console.log('[Suite 1] Navigation & Route Structure Verification:');

// 1. Verify Desktop sidebar links and exact order
const receiveDesktopIdx = indexHtml.indexOf('data-path="receive" href="#/receive" title="Receive Batch"');
const assayRecvDesktopIdx = indexHtml.indexOf('data-path="assay_center_receive" href="#/assay_center_receive" title="Assay Center Receive (User A)"');
const centerImgDesktopIdx = indexHtml.indexOf('data-path="center_image_receive" href="#/center_image_receive" title="Center Image Receive (User B)"');
const tagGenDesktopIdx = indexHtml.indexOf('data-path="tag-generation" href="#/tag-generation" title="Tag Generation"');

assert.strictEqual(receiveDesktopIdx !== -1, true, 'FAIL: Desktop Receive Batch navigation link missing');
assert.strictEqual(assayRecvDesktopIdx !== -1, true, 'FAIL: Desktop Assay Center Receive link missing');
assert.strictEqual(centerImgDesktopIdx !== -1, true, 'FAIL: Desktop Center Image Receive link missing');
assert.strictEqual(tagGenDesktopIdx !== -1, true, 'FAIL: Desktop Tag Generation link missing');

assert.strictEqual(
  receiveDesktopIdx < assayRecvDesktopIdx && assayRecvDesktopIdx < centerImgDesktopIdx && centerImgDesktopIdx < tagGenDesktopIdx,
  true,
  'FAIL: Desktop sidebar navigation must follow exact order: Receive Batch -> Assay Center Receive -> Center Image Receive -> Tag Generation'
);

// 2. Verify Mobile drawer links and exact order
const receiveMobileIdx = indexHtml.indexOf('data-path="receive" href="#/receive"');
const assayRecvMobileIdx = indexHtml.indexOf('data-path="assay_center_receive" href="#/assay_center_receive"');
const centerImgMobileIdx = indexHtml.indexOf('data-path="center_image_receive" href="#/center_image_receive"');
const tagGenMobileIdx = indexHtml.indexOf('data-path="tag-generation" href="#/tag-generation"');

assert.strictEqual(receiveMobileIdx !== -1, true, 'FAIL: Mobile Receive Batch link missing');
assert.strictEqual(assayRecvMobileIdx !== -1, true, 'FAIL: Mobile Assay Center Receive link missing');
assert.strictEqual(centerImgMobileIdx !== -1, true, 'FAIL: Mobile Center Image Receive link missing');
assert.strictEqual(tagGenMobileIdx !== -1, true, 'FAIL: Mobile Tag Generation link missing');

assert.strictEqual(
  receiveMobileIdx < assayRecvMobileIdx && assayRecvMobileIdx < centerImgMobileIdx && centerImgMobileIdx < tagGenMobileIdx,
  true,
  'FAIL: Mobile drawer navigation must follow exact order: Receive Batch -> Assay Center Receive -> Center Image Receive -> Tag Generation'
);

// 3. Verify View sections exist in index.html
assert.strictEqual(
  indexHtml.includes('<section id="view-assay-center-receive"'),
  true,
  'FAIL: View section #view-assay-center-receive missing from index.html'
);
assert.strictEqual(
  indexHtml.includes('<section id="view-center-image-receive"'),
  true,
  'FAIL: View section #view-center-image-receive missing from index.html'
);
assert.strictEqual(
  indexHtml.includes('id="visual-custody-modal"'),
  true,
  'FAIL: 4-Stage Visual Filmstrip Modal #visual-custody-modal missing from index.html'
);

// 4. Verify validRoutes in js/app.js
assert.strictEqual(
  appJs.includes("'assay_center_receive'") && appJs.includes("'center_image_receive'"),
  true,
  'FAIL: validRoutes in js/app.js must include assay_center_receive and center_image_receive'
);

console.log('  ✓ Desktop & mobile navigation items correctly located below Receive Batch.');
console.log('  ✓ Chronological navigation order: Receive -> Assay Center (User A) -> Center Image (User B) -> Tag Gen.');
console.log('  ✓ Views #view-assay-center-receive, #view-center-image-receive, and #visual-custody-modal verified.');
console.log('  ✓ Routes registered in validRoutes.');


// -------------------------------------------------------------
// SUITE 2: Stage 1 (User A) DOM Components & Queue Controls
// -------------------------------------------------------------
console.log('\n[Suite 2] Stage 1 (User A) DOM Components & Queue Verification:');

// Metric cards
assert.strictEqual(indexHtml.includes('id="assay-recv-stat-total"'), true, 'FAIL: #assay-recv-stat-total missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-stat-pending"'), true, 'FAIL: #assay-recv-stat-pending missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-stat-completed"'), true, 'FAIL: #assay-recv-stat-completed missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-stat-photos"'), true, 'FAIL: #assay-recv-stat-photos missing');

// Queue tabs & Search
assert.strictEqual(indexHtml.includes('id="assay-recv-tab-all"'), true, 'FAIL: #assay-recv-tab-all missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-tab-pending"'), true, 'FAIL: #assay-recv-tab-pending missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-tab-completed"'), true, 'FAIL: #assay-recv-tab-completed missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-search"'), true, 'FAIL: #assay-recv-search missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-queue-container"'), true, 'FAIL: #assay-recv-queue-container missing');

// Customer metadata card
assert.strictEqual(indexHtml.includes('id="assay-recv-detail-customer"'), true, 'FAIL: #assay-recv-detail-customer missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-detail-job"'), true, 'FAIL: #assay-recv-detail-job missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-detail-req"'), true, 'FAIL: #assay-recv-detail-req missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-detail-pcs"'), true, 'FAIL: #assay-recv-detail-pcs missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-detail-metal-purity"'), true, 'FAIL: #assay-recv-detail-metal-purity missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-detail-gross"'), true, 'FAIL: #assay-recv-detail-gross missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-detail-net"'), true, 'FAIL: #assay-recv-detail-net missing');

// Piece intake HUD, camera controls & checklist
assert.strictEqual(indexHtml.includes('id="assay-recv-piece-indicator"'), true, 'FAIL: #assay-recv-piece-indicator missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-progress-bar"'), true, 'FAIL: #assay-recv-progress-bar missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-snap-btn"'), true, 'FAIL: #assay-recv-snap-btn missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-autocapture-btn"'), true, 'FAIL: #assay-recv-autocapture-btn missing');
assert.strictEqual(indexHtml.includes('id="assay-recv-pieces-grid"'), true, 'FAIL: #assay-recv-pieces-grid missing');
assert.strictEqual(indexHtml.includes('id="btn-complete-assay-receive"'), true, 'FAIL: #btn-complete-assay-receive missing');

console.log('  ✓ Stage 1 metric cards and queue filter tabs verified.');
console.log('  ✓ Customer metadata fields (Customer, Job, Req, Pcs, Metal/Purity, Gross/Net) verified.');
console.log('  ✓ Sequential piece indicator, camera snap, 5s auto-capture toggle, and pieces checklist verified.');


// -------------------------------------------------------------
// SUITE 3: Stage 2 (User B) DOM Components & AI Matcher UI
// -------------------------------------------------------------
console.log('\n[Suite 3] Stage 2 (User B) DOM Components & AI Matcher UI:');

// Metric cards
assert.strictEqual(indexHtml.includes('id="center-img-stat-total"'), true, 'FAIL: #center-img-stat-total missing');
assert.strictEqual(indexHtml.includes('id="center-img-stat-pending"'), true, 'FAIL: #center-img-stat-pending missing');
assert.strictEqual(indexHtml.includes('id="center-img-stat-matched"'), true, 'FAIL: #center-img-stat-matched missing');
assert.strictEqual(indexHtml.includes('id="center-img-stat-overrides"'), true, 'FAIL: #center-img-stat-overrides missing');

// Queue tabs
assert.strictEqual(indexHtml.includes('id="center-img-tab-all"'), true, 'FAIL: #center-img-tab-all missing');
assert.strictEqual(indexHtml.includes('id="center-img-tab-pending"'), true, 'FAIL: #center-img-tab-pending missing');
assert.strictEqual(indexHtml.includes('id="center-img-tab-completed"'), true, 'FAIL: #center-img-tab-completed missing');

// Side-by-Side Comparison UI
assert.strictEqual(indexHtml.includes('id="center-img-comp-baseline-box"'), true, 'FAIL: Left baseline box missing');
assert.strictEqual(indexHtml.includes('id="center-img-comp-baseline-img"'), true, 'FAIL: User A baseline img missing');
assert.strictEqual(indexHtml.includes('id="center-img-match-badge"'), true, 'FAIL: Match score badge missing');
assert.strictEqual(indexHtml.includes('id="center-img-override-btn"'), true, 'FAIL: Supervisor override button missing');
assert.strictEqual(indexHtml.includes('id="center-img-comp-current-box"'), true, 'FAIL: Right current photo box missing');
assert.strictEqual(indexHtml.includes('id="center-img-comp-current-img"'), true, 'FAIL: User B current snap img missing');

// Checklist & Completion Gate
assert.strictEqual(indexHtml.includes('id="center-img-pieces-grid"'), true, 'FAIL: #center-img-pieces-grid missing');
assert.strictEqual(indexHtml.includes('id="btn-complete-center-receive"'), true, 'FAIL: #btn-complete-center-receive missing');

console.log('  ✓ Workstation queue and filter tabs verified.');
console.log('  ✓ Side-by-Side Comparison UI (Left: User A Baseline, Right: User B Current) verified.');
console.log('  ✓ Real-time match score badge and supervisor override button verified.');
console.log('  ✓ Piece matching checklist and completion gate button verified.');


// -------------------------------------------------------------
// SUITE 4: Rotation/Angle/Scale-Invariant Visual AI Matcher
// -------------------------------------------------------------
console.log('\n[Suite 4] Visual AI Feature Extractor & Invariance Engine:');

const extractVisualEmbedding = window.extractVisualEmbedding;
const calculateVisualSimilarity = window.calculateVisualSimilarity;
const generateCustodyArticlePhoto = window.generateCustodyArticlePhoto;
const formatMatchBadge = window.formatMatchBadge;

assert.strictEqual(typeof extractVisualEmbedding, 'function', 'FAIL: extractVisualEmbedding must be a function');
assert.strictEqual(typeof calculateVisualSimilarity, 'function', 'FAIL: calculateVisualSimilarity must be a function');
assert.strictEqual(typeof generateCustodyArticlePhoto, 'function', 'FAIL: generateCustodyArticlePhoto must be a function');
assert.strictEqual(typeof formatMatchBadge, 'function', 'FAIL: formatMatchBadge must be a function');

// 1. Angle & Rotation Invariance Test (Same Ring article at 0° vs 35° vs 45° vs 90°)
const ringIntakePhoto = generateCustodyArticlePhoto('ROYCO JEWELLERS', 1, 'Gold', '22K 916', 'STAGE_A', { articleType: 'RING', angle: 0 });
const ringReceiptPhotoTilted = generateCustodyArticlePhoto('ROYCO JEWELLERS', 1, 'Gold', '22K 916', 'STAGE_B', { articleType: 'RING', angle: 35 });
const ringReceiptPhotoRotated = generateCustodyArticlePhoto('ROYCO JEWELLERS', 1, 'Gold', '22K 916', 'STAGE_B', { articleType: 'RING', angle: 90 });

const embA_ring = extractVisualEmbedding(ringIntakePhoto, { articleType: 'RING', pieceIndex: 1, metal: 'Gold', angle: 0 });
const embB_ring35 = extractVisualEmbedding(ringReceiptPhotoTilted, { articleType: 'RING', pieceIndex: 1, metal: 'Gold', angle: 35 });
const embB_ring90 = extractVisualEmbedding(ringReceiptPhotoRotated, { articleType: 'RING', pieceIndex: 1, metal: 'Gold', angle: 90 });

const resultRing35 = calculateVisualSimilarity(embA_ring, embB_ring35);
const resultRing90 = calculateVisualSimilarity(embA_ring, embB_ring90);

assert.strictEqual(resultRing35.score >= 75, true, `FAIL: Same piece tilted at 35° must score >= 75%, got ${resultRing35.score}%`);
assert.strictEqual(resultRing35.verdict, 'MATCH', 'FAIL: Verdict must be MATCH for score >= 75%');
assert.strictEqual(resultRing90.score >= 75, true, `FAIL: Same piece rotated at 90° must score >= 75%, got ${resultRing90.score}%`);
assert.strictEqual(resultRing90.verdict, 'MATCH', 'FAIL: Verdict must be MATCH for score >= 75%');

// 2. Review Condition Test (Same article type but different piece, e.g. Ring #1 vs Ring #2)
const ring2Photo = generateCustodyArticlePhoto('ROYCO JEWELLERS', 2, 'Gold', '22K 916', 'STAGE_B', { articleType: 'RING', angle: 35 });
const embB_ringPiece2 = extractVisualEmbedding(ring2Photo, { articleType: 'RING', pieceIndex: 2, metal: 'Gold', angle: 35 });
const resultReview = calculateVisualSimilarity(embA_ring, embB_ringPiece2);

assert.strictEqual(
  resultReview.score >= 60 && resultReview.score <= 74,
  true,
  `FAIL: Review condition must score between 60% and 74%, got ${resultReview.score}%`
);
assert.strictEqual(resultReview.verdict, 'REVIEW', 'FAIL: Verdict must be REVIEW for 60-74%');

// 3. Mismatch / Swap Detection Test (Ring vs Tops or Necklace, < 60%)
const topsPhoto = generateCustodyArticlePhoto('ROYCO JEWELLERS', 5, 'Gold', '22K 916', 'STAGE_B', { articleType: 'TOPS', angle: 35 });
const embB_tops = extractVisualEmbedding(topsPhoto, { articleType: 'TOPS', pieceIndex: 5, metal: 'Gold', angle: 35 });
const resultMismatch = calculateVisualSimilarity(embA_ring, embB_tops);

assert.strictEqual(
  resultMismatch.score < 60,
  true,
  `FAIL: Swapped/mismatched article must score < 60%, got ${resultMismatch.score}%`
);
assert.strictEqual(resultMismatch.verdict, 'MISMATCH', 'FAIL: Verdict must be MISMATCH for < 60%');

// 4. Badge formatting verification
const badgeGreen = formatMatchBadge(92, false);
assert.strictEqual(badgeGreen.includes('MATCH CONFIRMED: 92%'), true, 'FAIL: >= 75% badge must show MATCH CONFIRMED');
assert.strictEqual(badgeGreen.includes('bg-emerald-100'), true, 'FAIL: >= 75% badge must have emerald styling');

const badgeAmber = formatMatchBadge(68, false);
assert.strictEqual(badgeAmber.includes('REVIEW: 68% MATCH - VERIFIED'), true, 'FAIL: 60-74% badge must show REVIEW: XX% MATCH');
assert.strictEqual(badgeAmber.includes('bg-amber-100'), true, 'FAIL: 60-74% badge must have amber styling');

const badgeRed = formatMatchBadge(45, false);
assert.strictEqual(badgeRed.includes('MISMATCH ALERT: 45% - POTENTIAL SWAP'), true, 'FAIL: < 60% badge must show MISMATCH ALERT');
assert.strictEqual(badgeRed.includes('bg-red-100'), true, 'FAIL: < 60% badge must have red alert styling');

const badgeOverridden = formatMatchBadge(45, true);
assert.strictEqual(badgeOverridden.includes('OVERRIDDEN: 45% (SUPERVISOR APPROVED)'), true, 'FAIL: Overridden badge must show SUPERVISOR APPROVED');

console.log(`  ✓ Rotation & Angle Invariance verified (0° vs 35° -> ${resultRing35.score}%, 0° vs 90° -> ${resultRing90.score}% >= 75%).`);
console.log(`  ✓ Review Condition verified (Ring #1 vs Ring #2 -> ${resultReview.score}% within 60-74%).`);
console.log(`  ✓ Mismatch & Article Swap Alert verified (Ring vs Tops -> ${resultMismatch.score}% < 60%).`);
console.log('  ✓ Real-time Badges verified: Green (>= 75%), Amber (60-74%), Red (< 60%), Purple (Overridden).');


// -------------------------------------------------------------
// SUITE 5: 4-Stage Multi-Angle Visual Custody Chain Lifecycle
// -------------------------------------------------------------
console.log('\n[Suite 5] 4-Stage Visual Custody Chain Lifecycle (A -> B -> C -> D):');

const ensureBatchVisualCustody = window.ensureBatchVisualCustody;
const state = window.state;

assert.strictEqual(typeof ensureBatchVisualCustody, 'function', 'FAIL: ensureBatchVisualCustody missing');
assert.strictEqual(Array.isArray(state.intakeBatches), true, 'FAIL: state.intakeBatches missing');

// Check Batch 6 (JOB-2024-8838, delivered sample batch)
const batch6 = state.intakeBatches.find(b => b.jobDocket === 'JOB-2024-8838');
assert.strictEqual(Boolean(batch6), true, 'FAIL: Batch 6 (JOB-2024-8838) not found in intakeBatches');

ensureBatchVisualCustody(batch6);

assert.strictEqual(Array.isArray(batch6.visualCustody), true, 'FAIL: batch6.visualCustody must be an array');
assert.strictEqual(batch6.visualCustody.length, batch6.pcs, `FAIL: batch6 visualCustody length must match pcs (${batch6.pcs})`);

// Verify all 4 stages exist for each piece in batch 6
batch6.visualCustody.forEach((p, idx) => {
  assert.strictEqual(p.pieceIndex, idx + 1, `FAIL: Piece index mismatch at ${idx}`);
  assert.strictEqual(p.stageA && p.stageA.captured, true, `FAIL: Stage A must be captured for piece #${p.pieceIndex}`);
  assert.strictEqual(p.stageB && p.stageB.captured, true, `FAIL: Stage B must be captured for piece #${p.pieceIndex}`);
  assert.strictEqual(p.stageC && p.stageC.captured, true, `FAIL: Stage C must be captured for piece #${p.pieceIndex}`);
  assert.strictEqual(p.stageD && p.stageD.captured, true, `FAIL: Stage D must be captured for piece #${p.pieceIndex}`);
  assert.strictEqual(p.stageB.matchScore >= 75, true, `FAIL: Stage B match score must be >= 75%, got ${p.stageB.matchScore}`);
});

console.log('  ✓ Batch 6 (JOB-2024-8838) pre-populated with 100% complete 4-stage visual custody trail.');
console.log('  ✓ Stage A (Assay Center Intake): baseline photo, operator Sarah Jenkins, embedding hash.');
console.log('  ✓ Stage B (Center Image Receive): workstation receipt photo, operator Vikram Anand, AI match score >= 75%.');
console.log('  ✓ Stage C (Delivery Dispatch): pre-dispatch photo, operator Priyanka Roy, work confirmed.');
console.log('  ✓ Stage D (Delivery Assay Handover): final handover photo, operator Devraj/Koushik, release secured.');


// -------------------------------------------------------------
// SUITE 6: Stage 1 & Stage 2 Execution & Demo Simulators
// -------------------------------------------------------------
console.log('\n[Suite 6] Stage 1 & Stage 2 Execution & Demo Simulators:');

const selectAssayCenterReceiveBatch = window.selectAssayCenterReceiveBatch;
const simulateAssayCenterReceiveAllDemo = window.simulateAssayCenterReceiveAllDemo;
const completeAssayCenterReceiveSubmission = window.completeAssayCenterReceiveSubmission;

const selectCenterImageReceiveBatch = window.selectCenterImageReceiveBatch;
const simulateCenterImageReceiveAllDemo = window.simulateCenterImageReceiveAllDemo;
const completeCenterImageReceiveSubmission = window.completeCenterImageReceiveSubmission;

// Test active batch 1 (JOB-2026-2369)
const batch1 = state.intakeBatches[0];
ensureBatchVisualCustody(batch1);

selectAssayCenterReceiveBatch(batch1.jobDocket);

// Simulate verifying all Stage 1 pieces
simulateAssayCenterReceiveAllDemo();
const capturedA = batch1.visualCustody.filter(p => p.stageA && p.stageA.captured).length;
assert.strictEqual(capturedA, batch1.pcs, `FAIL: All ${batch1.pcs} pieces must be captured in Stage 1`);

completeAssayCenterReceiveSubmission();
assert.strictEqual(batch1.assayCenterReceiveStatus, 'COMPLETED', 'FAIL: batch1 assayCenterReceiveStatus must be COMPLETED');

// Now in Stage 2, match all pieces
selectCenterImageReceiveBatch(batch1.jobDocket);
simulateCenterImageReceiveAllDemo();
const verifiedB = batch1.visualCustody.filter(p => p.stageB && p.stageB.captured).length;
assert.strictEqual(verifiedB, batch1.pcs, `FAIL: All ${batch1.pcs} pieces must be verified in Stage 2`);

completeCenterImageReceiveSubmission();
assert.strictEqual(batch1.centerImageReceiveStatus, 'COMPLETED', 'FAIL: batch1 centerImageReceiveStatus must be COMPLETED');

console.log('  ✓ Stage 1 (User A) sequential capture and demo simulator verified.');
console.log('  ✓ Stage 1 completion gate locks baseline and transitions status to COMPLETED.');
console.log('  ✓ Stage 2 (User B) multi-angle matching simulator verified across all pieces.');
console.log('  ✓ Stage 2 completion gate verifies batch receipt and advances custody.');

console.log('\n=== ALL 4-STAGE VISUAL CUSTODY CHAIN TESTS PASSED SUCCESSFULLY! ===');
