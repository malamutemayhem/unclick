import type { VercelRequest } from "@vercel/node";
import { afterEach, describe, expect, it } from "vitest";
import {
  coerceDecisionOutcome,
  parseXGateCheckBody,
  resolveXGateAuthority,
  sha256hex,
} from "./xgate-check.js";

const originalCronSecret = process.env.CRON_SECRET;

afterEach(() => {
  if (originalCronSecret === undefined) delete process.env.CRON_SECRET;
  else process.env.CRON_SECRET = originalCronSecret;
});

describe("parseXGateCheckBody", () => {
  it("builds the frozen gate context from a valid request", () => {
    const parsed = parseXGateCheckBody(
      {
        action: {
          class: "git",
          raw: "git push --force origin main",
          tool: "Bash",
          targetEnv: "prod",
          targetFiles: ["README.md"],
        },
        context: {
          autonomyLevel: "unattended",
          ownedFiles: ["README.md"],
          tainted: true,
          now: 42,
        },
        metadata: {
          agent_id: "builder-9",
          session_id: "XGateChatGPT_9",
          client: "codex",
          proof_ref: "xpass_receipt_v1:abc",
        },
      },
      99,
    );

    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;
    expect(parsed.value.context).toMatchObject({
      environment: "prod",
      autonomyLevel: "unattended",
      ownedFiles: ["README.md"],
      tainted: true,
      now: 42,
    });
    expect(parsed.value.metadata).toMatchObject({
      agent_id: "builder-9",
      session_id: "XGateChatGPT_9",
      client: "codex",
      proof_ref: "xpass_receipt_v1:abc",
    });
  });

  it("fails closed on invalid action shapes", () => {
    expect(parseXGateCheckBody({ action: { class: "unknown", raw: "", tool: "Bash" } }).ok).toBe(false);
    expect(parseXGateCheckBody("{not json").ok).toBe(false);
    expect(parseXGateCheckBody({ action: { class: "git", raw: "", tool: "" } }).ok).toBe(false);
  });
});

describe("resolveXGateAuthority", () => {
  it("accepts CRON_SECRET bearer auth and hashes the token", async () => {
    process.env.CRON_SECRET = "cron-secret";

    const result = await resolveXGateAuthority(
      {
        headers: { authorization: "Bearer cron-secret" },
      } as unknown as VercelRequest,
      "https://supabase.example.test",
      "service-role",
    );

    expect(result).toEqual({
      ok: true,
      authority: "token",
      apiKeyHash: sha256hex("cron-secret"),
      actor: "cron",
    });
  });

  it("rejects missing bearer auth before admin lookup", async () => {
    const result = await resolveXGateAuthority(
      { headers: {} } as unknown as VercelRequest,
      "https://supabase.example.test",
      "service-role",
    );

    expect(result).toEqual({ ok: false, status: 401, error: "Missing Bearer token" });
  });
});

describe("coerceDecisionOutcome", () => {
  it("accepts direct or wrapped decisions", () => {
    const fallback = { verdict: "ask" as const, deciding: { ruleId: "fallback" } };
    const direct = { verdict: "deny" as const, halt: true, deciding: { ruleId: "direct" } };
    const wrapped = { decision: { verdict: "allow" as const, deciding: { ruleId: "wrapped" } }, halt: true };

    expect(coerceDecisionOutcome(direct, fallback)).toEqual({ decision: direct, halt: true });
    expect(coerceDecisionOutcome(wrapped, fallback)).toEqual({ decision: wrapped.decision, halt: true });
    expect(coerceDecisionOutcome(null, fallback)).toEqual({ decision: fallback, halt: false });
  });
});
