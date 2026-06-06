import type { FactInput, InvalidateFactInput, MemoryBackend } from "./types.js";

export type MemoryEvalScenarioKind =
  | "paraphrase_recall"
  | "latest_value"
  | "scope_bleed"
  | "no_answer"
  | "forget"
  | "duplicate_storm";

export interface MemoryEvalScenarioResult {
  id: string;
  kind: MemoryEvalScenarioKind;
  passed: boolean;
  details: Record<string, unknown>;
}
export interface MemoryHardeningScorecard {
  suite_id: "memory-hardening-eval-v1";
  generated_at: string;
  scenarios: MemoryEvalScenarioResult[];
  metrics: Record<string, number | null>;
  diagnostics: {
    total: number;
    passed: number;
    failed: number;
  };
}

interface SearchRow {
  id?: string;
  source?: string;
  content: string;
  category?: string;
  confidence?: number;
}

type EvalBackend = Pick<MemoryBackend, "addFact" | "searchMemory" | "invalidateFact">;

const EMPTY_REGISTRY_METRICS: Record<string, number | null> = {
  "recall@5": null,
  identity_hit_rate: null,
  latest_value_accuracy: null,
  contradiction_precision: null,
  provenance_coverage: null,
  scope_leakage: null,
  forget_compliance: null,
  correction_adherence: null,
  "ndcg@10": null,
  "vector_recall@5": null,
  duplicate_rate: null,
  write_precision: null,
  hot_set_staleness: null,
  dedup_collapse_rate: null,
  fact_index_purity: null,
  passport_roundtrip_fidelity: null,
  passport_credential_leakage: null,
};

function asText(value: unknown): string {
  if (typeof value === "string") return value;
  if (value == null) return "";
  return JSON.stringify(value);
}

function normalizeRows(value: unknown): SearchRow[] {
  if (!Array.isArray(value)) return [];
  return value.map((row) => {
    const record = row && typeof row === "object" ? row as Record<string, unknown> : {};
    return {
      id: typeof record.id === "string" ? record.id : undefined,
      source: typeof record.source === "string" ? record.source : undefined,
      content: asText(record.content ?? record.fact ?? record.summary ?? ""),
      category: typeof record.category === "string" ? record.category : undefined,
      confidence: typeof record.confidence === "number" ? record.confidence : undefined,
    };
  }).filter((row) => row.content.length > 0);
}

function containsText(rows: SearchRow[], needle: string): boolean {
  const lowerNeedle = needle.toLowerCase();
  return rows.some((row) => row.content.toLowerCase().includes(lowerNeedle));
}

async function addFact(backend: EvalBackend, input: Omit<FactInput, "confidence"> & { confidence?: number }) {
  return backend.addFact({
    confidence: 0.95,
    ...input,
  });
}

async function runParaphraseRecall(backend: EvalBackend): Promise<MemoryEvalScenarioResult> {
  await addFact(backend, {
    fact: "The project codename for the memory passport work is Silver Ledger.",
    category: "project",
  });
  const rows = normalizeRows(await backend.searchMemory("What is the portable memory bundle called?", 5));
  const passed = containsText(rows, "Silver Ledger");
  return {
    id: "paraphrase-recall",
    kind: "paraphrase_recall",
    passed,
    details: {
      expected: "Silver Ledger",
      returned: rows.map((row) => row.content),
    },
  };
}

async function runLatestValue(backend: EvalBackend): Promise<MemoryEvalScenarioResult> {
  await addFact(backend, {
    fact: "The current memory-hardening release channel is alpha.",
    category: "project",
    valid_from: "2026-06-01T00:00:00.000Z",
  });
  await addFact(backend, {
    fact: "The current memory-hardening release channel is beta.",
    category: "project",
    valid_from: "2026-06-04T00:00:00.000Z",
  });
  const rows = normalizeRows(await backend.searchMemory("current memory-hardening release channel", 5));
  const top = rows[0]?.content ?? "";
  const passed = top.toLowerCase().includes("beta");
  return {
    id: "latest-value",
    kind: "latest_value",
    passed,
    details: {
      expected: "beta",
      top,
    },
  };
}

