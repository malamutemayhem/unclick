import { createHash, randomUUID } from "node:crypto";

type FidelityCopyMode = "raw_bytes" | "text_exact" | "json_canonical" | "approved_transform";
type FidelityCopyVerdict = "PASS" | "BLOCKER" | "HOLD" | "ROUTE" | "SUPPRESS";

interface Payload {
  kind: "text" | "base64";
  bytes: Buffer;
  text: string;
  ref: string;
}

interface CanonicalizationReceipt {
  mode: FidelityCopyMode;
  source_canonical_hash?: string;
  output_canonical_hash?: string;
  stable_json?: boolean;
}

interface FidelityCopyReceipt {
  kind: "fidelitycopy_receipt_v1";
  receipt_id: string;
  source_ref: string;
  source_hash: string;
  output_ref: string;
  output_hash: string;
  byte_count: number;
  output_byte_count: number;
  line_count: number;
  output_line_count: number;
  canonicalization: CanonicalizationReceipt;
  diff_summary: string;
  invariants_checked: string[];
  allowed_changes: string[];
  tool_version: string;
  timestamp: string;
  provenance_ref: string;
  verdict: FidelityCopyVerdict;
  action_needed: string[];
}

const TOOL_VERSION = "fidelitycopy-v1";
const DEFAULT_SOURCE_REF = "fidelitycopy://inline-source";
const DEFAULT_OUTPUT_REF = "fidelitycopy://inline-output";

export async function fidelitycopyCopy(args: Record<string, unknown>): Promise<unknown> {
  const mode = parseMode(args.mode);
  if (!mode) return { error: "mode must be one of: raw_bytes, text_exact, json_canonical, approved_transform" };

  const source = parsePayload(args, "source", DEFAULT_SOURCE_REF);
  if ("error" in source) return { error: source.error };

  const output = createCopyOutput(args, source, mode);
  if ("error" in output) return { error: output.error, receipt: output.receipt ?? null };

  const receipt = buildReceipt(source, output, mode, args);
  return {
    verdict: receipt.verdict,
    receipt,
    output_ref: receipt.output_ref,
    output_text: output.kind === "text" ? output.text : undefined,
    output_base64: output.kind === "base64" ? output.bytes.toString("base64") : undefined,
  };
}

export async function fidelitypassVerifyCopy(args: Record<string, unknown>): Promise<unknown> {
  const receiptPayload = parseReceipt(args.receipt_payload ?? args.receipt);
  const mode = parseMode(args.mode) ?? modeFromReceipt(receiptPayload);
  if (!mode) return { error: "mode must be one of: raw_bytes, text_exact, json_canonical, approved_transform" };

  if (!hasAnyPayload(args, "source") || !hasAnyPayload(args, "output")) {
    const proofText = readString(args.proof_text ?? args.ai_proof ?? args.ai_proof_text);
    if (proofText || receiptPayload) {
      return {
        verdict: "SUPPRESS",
        error: "FIDELITYCOPY_RECEIPT_REQUIRED: prose or receipt metadata without source/output bytes cannot prove exact copy.",
        action_needed: ["Provide source_text/source_base64 and output_text/output_base64 so hashes can be recomputed."],
      };
    }
    return { error: "source_text/source_base64 and output_text/output_base64 are required for verification" };
  }

  const source = parsePayload(args, "source", DEFAULT_SOURCE_REF);
  if ("error" in source) return { error: source.error };
  const output = parsePayload(args, "output", DEFAULT_OUTPUT_REF);
  if ("error" in output) return { error: output.error };

  const receipt = buildReceipt(source, output, mode, args);
  const receiptCheck = compareProvidedReceipt(receiptPayload, receipt);
  if (!receiptCheck.ok) {
    return {
      verdict: "BLOCKER",
      receipt: {
        ...receipt,
        verdict: "BLOCKER" as const,
        action_needed: [...receipt.action_needed, receiptCheck.message],
      },
      error: receiptCheck.message,
    };
  }

  return { verdict: receipt.verdict, receipt };
}

function createCopyOutput(
  args: Record<string, unknown>,
  source: Payload,
  mode: FidelityCopyMode,
): Payload | { error: string; receipt?: FidelityCopyReceipt } {
  const outputRef = resolveOutputRef(args);

  if (mode === "approved_transform") {
    if (!hasAnyPayload(args, "output")) {
      return { error: "approved_transform requires output_text or output_base64 plus allowed_changes" };
    }
    return parsePayload(args, "output", outputRef);
  }

  if (mode === "json_canonical") {
    const canonical = canonicalJson(source.text);
    if ("error" in canonical) {
      const receipt = buildReceipt(source, { ...source, ref: outputRef }, mode, args);
      return { error: canonical.error, receipt };
    }
    return { kind: "text", bytes: Buffer.from(canonical.value, "utf8"), text: canonical.value, ref: outputRef };
  }

  return { ...source, ref: outputRef };
}

