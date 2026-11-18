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

  test('service landing page renders its own content', async ({ page }) => {
    // Service pages restored Nov 2026 for commercial SEO.
    await page.goto('/services/generative-ai-integration');
    await expect(page).toHaveURL(/\/services\/generative-ai-integration$/);
    await expect(page.locator('h1')).toContainText(/Generative AI Integration/i);
    await expect(page.getByRole('heading', { name: /What you get/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Common questions/i })).toBeVisible();
  });

  test('unknown service slug returns 404', async ({ page }) => {
    const response = await page.goto('/services/not-a-service');
    expect(response?.status()).toBe(404);
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

test.describe('One-pager structure (2026-11-13 restructure)', () => {
  // Sirf teen asal pages bache hain — baaki sections home par hain.
  const pages: Array<[string, RegExp]> = [
    ['/projects', /My Recent Work/i],
    ['/certifications', /Credentials & Learning/i],
    ['/blog', /Notes & Articles/i],
  ];

  for (const [path, heading] of pages) {
    test(`${path} loads as its own page`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible();
      await expect(page).toHaveTitle(/Abdullah Bin Asim/);
    });
  }

  // Purane page URLs home ke matching section par land karte hain.
  const legacy: Array<[string, RegExp]> = [
    ['/about', /Turning Ideas into AI-Powered Solutions/i],
    ['/skills', /My Tech Stack/i],
    ['/experience', /My Journey/i],
    ['/contact', /Have a Project in Mind/i],
  ];

  for (const [path, heading] of legacy) {
    test(`legacy ${path} lands on the home section`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/(#\w+)?$/);
      await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible();
    });
  }

  test('certifications page shows the full list without a View All gate', async ({ page }) => {
    await page.goto('/certifications');
    await expect(page.getByRole('button', { name: /View All Certifications/i })).toHaveCount(0);
    // Aakhir wali entries bhi pehli render mein maujood hain
    await expect(page.getByText(/AI-DLC Foundations/i).first()).toBeVisible();
  });

  test('home contains the full About/Skills/Services/Experience/Contact sections', async ({ page }) => {
    await page.goto('/');
    for (const heading of [
      /Turning Ideas into AI-Powered Solutions/i,
      /My Tech Stack/i,
      /Hire a Freelance n8n Developer/i,
      /My Journey/i,
    ]) {
      await expect(page.getByRole('heading', { name: heading }).first()).toBeAttached();
    }
    await expect(page.locator('#contact form')).toBeAttached();
  });

  test('hash link /#services stays on home and reaches the Services section', async ({ page }) => {
    await page.goto('/#services');
    await expect(page).toHaveURL(/\/($|#services$)/);
    await expect(
      page.getByRole('heading', { name: /Hire a Freelance n8n Developer/i }).first(),
    ).toBeVisible();
  });

  test('hash link /#projects goes to the projects page', async ({ page }) => {
    await page.goto('/#projects');
    await expect(page).toHaveURL(/\/projects$/);
  });

  test('navbar section links scroll on home; page links navigate', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /^About$/ }).first().click();
    await expect(page).toHaveURL(/\/($|#about$)/);
    await expect(
      page.getByRole('heading', { name: /Turning Ideas into AI-Powered Solutions/i }).first(),
    ).toBeVisible();
    await page.getByRole('link', { name: /^Projects$/ }).first().click();
    await expect(page).toHaveURL(/\/projects$/);
    await expect(
      page.getByRole('heading', { name: /My Recent Work/i }).first(),
    ).toBeVisible();
  });
});

test.describe('History navigation', () => {
  test('back button restores the previous scroll position', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1200);
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);
    const before = await page.evaluate(() => window.scrollY);
    expect(before).toBeGreaterThan(500);

    // Navbar neeche scroll par chhup jata hai (hide-on-scroll, -140%
    // translate) — real user ki tarah thora upar scroll kar ke use
    // wapas lao. Warna header ka "Projects" link viewport se bahar
    // hota hai aur Playwright click 30s timeout karta hai (desktop).
    // Mobile par desktop nav hoti hi nahi aur hamburger menu band
    // hota hai — wahan pehle menu kholo, warna "Projects" ka pehla
    // accessible link footer wala hota hai aur click ke liye page
    // neeche (scrollY ~35883) scroll ho jata hai, jis se restore
    // point hi bigar jata hai. Dono soorton mein header ke andar
    // wala link use karo, taake footer link kabhi na mile.
    await page.evaluate((y) => window.scrollTo(0, y - 40), before);
    await page.waitForTimeout(500);
    const menuToggle = page.getByRole("button", { name: "Toggle menu" });
    if (await menuToggle.isVisible()) {
      await menuToggle.click();
      await page.waitForTimeout(400);
    }
    await page.locator("header").getByRole("link", { name: /^Projects$/ }).click();
    await page.waitForURL(/\/projects$/);
    await page.waitForTimeout(500);

    await page.goBack();
    await page.waitForURL(/\/$/);
    await page.waitForTimeout(1400);
    const after = await page.evaluate(() => window.scrollY);
    expect(Math.abs(after - before)).toBeLessThan(600);
  });
});
