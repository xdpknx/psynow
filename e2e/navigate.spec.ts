import { expect, test } from '@playwright/test';

test('should navigate to the questions/1 page from home page', async ({
  page,
}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/');
  await page.click('text=Start Test');
  // The new url should be "/questions/1" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/questions/1');
  // The new page should contain an h1 with "Question"
  await expect(page.locator('h1')).toContainText('Question');
});

test('should not navigate to next card and show error if questioncard is submitted without selecting option', async ({
  page,
}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/questions/1');
  await page.click('text=Submit');
  // The new url should be "/questions/1" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/questions/1');

  await expect(page.locator('span')).toContainText('Please select an option');
});

test('should navigate to results page after last question', async ({
  page,
}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/questions/6');

  // The new url should be "/result" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/result');
});
