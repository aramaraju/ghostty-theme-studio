/**
 * Takes marketing screenshots for the README.
 * Run with: node scripts/screenshots.mjs
 * Requires the dev server to be running on port 5173.
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../assets/screenshots');
const BASE = 'http://localhost:5173';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1280, height: 800 });

// ── 1. Main view (Mocha Latte default) ────────────────────────────────────
await page.goto(BASE, { waitUntil: 'networkidle' });
await page.waitForSelector('text=LIVE PREVIEW');
await page.screenshot({ path: `${OUT}/main.png`, fullPage: false });
console.log('✓ main.png');

// ── 2. Stone Grove palette ─────────────────────────────────────────────────
await page.click('button:has-text("Stone Grove")');
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/stone-grove.png`, fullPage: false });
console.log('✓ stone-grove.png');

// ── 3. Midnight Ocean palette ──────────────────────────────────────────────
await page.click('button:has-text("Midnight Ocean")');
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/midnight-ocean.png`, fullPage: false });
console.log('✓ midnight-ocean.png');

// ── 4. Contrast warning (near-identical fg/bg) ─────────────────────────────
await page.click('button:has-text("Mocha Latte")');
await page.waitForTimeout(200);
// Set foreground to almost same as background
const fgInput = page.locator('input[type="text"]').nth(1); // foreground hex
await fgInput.fill('#1f1e2e');
await fgInput.dispatchEvent('input');
await fgInput.dispatchEvent('change');
await page.waitForTimeout(300);
// Scroll down to show contrast panel
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(200);
await page.screenshot({ path: `${OUT}/contrast-warning.png`, fullPage: false });
console.log('✓ contrast-warning.png');

await browser.close();
console.log('\nAll screenshots saved to assets/screenshots/');
