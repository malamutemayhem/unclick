import {
  checkSecurityHeaders,
  SKELETON_TARGET_URL,
  type ProbeOptions,
  type SecurityHeadersResult,
} from "./security-headers.js";
import {
  appendNotChecked,
  appendScopePerformed,
  appendFinding,
  createRun,
  getRun,
  listFindings,
  setRunStatus,
  type CreateRunInput,
} from "./run-store.js";
import type {
  Finding,
  NotCheckedItem,
  RunProfile,
  RunRow,
  SecurityRunTarget,
} from "../types/index.js";
import { verifyScopeOrThrow, type ScopeVerificationOptions } from "../scope/verify.js";
import type { SecurityPack, PackCheck, PackTarget } from "../types/pack-schema.js";
import { runCommand, type CommandRunner } from "../probes/command-runner.js";
import { buildGitleaksCommand, gitleaksResultFromCommand } from "../probes/gitleaks.js";
import { buildOsvScannerCommand, osvResultFromCommand } from "../probes/osv-scanner.js";
import type { SecurityProbeFinding } from "../probes/types.js";

// Public surface boundary.
//
// We deliberately do NOT re-export `./security-headers.js` or
// `./run-store.js` from this barrel. The active probe (checkSecurityHeaders)
// and the run-store write APIs (createRun, appendFinding, setRunStatus)
// must stay internal so a consumer cannot route around the scope gate by
// importing the probe directly from `@unclick/securitypass` or
// `@unclick/securitypass/runner`. Enforced by scope-gate.test.ts.
//
// Public callers reach probes ONLY through `runSkeletonScan` (and, in
// later chunks, `performStartRun`), both of which call verifyScopeOrThrow
// before any I/O. The scope module is re-exported so consumers can type
// the scope proof error.
export * from "../scope/verify.js";

export interface SkeletonScanResult {
  run: RunRow;
  finding: Finding;
  headers: SecurityHeadersResult;
}

export interface SecurityPackRunResult {
  run: RunRow;
  findings: Finding[];
}

export interface SecurityPackRunOptions {
  commandRunner?: CommandRunner;
  fetchImpl?: typeof fetch;
  resolveTxt?: ScopeVerificationOptions["resolveTxt"];
}

function targetFromPackTarget(target: PackTarget): SecurityRunTarget {
  return {
    id: target.id,
    type: target.type,
    url: target.url,
    repo: target.repo,
    branch: target.branch,
  };
}

function checkAppliesToProfile(check: PackCheck, profile: RunProfile): boolean {
  return check.profiles.includes(profile);
}

function notChecked(check: PackCheck, reason: string, evidence: Record<string, unknown> = {}): NotCheckedItem {
  return {
    check_id: check.id,
    title: check.title,
    reason,
    category: check.category,
    severity: check.severity,
    evidence,
  };
}

function findingFromProbe(check: PackCheck, finding: SecurityProbeFinding): Omit<Finding, "id" | "run_id" | "created_at"> {
  return {
    check_id: finding.check_id,
    title: finding.title,
    severity: finding.severity,
    verdict: finding.verdict,
    category: finding.category,
    description: finding.description ?? check.description,
    remediation: finding.remediation ?? check.remediation,
    on_fail_comment: check.on_fail,
    evidence: finding.evidence,
  };
}

function checkedFinding(check: PackCheck, evidence: Record<string, unknown>): Omit<Finding, "id" | "run_id" | "created_at"> {
  return {
    check_id: check.id,
    title: check.title,
    severity: check.severity,
    verdict: "check",
    category: check.category,
    description: check.description,
    remediation: check.remediation,
    on_fail_comment: check.on_fail,
    evidence,
  };
}

function commandFailureNotChecked(check: PackCheck, command: string, err: unknown): NotCheckedItem {
  const detail = err instanceof Error ? err.message : String(err);
  return notChecked(check, `${command} could not run on this host.`, {
    command,
    detail,
  });
}

function appendProbeFindings(
  runId: string,
  check: PackCheck,
  findings: SecurityProbeFinding[],
  emptyEvidence: Record<string, unknown>,
): void {
  if (findings.length === 0) {
    appendFinding(runId, checkedFinding(check, emptyEvidence));
    return;
  }
  for (const finding of findings) {
    appendFinding(runId, findingFromProbe(check, finding));
  }
}

// Skeleton scan: the smallest SHARED RUN PATH for SecurityPass. Every
// entry point that wants to start a scan (MCP tool `securitypass_run`,
// future Vercel API `performStartRun`, future admin UI button, future
// scheduled-monitor cron) MUST go through a scope-verified runner so the
// gate runs exactly once and cannot be routed around.
//
// Order of operations is load-bearing:
//   1. verifyScopeOrThrow   -- throws before any I/O when proof is absent
//   2. createRun            -- only after scope is confirmed
//   3. setRunStatus running -- once we are committed to probing
//   4. checkSecurityHeaders -- the only network I/O in Chunk 1
//
// Do not move the gate below createRun. A run row written before scope is
// verified would leak the fact that we attempted contact with an
// unauthorised target, and could be used to harvest target lists.
export async function runSkeletonScan(
  input: Partial<CreateRunInput> = {},
  opts: ProbeOptions & ScopeVerificationOptions = {},
): Promise<SkeletonScanResult> {
  const url = input.target?.url ?? SKELETON_TARGET_URL;
  const target: SecurityRunTarget = input.target ?? { type: "url", url };

  await verifyScopeOrThrow(target, opts);

  const run = createRun({
    pack_id: input.pack_id ?? "securitypass-skeleton",
    target,
    profile: input.profile ?? "smoke",
  });
  appendScopePerformed(run.id, `Scope verified by ${opts.proofMethod ?? "unknown"} before active probing.`);
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
  return { run: getRun(run.id) ?? run, finding, headers };
}

