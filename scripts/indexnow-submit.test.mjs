import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { findKeyFile, normalizeUrls, buildPayload, PUBLIC_DIR, ORIGIN, DEFAULT_PATHS } from "./indexnow-submit.mjs";

test("findKeyFile finds the committed key in public/", () => {
  const key = findKeyFile(PUBLIC_DIR);
  assert.ok(key, "expected a 32-hex IndexNow key file in public/");
  assert.match(key, /^[0-9a-f]{32}$/);
});

test("findKeyFile returns null for a directory without a key", () => {
  const dir = mkdtempSync(join(tmpdir(), "indexnow-"));
  writeFileSync(join(dir, "robots.txt"), "User-agent: *");
  assert.equal(findKeyFile(dir), null);
});

test("findKeyFile throws when two key files exist", () => {
  const dir = mkdtempSync(join(tmpdir(), "indexnow-"));
  writeFileSync(join(dir, "a".repeat(32) + ".txt"), "x");
  writeFileSync(join(dir, "b".repeat(32) + ".txt"), "x");
  assert.throws(() => findKeyFile(dir), /Multiple IndexNow key files/);
});

test("normalizeUrls expands paths and keeps same-origin absolutes", () => {
  assert.deepEqual(normalizeUrls(["/why", `${ORIGIN}/memory`]), [`${ORIGIN}/why`, `${ORIGIN}/memory`]);
});

test("normalizeUrls refuses foreign hosts", () => {
  assert.throws(() => normalizeUrls(["https://example.com/page"]), /outside/);
});

test("buildPayload produces a valid IndexNow body", () => {
  const key = "c".repeat(32);
  const payload = buildPayload(key, DEFAULT_PATHS);
  assert.equal(payload.host, "unclick.world");
  assert.equal(payload.key, key);
  assert.equal(payload.keyLocation, `${ORIGIN}/${key}.txt`);
  assert.equal(payload.urlList.length, DEFAULT_PATHS.length);
  assert.ok(payload.urlList.every((u) => u.startsWith(ORIGIN)));
});
