export type SeatsApiProvider = "anthropic" | "openai" | "google-ai" | "mistral" | "groq" | "perplexity" | "together-ai" | "replicate";

export interface SeatsApiPricing {
  provider: SeatsApiProvider;
  model: string;
  inputUsdPerMillion: number;
  outputUsdPerMillion: number;
  cachedInputUsdPerMillion?: number;
  sourceLabel: string;
}

export interface SeatsApiUsageInput {
  provider: string;
  model?: string | null;
  inputTokens?: number | null;
  outputTokens?: number | null;
  cachedInputTokens?: number | null;
  requestCount?: number | null;
  estimatedCostUsd?: number | null;
}

export interface SeatsApiUsageRow extends Required<Omit<SeatsApiUsageInput, "estimatedCostUsd" | "model">> {
  model: string | null;
  estimatedCostUsd: number;
}

export interface SeatsApiBudgetCap {
  provider: string;
  monthlyBudgetUsd: number | null;
  warnAtPercent: number;
  throttleAtPercent: number;
}

export type SeatsApiBudgetDecision = "uncapped" | "ok" | "warn" | "throttle";

export interface SeatsApiProviderSummary {
  provider: string;
  label: string;
  inputTokens: number;
  outputTokens: number;
  cachedInputTokens: number;
  totalTokens: number;
  requestCount: number;
  estimatedCostUsd: number;
  monthlyBudgetUsd: number | null;
  budgetUsedPercent: number | null;
  budgetStatus: "none" | "ok" | "warning" | "over";
}

export interface SeatsApiUsageSummary {
  periodStart: string;
  periodEnd: string;
  totals: {
    inputTokens: number;
    outputTokens: number;
    cachedInputTokens: number;
    totalTokens: number;
    requestCount: number;
    estimatedCostUsd: number;
  };
  providers: SeatsApiProviderSummary[];
}

export const SEATS_API_PROVIDER_LABELS: Record<SeatsApiProvider, string> = {
  anthropic: "Anthropic",
  openai: "OpenAI",
  "google-ai": "Google AI",
  mistral: "Mistral",
  groq: "Groq",
  perplexity: "Perplexity",
  "together-ai": "Together AI",
  replicate: "Replicate",
};

export const SEATS_API_DEFAULT_PROVIDER_ORDER: SeatsApiProvider[] = [
  "anthropic",
  "openai",
  "google-ai",
  "mistral",
  "groq",
  "perplexity",
  "together-ai",
  "replicate",
];

export const SEATS_API_PRICING: SeatsApiPricing[] = [
  {
    provider: "anthropic",
    model: "claude-sonnet-4.6",
    inputUsdPerMillion: 3,
    outputUsdPerMillion: 15,
    cachedInputUsdPerMillion: 0.3,
    sourceLabel: "Anthropic Claude Sonnet 4.6 standard",
  },
  {
    provider: "anthropic",
    model: "claude-haiku-4.5",
    inputUsdPerMillion: 1,
    outputUsdPerMillion: 5,
    cachedInputUsdPerMillion: 0.1,
    sourceLabel: "Anthropic Claude Haiku 4.5 standard",
  },
  {
    provider: "anthropic",
    model: "claude-opus-4.8",
    inputUsdPerMillion: 5,
    outputUsdPerMillion: 25,
    cachedInputUsdPerMillion: 0.5,
    sourceLabel: "Anthropic Claude Opus 4.8 standard",
  },
  {
    provider: "openai",
    model: "gpt-5.4-mini",
    inputUsdPerMillion: 0.75,
    outputUsdPerMillion: 4.5,
    cachedInputUsdPerMillion: 0.075,
    sourceLabel: "OpenAI GPT-5.4 mini standard",
  },
  {
    provider: "openai",
    model: "gpt-5.4",
    inputUsdPerMillion: 2.5,
    outputUsdPerMillion: 15,
    cachedInputUsdPerMillion: 0.25,
    sourceLabel: "OpenAI GPT-5.4 standard",
  },
  {
    provider: "openai",
    model: "gpt-5.5",
    inputUsdPerMillion: 5,
    outputUsdPerMillion: 30,
    cachedInputUsdPerMillion: 0.5,
    sourceLabel: "OpenAI GPT-5.5 standard",
  },
  {
    provider: "google-ai",
    model: "gemini-3-flash-preview",
    inputUsdPerMillion: 0.5,
    outputUsdPerMillion: 3,
    cachedInputUsdPerMillion: 0.05,
    sourceLabel: "Google Gemini 3 Flash preview standard",
  },
  {
    provider: "google-ai",
    model: "gemini-2.5-pro",
    inputUsdPerMillion: 1.25,
    outputUsdPerMillion: 10,
    cachedInputUsdPerMillion: 0.125,
    sourceLabel: "Google Gemini 2.5 Pro standard under 200k",
  },
  {
    provider: "mistral",
    model: "mistral-large",
    inputUsdPerMillion: 2,
    outputUsdPerMillion: 6,
    sourceLabel: "Mistral Large standard",
  },
];

