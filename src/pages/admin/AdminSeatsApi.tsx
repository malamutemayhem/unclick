import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  KeyRound,
  Loader2,
  Save,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  Trash2,
  Plus,
  Zap,
  ArrowRightLeft,
  Layers,
} from "lucide-react";

const API_KEY_STORAGE = "unclick_api_key";

function getApiKey(): string {
  try {
    return localStorage.getItem(API_KEY_STORAGE) ?? "";
  } catch {
    return "";
  }
}

type TaskType = "chat" | "code" | "embeddings" | "vision" | "ocr";

const TASK_TYPES: { id: TaskType; label: string; description: string }[] = [
  { id: "chat", label: "Chat", description: "General conversation and reasoning" },
  { id: "code", label: "Code", description: "Code generation, review, and debugging" },
  { id: "embeddings", label: "Embeddings", description: "Text embeddings for search and RAG" },
  { id: "vision", label: "Vision", description: "Image understanding and analysis" },
  { id: "ocr", label: "OCR", description: "Document text extraction" },
];

interface ModelDef {
  id: string;
  provider: string;
  label: string;
  capabilities: TaskType[];
  batchEligible: boolean;
  tier: "frontier" | "mid" | "fast" | "embed";
}

const MODEL_CATALOG: ModelDef[] = [
  { id: "anthropic:claude-opus-4", provider: "Anthropic", label: "Claude Opus 4", capabilities: ["chat", "code", "vision"], batchEligible: true, tier: "frontier" },
  { id: "anthropic:claude-sonnet-4", provider: "Anthropic", label: "Claude Sonnet 4", capabilities: ["chat", "code", "vision"], batchEligible: true, tier: "mid" },
  { id: "anthropic:claude-haiku-4", provider: "Anthropic", label: "Claude Haiku 4", capabilities: ["chat", "code"], batchEligible: true, tier: "fast" },
  { id: "openai:gpt-4o", provider: "OpenAI", label: "GPT-4o", capabilities: ["chat", "code", "vision", "ocr"], batchEligible: true, tier: "frontier" },
  { id: "openai:gpt-4o-mini", provider: "OpenAI", label: "GPT-4o Mini", capabilities: ["chat", "code", "vision"], batchEligible: true, tier: "fast" },
  { id: "openai:o3", provider: "OpenAI", label: "o3", capabilities: ["chat", "code"], batchEligible: false, tier: "frontier" },
  { id: "openai:text-embedding-3-large", provider: "OpenAI", label: "text-embedding-3-large", capabilities: ["embeddings"], batchEligible: true, tier: "embed" },
  { id: "openai:text-embedding-3-small", provider: "OpenAI", label: "text-embedding-3-small", capabilities: ["embeddings"], batchEligible: true, tier: "embed" },
  { id: "google:gemini-2.5-pro", provider: "Google", label: "Gemini 2.5 Pro", capabilities: ["chat", "code", "vision", "ocr"], batchEligible: false, tier: "frontier" },
  { id: "google:gemini-2.5-flash", provider: "Google", label: "Gemini 2.5 Flash", capabilities: ["chat", "code", "vision"], batchEligible: false, tier: "fast" },
  { id: "cohere:command-r-plus", provider: "Cohere", label: "Command R+", capabilities: ["chat", "code"], batchEligible: false, tier: "mid" },
  { id: "cohere:embed-english-v3", provider: "Cohere", label: "Embed English v3", capabilities: ["embeddings"], batchEligible: false, tier: "embed" },
  { id: "mistral:mistral-large", provider: "Mistral", label: "Mistral Large", capabilities: ["chat", "code", "vision"], batchEligible: false, tier: "mid" },
  { id: "mistral:codestral", provider: "Mistral", label: "Codestral", capabilities: ["code"], batchEligible: false, tier: "mid" },
];

type BatchMode = "off" | "non-urgent" | "all-background";

interface RoutingConfig {
  taskDefaults: Record<TaskType, string>;
  escalationChain: string[];
  batchEnabled: boolean;
  batchMode: BatchMode;
}

