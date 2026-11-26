# 🐾 TabCat v1.0.0 — Pixel Browser Pet & Tamagotchi Extension

> A cozy, **zero-dependency, 100% local** browser extension (Manifest V3) featuring an original pixel-art cat that lives on your tabs — reacting to music, tab overload, fast scrolling, closed tabs, distracting sites, and Pomodoro focus sessions.

**Browsers:** Chrome · Edge · Brave · Yandex · Opera / Opera GX · Mozilla Firefox  
**Languages / Языки:** 🇬🇧 English (default) · 🇷🇺 Русский · 🇨🇳 中文  
**Privacy:** 100% offline & local (`chrome.storage.local` only — zero analytics, zero tracking, zero external servers).

---

## ✨ Features (English)

* **Pixel-Art Browser Companion** — Runs in an isolated Shadow DOM (never breaks page styles), auto-hides in fullscreen video/games, supports **1-click "Hide on this site"**, and scales cleanly across 4 crisp integer sizes (`2×` / `3×` / `4×` / `5×`).
* **Living Browser Reactions**:
  * 🎧 **Music Vibing (`tab.audible`)** — When audio plays on your active tab, your cat puts on pixel headphones, bobs its head, spawns floating notes (`♪ ♫`), and unlocks **Secret Headphones** in the Pet Shop!
  * 💦 **Tab Overload (`≥15` tabs)** — Too many tabs in your window? Your cat starts sweating and celebrates once you tidy them up.
  * 💨 **Fast Scroll Wind** — Scroll rapidly down long pages and watch your cat lean back against the wind gust.
  * 🗂️ **Tab Cleanup Rewards** — Close tabs to make your cat hop with joy (`+2 XP` per tab, `+1 🐟` every 5 closed tabs).
  * 💤 **Sleepy Sites** — Linger too long on distracting sites (YouTube, TikTok, Reddit, etc., fully customizable) and your cat yawns and falls asleep (`Zzz`).
  * 🍅 **Pomodoro Focus Timer** — Presets (`25/5`, `15/3`, `1/1 test`). Your cat wears study glasses while you focus and rewards **+5 🐟** & **+25 XP** per completed session.
* **Mini-Game, Quests & Daily Streak**:
  * 🎮 **"Catch Fish" Mini-Game** — 15-second arcade right inside the popup: move your pixel cat with mouse or `A`/`D` / arrow keys, catch falling `🐟`, and dodge scary `🥒` cucumbers for bonus fish & XP.
  * 🔥 **Daily Streak & Daily Quests** — Claim daily streak bonuses (Day 1 → `+1 🐟` up to Day 7 → `+10 🐟`), complete daily quests, and unlock exclusive achievement rewards (**Golden Cat** & **Angel Halo**).
* **Pet Shop (`🛒`) & Wardrobe (`👕`)**:
  * 🎁 **Free v1.0 Release Celebration Pack** — Claim a free festive bundle in the Shop (**Party Hat 🎉 + Party Knit 🎊 + Star Shades ⭐**).
  * **Clothes & Accessories**: Pixel hats, sweaters, **Clear Minimalist Glasses**, **Retro Shades**, Cyber Shades, Scarf, Bowtie, Angel Wings, and **Secret Headphones**.
  * **Treats**: Kibble, Royal Salmon (`100%` Hunger & Happiness), and **Catnip** (30s turbo zoomies with sparkles!).
  * **Interactive Toys**: Physics Yarn Ball, Laser Pointer, Wind-up Mouse, and proportionally-scaled draggable **Cardboard Box**, **Trampoline** (with 360° flips!), and **Cozy Cat Bed**.
  * **World & Skins**: 4 Room Backgrounds (Window, Garden, Cyberpunk, Space), 6 Rare Skins (**Siamese, Calico, Cyber, Ghost Cat with cyan glow, Astro Cat, Golden**), and a **Mini-Kitten Buddy** (pick up the kitten by the scruff and the big cat will sprint to rescue it!).
  * 📸 **Pet Card Snapshot (PNG)** — Export a shareable 600×420 pixel-art card of your cat, outfit, level, stats, and room background directly from the Wardrobe.
  * 💾 **Export / Import Save** — Back up or transfer your progress (`tabcat-save.json`) between browsers or PCs.

### 🚀 Installation

#### Chrome / Edge / Brave / Yandex / Opera
1. Download `TabCat-v1.0.0.zip` (or `TabCat-Opera-v1.0.0.zip` for Opera) from **Releases** and unzip it.
2. Open `chrome://extensions` (or `opera://extensions` / `edge://extensions`).
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the unzipped folder containing `manifest.json`.
5. Open any website and say hi to your new cat! 🐾

