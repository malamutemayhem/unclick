import { Link, useParams } from "react-router-dom";
import { ArrowLeft, KeyRound, Sparkles } from "lucide-react";
import PageShell from "../components/PageShell";
import FadeIn from "../components/FadeIn";
import { useCanonical } from "../hooks/use-canonical";
import { useMetaTags } from "../hooks/useMetaTags";
import { presets } from "../lib/design-system";
import { actionLabel, getApp, levelLabel } from "@/lib/appCatalog";
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

  return (
    <PageShell eyebrow={app.category} title={app.name} lede={app.blurb} halo={false}>
      <section className={presets.section}>
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <Link to="/apps" className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-white/45 hover:text-white/70">
              <ArrowLeft className="h-3.5 w-3.5" /> All apps
            </Link>

            <div className="flex items-center gap-3">
              <AppIcon name={app.name} category={app.category} domain={app.domain} size={40} />
              <div>
                <h2 className="text-xl font-semibold text-white">{app.name}</h2>
                <p className="text-xs text-white/45">
                  {app.category} · {app.toolCount} actions
                  {quality === "Smart" && (
                    <span className="ml-2 inline-flex items-center gap-1 rounded border border-[#61C1C4]/25 bg-[#61C1C4]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#9be4e6]">
                      <Sparkles className="h-3 w-3" /> Smart
                    </span>
                  )}
                </p>
              </div>
            </div>

            {/* How your AI uses it - super simple English */}
            <div className="mt-6 rounded-2xl border border-[#61C1C4]/20 bg-[#61C1C4]/[0.05] p-5">
              <p className="text-sm font-semibold text-white">How your AI uses {app.name}</p>
              <ul className="mt-2 space-y-1.5 text-xs leading-5 text-white/55">
                <li>Ask in plain words and your AI picks {app.name} on its own when it fits.</li>
                <li>Or name it: say "use {app.name}" and your AI reaches for it.</li>
                <li>Turn it off in your admin Apps page any time to keep your AI away from it.</li>
              </ul>
            </div>

            {/* Actions — what this app can do */}
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-white">
                Actions <span className="text-white/40">— what {app.name} can do</span>
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

            {/* Connect it */}
            <div className="mt-6 rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-[#E2B93B]" />
                <p className="text-sm font-semibold text-white">Connect it</p>
              </div>
              <p className="mt-1.5 text-xs leading-5 text-white/55">
                Most apps work straight away with nothing to set up. If {app.name} needs a login or
                an API key, you add it once in Passport and your AI remembers it.
              </p>
              <Link
                to="/admin/keychain"
                className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-[#E2B93B]/30 bg-[#E2B93B]/10 px-3 py-1.5 text-xs font-semibold text-[#f0d577] transition-colors hover:bg-[#E2B93B]/15"
              >
                <KeyRound className="h-3.5 w-3.5" /> Open Passport
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
