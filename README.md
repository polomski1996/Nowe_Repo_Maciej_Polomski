# Maciej Polomski — Portfolio

Stack: **Vite + React + Tailwind CSS**.

## Run locally

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Structure

- `index.html` — Vite entry
- `src/main.jsx` — React mount
- `src/App.jsx` — page composition
- `src/CanvasBg.jsx` — animated canvas background (grid + glyphs + scanline + crosshair)
- `src/i18n.js` — Polish (default) + English copy
- `src/index.css` — Tailwind + small custom utilities
- `public/maciej.png` — your photo
- `tailwind.config.js` — palette: cream `#e8d8c9`, slate `#4b607f`, ember `#f3701e`

## Design notes

- Retro-Japanese poster vibe: Archivo Black display, JetBrains Mono labels, Space Grotesk body.
- Language toggle PL / EN in the top-right pill nav. Persists in `localStorage`.
- Static preview (no build step required) lives in `preview.html`.
