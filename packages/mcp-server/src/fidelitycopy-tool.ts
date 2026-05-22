import { createHash, randomUUID } from "node:crypto";

type FidelityCopyMode = "raw_bytes" | "text_exact" | "json_canonical" | "approved_transform";
type FidelityCopyVerdict = "pass" | "blocker" | "suppress";
type NewlineStyle = "none" | "lf" | "crlf" | "cr" | "mixed";
type OutputProvenance = "deterministic_copy" | "tool" | "manual" | "ai_retype";

interface Material {
  bytes: Buffer;
  text: string;
  input_encoding: "utf8" | "base64";
  sha256: string;
  byte_count: number;
  character_count: number;
  line_count: number;
  newline_style: NewlineStyle;
}

interface FidelityCopyReceipt {
  kind: "fidelitycopy_receipt_v1";
  receipt_id: string;
  mode: FidelityCopyMode;
  verdict: FidelityCopyVerdict;
  status: "pass" | "blocked";
  source_ref: string;
  output_ref: string;
  source_hash: string;
  output_hash: string;
  hash_algorithm: "sha256";
  byte_count: number;
  output_byte_count: number;
  character_count: number;
  output_character_count: number;
  line_count: number;
  output_line_count: number;
  newline_style: NewlineStyle;
  output_newline_style: NewlineStyle;
  canonicalization_mode: "none" | "json_sort_keys";
  source_canonical_hash?: string;
  output_canonical_hash?: string;
  approved_transform_ref?: string;
  allowed_changes: string[];
  output_provenance: OutputProvenance;
  diff_summary: string;
  invariants_checked: string[];
  action_needed: string[];
  validator: "fidelitycopy-tool";
  validator_version: "v1";
  timestamp: string;
  provenance_pointer?: string;
}

interface StoredReceipt {
  receipt: FidelityCopyReceipt;
  output: Buffer;
}

const RECEIPTS = new Map<string, StoredReceipt>();

export async function fidelitycopyCopy(args: Record<string, unknown>): Promise<unknown> {
  const mode = parseMode(args.mode);
  if (!mode) {
    return { error: "mode must be one of: raw_bytes, text_exact, json_canonical, approved_transform" };
  }

  const sourceRef = readRequiredString(args.source_ref, "source_ref");
  if ("error" in sourceRef) return sourceRef;
  const outputRef = readOutputRef(args);
  if ("error" in outputRef) return outputRef;

  const source = parseMaterial(args, "source");
  if ("error" in source) return source;
  if ("missing" in source) return { error: "source_text or source_base64 is required" };

  const output = deriveOutputMaterial(args, source.material, mode);
  if ("error" in output) return output;

  const receiptResult = createReceipt({
    mode,
    sourceRef: sourceRef.value,
    outputRef: outputRef.value,
    source: source.material,
    output: output.material,
    approvedTransformRef: readOptionalString(args.approved_transform_ref),
    allowedChanges: readStringList(args.allowed_changes),
    outputProvenance: parseOutputProvenance(args.output_provenance),
    provenancePointer: readOptionalString(args.provenance_pointer),
  });

  if ("error" in receiptResult) return receiptResult;

  RECEIPTS.set(receiptResult.receipt.receipt_id, {
    receipt: receiptResult.receipt,
    output: Buffer.from(output.material.bytes),
  });

  const response: Record<string, unknown> = {
    receipt_id: receiptResult.receipt.receipt_id,
    verdict: receiptResult.receipt.verdict,
    status: receiptResult.receipt.status,
    receipt: receiptResult.receipt,
  };

  if (args.include_output === true) {
    response.output_text = output.material.text;
    response.output_base64 = output.material.bytes.toString("base64");
  }

  return response;
}

export async function fidelitypassVerifyCopy(args: Record<string, unknown>): Promise<unknown> {
  const receiptId = readOptionalString(args.receipt_id);
  if (receiptId) {
    const stored = RECEIPTS.get(receiptId);
    if (!stored) {
      return { error: `FidelityCopy receipt '${receiptId}' was not found in this MCP session` };
    }
    return verificationResponse(stored.receipt, "receipt");
  }

  const copyResult = await fidelitycopyCopy({
    ...args,
    destination_ref: args.output_ref ?? args.destination_ref ?? "fidelitypass://verify-output",
    include_output: false,
  });

  if (!isRecord(copyResult) || !isRecord(copyResult.receipt)) return copyResult;
  return verificationResponse(copyResult.receipt as unknown as FidelityCopyReceipt, "source_output");
}