#### Mozilla Firefox
1. Download `TabCat-Firefox-v1.0.0.zip` from **Releases**.
2. Open `about:debugging#/runtime/this-firefox` → **Load Temporary Add-on...** → select `TabCat-Firefox-v1.0.0.zip` (or install from Firefox Add-ons once published).

---

## ✨ Возможности (Русский)

* **Пиксельный котик прямо в браузере** — работает в изолированном Shadow DOM (не ломает вёрстку сайтов), прячется в полноэкранном видео, умеет **скрываться на конкретном сайте в 1 клик** и поддерживает 4 чётких размера (`2×` / `3×` / `4×` / `5×`).
* **Живые реакции на браузер**:
  * 🎧 **Реакция на музыку (`tab.audible`)** — когда на вкладке играет звук, котик надевает пиксельные наушники, качает головой под нотки `♪ ♫` и открывает **секретные наушники** в магазине!
  * 💦 **Перегруз вкладок (`≥15` вкладок)** — котик начинает потеть и радуется, когда ты наводишь порядок во вкладках.
  * 💨 **Ветер от быстрого скролла** — при резкой прокрутке страницы котика забавно сдувает ветром.
  * 🗂️ **Награды за закрытие вкладок** — `+2 XP` за вкладку и `+1 🐟` за каждые 5 закрытых вкладок.
  * 💤 **Сонные сайты и 🍅 Pomodoro** — котик засыпает на отвлекающих сайтах, а во время Pomodoro-фокуса надевает очки и приносит **+5 🐟** и **+25 XP**.
* **Мини-игра, квесты и ежедневный стрик**:
  * 🎮 **Мини-игра «Лови рыбки»** — 15-секундная аркада прямо в Popup: лови падающие `🐟` и уворачивайся от страшных огурцов `🥒`!
  * 🔥 **Daily Streak и Квесты** — заходи каждый день за бонусом (от `+1 🐟` до `+10 🐟` на 7-й день) и открывай ачивки (**Золотой кот** и **Нимб**).
* **ЗооМагазин (`🛒`) и Гардероб (`👕`)**:
  * 🎁 **Бесплатный праздничный набор v1.0** — забери бесплатно в магазине (**Колпак 🎉 + Праздничный свитер 🎊 + Звёздные очки ⭐**).
  * **Одежда и аксессуары**: шапочки, кофточки, полупрозрачные **Минимал-очки**, **Ретро-очки**, кибер-очки, шарф, бабочка, крылышки и **секретные наушники**.
  * **Еда и игрушки**: корм, лосось, кошачья мята, клубок на верёвочке, лазер, мышка, а также перетаскиваемые и масштабируемые **коробка**, **батут** (с сальто 360°!) и **лежанка**.
  * **Мир и редкие скины**: 4 фона домика, 6 редких скинов (**Сиамский, Трёхцветный, Кибер-кот, светящийся Кот-призрак, Кот-космонавт, Золотой**) и **Мини-котёнок**.
  * 📸 **«Сфоткать котика» (PNG-карточка)** — сохраняй красивую пиксельную карточку `600×420` с твоим котиком, его нарядом, именем, уровнем и фоном домика прямо из Гардероба.
  * 💾 **Экспорт / Импорт сохранения (`tabcat-save.json`)** — переноси прогресс между браузерами и ПК.

### 🚀 Установка (Chrome / Edge / Brave / Яндекс / Opera / Firefox)

1. Скачай нужный архив (`TabCat-v1.0.0.zip`, `TabCat-Opera-v1.0.0.zip` или `TabCat-Firefox-v1.0.0.zip`) из раздела **Releases** и распакуй его.
2. Открой `chrome://extensions` (или `opera://extensions` / `browser://extensions`).
3. Включи **«Режим разработчика»** (справа сверху).
4. Нажми **«Загрузить распакованное расширение»** и выбери папку с `manifest.json`.
5. Открой любой сайт — котик уже ждёт тебя! (Язык переключается в **⚙️ Расширенные настройки**.)

---

## 📁 Project Structure

```text
TabCat/
├── manifest.json       # Chrome / Edge / Opera Manifest V3
├── background.js       # Service Worker (tabs, audio, overload, Pomodoro, shop, quests, streak)
├── content.js          # Isolated Shadow DOM pet overlay, physics, reactions & toys
├── cat-sprites.js      # Original 24×20 pixel-art sprites, skins, hats, sweaters & accessories
├── i18n.js             # English, Russian & Chinese translations
├── popup.html          # Popup UI (Menu, Catch Fish mini-game, Shop, Wardrobe, Quests)
├── popup.css           # Styles, animations, wheelie cart & room backgrounds
├── popup.js            # Popup controller, PNG card exporter, save export/import & sync
├── icons/              # 16px, 48px, 128px extension icons
└── firefox-port/       # Mozilla Firefox (AMO) Manifest V3 build
```

## 📄 License

Distributed under the [MIT License](LICENSE).
