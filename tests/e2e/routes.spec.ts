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

test.describe('Multi-page routes (2026-11-12 restructure)', () => {
  // Har section ka apna asal page hai — heading se verify karo ke
  // sahi page ka sahi content load hua.
  const pages: Array<[string, RegExp]> = [
    ['/about', /Turning Ideas into AI-Powered Solutions/i],
    ['/skills', /My Tech Stack/i],
    ['/services', /Hire a Freelance n8n Developer/i],
    ['/projects', /My Recent Work/i],
    ['/experience', /My Journey/i],
    ['/certifications', /Credentials & Learning/i],
    ['/blog', /Notes & Articles/i],
    ['/contact', /Have a Project in Mind/i],
  ];

  for (const [path, heading] of pages) {
    test(`${path} loads as its own page`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible();
      await expect(page).toHaveTitle(/Abdullah Bin Asim/);
    });
  }

  test('certifications page shows the full list without a View All gate', async ({ page }) => {
    await page.goto('/certifications');
    await expect(page.getByRole('button', { name: /View All Certifications/i })).toHaveCount(0);
    // Aakhir wali entries bhi pehli render mein maujood hain
    await expect(page.getByText(/AI-DLC Foundations/i).first()).toBeVisible();
  });

  test('old hash link /#services lands on the services page', async ({ page }) => {
    await page.goto('/#services');
    await expect(page).toHaveURL(/\/services$/);
    await expect(
      page.getByRole('heading', { name: /Hire a Freelance n8n Developer/i }).first(),
    ).toBeVisible();
  });

  test('navbar navigates between pages', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /^About$/ }).first().click();
    await expect(page).toHaveURL(/\/about$/);
    await expect(
      page.getByRole('heading', { name: /Turning Ideas into AI-Powered Solutions/i }).first(),
    ).toBeVisible();
  });
});
