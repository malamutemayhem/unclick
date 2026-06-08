// Typed access to the AppTesting results (src/data/app-test-results.json).
// The AppTesting loop physically calls a representative action on each app's MCP
// tools and records the outcome here. The admin AppTesting page joins this with
// the generated Apps catalog (one row per app) so untested apps still show up.
//
// This is intentionally a build-time JSON file (same shape as the generated
// catalog): no migration, no live writes, fully reversible. The loop commits an
// updated file; the deploy reflects it. Upgrade to a live store later if needed.

import data from "@/data/app-test-results.json";

export type AppTestStatus = "pass" | "fail" | "attention" | "untested";

export interface AppTestResult {
  status: AppTestStatus;
  /** One-line auto result from the loop: what was tested and what happened. */
  note?: string;
  /** Free-text admin comment (behind-the-scenes). Preserved across loop runs. */
  comment?: string;
  /** ISO timestamp of the last test, or null/undefined if never tested. */
  testedAt?: string | null;
  /** Which tool action(s) were exercised. */
  toolsTested?: string[];
}

interface ResultsFile {
  updatedAt: string;
  note?: string;
  results: Record<string, AppTestResult>;
}

const file = data as ResultsFile;

export const APP_TEST_RESULTS: Record<string, AppTestResult> = file.results ?? {};
export const APP_TEST_UPDATED_AT: string = file.updatedAt ?? "";

/** Result for one app slug. Missing slugs are treated as untested. */
export function getAppTestResult(slug: string): AppTestResult {
  return APP_TEST_RESULTS[slug] ?? { status: "untested" };
}

// Presentation metadata per status. Tones reuse the palette already used by the
// admin Apps status pills (emerald / red / amber / muted).
export const APP_TEST_STATUS_META: Record<
  AppTestStatus,
  { label: string; tone: string; description: string }
> = {
  pass: {
    label: "Working",
    tone: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100",
    description: "Tested and returned a valid response.",
  },
  attention: {
    label: "Needs attention",
    tone: "border-amber-300/25 bg-amber-300/10 text-amber-100",
    description: "Works, but needs a manual step: an API key, a login, or a human check.",
  },
  fail: {
    label: "Issue",
    tone: "border-red-400/30 bg-red-400/10 text-red-200",
    description: "Errored, timed out, or returned an unusable response.",
  },
  untested: {
    label: "Untested",
    tone: "border-white/10 bg-white/[0.04] text-white/45",
    description: "Not checked yet. The loop will get to it.",
  },
};

export const APP_TEST_STATUS_ORDER: AppTestStatus[] = ["pass", "attention", "fail", "untested"];
