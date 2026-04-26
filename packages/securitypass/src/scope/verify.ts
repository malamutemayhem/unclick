import type { SecurityRunTarget } from "../types/index.js";

// Deny-all scope gate.
//
// Why this exists: SecurityPass actively probes target URLs (HTTP requests,
// future SAST/DAST runs, future agent-driven exercises). The locked legal
// posture (Australian DTCA, US CFAA post-Van-Buren, UK CMA, cyber-liability
// insurance, investor optics) requires that NO active probe runs against an
// unauthorised target. Authorisation = a verified scope contract: DNS TXT,
// /.well-known proof, signed bug-bounty program scope, or signed contract.
//
// Until Chunk 2 ships the real verifier (DNS TXT / .well-known walker plus
// bug-bounty-program scope import), this gate refuses every target. That is
// the safe default: no scope verification capability => no active probes.
//
// Defence-in-depth: every entry point that can reach a probe MUST call this
// before any network I/O. Today that's `runSkeletonScan`. When a Vercel API
// endpoint (e.g. `performStartRun` in `api/securitypass.ts`) lands in a
// later chunk, it MUST also call this gate. Do not allow an admin-UI path
// or scheduled-monitor cron to invoke probes directly.
//
// Tests that exercise the probe helper (`checkSecurityHeaders`) hit a
// 127.0.0.1 fixture server that is not user-controllable, so they bypass
// the runner entirely. Production code paths cannot.

export class ScopeUnverifiedError extends Error {
  readonly code = "scope_unverified" as const;
  readonly target: SecurityRunTarget;
  constructor(target: SecurityRunTarget, message?: string) {
    super(
      message ??
        `SecurityPass refuses to probe ${target.url ?? target.type}: scope verification not implemented until Chunk 2 (deny-all default).`,
    );
    this.name = "ScopeUnverifiedError";
    this.target = target;
  }
}

export interface ScopeVerificationOptions {
  // Reserved for Chunk 2: caller supplies the contract + proof method so
  // the verifier knows what to look for. The Chunk 1 implementation
  // ignores all options and refuses unconditionally.
  contractId?: string;
  proofMethod?: "dns_txt" | "well_known" | "bug_bounty_program" | "signed_email";
  expectedToken?: string;
}

export function verifyScopeOrThrow(
  target: SecurityRunTarget,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _opts: ScopeVerificationOptions = {},
): void {
  // Chunk 2 replaces the throw with a real verification walk and returns
  // a branded VerifiedTarget so the runner can prove the gate ran. Until
  // then: deny-all. Do not introduce a bypass flag, even for tests.
  throw new ScopeUnverifiedError(target);
}
