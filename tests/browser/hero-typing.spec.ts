import { test, expect } from '@playwright/test'

interface TypingSample {
  time: number
  width: number
  y: number
  opacity: number[]
  phase: string
  cursorX: number
}

type SampleWindow = Window & { heroTypingSamples: Promise<TypingSample[]> }

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`hero typing stays stable and replays when returning home at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport)
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.addInitScript(() => {
      const rows: TypingSample[] = []
      let started = 0
      ;(window as SampleWindow).heroTypingSamples = new Promise((resolve) => {
        function sample() {
          const heading = document.querySelector<HTMLElement>('.hero-wordmark')
          if (!heading) {
            requestAnimationFrame(sample)
            return
          }
          started ||= performance.now()
          const bounds = heading.getBoundingClientRect()
          rows.push({
            time: performance.now() - started,
            width: bounds.width,
            y: bounds.y,
            phase: heading.className,
            cursorX: heading.querySelector('.hero-caret')!.getBoundingClientRect().x,
            opacity: [...heading.querySelectorAll('.hero-character-layer')].map(
              (element) => Number(getComputedStyle(element).opacity),
            ),
          })
          if (performance.now() - started < 3900) requestAnimationFrame(sample)
          else resolve(rows)
        }
        requestAnimationFrame(sample)
      })
    })
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    const samples = await page.evaluate(() => (window as SampleWindow).heroTypingSamples)

    const first = samples[0]!
    expect(samples.every((sample) => Math.abs(sample.width - first.width) < 0.1)).toBe(true)
    expect(samples.every((sample) => Math.abs(sample.y - first.y) < 0.1)).toBe(true)
    expect(samples.some((sample) => sample.opacity.some((opacity) => opacity > 0 && opacity < 1))).toBe(true)
    const holding = samples.filter((sample) => sample.phase.includes('typing-holding'))
    const settled = samples.filter((sample) => sample.phase.includes('typing-settled'))
    expect(holding.length).toBeGreaterThan(0)
    expect(settled.length).toBeGreaterThan(0)
    const finalCursorX = holding.at(-1)!.cursorX
    expect(settled.every((sample) => Math.abs(sample.cursorX - finalCursorX) < 0.1)).toBe(true)
    await expect(page.locator('.hero-wordmark')).toHaveClass(/typing-settled/)
    await expect(page.locator('.hero-caret')).toHaveCSS('opacity', '1')
    await expect(page.locator('.hero-caret-light')).toHaveCSS('animation-iteration-count', 'infinite')
    await expect(page.locator('.hero-wordmark-base')).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)

    await page.locator('.shortcut-nav a').first().click()
    await expect(page).toHaveURL(/\/about$/)
    await page.locator('.brand').click()
    await expect(page.locator('.hero-wordmark')).toHaveClass(/typing-typing/)
    await expect(page.locator('.hero-character-layer')).toHaveCount(7)
    // The cursor follows the actual capital-letter ink and stays aligned after resize.
    for (const size of [viewport, { width: viewport.width + 120, height: viewport.height }]) {
      await page.setViewportSize(size)
      await expect.poll(async () => page.evaluate(() => {
        const text = document.querySelector<HTMLElement>('.hero-wordmark-base')!
        const baseline = document.querySelector('.hero-baseline')!.getBoundingClientRect().top
        const cursor = document.querySelector('.hero-caret')!.getBoundingClientRect()
        const style = getComputedStyle(text)
        const context = document.createElement('canvas').getContext('2d')!
        context.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
        const metrics = context.measureText('RAINNER')
        const range = document.createRange()
        range.setStart(text.firstChild!, 0)
        range.setEnd(text.firstChild!, 7)
        return Math.max(
          Math.abs(cursor.x - range.getBoundingClientRect().right - 5),
          Math.abs(cursor.y - baseline + metrics.actualBoundingBoxAscent),
          Math.abs(cursor.height - metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent),
        )
      })).toBeLessThan(0.1)
    }
    expect(errors).toEqual([])
  })
}

test('reduced motion shows the complete hero immediately', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/', { waitUntil: 'networkidle' })
  await expect(page.getByRole('heading', { name: 'RAINNER', exact: true })).toBeVisible()
  await expect(page.locator('.hero-wordmark-base')).toBeVisible()
  await expect(page.locator('.hero-character-layer')).toHaveCount(0)
  await expect(page.locator('.hero-caret')).toBeHidden()
})
