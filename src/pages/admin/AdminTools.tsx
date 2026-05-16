import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, GitFork, PenSquare, Rocket, ShieldCheck, Wrench } from "lucide-react";
import { useSession } from "@/lib/auth";
import {
  CURATED_SKILL_PREVIEWS,
  SKILL_LIBRARY_CATEGORIES,
  type SkillRiskState,
} from "@/lib/communityTools";
import { InfoCard } from "./memory/InfoCard";
import UnClickTools from "./tools/UnClickTools";
import ConnectedServices from "./tools/ConnectedServices";
import { AdminAppsIntro } from "./AdminEcosystemPages";

interface Connector {
  id: string;
  name: string;
  icon?: string;
  category?: string;
  auth_type?: "oauth2" | "api_key" | "bot_token";
  description?: string | null;
  setup_url?: string | null;
  test_endpoint?: string | null;
  credential: { is_valid: boolean; last_tested_at: string | null } | null;
}

const RISK_STATE_STYLES: Record<SkillRiskState, string> = {
  quarantined: "bg-amber-400/10 text-amber-200",
  reviewed: "bg-sky-400/10 text-sky-200",
  "native-ready": "bg-emerald-400/10 text-emerald-200",
};

const RISK_STATE_LABELS: Record<SkillRiskState, string> = {
  quarantined: "Quarantined",
  reviewed: "Reviewed",
  "native-ready": "Native ready",
};

function SkillsLibraryPreview() {
  return (
    <div className="md:col-span-2">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#61C1C4]" />
            <h3 className="text-sm font-semibold text-white">Skills Library</h3>
            <span className="rounded bg-[#61C1C4]/15 px-1.5 py-0.5 text-[10px] font-medium text-[#61C1C4]">
              Curated
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-xs leading-5 text-white/50">
            AgentSkills-compatible packages can be previewed, quarantined, and rebuilt as native UnClick skills. OpenClaw and similar ecosystems are discovery inputs, not trust authorities.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {SKILL_LIBRARY_CATEGORIES.map((category) => (
            <span key={category} className="rounded bg-white/[0.04] px-2 py-1 text-[10px] font-medium text-white/50">
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {CURATED_SKILL_PREVIEWS.map((skill) => (
          <article key={skill.id} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-white">{skill.name}</p>
                <p className="mt-1 text-[11px] font-medium text-[#61C1C4]">{skill.source}</p>
              </div>
              <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${RISK_STATE_STYLES[skill.riskState]}`}>
                {RISK_STATE_LABELS[skill.riskState]}
              </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-white/45">{skill.description}</p>

            <dl className="mt-4 space-y-2 text-[11px] text-white/40">
              <div>
                <dt className="font-medium text-white/60">Provenance</dt>
                <dd>{skill.provenance}</dd>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <dt className="font-medium text-white/60">License</dt>
                  <dd>{skill.license}</dd>
                </div>
                <div>
                  <dt className="font-medium text-white/60">Version</dt>
                  <dd>{skill.version}</dd>
                </div>
                <div>
                  <dt className="font-medium text-white/60">Hash</dt>
                  <dd>{skill.contentHash}</dd>
                </div>
              </div>
              <div>
                <dt className="font-medium text-white/60">Permissions</dt>
                <dd>{skill.permissions.join(", ")}</dd>
              </div>
            </dl>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                disabled
                aria-label={`Preview ${skill.name}`}
                className="inline-flex items-center gap-1 rounded border border-white/[0.08] px-2 py-1 text-[11px] font-medium text-white/50"
              >
                <Eye className="h-3 w-3" />
                Preview
              </button>
              <button
                type="button"
                disabled
                aria-label={`Install ${skill.name}`}
                className="inline-flex items-center gap-1 rounded border border-white/[0.08] px-2 py-1 text-[11px] font-medium text-white/50"
              >
                <Rocket className="h-3 w-3" />
                Install
              </button>
              <button
                type="button"
                disabled
                aria-label={`Fork ${skill.name}`}
                className="inline-flex items-center gap-1 rounded border border-white/[0.08] px-2 py-1 text-[11px] font-medium text-white/50"
              >
                <GitFork className="h-3 w-3" />
                Fork
              </button>
            </div>

            <p className="mt-3 text-[11px] font-medium text-white/35">{skill.installState}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export default function AdminToolsPage() {
  const [metering, setMetering] = useState<Record<string, { count: number }>>({});
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [loading, setLoading] = useState(true);

  const { session } = useSession();

  useEffect(() => {
    if (!session) {
      queueMicrotask(() => setLoading(false));
      return;
    }
    (async () => {
      try {
        const res = await fetch("/api/memory-admin?action=admin_tools", {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        if (res.ok) {
          const body = await res.json();
          setMetering(body.metering ?? {});
          setConnectors(body.connectors ?? []);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [session]);

  if (!session) {
    return (
      <p className="text-sm text-white/50">
        Sign in to access Tools Admin.
      </p>
    );
  }

  return (
    <>
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#61C1C4]/10">
            <Wrench className="h-5 w-5 text-[#61C1C4]" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Apps</h1>
            <p className="text-sm text-white/50">Everything UnClick can use</p>
          </div>
        </div>

        <AdminAppsIntro />

        {/* Section 1 - Your UnClick Tools */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-white">Built-In</h2>
          <InfoCard
            id="tools-how"
            title="Ready to use"
            description="These apps are available naturally through UnClick. Your AI can use the recommended built-in option without asking you to connect anything."
            learnMore="Memory tools handle persistent context. Utility tools handle everyday tasks like formatting JSON, generating QR codes, converting timestamps. Your AI discovers and calls them as needed."
          />
          <UnClickTools metering={metering} />
        </section>

        {/* Section 2 - Connections */}
        <section className="mb-12">
          <h2 className="mb-4 text-lg font-semibold text-white">Connected</h2>
          <InfoCard
            id="tools-services"
            title="Apps you approved"
            description="Third-party platforms you have linked for your agents, like GitHub, Stripe, or Cloudflare."
            learnMore="Connected apps keep setup state, health, and encrypted secrets in Passport so your agents can use approved services without you pasting keys into every run."
          />
          <ConnectedServices connectors={connectors} loading={loading} />
        </section>

        {/* Section 3 - Marketplace */}
        <section>
          <h2 className="mb-4 text-lg font-semibold text-white">Marketplace</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <SkillsLibraryPreview />

            <Link
              to="/admin/copypass"
              className="rounded-xl border border-white/[0.06] bg-[#111] p-5 transition-colors hover:border-fuchsia-400/30 hover:bg-white/[0.04]"
            >
              <div className="flex items-center gap-2">
                <PenSquare className="h-4 w-4 text-fuchsia-300" />
                <h3 className="text-sm font-semibold text-white">CopyPass</h3>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-medium bg-fuchsia-500/10 text-fuchsia-300">
                  XPass
                </span>
              </div>
              <p className="mt-2 text-xs text-white/50">
                Writing, messaging, and copy review checks.
              </p>
              <p className="mt-3 text-[11px] font-medium text-fuchsia-300">
                Open CopyPass →
              </p>
            </Link>

            <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-8 text-center">
              <Rocket className="mx-auto h-8 w-8 text-white/20 mb-3" />
              <p className="text-sm text-white/50">
                More apps, workers, templates, XPass checks, and private tools - coming soon.
              </p>
              <p className="mt-1 text-xs text-white/30">
                Build your own MCP tools or install from the UnClick marketplace.
              </p>
            </div>
          </div>
        </section>
    </>
  );
}
