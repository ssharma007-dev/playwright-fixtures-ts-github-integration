import { test, expect } from '@applitools/eyes-playwright/fixture';

test('homepage – full window check', async ({ page }) => {
  await page.goto('https://demo.applitools.com');

  await expect(page).toHaveScreenshot('Homepage', { fullPage: true });
});

test('login form – region check', async ({ page, eyes }) => {
  await page.goto('https://demo.applitools.com');

  await eyes.check('Login Form Region', { region: page.locator('form') });
});

test('after sign in click', async ({ page }) => {
  await page.goto('https://demo.applitools.com');
  await page.locator('#log-in').click();

  await expect(page).toHaveScreenshot('After Sign In', { fullPage: true });
});
