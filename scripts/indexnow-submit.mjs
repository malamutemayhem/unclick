#!/usr/bin/env node

/**
 * indexnow-submit.mjs - push unclick.world URLs to IndexNow after a deploy.
 *
 * Why: IndexNow gives Bing (which feeds ChatGPT browsing and Copilot) and
 * other participating engines a push signal instead of waiting on crawl.
 * The domain key file lives in public/ (committed in PR #1466); this script
 * is the submission half, runnable from any seat with open egress.
 *
 * The key is public by design: hosting <key>.txt at the site root is what
 * authorizes submissions for the domain, so there is no secret to protect.
 *
 * Usage:
 *   node scripts/indexnow-submit.mjs              # submit the default route list
 *   node scripts/indexnow-submit.mjs --dry-run    # print the payload, no network call
 *   node scripts/indexnow-submit.mjs --urls /a /b # submit specific paths or absolute URLs
 *
 * Endpoint note: api.indexnow.org fans out to all participating engines, so
 * one submission is enough; per-engine endpoints are not needed.
 */

import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import process from "node:process";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const PUBLIC_DIR = join(__dirname, "..", "public");
export const HOST = "unclick.world";
export const ORIGIN = `https://${HOST}`;
export const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

/** Core public routes worth pinging on every submit. Arena URLs churn daily and are left to crawl. */
export const DEFAULT_PATHS = ["/", "/why", "/memory", "/tools", "/docs", "/developers", "/faq"];

/** The IndexNow key file is a 32-hex-char .txt at the public root; its basename is the key. */
export function findKeyFile(publicDir) {
  const candidates = readdirSync(publicDir).filter((f) => /^[0-9a-f]{32}\.txt$/.test(f));
  if (candidates.length === 0) return null;
  if (candidates.length > 1) {
    throw new Error(`Multiple IndexNow key files found in ${publicDir}: ${candidates.join(", ")}. Keep exactly one.`);
  }
  return candidates[0].replace(/\.txt$/, "");
}

/** Accepts paths ("/why") or absolute URLs on the right origin; rejects foreign hosts loudly. */
export function normalizeUrls(inputs) {
  return inputs.map((u) => {
    if (u.startsWith("/")) return `${ORIGIN}${u}`;
    if (u.startsWith(`${ORIGIN}/`) || u === ORIGIN) return u;
    throw new Error(`Refusing to submit a URL outside ${ORIGIN}: ${u}`);
  });
}

export function buildPayload(key, urls) {
  return {
    host: HOST,
    key,
    keyLocation: `${ORIGIN}/${key}.txt`,
    urlList: normalizeUrls(urls),
  };
}

function parseArgs(argv) {
  const args = { dryRun: false, urls: null };
  const rest = argv.slice(2);
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === "--dry-run") args.dryRun = true;
    else if (rest[i] === "--urls") {
      args.urls = [];
      while (rest[i + 1] && !rest[i + 1].startsWith("--")) args.urls.push(rest[++i]);
    }
  }
  return args;
}

async function main() {
  const args = parseArgs(process.argv);
  const key = findKeyFile(PUBLIC_DIR);
  if (!key) {
    console.error("No IndexNow key file (32-hex .txt) found in public/. Nothing submitted.");
    process.exitCode = 1;
    return;
  }

  const payload = buildPayload(key, args.urls ?? DEFAULT_PATHS);
  console.log(`IndexNow submission for ${HOST} (${payload.urlList.length} URL(s)):`);
  for (const u of payload.urlList) console.log(`  ${u}`);

  if (args.dryRun) {
    console.log("Dry run: not submitted.");
    return;
  }

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });
  // IndexNow returns 200 (ok) or 202 (accepted, key validation pending); anything else is a real failure.
  if (res.status === 200 || res.status === 202) {
    console.log(`Submitted: HTTP ${res.status}.`);
  } else {
    console.error(`IndexNow rejected the submission: HTTP ${res.status} ${await res.text().catch(() => "")}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
