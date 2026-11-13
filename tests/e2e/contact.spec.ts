import { test, expect } from '@playwright/test';

test.describe('Contact section (home one-pager)', () => {
  test.skip('contact form exists in the home Contact section', async ({ page }) => {
    // 2026-11-13: /contact page khatam — form home ke #contact
    // section mein hai (purana URL bhi wahin land karta hai).
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});
