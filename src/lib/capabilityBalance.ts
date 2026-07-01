export type CapabilityCategory =
  | "analytics"
  | "automation"
  | "compute"
  | "connector"
  | "copy"
  | "memory"
  | "quality"
  | "worker";

export type CapabilityLifecycle = "core" | "growing" | "watch" | "experimental" | "redundant";

export type CapabilitySignalKind = "actual" | "expected" | "missed" | "failure" | "cost" | "source_gap";

export type CapabilityBalanceState =
  | "healthy"
  | "hot"
  | "should_use"
  | "cold"
  | "redundant"
  | "broken"
  | "costly"
  | "uncertain";

export interface CapabilityRegistryEntry {
  key: string;
  label: string;
  category: CapabilityCategory;
  ownerSurface: string;
  lifecycle: CapabilityLifecycle;
  targetMonthlyUses: number;
  costWarningUsd?: number;
  expectedSignals: string[];
}

export interface CapabilityBalanceEventInput {
  capability: string;
  source: string;
  kind?: CapabilitySignalKind;
  count?: number | null;
  success?: boolean | null;
  costUsd?: number | string | null;
  responseMs?: number | string | null;
  createdAt?: string | null;
}

export interface CapabilityBalanceRow {
  key: string;
  label: string;
  category: CapabilityCategory;
  ownerSurface: string;
  lifecycle: CapabilityLifecycle;
  targetMonthlyUses: number;
  actualUses: number;
  expectedUses: number;
  missedUses: number;
  failures: number;
  successRate: number | null;
  costUsd: number;
  avgResponseMs: number | null;
  lastUsedAt: string | null;
  sourceCount: number;
  sources: string[];
  state: CapabilityBalanceState;
  score: number;
  reason: string;
  recommendedAction: string;
}

export interface CapabilityBalanceSummary {
  periodStart: string;
  periodEnd: string;
  generatedAt: string;
  totals: {
    capabilities: number;
    actualUses: number;
    expectedUses: number;
    missedUses: number;
    failures: number;
    hot: number;
    shouldUse: number;
    cold: number;
    redundant: number;
    broken: number;
    costly: number;
    sourceGaps: number;
  };
  rows: CapabilityBalanceRow[];
  attention: CapabilityBalanceRow[];
  sourceGaps: string[];
}

interface MutableCapabilityBalance {
  entry: CapabilityRegistryEntry;
  actualUses: number;
  expectedUses: number;
  missedUses: number;
  failures: number;
  successes: number;
  costUsd: number;
  responseMsTotal: number;
  responseMsCount: number;
  lastUsedAt: string | null;
  sources: Set<string>;
}

