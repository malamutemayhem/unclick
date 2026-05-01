import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

// Guard against committing real secrets in fixtures and docs. Scans known
// content directories for common high-entropy credential prefixes. Test-only;
// no source behavior changes. Failure messages mask the offending value.

const ROOT = process.cwd();
const ROOT_DIRS = ["docs", "public/dogfood"];
const EXTRA_FILES = ["playwright-fixture.ts"];

const PATTERNS: ReadonlyArray<readonly [string, RegExp]> = [
  ["Stripe live secret", /\bsk_live_[A-Za-z0-9]{16,}/],
  ["Stripe test secret", /\bsk_test_[A-Za-z0-9]{16,}/],
  ["Stripe live publishable", /\bpk_live_[A-Za-z0-9]{16,}/],
  ["Stripe test publishable", /\bpk_test_[A-Za-z0-9]{16,}/],
  ["GitHub PAT", /\bghp_[A-Za-z0-9]{20,}/],
  ["GitHub OAuth", /\bgho_[A-Za-z0-9]{20,}/],
  ["GitHub user-to-server", /\bghu_[A-Za-z0-9]{20,}/],
  ["GitHub server-to-server", /\bghs_[A-Za-z0-9]{20,}/],
  ["GitHub refresh", /\bghr_[A-Za-z0-9]{20,}/],
  ["Slack bot token", /\bxoxb-[A-Za-z0-9-]{20,}/],
  ["Slack user token", /\bxoxp-[A-Za-z0-9-]{20,}/],
  ["OpenAI project key", /\bsk-proj-[A-Za-z0-9_-]{20,}/],
  ["Anthropic API key", /\bsk-ant-[A-Za-z0-9_-]{20,}/],
  ["JWT triple", /\beyJ[A-Za-z0-9_-]{8,}\.eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}/],
];

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (st.isFile()) out.push(full);
  }
  return out;
}

function mask(snippet: string): string {
  if (snippet.length <= 6) return "*".repeat(snippet.length);
  return snippet.slice(0, 4) + "*".repeat(Math.min(snippet.length - 4, 16));
}

const FILES = [
  ...ROOT_DIRS.flatMap((r) => walk(resolve(ROOT, r))),
  ...EXTRA_FILES.map((f) => resolve(ROOT, f)).filter(existsSync),
];

describe("redaction guard: fixtures and docs", () => {
  it("scans at least one file", () => {
    expect(FILES.length).toBeGreaterThan(0);
  });

  for (const file of FILES) {
    const rel = file.replace(ROOT, "").replace(/\\/g, "/");
    it(`is clean: ${rel}`, () => {
      const text = readFileSync(file, "utf8");
      for (const [name, re] of PATTERNS) {
        const m = text.match(re);
        const masked = m ? mask(m[0]) : "";
        expect(m, `${name} prefix found in ${rel}: ${masked}`).toBeNull();
      }
    });
  }
});
