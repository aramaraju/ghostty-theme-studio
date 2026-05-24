import { describe, it, expect } from 'vitest'
import { parse } from '../lib/parse'
import { defaultTheme } from '../store/themeStore'

describe('parse', () => {
  it('parses a full theme', () => {
    const text = `
background = #1e1e2e
foreground = #cdd6f4
cursor-color = #f5e0dc
selection-background = #585b70
selection-foreground = #cdd6f4
palette = 0=#45475a
palette = 1=#f38ba8
palette = 2=#a6e3a1
palette = 3=#f9e2af
palette = 4=#89b4fa
palette = 5=#f5c2e7
palette = 6=#94e2d5
palette = 7=#bac2de
palette = 8=#585b70
palette = 9=#f38ba8
palette = 10=#a6e3a1
palette = 11=#f9e2af
palette = 12=#89b4fa
palette = 13=#f5c2e7
palette = 14=#94e2d5
palette = 15=#a6ef8b
`
    const state = parse(text)
    expect(state.background).toBe('#1e1e2e')
    expect(state.foreground).toBe('#cdd6f4')
    expect(state.cursorColor).toBe('#f5e0dc')
    expect(state.selectionBackground).toBe('#585b70')
    expect(state.selectionForeground).toBe('#cdd6f4')
    expect(state.palette[0]).toBe('#45475a')
    expect(state.palette[15]).toBe('#a6ef8b')
  })

  it('ignores comments', () => {
    const text = `
# This is a comment
background = #1e1e2e
# Another comment
foreground = #cdd6f4
`
    const state = parse(text)
    expect(state.background).toBe('#1e1e2e')
    expect(state.foreground).toBe('#cdd6f4')
  })

  it('ignores blank lines', () => {
    const text = `

background = #1e1e2e

foreground = #cdd6f4

`
    const state = parse(text)
    expect(state.background).toBe('#1e1e2e')
  })

  it('ignores unknown keys', () => {
    const text = `
background = #1e1e2e
unknown-key = somevalue
another-unknown = #ffffff
`
    expect(() => parse(text)).not.toThrow()
    const state = parse(text)
    expect(state.background).toBe('#1e1e2e')
  })

  it('tolerates extra whitespace', () => {
    const text = `
background  =  #1e1e2e
  foreground = #cdd6f4
palette = 0 = #45475a
`
    const state = parse(text)
    expect(state.background).toBe('#1e1e2e')
  })

  it('tolerates quoted values', () => {
    const text = `
background = "#1e1e2e"
foreground = '#cdd6f4'
`
    const state = parse(text)
    expect(state.background).toBe('#1e1e2e')
    expect(state.foreground).toBe('#cdd6f4')
  })

  it('ignores malformed hex values, never crashes', () => {
    const text = `
background = not-a-color
foreground = #xyz123
`
    expect(() => parse(text)).not.toThrow()
    const state = parse(text)
    // Falls back to default
    expect(state.background).toBe(defaultTheme.background)
  })

  it('handles uppercase hex', () => {
    const text = `background = #1E1E2E`
    const state = parse(text)
    expect(state.background).toBe('#1e1e2e')
  })
})
