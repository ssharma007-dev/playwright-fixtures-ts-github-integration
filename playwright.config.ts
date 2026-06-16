import type { FileLogHandlerPlain } from '@applitools/eyes-playwright';
import type { EyesFixture } from '@applitools/eyes-playwright/fixture';
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

// If nothing specified, classic runner will be used
const eyesRunner = process.env.EYES_RUNNER === 'ufg' ? 'ufg' : 'classic';

export default defineConfig<EyesFixture>({
  testDir: './tests',
  reporter: '@applitools/eyes-playwright/reporter',
  use: {
    trace: 'on',
    eyesConfig: {
      hostOS: 'Linux',
      type: eyesRunner,
      appName: 'Playwright GitHub Integration Demo',
      batch: { name: 'Playwright Visual Tests' },
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
