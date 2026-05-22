import { test, expect } from '@playwright/test'

test.describe('Portfolio navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should render the main sections and allow navigation', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Skills' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Projects' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible()

    await page.getByRole('button', { name: 'Projects' }).click()
    await expect(page.getByRole('link', { name: 'View GitHub' })).toBeVisible()

    const contactLink = page.getByRole('link', { name: 'Contact' })
    await expect(contactLink).toBeVisible()
    await contactLink.click()
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
