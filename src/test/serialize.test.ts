import { describe, it, expect } from 'vitest'
import { serialize, normalizeHex } from '../lib/serialize'
import { defaultTheme } from '../store/themeStore'
import type { ThemeState } from '../store/themeStore'

describe('normalizeHex', () => {
  it('lowercases hex', () => {
    expect(normalizeHex('#AABBCC')).toBe('#aabbcc')
  })

  it('handles lowercase', () => {
    expect(normalizeHex('#1e1e2e')).toBe('#1e1e2e')
  })

  it('works without leading #', () => {
    expect(normalizeHex('1e1e2e')).toBe('#1e1e2e')
  })

  it('throws on invalid hex', () => {
    expect(() => normalizeHex('#gggggg')).toThrow()
    expect(() => normalizeHex('xyz')).toThrow()
    expect(() => normalizeHex('#12345')).toThrow()
  })
})

describe('serialize', () => {
  it('produces exactly 16 palette lines in order', () => {
    const text = serialize(defaultTheme)
    const paletteLines = text
      .split('\n')
      .filter((l) => l.startsWith('palette = '))
    expect(paletteLines).toHaveLength(16)
    paletteLines.forEach((line, i) => {
      expect(line).toMatch(new RegExp(`^palette = ${i}=#[0-9a-f]{6}$`))
    })
  })

  it('produces all named keys', () => {
    const text = serialize(defaultTheme)
    expect(text).toMatch(/^background = #[0-9a-f]{6}$/m)
    expect(text).toMatch(/^foreground = #[0-9a-f]{6}$/m)
    expect(text).toMatch(/^cursor-color = #[0-9a-f]{6}$/m)
    expect(text).toMatch(/^selection-background = #[0-9a-f]{6}$/m)
    expect(text).toMatch(/^selection-foreground = #[0-9a-f]{6}$/m)
  })

  it('has no duplicate named keys (palette key appears 16 times, that is expected)', () => {
    const text = serialize(defaultTheme)
    const lines = text.split('\n').filter(Boolean)
    const namedKeys = lines
      .filter((l) => !l.startsWith('palette'))
      .map((l) => l.split(' = ')[0])
    const unique = new Set(namedKeys)
    expect(unique.size).toBe(namedKeys.length)
    // Exactly 5 named keys
    expect(namedKeys.length).toBe(5)
    // palette appears 16 times
    const paletteLines = lines.filter((l) => l.startsWith('palette'))
    expect(paletteLines.length).toBe(16)
  })

  it('normalizes hex to 6-digit lowercase', () => {
    const theme: ThemeState = {
      ...defaultTheme,
      background: '#1E1E2E',
    }
    const text = serialize(theme)
    expect(text).toContain('background = #1e1e2e')
  })

  it('ends with a newline', () => {
    const text = serialize(defaultTheme)
    expect(text.endsWith('\n')).toBe(true)
  })
})
