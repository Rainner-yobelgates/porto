import { test, expect } from '@playwright/test'
import type { Page } from '@playwright/test'

async function visit(page: Page, path: string) {
  return page.goto(path, { waitUntil: 'networkidle' })
}

test('search keyboard, ranked results, categories, history and persistence', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  await visit(page, '/')
  await expect(page.getByRole('heading', { name: 'RAINNER', exact: true })).toBeVisible()
  await page.keyboard.press('Control+k')
  const input = page.getByRole('combobox')
  await expect(input).toBeFocused()
  await expect(page.getByRole('listbox')).toBeVisible()
  await input.fill('Nest')
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL(/search\?q=NestJS/)
  await expect(page.locator('.search-result').first()).toContainText('NestJS')
  await page
    .getByRole('navigation', { name: 'Filter search results' })
    .getByRole('link', { name: 'Projects', exact: true })
    .click()
  await expect(page.getByRole('heading', { name: 'No matches just yet.' })).toBeVisible()
  await page.reload()
  await input.fill('')
  await input.focus()
  await expect(page.getByRole('listbox')).toContainText('NestJS')
  await page.getByRole('option', { name: 'NestJS', exact: true }).click()
  await expect(page.locator('.search-result')).toHaveCount(1)
  await input.fill('wms')
  await input.press('Escape')
  await expect(page.getByRole('listbox')).toBeHidden()
  await input.press('Enter')
  await expect(page.locator('.search-result').first()).toContainText('Warehouse Management System')
  await page.getByRole('button', { name: 'Clear all', exact: true }).click()
  await expect(page).toHaveURL(/\/$/)
  expect(new URL(page.url()).search).toBe('')
  await page.reload()
  await page.getByRole('combobox').focus()
  await expect(page.getByRole('button', { name: 'Clear all', exact: true })).toBeHidden()
  expect(errors).toEqual([])
})

test('routes, project filtering, details, tabs, SEO, missing content and desktop screenshot', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error' && !message.text().includes('404')) errors.push(message.text())
  })
  for (const route of [
    '/about',
    '/projects',
    '/skills',
    '/experience',
    '/contact',
    '/search?q=Laravel',
  ]) {
    const response = await visit(page, route)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('aside, .sidebar, .drawer-backdrop')).toHaveCount(0)
    const main = await page.locator('main').boundingBox()
    expect(Math.abs(main!.x + main!.width / 2 - 720)).toBeLessThan(2)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', /Rainner/)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    if (['/about', '/skills', '/contact'].includes(route))
      await page.screenshot({ path: `test-results/${route.slice(1)}-desktop.png`, fullPage: true })
  }
  await visit(page, '/skills')
  expect(await page.locator('.skills-grid').innerText()).not.toMatch(/\d+%|proficiency|rating/i)
  await visit(page, '/projects')
  await page.getByRole('button', { name: 'Freelance', exact: true }).click()
  await expect(page.locator('.project-result')).toHaveCount(3)
  await visit(page, '/projects/acs')
  await page.getByRole('tab', { name: 'Responsibilities' }).click()
  await expect(page.getByRole('tabpanel')).toContainText('Thailand')
  await page.getByRole('tab', { name: 'Gallery' }).click()
  await expect(page.getByRole('tabpanel')).toContainText('Screenshots coming later.')
  await page.getByRole('tab', { name: 'Gallery' }).press('ArrowLeft')
  await expect(page.getByRole('tab', { name: 'Stack' })).toBeFocused()
  await expect(page.getByRole('tabpanel')).toContainText('awaiting confirmation')
  for (const slug of [
    'warehouse-management-system',
    'ecovia',
    'stylease',
    'freelance-ecommerce',
    'optical-store-system',
    'travel-bus-reservation',
    'galeri-sby-ani-library',
    'tourism-profile-website',
  ]) {
    expect((await visit(page, `/projects/${slug}`))?.status()).toBe(200)
    await expect(page.locator('.project-detail h1')).toBeVisible()
  }
  expect((await visit(page, '/projects/nonexistent'))?.status()).toBe(404)
  await expect(page.getByRole('heading', { name: 'This page isn’t in the index.' })).toBeVisible()
  await visit(page, '/')
  await page.screenshot({ path: 'test-results/home-desktop.png', fullPage: true })
  expect(errors).toEqual([])
})