function verificationResponse(receipt: FidelityCopyReceipt, verifiedFrom: "receipt" | "source_output"): Record<string, unknown> {
  return {
    verified_from: verifiedFrom,
    receipt_id: receipt.receipt_id,
    pass: receipt.verdict === "pass",
    verdict: receipt.verdict,
    status: receipt.status,
    receipt,
  };
}

function createReceipt(input: {
  mode: FidelityCopyMode;
  sourceRef: string;
  outputRef: string;
  source: Material;
  output: Material;
  approvedTransformRef?: string;
  allowedChanges: string[];
  outputProvenance: OutputProvenance;
  provenancePointer?: string;
}): { receipt: FidelityCopyReceipt } | { error: string } {
  const timestamp = new Date().toISOString();
  const invariants = [
    "source_ref_present",
    "output_ref_present",
    "sha256_recorded",
    "byte_count_recorded",
    "character_count_recorded",
    "newline_style_recorded",
    "no_llm_copy_bytes",
  ];

  let verdict: FidelityCopyVerdict = "blocker";
  let diffSummary = "Output differs from source.";
  let sourceCanonicalHash: string | undefined;
  let outputCanonicalHash: string | undefined;
  let actionNeeded: string[] = [];

  if (input.outputProvenance === "ai_retype") {
    verdict = "suppress";
    diffSummary = "AI retype attempt is not accepted for exact source-copy work.";
    actionNeeded = ["AI_RETYPE_SUPPRESS: route exact source-copy work through FidelityCopy deterministic copy bytes."];
  } else if (input.mode === "raw_bytes" || input.mode === "text_exact") {
    const exact = input.source.bytes.equals(input.output.bytes);
    verdict = exact ? "pass" : "blocker";
    diffSummary = exact
      ? "Raw source and output bytes match exactly."
      : "Raw source and output bytes differ.";
    if (!exact) actionNeeded = ["FIDELITY_DRIFT_RISK: output hash or bytes differ from source."];
    invariants.push(input.mode === "text_exact" ? "text_exact_match" : "raw_byte_match");
  } else if (input.mode === "json_canonical") {
    const sourceCanonical = canonicalJson(input.source.text);
    const outputCanonical = canonicalJson(input.output.text);
    if ("error" in sourceCanonical) return { error: `source JSON invalid: ${sourceCanonical.error}` };
    if ("error" in outputCanonical) return { error: `output JSON invalid: ${outputCanonical.error}` };
    sourceCanonicalHash = sha256Utf8(sourceCanonical.value);
    outputCanonicalHash = sha256Utf8(outputCanonical.value);
    const exact = sourceCanonicalHash === outputCanonicalHash;
    verdict = exact ? "pass" : "blocker";
    diffSummary = exact
      ? "JSON canonical hashes match under sorted-key canonicalization."
      : "JSON canonical hashes differ under sorted-key canonicalization.";
    if (!exact) actionNeeded = ["FIDELITY_DRIFT_RISK: canonical JSON output differs from source."];
    invariants.push("json_canonical_hash_match");
  } else {
    const hasApproval = Boolean(input.approvedTransformRef) && input.allowedChanges.length > 0;
    verdict = hasApproval ? "pass" : "blocker";
    diffSummary = hasApproval
      ? "Output differs under an approved transform receipt."
      : "Approved transform mode requires approved_transform_ref and allowed_changes.";
    if (!hasApproval) {
      actionNeeded = ["APPROVED_TRANSFORM_MISSING: provide approved_transform_ref and allowed_changes."];
    }
    invariants.push("approved_transform_receipt");
  }

  const receipt: FidelityCopyReceipt = {
    kind: "fidelitycopy_receipt_v1",
    receipt_id: randomUUID(),
    mode: input.mode,
    verdict,
    status: verdict === "pass" ? "pass" : "blocked",
    source_ref: input.sourceRef,
    output_ref: input.outputRef,
    source_hash: input.source.sha256,
    output_hash: input.output.sha256,
    hash_algorithm: "sha256",
    byte_count: input.source.byte_count,
    output_byte_count: input.output.byte_count,
    character_count: input.source.character_count,
    output_character_count: input.output.character_count,
    line_count: input.source.line_count,
    output_line_count: input.output.line_count,
    newline_style: input.source.newline_style,
    output_newline_style: input.output.newline_style,
    canonicalization_mode: input.mode === "json_canonical" ? "json_sort_keys" : "none",
    source_canonical_hash: sourceCanonicalHash,
    output_canonical_hash: outputCanonicalHash,
    approved_transform_ref: input.approvedTransformRef,
    allowed_changes: input.allowedChanges,
    output_provenance: input.outputProvenance,
    diff_summary: diffSummary,
    invariants_checked: invariants,
    action_needed: actionNeeded,
    validator: "fidelitycopy-tool",
    validator_version: "v1",
    timestamp,
    provenance_pointer: input.provenancePointer,
  };

  return { receipt };
}

