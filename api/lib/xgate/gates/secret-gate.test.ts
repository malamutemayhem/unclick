import { describe, it, expect } from "vitest";
import { secretGate, shannonEntropy, maskSecret } from "./secret-gate";
import type {
  ActionClass,
  ActionDescriptor,
  GateContext,
  GateVerdict,
} from "../types";

// Provider-shaped fixtures are assembled from fragments so the literal token
// never appears in this source file. That keeps GitHub push protection and
// other secret scanners from flagging the test - fittingly, the exact exposure
// SecretGate exists to prevent. The full token is reconstructed at runtime and
// is what the gate actually sees.
//
// A live-looking AWS access key id (AKIA + 16 chars) that is NOT the documented
// example and carries no placeholder markers.
const LIVE_AWS_KEY = "AKIA" + "Z8KR3F1QW2E5T7YU";
// The canonical AWS documentation example key.
const EXAMPLE_AWS_KEY = "AKIAIOSFODNN7" + "EXAMPLE";

function ctx(
  raw: string,
  cls: ActionClass = "git",
  overrides: Partial<ActionDescriptor> = {},
): GateContext {
  return {
    action: { class: cls, raw, tool: "test-tool", ...overrides },
    environment: "prod",
    autonomyLevel: "interactive",
    now: 0,
  };
}

const ALLOWED_VERDICTS: GateVerdict[] = ["allow", "deny", "ask", "rewrite"];

