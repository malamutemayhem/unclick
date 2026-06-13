export const LOCAL_ROUTING_SETTINGS_KEY = "seats.local.routing_config.v1";
export const LOCAL_ROUTING_STORAGE_KEY = "unclick_seats_local_routing_config_v1";

export type LocalEndpointKind = "ollama" | "openai-compatible" | "custom";
export type LocalRouteTarget = "local" | "api" | "auto";
export type LocalFallbackMode = "api" | "queue" | "block";

export interface LocalRoutingRule {
  id: "embeddings" | "simple_chat" | "complex_reasoning" | "vision" | "ocr";
  label: string;
  detail: string;
  route: LocalRouteTarget;
  fallback: LocalFallbackMode;
  modelHint: string;
  retryMinutes: number;
  notify: boolean;
}

export interface LocalRoutingConfig {
  endpoint: string;
  endpointKind: LocalEndpointKind;
  healthCheck: boolean;
  pingIntervalSeconds: number;
  rules: LocalRoutingRule[];
  updatedAt: string | null;
}

export const FALLBACK_OPTIONS: Array<{
  value: LocalFallbackMode;
  label: string;
  description: string;
}> = [
  { value: "api", label: "Route to API", description: "Use the API tier when local compute is unavailable." },
  { value: "queue", label: "Queue and retry", description: "Hold the work until the local endpoint returns." },
  { value: "block", label: "Block and notify", description: "Stop the task and alert the user." },
];

export const ROUTE_OPTIONS: Array<{
  value: LocalRouteTarget;
  label: string;
  description: string;
}> = [
  { value: "local", label: "Local", description: "Prefer the local endpoint." },
  { value: "auto", label: "Auto", description: "Use local when capable, then escalate." },
  { value: "api", label: "API", description: "Send the task to the API tier." },
];

export const DEFAULT_LOCAL_ROUTING_CONFIG: LocalRoutingConfig = {
  endpoint: "http://localhost:11434",
  endpointKind: "ollama",
  healthCheck: true,
  pingIntervalSeconds: 30,
  updatedAt: null,
  rules: [
    {
      id: "embeddings",
      label: "Embeddings",
      detail: "Vector search, ContextPass indexing, memory retrieval.",
      route: "local",
      fallback: "api",
      modelHint: "nomic-embed-text or bge-m3",
      retryMinutes: 5,
      notify: true,
    },
    {
      id: "simple_chat",
      label: "Simple chat",
      detail: "Short answers, drafts, summaries, low-risk support.",
      route: "local",
      fallback: "queue",
      modelHint: "llama3.2:8b or qwen2.5:7b",
      retryMinutes: 10,
      notify: false,
    },
    {
      id: "complex_reasoning",
      label: "Complex reasoning",
      detail: "Multi-step decisions, architecture, legal, finance, safety.",
      route: "api",
      fallback: "block",
      modelHint: "frontier API model",
      retryMinutes: 15,
      notify: true,
    },
    {
      id: "vision",
      label: "Vision",
      detail: "Image understanding and visual verification.",
      route: "auto",
      fallback: "api",
      modelHint: "local vision model if GPU supports it",
      retryMinutes: 10,
      notify: true,
    },
    {
      id: "ocr",
      label: "OCR",
      detail: "Document extraction, screenshot reading, form parsing.",
      route: "auto",
      fallback: "api",
      modelHint: "PaddleOCR-VL or dots.ocr locally",
      retryMinutes: 10,
      notify: true,
    },
  ],
};

function normalizeEndpointKind(value: unknown): LocalEndpointKind {
  if (value === "ollama" || value === "openai-compatible" || value === "custom") return value;
  return "ollama";
}

function normalizeRoute(value: unknown, fallback: LocalRouteTarget): LocalRouteTarget {
  if (value === "local" || value === "api" || value === "auto") return value;
  return fallback;
}

function normalizeFallback(value: unknown, fallback: LocalFallbackMode): LocalFallbackMode {
  if (value === "api" || value === "queue" || value === "block") return value;
  return fallback;
}

