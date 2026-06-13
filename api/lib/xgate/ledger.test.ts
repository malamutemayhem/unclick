import { describe, expect, it } from "vitest";
import { buildLedgerEntry, redactSecrets } from "./ledger";
import type { PolicyDecision } from "./policy-engine";
import type { GateContext, GateResult } from "./types";

// Provider-shaped secrets are assembled from a prefix + body so no complete
// token literal lives in source (secret scanners flag the full shapes). The
// runtime value is identical, so the redaction behaviour under test is the
// same as a real credential.
const awsKey = "AKIA" + "Z4XYABCD1234WXYZ";
const ghToken = "ghp" + "_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const skKey = "sk-" + "ABCDEFGHIJKLMNOPQRSTUVWX";
const slackToken = "xox" + "b-1234567890-ABCDEFGHIJKLMNOP";

describe("redactSecrets", () => {
  it("masks a live-looking AWS access key", () => {
    const out = redactSecrets(`aws_key=${awsKey} committed`);
    expect(out).not.toContain(awsKey);
    expect(out).toContain("[redacted secret]");
  });

  it("masks a GitHub personal access token", () => {
    const out = redactSecrets(`token ${ghToken} here`);
    expect(out).not.toContain(ghToken);
    expect(out).toContain("[redacted secret]");
  });

  it("masks an OpenAI-style sk- key", () => {
    const out = redactSecrets(`OPENAI=${skKey}`);
    expect(out).not.toContain(skKey);
    expect(out).toContain("[redacted secret]");
  });

  it("masks a Slack token", () => {
    const out = redactSecrets(slackToken);
    expect(out).not.toContain(slackToken);
    expect(out).toContain("[redacted secret]");
  });

  it("masks an Authorization bearer token", () => {
    const out = redactSecrets("Authorization: Bearer abc123def456ghi789jkl");
    expect(out).not.toContain("abc123def456ghi789jkl");
    expect(out).toContain("[redacted secret]");
  });

  it("masks key=value style credentials", () => {
    const out = redactSecrets('password="hunter2-super-secret-value"');
    expect(out).not.toContain("hunter2-super-secret-value");
    expect(out).toContain("[redacted secret]");
  });

  it("masks long hex blobs", () => {
    const blob = "deadbeef".repeat(5);
    const out = redactSecrets(`hash ${blob}`);
    expect(out).not.toContain(blob);
    expect(out).toContain("[redacted secret]");
  });

  it("masks a PEM private key block", () => {
    const marker = "PRIVATE KEY";
    const pem = `-----BEGIN RSA ${marker}-----\nMIIEowIBAAKCAQEA\n-----END RSA ${marker}-----`;
    const out = redactSecrets(pem);
    expect(out).not.toContain("MIIEowIBAAKCAQEA");
    expect(out).toContain("[redacted private key]");
  });

  it("leaves clean text untouched", () => {
    const clean = "git commit -m 'fix typo in README'";
    expect(redactSecrets(clean)).toBe(clean);
  });

  it("never throws on non-string input", () => {
    expect(() => redactSecrets(undefined as unknown as string)).not.toThrow();
    expect(redactSecrets(undefined as unknown as string)).toBe("");
  });
});

const ctx: GateContext = {
  action: {
    class: "git",
    raw: `git commit -m 'add key ${ghToken}'`,
    tool: "github.commit",
  },
  environment: "prod",
  autonomyLevel: "unattended",
  now: Date.parse("2026-06-02T00:00:00.000Z"),
};

const deciding: GateResult = {
  gate: "SecretGate",
  verdict: "deny",
  ruleId: "secret.github_token",
  reason: `Credential ${ghToken} in commit`,
  evidence: [],
};

const decision: PolicyDecision = {
  verdict: "deny",
  results: [deciding],
  deciding,
};

describe("buildLedgerEntry", () => {
  it("produces an entry with the frozen shape and values", () => {
    const entry = buildLedgerEntry(ctx, decision, "auto", {
      agentId: "builder-1",
      sessionId: "sess-42",
      client: "claude",
      model: "test-model",
      proofRef: "abc123sha",
    });

    expect(entry).toMatchObject({
      ts: "2026-06-02T00:00:00.000Z",
      agent_id: "builder-1",
      session_id: "sess-42",
      client: "claude",
      model: "test-model",
      action_class: "git",
      tool: "github.commit",
      environment: "prod",
      verdict: "deny",
      rule_id: "secret.github_token",
      authority: "auto",
      proof_ref: "abc123sha",
      reversal: null,
    });
  });

  it("redacts secrets from the stored target and reason", () => {
    const entry = buildLedgerEntry(ctx, decision, "auto");
    expect(entry.target).not.toContain(ghToken);
    expect(entry.target).toContain("[redacted secret]");
    expect(entry.reason).not.toContain(ghToken);
    expect(entry.reason).toContain("[redacted secret]");
  });

  it("defaults optional identity fields to null", () => {
    const entry = buildLedgerEntry(ctx, decision, "kill_switch");
    expect(entry.agent_id).toBeNull();
    expect(entry.session_id).toBeNull();
    expect(entry.client).toBeNull();
    expect(entry.model).toBeNull();
    expect(entry.proof_ref).toBeNull();
    expect(entry.reversal).toBeNull();
    expect(entry.authority).toBe("kill_switch");
  });

  it("takes the timestamp from ctx.now and accepts an override", () => {
    const fromCtx = buildLedgerEntry(ctx, decision, "auto");
    expect(fromCtx.ts).toBe("2026-06-02T00:00:00.000Z");

    const overridden = buildLedgerEntry(ctx, decision, "auto", {
      now: Date.parse("2030-01-01T00:00:00.000Z"),
    });
    expect(overridden.ts).toBe("2030-01-01T00:00:00.000Z");
  });

  it("truncates an overlong target to the max length", () => {
    const longCtx: GateContext = {
      ...ctx,
      action: { class: "shell", raw: "echo hello world ".repeat(40), tool: "t" },
    };
    const entry = buildLedgerEntry(longCtx, decision, "auto", { maxLen: 100 });
    expect(entry.target.length).toBe(100);
    expect(entry.target.endsWith("...")).toBe(true);
  });
});