export const DEFAULT_CAPABILITY_REGISTRY: CapabilityRegistryEntry[] = [
  {
    key: "copyroom",
    label: "CopyRoom",
    category: "copy",
    ownerSurface: "CopyPass",
    lifecycle: "core",
    targetMonthlyUses: 8,
    expectedSignals: ["exact copy", "source text", "copy receipt", "fidelity drift"],
  },
  {
    key: "copypass",
    label: "CopyPass",
    category: "copy",
    ownerSurface: "XPass",
    lifecycle: "growing",
    targetMonthlyUses: 4,
    expectedSignals: ["copy check", "copy receipt", "source fidelity"],
  },
  {
    key: "fidelitypass",
    label: "FidelityPass",
    category: "copy",
    ownerSurface: "XPass",
    lifecycle: "growing",
    targetMonthlyUses: 4,
    expectedSignals: ["fidelity drift", "exact source", "no retyping"],
  },
  {
    key: "xpass",
    label: "XPass hub",
    category: "quality",
    ownerSurface: "Checks",
    lifecycle: "core",
    targetMonthlyUses: 12,
    expectedSignals: ["pass verdict", "proof gate", "quality check"],
  },
  {
    key: "testpass",
    label: "TestPass",
    category: "quality",
    ownerSurface: "Checks",
    lifecycle: "core",
    targetMonthlyUses: 5,
    expectedSignals: ["smoke test", "test run", "qa sweep"],
  },
  {
    key: "uxpass",
    label: "UXPass",
    category: "quality",
    ownerSurface: "Checks",
    lifecycle: "growing",
    targetMonthlyUses: 5,
    expectedSignals: ["ui review", "visual audit", "accessibility"],
  },
  {
    key: "xgate",
    label: "XGate",
    category: "automation",
    ownerSurface: "XGate",
    lifecycle: "growing",
    targetMonthlyUses: 3,
    expectedSignals: ["pre-execution gate", "ship gate", "scope gate"],
  },
  {
    key: "keychain",
    label: "Keychain",
    category: "connector",
    ownerSurface: "Connections",
    lifecycle: "core",
    targetMonthlyUses: 10,
    expectedSignals: ["api key", "oauth", "credential", "passport"],
  },
  {
    key: "connectors",
    label: "Connectors",
    category: "connector",
    ownerSurface: "Connections",
    lifecycle: "core",
    targetMonthlyUses: 12,
    expectedSignals: ["app call", "platform operation", "connection test"],
  },
  {
    key: "seats-api",
    label: "Seats API",
    category: "compute",
    ownerSurface: "Seats",
    lifecycle: "watch",
    targetMonthlyUses: 3,
    costWarningUsd: 25,
    expectedSignals: ["model call", "provider spend", "token use"],
  },
  {
    key: "workers",
    label: "Workers",
    category: "worker",
    ownerSurface: "AutoPilot",
    lifecycle: "core",
    targetMonthlyUses: 12,
    expectedSignals: ["worker lane", "agent owner", "heartbeat"],
  },
  {
    key: "autopilot",
    label: "AutoPilot",
    category: "automation",
    ownerSurface: "AutoPilot",
    lifecycle: "core",
    targetMonthlyUses: 12,
    expectedSignals: ["claim", "build", "proof", "dispatch"],
  },
  {
    key: "boardroom",
    label: "Boardroom",
    category: "automation",
    ownerSurface: "Boardroom",
    lifecycle: "core",
    targetMonthlyUses: 12,
    expectedSignals: ["todo", "job", "operator queue"],
  },
  {
    key: "crews",
    label: "Crews",
    category: "worker",
    ownerSurface: "Crews",
    lifecycle: "experimental",
    targetMonthlyUses: 2,
    expectedSignals: ["council", "crew run", "multi-agent"],
  },
  {
    key: "orchestrator",
    label: "Orchestrator",
    category: "memory",
    ownerSurface: "Orchestrator",
    lifecycle: "core",
    targetMonthlyUses: 8,
    expectedSignals: ["continuity", "conversation turn", "context read"],
  },
  {
    key: "analytics",
    label: "Analytics",
    category: "analytics",
    ownerSurface: "Analytics",
    lifecycle: "watch",
    targetMonthlyUses: 4,
    expectedSignals: ["pageview", "product event", "funnel"],
  },
];

const STATE_PRIORITY: Record<CapabilityBalanceState, number> = {
  should_use: 0,
  broken: 1,
  costly: 2,
  hot: 3,
  cold: 4,
  redundant: 5,
  uncertain: 6,
  healthy: 7,
};

export function normalizeCapabilityKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9:_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function labelForCapabilityKey(key: string): string {
  const normalized = normalizeCapabilityKey(key);
  if (normalized.startsWith("connector:")) {
    return `${titleize(normalized.slice("connector:".length))} connector`;
  }
  return titleize(normalized);
}

