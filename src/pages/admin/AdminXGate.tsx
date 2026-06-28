import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Banknote,
  CircleDot,
  Crosshair,
  Database,
  Eye,
  GitBranch,
  KeyRound,
  Loader2,
  Lock,
  RefreshCw,
  Rocket,
  ShieldAlert,
  ShieldHalf,
  ShieldOff,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
import { useSession } from "@/lib/auth";
import {
  applyMasterXGateMode,
  applyXGatePreset,
  defaultXGateModes,
  resolveMasterXGateMode,
  setIndividualXGateMode,
  XGATE_MODE_COPY,
  XGATE_PRODUCT_CONFIGS,
  XGATE_PRESETS,
  type XGateControlMode,
  type XGateMasterMode,
  type XGatePresetId,
} from "./xgateModeModel";

type XGateVerdict = "allow" | "deny" | "ask" | "rewrite";
type XGateApiMode = "off" | "shadow" | "block";

interface XGateDecision {
  id: string;
  ts: string;
  verdict: XGateVerdict;
  gate: string;
  ruleId: string;
  actionClass: string;
  environment: string;
  tool: string;
  reason: string;
}

interface GateDetail {
  Icon: typeof Terminal;
  accent: keyof typeof ACCENT;
  watches: string;
  examples: string[];
  outcome: "blocks" | "asks first" | "rewrites";
}

const MODE_ORDER: XGateControlMode[] = ["off", "watch", "block"];

const VERDICT_STYLE: Record<XGateVerdict, { label: string; className: string }> = {
  allow: { label: "Allow", className: "bg-emerald-400 text-black" },
  ask: { label: "Ask", className: "bg-[#E2B93B] text-black" },
  deny: { label: "Deny", className: "bg-red-500 text-white" },
  rewrite: { label: "Rewrite", className: "bg-[#61C1C4] text-black" },
};

const MODE_STYLE: Record<XGateControlMode, { active: string; inactive: string; pill: string; Icon: typeof Eye }> = {
  off: {
    active: "border-white/25 bg-white/15 text-white",
    inactive: "border-white/[0.08] bg-white/[0.03] text-white/45 hover:bg-white/[0.08] hover:text-white",
    pill: "bg-white/15 text-white/70",
    Icon: ShieldOff,
  },
  watch: {
    active: "border-[#61C1C4]/45 bg-[#61C1C4]/15 text-[#61C1C4]",
    inactive: "border-white/[0.08] bg-white/[0.03] text-white/45 hover:bg-[#61C1C4]/10 hover:text-[#61C1C4]",
    pill: "bg-[#61C1C4]/15 text-[#61C1C4]",
    Icon: Eye,
  },
  block: {
    active: "border-red-400/45 bg-red-400/15 text-red-200",
    inactive: "border-white/[0.08] bg-white/[0.03] text-white/45 hover:bg-red-400/10 hover:text-red-200",
    pill: "bg-red-400/15 text-red-200",
    Icon: ShieldAlert,
  },
};

const ACCENT = {
  amber: { text: "text-amber-300", chip: "bg-amber-400/10 text-amber-300", ring: "ring-amber-400/50", bar: "bg-amber-400" },
  orange: { text: "text-orange-300", chip: "bg-orange-400/10 text-orange-300", ring: "ring-orange-400/50", bar: "bg-orange-400" },
  sky: { text: "text-sky-300", chip: "bg-sky-400/10 text-sky-300", ring: "ring-sky-400/50", bar: "bg-sky-400" },
  rose: { text: "text-rose-300", chip: "bg-rose-400/10 text-rose-300", ring: "ring-rose-400/50", bar: "bg-rose-400" },
  teal: { text: "text-teal-300", chip: "bg-teal-400/10 text-teal-300", ring: "ring-teal-400/50", bar: "bg-teal-400" },
  violet: { text: "text-violet-300", chip: "bg-violet-400/10 text-violet-300", ring: "ring-violet-400/50", bar: "bg-violet-400" },
  emerald: { text: "text-emerald-300", chip: "bg-emerald-400/10 text-emerald-300", ring: "ring-emerald-400/50", bar: "bg-emerald-400" },
  yellow: { text: "text-yellow-300", chip: "bg-yellow-400/10 text-yellow-300", ring: "ring-yellow-400/50", bar: "bg-yellow-400" },
  red: { text: "text-red-300", chip: "bg-red-400/10 text-red-300", ring: "ring-red-400/50", bar: "bg-red-400" },
};