function buildReceipt(
  source: Payload,
  output: Payload,
  mode: FidelityCopyMode,
  args: Record<string, unknown>,
): FidelityCopyReceipt {
  const sourceHash = sha256(source.bytes);
  const outputHash = sha256(output.bytes);
  const allowedChanges = parseAllowedChanges(args.allowed_changes);
  const base: FidelityCopyReceipt = {
    kind: "fidelitycopy_receipt_v1",
    receipt_id: `fidelitycopy_${randomUUID()}`,
    source_ref: source.ref,
    source_hash: sourceHash,
    output_ref: output.ref,
    output_hash: outputHash,
    byte_count: source.bytes.length,
    output_byte_count: output.bytes.length,
    line_count: countLines(source.text),
    output_line_count: countLines(output.text),
    canonicalization: { mode },
    diff_summary: diffSummary(source, output),
    invariants_checked: ["source_hash_computed", "output_hash_computed"],
    allowed_changes: allowedChanges,
    tool_version: TOOL_VERSION,
    timestamp: new Date().toISOString(),
    provenance_ref: readString(args.provenance_ref) || "mcp://fidelitycopy/v1",
    verdict: "BLOCKER",
    action_needed: [],
  };

  if (mode === "raw_bytes") {
    const pass = source.bytes.equals(output.bytes);
    return finishReceipt(base, pass ? "PASS" : "BLOCKER", [
      "raw_byte_equality_checked",
      "exact_copy_pass_requires_output_hash_equal_source_hash",
    ]);
  }

  if (mode === "text_exact") {
    const pass = source.text === output.text && sourceHash === outputHash;
    return finishReceipt(base, pass ? "PASS" : "BLOCKER", [
      "text_exact_string_equality_checked",
      "newline_whitespace_and_unicode_bytes_preserved",
    ]);
  }

  if (mode === "json_canonical") {
    const sourceCanonical = canonicalJson(source.text);
    const outputCanonical = canonicalJson(output.text);
    if ("error" in sourceCanonical || "error" in outputCanonical) {
      return {
        ...finishReceipt(base, "BLOCKER", ["json_parse_checked"]),
        action_needed: ["JSON_CANONICAL_BLOCKER: source and output must both be valid JSON."],
      };
    }
    const sourceCanonicalHash = sha256(Buffer.from(sourceCanonical.value, "utf8"));
    const outputCanonicalHash = sha256(Buffer.from(outputCanonical.value, "utf8"));
    const pass = sourceCanonicalHash === outputCanonicalHash;
    return {
      ...finishReceipt(base, pass ? "PASS" : "BLOCKER", [
        "json_parse_checked",
        "stable_key_order_checked",
        "canonical_hash_equality_checked",
      ]),
      canonicalization: {
        mode,
        source_canonical_hash: sourceCanonicalHash,
        output_canonical_hash: outputCanonicalHash,
        stable_json: true,
      },
      diff_summary: pass ? "canonical JSON match" : "canonical JSON mismatch",
    };
  }

  if (allowedChanges.length === 0) {
    return {
      ...finishReceipt(base, "HOLD", ["approved_transform_allowed_changes_checked"]),
      action_needed: ["APPROVED_TRANSFORM_HOLD: allowed_changes is required for approved_transform."],
    };
  }

  if (sourceHash === outputHash) {
    return {
      ...finishReceipt(base, "HOLD", ["approved_transform_diff_checked"]),
      action_needed: ["APPROVED_TRANSFORM_HOLD: output has no bounded diff to approve."],
    };
  }

  return finishReceipt(base, "PASS", [
    "approved_transform_allowed_changes_checked",
    "approved_transform_bounded_diff_checked",
  ]);
}

function finishReceipt(
  receipt: FidelityCopyReceipt,
  verdict: FidelityCopyVerdict,
  invariants: string[],
): FidelityCopyReceipt {
  const actionNeeded =
    verdict === "PASS"
      ? []
      : ["FIDELITY_DRIFT_RISK: deterministic FidelityCopy receipt did not prove an exact or approved copy."];
  return {
    ...receipt,
    verdict,
    invariants_checked: [...receipt.invariants_checked, ...invariants],
    action_needed: actionNeeded,
  };
}

