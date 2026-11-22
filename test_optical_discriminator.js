// Comprehensive Unit & Edge Case Tests for Jewellery Optical Discriminator & Hand/Human Filter
const assert = require('assert');
const fs = require('fs');

console.log('--- RUNNING JEWELLERY OPTICAL DISCRIMINATOR TESTS ---');

// Extract isSkinPixel from js/app.js
const appJs = fs.readFileSync('js/app.js', 'utf-8');

// We can evaluate isSkinPixel in a sandbox
const sandbox = {};
const fnMatch = appJs.match(/function isSkinPixel\(r, g, b\) \{[\s\S]*?return \(cb >= 77 && cb <= 127 && cr >= 133 && cr <= 175\);\s*\}/);
assert(fnMatch, 'Could not find isSkinPixel in js/app.js');
const isSkinPixel = (new Function(`${fnMatch[0]}; return isSkinPixel;`))();

// ==========================================
// TEST SUITE 1: Skin Chromaticity & Human Presence
// ==========================================
console.log('\n[Suite 1] Skin Chromaticity Verification:');

// Test 1.1: Fair / Light Human Skin
const fairSkin = [215, 170, 140];
assert.strictEqual(isSkinPixel(fairSkin[0], fairSkin[1], fairSkin[2]), true, 'Fair skin should be detected as skin');
console.log('✓ Fair/Light Human Skin recognized');

// Test 1.2: Medium / South Asian / Olive Skin
const mediumSkin1 = [175, 125, 95];
assert.strictEqual(isSkinPixel(mediumSkin1[0], mediumSkin1[1], mediumSkin1[2]), true, 'Medium skin tone 1 recognized');
const mediumSkin2 = [155, 110, 80];
assert.strictEqual(isSkinPixel(mediumSkin2[0], mediumSkin2[1], mediumSkin2[2]), true, 'Medium skin tone 2 recognized');
console.log('✓ Medium / South Asian Human Skin recognized');

// Test 1.3: Deep / Dark Brown Human Skin
const darkSkin = [110, 75, 55];
assert.strictEqual(isSkinPixel(darkSkin[0], darkSkin[1], darkSkin[2]), true, 'Deep/Dusky skin recognized');
console.log('✓ Deep/Dark Human Skin recognized');

// ==========================================
// TEST SUITE 2: Metallic & Gemstone Non-Skin Discrimination (Negative Controls)
// ==========================================
console.log('\n[Suite 2] Jewellery & Metallic Rejection of Skin Locus:');

// Test 2.1: 24K / 22K Yellow Gold (High yellow saturation, low blue -> Cb < 75)
const yellowGold24K = [255, 215, 0];
assert.strictEqual(isSkinPixel(yellowGold24K[0], yellowGold24K[1], yellowGold24K[2]), false, 'Pure yellow gold must NOT trigger skin locus');

const yellowGold22K = [230, 190, 50];
assert.strictEqual(isSkinPixel(yellowGold22K[0], yellowGold22K[1], yellowGold22K[2]), false, '22K yellow gold must NOT trigger skin locus');

const yellowGold18K = [210, 175, 65];
assert.strictEqual(isSkinPixel(yellowGold18K[0], yellowGold18K[1], yellowGold18K[2]), false, '18K yellow gold must NOT trigger skin locus');
console.log('✓ Yellow Gold (24K, 22K, 18K) correctly discriminated as NOT skin');

// Test 2.2: Silver / Platinum / White Gold (Achromatic, R ~ G ~ B)
const silver925 = [220, 220, 225];
assert.strictEqual(isSkinPixel(silver925[0], silver925[1], silver925[2]), false, 'Silver 925 must NOT trigger skin locus');

const whiteGold = [210, 210, 205];
assert.strictEqual(isSkinPixel(whiteGold[0], whiteGold[1], whiteGold[2]), false, 'White gold must NOT trigger skin locus');
console.log('✓ Silver and White Gold correctly discriminated as NOT skin');

// Test 2.3: Gemstones (Ruby, Emerald, Sapphire, Diamond)
const emerald = [30, 180, 70];
assert.strictEqual(isSkinPixel(emerald[0], emerald[1], emerald[2]), false, 'Emerald must NOT trigger skin');

