import { test, expect } from '@playwright/test';

// Click every button and clickable item on every tab of every book and fail on any
// uncaught error. This catches crashes from data shapes a component doesn't expect.
const BOOKS = ['MattParry_StitchedUp_v2', 'MattParry_StitchedUp_v1', 'RobertLouisStevenson_JekyllAndHyde'];
const TABS = ['characters', 'relationships', 'timeline', 'locations', 'map', 'plot', 'objects', 'encyclopedia'];
const SKIP = /^(Close|Back to Timeline|View Full Details|Show All|Remove Mode|Pin Mode|Auto\s*arrange)$/;

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('interactiveReadingCompanionVisited', 'true'));
  // Map tiles are external; don't depend on the network
  await page.route(/tile\.openstreetmap\.org/, route => route.abort());
});

for (const book of BOOKS) {
  test(`every tab of ${book} can be clicked through without errors`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));

    for (const tab of TABS) {
      await page.goto(`./#book=${book}&tab=${tab}`);
      await expect(page.getByRole('tablist')).toBeVisible();
      if (!(await page.$(`[data-tab-id="${tab}"]`))) continue; // the book has no data for this tab

      const views = tab === 'plot' ? ['Chapter Progression', 'Mystery Elements', 'Theme Analysis'] : [null];
      for (const view of views) {
        if (view) await page.getByRole('button', { name: view }).click();
        for (let i = 0; i < 40; i += 1) {
          // Re-query each time: clicking changes the panel
          const items = await page.$$('.react-tabs__tab-panel--selected button:not([disabled]), .react-tabs__tab-panel--selected [class*="cursor-pointer"]');
          if (i >= items.length) break;
          const text = ((await items[i].innerText().catch(() => '')) || '').trim();
          if (SKIP.test(text)) continue;
          await items[i].click({ timeout: 2000 }).catch(() => {});
          expect(errors, `after clicking "${text.slice(0, 40)}" on ${tab}`).toEqual([]);
          // Some clicks open another tab (e.g. a character from an event): come back
          if (!(await page.$(`.react-tabs__tab--selected[data-tab-id="${tab}"]`))) {
            await page.click(`[data-tab-id="${tab}"]`);
            if (view) await page.getByRole('button', { name: view }).click();
          }
        }
      }
    }
    expect(errors).toEqual([]);
  });
}

test('pages fit the screen width on phones', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone only');
  for (const tab of TABS) {
    await page.goto(`./#book=MattParry_StitchedUp_v2&tab=${tab}`);
    await expect(page.getByRole('tablist')).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `horizontal overflow on ${tab}`).toBeLessThanOrEqual(0);
  }
});