export async function runSecurityPack(
  pack: SecurityPack,
  input: {
    target_id?: string;
    profile?: RunProfile;
  } = {},
  opts: SecurityPackRunOptions = {},
): Promise<SecurityPackRunResult> {
  const profile = input.profile ?? "smoke";
  const packTarget =
    (input.target_id ? pack.targets.find((target) => target.id === input.target_id) : undefined) ??
    pack.targets[0];
  if (!packTarget) {
    throw new Error("SecurityPass pack must include at least one target.");
  }

  const target = targetFromPackTarget(packTarget);
  const scopeProof = await verifyScopeOrThrow(target, {
    contractId: pack.scope_contract.contract_id,
    proofMethod: pack.scope_contract.proof_method,
    expectedToken: pack.scope_contract.expected_token,
    fetchImpl: opts.fetchImpl,
    resolveTxt: opts.resolveTxt,
  });

  const run = createRun({
    pack_id: pack.id,
    target,
    profile,
  });
  appendScopePerformed(
    run.id,
    `Scope verified by ${scopeProof.proof_method ?? "unknown"} for contract ${scopeProof.contract_id ?? "unknown"}.`,
  );
  setRunStatus(run.id, "running");

  const commandRunner = opts.commandRunner ?? runCommand;
  const checks = pack.checks.filter((check) => checkAppliesToProfile(check, profile));
  if (checks.length === 0) {
    appendNotChecked(run.id, {
      check_id: "securitypass.profile.empty",
      title: "No checks selected for this profile",
      reason: `No checks in ${pack.id} apply to the ${profile} profile.`,
      category: "coverage",
      severity: "info",
    });
  }

  for (const check of checks) {
    if (check.probe === "security-headers") {
      if (!target.url) {
        appendNotChecked(run.id, notChecked(check, "Security headers check requires a URL target."));
        continue;
      }
      const headers = await checkSecurityHeaders(target.url, { fetchImpl: opts.fetchImpl });
      appendScopePerformed(run.id, `${check.id}: fetched response headers from ${target.url}.`);
      appendFinding(run.id, {
        check_id: check.id,
        title: check.title,
        severity: check.severity,
        verdict: headers.verdict,
        category: check.category,
        description: check.description,
        remediation: check.remediation,
        on_fail_comment: headers.on_fail_comment ?? check.on_fail,
        evidence: { status_code: headers.status_code, checks: headers.checks },
      });
      continue;
    }

    if (check.probe === "gitleaks") {
      const repoPath = target.repo ?? target.url;
      if (!repoPath) {
        appendNotChecked(run.id, notChecked(check, "Gitleaks check requires a git repo path."));
        continue;
      }
      const command = buildGitleaksCommand(repoPath);
      try {
        const result = await commandRunner(command);
        if (result.exitCode !== 0 && !result.stdout.trim()) {
          appendNotChecked(run.id, notChecked(check, "Gitleaks returned a non-zero exit without JSON evidence.", {
            exit_code: result.exitCode,
            stderr: result.stderr,
          }));
          continue;
        }
        const findings = gitleaksResultFromCommand(target, command, result).findings;
        appendScopePerformed(run.id, `${check.id}: ran gitleaks against ${repoPath}.`);
        appendProbeFindings(run.id, check, findings, {
          probe: "gitleaks",
          exit_code: result.exitCode,
          finding_count: 0,
        });
      } catch (err) {
        appendNotChecked(run.id, commandFailureNotChecked(check, "gitleaks", err));
      }
      continue;
    }

    if (check.probe === "osv-scanner") {
      const repoPath = target.repo ?? target.url;
      if (!repoPath) {
        appendNotChecked(run.id, notChecked(check, "OSV-Scanner check requires a git repo path."));
        continue;
      }
      const command = buildOsvScannerCommand(repoPath);
      try {
        const result = await commandRunner(command);
        if (result.exitCode !== 0 && !result.stdout.trim()) {
          appendNotChecked(run.id, notChecked(check, "OSV-Scanner returned a non-zero exit without JSON evidence.", {
            exit_code: result.exitCode,
            stderr: result.stderr,
          }));
          continue;
        }
        const findings = osvResultFromCommand(target, command, result).findings;
        appendScopePerformed(run.id, `${check.id}: ran osv-scanner against ${repoPath}.`);
        appendProbeFindings(run.id, check, findings, {
          probe: "osv-scanner",
          exit_code: result.exitCode,
          finding_count: 0,
        });
      } catch (err) {
        appendNotChecked(run.id, commandFailureNotChecked(check, "osv-scanner", err));
      }
      continue;
    }

    appendNotChecked(
      run.id,
      notChecked(check, `Probe '${check.probe}' is declared in the pack but not wired in this runner yet.`),
    );
  }

  setRunStatus(run.id, "complete");
  const finalRun = getRun(run.id) ?? run;
  return { run: finalRun, findings: listFindings(run.id) };
}
