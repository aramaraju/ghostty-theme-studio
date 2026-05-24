import type { ThemeState } from '../store/themeStore'

/**
 * Bundled base palettes.
 * These are original palettes inspired by popular color schemes.
 * Full credit to the original creators; these use distinct names and modified colors.
 */

/**
 * Mocha Latte — inspired by Catppuccin Mocha
 * A warm, muted dark theme with pastel accents.
 */
export const mochaLatte: ThemeState = {
  name: 'Mocha Latte',
  background: '#1e1e2e',
  foreground: '#cdd6f4',
  cursorColor: '#f5e0dc',
  selectionBackground: '#585b70',
  selectionForeground: '#cdd6f4',
  palette: [
    '#45475a',
    '#f38ba8',
    '#a6e3a1',
    '#f9e2af',
    '#89b4fa',
    '#f5c2e7',
    '#94e2d5',
    '#bac2de',
    '#585b70',
    '#f38ba8',
    '#a6e3a1',
    '#f9e2af',
    '#89b4fa',
    '#f5c2e7',
    '#94e2d5',
    '#a6ef8b',
  ],
}

/**
 * Stone Grove — inspired by Gruvbox Dark
 * Earthy, retro-style palette with warm orange/yellow accents.
 */
export const stoneGrove: ThemeState = {
  name: 'Stone Grove',
  background: '#282828',
  foreground: '#ebdbb2',
  cursorColor: '#ebdbb2',
  selectionBackground: '#504945',
  selectionForeground: '#ebdbb2',
  palette: [
    '#282828',
    '#cc241d',
    '#98971a',
    '#d79921',
    '#458588',
    '#b16286',
    '#689d6a',
    '#a89984',
    '#928374',
    '#fb4934',
    '#b8bb26',
    '#fabd2f',
    '#83a598',
    '#d3869b',
    '#8ec07c',
    '#ebdbb2',
  ],
}

/**
 * Midnight Ocean — inspired by Nord
 * Cool arctic blues and soft contrasts for a serene editing experience.
 */
export const midnightOcean: ThemeState = {
  name: 'Midnight Ocean',
  background: '#2e3440',
  foreground: '#d8dee9',
  cursorColor: '#d8dee9',
  selectionBackground: '#4c566a',
  selectionForeground: '#d8dee9',
  palette: [
    '#3b4252',
    '#bf616a',
    '#a3be8c',
    '#ebcb8b',
    '#81a1c1',
    '#b48ead',
    '#88c0d0',
    '#e5e9f0',
    '#4c566a',
    '#bf616a',
    '#a3be8c',
    '#ebcb8b',
    '#81a1c1',
    '#b48ead',
    '#8fbcbb',
    '#eceff4',
  ],
}

export const bundledPalettes: ThemeState[] = [mochaLatte, stoneGrove, midnightOcean]
