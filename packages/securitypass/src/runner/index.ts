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
import type { Finding, RunRow, SecurityRunTarget } from "../types/index.js";
import { verifyScopeOrThrow } from "../scope/verify.js";

export * from "./security-headers.js";
export * from "./run-store.js";
export * from "../scope/verify.js";

export interface SkeletonScanResult {
  run: RunRow;
  finding: Finding;
  headers: SecurityHeadersResult;
}

// Skeleton scan: the SHARED RUN PATH for SecurityPass in Chunk 1. Every
// entry point that wants to start a scan (MCP tool `securitypass_run`,
// future Vercel API `performStartRun`, future admin UI button, future
// scheduled-monitor cron) MUST go through this function so the scope gate
// runs exactly once and cannot be routed around.
//
// Order of operations is load-bearing:
//   1. verifyScopeOrThrow   -- deny-by-default; throws before any I/O
//   2. createRun            -- only after scope is confirmed
//   3. setRunStatus running -- once we are committed to probing
//   4. checkSecurityHeaders -- the only network I/O in Chunk 1
//
// Do not move the gate below createRun. A run row written before scope is
// verified would leak the fact that we attempted contact with an
// unauthorised target, and could be used to harvest target lists.
export async function runSkeletonScan(
  input: Partial<CreateRunInput> = {},
  opts: ProbeOptions = {},
): Promise<SkeletonScanResult> {
  const url = input.target?.url ?? SKELETON_TARGET_URL;
  const target: SecurityRunTarget = input.target ?? { type: "url", url };

  // Deny-all gate. Until Chunk 2 ships real verification, this throws
  // ScopeUnverifiedError unconditionally. See scope/verify.ts.
  verifyScopeOrThrow(target);

  const run = createRun({
    pack_id: input.pack_id ?? "securitypass-skeleton",
    target,
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
