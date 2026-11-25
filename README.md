# 🐾 TabCat — Browser Tamagotchi Extension

> A cozy, zero-dependency Chrome extension (Manifest V3) featuring an original pixel-art cat that walks across your browser tabs, celebrates when you close tabs, naps when you linger on distracting sites, and keeps you company during Pomodoro focus sessions.

**Languages / Языки:** 🇬🇧 English (default) · 🇷🇺 Русский · 🇨🇳 中文

---

## ✨ Features (English)

* **Pixel-Art Browser Companion** — Runs in an isolated Shadow DOM so it never breaks page styles, auto-hides in fullscreen video/games, and supports 4 crisp integer sizes (`S` / `M` / `L` / `XL`).
* **Smart Browser Reactions**:
  * **Close tabs** → Cat hops with joy (`+2 XP` per tab, `+1 🐟` every 5 closed tabs).
  * **Sleepy Sites** → Stay too long on distracting sites (YouTube, TikTok, Reddit, etc., fully customizable) and your cat yawns and falls asleep (`Zzz`). Switch back to work and it stretches awake!
  * **Pomodoro Focus Timer** → Presets (`25/5`, `15/3`, `1/1 test`). During focus sessions your cat puts on study glasses and earns **+5 🐟** & **+25 XP** per completed session.
* **Tamagotchi Care & Interactions**:
  * **3 Live Stat Bars**: Hunger, Happiness, Energy.
  * **Scruff Carry** — Pick up your cat by the scruff and move it around (with optional toggles for **full-screen dragging** and **full-screen free roaming**).
* **Pet Shop (`🛒`) & Wardrobe (`👕`)** — Accessible via a sleek slide-out left-edge dock:
  * **Clothes**: Pixel hats, sweaters, cyber shades, scarf, bowtie, and angel wings.
  * **Treats**: Kibble, Royal Salmon (`100%` Hunger & Happiness), and **Catnip** (30s turbo zoomies with sparkles!).
  * **Toys**: Yarn ball on a physics string, Laser pointer, Wind-up pixel mouse, and a draggable Cardboard Box the cat hops inside.
  * **World**: 4 Popup Room Backgrounds (Window Room, Garden, Cyberpunk, Space), 3 Rare Skins (Siamese, Calico, Cyber Cat), and a **Mini-Kitten Buddy** that follows your cat everywhere (careful: if you pick up the mini-kitten by the scruff, the big cat will chase your cursor and leave a temporary claw scratch on screen!).
  * **Wheelie Shopping Cart** — Bought items drop into a pixel cart that pops a wheelie and zooms off to deliver your items to the Wardrobe.

### 🚀 Installation (Chrome / Edge / Brave)

1. Download `TabCat-v0.7.1.zip` from **Releases** (or clone/download this repository) and unzip it.
2. Open `chrome://extensions` in your browser.
3. Enable **Developer mode** (top-right toggle).
4. Click **Load unpacked** and select the unzipped folder containing `manifest.json`.
5. Open any website and say hi to your new cat! 🐾

---

## ✨ Возможности (Русский)

* **Пиксельный котик прямо в браузере** — работает в изолированном Shadow DOM (не ломает вёрстку сайтов), автоматически прячется в полноэкранном видео и поддерживает 4 чётких размера (`S` / `M` / `L` / `XL`).
* **Живые реакции на работу в браузере**:
  * **Закрытие вкладок** → котик радостно подпрыгивает (`+2 XP`, и `+1 🐟` за каждые 5 закрытых вкладок).
  * **Сонные сайты** → если долго сидеть на отвлекающих сайтах (список и таймер полностью настраиваются), котик зевает и сворачивается спать (`Zzz`). Возвращаешься к делам — бодро просыпается!
  * **Pomodoro-таймер** → пресеты `25/5`, `15/3` и `1/1 (тест)`. В фокусе котик надевает очки, а за завершённую сессию дарит **+5 🐟** и **+25 XP**.
* **Тамагочи и интерактив**:
  * **3 шкалы**: Сытость, Удовольствие и Бодрость.
  * **Анимация «за шкирку»** при перетаскивании + отдельные тумблеры для перетаскивания и свободных прогулок **по всему экрану**.
* **ЗооМагазин (`🛒`) и Гардероб (`👕`)** — открываются через выдвижное левое меню при наведении курсора:
  * **Одежда**: шапочки, кофточки, кибер-очки, шарф, бабочка и крылышки.
  * **Еда**: корм, королевский лосось (`100%` сытости и удовольствия) и **кошачья мята** (30 секунд турбо-беготни с блёстками!).
  * **Игрушки**: клубок на верёвочке с физикой маятника, лазерная указка, заводная мышка и перетаскиваемая картонная коробка.
  * **Мир**: 4 фона домика (Окно, Сад, Киберпанк, Космос), редкие скины (Сиамский, Трёхцветный, Кибер-кот) и **Мини-котёнок**, который бегает хвостиком за основным котом (осторожно: если схватить мини-котёнка за шкирку, большой кот разозлится, догонит курсор и оставит временную царапину на экране!).
  * **Пиксельная тележка** — покупки падают в тележку, она встаёт на задние колёсики и уезжает, а при возврате привозит обновки в гардероб.

### 🚀 Установка (Chrome / Edge / Brave)

1. Скачай `TabCat-v0.7.1.zip` из раздела **Releases** (или скачай репозиторий) и распакуй папку.
2. Открой `chrome://extensions`.
3. Включи **«Режим разработчика»** (переключатель справа сверху).
4. Нажми **«Загрузить распакованное расширение»** и выбери папку с `manifest.json`.
5. Открой любой сайт — котик уже ждёт тебя внизу экрана! (Язык можно переключить в **⚙️ Расширенные настройки**.)

---

## 📁 Project Structure

```text
TabCat/
├── manifest.json       # Chrome Extension Manifest V3
├── background.js       # Service Worker (tabs, sleepy sites, Pomodoro, shop, stats)
├── content.js          # Isolated Shadow DOM pet overlay, physics & toys
├── cat-sprites.js      # Original 24×20 pixel-art sprites, palettes, hats & sweaters
├── i18n.js             # English, Russian & Chinese translations
├── popup.html          # Popup UI (Left Dock: Menu, Pet Shop, Wardrobe)
├── popup.css           # Styles, animations, wheelie cart & room backgrounds
├── popup.js            # Popup controller & storage sync
└── icons/              # 16px, 48px, 128px extension icons
```

## 📄 License

Distributed under the [MIT License](LICENSE).
