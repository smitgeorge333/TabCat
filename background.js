// TabCat — Background Service Worker (Manifest V3)
// Tracks closed tabs, sleepy sites, Pomodoro focus timer, XP/level, fish currency & Tamagotchi stats.

const DEFAULT_SLEEPY_DOMAINS = [
  'youtube.com',
  'tiktok.com',
  'vk.com',
  'reddit.com',
  'twitch.tv',
  'instagram.com',
  'x.com',
  'twitter.com'
];

const DEFAULT_POMODORO = {
  phase: 'idle', // 'idle' | 'focus' | 'break'
  endTs: null,
  focusMinutes: 25,
  breakMinutes: 5,
  sessionsCompleted: 0
};

const DEFAULT_STATS = {
  hunger: 80,   // Сытость (0..100)
  pleasure: 80, // Удовольствие (0..100)
  energy: 90    // Бодрость (0..100)
};

const HAT_PRICES = {
  none: 0,
  beanie: 3,
  bow: 4,
  cap: 4,
  chef: 5,
  wizard: 6,
  viking: 7,
  crown: 8,
  halo: 0 // Achievement reward (5 Pomodoros)
};

const SWEATER_PRICES = {
  none: 0,
  cozy_red: 4,
  mint_hoodie: 5,
  sky_stripe: 6,
  hacker: 6,
  sakura: 7,
  tuxedo: 7,
  royal_cape: 9
};

const ACCESSORY_PRICES = {
  none: 0,
  cyber_glasses: 5,
  scarf: 4,
  bowtie: 4,
  wings: 10
};

const TREAT_PRICES = {
  kibble: 1,
  salmon: 3,
  catnip: 2
};

const TOY_PRICES = {
  laser: 5,
  mouse: 6,
  box: 7,
  trampoline: 7,
  bed: 6
};

const BG_PRICES = {
  default: 0,
  room: 4,
  garden: 5,
  cyberpunk: 6,
  space: 8
};

const SKIN_PRICES = {
  siamese: 7,
  calico: 8,
  cyber: 10,
  golden: 0 // Achievement reward (100 closed tabs)
};

const KITTEN_PRICE = 12;

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function makeFreshDailyQuests() {
  return {
    date: getTodayKey(),
    tabsToday: 0,
    pomoToday: 0,
    petToday: false,
    feedToday: false,
    claimed: { close10: false, pomo1: false, care2: false }
  };
}

const DEFAULT_ACHIEVEMENTS = {
  first10: false,
  tabs100: false,
  pomo5: false,
  shop3: false
};

const DEFAULT_STATE = {
  lang: 'en', // 'en' | 'ru' | 'zh'
  catName: '',
  catColor: 'ginger',
  visible: true,
  allowFreeDrag: false,
  allowFreeRoam: false,
  catScale: 3,
  ownedHats: [],
  equippedHat: 'none',
  ownedSweaters: [],
  equippedSweater: 'none',
  ownedAccessories: [],
  equippedAccessory: 'none',
  ownedToys: [],
  activeToy: 'none', // 'none' | 'laser' | 'mouse' | 'box' | 'trampoline' | 'bed'
  ownedBackgrounds: [],
  equippedBackground: 'default',
  ownedSkins: [],
  hasKitten: false,
  kittenEnabled: false,
  catnipUntilTs: 0,
  yarnMode: false,
  shopPurchasesCount: 0,
  dailyQuests: makeFreshDailyQuests(),
  achievements: DEFAULT_ACHIEVEMENTS,
  tabsClosed: 0,
  fish: 3, // Starter treat so you can feed right away!
  starterFishGiven: true,
  xp: 0,
  level: 1,
  stats: DEFAULT_STATS,
  lastStatsTickTs: Date.now(),
  sleepyDomains: DEFAULT_SLEEPY_DOMAINS,
  sleepyLimitMinutes: 5,
  activeDomain: '',
  isActiveSiteSleepy: false,
  sleepySinceTs: null,
  pomodoro: DEFAULT_POMODORO,
  lastEvent: { type: 'none', ts: 0 }
};

const XP_PER_LEVEL = 100;

function clampStat(val) {
  return Math.max(5, Math.min(100, Math.round(val)));
}

