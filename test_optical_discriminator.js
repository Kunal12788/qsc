// Comprehensive Unit & Edge Case Tests for Jewellery Optical Discriminator & Hand/Human Filter
const assert = require('assert');
const fs = require('fs');

console.log('--- RUNNING JEWELLERY OPTICAL DISCRIMINATOR TESTS ---');

// Extract isSkinPixel from js/app.js dynamically
const appJs = fs.readFileSync('js/app.js', 'utf-8');
const fnMatch = appJs.match(/function isSkinPixel\(r, g, b\) \{[\s\S]*?return \(cb >= 75 && cb <= 128 && cr >= 130 && cr <= 180\);\s*\}/);
assert(fnMatch, 'Could not find isSkinPixel in js/app.js');
const isSkinPixel = (new Function(`${fnMatch[0]}; return isSkinPixel;`))();

// ==========================================
// TEST SUITE 1: Skin Chromaticity & Human Presence Across Tones & Lighting
// ==========================================
console.log('\n[Suite 1] Skin Chromaticity Verification:');

// Test 1.1: Fair / Light Human Skin
const fairSkins = [
  [215, 170, 140],
  [235, 195, 170],
  [220, 180, 150]
];
fairSkins.forEach(([r, g, b]) => {
  assert.strictEqual(isSkinPixel(r, g, b), true, `Fair skin (${r}, ${g}, ${b}) should be detected`);
});
console.log('✓ Fair/Light Human Skin recognized across variations');

// Test 1.2: Medium / South Asian / Olive Skin
const mediumSkins = [
  [175, 125, 95],
  [155, 110, 80],
  [186, 138, 102],
  [160, 115, 80],
  [140, 95, 65]
];
mediumSkins.forEach(([r, g, b]) => {
  assert.strictEqual(isSkinPixel(r, g, b), true, `Medium skin (${r}, ${g}, ${b}) should be detected`);
});
console.log('✓ Medium / South Asian Human Skin recognized across variations');

// Test 1.3: Warm Desk Lamp Illuminated Human Skin / Hands
const warmLampSkins = [
  [225, 130, 110],
  [210, 125, 100],
  [230, 135, 115]
];
warmLampSkins.forEach(([r, g, b]) => {
  assert.strictEqual(isSkinPixel(r, g, b), true, `Warm illuminated skin (${r}, ${g}, ${b}) should be detected`);
});
console.log('✓ Warm Desk Lamp Illuminated Human Skin recognized');

// Test 1.4: Deep / Dark Brown Human Skin (including shadows)
const darkSkins = [
  [110, 75, 55],
  [102, 68, 48],
  [95, 65, 45],
  [75, 52, 40],
  [60, 48, 38],
  [55, 44, 34]
];
darkSkins.forEach(([r, g, b]) => {
  assert.strictEqual(isSkinPixel(r, g, b), true, `Dark brown skin (${r}, ${g}, ${b}) should be detected`);
});
console.log('✓ Deep/Dark Human Skin recognized across shadow and low-luma variations');

// ==========================================
// TEST SUITE 2: Metallic & Gemstone Non-Skin Discrimination (Negative Controls)
// ==========================================
console.log('\n[Suite 2] Jewellery & Metallic Rejection of Skin Locus:');

// Test 2.1: Yellow Gold (24K, 22K, 18K, 14K)
const yellowGolds = [
  ['24K', 255, 215, 0],
  ['22K', 238, 198, 45],
  ['18K', 212, 175, 55],
  ['14K', 200, 165, 70]
];
yellowGolds.forEach(([karat, r, g, b]) => {
  assert.strictEqual(isSkinPixel(r, g, b), false, `${karat} yellow gold (${r}, ${g}, ${b}) must NOT trigger skin locus`);
});
console.log('✓ Yellow Gold (24K, 22K, 18K, 14K) correctly discriminated as NOT skin');

// Test 2.2: Silver / Platinum / White Gold
const whiteMetals = [
  ['Silver 925', 215, 215, 220],
  ['White Gold', 235, 235, 235],
  ['Polished Platinum', 225, 225, 230]
];
whiteMetals.forEach(([name, r, g, b]) => {
  assert.strictEqual(isSkinPixel(r, g, b), false, `${name} must NOT trigger skin locus`);
});
console.log('✓ Silver and White Gold correctly discriminated as NOT skin');

// Test 2.3: Gemstones
const gemstones = [
  ['Emerald', 0, 168, 107],
  ['Sapphire', 15, 82, 186],
  ['Ruby', 224, 17, 95],
  ['Diamond Highlight', 255, 255, 255]
];
gemstones.forEach(([name, r, g, b]) => {
  assert.strictEqual(isSkinPixel(r, g, b), false, `${name} must NOT trigger skin locus`);
});
console.log('✓ Gemstones (Emerald, Sapphire, Ruby, Diamond) correctly rejected as NOT skin');