describe("secretGate - required behaviour", () => {
  it("blocks a live-looking AWS key in a commit", () => {
    const r = secretGate(ctx(`add config\n\nAWS_KEY=${LIVE_AWS_KEY}`, "git"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("secret.aws_access_key");
    expect(r.gate).toBe("SecretGate");
  });

  it("allows the documented example AWS key", () => {
    const r = secretGate(ctx(`see docs example ${EXAMPLE_AWS_KEY}`, "git"));
    expect(r.verdict).toBe("allow");
  });

  it("allows clean text", () => {
    const r = secretGate(ctx("docs: clarify the README and fix a typo", "git"));
    expect(r.verdict).toBe("allow");
  });

  it("masks the secret in evidence and never stores the raw value", () => {
    const r = secretGate(ctx(`commit with ${LIVE_AWS_KEY}`, "git"));
    expect(r.verdict).toBe("deny");
    const joined = r.evidence.join(" | ");
    expect(joined).toContain("secret.aws_access_key:");
    expect(joined).toContain("AKIA");
    expect(joined).toContain("*");
    // The full secret must never appear in evidence.
    expect(joined).not.toContain(LIVE_AWS_KEY);
  });
});

describe("secretGate - named signatures across exfil classes", () => {
  it("denies a GitHub token in a send action", () => {
    const token = "ghp" + "_ab12CD34ef56GH78ij90KL12mn34OP56qr78";
    const r = secretGate(ctx(`body has ${token}`, "send"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("secret.github_token");
    expect(r.evidence.join(" ")).not.toContain(token);
  });

  it("denies a bearer token in a network action", () => {
    const r = secretGate(
      ctx("Authorization: Bearer Zk9PmQ2xV7tL4wR8nB1yA5cD", "network"),
    );
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("secret.bearer_token");
  });

  it("denies a PEM private key header without leaking the body", () => {
    const raw =
      "-----BEGIN RSA PRIVATE KEY-----\nMIIEpAIBAAKCAQEAabcdef0123456789\n-----END RSA PRIVATE KEY-----";
    const r = secretGate(ctx(raw, "git"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("secret.private_key");
    expect(r.evidence.join(" ")).not.toContain("MIIEpAIBAAKCAQEA");
  });

  it("denies a Slack token in a secret action", () => {
    const slackToken = "xox" + "b-5839201746-K7mQ9pR2tV5wL8nB3yZ6cF";
    const r = secretGate(ctx(slackToken, "secret"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("secret.slack_token");
  });
});

describe("secretGate - generic high-entropy lane requires keyword proximity", () => {
  const HIGH_ENTROPY = "k3J8mQ2pX7vL9wR4tN6yB1zA5cD0eF8g";

  it("denies a high-entropy token next to a secret keyword", () => {
    const r = secretGate(ctx(`const api_key = "${HIGH_ENTROPY}";`, "git"));
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("secret.high_entropy_credential");
  });

  it("allows the same high-entropy token with no keyword nearby (no false positive)", () => {
    const r = secretGate(ctx(`build artifact id ${HIGH_ENTROPY} shipped`, "git"));
    expect(r.verdict).toBe("allow");
  });

  it("allows a commit SHA (no keyword, recognised as non-secret)", () => {
    const r = secretGate(
      ctx("Merge commit 9f8e7d6c5b4a3210fedcba9876543210feedface", "git"),
    );
    expect(r.verdict).toBe("allow");
  });
});

describe("secretGate - scoping and fail-closed behaviour", () => {
  it("escalates (ask) when a real secret appears in a non-exfil class", () => {
    const r = secretGate(ctx(`writing ${LIVE_AWS_KEY} to a file`, "filesystem"));
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("secret.aws_access_key");
  });

  it("scans the parsed payload as well as raw", () => {
    const r = secretGate(
      ctx("clean message", "git", {
        parsed: { diff: { added: `token=${LIVE_AWS_KEY}` } },
      }),
    );
    expect(r.verdict).toBe("deny");
    expect(r.ruleId).toBe("secret.aws_access_key");
  });

  it("returns ask when raw is not a string (unparseable)", () => {
    // Force a malformed descriptor to exercise the fail-closed path.
    const bad = { action: { class: "git", raw: 123, tool: "t" }, environment: "prod", autonomyLevel: "interactive", now: 0 } as unknown as GateContext;
    const r = secretGate(bad);
    expect(r.verdict).toBe("ask");
    expect(r.ruleId).toBe("secret.unparseable");
  });

  it("returns ask on a null context instead of throwing", () => {
    const r = secretGate(null as unknown as GateContext);
    expect(r.verdict).toBe("ask");
  });
});

describe("secretGate - allowlist keeps false positives near zero", () => {
  it("allows obvious placeholders even with a secret keyword", () => {
    const r = secretGate(ctx('api_key = "your_api_key_here_changeme"', "git"));
    expect(r.verdict).toBe("allow");
  });

  it("allows low-entropy repeated tokens", () => {
    const r = secretGate(ctx('token = "aaaaaaaaaaaaaaaaaaaaaaaa"', "send"));
    expect(r.verdict).toBe("allow");
  });
});

describe("secretGate - contract invariants", () => {
  const samples = [
    "",
    "hello world",
    LIVE_AWS_KEY,
    `api_key=${LIVE_AWS_KEY}`,
    "-----BEGIN PRIVATE KEY-----",
  ];
  const classes: ActionClass[] = [
    "filesystem", "git", "sql", "secret", "ship",
    "spend", "scope", "shell", "network", "send",
  ];

  it("only ever returns contract verdicts and never throws", () => {
    for (const raw of samples) {
      for (const cls of classes) {
        const r = secretGate(ctx(raw, cls));
        expect(ALLOWED_VERDICTS).toContain(r.verdict);
        expect(r.gate).toBe("SecretGate");
        expect(typeof r.ruleId).toBe("string");
        expect(Array.isArray(r.evidence)).toBe(true);
      }
    }
  });
});

describe("helpers", () => {
  it("shannonEntropy is 0 for a single repeated character and higher for varied text", () => {
    expect(shannonEntropy("aaaa")).toBe(0);
    expect(shannonEntropy("")).toBe(0);
    expect(shannonEntropy("k3J8mQ2pX7vL9wR4tN6yB1zA5cD0eF8g")).toBeGreaterThan(3.5);
  });

  it("maskSecret keeps a short prefix and hides the remainder", () => {
    const masked = maskSecret(LIVE_AWS_KEY);
    expect(masked.startsWith("AKIA")).toBe(true);
    expect(masked).not.toBe(LIVE_AWS_KEY);
    expect(masked).toContain("*");
    expect(maskSecret("short")).toBe("*****");
  });
});
