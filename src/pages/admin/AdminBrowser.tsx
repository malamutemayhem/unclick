import { Link } from "react-router-dom";
import { Download, ExternalLink, Globe, Puzzle, ShieldCheck } from "lucide-react";

// Beta distribution: app builds publish to GitHub Releases; the extension is
// loaded from the repo until the Chrome Web Store listing is live.
const APP_RELEASES_URL = "https://github.com/malamutemayhem/unclick/releases";
const EXTENSION_URL =
  "https://github.com/malamutemayhem/unclick/tree/main/packages/browser-extension";

export default function AdminBrowser() {
  return (
    <div>
      <div className="mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#61C1C4]/30 bg-[#61C1C4]/10 px-3 py-1 text-xs font-medium text-[#61C1C4]">
          <Globe className="h-3.5 w-3.5" />
          UnClick Browser
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Browser</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-white/55">
          The UnClick Browser and the browser extension. Get the full app, or add the extension to
          the browser you already use.
        </p>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-[#61C1C4]/25 bg-[#61C1C4]/[0.06] p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#61C1C4]/15 text-[#61C1C4]">
            <Puzzle className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-white">Browser extension</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">
            Keep your browser. The extension lets your AI read and act on sites you are already
            logged into. It learns how sites are built, never what you do on them.
          </p>
          <a
            href={EXTENSION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-[#61C1C4] px-3 py-1.5 text-xs font-semibold text-black"
          >
            <Download className="h-3.5 w-3.5" />
            Get the extension
          </a>
          <p className="mt-3 text-xs text-white/45">
            Beta: load it unpacked from chrome://extensions. The Chrome Web Store listing comes next.
          </p>
        </section>

        <section className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.06] text-white">
            <Download className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-white">UnClick Browser app</h2>
          <p className="mt-2 text-sm leading-6 text-white/60">
            The full standalone browser for Mac, Windows, and Linux. Fast, calm, consistent, with
            your AI built in.
          </p>
          <a
            href={APP_RELEASES_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-md border border-white/10 px-3 py-1.5 text-xs font-semibold text-white/75 hover:bg-white/[0.04]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Download from Releases
          </a>
          <p className="mt-3 text-xs text-white/45">Beta builds publish to GitHub Releases.</p>
        </section>
      </div>

      <section className="rounded-2xl border border-white/[0.06] bg-[#111] p-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#61C1C4]" />
          <h2 className="text-sm font-semibold text-white">What it sees</h2>
        </div>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">
          Only the shape of a page: structure, not your values. Everything is stripped on your own
          device before it leaves. You can see what was kept and switch any of it off.
        </p>
        <Link
          to="/browser"
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-[#61C1C4] hover:opacity-80"
        >
          About the UnClick Browser
        </Link>
      </section>
    </div>
  );
}
