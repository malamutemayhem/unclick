// ============================================================
// Chat room access
//
// Shared helper for endpoints that receive a thread_id from the browser
// and must re-check room access themselves instead of trusting an earlier
// request. Used by api/chat.ts (api lane) and api/chat-bridge.ts
// (subscription lane).
// ============================================================

interface ThreadOwnerRow {
  id: string;
  api_key_hash: string;
}

interface ThreadMemberRow {
  id: string;
}

function sbHeaders(serviceKey: string): Record<string, string> {
  return {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };
}

// Resolve the canonical lane used to persist assistant turns. Returns the
// thread OWNER's lane when the caller owns the thread or is an active room
// member, else null. Shared-room assistant turns are stamped with the room
// owner's lane, matching chat-threads.ts.
export async function resolveThreadPersistenceLane(
  supabaseUrl: string,
  serviceKey: string,
  threadId: string,
  callerLane: string,
): Promise<string | null> {
  const rest = `${supabaseUrl}/rest/v1`;
  const ownerRes = await fetch(
    `${rest}/chat_threads?id=eq.${encodeURIComponent(threadId)}&select=id,api_key_hash&limit=1`,
    { headers: sbHeaders(serviceKey) },
  );
  if (!ownerRes.ok) return null;

  const owners = (await ownerRes.json().catch(() => [])) as ThreadOwnerRow[];
  const ownerLane = Array.isArray(owners) ? owners[0]?.api_key_hash : null;
  if (!ownerLane) return null;
  if (ownerLane === callerLane) return ownerLane;

  const memberRes = await fetch(
    `${rest}/chat_room_members?thread_id=eq.${encodeURIComponent(threadId)}` +
      `&member_lane_hash=eq.${encodeURIComponent(callerLane)}` +
      `&status=eq.active&select=id&limit=1`,
    { headers: sbHeaders(serviceKey) },
  );
  if (!memberRes.ok) return null;

  const members = (await memberRes.json().catch(() => [])) as ThreadMemberRow[];
  return Array.isArray(members) && members.length > 0 ? ownerLane : null;
}
