import { test, expect } from "@playwright/test";
import { execSync } from 'child_process';

const SITE = 'https://project.wolfagency.ee'

test("test sitemap pages", async ({ page }) => {
  const res = await page.goto(SITE + "/sitemap-index.xml");
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

test("Login process", async ({ page }) => {
  await page.goto(`${SITE}/login`);
  await page.fill('input[type="email"]', 'testuser@example.com');
  await page.click('button');
  await page.waitForSelector('p.whitespace-normal');
  const emailSentMessage = await page.textContent('p.whitespace-normal');
  expect(emailSentMessage).toContain('Continue login process by opening magic link, which is sent to your email!');
});

test('Create User Account', async ({ }) => {
  try {
    execSync('npm run add-user "testuser@example.com" "Test User"', { stdio: 'inherit' });
    console.log('User added successfully');
    expect(true).toBe(true);
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
});
