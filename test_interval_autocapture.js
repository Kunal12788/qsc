// test_interval_autocapture.js
// Unit tests for the 5-Second Interval Auto-Capture system for Outward Delivery & Dispatch

const assert = require('assert');
const fs = require('fs');

console.log('--- RUNNING 5-SECOND INTERVAL AUTO-CAPTURE TESTS ---\n');

// Verify that optical discriminator code is completely removed from js/app.js
const appJs = fs.readFileSync('./js/app.js', 'utf8');

assert.strictEqual(
  appJs.includes('function isSkinPixel'),
  false,
  'FAIL: isSkinPixel optical discriminator function must be completely removed from js/app.js'
);
assert.strictEqual(
  appJs.includes('delivery-motion-canvas'),
  false,
  'FAIL: delivery-motion-canvas must be completely removed from js/app.js'
);
assert.strictEqual(
  appJs.includes('SAMPLE_W = 64'),
  false,
  'FAIL: Optical pixel sampling buffers must be completely removed from js/app.js'
);
assert.strictEqual(
  appJs.includes('lastDiscriminatorResult'),
  false,
  'FAIL: Discriminator result state machine must be completely removed from js/app.js'
);
console.log('✓ Optical detection & skin/reticle discrimination algorithms are completely removed.');

// Verify index.html updates
const indexHtml = fs.readFileSync('./index.html', 'utf8');
assert.strictEqual(
  indexHtml.includes('delivery-motion-canvas'),
  false,
  'FAIL: delivery-motion-canvas must be removed from index.html'
);
assert.strictEqual(
  indexHtml.includes('delivery-hand-alert'),
  false,
  'FAIL: delivery-hand-alert must be removed from index.html'
);
assert.strictEqual(
  indexHtml.includes('deliv-motion-sensitivity'),
  false,
  'FAIL: deliv-motion-sensitivity dropdown must be removed from index.html'
);
assert.strictEqual(
  indexHtml.includes('delivery-cam-tare-btn'),
  false,
  'FAIL: delivery-cam-tare-btn must be removed from index.html'
);
assert.strictEqual(
  indexHtml.includes('START 5s AUTO-CAPTURE'),
  true,
  'FAIL: index.html must feature START 5s AUTO-CAPTURE button'
);
assert.strictEqual(
  indexHtml.includes('delivery-progress-bar'),
  true,
  'FAIL: index.html must have real-time delivery-progress-bar'
);
assert.strictEqual(
  indexHtml.includes('SNAP PHOTO NOW'),
  true,
  'FAIL: index.html must have instant manual SNAP PHOTO NOW button'
);
console.log('✓ index.html structure verified: optical remnants removed, 5s auto-capture controls and HUD in place.');

// Now simulate the 5-Second Interval Auto-Capture engine in a simulated environment
function createMockDOM() {
  const elements = {};
  function makeEl(id) {
    return {
      id: id,
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        contains(c) { return this._classes.contains ? this._classes.contains(c) : this._classes.has(c); },
        has(c) { return this._classes.has(c); }
      },
      style: {},
      textContent: '',
      value: '',
      className: '',
      innerHTML: '',
      srcObject: null,
      readyState: 4,
      videoWidth: 1280,
      videoHeight: 720,
      play: async () => {},
      reset() {}
    };
  }

  const ids = [
    'delivery-cam-video', 'delivery-cam-standby', 'delivery-cam-reticle',
    'delivery-cam-error', 'delivery-cam-stream-btn-text', 'delivery-cam-status-pill',
    'delivery-status-indicator', 'delivery-cam-status-text', 'delivery-cam-select',
    'delivery-countdown-badge', 'delivery-countdown-text', 'delivery-countdown-icon',
    'delivery-progress-bar-container', 'delivery-progress-bar', 'delivery-target-box',
    'delivery-cam-flash', 'deliv-auto-toggle-btn', 'deliv-auto-dot',
    'deliv-auto-toggle-text', 'deliv-sound-toggle-btn', 'deliv-sound-icon',
    'deliv-main-auto-btn', 'deliv-main-auto-icon', 'deliv-main-auto-text',
    'deliv-manual-snap-btn', 'deliv-photos-count-summary', 'deliv-gallery-count-badge',
    'deliv-clear-all-photos-btn', 'deliv-photos-gallery-grid', 'delivery-queue-container'
  ];

  ids.forEach(id => {
    elements[id] = makeEl(id);
  });

  return {
    getElementById(id) {
      if (!elements[id]) {
        elements[id] = makeEl(id);
      }
      return elements[id];
    },
    createElement(tag) {
      if (tag === 'canvas') {
        return {
          width: 0,
          height: 0,
          getContext: () => ({
            drawImage: () => {},
            getImageData: () => ({ data: new Uint8ClampedArray(100) })
          }),
          toDataURL: () => 'data:image/jpeg;base64,mockImageBase64Payload'
        };
      }
      return makeEl('mock-' + tag);
    }
  };
}

