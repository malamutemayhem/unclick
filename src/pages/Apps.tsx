import PageShell from "../components/PageShell";
import FadeIn from "../components/FadeIn";
import { useCanonical } from "../hooks/use-canonical";
import { useMetaTags } from "../hooks/useMetaTags";
import { presets } from "../lib/design-system";
import { APP_CATALOG } from "@/lib/appCatalog";
import { getAppTestResult } from "@/lib/appTestResults";
import { AppsTable } from "@/components/apps/AppsTable";

// Apps with a verified live failure (AppTesting status "fail") are kept out of
// the public store until they pass a retest. Needs-key apps stay listed; every
// excluded app remains visible with its failure note in admin AppTesting.
const LIVE_APPS = APP_CATALOG.filter((a) => getAppTestResult(a.slug).status !== "fail");
const LIVE_APP_COUNT = LIVE_APPS.length;
const LIVE_TOOL_COUNT = LIVE_APPS.reduce((n, a) => n + a.toolCount, 0);

// Super-simple-English induction so anyone gets what this page is in one read.
function HowItWorks() {
  const points = [
    { k: "One UnClick door", v: "Connect Claude, ChatGPT, Cursor, or Codex to UnClick once. They all reach the same app layer." },
    { k: "Apps live inside UnClick", v: "GitHub, Gmail, Spotify, and the rest connect to UnClick, not separately to every AI app." },
    { k: "Connect only when needed", v: "Built-in apps just work. Private apps ask for one login or key, then stay available." },
    { k: "You stay in control", v: "Turn any app off, reconnect it, or remove it without reinstalling UnClick in your AI app." },
  ];
  return (
    <div className="mx-auto mb-8 max-w-6xl rounded-2xl border border-[#61C1C4]/20 bg-[#61C1C4]/[0.05] p-5">
      <p className="text-sm font-semibold text-white">Your AI reaches apps through UnClick.</p>
      <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p) => (
          <div key={p.k}>
            <p className="text-xs font-semibold text-[#9be4e6]">{p.k}</p>
            <p className="mt-1 text-xs leading-5 text-white/55">{p.v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const Apps = () => {
  useCanonical("/apps");
  useMetaTags({
    title: "Apps. Every action your AI can reach.",
    description: `Browse ${LIVE_APP_COUNT} apps and ${LIVE_TOOL_COUNT} actions your AI can use. It picks the right one for you, or you can ask for one by name.`,
    ogTitle: "Apps. Every action your AI can reach.",
    ogDescription: "An app store for AI agents. Built-in apps work straight away; connect the rest once.",
    ogUrl: "https://unclick.world/apps",
  });

  return (
    <PageShell
      eyebrow="Apps"
      title="Every action your AI can reach."
      accent="One install."
      lede={`${LIVE_APP_COUNT} apps · ${LIVE_TOOL_COUNT} actions. Your AI picks the right one, or you can ask for one by name.`}
      cta={{ label: "Get started", href: "/#install" }}
    >
      <section className={presets.section}>
        <FadeIn>
          <HowItWorks />
          <div className="mx-auto max-w-6xl">
            <AppsTable apps={LIVE_APPS} mode="public" />
          </div>
        </FadeIn>
      </section>
    </PageShell>
  );
};

export default Apps;
