// SecretGate - XGate Part 2.
//
// Blocks exposure of credentials BEFORE a commit or an outbound send. This is
// the highest-leverage, lowest-false-positive gate in the family: a leaked
// credential is irreversible the instant it lands in git history or leaves the
// machine, so XGate denies it pre-execution rather than letting XPass prove it
// post-hoc.
//
// Detection combines three independent signals (from the research):
//   (a) named credential signatures - AWS access keys, GitHub tokens, Slack
//       tokens, Google API keys, sk- style keys, Stripe keys, PEM private-key
//       headers, and a generic "Authorization: Bearer ..." header;
//   (b) high Shannon entropy on token-like substrings; and
//   (c) keyword proximity (secret, token, password, api_key) which the generic
//       high-entropy lane requires, so random non-secret blobs (commit SHAs,
//       UUIDs, base64 image data) do not trip the gate.
//
// Allowlist-first: documented examples (e.g. AKIAIOSFODNN7EXAMPLE), obvious
// placeholders, and low-entropy tokens are recognised and allowed, keeping
// false positives near zero. The gate is pure and never throws; on any doubt or
// unreadable input it returns "ask". Raw secrets are never placed in evidence -
// only a masked form is stored.

import { Gate, GateContext, GateResult, ActionClass } from "../types.js";

const GATE_NAME = "SecretGate";

// Action classes where a credential match is an exposure event (commit or
// outbound send) and must be denied. Other classes escalate to "ask".
const EXFIL_CLASSES = new Set<ActionClass>(["secret", "git", "send", "network"]);

interface Signature {
  ruleId: string;
  label: string;
  // Global regex. Capture group 1, when present, is the sensitive value used
  // for masking; otherwise the whole match is used.
  pattern: RegExp;
}

// Named credential signatures. Ordered most-specific first so Stripe sk_live_
// keys are not mistaken for generic sk- keys.
const NAMED_SIGNATURES: Signature[] = [
  {
    ruleId: "secret.aws_access_key",
    label: "AWS access key id",
    pattern: /\b((?:AKIA|ASIA|AGPA|AIDA|AROA|AIPA|ANPA|ANVA|ABIA|ACCA)[0-9A-Z]{16})\b/g,
  },
  {
    ruleId: "secret.github_token",
    label: "GitHub token",
    pattern: /\b((?:ghp|gho|ghu|ghs|ghr)_[A-Za-z0-9]{36,}|github_pat_[A-Za-z0-9_]{22,})\b/g,
  },
  {
    ruleId: "secret.slack_token",
    label: "Slack token",
    pattern: /\b(xox[baprs]-[A-Za-z0-9-]{10,})\b/g,
  },
  {
    ruleId: "secret.google_api_key",
    label: "Google API key",
    pattern: /\b(AIza[0-9A-Za-z_-]{35})\b/g,
  },
  {
    ruleId: "secret.stripe_key",
    label: "Stripe secret key",
    pattern: /\b((?:sk|rk)_(?:live|test)_[0-9A-Za-z]{16,})\b/g,
  },
  {
    ruleId: "secret.openai_key",
    label: "OpenAI-style secret key",
    pattern: /\b(sk-(?:proj-)?[A-Za-z0-9_-]{16,})\b/g,
  },
  {
    ruleId: "secret.private_key",
    label: "PEM private key",
    pattern: /-----BEGIN (?:RSA |EC |DSA |OPENSSH |PGP |ENCRYPTED )?PRIVATE KEY-----/g,
  },
  {
    ruleId: "secret.bearer_token",
    label: "Authorization bearer token",
    pattern: /[Aa]uthorization\s*:\s*[Bb]earer\s+([A-Za-z0-9._~+/=-]{12,})/g,
  },
];

// Keyword proximity for the generic high-entropy lane (non-global; reused for
// .test only).
const KEYWORD_RE =
  /(secret|token|password|passwd|pwd|api[_-]?key|apikey|access[_-]?key|private[_-]?key|client[_-]?secret|credential|auth)/i;

// Token-like substrings for the generic lane: long runs of credential-shaped
// characters.
const TOKEN_RE = /[A-Za-z0-9_\-+/=.]{20,}/g;

// Word markers that identify a documented example or an obvious placeholder
// rather than a live secret. Kept to whole-word-ish fragments so a real random
// secret that happens to contain a short substring is not waved through.
const PLACEHOLDER_MARKERS = [
  "example", "placeholder", "changeme", "change_me", "your_", "yourkey",
  "dummy", "sample", "redacted", "notreal", "fake", "test_key", "testkey",
];

const GENERIC_ENTROPY_THRESHOLD = 3.5; // bits per character
const LOW_ENTROPY_THRESHOLD = 2.0;     // below this, treat as a placeholder
const KEYWORD_WINDOW = 48;             // chars before a token to scan for a keyword

