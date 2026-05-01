import { AlertTriangle, CheckCircle2, Github, Server, ShieldCheck } from "lucide-react";
import {
  listSystemCredentialInventory,
  type SystemCredentialInventoryEntry,
  type SystemCredentialProvider,
  type SystemCredentialRisk,
} from "./systemCredentialInventory";

const riskStyles: Record<SystemCredentialRisk, string> = {
  critical: "border-red-500/20 bg-red-500/10 text-red-400",
  high:     "border-amber-500/20 bg-amber-500/10 text-amber-400",
  normal:   "border-green-500/20 bg-green-500/10 text-green-400",
};

const providerIcon: Record<SystemCredentialProvider, typeof Github> = {
  github: Github,
  vercel: Server,
};

function countBy<T extends string>(
  entries: readonly SystemCredentialInventoryEntry[],
  key: (entry: SystemCredentialInventoryEntry) => T,
): Record<T, number> {
  return entries.reduce((acc, entry) => {
    const value = key(entry);
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {} as Record<T, number>);
}

export default function SystemCredentialInventoryPanel() {
  const entries = listSystemCredentialInventory();
  const riskCounts = countBy(entries, (entry) => entry.risk);
  const providerCounts = countBy(entries, (entry) => entry.provider);
  const expectedCount = entries.filter((entry) => entry.expected).length;

  return (
    <section className="rounded-xl border border-white/[0.06] bg-[#111111] p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#E2B93B]" />
            <h2 className="text-sm font-semibold text-white">Credential inventory</h2>
          </div>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-[#888]">
            Safe names-and-purpose register for GitHub secrets and Vercel env vars. It does not read or show values.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[10px] sm:grid-cols-4">
          <SummaryPill label="tracked" value={entries.length} />
          <SummaryPill label="expected" value={expectedCount} />
          <SummaryPill label="GitHub" value={providerCounts.github ?? 0} />
          <SummaryPill label="Vercel" value={providerCounts.vercel ?? 0} />
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <RiskPill label="critical" value={riskCounts.critical ?? 0} risk="critical" />
        <RiskPill label="high" value={riskCounts.high ?? 0} risk="high" />
        <RiskPill label="normal" value={riskCounts.normal ?? 0} risk="normal" />
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-white/[0.04]">
        <div className="grid grid-cols-[120px_minmax(170px,1fr)_96px_minmax(180px,1.1fr)_minmax(180px,1.2fr)] gap-3 border-b border-white/[0.04] bg-white/[0.02] px-3 py-2 text-[10px] uppercase tracking-wide text-[#555] max-xl:hidden">
          <span>Provider</span>
          <span>Name</span>
          <span>Risk</span>
          <span>Used by</span>
          <span>Guidance</span>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {entries.map((entry) => {
            const ProviderIcon = providerIcon[entry.provider];
            return (
              <div
                key={`${entry.provider}-${entry.name}`}
                className="grid gap-3 px-3 py-3 text-xs max-xl:grid-cols-1 xl:grid-cols-[120px_minmax(170px,1fr)_96px_minmax(180px,1.1fr)_minmax(180px,1.2fr)] xl:items-center"
              >
                <div className="flex items-center gap-2 text-[#aaa]">
                  <ProviderIcon className="h-3.5 w-3.5 text-[#777]" />
                  <span className="capitalize">{entry.provider}</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate font-mono text-[11px] text-white">{entry.name}</p>
                  <p className="mt-0.5 truncate text-[10px] text-[#666]">{entry.scope}</p>
                </div>
                <span className={`w-fit rounded-full border px-2 py-0.5 text-[10px] font-medium ${riskStyles[entry.risk]}`}>
                  {entry.risk}
                </span>
                <p className="min-w-0 text-[11px] leading-relaxed text-[#ccc]">{entry.workload}</p>
                <div className="flex min-w-0 gap-2">
                  {entry.expected ? (
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-400" />
                  ) : (
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#777]" />
                  )}
                  <p className="text-[11px] leading-relaxed text-[#777]">{entry.docsHint}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="mt-3 text-[10px] text-[#555]">
        Metadata only. No reveal, copy, rotate, provider call, auth header, token value, cookie, passkey, or MFA material is available here.
      </p>
    </section>
  );
}

function SummaryPill({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-white/[0.05] bg-white/[0.03] px-3 py-2">
      <p className="text-[#666]">{label}</p>
      <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

function RiskPill({ label, value, risk }: { label: string; value: number; risk: SystemCredentialRisk }) {
  return (
    <div className={`rounded-lg border px-3 py-2 ${riskStyles[risk]}`}>
      <p className="text-[10px] font-medium uppercase tracking-wide">{label}</p>
      <p className="mt-0.5 text-lg font-semibold">{value}</p>
    </div>
  );
}
