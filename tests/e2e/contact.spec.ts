import { test, expect } from "@playwright/test";

test.describe("Contact section (home one-pager)", () => {
  test("contact form exists in the home Contact section", async ({ page }) => {
    // 2026-11-13: /contact page khatam — form home ke #contact
    // section mein hai (purana URL bhi wahin land karta hai).
    await page.goto("/#contact");
    await page.waitForLoadState("networkidle");
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("empty submit focuses the first invalid field, not a generic network error", async ({ page }) => {
    await page.goto("/#contact");
    await page.waitForLoadState("networkidle");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("#contact-name")).toBeFocused();
    await expect(page.getByText(/Couldn't send right now/i)).toHaveCount(0);
  });
});
