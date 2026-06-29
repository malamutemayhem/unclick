// ============================================================
// ChatSessionList - the full-height sessions rail left of the chat.
//
// Lists this account's chat sessions (threads) from /api/chat-threads.
// Each session is endless; "New session" starts a fresh one. Sessions are
// auto-titled server-side from the first message; the pen icon renames,
// the pin keeps a session at the top, and trash deletes it.
// ============================================================

import { useState } from "react";
import { Plus, Pin, Pencil, Trash2, MessageSquare, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatThread {
  id: string;
  title: string;
  kind: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
}

export function ChatSessionList({
  threads,
  activeThreadId,
  onNew,
  onSelect,
  onRename,
  onTogglePin,
  onDelete,
}: {
  threads: ChatThread[];
  activeThreadId: string | null;
  onNew: () => void;
  onSelect: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onTogglePin: (id: string, pinned: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  function startEdit(t: ChatThread) {
    setEditingId(t.id);
    setDraft(t.title);
  }
  function commitEdit(id: string) {
    const next = draft.trim();
    if (next) onRename(id, next);
    setEditingId(null);
  }

  return (
    <aside className="flex h-full w-full shrink-0 flex-col rounded-lg border border-border/40 bg-card/30 p-3 md:w-60">
      <div className="flex items-center justify-between px-1 pb-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
          Sessions
        </span>
      </div>

      <button
        type="button"
        onClick={onNew}
        className="flex w-full items-center gap-2 rounded-md border border-dashed border-border/50 px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-body"
      >
        <Plus className="h-4 w-4 shrink-0" /> New session
      </button>

      <div className="-mx-1 mt-1 flex-1 space-y-0.5 overflow-y-auto px-1">
        {threads.length === 0 && (
          <p className="px-2 py-3 text-xs leading-relaxed text-muted-foreground">
            No sessions yet. Start typing and a session is created and auto-titled.
          </p>
        )}

        {threads.map((t) =>
          editingId === t.id ? (
            <div key={t.id} className="flex items-center gap-1 px-1 py-1">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    commitEdit(t.id);
                  } else if (e.key === "Escape") {
                    setEditingId(null);
                  }
                }}
                autoFocus
                className="min-w-0 flex-1 rounded-md border border-primary/40 bg-black/30 px-2 py-1 text-sm text-white outline-none"
              />
              <button
                type="button"
                onClick={() => commitEdit(t.id)}
                className="shrink-0 text-muted-foreground hover:text-emerald-400"
                aria-label="Save name"
              >
                <Check className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="shrink-0 text-muted-foreground hover:text-red-400"
                aria-label="Cancel rename"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div
              key={t.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(t.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(t.id);
                }
              }}
              className={cn(
                "group flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
                activeThreadId === t.id ? "bg-primary/10" : "hover:bg-card/50",
              )}
            >
              {t.pinned ? (
                <Pin className="h-3.5 w-3.5 shrink-0 text-[#E2B93B]" />
              ) : (
                <MessageSquare className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              )}
              <span className="min-w-0 flex-1 truncate text-sm text-body">{t.title}</span>
              <span className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onTogglePin(t.id, !t.pinned);
                  }}
                  className="text-muted-foreground hover:text-[#E2B93B]"
                  aria-label={t.pinned ? "Unpin session" : "Pin session"}
                >
                  <Pin className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(t);
                  }}
                  className="text-muted-foreground hover:text-white"
                  aria-label="Rename session"
                >
                  <Pencil className="h-3 w-3" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(t.id);
                  }}
                  className="text-muted-foreground hover:text-red-400"
                  aria-label="Delete session"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </span>
            </div>
          ),
        )}
      </div>
    </aside>
  );
}
