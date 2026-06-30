// ============================================================
// HandshakeBanner - loud, unmissable connection prompts for the chat.
//
// Two jobs, both deliberately impossible to miss (accent border + tinted
// background, pinned to the top of the chat canvas):
//
//   1. PendingHandshakeBanner - incoming Circle requests waiting on you.
//      Lists each "<name> wants to connect" with Accept / Decline inline,
//      plus a "Manage in Circle" deep-link. Black-and-white obvious so a
//      handshake is never silently sitting in the Circle page.
//
//   2. NeedsHandshakePrompt - shown when starting a shared room with a
//      contact requires a connection first (add_member returned
//      needs_handshake) or the target has not provisioned keys yet. A
//      single primary button deep-links to Circle to send/accept the
//      handshake. One tap, no hidden settings.
//
// Deep-links use the in-app router (Link), not full page reloads. All the
// network work lives in the parent / chatMembers helpers; this file is
// presentational plus the accept/decline callbacks it is handed.
// ============================================================

import { Link } from "react-router-dom";
import { AlertTriangle, CheckCircle2, UserPlus, X } from "lucide-react";
import { relativeTime } from "@/lib/relativeTime";
import type { PendingHandshake } from "@/components/admin/chatMembers";

const CIRCLE_ROUTE = "/admin/circle";

// A small avatar for a requester: their picture if we have one, else initials.
function RequesterAvatar({ label, email, avatarUrl }: { label: string; email: string; avatarUrl: string | null }) {
  if (avatarUrl) {
    return <img src={avatarUrl} alt="" className="h-8 w-8 shrink-0 rounded-full object-cover" />;
  }
  const initials = (label || email || "?").slice(0, 2).toUpperCase();
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/20 text-[11px] font-semibold text-amber-200">
      {initials}
    </span>
  );
}

// Incoming connection requests, loud at the top of the chat. Multiple
// requests stack, each with its own Accept / Decline. The header shows a
// count so several pending requests are obvious at a glance.
export function PendingHandshakeBanner({
  pending,
  busyId,
  onAccept,
  onDecline,
}: {
  pending: PendingHandshake[];
  busyId: string | null;
  onAccept: (linkId: string) => void;
  onDecline: (linkId: string) => void;
}) {
  if (pending.length === 0) return null;
  const many = pending.length > 1;

  return (
    <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 p-3">
      <div className="mb-2 flex items-center gap-2 px-1">
        <UserPlus className="h-4 w-4 shrink-0 text-amber-300" />
        <p className="text-sm font-semibold text-amber-100">
          {many ? `${pending.length} people want to connect` : "Someone wants to connect"}
        </p>
        <Link
          to={CIRCLE_ROUTE}
          className="ml-auto text-xs font-medium text-amber-200 underline-offset-2 hover:underline"
        >
          Manage in Circle
        </Link>
      </div>

      <div className="space-y-2">
        {pending.map((req) => {
          const busy = busyId === req.id;
          return (
            <div
              key={req.id}
              className="flex flex-col gap-2 rounded-md border border-amber-400/20 bg-card/40 p-2.5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <RequesterAvatar label={req.label} email={req.email} avatarUrl={req.avatarUrl} />
                <div className="min-w-0">
                  <p className="truncate text-sm text-foreground">
                    <span className="font-semibold">{req.label}</span> wants to connect
                  </p>
                  {req.email && req.email !== req.label && (
                    <p className="truncate text-[11px] text-muted-foreground">{req.email}</p>
                  )}
                  {req.createdAt && (
                    <p className="text-[10px] text-muted-foreground">
                      requested {relativeTime(req.createdAt, { justNow: true })}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onAccept(req.id)}
                  className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/90 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-emerald-500 disabled:opacity-50"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {busy ? "..." : "Accept"}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onDecline(req.id)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border/50 px-3 py-1.5 text-xs font-medium text-body transition-colors hover:bg-card/60 disabled:opacity-50"
                >
                  <X className="h-3.5 w-3.5" />
                  Decline
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// What blocked a start-shared-room attempt, so we can show the right copy.
//   - "needs_handshake": no accepted Circle link yet -> send/accept the link.
//   - "not_provisioned": linked, but the target has no UnClick keys yet.
export type HandshakeBlock = {
  name: string;
  reason: "needs_handshake" | "not_provisioned";
};

// The loud "you need to connect first" card, shown when starting a shared
// room could not add the contact. One primary action: open Circle. No hidden
// settings, no silent failure.
export function NeedsHandshakePrompt({
  block,
  onDismiss,
}: {
  block: HandshakeBlock;
  onDismiss: () => void;
}) {
  const notProvisioned = block.reason === "not_provisioned";
  return (
    <div className="rounded-lg border border-amber-400/50 bg-amber-500/10 p-4">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
        <div className="min-w-0 flex-1">
          {notProvisioned ? (
            <>
              <p className="text-sm font-semibold text-amber-100">
                {block.name} has not set up their UnClick keys yet
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-100/80">
                You are connected, but they need to finish setting up their UnClick account before
                they can join a shared room. Ask them to set up their keys, then try again.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-semibold text-amber-100">
                You need to connect with {block.name} first
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-100/80">
                Sharing a room requires an accepted connection. It is one tap in Circle, with no
                hidden settings - send or accept the handshake there, then start the room.
              </p>
              <Link
                to={CIRCLE_ROUTE}
                className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-primary/90 px-3 py-1.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary"
              >
                <UserPlus className="h-4 w-4" />
                Connect in Circle
              </Link>
            </>
          )}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 text-amber-200/70 transition-colors hover:text-amber-100"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
