import { ShieldAlert, ShieldCheck, TerminalSquare, LockKeyhole, TriangleAlert } from "lucide-react";

const STARTER_PACKS = [
  {
    id: "securitypass-repo-baseline",
    name: "Repo Baseline",
    category: "Repo scan",
    useWhen: "Use this when you want a quick secrets + supply-chain sweep against a local repository path.",
    checks: "gitleaks, osv-scanner",
    cta: "Run from MCP",
  },
  {
    id: "securitypass-web-baseline",
    name: "Scoped Web Baseline",
    category: "Active probe",
    useWhen: "Use this when you have explicit authorization to probe a live URL and want header + browser checks.",
    checks: "security headers, stagehand",
    cta: "Scope gate pending",
  },
];

function DisclaimerBanner() {
  return (
    <div className="rounded-xl border border-[#E2B93B]/25 bg-[#E2B93B]/10 p-4">
      <div className="flex items-start gap-3">
        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#E2B93B]" />
        <div>
          <h2 className="text-sm font-semibold text-[#E2B93B]">SecurityPass disclaimer placeholder</h2>
          <p className="mt-1 text-sm text-[#d9d0a8]">
            SecurityPass is an evidence-led QA surface, not blanket authorization to scan. Repo-local checks are live in
            Phase 2. Active URL probing remains blocked until scope verification and disclosure plumbing land.
          </p>
        </div>
      </div>
    </div>
  );
}

function PackTile({
  name,
  category,
  useWhen,
  checks,
  cta,
  disabled = false,
}: {
  name: string;
  category: string;
  useWhen: string;
  checks: string;
  cta: string;
  disabled?: boolean;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111] p-5 flex flex-col gap-3">
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-semibold text-white">{name}</h3>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-red-500/10 text-red-300">
            {category}
          </span>
        </div>
        <p className="mt-1 text-xs text-[#888]">{useWhen}</p>
        <p className="mt-2 text-[11px] text-[#666]">{checks}</p>
      </div>
      <button
        disabled
        className={`mt-auto flex items-center justify-center gap-1.5 rounded-md border px-3 py-2 text-xs font-medium ${
          disabled
            ? "border-white/[0.08] bg-black/30 text-[#777]"
            : "border-[#E2B93B]/30 bg-[#E2B93B]/10 text-[#E2B93B] hover:bg-[#E2B93B]/20"
        }`}
      >
        {cta}
      </button>
    </div>
  );
}

export default function SecurityPassCatalog() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-red-300" />
          <div>
            <h1 className="text-2xl font-semibold text-white">SecurityPass</h1>
            <p className="mt-0.5 text-sm text-[#888]">
              The quality gate for security. Start with repo-local evidence, then step into scoped active probing.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <DisclaimerBanner />

        <section className="rounded-xl border border-white/[0.06] bg-[#111] p-5">
          <div className="flex items-start gap-3">
            <TerminalSquare className="mt-0.5 h-5 w-5 shrink-0 text-[#61C1C4]" />
            <div>
              <h2 className="text-sm font-semibold text-white">Live now through MCP</h2>
              <p className="mt-1 text-sm text-[#888]">
                `securitypass_run` accepts a local `repo_path` today and executes gitleaks plus osv-scanner inside the
                connected MCP host. `securitypass_status` polls the in-session run record.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-white/[0.06] bg-[#111] p-5">
          <div className="flex items-start gap-3">
            <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#E2B93B]" />
            <div>
              <h2 className="text-sm font-semibold text-white">Next up</h2>
              <p className="mt-1 text-sm text-[#888]">
                Scope verification, disclosure timers, and persistent reports land next. Until then, live URL scans stay
                blocked by design.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 text-red-300" />
            <h2 className="text-lg font-semibold text-white">Starter packs</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {STARTER_PACKS.map((pack) => (
              <PackTile
                key={pack.id}
                name={pack.name}
                category={pack.category}
                useWhen={pack.useWhen}
                checks={pack.checks}
                cta={pack.cta}
                disabled
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
