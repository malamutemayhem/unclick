import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Bell,
  CheckCircle2,
  Clock,
  Cloud,
  Cpu,
  HardDrive,
  ListRestart,
  Loader2,
  RefreshCw,
  Route,
  Save,
  ServerOff,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/lib/auth";
import {
  buildLocalHealthUrl,
  buildLocalRoutingSummary,
  DEFAULT_LOCAL_ROUTING_CONFIG,
  FALLBACK_OPTIONS,
  formatDuration,
  LOCAL_ROUTING_SETTINGS_KEY,
  normalizeLocalRoutingConfig,
  readLocalConfigFromStorage,
  ROUTE_OPTIONS,
  writeLocalConfigToStorage,
  type LocalFallbackMode,
  type LocalRouteTarget,
  type LocalRoutingConfig,
  type LocalRoutingRule,
} from "./AdminSeatsLocalRouting";

type SaveState = "idle" | "loading" | "saving" | "saved" | "local" | "error";
type HealthStatus = "unknown" | "checking" | "online" | "offline";

interface LocalHealthState {
  status: HealthStatus;
  checkedAt: string | null;
  firstHealthyAt: string | null;
  lastHealthyAt: string | null;
  latencyMs: number | null;
  error: string | null;
}

function getStoredApiKey(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem("unclick_api_key") ?? "";
  } catch {
    return "";
  }
}

function getStatusLabel(health: LocalHealthState): string {
  if (health.status === "online") return "Online";
  if (health.status === "offline") return "Offline";
  if (health.status === "checking") return "Checking";
  return "Not checked";
}

function getStatusClass(status: HealthStatus): string {
  if (status === "online") return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  if (status === "offline") return "border-red-400/30 bg-red-400/10 text-red-200";
  if (status === "checking") return "border-primary/30 bg-primary/10 text-primary";
  return "border-border/40 bg-card/30 text-muted-foreground";
}

function SelectField<T extends string>({
  label,
  value,
  options,
  onChange,
  id,
}: {
  label: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
  id: string;
}) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor={id}>
      {label}
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="mt-1 block h-10 w-full rounded-md border border-border/40 bg-background px-3 text-sm normal-case tracking-normal text-body outline-none transition-colors focus:border-primary/50"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function SummaryTile({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Route;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-md border border-border/40 bg-card/20 p-3">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-2 text-xl font-semibold text-heading">{value}</p>
      <p className="mt-1 text-xs leading-5 text-body">{hint}</p>
    </div>
  );
}

function FallbackPill({ mode }: { mode: LocalFallbackMode }) {
  const option = FALLBACK_OPTIONS.find((item) => item.value === mode);
  const Icon = mode === "api" ? Cloud : mode === "queue" ? ListRestart : ServerOff;
  return (
    <span className="inline-flex w-fit items-center gap-1.5 rounded-md border border-border/40 bg-background/50 px-2 py-1 text-xs font-semibold text-body">
      <Icon className="h-3.5 w-3.5" />
      {option?.label ?? mode}
    </span>
  );
}