const DEFAULT_MODEL_BY_PROVIDER: Partial<Record<SeatsApiProvider, string>> = {
  anthropic: "claude-sonnet-4.6",
  openai: "gpt-5.4-mini",
  "google-ai": "gemini-3-flash-preview",
  mistral: "mistral-large",
};

export function normalizeSeatsApiProvider(provider: string): string {
  return provider.trim().toLowerCase();
}

function normalizeModel(model?: string | null): string | null {
  const normalized = model?.trim().toLowerCase() ?? "";
  return normalized || null;
}

export function coerceNonNegativeNumber(value: unknown, fallback = 0): number {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) return fallback;
  return numeric;
}

export function labelForSeatsApiProvider(provider: string): string {
  const normalizedProvider = normalizeSeatsApiProvider(provider);
  return SEATS_API_PROVIDER_LABELS[normalizedProvider as SeatsApiProvider]
    ?? normalizedProvider
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
}

export function normalizeSeatsApiBudgetCap(input: {
  provider: string;
  monthlyBudgetUsd?: number | string | null;
  warnAtPercent?: number | string | null;
  throttleAtPercent?: number | string | null;
}): SeatsApiBudgetCap {
  const monthlyBudgetUsd =
    input.monthlyBudgetUsd === null || input.monthlyBudgetUsd === ""
      ? null
      : roundUsd(coerceNonNegativeNumber(input.monthlyBudgetUsd, 0));
  const warnAtPercent = clampPercent(coerceNonNegativeNumber(input.warnAtPercent, 80), 1, 1000);
  const throttleAtPercent = Math.max(
    warnAtPercent,
    clampPercent(coerceNonNegativeNumber(input.throttleAtPercent, 100), warnAtPercent, 1000),
  );

  return {
    provider: normalizeSeatsApiProvider(input.provider),
    monthlyBudgetUsd,
    warnAtPercent,
    throttleAtPercent,
  };
}

export function findSeatsApiPricing(provider: string, model?: string | null): SeatsApiPricing | null {
  const normalizedProvider = normalizeSeatsApiProvider(provider) as SeatsApiProvider;
  const normalizedModel = normalizeModel(model);
  const exact = normalizedModel
    ? SEATS_API_PRICING.find((pricing) => pricing.provider === normalizedProvider && pricing.model === normalizedModel)
    : null;
  if (exact) return exact;

  const defaultModel = DEFAULT_MODEL_BY_PROVIDER[normalizedProvider];
  if (!defaultModel) return null;
  return SEATS_API_PRICING.find((pricing) => pricing.provider === normalizedProvider && pricing.model === defaultModel) ?? null;
}

export function estimateSeatsApiCostUsd(input: SeatsApiUsageInput): number {
  if (typeof input.estimatedCostUsd === "number" && Number.isFinite(input.estimatedCostUsd) && input.estimatedCostUsd >= 0) {
    return roundUsd(input.estimatedCostUsd);
  }

  const pricing = findSeatsApiPricing(input.provider, input.model);
  if (!pricing) return 0;

  const inputTokens = coerceNonNegativeNumber(input.inputTokens);
  const outputTokens = coerceNonNegativeNumber(input.outputTokens);
  const cachedInputTokens = coerceNonNegativeNumber(input.cachedInputTokens);
  const billableInputTokens = Math.max(0, inputTokens - cachedInputTokens);
  const cachedRate = pricing.cachedInputUsdPerMillion ?? pricing.inputUsdPerMillion;

  return roundUsd(
    (billableInputTokens / 1_000_000) * pricing.inputUsdPerMillion
    + (cachedInputTokens / 1_000_000) * cachedRate
    + (outputTokens / 1_000_000) * pricing.outputUsdPerMillion,
  );
}

export function normalizeSeatsApiUsageRow(input: SeatsApiUsageInput): SeatsApiUsageRow {
  return {
    provider: normalizeSeatsApiProvider(input.provider),
    model: normalizeModel(input.model),
    inputTokens: Math.round(coerceNonNegativeNumber(input.inputTokens)),
    outputTokens: Math.round(coerceNonNegativeNumber(input.outputTokens)),
    cachedInputTokens: Math.round(coerceNonNegativeNumber(input.cachedInputTokens)),
    requestCount: Math.max(1, Math.round(coerceNonNegativeNumber(input.requestCount, 1))),
    estimatedCostUsd: estimateSeatsApiCostUsd(input),
  };
}

export function budgetStatus(costUsd: number, budget: SeatsApiBudgetCap | null): SeatsApiProviderSummary["budgetStatus"] {
  if (!budget?.monthlyBudgetUsd || budget.monthlyBudgetUsd <= 0) return "none";
  const percent = (costUsd / budget.monthlyBudgetUsd) * 100;
  if (percent >= budget.throttleAtPercent) return "over";
  if (percent >= budget.warnAtPercent) return "warning";
  return "ok";
}

