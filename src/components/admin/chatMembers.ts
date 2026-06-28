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
}

interface AccountLinksResponse {
  links?: AccountLinkView[];
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
