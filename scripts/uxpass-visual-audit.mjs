#!/usr/bin/env node
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

function readArgs(argv) {
  const args = {
    url: null,
    viewport: "desktop",
    outDir: path.join(repoRoot, "uxpass-artifacts"),
    failOnHigh: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--viewport") args.viewport = argv[++i] ?? args.viewport;
    else if (arg === "--out") args.outDir = path.resolve(argv[++i] ?? args.outDir);
    else if (arg === "--fail-on-high") args.failOnHigh = true;
    else if (!args.url) args.url = arg;
  }
  return args;
}

const viewports = {
  mobile: { name: "mobile", width: 390, height: 844 },
  tablet: { name: "tablet", width: 834, height: 1194 },
  desktop: { name: "desktop", width: 1440, height: 900 },
};

const args = readArgs(process.argv.slice(2));
if (!args.url) {
  console.error("Usage: node scripts/uxpass-visual-audit.mjs <url> [--viewport mobile|tablet|desktop] [--out dir] [--fail-on-high]");
  process.exit(2);
}

const auditModulePath = path.join(repoRoot, "packages", "uxpass", "dist", "visual-audit.js");
let auditModule;
try {
  auditModule = await import(pathToFileURL(auditModulePath).href);
} catch (error) {
  console.error("UXPass visual audit needs the uxpass package built first.");
  console.error("Run: npm --workspace @unclick/uxpass run build");
  console.error(error.message);
  process.exit(2);
}

const viewport = viewports[args.viewport] ?? viewports.desktop;
await mkdir(args.outDir, { recursive: true });

const safeName = args.url.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").slice(0, 80) || "target";
const screenshotPath = path.join(args.outDir, `${safeName}-${viewport.name}.png`);
const snapshotPath = path.join(args.outDir, `${safeName}-${viewport.name}.json`);

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
  await page.goto(args.url, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const snapshot = await page.evaluate(({ viewportName, screenshot }) => {
    function toRect(rect) {
      return {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
      };
    }

    function selectorFor(element) {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const parts = [];
      let current = element;
      while (current && current.nodeType === Node.ELEMENT_NODE && current !== document.body) {
        const tag = current.tagName.toLowerCase();
        const parent = current.parentElement;
        if (!parent) break;
        const siblings = Array.from(parent.children).filter((sibling) => sibling.tagName === current.tagName);
        const index = siblings.indexOf(current) + 1;
        parts.unshift(siblings.length > 1 ? `${tag}:nth-of-type(${index})` : tag);
        current = parent;
      }
      return parts.length ? parts.join(" > ") : element.tagName.toLowerCase();
    }

    function elementText(element) {
      const text = element.innerText || element.textContent || "";
      return text.replace(/\s+/g, " ").trim().slice(0, 240);
    }

    const elements = Array.from(document.querySelectorAll("body *"))
      .slice(0, 2500)
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        const parentRect = element.parentElement ? element.parentElement.getBoundingClientRect() : null;
        const visible = style.display !== "none"
          && style.visibility !== "hidden"
          && Number(style.opacity) > 0
          && rect.width > 0
          && rect.height > 0;
        return {
          id: element.id || undefined,
          selector: selectorFor(element),
          tagName: element.tagName,
          role: element.getAttribute("role"),
          text: elementText(element),
          ariaLabel: element.getAttribute("aria-label"),
          title: element.getAttribute("title"),
          className: typeof element.className === "string" ? element.className : "",
          visible,
          disabled: element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true",
          rect: toRect(rect),
          parentRect: parentRect ? toRect(parentRect) : null,
          scrollWidth: element.scrollWidth,
          scrollHeight: element.scrollHeight,
          clientWidth: element.clientWidth,
          clientHeight: element.clientHeight,
          fontSize: Number.parseFloat(style.fontSize),
          fontWeight: style.fontWeight,
          color: style.color,
          backgroundColor: style.backgroundColor,
        };
      });

    return {
      url: location.href,
      capturedAt: new Date().toISOString(),
      screenshotPath: screenshot,
      viewport: {
        name: viewportName,
        width: window.innerWidth,
        height: window.innerHeight,
      },
      document: {
        scrollWidth: document.documentElement.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        clientWidth: document.documentElement.clientWidth,
        clientHeight: document.documentElement.clientHeight,
      },
      elements,
    };
  }, { viewportName: viewport.name, screenshot: screenshotPath });

  const summary = auditModule.evaluateVisualAuditSnapshot(snapshot);
  await writeFile(snapshotPath, JSON.stringify({ snapshot, summary }, null, 2));
  console.log(JSON.stringify({
    url: snapshot.url,
    viewport: snapshot.viewport,
    screenshot_path: screenshotPath,
    snapshot_path: snapshotPath,
    issue_count: summary.issueCount,
    by_kind: summary.byKind,
    by_severity: summary.bySeverity,
    top_issues: summary.issues.slice(0, 10),
  }, null, 2));

  if (args.failOnHigh && (summary.bySeverity.critical > 0 || summary.bySeverity.high > 0)) {
    process.exit(1);
  }
} finally {
  await browser.close();
}
