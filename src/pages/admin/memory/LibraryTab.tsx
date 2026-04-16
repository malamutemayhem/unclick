import { useEffect, useState } from "react";
import { BookOpen, ChevronDown, ChevronRight, History } from "lucide-react";
import EmptyState from "./EmptyState";

interface LibraryDoc {
  id: string;
  slug: string;
  title: string;
  updated_at: string;
  version: number;
  decay_tier: string;
}

interface LibraryDocFull {
  id: string;
  slug: string;
  title: string;
  category: string;
  content: string;
  tags: string[] | null;
  version: number;
  decay_tier: string;
  created_at: string;
  updated_at: string;
}

interface LibraryHistoryEntry {
  id: string;
  slug: string;
  title: string;
  content: string;
  version: number;
  created_at: string;
}

const DECAY_COLORS: Record<string, { dot: string; text: string }> = {
  hot: { dot: "bg-red-500", text: "text-red-500" },
  warm: { dot: "bg-amber-500", text: "text-amber-500" },
  cold: { dot: "bg-blue-400", text: "text-blue-400" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function LibraryTab() {
  const [docs, setDocs] = useState<LibraryDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [fullDoc, setFullDoc] = useState<LibraryDocFull | null>(null);
  const [docLoading, setDocLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<LibraryHistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetch("/api/memory-admin?action=admin_library&method=list")
      .then((r) => r.json())
      .then((body) => {
        setDocs((body as { data: LibraryDoc[] }).data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const loadDoc = (doc: LibraryDoc) => {
    if (expandedId === doc.id) {
      setExpandedId(null);
      setFullDoc(null);
      setShowHistory(false);
      return;
    }
    setExpandedId(doc.id);
    setDocLoading(true);
    setShowHistory(false);
    fetch(`/api/memory-admin?action=admin_library&method=view&id=${encodeURIComponent(doc.id)}`)
      .then((r) => r.json())
      .then((body) => {
        setFullDoc((body as { data: LibraryDocFull }).data ?? null);
        setDocLoading(false);
      })
      .catch(() => setDocLoading(false));
  };

  const loadHistory = (slug: string) => {
    if (showHistory) {
      setShowHistory(false);
      return;
    }
    setShowHistory(true);
    setHistoryLoading(true);
    fetch(`/api/memory-admin?action=admin_library&method=history&slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((body) => {
        setHistory((body as { data: LibraryHistoryEntry[] }).data ?? []);
        setHistoryLoading(false);
      })
      .catch(() => setHistoryLoading(false));
  };

  if (loading) {
    return <div className="py-12 text-center text-xs text-white/40">Loading library...</div>;
  }

  if (docs.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        heading="Your knowledge library is empty"
        description="Documents and templates stored by your agent appear here. Use the upsert_library_doc tool to add reference material."
      />
    );
  }

  return (
    <div className="space-y-2">
      {docs.map((doc) => {
        const isExpanded = expandedId === doc.id;
        const decay = DECAY_COLORS[doc.decay_tier] ?? DECAY_COLORS.cold;

        return (
          <div
            key={doc.id}
            className="rounded-lg border border-white/[0.06] bg-white/[0.03]"
          >
            {/* Card header */}
            <button
              onClick={() => loadDoc(doc)}
              className="flex w-full items-center gap-3 p-4 text-left"
            >
              <span className="shrink-0 text-white/30">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{doc.title}</span>
                  <span className="font-mono text-[10px] text-white/30">{doc.slug}</span>
                </div>
                <div className="mt-1 flex items-center gap-3 text-[10px] text-white/40">
                  <span>v{doc.version}</span>
                  <span>{formatDate(doc.updated_at)}</span>
                  <span className="inline-flex items-center gap-1">
                    <span className={`h-2 w-2 rounded-full ${decay.dot}`} />
                    <span className={decay.text}>{doc.decay_tier}</span>
                  </span>
                </div>
              </div>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div className="border-t border-white/[0.06] px-4 pb-4 pt-3">
                {docLoading ? (
                  <div className="py-4 text-center text-xs text-white/40">Loading...</div>
                ) : fullDoc ? (
                  <>
                    {fullDoc.tags && fullDoc.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-1">
                        {fullDoc.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="rounded bg-[#E2B93B]/10 px-1.5 py-0.5 text-[10px] text-[#E2B93B]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <pre className="max-h-80 overflow-auto whitespace-pre-wrap rounded-lg bg-[#0A0A0A] p-4 font-mono text-xs text-white/70">
                      {fullDoc.content}
                    </pre>

                    <button
                      onClick={() => loadHistory(fullDoc.slug)}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-white/[0.06] px-3 py-1.5 text-xs text-white/50 transition-colors hover:border-[#E2B93B]/30 hover:text-[#E2B93B]"
                    >
                      <History className="h-3 w-3" />
                      {showHistory ? "Hide History" : "Version History"}
                    </button>

                    {showHistory && (
                      <div className="mt-3 space-y-2">
                        {historyLoading ? (
                          <div className="py-4 text-center text-xs text-white/40">
                            Loading history...
                          </div>
                        ) : history.length === 0 ? (
                          <div className="py-4 text-center text-xs text-white/40">
                            No previous versions found.
                          </div>
                        ) : (
                          history.map((entry) => (
                            <div
                              key={entry.id}
                              className="rounded-lg border border-white/[0.06] bg-[#0A0A0A] p-3"
                            >
                              <div className="mb-2 flex items-center gap-2 text-[10px] text-white/40">
                                <span className="font-medium text-white/60">
                                  v{entry.version}
                                </span>
                                <span>{formatDate(entry.created_at)}</span>
                              </div>
                              <pre className="max-h-40 overflow-auto whitespace-pre-wrap font-mono text-xs text-white/50">
                                {entry.content}
                              </pre>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="py-4 text-center text-xs text-white/40">
                    Failed to load document.
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