function normalizeRule(value: unknown, defaultRule: LocalRoutingRule): LocalRoutingRule {
  const candidate = value && typeof value === "object" ? value as Partial<LocalRoutingRule> : {};
  return {
    ...defaultRule,
    route: normalizeRoute(candidate.route, defaultRule.route),
    fallback: normalizeFallback(candidate.fallback, defaultRule.fallback),
    modelHint: typeof candidate.modelHint === "string" && candidate.modelHint.trim()
      ? candidate.modelHint.trim()
      : defaultRule.modelHint,
    retryMinutes: Number.isFinite(candidate.retryMinutes)
      ? Math.min(120, Math.max(1, Number(candidate.retryMinutes)))
      : defaultRule.retryMinutes,
    notify: typeof candidate.notify === "boolean" ? candidate.notify : defaultRule.notify,
  };
}

export function normalizeLocalRoutingConfig(value: unknown): LocalRoutingConfig {
  const candidate = value && typeof value === "object" ? value as Partial<LocalRoutingConfig> : {};
  const candidateRules = Array.isArray(candidate.rules) ? candidate.rules : [];
  return {
    endpoint: typeof candidate.endpoint === "string" && candidate.endpoint.trim()
      ? candidate.endpoint.trim()
      : DEFAULT_LOCAL_ROUTING_CONFIG.endpoint,
    endpointKind: normalizeEndpointKind(candidate.endpointKind),
    healthCheck: typeof candidate.healthCheck === "boolean"
      ? candidate.healthCheck
      : DEFAULT_LOCAL_ROUTING_CONFIG.healthCheck,
    pingIntervalSeconds: Number.isFinite(candidate.pingIntervalSeconds)
      ? Math.min(300, Math.max(10, Number(candidate.pingIntervalSeconds)))
      : DEFAULT_LOCAL_ROUTING_CONFIG.pingIntervalSeconds,
    updatedAt: typeof candidate.updatedAt === "string" ? candidate.updatedAt : null,
    rules: DEFAULT_LOCAL_ROUTING_CONFIG.rules.map((defaultRule) =>
      normalizeRule(candidateRules.find((rule: Partial<LocalRoutingRule>) => rule?.id === defaultRule.id), defaultRule),
    ),
  };
}

export function buildLocalHealthUrl(endpoint: string, endpointKind: LocalEndpointKind): string {
  const base = endpoint.trim().replace(/\/+$/, "");
  if (!base) return DEFAULT_LOCAL_ROUTING_CONFIG.endpoint + "/api/tags";
  if (endpointKind === "ollama") return `${base}/api/tags`;
  if (endpointKind === "openai-compatible") {
    return base.endsWith("/v1") ? `${base}/models` : `${base}/v1/models`;
  }
  return base;
}

export function buildLocalRoutingSummary(config: LocalRoutingConfig): {
  local: number;
  api: number;
  auto: number;
  apiFallbacks: number;
  queuedFallbacks: number;
  blockedFallbacks: number;
} {
  return config.rules.reduce(
    (summary, rule) => {
      summary[rule.route] += 1;
      if (rule.fallback === "api") summary.apiFallbacks += 1;
      if (rule.fallback === "queue") summary.queuedFallbacks += 1;
      if (rule.fallback === "block") summary.blockedFallbacks += 1;
      return summary;
    },
    { local: 0, api: 0, auto: 0, apiFallbacks: 0, queuedFallbacks: 0, blockedFallbacks: 0 },
  );
}

export function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms < 0) return "0s";
  const totalSeconds = Math.floor(ms / 1000);
  if (totalSeconds < 60) return `${totalSeconds}s`;
  const totalMinutes = Math.floor(totalSeconds / 60);
  if (totalMinutes < 60) return `${totalMinutes}m`;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours < 24) return minutes ? `${hours}h ${minutes}m` : `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function readLocalConfigFromStorage(): LocalRoutingConfig {
  if (typeof window === "undefined") return DEFAULT_LOCAL_ROUTING_CONFIG;
  try {
    const raw = window.localStorage.getItem(LOCAL_ROUTING_STORAGE_KEY);
    return raw ? normalizeLocalRoutingConfig(JSON.parse(raw)) : DEFAULT_LOCAL_ROUTING_CONFIG;
  } catch {
    return DEFAULT_LOCAL_ROUTING_CONFIG;
  }
}

export function writeLocalConfigToStorage(config: LocalRoutingConfig) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LOCAL_ROUTING_STORAGE_KEY, JSON.stringify(config));
  } catch {
    /* ignore */
  }
}
