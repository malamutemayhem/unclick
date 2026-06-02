// Registry of optional rich panels shown on an app's detail page (/apps/:slug),
// below the auto-generated info. Most apps need nothing here; an app with its own
// in-product experience registers a panel so clicking it in the library opens the
// app "as intended". Keyed by app slug.

import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, Wrench } from "lucide-react";

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
        <Link
          to="/admin/jobsmith"
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold text-white/60 transition-colors hover:bg-white/[0.07]"
        >
          Manage in admin
        </Link>
      </div>
    </div>
  );
}

export const APP_DETAIL_EXTRAS: Record<string, AppDetailExtra> = {
  jobsmith: JobsmithPanel,
};