export function budgetDecision(
  currentCostUsd: number,
  budget: SeatsApiBudgetCap | null,
  projectedCostUsd = 0,
): SeatsApiBudgetDecision {
  if (!budget?.monthlyBudgetUsd || budget.monthlyBudgetUsd <= 0) return "uncapped";
  const projectedTotal = currentCostUsd + coerceNonNegativeNumber(projectedCostUsd);
  const percent = (projectedTotal / budget.monthlyBudgetUsd) * 100;
  if (percent >= budget.throttleAtPercent) return "throttle";
  if (percent >= budget.warnAtPercent) return "warn";
  return "ok";
}

export function summarizeSeatsApiUsage(params: {
  periodStart: string;
  periodEnd: string;
  rows: SeatsApiUsageInput[];
  budgets?: SeatsApiBudgetCap[];
}): SeatsApiUsageSummary {
  const budgetByProvider = new Map(
    (params.budgets ?? []).map((budget) => [normalizeSeatsApiProvider(budget.provider), normalizeSeatsApiBudgetCap(budget)]),
  );
  const providerMap = new Map<string, SeatsApiProviderSummary>();

  for (const rawRow of params.rows) {
    const row = normalizeSeatsApiUsageRow(rawRow);
    const current = providerMap.get(row.provider) ?? {
      provider: row.provider,
      label: labelForSeatsApiProvider(row.provider),
      inputTokens: 0,
      outputTokens: 0,
      cachedInputTokens: 0,
      totalTokens: 0,
      requestCount: 0,
      estimatedCostUsd: 0,
      monthlyBudgetUsd: budgetByProvider.get(row.provider)?.monthlyBudgetUsd ?? null,
      budgetUsedPercent: null,
      budgetStatus: "none" as const,
    };

    current.inputTokens += row.inputTokens;
    current.outputTokens += row.outputTokens;
    current.cachedInputTokens += row.cachedInputTokens;
    current.totalTokens += row.inputTokens + row.outputTokens;
    current.requestCount += row.requestCount;
    current.estimatedCostUsd = roundUsd(current.estimatedCostUsd + row.estimatedCostUsd);
    providerMap.set(row.provider, current);
  }

  for (const budget of budgetByProvider.values()) {
    const provider = normalizeSeatsApiProvider(budget.provider);
    if (providerMap.has(provider)) continue;
    providerMap.set(provider, {
      provider,
      label: labelForSeatsApiProvider(provider),
      inputTokens: 0,
      outputTokens: 0,
      cachedInputTokens: 0,
      totalTokens: 0,
      requestCount: 0,
      estimatedCostUsd: 0,
      monthlyBudgetUsd: budget.monthlyBudgetUsd,
      budgetUsedPercent: null,
      budgetStatus: "none",
    });
  }

  const providers = [...providerMap.values()].map((summary) => {
    const budget = budgetByProvider.get(summary.provider) ?? null;
    const usedPercent = budget?.monthlyBudgetUsd
      ? roundPercent((summary.estimatedCostUsd / budget.monthlyBudgetUsd) * 100)
      : null;
    return {
      ...summary,
      monthlyBudgetUsd: budget?.monthlyBudgetUsd ?? summary.monthlyBudgetUsd,
      budgetUsedPercent: usedPercent,
      budgetStatus: budgetStatus(summary.estimatedCostUsd, budget),
    };
  }).sort((left, right) => {
    const leftIndex = SEATS_API_DEFAULT_PROVIDER_ORDER.indexOf(left.provider as SeatsApiProvider);
    const rightIndex = SEATS_API_DEFAULT_PROVIDER_ORDER.indexOf(right.provider as SeatsApiProvider);
    return (leftIndex === -1 ? 99 : leftIndex) - (rightIndex === -1 ? 99 : rightIndex)
      || left.label.localeCompare(right.label);
  });

  const totals = providers.reduce<SeatsApiUsageSummary["totals"]>((acc, provider) => {
    acc.inputTokens += provider.inputTokens;
    acc.outputTokens += provider.outputTokens;
    acc.cachedInputTokens += provider.cachedInputTokens;
    acc.totalTokens += provider.totalTokens;
    acc.requestCount += provider.requestCount;
    acc.estimatedCostUsd = roundUsd(acc.estimatedCostUsd + provider.estimatedCostUsd);
    return acc;
  }, {
    inputTokens: 0,
    outputTokens: 0,
    cachedInputTokens: 0,
    totalTokens: 0,
    requestCount: 0,
    estimatedCostUsd: 0,
  });

  return {
    periodStart: params.periodStart,
    periodEnd: params.periodEnd,
    totals,
    providers,
  };
}

export function roundUsd(value: number): number {
  return Math.round(value * 10_000) / 10_000;
}

function roundPercent(value: number): number {
  return Math.round(value * 10) / 10;
}

function clampPercent(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, Math.round(value * 10) / 10));
}