const sapphire = [25, 45, 190];
assert.strictEqual(isSkinPixel(sapphire[0], sapphire[1], sapphire[2]), false, 'Sapphire must NOT trigger skin');

const ruby = [190, 20, 45];
assert.strictEqual(isSkinPixel(ruby[0], ruby[1], ruby[2]), false, 'Ruby must NOT trigger skin');

const diamondHighlight = [255, 255, 255];
assert.strictEqual(isSkinPixel(diamondHighlight[0], diamondHighlight[1], diamondHighlight[2]), false, 'Blown out highlight / diamond must NOT trigger skin');
console.log('✓ Gemstones (Emerald, Sapphire, Ruby, Diamond) correctly rejected as NOT skin');

// Test 2.4: Common Staging Pad & Background Materials (Black velvet, dark grey rubber, navy tray, white pad)
const blackVelvet = [25, 25, 28];
assert.strictEqual(isSkinPixel(blackVelvet[0], blackVelvet[1], blackVelvet[2]), false, 'Dark velvet pad is not skin');

const darkGrey = [60, 60, 62];
assert.strictEqual(isSkinPixel(darkGrey[0], darkGrey[1], darkGrey[2]), false, 'Grey pad is not skin');

const navyPad = [20, 30, 65];
assert.strictEqual(isSkinPixel(navyPad[0], navyPad[1], navyPad[2]), false, 'Navy pad is not skin');
console.log('✓ Tray staging pad materials rejected as NOT skin');

// ==========================================
// TEST SUITE 3: Full Reticle Frame Discriminator Simulation
// ==========================================
console.log('\n[Suite 3] Optical Frame Discriminator & State Machine Simulation:');

const SAMPLE_W = 64;
const SAMPLE_H = 48;
const NUM_SAMPLE_PIXELS = SAMPLE_W * SAMPLE_H;

