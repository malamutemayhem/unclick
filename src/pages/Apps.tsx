import PageShell from "../components/PageShell";
import FadeIn from "../components/FadeIn";
import { useCanonical } from "../hooks/use-canonical";
import { useMetaTags } from "../hooks/useMetaTags";
import { presets } from "../lib/design-system";
import { APP_CATALOG, APP_COUNT, TOOL_COUNT } from "@/lib/appCatalog";
import { AppsTable } from "@/components/apps/AppsTable";

// Super-simple-English induction so anyone gets what this page is in one read.
function HowItWorks() {
  const points = [
    { k: "It picks for you", v: "Ask your AI something like \"what's the weather\" or \"is my site up\". It finds the right app and uses it. You do not pick." },
    { k: "Or name one", v: "Want a specific app? Just say it: \"use GitHub\". Your AI reaches for that one." },
    { k: "Built-in apps just work", v: "Most apps need no setup. A few need you to connect once with a login or key." },
    { k: "You stay in control", v: "All apps are on by default. Turn any of them off in your admin so your AI leaves it alone." },
  ];
  return (
    <div className="mx-auto mb-8 max-w-6xl rounded-2xl border border-[#61C1C4]/20 bg-[#61C1C4]/[0.05] p-5">
      <p className="text-sm font-semibold text-white">Your AI has these apps at arm's reach.</p>
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
    title: "Apps. Every tool your AI can reach.",
    description: `Browse ${APP_COUNT} apps and ${TOOL_COUNT} tools your AI can use. It picks the right one for you, or you can ask for one by name.`,
    ogTitle: "Apps. Every tool your AI can reach.",
    ogDescription: "An app store for AI agents. Built-in apps work straight away; connect the rest once.",
    ogUrl: "https://unclick.world/apps",
  });

  return (
    <PageShell
      eyebrow="Apps"
      title="Every tool your AI can reach."
      accent="One install."
      lede={`${APP_COUNT} apps. ${TOOL_COUNT} tools. Your AI picks the right one, or you can ask for one by name.`}
      cta={{ label: "Get started", href: "/#install" }}
    >
      <section className={presets.section}>
        <FadeIn>
          <HowItWorks />
          <div className="mx-auto max-w-6xl">
            <AppsTable apps={APP_CATALOG} mode="public" />
          </div>
        </FadeIn>
      </section>
    </PageShell>
  );
};

export default Apps;
