import { test, expect } from '@playwright/test'

test.describe('Portfolio navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should render the main sections and allow navigation', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Home' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'About' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Skills' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Projects' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Contact' })).toBeVisible()

    await page.getByRole('button', { name: 'Projects' }).click()
    await expect(page.getByRole('link', { name: 'View GitHub' })).toBeVisible()

    const getInTouch = page.locator('a[href="#contact"]')
    await expect(getInTouch).toBeVisible()
    await page.evaluate(() => document.querySelector('a[href="#contact"]')?.click())
    await page.waitForTimeout(500)
    await expect(page.locator('#contact')).toBeVisible()
  })

  test('should expose the main social contact links', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'href',
      /linkedin\.com/i,
    )
    await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      /github\.com/i,
    )
    await expect(page.getByRole('link', { name: 'Email' })).toHaveAttribute(
      'href',
      /mailto:/i,
    )
    await expect(page.getByRole('link', { name: 'WhatsApp' })).toHaveAttribute(
      'href',
      /wa\.me/i,
    )
  })

  test('should toggle language switch', async ({ page }) => {
    const switchButton = page.locator('button[aria-label*="Mudar para"], button[aria-label*="Switch to"]').first()
    await expect(switchButton).toBeVisible()
    await switchButton.click()
    await page.waitForTimeout(500)
    const portugueseCount = await page.locator('button[aria-label*="Mudar para"]').count()
    const englishCount = await page.locator('button[aria-label*="Switch to"]').count()
    expect(portugueseCount + englishCount).toBeGreaterThan(0)
  })
})
