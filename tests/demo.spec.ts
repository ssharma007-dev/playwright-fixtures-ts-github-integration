import { test, expect } from '@applitools/eyes-playwright/fixture';

test('homepage – full window check', async ({ page }) => {
  await page.goto('https://demo.applitools.com');

  await expect(page).toHaveScreenshot('Homepage', { fullPage: true });
});

test('login form – region check', async ({ page, eyes }) => {
  await page.goto('https://demo.applitools.com');

  const loginForm = page.locator('#log-in-form');

  await eyes.check('Login Form Region', { region: loginForm });
});

test('after sign in click', async ({ page }) => {
  await page.goto('https://demo.applitools.com');
  await page.getByRole('button', { name: /sign in/i }).click();

  await expect(page).toHaveScreenshot('After Sign In', { fullPage: true });
});
