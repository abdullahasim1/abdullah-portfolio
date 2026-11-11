import { test, expect } from '@playwright/test';

test.describe('Detail routes', () => {
  test('removed project route renders the in-app 404 — Events Agent is gone', async ({ page }) => {
    // Events Agent was removed from the portfolio entirely on
    // 2026-11-12 (Abdullah's order), so its old case-study URL must
    // behave exactly like any other unknown project slug.
    await page.goto('/projects/events-agent');
    await expect(page.getByText('404').first()).toBeVisible();
    await expect(page.locator('h1')).not.toContainText('Events Agent');
  });

  test('live project case study shows its Live Demo link', async ({ page }) => {
    await page.goto('/projects/four-ai');
    await expect(page.locator('h1')).toContainText('Four-AI');
    await expect(page.getByText('Live & Public')).toBeVisible();
    await expect(page.getByRole('link', { name: /Live Demo/i })).toBeVisible();
  });

  test('service detail route loads', async ({ page }) => {
    await page.goto('/services/generative-ai-integration');
    await expect(page.locator('h1')).toContainText('AI');
    await expect(page).toHaveTitle(/Abdullah Bin Asim/);
  });

  test('blog post serves as a full static HTML article', async ({ page }) => {
    const response = await page.goto('/blog/lcp-3-7s-to-0-9s');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1').first()).toContainText(/LCP/);
  });

  test('unknown route renders the in-app 404', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await expect(page.getByText('404').first()).toBeVisible();
  });
});
