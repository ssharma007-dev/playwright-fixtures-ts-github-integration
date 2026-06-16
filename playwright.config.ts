import type { FileLogHandlerPlain } from '@applitools/eyes-playwright';
import type { EyesFixture } from '@applitools/eyes-playwright/fixture';
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

// If nothing specified, classic runner will be used
const eyesRunner = process.env.EYES_RUNNER === 'ufg' ? 'ufg' : 'classic';

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
      hostOS: 'Linux',
      type: eyesRunner,
      appName: 'Playwright GitHub Integration Demo',
      branchName,
      parentBranchName: parentBranch,
      batch: { name: 'Playwright Visual Tests', id: commitSha },
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
