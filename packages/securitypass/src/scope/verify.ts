import { createHash } from "node:crypto";
import { resolveTxt as nodeResolveTxt } from "node:dns/promises";
import type { SecurityRunTarget } from "../types/index.js";

export type ScopeProofMethod = "dns_txt" | "well_known" | "bug_bounty_program" | "signed_email";
export type TxtResolver = (hostname: string) => Promise<string[][]>;

export interface ScopeVerificationOptions {
  contractId?: string;
  proofMethod?: ScopeProofMethod;
  expectedToken?: string;
  fetchImpl?: typeof fetch;
  resolveTxt?: TxtResolver;
}

export interface ScopeVerificationResult {
  verified: boolean;
  target: SecurityRunTarget;
  proof_method: ScopeProofMethod | null;
  contract_id: string | null;
  checked_at: string;
  reason?: string;
  evidence: Record<string, unknown>;
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function targetHost(target: SecurityRunTarget): string | null {
  if (!target.url) return null;
  try {
    return new URL(target.url).hostname;
  } catch {
    return null;
  }
}

function targetOrigin(target: SecurityRunTarget): string | null {
  if (!target.url) return null;
  try {
    return new URL(target.url).origin;
  } catch {
    return null;
  }
}

function tokenFromWellKnown(body: unknown): string[] {
  if (!body || typeof body !== "object") return [];
  const record = body as Record<string, unknown>;
  const candidates: unknown[] = [
    record.token,
    record.expected_token,
    record.securitypass_token,
    (record.securitypass_scope as Record<string, unknown> | undefined)?.token,
    (record.securitypass_scope as Record<string, unknown> | undefined)?.expected_token,
  ];
  if (Array.isArray(record.tokens)) candidates.push(...record.tokens);
  return candidates.filter((value): value is string => typeof value === "string");
}

function failure(
  target: SecurityRunTarget,
  opts: ScopeVerificationOptions,
  reason: string,
  evidence: Record<string, unknown> = {},
): ScopeVerificationResult {
  return {
    verified: false,
    target,
    proof_method: opts.proofMethod ?? null,
    contract_id: opts.contractId ?? null,
    checked_at: new Date().toISOString(),
    reason,
    evidence,
  };
}

function success(
  target: SecurityRunTarget,
  opts: ScopeVerificationOptions,
  evidence: Record<string, unknown>,
): ScopeVerificationResult {
  return {
    verified: true,
    target,
    proof_method: opts.proofMethod ?? null,
    contract_id: opts.contractId ?? null,
    checked_at: new Date().toISOString(),
    evidence,
  };
}

export async function verifyScope(
  target: SecurityRunTarget,
  opts: ScopeVerificationOptions = {},
): Promise<ScopeVerificationResult> {
  const proofMethod = opts.proofMethod;
  const expectedToken = opts.expectedToken?.trim();
  if (!proofMethod) {
    return failure(target, opts, "No scope proof method was supplied.");
  }

  if (proofMethod === "signed_email" || proofMethod === "bug_bounty_program") {
    if (!opts.contractId || !expectedToken) {
      return failure(target, opts, `${proofMethod} scope requires a contract id and expected token.`);
    }
    return success(target, opts, {
      mode: "contract_attestation",
      token_sha256: hashToken(expectedToken),
    });
  }

  if (!expectedToken) {
    return failure(target, opts, `${proofMethod} scope requires an expected token.`);
  }

  if (proofMethod === "dns_txt") {
    const host = targetHost(target);
    if (!host) return failure(target, opts, "DNS TXT scope verification requires a URL target.");
    const resolveTxt = opts.resolveTxt ?? nodeResolveTxt;
    const recordNames = [`_securitypass-scope.${host}`, host];
    const checked: Array<{ record: string; found: boolean }> = [];
    for (const recordName of recordNames) {
      try {
        const txtRecords = await resolveTxt(recordName);
        const flattened = txtRecords.map((parts) => parts.join(""));
        const found = flattened.some((value) => value.includes(expectedToken));
        checked.push({ record: recordName, found });
        if (found) {
          return success(target, opts, {
            record_name: recordName,
            token_sha256: hashToken(expectedToken),
          });
        }
      } catch {
        checked.push({ record: recordName, found: false });
      }
    }
    return failure(target, opts, "Expected SecurityPass DNS TXT token was not found.", { checked });
  }

  if (proofMethod === "well_known") {
    const origin = targetOrigin(target);
    if (!origin) return failure(target, opts, "Well-known scope verification requires a URL target.");
    const proofUrl = `${origin}/.well-known/securitypass-scope.json`;
    const fetchImpl = opts.fetchImpl ?? fetch;
    let response: Response;
    try {
      response = await fetchImpl(proofUrl, { method: "GET", redirect: "follow" });
    } catch (err) {
      return failure(target, opts, "Well-known proof could not be fetched.", {
        proof_url: proofUrl,
        error: err instanceof Error ? err.message : String(err),
      });
    }
    const text = await response.text();
    if (!response.ok) {
      return failure(target, opts, "Well-known proof returned a non-success status.", {
        proof_url: proofUrl,
        status: response.status,
      });
    }
    try {
      const parsed = JSON.parse(text) as unknown;
      if (tokenFromWellKnown(parsed).includes(expectedToken)) {
        return success(target, opts, {
          proof_url: proofUrl,
          token_sha256: hashToken(expectedToken),
        });
      }
    } catch {
      if (text.includes(expectedToken)) {
        return success(target, opts, {
          proof_url: proofUrl,
          token_sha256: hashToken(expectedToken),
          mode: "plain_text_fallback",
        });
      }
    }
    return failure(target, opts, "Expected token was not present in the well-known proof.", {
      proof_url: proofUrl,
      status: response.status,
    });
  }

  return failure(target, opts, `Unsupported scope proof method: ${proofMethod}`);
}

export class ScopeUnverifiedError extends Error {
  readonly code = "scope_unverified" as const;
  readonly target: SecurityRunTarget;
  readonly proof?: ScopeVerificationResult;

  constructor(target: SecurityRunTarget, proof?: ScopeVerificationResult, message?: string) {
    super(
      message ??
        `SecurityPass refuses to probe ${target.url ?? target.repo ?? target.type}: ${proof?.reason ?? "scope verification failed"}.`,
    );
    this.name = "ScopeUnverifiedError";
    this.target = target;
    this.proof = proof;
  }
}

export async function verifyScopeOrThrow(
  target: SecurityRunTarget,
  opts: ScopeVerificationOptions = {},
): Promise<ScopeVerificationResult> {
  const result = await verifyScope(target, opts);
  if (!result.verified) {
    throw new ScopeUnverifiedError(target, result);
  }
  return result;
}
