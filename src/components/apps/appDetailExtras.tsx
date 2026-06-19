// Registry of optional rich panels shown on an app's detail page (/apps/:slug),
// below the auto-generated info. Most apps need nothing here; an app with its own
// in-product experience registers a panel so clicking it in the library opens the
// app "as intended". Keyed by app slug.

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Cable, Database, ExternalLink, Rocket, Terminal, Wrench } from "lucide-react";

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
        <p className="text-sm font-semibold text-white">Higgsfield connection options</p>
      </div>
      <p className="mt-1.5 text-xs leading-5 text-white/55">
        Use the account login for Higgsfield MCP. It opens a Higgsfield sign-in window and uses the
        customer's own Higgsfield account, plan, and credits. A Cloud API key is separate and only needed
        for UnClick-run API actions.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <CommandStack
            label="Higgsfield MCP login"
            commands={[
              "Name: Higgsfield",
              "URL: https://mcp.higgsfield.ai/mcp",
              "Connect with Higgsfield from Apps",
            ]}
          />
          <CommandStack
            label="Subscription MCP"
            commands={[
              "No API key needed for the MCP path",
              "Uses your Higgsfield subscription or credits",
              "Managed by Higgsfield in your AI app",
            ]}
          />
          <CommandStack
            label="UnClick API actions"
            commands={[
              "Create a Higgsfield Cloud API key",
              "https://cloud.higgsfield.ai/api-keys",
              "Paste it only when you want UnClick to run Higgsfield actions",
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
        <Link
          to="/admin/apps?lens=signin"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#B8FF00]/30 bg-[#B8FF00]/10 px-3 py-1.5 text-xs font-semibold text-[#D6FF57] transition-colors hover:bg-[#B8FF00]/15"
        >
          <Cable className="h-3.5 w-3.5" /> Connect in Apps
        </Link>
        <a
          href="https://cloud.higgsfield.ai/api-keys"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/65 transition-colors hover:bg-white/[0.07]"
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

function VercelPanel(): ReactNode {
  return (
    <div className="rounded-xl border border-[#61C1C4]/25 bg-[#61C1C4]/[0.04] p-5">
      <div className="flex items-center gap-2">
        <Rocket className="h-4 w-4 text-[#61C1C4]" />
        <p className="text-sm font-semibold text-white">Vercel setup options</p>
      </div>
      <p className="mt-1.5 text-xs leading-5 text-white/55">
        There are two separate ways to use Vercel. Connect with Vercel login in
        UnClick when you want UnClick to run Vercel actions for that account.
        Add Vercel's hosted MCP directly when you want Claude or another client
        to talk to Vercel without going through UnClick. Both paths use your
        Vercel account, with projects, team permissions, and billing managed by Vercel.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <CommandStack
            label="UnClick app connection"
            commands={[
              "Open Apps > Vercel > Connect",
              "Sign in with your Vercel account",
              "Return to UnClick with Vercel marked Connected",
            ]}
          />
          <CommandStack
            label="Vercel hosted MCP"
            commands={[
              "Name: Vercel",
              "URL: https://mcp.vercel.com",
              "Authentication: OAuth",
              "Sign in with your Vercel account",
            ]}
          />
        </div>
        <div className="space-y-3">
          <CommandStack
            label="CLI clients"
            commands={[
              "npx add-mcp https://mcp.vercel.com",
              "codex mcp add vercel --url https://mcp.vercel.com",
              "claude mcp add --transport http vercel https://mcp.vercel.com",
            ]}
          />
          <CommandStack
            label="Safety"
            commands={[
              "Keep human confirmation on for deploys, env changes, and deletes",
              "Use Vercel app permissions to limit what UnClick can touch",
            ]}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="/connect/vercel"
          className="inline-flex items-center gap-1.5 rounded-md border border-[#61C1C4]/30 bg-[#61C1C4]/10 px-3 py-1.5 text-xs font-semibold text-[#9be4e6] transition-colors hover:bg-[#61C1C4]/15"
        >
          <Cable className="h-3.5 w-3.5" /> Connect in UnClick
        </a>
        <a
          href="https://vercel.com/docs/agent-resources/vercel-mcp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/65 transition-colors hover:bg-white/[0.07]"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Hosted MCP guide
        </a>
      </div>
    </div>
  );
}

function SupabasePanel(): ReactNode {
  return (
    <div className="rounded-xl border border-emerald-300/25 bg-emerald-300/[0.04] p-5">
      <div className="flex items-center gap-2">
        <Database className="h-4 w-4 text-emerald-300" />
        <p className="text-sm font-semibold text-white">Supabase setup options</p>
      </div>
      <p className="mt-1.5 text-xs leading-5 text-white/55">
        There are two separate ways to use Supabase. Connect with Supabase login
        in UnClick when you want UnClick-side workflows to use that account's
        Management API access. Add Supabase's hosted MCP directly when you want a
        developer MCP client to inspect or manage Supabase through Supabase sign-in.
        Keep production scoped tightly, and use read-only hosted MCP settings wherever possible.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <CommandStack
            label="UnClick app connection"
            commands={[
              "Open Apps > Supabase > Connect",
              "Sign in with your Supabase account",
              "Return to UnClick with Supabase marked Connected",
            ]}
          />
          <CommandStack
            label="Supabase hosted MCP"
            commands={[
              "Name: Supabase",
              "URL: https://mcp.supabase.com/mcp",
              "Recommended: ?project_ref=YOUR_REF&read_only=true",
              "Sign in with your Supabase account",
            ]}
          />
        </div>
        <div className="space-y-3">
          <CommandStack
            label="Scoped hosted MCP URLs"
            commands={[
              "https://mcp.supabase.com/mcp?project_ref=YOUR_REF&read_only=true",
              "https://mcp.supabase.com/mcp?features=database,docs",
              "Do not hand a developer MCP connection to app customers",
            ]}
          />
          <CommandStack
            label="CLI clients"
            commands={[
              "claude mcp add --scope project --transport http supabase \"https://mcp.supabase.com/mcp\"",
            ]}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href="/connect/supabase"
          className="inline-flex items-center gap-1.5 rounded-md border border-emerald-300/30 bg-emerald-300/10 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition-colors hover:bg-emerald-300/15"
        >
          <Cable className="h-3.5 w-3.5" /> Connect in UnClick
        </a>
        <a
          href="https://supabase.com/docs/guides/ai-tools/mcp"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/65 transition-colors hover:bg-white/[0.07]"
        >
          <ExternalLink className="h-3.5 w-3.5" /> Hosted MCP guide
        </a>
      </div>
    </div>
  );
}

export const APP_DETAIL_EXTRAS: Record<string, AppDetailExtra> = {
  higgsfield: HiggsfieldPanel,
  jobsmith: JobsmithPanel,
  supabase: SupabasePanel,
  vercel: VercelPanel,
};
