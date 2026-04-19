import { test, expect } from '@playwright/test'

test('login', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('inputEmail').fill('le.kovacs789@gmail.com')
  await page.getByTestId('inputPassword').fill('Leti_2004')
  await page.locator('button').click()

  await expect(page.getByAltText('Ludario logo')).toBeVisible()
})