// Test 2.4: Common Staging Pad & Tray Materials
const trayMaterials = [
  ['Black Velvet', 20, 20, 22],
  ['Dark Grey Pad', 60, 60, 62],
  ['Navy Blue Staging Pad', 30, 45, 95],
  ['Green Tray Mat', 25, 75, 40],
  ['White Paper Tray Sheet', 240, 240, 242]
];
trayMaterials.forEach(([name, r, g, b]) => {
  assert.strictEqual(isSkinPixel(r, g, b), false, `${name} must NOT trigger skin locus`);
});
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

  // Sensitive hand presence: checks reticle skin count (single finger >= 16 px) and changed area ratio
  const isSkinPresent = (skinCountInReticle >= 16) || (changedPixelCount >= 35 && skinCountInChanged >= 8 && skinRatioInChanged >= 0.08);
  const isFullBodyObstruction = (occupancy > 0.68);

  let conf = 45;
  if (occupancy >= 0.025 && occupancy <= 0.50) conf += 20;
  else if ((occupancy >= 0.015 && occupancy < 0.025) || (occupancy > 0.50 && occupancy <= 0.65)) conf += 10;

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
    skinCountInReticle,
    occupancy,
    edgeRatio,
    avgEdgeMag,
    lumaContrast,
    specularRatio
  };
}

// Create Baseline: Dark grey staging pad (Luma = 40)
const baseline = new Uint8Array(NUM_SAMPLE_PIXELS).fill(40);

// Scenario A: Hand / Fingers in tray holding jewellery (dark Indian skin tone, 30 skin pixels)
const fingerFrame = new Uint8ClampedArray(NUM_SAMPLE_PIXELS * 4);
for (let j = 0; j < NUM_SAMPLE_PIXELS; j++) {
  fingerFrame[j*4] = 40; fingerFrame[j*4+1] = 40; fingerFrame[j*4+2] = 40; fingerFrame[j*4+3] = 255;
}
// Small finger patch entering from side (30 pixels of dark Indian skin [60, 48, 38])
for (let y = 10; y < 16; y++) {
  for (let x = 10; x < 15; x++) {
    const idx = (y * SAMPLE_W + x) * 4;
    fingerFrame[idx] = 60; fingerFrame[idx+1] = 48; fingerFrame[idx+2] = 38; fingerFrame[idx+3] = 255;
  }
}
const fingerResult = simulateDiscriminatorFrame(fingerFrame, baseline);
assert.strictEqual(fingerResult.isSkinPresent, true, 'Dark skin finger (30 pixels) must be detected as skin present');
console.log('✓ Scenario A: Hand / Finger in tray correctly detected (isSkinPresent = true, photo capture withheld)');

// Scenario B: Warm desk lamp illuminated hand in tray (150 pixels of [225, 130, 110])
const warmHandFrame = new Uint8ClampedArray(NUM_SAMPLE_PIXELS * 4);
for (let j = 0; j < NUM_SAMPLE_PIXELS; j++) {
  warmHandFrame[j*4] = 40; warmHandFrame[j*4+1] = 40; warmHandFrame[j*4+2] = 40; warmHandFrame[j*4+3] = 255;
}
for (let y = 12; y < 27; y++) {
  for (let x = 15; x < 25; x++) {
    const idx = (y * SAMPLE_W + x) * 4;
    warmHandFrame[idx] = 225; warmHandFrame[idx+1] = 130; warmHandFrame[idx+2] = 110; warmHandFrame[idx+3] = 255;
  }
}
const warmHandResult = simulateDiscriminatorFrame(warmHandFrame, baseline);
assert.strictEqual(warmHandResult.isSkinPresent, true, 'Warm desk lamp illuminated hand must be detected');
console.log('✓ Scenario B: Warm desk lamp illuminated hand correctly detected (isSkinPresent = true)');

// Scenario C: Hand withdrawn, Gold Ring remaining on staging pad
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
      ringFrame[idx] = 230; ringFrame[idx+1] = 190; ringFrame[idx+2] = 50; ringFrame[idx+3] = 255;
    }
  }
}
const ringResult = simulateDiscriminatorFrame(ringFrame, baseline);
assert.strictEqual(ringResult.isSkinPresent, false, 'No skin should be detected on ring alone');
assert.strictEqual(ringResult.isJewellery, true, 'Gold ring must be validated as jewellery');
assert(ringResult.confidence >= 80, `Expected high confidence for jewellery piece, got ${ringResult.confidence}%`);
console.log(`✓ Scenario C: Gold ring on tray correctly validated as Jewellery (Confidence: ${ringResult.confidence}%, isSkin: false)`);

