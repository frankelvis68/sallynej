import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function runAudit() {
  const screenshotDir = path.resolve("./screenshots");
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const viewports = [
    { name: "mobile_390px", width: 390, height: 844 },
    { name: "tablet_768px", width: 768, height: 1024 },
    { name: "desktop_1440px", width: 1440, height: 900 },
  ];

  const routes = [
    { url: "http://localhost:3000", name: "home" },
    { url: "http://localhost:3000/properties", name: "properties" },
    { url: "http://localhost:3000/properties/4-bedroom-terrace-duplex-karu", name: "property_detail" },
    { url: "http://localhost:3000/services", name: "services" },
    { url: "http://localhost:3000/about", name: "about" },
    { url: "http://localhost:3000/contact", name: "contact" },
  ];

  console.log("Starting visual audit across viewports...");

  for (const vp of viewports) {
    const page = await browser.newPage({
      viewport: { width: vp.width, height: vp.height },
    });

    for (const r of routes) {
      await page.goto(r.url, { waitUntil: "networkidle" });
      const filename = path.join(screenshotDir, `${r.name}_${vp.name}.png`);
      await page.screenshot({ path: filename, fullPage: false });
      console.log(`Saved screenshot: ${filename}`);
    }

    await page.close();
  }

  // Interactive check: filter on /properties
  console.log("Testing interactive filters...");
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/properties", { waitUntil: "networkidle" });

  // Select "For Rent" from purpose select
  const selects = await page.$$("select");
  if (selects.length > 0) {
    await selects[0].selectOption("rent");
    await page.waitForTimeout(500);
    console.log("Current URL after filter:", page.url());
  }

  await page.screenshot({ path: path.join(screenshotDir, "properties_filtered.png") });
  await page.close();
  await browser.close();
  console.log("Audit complete!");
}

runAudit().catch(console.error);
