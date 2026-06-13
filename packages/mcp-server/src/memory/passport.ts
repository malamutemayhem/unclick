import { createHmac, createHash } from "node:crypto";
import type {
  MemoryPassportBundle,
  MemoryPassportBusinessContextRecord,
  MemoryPassportExportInput,
  MemoryPassportExportResult,
  MemoryPassportFactRecord,
  MemoryPassportImportResult,
  MemoryPassportSessionRecord,
  MemoryPassportSignature,
} from "./types.js";

export const MEMORY_PASSPORT_FLAG = "MEMORY_PASSPORT_ENABLED";
export const MEMORY_PASSPORT_VERSION = "memory-passport-v1";

const SECRET_FIELD_PATTERN =
  /(api[_-]?key|authorization|bearer|credential|password|private[_-]?key|service[_-]?role|secret|token)/i;
const SECRET_VALUE_PATTERN =
  /(sk-[a-z0-9_-]{12,}|[srpw][kh]_(?:live|test)_[a-z0-9]{10,}|whsec_[a-z0-9]{10,}|gh[oprsu]_[a-z0-9_]{20,}|xox[baprs]-[a-z0-9-]{10,}|AKIA[0-9A-Z]{12,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|Bearer\s+[a-z0-9._-]{12,}|eyJ[a-z0-9_-]{10,}\.[a-z0-9_-]{10,}\.[a-z0-9_-]{10,})/i;

export function isMemoryPassportEnabled(env: NodeJS.ProcessEnv = process.env): boolean {
  const raw = env[MEMORY_PASSPORT_FLAG] ?? "";
  return raw === "1" || raw.toLowerCase() === "true";
}
function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stableStringify(item)).join(",")}]`;
  }
  if (isPlainObject(value)) {
    const body = Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",");
    return `{${body}}`;
  }
  return JSON.stringify(value);
}

function payloadForSigning(bundle: MemoryPassportBundle): Omit<MemoryPassportBundle, "signature"> {
  const { signature: _signature, ...payload } = bundle;
  return payload;
}

function signPayload(payload: Omit<MemoryPassportBundle, "signature">, signingSecret: string): MemoryPassportSignature {
  const value = createHmac("sha256", signingSecret)
    .update(stableStringify(payload), "utf8")
    .digest("hex");
  return {
    algorithm: "hmac-sha256",
    key_id: "memory-passport-v1",
    value,
  };
}

function signatureDigest(signature: MemoryPassportSignature): string {
  return createHash("sha256").update(signature.value, "utf8").digest("hex");
}

function textHasSecret(value: string): boolean {
  return SECRET_VALUE_PATTERN.test(value);
}

function valueHasSecret(value: unknown): boolean {
  if (typeof value === "string") return textHasSecret(value);
  if (Array.isArray(value)) return value.some(valueHasSecret);
  if (isPlainObject(value)) return Object.values(value).some(valueHasSecret);
  return false;
}

// Structural metadata keys whose NAME matches the secret pattern but which are
// not secrets. lane-04's `credential_scope` is a connector slug (e.g. "stripe"),
// not a credential; its VALUE is still scanned below, so a real secret stored
// there is still caught. Without this, every scoped fact is wrongly redacted.
const STRUCTURAL_NON_SECRET_KEYS = new Set(["credential_scope"]);

function rowHasSecretShape(row: Record<string, unknown>): boolean {
  return Object.entries(row).some(([key, value]) =>
    (!STRUCTURAL_NON_SECRET_KEYS.has(key) && SECRET_FIELD_PATTERN.test(key)) || valueHasSecret(value)
  );
}

function stringValue(row: Record<string, unknown>, key: string): string | undefined {
  const value = row[key];
  return typeof value === "string" ? value : undefined;
}

function numberValue(row: Record<string, unknown>, key: string): number | undefined {
  const value = row[key];
  return typeof value === "number" ? value : undefined;
}

function nullableStringValue(row: Record<string, unknown>, key: string): string | null | undefined {
  const value = row[key];
  if (value === null) return null;
  return typeof value === "string" ? value : undefined;
}

function businessContextRecord(row: Record<string, unknown>): MemoryPassportBusinessContextRecord | null {
  if (rowHasSecretShape(row)) return null;
  const category = stringValue(row, "category");
  const key = stringValue(row, "key");
  if (!category || !key) return null;
  return {
    category,
    key,
    value: row.value,
    priority: numberValue(row, "priority") ?? 0,
    created_at: stringValue(row, "created_at"),
    updated_at: stringValue(row, "updated_at"),
  };
}

function factRecord(row: Record<string, unknown>): MemoryPassportFactRecord | null {
  if (rowHasSecretShape(row)) return null;
  const fact = stringValue(row, "fact");
  const category = stringValue(row, "category");
  if (!fact || !category) return null;
  return {
    id: stringValue(row, "id"),
    fact,
    category,
    confidence: numberValue(row, "confidence") ?? 0.9,
    source_session_id: nullableStringValue(row, "source_session_id"),
    source_type: stringValue(row, "source_type"),
    startup_fact_kind: stringValue(row, "startup_fact_kind") as MemoryPassportFactRecord["startup_fact_kind"],
    status: stringValue(row, "status"),
    superseded_by: nullableStringValue(row, "superseded_by"),
    invalidated_at: nullableStringValue(row, "invalidated_at"),
    invalidation_reason: nullableStringValue(row, "invalidation_reason"),
    invalidated_by_session_id: nullableStringValue(row, "invalidated_by_session_id"),
    valid_from: nullableStringValue(row, "valid_from"),
    valid_to: nullableStringValue(row, "valid_to"),
    created_at: stringValue(row, "created_at"),
    updated_at: stringValue(row, "updated_at"),
    extractor_id: nullableStringValue(row, "extractor_id"),
    prompt_version: nullableStringValue(row, "prompt_version"),
    model_id: nullableStringValue(row, "model_id"),
    commit_sha: nullableStringValue(row, "commit_sha"),
    pr_number: numberValue(row, "pr_number"),
    source_agent_id: nullableStringValue(row, "source_agent_id"),
    source_ref: nullableStringValue(row, "source_ref"),
    receipt_id: nullableStringValue(row, "receipt_id"),
  };
}

function sessionRecord(row: Record<string, unknown>): MemoryPassportSessionRecord | null {
  if (rowHasSecretShape(row)) return null;
  const sessionId = stringValue(row, "session_id");
  const summary = stringValue(row, "summary");
  if (!sessionId || !summary) return null;
  return {
    session_id: sessionId,
    summary,
    topics: Array.isArray(row.topics) ? row.topics.map(String) : [],
    open_loops: Array.isArray(row.open_loops) ? row.open_loops.map(String) : [],
    decisions: Array.isArray(row.decisions) ? row.decisions.map(String) : [],
    platform: stringValue(row, "platform") ?? "unknown",
    duration_minutes: numberValue(row, "duration_minutes"),
    created_at: stringValue(row, "created_at"),
  };
}

function sortedByKeys<T>(rows: T[], keys: Array<keyof T>): T[] {
  return [...rows].sort((a, b) => {
    for (const key of keys) {
      const left = String(a[key] ?? "");
      const right = String(b[key] ?? "");
      const diff = left.localeCompare(right);
      if (diff !== 0) return diff;
    }
    return 0;
  });
}

export function auditMemoryPassportCredentialLeakage(bundle: MemoryPassportBundle): {
  passport_credential_leakage: number;
  leak_paths: string[];
} {
  const paths: string[] = [];
  const visit = (value: unknown, path: string): void => {
    if (typeof value === "string") {
      if (textHasSecret(value)) paths.push(path);
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => visit(item, `${path}[${index}]`));
      return;
    }
    if (isPlainObject(value)) {
      for (const [key, nested] of Object.entries(value)) {
        visit(nested, path ? `${path}.${key}` : key);
      }
    }
  };
  visit(bundle, "");
  return {
    passport_credential_leakage: paths.length,
    leak_paths: paths,
  };
}

export function buildMemoryPassportBundle(input: MemoryPassportExportInput & {
  source_backend: "local" | "supabase";
  business_context: Array<Record<string, unknown>>;
  facts: Array<Record<string, unknown>>;
  session_summaries: Array<Record<string, unknown>>;
}): MemoryPassportExportResult {
  if (!input.signing_secret) {
    throw new Error("MEMORY_PASSPORT_SIGNING_SECRET is required to export a memory passport");
  }

  const businessContext = input.business_context
    .map(businessContextRecord)
    .filter((row): row is MemoryPassportBusinessContextRecord => row !== null);
  const facts = input.facts
    .map(factRecord)
    .filter((row): row is MemoryPassportFactRecord => row !== null);
  const sessions = input.include_sessions === false
    ? []
    : input.session_summaries
        .map(sessionRecord)
        .filter((row): row is MemoryPassportSessionRecord => row !== null);

  const redactedRecords =
    input.business_context.length - businessContext.length +
    input.facts.length - facts.length +
    (input.include_sessions === false ? 0 : input.session_summaries.length - sessions.length);

  const payload: Omit<MemoryPassportBundle, "signature"> = {
    version: MEMORY_PASSPORT_VERSION,
    exported_at: new Date().toISOString(),
    subject_id: input.subject_id,
    source_backend: input.source_backend,
    identity: {
      business_context: sortedByKeys(businessContext, ["category", "key"]),
    },
    memory: {
      facts: sortedByKeys(facts, ["category", "fact"]),
      session_summaries: sortedByKeys(sessions, ["session_id", "summary"]),
    },
    summary: {
      exported_records: businessContext.length + facts.length + sessions.length,
      redacted_records: redactedRecords,
    },
  };
  const bundle: MemoryPassportBundle = {
    ...payload,
    signature: signPayload(payload, input.signing_secret),
  };
  const leakage = auditMemoryPassportCredentialLeakage(bundle);
  return {
    bundle,
    metrics: {
      passport_roundtrip_fidelity: null,
      passport_credential_leakage: leakage.passport_credential_leakage,
    },
    audit: {
      operation: "export",
      bundle_version: bundle.version,
      signature_digest: signatureDigest(bundle.signature),
      exported_records: bundle.summary.exported_records,
      imported_records: 0,
      redacted_records: bundle.summary.redacted_records,
      credential_leakage: leakage.passport_credential_leakage,
    },
  };
}

export function verifyMemoryPassportBundle(bundle: MemoryPassportBundle, signingSecret?: string): {
  verified: boolean;
  reason?: string;
} {
  if (bundle.version !== MEMORY_PASSPORT_VERSION) {
    return { verified: false, reason: "unsupported_version" };
  }
  if (!signingSecret) {
    return { verified: false, reason: "missing_signing_secret" };
  }
  const expected = signPayload(payloadForSigning(bundle), signingSecret);
  if (bundle.signature.algorithm !== expected.algorithm || bundle.signature.value !== expected.value) {
    return { verified: false, reason: "signature_mismatch" };
  }
  const leakage = auditMemoryPassportCredentialLeakage(bundle);
  if (leakage.passport_credential_leakage > 0) {
    return { verified: false, reason: "credential_leakage" };
  }
  return { verified: true };
}

export function buildMemoryPassportImportResult(input: {
  bundle: MemoryPassportBundle;
  inserted_facts: number;
  inserted_business_context: number;
  inserted_sessions: number;
  skipped_existing: number;
  dry_run: boolean;
}): MemoryPassportImportResult {
  const importedRecords =
    input.inserted_facts + input.inserted_business_context + input.inserted_sessions + input.skipped_existing;
  const exportedRecords = Math.max(input.bundle.summary.exported_records, 1);
  const fidelity = importedRecords / exportedRecords;
  const leakage = auditMemoryPassportCredentialLeakage(input.bundle);
  return {
    imported: !input.dry_run,
    dry_run: input.dry_run,
    inserted_facts: input.inserted_facts,
    inserted_business_context: input.inserted_business_context,
    inserted_sessions: input.inserted_sessions,
    skipped_existing: input.skipped_existing,
    metrics: {
      passport_roundtrip_fidelity: fidelity,
      passport_credential_leakage: leakage.passport_credential_leakage,
    },
    audit: {
      operation: "import",
      bundle_version: input.bundle.version,
      signature_digest: signatureDigest(input.bundle.signature),
      exported_records: input.bundle.summary.exported_records,
      imported_records: importedRecords,
      redacted_records: input.bundle.summary.redacted_records,
      credential_leakage: leakage.passport_credential_leakage,
    },
  };
}
