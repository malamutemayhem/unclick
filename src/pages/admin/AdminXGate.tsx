import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlertTriangle, CircleDot, Loader2, Lock, RefreshCw, ShieldCheck, ShieldHalf } from "lucide-react";
import { useSession } from "@/lib/auth";

type XGateVerdict = "allow" | "deny" | "ask" | "rewrite";

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

interface KillSwitchState {
  active: boolean;
  reason: string | null;
  updatedAt: string | null;
}

const VERDICT_STYLE: Record<XGateVerdict, { label: string; className: string }> = {
  allow: { label: "Allow", className: "bg-emerald-400 text-black" },
  ask: { label: "Ask", className: "bg-[#E2B93B] text-black" },
  deny: { label: "Deny", className: "bg-red-500 text-white" },
  rewrite: { label: "Rewrite", className: "bg-[#61C1C4] text-black" },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readString(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return "";
}

function readBool(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  return null;
}

function normalizeVerdict(value: unknown): XGateVerdict {
  if (value === "deny" || value === "ask" || value === "rewrite" || value === "allow") return value;
  return "ask";
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value || "Unknown";
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
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

function normalizeKillSwitch(body: Record<string, unknown>): KillSwitchState | null {
  const source = isRecord(body.killSwitch)
    ? body.killSwitch
    : isRecord(body.kill_switch)
      ? body.kill_switch
      : null;
  if (!source) return null;
  const active = readBool(source.active);
  return {
    active: active ?? false,
    reason: readString(source.reason) || null,
    updatedAt: readString(source.updated_at) || readString(source.updatedAt) || null,
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

function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111] p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-white/40">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-xs leading-5 text-white/45">{detail}</p>
    </div>
  );
}

function KillSwitchPanel({ state }: { state: KillSwitchState | null }) {
  const active = state?.active ?? false;

  return (
    <section className="rounded-xl border border-white/[0.06] bg-[#111] p-4">
      <div className="flex items-start gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${active ? "bg-red-500/15 text-red-300" : "bg-emerald-400/10 text-emerald-300"}`}>
          {active ? <AlertTriangle className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-semibold text-white">Kill switch</h2>
            <span className={`rounded px-2 py-0.5 text-[10px] font-bold ${active ? "bg-red-500 text-white" : "bg-emerald-400 text-black"}`}>
              {active ? "Active" : "Inactive"}
            </span>
            {!state && (
              <span className="rounded bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium text-white/45">
                Waiting for endpoint
              </span>
            )}
          </div>
          <p className="mt-2 text-xs leading-5 text-white/55">
            {state?.reason || "No stop reason is recorded."}
          </p>
          <p className="mt-2 text-[11px] text-white/35">
            Last update: {state?.updatedAt ? formatDate(state.updatedAt) : "Not reported"}
          </p>
        </div>
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

export default function AdminXGate() {
  const { session } = useSession();
  const navigate = useNavigate();
  const [adminVerified, setAdminVerified] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [endpointReady, setEndpointReady] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<XGateDecision[]>([]);
  const [killSwitch, setKillSwitch] = useState<KillSwitchState | null>(null);

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
        setKillSwitch(null);
        return;
      }
      const body = await response.json();
      if (!response.ok) throw new Error(body.error ?? "Failed to load XGate history");
      const record = isRecord(body) ? body : {};
      setEndpointReady(true);
      setDecisions(pickRows(record).map(normalizeDecision));
      setKillSwitch(normalizeKillSwitch(record));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [session, navigate]);

  useEffect(() => {
    load();
  }, [load]);

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

  const strictCount = decisions.filter((decision) => decision.verdict === "deny" || decision.verdict === "ask").length;
  const latest = decisions[0];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <ShieldHalf className="h-5 w-5 text-[#61C1C4]" />
            <h1 className="text-2xl font-semibold text-white">XGate</h1>
          </div>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-white/55">
            Pre-action guardrail decisions for UnClick tool calls and delegated client hooks.
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

      <div className="grid gap-3 sm:grid-cols-3">
        <StatCard label="Decisions" value={String(decisions.length)} detail={endpointReady ? "Recent control ledger rows." : "Endpoint is waiting for Part 9."} />
        <StatCard label="Strict results" value={String(strictCount)} detail="Deny and ask verdicts that slowed an action." />
        <StatCard label="Latest" value={latest ? VERDICT_STYLE[latest.verdict].label : "None"} detail={latest ? `${latest.ruleId} in ${latest.environment}` : "No recent decision reported."} />
      </div>

      <KillSwitchPanel state={killSwitch} />

      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-xs text-red-300">
          {error}
        </div>
      )}

      {!endpointReady && (
        <div className="rounded-xl border border-[#E2B93B]/20 bg-[#E2B93B]/[0.05] p-4 text-xs leading-5 text-[#E2B93B]">
          XGate history is waiting for the Part 9 endpoint. The dashboard route and read-only surface are ready.
        </div>
      )}

      {decisions.length > 0 ? (
        <DecisionTable decisions={decisions} />
      ) : (
        <div className="rounded-xl border border-white/[0.06] bg-[#111] p-8 text-center">
          <CircleDot className="mx-auto h-6 w-6 text-white/25" />
          <p className="mt-3 text-sm text-white/60">No XGate decisions recorded yet.</p>
          <p className="mt-1 text-xs text-white/35">The ledger will fill once `/api/xgate-check?action=recent` returns rows.</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 text-[11px] text-white/40">
        <Link to="/admin/checks" className="hover:text-[#61C1C4]">XPass checks</Link>
        <Link to="/admin/ledger" className="hover:text-[#61C1C4]">Ledger</Link>
      </div>
    </div>
  );
}
