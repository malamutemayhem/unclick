// ============================================================
// StartSharedRoomButton - start a shared room from a Circle contact.
//
// Lists the operator's ACCEPTED Circle contacts (the people they can
// actually share with) in a popover. Picking one:
//   1. POST ?action=create {kind:'council', title:'<their name>'}
//   2. POST ?action=add_member {thread_id, member_user_id:<person.user_id>}
//   3. select the new thread + refresh the sessions list (it now shows
//      under "Shared Sessions").
//
// If the contact is not connected yet (add_member returns needs_handshake)
// or has not provisioned keys (target_not_provisioned), we do NOT fail
// silently: the parent is told via onBlocked and shows the loud handshake
// prompt. An accepted Circle link is the gate - the handshake is the
// permission, with no extra hidden toggle.
// ============================================================

import { useEffect, useState } from "react";
import { Plus, Users } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { fetchConnectedMembers, type HumanMember } from "@/components/admin/chatMembers";
import type { HandshakeBlock } from "@/components/admin/HandshakeBanner";

// The chat-threads add_member 409 bodies we translate into a loud prompt.
interface AddMemberError {
  error?: string;
  needs_handshake?: boolean;
}

function ContactAvatar({ member }: { member: HumanMember }) {
  if (member.avatarUrl) {
    return <img src={member.avatarUrl} alt="" className="h-7 w-7 shrink-0 rounded-full object-cover" />;
  }
  const initials = (member.label || member.email || "?").slice(0, 2).toUpperCase();
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-[10px] font-medium text-sky-300">
      {initials}
    </span>
  );
}

export function StartSharedRoomButton({
  accessToken,
  authHeaders,
  onStarted,
  onBlocked,
}: {
  accessToken: string | null;
  // JSON auth headers for the chat-threads endpoint (Bearer + Content-Type).
  authHeaders: () => Record<string, string>;
  // Called with the new thread id once the room is created and the member is
  // added, so the parent can select it and refresh the sessions list.
  onStarted: (threadId: string) => void;
  // Called when starting the room needs a handshake / the target is not
  // provisioned, so the parent can surface the loud prompt.
  onBlocked: (block: HandshakeBlock) => void;
}) {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState<HumanMember[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState<string | null>(null);

  // Load accepted contacts when the picker opens (refetch each open so a newly
  // accepted handshake shows up without a full reload).
  useEffect(() => {
    if (!open || !accessToken) return;
    let cancelled = false;
    setLoading(true);
    fetchConnectedMembers(accessToken)
      .then((rows) => {
        if (!cancelled) setContacts(rows ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [open, accessToken]);

  async function startWith(contact: HumanMember) {
    if (!accessToken || working) return;
    // A contact with no resolved account id cannot be added yet: treat it as a
    // handshake that still needs to complete rather than failing silently.
    if (!contact.userId) {
      setOpen(false);
      onBlocked({ name: contact.label, reason: "needs_handshake" });
      return;
    }
    setWorking(contact.id);
    try {
      // 1. Create the room titled after the contact.
      const createRes = await fetch("/api/chat-threads?action=create", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ kind: "council", title: contact.label }),
      });
      if (!createRes.ok) return;
      const created = (await createRes.json()) as { id?: string };
      const threadId = created.id;
      if (!threadId) return;

      // 2. Add the contact (Circle handshake is the gate).
      const addRes = await fetch("/api/chat-threads?action=add_member", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ thread_id: threadId, member_user_id: contact.userId }),
      });

      if (!addRes.ok) {
        const err = (await addRes.json().catch(() => ({}))) as AddMemberError;
        setOpen(false);
        if (err.needs_handshake || err.error === "no_circle_link") {
          onBlocked({ name: contact.label, reason: "needs_handshake" });
        } else if (err.error === "target_not_provisioned") {
          onBlocked({ name: contact.label, reason: "not_provisioned" });
        } else {
          // Unknown add failure: still surface the connect path rather than
          // leaving the operator with a half-made empty room and no signal.
          onBlocked({ name: contact.label, reason: "needs_handshake" });
        }
        return;
      }

      // 3. Hand the new thread to the parent to select + refresh.
      setOpen(false);
      onStarted(threadId);
    } catch {
      // Best-effort: never crash the chat on a hiccup.
      setOpen(false);
    } finally {
      setWorking(null);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="mb-2 flex w-full items-center gap-2 rounded-md border border-dashed border-border/50 px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-body"
        >
          <Users className="h-4 w-4 shrink-0" /> New shared room
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="p-0">
        <div className="flex w-[min(20rem,90vw)] flex-col gap-1 p-3">
          <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
            Start a room with...
          </p>
          {loading && <p className="px-1 py-2 text-sm text-muted-foreground">Loading...</p>}
          {!loading && (contacts ?? []).length === 0 && (
            <p className="px-1 py-2 text-xs leading-relaxed text-muted-foreground">
              No connected contacts yet. Connect with people in{" "}
              <a href="/admin/circle" className="text-primary hover:underline">
                Circle
              </a>
              , then start a room with them here.
            </p>
          )}
          {(contacts ?? []).map((c) => (
            <button
              key={c.id}
              type="button"
              disabled={working !== null}
              onClick={() => startWith(c)}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-card/50 disabled:opacity-50"
            >
              <ContactAvatar member={c} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-body">{c.label}</span>
                {c.email && c.email !== c.label && (
                  <span className="block truncate text-[10px] text-muted-foreground">{c.email}</span>
                )}
              </span>
              {working === c.id ? (
                <span className="shrink-0 text-[10px] text-muted-foreground">...</span>
              ) : (
                <Plus className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              )}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