function simulateDiscriminatorFrame(frameData, baselineLuma) {
  const currSampleBuffer = new Uint8Array(NUM_SAMPLE_PIXELS);
  const baselineBuffer = new Uint8Array(NUM_SAMPLE_PIXELS);
  baselineBuffer.set(baselineLuma);
  const isChangedMask = new Uint8Array(NUM_SAMPLE_PIXELS);
  const edgeBuffer = new Uint16Array(NUM_SAMPLE_PIXELS);

  let baselineDiffSum = 0;
  let changedPixelCount = 0;
  let skinCountInReticle = 0;
  let skinCountInChanged = 0;
  let maxLuma = 0;
  let minLuma = 255;
  let sumObjectLuma = 0;
  let sumBaseLuma = 0;
  let specularHighlightCount = 0;

  for (let i = 0, j = 0; i < frameData.length; i += 4, j++) {
    const r = frameData[i];
    const g = frameData[i+1];
    const b = frameData[i+2];
    const luma = (r * 299 + g * 587 + b * 114) / 1000;
    currSampleBuffer[j] = luma;

    const bDiff = Math.abs(luma - baselineBuffer[j]);
    baselineDiffSum += bDiff;

    const isSkin = isSkinPixel(r, g, b);
    if (isSkin) skinCountInReticle++;

    if (bDiff > 16) {
      isChangedMask[j] = 1;
      changedPixelCount++;
      sumObjectLuma += luma;
      sumBaseLuma += baselineBuffer[j];
      if (isSkin) skinCountInChanged++;
      if (luma > maxLuma) maxLuma = luma;
      if (luma < minLuma) minLuma = luma;
      if (luma >= 195 || (r >= 200 && g >= 165)) specularHighlightCount++;
    }
  }

  // Sobel Edge calculation
  let sumEdgeMag = 0;
  let highEdgePixelCount = 0;
  const minChangedPixels = 65;

  if (changedPixelCount >= (minChangedPixels * 0.6)) {
    for (let y = 1; y < SAMPLE_H - 1; y++) {
      const rowOffset = y * SAMPLE_W;
      for (let x = 1; x < SAMPLE_W - 1; x++) {
        const idx = rowOffset + x;
        if (isChangedMask[idx] === 0) continue;

        const gx = (
          currSampleBuffer[idx - SAMPLE_W + 1] + (currSampleBuffer[idx + 1] << 1) + currSampleBuffer[idx + SAMPLE_W + 1]
        ) - (
          currSampleBuffer[idx - SAMPLE_W - 1] + (currSampleBuffer[idx - 1] << 1) + currSampleBuffer[idx + SAMPLE_W - 1]
        );

        const gy = (
          currSampleBuffer[idx + SAMPLE_W - 1] + (currSampleBuffer[idx + SAMPLE_W] << 1) + currSampleBuffer[idx + SAMPLE_W + 1]
        ) - (
          currSampleBuffer[idx - SAMPLE_W - 1] + (currSampleBuffer[idx - SAMPLE_W] << 1) + currSampleBuffer[idx - SAMPLE_W + 1]
        );

        const mag = Math.abs(gx) + Math.abs(gy);
        edgeBuffer[idx] = mag;
        sumEdgeMag += mag;
        if (mag >= 65) {
          highEdgePixelCount++;
        }
      }
    }
  }

  const occupancy = changedPixelCount / NUM_SAMPLE_PIXELS;
  const skinRatioInChanged = changedPixelCount > 0 ? (skinCountInChanged / changedPixelCount) : 0;
  const edgeRatio = changedPixelCount > 0 ? (highEdgePixelCount / changedPixelCount) : 0;
  const avgEdgeMag = changedPixelCount > 0 ? (sumEdgeMag / changedPixelCount) : 0;
  const padContrast = changedPixelCount > 0 ? Math.abs((sumObjectLuma - sumBaseLuma) / changedPixelCount) : 0;
  const internalContrast = changedPixelCount > 0 ? (maxLuma - minLuma) : 0;
  const lumaContrast = Math.max(padContrast, internalContrast);
  const specularRatio = changedPixelCount > 0 ? (specularHighlightCount / changedPixelCount) : 0;

  const isSkinPresent = (skinCountInReticle >= 90) || (changedPixelCount >= minChangedPixels && skinRatioInChanged >= 0.18 && skinCountInChanged >= 35);
  const isFullBodyObstruction = (occupancy > 0.68);

  let conf = 45;
  if (occupancy >= 0.025 && occupancy <= 0.45) conf += 20;
  else if (occupancy <= 0.60) conf += 10;

  if (edgeRatio >= 0.28) conf += 20;
  else if (edgeRatio >= 0.16) conf += 12;
  else if (edgeRatio < 0.08 || avgEdgeMag < 28) conf -= 25;

  if (lumaContrast >= 85) conf += 15;
  else if (lumaContrast >= 50) conf += 8;
  else if (lumaContrast < 40) conf -= 25;

  if (specularRatio >= 0.03) conf += 10;
  else if (specularRatio === 0 && lumaContrast < 60) conf -= 15;

  conf = Math.max(10, Math.min(99, Math.round(conf)));
  const isJewellery = (conf >= 65);

  return {
    isSkinPresent,
    isFullBodyObstruction,
    isJewellery,
    confidence: conf,
    changedPixelCount,
    occupancy,
    edgeRatio,
    avgEdgeMag,
    lumaContrast,
    specularRatio
  };
}

// Create Baseline: Dark grey staging pad (Luma = 40)
const baseline = new Uint8Array(NUM_SAMPLE_PIXELS).fill(40);

// Scenario A: Hand is placing jewellery (hand in tray)
// Fill a block of 400 pixels with skin color (R=180, G=130, B=100)
const handFrame = new Uint8ClampedArray(NUM_SAMPLE_PIXELS * 4);
for (let j = 0; j < NUM_SAMPLE_PIXELS; j++) {
  // background
  handFrame[j*4] = 40; handFrame[j*4+1] = 40; handFrame[j*4+2] = 40; handFrame[j*4+3] = 255;
}
// Hand area
for (let y = 10; y < 35; y++) {
  for (let x = 10; x < 28; x++) {
    const idx = (y * SAMPLE_W + x) * 4;
    handFrame[idx] = 180; handFrame[idx+1] = 130; handFrame[idx+2] = 100; handFrame[idx+3] = 255;
  }
}
const handResult = simulateDiscriminatorFrame(handFrame, baseline);
assert.strictEqual(handResult.isSkinPresent, true, 'Hand must be flagged as skin present');
console.log('✓ Scenario A: Hand in tray correctly detected (isSkinPresent = true, photo capture withheld)');

