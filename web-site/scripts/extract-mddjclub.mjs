import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const CDP_URL = "http://127.0.0.1:9222";
const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "docs", "research", "mddjclub.com");
const REF_DIR = path.join(ROOT, "docs", "design-references", "mddjclub.com");

const targets = [
  { name: "home", url: "https://www.mddjclub.com/" },
  { name: "list", url: "https://www.mddjclub.com/list" },
  { name: "login", url: "https://www.mddjclub.com/login" },
  { name: "detail-89131", url: "https://www.mddjclub.com/detail/89131" },
];

const viewports = [
  { label: "desktop", width: 1440, height: 2200 },
  { label: "mobile", width: 390, height: 1600, isMobile: true },
];

async function ensureDirs() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  await fs.mkdir(REF_DIR, { recursive: true });
}

function slugify(value) {
  return value.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
}

async function capturePage(context, target) {
  const page = await context.newPage();
  await page.goto(target.url, { waitUntil: "networkidle", timeout: 120000 });
  await page.addStyleTag({
    content: `
      * { scroll-behavior: auto !important; }
      html { scroll-behavior: auto !important; }
    `,
  });

  const analysis = await page.evaluate(() => {
    const pick = (selector) =>
      Array.from(document.querySelectorAll(selector)).map((el) => {
        const style = getComputedStyle(el);
        return {
          tag: el.tagName.toLowerCase(),
          className: el.className,
          id: el.id,
          text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 240),
          href: el.getAttribute("href"),
          src: el.getAttribute("src"),
          rect: {
            width: Math.round(el.getBoundingClientRect().width),
            height: Math.round(el.getBoundingClientRect().height),
          },
          style: {
            color: style.color,
            backgroundColor: style.backgroundColor,
            fontFamily: style.fontFamily,
            fontSize: style.fontSize,
            fontWeight: style.fontWeight,
            lineHeight: style.lineHeight,
            borderRadius: style.borderRadius,
            boxShadow: style.boxShadow,
            display: style.display,
            position: style.position,
            gap: style.gap,
          },
        };
      });

    const bodyStyle = getComputedStyle(document.body);
    const allNodes = Array.from(document.querySelectorAll("body *"));
    const colors = Array.from(
      new Set(
        allNodes
          .flatMap((el) => {
            const s = getComputedStyle(el);
            return [s.color, s.backgroundColor, s.borderColor];
          })
          .filter(
            (value) =>
              value &&
              value !== "rgba(0, 0, 0, 0)" &&
              value !== "transparent"
          )
      )
    ).slice(0, 80);

    const fonts = Array.from(
      new Set(allNodes.map((el) => getComputedStyle(el).fontFamily).filter(Boolean))
    );

    const textBlocks = allNodes
      .map((el) => (el.textContent || "").trim().replace(/\s+/g, " "))
      .filter((text) => text && text.length > 1)
      .slice(0, 250);

    return {
      title: document.title,
      lang: document.documentElement.lang,
      body: {
        className: document.body.className,
        backgroundColor: bodyStyle.backgroundColor,
        color: bodyStyle.color,
        fontFamily: bodyStyle.fontFamily,
      },
      meta: Array.from(document.querySelectorAll("meta")).map((meta) => ({
        name: meta.getAttribute("name"),
        property: meta.getAttribute("property"),
        content: meta.getAttribute("content"),
      })),
      links: Array.from(document.querySelectorAll("link")).map((link) => ({
        rel: link.getAttribute("rel"),
        href: link.href,
      })),
      nav: pick("nav, header a, nav a"),
      buttons: pick("button, .button, [role='button'], input[type='submit']"),
      forms: pick("form, input, textarea, select, label"),
      images: Array.from(document.images).map((img) => ({
        src: img.currentSrc || img.src,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
      })),
      sections: pick("main > *, body > *"),
      cards: pick("article, li, .card, .item"),
      colors,
      fonts,
      textBlocks,
    };
  });

  const html = await page.content();
  await fs.writeFile(
    path.join(OUT_DIR, `${target.name}.analysis.json`),
    `${JSON.stringify(analysis, null, 2)}\n`
  );
  await fs.writeFile(path.join(OUT_DIR, `${target.name}.html`), html);
  await page.close();
}

async function captureScreens(target) {
  for (const viewport of viewports) {
    const browser = await chromium.connectOverCDP(CDP_URL);
    const context = browser.contexts()[0] || (await browser.newContext({ viewport }));
    const page = await context.newPage();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto(target.url, { waitUntil: "networkidle", timeout: 120000 });
    await page.screenshot({
      fullPage: true,
      path: path.join(REF_DIR, `${target.name}-${viewport.label}.png`),
    });
    await page.close();
    await browser.close();
  }
}

async function main() {
  await ensureDirs();

  for (const target of targets) {
    const browser = await chromium.connectOverCDP(CDP_URL);
    const context =
      browser.contexts()[0] ||
      (await browser.newContext({ viewport: { width: 1440, height: 2200 } }));
    await capturePage(context, target);
    await browser.close();
    await captureScreens(target);
  }

  const summary = targets.map((target) => slugify(target.name)).join(", ");
  await fs.writeFile(
    path.join(OUT_DIR, "README.md"),
    `# mddjclub.com extraction\n\nCaptured targets: ${summary}\n`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
