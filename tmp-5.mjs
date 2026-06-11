import { chromium } from "@playwright/test";
const exe = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const browser = await chromium.launch({ executablePath: exe });
for (const id of ["c", "d", "e", "f", "g"]) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto(`http://127.0.0.1:5179/home-preview-${id}`, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await page.waitForTimeout(3400);
  await page.screenshot({ path: `uipass-artifacts/home-preview/${id}-hero.png` });
  const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  // one mid capture per page
  await page.evaluate(() => window.scrollTo({ top: Math.min(1100, document.body.scrollHeight / 3), behavior: "instant" }));
  await page.waitForTimeout(1400);
  await page.screenshot({ path: `uipass-artifacts/home-preview/${id}-mid.png` });
  console.log(id, "overflow:", ov);
  await page.close();
}
// mobile spot check on the two riskiest layouts (d board, f split)
for (const id of ["d", "f"]) {
  const m = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
  await m.goto(`http://127.0.0.1:5179/home-preview-${id}`, { waitUntil: "networkidle", timeout: 45000 }).catch(() => {});
  await m.waitForTimeout(3000);
  const mo = await m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  console.log(id, "mobile overflow:", mo);
  await m.close();
}
await browser.close();
console.log("done");