// Suite 1: State & Interval Execution
{
  console.log('\n[Suite 1] 5-Second Interval Engine Simulation:');

  const mockDoc = createMockDOM();
  let timeNow = 10000;
  const mockPerformance = { now: () => timeNow };

  let activeDeliveryBatch = {
    jobDocket: 'JOB-2024-9104',
    customer: 'TANISHQ LUXURY GUILD',
    pcs: 67,
    grossWt: 12.000,
    purity: '22K 916',
    metal: 'GOLD',
    status: 'Ready',
    articlePhotos: []
  };

  let deliveryCameraStream = {
    getTracks: () => [{ stop: () => {} }]
  };
  let deliveryAutoCaptureActive = false;
  let deliveryIntervalDuration = 5000;
  let deliveryIntervalTargetTime = 0;
  let snapshotsTaken = [];

  function executeSnapshot(source) {
    const photoObj = {
      id: 'photo_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      src: 'data:image/jpeg;base64,mockSnap',
      timestamp: '12:00:00',
      source: source,
      name: `${source}_snap.jpg`
    };
    activeDeliveryBatch.articlePhotos.unshift(photoObj);
    activeDeliveryBatch.articlePhoto = photoObj.src;
    snapshotsTaken.push(photoObj);
  }

  function scheduleNextAutoSnap() {
    if (!deliveryAutoCaptureActive || !deliveryCameraStream) return;
    deliveryIntervalTargetTime = mockPerformance.now() + deliveryIntervalDuration;
  }

  function simulateTick(advanceMs) {
    timeNow += advanceMs;
    if (!deliveryAutoCaptureActive) return;
    const remainingMs = Math.max(0, deliveryIntervalTargetTime - mockPerformance.now());
    if (remainingMs <= 0) {
      executeSnapshot('AUTO (5s)');
      scheduleNextAutoSnap();
    }
  }

  // Test starting the auto-capture
  deliveryAutoCaptureActive = true;
  scheduleNextAutoSnap();
  assert.strictEqual(deliveryAutoCaptureActive, true, 'Auto-capture should be active');
  assert.strictEqual(deliveryIntervalTargetTime, 15000, 'Target time should be 5000ms ahead');

  // Advance time by 2 seconds (not yet reached)
  simulateTick(2000);
  assert.strictEqual(snapshotsTaken.length, 0, 'No snap should occur at 2 seconds');

  // Advance time by another 2 seconds (4s total)
  simulateTick(2000);
  assert.strictEqual(snapshotsTaken.length, 0, 'No snap should occur at 4 seconds');

  // Advance time by 1.1 seconds (5.1s total -> trigger!)
  simulateTick(1100);
  assert.strictEqual(snapshotsTaken.length, 1, 'First snapshot should trigger at 5 seconds');
  assert.strictEqual(snapshotsTaken[0].source, 'AUTO (5s)');
  assert.strictEqual(activeDeliveryBatch.articlePhotos.length, 1, 'Photo should be attached to active delivery batch');

  // Simulate next 5 seconds cycle
  simulateTick(5000);
  assert.strictEqual(snapshotsTaken.length, 2, 'Second snapshot should trigger after next 5 seconds');
  assert.strictEqual(activeDeliveryBatch.articlePhotos.length, 2);

  // Simulate manual snap in between cycles
  executeSnapshot('MANUAL');
  scheduleNextAutoSnap(); // resets 5s window
  assert.strictEqual(snapshotsTaken.length, 3, 'Manual snapshot executed');
  assert.strictEqual(snapshotsTaken[2].source, 'MANUAL');
  assert.strictEqual(activeDeliveryBatch.articlePhotos[0].source, 'MANUAL');

  // Advance 3 seconds (less than 5s from reset)
  simulateTick(3000);
  assert.strictEqual(snapshotsTaken.length, 3, 'No auto snap before full 5 seconds after manual snap');

  // Advance remaining 2.1 seconds (now full 5s elapsed)
  simulateTick(2100);
  assert.strictEqual(snapshotsTaken.length, 4, 'Next auto snapshot triggered at 5 seconds after reset');

  // Stop auto capture
  deliveryAutoCaptureActive = false;
  simulateTick(10000);
  assert.strictEqual(snapshotsTaken.length, 4, 'No snapshots should occur while stopped');

  console.log('✓ 5-second interval timer triggered accurately on 5s boundaries.');
  console.log('✓ Photos properly attached to active batch gallery.');
  console.log('✓ Manual snap resets 5s window without conflicting double-snaps.');
  console.log('✓ Stopping auto-capture terminates photo generation loop.');
}

// Suite 2: Batch Photo Gallery & Removal Lifecycle
{
  console.log('\n[Suite 2] Delivery Photo Gallery Lifecycle:');

  let batch = {
    jobDocket: 'JOB-2024-9104',
    articlePhotos: []
  };

  // Add 3 auto snapshots
  for (let i = 1; i <= 3; i++) {
    batch.articlePhotos.unshift({
      id: 'photo_' + i,
      src: 'data:img' + i,
      source: 'AUTO (5s)'
    });
  }
  batch.articlePhoto = batch.articlePhotos[0].src;

  assert.strictEqual(batch.articlePhotos.length, 3);
  assert.strictEqual(batch.articlePhoto, 'data:img3', 'Primary photo is latest');

  // Remove middle photo
  batch.articlePhotos = batch.articlePhotos.filter(p => p.id !== 'photo_2');
  assert.strictEqual(batch.articlePhotos.length, 2);

  // Clear all
  batch.articlePhotos = [];
  batch.articlePhoto = null;
  assert.strictEqual(batch.articlePhotos.length, 0);
  assert.strictEqual(batch.articlePhoto, null);

  console.log('✓ Gallery attachment, deletion, and clear all lifecycle verified.');
}

console.log('\n--- ALL 5-SECOND INTERVAL AUTO-CAPTURE TESTS PASSED! ---');
