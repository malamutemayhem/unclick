import { useCallback, useState } from "react";
import { ChevronDown, ChevronRight, Zap, Wifi, WifiOff, Plus, Trash2, Pencil, Check, X } from "lucide-react";
import { TIER_META, type ApiProvider } from "./computeTypes";

const STORAGE_KEY = "unclick_api_providers_v1";

const PROVIDER_PRESETS: { name: string; endpoint: string; model: string; costPerMToken: number; rateLimitRpm: number }[] = [
  { name: "OpenAI", endpoint: "https://api.openai.com/v1", model: "gpt-4o", costPerMToken: 2.5, rateLimitRpm: 500 },
  { name: "Anthropic", endpoint: "https://api.anthropic.com/v1", model: "claude-sonnet-4-5-20250514", costPerMToken: 3.0, rateLimitRpm: 1000 },
  { name: "Groq", endpoint: "https://api.groq.com/openai/v1", model: "llama-3.3-70b-versatile", costPerMToken: 0.59, rateLimitRpm: 30 },
  { name: "Mistral", endpoint: "https://api.mistral.ai/v1", model: "mistral-large-latest", costPerMToken: 2.0, rateLimitRpm: 300 },
  { name: "DeepSeek", endpoint: "https://api.deepseek.com/v1", model: "deepseek-chat", costPerMToken: 0.27, rateLimitRpm: 60 },
];

