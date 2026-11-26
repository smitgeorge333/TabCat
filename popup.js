// TabCat — Popup logic (v0.7.0: Mega Pet Shop with 4 categories, Wheelie Cart, Wardrobe, Backgrounds, RU/EN/ZH)
(function () {
  const { renderFrame, HATS, SWEATERS, ACCESSORIES, TREATS, TOYS, BACKGROUNDS, RARE_SKINS } = globalThis.TabCatSprites;
  const { t } = globalThis.TabCatI18n;

  const dockButtons = Array.from(document.querySelectorAll('.dock-btn'));
  const views = {
    menu: document.getElementById('view-menu'),
    shop: document.getElementById('view-shop'),
    wardrobe: document.getElementById('view-wardrobe'),
    quests: document.getElementById('view-quests')
  };
  const questsDot = document.getElementById('questsDot');
  const dailyQuestsList = document.getElementById('dailyQuestsList');
  const achievementsList = document.getElementById('achievementsList');
  const appTitleEl = document.getElementById('appTitle');
  const catNameForm = document.getElementById('catNameForm');
  const catNameInput = document.getElementById('catNameInput');

  // Shop subtabs
  const subtabButtons = Array.from(document.querySelectorAll('.subtab-btn'));
  const subpanels = {
    clothes: document.getElementById('subtab-clothes'),
    treats: document.getElementById('subtab-treats'),
    toys: document.getElementById('subtab-toys'),
    world: document.getElementById('subtab-world')
  };

  // Header
  const levelBadge = document.getElementById('levelBadge');
  const xpBarFill = document.getElementById('xpBarFill');
  const fishBadge = document.getElementById('fishBadge');
  const tabsBadge = document.getElementById('tabsBadge');
  const fishCountEl = document.getElementById('fishCount');
  const tabsClosedEl = document.getElementById('tabsClosedCount');

  // Delivery cart banner
  const deliveryStage = document.getElementById('deliveryStage');
  const deliveryCart = document.getElementById('deliveryCart');
  const deliveryItemBadge = document.getElementById('deliveryItemBadge');
  const deliveryText = document.getElementById('deliveryText');

  // Menu stage
  const mainStage = document.querySelector('#view-menu .stage');
  const wardrobeStage = document.getElementById('wardrobeStage');
  const canvas = document.getElementById('previewCanvas');
  const moodText = document.getElementById('previewMood');
  const statusBadge = document.getElementById('sleepStatusBadge');
  const hungerVal = document.getElementById('hungerVal');
  const hungerFill = document.getElementById('hungerFill');
  const pleasureVal = document.getElementById('pleasureVal');
  const pleasureFill = document.getElementById('pleasureFill');
  const energyVal = document.getElementById('energyVal');
  const energyFill = document.getElementById('energyFill');
  const feedBtn = document.getElementById('feedBtn');
  const petBtn = document.getElementById('petBtn');
  const yarnBtn = document.getElementById('yarnBtn');
  const minigameBtn = document.getElementById('minigameBtn');
  const minigameBox = document.getElementById('minigameBox');
  const minigameCanvas = document.getElementById('minigameCanvas');
  const minigameHud = document.getElementById('minigameHud');
  const minigameHint = document.getElementById('minigameHint');
  const minigameStartBtn = document.getElementById('minigameStartBtn');
  const exportSaveBtn = document.getElementById('exportSaveBtn');
  const importSaveBtn = document.getElementById('importSaveBtn');
  const importSaveInput = document.getElementById('importSaveInput');
  const saveFeedback = document.getElementById('saveFeedback');
  const streakDayLabel = document.getElementById('streakDayLabel');
  const streakDots = document.getElementById('streakDots');
  const claimStreakBtn = document.getElementById('claimStreakBtn');

  // Pomodoro
  const pomoPhaseLabel = document.getElementById('pomoPhaseLabel');
  const pomoTimerEl = document.getElementById('pomoTimer');
  const pomoActionBtn = document.getElementById('pomoActionBtn');
  const pomoTestPreset = document.getElementById('pomoTestPreset');
  const presetButtons = Array.from(document.querySelectorAll('.preset-btn'));

  // Sleepy sites
  const sleepyLimitSelect = document.getElementById('sleepyLimitSelect');
  const currentSiteRow = document.getElementById('currentSiteRow');
  const currentSiteLabel = document.getElementById('currentSiteLabel');
  const toggleCurrentSiteBtn = document.getElementById('toggleCurrentSiteBtn');
  const addDomainForm = document.getElementById('addDomainForm');
  const domainInput = document.getElementById('domainInput');
  const domainFeedback = document.getElementById('domainFeedback');
  const sleepyChips = document.getElementById('sleepyChips');

  // Settings
  const visibleToggle = document.getElementById('visibleToggle');
  const hideSiteBtn = document.getElementById('hideSiteBtn');
  const freeDragToggle = document.getElementById('freeDragToggle');
  const freeRoamToggle = document.getElementById('freeRoamToggle');
  const advancedToggleBtn = document.getElementById('advancedToggleBtn');
  const advancedArrow = document.getElementById('advancedArrow');
  const advancedPanel = document.getElementById('advancedPanel');
  const scaleValueLabel = document.getElementById('scaleValueLabel');
  const scaleButtons = Array.from(document.querySelectorAll('.scale-btn'));
  const langButtons = Array.from(document.querySelectorAll('.lang-btn'));

  // Shop grids
  const shopHatGrid = document.getElementById('shopHatGrid');
  const shopSweaterGrid = document.getElementById('shopSweaterGrid');
  const shopAccGrid = document.getElementById('shopAccGrid');
  const shopTreatGrid = document.getElementById('shopTreatGrid');
  const shopToyGrid = document.getElementById('shopToyGrid');
  const shopBgGrid = document.getElementById('shopBgGrid');
  const shopSkinGrid = document.getElementById('shopSkinGrid');
  const releaseGiftCard = document.getElementById('releaseGiftCard');
  const claimReleaseGiftBtn = document.getElementById('claimReleaseGiftBtn');
  const shopNotice = document.getElementById('shopNotice');
  const shopCart = document.getElementById('shopCart');
  const shopCartItem = document.getElementById('shopCartItem');
  const shopCartStatus = document.getElementById('shopCartStatus');
  const flyingItem = document.getElementById('flyingItem');

  // Wardrobe
  const snapshotCatBtn = document.getElementById('snapshotCatBtn');
  const wardrobeCanvas = document.getElementById('wardrobeCanvas');
  const wardrobeMood = document.getElementById('wardrobeMood');
  const colorButtons = Array.from(document.querySelectorAll('.color-btn'));
  const wardrobeRareSkinGrid = document.getElementById('wardrobeRareSkinGrid');
  const wardrobeHatGrid = document.getElementById('wardrobeHatGrid');
  const wardrobeSweaterGrid = document.getElementById('wardrobeSweaterGrid');
  const wardrobeAccGrid = document.getElementById('wardrobeAccGrid');
  const wardrobeToyGrid = document.getElementById('wardrobeToyGrid');
  const wardrobeBgGrid = document.getElementById('wardrobeBgGrid');

  const DEFAULT_SLEEPY_DOMAINS = [
    'youtube.com', 'tiktok.com', 'vk.com', 'reddit.com',
    'twitch.tv', 'instagram.com', 'x.com', 'twitter.com'
  ];

  function drawPixelCart(cartCanvas) {
    const ctx = cartCanvas.getContext('2d');
    const grid = [
      '................',
      '..oo............',
      '...o............',
      '...oooooooooooo.',
      '...o..o..o..o.o.',
      '....oooooooooo..',
      '....o..o..o..o..',
      '.....oooooooo...',
      '.....o..........',
      '.....ooooooooo..',
      '......oo...oo...',
      '......oo...oo...'
    ];
    const px = 2.5;
    ctx.clearRect(0, 0, cartCanvas.width, cartCanvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = '#ffe7cf';
    ctx.fillRect(Math.floor(4 * px), Math.floor(4 * px), Math.ceil(10 * px), Math.ceil(3.5 * px));
    ctx.fillStyle = '#471e0d';
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === 'o') {
          ctx.fillRect(Math.floor(x * px + 2), Math.floor(y * px + 1), Math.ceil(px), Math.ceil(px));
        }
      }
    }
  }
  document.querySelectorAll('.cart-canvas').forEach(drawPixelCart);

  let lang = 'en';
  let catName = '';
  let activeTab = 'menu';
  let pendingDelivery = null;
  let dailyQuests = null;
  let dailyStreak = { count: 0, lastClaimDate: '' };
  let minigameCooldownUntil = 0;
  let achievements = {};
  let totalTabsClosed = 0;
  let shopPurchasesCount = 0;
  let activeTabAudible = false;
  let releaseGiftClaimed = false;

  let currentColor = 'ginger';
  let ownedHats = [];
  let equippedHat = 'none';
  let ownedSweaters = [];
  let equippedSweater = 'none';
  let ownedAccessories = [];
  let equippedAccessory = 'none';
  let ownedToys = [];
  let activeToy = 'none';
  let ownedBackgrounds = [];
  let equippedBackground = 'default';
  let ownedSkins = [];
  let hasKitten = false;
  let kittenEnabled = false;
  let yarnMode = false;
  let catScale = 3;

  let previewMode = 'sit';
  let previewModeUntil = 0;
  let frameIdx = 0;
  let fishCount = 0;
  let currentXp = 0;
  let currentLevel = 1;

  let sleepyDomains = [];
  let hiddenDomains = [];
  let activeTabDomain = '';
  let isActiveSiteSleepy = false;
  let sleepySinceTs = null;
  let sleepyLimitMinutes = 5;

  let selectedFocusMin = 25;
  let selectedBreakMin = 5;
  let pomodoro = {
    phase: 'idle',
    endTs: null,
    focusMinutes: 25,
    breakMinutes: 5,
    sessionsCompleted: 0
  };

  function tr(key, vars) {
    return t(lang, key, vars);
  }

  function applyBackgroundClass(bgId) {
    const classes = ['bg-room', 'bg-garden', 'bg-cyberpunk', 'bg-space'];
    [mainStage, wardrobeStage].forEach((el) => {
      if (!el) return;
      el.classList.remove(...classes);
      if (bgId && bgId !== 'default') {
        el.classList.add(`bg-${bgId}`);
      }
    });
  }

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = tr(key);
      if (typeof val === 'string') el.textContent = val;
    });

    domainInput.placeholder = tr('domainPlaceholder');
    if (catNameInput) catNameInput.placeholder = tr('catNamePlaceholder');
    pomoTestPreset.textContent = tr('pomoTest');
    fishBadge.title = tr('fishTooltip');
    tabsBadge.title = tr('tabsTooltip');
    appTitleEl.textContent = catName.trim() || 'TabCat';

    Array.from(sleepyLimitSelect.options).forEach((opt) => {
      opt.textContent = `${opt.value} ${tr('minUnit')}`;
    });

    langButtons.forEach((b) => b.classList.toggle('active', b.dataset.lang === lang));

    updateXPUI(currentXp, currentLevel);
    updateFishUI(fishCount);
    updateScaleUI(catScale);
    updateYarnButtonUI();
    updatePomodoroUI();
    updateStatusBadge();
    renderCurrentSiteRow();
    renderSleepyChips();
    renderShop();
    renderWardrobe();
    renderQuestsAndAchievements();
  }

  function switchTab(nextTab) {
    if (!views[nextTab]) return;
    const prevTab = activeTab;
    activeTab = nextTab;

    dockButtons.forEach((b) => b.classList.toggle('active', b.dataset.tab === nextTab));
    Object.entries(views).forEach(([id, el]) => {
      el.classList.toggle('active', id === nextTab);
    });

    if (prevTab === 'shop' && (nextTab === 'menu' || nextTab === 'wardrobe') && pendingDelivery) {
      playReturnDelivery(pendingDelivery);
      pendingDelivery = null;
    }

    if (nextTab === 'shop') {
      shopCart.classList.remove('zoom-out');
      shopCartItem.classList.remove('loaded');
      shopCartStatus.textContent = tr('shopCartReady');
      shopNotice.textContent = '';
    }
  }

  dockButtons.forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  subtabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.subtab;
      subtabButtons.forEach((b) => b.classList.toggle('active', b === btn));
      Object.entries(subpanels).forEach(([id, el]) => {
        el.classList.toggle('active', id === target);
      });
    });
  });

  function playShopPurchaseAnimation(icon, name) {
    pendingDelivery = { icon, name };
    flyingItem.classList.remove('dropping');
    shopCart.classList.remove('zoom-out');
    shopCartItem.classList.remove('loaded');
    void flyingItem.offsetWidth;

    flyingItem.textContent = icon;
    flyingItem.classList.add('dropping');
    shopCartStatus.textContent = tr('shopCartDelivered');

    setTimeout(() => {
      shopCartItem.textContent = icon;
      shopCartItem.classList.add('loaded');
      shopCart.classList.add('zoom-out');
    }, 390);

    setTimeout(() => {
      if (activeTab === 'shop') {
        shopCart.classList.remove('zoom-out');
        shopCartItem.classList.remove('loaded');
        shopCartStatus.textContent = tr('shopCartReady');
      }
    }, 1550);
  }

  function playReturnDelivery(delivery) {
    deliveryStage.classList.remove('hidden');
    deliveryItemBadge.textContent = delivery.icon;
    deliveryText.textContent = tr('wardrobeDelivered');

    deliveryCart.style.animation = 'none';
    deliveryItemBadge.style.animation = 'none';
    void deliveryCart.offsetWidth;
    deliveryCart.style.animation = '';
    deliveryItemBadge.style.animation = '';

    previewMode = 'happy';
    previewModeUntil = Date.now() + 2000;

    setTimeout(() => deliveryStage.classList.add('hidden'), 2050);
  }

  function makeShopCard({ icon, label, priceText, isOwned, isEquipped, onClick }) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'shop-card';
    if (isOwned) btn.classList.add('owned');
    if (isEquipped) btn.classList.add('equipped');

    const iconEl = document.createElement('span');
    iconEl.className = 'shop-icon';
    iconEl.textContent = icon;

    const nameEl = document.createElement('span');
    nameEl.className = 'shop-name';
    nameEl.textContent = label;

    const priceEl = document.createElement('span');
    priceEl.className = 'shop-price';
    priceEl.textContent = priceText;

    btn.appendChild(iconEl);
    btn.appendChild(nameEl);
    btn.appendChild(priceEl);
    btn.addEventListener('click', onClick);
    return btn;
  }

  function renderQuestsAndAchievements() {
    if (!dailyQuestsList || !achievementsList) return;
    const dq = dailyQuests || { tabsToday: 0, pomoToday: 0, petToday: false, feedToday: false, claimed: {} };
    const claimed = dq.claimed || {};

    const careCount = (dq.petToday ? 1 : 0) + (dq.feedToday ? 1 : 0);
    const items = [
      { id: 'close10', label: tr('q_close10'), cur: Math.min(10, dq.tabsToday || 0), max: 10, reward: 3 },
      { id: 'pomo1', label: tr('q_pomo1'), cur: Math.min(1, dq.pomoToday || 0), max: 1, reward: 4 },
      { id: 'care2', label: tr('q_care2'), cur: careCount, max: 2, reward: 2 }
    ];

    let anyClaimable = false;
    dailyQuestsList.innerHTML = '';

    items.forEach((q) => {
      const done = q.cur >= q.max;
      const isClaimed = Boolean(claimed[q.id]);
      if (done && !isClaimed) anyClaimable = true;

      const row = document.createElement('div');
      row.className = 'quest-row' + (done ? ' done' : '');

      const top = document.createElement('div');
      top.className = 'quest-top';

      const title = document.createElement('span');
      title.textContent = q.label;
      top.appendChild(title);

      if (isClaimed) {
        const st = document.createElement('span');
        st.className = 'quest-status-done';
        st.textContent = tr('claimedText');
        top.appendChild(st);
      } else if (done) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'claim-btn';
        btn.textContent = tr('claimBtn', { reward: q.reward });
        btn.addEventListener('click', () => {
          chrome.runtime.sendMessage({ type: 'CLAIM_QUEST', questId: q.id }, (res) => {
            if (res && res.ok) {
              dailyQuests = res.dailyQuests;
              updateFishUI(res.fish);
              renderQuestsAndAchievements();
            }
          });
        });
        top.appendChild(btn);
      } else {
        const prog = document.createElement('span');
        prog.textContent = `${q.cur}/${q.max}`;
        top.appendChild(prog);
      }

      const bar = document.createElement('div');
      bar.className = 'quest-bar';
      const fill = document.createElement('div');
      fill.className = 'quest-fill';
      fill.style.width = `${Math.round((q.cur / q.max) * 100)}%`;
      bar.appendChild(fill);

      row.appendChild(top);
      row.appendChild(bar);
      dailyQuestsList.appendChild(row);
    });

    if (questsDot) {
      const todayKey = new Date();
      const todayStr = `${todayKey.getFullYear()}-${String(todayKey.getMonth() + 1).padStart(2, '0')}-${String(todayKey.getDate()).padStart(2, '0')}`;
      const streakReady = !dailyStreak || dailyStreak.lastClaimDate !== todayStr;
      questsDot.classList.toggle('hidden', !anyClaimable && !streakReady);
    }

    // Daily Streak UI
    if (streakDots && claimStreakBtn && streakDayLabel) {
      const nowD = new Date();
      const todayStr = `${nowD.getFullYear()}-${String(nowD.getMonth() + 1).padStart(2, '0')}-${String(nowD.getDate()).padStart(2, '0')}`;
      const yD = new Date();
      yD.setDate(yD.getDate() - 1);
      const yStr = `${yD.getFullYear()}-${String(yD.getMonth() + 1).padStart(2, '0')}-${String(yD.getDate()).padStart(2, '0')}`;
      const st = dailyStreak || { count: 0, lastClaimDate: '' };
      const claimedToday = st.lastClaimDate === todayStr;
      const activeCount = claimedToday ? st.count : (st.lastClaimDate === yStr ? st.count : 0);
      const nextDay = claimedToday ? st.count : ((activeCount % 7) + 1);
      const nextReward = nextDay === 7 ? 10 : nextDay;

      streakDayLabel.textContent = tr('streakDay', { day: activeCount });
      streakDots.innerHTML = '';
      for (let d = 1; d <= 7; d++) {
        const pill = document.createElement('div');
        pill.className = 'streak-pill' + (d <= activeCount ? ' done' : '') + (d === 7 ? ' big' : '');
        pill.textContent = d === 7 ? '10🐟' : `${d}🐟`;
        streakDots.appendChild(pill);
      }

      claimStreakBtn.disabled = claimedToday;
      claimStreakBtn.textContent = claimedToday
        ? tr('streakClaimed')
        : tr('streakClaim', { reward: nextReward });
    }

    // Achievements
    achievementsList.innerHTML = '';
    const achItems = [
      { id: 'first10', label: tr('ach_first10'), cur: Math.min(10, totalTabsClosed), max: 10 },
      { id: 'tabs100', label: tr('ach_tabs100'), cur: Math.min(100, totalTabsClosed), max: 100 },
      { id: 'pomo5', label: tr('ach_pomo5'), cur: Math.min(5, (pomodoro && pomodoro.sessionsCompleted) || 0), max: 5 },
      { id: 'shop3', label: tr('ach_shop3'), cur: Math.min(3, shopPurchasesCount), max: 3 }
    ];

    achItems.forEach((a) => {
      const unlocked = Boolean(achievements && achievements[a.id]);
      const row = document.createElement('div');
      row.className = 'quest-row' + (unlocked ? ' done' : '');

      const top = document.createElement('div');
      top.className = 'quest-top';

      const title = document.createElement('span');
      title.textContent = a.label;
      top.appendChild(title);

      const st = document.createElement('span');
      st.className = unlocked ? 'quest-status-done' : '';
      st.textContent = unlocked ? tr('achUnlocked') : `${a.cur}/${a.max}`;
      top.appendChild(st);

      const bar = document.createElement('div');
      bar.className = 'quest-bar';
      const fill = document.createElement('div');
      fill.className = 'quest-fill';
      fill.style.width = `${unlocked ? 100 : Math.round((a.cur / a.max) * 100)}%`;
      bar.appendChild(fill);

      row.appendChild(top);
      row.appendChild(bar);
      achievementsList.appendChild(row);
    });
  }

  function renderShop() {
    // 0. Release v1.0 Free Gift Banner state
    if (releaseGiftCard && claimReleaseGiftBtn) {
      releaseGiftCard.classList.toggle('claimed', releaseGiftClaimed);
      claimReleaseGiftBtn.disabled = releaseGiftClaimed;
      claimReleaseGiftBtn.textContent = releaseGiftClaimed ? tr('releaseGiftClaimed') : tr('releaseGiftBtn');
    }

    // 1. Hats (skip 'none', achievementOnly & giftOnly in Shop)
    shopHatGrid.innerHTML = '';
    HATS.filter((h) => h.id !== 'none' && !h.achievementOnly && !h.giftOnly).forEach((hat) => {
      const isOwned = ownedHats.includes(hat.id);
      const isEquipped = equippedHat === hat.id;
      const label = tr(`hat_${hat.id}`);
      shopHatGrid.appendChild(makeShopCard({
        icon: hat.icon,
        label,
        priceText: isEquipped ? tr('itemEquipped') : isOwned ? tr('itemOwned') : `${hat.price} 🐟`,
        isOwned,
        isEquipped,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_EQUIP_HAT', hatId: hat.id }, (res) => {
            if (!res) return;
            if (!res.ok && res.reason === 'not_enough_fish') {
              shopNotice.textContent = tr('needMoreFish', { price: res.price });
              return;
            }
            if (res.ok) {
              shopNotice.textContent = '';
              equippedHat = res.equippedHat;
              ownedHats = res.ownedHats || ownedHats;
              updateFishUI(res.fish);
              renderShop();
              renderWardrobe();
              if (res.purchased) playShopPurchaseAnimation(hat.icon, label);
            }
          });
        }
      }));
    });

    // 2. Sweaters
    shopSweaterGrid.innerHTML = '';
    SWEATERS.filter((s) => s.id !== 'none' && !s.giftOnly).forEach((sw) => {
      const isOwned = ownedSweaters.includes(sw.id);
      const isEquipped = equippedSweater === sw.id;
      const label = tr(`sweater_${sw.id}`);
      shopSweaterGrid.appendChild(makeShopCard({
        icon: sw.icon,
        label,
        priceText: isEquipped ? tr('itemEquipped') : isOwned ? tr('itemOwned') : `${sw.price} 🐟`,
        isOwned,
        isEquipped,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_EQUIP_SWEATER', sweaterId: sw.id }, (res) => {
            if (!res) return;
            if (!res.ok && res.reason === 'not_enough_fish') {
              shopNotice.textContent = tr('needMoreFish', { price: res.price });
              return;
            }
            if (res.ok) {
              shopNotice.textContent = '';
              equippedSweater = res.equippedSweater;
              ownedSweaters = res.ownedSweaters || ownedSweaters;
              updateFishUI(res.fish);
              renderShop();
              renderWardrobe();
              if (res.purchased) playShopPurchaseAnimation(sw.icon, label);
            }
          });
        }
      }));
    });

    // 3. Accessories (Glasses, Scarf, Bowtie, Wings + Secret Headphones while listening!)
    shopAccGrid.innerHTML = '';
    ACCESSORIES.filter((a) => {
      if (a.id === 'none' || a.giftOnly) return false;
      if (a.secretAudible && !activeTabAudible && !ownedAccessories.includes(a.id)) return false;
      return true;
    }).forEach((acc) => {
      const isOwned = ownedAccessories.includes(acc.id);
      const isEquipped = equippedAccessory === acc.id;
      const label = tr(`acc_${acc.id}`);
      shopAccGrid.appendChild(makeShopCard({
        icon: acc.icon,
        label,
        priceText: isEquipped ? tr('itemEquipped') : isOwned ? tr('itemOwned') : `${acc.price} 🐟`,
        isOwned,
        isEquipped,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_EQUIP_ACCESSORY', accId: acc.id }, (res) => {
            if (!res) return;
            if (!res.ok && res.reason === 'not_enough_fish') {
              shopNotice.textContent = tr('needMoreFish', { price: res.price });
              return;
            }
            if (res.ok) {
              shopNotice.textContent = '';
              equippedAccessory = res.equippedAccessory;
              ownedAccessories = res.ownedAccessories || ownedAccessories;
              updateFishUI(res.fish);
              renderShop();
              renderWardrobe();
              if (res.purchased) playShopPurchaseAnimation(acc.icon, label);
            }
          });
        }
      }));
    });

    // 4. Treats (Consumables)
    shopTreatGrid.innerHTML = '';
    TREATS.forEach((treat) => {
      const label = tr(`treat_${treat.id}`);
      shopTreatGrid.appendChild(makeShopCard({
        icon: treat.icon,
        label,
        priceText: `${treat.price} 🐟`,
        isOwned: false,
        isEquipped: false,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_TREAT', treatId: treat.id }, (res) => {
            if (!res) return;
            if (!res.ok && res.reason === 'not_enough_fish') {
              shopNotice.textContent = tr('needMoreFish', { price: res.price });
              return;
            }
            if (res.ok) {
              shopNotice.textContent = '';
              updateFishUI(res.fish);
              updateStatsUI(res.stats);
              playShopPurchaseAnimation(treat.icon, label);
            }
          });
        }
      }));
    });

    // 5. Toys (Laser, Mouse, Cardboard Box)
    shopToyGrid.innerHTML = '';
    TOYS.forEach((toy) => {
      const isOwned = ownedToys.includes(toy.id);
      const isActive = activeToy === toy.id;
      const label = tr(`toy_${toy.id}`);
      shopToyGrid.appendChild(makeShopCard({
        icon: toy.icon,
        label,
        priceText: isActive ? tr('toyActive') : isOwned ? tr('toyPlay') : `${toy.price} 🐟`,
        isOwned,
        isEquipped: isActive,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_TOGGLE_TOY', toyId: toy.id }, (res) => {
            if (!res) return;
            if (!res.ok && res.reason === 'not_enough_fish') {
              shopNotice.textContent = tr('needMoreFish', { price: res.price });
              return;
            }
            if (res.ok) {
              shopNotice.textContent = '';
              activeToy = res.activeToy;
              ownedToys = res.ownedToys || ownedToys;
              updateFishUI(res.fish);
              renderShop();
              renderWardrobe();
              if (res.purchased) playShopPurchaseAnimation(toy.icon, label);
            }
          });
        }
      }));
    });

    // 6. Backgrounds
    shopBgGrid.innerHTML = '';
    BACKGROUNDS.filter((b) => b.id !== 'default').forEach((bg) => {
      const isOwned = ownedBackgrounds.includes(bg.id);
      const isEquipped = equippedBackground === bg.id;
      const label = tr(`bg_${bg.id}`);
      shopBgGrid.appendChild(makeShopCard({
        icon: bg.icon,
        label,
        priceText: isEquipped ? tr('itemEquipped') : isOwned ? tr('itemOwned') : `${bg.price} 🐟`,
        isOwned,
        isEquipped,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_EQUIP_BG', bgId: bg.id }, (res) => {
            if (!res) return;
            if (!res.ok && res.reason === 'not_enough_fish') {
              shopNotice.textContent = tr('needMoreFish', { price: res.price });
              return;
            }
            if (res.ok) {
              shopNotice.textContent = '';
              equippedBackground = res.equippedBackground;
              ownedBackgrounds = res.ownedBackgrounds || ownedBackgrounds;
              applyBackgroundClass(equippedBackground);
              updateFishUI(res.fish);
              renderShop();
              renderWardrobe();
              if (res.purchased) playShopPurchaseAnimation(bg.icon, label);
            }
          });
        }
      }));
    });

    // 7. Rare Skins + Mini-Kitten Buddy (skip achievementOnly in Shop)
    shopSkinGrid.innerHTML = '';
    RARE_SKINS.filter((s) => !s.achievementOnly).forEach((skin) => {
      const isOwned = ownedSkins.includes(skin.id);
      const isEquipped = currentColor === skin.id;
      const label = tr(`skin_${skin.id}`);
      shopSkinGrid.appendChild(makeShopCard({
        icon: skin.icon,
        label,
        priceText: isEquipped ? tr('itemEquipped') : isOwned ? tr('itemOwned') : `${skin.price} 🐟`,
        isOwned,
        isEquipped,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_EQUIP_SKIN', skinId: skin.id }, (res) => {
            if (!res) return;
            if (!res.ok && res.reason === 'not_enough_fish') {
              shopNotice.textContent = tr('needMoreFish', { price: res.price });
              return;
            }
            if (res.ok) {
              shopNotice.textContent = '';
              setActiveColorUI(res.catColor);
              ownedSkins = res.ownedSkins || ownedSkins;
              updateFishUI(res.fish);
              renderShop();
              renderWardrobe();
              if (res.purchased) playShopPurchaseAnimation(skin.icon, label);
            }
          });
        }
      }));
    });

    // Mini-Kitten Buddy card!
    shopSkinGrid.appendChild(makeShopCard({
      icon: '🐈‍⬛',
      label: tr('kittenName'),
      priceText: hasKitten ? (kittenEnabled ? tr('toyActive') : tr('toyPlay')) : '12 🐟',
      isOwned: hasKitten,
      isEquipped: hasKitten && kittenEnabled,
      onClick: () => {
        chrome.runtime.sendMessage({ type: 'BUY_OR_TOGGLE_KITTEN' }, (res) => {
          if (!res) return;
          if (!res.ok && res.reason === 'not_enough_fish') {
            shopNotice.textContent = tr('needMoreFish', { price: res.price });
            return;
          }
          if (res.ok) {
            shopNotice.textContent = '';
            hasKitten = res.hasKitten;
            kittenEnabled = res.kittenEnabled;
            updateFishUI(res.fish);
            renderShop();
            renderWardrobe();
            if (res.purchased) playShopPurchaseAnimation('🐈‍⬛', tr('kittenName'));
          }
        });
      }
    }));
  }

  function renderWardrobe() {
    // Rare skins unlocked
    wardrobeRareSkinGrid.innerHTML = '';
    RARE_SKINS.filter((s) => ownedSkins.includes(s.id)).forEach((skin) => {
      const isEquipped = currentColor === skin.id;
      wardrobeRareSkinGrid.appendChild(makeShopCard({
        icon: skin.icon,
        label: tr(`skin_${skin.id}`),
        priceText: isEquipped ? tr('itemEquipped') : tr('itemEquip'),
        isOwned: true,
        isEquipped,
        onClick: () => {
          setActiveColorUI(skin.id);
          chrome.storage.local.set({ catColor: skin.id });
          renderWardrobe();
          renderShop();
        }
      }));
    });

    // Hats
    wardrobeHatGrid.innerHTML = '';
    HATS.filter((h) => h.id === 'none' || ownedHats.includes(h.id)).forEach((hat) => {
      const isEquipped = equippedHat === hat.id;
      wardrobeHatGrid.appendChild(makeShopCard({
        icon: hat.icon,
        label: tr(`hat_${hat.id}`),
        priceText: isEquipped ? tr('itemEquipped') : tr('itemEquip'),
        isOwned: true,
        isEquipped,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_EQUIP_HAT', hatId: hat.id }, (res) => {
            if (res && res.ok) {
              equippedHat = res.equippedHat;
              renderShop();
              renderWardrobe();
              wardrobeMood.textContent = tr('moodColor');
            }
          });
        }
      }));
    });

    // Sweaters
    wardrobeSweaterGrid.innerHTML = '';
    SWEATERS.filter((s) => s.id === 'none' || ownedSweaters.includes(s.id)).forEach((sw) => {
      const isEquipped = equippedSweater === sw.id;
      wardrobeSweaterGrid.appendChild(makeShopCard({
        icon: sw.icon,
        label: tr(`sweater_${sw.id}`),
        priceText: isEquipped ? tr('itemEquipped') : tr('itemEquip'),
        isOwned: true,
        isEquipped,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_EQUIP_SWEATER', sweaterId: sw.id }, (res) => {
            if (res && res.ok) {
              equippedSweater = res.equippedSweater;
              renderShop();
              renderWardrobe();
              wardrobeMood.textContent = tr('moodColor');
            }
          });
        }
      }));
    });

    // Accessories
    wardrobeAccGrid.innerHTML = '';
    ACCESSORIES.filter((a) => a.id === 'none' || ownedAccessories.includes(a.id)).forEach((acc) => {
      const isEquipped = equippedAccessory === acc.id;
      wardrobeAccGrid.appendChild(makeShopCard({
        icon: acc.icon,
        label: tr(`acc_${acc.id}`),
        priceText: isEquipped ? tr('itemEquipped') : tr('itemEquip'),
        isOwned: true,
        isEquipped,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_EQUIP_ACCESSORY', accId: acc.id }, (res) => {
            if (res && res.ok) {
              equippedAccessory = res.equippedAccessory;
              renderShop();
              renderWardrobe();
              wardrobeMood.textContent = tr('moodColor');
            }
          });
        }
      }));
    });

    // Toys & Kitten Buddy
    wardrobeToyGrid.innerHTML = '';
    TOYS.filter((tItem) => ownedToys.includes(tItem.id)).forEach((toy) => {
      const isActive = activeToy === toy.id;
      wardrobeToyGrid.appendChild(makeShopCard({
        icon: toy.icon,
        label: tr(`toy_${toy.id}`),
        priceText: isActive ? tr('toyActive') : tr('toyPlay'),
        isOwned: true,
        isEquipped: isActive,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_TOGGLE_TOY', toyId: toy.id }, (res) => {
            if (res && res.ok) {
              activeToy = res.activeToy;
              renderShop();
              renderWardrobe();
            }
          });
        }
      }));
    });

    if (hasKitten) {
      wardrobeToyGrid.appendChild(makeShopCard({
        icon: '🐈‍⬛',
        label: tr('kittenName'),
        priceText: kittenEnabled ? tr('toyActive') : tr('toyPlay'),
        isOwned: true,
        isEquipped: kittenEnabled,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_TOGGLE_KITTEN' }, (res) => {
            if (res && res.ok) {
              kittenEnabled = res.kittenEnabled;
              renderShop();
              renderWardrobe();
            }
          });
        }
      }));
    }

    if (wardrobeToyGrid.children.length === 0) {
      const hint = document.createElement('div');
      hint.className = 'empty-wardrobe-hint';
      hint.textContent = tr('wardrobeEmptyHint');
      wardrobeToyGrid.appendChild(hint);
    }

    // Backgrounds
    wardrobeBgGrid.innerHTML = '';
    BACKGROUNDS.filter((b) => b.id === 'default' || ownedBackgrounds.includes(b.id)).forEach((bg) => {
      const isEquipped = equippedBackground === bg.id;
      wardrobeBgGrid.appendChild(makeShopCard({
        icon: bg.icon,
        label: tr(`bg_${bg.id}`),
        priceText: isEquipped ? tr('itemEquipped') : tr('itemEquip'),
        isOwned: true,
        isEquipped,
        onClick: () => {
          chrome.runtime.sendMessage({ type: 'BUY_OR_EQUIP_BG', bgId: bg.id }, (res) => {
            if (res && res.ok) {
              equippedBackground = res.equippedBackground;
              applyBackgroundClass(equippedBackground);
              renderShop();
              renderWardrobe();
            }
          });
        }
      }));
    });
  }

  function normalizeDomain(input) {
    if (!input || typeof input !== 'string') return '';
    let s = input.trim().toLowerCase();
    if (!s) return '';
    try {
      if (!s.includes('://')) s = 'https://' + s;
      const url = new URL(s);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
      const host = url.hostname.replace(/^www\./, '');
      if (!host.includes('.')) return '';
      return host;
    } catch (_) {
      return '';
    }
  }

  function showFeedback(text) {
    domainFeedback.textContent = text;
    if (text) {
      setTimeout(() => {
        if (domainFeedback.textContent === text) domainFeedback.textContent = '';
      }, 2200);
    }
  }

  function setActiveColorUI(color) {
    currentColor = color;
    colorButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.color === color);
    });
  }

  function updateScaleUI(scale) {
    catScale = Math.max(2, Math.min(5, Number(scale) || 3));
    scaleValueLabel.textContent = tr(`scale${catScale}`);
    scaleButtons.forEach((b) => {
      b.classList.toggle('active', Number(b.dataset.scale) === catScale);
    });
  }

  function updateYarnButtonUI() {
    yarnBtn.classList.toggle('active', yarnMode);
    yarnBtn.textContent = yarnMode ? tr('btnYarnStop') : tr('btnYarn');
  }

  function updateXPUI(xp, level) {
    currentXp = xp || 0;
    currentLevel = level || (Math.floor(currentXp / 100) + 1);
    const pct = currentXp % 100;
    levelBadge.textContent = `${tr('levelShort')} ${currentLevel}`;
    xpBarFill.style.width = `${pct}%`;
    xpBarFill.parentElement.title = tr('xpTooltip', { pct, next: currentLevel + 1 });
  }

  function updateFishUI(count) {
    fishCount = Number(count) || 0;
    fishCountEl.textContent = String(fishCount);
    feedBtn.disabled = fishCount <= 0;
    feedBtn.title = fishCount > 0 ? tr('feedTooltipReady') : tr('feedTooltipEmpty');
  }

  function updateStatsUI(stats) {
    const s = { hunger: 80, pleasure: 80, energy: 90, ...(stats || {}) };
    hungerVal.textContent = `${s.hunger}%`;
    hungerFill.style.width = `${s.hunger}%`;
    pleasureVal.textContent = `${s.pleasure}%`;
    pleasureFill.style.width = `${s.pleasure}%`;
    energyVal.textContent = `${s.energy}%`;
    energyFill.style.width = `${s.energy}%`;
  }

  function isDomainInList(domain, list) {
    return list.some((d) => domain === d || domain.endsWith('.' + d));
  }

  function saveSleepyDomains(nextList) {
    sleepyDomains = nextList;
    renderSleepyChips();
    renderCurrentSiteRow();
    chrome.storage.local.set({ sleepyDomains: nextList });
  }

  function addDomainDirectly(rawInput) {
    const domain = normalizeDomain(rawInput);
    if (!domain) {
      showFeedback(tr('feedbackInvalid'));
      return false;
    }
    if (sleepyDomains.includes(domain)) {
      showFeedback(tr('feedbackExists', { domain }));
      return false;
    }
    saveSleepyDomains([domain, ...sleepyDomains]);
    showFeedback(tr('feedbackAdded', { domain }));
    return true;
  }

  function removeDomainDirectly(domain) {
    saveSleepyDomains(sleepyDomains.filter((d) => d !== domain));
  }

  function renderCurrentSiteRow() {
    if (!activeTabDomain) {
      currentSiteRow.classList.add('hidden');
      if (hideSiteBtn) hideSiteBtn.classList.add('hidden');
      return;
    }
    currentSiteRow.classList.remove('hidden');
    const inList = isDomainInList(activeTabDomain, sleepyDomains);
    currentSiteLabel.textContent = activeTabDomain;
    toggleCurrentSiteBtn.textContent = inList ? tr('removeFromSleepy') : tr('addToSleepy');
    toggleCurrentSiteBtn.classList.toggle('remove', inList);

    if (hideSiteBtn) {
      hideSiteBtn.classList.remove('hidden');
      const isHiddenHere = isDomainInList(activeTabDomain, hiddenDomains);
      hideSiteBtn.textContent = isHiddenHere
        ? tr('showOnSite', { domain: activeTabDomain })
        : tr('hideOnSite', { domain: activeTabDomain });
    }
  }

  function renderSleepyChips() {
    sleepyChips.innerHTML = '';
    if (sleepyDomains.length === 0) {
      const empty = document.createElement('span');
      empty.style.cssText = 'font-size:11px;color:#9e8375;';
      empty.textContent = tr('sleepyEmpty');
      sleepyChips.appendChild(empty);
      return;
    }
    sleepyDomains.forEach((domain) => {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = domain;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = '×';
      btn.addEventListener('click', () => removeDomainDirectly(domain));
      chip.appendChild(btn);
      sleepyChips.appendChild(chip);
    });
  }

  function formatMMSS(totalSeconds) {
    const clamped = Math.max(0, Math.ceil(totalSeconds));
    const m = Math.floor(clamped / 60);
    const s = clamped % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function updatePomodoroUI() {
    const phase = pomodoro.phase || 'idle';
    if (phase === 'idle' || !pomodoro.endTs) {
      pomoPhaseLabel.textContent = tr('pomoReady');
      pomoPhaseLabel.className = 'pomo-phase';
      pomoTimerEl.textContent = formatMMSS(selectedFocusMin * 60);
      pomoActionBtn.textContent = tr('pomoStart');
      pomoActionBtn.classList.remove('stop');
      presetButtons.forEach((b) => { b.disabled = false; });
      return;
    }

    const leftSec = Math.max(0, (pomodoro.endTs - Date.now()) / 1000);
    if (leftSec <= 0) {
      chrome.runtime.sendMessage({ type: 'CHECK_POMODORO' }).catch(() => {});
    }

    pomoTimerEl.textContent = formatMMSS(leftSec);
    pomoActionBtn.textContent = tr('pomoStop');
    pomoActionBtn.classList.add('stop');
    presetButtons.forEach((b) => { b.disabled = true; });

    if (phase === 'focus') {
      pomoPhaseLabel.textContent = tr('pomoFocusing');
      pomoPhaseLabel.className = 'pomo-phase focus';
    } else {
      pomoPhaseLabel.textContent = tr('pomoBreak');
      pomoPhaseLabel.className = 'pomo-phase break';
    }
  }

  function getSleepStage() {
    if (yarnMode || activeToy !== 'none') return 'awake';
    if (!isActiveSiteSleepy || !sleepySinceTs) return 'awake';
    const elapsedMs = Date.now() - sleepySinceTs;
    const limitMs = Math.max(1, sleepyLimitMinutes) * 60 * 1000;
    if (elapsedMs >= limitMs) return 'sleep';
    if (elapsedMs >= limitMs * 0.65) return 'yawn';
    return 'awake';
  }

  function updateStatusBadge() {
    const stage = getSleepStage();
    statusBadge.classList.remove('sleeping', 'focus');

    if (yarnMode || activeToy !== 'none') {
      statusBadge.textContent = tr('statusPlay');
    } else if (stage === 'sleep') {
      statusBadge.textContent = tr('statusSleep');
      statusBadge.classList.add('sleeping');
    } else if (stage === 'yawn') {
      statusBadge.textContent = tr('statusYawn');
      statusBadge.classList.add('sleeping');
    } else if (pomodoro.phase === 'focus') {
      statusBadge.textContent = tr('statusFocus');
      statusBadge.classList.add('focus');
    } else if (pomodoro.phase === 'break') {
      statusBadge.textContent = tr('statusBreak');
    } else if (isActiveSiteSleepy && sleepySinceTs) {
      const leftSec = Math.max(
        0,
        Math.ceil((sleepyLimitMinutes * 60 * 1000 - (Date.now() - sleepySinceTs)) / 1000)
      );
      statusBadge.textContent = tr('statusSleepIn', { time: formatMMSS(leftSec) });
    } else {
      statusBadge.textContent = tr('statusAwake');
    }
  }

  function animatePetInPopup() {
    previewMode = 'pet';
    previewModeUntil = Date.now() + 2000;
    moodText.textContent = tr('moodPet');
    chrome.runtime.sendMessage({ type: 'PET_CAT' }).catch(() => {});
  }

  function feedCatFromPopup() {
    if (fishCount <= 0) return;
    chrome.runtime.sendMessage({ type: 'FEED_CAT' }, (res) => {
      if (res && res.ok) {
        previewMode = 'eat';
        previewModeUntil = Date.now() + 2600;
        moodText.textContent = tr('moodFeed');
        updateFishUI(res.fish);
        updateStatsUI(res.stats);
      }
    });
  }

  chrome.storage.local.get(
    [
      'lang',
      'catName',
      'catColor',
      'ownedHats', 'equippedHat',
      'ownedSweaters', 'equippedSweater',
      'ownedAccessories', 'equippedAccessory',
      'ownedToys', 'activeToy',
      'ownedBackgrounds', 'equippedBackground',
      'ownedSkins',
      'hasKitten', 'kittenEnabled',
      'catScale',
      'yarnMode',
      'visible', 'hiddenDomains', 'allowFreeDrag', 'allowFreeRoam',
      'tabsClosed', 'fish', 'xp', 'level', 'stats',
      'dailyQuests', 'dailyStreak', 'releaseGiftClaimed', 'minigameCooldownUntil', 'achievements', 'shopPurchasesCount',
      'sleepyDomains', 'sleepyLimitMinutes', 'isActiveSiteSleepy', 'sleepySinceTs',
      'activeTabAudible',
      'pomodoro'
    ],
    (data) => {
      lang = data.lang || 'en';
      activeTabAudible = Boolean(data.activeTabAudible);
      releaseGiftClaimed = Boolean(data.releaseGiftClaimed);
      catName = typeof data.catName === 'string' ? data.catName : '';
      if (catNameInput) catNameInput.value = catName;
      totalTabsClosed = data.tabsClosed || 0;
      shopPurchasesCount = data.shopPurchasesCount || 0;
      dailyQuests = data.dailyQuests || null;
      dailyStreak = data.dailyStreak || { count: 0, lastClaimDate: '' };
      minigameCooldownUntil = Number(data.minigameCooldownUntil) || 0;
      achievements = data.achievements || {};
      setActiveColorUI(data.catColor || 'ginger');
      ownedHats = Array.isArray(data.ownedHats) ? data.ownedHats : [];
      equippedHat = data.equippedHat || 'none';
      ownedSweaters = Array.isArray(data.ownedSweaters) ? data.ownedSweaters : [];
      equippedSweater = data.equippedSweater || 'none';
      ownedAccessories = Array.isArray(data.ownedAccessories) ? data.ownedAccessories : [];
      equippedAccessory = data.equippedAccessory || 'none';
      ownedToys = Array.isArray(data.ownedToys) ? data.ownedToys : [];
      activeToy = data.activeToy || 'none';
      ownedBackgrounds = Array.isArray(data.ownedBackgrounds) ? data.ownedBackgrounds : [];
      equippedBackground = data.equippedBackground || 'default';
      ownedSkins = Array.isArray(data.ownedSkins) ? data.ownedSkins : [];
      hasKitten = Boolean(data.hasKitten);
      kittenEnabled = Boolean(data.kittenEnabled);
      yarnMode = Boolean(data.yarnMode);
      catScale = data.catScale || 3;

      applyBackgroundClass(equippedBackground);

      visibleToggle.checked = data.visible !== false;
      hiddenDomains = Array.isArray(data.hiddenDomains) ? data.hiddenDomains : [];
      freeDragToggle.checked = Boolean(data.allowFreeDrag);
      freeRoamToggle.checked = Boolean(data.allowFreeRoam);
      tabsClosedEl.textContent = String(data.tabsClosed || 0);
      fishCount = data.fish || 0;
      currentXp = data.xp || 0;
      currentLevel = data.level || 1;
      updateStatsUI(data.stats);

      sleepyDomains = Array.isArray(data.sleepyDomains) ? data.sleepyDomains : [...DEFAULT_SLEEPY_DOMAINS];
      sleepyLimitMinutes = Number(data.sleepyLimitMinutes) || 5;
      isActiveSiteSleepy = Boolean(data.isActiveSiteSleepy);
      sleepySinceTs = data.sleepySinceTs || null;
      if (data.pomodoro) {
        pomodoro = data.pomodoro;
        selectedFocusMin = pomodoro.focusMinutes || 25;
        selectedBreakMin = pomodoro.breakMinutes || 5;
        presetButtons.forEach((b) => {
          b.classList.toggle('active', Number(b.dataset.focus) === selectedFocusMin);
        });
      }

      sleepyLimitSelect.value = String(sleepyLimitMinutes);
      const moods = tr('moods');
      moodText.textContent = Array.isArray(moods)
        ? moods[Math.floor(Math.random() * moods.length)]
        : '';

      applyTranslations();
      renderFrame(canvas, previewMode, frameIdx, currentColor, false, equippedHat, equippedSweater, equippedAccessory);
      renderFrame(wardrobeCanvas, 'sit', frameIdx, currentColor, false, equippedHat, equippedSweater, equippedAccessory);
    }
  );

  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const tab = tabs && tabs[0];
    if (tab) {
      if (tab.url) {
        activeTabDomain = normalizeDomain(tab.url);
        renderCurrentSiteRow();
      }
      if (Boolean(tab.audible) !== activeTabAudible) {
        activeTabAudible = Boolean(tab.audible);
        renderShop();
      }
    }
  });

  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'local') return;
    if (changes.lang && changes.lang.newValue) { lang = changes.lang.newValue; applyTranslations(); }
    if (changes.catName) {
      catName = changes.catName.newValue || '';
      appTitleEl.textContent = catName.trim() || 'TabCat';
    }
    if (changes.tabsClosed) {
      totalTabsClosed = changes.tabsClosed.newValue || 0;
      tabsClosedEl.textContent = String(totalTabsClosed);
      renderQuestsAndAchievements();
    }
    if (changes.dailyQuests) { dailyQuests = changes.dailyQuests.newValue; renderQuestsAndAchievements(); }
    if (changes.dailyStreak) { dailyStreak = changes.dailyStreak.newValue || { count: 0, lastClaimDate: '' }; renderQuestsAndAchievements(); }
    if (changes.releaseGiftClaimed) { releaseGiftClaimed = Boolean(changes.releaseGiftClaimed.newValue); renderShop(); }
    if (changes.minigameCooldownUntil) { minigameCooldownUntil = Number(changes.minigameCooldownUntil.newValue) || 0; }
    if (changes.achievements) { achievements = changes.achievements.newValue || {}; renderQuestsAndAchievements(); }
    if (changes.shopPurchasesCount) { shopPurchasesCount = changes.shopPurchasesCount.newValue || 0; renderQuestsAndAchievements(); }
    if (changes.fish) updateFishUI(changes.fish.newValue);
    if (changes.stats) updateStatsUI(changes.stats.newValue);
    if (changes.xp || changes.level) {
      chrome.storage.local.get(['xp', 'level'], (d) => updateXPUI(d.xp, d.level));
    }
    if (changes.catColor && changes.catColor.newValue) { setActiveColorUI(changes.catColor.newValue); renderShop(); renderWardrobe(); }
    if (changes.ownedHats) { ownedHats = changes.ownedHats.newValue || []; renderShop(); renderWardrobe(); }
    if (changes.equippedHat) { equippedHat = changes.equippedHat.newValue || 'none'; renderShop(); renderWardrobe(); }
    if (changes.ownedSweaters) { ownedSweaters = changes.ownedSweaters.newValue || []; renderShop(); renderWardrobe(); }
    if (changes.equippedSweater) { equippedSweater = changes.equippedSweater.newValue || 'none'; renderShop(); renderWardrobe(); }
    if (changes.ownedAccessories) { ownedAccessories = changes.ownedAccessories.newValue || []; renderShop(); renderWardrobe(); }
    if (changes.equippedAccessory) { equippedAccessory = changes.equippedAccessory.newValue || 'none'; renderShop(); renderWardrobe(); }
    if (changes.ownedToys) { ownedToys = changes.ownedToys.newValue || []; renderShop(); renderWardrobe(); }
    if (changes.activeToy) { activeToy = changes.activeToy.newValue || 'none'; renderShop(); renderWardrobe(); }
    if (changes.ownedBackgrounds) { ownedBackgrounds = changes.ownedBackgrounds.newValue || []; renderShop(); renderWardrobe(); }
    if (changes.equippedBackground) {
      equippedBackground = changes.equippedBackground.newValue || 'default';
      applyBackgroundClass(equippedBackground);
      renderShop();
      renderWardrobe();
    }
    if (changes.ownedSkins) { ownedSkins = changes.ownedSkins.newValue || []; renderShop(); renderWardrobe(); }
    if (changes.hasKitten) { hasKitten = Boolean(changes.hasKitten.newValue); renderShop(); renderWardrobe(); }
    if (changes.kittenEnabled) { kittenEnabled = Boolean(changes.kittenEnabled.newValue); renderShop(); renderWardrobe(); }
    if (changes.catScale) updateScaleUI(changes.catScale.newValue);
    if (changes.yarnMode) { yarnMode = Boolean(changes.yarnMode.newValue); updateYarnButtonUI(); }
    if (changes.visible) visibleToggle.checked = Boolean(changes.visible.newValue);
    if (changes.hiddenDomains) {
      hiddenDomains = Array.isArray(changes.hiddenDomains.newValue) ? changes.hiddenDomains.newValue : [];
      renderCurrentSiteRow();
    }
    if (changes.allowFreeDrag) freeDragToggle.checked = Boolean(changes.allowFreeDrag.newValue);
    if (changes.allowFreeRoam) freeRoamToggle.checked = Boolean(changes.allowFreeRoam.newValue);
    if (changes.sleepyDomains) { sleepyDomains = changes.sleepyDomains.newValue || []; renderSleepyChips(); renderCurrentSiteRow(); }
    if (changes.sleepyLimitMinutes) { sleepyLimitMinutes = Number(changes.sleepyLimitMinutes.newValue) || 5; sleepyLimitSelect.value = String(sleepyLimitMinutes); }
    if (changes.isActiveSiteSleepy) isActiveSiteSleepy = Boolean(changes.isActiveSiteSleepy.newValue);
    if (changes.activeTabAudible) {
      activeTabAudible = Boolean(changes.activeTabAudible.newValue);
      renderShop();
    }
    if (changes.sleepySinceTs) sleepySinceTs = changes.sleepySinceTs.newValue || null;
    if (changes.pomodoro && changes.pomodoro.newValue) { pomodoro = changes.pomodoro.newValue; updatePomodoroUI(); }
    updateStatusBadge();
  });

  yarnBtn.addEventListener('click', () => {
    yarnMode = !yarnMode;
    chrome.storage.local.set({ yarnMode, activeToy: 'none' });
    updateYarnButtonUI();
    updateStatusBadge();
    moodText.textContent = yarnMode ? tr('moodYarnOn') : tr('moodYarnOff');
  });

  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedFocusMin = Number(btn.dataset.focus) || 25;
      selectedBreakMin = Number(btn.dataset.break) || 5;
      presetButtons.forEach((b) => b.classList.toggle('active', b === btn));
      updatePomodoroUI();
    });
  });

  pomoActionBtn.addEventListener('click', () => {
    if (pomodoro.phase === 'idle') {
      chrome.runtime.sendMessage(
        { type: 'START_POMODORO', focusMinutes: selectedFocusMin, breakMinutes: selectedBreakMin },
        (res) => {
          if (res && res.pomodoro) {
            pomodoro = res.pomodoro;
            updatePomodoroUI();
            updateStatusBadge();
            moodText.textContent = tr('moodFocusStart');
          }
        }
      );
    } else {
      chrome.runtime.sendMessage({ type: 'STOP_POMODORO' }, (res) => {
        if (res && res.pomodoro) {
          pomodoro = res.pomodoro;
          updatePomodoroUI();
          updateStatusBadge();
          moodText.textContent = tr('moodFocusStop');
        }
      });
    }
  });

  colorButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const color = btn.dataset.color;
      setActiveColorUI(color);
      chrome.storage.local.set({ catColor: color });
      previewMode = 'happy';
      previewModeUntil = Date.now() + 1400;
      wardrobeMood.textContent = tr('moodColor');
    });
  });

  toggleCurrentSiteBtn.addEventListener('click', () => {
    if (!activeTabDomain) return;
    const inList = isDomainInList(activeTabDomain, sleepyDomains);
    if (inList) {
      const matched = sleepyDomains.find((d) => activeTabDomain === d || activeTabDomain.endsWith('.' + d));
      removeDomainDirectly(matched || activeTabDomain);
      showFeedback(tr('feedbackRemoved', { domain: matched || activeTabDomain }));
    } else {
      addDomainDirectly(activeTabDomain);
    }
  });

  addDomainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (addDomainDirectly(domainInput.value)) domainInput.value = '';
  });

  sleepyLimitSelect.addEventListener('change', () => {
    sleepyLimitMinutes = Number(sleepyLimitSelect.value) || 5;
    chrome.storage.local.set({ sleepyLimitMinutes });
  });

  visibleToggle.addEventListener('change', () => {
    chrome.storage.local.set({ visible: visibleToggle.checked });
    moodText.textContent = visibleToggle.checked ? tr('moodVisibleOn') : tr('moodVisibleOff');
  });

  if (hideSiteBtn) {
    hideSiteBtn.addEventListener('click', () => {
      if (!activeTabDomain) return;
      const isHiddenHere = isDomainInList(activeTabDomain, hiddenDomains);
      if (isHiddenHere) {
        const matched = hiddenDomains.find((d) => activeTabDomain === d || activeTabDomain.endsWith('.' + d));
        hiddenDomains = hiddenDomains.filter((d) => d !== (matched || activeTabDomain));
      } else {
        hiddenDomains = [activeTabDomain, ...hiddenDomains];
      }
      chrome.storage.local.set({ hiddenDomains });
      renderCurrentSiteRow();
    });
  }

  freeDragToggle.addEventListener('change', () => {
    chrome.storage.local.set({ allowFreeDrag: freeDragToggle.checked });
    moodText.textContent = freeDragToggle.checked ? tr('moodFreeDragOn') : tr('moodFreeDragOff');
  });

  freeRoamToggle.addEventListener('change', () => {
    chrome.storage.local.set({ allowFreeRoam: freeRoamToggle.checked });
    moodText.textContent = freeRoamToggle.checked ? tr('moodFreeRoamOn') : tr('moodFreeRoamOff');
  });

  advancedToggleBtn.addEventListener('click', () => {
    const isHidden = advancedPanel.classList.toggle('hidden');
    advancedArrow.textContent = isHidden ? '▾' : '▴';
  });

  scaleButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const scale = Number(btn.dataset.scale) || 3;
      updateScaleUI(scale);
      chrome.storage.local.set({ catScale: scale });
    });
  });

  langButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      lang = btn.dataset.lang || 'en';
      chrome.storage.local.set({ lang });
      applyTranslations();
    });
  });

  if (catNameForm) {
    catNameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      catName = catNameInput.value.trim().slice(0, 18);
      appTitleEl.textContent = catName || 'TabCat';
      chrome.storage.local.set({ catName });
      wardrobeMood.textContent = tr('moodColor');
    });
  }

  feedBtn.addEventListener('click', feedCatFromPopup);
  petBtn.addEventListener('click', animatePetInPopup);
  canvas.addEventListener('click', animatePetInPopup);
  wardrobeCanvas.addEventListener('click', animatePetInPopup);

  // Daily Streak Claim
  if (claimStreakBtn) {
    claimStreakBtn.addEventListener('click', () => {
      chrome.runtime.sendMessage({ type: 'CLAIM_DAILY_STREAK' }, (res) => {
        if (res && res.ok) {
          dailyStreak = res.dailyStreak;
          updateFishUI(res.fish);
          renderQuestsAndAchievements();
        }
      });
    });
  }

  if (claimReleaseGiftBtn) {
    claimReleaseGiftBtn.addEventListener('click', () => {
      if (releaseGiftClaimed) return;
      chrome.runtime.sendMessage({ type: 'CLAIM_RELEASE_GIFT' }, (res) => {
        if (!res || !res.ok) return;
        releaseGiftClaimed = true;
        ownedHats = res.ownedHats || ownedHats;
        ownedSweaters = res.ownedSweaters || ownedSweaters;
        ownedAccessories = res.ownedAccessories || ownedAccessories;
        equippedHat = res.equippedHat || equippedHat;
        equippedSweater = res.equippedSweater || equippedSweater;
        equippedAccessory = res.equippedAccessory || equippedAccessory;
        renderShop();
        renderWardrobe();
        playShopPurchaseAnimation('🎁', tr('releaseGiftTitle'));
      });
    });
  }

  if (snapshotCatBtn) {
    snapshotCatBtn.addEventListener('click', () => {
      const card = document.createElement('canvas');
      card.width = 600;
      card.height = 420;
      const c = card.getContext('2d');

      // Background palette matching equipped room background
      const bgThemes = {
        default:   ['#fff7ec', '#fde4c6', '#471e0d', '#f5c79c'],
        room:      ['#dff1ff', '#f7e5cf', '#3c2a21', '#b6d8f2'],
        garden:    ['#d7f7dc', '#b8e8c0', '#1f4d2e', '#8cd49c'],
        cyberpunk: ['#18122b', '#39215c', '#f5e9ff', '#00f0ff'],
        space:     ['#0b1026', '#1e2752', '#eef4ff', '#7dd3fc']
      };
      const [cTop, cBot, textColor, accentColor] = bgThemes[equippedBackground] || bgThemes.default;
      const grad = c.createLinearGradient(0, 0, 0, card.height);
      grad.addColorStop(0, cTop);
      grad.addColorStop(1, cBot);
      c.fillStyle = grad;
      c.fillRect(0, 0, card.width, card.height);

      // Decorative background details
      if (equippedBackground === 'space' || equippedBackground === 'cyberpunk') {
        c.fillStyle = 'rgba(255,255,255,0.65)';
        [[60,55,3],[140,90,2],[480,65,3],[530,120,2],[90,170,2],[440,145,3],[230,45,2],[370,55,2]].forEach(([sx, sy, sr]) => {
          c.fillRect(sx, sy, sr * 2, sr * 2);
        });
      }
      if (equippedBackground === 'cyberpunk') {
        c.strokeStyle = 'rgba(0, 240, 255, 0.25)';
        c.lineWidth = 2;
        for (let gy = 270; gy < 420; gy += 24) {
          c.beginPath(); c.moveTo(0, gy); c.lineTo(600, gy); c.stroke();
        }
      }

      // Cozy pixel floor strip
      c.fillStyle = equippedBackground === 'cyberpunk' || equippedBackground === 'space'
        ? 'rgba(255, 255, 255, 0.08)'
        : 'rgba(71, 30, 13, 0.08)';
      c.fillRect(24, 286, 552, 108);

      // Outer card border
      c.strokeStyle = accentColor;
      c.lineWidth = 8;
      c.strokeRect(12, 12, card.width - 24, card.height - 24);

      // Render crisp 8x pixel cat in full outfit!
      const sprite = document.createElement('canvas');
      sprite.width = 192;
      sprite.height = 160;
      renderFrame(sprite, 'happy', 0, currentColor, false, equippedHat, equippedSweater, equippedAccessory);
      c.imageSmoothingEnabled = false;
      if (currentColor === 'ghost') {
        c.save();
        c.globalAlpha = 0.82;
        c.shadowColor = 'rgba(130, 230, 255, 0.9)';
        c.shadowBlur = 18;
        c.drawImage(sprite, 204, 108, 192, 160);
        c.restore();
      } else {
        c.drawImage(sprite, 204, 108, 192, 160);
      }

      // Cat name & level title
      const displayName = (catName && catName.trim()) ? catName.trim() : 'TabCat';
      c.fillStyle = textColor;
      c.textAlign = 'center';
      c.font = '800 32px system-ui, -apple-system, Segoe UI, sans-serif';
      c.fillText(displayName, 300, 66);

      // Stats pills line
      c.font = '700 18px system-ui, -apple-system, Segoe UI, sans-serif';
      c.fillText(`LVL ${currentLevel}   •   🐟 ${fishCount}   •   🗂️ ${totalTabsClosed}`, 300, 330);

      // Subtle footer badge
      c.globalAlpha = 0.72;
      c.font = '700 14px system-ui, -apple-system, Segoe UI, sans-serif';
      c.fillText('TabCat v1.0  •  Pixel Browser Pet 🐾', 300, 372);
      c.globalAlpha = 1;

      const safeFile = displayName.toLowerCase().replace(/[^a-z0-9_-]+/g, '') || 'tabcat';
      const a = document.createElement('a');
      a.href = card.toDataURL('image/png');
      a.download = `${safeFile}-card.png`;
      a.click();

      if (wardrobeStage) {
        wardrobeStage.classList.add('flash');
        setTimeout(() => wardrobeStage.classList.remove('flash'), 220);
      }
      if (wardrobeMood) wardrobeMood.textContent = tr('snapshotSaved');
    });
  }

  // Export / Import Save JSON
  if (exportSaveBtn) {
    exportSaveBtn.addEventListener('click', () => {
      chrome.storage.local.get(null, (allData) => {
        const blob = new Blob([JSON.stringify({ app: 'TabCat', version: '1.0.0', data: allData }, null, 2)], {
          type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'tabcat-save.json';
        a.click();
        setTimeout(() => URL.revokeObjectURL(url), 4000);
      });
    });
  }

  if (importSaveBtn && importSaveInput) {
    importSaveBtn.addEventListener('click', () => importSaveInput.click());
    importSaveInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(String(reader.result || ''));
          if (!parsed || parsed.app !== 'TabCat' || !parsed.data || typeof parsed.data !== 'object') {
            throw new Error('bad format');
          }
          chrome.storage.local.set(parsed.data, () => {
            if (saveFeedback) saveFeedback.textContent = tr('importOk');
            setTimeout(() => location.reload(), 700);
          });
        } catch (_) {
          if (saveFeedback) saveFeedback.textContent = tr('importErr');
        }
      };
      reader.readAsText(file);
      importSaveInput.value = '';
    });
  }

  // ==================== CATCH FISH MINI-GAME (15s Arcade) ====================
  const mgSprite = document.createElement('canvas');
  mgSprite.width = 48;
  mgSprite.height = 40;
  let mgRunning = false;
  let mgCatX = 148;
  let mgKeys = { left: false, right: false };

  if (minigameBtn && minigameBox) {
    minigameBtn.addEventListener('click', () => {
      const isHidden = minigameBox.classList.toggle('hidden');
      minigameBtn.classList.toggle('active', !isHidden);
      if (isHidden && mgRunning) {
        mgRunning = false;
        if (minigameStartBtn) minigameStartBtn.disabled = false;
      }
    });
  }

  if (minigameCanvas) {
    minigameCanvas.addEventListener('pointermove', (e) => {
      if (!mgRunning) return;
      const rect = minigameCanvas.getBoundingClientRect();
      const relX = ((e.clientX - rect.left) / rect.width) * minigameCanvas.width;
      mgCatX = Math.max(24, Math.min(minigameCanvas.width - 24, relX));
    });
  }

  window.addEventListener('keydown', (e) => {
    if (!mgRunning) return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') mgKeys.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') mgKeys.right = true;
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') mgKeys.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') mgKeys.right = false;
  });

  if (minigameStartBtn && minigameCanvas) {
    minigameStartBtn.addEventListener('click', () => {
      if (mgRunning) return;
      const now = Date.now();
      if (minigameCooldownUntil > now) {
        const left = Math.ceil((minigameCooldownUntil - now) / 1000);
        minigameHint.textContent = tr('minigameCooldown', { sec: left });
        return;
      }

      mgRunning = true;
      minigameStartBtn.disabled = true;
      minigameHint.textContent = tr('minigameHint');

      const mctx = minigameCanvas.getContext('2d');
      const mw = minigameCanvas.width;
      const mh = minigameCanvas.height;
      let score = 0;
      let drops = [];
      let lastSpawn = 0;
      let startTs = null;
      let lastFrame = 0;

      function mgLoop(ts) {
        if (!mgRunning) return;
        if (startTs === null) { startTs = ts; lastFrame = ts; }
        const dt = Math.min(0.05, (ts - lastFrame) / 1000);
        lastFrame = ts;
        const elapsed = (ts - startTs) / 1000;
        const leftSec = Math.max(0, 15.0 - elapsed);

        if (mgKeys.left) mgCatX -= 220 * dt;
        if (mgKeys.right) mgCatX += 220 * dt;
        mgCatX = Math.max(24, Math.min(mw - 24, mgCatX));

        if (ts - lastSpawn > 520) {
          lastSpawn = ts;
          const isCucumber = Math.random() < 0.28;
          drops.push({
            x: 18 + Math.random() * (mw - 36),
            y: -14,
            vy: 95 + Math.random() * 65,
            kind: isCucumber ? 'cucumber' : 'fish'
          });
        }

        mctx.clearRect(0, 0, mw, mh);

        // Update & draw falling fish / cucumbers
        mctx.font = '20px system-ui';
        mctx.textAlign = 'center';
        mctx.textBaseline = 'middle';
        const nextDrops = [];
        for (const d of drops) {
          d.y += d.vy * dt;
          if (Math.abs(d.x - mgCatX) < 26 && d.y > mh - 46 && d.y < mh - 6) {
            if (d.kind === 'fish') score += 1;
            else score = Math.max(0, score - 1);
            continue;
          }
          if (d.y < mh + 16) {
            mctx.fillText(d.kind === 'fish' ? '🐟' : '🥒', d.x, d.y);
            nextDrops.push(d);
          }
        }
        drops = nextDrops;

        // Draw our real pixel cat!
        renderFrame(mgSprite, 'walk', Math.floor(elapsed * 8) % 4, currentColor, mgKeys.left, equippedHat, equippedSweater, equippedAccessory);
        mctx.imageSmoothingEnabled = false;
        mctx.drawImage(mgSprite, Math.round(mgCatX - 24), mh - 42, 48, 40);

        minigameHud.textContent = `${leftSec.toFixed(1)}s • 🐟 ${score}`;

        if (elapsed < 15.0) {
          requestAnimationFrame(mgLoop);
        } else {
          mgRunning = false;
          minigameStartBtn.disabled = false;
          const rewardFish = Math.min(5, Math.max(1, Math.ceil(score / 3)));
          chrome.runtime.sendMessage({ type: 'MINIGAME_REWARD', fish: score > 0 ? rewardFish : 0 }, (res) => {
            const actualFish = score > 0 ? rewardFish : 0;
            if (res && res.ok) {
              minigameCooldownUntil = res.cooldownUntil;
              updateFishUI(res.fish);
              updateStatsUI(res.stats);
            }
            minigameHint.textContent = tr('minigameResult', { score, fish: actualFish });
          });
        }
      }

      requestAnimationFrame(mgLoop);
    });
  }

  setInterval(() => {
    updatePomodoroUI();
    updateStatusBadge();

    const stage = getSleepStage();
    let modeToDraw = previewMode;
    if (Date.now() > previewModeUntil) {
      modeToDraw =
        stage === 'sleep' ? 'sleep' :
        stage === 'yawn' ? 'yawn' :
        pomodoro.phase === 'focus' ? 'focus' :
        activeTabAudible ? 'music' :
        'sit';
      previewMode = modeToDraw;
    }
    const isGhost = currentColor === 'ghost';
    canvas.classList.toggle('ghost-glow', isGhost);
    wardrobeCanvas.classList.toggle('ghost-glow', isGhost);
    frameIdx = (frameIdx + 1) % 2;
    renderFrame(canvas, modeToDraw, frameIdx, currentColor, false, equippedHat, equippedSweater, equippedAccessory);
    renderFrame(wardrobeCanvas, previewMode === 'happy' ? 'happy' : 'sit', frameIdx, currentColor, false, equippedHat, equippedSweater, equippedAccessory);
  }, 400);
})();
