/**
 * WCAG contrast ratio utilities.
 */

/**
 * Convert a hex color to relative luminance (WCAG 2.1).
 */
export function hexToLuminance(hex: string): number {
  const clean = hex.replace(/^#/, '')
  const r = parseInt(clean.slice(0, 2), 16) / 255
  const g = parseInt(clean.slice(2, 4), 16) / 255
  const b = parseInt(clean.slice(4, 6), 16) / 255

  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b)
}

/**
 * Compute WCAG contrast ratio between two hex colors.
 * Returns a value between 1 (no contrast) and 21 (max contrast).
 */
export function contrastRatio(hex1: string, hex2: string): number {
  const l1 = hexToLuminance(hex1)
  const l2 = hexToLuminance(hex2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export const WCAG_AA_NORMAL = 4.5
export const WCAG_AA_LARGE = 3.0

/**
 * Returns true if the contrast ratio is below the threshold (low contrast = bad).
 */
export function isLowContrast(
  fg: string,
  bg: string,
  threshold = WCAG_AA_NORMAL
): boolean {
  return contrastRatio(fg, bg) < threshold
}
