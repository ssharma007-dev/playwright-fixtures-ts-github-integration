import type { EyesFixture } from '@applitools/eyes-playwright/fixture';
import { defineConfig, devices } from '@playwright/test';

const branchName =
  process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || 'local';
const parentBranch = process.env.GITHUB_BASE_REF || 'main';
const commitSha = process.env.GITHUB_SHA;

export default defineConfig<EyesFixture>({
  testDir: './tests',
  reporter: '@applitools/eyes-playwright/reporter',
  use: {
    trace: 'on',
    eyesConfig: {
      appName: 'Playwright GitHub Integration Demo',
      type: 'ufg',
      branchName,
      parentBranchName: parentBranch,
      batch: {
        name: `Playwright Visual Tests – ${branchName}`,
        ...(commitSha ? { id: commitSha } : {}),
      },
      failTestsOnDiff: 'afterAll',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
