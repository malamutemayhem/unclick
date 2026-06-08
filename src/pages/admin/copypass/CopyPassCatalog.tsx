import { FileText, MessagesSquare, PenSquare, ShieldCheck, Sparkles, TriangleAlert } from "lucide-react";

const STARTER_PACKS = [
  {
    id: "copypass-homepage-hero",
    name: "Homepage Hero",
    category: "Landing page",
    useWhen: "Use this when you want to pressure-test a headline, subhead, and CTA before shipping a homepage change.",
    checks: "clarity, overclaim risk, audience fit, CTA specificity",
    cta: "MCP",
  },
  {
    id: "copypass-pricing-section",
    name: "Pricing Section",
    category: "Commercial copy",
    useWhen: "Use this when pricing copy needs to stay specific, honest, and usable for technical buyers.",
    checks: "claim support, trust signals, internal consistency, tone drift",
    cta: "Run from MCP",
  },
];

function DisclaimerBanner() {
  return (
    <div className="rounded-lg border border-[#E2B93B]/25 bg-[#E2B93B]/10 p-4">
      <div className="flex items-start gap-3">
        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-[#E2B93B]" />
        <div>
          <h2 className="text-sm font-semibold text-[#E2B93B]">CopyPass proof boundary</h2>
          <p className="mt-1 text-sm text-[#d9d0a8]">
            CopyPass is a scoped copy-quality review, not final brand approval, legal review, or a guarantee of
            performance. It reports evidence-backed findings from the copy it inspected and names what it did not check.
            Exact source work must carry a CopyRoom or FidelityCopy receipt before a worker treats the copy as safe.
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
}: {
  name: string;
  category: string;
  useWhen: string;
  checks: string;
  cta: string;
}) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-5 flex flex-col gap-3">
      <div>
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-sm font-semibold text-white">{name}</h3>
          <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-fuchsia-500/10 text-fuchsia-300">
            {category}
          </span>
        </div>
        <p className="mt-1 text-xs text-[#888]">{useWhen}</p>
        <p className="mt-2 text-[11px] text-[#666]">{checks}</p>
      </div>
      <button
        disabled
        className="mt-auto flex items-center justify-center gap-1.5 rounded-md border border-white/[0.08] bg-black/30 px-3 py-2 text-xs font-medium text-[#777]"
      >
        {cta}
      </button>
    </div>
  );
}

const RECEIPT_CHECKPOINTS = [
  "copyroom_required",
  "copyroom_source_packet",
  "copyroom_receipt",
  "COPYROOM_MISSING",
  "FIDELITY_DRIFT_RISK",
];

export default function CopyPassCatalog() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <PenSquare className="h-6 w-6 text-fuchsia-300" />
          <div>
            <h1 className="text-2xl font-semibold text-white">CopyPass</h1>
            <p className="mt-0.5 text-sm text-[#888]">
              Deterministic copy review for AI-generated wording, claim support, trust signals, anti-slop polish,
              and exact-source receipt rails for worker-facing copy jobs.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <DisclaimerBanner />

        <section className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="flex items-start gap-3">
            <FileText className="mt-0.5 h-5 w-5 shrink-0 text-fuchsia-300" />
            <div>
              <h2 className="text-sm font-semibold text-white">Available now through MCP</h2>
              <p className="mt-1 text-sm text-[#888]">
                `copypass_run` accepts `copy_text` plus optional `channel`, `audience`, and `goal` fields.
                For exact-copy work, send `copyroom_required: true` with `copyroom_source_packet` so missing source proof blocks instead of returning a null receipt.
                `copypass_status` returns the in-session verdict, deterministic findings, not-checked scope, disclaimer, and attached CopyRoom receipt.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-[#61C1C4]/20 bg-[#0f1516] p-5">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#61C1C4]" />
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold text-white">Exact-copy receipt rail</h2>
              <p className="mt-1 text-sm text-[#8fbec0]">
                Workers use CopyRoom packets when source text, labels, tables, or prompts must stay exact. The receipt
                records source and output pointers, matching hashes, byte counts, character counts, newline style, and
                `exact_diff=pass` before proof can be trusted.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-5">
                {RECEIPT_CHECKPOINTS.map((checkpoint) => (
                  <div
                    key={checkpoint}
                    className="rounded-md border border-[#61C1C4]/20 bg-black/20 px-2.5 py-2 text-center text-[11px] font-medium text-[#b6e2e4]"
                  >
                    {checkpoint}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-5">
          <div className="flex items-start gap-3">
            <MessagesSquare className="mt-0.5 h-5 w-5 shrink-0 text-[#61C1C4]" />
            <div>
              <h2 className="text-sm font-semibold text-white">Current review coverage</h2>
              <p className="mt-1 text-sm text-[#888]">
                CopyPass checks clarity, CTA presence, proof and trust gaps, unsupported superiority claims, detector-evasion
                positioning, risky guarantees, placeholder text, internal consistency, audience/tone fit, AI-slop language,
                social-proof evidence, human-authorship claims, urgency, and product-surface honesty.
                Exact-source jobs fail closed when source packets are missing or when output drifts from the packet.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-fuchsia-300" />
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
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-[#666]">
            Starter packs are MCP-triggered run scopes today. In-product launch controls can land after the MCP path stays proven.
          </p>
        </section>
      </div>
    </div>
  );
}
