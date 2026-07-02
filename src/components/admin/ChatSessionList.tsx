// ============================================================
// ChatSessionList - the left-of-chat sessions rail.
//
// Lists this account's chat sessions in TWO groups, mirroring the admin
// left-nav's "HUMAN / AGENTS" divider style:
//   - My Sessions: solo agent chats and rooms where I am the only human.
//   - Shared Sessions: rooms with another human connected (shared).
//
// Each row offers pin, inline rename, and a destructive action that is
// Delete when I own/solo the session, or Leave when it is a shared room I
// do not own. Deleting a shared room I own is gated behind a two-step
// confirm ("Delete for all?") because it removes the room for everyone.
//
// Grouping is presentational; the server already sorts (pinned first, then
// updated_at desc) so we do not re-sort beyond splitting into the two groups.
// ============================================================

import { useState } from "react";
import { Plus, Pin, Pencil, Trash2, MessageSquare, Users, LogOut, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { isThreadUnread } from "@/components/admin/chatSync";

export interface ChatThread {
  id: string;
  title: string;
  kind: string;
  pinned: boolean;
  created_at: string;
  updated_at: string;
  shared?: boolean;
  my_role?: "owner" | "admin" | "member";
  member_count?: number;
  // The caller's read cursor on this room (null when never marked read).
  // Drives the unread dot; solo threads never show one.
  my_last_read_at?: string | null;
}

const PIN_GOLD = "#E2B93B";

function SessionRow({
  thread,
  active,
  unread,
  onSelect,
  onRename,
  onTogglePin,
  onDelete,
  onLeave,
}: {
  thread: ChatThread;
  active: boolean;
  unread: boolean;
  onSelect: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onTogglePin: (id: string, pinned: boolean) => void;
  onDelete: (id: string) => void;
  onLeave: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(thread.title);
  // Two-step confirm for the destructive delete on a shared room you own.
  const [confirming, setConfirming] = useState(false);

  const isShared = Boolean(thread.shared);
  const canLeave = isShared && thread.my_role !== "owner";
  const ownsShared = isShared && thread.my_role === "owner";

  function commitRename() {
    const next = draft.trim();
    if (next && next !== thread.title) onRename(thread.id, next);
    setEditing(false);
  }

  function startRename(e: React.MouseEvent) {
    e.stopPropagation();
    setDraft(thread.title);
    setEditing(true);
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1 rounded-md bg-card/50 px-2 py-1.5">
        <input
          autoFocus
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commitRename();
            } else if (e.key === "Escape") {
              e.preventDefault();
              setEditing(false);
            }
          }}
          className="min-w-0 flex-1 rounded border border-border/50 bg-card/40 px-2 py-1 text-sm text-body outline-none focus:border-primary/50"
        />
        <button
          type="button"
          onClick={commitRename}
          className="text-muted-foreground transition-colors hover:text-emerald-400"
          aria-label="Save name"
        >
          <Check className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-muted-foreground transition-colors hover:text-red-400"
          aria-label="Cancel rename"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(thread.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(thread.id);
        }
      }}
      className={cn(
        "group flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
        active ? "bg-primary/10" : "hover:bg-card/50",
      )}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onTogglePin(thread.id, !thread.pinned);
        }}
        className="shrink-0 text-muted-foreground transition-colors hover:text-body"
        aria-label={thread.pinned ? "Unpin session" : "Pin session"}
      >
        {thread.pinned ? (
          <Pin className="h-3.5 w-3.5" style={{ color: PIN_GOLD, fill: PIN_GOLD }} />
        ) : isShared ? (
          <Users className="h-3.5 w-3.5" />
        ) : (
          <MessageSquare className="h-3.5 w-3.5" />
        )}
      </button>

      <span
        className={cn(
          "min-w-0 flex-1 truncate text-sm",
          unread ? "font-semibold text-heading" : "text-body",
        )}
      >
        {thread.title}
      </span>

      {unread && (
        <span
          className="h-2 w-2 shrink-0 rounded-full bg-primary"
          aria-label="Unread messages"
          title="Unread messages"
        />
      )}

      {confirming ? (
        <span className="flex shrink-0 items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <span className="text-[10px] text-red-400">Delete for all?</span>
          <button
            type="button"
            onClick={() => {
              setConfirming(false);
              onDelete(thread.id);
            }}
            className="text-red-400 transition-colors hover:text-red-300"
            aria-label="Confirm delete for all"
          >
            <Check className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="text-muted-foreground transition-colors hover:text-body"
            aria-label="Cancel delete"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </span>
      ) : (
        <span className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            type="button"
            onClick={startRename}
            className="text-muted-foreground transition-colors hover:text-body"
            aria-label={`Rename ${thread.title}`}
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
          {canLeave ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onLeave(thread.id);
              }}
              className="text-muted-foreground transition-colors hover:text-red-400"
              aria-label={`Leave ${thread.title}`}
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                // A shared room you own removes the room for everyone, so
                // require a two-step confirm. Solo delete is immediate.
                if (ownsShared) setConfirming(true);
                else onDelete(thread.id);
              }}
              className="text-muted-foreground transition-colors hover:text-red-400"
              aria-label={`Delete ${thread.title}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </span>
      )}
    </div>
  );
}

export function ChatSessionList({
  threads,
  activeThreadId,
  onNew,
  onSelect,
  onRename,
  onTogglePin,
  onDelete,
  onLeave,
  startSharedRoom,
}: {
  threads: ChatThread[];
  activeThreadId: string | null;
  onNew: () => void;
  onSelect: (id: string) => void;
  onRename: (id: string, title: string) => void;
  onTogglePin: (id: string, pinned: boolean) => void;
  onDelete: (id: string) => void;
  onLeave: (id: string) => void;
  // Optional control (the "New shared room" picker) rendered just under
  // "New session". Injected by the parent so this rail stays presentational.
  startSharedRoom?: React.ReactNode;
}) {
  // Split into the two groups. The server already orders pinned-first then
  // updated_at desc, so we keep arrival order within each group.
  const mine = threads.filter((t) => !t.shared);
  const shared = threads.filter((t) => t.shared);

  const renderRow = (t: ChatThread) => (
    <SessionRow
      key={t.id}
      thread={t}
      active={activeThreadId === t.id}
      unread={isThreadUnread(t, activeThreadId)}
      onSelect={onSelect}
      onRename={onRename}
      onTogglePin={onTogglePin}
      onDelete={onDelete}
      onLeave={onLeave}
    />
  );

  return (
    <aside className="flex h-full w-full shrink-0 flex-col rounded-lg border border-border/40 bg-card/30 p-3 md:w-60">
      <button
        type="button"
        onClick={onNew}
        className="mb-2 flex w-full items-center gap-2 rounded-md border border-dashed border-border/50 px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-body"
      >
        <Plus className="h-4 w-4 shrink-0" /> New session
      </button>

      {startSharedRoom}

      <div className="-mx-1 flex-1 space-y-3 overflow-y-auto px-1">
        {threads.length === 0 && (
          <p className="px-1 py-2 text-xs leading-relaxed text-muted-foreground">
            No sessions yet. Start a new session to begin.
          </p>
        )}

        {mine.length > 0 && (
          <div className="space-y-1">
            <div className="px-1 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
              My Sessions
            </div>
            {mine.map(renderRow)}
          </div>
        )}

        {shared.length > 0 && (
          <div className="space-y-1">
            <div className="px-1 pb-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
              Shared Sessions
            </div>
            {shared.map(renderRow)}
          </div>
        )}
      </div>
    </aside>
  );
}