function normalizeDomain(input) {
  if (!input || typeof input !== 'string') return '';
  let s = input.trim().toLowerCase();
  if (!s) return '';
  try {
    if (!s.includes('://')) {
      s = 'https://' + s;
    }
    const url = new URL(s);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
    return url.hostname.replace(/^www\./, '');
  } catch (_) {
    return '';
  }
}

function isDomainSleepy(hostname, sleepyList) {
  if (!hostname || !Array.isArray(sleepyList)) return false;
  return sleepyList.some((d) => hostname === d || hostname.endsWith('.' + d));
}

function calcLevel(xp) {
  return Math.floor((xp || 0) / XP_PER_LEVEL) + 1;
}

async function updateQuestsAndAchievements(updates = {}) {
  const data = await chrome.storage.local.get([
    'dailyQuests',
    'achievements',
    'tabsClosed',
    'pomodoro',
    'shopPurchasesCount',
    'fish',
    'ownedSkins',
    'ownedHats'
  ]);

  const today = getTodayKey();
  let dq = data.dailyQuests && data.dailyQuests.date === today
    ? { ...data.dailyQuests, claimed: { ...(data.dailyQuests.claimed || {}) } }
    : makeFreshDailyQuests();

  if (updates.tabsDelta) dq.tabsToday = (dq.tabsToday || 0) + updates.tabsDelta;
  if (updates.pomoDelta) dq.pomoToday = (dq.pomoToday || 0) + updates.pomoDelta;
  if (updates.pet) dq.petToday = true;
  if (updates.feed) dq.feedToday = true;

  const nextPurchases = (data.shopPurchasesCount || 0) + (updates.purchaseDelta || 0);
  const ach = { ...DEFAULT_ACHIEVEMENTS, ...(data.achievements || {}) };
  let bonusFish = 0;
  const ownedSkins = Array.isArray(data.ownedSkins) ? [...data.ownedSkins] : [];
  const ownedHats = Array.isArray(data.ownedHats) ? [...data.ownedHats] : [];

  const totalTabs = data.tabsClosed || 0;
  const totalPomo = (data.pomodoro && data.pomodoro.sessionsCompleted) || 0;

  if (!ach.first10 && totalTabs >= 10) {
    ach.first10 = true;
    bonusFish += 2;
  }
  if (!ach.tabs100 && totalTabs >= 100) {
    ach.tabs100 = true;
    if (!ownedSkins.includes('golden')) ownedSkins.push('golden');
  }
  if (!ach.pomo5 && totalPomo >= 5) {
    ach.pomo5 = true;
    if (!ownedHats.includes('halo')) ownedHats.push('halo');
  }
  if (!ach.shop3 && nextPurchases >= 3) {
    ach.shop3 = true;
    bonusFish += 5;
  }

  const patch = {
    dailyQuests: dq,
    achievements: ach,
    shopPurchasesCount: nextPurchases,
    ownedSkins,
    ownedHats
  };
  if (bonusFish > 0) {
    patch.fish = (data.fish || 0) + bonusFish;
  }
  await chrome.storage.local.set(patch);
}

async function ensureDefaults() {
  const current = await chrome.storage.local.get(Object.keys(DEFAULT_STATE));
  const patch = {};
  for (const [key, val] of Object.entries(DEFAULT_STATE)) {
    if (current[key] === undefined) {
      patch[key] = val;
    }
  }
  // Gift 3 starter fish once for users upgrading from v0.3.0 with 0 fish
  if (!current.starterFishGiven) {
    patch.starterFishGiven = true;
    if ((current.fish || 0) < 3) {
      patch.fish = 3;
    }
  }
  if (Object.keys(patch).length > 0) {
    await chrome.storage.local.set(patch);
  }
}

async function ensureInjected(tabId, url) {
  if (!tabId || !url || !/^https?:\/\//i.test(url)) return;
  try {
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['i18n.js', 'cat-sprites.js', 'content.js']
    });
  } catch (_) {}
}

async function injectIntoAllOpenTabs() {
  try {
    const tabs = await chrome.tabs.query({ url: ['http://*/*', 'https://*/*'] });
    for (const tab of tabs) {
      if (tab.id && tab.url) {
        ensureInjected(tab.id, tab.url);
      }
    }
  } catch (_) {}
}

