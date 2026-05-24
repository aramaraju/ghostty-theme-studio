import './App.css'
import { ColorControls } from './components/ColorControls'
import { TerminalPreview } from './components/TerminalPreview'
import { ContrastBadge } from './components/ContrastBadge'
import { ExportImport } from './components/ExportImport'

function App() {
  return (
    <div className="app" data-testid="app">
      <header className="app-header">
        <h1>Ghostty Theme Studio</h1>
        <p className="app-tagline">Design, preview, and export custom Ghostty terminal themes</p>
        <ExportImport />
      </header>
      <main className="app-main">
        <aside className="controls-panel">
          <ColorControls />
        </aside>
        <section className="preview-panel">
          <h2>Live Preview</h2>
          <TerminalPreview />
          <ContrastBadge />
        </section>
      </main>
    </div>
  )
}

export default App