const EMPTY_CONFIG: RoutingConfig = {
  taskDefaults: {
    chat: "",
    code: "",
    embeddings: "",
    vision: "",
    ocr: "",
  },
  escalationChain: [],
  batchEnabled: false,
  batchMode: "non-urgent",
};

const SETTINGS_KEY = "compute_routing";

function modelsForTask(task: TaskType): ModelDef[] {
  return MODEL_CATALOG.filter((m) => m.capabilities.includes(task));
}

function modelLabel(id: string): string {
  return MODEL_CATALOG.find((m) => m.id === id)?.label ?? id;
}

function modelProvider(id: string): string {
  return MODEL_CATALOG.find((m) => m.id === id)?.provider ?? "";
}

function tierBadgeClass(tier: ModelDef["tier"]): string {
  switch (tier) {
    case "frontier": return "bg-amber-500/15 text-amber-400 border-amber-500/25";
    case "mid": return "bg-blue-500/15 text-blue-400 border-blue-500/25";
    case "fast": return "bg-green-500/15 text-green-400 border-green-500/25";
    case "embed": return "bg-purple-500/15 text-purple-400 border-purple-500/25";
  }
}

export default function AdminSeatsApi() {
  const { toast } = useToast();
  const { session } = useSession();
  const [apiKey] = useState<string>(getApiKey);
  const [config, setConfig] = useState<RoutingConfig>(EMPTY_CONFIG);
  const [savedConfig, setSavedConfig] = useState<RoutingConfig>(EMPTY_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const hasUnsavedChanges = JSON.stringify(config) !== JSON.stringify(savedConfig);

  const effectiveToken = apiKey || session?.access_token || "";

  const loadConfig = useCallback(async () => {
    if (!effectiveToken) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/memory-admin?action=tenant_settings_get", {
        headers: { Authorization: `Bearer ${effectiveToken}` },
      });
      if (res.ok) {
        const body = (await res.json()) as { data?: Record<string, unknown> };
        const stored = body.data?.[SETTINGS_KEY];
        if (stored && typeof stored === "object") {
          const parsed = stored as Partial<RoutingConfig>;
          const merged: RoutingConfig = {
            taskDefaults: { ...EMPTY_CONFIG.taskDefaults, ...parsed.taskDefaults },
            escalationChain: Array.isArray(parsed.escalationChain) ? parsed.escalationChain : [],
            batchEnabled: Boolean(parsed.batchEnabled),
            batchMode: (parsed.batchMode as BatchMode) || "non-urgent",
          };
          setConfig(merged);
          setSavedConfig(merged);
        }
      }
    } catch {
      toast({ title: "Failed to load routing config", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [effectiveToken, toast]);

  useEffect(() => {
    void loadConfig();
  }, [loadConfig]);

  const saveConfig = async () => {
    if (!effectiveToken) {
      toast({ title: "API key required", description: "Add your UnClick API key on the You page first.", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/memory-admin?action=tenant_settings_set", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${effectiveToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: SETTINGS_KEY, value: config }),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error ?? "Save failed");
      }
      setSavedConfig(config);
      toast({ title: "Routing config saved" });
    } catch (err) {
      toast({ title: "Save failed", description: (err as Error).message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const resetConfig = () => {
    setConfig(savedConfig);
  };

  const setTaskDefault = (task: TaskType, modelId: string) => {
    setConfig((prev) => ({
      ...prev,
      taskDefaults: { ...prev.taskDefaults, [task]: modelId },
    }));
  };

  const addEscalationStep = (modelId: string) => {
    if (!modelId || config.escalationChain.includes(modelId)) return;
    setConfig((prev) => ({
      ...prev,
      escalationChain: [...prev.escalationChain, modelId],
    }));
  };

  const removeEscalationStep = (index: number) => {
    setConfig((prev) => ({
      ...prev,
      escalationChain: prev.escalationChain.filter((_, i) => i !== index),
    }));
  };

  const moveEscalationStep = (index: number, direction: "up" | "down") => {
    setConfig((prev) => {
      const chain = [...prev.escalationChain];
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= chain.length) return prev;
      [chain[index], chain[target]] = [chain[target], chain[index]];
      return { ...prev, escalationChain: chain };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const chatCodeModels = MODEL_CATALOG.filter(
    (m) => (m.capabilities.includes("chat") || m.capabilities.includes("code")) && !config.escalationChain.includes(m.id),
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
            <KeyRound className="h-3.5 w-3.5" />
            Seats / API
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-heading">Smart Routing</h1>
          <p className="mt-1 max-w-2xl text-sm text-body">
            Configure how tasks are routed to AI models. Set defaults per task type, build escalation chains, and enable batch pricing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasUnsavedChanges && (
            <Button variant="outline" size="sm" onClick={resetConfig} className="gap-1.5">
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </Button>
          )}
          <Button
            size="sm"
            onClick={saveConfig}
            disabled={saving || !hasUnsavedChanges}
            className="gap-1.5"
          >
            {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      {/* Task Defaults */}
      <section className="space-y-4 rounded-lg border border-border/30 bg-card/10 p-4">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-heading">Default Model per Task Type</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Choose which model handles each category of work by default. Tasks without a default use the first model in your escalation chain.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TASK_TYPES.map(({ id, label, description }) => {
            const available = modelsForTask(id);
            return (
              <div key={id} className="rounded-md border border-border/30 bg-background/30 p-3">
                <label className="text-xs font-semibold text-heading" htmlFor={`task-${id}`}>
                  {label}
                </label>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
                <select
                  id={`task-${id}`}
                  value={config.taskDefaults[id]}
                  onChange={(e) => setTaskDefault(id, e.target.value)}
                  className="mt-2 block w-full rounded-md border border-border/40 bg-background px-3 py-2 text-sm text-body outline-none focus:border-primary/50"
                >
                  <option value="">No default</option>
                  {available.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.label} ({m.provider})
                    </option>
                  ))}
                </select>
              </div>
            );
          })}
        </div>
      </section>

      {/* Escalation Chain */}
      <section className="space-y-4 rounded-lg border border-border/30 bg-card/10 p-4">
        <div className="flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-heading">Escalation Chain</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          When a task exceeds the current model's capability (too complex, too long, or fails), it escalates to the next model in the chain. Order from cheapest/fastest to most capable.
        </p>

        {config.escalationChain.length === 0 ? (
          <div className="rounded-md border border-dashed border-border/40 bg-background/20 p-4 text-center">
            <p className="text-xs text-muted-foreground">
              No escalation chain configured. Add models below to build one.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {config.escalationChain.map((modelId, index) => {
              const model = MODEL_CATALOG.find((m) => m.id === modelId);
              return (
                <div
                  key={modelId}
                  className="flex items-center gap-2 rounded-md border border-border/30 bg-background/30 px-3 py-2"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-bold text-primary">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-heading">{model?.label ?? modelId}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{modelProvider(modelId)}</span>
                  </div>
                  {model && (
                    <span className={`rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${tierBadgeClass(model.tier)}`}>
                      {model.tier}
                    </span>
                  )}
                  {model?.batchEligible && (
                    <span className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-1.5 py-0.5 text-[10px] font-semibold text-cyan-400">
                      batch
                    </span>
                  )}
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      onClick={() => moveEscalationStep(index, "up")}
                      disabled={index === 0}
                      className="rounded p-1 text-muted-foreground transition-colors hover:bg-card/40 hover:text-body disabled:opacity-30"
                      title="Move up"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveEscalationStep(index, "down")}
                      disabled={index === config.escalationChain.length - 1}
                      className="rounded p-1 text-muted-foreground transition-colors hover:bg-card/40 hover:text-body disabled:opacity-30"
                      title="Move down"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeEscalationStep(index)}
                      className="rounded p-1 text-muted-foreground transition-colors hover:bg-red-500/20 hover:text-red-400"
                      title="Remove"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {chatCodeModels.length > 0 && (
          <div className="flex items-center gap-2">
            <select
              id="add-escalation"
              defaultValue=""
              onChange={(e) => {
                addEscalationStep(e.target.value);
                e.target.value = "";
              }}
              className="flex-1 rounded-md border border-border/40 bg-background px-3 py-2 text-sm text-body outline-none focus:border-primary/50"
            >
              <option value="" disabled>
                Add model to chain...
              </option>
              {chatCodeModels.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} ({m.provider}) - {m.tier}
                </option>
              ))}
            </select>
            <Plus className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        )}

        {config.escalationChain.length >= 2 && (
          <div className="rounded-md border border-border/20 bg-primary/5 px-3 py-2">
            <p className="text-xs text-body">
              <strong className="text-heading">Flow:</strong>{" "}
              {config.escalationChain.map((id) => modelLabel(id)).join(" → ")}
            </p>
          </div>
        )}
      </section>

      {/* Batch API */}
      <section className="space-y-4 rounded-lg border border-border/30 bg-card/10 p-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-semibold text-heading">Batch API</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Batch APIs process requests asynchronously at reduced cost. Anthropic offers 50% off for batch requests. Enable this to automatically route eligible non-urgent tasks through batch endpoints.
        </p>

        <div className="flex items-center justify-between rounded-md border border-border/30 bg-background/30 p-3">
          <div>
            <p className="text-sm font-medium text-heading">Enable batch routing</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Route eligible tasks through batch APIs for up to 50% cost savings
            </p>
          </div>
          <Switch
            checked={config.batchEnabled}
            onCheckedChange={(checked) =>
              setConfig((prev) => ({ ...prev, batchEnabled: checked }))
            }
          />
        </div>

        {config.batchEnabled && (
          <div className="space-y-3">
            <label className="text-xs font-semibold text-heading" htmlFor="batch-mode">
              Batch scope
            </label>
            <select
              id="batch-mode"
              value={config.batchMode}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, batchMode: e.target.value as BatchMode }))
              }
              className="block w-full rounded-md border border-border/40 bg-background px-3 py-2 text-sm text-body outline-none focus:border-primary/50"
            >
              <option value="non-urgent">Non-urgent tasks only (recommended)</option>
              <option value="all-background">All background/automated tasks</option>
            </select>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-md border border-border/30 bg-background/20 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Eligible models</p>
                <p className="mt-1 text-sm font-semibold text-heading">
                  {MODEL_CATALOG.filter((m) => m.batchEligible).length}
                </p>
              </div>
              <div className="rounded-md border border-border/30 bg-background/20 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Max savings</p>
                <p className="mt-1 text-sm font-semibold text-heading">50%</p>
              </div>
              <div className="rounded-md border border-border/30 bg-background/20 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Latency</p>
                <p className="mt-1 text-sm font-semibold text-heading">Up to 24h</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Model catalog reference */}
      <section className="space-y-3 rounded-md border border-border/20 bg-card/5 p-3">
        <h3 className="text-xs font-semibold text-heading">Model Reference</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border/20">
                <th className="pb-2 pr-4 text-left font-semibold text-muted-foreground">Model</th>
                <th className="pb-2 pr-4 text-left font-semibold text-muted-foreground">Provider</th>
                <th className="pb-2 pr-4 text-left font-semibold text-muted-foreground">Tier</th>
                <th className="pb-2 pr-4 text-left font-semibold text-muted-foreground">Tasks</th>
                <th className="pb-2 text-left font-semibold text-muted-foreground">Batch</th>
              </tr>
            </thead>
            <tbody>
              {MODEL_CATALOG.map((m) => (
                <tr key={m.id} className="border-b border-border/10">
                  <td className="py-1.5 pr-4 font-medium text-body">{m.label}</td>
                  <td className="py-1.5 pr-4 text-muted-foreground">{m.provider}</td>
                  <td className="py-1.5 pr-4">
                    <span className={`rounded-full border px-1.5 py-0.5 text-[10px] font-semibold ${tierBadgeClass(m.tier)}`}>
                      {m.tier}
                    </span>
                  </td>
                  <td className="py-1.5 pr-4 text-muted-foreground">{m.capabilities.join(", ")}</td>
                  <td className="py-1.5 text-muted-foreground">{m.batchEligible ? "Yes" : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