// Gentle passive stat updates over time
async function tickStats() {
  try {
    const data = await chrome.storage.local.get([
      'stats',
      'lastStatsTickTs',
      'isActiveSiteSleepy'
    ]);
    const now = Date.now();
    const lastTs = data.lastStatsTickTs || now;
    const elapsedMin = Math.min(60, (now - lastTs) / 60000);
    if (elapsedMin < 1) return;

    const stats = { ...DEFAULT_STATS, ...(data.stats || {}) };
    // Hunger & pleasure decay gently so it's cozy, never stressful
    const hungerDrop = elapsedMin * 0.25;   // ~15 pts / hour
    const pleasureDrop = elapsedMin * 0.15; // ~9 pts / hour
    const energyDelta = data.isActiveSiteSleepy
      ? -(elapsedMin * 2.5) // gets sleepy on distracting sites
      : +(elapsedMin * 1.2); // recovers on normal sites

    const nextStats = {
      hunger: clampStat(stats.hunger - hungerDrop),
      pleasure: clampStat(stats.pleasure - pleasureDrop),
      energy: clampStat(stats.energy + energyDelta)
    };

    await chrome.storage.local.set({
      stats: nextStats,
      lastStatsTickTs: now
    });
  } catch (_) {}
}

async function modifyStats(deltas) {
  const data = await chrome.storage.local.get(['stats']);
  const stats = { ...DEFAULT_STATS, ...(data.stats || {}) };
  const nextStats = {
    hunger: clampStat(stats.hunger + (deltas.hunger || 0)),
    pleasure: clampStat(stats.pleasure + (deltas.pleasure || 0)),
    energy: clampStat(stats.energy + (deltas.energy || 0))
  };
  await chrome.storage.local.set({ stats: nextStats });
  return nextStats;
}

async function evaluateActiveTab() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    const data = await chrome.storage.local.get([
      'sleepyDomains',
      'sleepyLimitMinutes',
      'sleepySinceTs',
      'isActiveSiteSleepy'
    ]);

    const sleepyDomains = Array.isArray(data.sleepyDomains)
      ? data.sleepyDomains
      : DEFAULT_SLEEPY_DOMAINS;
    const limitMs = (Number(data.sleepyLimitMinutes) || 5) * 60 * 1000;

    const domain = tab && tab.url ? normalizeDomain(tab.url) : '';
    const sleepyNow = isDomainSleepy(domain, sleepyDomains);
    const wasSleepy = Boolean(data.isActiveSiteSleepy);
    const prevSince = data.sleepySinceTs || null;

    const patch = {
      activeDomain: domain,
      isActiveSiteSleepy: sleepyNow
    };

    if (sleepyNow) {
      if (!prevSince) {
        patch.sleepySinceTs = Date.now();
      }
    } else {
      const wasAsleep = wasSleepy && prevSince && (Date.now() - prevSince >= limitMs);
      patch.sleepySinceTs = null;
      if (wasAsleep && domain) {
        patch.lastEvent = {
          type: 'wake_up',
          ts: Date.now()
        };
      }
    }

    await chrome.storage.local.set(patch);
  } catch (err) {
    console.warn('TabCat evaluateActiveTab error:', err);
  }
}

async function checkPomodoroCompletion() {
  const data = await chrome.storage.local.get(['pomodoro', 'fish', 'xp', 'stats']);
  const pomo = data.pomodoro || DEFAULT_POMODORO;
  if (pomo.phase === 'idle' || !pomo.endTs) return;

  const now = Date.now();
  if (now < pomo.endTs - 500) return;

  if (pomo.phase === 'focus') {
    const nextFish = (data.fish || 0) + 5;
    const nextXp = (data.xp || 0) + 25;
    const nextLevel = calcLevel(nextXp);
    const stats = { ...DEFAULT_STATS, ...(data.stats || {}) };
    const nextStats = {
      hunger: clampStat(stats.hunger - 4),
      pleasure: clampStat(stats.pleasure + 15),
      energy: clampStat(stats.energy + 8)
    };
    const breakMs = (pomo.breakMinutes || 5) * 60 * 1000;
    const nextEndTs = now + breakMs;

    const nextPomo = {
      ...pomo,
      phase: 'break',
      endTs: nextEndTs,
      sessionsCompleted: (pomo.sessionsCompleted || 0) + 1
    };

    await chrome.storage.local.set({
      pomodoro: nextPomo,
      fish: nextFish,
      xp: nextXp,
      level: nextLevel,
      stats: nextStats,
      lastEvent: {
        type: 'pomodoro_focus_done',
        ts: now
      }
    });

    chrome.alarms.create('tabcat-pomodoro-end', { when: nextEndTs });
    await updateQuestsAndAchievements({ pomoDelta: 1 });
  } else if (pomo.phase === 'break') {
    const nextPomo = {
      ...pomo,
      phase: 'idle',
      endTs: null
    };

    await chrome.storage.local.set({
      pomodoro: nextPomo,
      lastEvent: {
        type: 'pomodoro_break_done',
        ts: now
      }
    });
  }
}

