import { test, expect } from "@playwright/test";

const SITE = "https://wolf-project.com";

test("test sitemap pages", async ({ page }) => {
  const res = await page.goto(SITE + "/sitemap.xml");
  if (!res) throw new Error("No sitemap!");
  const text = await res.text();
  const urls = text.match(/<loc>(.*?)<\/loc>/g)?.map((x) => x.replace(/<loc>|<\/loc>/g, "")) || [];
  if (urls.length === 0) throw new Error("No urls found");
  expect(urls.length).toBeGreaterThan(0);
  for (const url of urls) {
    const res = await page.goto(url);
    expect(res?.status()).toBe(200);
  }
});
test("robots.txt", async ({ page }) => {
  const res = await page.goto(SITE + "/robots.txt");
  expect(res?.status()).toBe(200);
  const txt = await res?.text();
  expect(txt).toContain("User-agent: *");
  expect(txt).toContain("Allow: /");
  expect(txt).toContain(`Sitemap: ${SITE}/sitemap.xml`);
});
