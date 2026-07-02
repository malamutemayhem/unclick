import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import {
  CIRCLE_PERMISSIONS,
  buildCirclePermissionState,
  countActiveOutboundShares,
  isCirclePermission,
  normalizeCircleEmail,
  type CirclePermission,
  type CirclePermissionMap,
  type LinkPermissionRow,
} from "./lib/account-links-model.js";

type Db = SupabaseClient;

interface SessionUser {
  id: string;
  email: string | null;
}

interface AccountLinkRow {
  id: string;
  requester_user_id: string;
  recipient_user_id: string | null;
  recipient_email: string;
  recipient_email_norm: string;
  status: "pending" | "accepted" | "declined" | "cancelled" | "unlinked";
  created_at: string;
  accepted_at: string | null;
  updated_at: string;
}

interface CirclePerson {
  user_id: string | null;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
}

interface CircleLinkView {
  id: string;
  status: AccountLinkRow["status"];
  direction: "sent" | "received" | "linked";
  person: CirclePerson;
  created_at: string;
  accepted_at: string | null;
  permissions: CirclePermissionMap;
}

function bearerFrom(req: VercelRequest): string {
  return (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "").trim();
}

function jsonBody(req: VercelRequest): Record<string, unknown> {
  return typeof req.body === "object" && req.body !== null ? req.body as Record<string, unknown> : {};
}

function clientIp(req: VercelRequest): string | null {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string") return fwd.split(",")[0]?.trim() || null;
  if (Array.isArray(fwd)) return fwd[0] ?? null;
  return (req.socket as { remoteAddress?: string } | undefined)?.remoteAddress ?? null;
}

function clientUa(req: VercelRequest): string | null {
  const ua = req.headers["user-agent"];
  return typeof ua === "string" ? ua : null;
}

