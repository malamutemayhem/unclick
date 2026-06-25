import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Download,
  ExternalLink,
  Eye,
  Gauge,
  MousePointerClick,
  Puzzle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useCanonical } from "@/hooks/use-canonical";
import { useMetaTags } from "@/hooks/useMetaTags";

// Beta distribution: app installers publish to GitHub Releases; the extension
// is loaded from the repo until the Chrome Web Store listing is live. Real
// links, nothing fake, nothing that 404s.
const APP_RELEASES_URL = "https://github.com/malamutemayhem/unclick/releases";
const EXTENSION_URL =
  "https://github.com/malamutemayhem/unclick/tree/main/packages/browser-extension";

const WHY = [
  {
    title: "Fast",
    body: "Stripped to the core. No ad scripts, no clutter, cached after the first visit.",
    icon: Gauge,
  },
  {
    title: "Consistent",
    body: "Every website looks the same. Easy reading, light or dark, your settings.",
    icon: Eye,
  },
  {
    title: "AI native",
    body: "Built so your AI feels at home. Memory and tools are one step away on every page.",
    icon: Sparkles,
  },
];

const STEPS = [
  {
    title: "Open any page",
    body: "Browse like normal. The address bar takes a link, a question, or an instruction.",
    icon: MousePointerClick,
  },
  {
    title: "It cleans the page",
    body: "Every site is rebuilt into one calm, fast, consistent format. Same look everywhere.",
    icon: Sparkles,
  },
  {
    title: "Your AI can read and act",
    body: "The same clean page your eyes read is the page your agent reads. No scraping.",
    icon: ShieldCheck,
  },
];

function useDownloadLabel(): string {
  const [label, setLabel] = useState("Download");
  useEffect(() => {
    const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
    if (/Mac/i.test(ua)) setLabel("Download for Mac");
    else if (/Win/i.test(ua)) setLabel("Download for Windows");
    else if (/Linux|X11/i.test(ua)) setLabel("Download for Linux");
  }, []);
  return label;
}

export default function UnClickBrowserPage() {
  useCanonical("/browser");
  useMetaTags({
    title: "UnClick Browser - Agent native web browser, humans welcome",
    description:
      "A fast, calm, consistent browser. Every site rebuilt into one clean format your AI can read and act on. Plus the UnClick browser extension.",
    ogTitle: "UnClick Browser",
    ogDescription:
      "Agent native web browser, humans welcome. Fast, calm, consistent, and easy to read.",
    ogUrl: "https://unclick.world/browser",
  });

  const downloadLabel = useDownloadLabel();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="overflow-hidden">
        {/* Hero */}
        <section className="px-4 pt-28 sm:px-6">
          <div className="mx-auto flex min-h-[72svh] max-w-5xl flex-col justify-center">
            <FadeIn>
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                UnClick / Browser
              </div>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="mt-8 max-w-3xl text-5xl font-semibold tracking-tight text-heading sm:text-6xl">
                The web, calm.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-body sm:text-xl">
                UnClick Browser rebuilds every site into one fast, consistent, easy to read format.
                Built so your AI feels at home, and humans are welcome too.
              </p>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={APP_RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <Download className="h-4 w-4" />
                  {downloadLabel}
                </a>
                <a
                  href={EXTENSION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-md border border-border bg-background/70 px-5 text-sm font-medium text-heading transition-colors hover:bg-card"
                >
                  <Puzzle className="h-4 w-4" />
                  Get the extension
                </a>
              </div>
              <p className="mt-3 text-xs text-muted-custom">
                Free while UnClick is in beta. Builds publish to GitHub Releases.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Why */}
        <section className="border-y border-border bg-card/25 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
              <h2 className="text-sm font-semibold text-heading">
                Nothing fancy. Just the core, done well.
              </h2>
              <p className="mt-3 text-sm leading-7 text-body">
                One format for every website. Text, images, tables, the things that matter. Stripped
                of the noise, the same everywhere you go.
              </p>
            </div>

            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {WHY.map((item) => (
                <div key={item.title} className="rounded-lg border border-border bg-background/70 p-4">
                  <item.icon className="h-5 w-5 text-primary" />
                  <p className="mt-3 text-base font-semibold text-heading">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-body">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Two ways in */}
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-sm font-semibold text-heading">Two ways in</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-body">
              Use the full browser, or add the extension to the browser you already have.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="flex flex-col rounded-lg border border-border bg-card/30 p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Download className="h-5 w-5" />
                </div>
                <p className="mt-4 text-lg font-semibold text-heading">UnClick Browser</p>
                <p className="mt-2 flex-1 text-sm leading-6 text-body">
                  The full app for Mac, Windows, and Linux. The fast, calm reading surface with your
                  AI built in.
                </p>
                <a
                  href={APP_RELEASES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {downloadLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="flex flex-col rounded-lg border border-border bg-card/30 p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Puzzle className="h-5 w-5" />
                </div>
                <p className="mt-4 text-lg font-semibold text-heading">Browser extension</p>
                <p className="mt-2 flex-1 text-sm leading-6 text-body">
                  Keep your browser. The extension lets your AI read and act on the sites you are
                  already logged into. It learns how sites work, never what you do on them.
                </p>
                <a
                  href={EXTENSION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex min-h-11 items-center gap-2 self-start rounded-md border border-border bg-background/70 px-5 text-sm font-medium text-heading transition-colors hover:bg-card"
                >
                  Get the extension
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-y border-border bg-card/25 px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-sm font-semibold text-heading">How it works</h2>
            <div className="mt-8 grid gap-3 md:grid-cols-3">
              {STEPS.map((step, i) => (
                <div key={step.title} className="rounded-lg border border-border bg-background/70 p-5">
                  <div className="flex items-center gap-2 text-xs font-medium text-primary">
                    <step.icon className="h-4 w-4" />
                    Step {i + 1}
                  </div>
                  <p className="mt-3 text-base font-semibold text-heading">{step.title}</p>
                  <p className="mt-2 text-sm leading-6 text-body">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-lg border border-border bg-card/30 p-6 sm:p-8">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <h2 className="text-sm font-semibold text-heading">
                  It learns how sites are built, never what you do on them
                </h2>
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-body">
                The browser and the extension only ever keep the shape of a page: the structure, not
                your values. Your data is stripped on your own device before anything leaves it. You
                can see exactly what was kept, and switch any of it off. Same trust rule the rest of
                UnClick runs on.
              </p>
              <Link
                to="/xpass"
                className="mt-5 inline-flex min-h-8 items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
              >
                How UnClick proves its work
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
