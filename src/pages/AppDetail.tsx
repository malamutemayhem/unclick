import { Link, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, KeyRound, Sparkles } from "lucide-react";
import PageShell from "../components/PageShell";
import FadeIn from "../components/FadeIn";
import { useCanonical } from "../hooks/use-canonical";
import { useMetaTags } from "../hooks/useMetaTags";
import { presets } from "../lib/design-system";
import { actionLabel, getApp, levelLabel, NETWORK_META } from "@/lib/appCatalog";
import { getAppTestResult } from "@/lib/appTestResults";
import { AppIcon } from "@/components/apps/AppIcon";
import { APP_DETAIL_EXTRAS } from "@/components/apps/appDetailExtras";

const AppDetail = () => {
  const { slug = "" } = useParams();
  const app = getApp(slug);

  useCanonical(`/apps/${slug}`);
  useMetaTags({
    title: app ? `${app.name}. ${app.blurb}` : "App not found",
    description: app
      ? `${app.name}: ${app.blurb} ${app.toolCount} actions your AI can use.`
      : "That app does not exist in the UnClick library.",
    ogUrl: `https://unclick.world/apps/${slug}`,
  });

  if (!app) {
    return (
      <PageShell eyebrow="Apps" title="App not found" lede="That app is not in the library.">
        <section className={presets.section}>
          <div className="mx-auto max-w-3xl text-center">
            <Link to="/apps" className="text-sm font-medium text-[#9be4e6] hover:underline">
              Browse all apps
            </Link>
          </div>
        </section>
      </PageShell>
    );
  }

  const Extra = APP_DETAIL_EXTRAS[app.slug];
  const quality = levelLabel(app.level);
  // Failing apps are hidden from the store list, but deep links still resolve.
  // Be upfront here instead of pretending the app works.
  const testResult = getAppTestResult(app.slug);
  const usesHostedMcpSetup = app.slug === "higgsfield";

  return (
    <PageShell eyebrow={app.category} title={app.name} lede={app.blurb} halo={false}>
      <section className={presets.section}>
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <Link to="/apps" className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-white/45 hover:text-white/70">
              <ArrowLeft className="h-3.5 w-3.5" /> All apps
            </Link>

            <div className="flex items-center gap-3">
              <AppIcon name={app.name} category={app.category} domain={app.domain} slug={app.slug} size={40} />
              <div>
                <h2 className="text-xl font-semibold text-white">{app.name}</h2>
                <p className="text-xs text-white/45">
                  {app.category} · {app.toolCount} actions
                  <span
                    title={NETWORK_META[app.network].description}
                    className="ml-2 inline-flex items-center rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] font-medium text-white/55"
                  >
                    {NETWORK_META[app.network].label}
                  </span>
                  {quality === "Smart" && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded border border-[#61C1C4]/25 bg-[#61C1C4]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#9be4e6]">
                      <Sparkles className="h-3 w-3" /> Smart
                    </span>
                  )}
                </p>
              </div>
            </div>

            {testResult.status === "fail" && (
              <div className="mt-6 flex items-start gap-2 rounded-xl border border-red-400/25 bg-red-400/[0.07] p-4 text-xs leading-5 text-red-100">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" />
                <span>
                  {app.name} is currently not working: its last live test failed, so it is hidden from the
                  Apps store until a retest passes. Your AI will not rely on it in the meantime.
                </span>
              </div>
            )}

            {/* How your AI uses it - super simple English */}
            <div className="mt-6 rounded-2xl border border-[#61C1C4]/20 bg-[#61C1C4]/[0.05] p-5">
              <p className="text-sm font-semibold text-white">How your AI uses {app.name}</p>
              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-white/55">
                <li>Your AI talks to UnClick. UnClick reaches {app.name} when the request fits.</li>
                <li>Or name it: say "use {app.name}" and UnClick routes the request there.</li>
                <li>Turn it off in your admin Apps page any time without reinstalling UnClick.</li>
              </ul>
            </div>

            {/* Actions - what this app can do */}
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-white">
                Actions <span className="text-white/40">- what {app.name} can do</span>
              </h3>
              <div className="divide-y divide-white/[0.05] rounded-xl border border-white/[0.07]">
                {app.tools.map((t) => (
                  <div key={t.name} className="px-4 py-2.5">
                    <p className="text-xs font-medium text-white/85">{actionLabel(t)}</p>
                    <code className="mt-0.5 block font-mono text-[11px] text-white/30">{t.name}</code>
                    <p className="mt-0.5 text-xs leading-5 text-white/50">{t.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection */}
            <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-[#E2B93B]" />
                <p className="text-sm font-semibold text-white">Connection</p>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-white/55">
                {usesHostedMcpSetup
                  ? `${app.name}'s hosted MCP setup happens with ${app.name}. Open Apps to see the setup guide, or add an API key for UnClick-routed actions. It only shows as connected when UnClick has a verified connection it can see.`
                  : `Most apps work straight away with nothing to set up. If ${app.name} needs your account, manage it from Apps; UnClick shows the status it can verify.`}
              </p>
              <Link
                to="/admin/apps"
                className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-[#E2B93B]/30 bg-[#E2B93B]/10 px-3 py-1.5 text-xs font-semibold text-[#f0d577] transition-colors hover:bg-[#E2B93B]/15"
              >
                <KeyRound className="h-3.5 w-3.5" /> {usesHostedMcpSetup ? "Open Apps setup" : "Manage connections"}
              </Link>
            </div>

            {Extra && (
              <div className="mt-6">
                <Extra />
              </div>
            )}
          </FadeIn>
        </div>
      </section>
    </PageShell>
  );
};

export default AppDetail;
