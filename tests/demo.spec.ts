import { test, expect, branchName, parentBranch, commitSha } from '../fixtures/eyes.fixture';
import { Region, MatchLevel } from '@applitools/eyes-playwright';

test.describe('Demo – Applitools Eyes + GitHub Integration', () => {
  test.beforeAll(() => {
    console.log(`Branch:         ${branchName}`);
    console.log(`Parent branch:  ${parentBranch}`);
    console.log(`Batch ID (SHA): ${commitSha}`);
  });

  test('homepage – full window check', async ({ page, eyes }) => {
    await page.goto('https://demo.applitools.com');

    await eyes.checkWindow('Homepage – Full Window');
  });

  test('homepage – hero region only', async ({ page, eyes }) => {
    await page.goto('https://demo.applitools.com');

    // Check only the login form region to isolate visual noise
    const loginForm = page.locator('#log-in-form');
    await eyes.check('Login Form Region', {
      region: loginForm,
      matchLevel: MatchLevel.Strict,
    });
  });

  test('login page – after sign in click', async ({ page, eyes }) => {
    await page.goto('https://demo.applitools.com');
    await page.getByRole('button', { name: /sign in/i }).click();

    await eyes.checkWindow('After Sign In click');
  });

  test('homepage – layout match on dynamic content', async ({ page, eyes }) => {
    await page.goto('https://demo.applitools.com');

    // Layout match level ignores content changes (e.g. dates, balances) and only checks structure
    await eyes.check('Homepage – Layout Match', {
      fully: true,
      matchLevel: MatchLevel.Layout,
    });
  });
});
