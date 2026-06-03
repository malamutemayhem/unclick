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
  Terminal,
} from "lucide-react";
import { useSession } from "@/lib/auth";

type XGateVerdict = "allow" | "deny" | "ask" | "rewrite";
type XGateMode = "off" | "shadow" | "block";

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

const VERDICT_STYLE: Record<XGateVerdict, { label: string; className: string }> = {
  allow: { label: "Allow", className: "bg-emerald-400 text-black" },
  ask: { label: "Ask", className: "bg-[#E2B93B] text-black" },
  deny: { label: "Deny", className: "bg-red-500 text-white" },
  rewrite: { label: "Rewrite", className: "bg-[#61C1C4] text-black" },
};

const MODE_META: Record<XGateMode, { label: string; Icon: typeof Eye; blurb: string; active: string; ring: string; glow: string }> = {
  off: { label: "Off", Icon: ShieldOff, blurb: "Dormant. No checks, no warnings, no notes.", active: "bg-white/90 text-black", ring: "ring-white/50", glow: "from-white/10" },
  shadow: { label: "Watch", Icon: Eye, blurb: "Watches everything and logs it. Never blocks.", active: "bg-[#61C1C4] text-black", ring: "ring-[#61C1C4]/60", glow: "from-[#61C1C4]/20" },
  block: { label: "Block", Icon: ShieldAlert, blurb: "Actually stops flagged actions. Real teeth.", active: "bg-red-500 text-white", ring: "ring-red-400/60", glow: "from-red-500/20" },
};
const MODE_ORDER: XGateMode[] = ["off", "shadow", "block"];

interface AccentStyle {
  text: string;
  chip: string;
  ring: string;
  bar: string;
}
const ACCENT: Record<string, AccentStyle> = {
  amber: { text: "text-amber-300", chip: "bg-amber-400/10 text-amber-300", ring: "ring-amber-400/50", bar: "bg-amber-400" },
  orange: { text: "text-orange-300", chip: "bg-orange-400/10 text-orange-300", ring: "ring-orange-400/50", bar: "bg-orange-400" },
  sky: { text: "text-sky-300", chip: "bg-sky-400/10 text-sky-300", ring: "ring-sky-400/50", bar: "bg-sky-400" },
  rose: { text: "text-rose-300", chip: "bg-rose-400/10 text-rose-300", ring: "ring-rose-400/50", bar: "bg-rose-400" },
  violet: { text: "text-violet-300", chip: "bg-violet-400/10 text-violet-300", ring: "ring-violet-400/50", bar: "bg-violet-400" },
  emerald: { text: "text-emerald-300", chip: "bg-emerald-400/10 text-emerald-300", ring: "ring-emerald-400/50", bar: "bg-emerald-400" },
  yellow: { text: "text-yellow-300", chip: "bg-yellow-400/10 text-yellow-300", ring: "ring-yellow-400/50", bar: "bg-yellow-400" },
};

