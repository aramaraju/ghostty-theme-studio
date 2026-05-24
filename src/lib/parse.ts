import type { ThemeState } from '../store/themeStore'
import { defaultTheme } from '../store/themeStore'

/**
 * Parse a hex color string (with or without #, quoted or unquoted).
 * Returns null if invalid.
 */
function parseHex(raw: string): string | null {
  const cleaned = raw.trim().replace(/^["']|["']$/g, '').trim()
  const withoutHash = cleaned.replace(/^#/, '')
  if (/^[0-9a-fA-F]{6}$/.test(withoutHash)) {
    return `#${withoutHash.toLowerCase()}`
  }
  // Expand 3-digit shorthand
  if (/^[0-9a-fA-F]{3}$/.test(withoutHash)) {
    const r = withoutHash[0]
    const g = withoutHash[1]
    const b = withoutHash[2]
    return `#${(r + r + g + g + b + b).toLowerCase()}`
  }
  return null
}

/**
 * Parse Ghostty theme file text into ThemeState.
 *
 * - Ignores comments (lines starting with #)
 * - Ignores blank lines
 * - Ignores unknown keys
 * - Tolerates extra whitespace and quoted/unquoted values
 * - Malformed hex values are ignored (default used), never crashes
 */
export function parse(text: string): ThemeState {
  const state: ThemeState = {
    name: defaultTheme.name,
    background: defaultTheme.background,
    foreground: defaultTheme.foreground,
    cursorColor: defaultTheme.cursorColor,
    selectionBackground: defaultTheme.selectionBackground,
    selectionForeground: defaultTheme.selectionForeground,
    palette: [...defaultTheme.palette] as ThemeState['palette'],
  }

  const lines = text.split('\n')

  for (const rawLine of lines) {
    const line = rawLine.trim()

    // Skip blank lines and comments
    if (!line || line.startsWith('#')) continue

    // Split on first '='
    const eqIdx = line.indexOf('=')
    if (eqIdx === -1) continue

    const key = line.slice(0, eqIdx).trim()
    const value = line.slice(eqIdx + 1).trim()

    if (key === 'background') {
      const hex = parseHex(value)
      if (hex) state.background = hex
    } else if (key === 'foreground') {
      const hex = parseHex(value)
      if (hex) state.foreground = hex
    } else if (key === 'cursor-color') {
      const hex = parseHex(value)
      if (hex) state.cursorColor = hex
    } else if (key === 'selection-background') {
      const hex = parseHex(value)
      if (hex) state.selectionBackground = hex
    } else if (key === 'selection-foreground') {
      const hex = parseHex(value)
      if (hex) state.selectionForeground = hex
    } else if (key === 'palette') {
      // value is like "N=#RRGGBB" or "N = #RRGGBB"
      const paletteEqIdx = value.indexOf('=')
      if (paletteEqIdx === -1) continue
      const indexStr = value.slice(0, paletteEqIdx).trim()
      const colorStr = value.slice(paletteEqIdx + 1).trim()
      const index = parseInt(indexStr, 10)
      if (isNaN(index) || index < 0 || index > 15) continue
      const hex = parseHex(colorStr)
      if (hex) state.palette[index] = hex
    }
    // Unknown keys are silently ignored
  }

  return state
}