async function startPomodoro(focusMinutes, breakMinutes) {
  const fMin = Math.max(1, Math.min(120, Number(focusMinutes) || 25));
  const bMin = Math.max(1, Math.min(60, Number(breakMinutes) || 5));
  const data = await chrome.storage.local.get(['pomodoro']);
  const prev = data.pomodoro || DEFAULT_POMODORO;
  const endTs = Date.now() + fMin * 60 * 1000;

  const nextPomo = {
    phase: 'focus',
    endTs,
    focusMinutes: fMin,
    breakMinutes: bMin,
    sessionsCompleted: prev.sessionsCompleted || 0
  };

  await chrome.storage.local.set({
    pomodoro: nextPomo,
    lastEvent: {
      type: 'pomodoro_started',
      ts: Date.now()
    }
  });

  await chrome.alarms.clear('tabcat-pomodoro-end');
  chrome.alarms.create('tabcat-pomodoro-end', { when: endTs });
  return nextPomo;
}

async function stopPomodoro() {
  const data = await chrome.storage.local.get(['pomodoro']);
  const prev = data.pomodoro || DEFAULT_POMODORO;
  const nextPomo = {
    ...prev,
    phase: 'idle',
    endTs: null
  };
  await chrome.alarms.clear('tabcat-pomodoro-end');
  await chrome.storage.local.set({ pomodoro: nextPomo });
  return nextPomo;
}

async function feedCat() {
  const data = await chrome.storage.local.get(['fish', 'xp', 'stats']);
  const currentFish = data.fish || 0;
  if (currentFish <= 0) {
    return { ok: false, reason: 'no_fish' };
  }
  const stats = { ...DEFAULT_STATS, ...(data.stats || {}) };
  const nextStats = {
    hunger: clampStat(stats.hunger + 28),
    pleasure: clampStat(stats.pleasure + 16),
    energy: clampStat(stats.energy + 6)
  };
  const nextFish = currentFish - 1;
  const nextXp = (data.xp || 0) + 5;
  const nextLevel = calcLevel(nextXp);

  await chrome.storage.local.set({
    fish: nextFish,
    xp: nextXp,
    level: nextLevel,
    stats: nextStats,
    lastEvent: {
      type: 'feed_cat',
      ts: Date.now()
    }
  });
  await updateQuestsAndAchievements({ feed: true });

  return { ok: true, fish: nextFish, stats: nextStats };
}

chrome.runtime.onInstalled.addListener(async () => {
  await ensureDefaults();
  await evaluateActiveTab();
  await injectIntoAllOpenTabs();
  chrome.alarms.create('tabcat-heartbeat', { periodInMinutes: 1 });
});

chrome.runtime.onStartup.addListener(async () => {
  await ensureDefaults();
  await evaluateActiveTab();
  await checkPomodoroCompletion();
  await tickStats();
  chrome.alarms.create('tabcat-heartbeat', { periodInMinutes: 1 });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'tabcat-heartbeat') {
    evaluateActiveTab();
    checkPomodoroCompletion();
    tickStats();
  } else if (alarm.name === 'tabcat-pomodoro-end') {
    checkPomodoroCompletion();
  }
});

