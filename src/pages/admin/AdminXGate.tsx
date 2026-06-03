import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CircleDot, Loader2, Lock, RefreshCw, ShieldHalf } from "lucide-react";
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

// The 3-state dial. One control: Off (dormant) -> Watch (logs, never blocks)
// -> Block (actually stops flagged actions).
const MODES: { value: XGateMode; label: string; blurb: string }[] = [
  { value: "off", label: "Off", blurb: "Dormant. No checks, no warnings, no notes. Agents behave as if XGate isn't here." },
  { value: "shadow", label: "Watch", blurb: "Watches everything and writes notes, but never blocks. Pure awareness." },
  { value: "block", label: "Block", blurb: "Actually stops flagged actions. Real teeth." },
];

// Each gate, in plain english. The sidebar sub-links anchor to these sections.
const GATES: { id: string; name: string; what: string }[] = [
  { id: "commandgate", name: "CommandGate", what: "Watches terminal commands. Stops the scary, can't-undo ones (like deleting everything or wiping a disk) before they run." },
  { id: "gitgate", name: "GitGate", what: "Watches Git. Stops moves that erase work, like force-pushing, deleting a branch, or rewriting history." },
  { id: "datagate", name: "DataGate", what: "Watches database commands. It reads the SQL and stops the ones that wipe or delete data, like dropping a table or a DELETE with no filter." },
  { id: "secretgate", name: "SecretGate", what: "Watches for passwords, API keys, and tokens. Stops them from being saved into code or sent out, where a leak is forever." },
  { id: "shipgate", name: "ShipGate", what: "Watches deploys and releases. Makes sure pushing to live (or changing servers and DNS) isn't done carelessly or without proof." },
  { id: "scopegate", name: "ScopeGate", what: "Watches which files get touched. Keeps the agent in its own lane, so it doesn't edit things it doesn't own." },
  { id: "spendgate", name: "SpendGate", what: "Watches spending. Pauses anything that would cost more than your set limit before real money goes out." },
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
  const candidates = [body.decisions, body.history, body.entries, body.rows, body.ledger];
  for (const candidate of candidates) {
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
    <span className={`inline-flex min-w-[68px] items-center justify-center rounded px-2 py-1 text-[11px] font-bold ${style.className}`}>
      {style.label}
    </span>
  );
}

function ModeDial({
  mode,
  saving,
  onChange,
}: {
  mode: XGateMode;
  saving: boolean;
  onChange: (next: XGateMode) => void;
}) {
  const active = MODES.find((m) => m.value === mode) ?? MODES[1];
  return (
    <section className="rounded-xl border border-white/[0.06] bg-[#111] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">Mode</h2>
          <p className="mt-1 text-xs text-white/50">One switch for your whole account. Choose how strict XGate is.</p>
        </div>
        <div className="inline-flex rounded-lg border border-white/[0.08] bg-black/30 p-1">
          {MODES.map((m) => {
            const selected = m.value === mode;
            return (
              <button
                key={m.value}
                type="button"
                disabled={saving}
                onClick={() => onChange(m.value)}
                className={`relative min-w-[78px] rounded-md px-3 py-1.5 text-xs font-semibold transition-colors disabled:opacity-60 ${
                  selected
                    ? m.value === "block"
                      ? "bg-red-500 text-white"
                      : m.value === "off"
                        ? "bg-white/80 text-black"
                        : "bg-[#61C1C4] text-black"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs leading-5 text-white/55">
        {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {active.blurb}
      </p>
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
    load();
  }, [load]);

  // Scroll to the gate section named in the URL hash (the sidebar sub-links).
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

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <ShieldHalf className="h-5 w-5 text-[#61C1C4]" />
            <h1 className="text-2xl font-semibold text-white">XGate</h1>
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-white/55">
            The guardrail that decides what an agent is allowed to do, before it does it. Each gate below watches one kind of risky action.
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-white/55 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      <ModeDial mode={mode} saving={savingMode} onChange={changeMode} />

      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-xs text-red-300">{error}</div>
      )}

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
          <div className="rounded-xl border border-white/[0.06] bg-[#111] p-8 text-center">
            <CircleDot className="mx-auto h-6 w-6 text-white/25" />
            <p className="mt-3 text-sm text-white/60">No XGate decisions recorded yet.</p>
            <p className="mt-1 text-xs text-white/35">In Watch or Block mode, flagged actions show up here.</p>
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-white">The gates</h2>
        <div className="space-y-3">
          {GATES.map((gate) => (
            <section
              key={gate.id}
              id={gate.id}
              className="scroll-mt-24 rounded-xl border border-white/[0.06] bg-[#111] p-4"
            >
              <h3 className="text-sm font-semibold text-white">{gate.name}</h3>
              <p className="mt-1 text-xs leading-6 text-white/60">{gate.what}</p>
            </section>
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