function deriveOutputMaterial(
  args: Record<string, unknown>,
  source: Material,
  mode: FidelityCopyMode,
): { material: Material } | { error: string } {
  const providedOutput = parseMaterial(args, "output", true);
  if ("material" in providedOutput) return providedOutput;
  if ("error" in providedOutput) return providedOutput;

  if (mode === "json_canonical") {
    const canonical = canonicalJson(source.text);
    if ("error" in canonical) return { error: `source JSON invalid: ${canonical.error}` };
    return { material: materialFromText(canonical.value, "utf8") };
  }

  return { material: materialFromBuffer(source.bytes, source.input_encoding) };
}

function parseMaterial(
  args: Record<string, unknown>,
  prefix: "source" | "output",
  optional = false,
): { material: Material } | { missing: true } | { error: string } {
  const textKey = `${prefix}_text`;
  const base64Key = `${prefix}_base64`;
  const text = args[textKey];
  const base64 = args[base64Key];

  if (typeof text === "string") {
    return { material: materialFromText(text, "utf8") };
  }

  if (typeof base64 === "string") {
    try {
      return { material: materialFromBuffer(Buffer.from(base64, "base64"), "base64") };
    } catch {
      return { error: `${base64Key} must be valid base64` };
    }
  }

  if (optional) return { missing: true };
  return { error: `${textKey} or ${base64Key} is required` };
}

function materialFromText(text: string, inputEncoding: "utf8" | "base64"): Material {
  return materialFromBuffer(Buffer.from(text, "utf8"), inputEncoding);
}

function materialFromBuffer(bytes: Buffer, inputEncoding: "utf8" | "base64"): Material {
  const text = bytes.toString("utf8");
  return {
    bytes,
    text,
    input_encoding: inputEncoding,
    sha256: sha256Bytes(bytes),
    byte_count: bytes.length,
    character_count: Array.from(text).length,
    line_count: lineCount(text),
    newline_style: detectNewlineStyle(text),
  };
}

function parseMode(value: unknown): FidelityCopyMode | null {
  if (value === undefined || value === null || value === "") return "raw_bytes";
  return value === "raw_bytes" || value === "text_exact" || value === "json_canonical" || value === "approved_transform"
    ? value
    : null;
}

function parseOutputProvenance(value: unknown): OutputProvenance {
  return value === "tool" || value === "manual" || value === "ai_retype" ? value : "deterministic_copy";
}

function readRequiredString(value: unknown, label: string): { value: string } | { error: string } {
  if (typeof value !== "string" || !value.trim()) return { error: `${label} is required` };
  return { value: value.trim() };
}

function readOutputRef(args: Record<string, unknown>): { value: string } | { error: string } {
  const raw = args.destination_ref ?? args.output_ref;
  return readRequiredString(raw, "destination_ref or output_ref");
}

function readOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

function readStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && Boolean(item.trim())).map((item) => item.trim());
}

function canonicalJson(text: string): { value: string } | { error: string } {
  try {
    return { value: JSON.stringify(sortJson(JSON.parse(text))) };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "could not parse JSON" };
  }
}

function sortJson(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortJson);
  if (!isRecord(value)) return value;
  return Object.keys(value)
    .sort()
    .reduce<Record<string, unknown>>((acc, key) => {
      acc[key] = sortJson(value[key]);
      return acc;
    }, {});
}

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function sha256Bytes(value: Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

function lineCount(value: string): number {
  if (value.length === 0) return 0;
  return value.split(/\r\n|\r|\n/).length;
}

function detectNewlineStyle(value: string): NewlineStyle {
  const crlf = /\r\n/.test(value);
  const withoutCrlf = value.replace(/\r\n/g, "");
  const lf = /\n/.test(withoutCrlf);
  const cr = /\r/.test(withoutCrlf);
  const count = [crlf, lf, cr].filter(Boolean).length;

  if (count === 0) return "none";
  if (count > 1) return "mixed";
  if (crlf) return "crlf";
  if (lf) return "lf";
  return "cr";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
