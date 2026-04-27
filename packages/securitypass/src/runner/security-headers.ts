import type { Severity, Verdict } from "../types/index.js";

// The five baseline browser-security headers SecurityPass checks for in the
// smoke profile. Mirrors OWASP Secure Headers Project Tier 1 + adds
// Permissions-Policy. Names normalized to lower-case for case-insensitive
// header lookup; `fetch` returns a Headers object that already does this
// but the constants stay lower so display logic is consistent.
export const BASELINE_HEADERS = [
  "content-security-policy",
  "strict-transport-security",
  "x-frame-options",
  "x-content-type-options",
  "permissions-policy",
] as const;

export type BaselineHeader = (typeof BASELINE_HEADERS)[number];

export interface HeaderCheck {
  header: BaselineHeader;
  present: boolean;
  value: string | null;
  severity: Severity;
}

export interface SecurityHeadersResult {
  url: string;
  fetched_at: string;
  status_code: number;
  checks: HeaderCheck[];
  verdict: Verdict;
  on_fail_comment?: string;
}

const SEVERITY_BY_HEADER: Record<BaselineHeader, Severity> = {
  "content-security-policy": "high",
  "strict-transport-security": "high",
  "x-frame-options": "medium",
  "x-content-type-options": "medium",
  "permissions-policy": "low",
};

export interface ProbeOptions {
  timeoutMs?: number;
  // TODO(securitypass-runner): swap to Stagehand when full E2E browser
  // context is needed (CSP nonces, JS-injected headers, frame ancestors
  // verification). For Chunk 1, `fetch` is enough to read response headers.
  fetchImpl?: typeof fetch;
}

export async function checkSecurityHeaders(
  url: string,
  opts: ProbeOptions = {},
): Promise<SecurityHeadersResult> {
  const { timeoutMs = 10_000, fetchImpl = fetch } = opts;

  const controller = new AbortController();
  const tid = setTimeout(() => controller.abort(), timeoutMs);
  let res: Response;
  try {
    res = await fetchImpl(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
    });
  } finally {
    clearTimeout(tid);
  }

  const checks: HeaderCheck[] = BASELINE_HEADERS.map((header) => {
    const value = res.headers.get(header);
    return {
      header,
      present: value !== null,
      value,
      severity: SEVERITY_BY_HEADER[header],
    };
  });

  const missing = checks.filter((c) => !c.present);
  const verdict: Verdict = missing.length === 0 ? "check" : "fail";
  const on_fail_comment =
    missing.length === 0
      ? undefined
      : `Missing headers: ${missing.map((c) => c.header).join(", ")}`;

  return {
    url,
    fetched_at: new Date().toISOString(),
    status_code: res.status,
    checks,
    verdict,
    on_fail_comment,
  };
}

// Hardcoded target for the Chunk 1 skeleton runner. Real packs supply
// targets via the SecurityPack schema; this constant stays so the
// `runSkeletonScan` entrypoint has something deterministic to bind to.
export const SKELETON_TARGET_URL = "https://unclick.world";
