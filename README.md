# Ghostty Theme Studio

A visual editor to design, live-preview, and export custom [Ghostty](https://ghostty.org) terminal themes.

> **Live demo:** [https://aramaraju.github.io/ghostty-theme-studio/](https://aramaraju.github.io/ghostty-theme-studio/) *(deploy pending)*

## The problem

Ghostty is configured by a plain text file. Browsing existing themes is solved — Ghostty ships with hundreds. What's missing is a fast way to **create and tune a custom theme**: pick colors, see them rendered as a real terminal would, and export a valid theme file — without trial-and-error edits and reloads.

## What this does

- **Live terminal preview** that updates as you change any color — prompt colors, diff output, selection, cursor, all 16 ANSI palette slots.
- **Export** a valid Ghostty theme file (correct keys + `palette = N=#hex` lines, hex normalized to 6-digit lowercase).
- **Import** an existing theme file → populate the editor. Round-trips with export.
- **3 bundled base palettes** to start from:
  - *Mocha Latte* — warm pastel darks (inspired by Catppuccin Mocha)
  - *Stone Grove* — earthy retro (inspired by Gruvbox Dark)
  - *Midnight Ocean* — cool arctic blues (inspired by Nord)
- **WCAG contrast checker** — flags fg/bg pairs below AA threshold in real time.

## Run locally

```bash
git clone https://github.com/aramaraju/ghostty-theme-studio.git
cd ghostty-theme-studio
npm install
npm run dev
```

## Test / verify

```bash
npm run verify
# Runs: tsc --noEmit + eslint + vitest + vite build + playwright test
```

## Tech stack

- **React 19 + TypeScript** via Vite
- **Zustand** for state management
- **Vitest** for unit tests (serialize/parse round-trip, contrast ratios)
- **Playwright** for e2e tests
- No backend — static SPA, deployable to GitHub Pages

## Ghostty theme file format

```
background = #1e1e2e
foreground = #cdd6f4
cursor-color = #f5e0dc
selection-background = #585b70
selection-foreground = #cdd6f4
palette = 0=#45475a
palette = 1=#f38ba8
...
palette = 15=#a6ef8b
```

*Theme name goes in your Ghostty config as `theme = "My Theme"` — the theme file itself has no header.*

## Attribution

Base palette inspirations:
- [Catppuccin](https://github.com/catppuccin/catppuccin) (MIT) — color philosophy for Mocha Latte
- [Gruvbox](https://github.com/morhetz/gruvbox) (MIT) — earthy palette philosophy for Stone Grove
- [Nord](https://github.com/nordtheme/nord) (MIT) — arctic color system for Midnight Ocean

All palettes in this editor are original implementations with modified values.
