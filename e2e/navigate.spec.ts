import { expect, test } from '@playwright/test';
import questions from '../prisma/data';

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

//Listen, but with only with half an ear

test('should navigate to next page when an option is selected and submit is clicked', async ({
  page,
}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/questions/1');

  const answer = questions[0].answers.create[0].text;

  await page.check(`id=${answer}`);

  await page.click('text=Submit');

  // The new url should be "/result" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/questions/2');
});

test('should show Introvert if all questions are answered using the first option', async ({
  page,
}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000');

  await page.click('text=Start Test');

  for (var question of questions) {
    const answer = question.answers.create[0].text;
    await page.check(`id=${answer}`);
    await page.click('text=Submit');
  }
  // The new url should be "/result" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/result');

  await expect(page.locator('h1')).toContainText('Introvert');
});

test('should show Extrovert if all questions are answered using the last option', async ({
  page,
}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000');

  await page.click('text=Start Test');

  for (var question of questions) {
    const answer = question.answers.create[3].text;
    await page.check(`id=${answer}`);
    await page.click('text=Submit');
  }
  // The new url should be "/result" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/result');

  await expect(page.locator('h1')).toContainText('Extrovert');
});

test('should navigate back to home when Retake Test is clicked after a test', async ({
  page,
}) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000');

  await page.click('text=Start Test');

  for (var question of questions) {
    const answer = question.answers.create[3].text;
    await page.check(`id=${answer}`);
    await page.click('text=Submit');
  }
  // The new url should be "/result" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/result');

  await expect(page.locator('h1')).toContainText('Extrovert');

  await page.click('text=Retake Test');

  await expect(page).toHaveURL('http://localhost:3000');
});
