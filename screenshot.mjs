import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "screenshots");

const pages = [
  { name: "home", url: "http://localhost:3000" },
  { name: "services", url: "http://localhost:3000/services" },
  { name: "about", url: "http://localhost:3000/about" },
  { name: "portfolio", url: "http://localhost:3000/portfolio" },
];

const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox"],
});

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

import { mkdirSync } from "fs";
mkdirSync(OUT, { recursive: true });

async function scrollAndCapture(pg, name) {
  // Scroll through the page in chunks to trigger all whileInView animations
  const height = await pg.evaluate(() => document.body.scrollHeight);
  const step = 600;
  for (let y = 0; y <= height; y += step) {
    await pg.evaluate((pos) => window.scrollTo(0, pos), y);
    await pg.waitForTimeout(120);
  }
  // Scroll back to top for the screenshot
  await pg.evaluate(() => window.scrollTo(0, 0));
  await pg.waitForTimeout(600);
  const dest = path.join(OUT, `${name}.png`);
  await pg.screenshot({ path: dest, fullPage: true });
  console.log(`✓ ${name} → ${dest}`);
}

for (const { name, url } of pages) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  await scrollAndCapture(page, name);
}

// Also take a mobile screenshot of home
await ctx.close();
const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobilePage = await mobileCtx.newPage();
await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
await mobilePage.waitForTimeout(400);
await scrollAndCapture(mobilePage, "home-mobile");
console.log("✓ home-mobile");
await mobileCtx.close();

await browser.close();
console.log("\nAll screenshots saved to ./screenshots/");
