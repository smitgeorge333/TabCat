// TabCat — Localization (Russian, English, Chinese)
// Exposed on globalThis.TabCatI18n for both popup and content scripts.

(function () {
  const STRINGS = {
    ru: {
      appTitle: 'TabCat',
      levelShort: 'Ур.',
      xpTooltip: 'Опыт: {pct}/100 до Ур. {next}',
      fishTooltip: 'Рыбки (за Pomodoro и каждые 5 закрытых вкладок)',
      tabsTooltip: 'Закрыто вкладок',

      navMenu: 'Меню',
      navShop: 'Магазин',
      navWardrobe: 'Гардероб',
      navQuests: 'Квесты',

      statusAwake: 'Бодрый 🐾',
      statusPlay: 'Играет 🧶',
      statusSleep: 'Спит Zzz',
      statusYawn: 'Зевает 💤',
      statusFocus: 'В фокусе 🎯',
      statusBreak: 'Перерыв ☕',
      statusSleepIn: 'Сон через {time}',

      needHunger: '🐟 Сытость',
      needPleasure: '♥ Удовольствие',
      needEnergy: '⚡ Бодрость',

      btnFeed: 'Покормить 🐟',
      btnPet: 'Погладить ♥',
      btnYarn: 'Клубок 🧶',
      btnYarnStop: 'Стоп 🧶',
      feedTooltipReady: 'Покормить котика 1 рыбкой (+Сытость и +Удовольствие)',
      feedTooltipEmpty: 'Нет рыбок! Закрой 5 вкладок или заверши Pomodoro',

      pomoTitle: 'Pomodoro-фокус 🎯',
      pomoReady: 'Готов к фокусу',
      pomoFocusing: 'Идёт фокус 📚',
      pomoBreak: 'Перерыв ☕',
      pomoStart: 'Начать фокус',
      pomoStop: 'Остановить',
      pomoTest: '1 / 1 (тест)',
      pomoReward: '+5 🐟 за сессию',

      sleepyTitle: 'Сонные сайты 💤',
      sleepyAfter: 'Сон через:',
      minUnit: 'мин',
      addToSleepy: '+ В сонные',
      removeFromSleepy: 'Убрать из сонных',
      domainPlaceholder: 'например: google.com',
      btnAdd: 'Добавить',
      sleepyEmpty: 'Список пуст — котик всегда бодрый!',
      feedbackInvalid: 'Введи домен, например: google.com',
      feedbackExists: '{domain} уже в списке!',
      feedbackAdded: 'Добавлен {domain} 💤',
      feedbackRemoved: 'Убрали {domain}',

      settingsTitle: 'Настройки на экране',
      toggleVisible: 'Показывать котика на страницах',
      toggleFreeDrag: 'Перетаскивать по всему экрану',
      toggleFreeRoam: 'Котик гуляет по всему экрану',
      hideOnSite: '🚫 Скрыть на {domain}',
      showOnSite: '👁️ Показать на {domain}',
      btnAdvanced: '⚙️ Расширенные настройки',
      catSizeLabel: 'Размер котика',
      langLabel: 'Язык / Language',
      scale2: 'Маленький (2×)',
      scale3: 'Средний (3×)',
      scale4: 'Большой (4×)',
      scale5: 'Огромный (5×)',

      shopTitle: 'ЗооМагазин 🐾',
      shopSubtitle: 'Обновки и уют за заработанные рыбки',
      shopHats: '🎩 Шапочки',
      shopSweaters: '🧥 Кофточки',
      shopCartReady: 'Тележка ждёт покупок!',
      shopCartDelivered: 'Покупка мчится в гардероб! 💨',
      wardrobeDelivered: 'Тележка привезла обновку в гардероб! ✨',
      itemEquipped: 'Надето',
      itemOwned: 'Куплено',
      itemEquip: 'Надеть',
      itemRemove: 'Снять',
      needMoreFish: 'Нужно {price} 🐟! Закрой вкладки или Pomodoro ✨',

      wardrobeTitle: 'Гардероб 👕',
      wardrobeSubtitle: 'Выбирай окрас и примеряй купленные вещи',
      coatColorLabel: 'Окрас котика',
      colorGinger: 'Рыжий',
      colorGingerHint: 'Универсальный',
      colorBlack: 'Чёрный',
      colorBlackHint: 'Для светлой темы',
      colorWhite: 'Белый',
      colorWhiteHint: 'Для тёмной темы',
      myHatsLabel: 'Мои шапочки',
      mySweatersLabel: 'Мои кофточки',
      wardrobeEmptyHint: 'Загляни в ЗооМагазин за обновками!',

      hat_none: 'Без шапки',
      hat_beanie: 'Шапочка',
      hat_bow: 'Бантик',
      hat_cap: 'Кепка',
      hat_chef: 'Повар',
      hat_wizard: 'Маг',
      hat_viking: 'Викинг',
      hat_crown: 'Корона',
      hat_halo: 'Нимб',

      sweater_none: 'Без кофты',
      sweater_cozy_red: 'Свитер',
      sweater_mint_hoodie: 'Худи',
      sweater_sky_stripe: 'Полоска',
      sweater_hacker: 'Хакер',
      sweater_sakura: 'Сакура',
      sweater_tuxedo: 'Смокинг',
      sweater_royal_cape: 'Мантия',

      shopTabClothes: '🎩 Одежда',
      shopTabTreats: '🍣 Еда',
      shopTabToys: '🧸 Игрушки',
      shopTabWorld: '🏡 Мир',

      shopAccessories: '🕶️ Очки и шарфики',
      shopTreats: '🍣 Вкусняшки и еда',
      shopToys: '🧸 Игрушки',
      shopBgs: '🏡 Фоны домика',
      shopSkins: '✨ Редкие скины и друг',

      acc_none: 'Нет',
      acc_cyber_glasses: 'Кибер-очки',
      acc_scarf: 'Шарф',
      acc_bowtie: 'Бабочка',
      acc_wings: 'Крылышки',

      treat_kibble: 'Корм',
      treat_salmon: 'Лосось 100%',
      treat_catnip: 'Мята 30с',

      toy_laser: 'Лазер',
      toy_mouse: 'Мышка',
      toy_box: 'Коробка',
      toy_trampoline: 'Батут',
      toy_bed: 'Лежанка',
      toyActive: 'Активно',
      toyPlay: 'Включить',

      bg_default: 'Уют',
      bg_room: 'Окно',
      bg_garden: 'Сад',
      bg_cyberpunk: 'Кибер',
      bg_space: 'Космос',

      skin_siamese: 'Сиамский',
      skin_calico: '3-цветный',
      skin_cyber: 'Кибер-кот',
      skin_golden: 'Золотой',
      kittenName: 'Мини-котёнок',
      kittenSub: 'Бегает хвостиком за котом!',
      myAccessoriesLabel: 'Очки и шарфики',
      myToysLabel: 'Игрушки и друг',
      myBgsLabel: 'Фон домика',
      catNameLabel: 'Имя котика',
      catNamePlaceholder: 'Например: Барсик',
      btnSaveName: 'Сохранить',

      questsTitle: 'Квесты и Ачивки 🏆',
      questsSubtitle: 'Выполняй задания дня и открывай редкие награды',
      dailyQuestsLabel: '📅 Задания на сегодня',
      achievementsLabel: '🏅 Достижения',
      q_close10: 'Закрой 10 вкладок за день',
      q_pomo1: 'Заверши 1 Pomodoro-сессию',
      q_care2: 'Погладь и покорми котика',
      claimBtn: 'Забрать +{reward} 🐟',
      claimedText: 'Получено ✓',
      ach_first10: 'Чистюля — 10 закрытых вкладок (+2 🐟)',
      ach_tabs100: 'Легенда вкладок — 100 вкладок (🌟 Золотой скин)',
      ach_pomo5: 'Мастер фокуса — 5 Pomodoro (😇 Нимб)',
      ach_shop3: 'Модник — 3 покупки в магазине (+5 🐟)',
      achUnlocked: 'Открыто! ✨',

      phraseTrampoline: 'Уиии!! Сальто на батуте! 🎪✨',
      phraseBed: 'Мрр... какая мягкая лежанка 🛏️💤',
      phraseMorning: 'Доброе утро! {name} желает классного дня ☕✨',
      phraseNight: 'Уже поздно... {name} советует поберечь глазки 🌙💤',
      trampolineBanner: '🎪 Батут на экране • Убрать (Esc)',
      bedBanner: '🛏️ Лежанка на экране • Убрать (Esc)',

      phraseSalmon: 'КОРОЛЕВСКИЙ ЛОСОСЬ!! 100% счастья! 🍣✨',
      phraseCatnip: 'КОШАЧЬЯ МЯТА!! ПОГНАЛИИИ!! 🌿✨♥',
      phraseLaser: 'Красная точка!! Поймаю её! 🔴🐾',
      phraseMouse: 'Шустрая мышка! Охота началась! 🐭✨',
      phraseBox: 'Если я влезаю — я сижу! 📦♥',
      laserBanner: '🔴 Лазерная указка • Закончить (Esc)',
      mouseBanner: '🐭 Заводная мышка • Убрать (Esc)',
      boxBanner: '📦 Коробка на экране • Убрать (Esc)',
      phraseKittenGrab: 'Эй!! Отпусти малыша!! 😾💢',
      phraseKittenScratch: 'Фырк!! Не обижай котёнка! 🐾💢',

      moods: [
        'Мур-мур! Я рядом ♥',
        'Ты сегодня отлично справляешься!',
        'Поиграем с клубком? 🧶',
        'Не забудь потянуться и выпить воды 💧'
      ],
      moodPet: 'Мур-мур-мур! Спасибо ♥',
      moodFeed: 'Ням-ням-ням! Вкуснейшая рыбка! 🐟♥',
      moodColor: 'О, новый образ! Мне идёт? ✨',
      moodFocusStart: 'Надел очки! Работаем вместе 🎯',
      moodFocusStop: 'Таймер остановлен. Отдыхаем 🐾',
      moodYarnOn: 'Двигай мышкой по странице — я ловлю клубок! 🧶',
      moodYarnOff: 'Отлично поиграли! ♥',
      moodVisibleOn: 'Ура, снова гуляю по экрану! 🐾',
      moodVisibleOff: 'Спрятался в домике, жду тебя тут 💤',
      moodFreeDragOn: 'Теперь меня можно таскать по всему экрану! ✨',
      moodFreeDragOff: 'Держусь за нижний край экрана 🐾',
      moodFreeRoamOn: 'Свобода! Пойду исследовать весь экран! 🐾✨',
      moodFreeRoamOff: 'Буду спокойно гулять внизу экрана ♥',

      yarnBanner: '🧶 Игра с клубком • Закончить (Esc)',
      actorTitle: 'Кликни, чтобы погладить • Потяни за шкирку, чтобы перенести',
      phrasesTabClosed: [
        '-1 вкладка, дышать легче! ✨',
        'Ура, порядок во вкладках! ♥',
        'Красота! Минус лишняя вкладка',
        'Ты супер, наводим чистоту!',
        'Мур-р, браузер стал легче! 🐾'
      ],
      phrasesTabFish: [
        '5 вкладок закрыто! +1 рыбка 🐟✨',
        'Ура! Заработали рыбку за чистоту 🐟♥'
      ],
      phrasesPet: [
        'Мур-мур-мур... ♥',
        'Ты молодец, я рядом!',
        'У тебя всё получится! ✨',
        'Не забудь попить воды 💧',
        'Спасибо, что погладил! ♥',
        'Я в тебя верю! Мяу~'
      ],
      phrasesFeed: [
        'Ням-ням-ням! Вкуснейшая рыбка! 🐟♥',
        'Мур-р, спасибо за рыбку! Полно сил ✨',
        'Хрум-хрум! Ты самый лучший хозяин ♥'
      ],
      phrasesHat: [
        'Ого, какая обновка! Мне идёт? ✨',
        'Я теперь самый стильный котик! ♥',
        'Мур-р, спасибо за подарок! 🐾'
      ],
      phrasesYarn: [
        'Поймал клубок! 🧶✨',
        'Ещё-ещё! Как весело! ♥',
        'Мяу! Не убежишь от меня! 🐾'
      ],
      phrasesYarnStart: 'Ооо, клубок!! Давай играть! 🧶✨',
      phrasesYawn: [
        'Зев-зев... тут так сонно...',
        'Глазки слипаются... 💤',
        'Может, скоро вернёмся к делам? 🐾'
      ],
      phrasesSleepStart: 'Хрр... уснул на этом сайте 💤',
      phrasesSleepPoke: [
        'Мрр... я сплю, пока мы тут 💤',
        'Зев... пойдём на другой сайт — проснусь! 🐾'
      ],
      phrasesWakeUp: [
        'Потянулся! Ура, мы снова в деле ✨',
        'О, проснулся! Готов помогать ♥'
      ],
      phrasesFocusStart: [
        'Надел очки! Фокусируемся вместе 🎯',
        'Режим фокуса включён! Я рядом 📚✨'
      ],
      phrasesFocusDone: [
        'Ура!! Сессия пройдена! +5 рыбок 🐟🎉',
        'Ты крутой! +5 рыбок и +25 XP! Пора размяться 🐟♥'
      ],
      phrasesBreakDone: [
        'Перерыв окончен! Готов к новым подвигам 🐾✨',
        'Отдохнули! Если готов — погнали дальше ♥'
      ]
    },

    en: {
      appTitle: 'TabCat',
      levelShort: 'Lv.',
      xpTooltip: 'XP: {pct}/100 to Lv. {next}',
      fishTooltip: 'Fish (from Pomodoro & every 5 closed tabs)',
      tabsTooltip: 'Tabs closed',

      navMenu: 'Menu',
      navShop: 'Pet Shop',
      navWardrobe: 'Wardrobe',
      navQuests: 'Quests',

      statusAwake: 'Awake 🐾',
      statusPlay: 'Playing 🧶',
      statusSleep: 'Sleeping Zzz',
      statusYawn: 'Yawning 💤',
      statusFocus: 'Focused 🎯',
      statusBreak: 'Break ☕',
      statusSleepIn: 'Sleep in {time}',

      needHunger: '🐟 Hunger',
      needPleasure: '♥ Happiness',
      needEnergy: '⚡ Energy',

      btnFeed: 'Feed 🐟',
      btnPet: 'Pet ♥',
      btnYarn: 'Yarn 🧶',
      btnYarnStop: 'Stop 🧶',
      feedTooltipReady: 'Feed 1 fish (+Hunger & +Happiness)',
      feedTooltipEmpty: 'No fish! Close 5 tabs or finish a Pomodoro',

      pomoTitle: 'Pomodoro Focus 🎯',
      pomoReady: 'Ready to focus',
      pomoFocusing: 'Focusing 📚',
      pomoBreak: 'Break time ☕',
      pomoStart: 'Start Focus',
      pomoStop: 'Stop',
      pomoTest: '1 / 1 (test)',
      pomoReward: '+5 🐟 per session',

      sleepyTitle: 'Sleepy Sites 💤',
      sleepyAfter: 'Sleep after:',
      minUnit: 'min',
      addToSleepy: '+ Sleepy',
      removeFromSleepy: 'Remove',
      domainPlaceholder: 'e.g. google.com',
      btnAdd: 'Add',
      sleepyEmpty: 'List is empty — kitty stays awake!',
      feedbackInvalid: 'Enter a domain, e.g. google.com',
      feedbackExists: '{domain} is already listed!',
      feedbackAdded: 'Added {domain} 💤',
      feedbackRemoved: 'Removed {domain}',

      settingsTitle: 'Screen Settings',
      toggleVisible: 'Show cat on web pages',
      toggleFreeDrag: 'Allow dragging anywhere on screen',
      toggleFreeRoam: 'Allow cat to roam whole screen',
      hideOnSite: '🚫 Hide on {domain}',
      showOnSite: '👁️ Show on {domain}',
      btnAdvanced: '⚙️ Advanced Settings',
      catSizeLabel: 'Cat Size',
      langLabel: 'Language',
      scale2: 'Small (2×)',
      scale3: 'Medium (3×)',
      scale4: 'Large (4×)',
      scale5: 'Huge (5×)',

      shopTitle: 'Pet Shop 🐾',
      shopSubtitle: 'Cozy outfits for your earned fish',
      shopHats: '🎩 Hats',
      shopSweaters: '🧥 Sweaters',
      shopCartReady: 'Cart is ready for shopping!',
      shopCartDelivered: 'Zooming to your wardrobe! 💨',
      wardrobeDelivered: 'Cart delivered your new outfit! ✨',
      itemEquipped: 'Equipped',
      itemOwned: 'Owned',
      itemEquip: 'Equip',
      itemRemove: 'Remove',
      needMoreFish: 'Need {price} 🐟! Close tabs or finish Pomodoro ✨',

      wardrobeTitle: 'Wardrobe 👕',
      wardrobeSubtitle: 'Pick coat color & mix your outfits',
      coatColorLabel: 'Coat Color',
      colorGinger: 'Ginger',
      colorGingerHint: 'Universal',
      colorBlack: 'Black',
      colorBlackHint: 'For light theme',
      colorWhite: 'White',
      colorWhiteHint: 'For dark theme',
      myHatsLabel: 'My Hats',
      mySweatersLabel: 'My Sweaters',
      wardrobeEmptyHint: 'Visit the Pet Shop to unlock outfits!',

      hat_none: 'No Hat',
      hat_beanie: 'Beanie',
      hat_bow: 'Bow',
      hat_cap: 'Cap',
      hat_chef: 'Chef',
      hat_wizard: 'Wizard',
      hat_viking: 'Viking',
      hat_crown: 'Crown',
      hat_halo: 'Halo',

      sweater_none: 'No Shirt',
      sweater_cozy_red: 'Sweater',
      sweater_mint_hoodie: 'Hoodie',
      sweater_sky_stripe: 'Stripes',
      sweater_hacker: 'Hacker',
      sweater_sakura: 'Sakura',
      sweater_tuxedo: 'Tuxedo',
      sweater_royal_cape: 'Cape',

      shopTabClothes: '🎩 Clothes',
      shopTabTreats: '🍣 Treats',
      shopTabToys: '🧸 Toys',
      shopTabWorld: '🏡 World',

      shopAccessories: '🕶️ Glasses & Scarves',
      shopTreats: '🍣 Yummy Treats',
      shopToys: '🧸 Toys',
      shopBgs: '🏡 Room Backgrounds',
      shopSkins: '✨ Rare Skins & Buddy',

      acc_none: 'None',
      acc_cyber_glasses: 'Cyber Shades',
      acc_scarf: 'Scarf',
      acc_bowtie: 'Bowtie',
      acc_wings: 'Wings',

      treat_kibble: 'Kibble',
      treat_salmon: 'Salmon 100%',
      treat_catnip: 'Catnip 30s',

      toy_laser: 'Laser',
      toy_mouse: 'Mouse',
      toy_box: 'Box',
      toy_trampoline: 'Trampoline',
      toy_bed: 'Cat Bed',
      toyActive: 'Active',
      toyPlay: 'Play',

      bg_default: 'Cozy',
      bg_room: 'Window',
      bg_garden: 'Garden',
      bg_cyberpunk: 'Cyber',
      bg_space: 'Space',

      skin_siamese: 'Siamese',
      skin_calico: 'Calico',
      skin_cyber: 'Cyber Cat',
      skin_golden: 'Golden',
      kittenName: 'Mini Kitten',
      kittenSub: 'Follows your cat everywhere!',
      myAccessoriesLabel: 'Glasses & Scarves',
      myToysLabel: 'Toys & Buddy',
      myBgsLabel: 'Room Background',
      catNameLabel: 'Cat Name',
      catNamePlaceholder: 'e.g. Mochi',
      btnSaveName: 'Save',

      questsTitle: 'Quests & Achievements 🏆',
      questsSubtitle: 'Complete daily quests & unlock rare rewards',
      dailyQuestsLabel: '📅 Daily Quests',
      achievementsLabel: '🏅 Achievements',
      q_close10: 'Close 10 tabs today',
      q_pomo1: 'Finish 1 Pomodoro session',
      q_care2: 'Pet and feed your cat today',
      claimBtn: 'Claim +{reward} 🐟',
      claimedText: 'Claimed ✓',
      ach_first10: 'Tidy Browser — 10 closed tabs (+2 🐟)',
      ach_tabs100: 'Tab Legend — 100 closed tabs (🌟 Golden Skin)',
      ach_pomo5: 'Focus Master — 5 Pomodoros (😇 Angel Halo)',
      ach_shop3: 'Fashionista — 3 shop purchases (+5 🐟)',
      achUnlocked: 'Unlocked! ✨',

      phraseTrampoline: 'Wheee!! Trampoline flip! 🎪✨',
      phraseBed: 'Purr... such a cozy cat bed 🛏️💤',
      phraseMorning: 'Good morning! {name} wishes you a great day ☕✨',
      phraseNight: 'Getting late... {name} says rest your eyes soon 🌙💤',
      trampolineBanner: '🎪 Trampoline • Remove (Esc)',
      bedBanner: '🛏️ Cat Bed • Remove (Esc)',

      phraseSalmon: 'ROYAL SALMON!! 100% full & happy! 🍣✨',
      phraseCatnip: 'CATNIP ZOOMIES!! WOOO!! 🌿✨♥',
      phraseLaser: 'Red dot!! I will catch it! 🔴🐾',
      phraseMouse: 'Wind-up mouse! Hunt mode ON! 🐭✨',
      phraseBox: 'If I fits, I sits! 📦♥',
      laserBanner: '🔴 Laser Pointer • Stop (Esc)',
      mouseBanner: '🐭 Wind-up Mouse • Stop (Esc)',
      boxBanner: '📦 Cardboard Box • Remove (Esc)',
      phraseKittenGrab: 'Hey!! Put the kitten down!! 😾💢',
      phraseKittenScratch: 'Hiss!! Leave the little one alone! 🐾💢',

      moods: [
        'Purr-purr! I am right here ♥',
        'You are doing great today!',
        'Want to play with yarn? 🧶',
        'Remember to stretch & drink water 💧'
      ],
      moodPet: 'Purr-purr! Thank you ♥',
      moodFeed: 'Nom-nom-nom! Delicious fish! 🐟♥',
      moodColor: 'Ooh, fresh look! Do I look cute? ✨',
      moodFocusStart: 'Glasses on! Let us focus 🎯',
      moodFocusStop: 'Timer stopped. Taking a breather 🐾',
      moodYarnOn: 'Move your mouse on the page — I will chase it! 🧶',
      moodYarnOff: 'That was so much fun! ♥',
      moodVisibleOn: 'Yay, back on your screen! 🐾',
      moodVisibleOff: 'Hiding in my cozy house 💤',
      moodFreeDragOn: 'You can carry me anywhere on screen! ✨',
      moodFreeDragOff: 'Staying along the bottom edge 🐾',
      moodFreeRoamOn: 'Freedom! Exploring the whole screen! 🐾✨',
      moodFreeRoamOff: 'Strolling peacefully at the bottom ♥',

      yarnBanner: '🧶 Yarn Play • Stop (Esc)',
      actorTitle: 'Click to pet • Drag by the scruff to move',
      phrasesTabClosed: [
        '-1 tab, feels so much lighter! ✨',
        'Yay, tidy browser! ♥',
        'Nice! One less tab to worry about',
        'You are awesome, keeping it clean!'
      ],
      phrasesTabFish: [
        '5 tabs closed! +1 fish 🐟✨',
        'Yay! Earned a fish for tidiness 🐟♥'
      ],
      phrasesPet: [
        'Purr-purr-purr... ♥',
        'You got this, I am right here!',
        'Believe in yourself! ✨',
        'Remember to drink water 💧',
        'Thanks for the pets! ♥'
      ],
      phrasesFeed: [
        'Nom-nom-nom! Tasty fish! 🐟♥',
        'Purr, full of energy now! ✨',
        'Yummy! Best human ever ♥'
      ],
      phrasesHat: [
        'Whoa, new outfit! Looking sharp? ✨',
        'The most stylish kitty in town! ♥'
      ],
      phrasesYarn: [
        'Caught the yarn! 🧶✨',
        'Again! This is so fun! ♥',
        'Meow! You cannot escape me! 🐾'
      ],
      phrasesYarnStart: 'Ooh, yarn ball!! Let us play! 🧶✨',
      phrasesYawn: [
        'Yawn... getting sleepy here...',
        'Eyes are getting heavy... 💤'
      ],
      phrasesSleepStart: 'Zzz... fell asleep on this site 💤',
      phrasesSleepPoke: [
        'Mrr... sleeping while we are here 💤',
        'Yawn... switch to another site and I will wake up! 🐾'
      ],
      phrasesWakeUp: [
        'Big stretch! Back in action ✨',
        'Awake and ready to cheer you on ♥'
      ],
      phrasesFocusStart: [
        'Glasses on! Focus mode active 🎯',
        'Working right beside you 📚✨'
      ],
      phrasesFocusDone: [
        'Woohoo!! Session done! +5 fish 🐟🎉',
        'Amazing focus! +5 fish & +25 XP 🐟♥'
      ],
      phrasesBreakDone: [
        'Break is over! Ready when you are 🐾✨',
        'Refreshed and ready! ♥'
      ]
    },

    zh: {
      appTitle: 'TabCat',
      levelShort: '等级',
      xpTooltip: '经验: {pct}/100 升级至 {next}',
      fishTooltip: '小鱼干（完成番茄钟或每关闭5个标签页获得）',
      tabsTooltip: '已关闭标签页',

      navMenu: '主页',
      navShop: '宠物店',
      navWardrobe: '衣橱',
      navQuests: '任务',

      statusAwake: '精神满满 🐾',
      statusPlay: '玩毛线 🧶',
      statusSleep: '睡觉中 Zzz',
      statusYawn: '打哈欠 💤',
      statusFocus: '专注中 🎯',
      statusBreak: '休息中 ☕',
      statusSleepIn: '{time} 后入睡',

      needHunger: '🐟 饱食度',
      needPleasure: '♥ 开心值',
      needEnergy: '⚡ 精力值',

      btnFeed: '喂小鱼 🐟',
      btnPet: '摸摸头 ♥',
      btnYarn: '毛线球 🧶',
      btnYarnStop: '停止 🧶',
      feedTooltipReady: '喂1条小鱼干（+饱食度 +开心值）',
      feedTooltipEmpty: '没有小鱼干啦！关闭5个标签页或完成番茄钟获取',

      pomoTitle: '番茄专注 🎯',
      pomoReady: '准备专注',
      pomoFocusing: '专注进行中 📚',
      pomoBreak: '休息一下 ☕',
      pomoStart: '开始专注',
      pomoStop: '停止',
      pomoTest: '1 / 1 (测试)',
      pomoReward: '每次 +5 🐟',

      sleepyTitle: '摸鱼犯困网站 💤',
      sleepyAfter: '入睡时间:',
      minUnit: '分钟',
      addToSleepy: '+ 设为犯困',
      removeFromSleepy: '移出列表',
      domainPlaceholder: '例如: google.com',
      btnAdd: '添加',
      sleepyEmpty: '列表为空 — 小猫一直精神满满！',
      feedbackInvalid: '请输入域名，例如 google.com',
      feedbackExists: '{domain} 已在列表中！',
      feedbackAdded: '已添加 {domain} 💤',
      feedbackRemoved: '已移出 {domain}',

      settingsTitle: '屏幕设置',
      toggleVisible: '在网页上显示小猫',
      toggleFreeDrag: '允许拖拽到屏幕任意位置',
      toggleFreeRoam: '允许小猫在全屏自由散步',
      hideOnSite: '🚫 在 {domain} 上隐藏',
      showOnSite: '👁️ 在 {domain} 上显示',
      btnAdvanced: '⚙️ 高级设置',
      catSizeLabel: '小猫尺寸',
      langLabel: '语言 / Language',
      scale2: '小号 (2×)',
      scale3: '中号 (3×)',
      scale4: '大号 (4×)',
      scale5: '超大 (5×)',

      shopTitle: '宠物商店 🐾',
      shopSubtitle: '用赚到的小鱼干买可爱装扮',
      shopHats: '🎩 帽子',
      shopSweaters: '🧥 小毛衣',
      shopCartReady: '小推车准备好装货啦！',
      shopCartDelivered: '小推车正飞奔送往衣橱！💨',
      wardrobeDelivered: '小推车已把新衣服送进衣橱！✨',
      itemEquipped: '已穿戴',
      itemOwned: '已拥有',
      itemEquip: '穿戴',
      itemRemove: '取下',
      needMoreFish: '需要 {price} 🐟！多关标签页或专注吧 ✨',

      wardrobeTitle: '小猫衣橱 👕',
      wardrobeSubtitle: '自由搭配毛色与可爱的服装',
      coatColorLabel: '小猫毛色',
      colorGinger: '橘猫',
      colorGingerHint: '百搭经典',
      colorBlack: '黑猫',
      colorBlackHint: '适合浅色主题',
      colorWhite: '白猫',
      colorWhiteHint: '适合深色主题',
      myHatsLabel: '我的帽子',
      mySweatersLabel: '我的毛衣',
      wardrobeEmptyHint: '快去宠物商店挑几件新衣服吧！',

      hat_none: '不戴帽',
      hat_beanie: '针织帽',
      hat_bow: '蝴蝶结',
      hat_cap: '棒球帽',
      hat_chef: '厨师帽',
      hat_wizard: '魔法帽',
      hat_viking: '维京盔',
      hat_crown: '小皇冠',
      hat_halo: '天使光环',

      sweater_none: '不穿衣',
      sweater_cozy_red: '红毛衣',
      sweater_mint_hoodie: '薄荷卫衣',
      sweater_sky_stripe: '条纹衫',
      sweater_hacker: '黑客卫衣',
      sweater_sakura: '樱花和服',
      sweater_tuxedo: '小西装',
      sweater_royal_cape: '星空披风',

      shopTabClothes: '🎩 服饰',
      shopTabTreats: '🍣 零食',
      shopTabToys: '🧸 玩具',
      shopTabWorld: '🏡 世界',

      shopAccessories: '🕶️ 眼镜与配饰',
      shopTreats: '🍣 美味零食',
      shopToys: '🧸 趣味玩具',
      shopBgs: '🏡 小屋背景',
      shopSkins: '✨ 稀有皮肤与伙伴',

      acc_none: '无',
      acc_cyber_glasses: '赛博墨镜',
      acc_scarf: '围巾',
      acc_bowtie: '领结',
      acc_wings: '小翅膀',

      treat_kibble: '猫粮',
      treat_salmon: '三文鱼100%',
      treat_catnip: '猫薄荷30秒',

      toy_laser: '激光笔',
      toy_mouse: '发条老鼠',
      toy_box: '纸箱子',
      toy_trampoline: '蹦蹦床',
      toy_bed: '猫窝',
      toyActive: '使用中',
      toyPlay: '开启',

      bg_default: '温馨',
      bg_room: '窗景',
      bg_garden: '花园',
      bg_cyberpunk: '赛博城',
      bg_space: '太空站',

      skin_siamese: '暹罗猫',
      skin_calico: '三花猫',
      skin_cyber: '赛博猫',
      skin_golden: '黄金猫',
      kittenName: '迷你小猫',
      kittenSub: '跟在大猫身后跑！',
      myAccessoriesLabel: '眼镜与配饰',
      myToysLabel: '玩具与伙伴',
      myBgsLabel: '小屋背景',
      catNameLabel: '小猫名字',
      catNamePlaceholder: '例如: 橘子',
      btnSaveName: '保存',

      questsTitle: '任务与成就 🏆',
      questsSubtitle: '完成每日任务，解锁稀有奖励',
      dailyQuestsLabel: '📅 每日任务',
      achievementsLabel: '🏅 永久成就',
      q_close10: '今天关闭 10 个标签页',
      q_pomo1: '完成 1 次番茄专注',
      q_care2: '今天摸摸头并喂一次小鱼',
      claimBtn: '领取 +{reward} 🐟',
      claimedText: '已领取 ✓',
      ach_first10: '整洁达人 — 关闭10个标签页 (+2 🐟)',
      ach_tabs100: '标签传奇 — 关闭100个标签页 (🌟 黄金皮肤)',
      ach_pomo5: '专注大师 — 完成5次番茄钟 (😇 天使光环)',
      ach_shop3: '时尚达人 — 在商店购买3件物品 (+5 🐟)',
      achUnlocked: '已解锁！✨',

      phraseTrampoline: '哇哦！！蹦床空翻！🎪✨',
      phraseBed: '呼噜... 猫窝好软好舒服 🛏️💤',
      phraseMorning: '早上好！{name} 祝你今天顺顺利利 ☕✨',
      phraseNight: '夜深啦... {name} 提醒你早点休息护眼哦 🌙💤',
      trampolineBanner: '🎪 蹦蹦床 • 收起 (Esc)',
      bedBanner: '🛏️ 猫窝 • 收起 (Esc)',

      phraseSalmon: '皇家三文鱼！！饱食度与开心值拉满！🍣✨',
      phraseCatnip: '猫薄荷来啦！！冲鸭！！🌿✨♥',
      phraseLaser: '红点点！！别跑！🔴🐾',
      phraseMouse: '发条老鼠！狩猎时间到！🐭✨',
      phraseBox: '有箱子我就要钻进去！📦♥',
      laserBanner: '🔴 激光笔模式 • 结束 (Esc)',
      mouseBanner: '🐭 发条老鼠模式 • 收起 (Esc)',
      boxBanner: '📦 纸箱已放置 • 收起 (Esc)',
      phraseKittenGrab: '喂！！快放下小猫！！😾💢',
      phraseKittenScratch: '哈气！！不许欺负小猫！🐾💢',

      moods: [
        '呼噜呼噜~ 我一直陪着你 ♥',
        '你今天表现得超级棒！',
        '要一起玩毛线球吗？🧶',
        '记得伸伸懒腰、喝口水哦 💧'
      ],
      moodPet: '呼噜呼噜~ 谢谢摸摸 ♥',
      moodFeed: '啊呜啊呜！小鱼干真好吃！🐟♥',
      moodColor: '哇，新造型好看吗？✨',
      moodFocusStart: '戴上眼镜！一起专注吧 🎯',
      moodFocusStop: '计时已停止，稍微歇一下 🐾',
      moodYarnOn: '在网页上移动鼠标，我来抓毛线球！🧶',
      moodYarnOff: '玩得太开心啦！♥',
      moodVisibleOn: '耶，回到屏幕上陪你啦！🐾',
      moodVisibleOff: '我先回小屋里休息啦 💤',
      moodFreeDragOn: '现在可以把我放到屏幕任何地方！✨',
      moodFreeDragOff: '我乖乖待在屏幕底部 🐾',
      moodFreeRoamOn: '自由啦！我要去探索整个屏幕！🐾✨',
      moodFreeRoamOff: '只在底部安静散步 ♥',

      yarnBanner: '🧶 毛线球游戏中 • 结束 (Esc)',
      actorTitle: '点击摸摸头 • 拎着后颈可以移动',
      phrasesTabClosed: [
        '关闭1个标签页，轻松多了！✨',
        '浏览器变整洁啦！♥',
        '干得好，清理多余标签页！'
      ],
      phrasesTabFish: [
        '关闭5个标签页！获得 +1 小鱼干 🐟✨',
        '整理达人！奖励 +1 小鱼干 🐟♥'
      ],
      phrasesPet: [
        '呼噜呼噜... ♥',
        '你真棒，我一直陪着你！',
        '加油，你一定可以的！✨',
        '别忘了喝水哦 💧'
      ],
      phrasesFeed: [
        '啊呜啊呜！超美味的小鱼干！🐟♥',
        '吃饱啦，精力满满！✨'
      ],
      phrasesHat: [
        '哇，新装扮！我是不是超可爱？✨',
        '全网最时尚的小猫！♥'
      ],
      phrasesYarn: [
        '抓到毛线球啦！🧶✨',
        '再来再来！好好玩！♥',
        '喵！别想逃出我的猫爪！🐾'
      ],
      phrasesYarnStart: '哇，毛线球！！快来玩吧！🧶✨',
      phrasesYawn: [
        '哈欠... 这里好让人犯困...',
        '眼皮快睁不开了... 💤'
      ],
      phrasesSleepStart: '呼噜... 在这个网站睡着了 💤',
      phrasesSleepPoke: [
        '喵呜... 我先睡会儿 💤',
        '换个工作网站我就会醒过来哦！🐾'
      ],
      phrasesWakeUp: [
        '伸个大懒腰！我们继续加油 ✨',
        '醒来啦，随时为你打气 ♥'
      ],
      phrasesFocusStart: [
        '戴上眼镜！专注模式开启 🎯',
        '我陪你一起认真做事 📚✨'
      ],
      phrasesFocusDone: [
        '太棒了！专注完成！+5 小鱼干 🐟🎉',
        '你超厉害！+5 🐟 +25 XP，休息一下吧 ♥'
      ],
      phrasesBreakDone: [
        '休息结束！随时可以继续 🐾✨',
        '充满电啦！♥'
      ]
    }
  };

  function t(lang, key, vars) {
    const dict = STRINGS[lang] || STRINGS.en;
    let val = dict[key] !== undefined ? dict[key] : STRINGS.en[key];
    if (typeof val === 'string' && vars) {
      for (const [k, v] of Object.entries(vars)) {
        val = val.replaceAll(`{${k}}`, String(v));
      }
    }
    return val;
  }

  globalThis.TabCatI18n = {
    STRINGS,
    t
  };
})();