// Scenario D: Intricate Gold Chain & Pouch
const chainFrame = new Uint8ClampedArray(NUM_SAMPLE_PIXELS * 4);
for (let j = 0; j < NUM_SAMPLE_PIXELS; j++) {
  chainFrame[j*4] = 40; chainFrame[j*4+1] = 40; chainFrame[j*4+2] = 40; chainFrame[j*4+3] = 255;
}
for (let y = 18; y < 30; y++) {
  for (let x = 16; x < 48; x++) {
    if ((x + y) % 3 === 0) {
      const idx = (y * SAMPLE_W + x) * 4;
      chainFrame[idx] = 212; chainFrame[idx+1] = 175; chainFrame[idx+2] = 55; chainFrame[idx+3] = 255;
    }
  }
}
const chainResult = simulateDiscriminatorFrame(chainFrame, baseline);
assert.strictEqual(chainResult.isSkinPresent, false);
assert.strictEqual(chainResult.isJewellery, true);
console.log(`✓ Scenario D: Intricate Gold Chain validated as Jewellery (Confidence: ${chainResult.confidence}%)`);

// Scenario E: Large human body / obstruction (> 68% occupancy)
const blockedFrame = new Uint8ClampedArray(NUM_SAMPLE_PIXELS * 4);
for (let j = 0; j < NUM_SAMPLE_PIXELS; j++) {
  if (j < NUM_SAMPLE_PIXELS * 0.8) {
    blockedFrame[j*4] = 120; blockedFrame[j*4+1] = 110; blockedFrame[j*4+2] = 130; blockedFrame[j*4+3] = 255;
  } else {
    blockedFrame[j*4] = 40; blockedFrame[j*4+1] = 40; blockedFrame[j*4+2] = 40; blockedFrame[j*4+3] = 255;
  }
}
const blockedResult = simulateDiscriminatorFrame(blockedFrame, baseline);
assert.strictEqual(blockedResult.isFullBodyObstruction, true, 'Full blockage must be detected');
console.log('✓ Scenario E: Large obstruction / human body coverage detected (> 68% occupancy)');

// Scenario F: Flat smooth non-jewellery object (plain piece of paper/cloth sleeve without skin)
const paperFrame = new Uint8ClampedArray(NUM_SAMPLE_PIXELS * 4);
for (let j = 0; j < NUM_SAMPLE_PIXELS; j++) {
  paperFrame[j*4] = 40; paperFrame[j*4+1] = 40; paperFrame[j*4+2] = 40; paperFrame[j*4+3] = 255;
}
for (let y = 15; y < 33; y++) {
  for (let x = 20; x < 44; x++) {
    const idx = (y * SAMPLE_W + x) * 4;
    paperFrame[idx] = 65; paperFrame[idx+1] = 65; paperFrame[idx+2] = 65; paperFrame[idx+3] = 255;
  }
}
const paperResult = simulateDiscriminatorFrame(paperFrame, baseline);
assert.strictEqual(paperResult.isSkinPresent, false);
assert.strictEqual(paperResult.isJewellery, false, 'Flat paper/cloth should NOT be classified as jewellery');
console.log(`✓ Scenario F: Flat smooth object rejected as non-jewellery (Confidence: ${paperResult.confidence}%, isJewellery: false)`);

console.log('\n--- ALL OPTICAL DISCRIMINATOR UNIT TESTS PASSED SUCCESSFULLY! ---');

// ==========================================
// TEST SUITE 4: Workflow & State Machine Edge Cases
// ==========================================
console.log('\n[Suite 4] Complete Operator Hand Placement & Withdrawal Lifecycle:');

let simState = 'idle';
let simHasCapture = false;
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
    return { state: 'snapped', result, snap: true };
  } else {
    simState = 'motion';
    return { state: simState, result, snap: false };
  }
}

// Lifecycle Step 1: Hand enters tray with ring
let res = stepSimulation(fingerFrame, false);
assert.strictEqual(res.state, 'hand');
assert.strictEqual(res.snap, false, 'Should NOT snap while hand is in tray');
console.log('✓ Step 1: Hand enters tray with jewellery -> State: HAND, Snap: FALSE');

// Lifecycle Step 2: Hand still in tray, but operator pauses motion
res = stepSimulation(fingerFrame, true);
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
// Operator reaches in with hand to remove the ring
res = stepSimulation(fingerFrame, false);
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