export default function AdminSeatsLocalPage() {
  const { session } = useSession();
  const { toast } = useToast();
  const [config, setConfig] = useState<LocalRoutingConfig>(() => readLocalConfigFromStorage());
  const [saveState, setSaveState] = useState<SaveState>("loading");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [health, setHealth] = useState<LocalHealthState>({
    status: "unknown",
    checkedAt: null,
    firstHealthyAt: null,
    lastHealthyAt: null,
    latencyMs: null,
    error: null,
  });

  const authToken = getStoredApiKey() || session?.access_token || "";
  const summary = useMemo(() => buildLocalRoutingSummary(config), [config]);
  const healthUrl = useMemo(
    () => buildLocalHealthUrl(config.endpoint, config.endpointKind),
    [config.endpoint, config.endpointKind],
  );
  const uptime = health.firstHealthyAt && health.status === "online"
    ? formatDuration(now - new Date(health.firstHealthyAt).getTime())
    : "0s";

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadSettings = async () => {
      const localConfig = readLocalConfigFromStorage();
      setConfig(localConfig);
      if (!authToken) {
        setSaveState("local");
        return;
      }
      try {
        const res = await fetch("/api/memory-admin?action=tenant_settings_get", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({})) as { error?: string };
          throw new Error(body.error ?? `Settings request failed (${res.status})`);
        }
        const body = await res.json() as { data?: Record<string, unknown> };
        const remoteConfig = body.data?.[LOCAL_ROUTING_SETTINGS_KEY];
        if (!cancelled && remoteConfig) {
          const normalized = normalizeLocalRoutingConfig(remoteConfig);
          setConfig(normalized);
          writeLocalConfigToStorage(normalized);
        }
        if (!cancelled) setSaveState("idle");
      } catch (error) {
        if (!cancelled) {
          setSaveError((error as Error).message);
          setSaveState("error");
        }
      }
    };
    void loadSettings();
    return () => {
      cancelled = true;
    };
  }, [authToken]);

  const updateRule = useCallback((ruleId: LocalRoutingRule["id"], patch: Partial<LocalRoutingRule>) => {
    setConfig((current) => ({
      ...current,
      rules: current.rules.map((rule) => rule.id === ruleId ? { ...rule, ...patch } : rule),
    }));
  }, []);

  const pingLocalEndpoint = useCallback(async () => {
    if (!config.healthCheck) return;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);
    const startedAt = Date.now();
    setHealth((current) => ({ ...current, status: "checking", error: null }));
    try {
      const res = await fetch(healthUrl, {
        method: "GET",
        mode: "cors",
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const checkedAt = new Date().toISOString();
      setHealth((current) => ({
        status: "online",
        checkedAt,
        firstHealthyAt: current.firstHealthyAt ?? checkedAt,
        lastHealthyAt: checkedAt,
        latencyMs: Date.now() - startedAt,
        error: null,
      }));
    } catch (error) {
      const checkedAt = new Date().toISOString();
      setHealth((current) => ({
        status: "offline",
        checkedAt,
        firstHealthyAt: null,
        lastHealthyAt: current.lastHealthyAt,
        latencyMs: null,
        error: (error as Error).name === "AbortError" ? "Timed out" : (error as Error).message,
      }));
    } finally {
      window.clearTimeout(timeout);
    }
  }, [config.healthCheck, healthUrl]);

  useEffect(() => {
    if (!config.healthCheck) return;
    void pingLocalEndpoint();
    const interval = window.setInterval(
      () => void pingLocalEndpoint(),
      config.pingIntervalSeconds * 1000,
    );
    return () => window.clearInterval(interval);
  }, [config.healthCheck, config.pingIntervalSeconds, pingLocalEndpoint]);

  const saveConfig = async () => {
    const nextConfig = { ...config, updatedAt: new Date().toISOString() };
    setConfig(nextConfig);
    writeLocalConfigToStorage(nextConfig);
    setSaveError(null);

    if (!authToken) {
      setSaveState("local");
      toast({
        title: "Saved locally",
        description: "Sign in with an API key or session to sync this routing config.",
      });
      return;
    }

    setSaveState("saving");
    try {
      const res = await fetch("/api/memory-admin?action=tenant_settings_set", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: LOCAL_ROUTING_SETTINGS_KEY, value: nextConfig }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(body.error ?? `Save failed (${res.status})`);
      }
      setSaveState("saved");
      toast({
        title: "Routing saved",
        description: "Local compute routing is synced to tenant settings.",
      });
    } catch (error) {
      setSaveState("error");
      setSaveError((error as Error).message);
      toast({
        title: "Could not save",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const resetToDefaults = () => {
    const next = normalizeLocalRoutingConfig(DEFAULT_LOCAL_ROUTING_CONFIG);
    setConfig(next);
    writeLocalConfigToStorage(next);
    setSaveState(authToken ? "idle" : "local");
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-primary/25 bg-primary/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
            <HardDrive className="h-3.5 w-3.5" />
            Seats
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-heading">Local Compute Routing</h1>
          <p className="mt-1 max-w-3xl text-sm text-body">
            Route embeddings, chat, reasoning, vision, and OCR across local models and the API tier.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={resetToDefaults}>
            <RefreshCw className="h-4 w-4" />
            Defaults
          </Button>
          <Button type="button" size="sm" onClick={saveConfig} disabled={saveState === "saving"}>
            {saveState === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save
          </Button>
        </div>
      </header>

      <section className="rounded-lg border border-border/40 bg-card/10 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-border/40 bg-background/50 px-2 py-1 text-xs font-semibold text-body">
              <Activity className="h-3.5 w-3.5" />
              Endpoint health
            </div>
            <h2 className="mt-3 text-lg font-semibold text-heading">Local runtime</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-body">
              {config.endpointKind === "ollama"
                ? "Ollama-compatible health checks use /api/tags."
                : config.endpointKind === "openai-compatible"
                  ? "OpenAI-compatible health checks use /v1/models."
                  : "Custom health checks use the exact endpoint URL."}
            </p>
          </div>
          <div className={`inline-flex w-fit items-center gap-2 rounded-md border px-3 py-2 text-sm font-semibold ${getStatusClass(health.status)}`}>
            {health.status === "checking" ? <Loader2 className="h-4 w-4 animate-spin" /> : health.status === "online" ? <CheckCircle2 className="h-4 w-4" /> : <ServerOff className="h-4 w-4" />}
            {getStatusLabel(health)}
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(180px,240px)_minmax(120px,170px)_auto] lg:items-end">
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="local-endpoint">
            Endpoint
            <input
              id="local-endpoint"
              value={config.endpoint}
              onChange={(event) => setConfig((current) => ({ ...current, endpoint: event.target.value }))}
              className="mt-1 block h-10 w-full rounded-md border border-border/40 bg-background px-3 text-sm normal-case tracking-normal text-body outline-none transition-colors focus:border-primary/50"
            />
          </label>

          <SelectField
            id="local-endpoint-kind"
            label="Runtime"
            value={config.endpointKind}
            onChange={(endpointKind) => setConfig((current) => ({ ...current, endpointKind }))}
            options={[
              { value: "ollama", label: "Ollama" },
              { value: "openai-compatible", label: "OpenAI compatible" },
              { value: "custom", label: "Custom ping URL" },
            ]}
          />

          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="local-ping-interval">
            Ping interval
            <input
              id="local-ping-interval"
              type="number"
              min={10}
              max={300}
              value={config.pingIntervalSeconds}
              onChange={(event) => setConfig((current) => ({
                ...current,
                pingIntervalSeconds: Math.min(300, Math.max(10, Number(event.target.value) || 10)),
              }))}
              className="mt-1 block h-10 w-full rounded-md border border-border/40 bg-background px-3 text-sm normal-case tracking-normal text-body outline-none transition-colors focus:border-primary/50"
            />
          </label>

          <div className="flex items-center gap-2 pb-1">
            <Switch
              id="local-health-check"
              checked={config.healthCheck}
              onCheckedChange={(healthCheck) => setConfig((current) => ({ ...current, healthCheck }))}
              aria-label="Enable local health monitoring"
            />
            <label className="text-sm font-semibold text-heading" htmlFor="local-health-check">
              Monitor
            </label>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-4">
          <SummaryTile icon={Clock} label="Uptime" value={uptime} hint={health.status === "online" ? "Current healthy run" : "Waiting for a healthy ping"} />
          <SummaryTile icon={Zap} label="Latency" value={health.latencyMs === null ? "-" : `${health.latencyMs}ms`} hint={health.checkedAt ? "Last health ping" : "No ping recorded"} />
          <SummaryTile icon={Route} label="Health URL" value={config.endpointKind === "custom" ? "Custom" : "Auto"} hint={healthUrl} />
          <SummaryTile icon={ShieldCheck} label="Persistence" value={authToken ? "Supabase" : "Local"} hint={saveState === "error" ? saveError ?? "Save failed" : saveState === "saved" ? "Config synced" : "Tenant settings key"} />
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => void pingLocalEndpoint()} disabled={!config.healthCheck || health.status === "checking"}>
            {health.status === "checking" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Activity className="h-4 w-4" />}
            Ping now
          </Button>
          {health.error && (
            <span className="inline-flex items-center gap-2 rounded-md border border-red-400/30 bg-red-400/10 px-2 py-1 text-xs font-semibold text-red-200">
              <AlertTriangle className="h-3.5 w-3.5" />
              {health.error}
            </span>
          )}
        </div>
      </section>

      <section className="rounded-lg border border-border/40 bg-card/10 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-border/40 bg-background/50 px-2 py-1 text-xs font-semibold text-body">
              <Route className="h-3.5 w-3.5" />
              Routing rules
            </div>
            <h2 className="mt-3 text-lg font-semibold text-heading">Task routing matrix</h2>
          </div>
          <div className="grid w-full gap-2 sm:grid-cols-3 lg:w-auto">
            <SummaryTile icon={Cpu} label="Local" value={String(summary.local)} hint="Tasks preferring local" />
            <SummaryTile icon={Cloud} label="API" value={String(summary.api)} hint="Tasks starting on API" />
            <SummaryTile icon={ListRestart} label="Auto" value={String(summary.auto)} hint="Capability-based tasks" />
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-md border border-border/40">
          <div className="grid gap-0 bg-background/40 text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:grid-cols-[minmax(210px,1.1fr)_170px_190px_150px_120px]">
            <div className="px-3 py-2">Task</div>
            <div className="px-3 py-2">Route</div>
            <div className="px-3 py-2">Fallback</div>
            <div className="px-3 py-2">Retry</div>
            <div className="px-3 py-2">Notify</div>
          </div>

          {config.rules.map((rule) => (
            <div
              key={rule.id}
              className="grid gap-3 border-t border-border/30 bg-card/10 p-3 lg:grid-cols-[minmax(210px,1.1fr)_170px_190px_150px_120px] lg:items-center"
            >
              <div>
                <p className="text-sm font-semibold text-heading">{rule.label}</p>
                <p className="mt-1 text-xs leading-5 text-body">{rule.detail}</p>
                <p className="mt-1 text-xs text-muted-foreground">Model: {rule.modelHint}</p>
              </div>
              <SelectField
                id={`${rule.id}-route`}
                label="Route"
                value={rule.route}
                onChange={(route) => updateRule(rule.id, { route })}
                options={ROUTE_OPTIONS}
              />
              <div className="space-y-2">
                <SelectField
                  id={`${rule.id}-fallback`}
                  label="Fallback"
                  value={rule.fallback}
                  onChange={(fallback) => updateRule(rule.id, { fallback })}
                  options={FALLBACK_OPTIONS}
                />
                <FallbackPill mode={rule.fallback} />
              </div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor={`${rule.id}-retry`}>
                Minutes
                <input
                  id={`${rule.id}-retry`}
                  type="number"
                  min={1}
                  max={120}
                  value={rule.retryMinutes}
                  disabled={rule.fallback !== "queue"}
                  onChange={(event) => updateRule(rule.id, {
                    retryMinutes: Math.min(120, Math.max(1, Number(event.target.value) || 1)),
                  })}
                  className="mt-1 block h-10 w-full rounded-md border border-border/40 bg-background px-3 text-sm normal-case tracking-normal text-body outline-none transition-colors focus:border-primary/50 disabled:opacity-50"
                />
              </label>
              <div className="flex items-center gap-2">
                <Switch
                  id={`${rule.id}-notify`}
                  checked={rule.notify}
                  onCheckedChange={(notify) => updateRule(rule.id, { notify })}
                  aria-label={`${rule.label} fallback notification`}
                />
                <label className="inline-flex items-center gap-1.5 text-sm font-semibold text-heading" htmlFor={`${rule.id}-notify`}>
                  <Bell className="h-3.5 w-3.5" />
                  Alert
                </label>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-lg border border-border/40 bg-card/10 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md border border-border/40 bg-background/50 px-2 py-1 text-xs font-semibold text-body">
              <ListRestart className="h-3.5 w-3.5" />
              Fallback plan
            </div>
            <h2 className="mt-3 text-lg font-semibold text-heading">When local is down</h2>
          </div>
          <div className="grid gap-2 sm:grid-cols-3">
            <SummaryTile icon={Cloud} label="API" value={String(summary.apiFallbacks)} hint="Needs API credentials" />
            <SummaryTile icon={ListRestart} label="Queue" value={String(summary.queuedFallbacks)} hint="Retry locally later" />
            <SummaryTile icon={ServerOff} label="Block" value={String(summary.blockedFallbacks)} hint="Notify and stop" />
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {FALLBACK_OPTIONS.map((option) => {
            const Icon = option.value === "api" ? Cloud : option.value === "queue" ? ListRestart : ServerOff;
            return (
              <div key={option.value} className="rounded-md border border-border/40 bg-background/30 p-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-heading">
                  <Icon className="h-4 w-4 text-primary" />
                  {option.label}
                </div>
                <p className="mt-2 text-xs leading-5 text-body">{option.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
