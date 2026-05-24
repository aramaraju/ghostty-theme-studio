import { useRef } from 'react'
import { useThemeStore } from '../store/themeStore'
import { serialize } from '../lib/serialize'
import { parse } from '../lib/parse'

export function ExportImport() {
  const store = useThemeStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = () => {
    const text = serialize(store)
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    const safeName = store.name.replace(/[^a-z0-9_-]/gi, '-').toLowerCase()
    a.href = url
    a.download = `${safeName}.ghostty`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      const parsed = parse(text)
      store.loadTheme(parsed)
    }
    reader.readAsText(file)
    // Reset input so same file can be re-imported
    e.target.value = ''
  }

  return (
    <div className="export-import" data-testid="export-import">
      <div className="theme-name-row">
        <label>
          Theme Name
          <input
            type="text"
            value={store.name}
            onChange={(e) => store.setName(e.target.value)}
            className="theme-name-input"
            data-testid="theme-name-input"
          />
        </label>
      </div>
      <div className="export-import-buttons">
        <button
          onClick={handleExport}
          className="btn btn-primary"
          data-testid="export-button"
        >
          Export .ghostty
        </button>
        <button
          onClick={handleImport}
          className="btn btn-secondary"
          data-testid="import-button"
        >
          Import .ghostty
        </button>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".ghostty,.txt"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        data-testid="file-input"
      />
    </div>
  )
}