interface GateInfo {
  id: string;
  name: string;
  Icon: typeof Terminal;
  accent: keyof typeof ACCENT;
  watches: string;
  examples: string[];
  outcome: "blocks" | "asks first";
}
const GATES: GateInfo[] = [
  { id: "commandgate", name: "CommandGate", Icon: Terminal, accent: "amber", outcome: "blocks", watches: "Terminal commands. It reads the command and stops the scary, can't-undo ones before they ever run.", examples: ["rm -rf /", "dd if=/dev/zero of=/dev/sda", ":(){ :|:& };:"] },
  { id: "gitgate", name: "GitGate", Icon: GitBranch, accent: "orange", outcome: "blocks", watches: "Git. Stops moves that erase work, like force-pushing over history or deleting a branch.", examples: ["git push --force origin main", "git branch -D main", "git reset --hard"] },
  { id: "datagate", name: "DataGate", Icon: Database, accent: "sky", outcome: "blocks", watches: "Database commands. It parses the SQL and stops the ones that wipe or delete data.", examples: ["DROP TABLE users", "DELETE FROM orders  (no WHERE)", "TRUNCATE payments"] },
  { id: "secretgate", name: "SecretGate", Icon: KeyRound, accent: "rose", outcome: "blocks", watches: "Passwords, API keys and tokens. A leaked secret is irreversible the moment it lands, so this stops it first.", examples: ["commit sk-live_4eC39H...", "send an AWS access key", "paste a private key"] },
  { id: "shipgate", name: "ShipGate", Icon: Rocket, accent: "violet", outcome: "asks first", watches: "Deploys, releases, DNS and infrastructure changes. Makes sure going to live isn't done carelessly.", examples: ["deploy to prod without proof", "terraform apply", "change live DNS"] },
  { id: "scopegate", name: "ScopeGate", Icon: Crosshair, accent: "emerald", outcome: "asks first", watches: "Which files get touched. Keeps the agent in its own lane so it doesn't edit things it doesn't own.", examples: ["editing /etc files", "writing outside the repo", "touching another team's code"] },
  { id: "spendgate", name: "SpendGate", Icon: Banknote, accent: "yellow", outcome: "asks first", watches: "Spending. Pauses anything that would cost more than your set limit before real money goes out.", examples: ["an API call over $1", "a large paid batch job", "buying credits"] },
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function readString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}
function normalizeVerdict(value: unknown): XGateVerdict {
  if (value === "deny" || value === "ask" || value === "rewrite" || value === "allow") return value;
  return "ask";
}
function normalizeMode(value: unknown): XGateMode {
  return value === "off" || value === "shadow" || value === "block" ? value : "shadow";
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
    <div className="rounded-xl border border-white/[0.06] bg-[#111] p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-white/40">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${className ?? "text-white"}`}>{value}</p>
      <p className="mt-1 text-xs leading-5 text-white/45">{hint}</p>
    </div>
  );
}

function ModeSelector({ mode, saving, onChange }: { mode: XGateMode; saving: boolean; onChange: (next: XGateMode) => void }) {
  const meta = MODE_META[mode];
  return (
    <section className={`relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br ${meta.glow} to-transparent p-5`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${meta.active}`}>
            <meta.Icon className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-sm font-semibold text-white">
              Mode: <span className="font-bold">{meta.label}</span>
            </h2>
            <p className="text-xs text-white/55">{meta.blurb}</p>
          </div>
        </div>
        {saving && <Loader2 className="h-4 w-4 animate-spin text-white/50" />}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {MODE_ORDER.map((value) => {
          const m = MODE_META[value];
          const selected = value === mode;
          return (
            <button
              key={value}
              type="button"
              disabled={saving}
              onClick={() => onChange(value)}
              className={`group flex items-start gap-2 rounded-xl border p-3 text-left transition-all disabled:opacity-60 ${
                selected
                  ? `border-transparent ring-2 ${m.ring} bg-white/[0.06]`
                  : "border-white/[0.07] bg-black/20 hover:bg-white/[0.04]"
              }`}
            >
              <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${selected ? m.active : "bg-white/[0.06] text-white/50"}`}>
                <m.Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-white">{m.label}</span>
                <span className="block text-[11px] leading-4 text-white/45">{m.blurb}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DecisionTable({ decisions }: { decisions: XGateDecision[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/[0.06] bg-[#111]">
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

function GateCard({ gate, active }: { gate: GateInfo; active: boolean }) {
  const a = ACCENT[gate.accent];
  return (
    <section
      id={gate.id}
      className={`scroll-mt-24 overflow-hidden rounded-xl border bg-[#111] transition-all ${
        active ? `border-transparent ring-2 ${a.ring}` : "border-white/[0.06]"
      }`}
    >
      <div className="flex">
        <div className={`w-1 shrink-0 ${a.bar}`} />
        <div className="flex flex-1 gap-4 p-4">
          <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${a.chip}`}>
            <gate.Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`text-sm font-semibold ${a.text}`}>{gate.name}</h3>
              <span
                className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                  gate.outcome === "blocks" ? "bg-red-500/15 text-red-300" : "bg-[#E2B93B]/15 text-[#E2B93B]"
                }`}
              >
                {gate.outcome === "blocks" ? "Blocks it" : "Asks first"}
              </span>
            </div>
            <p className="mt-1 text-xs leading-6 text-white/60">{gate.watches}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {gate.examples.map((ex) => (
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
  const [mode, setMode] = useState<XGateMode>("shadow");
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
      setEndpointReady(true);
      setDecisions(pickRows(record).map(normalizeDecision));
      setMode(normalizeMode(record.mode));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [session, navigate]);

  useEffect(() => {
    void load();
  }, [load]);

  // Scroll to (and briefly highlight) the gate named in the URL hash.
  useEffect(() => {
    if (loading || !location.hash) return;
    const el = document.getElementById(location.hash.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [loading, location.hash]);

  const changeMode = useCallback(
    async (next: XGateMode) => {
      if (!session || next === mode || savingMode) return;
      if (next === "block" && !window.confirm("Switch XGate to Block? This will actually stop flagged agent actions.")) return;
      setSavingMode(true);
      setError(null);
      try {
        const response = await fetch("/api/xgate-check?action=set_mode", {
          method: "POST",
          headers: { Authorization: `Bearer ${session.access_token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ mode: next }),
        });
        const body = await response.json();
        if (!response.ok) throw new Error(body.error ?? "Could not change mode");
        setMode(normalizeMode(body.mode));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not change mode");
      } finally {
        setSavingMode(false);
      }
    },
    [session, mode, savingMode],
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

  const activeId = location.hash.slice(1);
  const stopped = decisions.filter((d) => d.verdict === "deny" || d.verdict === "ask").length;

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <ShieldHalf className="h-5 w-5 text-[#61C1C4]" />
            <h1 className="text-2xl font-semibold text-white">XGate</h1>
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-white/55">
            The guardrail that decides what an agent is allowed to do, before it does it. Seven gates each watch one kind of risky action.
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

      <ModeSelector mode={mode} saving={savingMode} onChange={changeMode} />

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Decisions" value={String(decisions.length)} hint="Recent control-ledger rows." />
        <StatCard label="Stopped" value={String(stopped)} hint="Deny + ask verdicts." className={stopped > 0 ? "text-[#E2B93B]" : "text-white"} />
        <StatCard label="Posture" value={MODE_META[mode].label} hint="Current XGate mode." className={mode === "block" ? "text-red-400" : mode === "off" ? "text-white/70" : "text-[#61C1C4]"} />
      </div>

      {error && <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-xs text-red-300">{error}</div>}

      {!endpointReady && (
        <div className="rounded-xl border border-[#E2B93B]/20 bg-[#E2B93B]/[0.05] p-4 text-xs leading-5 text-[#E2B93B]">
          XGate history endpoint is not responding yet. The dial and gate guide below still work.
        </div>
      )}

      <div>
        <h2 className="mb-3 text-sm font-semibold text-white">Recent decisions</h2>
        {decisions.length > 0 ? (
          <DecisionTable decisions={decisions} />
        ) : (
          <div className="rounded-xl border border-dashed border-white/[0.1] bg-[#111] p-8 text-center">
            <CircleDot className="mx-auto h-6 w-6 text-white/25" />
            <p className="mt-3 text-sm text-white/60">No decisions recorded yet.</p>
            <p className="mt-1 text-xs text-white/35">In Watch or Block mode, flagged actions show up here.</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-1 text-sm font-semibold text-white">The seven gates</h2>
        <p className="mb-3 text-xs text-white/45">Each one watches a different kind of risk. The sidebar links jump straight to a gate.</p>
        <div className="space-y-3">
          {GATES.map((gate) => (
            <GateCard key={gate.id} gate={gate} active={activeId === gate.id} />
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
