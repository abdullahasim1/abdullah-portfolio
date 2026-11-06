import { test, expect } from '@playwright/test';

test.describe('Detail routes', () => {
  test('project case study loads — Events Agent shows honest status', async ({ page }) => {
    await page.goto('/projects/events-agent');
    await expect(page.locator('h1')).toContainText('Events Agent');
    await expect(page.getByText('Client Delivery')).toBeVisible();
    // Regression guard (2026-11-06): the Events Agent deployments no
    // longer exist, so no Live Demo link / "Live & Public" claim may
    // ever render for it again.
    await expect(page.getByRole('link', { name: /Live Demo/i })).toHaveCount(0);
    await expect(page.getByText('Live & Public')).toHaveCount(0);
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
