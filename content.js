// TabCat — On-page Shadow DOM overlay & cat behavior (v0.7.0)
// Supports: Hats, Sweaters, Accessories, Rare Skins, Catnip Zoomies,
// Yarn Ball, Laser Pointer, Wind-up Mouse, Cardboard Box & Mini-Kitten Buddy!
(function () {
  if (window.top !== window.self) return;
  if (!globalThis.TabCatSprites) return;

  const CONTENT_VERSION = '0.7.1';
  const existingHost = document.getElementById('tabcat-shadow-host');
  if (existingHost) {
    if (existingHost.dataset.version === CONTENT_VERSION) return;
    existingHost.remove();
  }

  const { renderFrame, renderMouse, renderEmptyBox, FRAMES, GRID_W, GRID_H } = globalThis.TabCatSprites;
  const i18n = globalThis.TabCatI18n;

  function tr(key) {
    return i18n ? i18n.t(state.lang, key) : key;
  }

  function pickTr(key) {
    const val = tr(key);
    if (Array.isArray(val) && val.length > 0) {
      return val[Math.floor(Math.random() * val.length)];
    }
    return String(val || '');
  }

  const CSS_TEXT = `
    .tabcat-layer {
      position: fixed;
      inset: 0;
      pointer-events: none;
      font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    }

    .tabcat-layer.hidden { display: none; }

    .tabcat-actor {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: auto;
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
      will-change: transform;
      filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
    }

    .tabcat-actor.dragging { cursor: grabbing; }

    .tabcat-canvas {
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      display: block;
      transform-origin: 50% 10%;
      transition: transform 0.08s linear;
    }

    .tabcat-kitten {
      position: fixed;
      top: 0;
      left: 0;
      pointer-events: auto;
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
      display: none;
      will-change: transform;
      filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.18));
    }

    .tabcat-kitten.active { display: block; }
    .tabcat-kitten.dragging { cursor: grabbing; }

    .tabcat-kitten canvas {
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      display: block;
      transform-origin: 50% 10%;
      transition: transform 0.08s linear;
    }

    .tabcat-scratch {
      position: fixed;
      width: 96px;
      height: 96px;
      margin: -48px 0 0 -48px;
      pointer-events: none;
      z-index: 9;
      animation: tabcat-scratch-fade 2.8s ease-out forwards;
    }

    @keyframes tabcat-scratch-fade {
      0% { opacity: 0; transform: scale(0.65) rotate(-6deg); }
      10% { opacity: 1; transform: scale(1.06) rotate(0deg); }
      65% { opacity: 0.92; transform: scale(1) rotate(0deg); }
      100% { opacity: 0; transform: scale(0.98) rotate(0deg); }
    }

    .tabcat-bubble {
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%) translateY(6px);
      background: #fffdf9;
      color: #2c2420;
      border: 2px solid #471e0d;
      border-radius: 12px;
      padding: 6px 10px;
      font-size: 12px;
      font-weight: 600;
      line-height: 1.3;
      white-space: nowrap;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .tabcat-bubble::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 6px 5px 0 5px;
      border-style: solid;
      border-color: #471e0d transparent transparent transparent;
    }

    .tabcat-bubble.below {
      bottom: auto;
      top: calc(100% + 6px);
      transform: translateX(-50%) translateY(-6px);
    }

    .tabcat-bubble.below::after {
      top: auto;
      bottom: 100%;
      border-width: 0 5px 6px 5px;
      border-color: transparent transparent #471e0d transparent;
    }

    .tabcat-bubble.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    .tabcat-heart {
      position: absolute;
      bottom: calc(100% - 10px);
      left: 50%;
      font-size: 16px;
      color: #ff5c8a;
      pointer-events: none;
      text-shadow: 0 1px 0 #471e0d;
      animation: tabcat-float-up 1.1s ease-out forwards;
    }

    .tabcat-sparkle {
      position: absolute;
      bottom: 50%;
      left: 50%;
      font-size: 14px;
      pointer-events: none;
      animation: tabcat-float-up 0.9s ease-out forwards;
    }

    .tabcat-fish-drop {
      position: absolute;
      bottom: calc(100% - 4px);
      left: 35%;
      font-size: 18px;
      pointer-events: none;
      animation: tabcat-fish-fall 0.65s ease-in forwards;
    }

    .tabcat-zzz {
      position: absolute;
      bottom: 56%;
      left: 58%;
      font-size: 13px;
      font-weight: 800;
      color: #7c89c9;
      pointer-events: none;
      text-shadow: 0 1px 0 #ffffff, 0 -1px 0 #ffffff, 1px 0 0 #ffffff, -1px 0 0 #ffffff;
      animation: tabcat-zzz-float 2.1s ease-out forwards;
    }

    /* Toys overlays */
    .tabcat-yarn-svg {
      position: fixed;
      inset: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      display: none;
    }
    .tabcat-yarn-svg.active { display: block; }

    .tabcat-laser-dot {
      position: fixed;
      top: 0;
      left: 0;
      width: 12px;
      height: 12px;
      margin: -6px 0 0 -6px;
      border-radius: 50%;
      background: #ff1e42;
      box-shadow: 0 0 8px 3px rgba(255, 30, 66, 0.8), 0 0 18px 6px rgba(255, 30, 66, 0.45);
      pointer-events: none;
      display: none;
    }
    .tabcat-laser-dot.active { display: block; }

    .tabcat-mouse {
      position: fixed;
      top: 0;
      left: 0;
      width: 36px;
      height: 21px;
      pointer-events: none;
      display: none;
      will-change: transform;
    }
    .tabcat-mouse.active { display: block; }
    .tabcat-mouse canvas {
      width: 36px;
      height: 21px;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      display: block;
    }

    .tabcat-box {
      position: fixed;
      top: 0;
      left: 0;
      width: 64px;
      height: 36px;
      pointer-events: auto;
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
      touch-action: none;
      display: none;
      will-change: transform;
    }
    .tabcat-box.dragging { cursor: grabbing; }
    .tabcat-box.active { display: block; }
    .tabcat-box canvas {
      width: 64px;
      height: 36px;
      image-rendering: pixelated;
      image-rendering: crisp-edges;
      display: block;
    }

    .tabcat-toy-banner {
      position: fixed;
      top: 14px;
      right: 16px;
      display: none;
      align-items: center;
      gap: 8px;
      background: #fffdf9;
      color: #471e0d;
      border: 2px solid #471e0d;
      border-radius: 999px;
      padding: 6px 12px;
      font-size: 12px;
      font-weight: 700;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.16);
      pointer-events: auto;
      cursor: pointer;
    }
    .tabcat-toy-banner.active { display: inline-flex; }
    .tabcat-toy-banner:hover { background: #fff1e3; }

    @keyframes tabcat-float-up {
      0% { opacity: 0; transform: translate(-50%, 4px) scale(0.7); }
      20% { opacity: 1; transform: translate(calc(-50% + var(--dx, 0px)), -6px) scale(1.1); }
      100% { opacity: 0; transform: translate(calc(-50% + var(--dx, 0px)), -38px) scale(0.95); }
    }

    @keyframes tabcat-fish-fall {
      0% { opacity: 0; transform: translate(-50%, -26px) rotate(-18deg) scale(1.1); }
      30% { opacity: 1; }
      100% { opacity: 0; transform: translate(-50%, 36px) rotate(12deg) scale(0.8); }
    }

    @keyframes tabcat-zzz-float {
      0% { opacity: 0; transform: translate(0, 4px) scale(0.75); }
      25% { opacity: 0.95; transform: translate(6px, -10px) scale(1); }
      100% { opacity: 0; transform: translate(16px, -36px) scale(1.15); }
    }
  `;

  const host = document.createElement('div');
  host.id = 'tabcat-shadow-host';
  host.dataset.version = CONTENT_VERSION;
  host.setAttribute(
    'style',
    [
      'all: initial !important',
      'position: fixed !important',
      'inset: 0 !important',
      'width: 100vw !important',
      'height: 100vh !important',
      'pointer-events: none !important',
      'z-index: 2147483647 !important',
      'overflow: hidden !important',
      'display: block !important',
      'visibility: visible !important',
      'opacity: 1 !important'
    ].join(';')
  );

  const shadow = host.attachShadow({ mode: 'open' });

  let styled = false;
  try {
    if ('adoptedStyleSheets' in shadow && typeof CSSStyleSheet === 'function') {
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(CSS_TEXT);
      shadow.adoptedStyleSheets = [sheet];
      styled = true;
    }
  } catch (_) {}

  if (!styled) {
    const style = document.createElement('style');
    style.textContent = CSS_TEXT;
    shadow.appendChild(style);
  }

  const layer = document.createElement('div');
  layer.className = 'tabcat-layer';

  // Yarn SVG
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const yarnSvg = document.createElementNS(SVG_NS, 'svg');
  yarnSvg.setAttribute('class', 'tabcat-yarn-svg');

  const yarnString = document.createElementNS(SVG_NS, 'path');
  yarnString.setAttribute('fill', 'none');
  yarnString.setAttribute('stroke', '#c93b52');
  yarnString.setAttribute('stroke-width', '2.5');
  yarnString.setAttribute('stroke-linecap', 'round');

  const yarnGroup = document.createElementNS(SVG_NS, 'g');
  const yarnCircle = document.createElementNS(SVG_NS, 'circle');
  yarnCircle.setAttribute('r', '13');
  yarnCircle.setAttribute('fill', '#e6495c');
  yarnCircle.setAttribute('stroke', '#471e0d');
  yarnCircle.setAttribute('stroke-width', '2.5');

  const yarnStripe1 = document.createElementNS(SVG_NS, 'path');
  yarnStripe1.setAttribute('d', 'M -8 -6 Q 0 0 9 -4');
  yarnStripe1.setAttribute('fill', 'none');
  yarnStripe1.setAttribute('stroke', '#ff8fa3');
  yarnStripe1.setAttribute('stroke-width', '2');
  yarnStripe1.setAttribute('stroke-linecap', 'round');

  const yarnStripe2 = document.createElementNS(SVG_NS, 'path');
  yarnStripe2.setAttribute('d', 'M -9 3 Q 0 -3 8 6');
  yarnStripe2.setAttribute('fill', 'none');
  yarnStripe2.setAttribute('stroke', '#b5283d');
  yarnStripe2.setAttribute('stroke-width', '2');
  yarnStripe2.setAttribute('stroke-linecap', 'round');

  yarnGroup.appendChild(yarnCircle);
  yarnGroup.appendChild(yarnStripe1);
  yarnGroup.appendChild(yarnStripe2);
  yarnSvg.appendChild(yarnString);
  yarnSvg.appendChild(yarnGroup);

  // Laser dot
  const laserDot = document.createElement('div');
  laserDot.className = 'tabcat-laser-dot';

  // Wind-up pixel mouse
  const mouseEl = document.createElement('div');
  mouseEl.className = 'tabcat-mouse';
  const mouseCanvas = document.createElement('canvas');
  mouseCanvas.width = 36;
  mouseCanvas.height = 21;
  mouseEl.appendChild(mouseCanvas);

  // Cardboard box on floor
  const boxEl = document.createElement('div');
  boxEl.className = 'tabcat-box';
  const boxCanvas = document.createElement('canvas');
  boxCanvas.width = 64;
  boxCanvas.height = 36;
  boxEl.appendChild(boxCanvas);
  renderEmptyBox(boxCanvas);

  // Toy exit banner
  const toyBanner = document.createElement('button');
  toyBanner.type = 'button';
  toyBanner.className = 'tabcat-toy-banner';
  toyBanner.addEventListener('click', () => {
    chrome.storage.local.set({ yarnMode: false, activeToy: 'none' });
  });

  // Mini-kitten buddy
  const kittenEl = document.createElement('div');
  kittenEl.className = 'tabcat-kitten';
  const kittenCanvas = document.createElement('canvas');
  kittenEl.appendChild(kittenCanvas);

  // Main cat actor
  const actor = document.createElement('div');
  actor.className = 'tabcat-actor';

  const bubble = document.createElement('div');
  bubble.className = 'tabcat-bubble';

  const canvas = document.createElement('canvas');
  canvas.className = 'tabcat-canvas';

  actor.appendChild(bubble);
  actor.appendChild(canvas);

  layer.appendChild(yarnSvg);
  layer.appendChild(laserDot);
  layer.appendChild(mouseEl);
  layer.appendChild(boxEl);
  layer.appendChild(toyBanner);
  layer.appendChild(kittenEl);
  layer.appendChild(actor);
  shadow.appendChild(layer);

  function ensureMounted() {
    if (!host.isConnected && document.documentElement) {
      document.documentElement.appendChild(host);
    }
  }
  ensureMounted();

  let catScale = 3;
  let catWidth = GRID_W * catScale;
  let catHeight = GRID_H * catScale;
  let kittenWidth = Math.round(catWidth * 0.62);
  let kittenHeight = Math.round(catHeight * 0.62);

  function applyCatScale(scale) {
    const s = Math.max(2, Math.min(5, Math.round(Number(scale) || 3)));
    catScale = s;
    catWidth = GRID_W * s;
    catHeight = GRID_H * s;
    actor.style.width = `${catWidth}px`;
    actor.style.height = `${catHeight}px`;
    canvas.style.width = `${catWidth}px`;
    canvas.style.height = `${catHeight}px`;
    canvas.width = catWidth;
    canvas.height = catHeight;

    // Integer pixel scale for crisp mini-kitten with zero subpixel shimmer
    const kScale = Math.max(2, s - 1);
    kittenWidth = s === 2 ? 36 : GRID_W * kScale;
    kittenHeight = s === 2 ? 30 : GRID_H * kScale;
    kittenEl.style.width = `${kittenWidth}px`;
    kittenEl.style.height = `${kittenHeight}px`;
    kittenCanvas.style.width = `${kittenWidth}px`;
    kittenCanvas.style.height = `${kittenHeight}px`;
    kittenCanvas.width = GRID_W * kScale;
    kittenCanvas.height = GRID_H * kScale;
  }
  applyCatScale(3);

  function getFloorY() {
    const vh = window.innerHeight || 700;
    return Math.max(16, vh - catHeight - 2);
  }

  const initialWidth = window.innerWidth || 1000;
  const state = {
    lang: 'en',
    color: 'ginger',
    equippedHat: 'none',
    equippedSweater: 'none',
    equippedAccessory: 'none',
    visible: true,
    allowFreeDrag: false,
    allowFreeRoam: false,
    yarnMode: false,
    activeToy: 'none', // 'none' | 'laser' | 'mouse' | 'box'
    hasKitten: false,
    kittenEnabled: false,
    catnipUntilTs: 0,
    isActiveSiteSleepy: false,
    sleepySinceTs: null,
    sleepyLimitMinutes: 5,
    sleepStage: 'awake',
    pomodoroPhase: 'idle',
    hasShownYawnBubble: false,
    lastZzzTime: 0,
    lastCatnipSparkleTime: 0,

    x: Math.max(24, Math.min(initialWidth - 160, Math.floor(initialWidth * 0.72))),
    y: getFloorY(),
    targetX: null,
    targetY: null,
    facingLeft: false,
    mode: 'sit',
    modeUntil: Date.now() + 3000,
    frameIdx: 0,
    lastFrameTime: 0,
    lastTickTime: performance.now(),

    isDragging: false,
    dragMoved: false,
    dragOffsetX: 0,
    dragOffsetY: 0,
    dragPrevX: 0,
    dragTiltDeg: 0,

    lastHandledEventTs: 0
  };

  // Mini-kitten buddy state
  const kitten = {
    x: state.x - 55,
    y: getFloorY() + (catHeight - kittenHeight),
    facingLeft: false,
    mode: 'sit',
    isWalking: false,
    frameIdx: 0,
    lastFrameTime: 0,
    isDragging: false,
    dragMoved: false,
    dragOffsetX: 0,
    dragOffsetY: 0,
    dragPrevX: 0,
    dragTiltDeg: 0,
    angryNotified: false
  };

  // Yarn / Laser cursor tracker
  const cursor = {
    x: Math.floor(initialWidth * 0.5),
    y: Math.floor((window.innerHeight || 700) * 0.55)
  };

  const yarn = {
    ballX: cursor.x,
    ballY: cursor.y + 75,
    vx: 0,
    vy: 0,
    rot: 0,
    lastCatchTs: 0
  };

  // Wind-up mouse state
  const toyMouse = {
    x: Math.floor(initialWidth * 0.35),
    y: (window.innerHeight || 700) - 24,
    vx: 115,
    frameIdx: 0,
    lastFrameTime: 0,
    lastCatchTs: 0
  };

  // Cardboard box state (draggable!)
  const toyBox = {
    x: Math.floor(initialWidth * 0.35),
    y: (window.innerHeight || 700) - 38,
    catInside: false,
    isDragging: false,
    dragMoved: false,
    dragOffsetX: 0,
    dragOffsetY: 0
  };

  let bubbleTimer = null;

  function isCatnipActive() {
    return state.catnipUntilTs > Date.now();
  }

  function updateVisibility() {
    const isFullscreen = Boolean(document.fullscreenElement);
    layer.classList.toggle('hidden', !state.visible || isFullscreen);
  }

  function updateToysUI() {
    const canShow = state.visible && !document.fullscreenElement;
    const isYarn = canShow && state.yarnMode;
    const isLaser = canShow && state.activeToy === 'laser';
    const isMouse = canShow && state.activeToy === 'mouse';
    const isBox = canShow && state.activeToy === 'box';

    yarnSvg.classList.toggle('active', isYarn);
    laserDot.classList.toggle('active', isLaser);
    mouseEl.classList.toggle('active', isMouse);
    // Show empty box on floor when box toy is active AND cat is not currently inside it
    boxEl.classList.toggle('active', isBox && !toyBox.catInside);

    const anyToy = isYarn || isLaser || isMouse || isBox;
    toyBanner.classList.toggle('active', anyToy);
    if (isYarn) toyBanner.textContent = tr('yarnBanner');
    else if (isLaser) toyBanner.textContent = tr('laserBanner');
    else if (isMouse) toyBanner.textContent = tr('mouseBanner');
    else if (isBox) toyBanner.textContent = tr('boxBanner');

    kittenEl.classList.toggle('active', canShow && state.hasKitten && state.kittenEnabled);
  }

  // Draggable cardboard box (drag to move, or click to summon cat inside!)
  boxEl.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    toyBox.isDragging = true;
    toyBox.dragMoved = false;
    toyBox.dragOffsetX = e.clientX - toyBox.x;
    toyBox.dragOffsetY = e.clientY - toyBox.y;
    boxEl.classList.add('dragging');
    boxEl.setPointerCapture(e.pointerId);
  });

  boxEl.addEventListener('pointermove', (e) => {
    if (!toyBox.isDragging) return;
    const nextX = e.clientX - toyBox.dragOffsetX;
    const nextY = state.allowFreeDrag ? (e.clientY - toyBox.dragOffsetY) : toyBox.y;
    if (Math.abs(nextX - toyBox.x) > 4 || Math.abs(nextY - toyBox.y) > 4) {
      toyBox.dragMoved = true;
    }
    const vw = window.innerWidth || 1000;
    const vh = window.innerHeight || 700;
    toyBox.x = Math.max(12, Math.min(vw - 76, nextX));
    if (state.allowFreeDrag) {
      toyBox.y = Math.max(16, Math.min(vh - 38, nextY));
    }
  });

  function endBoxDrag(e) {
    if (!toyBox.isDragging) return;
    toyBox.isDragging = false;
    boxEl.classList.remove('dragging');
    try { boxEl.releasePointerCapture(e.pointerId); } catch (_) {}

    if (!toyBox.dragMoved && state.activeToy === 'box') {
      state.targetX = toyBox.x;
      state.targetY = Math.max(12, toyBox.y - (catHeight - 36));
      state.mode = 'walk';
      state.modeUntil = Date.now() + 8000;
    }
  }
  boxEl.addEventListener('pointerup', endBoxDrag);
  boxEl.addEventListener('pointercancel', endBoxDrag);

  // Temporary 3-claw scratch mark on the screen!
  function spawnClawScratch(cx, cy) {
    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'tabcat-scratch');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.style.left = `${Math.round(cx)}px`;
    svg.style.top = `${Math.round(cy)}px`;

    const paths = [
      'M 18 22 Q 46 42 74 78',
      'M 34 14 Q 58 38 86 68',
      'M 12 38 Q 38 56 64 88'
    ];
    paths.forEach((d) => {
      const glow = document.createElementNS(SVG_NS, 'path');
      glow.setAttribute('d', d);
      glow.setAttribute('fill', 'none');
      glow.setAttribute('stroke', 'rgba(255, 255, 255, 0.85)');
      glow.setAttribute('stroke-width', '8');
      glow.setAttribute('stroke-linecap', 'round');

      const slash = document.createElementNS(SVG_NS, 'path');
      slash.setAttribute('d', d);
      slash.setAttribute('fill', 'none');
      slash.setAttribute('stroke', '#e63946');
      slash.setAttribute('stroke-width', '4.2');
      slash.setAttribute('stroke-linecap', 'round');

      svg.appendChild(glow);
      svg.appendChild(slash);
    });

    layer.appendChild(svg);
    setTimeout(() => svg.remove(), 2850);
  }

  // Mini-kitten scruff drag (triggers protective big cat!)
  function releaseKittenDrag(pointerId) {
    if (!kitten.isDragging) return;
    kitten.isDragging = false;
    kitten.dragMoved = false;
    kitten.angryNotified = false;
    kitten.dragTiltDeg = 0;
    kittenCanvas.style.transform = 'rotate(0deg)';
    kittenEl.classList.remove('dragging');
    if (pointerId !== undefined) {
      try { kittenEl.releasePointerCapture(pointerId); } catch (_) {}
    }
    kitten.mode = 'sit';
  }

  kittenEl.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    kitten.isDragging = true;
    kitten.dragMoved = false;
    kitten.angryNotified = false;
    kitten.dragOffsetX = e.clientX - kitten.x;
    kitten.dragOffsetY = e.clientY - kitten.y;
    kitten.dragPrevX = e.clientX;
    kittenEl.classList.add('dragging');
    kittenEl.setPointerCapture(e.pointerId);
  });

  kittenEl.addEventListener('pointermove', (e) => {
    if (!kitten.isDragging) return;
    const nextX = e.clientX - kitten.dragOffsetX;
    const nextY = e.clientY - kitten.dragOffsetY;

    if (Math.abs(nextX - kitten.x) > 4 || Math.abs(nextY - kitten.y) > 4) {
      kitten.dragMoved = true;
      kitten.mode = 'held';
      if (!kitten.angryNotified) {
        kitten.angryNotified = true;
        toyBox.catInside = false;
        updateToysUI();
        showBubble(tr('phraseKittenGrab'), 3200);
        chrome.runtime.sendMessage({ type: 'KITTEN_GRABBED' }).catch(() => {});
      }
    }

    const vx = e.clientX - kitten.dragPrevX;
    kitten.dragPrevX = e.clientX;
    kitten.dragTiltDeg = Math.max(-15, Math.min(15, kitten.dragTiltDeg * 0.65 - vx * 0.9));

    const vw = window.innerWidth || 1000;
    const vh = window.innerHeight || 700;
    kitten.x = Math.max(8, Math.min(vw - kittenWidth - 8, nextX));
    kitten.y = Math.max(8, Math.min(vh - kittenHeight - 2, nextY));
  });

  kittenEl.addEventListener('pointerup', (e) => releaseKittenDrag(e.pointerId));
  kittenEl.addEventListener('pointercancel', (e) => releaseKittenDrag(e.pointerId));

  function showBubble(text, durationMs = 3000) {
    bubble.textContent = text;
    const vw = window.innerWidth || 1000;
    const nearTop = state.y < 68;
    const nearLeft = state.x < 120;
    const nearRight = state.x > vw - 190;

    bubble.classList.toggle('below', nearTop);
    if (nearLeft) {
      bubble.style.left = '20%';
      bubble.style.transform = 'translateX(-15%) translateY(0)';
    } else if (nearRight) {
      bubble.style.left = '80%';
      bubble.style.transform = 'translateX(-85%) translateY(0)';
    } else {
      bubble.style.left = '50%';
      bubble.style.transform = '';
    }

    bubble.classList.add('show');
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove('show'), durationMs);
  }

  function spawnHearts(count = 2) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement('span');
        heart.className = 'tabcat-heart';
        heart.textContent = '♥';
        const dx = Math.round((Math.random() - 0.5) * 34);
        heart.style.setProperty('--dx', `${dx}px`);
        actor.appendChild(heart);
        setTimeout(() => heart.remove(), 1150);
      }, i * 160);
    }
  }

  function spawnSparkle() {
    const sp = document.createElement('span');
    sp.className = 'tabcat-sparkle';
    sp.textContent = Math.random() < 0.5 ? '✨' : '♥';
    const dx = Math.round((Math.random() - 0.5) * 44);
    sp.style.setProperty('--dx', `${dx}px`);
    actor.appendChild(sp);
    setTimeout(() => sp.remove(), 950);
  }

  function spawnFishDrop(emoji = '🐟') {
    const fish = document.createElement('span');
    fish.className = 'tabcat-fish-drop';
    fish.textContent = emoji;
    actor.appendChild(fish);
    setTimeout(() => fish.remove(), 700);
  }

  function spawnZzz() {
    const z = document.createElement('span');
    z.className = 'tabcat-zzz';
    z.textContent = Math.random() < 0.5 ? 'Z' : 'z';
    z.style.left = state.facingLeft ? '28%' : '62%';
    actor.appendChild(z);
    setTimeout(() => z.remove(), 2150);
  }

  function triggerHappy(phrase) {
    toyBox.catInside = false;
    state.mode = 'happy';
    state.modeUntil = Date.now() + 2400;
    state.targetX = null;
    state.targetY = null;
    state.frameIdx = 0;
    spawnHearts(3);
    if (phrase) showBubble(phrase, 3000);
    updateToysUI();
  }

  function triggerFeed(phrase, emoji = '🐟') {
    toyBox.catInside = false;
    state.mode = 'eat';
    state.modeUntil = Date.now() + 3000;
    state.targetX = null;
    state.targetY = null;
    state.frameIdx = 0;
    spawnFishDrop(emoji);
    setTimeout(() => spawnHearts(3), 450);
    if (phrase) showBubble(phrase, 3400);
    updateToysUI();
  }

  function triggerPet(phrase, notifyBackground = false) {
    if (toyBox.catInside) {
      // Clicking cat inside box makes him hop out playfully!
      toyBox.catInside = false;
      triggerHappy(tr('phraseBox'));
      return;
    }
    if (state.sleepStage === 'sleep') {
      showBubble(pickTr('phrasesSleepPoke'), 3000);
      spawnHearts(1);
      return;
    }
    state.mode = 'pet';
    state.modeUntil = Date.now() + 2400;
    state.targetX = null;
    state.targetY = null;
    state.frameIdx = 0;
    spawnHearts(2);
    if (phrase) showBubble(phrase, 2800);
    if (notifyBackground) {
      chrome.runtime.sendMessage({ type: 'PET_ON_PAGE' }).catch(() => {});
    }
  }

  function computeSleepStage() {
    if (state.yarnMode || state.activeToy !== 'none' || isCatnipActive()) return 'awake';
    if (!state.isActiveSiteSleepy || !state.sleepySinceTs) return 'awake';
    const elapsedMs = Date.now() - state.sleepySinceTs;
    const limitMs = Math.max(1, state.sleepyLimitMinutes) * 60 * 1000;
    if (elapsedMs >= limitMs) return 'sleep';
    if (elapsedMs >= limitMs * 0.65) return 'yawn';
    return 'awake';
  }

  function syncEnvironmentState() {
    ensureMounted();
    updateToysUI();

    const nextStage = computeSleepStage();
    const prevStage = state.sleepStage;
    state.sleepStage = nextStage;

    if (state.isDragging && state.dragMoved) return;
    if (toyBox.catInside) return;

    if (nextStage === 'sleep') {
      if (prevStage !== 'sleep') {
        state.mode = 'sleep';
        state.targetX = null;
        state.targetY = null;
        state.modeUntil = Date.now() + 60000;
        if (document.visibilityState === 'visible') {
          showBubble(tr('phrasesSleepStart'), 3200);
        }
      }
      return;
    }

    if (nextStage === 'yawn') {
      if (prevStage !== 'yawn') {
        state.mode = 'yawn';
        state.targetX = null;
        state.targetY = null;
        state.modeUntil = Date.now() + 60000;
        if (!state.hasShownYawnBubble && document.visibilityState === 'visible') {
          state.hasShownYawnBubble = true;
          showBubble(pickTr('phrasesYawn'), 3200);
        }
      }
      return;
    }

    if (prevStage === 'sleep' || prevStage === 'yawn') {
      state.hasShownYawnBubble = false;
      state.mode = state.pomodoroPhase === 'focus' ? 'focus' : 'sit';
      state.modeUntil = Date.now() + 2500;
    }

    if (
      !state.yarnMode &&
      state.activeToy === 'none' &&
      !isCatnipActive() &&
      state.pomodoroPhase === 'focus' &&
      state.mode !== 'happy' &&
      state.mode !== 'pet' &&
      state.mode !== 'eat' &&
      state.mode !== 'focus'
    ) {
      state.mode = 'focus';
      state.targetX = null;
      state.targetY = null;
      state.modeUntil = Date.now() + 10000;
    }
  }

  function chooseNextBehavior() {
    const now = Date.now();
    if (state.yarnMode || state.activeToy === 'laser' || state.activeToy === 'mouse') return;

    if (state.activeToy === 'box') {
      if (toyBox.catInside) {
        toyBox.catInside = false;
        state.mode = 'sit';
        state.modeUntil = now + 2600;
        updateToysUI();
        return;
      }
      if (Math.random() < 0.65) {
        state.targetX = toyBox.x;
        state.targetY = getFloorY();
        state.facingLeft = toyBox.x < state.x;
        state.mode = 'walk';
        state.modeUntil = now + 9000;
        return;
      }
    }

    if (state.sleepStage === 'sleep') {
      state.mode = 'sleep';
      state.modeUntil = now + 10000;
      return;
    }
    if (state.sleepStage === 'yawn') {
      state.mode = 'yawn';
      state.modeUntil = now + 10000;
      return;
    }
    if (state.pomodoroPhase === 'focus' && !isCatnipActive()) {
      state.mode = 'focus';
      state.modeUntil = now + 10000;
      return;
    }

    const vw = window.innerWidth || 1000;
    const vh = window.innerHeight || 700;
    const maxX = Math.max(20, vw - catWidth - 20);
    const floorY = getFloorY();

    // During Catnip Zoomies, keep zooming around!
    const walkChance = isCatnipActive() ? 0.96 : 0.56;
    const roll = Math.random();

    if (roll < walkChance) {
      const minStep = isCatnipActive() ? 180 : 90;
      const maxStep = Math.min(isCatnipActive() ? 520 : 380, maxX);
      let nextX = state.x + (Math.random() < 0.5 ? -1 : 1) * (minStep + Math.random() * maxStep);
      nextX = Math.max(16, Math.min(maxX, nextX));
      if (Math.abs(nextX - state.x) < 40) {
        nextX = state.x > maxX / 2 ? 24 : maxX - 24;
      }

      let nextY = state.allowFreeDrag ? state.y : floorY;
      if (state.allowFreeRoam || isCatnipActive()) {
        const minY = 24;
        const stepY = (Math.random() - 0.5) * Math.min(360, vh * 0.7);
        nextY = Math.max(minY, Math.min(floorY, state.y + stepY));
      }

      state.targetX = nextX;
      state.targetY = nextY;
      state.facingLeft = nextX < state.x;
      state.mode = 'walk';
      state.modeUntil = now + (isCatnipActive() ? 4500 : 10000);
    } else if (roll < 0.84) {
      state.mode = 'sit';
      state.targetX = null;
      state.targetY = null;
      state.modeUntil = now + 3800 + Math.random() * 4200;
    } else {
      state.mode = 'idle';
      state.targetX = null;
      state.targetY = null;
      state.modeUntil = now + 2400 + Math.random() * 2800;
    }
  }

  function clampPosition() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    if (vw && vw >= catWidth + 24) {
      const maxX = Math.max(12, vw - catWidth - 12);
      state.x = Math.max(12, Math.min(maxX, state.x));
      toyBox.x = Math.max(24, Math.min(vw - 88, toyBox.x));
    }
    if (vh && vh >= catHeight + 14) {
      const floorY = getFloorY();
      if (!state.allowFreeDrag) {
        toyBox.y = vh - 38;
      } else {
        toyBox.y = Math.max(16, Math.min(vh - 38, toyBox.y));
      }
      toyMouse.y = vh - 23;
      if (!state.allowFreeDrag && !state.allowFreeRoam && !isCatnipActive() && !(kitten.isDragging && kitten.dragMoved)) {
        state.y = floorY;
      } else {
        state.y = Math.max(12, Math.min(floorY, state.y));
      }
    }
  }

  window.addEventListener('pointermove', (e) => {
    cursor.x = e.clientX;
    cursor.y = e.clientY;
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (state.yarnMode || state.activeToy !== 'none')) {
      chrome.storage.local.set({ yarnMode: false, activeToy: 'none' });
    }
  });

  actor.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    state.isDragging = true;
    state.dragMoved = false;
    state.dragOffsetX = e.clientX - state.x;
    state.dragOffsetY = e.clientY - state.y;
    state.dragPrevX = e.clientX;
    actor.classList.add('dragging');
    actor.setPointerCapture(e.pointerId);
  });

  actor.addEventListener('pointermove', (e) => {
    if (!state.isDragging) return;
    const nextX = e.clientX - state.dragOffsetX;
    const nextY = state.allowFreeDrag ? (e.clientY - state.dragOffsetY) : state.y;

    if (Math.abs(nextX - state.x) > 4 || Math.abs(nextY - state.y) > 4) {
      state.dragMoved = true;
      toyBox.catInside = false;
      state.mode = 'held';
      updateToysUI();
    }

    const vx = e.clientX - state.dragPrevX;
    state.dragPrevX = e.clientX;
    state.dragTiltDeg = Math.max(-14, Math.min(14, state.dragTiltDeg * 0.65 - vx * 0.85));

    state.x = nextX;
    if (state.allowFreeDrag) state.y = nextY;
    clampPosition();
    state.targetX = null;
    state.targetY = null;
  });

  function endDrag(e) {
    if (!state.isDragging) return;
    state.isDragging = false;
    state.dragTiltDeg = 0;
    canvas.style.transform = 'rotate(0deg)';
    actor.classList.remove('dragging');
    try {
      actor.releasePointerCapture(e.pointerId);
    } catch (_) {}

    if (!state.dragMoved) {
      triggerPet(pickTr('phrasesPet'), true);
    } else if (state.sleepStage === 'awake') {
      state.mode = state.pomodoroPhase === 'focus' ? 'focus' : 'sit';
      state.modeUntil = Date.now() + 2500;
    }
  }

  actor.addEventListener('pointerup', endDrag);
  actor.addEventListener('pointercancel', endDrag);

  window.addEventListener('resize', clampPosition);
  document.addEventListener('fullscreenchange', () => {
    updateVisibility();
    updateToysUI();
  });

  function handleEvent(ev) {
    if (!ev || !ev.ts || ev.ts <= state.lastHandledEventTs) return;
    if (Date.now() - ev.ts > 3000) {
      state.lastHandledEventTs = ev.ts;
      return;
    }
    state.lastHandledEventTs = ev.ts;
    if (document.visibilityState !== 'visible' || !state.visible) return;

    if (ev.type === 'tab_closed') triggerHappy(pickTr('phrasesTabClosed'));
    else if (ev.type === 'tab_closed_fish') triggerHappy(pickTr('phrasesTabFish'));
    else if (ev.type === 'pet_from_popup') triggerPet(pickTr('phrasesPet'), false);
    else if (ev.type === 'feed_cat') triggerFeed(pickTr('phrasesFeed'), '🐟');
    else if (ev.type === 'feed_salmon') triggerFeed(tr('phraseSalmon'), '🍣');
    else if (ev.type === 'catnip_start') {
      showBubble(tr('phraseCatnip'), 3500);
      spawnHearts(4);
      chooseNextBehavior();
    } else if (ev.type === 'hat_equipped') triggerHappy(pickTr('phrasesHat'));
    else if (ev.type === 'wake_up') triggerHappy(pickTr('phrasesWakeUp'));
    else if (ev.type === 'pomodoro_started') {
      state.mode = 'focus';
      state.targetX = null;
      state.targetY = null;
      state.modeUntil = Date.now() + 10000;
      showBubble(pickTr('phrasesFocusStart'), 3200);
    } else if (ev.type === 'pomodoro_focus_done') triggerHappy(pickTr('phrasesFocusDone'));
    else if (ev.type === 'pomodoro_break_done') triggerHappy(pickTr('phrasesBreakDone'));
  }

  function applyLangTexts() {
    actor.title = tr('actorTitle');
    updateToysUI();
  }

  chrome.storage.local.get(
    [
      'lang',
      'catColor',
      'equippedHat',
      'equippedSweater',
      'equippedAccessory',
      'catScale',
      'visible',
      'allowFreeDrag',
      'allowFreeRoam',
      'yarnMode',
      'activeToy',
      'hasKitten',
      'kittenEnabled',
      'catnipUntilTs',
      'lastEvent',
      'isActiveSiteSleepy',
      'sleepySinceTs',
      'sleepyLimitMinutes',
      'pomodoro'
    ],
    (data) => {
      if (data.lang) state.lang = data.lang;
      if (data.catColor) state.color = data.catColor;
      if (data.equippedHat) state.equippedHat = data.equippedHat;
      if (data.equippedSweater) state.equippedSweater = data.equippedSweater;
      if (data.equippedAccessory) state.equippedAccessory = data.equippedAccessory;
      if (data.catScale) applyCatScale(data.catScale);
      if (typeof data.visible === 'boolean') state.visible = data.visible;
      state.allowFreeDrag = Boolean(data.allowFreeDrag);
      state.allowFreeRoam = Boolean(data.allowFreeRoam);
      state.yarnMode = Boolean(data.yarnMode);
      state.activeToy = data.activeToy || 'none';
      state.hasKitten = Boolean(data.hasKitten);
      state.kittenEnabled = Boolean(data.kittenEnabled);
      state.catnipUntilTs = Number(data.catnipUntilTs) || 0;
      state.isActiveSiteSleepy = Boolean(data.isActiveSiteSleepy);
      state.sleepySinceTs = data.sleepySinceTs || null;
      state.sleepyLimitMinutes = Number(data.sleepyLimitMinutes) || 5;
      state.pomodoroPhase = (data.pomodoro && data.pomodoro.phase) || 'idle';
      if (data.lastEvent && data.lastEvent.ts) {
        state.lastHandledEventTs = data.lastEvent.ts;
      }
      applyLangTexts();
      clampPosition();
      updateVisibility();
      updateToysUI();
      syncEnvironmentState();
      renderFrame(canvas, state.mode, state.frameIdx, state.color, state.facingLeft, state.equippedHat, state.equippedSweater, state.equippedAccessory);
    }
  );

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local') return;
    if (changes.lang) {
      state.lang = changes.lang.newValue || 'en';
      applyLangTexts();
    }
    if (changes.catColor) state.color = changes.catColor.newValue || 'ginger';
    if (changes.equippedHat) state.equippedHat = changes.equippedHat.newValue || 'none';
    if (changes.equippedSweater) state.equippedSweater = changes.equippedSweater.newValue || 'none';
    if (changes.equippedAccessory) state.equippedAccessory = changes.equippedAccessory.newValue || 'none';
    if (changes.catScale) {
      applyCatScale(changes.catScale.newValue);
      clampPosition();
    }
    if (changes.visible) {
      state.visible = Boolean(changes.visible.newValue);
      updateVisibility();
      updateToysUI();
    }
    if (changes.allowFreeDrag) {
      state.allowFreeDrag = Boolean(changes.allowFreeDrag.newValue);
      clampPosition();
    }
    if (changes.allowFreeRoam) {
      state.allowFreeRoam = Boolean(changes.allowFreeRoam.newValue);
      clampPosition();
    }
    if (changes.hasKitten) {
      state.hasKitten = Boolean(changes.hasKitten.newValue);
      updateToysUI();
    }
    if (changes.kittenEnabled) {
      state.kittenEnabled = Boolean(changes.kittenEnabled.newValue);
      updateToysUI();
    }
    if (changes.catnipUntilTs) {
      state.catnipUntilTs = Number(changes.catnipUntilTs.newValue) || 0;
    }
    if (changes.yarnMode) {
      state.yarnMode = Boolean(changes.yarnMode.newValue);
      if (state.yarnMode) {
        toyBox.catInside = false;
        yarn.ballX = cursor.x;
        yarn.ballY = cursor.y + 75;
        yarn.vx = 0;
        yarn.vy = 0;
        if (document.visibilityState === 'visible') showBubble(tr('phrasesYarnStart'), 2600);
      } else {
        state.mode = state.pomodoroPhase === 'focus' ? 'focus' : 'sit';
        state.modeUntil = Date.now() + 2000;
      }
      updateToysUI();
    }
    if (changes.activeToy) {
      state.activeToy = changes.activeToy.newValue || 'none';
      toyBox.catInside = false;
      if (state.activeToy === 'laser' && document.visibilityState === 'visible') {
        showBubble(tr('phraseLaser'), 2600);
      } else if (state.activeToy === 'mouse' && document.visibilityState === 'visible') {
        showBubble(tr('phraseMouse'), 2600);
      } else if (state.activeToy === 'box') {
        toyBox.x = Math.max(40, Math.min((window.innerWidth || 900) - 120, Math.floor((window.innerWidth || 900) * 0.35)));
        toyBox.y = (window.innerHeight || 700) - 38;
        if (document.visibilityState === 'visible') showBubble(tr('phraseBox'), 2600);
      } else if (state.activeToy === 'none') {
        state.mode = state.pomodoroPhase === 'focus' ? 'focus' : 'sit';
        state.modeUntil = Date.now() + 2000;
      }
      updateToysUI();
    }
    if (changes.isActiveSiteSleepy) state.isActiveSiteSleepy = Boolean(changes.isActiveSiteSleepy.newValue);
    if (changes.sleepySinceTs) {
      state.sleepySinceTs = changes.sleepySinceTs.newValue || null;
      if (!state.sleepySinceTs) state.hasShownYawnBubble = false;
    }
    if (changes.sleepyLimitMinutes) state.sleepyLimitMinutes = Number(changes.sleepyLimitMinutes) || 5;
    if (changes.pomodoro) {
      const nextPhase = (changes.pomodoro.newValue && changes.pomodoro.newValue.phase) || 'idle';
      const prevPhase = state.pomodoroPhase;
      state.pomodoroPhase = nextPhase;
      if (prevPhase === 'focus' && nextPhase !== 'focus' && state.mode === 'focus') {
        state.mode = 'sit';
        state.modeUntil = Date.now() + 2000;
      }
    }
    if (changes.lastEvent) handleEvent(changes.lastEvent.newValue);
    syncEnvironmentState();
  });

  const envTimer = setInterval(() => {
    if (document.getElementById('tabcat-shadow-host') !== host) {
      clearInterval(envTimer);
      return;
    }
    syncEnvironmentState();
  }, 1000);

  function updateYarnPhysics(dt) {
    const restLen = 78;
    const dx = yarn.ballX - cursor.x;
    const dy = yarn.ballY - cursor.y;
    const dist = Math.hypot(dx, dy) || 0.001;

    yarn.vy += 1250 * dt;
    if (dist > restLen) {
      const stretch = dist - restLen;
      yarn.vx -= (dx / dist) * stretch * 320 * dt;
      yarn.vy -= (dy / dist) * stretch * 320 * dt;
    }
    const damp = Math.pow(0.08, dt);
    yarn.vx *= damp;
    yarn.vy *= damp;
    yarn.ballX += yarn.vx * dt;
    yarn.ballY += yarn.vy * dt;
    yarn.rot += yarn.vx * dt * 0.6;

    const vw = window.innerWidth || 1000;
    const vh = window.innerHeight || 700;
    if (yarn.ballY > vh - 16) {
      yarn.ballY = vh - 16;
      yarn.vy *= -0.45;
    }
    yarn.ballX = Math.max(16, Math.min(vw - 16, yarn.ballX));

    const midX = (cursor.x + yarn.ballX) / 2;
    const midY = (cursor.y + yarn.ballY) / 2 + Math.max(0, (restLen - dist) * 0.25);
    yarnString.setAttribute('d', `M ${cursor.x} ${cursor.y} Q ${midX} ${midY} ${yarn.ballX} ${yarn.ballY}`);
    yarnGroup.setAttribute('transform', `translate(${yarn.ballX}, ${yarn.ballY}) rotate(${yarn.rot})`);
  }

  function updateKitten(now, dt) {
    if (!state.hasKitten || !state.kittenEnabled) return;

    if (kitten.isDragging && kitten.dragMoved) {
      kitten.mode = 'held';
      kitten.isWalking = false;
      kitten.dragTiltDeg *= Math.pow(0.05, dt);
      kittenCanvas.style.transform = `rotate(${kitten.dragTiltDeg.toFixed(1)}deg)`;
    } else {
      if (Math.abs(kitten.dragTiltDeg) > 0.2) {
        kitten.dragTiltDeg = 0;
        kittenCanvas.style.transform = 'rotate(0deg)';
      }

      const followOffset = state.facingLeft ? (catWidth + 12) : -(kittenWidth + 12);
      const desiredX = Math.max(8, Math.min((window.innerWidth || 1000) - kittenWidth - 8, state.x + followOffset));
      const desiredY = state.y + (catHeight - kittenHeight);

      const dx = desiredX - kitten.x;
      const dy = desiredY - kitten.y;
      const dist = Math.hypot(dx, dy);

      // Clean hysteresis prevents 60fps walk/sit & facingLeft oscillation!
      if (kitten.isWalking ? dist > 8 : dist > 20) {
        kitten.isWalking = true;
        const speed = isCatnipActive() ? 200 : 92;
        kitten.x += (dx / dist) * Math.min(dist, speed * dt);
        kitten.y += (dy / dist) * Math.min(dist, speed * dt);
        if (Math.abs(dx) > 8) {
          kitten.facingLeft = dx < 0;
        }
        kitten.mode = 'walk';
      } else {
        kitten.isWalking = false;
        kitten.facingLeft = state.facingLeft;
        kitten.mode = state.mode === 'sleep' ? 'sleep' : state.mode === 'happy' ? 'happy' : 'sit';
      }
    }

    const interval = kitten.mode === 'walk' ? 145 : kitten.mode === 'held' ? 240 : 850;
    if (now - kitten.lastFrameTime >= interval) {
      kitten.lastFrameTime = now;
      const anim = FRAMES[kitten.mode] || FRAMES.sit;
      kitten.frameIdx = (kitten.frameIdx + 1) % anim.length;
    }

    kittenEl.style.transform = `translate3d(${Math.round(kitten.x)}px, ${Math.round(kitten.y)}px, 0)`;
    renderFrame(kittenCanvas, kitten.mode, kitten.frameIdx, state.color, kitten.facingLeft, 'none', 'none', 'none');
  }

  function tick(now) {
    if (document.getElementById('tabcat-shadow-host') !== host) return;

    const dt = Math.min(0.05, (now - state.lastTickTime) / 1000);
    state.lastTickTime = now;

    if (state.visible && !document.fullscreenElement) {
      const wallNow = Date.now();
      const zoomies = isCatnipActive();

      if (zoomies && now - state.lastCatnipSparkleTime > 260) {
        state.lastCatnipSparkleTime = now;
        spawnSparkle();
      }

      if (state.yarnMode) updateYarnPhysics(dt);
      if (state.activeToy === 'laser') {
        laserDot.style.transform = `translate3d(${cursor.x}px, ${cursor.y}px, 0)`;
      }
      if (state.activeToy === 'mouse') {
        const vw = window.innerWidth || 1000;
        toyMouse.x += toyMouse.vx * dt;
        if (toyMouse.x < 18) {
          toyMouse.x = 18;
          toyMouse.vx = Math.abs(toyMouse.vx);
        } else if (toyMouse.x > vw - 54) {
          toyMouse.x = vw - 54;
          toyMouse.vx = -Math.abs(toyMouse.vx);
        }
        if (now - toyMouse.lastFrameTime > 120) {
          toyMouse.lastFrameTime = now;
          toyMouse.frameIdx = (toyMouse.frameIdx + 1) % 2;
        }
        mouseEl.style.transform = `translate3d(${Math.round(toyMouse.x)}px, ${Math.round(toyMouse.y)}px, 0)`;
        renderMouse(mouseCanvas, toyMouse.frameIdx, toyMouse.vx < 0);
      }
      if (state.activeToy === 'box') {
        boxEl.style.transform = `translate3d(${Math.round(toyBox.x)}px, ${Math.round(toyBox.y)}px, 0)`;
      }

      if (state.isDragging && state.dragMoved) {
        state.mode = 'held';
        state.dragTiltDeg *= Math.pow(0.05, dt);
        canvas.style.transform = `rotate(${state.dragTiltDeg.toFixed(1)}deg)`;
      } else {
        if (Math.abs(state.dragTiltDeg) > 0.2) {
          state.dragTiltDeg = 0;
          canvas.style.transform = 'rotate(0deg)';
        }

        const catCenterX = state.x + catWidth / 2;
        const catCenterY = state.y + catHeight / 2;

        // Protective big cat sprints to rescue the mini-kitten & scratches your screen!
        if (kitten.isDragging && kitten.dragMoved) {
          const kitCenterX = kitten.x + kittenWidth / 2;
          const kitCenterY = kitten.y + kittenHeight / 2;
          const dx = kitCenterX - catCenterX;
          const dy = kitCenterY - catCenterY;
          const dist = Math.hypot(dx, dy);

          if (dist < Math.max(46, catWidth * 0.68)) {
            // Caught up! Scratch the screen & rescue the kitten!
            spawnClawScratch(kitCenterX, kitCenterY);
            releaseKittenDrag();
            state.mode = 'happy';
            state.modeUntil = wallNow + 1800;
            showBubble(tr('phraseKittenScratch'), 3200);
          } else {
            const rescueSpeed = 215;
            state.x += (dx / dist) * Math.min(dist, rescueSpeed * dt);
            state.y += (dy / dist) * Math.min(dist, rescueSpeed * dt);
            if (Math.abs(dx) > 4) state.facingLeft = dx < 0;
            state.mode = 'walk';
          }
        } else if (state.yarnMode && state.mode !== 'happy' && state.mode !== 'eat') {
          const desiredX = yarn.ballX - catWidth / 2;
          const desiredY = state.allowFreeRoam ? (yarn.ballY - catHeight / 2) : state.y;
          const dx = desiredX - state.x;
          const dy = desiredY - state.y;
          const moveDist = Math.hypot(dx, dy);
          const ballDist = Math.hypot(yarn.ballX - catCenterX, yarn.ballY - catCenterY);

          if (ballDist < Math.max(44, catWidth * 0.65) && wallNow - yarn.lastCatchTs > 1400) {
            yarn.lastCatchTs = wallNow;
            yarn.vx += (yarn.ballX >= catCenterX ? 1 : -1) * 380;
            yarn.vy -= 420;
            triggerHappy(pickTr('phrasesYarn'));
            chrome.runtime.sendMessage({ type: 'YARN_CATCH' }).catch(() => {});
          } else if (moveDist > 12) {
            const chaseSpeed = 145;
            state.x += (dx / moveDist) * Math.min(moveDist, chaseSpeed * dt);
            state.y += (dy / moveDist) * Math.min(moveDist, chaseSpeed * dt);
            if (Math.abs(dx) > 2) state.facingLeft = dx < 0;
            state.mode = 'walk';
          } else {
            state.facingLeft = yarn.ballX < catCenterX;
            state.mode = 'idle';
          }
        } else if (state.activeToy === 'laser' && state.mode !== 'happy' && state.mode !== 'eat') {
          const desiredX = cursor.x - catWidth / 2;
          const desiredY = state.allowFreeRoam ? (cursor.y - catHeight / 2) : state.y;
          const dx = desiredX - state.x;
          const dy = desiredY - state.y;
          const moveDist = Math.hypot(dx, dy);
          const dotDist = Math.hypot(cursor.x - catCenterX, cursor.y - catCenterY);

          if (dotDist < Math.max(36, catWidth * 0.55) && wallNow - yarn.lastCatchTs > 1800) {
            yarn.lastCatchTs = wallNow;
            triggerHappy(tr('phraseLaser'));
            chrome.runtime.sendMessage({ type: 'YARN_CATCH' }).catch(() => {});
          } else if (moveDist > 10) {
            const chaseSpeed = 175;
            state.x += (dx / moveDist) * Math.min(moveDist, chaseSpeed * dt);
            state.y += (dy / moveDist) * Math.min(moveDist, chaseSpeed * dt);
            if (Math.abs(dx) > 2) state.facingLeft = dx < 0;
            state.mode = 'walk';
          } else {
            state.facingLeft = cursor.x < catCenterX;
            state.mode = 'idle';
          }
        } else if (state.activeToy === 'mouse' && state.mode !== 'happy' && state.mode !== 'eat') {
          const desiredX = toyMouse.x + 18 - catWidth / 2;
          const dx = desiredX - state.x;
          if (Math.abs(dx) < Math.max(32, catWidth * 0.5) && wallNow - toyMouse.lastCatchTs > 1800) {
            toyMouse.lastCatchTs = wallNow;
            toyMouse.vx = (dx >= 0 ? 1 : -1) * (135 + Math.random() * 40);
            triggerHappy(tr('phraseMouse'));
            chrome.runtime.sendMessage({ type: 'YARN_CATCH' }).catch(() => {});
          } else if (Math.abs(dx) > 10) {
            const chaseSpeed = 155;
            state.x += Math.sign(dx) * Math.min(Math.abs(dx), chaseSpeed * dt);
            state.facingLeft = dx < 0;
            state.mode = 'walk';
          }
        } else if (
          state.mode === 'walk' &&
          state.targetX !== null &&
          state.sleepStage === 'awake' &&
          (state.pomodoroPhase !== 'focus' || zoomies)
        ) {
          const speed = zoomies ? 215 : 64;
          const dx = state.targetX - state.x;
          const targetY = state.targetY !== null ? state.targetY : state.y;
          const dy = targetY - state.y;
          const dist = Math.hypot(dx, dy);

          if (dist <= speed * dt) {
            state.x = state.targetX;
            state.y = targetY;
            state.targetX = null;
            state.targetY = null;

            // If walking to the cardboard box, hop inside!
            if (state.activeToy === 'box' && Math.abs(state.x - toyBox.x) < 20) {
              toyBox.catInside = true;
              state.mode = 'box';
              state.modeUntil = wallNow + 7000;
              updateToysUI();
            } else {
              state.mode = 'sit';
              state.modeUntil = wallNow + (zoomies ? 500 : 3200 + Math.random() * 4000);
            }
          } else {
            state.x += (dx / dist) * speed * dt;
            state.y += (dy / dist) * speed * dt;
            if (Math.abs(dx) > 2) state.facingLeft = dx < 0;
          }
        } else if (wallNow >= state.modeUntil) {
          chooseNextBehavior();
        }
      }

      if (state.mode === 'sleep' && now - state.lastZzzTime > 1500) {
        state.lastZzzTime = now;
        spawnZzz();
      }

      clampPosition();
      actor.style.transform = `translate3d(${Math.round(state.x)}px, ${Math.round(state.y)}px, 0)`;

      const frameInterval =
        state.mode === 'walk' ? (zoomies ? 85 : (state.yarnMode || state.activeToy !== 'none') ? 105 : 145) :
        state.mode === 'held' ? 240 :
        state.mode === 'happy' ? 220 :
        state.mode === 'eat' ? 260 :
        state.mode === 'pet' ? 320 :
        state.mode === 'box' ? 900 :
        state.mode === 'sleep' ? 1100 :
        state.mode === 'yawn' ? 950 :
        state.mode === 'focus' ? 1200 :
        900;

      if (now - state.lastFrameTime >= frameInterval) {
        state.lastFrameTime = now;
        const animFrames = FRAMES[state.mode] || FRAMES.sit;
        state.frameIdx = (state.frameIdx + 1) % animFrames.length;
      }

      renderFrame(
        canvas,
        state.mode,
        state.frameIdx,
        state.color,
        state.facingLeft,
        state.equippedHat,
        state.equippedSweater,
        state.equippedAccessory
      );

      updateKitten(now, dt);
    }

    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();
