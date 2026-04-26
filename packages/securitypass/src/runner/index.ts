import {
  checkSecurityHeaders,
  SKELETON_TARGET_URL,
  type ProbeOptions,
  type SecurityHeadersResult,
} from "./security-headers.js";
import {
  appendFinding,
  createRun,
  setRunStatus,
  type CreateRunInput,
} from "./run-store.js";
import type { Finding, RunRow } from "../types/index.js";

export * from "./security-headers.js";
export * from "./run-store.js";

export interface SkeletonScanResult {
  run: RunRow;
  finding: Finding;
  headers: SecurityHeadersResult;
}

// Skeleton scan: drives the security-headers probe end-to-end against the
// hardcoded SKELETON_TARGET_URL and writes a single finding into the stub
// run store. Used by the smoke test and as the wiring template for richer
// runners landing in later chunks.
export async function runSkeletonScan(
  input: Partial<CreateRunInput> = {},
  opts: ProbeOptions = {},
): Promise<SkeletonScanResult> {
  const url = input.target?.url ?? SKELETON_TARGET_URL;
  const run = createRun({
    pack_id: input.pack_id ?? "securitypass-skeleton",
    target: input.target ?? { type: "url", url },
    profile: input.profile ?? "smoke",
  });
  setRunStatus(run.id, "running");

  let headers: SecurityHeadersResult;
  try {
    headers = await checkSecurityHeaders(url, opts);
  } catch (err) {
    setRunStatus(run.id, "failed");
    throw err;
  }

  const finding = appendFinding(run.id, {
    check_id: "sec-headers.baseline",
    title: "Baseline browser security headers present",
    severity: "high",
    verdict: headers.verdict,
    category: "web.headers",
    description:
      "Verifies the response advertises CSP, HSTS, X-Frame-Options, X-Content-Type-Options, and Permissions-Policy.",
    remediation:
      "Configure the edge (Cloudflare / Vercel / nginx) to emit the missing headers with project-appropriate values.",
    on_fail_comment: headers.on_fail_comment,
    evidence: { status_code: headers.status_code, checks: headers.checks },
  });

  setRunStatus(run.id, "complete");
  return { run, finding, headers };
}
