import type { ThemeState } from '../store/themeStore'

/**
 * Normalize a hex color to 6-digit lowercase.
 * Throws if the value is not a valid 6-digit hex color.
 */
export function normalizeHex(hex: string): string {
  const trimmed = hex.trim().replace(/^#/, '')
  if (!/^[0-9a-fA-F]{6}$/.test(trimmed)) {
    throw new Error(`Invalid hex color: ${hex}`)
  }
  return `#${trimmed.toLowerCase()}`
}

/**
 * Serialize a ThemeState into Ghostty theme file text.
 *
 * Rules:
 * - Named keys: background, foreground, cursor-color, selection-background, selection-foreground
 * - Exactly 16 palette = N=#RRGGBB lines, N in order 0–15
 * - All hex values normalized to 6-digit lowercase
 * - No duplicate keys
 */
export function serialize(state: ThemeState): string {
  const lines: string[] = []

  lines.push(`background = ${normalizeHex(state.background)}`)
  lines.push(`foreground = ${normalizeHex(state.foreground)}`)
  lines.push(`cursor-color = ${normalizeHex(state.cursorColor)}`)
  lines.push(`selection-background = ${normalizeHex(state.selectionBackground)}`)
  lines.push(`selection-foreground = ${normalizeHex(state.selectionForeground)}`)

  for (let i = 0; i < 16; i++) {
    lines.push(`palette = ${i}=${normalizeHex(state.palette[i])}`)
  }

  return lines.join('\n') + '\n'
}
