// ============================================================
// chatMembers - cross-account human members for the chat room.
//
// Reuses the existing account-links (Circle) connection graph: two
// accounts with an "accepted" link are connected, so either can be
// added to a chat room. This slice surfaces those connections in the
// member rail. Live human-to-human messaging is a later slice; for now
// an added member shows as present in the room.
//
// account-links authenticates with the Supabase session access token
// (not the UnClick API key the AI lanes use), matching AdminCircle.
// ============================================================

export interface HumanMember {
  id: string; // account-link id, stable per connection
  userId: string | null; // linked account id once both sides exist
  email: string; // best-known email for the connection
  label: string; // display name, falling back to email
  avatarUrl: string | null;
  memberLaneHash?: string | null;
  role?: "owner" | "admin" | "member";
}

interface AccountLinkPerson {
  user_id: string | null;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
}

interface AccountLinkView {
  id: string;
  status: "pending" | "accepted" | "declined" | "cancelled" | "unlinked";
  direction: "sent" | "received" | "linked";
  person: AccountLinkPerson;
  created_at?: string;
}

interface AccountLinksResponse {
  links?: AccountLinkView[];
}

interface RoomMemberRow {
  id: string;
  member_lane_hash?: string | null;
  role?: "owner" | "admin" | "member";
  status?: "invited" | "active" | "left";
  user_id?: string | null;
  email?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
}

interface RoomMembersResponse {
  members?: RoomMemberRow[];
}

// An incoming connection request the operator has not yet answered: an
// account-link the other side sent us (direction 'received') still 'pending'.
// Surfaced loudly in the chat so a handshake is never missed.
export interface PendingHandshake {
  id: string; // account-link id, the link_id for accept/decline
  email: string; // best-known email for the requester
  label: string; // display name, falling back to email
  avatarUrl: string | null;
  createdAt: string | null;
}

// Fetch the people this account is connected to (accepted Circle links),
// shaped for the chat member rail. Returns null on any failure so the
// caller can fall back to a soft empty state instead of breaking the room.
export async function fetchConnectedMembers(
  accessToken: string,
  timeoutMs = 8000,
): Promise<HumanMember[] | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch("/api/account-links?action=list", {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const json = (await res.json()) as AccountLinksResponse;
    return (json.links ?? [])
      .filter((link) => link.status === "accepted")
      .map((link) => {
        const email = link.person.email ?? "";
        return {
          id: link.id,
          userId: link.person.user_id,
          email,
          label: link.person.display_name || email || "Connected member",
          avatarUrl: link.person.avatar_url,
        };
      });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Fetch the actual active members of a shared chat room. The server only
// returns this after the caller is already authorized on the room.
export async function fetchRoomMembers(
  accessToken: string,
  threadId: string,
  timeoutMs = 8000,
): Promise<HumanMember[] | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(
      `/api/chat-threads?action=members&thread_id=${encodeURIComponent(threadId)}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        signal: controller.signal,
      },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as RoomMembersResponse;
    return (json.members ?? [])
      .filter((member) => member.status === "active")
      .map((member) => {
        const email = member.email ?? "";
        return {
          id: member.id,
          userId: member.user_id ?? null,
          email,
          label: member.display_name || email || "Room member",
          avatarUrl: member.avatar_url ?? null,
          memberLaneHash: member.member_lane_hash ?? null,
          role: member.role,
        };
      });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Fetch the incoming connection requests waiting on the operator (pending
// Circle links the other side sent us). Returns null on any failure so the
// caller can fall back to a soft empty state instead of breaking the chat.
export async function fetchPendingHandshakes(
  accessToken: string,
  timeoutMs = 8000,
): Promise<PendingHandshake[] | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch("/api/account-links?action=list", {
      headers: { Authorization: `Bearer ${accessToken}` },
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const json = (await res.json()) as AccountLinksResponse;
    return (json.links ?? [])
      .filter(
        (link) => link.status === "pending" && link.direction === "received",
      )
      .map((link) => {
        const email = link.person.email ?? "";
        return {
          id: link.id,
          email,
          label: link.person.display_name || email || "Someone",
          avatarUrl: link.person.avatar_url,
          createdAt: link.created_at ?? null,
        };
      });
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

// Accept or decline an incoming Circle request. Returns true on success so the
// caller can refresh. Best-effort: never throws, returns false on any failure.
export async function respondToHandshake(
  accessToken: string,
  linkId: string,
  decision: "accept" | "decline",
): Promise<boolean> {
  try {
    const res = await fetch(`/api/account-links?action=${decision}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ link_id: linkId }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