/** Shannon entropy in bits per character. Exported for unit testing. */
export function shannonEntropy(value: string): number {
  if (!value) return 0;
  const counts: Record<string, number> = {};
  for (const ch of value) counts[ch] = (counts[ch] || 0) + 1;
  let entropy = 0;
  const len = value.length;
  for (const ch in counts) {
    const p = counts[ch] / len;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

/** Mask a value so evidence never carries a reconstructable secret. Exported for tests. */
export function maskSecret(value: string): string {
  const v = value.replace(/\s+/g, "");
  if (v.length <= 8) return "*".repeat(v.length);
  const tail = Math.min(v.length - 4, 24);
  return v.slice(0, 4) + "*".repeat(tail);
}

function isExampleOrPlaceholder(token: string): boolean {
  const lower = token.toLowerCase();
  for (const marker of PLACEHOLDER_MARKERS) {
    if (lower.includes(marker)) return true;
  }
  // A character repeated four or more times in a row reads as filler
  // (aaaa, 0000, xxxx), not a live secret.
  if (/(.)\1{3,}/.test(token)) return true;
  // Common counting or keyboard sequences are placeholders.
  if (/0123456|1234567|2345678|abcdefg|qwerty/i.test(token)) return true;
  // Very low information content reads as a placeholder, not a live secret.
  if (shannonEntropy(token) < LOW_ENTROPY_THRESHOLD) return true;
  return false;
}

interface Hit {
  ruleId: string;
  label: string;
  masked: string;
}

interface MatchRange {
  start: number;
  end: number;
}

function ask(ruleId: string, reason: string, evidence: string[] = []): GateResult {
  return { gate: GATE_NAME, verdict: "ask", ruleId, reason, evidence };
}

function allow(reason: string): GateResult {
  return { gate: GATE_NAME, verdict: "allow", ruleId: "secret.none", reason, evidence: [] };
}

/**
 * SecretGate: deny credential exposure on commit/send, allow clean and
 * documented-example text, escalate on doubt.
 */
export const secretGate: Gate = (ctx: GateContext): GateResult => {
  try {
    if (!ctx || typeof ctx !== "object" || !ctx.action || typeof ctx.action !== "object") {
      return ask("secret.unparseable", "No readable action context; failing closed to human review.");
    }

    const cls = ctx.action.class;
    const raw = ctx.action.raw;
    if (typeof raw !== "string") {
      return ask("secret.unparseable", "Action raw payload is not a string; failing closed to human review.");
    }

    // Build the scan text from raw plus any parsed diff/payload.
    let scanText = raw;
    let unreadableParsed = false;
    if (ctx.action.parsed !== undefined && ctx.action.parsed !== null) {
      let parsedText = "";
      try {
        parsedText = typeof ctx.action.parsed === "string"
          ? ctx.action.parsed
          : JSON.stringify(ctx.action.parsed);
      } catch {
        try {
          parsedText = String(ctx.action.parsed);
        } catch {
          unreadableParsed = true;
        }
      }
      if (parsedText) scanText += "\n" + parsedText;
    }

    const hits: Hit[] = [];
    const ranges: MatchRange[] = [];

    // (a) named credential signatures.
    for (const sig of NAMED_SIGNATURES) {
      for (const m of scanText.matchAll(sig.pattern)) {
        const value = (m[1] ?? m[0]) as string;
        const index = m.index ?? 0;
        ranges.push({ start: index, end: index + m[0].length });
        if (sig.ruleId === "secret.private_key") {
          // The header is a public marker; record presence without a value.
          hits.push({ ruleId: sig.ruleId, label: sig.label, masked: "PEM PRIVATE KEY header" });
          continue;
        }
        if (isExampleOrPlaceholder(value)) continue;
        hits.push({ ruleId: sig.ruleId, label: sig.label, masked: maskSecret(value) });
      }
    }

    // (b)+(c) generic high-entropy tokens that sit near a secret keyword.
    for (const m of scanText.matchAll(TOKEN_RE)) {
      const token = m[0];
      const index = m.index ?? 0;
      const end = index + token.length;
      // Skip tokens already covered by a named signature.
      if (ranges.some((r) => index < r.end && end > r.start)) continue;
      if (isExampleOrPlaceholder(token)) continue;
      if (shannonEntropy(token) < GENERIC_ENTROPY_THRESHOLD) continue;
      const window = scanText.slice(Math.max(0, index - KEYWORD_WINDOW), end);
      if (!KEYWORD_RE.test(window)) continue;
      hits.push({
        ruleId: "secret.high_entropy_credential",
        label: "high-entropy credential near a secret keyword",
        masked: maskSecret(token),
      });
    }

    if (hits.length === 0) {
      if (unreadableParsed) {
        return ask(
          "secret.unparseable",
          "Parsed payload could not be inspected for secrets; failing closed to human review.",
        );
      }
      return allow("No credential signature detected.");
    }

    const evidence = hits.map((h) => `${h.ruleId}: ${h.masked}`);
    const primary = hits[0];

    if (EXFIL_CLASSES.has(cls)) {
      return {
        gate: GATE_NAME,
        verdict: "deny",
        ruleId: primary.ruleId,
        reason:
          `Credential signature detected in a "${cls}" action; this would expose a secret on commit or send. Blocked pre-execution.`,
        evidence,
      };
    }

    return ask(
      primary.ruleId,
      `Credential signature detected in a "${cls}" action; escalating for human review before it proceeds.`,
      evidence,
    );
  } catch {
    // Defense in depth: a gate must never throw. Any unexpected failure becomes
    // an escalation, never a silent allow.
    return ask("secret.gate_error", "SecretGate encountered an unexpected error; failing closed to human review.");
  }
};