export function summarizeCapabilityBalance(input: {
  periodStart: string;
  periodEnd: string;
  events: CapabilityBalanceEventInput[];
  registry?: CapabilityRegistryEntry[];
  generatedAt?: string;
  sourceGaps?: string[];
}): CapabilityBalanceSummary {
  const generatedAt = input.generatedAt ?? new Date().toISOString();
  const registry = input.registry ?? DEFAULT_CAPABILITY_REGISTRY;
  const rowsByKey = new Map<string, MutableCapabilityBalance>();

  for (const entry of registry) {
    rowsByKey.set(entry.key, emptyMutableRow(entry));
  }

  for (const event of input.events) {
    const key = normalizeCapabilityKey(event.capability);
    if (!key) continue;
    const current = rowsByKey.get(key) ?? emptyMutableRow(dynamicEntryForKey(key));
    applyEvent(current, event);
    rowsByKey.set(key, current);
  }

  const rows = [...rowsByKey.values()]
    .map(toSummaryRow)
    .sort((left, right) =>
      STATE_PRIORITY[left.state] - STATE_PRIORITY[right.state]
      || right.score - left.score
      || right.actualUses - left.actualUses
      || left.label.localeCompare(right.label),
    );

  const totals = rows.reduce<CapabilityBalanceSummary["totals"]>((acc, row) => {
    acc.capabilities += 1;
    acc.actualUses += row.actualUses;
    acc.expectedUses += row.expectedUses;
    acc.missedUses += row.missedUses;
    acc.failures += row.failures;
    if (row.state === "hot") acc.hot += 1;
    if (row.state === "should_use") acc.shouldUse += 1;
    if (row.state === "cold") acc.cold += 1;
    if (row.state === "redundant") acc.redundant += 1;
    if (row.state === "broken") acc.broken += 1;
    if (row.state === "costly") acc.costly += 1;
    return acc;
  }, {
    capabilities: 0,
    actualUses: 0,
    expectedUses: 0,
    missedUses: 0,
    failures: 0,
    hot: 0,
    shouldUse: 0,
    cold: 0,
    redundant: 0,
    broken: 0,
    costly: 0,
    sourceGaps: input.sourceGaps?.length ?? 0,
  });

  return {
    periodStart: input.periodStart,
    periodEnd: input.periodEnd,
    generatedAt,
    totals,
    rows,
    attention: rows.filter((row) => row.state !== "healthy").slice(0, 8),
    sourceGaps: input.sourceGaps ?? [],
  };
}

function applyEvent(current: MutableCapabilityBalance, event: CapabilityBalanceEventInput): void {
  const count = coercePositiveInteger(event.count, 1);
  const kind = event.kind ?? (event.success === false ? "failure" : "actual");
  current.sources.add(event.source || "unknown");

  if (kind === "actual") current.actualUses += count;
  if (kind === "expected") current.expectedUses += count;
  if (kind === "missed") current.missedUses += count;
  if (kind === "failure") {
    current.actualUses += count;
    current.failures += count;
  }
  if (kind === "cost") current.actualUses += count;
  if (event.success === true) current.successes += count;
  if (event.success === false && kind !== "failure") current.failures += count;

  const costUsd = coerceNonNegativeNumber(event.costUsd);
  current.costUsd += costUsd;

  const responseMs = coerceNonNegativeNumber(event.responseMs);
  if (responseMs > 0) {
    current.responseMsTotal += responseMs;
    current.responseMsCount += 1;
  }

  if ((kind === "actual" || kind === "failure" || kind === "cost") && event.createdAt) {
    current.lastUsedAt = latestIso(current.lastUsedAt, event.createdAt);
  }
}

function toSummaryRow(row: MutableCapabilityBalance): CapabilityBalanceRow {
  const totalObserved = row.actualUses;
  const successRate = totalObserved > 0
    ? Math.round(((totalObserved - row.failures) / totalObserved) * 1000) / 10
    : null;
  const avgResponseMs = row.responseMsCount > 0
    ? Math.round(row.responseMsTotal / row.responseMsCount)
    : null;
  const state = stateFor(row, successRate);
  const score = scoreFor(row, state, successRate);

  return {
    key: row.entry.key,
    label: row.entry.label,
    category: row.entry.category,
    ownerSurface: row.entry.ownerSurface,
    lifecycle: row.entry.lifecycle,
    targetMonthlyUses: row.entry.targetMonthlyUses,
    actualUses: row.actualUses,
    expectedUses: row.expectedUses,
    missedUses: row.missedUses,
    failures: row.failures,
    successRate,
    costUsd: round(row.costUsd, 4),
    avgResponseMs,
    lastUsedAt: row.lastUsedAt,
    sourceCount: row.sources.size,
    sources: [...row.sources].sort(),
    state,
    score,
    reason: reasonFor(row, state, successRate),
    recommendedAction: actionFor(row, state),
  };
}

function stateFor(row: MutableCapabilityBalance, successRate: number | null): CapabilityBalanceState {
  const entry = row.entry;
  if (entry.lifecycle === "redundant") return "redundant";
  if (successRate !== null && successRate < 75 && row.failures >= 2) return "broken";
  if (entry.costWarningUsd && row.costUsd >= entry.costWarningUsd) return "costly";
  if (row.missedUses > 0 || row.expectedUses > row.actualUses) return "should_use";
  if (row.actualUses >= Math.max(6, entry.targetMonthlyUses * 2)) return "hot";
  if (row.actualUses > 0) return "healthy";
  if (entry.lifecycle === "experimental") return "uncertain";
  return "cold";
}