// Scenario B: Hand withdrawn, Gold Ring remaining on staging pad
// Circular ring with outer diameter 14, inner diameter 10, high specular highlight and sharp edges
const ringFrame = new Uint8ClampedArray(NUM_SAMPLE_PIXELS * 4);
for (let j = 0; j < NUM_SAMPLE_PIXELS; j++) {
  ringFrame[j*4] = 40; ringFrame[j*4+1] = 40; ringFrame[j*4+2] = 40; ringFrame[j*4+3] = 255;
}
const cx = 32, cy = 24;
for (let y = 14; y < 34; y++) {
  for (let x = 22; x < 42; x++) {
    const d2 = (x - cx)*(x - cx) + (y - cy)*(y - cy);
    if (d2 >= 25 && d2 <= 64) {
      const idx = (y * SAMPLE_W + x) * 4;
      // Gold reflection with specular highlight
      ringFrame[idx] = 230; ringFrame[idx+1] = 190; ringFrame[idx+2] = 50; ringFrame[idx+3] = 255;
    }
  }
}
const ringResult = simulateDiscriminatorFrame(ringFrame, baseline);
assert.strictEqual(ringResult.isSkinPresent, false, 'No skin should be detected on ring alone');
assert.strictEqual(ringResult.isJewellery, true, 'Gold ring must be validated as jewellery');
assert(ringResult.confidence >= 80, `Expected high confidence for jewellery piece, got ${ringResult.confidence}%`);
console.log(`✓ Scenario B: Gold ring on tray correctly validated as Jewellery (Confidence: ${ringResult.confidence}%, isSkin: false)`);

// Scenario C: Human figure / full blockage (> 68% occupancy)
const blockedFrame = new Uint8ClampedArray(NUM_SAMPLE_PIXELS * 4);
for (let j = 0; j < NUM_SAMPLE_PIXELS; j++) {
  // 80% of pixels changed from baseline (person standing in front)
  if (j < NUM_SAMPLE_PIXELS * 0.8) {
    blockedFrame[j*4] = 120; blockedFrame[j*4+1] = 110; blockedFrame[j*4+2] = 130; blockedFrame[j*4+3] = 255;
  } else {
    blockedFrame[j*4] = 40; blockedFrame[j*4+1] = 40; blockedFrame[j*4+2] = 40; blockedFrame[j*4+3] = 255;
  }
}
const blockedResult = simulateDiscriminatorFrame(blockedFrame, baseline);
assert.strictEqual(blockedResult.isFullBodyObstruction, true, 'Full blockage must be detected');
console.log('✓ Scenario C: Large obstruction / human body coverage detected (> 68% occupancy)');

// Scenario D: Flat smooth non-jewellery object (plain piece of paper/cloth sleeve without skin)
const paperFrame = new Uint8ClampedArray(NUM_SAMPLE_PIXELS * 4);
for (let j = 0; j < NUM_SAMPLE_PIXELS; j++) {
  paperFrame[j*4] = 40; paperFrame[j*4+1] = 40; paperFrame[j*4+2] = 40; paperFrame[j*4+3] = 255;
}
// Flat smooth rectangle with low contrast and minimal internal edges
for (let y = 15; y < 33; y++) {
  for (let x = 20; x < 44; x++) {
    const idx = (y * SAMPLE_W + x) * 4;
    paperFrame[idx] = 65; paperFrame[idx+1] = 65; paperFrame[idx+2] = 65; paperFrame[idx+3] = 255;
  }
}
const paperResult = simulateDiscriminatorFrame(paperFrame, baseline);
assert.strictEqual(paperResult.isSkinPresent, false);
assert.strictEqual(paperResult.isJewellery, false, 'Flat paper/cloth should NOT be classified as jewellery');
console.log(`✓ Scenario D: Flat smooth object rejected as non-jewellery (Confidence: ${paperResult.confidence}%, isJewellery: false)`);

