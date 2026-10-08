import { test, expect } from '@playwright/test';

// Click every button and clickable item on every tab of every book and fail on any
// uncaught error. This catches crashes from data shapes a component doesn't expect.
const BOOKS = ['MattParry_StitchedUp_v2', 'MattParry_StitchedUp_v1', 'RobertLouisStevenson_JekyllAndHyde', 'RichardColes_MurderBeforeEvensong'];
// Draft books are only listed with ?drafts
const bookUrl = (book, rest = '') => `./?drafts#book=${book}${rest}`;
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
      await page.goto(bookUrl(book, `&tab=${tab}`));
      await expect(page.getByRole('tablist')).toBeVisible();
      if (!(await page.$(`[data-tab-id="${tab}"]`))) continue; // the book has no data for this tab

      const views = tab === 'plot' ? ['Story So Far', 'Chapter Progression', 'Mystery Elements', 'Theme Analysis'] : [null];
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
  for (const book of ['MattParry_StitchedUp_v2', 'RichardColes_MurderBeforeEvensong']) {
    for (const tab of TABS) {
      await page.goto(bookUrl(book, `&tab=${tab}`));
      await expect(page.getByRole('tablist')).toBeVisible();
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, `horizontal overflow on ${book} ${tab}`).toBeLessThanOrEqual(0);
    }
  }
});

// A mystery starts at Chapter 1 and keeps later facts hidden until the reader gets there
test('a mystery reveals its solution only at the chapter that reveals it', async ({ page }) => {
  const book = 'RichardColes_MurderBeforeEvensong';
  await page.goto(bookUrl(book, '&tab=characters'));
  await expect(page.getByText('Show up to Chapter 1', { exact: true }).filter({ visible: true })).toBeVisible();

  const kathProfile = async (chapter) => {
    await page.goto(bookUrl(book, `&tab=characters&upto=${chapter}`));
    await page.locator('.react-tabs__tab-panel--selected').getByText('Kath Sharman', { exact: true }).first().click();
    return page.locator('.react-tabs__tab-panel--selected').innerText();
  };
  const early = await kathProfile('chapter_20');
  expect(early).not.toMatch(/killer|murdered|lover/i);
  expect(early).toContain('Later development is hidden');
  const late = await kathProfile('chapter_37');
  expect(late).toMatch(/killer of Anthony, Ned and Stella/);

  const backPew = async (chapter) => {
    await page.goto(bookUrl(book, `&tab=encyclopedia&upto=${chapter}`));
    await page.getByText('The back pew', { exact: true }).first().click();
    return page.locator('.react-tabs__tab-panel--selected').innerText();
  };
  expect(await backPew('chapter_09')).toContain('Revealed in Chapter 37');
  expect(await backPew('chapter_09')).not.toContain('Dora keeps vigil');
  expect(await backPew('chapter_37')).toContain('weep, unseen');
});
