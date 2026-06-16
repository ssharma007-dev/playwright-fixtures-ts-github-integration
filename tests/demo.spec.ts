import { test, expect, branchName, parentBranch, commitSha } from '../fixtures/eyes.fixture';

test.describe('Demo – Applitools Eyes + GitHub Integration', () => {
  test.beforeAll(() => {
    console.log(`Branch:        ${branchName}`);
    console.log(`Parent branch: ${parentBranch}`);
    console.log(`Batch ID (SHA):${commitSha}`);
  });

  test('homepage visual check', async ({ page, eyes }) => {
    await page.goto('https://demo.applitools.com');

    await eyes.checkWindow('Homepage');
  });

  test('login page visual check', async ({ page, eyes }) => {
    await page.goto('https://demo.applitools.com');

    await page.getByRole('button', { name: /sign in/i }).click();

    await eyes.checkWindow('After Sign In click');
  });
});