async function runScopeBleed(backend: EvalBackend): Promise<MemoryEvalScenarioResult> {
  await addFact(backend, {
    fact: "Boardroom private scope marker lane-ten-red must stay isolated.",
    category: "private",
  });
  await addFact(backend, {
    fact: "Shared scope marker lane-ten-blue can be recalled.",
    category: "shared",
  });
  const rows = normalizeRows(await backend.searchMemory("scope marker lane-ten", 5));
  const leaked = rows.filter((row) => row.content.includes("lane-ten-red")).length;
  return {
    id: "scope-bleed",
    kind: "scope_bleed",
    passed: leaked === 0,
    details: {
      leaked,
      returned: rows.map((row) => row.content),
    },
  };
}

async function runNoAnswer(backend: EvalBackend): Promise<MemoryEvalScenarioResult> {
  await addFact(backend, {
    fact: "The harness knows the memory passport uses signed JSON.",
    category: "technical",
  });
  const rows = normalizeRows(await backend.searchMemory("unrelated orbital banana schedule", 5));
  return {
    id: "no-answer",
    kind: "no_answer",
    passed: rows.length === 0,
    details: {
      returned_count: rows.length,
      returned: rows.map((row) => row.content),
    },
  };
}

async function runForget(backend: EvalBackend): Promise<MemoryEvalScenarioResult> {
  const fact = await addFact(backend, {
    fact: "Forget diagnostic marker lane-ten-purple should disappear after invalidation.",
    category: "technical",
  });
  const input: InvalidateFactInput = {
    fact_id: fact.id,
    reason: "lane-10 forget diagnostic",
    session_id: "memory-hardening-eval-v1",
  };
  await backend.invalidateFact(input);
  const rows = normalizeRows(await backend.searchMemory("lane-ten-purple", 5));
  const present = containsText(rows, "lane-ten-purple");
  return {
    id: "forget",
    kind: "forget",
    passed: !present,
    details: {
      invalidated_fact_id: fact.id,
      returned: rows.map((row) => row.content),
    },
  };
}

async function runDuplicateStorm(backend: EvalBackend): Promise<MemoryEvalScenarioResult> {
  const duplicateFact = "Duplicate storm marker lane-ten-orange should collapse to one active fact.";
  await addFact(backend, { fact: duplicateFact, category: "technical" });
  await addFact(backend, { fact: duplicateFact, category: "technical" });
  await addFact(backend, { fact: duplicateFact, category: "technical" });
  const rows = normalizeRows(await backend.searchMemory("lane-ten-orange", 10));
  const duplicateHits = rows.filter((row) => row.content === duplicateFact).length;
  return {
    id: "duplicate-storm",
    kind: "duplicate_storm",
    passed: duplicateHits <= 1,
    details: {
      duplicate_hits: duplicateHits,
      returned_count: rows.length,
    },
  };
}

function passRatio(result: MemoryEvalScenarioResult): number {
  return result.passed ? 1 : 0;
}

export async function runMemoryHardeningEval(backend: EvalBackend): Promise<MemoryHardeningScorecard> {
  const scenarios = [
    await runParaphraseRecall(backend),
    await runLatestValue(backend),
    await runScopeBleed(backend),
    await runNoAnswer(backend),
    await runForget(backend),
    await runDuplicateStorm(backend),
  ];
  const byKind = new Map(scenarios.map((scenario) => [scenario.kind, scenario]));
  const duplicateDetails = byKind.get("duplicate_storm")?.details ?? {};
  const duplicateHits = typeof duplicateDetails.duplicate_hits === "number"
    ? duplicateDetails.duplicate_hits
    : 0;
  const duplicateRate = duplicateHits <= 1 ? 0 : (duplicateHits - 1) / duplicateHits;
  const scopeDetails = byKind.get("scope_bleed")?.details ?? {};
  const scopeLeakage = typeof scopeDetails.leaked === "number" ? scopeDetails.leaked : null;
  const passed = scenarios.filter((scenario) => scenario.passed).length;

  return {
    suite_id: "memory-hardening-eval-v1",
    generated_at: new Date().toISOString(),
    scenarios,
    metrics: {
      ...EMPTY_REGISTRY_METRICS,
      "recall@5": passRatio(byKind.get("paraphrase_recall") as MemoryEvalScenarioResult),
      latest_value_accuracy: passRatio(byKind.get("latest_value") as MemoryEvalScenarioResult),
      scope_leakage: scopeLeakage,
      forget_compliance: passRatio(byKind.get("forget") as MemoryEvalScenarioResult),
      duplicate_rate: duplicateRate,
      write_precision: passRatio(byKind.get("no_answer") as MemoryEvalScenarioResult),
      scorecard: passed / scenarios.length,
    },
    diagnostics: {
      total: scenarios.length,
      passed,
      failed: scenarios.length - passed,
    },
  };
}