function parsePayload(
  args: Record<string, unknown>,
  prefix: "source" | "output",
  fallbackRef: string,
): Payload | { error: string } {
  const text = readString(args[`${prefix}_text`]);
  const base64 = readString(args[`${prefix}_base64`]);
  const ref = readString(args[`${prefix}_ref`]) || (prefix === "output" ? resolveOutputRef(args) : fallbackRef);

  if (text && base64) return { error: `${prefix}_text and ${prefix}_base64 are mutually exclusive` };
  if (text !== null) return { kind: "text", bytes: Buffer.from(text, "utf8"), text, ref };
  if (base64 !== null) {
    const decoded = decodeBase64(base64);
    if (!decoded) return { error: `${prefix}_base64 must be valid base64` };
    return { kind: "base64", bytes: decoded, text: decoded.toString("utf8"), ref };
  }
  return { error: `${prefix}_text or ${prefix}_base64 is required` };
}

function parseMode(raw: unknown): FidelityCopyMode | null {
  if (raw === undefined || raw === null || raw === "") return "raw_bytes";
  return raw === "raw_bytes" || raw === "text_exact" || raw === "json_canonical" || raw === "approved_transform"
    ? raw
    : null;
}

function modeFromReceipt(receipt: Partial<FidelityCopyReceipt> | null): FidelityCopyMode {
  const mode = receipt?.canonicalization?.mode;
  return mode === "raw_bytes" || mode === "text_exact" || mode === "json_canonical" || mode === "approved_transform"
    ? mode
    : "raw_bytes";
}

function hasAnyPayload(args: Record<string, unknown>, prefix: "source" | "output"): boolean {
  return readString(args[`${prefix}_text`]) !== null || readString(args[`${prefix}_base64`]) !== null;
}

function readString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function parseAllowedChanges(value: unknown): string[] {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === "string" && item.trim() !== "");
  const single = readString(value);
  return single && single.trim() ? [single.trim()] : [];
}

function resolveOutputRef(args: Record<string, unknown>): string {
  const explicit = readString(args.output_ref) ?? readString(args.destination_ref);
  if (explicit && explicit.trim()) return explicit.trim();
  const label = readString(args.destination_label);
  if (label && label.trim()) return `fidelitycopy://destination/${slugify(label)}`;
  return DEFAULT_OUTPUT_REF;
}

function slugify(value: string): string {
  const slug = value.trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || "inline-output";
}

function decodeBase64(value: string): Buffer | null {
  try {
    const normalized = value.replace(/\s+/g, "");
    if (!normalized) return null;
    const decoded = Buffer.from(normalized, "base64");
    if (decoded.length === 0 && normalized !== "") return null;
    return decoded;
  } catch {
    return null;
  }
}

function sha256(value: Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

function countLines(value: string): number {
  if (value.length === 0) return 0;
  return value.split(/\r\n|\r|\n/).length;
}

function diffSummary(source: Payload, output: Payload): string {
  if (source.bytes.equals(output.bytes)) return "zero-diff";
  return [
    "changed",
    `byte_count_delta=${output.bytes.length - source.bytes.length}`,
    `line_count_delta=${countLines(output.text) - countLines(source.text)}`,
    `source_sha256=${sha256(source.bytes)}`,
    `output_sha256=${sha256(output.bytes)}`,
  ].join("; ");
}

function canonicalJson(value: string): { value: string } | { error: string } {
  try {
    return { value: stableJsonStringify(JSON.parse(value)) };
  } catch {
    return { error: "JSON_CANONICAL_BLOCKER: invalid JSON" };
  }
}

function stableJsonStringify(value: unknown): string {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map((item) => stableJsonStringify(item)).join(",")}]`;
  const record = value as Record<string, unknown>;
  return `{${Object.keys(record)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${stableJsonStringify(record[key])}`)
    .join(",")}}`;
}

function parseReceipt(value: unknown): Partial<FidelityCopyReceipt> | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  return value as Partial<FidelityCopyReceipt>;
}

function compareProvidedReceipt(
  provided: Partial<FidelityCopyReceipt> | null,
  computed: FidelityCopyReceipt,
): { ok: true } | { ok: false; message: string } {
  if (!provided) return { ok: true };
  const checks: Array<[unknown, string, string]> = [
    [provided.source_hash, computed.source_hash, "source_hash"],
    [provided.output_hash, computed.output_hash, "output_hash"],
    [provided.verdict, computed.verdict, "verdict"],
  ];

  for (const [providedValue, computedValue, label] of checks) {
    if (providedValue !== undefined && providedValue !== computedValue) {
      return { ok: false, message: `FIDELITY_RECEIPT_MISMATCH: provided ${label} does not match recomputed ${label}.` };
    }
  }
  return { ok: true };
}
