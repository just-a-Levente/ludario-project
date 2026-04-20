import { test, expect } from '@playwright/test'

test('add new boardgame', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('inputEmail').fill('le.kovacs789@gmail.com')
  await page.getByTestId('inputPassword').fill('Leti_2004')
  await page.locator('button').click()

  await expect(page.getByAltText('Ludario logo')).toBeVisible()

  await page.locator('#addButton').click()

  await page.locator('#addNameField').fill('Terraforming Mars')
  await page.locator('#addProducerField').fill('FryxGames')
  await page.locator('#addDescriptionField').fill('Description of Terraforming Mars')
  await page.locator('#addPriceField').fill('nope')
  await page.locator('#addCopiesField').fill('6')
  await page.locator('#addMinPlayerField').fill('7')
  await page.locator('#addMaxPlayerField').fill('6')
  await page.locator('#addTagsField').fill('strategy;colony builder')
  await page
    .locator('#addThumbnailField')
    .fill(
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.GR2LZokzES5_Z7SeO7bEHgHaHa%3Fpid%3DApi&f=1&ipt=25737abb4a66988992af02a0e34e0a7bb2ab43fc4de66cb6d4946c117f507190&ipo=images',
    )
  await page.locator('#addNewBoardgameButton').click()

  await expect(page.locator('#addPriceError')).toBeVisible()
  await expect(page.locator('#addPlayerCountError')).toBeVisible()

  await page.locator('#addPriceField').fill('8.99')
  await page.locator('#addMinPlayerField').fill('3')
  await page.locator('#addNewBoardgameButton').click()

  await expect(
    page.getByText('Terraforming Mars - FryxGames - 6 copies - 3-6 players'),
  ).toBeVisible()
})

test('edit boardgame', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('inputEmail').fill('le.kovacs789@gmail.com')
  await page.getByTestId('inputPassword').fill('Leti_2004')
  await page.locator('button').click()

  await expect(page.getByAltText('Ludario logo')).toBeVisible()

  await page
    .locator('[data-testid="boardgame-item"]', {
      hasText: 'Dune - Gale Force Nine - 4 copies - 3-6 players ',
    })
    .locator('[data-testid="edit-button"]')
    .click()

  const modal = page.locator('[data-testid="editModal"]:visible').nth(2)

  await modal.getByTestId('editNameField').fill('Terraforming Mars')
  await modal.getByTestId('editProducerField').fill('FryxGames')
  await modal.getByTestId('editDescriptionField').fill('Description of Terraforming Mars')
  await modal.getByTestId('editPriceField').fill('nope')
  await modal.getByTestId('editCopiesField').fill('6')
  await modal.getByTestId('editMinPlayerField').fill('7')
  await modal.getByTestId('editMaxPlayerField').fill('6')
  await modal.getByTestId('editTagsField').fill('strategy;colony builder')
  await modal
    .getByTestId('editThumbnailField')
    .fill(
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.GR2LZokzES5_Z7SeO7bEHgHaHa%3Fpid%3DApi&f=1&ipt=25737abb4a66988992af02a0e34e0a7bb2ab43fc4de66cb6d4946c117f507190&ipo=images',
    )
  await modal.getByTestId('editBoardgameButton').scrollIntoViewIfNeeded()
  await modal.getByTestId('editBoardgameButton').click()

  await expect(modal.getByTestId('editPriceError')).toBeVisible()
  await expect(modal.getByTestId('editPlayerCountError')).toBeVisible()

  await modal.getByTestId('editPriceField').fill('8.99')
  await modal.getByTestId('editMinPlayerField').fill('3')
  await modal.getByTestId('editBoardgameButton').scrollIntoViewIfNeeded()
  await modal.getByTestId('editBoardgameButton').click()

  await expect(page.getByText('Dune - Gale Force Nine - 4 copies - 3-6 players ')).toBeHidden()
  await expect(
    page.getByText('Terraforming Mars - FryxGames - 6 copies - 3-6 players'),
  ).toBeVisible()
})

test('delete boardgame', async ({ page }) => {
  await page.goto('/')

  await page.getByTestId('inputEmail').fill('le.kovacs789@gmail.com')
  await page.getByTestId('inputPassword').fill('Leti_2004')
  await page.locator('button').click()

  await expect(page.getByAltText('Ludario logo')).toBeVisible()

  await page
    .locator('[data-testid="boardgame-item"]', {
      hasText: 'Dune - Gale Force Nine - 4 copies - 3-6 players ',
    })
    .locator('[data-testid="delete-button"]')
    .click()

  const modal = page.locator('[data-testid="deleteModal"]:visible').nth(2)

  await modal.getByTestId('confirmDeleteButton').click()

  await expect(page.getByText('Dune - Gale Force Nine - 4 copies - 3-6 players ')).toBeHidden()
})