console.log('\n--- ALL OPTICAL DISCRIMINATOR UNIT TESTS PASSED SUCCESSFULLY! ---');

// ==========================================
// TEST SUITE 4: Workflow & State Machine Edge Cases
// ==========================================
console.log('\n[Suite 4] Complete Operator Hand Placement & Withdrawal Lifecycle:');

// Step 1: Empty tray
let simState = 'idle';
let simHasCapture = false;
let simCaptureFired = false;
let simCooldown = false;

function stepSimulation(frameData, isStill) {
  const result = simulateDiscriminatorFrame(frameData, baseline);
  const isObjectPresent = result.changedPixelCount >= 65;

  if (result.isSkinPresent) {
    simState = 'hand';
    return { state: simState, result, snap: false };
  }
  if (result.isFullBodyObstruction) {
    simState = 'blocked';
    return { state: simState, result, snap: false };
  }
  if (!isObjectPresent) {
    simState = 'idle';
    simHasCapture = false;
    return { state: simState, result, snap: false };
  }
  if (!result.isJewellery) {
    simState = 'unrecognized';
    return { state: simState, result, snap: false };
  }

  // Object present & validated
  if (simCooldown) {
    return { state: 'cooldown', result, snap: false };
  }

  if (isStill) {
    simState = 'stabilizing';
    // Assume 600ms elapsed
    simState = 'cooldown';
    simCooldown = true;
    simHasCapture = true;
    simCaptureFired = true;
    return { state: 'snapped', result, snap: true };
  } else {
    simState = 'motion';
    return { state: simState, result, snap: false };
  }
}

// Lifecycle Step 1: Hand enters tray with ring
let res = stepSimulation(handFrame, false);
assert.strictEqual(res.state, 'hand');
assert.strictEqual(res.snap, false, 'Should NOT snap while hand is in tray');
console.log('✓ Step 1: Hand enters tray with jewellery -> State: HAND, Snap: FALSE');

// Lifecycle Step 2: Hand still in tray, but operator pauses motion
res = stepSimulation(handFrame, true);
assert.strictEqual(res.state, 'hand');
assert.strictEqual(res.snap, false, 'Should NOT snap even if hand holds still');
console.log('✓ Step 2: Hand holds still in tray -> Still blocked by Skin Filter, Snap: FALSE');

// Lifecycle Step 3: Operator releases ring and completely withdraws hand
res = stepSimulation(ringFrame, true);
assert.strictEqual(res.state, 'snapped');
assert.strictEqual(res.snap, true, 'Must auto-snap once hand is withdrawn and jewellery is still');
console.log('✓ Step 3: Hand withdrawn, jewellery stable on pad -> State: SNAPPED, Snap: TRUE (Auto-Captured!)');

// Lifecycle Step 4: After snap, jewellery rests on pad
simCooldown = false;
simCaptureFired = false;
// Operator reaches in with hand to remove the ring
res = stepSimulation(handFrame, false);
assert.strictEqual(res.state, 'hand');
assert.strictEqual(res.snap, false, 'Hand entering to pick up ring must NOT trigger second snap');
console.log('✓ Step 4: Operator reaches in to collect item -> Hand detected, phantom snap prevented');

// Lifecycle Step 5: Tray emptied
const emptyPadFrame = new Uint8ClampedArray(NUM_SAMPLE_PIXELS * 4);
for (let j = 0; j < NUM_SAMPLE_PIXELS; j++) {
  emptyPadFrame[j*4] = 40; emptyPadFrame[j*4+1] = 40; emptyPadFrame[j*4+2] = 40; emptyPadFrame[j*4+3] = 255;
}
res = stepSimulation(emptyPadFrame, true);
assert.strictEqual(res.state, 'idle');
assert.strictEqual(simHasCapture, false, 'Empty tray resets capture cache');
console.log('✓ Step 5: Tray emptied -> State: IDLE, Cache cleared for next piece');

console.log('\n--- ALL WORKFLOW & LIFECYCLE TESTS VERIFIED! ---');
