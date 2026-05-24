import { describe, it, expect } from 'vitest'
import { serialize } from '../lib/serialize'
import { parse } from '../lib/parse'
import { defaultTheme } from '../store/themeStore'
import { bundledPalettes } from '../palettes'
import type { ThemeState } from '../store/themeStore'

function roundTrip(state: ThemeState): ThemeState {
  return parse(serialize(state))
}

// Utility: pick a random hex color
function randomHex(): string {
  const r = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0')
  const g = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0')
  const b = Math.floor(Math.random() * 256)
    .toString(16)
    .padStart(2, '0')
  return `#${r}${g}${b}`
}

function randomTheme(): ThemeState {
  return {
    name: 'Random Theme',
    background: randomHex(),
    foreground: randomHex(),
    cursorColor: randomHex(),
    selectionBackground: randomHex(),
    selectionForeground: randomHex(),
    palette: Array.from({ length: 16 }, randomHex) as ThemeState['palette'],
  }
}

describe('round-trip: parse(serialize(state)) deepEquals state', () => {
  it('default theme', () => {
    const result = roundTrip(defaultTheme)
    expect(result.background).toBe(defaultTheme.background)
    expect(result.foreground).toBe(defaultTheme.foreground)
    expect(result.cursorColor).toBe(defaultTheme.cursorColor)
    expect(result.selectionBackground).toBe(defaultTheme.selectionBackground)
    expect(result.selectionForeground).toBe(defaultTheme.selectionForeground)
    expect(result.palette).toEqual(defaultTheme.palette)
  })

  for (const palette of bundledPalettes) {
    it(`bundled palette: ${palette.name}`, () => {
      const result = roundTrip(palette)
      expect(result.background).toBe(palette.background)
      expect(result.foreground).toBe(palette.foreground)
      expect(result.cursorColor).toBe(palette.cursorColor)
      expect(result.selectionBackground).toBe(palette.selectionBackground)
      expect(result.selectionForeground).toBe(palette.selectionForeground)
      expect(result.palette).toEqual(palette.palette)
    })
  }

  it('random valid themes (property test, 20 iterations)', () => {
    for (let i = 0; i < 20; i++) {
      const theme = randomTheme()
      const result = roundTrip(theme)
      expect(result.background).toBe(theme.background)
      expect(result.foreground).toBe(theme.foreground)
      expect(result.cursorColor).toBe(theme.cursorColor)
      expect(result.selectionBackground).toBe(theme.selectionBackground)
      expect(result.selectionForeground).toBe(theme.selectionForeground)
      expect(result.palette).toEqual(theme.palette)
    }
  })
})
