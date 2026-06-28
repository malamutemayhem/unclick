import { useCallback, useEffect, useMemo, useState } from "react";
import { Code2, RefreshCw, Search } from "lucide-react";
import EmptyState from "./EmptyState";

interface CodeDump {
  id: string;
  session_id: string;
  language?: string | null;
  filename?: string | null;
  content: string;
  description?: string | null;
  created_at: string;
}

interface CodeResponse {
  data?: CodeDump[];
  auto_capture?: {
    code?: boolean;
    library?: boolean;
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function lineCount(content: string): number {
  if (!content) return 0;
  return content.split(/\r?\n/).length;
}

function preview(content: string): string {
  const trimmed = content.trim();
  if (trimmed.length <= 900) return trimmed;
  return `${trimmed.slice(0, 900).trimEnd()}...`;
}

export default function CodeTab({ apiKey }: { apiKey: string }) {
  const [items, setItems] = useState<CodeDump[]>([]);
  const [autoCapture, setAutoCapture] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/memory-admin?action=code", {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (res.ok) {
        const body = (await res.json()) as CodeResponse;
        setItems(body.data ?? []);
        setAutoCapture(Boolean(body.auto_capture?.code));
      }
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) =>
      [
        item.description,
        item.filename,
        item.language,
        item.session_id,
        item.content,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q)),
    );
  }, [items, query]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 animate-pulse rounded-lg border border-white/[0.06] bg-white/[0.03]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.03] p-3">
        <div>
          <p className="text-xs font-semibold text-white/70">
            Automatic code capture is {autoCapture ? "on" : "off"}
          </p>
          <p className="mt-1 text-xs text-white/40">
            Captures useful user-pasted fenced code blocks with a short reference title.
          </p>
        </div>
        <button
          type="button"
          onClick={load}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:text-white"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh
        </button>
      </div>

      {items.length > 0 && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search code titles, sessions, or content..."
            className="w-full rounded-lg border border-white/[0.06] bg-white/[0.03] py-2 pl-9 pr-3 text-sm text-white placeholder:text-white/30 focus:border-[#61C1C4]/50 focus:outline-none"
          />
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState
          icon={Code2}
          heading="No code captured yet"
          description={
            autoCapture
              ? "When a user pastes a useful fenced code block, it will appear here automatically."
              : "The Code store exists, but automatic capture is off in this environment."
          }
          steps={
            autoCapture
              ? ["Paste fenced code in a conversation", "UnClick stores it with a title", "Open it here when a later AI needs exact context"]
              : ["Turn on MEMORY_CODE_AUTOCAPTURE_ENABLED", "Paste fenced code in a conversation", "Captured code will appear in this tab"]
          }
        />
      ) : filtered.length === 0 ? (
        <p className="px-4 py-8 text-center text-xs text-white/40">No code matches your search.</p>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <article key={item.id} className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-white">
                    {item.description || item.filename || `${item.language || "code"} snippet`}
                  </h3>
                  <div className="mt-1 flex flex-wrap gap-2 text-[10px] text-white/35">
                    <span>{item.language || "unknown"}</span>
                    {item.filename && <span>{item.filename}</span>}
                    <span>{lineCount(item.content)} lines</span>
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>
                <span className="rounded bg-white/[0.06] px-2 py-1 text-[10px] text-white/40">
                  {item.session_id}
                </span>
              </div>
              <pre className="mt-3 max-h-56 overflow-auto rounded-md border border-white/[0.06] bg-black/20 p-3 text-xs leading-relaxed text-white/60">
                <code className="whitespace-pre-wrap break-words">{preview(item.content)}</code>
              </pre>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