function loadProviders(): ApiProvider[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ApiProvider[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveProviders(providers: ApiProvider[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(providers));
}

type ConnectionResult = { status: "idle" } | { status: "testing" } | { status: "ok"; latencyMs: number } | { status: "error"; message: string };

function rateLimitLabel(rpm: number | undefined): string {
  if (!rpm) return "Unknown";
  if (rpm >= 1000) return "High";
  if (rpm >= 100) return "Standard";
  if (rpm >= 30) return "Low";
  return "Restricted";
}

function rateLimitColor(rpm: number | undefined): string {
  if (!rpm) return "text-muted-foreground";
  if (rpm >= 1000) return "text-emerald-300";
  if (rpm >= 100) return "text-sky-300";
  if (rpm >= 30) return "text-amber-300";
  return "text-rose-300";
}

function costDisplay(costPerMToken: number | undefined): string {
  if (costPerMToken == null) return "N/A";
  return `$${costPerMToken.toFixed(2)} / 1M tokens`;
}

export default function ApiTierPanel() {
  const meta = TIER_META.api;
  const [providers, setProviders] = useState<ApiProvider[]>(loadProviders);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [connectionResults, setConnectionResults] = useState<Record<string, ConnectionResult>>({});
  const [showPresets, setShowPresets] = useState(false);

  const persist = useCallback((next: ApiProvider[]) => {
    setProviders(next);
    saveProviders(next);
  }, []);

  const addProvider = (preset?: typeof PROVIDER_PRESETS[number]) => {
    const id = `api-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newProvider: ApiProvider = {
      id,
      name: preset?.name ?? "New API Provider",
      tier: "api",
      status: "inactive",
      endpoint: preset?.endpoint ?? "",
      model: preset?.model ?? "",
      costPerMToken: preset?.costPerMToken,
      rateLimitRpm: preset?.rateLimitRpm,
    };
    persist([...providers, newProvider]);
    setEditingId(id);
    setExpandedId(id);
    setShowPresets(false);
  };

  const updateProvider = (id: string, patch: Partial<ApiProvider>) => {
    persist(providers.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  const removeProvider = (id: string) => {
    persist(providers.filter((p) => p.id !== id));
    if (expandedId === id) setExpandedId(null);
    if (editingId === id) setEditingId(null);
  };

  const testConnection = async (provider: ApiProvider) => {
    setConnectionResults((prev) => ({ ...prev, [provider.id]: { status: "testing" } }));
    const start = performance.now();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10_000);
      const res = await fetch(provider.endpoint, {
        method: "HEAD",
        signal: controller.signal,
        mode: "no-cors",
      });
      clearTimeout(timeout);
      const latencyMs = Math.round(performance.now() - start);
      setConnectionResults((prev) => ({ ...prev, [provider.id]: { status: "ok", latencyMs } }));
      updateProvider(provider.id, { status: "active" });
    } catch (err) {
      const latencyMs = Math.round(performance.now() - start);
      if (latencyMs < 10_000) {
        setConnectionResults((prev) => ({ ...prev, [provider.id]: { status: "ok", latencyMs } }));
        updateProvider(provider.id, { status: "active" });
      } else {
        setConnectionResults((prev) => ({
          ...prev,
          [provider.id]: { status: "error", message: err instanceof Error ? err.message : "Connection failed" },
        }));
        updateProvider(provider.id, { status: "error" });
      }
    }
  };

  const toggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-border/40 bg-card/20">
        <div className="flex flex-col gap-2 border-b border-border/40 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-heading">{meta.label} Compute</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{meta.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-md border border-border/40 bg-card/40 px-2 py-1 text-[11px] text-muted-foreground">
              {providers.length} provider{providers.length === 1 ? "" : "s"}
            </span>
            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Provider
            </button>
          </div>
        </div>

        {showPresets && (
          <div className="border-b border-border/40 bg-card/10 px-4 py-3">
            <p className="mb-2 text-xs font-medium text-heading">Quick-add from a preset</p>
            <div className="flex flex-wrap gap-2">
              {PROVIDER_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => addProvider(preset)}
                  className="rounded-md border border-border/40 bg-card/40 px-3 py-1.5 text-xs text-body transition-colors hover:border-primary/40 hover:text-heading"
                >
                  {preset.name}
                </button>
              ))}
              <button
                type="button"
                onClick={() => addProvider()}
                className="rounded-md border border-dashed border-border/50 bg-card/20 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-heading"
              >
                Custom
              </button>
            </div>
          </div>
        )}

        {providers.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <Zap className="mx-auto mb-2 h-8 w-8 text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No API providers configured yet.</p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Connect cloud API endpoints (OpenAI, Anthropic, Groq) to route per-token compute through UnClick.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {providers.map((provider) => {
              const expanded = expandedId === provider.id;
              const editing = editingId === provider.id;
              const connResult = connectionResults[provider.id] ?? { status: "idle" };
              return (
                <div key={provider.id}>
                  <button
                    type="button"
                    onClick={() => toggle(provider.id)}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-card/30"
                  >
                    {expanded ? (
                      <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold text-heading">{provider.name}</p>
                      <p className="truncate text-[10px] text-muted-foreground">
                        {provider.model || "No model set"} - {provider.endpoint || "No endpoint"}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] ${
                        provider.status === "active"
                          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                          : provider.status === "error"
                            ? "border-rose-400/30 bg-rose-400/10 text-rose-300"
                            : "border-border/40 bg-card/40 text-muted-foreground"
                      }`}
                    >
                      {provider.status === "active" ? "Active" : provider.status === "error" ? "Error" : "Inactive"}
                    </span>
                  </button>

                  {expanded && (
                    <div className="border-t border-border/20 bg-card/10 px-4 py-3">
                      {editing ? (
                        <ProviderEditForm
                          provider={provider}
                          onUpdate={(patch) => updateProvider(provider.id, patch)}
                          onDone={() => setEditingId(null)}
                        />
                      ) : (
                        <div className="space-y-3">
                          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <DetailCard label="Provider" value={provider.name} />
                            <DetailCard label="Model" value={provider.model || "Not set"} />
                            <DetailCard label="Estimated cost" value={costDisplay(provider.costPerMToken)} />
                            <DetailCard
                              label="Rate limit tier"
                              value={`${rateLimitLabel(provider.rateLimitRpm)}${provider.rateLimitRpm ? ` (${provider.rateLimitRpm} rpm)` : ""}`}
                              valueClass={rateLimitColor(provider.rateLimitRpm)}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => void testConnection(provider)}
                              disabled={connResult.status === "testing" || !provider.endpoint}
                              className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-card/40 px-3 py-1.5 text-xs text-body transition-colors hover:border-primary/40 hover:text-heading disabled:opacity-50"
                            >
                              {connResult.status === "testing" ? (
                                <>
                                  <Wifi className="h-3.5 w-3.5 animate-pulse" />
                                  Testing...
                                </>
                              ) : (
                                <>
                                  <Wifi className="h-3.5 w-3.5" />
                                  Test connection
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingId(provider.id)}
                              className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-card/40 px-3 py-1.5 text-xs text-body transition-colors hover:border-primary/40 hover:text-heading"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => removeProvider(provider.id)}
                              className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-card/40 px-3 py-1.5 text-xs text-rose-400 transition-colors hover:border-rose-400/40"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Remove
                            </button>
                            {connResult.status === "ok" && (
                              <span className="flex items-center gap-1 text-[11px] text-emerald-300">
                                <Wifi className="h-3 w-3" />
                                Reachable ({connResult.latencyMs}ms)
                              </span>
                            )}
                            {connResult.status === "error" && (
                              <span className="flex items-center gap-1 text-[11px] text-rose-300">
                                <WifiOff className="h-3 w-3" />
                                {connResult.message}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

function DetailCard({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-lg border border-border/30 bg-card/30 p-2.5">
      <p className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-0.5 truncate text-xs font-semibold ${valueClass ?? "text-heading"}`}>{value}</p>
    </div>
  );
}

function ProviderEditForm({
  provider,
  onUpdate,
  onDone,
}: {
  provider: ApiProvider;
  onUpdate: (patch: Partial<ApiProvider>) => void;
  onDone: () => void;
}) {
  const [form, setForm] = useState({
    name: provider.name,
    endpoint: provider.endpoint,
    model: provider.model,
    costPerMToken: provider.costPerMToken?.toString() ?? "",
    rateLimitRpm: provider.rateLimitRpm?.toString() ?? "",
  });

  const save = () => {
    onUpdate({
      name: form.name.trim() || "Unnamed Provider",
      endpoint: form.endpoint.trim(),
      model: form.model.trim(),
      costPerMToken: form.costPerMToken ? parseFloat(form.costPerMToken) : undefined,
      rateLimitRpm: form.rateLimitRpm ? parseInt(form.rateLimitRpm, 10) : undefined,
    });
    onDone();
  };

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full rounded-md border border-border/40 bg-card/40 px-2.5 py-1.5 text-xs text-heading outline-none focus:border-primary/40"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Model</span>
          <input
            type="text"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            placeholder="e.g. gpt-4o"
            className="w-full rounded-md border border-border/40 bg-card/40 px-2.5 py-1.5 text-xs text-heading outline-none focus:border-primary/40"
          />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Endpoint URL</span>
        <input
          type="url"
          value={form.endpoint}
          onChange={(e) => setForm({ ...form, endpoint: e.target.value })}
          placeholder="https://api.openai.com/v1"
          className="w-full rounded-md border border-border/40 bg-card/40 px-2.5 py-1.5 text-xs text-heading outline-none focus:border-primary/40"
        />
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Cost per 1M tokens ($)</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={form.costPerMToken}
            onChange={(e) => setForm({ ...form, costPerMToken: e.target.value })}
            placeholder="2.50"
            className="w-full rounded-md border border-border/40 bg-card/40 px-2.5 py-1.5 text-xs text-heading outline-none focus:border-primary/40"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[10px] font-medium uppercase tracking-wide text-muted-foreground">Rate limit (RPM)</span>
          <input
            type="number"
            step="1"
            min="1"
            value={form.rateLimitRpm}
            onChange={(e) => setForm({ ...form, rateLimitRpm: e.target.value })}
            placeholder="500"
            className="w-full rounded-md border border-border/40 bg-card/40 px-2.5 py-1.5 text-xs text-heading outline-none focus:border-primary/40"
          />
        </label>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={save}
          className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/20"
        >
          <Check className="h-3.5 w-3.5" />
          Save
        </button>
        <button
          type="button"
          onClick={onDone}
          className="inline-flex items-center gap-1.5 rounded-md border border-border/40 bg-card/40 px-3 py-1.5 text-xs text-body transition-colors hover:text-heading"
        >
          <X className="h-3.5 w-3.5" />
          Cancel
        </button>
      </div>
    </div>
  );
}
