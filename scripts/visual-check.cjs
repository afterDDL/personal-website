const { chromium } = require("playwright-core");
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(process.cwd(), "dist");
const port = 4173;
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
};

const server = http.createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url, `http://localhost:${port}`).pathname);
  const safePath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  let filePath = path.join(root, safePath);

  if (urlPath === "/" || !path.extname(filePath)) {
    filePath = path.join(root, "index.html");
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
    response.end(data);
  });
});

(async () => {
  let ownsServer = true;
  await new Promise((resolve, reject) => {
    server.once("error", (error) => {
      if (error.code === "EADDRINUSE") {
        ownsServer = false;
        resolve();
        return;
      }
      reject(error);
    });
    server.listen(port, "127.0.0.1", resolve);
  });
  const browser = await chromium.launch({
    executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });

  await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  console.log(await page.title());
  console.log(await page.locator("h1").innerText());
  console.log("interactive elements", await page.locator("a,button").count());
  await page.screenshot({ path: "artifacts-desktop.png", fullPage: false });

  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("http://127.0.0.1:4173", { waitUntil: "networkidle" });
  await page.waitForTimeout(900);
  await page.screenshot({ path: "artifacts-mobile.png", fullPage: false });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  console.log("mobile horizontal overflow", overflow);

  console.log("download links", await page.locator('a[download]').count());
  await browser.close();
  if (ownsServer) server.close();
})().catch((error) => {
  console.error(error);
  server.close();
  process.exit(1);
});
