import { useThemeStore } from '../store/themeStore'
import { contrastRatio, isLowContrast, WCAG_AA_NORMAL } from '../lib/contrast'

interface ContrastRowProps {
  label: string
  fg: string
  bg: string
  threshold?: number
}

function ContrastRow({ label, fg, bg, threshold = WCAG_AA_NORMAL }: ContrastRowProps) {
  const ratio = contrastRatio(fg, bg)
  const low = ratio < threshold
  return (
    <div
      className={`contrast-row ${low ? 'contrast-low' : 'contrast-ok'}`}
      data-testid={`contrast-row-${label.replace(/\s+/g, '-').toLowerCase()}`}
    >
      <span className="contrast-label">{label}</span>
      <span
        className="contrast-swatch"
        style={{ background: bg, color: fg }}
      >
        Aa
      </span>
      <span className="contrast-ratio">{ratio.toFixed(2)}:1</span>
      {low && (
        <span className="contrast-warning" data-testid="contrast-warning">
          ⚠ Low contrast
        </span>
      )}
    </div>
  )
}

export function ContrastBadge() {
  const store = useThemeStore()

  const lowContrast = isLowContrast(store.foreground, store.background)

  return (
    <div
      className="contrast-badge"
      data-testid="contrast-badge"
      data-low-contrast={lowContrast}
    >
      <h3>Contrast Check (WCAG AA)</h3>
      <ContrastRow
        label="Foreground / Background"
        fg={store.foreground}
        bg={store.background}
      />
      <ContrastRow
        label="Selection FG / BG"
        fg={store.selectionForeground}
        bg={store.selectionBackground}
      />
      <ContrastRow
        label="Cursor / Background"
        fg={store.cursorColor}
        bg={store.background}
        threshold={3.0}
      />
    </div>
  )
}
