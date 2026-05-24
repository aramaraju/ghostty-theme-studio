import { test, expect } from '@playwright/test'
import * as path from 'path'
import * as fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FIXTURE_PATH = path.join(__dirname, '..', 'fixtures', 'mocha-latte.ghostty')

test.describe('Ghostty Theme Studio E2E', () => {
  test('loads and shows the app with default theme', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('[data-testid="app"]')).toBeVisible()
    await expect(page.locator('[data-testid="terminal-preview"]')).toBeVisible()
    await expect(page.locator('[data-testid="color-controls"]')).toBeVisible()
    await expect(page.locator('[data-testid="contrast-badge"]')).toBeVisible()
  })

  test('preview renders with default theme background', async ({ page }) => {
    await page.goto('/')
    const preview = page.locator('[data-testid="terminal-preview"]')
    await expect(preview).toBeVisible()
    // Default background is #1e1e2e
    const bg = await preview.evaluate((el) => getComputedStyle(el).backgroundColor)
    // rgb(30, 30, 46) = #1e1e2e
    expect(bg).toBe('rgb(30, 30, 46)')
  })

  test('change background color - preview updates', async ({ page }) => {
    await page.goto('/')

    // Change background color via the color picker text input
    const bgTextInput = page.locator('[data-testid="background-picker-text"]')
    await bgTextInput.fill('#ff0000')
    await bgTextInput.dispatchEvent('change')

    // Wait for preview to update
    await page.waitForTimeout(200)

    const preview = page.locator('[data-testid="terminal-preview"]')
    const bg = await preview.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(255, 0, 0)')
  })

  test('palette swatch updates when palette color changes', async ({ page }) => {
    await page.goto('/')

    // Change palette color 0 via text input
    const paletteTextInput = page.locator('[data-testid="palette-0-picker-text"]')
    await paletteTextInput.fill('#ff00ff')
    await paletteTextInput.dispatchEvent('change')

    await page.waitForTimeout(200)

    const swatch = page.locator('[data-testid="palette-swatch-0"]')
    const bg = await swatch.evaluate((el) => getComputedStyle(el).backgroundColor)
    expect(bg).toBe('rgb(255, 0, 255)')
  })

  test('export downloads a valid .ghostty file with 16 palette lines', async ({ page }) => {
    await page.goto('/')

    const downloadPromise = page.waitForEvent('download')
    await page.click('[data-testid="export-button"]')
    const download = await downloadPromise

    expect(download.suggestedFilename()).toMatch(/\.ghostty$/)

    const content = await download.createReadStream().then(
      (stream) =>
        new Promise<string>((resolve, reject) => {
          const chunks: Buffer[] = []
          stream.on('data', (c: Buffer) => chunks.push(c))
          stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
          stream.on('error', reject)
        })
    )

    // Check 16 palette lines
    const paletteLines = content
      .split('\n')
      .filter((l) => l.startsWith('palette = '))
    expect(paletteLines).toHaveLength(16)

    // Check named keys
    expect(content).toMatch(/^background = #[0-9a-f]{6}$/m)
    expect(content).toMatch(/^foreground = #[0-9a-f]{6}$/m)
    expect(content).toMatch(/^cursor-color = #[0-9a-f]{6}$/m)
    expect(content).toMatch(/^selection-background = #[0-9a-f]{6}$/m)
    expect(content).toMatch(/^selection-foreground = #[0-9a-f]{6}$/m)
  })

  test('import a fixture theme - controls populate', async ({ page }) => {
    await page.goto('/')

    // Load fixture
    const fixtureContent = fs.readFileSync(FIXTURE_PATH, 'utf-8')
    const fileInputLocator = page.locator('[data-testid="file-input"]')

    // Use page.evaluate to simulate file reading directly by injecting into the store
    // Since we can't easily trigger a real file input in headless, we'll use the
    // file input with setInputFiles
    await fileInputLocator.setInputFiles({
      name: 'mocha-latte.ghostty',
      mimeType: 'text/plain',
      buffer: Buffer.from(fixtureContent),
    })

    await page.waitForTimeout(300)

    // Check that background was set to fixture value
    const bgTextInput = page.locator('[data-testid="background-picker-text"]')
    const value = await bgTextInput.inputValue()
    expect(value).toBe('#1e1e2e')
  })

  test('import then re-export matches fixture after normalization', async ({ page }) => {
    await page.goto('/')

    const fixtureContent = fs.readFileSync(FIXTURE_PATH, 'utf-8')
    const fileInputLocator = page.locator('[data-testid="file-input"]')

    await fileInputLocator.setInputFiles({
      name: 'mocha-latte.ghostty',
      mimeType: 'text/plain',
      buffer: Buffer.from(fixtureContent),
    })

    await page.waitForTimeout(300)

    // Export
    const downloadPromise = page.waitForEvent('download')
    await page.click('[data-testid="export-button"]')
    const download = await downloadPromise

    const content = await download.createReadStream().then(
      (stream) =>
        new Promise<string>((resolve, reject) => {
          const chunks: Buffer[] = []
          stream.on('data', (c: Buffer) => chunks.push(c))
          stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')))
          stream.on('error', reject)
        })
    )

    // Normalize both for comparison
    const normalize = (s: string) => s.trim().split('\n').filter(Boolean).join('\n')
    expect(normalize(content)).toBe(normalize(fixtureContent))
  })

  test('contrast badge shows warning for low-contrast combo', async ({ page }) => {
    await page.goto('/')

    // Set fg and bg to very similar colors
    const fgInput = page.locator('[data-testid="foreground-picker-text"]')
    const bgInput = page.locator('[data-testid="background-picker-text"]')

    await bgInput.fill('#333333')
    await bgInput.dispatchEvent('change')
    await page.waitForTimeout(100)

    await fgInput.fill('#444444')
    await fgInput.dispatchEvent('change')
    await page.waitForTimeout(200)

    const warning = page.locator('[data-testid="contrast-warning"]').first()
    await expect(warning).toBeVisible()
  })

  test('base palette button switches theme', async ({ page }) => {
    await page.goto('/')

    // Click the Stone Grove palette button
    await page.click('[data-testid="palette-btn-stone-grove"]')
    await page.waitForTimeout(200)

    const preview = page.locator('[data-testid="terminal-preview"]')
    const bg = await preview.evaluate((el) => getComputedStyle(el).backgroundColor)
    // Stone Grove background is #282828 = rgb(40, 40, 40)
    expect(bg).toBe('rgb(40, 40, 40)')
  })
})
