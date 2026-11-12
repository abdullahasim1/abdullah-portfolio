import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Abdullah Bin Asim/);
  });

  test('RSS feed loads', async ({ page }) => {
    const response = await page.goto('/rss.xml');
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('xml');
  });

  test('sitemap loads', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('xml');
  });

  test('llms-full.txt loads', async ({ page }) => {
    const response = await page.goto('/llms-full.txt');
    expect(response?.status()).toBe(200);
  });

  test('privacy page loads', async ({ page }) => {
    const response = await page.goto('/privacy.html');
    expect(response?.status()).toBe(200);
  });
});

test.describe('Core functionality', () => {
  test('home page has hero heading', async ({ page }) => {
    await page.goto('/');
    // Dua-style hero (2026-11-12): h1 ab devasa role headline hai
    // ("Generative AI Engineer") — naam hero ki annotation patti mein
    // asal text ke tor par maujood hai, h1 nahi raha.
    await expect(page.locator('h1').first()).toContainText('Generative AI');
    await expect(page.locator('h1').first()).toContainText('Engineer');
    await expect(page.locator('#home')).toContainText("Hello, I'm Abdullah Asim");
  });
});