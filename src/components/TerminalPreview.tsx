import { useThemeStore } from '../store/themeStore'

export function TerminalPreview() {
  const store = useThemeStore()

  const style: React.CSSProperties = {
    background: store.background,
    color: store.foreground,
    fontFamily: '"Fira Code", "Cascadia Code", "JetBrains Mono", monospace',
    fontSize: '13px',
    lineHeight: '1.5',
    padding: '16px',
    borderRadius: '8px',
    minHeight: '400px',
    overflow: 'auto',
  }

  const p = store.palette

  return (
    <div className="terminal-preview" data-testid="terminal-preview" style={style}>
      {/* Prompt line */}
      <div>
        <span style={{ color: p[2] }}>user</span>
        <span style={{ color: store.foreground }}>@</span>
        <span style={{ color: p[4] }}>ghostty</span>
        <span style={{ color: store.foreground }}>:</span>
        <span style={{ color: p[4] }}>~</span>
        <span style={{ color: store.foreground }}>$ </span>
        <span style={{ color: p[7] }}>ls -la</span>
      </div>

      {/* ls output */}
      <div style={{ marginTop: '4px' }}>
        <span style={{ color: p[4] }}>drwxr-xr-x</span>
        <span style={{ color: store.foreground }}>  5 user  staff   160 Jan  1 12:00 </span>
        <span style={{ color: p[4] }}>.</span>
      </div>
      <div>
        <span style={{ color: p[4] }}>drwxr-xr-x</span>
        <span style={{ color: store.foreground }}>  3 user  staff    96 Jan  1 11:00 </span>
        <span style={{ color: p[4] }}>..</span>
      </div>
      <div>
        <span style={{ color: p[1] }}>-rw-r--r--</span>
        <span style={{ color: store.foreground }}>  1 user  staff  1234 Jan  1 12:00 </span>
        <span style={{ color: store.foreground }}>config</span>
      </div>
      <div>
        <span style={{ color: p[2] }}>-rw-r--r--</span>
        <span style={{ color: store.foreground }}>  1 user  staff   567 Jan  1 11:30 </span>
        <span style={{ color: p[2] }}>theme.ghostty</span>
      </div>

      {/* Git diff */}
      <div style={{ marginTop: '8px' }}>
        <span style={{ color: store.foreground }}>$ </span>
        <span style={{ color: p[7] }}>git diff</span>
      </div>
      <div style={{ color: p[3] }}>--- a/theme.ghostty</div>
      <div style={{ color: p[3] }}>+++ b/theme.ghostty</div>
      <div style={{ color: p[6] }}>@@ -1,3 +1,3 @@</div>
      <div style={{ color: p[1] }}>- background = #1e1e1e</div>
      <div style={{ color: p[2] }}>+ background = {store.background}</div>
      <div style={{ color: store.foreground }}>  foreground = {store.foreground}</div>

      {/* Error output */}
      <div style={{ marginTop: '8px' }}>
        <span style={{ color: store.foreground }}>$ </span>
        <span style={{ color: p[7] }}>cat missing.txt</span>
      </div>
      <div style={{ color: p[1] }}>cat: missing.txt: No such file or directory</div>

      {/* Selection demo */}
      <div style={{ marginTop: '8px' }}>
        <span style={{ color: store.foreground }}>$ </span>
        <span style={{ color: p[7] }}>echo &quot;Hello, terminal!&quot;</span>
      </div>
      <div>
        <span
          style={{
            background: store.selectionBackground,
            color: store.selectionForeground,
          }}
        >
          Hello, terminal!
        </span>
      </div>

      {/* Cursor demo */}
      <div style={{ marginTop: '8px' }}>
        <span style={{ color: store.foreground }}>$ </span>
        <span
          style={{
            background: store.cursorColor,
            color: store.background,
            fontWeight: 'bold',
          }}
        >
          {' '}
        </span>
      </div>

      {/* Palette swatches */}
      <div style={{ marginTop: '12px', display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
        {store.palette.map((color, i) => (
          <div
            key={i}
            data-testid={`palette-swatch-${i}`}
            title={`Color ${i}: ${color}`}
            style={{
              width: '20px',
              height: '20px',
              background: color,
              border: `1px solid ${store.foreground}22`,
              borderRadius: '2px',
            }}
          />
        ))}
      </div>
    </div>
  )
}