function scoreFor(row: MutableCapabilityBalance, state: CapabilityBalanceState, successRate: number | null): number {
  if (state === "broken") return clampScore(90 - (successRate ?? 0) + row.failures * 5);
  if (state === "should_use") return clampScore(70 + (row.expectedUses - row.actualUses) * 8 + row.missedUses * 12);
  if (state === "costly") return clampScore(65 + row.costUsd);
  if (state === "hot") return clampScore(75 + row.actualUses);
  if (state === "cold") return row.entry.targetMonthlyUses > 0 ? 60 : 35;
  if (state === "redundant") return row.actualUses > 0 ? 75 : 45;
  if (state === "uncertain") return 50;
  return clampScore(100 - Math.max(0, row.entry.targetMonthlyUses - row.actualUses) * 3 - row.failures * 8);
}

function reasonFor(row: MutableCapabilityBalance, state: CapabilityBalanceState, successRate: number | null): string {
  if (state === "should_use") {
    return `${row.expectedUses} expected signal(s), ${row.actualUses} observed use(s), ${row.missedUses} explicit miss(es).`;
  }
  if (state === "broken") return `${row.failures} failure(s), ${successRate ?? 0}% success rate.`;
  if (state === "costly") return `$${round(row.costUsd, 2)} logged against a $${row.entry.costWarningUsd} watch line.`;
  if (state === "hot") return `${row.actualUses} observed use(s), above the ${row.entry.targetMonthlyUses} target.`;
  if (state === "cold") return `No observed use in this window; target is ${row.entry.targetMonthlyUses}.`;
  if (state === "redundant") return row.actualUses > 0 ? "Marked redundant but still receiving use." : "Marked redundant and quiet.";
  if (state === "uncertain") return "Experimental capability has no recent usage signal.";
  return `${row.actualUses} observed use(s), ${row.failures} failure(s).`;
}

function actionFor(row: MutableCapabilityBalance, state: CapabilityBalanceState): string {
  if (state === "should_use") return `Route matching work through ${row.entry.label} or lower its expected-use rule.`;
  if (state === "broken") return `Inspect ${row.entry.ownerSurface} failures before sending more work here.`;
  if (state === "costly") return `Review ${row.entry.ownerSurface} spend cap and routing policy.`;
  if (state === "hot") return `Keep ${row.entry.label} promoted; check whether adjacent capabilities should share load.`;
  if (state === "cold") return `Decide whether ${row.entry.label} needs promotion, instrumentation, or retirement.`;
  if (state === "redundant") return `Confirm whether ${row.entry.label} should be hidden, merged, or deliberately retained.`;
  if (state === "uncertain") return `Run a small proof job or park ${row.entry.label} out of the main path.`;
  return `Keep ${row.entry.label} in the normal lane.`;
}

function emptyMutableRow(entry: CapabilityRegistryEntry): MutableCapabilityBalance {
  return {
    entry,
    actualUses: 0,
    expectedUses: 0,
    missedUses: 0,
    failures: 0,
    successes: 0,
    costUsd: 0,
    responseMsTotal: 0,
    responseMsCount: 0,
    lastUsedAt: null,
    sources: new Set(),
  };
}

function dynamicEntryForKey(key: string): CapabilityRegistryEntry {
  return {
    key,
    label: labelForCapabilityKey(key),
    category: key.startsWith("connector:") ? "connector" : "automation",
    ownerSurface: key.startsWith("connector:") ? "Connections" : "UnClick",
    lifecycle: "watch",
    targetMonthlyUses: 0,
    expectedSignals: [],
  };
}

function coercePositiveInteger(value: unknown, fallback: number): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return fallback;
  return Math.max(1, Math.round(numeric));
}

function coerceNonNegativeNumber(value: unknown): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return 0;
  return numeric;
}

function latestIso(left: string | null, right: string): string {
  if (!left) return right;
  return new Date(right).getTime() > new Date(left).getTime() ? right : left;
}

function titleize(value: string): string {
  return value
    .split(/[-_:\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function round(value: number, digits: number): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}
