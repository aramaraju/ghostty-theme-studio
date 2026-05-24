import { describe, it, expect } from 'vitest'
import { contrastRatio, hexToLuminance, isLowContrast, WCAG_AA_NORMAL } from '../lib/contrast'

describe('hexToLuminance', () => {
  it('black has luminance 0', () => {
    expect(hexToLuminance('#000000')).toBeCloseTo(0, 5)
  })

  it('white has luminance 1', () => {
    expect(hexToLuminance('#ffffff')).toBeCloseTo(1, 5)
  })
})

describe('contrastRatio', () => {
  it('black on white = 21:1', () => {
    expect(contrastRatio('#000000', '#ffffff')).toBeCloseTo(21, 0)
  })

  it('white on white = 1:1', () => {
    expect(contrastRatio('#ffffff', '#ffffff')).toBeCloseTo(1, 5)
  })

  it('is symmetric', () => {
    const ratio1 = contrastRatio('#1e1e2e', '#cdd6f4')
    const ratio2 = contrastRatio('#cdd6f4', '#1e1e2e')
    expect(ratio1).toBeCloseTo(ratio2, 5)
  })

  it('default theme fg/bg has good contrast', () => {
    // Mocha Latte fg/bg should be reasonably readable
    const ratio = contrastRatio('#cdd6f4', '#1e1e2e')
    expect(ratio).toBeGreaterThan(8)
  })
})

describe('isLowContrast', () => {
  it('black on white is not low contrast', () => {
    expect(isLowContrast('#000000', '#ffffff')).toBe(false)
  })

  it('similar colors trip the low-contrast flag', () => {
    expect(isLowContrast('#333333', '#444444')).toBe(true)
  })

  it('custom threshold works', () => {
    // ratio ~3.9
    const fg = '#777777'
    const bg = '#ffffff'
    expect(isLowContrast(fg, bg, WCAG_AA_NORMAL)).toBe(true)
    expect(isLowContrast(fg, bg, 3.0)).toBe(false)
  })
})
