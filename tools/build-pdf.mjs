import { readFile } from "node:fs/promises";
import { chromium } from "playwright";

const [html, overrides] = await Promise.all([
  readFile("dist/resume.html", "utf8"),
  readFile("override.css", "utf8"),
]);

const printableHtml = html.replace(
  "</head>",
  `<style>${overrides}</style></head>`,
);
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage();
  await page.setContent(printableHtml, { waitUntil: "networkidle" });
  await page.pdf({
    path: "dist/resume.pdf",
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });
} finally {
  await browser.close();
}