chrome.storage.onChanged.addListener((changes, areaName) => {
  if (areaName !== 'local') return;
  if (changes.sleepyDomains || changes.sleepyLimitMinutes) {
    evaluateActiveTab();
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    if (tab && tab.url) {
      ensureInjected(tab.id, tab.url);
    }
  } catch (_) {}
  evaluateActiveTab();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab && tab.url) {
    ensureInjected(tabId, tab.url);
  }
  if (tab && tab.active && (changeInfo.url || changeInfo.status === 'complete')) {
    evaluateActiveTab();
  }
});

chrome.windows.onFocusChanged.addListener((windowId) => {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    evaluateActiveTab();
  }
});

chrome.tabs.onRemoved.addListener(async () => {
  try {
    const data = await chrome.storage.local.get(['tabsClosed', 'fish', 'xp', 'stats']);
    const nextTabs = (data.tabsClosed || 0) + 1;
    const earnedFish = nextTabs % 5 === 0 ? 1 : 0;
    const nextFish = (data.fish || 0) + earnedFish;
    const nextXp = (data.xp || 0) + 2;
    const nextLevel = calcLevel(nextXp);
    const stats = { ...DEFAULT_STATS, ...(data.stats || {}) };
    const nextStats = {
      ...stats,
      pleasure: clampStat(stats.pleasure + 2)
    };

    await chrome.storage.local.set({
      tabsClosed: nextTabs,
      fish: nextFish,
      xp: nextXp,
      level: nextLevel,
      stats: nextStats,
      lastEvent: {
        type: earnedFish > 0 ? 'tab_closed_fish' : 'tab_closed',
        ts: Date.now()
      }
    });
    await evaluateActiveTab();
    await updateQuestsAndAchievements({ tabsDelta: 1 });
  } catch (err) {
    console.warn('TabCat onRemoved error:', err);
  }
});

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (!msg || !msg.type) return;

  if (msg.type === 'PET_CAT') {
    modifyStats({ pleasure: 6 }).then(async (stats) => {
      await updateQuestsAndAchievements({ pet: true });
      await chrome.storage.local.set({
        lastEvent: {
          type: 'pet_from_popup',
          ts: Date.now()
        }
      });
      sendResponse({ ok: true, stats });
    });
    return true;
  }

  if (msg.type === 'PET_ON_PAGE') {
    modifyStats({ pleasure: 6 }).then(async (stats) => {
      await updateQuestsAndAchievements({ pet: true });
      sendResponse({ ok: true, stats });
    });
    return true;
  }

  if (msg.type === 'CLAIM_QUEST') {
    const questId = msg.questId;
    const rewards = { close10: 3, pomo1: 4, care2: 2 };
    if (!(questId in rewards)) {
      sendResponse({ ok: false });
      return;
    }
    chrome.storage.local.get(['dailyQuests', 'fish']).then(async (data) => {
      const today = getTodayKey();
      const dq = data.dailyQuests && data.dailyQuests.date === today
        ? { ...data.dailyQuests, claimed: { ...(data.dailyQuests.claimed || {}) } }
        : makeFreshDailyQuests();

      const done =
        (questId === 'close10' && (dq.tabsToday || 0) >= 10) ||
        (questId === 'pomo1' && (dq.pomoToday || 0) >= 1) ||
        (questId === 'care2' && dq.petToday && dq.feedToday);

      if (!done || dq.claimed[questId]) {
        sendResponse({ ok: false });
        return;
      }

      dq.claimed[questId] = true;
      const nextFish = (data.fish || 0) + rewards[questId];
      await chrome.storage.local.set({ dailyQuests: dq, fish: nextFish });
      sendResponse({ ok: true, fish: nextFish, dailyQuests: dq });
    });
    return true;
  }

  if (msg.type === 'KITTEN_GRABBED') {
    modifyStats({ pleasure: -6 }).then((stats) => sendResponse({ ok: true, stats }));
    return true;
  }

  if (msg.type === 'FEED_CAT') {
    feedCat().then((res) => sendResponse(res));
    return true;
  }

  if (msg.type === 'BUY_OR_EQUIP_HAT') {
    const hatId = msg.hatId || 'none';
    if (!(hatId in HAT_PRICES)) {
      sendResponse({ ok: false, reason: 'unknown_hat' });
      return;
    }
    chrome.storage.local.get(['fish', 'ownedHats', 'equippedHat']).then(async (data) => {
      const owned = Array.isArray(data.ownedHats) ? [...data.ownedHats] : [];
      let fish = data.fish || 0;

      if (hatId === 'none') {
        await chrome.storage.local.set({ equippedHat: 'none' });
        sendResponse({ ok: true, equippedHat: 'none', ownedHats: owned, fish });
        return;
      }

      if (owned.includes(hatId)) {
        const nextHat = data.equippedHat === hatId ? 'none' : hatId;
        await chrome.storage.local.set({ equippedHat: nextHat });
        sendResponse({ ok: true, equippedHat: nextHat, ownedHats: owned, fish });
        return;
      }

      const price = HAT_PRICES[hatId];
      if (fish < price) {
        sendResponse({ ok: false, reason: 'not_enough_fish', fish, price });
        return;
      }

      fish -= price;
      owned.push(hatId);
      await chrome.storage.local.set({
        fish,
        ownedHats: owned,
        equippedHat: hatId,
        lastEvent: { type: 'hat_equipped', ts: Date.now() }
      });
      await updateQuestsAndAchievements({ purchaseDelta: 1 });
      sendResponse({ ok: true, purchased: true, equippedHat: hatId, ownedHats: owned, fish });
    });
    return true;
  }

  if (msg.type === 'BUY_OR_EQUIP_SWEATER') {
    const sweaterId = msg.sweaterId || 'none';
    if (!(sweaterId in SWEATER_PRICES)) {
      sendResponse({ ok: false, reason: 'unknown_sweater' });
      return;
    }
    chrome.storage.local.get(['fish', 'ownedSweaters', 'equippedSweater']).then(async (data) => {
      const owned = Array.isArray(data.ownedSweaters) ? [...data.ownedSweaters] : [];
      let fish = data.fish || 0;

      if (sweaterId === 'none') {
        await chrome.storage.local.set({ equippedSweater: 'none' });
        sendResponse({ ok: true, equippedSweater: 'none', ownedSweaters: owned, fish });
        return;
      }

      if (owned.includes(sweaterId)) {
        const nextSw = data.equippedSweater === sweaterId ? 'none' : sweaterId;
        await chrome.storage.local.set({ equippedSweater: nextSw });
        sendResponse({ ok: true, equippedSweater: nextSw, ownedSweaters: owned, fish });
        return;
      }

      const price = SWEATER_PRICES[sweaterId];
      if (fish < price) {
        sendResponse({ ok: false, reason: 'not_enough_fish', fish, price });
        return;
      }

      fish -= price;
      owned.push(sweaterId);
      await chrome.storage.local.set({
        fish,
        ownedSweaters: owned,
        equippedSweater: sweaterId,
        lastEvent: { type: 'hat_equipped', ts: Date.now() }
      });
      await updateQuestsAndAchievements({ purchaseDelta: 1 });
      sendResponse({ ok: true, purchased: true, equippedSweater: sweaterId, ownedSweaters: owned, fish });
    });
    return true;
  }

  if (msg.type === 'BUY_OR_EQUIP_ACCESSORY') {
    const accId = msg.accId || 'none';
    if (!(accId in ACCESSORY_PRICES)) {
      sendResponse({ ok: false, reason: 'unknown' });
      return;
    }
    chrome.storage.local.get(['fish', 'ownedAccessories', 'equippedAccessory']).then(async (data) => {
      const owned = Array.isArray(data.ownedAccessories) ? [...data.ownedAccessories] : [];
      let fish = data.fish || 0;
      if (accId === 'none') {
        await chrome.storage.local.set({ equippedAccessory: 'none' });
        sendResponse({ ok: true, equippedAccessory: 'none', ownedAccessories: owned, fish });
        return;
      }
      if (owned.includes(accId)) {
        const next = data.equippedAccessory === accId ? 'none' : accId;
        await chrome.storage.local.set({ equippedAccessory: next });
        sendResponse({ ok: true, equippedAccessory: next, ownedAccessories: owned, fish });
        return;
      }
      const price = ACCESSORY_PRICES[accId];
      if (fish < price) {
        sendResponse({ ok: false, reason: 'not_enough_fish', fish, price });
        return;
      }
      fish -= price;
      owned.push(accId);
      await chrome.storage.local.set({
        fish,
        ownedAccessories: owned,
        equippedAccessory: accId,
        lastEvent: { type: 'hat_equipped', ts: Date.now() }
      });
      await updateQuestsAndAchievements({ purchaseDelta: 1 });
      sendResponse({ ok: true, purchased: true, equippedAccessory: accId, ownedAccessories: owned, fish });
    });
    return true;
  }

  if (msg.type === 'BUY_TREAT') {
    const treatId = msg.treatId;
    if (!(treatId in TREAT_PRICES)) {
      sendResponse({ ok: false, reason: 'unknown' });
      return;
    }
    chrome.storage.local.get(['fish', 'xp', 'stats']).then(async (data) => {
      const price = TREAT_PRICES[treatId];
      const fish = data.fish || 0;
      if (fish < price) {
        sendResponse({ ok: false, reason: 'not_enough_fish', fish, price });
        return;
      }
      const nextFish = fish - price;
      const stats = { ...DEFAULT_STATS, ...(data.stats || {}) };
      let nextStats = { ...stats };
      let nextXp = data.xp || 0;
      const patch = { fish: nextFish };

      if (treatId === 'kibble') {
        nextStats = {
          hunger: clampStat(stats.hunger + 30),
          pleasure: clampStat(stats.pleasure + 15),
          energy: clampStat(stats.energy + 6)
        };
        nextXp += 5;
        patch.lastEvent = { type: 'feed_cat', ts: Date.now() };
      } else if (treatId === 'salmon') {
        nextStats = {
          hunger: 100,
          pleasure: 100,
          energy: clampStat(stats.energy + 25)
        };
        nextXp += 15;
        patch.lastEvent = { type: 'feed_salmon', ts: Date.now() };
      } else if (treatId === 'catnip') {
        nextStats = {
          hunger: stats.hunger,
          pleasure: clampStat(stats.pleasure + 25),
          energy: 100
        };
        nextXp += 10;
        patch.catnipUntilTs = Date.now() + 30000;
        patch.lastEvent = { type: 'catnip_start', ts: Date.now() };
      }

      patch.xp = nextXp;
      patch.level = calcLevel(nextXp);
      patch.stats = nextStats;
      await chrome.storage.local.set(patch);
      sendResponse({ ok: true, purchased: true, fish: nextFish, stats: nextStats });
    });
    return true;
  }

  if (msg.type === 'BUY_OR_TOGGLE_TOY') {
    const toyId = msg.toyId;
    if (!(toyId in TOY_PRICES)) {
      sendResponse({ ok: false, reason: 'unknown' });
      return;
    }
    chrome.storage.local.get(['fish', 'ownedToys', 'activeToy']).then(async (data) => {
      const owned = Array.isArray(data.ownedToys) ? [...data.ownedToys] : [];
      let fish = data.fish || 0;

      if (owned.includes(toyId)) {
        const nextToy = data.activeToy === toyId ? 'none' : toyId;
        await chrome.storage.local.set({ activeToy: nextToy, yarnMode: false });
        sendResponse({ ok: true, activeToy: nextToy, ownedToys: owned, fish });
        return;
      }

      const price = TOY_PRICES[toyId];
      if (fish < price) {
        sendResponse({ ok: false, reason: 'not_enough_fish', fish, price });
        return;
      }
      fish -= price;
      owned.push(toyId);
      await chrome.storage.local.set({
        fish,
        ownedToys: owned,
        activeToy: toyId,
        yarnMode: false
      });
      await updateQuestsAndAchievements({ purchaseDelta: 1 });
      sendResponse({ ok: true, purchased: true, activeToy: toyId, ownedToys: owned, fish });
    });
    return true;
  }

  if (msg.type === 'BUY_OR_EQUIP_BG') {
    const bgId = msg.bgId || 'default';
    if (!(bgId in BG_PRICES)) {
      sendResponse({ ok: false, reason: 'unknown' });
      return;
    }
    chrome.storage.local.get(['fish', 'ownedBackgrounds', 'equippedBackground']).then(async (data) => {
      const owned = Array.isArray(data.ownedBackgrounds) ? [...data.ownedBackgrounds] : [];
      let fish = data.fish || 0;
      if (bgId === 'default' || owned.includes(bgId)) {
        await chrome.storage.local.set({ equippedBackground: bgId });
        sendResponse({ ok: true, equippedBackground: bgId, ownedBackgrounds: owned, fish });
        return;
      }
      const price = BG_PRICES[bgId];
      if (fish < price) {
        sendResponse({ ok: false, reason: 'not_enough_fish', fish, price });
        return;
      }
      fish -= price;
      owned.push(bgId);
      await chrome.storage.local.set({
        fish,
        ownedBackgrounds: owned,
        equippedBackground: bgId
      });
      sendResponse({ ok: true, purchased: true, equippedBackground: bgId, ownedBackgrounds: owned, fish });
    });
    return true;
  }

  if (msg.type === 'BUY_OR_EQUIP_SKIN') {
    const skinId = msg.skinId;
    if (!(skinId in SKIN_PRICES)) {
      sendResponse({ ok: false, reason: 'unknown' });
      return;
    }
    chrome.storage.local.get(['fish', 'ownedSkins']).then(async (data) => {
      const owned = Array.isArray(data.ownedSkins) ? [...data.ownedSkins] : [];
      let fish = data.fish || 0;
      if (owned.includes(skinId)) {
        await chrome.storage.local.set({ catColor: skinId });
        sendResponse({ ok: true, catColor: skinId, ownedSkins: owned, fish });
        return;
      }
      const price = SKIN_PRICES[skinId];
      if (fish < price) {
        sendResponse({ ok: false, reason: 'not_enough_fish', fish, price });
        return;
      }
      fish -= price;
      owned.push(skinId);
      await chrome.storage.local.set({
        fish,
        ownedSkins: owned,
        catColor: skinId,
        lastEvent: { type: 'hat_equipped', ts: Date.now() }
      });
      sendResponse({ ok: true, purchased: true, catColor: skinId, ownedSkins: owned, fish });
    });
    return true;
  }

  if (msg.type === 'BUY_OR_TOGGLE_KITTEN') {
    chrome.storage.local.get(['fish', 'hasKitten', 'kittenEnabled']).then(async (data) => {
      let fish = data.fish || 0;
      if (data.hasKitten) {
        const nextEnabled = !data.kittenEnabled;
        await chrome.storage.local.set({ kittenEnabled: nextEnabled });
        sendResponse({ ok: true, hasKitten: true, kittenEnabled: nextEnabled, fish });
        return;
      }
      if (fish < KITTEN_PRICE) {
        sendResponse({ ok: false, reason: 'not_enough_fish', fish, price: KITTEN_PRICE });
        return;
      }
      fish -= KITTEN_PRICE;
      await chrome.storage.local.set({
        fish,
        hasKitten: true,
        kittenEnabled: true,
        lastEvent: { type: 'hat_equipped', ts: Date.now() }
      });
      sendResponse({ ok: true, purchased: true, hasKitten: true, kittenEnabled: true, fish });
    });
    return true;
  }

  if (msg.type === 'YARN_CATCH') {
    chrome.storage.local.get(['xp', 'stats']).then(async (data) => {
      const nextXp = (data.xp || 0) + 2;
      const nextLevel = calcLevel(nextXp);
      const stats = { ...DEFAULT_STATS, ...(data.stats || {}) };
      const nextStats = {
        ...stats,
        pleasure: clampStat(stats.pleasure + 5)
      };
      await chrome.storage.local.set({ xp: nextXp, level: nextLevel, stats: nextStats });
      sendResponse({ ok: true, stats: nextStats });
    });
    return true;
  }

  if (msg.type === 'START_POMODORO') {
    startPomodoro(msg.focusMinutes, msg.breakMinutes).then((pomodoro) => {
      sendResponse({ ok: true, pomodoro });
    });
    return true;
  }

  if (msg.type === 'STOP_POMODORO') {
    stopPomodoro().then((pomodoro) => {
      sendResponse({ ok: true, pomodoro });
    });
    return true;
  }

  if (msg.type === 'CHECK_POMODORO') {
    checkPomodoroCompletion().then(() => sendResponse({ ok: true }));
    return true;
  }
});
