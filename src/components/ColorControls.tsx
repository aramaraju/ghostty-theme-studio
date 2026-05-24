import { useThemeStore } from '../store/themeStore'
import { bundledPalettes } from '../palettes'

interface ColorFieldProps {
  label: string
  value: string
  onChange: (color: string) => void
  testId?: string
}

function ColorField({ label, value, onChange, testId }: ColorFieldProps) {
  return (
    <div className="color-field">
      <label>
        <span className="color-label">{label}</span>
        <div className="color-input-group">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            data-testid={testId}
            aria-label={label}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => {
              const v = e.target.value
              if (/^#[0-9a-fA-F]{6}$/.test(v)) onChange(v)
            }}
            className="color-hex-input"
            maxLength={7}
            data-testid={testId ? `${testId}-text` : undefined}
          />
        </div>
      </label>
    </div>
  )
}

export function ColorControls() {
  const store = useThemeStore()

  return (
    <div className="color-controls" data-testid="color-controls">
      <div className="controls-section">
        <h2>Base Colors</h2>
        <ColorField
          label="Background"
          value={store.background}
          onChange={store.setBackground}
          testId="background-picker"
        />
        <ColorField
          label="Foreground"
          value={store.foreground}
          onChange={store.setForeground}
          testId="foreground-picker"
        />
        <ColorField
          label="Cursor"
          value={store.cursorColor}
          onChange={store.setCursorColor}
          testId="cursor-picker"
        />
        <ColorField
          label="Selection BG"
          value={store.selectionBackground}
          onChange={store.setSelectionBackground}
          testId="selection-bg-picker"
        />
        <ColorField
          label="Selection FG"
          value={store.selectionForeground}
          onChange={store.setSelectionForeground}
          testId="selection-fg-picker"
        />
      </div>

      <div className="controls-section">
        <h2>Palette (0–15)</h2>
        <div className="palette-grid">
          {store.palette.map((color, i) => (
            <ColorField
              key={i}
              label={`Color ${i}`}
              value={color}
              onChange={(c) => store.setPaletteColor(i, c)}
              testId={`palette-${i}-picker`}
            />
          ))}
        </div>
      </div>

      <div className="controls-section">
        <h2>Base Palettes</h2>
        <div className="palette-buttons">
          {bundledPalettes.map((palette) => (
            <button
              key={palette.name}
              onClick={() => store.loadTheme(palette)}
              className="palette-button"
              data-testid={`palette-btn-${palette.name.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <span
                className="palette-preview-dot"
                style={{ background: palette.background }}
              />
              <span
                className="palette-preview-dot"
                style={{ background: palette.foreground }}
              />
              {palette.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
