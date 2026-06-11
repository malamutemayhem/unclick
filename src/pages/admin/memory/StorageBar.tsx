import { Database, FileText } from "lucide-react";

interface StorageBarProps {
  storage: {
    business_context: number;
    knowledge_library: number;
    session_summaries: number;
    extracted_facts: number;
    conversation_log: number;
    code_dumps: number;
    total: number;
  } | null;
  loading: boolean;
}

export default function StorageBar({ storage, loading }: StorageBarProps) {
  if (loading) {
    return (
      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="h-20 animate-pulse rounded-lg bg-white/[0.03] border border-white/[0.06]" />
        <div className="h-20 animate-pulse rounded-lg bg-white/[0.03] border border-white/[0.06]" />
      </div>
    );
  }

  if (!storage) return null;

  return (
    <div className="mb-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Total records */}
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Database className="h-3.5 w-3.5" />
            Total Memory Records
          </div>
          <p className="mt-1 text-2xl font-semibold text-white">{storage.total.toLocaleString()}</p>
          <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-white/40">
            <span>{storage.business_context} context</span>
            <span>{storage.knowledge_library} library</span>
            <span>{storage.session_summaries} sessions</span>
            <span>{storage.conversation_log} messages</span>
            <span>{storage.code_dumps} code</span>
          </div>
        </div>

        {/* Facts usage */}
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <FileText className="h-3.5 w-3.5" />
            Extracted Facts
          </div>
          <p className="mt-1 text-2xl font-semibold text-white">
            {storage.extracted_facts.toLocaleString()}
          </p>
          <p className="mt-1 text-[10px] text-white/30">Active facts extracted from your sessions</p>
        </div>
      </div>
    </div>
  );
}