const GATE_DETAILS: Record<string, GateDetail> = {
  CommandGate: {
    Icon: Terminal,
    accent: "amber",
    outcome: "blocks",
    watches: "Terminal commands routed through UnClick.",
    examples: ["rm -rf /", "dd if=/dev/zero of=/dev/sda", "git clean -xfd"],
  },
  GitGate: {
    Icon: GitBranch,
    accent: "orange",
    outcome: "blocks",
    watches: "Git history, protected branches, resets, and force pushes.",
    examples: ["git push --force origin main", "git branch -D main", "git reset --hard"],
  },
  DataGate: {
    Icon: Database,
    accent: "sky",
    outcome: "blocks",
    watches: "Database commands, migrations, tenant filters, and destructive SQL.",
    examples: ["DROP TABLE users", "DELETE FROM orders", "TRUNCATE payments"],
  },
  SecretGate: {
    Icon: KeyRound,
    accent: "rose",
    outcome: "blocks",
    watches: "Passwords, API keys, tokens, private keys, and outbound credential exposure.",
    examples: ["commit sk-live...", "send an AWS key", "paste a private key"],
  },
  TrendSlopGate: {
    Icon: Sparkles,
    accent: "teal",
    outcome: "rewrites",
    watches: "Over-agreeable, generic, fashionable, or poorly grounded AI advice.",
    examples: ["you are absolutely right", "agentic flywheel", "launch today"],
  },
  ShipGate: {
    Icon: Rocket,
    accent: "violet",
    outcome: "asks first",
    watches: "Deploys, releases, rollbacks, DNS, and production-affecting changes.",
    examples: ["deploy to prod", "terraform apply", "change live DNS"],
  },
  ScopeGate: {
    Icon: Crosshair,
    accent: "emerald",
    outcome: "asks first",
    watches: "File and repo boundaries for the active ScopePack or owned files.",
    examples: ["outside the repo", "another team's code", "unowned config"],
  },
  SpendGate: {
    Icon: Banknote,
    accent: "yellow",
    outcome: "asks first",
    watches: "Model, API, infrastructure, and third-party spend.",
    examples: ["paid batch job", "large model run", "buy credits"],
  },
  KillGate: {
    Icon: Zap,
    accent: "red",
    outcome: "blocks",
    watches: "Global stop, unsafe autonomy, and emergency hold conditions.",
    examples: ["kill switch active", "unsafe unattended run", "deny circuit"],
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function isXGateControlMode(value: unknown): value is XGateControlMode {
  return value === "off" || value === "watch" || value === "block";
}

function normalizeVerdict(value: unknown): XGateVerdict {
  if (value === "deny" || value === "ask" || value === "rewrite" || value === "allow") return value;
  return "ask";
}

function normalizeApiMode(value: unknown, fallback: XGateApiMode = "shadow"): XGateApiMode {
  return value === "off" || value === "shadow" || value === "block" ? value : fallback;
}

function apiToControlMode(value: XGateApiMode): XGateControlMode {
  return value === "shadow" ? "watch" : value;
}

function controlToApiMode(value: XGateControlMode): XGateApiMode {
  return value === "watch" ? "shadow" : value;
}

function apiModeForMaster(masterMode: XGateMasterMode, fallback: XGateApiMode): XGateApiMode {
  return masterMode === "custom" ? fallback : controlToApiMode(masterMode);
}

function sanitizeGateModes(value: unknown, base: Record<string, XGateControlMode>): Record<string, XGateControlMode> {
  if (!isRecord(value)) return base;
  const next = { ...base };
  for (const product of XGATE_PRODUCT_CONFIGS) {
    if (isXGateControlMode(value[product.id])) next[product.id] = value[product.id];
  }
  return next;
}

function modesFromBody(record: Record<string, unknown>, apiMode: XGateApiMode): Record<string, XGateControlMode> {
  return sanitizeGateModes(record.gateModes, applyMasterXGateMode(apiToControlMode(apiMode)));
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "Unknown";
  return date.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

function pickRows(body: Record<string, unknown>): unknown[] {
  for (const candidate of [body.decisions, body.history, body.entries, body.rows, body.ledger]) {
    if (Array.isArray(candidate)) return candidate;
  }
  return [];
}

function normalizeDecision(row: unknown, index: number): XGateDecision {
  const record = isRecord(row) ? row : {};
  const deciding = isRecord(record.deciding) ? record.deciding : {};
  const ts = readString(record.ts) || readString(record.created_at) || readString(record.createdAt);
  const ruleId = readString(record.rule_id) || readString(record.ruleId) || readString(deciding.ruleId);
  const gate = readString(record.gate) || readString(deciding.gate) || (ruleId ? ruleId.split(".")[0] : "XGate");

  return {
    id: readString(record.id) || `${ts || "xgate"}-${index}`,
    ts,
    verdict: normalizeVerdict(record.verdict),
    gate,
    ruleId: ruleId || "xgate.pending",
    actionClass: readString(record.action_class) || readString(record.actionClass) || "unknown",
    environment: readString(record.environment) || readString(record.targetEnv) || "unknown",
    tool: readString(record.tool) || "unknown",
    reason: readString(record.reason) || readString(deciding.reason) || "No reason recorded.",
  };
}

function VerdictPill({ verdict }: { verdict: XGateVerdict }) {
  const style = VERDICT_STYLE[verdict];
  return (
    <span className={`inline-flex min-w-[64px] items-center justify-center rounded px-2 py-1 text-[11px] font-bold ${style.className}`}>
      {style.label}
    </span>
  );
}

function StatCard({ label, value, hint, className }: { label: string; value: string; hint: string; className?: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-white/40">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${className ?? "text-white"}`}>{value}</p>
      <p className="mt-1 text-xs leading-5 text-white/45">{hint}</p>
    </div>
  );
}

function ModeButton({
  mode,
  active,
  disabled,
  onClick,
  compact = false,
}: {
  mode: XGateControlMode;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  const copy = XGATE_MODE_COPY[mode];
  const style = MODE_STYLE[mode];
  const Icon = style.Icon;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      title={copy.detail}
      className={`inline-flex items-center justify-center gap-1.5 rounded-md border font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        compact ? "min-w-[70px] px-2 py-1 text-[11px]" : "min-w-[92px] px-3 py-2 text-xs"
      } ${active ? style.active : style.inactive}`}
    >
      <Icon className={compact ? "h-3 w-3" : "h-3.5 w-3.5"} />
      {copy.label}
    </button>
  );
}

function XGateModePanel({
  modes,
  saving,
  onMasterMode,
  onGateMode,
  onPreset,
}: {
  modes: Record<string, XGateControlMode>;
  saving: boolean;
  onMasterMode: (mode: XGateControlMode) => void;
  onGateMode: (gateId: string, mode: XGateControlMode) => void;
  onPreset: (presetId: XGatePresetId) => void;
}) {
  const masterMode = resolveMasterXGateMode(modes);

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Gate modes</h2>
          <p className="mt-1 max-w-2xl text-xs leading-5 text-white/45">
            Master sets every gate. Individual changes create Custom.
          </p>
        </div>
        <span className="rounded bg-[#61C1C4]/10 px-2 py-1 text-[11px] font-semibold text-[#61C1C4]">
          Master: {masterMode === "custom" ? "Custom" : XGATE_MODE_COPY[masterMode].label}
        </span>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold text-white">Master XGate</p>
            <p className="mt-1 text-[11px] leading-5 text-white/45">
              Off, Watch, or Block here applies to every gate at once.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex flex-wrap gap-2">
              {MODE_ORDER.map((mode) => (
                <ModeButton
                  key={mode}
                  mode={mode}
                  disabled={saving}
                  active={masterMode === mode}
                  onClick={() => onMasterMode(mode)}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {XGATE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  disabled={saving}
                  onClick={() => onPreset(preset.id)}
                  title={preset.detail}
                  className="rounded-md border border-[#61C1C4]/30 bg-[#61C1C4]/10 px-3 py-1.5 text-[11px] font-semibold text-[#61C1C4] transition-colors hover:bg-[#61C1C4]/15 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {XGATE_PRODUCT_CONFIGS.map((product) => {
          const mode = modes[product.id] ?? product.defaultMode;
          return (
            <div key={product.id} id={product.id.toLowerCase()} className="scroll-mt-24 rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white">{product.name}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/45">{product.summary}</p>
                </div>
                <span className={`shrink-0 rounded px-2 py-1 text-[10px] font-bold ${MODE_STYLE[mode].pill}`}>
                  {XGATE_MODE_COPY[mode].label}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {MODE_ORDER.map((nextMode) => (
                  <ModeButton
                    key={nextMode}
                    mode={nextMode}
                    compact
                    disabled={saving}
                    active={mode === nextMode}
                    onClick={() => onGateMode(product.id, nextMode)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function DecisionTable({ decisions }: { decisions: XGateDecision[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-white/[0.03]">
      <table className="w-full min-w-[820px] text-left text-xs">
        <thead className="text-white/40">
          <tr className="border-b border-white/[0.06]">
            <th className="px-4 py-3 font-medium">Time</th>
            <th className="px-4 py-3 font-medium">Verdict</th>
            <th className="px-4 py-3 font-medium">Gate</th>
            <th className="px-4 py-3 font-medium">Rule</th>
            <th className="px-4 py-3 font-medium">Action</th>
            <th className="px-4 py-3 font-medium">Env</th>
            <th className="px-4 py-3 font-medium">Tool</th>
          </tr>
        </thead>
        <tbody>
          {decisions.map((decision) => (
            <tr key={decision.id} className="border-b border-white/[0.04] last:border-0">
              <td className="px-4 py-3 text-white/65 tabular-nums">{formatDate(decision.ts)}</td>
              <td className="px-4 py-3"><VerdictPill verdict={decision.verdict} /></td>
              <td className="px-4 py-3 font-medium text-white/80">{decision.gate}</td>
              <td className="px-4 py-3 font-mono text-[11px] text-[#61C1C4]">{decision.ruleId}</td>
              <td className="px-4 py-3 text-white/60">{decision.actionClass}</td>
              <td className="px-4 py-3 text-white/60">{decision.environment}</td>
              <td className="px-4 py-3 text-white/45">{decision.tool}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GateGuideCard({ product, active }: { product: (typeof XGATE_PRODUCT_CONFIGS)[number]; active: boolean }) {
  const detail = GATE_DETAILS[product.id] ?? GATE_DETAILS.CommandGate;
  const a = ACCENT[detail.accent];

  return (
    <section
      className={`overflow-hidden rounded-xl border bg-white/[0.03] transition-all ${
        active ? `border-transparent ring-2 ${a.ring}` : "border-white/[0.06]"
      }`}
    >
      <div className="flex">
        <div className={`w-1 shrink-0 ${a.bar}`} />
        <div className="flex flex-1 gap-4 p-4">
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${a.chip}`}>
            <detail.Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`text-sm font-semibold ${a.text}`}>{product.name}</h3>
              <span
                className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                  detail.outcome === "blocks"
                    ? "bg-red-500/15 text-red-300"
                    : detail.outcome === "rewrites"
                      ? "bg-[#61C1C4]/15 text-[#61C1C4]"
                      : "bg-[#E2B93B]/15 text-[#E2B93B]"
                }`}
              >
                {detail.outcome === "rewrites" ? "Rewrites" : detail.outcome === "blocks" ? "Blocks it" : "Asks first"}
              </span>
            </div>
            <p className="mt-1 text-xs leading-6 text-white/60">{detail.watches}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {detail.examples.map((ex) => (
                <code key={ex} className="rounded bg-black/40 px-2 py-1 font-mono text-[10.5px] text-white/45">
                  {ex}
                </code>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AdminXGate() {
  const { session } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const [adminVerified, setAdminVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [endpointReady, setEndpointReady] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<XGateDecision[]>([]);
  const [apiMode, setApiMode] = useState<XGateApiMode>("shadow");
  const [gateModes, setGateModes] = useState<Record<string, XGateControlMode>>(defaultXGateModes);
  const [savingMode, setSavingMode] = useState(false);

  const load = useCallback(async () => {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/xgate-check?action=recent", {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (response.status === 403) {
        setAdminVerified(false);
        navigate("/admin/you", { replace: true });
        return;
      }
      setAdminVerified(true);
      if (response.status === 404 || response.status === 405) {
        setEndpointReady(false);
        setDecisions([]);
        return;
      }
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Failed to load XGate history");
      const record = isRecord(body) ? body : {};
      const nextApiMode = normalizeApiMode(record.mode);
      setEndpointReady(true);
      setDecisions(pickRows(record).map(normalizeDecision));
      setApiMode(nextApiMode);
      setGateModes(modesFromBody(record, nextApiMode));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [session, navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (loading || !location.hash) return;
    const el = document.getElementById(location.hash.slice(1).toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [loading, location.hash]);

  const saveModes = useCallback(
    async (nextModes: Record<string, XGateControlMode>, nextApiMode: XGateApiMode) => {
      if (!session || savingMode) return;
      setSavingMode(true);
      setError(null);
      setGateModes(nextModes);
      setApiMode(nextApiMode);
      try {
        const response = await fetch("/api/xgate-check?action=set_mode", {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ mode: nextApiMode, gateModes: nextModes }),
        });
        const body = await response.json();
        if (!response.ok) throw new Error(body.error ?? "Could not change mode");
        const record = isRecord(body) ? body : {};
        const savedApiMode = normalizeApiMode(record.mode, nextApiMode);
        setApiMode(savedApiMode);
        setGateModes(modesFromBody(record, savedApiMode));
        if (record.gateModesPersisted === false) {
          setError("Master mode saved. Individual gate modes need the latest database migration before they persist.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not change mode");
        void load();
      } finally {
        setSavingMode(false);
      }
    },
    [load, savingMode, session],
  );

  const changeMasterMode = useCallback(
    (mode: XGateControlMode) => {
      if (mode === "block" && !window.confirm("Switch every XGate product to Block? Flagged actions may stop before they run.")) return;
      void saveModes(applyMasterXGateMode(mode), controlToApiMode(mode));
    },
    [saveModes],
  );

  const changeGateMode = useCallback(
    (gateId: string, mode: XGateControlMode) => {
      const next = setIndividualXGateMode(gateModes, gateId, mode);
      void saveModes(next, apiModeForMaster(resolveMasterXGateMode(next), apiMode));
    },
    [apiMode, gateModes, saveModes],
  );

  const applyPreset = useCallback(
    (presetId: XGatePresetId) => {
      const next = applyXGatePreset(presetId, gateModes);
      void saveModes(next, apiModeForMaster(resolveMasterXGateMode(next), apiMode));
    },
    [apiMode, gateModes, saveModes],
  );

  if (adminVerified === false) {
    return (
      <div className="flex items-center gap-2 py-12 text-white/45">
        <Lock className="h-4 w-4" />
        <span className="text-sm">Admin access required</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 text-white/45">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-sm">Loading XGate...</span>
      </div>
    );
  }

  const activeId = location.hash.slice(1).toLowerCase();
  const stopped = decisions.filter((d) => d.verdict === "deny" || d.verdict === "ask").length;
  const masterMode = resolveMasterXGateMode(gateModes);
  const trendSlopMode = gateModes.TrendSlopGate ?? "watch";

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <ShieldHalf className="h-5 w-5 text-[#61C1C4]" />
            <h1 className="text-2xl font-semibold text-white">XGate</h1>
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-white/55">
            The guardrail that decides what an agent is allowed to do, before it does it.
          </p>
        </div>
        <button
          onClick={() => void load()}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-white/55 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Decisions" value={String(decisions.length)} hint="Recent control-ledger rows." />
        <StatCard label="Stopped" value={String(stopped)} hint="Deny + ask verdicts." className={stopped > 0 ? "text-[#E2B93B]" : "text-white"} />
        <StatCard
          label="Posture"
          value={masterMode === "custom" ? "Custom" : XGATE_MODE_COPY[masterMode].label}
          hint={`TrendSlopGate is ${XGATE_MODE_COPY[trendSlopMode].label}.`}
          className={masterMode === "block" ? "text-red-400" : masterMode === "off" ? "text-white/70" : "text-[#61C1C4]"}
        />
      </div>

      <XGateModePanel
        modes={gateModes}
        saving={savingMode}
        onMasterMode={changeMasterMode}
        onGateMode={changeGateMode}
        onPreset={applyPreset}
      />

      {error && <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-xs text-red-300">{error}</div>}

      {!endpointReady && (
        <div className="rounded-xl border border-[#E2B93B]/20 bg-[#E2B93B]/[0.05] p-4 text-xs leading-5 text-[#E2B93B]">
          XGate history endpoint is not responding yet. The gate controls and guide below still work.
        </div>
      )}

      <div>
        <h2 className="mb-3 text-sm font-semibold text-white">Recent decisions</h2>
        {decisions.length > 0 ? (
          <DecisionTable decisions={decisions} />
        ) : (
          <div className="rounded-xl border border-dashed border-white/[0.1] bg-white/[0.03] p-8 text-center">
            <CircleDot className="mx-auto h-6 w-6 text-white/25" />
            <p className="mt-3 text-sm text-white/60">No decisions recorded yet.</p>
            <p className="mt-1 text-xs text-white/35">In Watch or Block mode, flagged actions show up here.</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-1 text-sm font-semibold text-white">The gates</h2>
        <p className="mb-3 text-xs text-white/45">Each one watches a different kind of risk. The sidebar links jump straight to a gate.</p>
        <div className="space-y-3">
          {XGATE_PRODUCT_CONFIGS.map((product) => (
            <GateGuideCard key={product.id} product={product} active={activeId === product.id.toLowerCase()} />
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-[11px] text-white/40">
        <Link to="/admin/checks" className="hover:text-[#61C1C4]">XPass checks</Link>
        <Link to="/admin/ledger" className="hover:text-[#61C1C4]">Ledger</Link>
      </div>
    </div>
  );
}
