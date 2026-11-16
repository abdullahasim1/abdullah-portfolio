import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/* WCAG 2.2 AA smoke gate — audit (Nov 2026) ke baad CI mein add hua.
   Har main route par serious/critical axe violations fail karte hain. */
const routes = ["/", "/projects", "/certifications", "/blog"];

for (const path of routes) {
  test(`axe WCAG 2.2 AA: ${path}`, async ({ page }) => {
    // Reduced-motion: splash/scroll animations off — axe final state ko
    // deterministic taur par audit karta hai (fade ke beech ke transient
    // colors false positives dete the).
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    // Lazy sections + counters settle hone do
    await page.waitForTimeout(1500);

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      // Third-party chat widget: vendor DOM, production origin allowlist par
      // hi render hota hai. Hamara patched launcher/keyboard part test se
      // separate verify hota hai.
      .exclude("#ai-widget-root")
      .analyze();

    const serious = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );
    expect(
      serious.map((v) => `${v.id} (${v.nodes.length} nodes)`),
      `axe violations on ${path}`,
    ).toEqual([]);
  });
}

test("one h1 per page", async ({ page }) => {
  for (const path of routes) {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(800);
    await expect(page.locator("h1"), `h1 count on ${path}`).toHaveCount(1);
  }
});

test("no runtime errors after scrolling home + opening palette", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error" && /removeChild|NotFoundError/.test(message.text())) {
      errors.push(message.text());
    }
  });

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  for (let i = 0; i < 10; i += 1) {
    await page.mouse.wheel(0, 900);
    await page.waitForTimeout(120);
  }
  await page.keyboard.press("Control+k");
  await page.waitForTimeout(400);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(400);

  await expect(page.getByText(/This section failed to load/i)).toHaveCount(0);
  expect(errors).toEqual([]);
});
