// Registry of optional rich panels shown on an app's detail page (/apps/:slug),
// below the auto-generated info. Most apps need nothing here; an app with its own
// in-product experience registers a panel so clicking it in the library opens the
// app "as intended". Keyed by app slug.

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Cable, ExternalLink, Terminal, Wrench } from "lucide-react";

export type AppDetailExtra = () => ReactNode;

function JobsmithPanel(): ReactNode {
  return (
    <div className="rounded-xl border border-[#61C1C4]/20 bg-[#61C1C4]/[0.05] p-5">
      <div className="flex items-center gap-2">
        <Wrench className="h-4 w-4 text-[#61C1C4]" />
        <p className="text-sm font-semibold text-white">Open the full JobSmith workspace</p>
      </div>
      <p className="mt-1.5 text-xs leading-5 text-white/55">
        JobSmith is more than the check tool your AI calls. The full workspace lets you ingest your
        past CVs, build a voice profile, and draft tailored cover letters and CVs. Your AI can run the
        same quality checks any time with the jobsmith_check tool.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          to="/jobsmith"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#61C1C4]/30 bg-[#61C1C4]/10 px-3 py-1.5 text-xs font-semibold text-[#9be4e6] transition-colors hover:bg-[#61C1C4]/15"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Open JobSmith
        </Link>
      </div>
    </div>
  );
}

function CommandStack({ label, commands }: { label: string; commands: string[] }): ReactNode {
  return (
    <div className="border-t border-white/[0.06] pt-3 first:border-t-0 first:pt-0">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-white/35">{label}</p>
      <div className="mt-2 space-y-1.5">
        {commands.map((command) => (
          <code
            key={command}
            className="block overflow-x-auto rounded-md border border-white/[0.06] bg-black/25 px-3 py-2 font-mono text-[11px] text-white/70"
          >
            {command}
          </code>
        ))}
      </div>
    </div>
  );
}

function HiggsfieldPanel(): ReactNode {
  return (
    <div className="rounded-xl border border-[#B8FF00]/25 bg-[#B8FF00]/[0.04] p-5">
      <div className="flex items-center gap-2">
        <Cable className="h-4 w-4 text-[#B8FF00]" />
        <p className="text-sm font-semibold text-white">Higgsfield setup options</p>
      </div>
      <p className="mt-1.5 text-xs leading-5 text-white/55">
        There are two separate ways to use Higgsfield. Connect an API key in UnClick when
        you want UnClick to route Higgsfield actions. Add Higgsfield's hosted MCP directly
        when you want Claude or another client to talk to Higgsfield without going through
        UnClick. Both paths use your Higgsfield account, with credits, subscription, and
        billing managed by Higgsfield.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <CommandStack
            label="UnClick app connection"
            commands={[
              "Create a Higgsfield Cloud API key",
              "https://cloud.higgsfield.ai/api-keys",
              "Paste it in Apps to mark Higgsfield connected in UnClick",
            ]}
          />
          <CommandStack
            label="Higgsfield hosted MCP"
            commands={[
              "Name: Higgsfield",
              "URL: https://mcp.higgsfield.ai/mcp",
              "Connect, then sign in with your Higgsfield account",
            ]}
          />
        </div>
        <div className="space-y-3">
          <CommandStack
            label="CLI and skills"
            commands={[
              "npm install -g @higgsfield/cli",
              "higgsfield auth login",
              "npx skills add higgsfield-ai/skills",
              "/higgsfield:generate",
            ]}
          />
          <CommandStack
            label="OpenClaw"
            commands={[
              "openclaw skills install higgsfield-generate",
              "higgsfield auth login",
              "https://clawhub.ai/user/higgsfield",
            ]}
          />
          <CommandStack
            label="Hermes or Cursor"
            commands={[
              "npm install -g @higgsfield/cli",
              "higgsfield auth login",
              "npx skills add higgsfield-ai/skills",
            ]}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="https://cloud.higgsfield.ai/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#B8FF00]/30 bg-[#B8FF00]/10 px-3 py-1.5 text-xs font-semibold text-[#D6FF57] transition-colors hover:bg-[#B8FF00]/15"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Get API key
        </a>
        <a
          href="https://higgsfield.ai/mcp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/65 transition-colors hover:bg-white/[0.07]"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Hosted MCP guide
        </a>
        <a
          href="https://higgsfield.ai/cli"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/65 transition-colors hover:bg-white/[0.07]"
        >
          <Terminal className="h-3.5 w-3.5" /> CLI guide
        </a>
      </div>
    </div>
  );
}

export const APP_DETAIL_EXTRAS: Record<string, AppDetailExtra> = {
  higgsfield: HiggsfieldPanel,
  jobsmith: JobsmithPanel,
};