function userDisplayName(user: User | null | undefined): string | null {
  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  for (const key of ["display_name", "full_name", "name"]) {
    const value = meta[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function userAvatarUrl(user: User | null | undefined): string | null {
  const meta = (user?.user_metadata ?? {}) as Record<string, unknown>;
  const photo = meta.avatar_photo;
  if (typeof photo === "string" && photo.startsWith("data:image/")) return photo;
  const face = meta.avatar_face;
  if (typeof face === "string" && /^face-(0[1-9]|1[0-2])$/.test(face)) {
    return `/faces/library/${face}.svg`;
  }
  for (const key of ["avatar_url", "picture", "photo_url", "image_url"]) {
    const avatar = meta[key];
    if (typeof avatar === "string" && /^https:\/\//i.test(avatar)) return avatar;
  }
  return null;
}

async function resolveSessionUser(
  req: VercelRequest,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<SessionUser | null> {
  const token = bearerFrom(req);
  if (!token || token.startsWith("uc_") || token.startsWith("agt_")) return null;
  try {
    const scoped = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await scoped.auth.getUser(token);
    if (error || !data?.user) return null;
    return { id: data.user.id, email: data.user.email ?? null };
  } catch {
    return null;
  }
}

async function findUserByEmail(db: Db, emailNorm: string): Promise<SessionUser | null> {
  const { data } = await db
    .from("api_keys")
    .select("user_id,email")
    .ilike("email", emailNorm)
    .not("user_id", "is", null)
    .limit(1)
    .maybeSingle();

  const row = data as { user_id?: string | null; email?: string | null } | null;
  if (!row?.user_id) return null;
  return { id: row.user_id, email: row.email ?? emailNorm };
}

async function fetchUserMap(db: Db, userIds: string[]): Promise<Map<string, User>> {
  const out = new Map<string, User>();
  for (const userId of Array.from(new Set(userIds.filter(Boolean)))) {
    const { data, error } = await db.auth.admin.getUserById(userId);
    if (!error && data?.user) out.set(userId, data.user);
  }
  return out;
}

async function getLink(db: Db, linkId: string): Promise<AccountLinkRow | null> {
  const { data, error } = await db
    .from("account_links")
    .select("*")
    .eq("id", linkId)
    .maybeSingle();
  if (error) throw error;
  return data as AccountLinkRow | null;
}

function callerCanReceive(link: AccountLinkRow, caller: SessionUser): boolean {
  const emailNorm = normalizeCircleEmail(caller.email ?? "");
  return link.recipient_user_id === caller.id || (!link.recipient_user_id && link.recipient_email_norm === emailNorm);
}

function otherUserId(link: AccountLinkRow, caller: SessionUser): string | null {
  if (link.requester_user_id === caller.id) return link.recipient_user_id;
  if (link.recipient_user_id === caller.id) return link.requester_user_id;
  if (!link.recipient_user_id && link.recipient_email_norm === normalizeCircleEmail(caller.email ?? "")) {
    return link.requester_user_id;
  }
  return null;
}

async function writeAudit(params: {
  db: Db;
  req: VercelRequest;
  linkId?: string | null;
  actorUserId: string;
  targetUserId?: string | null;
  action: string;
  permission?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const { error } = await params.db.from("link_access_audit").insert({
    link_id: params.linkId ?? null,
    actor_user_id: params.actorUserId,
    target_user_id: params.targetUserId ?? null,
    action: params.action,
    permission: params.permission ?? null,
    ip: clientIp(params.req),
    user_agent: clientUa(params.req),
    metadata: params.metadata ?? {},
  });
  if (error) throw error;
}

async function ensurePermissionRows(db: Db, link: AccountLinkRow) {
  if (!link.recipient_user_id) return;
  const rows = CIRCLE_PERMISSIONS.flatMap((permission) => [
    {
      link_id: link.id,
      owner_user_id: link.requester_user_id,
      grantee_user_id: link.recipient_user_id,
      permission,
    },
    {
      link_id: link.id,
      owner_user_id: link.recipient_user_id,
      grantee_user_id: link.requester_user_id,
      permission,
    },
  ]);

  const { error } = await db
    .from("link_permissions")
    .upsert(rows, { onConflict: "link_id,owner_user_id,grantee_user_id,permission", ignoreDuplicates: true });
  if (error) throw error;
}

async function listCircle(db: Db, caller: SessionUser) {
  const callerEmailNorm = normalizeCircleEmail(caller.email ?? "");
  const { data: linksRaw, error: linksError } = await db
    .from("account_links")
    .select("*")
    .or(
      [
        `requester_user_id.eq.${caller.id}`,
        `recipient_user_id.eq.${caller.id}`,
        callerEmailNorm ? `recipient_email_norm.eq.${callerEmailNorm}` : "",
      ].filter(Boolean).join(","),
    )
    .in("status", ["pending", "accepted"])
    .order("updated_at", { ascending: false });
  if (linksError) throw linksError;

  const links = (linksRaw ?? []) as AccountLinkRow[];
  const linkIds = links.map((link) => link.id);
  const { data: permissionRowsRaw, error: permissionsError } = linkIds.length
    ? await db.from("link_permissions").select("*").in("link_id", linkIds)
    : { data: [], error: null };
  if (permissionsError) throw permissionsError;

  const permissionRows = (permissionRowsRaw ?? []) as LinkPermissionRow[];
  const userIds = links.flatMap((link) => [link.requester_user_id, link.recipient_user_id].filter(Boolean) as string[]);
  const userMap = await fetchUserMap(db, userIds);

  const views: CircleLinkView[] = links.map((link) => {
    const callerIsRequester = link.requester_user_id === caller.id;
    const otherId = otherUserId(link, caller);
    const otherUser = otherId ? userMap.get(otherId) : null;
    const person: CirclePerson = {
      user_id: otherId,
      email: otherUser?.email ?? (callerIsRequester ? link.recipient_email : null),
      display_name: userDisplayName(otherUser),
      avatar_url: userAvatarUrl(otherUser),
    };
    const rows = permissionRows.filter((row) => row.link_id === link.id);
    return {
      id: link.id,
      status: link.status,
      direction: link.status === "accepted" ? "linked" : callerIsRequester ? "sent" : "received",
      person,
      created_at: link.created_at,
      accepted_at: link.accepted_at,
      permissions: buildCirclePermissionState(caller.id, otherId, rows),
    };
  });

  const { data: auditRaw, error: auditError } = await db
    .from("link_access_audit")
    .select("*")
    .or(`actor_user_id.eq.${caller.id},target_user_id.eq.${caller.id}`)
    .order("created_at", { ascending: false })
    .limit(30);
  if (auditError) throw auditError;

  return {
    me: { id: caller.id, email: caller.email },
    sharing_count: countActiveOutboundShares(views.map((view) => view.permissions)),
    links: views,
    audit: auditRaw ?? [],
  };
}

async function invite(db: Db, req: VercelRequest, caller: SessionUser) {
  const body = jsonBody(req);
  const emailNorm = normalizeCircleEmail(String(body.email ?? ""));
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailNorm)) {
    return { status: 400, body: { error: "Enter a valid email address." } };
  }
  if (emailNorm === normalizeCircleEmail(caller.email ?? "")) {
    return { status: 400, body: { error: "You cannot add yourself to Circle." } };
  }

  const target = await findUserByEmail(db, emailNorm);
  const { data: existing } = await db
    .from("account_links")
    .select("*")
    .eq("requester_user_id", caller.id)
    .eq("recipient_email_norm", emailNorm)
    .in("status", ["pending", "accepted"])
    .limit(1)
    .maybeSingle();
  if (existing) return { status: 409, body: { error: "That Circle invite already exists." } };

  const { data, error } = await db
    .from("account_links")
    .insert({
      requester_user_id: caller.id,
      recipient_user_id: target?.id ?? null,
      recipient_email: emailNorm,
      status: "pending",
    })
    .select("*")
    .single();
  if (error) throw error;

  await writeAudit({
    db,
    req,
    linkId: (data as AccountLinkRow).id,
    actorUserId: caller.id,
    targetUserId: target?.id ?? null,
    action: "invite_sent",
    metadata: { recipient_email: emailNorm, recipient_has_account: Boolean(target?.id) },
  });
  return { status: 200, body: { success: true } };
}

async function accept(db: Db, req: VercelRequest, caller: SessionUser) {
  const linkId = String(jsonBody(req).link_id ?? "");
  const link = await getLink(db, linkId);
  if (!link || link.status !== "pending" || !callerCanReceive(link, caller)) {
    return { status: 404, body: { error: "Invite not found." } };
  }

  const { data, error } = await db
    .from("account_links")
    .update({ status: "accepted", recipient_user_id: caller.id, accepted_at: new Date().toISOString() })
    .eq("id", link.id)
    .select("*")
    .single();
  if (error) throw error;

  const acceptedLink = data as AccountLinkRow;
  await ensurePermissionRows(db, acceptedLink);
  await writeAudit({
    db,
    req,
    linkId: acceptedLink.id,
    actorUserId: caller.id,
    targetUserId: acceptedLink.requester_user_id,
    action: "invite_accepted",
  });
  return { status: 200, body: { success: true } };
}

async function decline(db: Db, req: VercelRequest, caller: SessionUser) {
  const linkId = String(jsonBody(req).link_id ?? "");
  const link = await getLink(db, linkId);
  if (!link || link.status !== "pending" || !callerCanReceive(link, caller)) {
    return { status: 404, body: { error: "Invite not found." } };
  }
  const { error } = await db.from("account_links").update({ status: "declined" }).eq("id", link.id);
  if (error) throw error;
  await writeAudit({ db, req, linkId: link.id, actorUserId: caller.id, targetUserId: link.requester_user_id, action: "invite_declined" });
  return { status: 200, body: { success: true } };
}

async function cancel(db: Db, req: VercelRequest, caller: SessionUser) {
  const linkId = String(jsonBody(req).link_id ?? "");
  const link = await getLink(db, linkId);
  if (!link || link.status !== "pending" || link.requester_user_id !== caller.id) {
    return { status: 404, body: { error: "Invite not found." } };
  }
  const { error } = await db.from("account_links").update({ status: "cancelled" }).eq("id", link.id);
  if (error) throw error;
  await writeAudit({ db, req, linkId: link.id, actorUserId: caller.id, targetUserId: link.recipient_user_id, action: "invite_cancelled" });
  return { status: 200, body: { success: true } };
}

async function unlink(db: Db, req: VercelRequest, caller: SessionUser) {
  const linkId = String(jsonBody(req).link_id ?? "");
  const link = await getLink(db, linkId);
  const otherId = link ? otherUserId(link, caller) : null;
  if (!link || link.status !== "accepted" || !otherId) {
    return { status: 404, body: { error: "Circle link not found." } };
  }
  const { error } = await db.from("account_links").update({ status: "unlinked" }).eq("id", link.id);
  if (error) throw error;
  await writeAudit({ db, req, linkId: link.id, actorUserId: caller.id, targetUserId: otherId, action: "unlinked" });
  return { status: 200, body: { success: true } };
}

async function setPermission(db: Db, req: VercelRequest, caller: SessionUser) {
  const body = jsonBody(req);
  const linkId = String(body.link_id ?? "");
  const permission = body.permission;
  const direction = body.direction;
  const enabled = Boolean(body.enabled);
  if (!isCirclePermission(permission) || (direction !== "give" && direction !== "receive")) {
    return { status: 400, body: { error: "Invalid permission request." } };
  }

  const link = await getLink(db, linkId);
  const otherId = link ? otherUserId(link, caller) : null;
  if (!link || link.status !== "accepted" || !otherId) {
    return { status: 404, body: { error: "Circle link not found." } };
  }
  await ensurePermissionRows(db, link);

  const ownerId = direction === "give" ? caller.id : otherId;
  const granteeId = direction === "give" ? otherId : caller.id;
  const changes = direction === "give"
    ? { owner_enabled: enabled, updated_at: new Date().toISOString() }
    : { grantee_enabled: enabled, updated_at: new Date().toISOString() };

  const { error } = await db
    .from("link_permissions")
    .update(changes)
    .eq("link_id", link.id)
    .eq("owner_user_id", ownerId)
    .eq("grantee_user_id", granteeId)
    .eq("permission", permission);
  if (error) throw error;

  await writeAudit({
    db,
    req,
    linkId: link.id,
    actorUserId: caller.id,
    targetUserId: otherId,
    action: enabled ? "permission_enabled" : "permission_disabled",
    permission: permission as CirclePermission,
    metadata: { direction },
  });
  return { status: 200, body: { success: true } };
}

async function stopAllSharing(db: Db, req: VercelRequest, caller: SessionUser) {
  const { data: linksRaw, error: linksError } = await db
    .from("account_links")
    .select("id,requester_user_id,recipient_user_id,status")
    .or(`requester_user_id.eq.${caller.id},recipient_user_id.eq.${caller.id}`)
    .eq("status", "accepted");
  if (linksError) throw linksError;

  const linkIds = ((linksRaw ?? []) as AccountLinkRow[]).map((link) => link.id);
  if (linkIds.length) {
    const { error } = await db
      .from("link_permissions")
      .update({ owner_enabled: false, updated_at: new Date().toISOString() })
      .eq("owner_user_id", caller.id)
      .in("link_id", linkIds);
    if (error) throw error;
  }

  await writeAudit({
    db,
    req,
    actorUserId: caller.id,
    action: "stop_all_sharing",
    metadata: { affected_links: linkIds.length },
  });
  return { status: 200, body: { success: true, affected_links: linkIds.length } };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "https://unclick.world");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Server not configured." });
  }

  const caller = await resolveSessionUser(req, supabaseUrl, serviceRoleKey);
  if (!caller) return res.status(401).json({ error: "Unauthorized" });

  const db = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  }) as Db;
  const action = String(req.query.action ?? "list");

  try {
    if (req.method === "GET" && action === "list") {
      return res.status(200).json(await listCircle(db, caller));
    }
    if (req.method !== "POST") return res.status(405).json({ error: "POST required." });

    const result = await ({
      invite,
      accept,
      decline,
      cancel,
      unlink,
      set_permission: setPermission,
      stop_all_sharing: stopAllSharing,
    } satisfies Record<string, (db: Db, req: VercelRequest, caller: SessionUser) => Promise<{ status: number; body: unknown }>>)[action]?.(db, req, caller);

    if (!result) return res.status(400).json({ error: `Unknown action: ${action}` });
    return res.status(result.status).json(result.body);
  } catch (err) {
    console.error(`account-links ${action} failed:`, err instanceof Error ? err.message : String(err));
    return res.status(500).json({ error: "Circle is temporarily unavailable. Please retry." });
  }
}