test('responsive header navigation, horizontal layout, touch and reduced motion', async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  })
  const page = await context.newPage()
  await visit(page, '/')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  const menu = page.getByRole('button', { name: 'Open navigation', exact: true })
  await menu.click()
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'About', exact: true })
    .click()
  await expect(page).toHaveURL(/\/about$/)
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden()
  await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toHaveAttribute(
    'aria-expanded',
    'false',
  )
  await expect(page.locator('.ambient-glow')).toHaveCSS('display', 'none')
  for (const route of [
    '/about',
    '/projects',
    '/projects/acs',
    '/experience',
    '/contact',
    '/search?q=wms',
  ]) {
    await visit(page, route)
    await expect(page.locator('aside, .sidebar, .drawer-backdrop')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  }
  await visit(page, '/')
  await page.screenshot({ path: 'test-results/home-mobile.png', fullPage: true })
  await context.close()
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const pointer = await desktop.newPage()
  await visit(pointer, '/')
  await expect(async () => {
    await pointer.mouse.move(890, 390)
    await pointer.mouse.move(900, 400)
    await expect(pointer.locator('.ambient')).toHaveCSS('--glow-opacity', '1', { timeout: 500 })
  }).toPass({ timeout: 5000 })
  await expect
    .poll(() =>
      pointer
        .locator('.ambient')
        .evaluate((el) => (el as HTMLElement).style.getPropertyValue('--pointer-x')),
    )
    .not.toBe('50%')
  await pointer.emulateMedia({ reducedMotion: 'reduce' })
  await expect(pointer.locator('.ambient-glow')).toHaveCSS('display', 'none')
  await pointer.setViewportSize({ width: 600, height: 1000 })
  await pointer.getByRole('button', { name: 'Open navigation', exact: true }).click()
  await pointer.keyboard.press('Escape')
  await expect(pointer.getByRole('button', { name: 'Open navigation', exact: true })).toBeFocused()
  await pointer.getByRole('button', { name: 'Open navigation', exact: true }).click()
  await pointer.setViewportSize({ width: 1440, height: 900 })
  await expect(pointer.getByRole('navigation', { name: 'Main navigation' })).toBeVisible()
  await pointer.setViewportSize({ width: 320, height: 740 })
  expect(await pointer.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
    true,
  )
  await desktop.close()
})

test('autocomplete overlays static shortcuts and keeps recent history inside the search panel', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1672, height: 941 })
  const history = [
    'ACS attendance integration',
    'warehouse management system',
    'software engineer experience',
    'AI-assisted development',
    'freelance projects',
    'Stylease',
    'Ecovia',
    'Laravel',
  ]
  await page.addInitScript((queries) => {
    localStorage.setItem('rainner:recent-searches:v1', JSON.stringify(queries))
  }, history)
  await visit(page, '/')
  const input = page.getByRole('combobox')
  const shortcutsBefore = await page
    .getByRole('navigation', { name: 'Portfolio sections' })
    .boundingBox()
  await input.click()
  await expect(page.getByRole('listbox')).toBeVisible()
  await expect(page.locator('.suggestion-heading')).toContainText('Recent searches')
  await expect(page.getByRole('button', { name: 'Clear all', exact: true })).toBeVisible()
  await input.press('ArrowUp')
  await expect(input).toHaveAttribute('aria-activedescendant', /option-4$/)
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute('aria-activedescendant', /option-0$/)
  const suggestions = await page.locator('.suggestion-panel').boundingBox()
  const shortcuts = await page.getByRole('navigation', { name: 'Portfolio sections' }).boundingBox()
  expect(shortcuts!.y).toBeCloseTo(shortcutsBefore!.y, 1)
  expect(suggestions!.y + suggestions!.height).toBeGreaterThan(shortcuts!.y)
  await page.screenshot({ path: 'test-results/home-autocomplete-desktop.png', fullPage: true })
  await page.setViewportSize({ width: 390, height: 844 })
  await page.screenshot({ path: 'test-results/history-mobile.png', fullPage: true })
  await page.getByRole('button', { name: 'Clear all', exact: true }).click()
  await expect(page.locator('.suggestion-heading')).toBeHidden()
})

test('contact details and message form use the supplied WhatsApp channel', async ({ page }) => {
  await visit(page, '/contact')
  await expect(page.getByRole('link', { name: '0821 2359 5108' })).toHaveAttribute(
    'href',
    'tel:+6282123595108',
  )
  for (const href of [
    'https://www.instagram.com/rainner__yobelgates?stkn=MXI1Nmx0YWszcmZibQ==',
    'https://github.com/Rainner-yobelgates',
    'https://www.linkedin.com/in/rainner-yobelgates-286554214/',
  ]) {
    await expect(page.locator(`a[href="${href}"]`)).toHaveAttribute('target', '_blank')
    await expect(page.locator(`a[href="${href}"]`)).toHaveAttribute('rel', 'noopener noreferrer')
  }
  const submit = page.getByRole('button', { name: 'Continue in WhatsApp' })
  await submit.click()
  await expect(page).toHaveURL(/\/contact$/)
  await page.getByLabel('Your name').fill('Test Visitor')
  await page.getByLabel('Your message').fill('This is a local QA test message.')
  await page.route('https://wa.me/**', (route) => route.fulfill({ status: 200, body: 'WhatsApp' }))
  await Promise.all([
    page.waitForURL(/https:\/\/wa\.me\/6282123595108/),
    submit.click(),
  ])
  expect(new URL(page.url()).searchParams.get('text')).toBe(
    'Hi Rainner,\n\nMy name is Test Visitor.\n\nThis is a local QA test message.',
  )
})
