// TabCat — Original 24x20 retro pixel-art cat sprites & palettes
// Unified adorable chibi head across all poses + smooth 4-frame walk cycle.
// Exposed on globalThis.TabCatSprites for both content script and popup.

(function () {
  const GRID_W = 24;
  const GRID_H = 20;

  const PALETTES = {
    ginger: {
      name: 'Рыжий',
      hint: 'Универсальный',
      swatch: '#f5a623',
      O: '#471e0d', // warm dark-brown outline
      B: '#f7b12a', // golden-ginger main fur
      S: '#db7c1e', // tabby stripes & warm shade
      C: '#fff3d6', // cream muzzle, chest & paws
      E: '#261108', // crisp dark eyes
      P: '#ff96ad', // pink nose & blush
      G: '#6cd4ff', // focus glasses lens
      F: '#58b4e8'  // yummy fish
    },
    black: {
      name: 'Чёрный',
      hint: 'Для светлой темы',
      swatch: '#2a2c38',
      O: '#101117', // deep outline
      B: '#2d3040', // charcoal fur
      S: '#43485e', // subtle tabby sheen
      C: '#585e78', // paws & muzzle accent
      E: '#ffd166', // bright golden eyes
      P: '#f28ca8', // pink nose & blush
      G: '#7ce0ff', // focus glasses lens
      F: '#58b4e8'  // yummy fish
    },
    white: {
      name: 'Белый',
      hint: 'Для тёмной темы',
      swatch: '#ffffff',
      O: '#4d5368', // soft slate outline (visible on both light & dark)
      B: '#ffffff', // pure white fur
      S: '#dce2f0', // soft silver-blue stripes
      C: '#f2f5fc', // cream-white chest & paws
      E: '#3a86ff', // bright sky-blue eyes
      P: '#ffa6be', // pink nose & blush
      G: '#62d4ff', // focus glasses lens
      F: '#58b4e8'  // yummy fish
    },
    siamese: {
      name: 'Сиамский',
      hint: 'Редкий скин',
      swatch: '#f3e5d0',
      O: '#3a261c', // chocolate outline
      B: '#f4e6d2', // warm cream body
      S: '#6b4735', // seal-point dark brown marks
      C: '#7a523e', // seal-point paws & mask
      E: '#45a8ff', // sapphire-blue eyes
      P: '#d98a94', // dusty pink nose
      G: '#6cd4ff',
      F: '#58b4e8'
    },
    calico: {
      name: 'Трёхцветный',
      hint: 'Редкий скин',
      swatch: '#f7a541',
      O: '#362218',
      B: '#fff9f0', // snowy white base
      S: '#f28b30', // bright ginger patches
      C: '#423936', // dark espresso patches
      E: '#2e8540', // emerald green eyes
      P: '#ff96ad',
      G: '#6cd4ff',
      F: '#58b4e8'
    },
    cyber: {
      name: 'Кибер-кот',
      hint: 'Редкий скин',
      swatch: '#26324d',
      O: '#0c1220',
      B: '#2b3a59', // metallic slate-blue
      S: '#00e5ff', // neon cyan circuit stripes
      C: '#435882', // armor chest & paws
      E: '#ff2e97', // neon magenta visor eyes
      P: '#00e5ff', // glowing cyan nose
      G: '#00e5ff',
      F: '#58b4e8'
    },
    golden: {
      name: 'Золотой',
      hint: 'За 100 вкладок',
      swatch: '#ffd700',
      O: '#5c3b00', // rich bronze-gold outline
      B: '#ffd84d', // shimmering gold fur
      S: '#e6a800', // deep gold stripes
      C: '#fff6cc', // bright sparkle cream
      E: '#2e1a00', // crisp dark eyes
      P: '#ff8fab', // rosy nose
      G: '#6cd4ff',
      F: '#58b4e8'
    },
    ghost: {
      name: 'Призрак',
      hint: 'Редкий скин',
      swatch: '#b8f2ff',
      O: '#4ea8de', // glowing cyan-blue outline
      B: '#e0fbff', // ethereal pale mist fur
      S: '#a6e3f5', // spectral wisps
      C: '#ffffff', // glowing core
      E: '#1e3a5f', // cute spooky dark eyes
      P: '#80ed99', // spectral mint blush
      G: '#6cd4ff',
      F: '#58b4e8'
    },
    astro: {
      name: 'Космонавт',
      hint: 'Редкий скин',
      swatch: '#e2e8f0',
      O: '#1e293b', // dark space-suit outline
      B: '#f1f5f9', // white space suit
      S: '#f97316', // NASA orange mission stripes
      C: '#38bdf8', // blue visor / chest panel
      E: '#0f172a', // dark eyes inside visor
      P: '#fb7185', // cute nose
      G: '#6cd4ff',
      F: '#58b4e8'
    }
  };

  const RARE_SKINS = [
    { id: 'siamese', price: 7, icon: '🐈', swatch: '#f3e5d0' },
    { id: 'calico', price: 8, icon: '🐱', swatch: '#f7a541' },
    { id: 'cyber', price: 10, icon: '🤖', swatch: '#26324d' },
    { id: 'ghost', price: 11, icon: '👻', swatch: '#b8f2ff' },
    { id: 'astro', price: 12, icon: '👨‍🚀', swatch: '#e2e8f0' },
    { id: 'golden', price: 0, achievementOnly: true, icon: '🌟', swatch: '#ffd700' }
  ];

  const ACCESSORIES = [
    { id: 'none', price: 0, icon: '🐾' },
    { id: 'cyber_glasses', price: 5, icon: '🕶️' },
    { id: 'minimal_glasses', price: 5, icon: '👓' },
    { id: 'retro_glasses', price: 6, icon: '😎' },
    { id: 'scarf', price: 4, icon: '🧣' },
    { id: 'bowtie', price: 4, icon: '🎀' },
    { id: 'wings', price: 10, icon: '🪽' },
    { id: 'headphones', price: 8, icon: '🎧', secretAudible: true },
    { id: 'star_glasses', price: 0, giftOnly: true, icon: '⭐' }
  ];

  const TREATS = [
    { id: 'kibble', price: 1, icon: '🥣' },
    { id: 'salmon', price: 3, icon: '🍣' },
    { id: 'catnip', price: 2, icon: '🌿' }
  ];

  const TOYS = [
    { id: 'laser', price: 5, icon: '🔴' },
    { id: 'mouse', price: 6, icon: '🐭' },
    { id: 'box', price: 7, icon: '📦' },
    { id: 'trampoline', price: 7, icon: '🎪' },
    { id: 'bed', price: 6, icon: '🛏️' }
  ];

  const BACKGROUNDS = [
    { id: 'default', price: 0, icon: '🏠' },
    { id: 'room', price: 4, icon: '🪟' },
    { id: 'garden', price: 5, icon: '🌿' },
    { id: 'cyberpunk', price: 6, icon: '🌃' },
    { id: 'space', price: 8, icon: '🚀' }
  ];

  const ACC_COLORS = {
    o: '#161822', // dark rim
    c: '#00f0ff', // cyber cyan glint
    r: '#e63946', // scarf / bowtie red
    w: '#fff5eb', // scarf stripe / angel wing white
    b: '#cfe8ff', // wing shadow
    g: '#ffd166', // gold frame / dot
    m: 'rgba(38, 42, 54, 0.72)',    // minimalist semi-transparent thin frame
    l: 'rgba(186, 232, 255, 0.30)', // minimalist translucent glass lens
    s: 'rgba(255, 255, 255, 0.55)', // subtle glass glint
    v: 'rgba(139, 92, 246, 0.78)',  // retro tinted violet lens
    h: '#4b5563', // headphone band
    p: '#38bdf8', // headphone cyan earpad
    k: '#ff4d8d'  // festive star lens pink
  };

  const ACC_SHAPES = {
    cyber_glasses: {
      anchor: 'head',
      dx: -4, dy: 4,
      rows: [
        'ooooooooo',
        'occooocco',
        'ooooooooo'
      ]
    },
    minimal_glasses: {
      anchor: 'head',
      dx: -4, dy: 4,
      rows: [
        '.mm...mm.',
        'mslmmmlsm',
        '.mm...mm.'
      ]
    },
    retro_glasses: {
      anchor: 'head',
      dx: -4, dy: 4,
      rows: [
        'ggggggggg',
        'gvvgggvvg',
        '.gg...gg.'
      ]
    },
    star_glasses: {
      anchor: 'head',
      dx: -4, dy: 4,
      rows: [
        '.g.....g.',
        'gkgggggkg',
        '.g.....g.'
      ]
    },
    headphones: {
      anchor: 'head',
      dx: -6, dy: -2,
      rows: [
        '..ooooooooo..',
        '.ohhhhhhhhho.',
        'oh.........ho',
        'oh.........ho',
        'oo.........oo',
        'op.........po',
        'op.........po',
        '.o.........o.'
      ]
    },
    scarf: {
      anchor: 'neck',
      dx: -4, dy: 0,
      rows: [
        'orwrrrwro',
        '.orrrrrro',
        '.....orw.'
      ]
    },
    bowtie: {
      anchor: 'neck',
      dx: -3, dy: 0,
      rows: [
        'ro...or',
        'rrrggrr',
        'ro...or'
      ]
    },
    wings: {
      anchor: 'back',
      dx: -6, dy: -2,
      rows: [
        'ww........ww',
        'wbw......wbw',
        '.wwb....bww.',
        '..wb....bw..'
      ]
    }
  };

  const NECK_ANCHORS = {
    sit:   [[11, 11], [11, 11]],
    happy: [[11, 9],  [11, 11]],
    pet:   [[11, 11], [11, 12]],
    focus: [[11, 11], [11, 11]],
    eat:   [[11, 11], [11, 12]],
    held:  [[12, 10], [12, 10]],
    idle:  [[14, 10], [14, 10]],
    walk:  [[14, 10], [14, 9], [14, 10], [14, 9]],
    yawn:  [[14, 15], [14, 15]],
    sleep: [[14, 16], [14, 17]],
    box:   [[12, 10], [12, 10]],
    music: [[11, 11], [11, 12]]
  };

  // Hat catalog & colors
  const HATS = [
    { id: 'none', name: 'Без шапки', price: 0, icon: '🐾' },
    { id: 'beanie', name: 'Шапочка', price: 3, icon: '🧶' },
    { id: 'bow', name: 'Бантик', price: 4, icon: '🎀' },
    { id: 'cap', name: 'Кепка', price: 4, icon: '🧢' },
    { id: 'chef', name: 'Повар', price: 5, icon: '👨‍🍳' },
    { id: 'wizard', name: 'Маг', price: 6, icon: '🧙' },
    { id: 'viking', name: 'Викинг', price: 7, icon: '⛑️' },
    { id: 'crown', name: 'Корона', price: 8, icon: '👑' },
    { id: 'halo', name: 'Нимб', price: 0, achievementOnly: true, icon: '😇' },
    { id: 'party_hat', name: 'Колпак', price: 0, giftOnly: true, icon: '🎉' }
  ];

  // Sweater catalog
  const SWEATERS = [
    { id: 'none', name: 'Без кофты', price: 0, icon: '🐾' },
    { id: 'cozy_red', name: 'Свитер', price: 4, icon: '🧶' },
    { id: 'mint_hoodie', name: 'Худи', price: 5, icon: '🧥' },
    { id: 'sky_stripe', name: 'Полоска', price: 6, icon: '👕' },
    { id: 'hacker', name: 'Хакер', price: 6, icon: '💻' },
    { id: 'sakura', name: 'Сакура', price: 7, icon: '🌸' },
    { id: 'tuxedo', name: 'Смокинг', price: 7, icon: '🤵' },
    { id: 'royal_cape', name: 'Мантия', price: 9, icon: '✨' },
    { id: 'party_sweater', name: 'Праздник', price: 0, giftOnly: true, icon: '🎊' }
  ];

  const SWEATER_COLORS = {
    cozy_red:   { m: '#e6495c', d: '#b82d40', a: '#fff3e6' },
    mint_hoodie:{ m: '#38c793', d: '#22996e', a: '#e8fff5' },
    sky_stripe: { m: '#4da6ff', d: '#2673cc', a: '#ffffff' },
    hacker:     { m: '#1f242d', d: '#00e676', a: '#2e3645' },
    sakura:     { m: '#ffb3cc', d: '#ff6b9e', a: '#fff5f8' },
    tuxedo:     { m: '#222430', d: '#ffffff', a: '#e63946' },
    royal_cape: { m: '#734dff', d: '#4f2cc7', a: '#ffd13b' },
    party_sweater: { m: '#ff4d8d', d: '#ffd13b', a: '#38bdf8' }
  };

  // Sweater overlays tailored to upright poses vs side-view poses
  // Upright (8x5), anchored at (torsoX, torsoY)
  const SWEATER_UPRIGHT = [
    '.ammmma.',
    'mmdmmdmm',
    'mmmmmmmm',
    'mmdmmdmm',
    '.aaaaaa.'
  ];

  // Side-view walking/idle/sleep (10x4), anchored at (torsoX, torsoY)
  const SWEATER_SIDE = [
    '.ammmmmma.',
    'mmdmmdmmdm',
    'mmmmmmmmmm',
    '.aaaaaaaa.'
  ];

  const TORSO_ANCHORS = {
    sit:   { shape: SWEATER_UPRIGHT, pos: [[7, 13], [7, 13]] },
    happy: { shape: SWEATER_UPRIGHT, pos: [[7, 11], [7, 13]] },
    pet:   { shape: SWEATER_UPRIGHT, pos: [[7, 13], [7, 14]] },
    focus: { shape: SWEATER_UPRIGHT, pos: [[7, 13], [7, 13]] },
    eat:   { shape: SWEATER_UPRIGHT, pos: [[7, 13], [7, 14]] },
    held:  { shape: SWEATER_UPRIGHT, pos: [[8, 11], [8, 11]] },
    music: { shape: SWEATER_UPRIGHT, pos: [[7, 13], [7, 14]] },
    idle:  { shape: SWEATER_SIDE,    pos: [[5, 11], [5, 11]] },
    walk:  { shape: SWEATER_SIDE,    pos: [[5, 11], [5, 10], [5, 11], [5, 10]] },
    yawn:  { shape: SWEATER_SIDE,    pos: [[3, 13], [3, 13]] },
    sleep: { shape: SWEATER_SIDE,    pos: [[3, 13], [3, 14]] }
  };

  const HAT_COLORS = {
    o: '#3b1c12', // hat outline
    r: '#e6495c', // red beanie / ruby
    w: '#fff7f0', // white pom-pom / chef / horns
    k: '#ff70a6', // pink bow
    d: '#d6457d', // dark pink bow shade
    y: '#ffd13b', // gold crown / star / halo
    a: '#e09f1f', // gold shade
    v: '#6d4aff', // wizard purple
    u: '#4e2fc7', // wizard dark purple
    b: '#3b82f6', // cap blue
    n: '#1d4ed8', // cap dark blue
    s: '#94a3b8'  // viking steel
  };

  // Compact hat pixel matrices anchored relative to head center-top (headX, headY)
  // Each hat is 10 chars wide x 5 rows tall; drawn at (headX - 5, headY - 4)
  const HAT_SHAPES = {
    beanie: [
      '....ww....',
      '..oorroo..',
      '.orrrrrro.',
      '.owwwwwwo.',
      '..oooooo..'
    ],
    bow: [
      '..........',
      '.oo....oo.',
      'okkoooooko',
      'okdkoookdo',
      '.oo....oo.'
    ],
    cap: [
      '..........',
      '..oooooo..',
      '.obbbbbbo.',
      '.obbbbbbnn',
      '.ooooooooo'
    ],
    chef: [
      '..oo..oo..',
      '.owwoowwo.',
      '.owwwwwwo.',
      '..owwwwo..',
      '..oooooo..'
    ],
    viking: [
      'w........w',
      'wo.oooo.ow',
      '.osssssso.',
      '.osysysso.',
      '..oooooo..'
    ],
    crown: [
      '..........',
      '.o..oo..o.',
      '.oyoyyoyo.',
      '.oyryyryo.',
      '.oooooooo.'
    ],
    wizard: [
      '....oo....',
      '...ovvo...',
      '..ovyyvo..',
      '.ouvvvvuo.',
      'oooooooooo'
    ],
    halo: [
      '..yyyyyy..',
      '.y......y.',
      '..yyyyyy..',
      '..........',
      '..........'
    ],
    party_hat: [
      '....yy....',
      '...ovvo...',
      '..okyyko..',
      '.obvkkvbo.',
      '.oooooooo.'
    ]
  };

  // Approximate head top-center (x, y) in 24x20 grid for each pose & frame (facing RIGHT)
  const HEAD_ANCHORS = {
    idle:  [[15, 4], [15, 4]],
    walk:  [[15, 4], [15, 4], [15, 4], [15, 4]],
    sit:   [[11, 5], [11, 5]],
    happy: [[11, 4], [11, 5]],
    pet:   [[11, 5], [11, 6]],
    focus: [[11, 5], [11, 5]],
    eat:   [[11, 5], [11, 6]],
    held:  [[12, 4], [12, 4]],
    yawn:  [[15, 10], [15, 10]],
    sleep: [[15, 11], [15, 12]],
    box:   [[12, 4], [12, 5]],
    music: [[11, 5], [11, 6]]
  };

  // All frames are 24 chars wide x 20 rows tall, facing RIGHT by default.
  const FRAMES = {
    // Standing side-view idle: same cute chibi head held cleanly above body
    idle: [
      [
        '........................',
        '........................',
        '.............O....O.....',
        '............OBO..OBO....',
        '...........OBBOOOOBBO...',
        '..OO......OBBSBSBSBBBO..',
        '.OBSO.....OBBBBBBBBBBO..',
        '.OSBO.....OBBCCBBBCCBO..',
        '..OBO.....OBCECCBCECCO..',
        '..OSBO....OBBCCCPCCBO...',
        '...OBO..OOOBBBCCCCBO....',
        '...OBBOOBBSBSBBBBBO.....',
        '....OBBBBBBBBBBBBBBO....',
        '....OBBSBSBBBBBBCCBO....',
        '....OBBBBBBBBBBBCCBO....',
        '.....OBBBBBBBBBBBBO.....',
        '.....OBBO.OOOO.OBBO.....',
        '.....OBBO......OBBO.....',
        '.....OCCO......OCCO.....',
        '......OO........OO......'
      ],
      [
        '........................',
        '........................',
        '.............O....O.....',
        '............OBO..OBO....',
        '...........OBBOOOOBBO...',
        '...OO.....OBBSBSBSBBBO..',
        '..OBSO....OBBBBBBBBBBO..',
        '..OSBO....OBBCCBBBCCBO..',
        '...OBO....OBCOCCBCOCOO..',
        '...OSBO...OBBCCCPCCBO...',
        '...OBO..OOOBBBCCCCBO....',
        '...OBBOOBBSBSBBBBBO.....',
        '....OBBBBBBBBBBBBBBO....',
        '....OBBSBSBBBBBBCCBO....',
        '....OBBBBBBBBBBBCCBO....',
        '.....OBBBBBBBBBBBBO.....',
        '.....OBBO.OOOO.OBBO.....',
        '.....OBBO......OBBO.....',
        '.....OCCO......OCCO.....',
        '......OO........OO......'
      ]
    ],

    // Smooth 4-frame walk cycle with natural alternating paws, subtle bounce & swaying tail
    walk: [
      // Frame 0: Stride A (front paw forward, back paw trailing)
      [
        '........................',
        '........................',
        '.............O....O.....',
        '............OBO..OBO....',
        '...........OBBOOOOBBO...',
        '..OO......OBBSBSBSBBBO..',
        '.OBSO.....OBBBBBBBBBBO..',
        '.OSBO.....OBBCCBBBCCBO..',
        '..OBO.....OBCECCBCECCO..',
        '..OSBO....OBBCCCPCCBO...',
        '...OBO..OOOBBBCCCCBO....',
        '...OBBOOBBSBSBBBBBO.....',
        '....OBBBBBBBBBBBBBBO....',
        '....OBBSBSBBBBBBCCBO....',
        '....OBBBBBBBBBBBCCBO....',
        '.....OBBBBBBBBBBBBO.....',
        '....OBBO..OOOO...OBBO...',
        '...OBBO...........OBBO..',
        '...OCCO...........OCCO..',
        '....OO.............OO...'
      ],
      // Frame 1: Passing A (1px cute bounce up, paws gathering under body)
      [
        '........................',
        '.............O....O.....',
        '............OBO..OBO....',
        '...........OBBOOOOBBO...',
        '...OO.....OBBSBSBSBBBO..',
        '..OBSO....OBBBBBBBBBBO..',
        '..OSBO....OBBCCBBBCCBO..',
        '...OBO....OBCECCBCECCO..',
        '...OSBO...OBBCCCPCCBO...',
        '...OBO..OOOBBBCCCCBO....',
        '...OBBOOBBSBSBBBBBO.....',
        '....OBBBBBBBBBBBBBBO....',
        '....OBBSBSBBBBBBCCBO....',
        '....OBBBBBBBBBBBCCBO....',
        '.....OBBBBBBBBBBBBO.....',
        '......OBBO.OO.OBBO......',
        '......OBBO....OBBO......',
        '......OCCO....OCCO......',
        '.......OO......OO.......',
        '........................'
      ],
      // Frame 2: Stride B (inner legs stepping opposite)
      [
        '........................',
        '........................',
        '.............O....O.....',
        '............OBO..OBO....',
        '...........OBBOOOOBBO...',
        '....OO....OBBSBSBSBBBO..',
        '...OBSO...OBBBBBBBBBBO..',
        '...OSBO...OBBCCBBBCCBO..',
        '...OBO....OBCECCBCECCO..',
        '...OSBO...OBBCCCPCCBO...',
        '...OBO..OOOBBBCCCCBO....',
        '...OBBOOBBSBSBBBBBO.....',
        '....OBBBBBBBBBBBBBBO....',
        '....OBBSBSBBBBBBCCBO....',
        '....OBBBBBBBBBBBCCBO....',
        '.....OBBBBBBBBBBBBO.....',
        '.....OBBO..OO..OBBO.....',
        '......OBBO....OBBO......',
        '......OCCO....OCCO......',
        '.......OO......OO.......'
      ],
      // Frame 3: Passing B (1px bounce up, tail swaying back)
      [
        '........................',
        '.............O....O.....',
        '............OBO..OBO....',
        '...........OBBOOOOBBO...',
        '...OO.....OBBSBSBSBBBO..',
        '..OBSO....OBBBBBBBBBBO..',
        '..OSBO....OBBCCBBBCCBO..',
        '...OBO....OBCECCBCECCO..',
        '...OSBO...OBBCCCPCCBO...',
        '...OBO..OOOBBBCCCCBO....',
        '...OBBOOBBSBSBBBBBO.....',
        '....OBBBBBBBBBBBBBBO....',
        '....OBBSBSBBBBBBCCBO....',
        '....OBBBBBBBBBBBCCBO....',
        '.....OBBBBBBBBBBBBO.....',
        '.....OBBO.OOOO.OBBO.....',
        '....OBBO........OBBO....',
        '....OCCO........OCCO....',
        '.....OO..........OO.....',
        '........................'
      ]
    ],

    // Compact upright sitting pose (the fan-favorite!)
    sit: [
      [
        '........................',
        '........................',
        '........................',
        '........O....O..........',
        '.......OBO..OBO.........',
        '......OBBOOOOBBO........',
        '.....OBBSBSBSBBBO.......',
        '.....OBBBBBBBBBBO.......',
        '.....OBBCCBBBCCBO.......',
        '.....OBCECCBCECCO.......',
        '.....OBBCCCPCCBO........',
        '......OBBCCCCBO....OO...',
        '.......OOBBBBOO...OBSO..',
        '......OBBSBBSBBO..OSBO..',
        '......OBBBBBBBBO...OBO..',
        '......OBBCCCCBBO..OBSO..',
        '......OBBCCCCBBO.OBBO...',
        '......OBOCCOBCCOOBBO....',
        '......OCCOOCCOOCCOO.....',
        '.......OOOOOOOOOOO......'
      ],
      [
        '........................',
        '........................',
        '........................',
        '........O....O..........',
        '.......OBO..OBO.........',
        '......OBBOOOOBBO........',
        '.....OBBSBSBSBBBO.......',
        '.....OBBBBBBBBBBO.......',
        '.....OBBCCBBBCCBO.......',
        '.....OBCOCCBCOCOO.......',
        '.....OBBCCCPCCBO........',
        '......OBBCCCCBO.....OO..',
        '.......OOBBBBOO....OBSO.',
        '......OBBSBBSBBO...OSBO.',
        '......OBBBBBBBBO...OBO..',
        '......OBBCCCCBBO..OBSO..',
        '......OBBCCCCBBO.OBBO...',
        '......OBOCCOBCCOOBBO....',
        '......OCCOOCCOOCCOO.....',
        '.......OOOOOOOOOOO......'
      ]
    ],

    // Happy joyful hop (unified cute sit-hop with ^ ^ eyes & rosy cheeks!)
    happy: [
      [
        '........................',
        '........O....O..........',
        '.......OBO..OBO.........',
        '......OBBOOOOBBO........',
        '.....OBBSBSBSBBBO.......',
        '.....OBBBBBBBBBBO.......',
        '.....OBBCCBBBCCBO.......',
        '.....OBCOCCBCOCOO.......',
        '.....OBPCCCPCCPBO.......',
        '......OBBCCCCBO....OO...',
        '.......OOBBBBOO...OBSO..',
        '......OBBSBBSBBO..OSBO..',
        '......OBBBBBBBBO...OBO..',
        '.....OOBBCCCCBBOO.OBSO..',
        '....OCCOBCCCCBOCCOOBO...',
        '.....OO.OBBBBO.OO.OO....',
        '........OCCOCCO.........',
        '.........OO.OO..........',
        '........................',
        '........................'
      ],
      [
        '........................',
        '........................',
        '........................',
        '........O....O..........',
        '.......OBO..OBO.........',
        '......OBBOOOOBBO........',
        '.....OBBSBSBSBBBO.......',
        '.....OBBBBBBBBBBO.......',
        '.....OBBCCBBBCCBO.......',
        '.....OBCOCCBCOCOO.......',
        '.....OBPCCCPCCPBO...OO..',
        '......OBBCCCCBO....OBSO.',
        '.......OOBBBBOO....OSBO.',
        '......OBBSBBSBBO...OBO..',
        '......OBBBBBBBBO..OBSO..',
        '......OBBCCCCBBO.OBBO...',
        '......OBBCCCCBBOOBBO....',
        '......OBOCCOBCCOOCCO....',
        '......OCCOOCCOOCCOO.....',
        '.......OOOOOOOOOOO......'
      ]
    ],

    // Petting / purring cozy sit with rosy cheeks
    pet: [
      [
        '........................',
        '........................',
        '........................',
        '........O....O..........',
        '.......OBO..OBO.........',
        '......OBBOOOOBBO........',
        '.....OBBSBSBSBBBO.......',
        '.....OBBBBBBBBBBO.......',
        '.....OBBCCBBBCCBO.......',
        '.....OBCOCCBCOCOO.......',
        '.....OBPCCCPCCPBO.......',
        '......OBBCCCCBO....OO...',
        '.......OOBBBBOO...OBSO..',
        '......OBBSBBSBBO..OSBO..',
        '......OBBBBBBBBO...OBO..',
        '......OBBCCCCBBO..OBSO..',
        '......OBBCCCCBBO.OBBO...',
        '......OBOCCOBCCOOBBO....',
        '......OCCOOCCOOCCOO.....',
        '.......OOOOOOOOOOO......'
      ],
      [
        '........................',
        '........................',
        '........................',
        '........................',
        '........O....O..........',
        '.......OBO..OBO.........',
        '......OBBOOOOBBO........',
        '.....OBBSBSBSBBBO.......',
        '.....OBBBBBBBBBBO.......',
        '.....OBBCCBBBCCBO.......',
        '.....OBCOCCBCOCOO.......',
        '.....OBPCCCPCCPBO...OO..',
        '......OBBCCCCBO....OBSO.',
        '......OBBSBBSBBO...OSBO.',
        '......OBBBBBBBBO...OBO..',
        '......OBBCCCCBBO..OBSO..',
        '......OBBCCCCBBO.OBBO...',
        '......OBOCCOBCCOOBBO....',
        '......OCCOOCCOOCCOO.....',
        '.......OOOOOOOOOOO......'
      ]
    ],

    // Getting drowsy / yawning on a distracting site
    yawn: [
      [
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '.............O....O.....',
        '............OBO..OBO....',
        '...........OBBOOOOBBO...',
        '....OOOOOOOBBSBSBSBBBO..',
        '...OBBSBSBBBBBBBBBBBBO..',
        '..OBBBBBBBBBBBCCBBBCCBO.',
        '..OBBSBSBBBBBBCOCCBCOCOO',
        '..OBBBBBBBBBBBCCCPCCCO..',
        '..OBBOOOOBBBBBCCPPCCO...',
        '..OBBSBSOBBBBBCCCCCO....',
        '...OOOOOOOOOOOCCOOCCO...',
        '..............OOOOOO....'
      ],
      [
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '.............O....O.....',
        '............OBO..OBO....',
        '...........OBBOOOOBBO...',
        '....OOOOOOOBBSBSBSBBBO..',
        '...OBBSBSBBBBBBBBBBBBO..',
        '..OBBBBBBBBBBBCCBBBCCBO.',
        '..OBBSBSBBBBBBCOCCBCOCOO',
        '..OBBBBBBBBBBBCCCPCCCO..',
        '..OBBOOOOBBBBBCCCCCCO...',
        '..OBBSBSOBBBBBCCCCCO....',
        '...OOOOOOOOOOOCCOOCCO...',
        '..............OOOOOO....'
      ]
    ],

    // Curled-up sleeping cat loaf
    sleep: [
      [
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '.............O....O.....',
        '............OBO..OBO....',
        '....OOOOOO.OBBOOOOBBO...',
        '...OBBSBSBOBBSBSBSBBBO..',
        '..OBBBBBBBBBBBBBBBBBBO..',
        '..OBBSBSBBBBBBCCBBBCCBO.',
        '..OBBBBBBBBBBBCOCCBCOCOO',
        '..OBBOOOOBBBBBCCCPCCCO..',
        '..OBBSBSOBBBBBCCCCCCOO..',
        '...OOOOOOOOOOOCCOOCCO...',
        '..............OOOOOO....'
      ],
      [
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '........................',
        '.............O....O.....',
        '....OOOOOO..OBO..OBO....',
        '...OBBSBSBOOBBOOOOBBO...',
        '..OBBBBBBBOBBSBSBSBBBO..',
        '..OBBSBSBBBBBBBBBBBBBO..',
        '..OBBBBBBBBBBBCOCCBCOCOO',
        '..OBBOOOOBBBBBCCCPCCCO..',
        '..OBBSBSOBBBBBCCCCCCOO..',
        '...OOOOOOOOOOOCCOOCCO...',
        '..............OOOOOO....'
      ]
    ],

    // Pomodoro focus pose: same cute sitting cat with neat thin glasses!
    focus: [
      [
        '........................',
        '........................',
        '........................',
        '........O....O..........',
        '.......OBO..OBO.........',
        '......OBBOOOOBBO........',
        '.....OBBSBSBSBBBO.......',
        '.....OBBBBBBBBBBO.......',
        '.....OBBGGOBBGGBO.......',
        '.....OBGEGOBGEGBO.......',
        '.....OBBCCCPCCBO........',
        '......OBBCCCCBO....OO...',
        '.......OOBBBBOO...OBSO..',
        '......OBBSBBSBBO..OSBO..',
        '......OBBBBBBBBO...OBO..',
        '......OBBCCCCBBO..OBSO..',
        '......OBBCCCCBBO.OBBO...',
        '......OBOCCOBCCOOBBO....',
        '......OCCOOCCOOCCOO.....',
        '.......OOOOOOOOOOO......'
      ],
      [
        '........................',
        '........................',
        '........................',
        '........O....O..........',
        '.......OBO..OBO.........',
        '......OBBOOOOBBO........',
        '.....OBBSBSBSBBBO.......',
        '.....OBBBBBBBBBBO.......',
        '.....OBBGGOBBGGBO.......',
        '.....OBGEGOBGEGBO.......',
        '.....OBBCCCPCCBO........',
        '......OBBCCCCBO.....OO..',
        '.......OOBBBBOO....OBSO.',
        '......OBBSBBSBBO...OSBO.',
        '......OBBBBBBBBO...OBO..',
        '......OBBCCCCBBO..OBSO..',
        '......OBBCCCCBBO.OBBO...',
        '......OBOCCOBCCOOBBO....',
        '......OCCOOCCOOCCOO.....',
        '.......OOOOOOOOOOO......'
      ]
    ],

    // Eating a yummy fish (om-nom-nom!)
    eat: [
      [
        '........................',
        '........................',
        '........................',
        '........O....O..........',
        '.......OBO..OBO.........',
        '......OBBOOOOBBO........',
        '.....OBBSBSBSBBBO.......',
        '.....OBBBBBBBBBBO.......',
        '.....OBBCCBBBCCBO.......',
        '.....OBCOCCBCOCOO.......',
        '.....OBPCCCPCCPBO.......',
        '......OBBCCCCBO....OO...',
        '.......OOBBBBOO...OBSO..',
        '......OBBSBBSBBO..OSBO..',
        '......OBBBBBBBBO...OBO..',
        '......OBBCCCCBBO..OBSO..',
        '..OO..OBBCCCCBBO.OBBO...',
        '.OFOO.OBOCCOBCCOOBBO....',
        '.OFFFOOCCOOCCOOCCOO.....',
        '..OOO..OOOOOOOOOOO......'
      ],
      [
        '........................',
        '........................',
        '........................',
        '........................',
        '........O....O..........',
        '.......OBO..OBO.........',
        '......OBBOOOOBBO........',
        '.....OBBSBSBSBBBO.......',
        '.....OBBBBBBBBBBO.......',
        '.....OBBCCBBBCCBO.......',
        '.....OBCOCCBCOCOO.......',
        '.....OBPCCPPCCPBO...OO..',
        '......OBBCCCCBO....OBSO.',
        '.......OOBBBBOO....OSBO.',
        '......OBBSBBSBBO...OBO..',
        '......OBBBBBBBBO..OBSO..',
        '......OBBCCCCBBO.OBBO...',
        '..OO..OBOCCOBCCOOBBO....',
        '..OFO.OCCOOCCOOCCOO.....',
        '...O...OOOOOOOOOOO......'
      ]
    ],

    // Gently held by the scruff! Elongated dangling body + swinging little paws
    held: [
      [
        '...........OO...........',
        '..........OBBO..........',
        '.........O....O.........',
        '........OBO..OBO........',
        '.......OBBOOOOBBO.......',
        '......OBBSBSBSBBBO......',
        '......OBBBBBBBBBBO......',
        '......OBBCCBBBCCBO......',
        '......OBCECCBCECCO......',
        '......OBBCCCPCCBO.......',
        '.......OOBCCCCBOO.......',
        '.......OBBSBBSBBO.......',
        '......OBOBBBBBOBO.......',
        '......OCOBBCCBOCO.......',
        '.......OOBBCCBOO........',
        '........OBBBBBBO........',
        '.......OBBO..OBBO.......',
        '.......OCCO..OCCO.......',
        '........OO....OO........',
        '........................'
      ],
      [
        '...........OO...........',
        '..........OBBO..........',
        '.........O....O.........',
        '........OBO..OBO........',
        '.......OBBOOOOBBO.......',
        '......OBBSBSBSBBBO......',
        '......OBBBBBBBBBBO......',
        '......OBBCCBBBCCBO......',
        '......OBCECCBCECCO......',
        '......OBBCCCPCCBO.......',
        '.......OOBCCCCBOO.......',
        '.......OBBSBBSBBO.......',
        '.......OBBBBBBBBO.......',
        '......OCOBBCCBOCO.......',
        '.......OOBBCCBOO........',
        '........OBBBBBBO........',
        '........OBBOOBBO........',
        '........OCCOOCCO........',
        '.........OO..OO.........',
        '........................'
      ]
    ],

    // Peeking out of a cozy cardboard box!
    box: [
      [
        '........................',
        '........................',
        '.........O....O.........',
        '........OBO..OBO........',
        '.......OBBOOOOBBO.......',
        '......OBBSBSBSBBBO......',
        '......OBBBBBBBBBBO......',
        '......OBBCCBBBCCBO......',
        '......OBCECCBCECCO......',
        '.....OOBBCCCPCCBOO......',
        '....OkkOBBCCCCBOkkO.....',
        '...OkkkkOOBBBBOOkkkO....',
        '..OkkkkkkkkkkkkkkkkkO...',
        '..OOOOOOOOOOOOOOOOOOO...',
        '...OkkkkkkkkkkkkkkkO....',
        '...OkkKkkkkkkkkkKkkO....',
        '...OkkkkkkkkkkkkkkkO....',
        '...OkkkkkkkkkkkkkkkO....',
        '....OOOOOOOOOOOOOOO.....',
        '........................'
      ],
      [
        '........................',
        '........................',
        '........................',
        '.........O....O.........',
        '........OBO..OBO........',
        '.......OBBOOOOBBO.......',
        '......OBBSBSBSBBBO......',
        '......OBBBBBBBBBBO......',
        '......OBBCCBBBCCBO......',
        '.....OOBCOCCBCOCOO......',
        '....OkkOBBCCCPCCBOkO....',
        '...OkkkkOOBBBBOOkkkO....',
        '..OkkkkkkkkkkkkkkkkkO...',
        '..OOOOOOOOOOOOOOOOOOO...',
        '...OkkkkkkkkkkkkkkkO....',
        '...OkkKkkkkkkkkkKkkO....',
        '...OkkkkkkkkkkkkkkkO....',
        '...OkkkkkkkkkkkkkkkO....',
        '....OOOOOOOOOOOOOOO.....',
        '........................'
      ]
    ],

    // Music vibing pose: cat wearing pixel headphones, bobbing head to the beat!
    music: [
      [
        '........................',
        '.......OOOOOOOOO........',
        '......OGGGGGGGGGO.......',
        '.....OG.O....O..GO......',
        '.....OGOBO..OBO.GO......',
        '....OGOBBOOOOBBOGO......',
        '....OGOBBSBSBSBBGO......',
        '....OGOBBBBBBBBBGO......',
        '....OGOBBCCBBBCCGO......',
        '....OOOBCOCCBCOCOO......',
        '.....OBPCCCPCCPBO.......',
        '......OBBCCCCBO....OO...',
        '.......OOBBBBOO...OBSO..',
        '......OBBSBBSBBO..OSBO..',
        '......OBBBBBBBBO...OBO..',
        '......OBBCCCCBBO..OBSO..',
        '......OBBCCCCBBO.OBBO...',
        '......OBOCCOBCCOOBBO....',
        '......OCCOOCCOOCCOO.....',
        '.......OOOOOOOOOOO......'
      ],
      [
        '........................',
        '........................',
        '.......OOOOOOOOO........',
        '......OGGGGGGGGGO.......',
        '.....OG.O....O..GO......',
        '.....OGOBO..OBO.GO......',
        '....OGOBBOOOOBBOGO......',
        '....OGOBBSBSBSBBGO......',
        '....OGOBBBBBBBBBGO......',
        '....OGOBBCCBBBCCGO......',
        '....OOOBCOCCBCOCOO......',
        '.....OBPCCCPCCPBO...OO..',
        '......OBBCCCCBO....OBSO.',
        '.......OOBBBBOO....OSBO.',
        '......OBBSBBSBBO...OBO..',
        '......OBBBBBBBBO..OBSO..',
        '......OBBCCCCBBO.OBBO...',
        '......OBOCCOBCCOOBBO....',
        '......OCCOOCCOOCCOO.....',
        '.......OOOOOOOOOOO......'
      ]
    ]
  };

  const BOX_COLORS = {
    k: '#c98842', // cardboard light
    K: '#9e6225'  // cardboard tape / shade
  };

  function renderFrame(canvas, stateName, frameIdx, colorKey, facingLeft, hatId, sweaterId, accessoryId) {
    const ctx = canvas.getContext('2d');
    const palette = PALETTES[colorKey] || PALETTES.ginger;
    const anim = FRAMES[stateName] || FRAMES.sit;
    const idx = frameIdx % anim.length;
    const grid = anim[idx];

    const w = canvas.width;
    const h = canvas.height;
    const pixel = Math.min(w / GRID_W, h / GRID_H);
    const offsetX = Math.floor((w - GRID_W * pixel) / 2);
    const offsetY = Math.floor(h - GRID_H * pixel);

    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = false;

    // Wings render behind/beside body if equipped (not in box/sleep)
    if (accessoryId === 'wings' && stateName !== 'box' && stateName !== 'sleep') {
      const spec = ACC_SHAPES.wings;
      const anchors = NECK_ANCHORS[stateName] || NECK_ANCHORS.sit;
      const [ax, ay] = anchors[idx % anchors.length];
      const sx = ax + spec.dx;
      const sy = ay + spec.dy;
      for (let ry = 0; ry < spec.rows.length; ry++) {
        for (let rx = 0; rx < spec.rows[ry].length; rx++) {
          const ch = spec.rows[ry][rx];
          if (!ACC_COLORS[ch]) continue;
          const x = sx + rx;
          const y = sy + ry;
          if (x < 0 || x >= GRID_W || y < 0 || y >= GRID_H) continue;
          const gx = facingLeft ? (GRID_W - 1 - x) : x;
          ctx.fillStyle = ACC_COLORS[ch];
          ctx.fillRect(Math.floor(offsetX + gx * pixel), Math.floor(offsetY + y * pixel), Math.ceil(pixel), Math.ceil(pixel));
        }
      }
    }

    for (let y = 0; y < GRID_H; y++) {
      const row = grid[y];
      if (!row) continue;
      for (let x = 0; x < GRID_W; x++) {
        const ch = row[x];
        const fill = palette[ch] || BOX_COLORS[ch];
        if (!ch || ch === '.' || !fill) continue;
        const gx = facingLeft ? (GRID_W - 1 - x) : x;
        ctx.fillStyle = fill;
        ctx.fillRect(
          Math.floor(offsetX + gx * pixel),
          Math.floor(offsetY + y * pixel),
          Math.ceil(pixel),
          Math.ceil(pixel)
        );
      }
    }

    // Sweater overlay (skip when inside box)
    if (sweaterId && sweaterId !== 'none' && SWEATER_COLORS[sweaterId] && stateName !== 'box') {
      const swColors = SWEATER_COLORS[sweaterId];
      const torsoSpec = TORSO_ANCHORS[stateName] || TORSO_ANCHORS.sit;
      const shape = torsoSpec.shape;
      const [startX, startY] = torsoSpec.pos[idx % torsoSpec.pos.length];

      for (let sy = 0; sy < shape.length; sy++) {
        const srow = shape[sy];
        for (let sx = 0; sx < srow.length; sx++) {
          const ch = srow[sx];
          if (!ch || ch === '.' || !swColors[ch]) continue;
          const x = startX + sx;
          const y = startY + sy;
          if (x < 0 || x >= GRID_W || y < 0 || y >= GRID_H) continue;
          const baseCh = grid[y] && grid[y][x];
          if (baseCh !== 'B' && baseCh !== 'S' && baseCh !== 'C') continue;
          const gx = facingLeft ? (GRID_W - 1 - x) : x;
          ctx.fillStyle = swColors[ch];
          ctx.fillRect(
            Math.floor(offsetX + gx * pixel),
            Math.floor(offsetY + y * pixel),
            Math.ceil(pixel),
            Math.ceil(pixel)
          );
        }
      }
    }

    // Foreground accessories (glasses, headphones, scarf, bowtie)
    if (
      accessoryId &&
      accessoryId !== 'none' &&
      accessoryId !== 'wings' &&
      !(accessoryId === 'headphones' && stateName === 'music') &&
      ACC_SHAPES[accessoryId]
    ) {
      const spec = ACC_SHAPES[accessoryId];
      const anchors = spec.anchor === 'head'
        ? (HEAD_ANCHORS[stateName] || HEAD_ANCHORS.sit)
        : (NECK_ANCHORS[stateName] || NECK_ANCHORS.sit);
      const [ax, ay] = anchors[idx % anchors.length];
      const sx = ax + spec.dx;
      const sy = ay + spec.dy;
      for (let ry = 0; ry < spec.rows.length; ry++) {
        for (let rx = 0; rx < spec.rows[ry].length; rx++) {
          const ch = spec.rows[ry][rx];
          if (!ACC_COLORS[ch]) continue;
          const x = sx + rx;
          const y = sy + ry;
          if (x < 0 || x >= GRID_W || y < 0 || y >= GRID_H) continue;
          const gx = facingLeft ? (GRID_W - 1 - x) : x;
          ctx.fillStyle = ACC_COLORS[ch];
          ctx.fillRect(Math.floor(offsetX + gx * pixel), Math.floor(offsetY + y * pixel), Math.ceil(pixel), Math.ceil(pixel));
        }
      }
    }

    // Hat overlay
    if (hatId && hatId !== 'none' && HAT_SHAPES[hatId]) {
      const shape = HAT_SHAPES[hatId];
      const anchors = HEAD_ANCHORS[stateName] || HEAD_ANCHORS.sit;
      const [anchorX, anchorY] = anchors[idx % anchors.length];
      const startX = anchorX - 5;
      const startY = anchorY - 4;

      for (let hy = 0; hy < shape.length; hy++) {
        const hrow = shape[hy];
        for (let hx = 0; hx < hrow.length; hx++) {
          const ch = hrow[hx];
          if (!ch || ch === '.' || !HAT_COLORS[ch]) continue;
          const x = startX + hx;
          const y = startY + hy;
          if (x < 0 || x >= GRID_W || y < 0 || y >= GRID_H) continue;
          const gx = facingLeft ? (GRID_W - 1 - x) : x;
          ctx.fillStyle = HAT_COLORS[ch];
          ctx.fillRect(
            Math.floor(offsetX + gx * pixel),
            Math.floor(offsetY + y * pixel),
            Math.ceil(pixel),
            Math.ceil(pixel)
          );
        }
      }
    }
  }

  // Pixel-art wind-up toy mouse (12x8)
  function renderMouse(canvas, frameIdx, facingLeft) {
    const ctx = canvas.getContext('2d');
    const frames = [
      [
        '.....oo.....',
        '....oeeo....',
        '..ooommmoo..',
        '.oommmmmemo.',
        'oo.ommmmmpo.',
        '....oooooo..',
        '....o....o..'
      ],
      [
        '.....oo.....',
        '....oeeo....',
        '..ooommmoo..',
        '.oommmmmemo.',
        '.o.ommmmmpo.',
        '....oooooo..',
        '.....o..o...'
      ]
    ];
    const colors = { o: '#362c38', m: '#a8b0c0', e: '#ff96ad', p: '#ff5c8a' };
    const grid = frames[frameIdx % 2];
    const px = Math.min(canvas.width / 12, canvas.height / 7);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < 12; x++) {
        const ch = grid[y][x];
        if (!colors[ch]) continue;
        const gx = facingLeft ? (11 - x) : x;
        ctx.fillStyle = colors[ch];
        ctx.fillRect(Math.floor(gx * px), Math.floor(y * px), Math.ceil(px), Math.ceil(px));
      }
    }
  }

  // Empty cardboard box on the floor (16x10)
  function renderEmptyBox(canvas) {
    const ctx = canvas.getContext('2d');
    const grid = [
      '..oooooooooooo..',
      '.okkkkkkkkkkkko.',
      'okkkkkkkkkkkkkko',
      'oooooooooooooooo',
      '.okkkkkkkkkkkko.',
      '.okkKkkkkkkKkko.',
      '.okkkkkkkkkkkko.',
      '.okkkkkkkkkkkko.',
      '..oooooooooooo..'
    ];
    const colors = { o: '#471e0d', k: '#c98842', K: '#9e6225' };
    const px = Math.min(canvas.width / 16, canvas.height / 9);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < 16; x++) {
        const ch = grid[y][x];
        if (!colors[ch]) continue;
        ctx.fillStyle = colors[ch];
        ctx.fillRect(Math.floor(x * px), Math.floor(y * px), Math.ceil(px), Math.ceil(px));
      }
    }
  }

  // Pixel-art trampoline (18x8)
  function renderTrampoline(canvas, bounceFrame = 0) {
    const ctx = canvas.getContext('2d');
    const grid = bounceFrame
      ? [
          '..................',
          '.oooooooooooooooo.',
          'orbbbbbbbbbbbbbbro',
          '.oooooooooooooooo.',
          '..oo..........oo..',
          '..oo..........oo..',
          '..oo..........oo..'
        ]
      : [
          '.oooooooooooooooo.',
          'orbbbbbbbbbbbbbbro',
          '.oooooooooooooooo.',
          '..oo..........oo..',
          '..oo..........oo..',
          '..oo..........oo..',
          '..................'
        ];
    const colors = { o: '#362218', r: '#e6495c', b: '#3b82f6' };
    const px = Math.min(canvas.width / 18, canvas.height / 7);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < 18; x++) {
        const ch = grid[y][x];
        if (!colors[ch]) continue;
        ctx.fillStyle = colors[ch];
        ctx.fillRect(Math.floor(x * px), Math.floor(y * px), Math.ceil(px), Math.ceil(px));
      }
    }
  }

  // Cozy pixel cat bed (18x8)
  function renderCatBed(canvas) {
    const ctx = canvas.getContext('2d');
    const grid = [
      '....oooooooooo....',
      '..ooppppppppppoo..',
      '.opppccccccccpppo.',
      'opppccccccccccpppo',
      'oppppppppppppppppo',
      'opddddddddddddddpo',
      '.oooooooooooooooo.'
    ];
    const colors = { o: '#471e0d', p: '#e66478', d: '#b83b50', c: '#fff0db' };
    const px = Math.min(canvas.width / 18, canvas.height / 7);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < 18; x++) {
        const ch = grid[y][x];
        if (!colors[ch]) continue;
        ctx.fillStyle = colors[ch];
        ctx.fillRect(Math.floor(x * px), Math.floor(y * px), Math.ceil(px), Math.ceil(px));
      }
    }
  }

  globalThis.TabCatSprites = {
    GRID_W,
    GRID_H,
    PALETTES,
    RARE_SKINS,
    HATS,
    SWEATERS,
    ACCESSORIES,
    TREATS,
    TOYS,
    BACKGROUNDS,
    FRAMES,
    renderFrame,
    renderMouse,
    renderEmptyBox,
    renderTrampoline,
    renderCatBed
  };
})();
