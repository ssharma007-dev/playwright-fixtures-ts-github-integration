import { test as baseTest } from '@playwright/test';
import {
  Eyes,
  VisualGridRunner,
  Configuration,
  BatchInfo,
  BrowserType,
} from '@applitools/eyes-playwright';

// ── GitHub CI environment ─────────────────────────────────────────────────────
// GITHUB_HEAD_REF: the PR source branch (set on pull_request events)
// GITHUB_REF_NAME: the tag or branch name (set on push events)
// GITHUB_BASE_REF: the PR target / parent branch (set on pull_request events)
// GITHUB_SHA:      the commit SHA used as the batch ID for traceability
const branchName =
  process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || 'local';
const parentBranch = process.env.GITHUB_BASE_REF || 'main';
const commitSha = process.env.GITHUB_SHA || `local-${Date.now()}`;

// ── Shared batch – one batch per CI run keyed to the commit SHA ───────────────
const BATCH = new BatchInfo({
  name: `Playwright Visual Tests – ${branchName}`,
  id: commitSha,
});

function buildEyesConfig(): Configuration {
  const config = new Configuration();
  config.setBatch(BATCH);
  config.setApiKey(process.env.APPLITOOLS_API_KEY ?? '');
  config.setBranchName(branchName);
  config.setParentBranchName(parentBranch);

  config.addBrowser({ width: 1280, height: 800, name: BrowserType.CHROME });
  config.addBrowser({ width: 1280, height: 800, name: BrowserType.FIREFOX });

  return config;
}

// ── Fixture types ─────────────────────────────────────────────────────────────
type EyesFixtures = { eyes: Eyes; runner: VisualGridRunner };

export const test = baseTest.extend<EyesFixtures>({
  runner: [
    async ({}, use) => {
      const runner = new VisualGridRunner({ testConcurrency: 5 });
      await use(runner);
      const results = await runner.getAllTestResults(false);
      console.log('Visual Grid results:', results);
    },
    { scope: 'worker' },
  ],

  eyes: async ({ page, runner }, use) => {
    const eyes = new Eyes(runner, buildEyesConfig());
    await eyes.open(page, 'My App', baseTest.info().title, {
      width: 1280,
      height: 800,
    });
    await use(eyes);
    await eyes.closeAsync();
  },
});

export { expect } from '@playwright/test';
export { branchName, parentBranch, commitSha };
