/**
 * UnClick Admin Users - Vercel serverless function
 *
 * Route: GET|POST /api/admin-users?action=<action>
 *
 * Superuser-only user management, powering /admin/users. Separate from
 * memory-admin.ts because these actions query auth.users across all
 * tenants rather than scoped to a single api_key_hash.
 *
 * Access: a Supabase session JWT whose account is a superuser. Superusers
 * are the GOD account, any email in ADMIN_EMAILS (env), or any account
 * granted app_metadata.unclick_role = "superuser" from this surface.
 * Role logic is shared with admin_profile via lib/admin-roles.ts.
 *
 * The GOD account (creativelead@malamutemayhem.com) is untouchable here:
 * every mutating action against it is refused, for every caller.
 *
 * Actions:
 *   - admin_list_users: GET. Every auth.users row joined with its api_keys
 *     summary plus derived role/status. The table behind /admin/users.
 *   - admin_set_role: POST { user_id, role: "superuser"|"user" }.
 *     Grants or revokes the assigned superuser role (app_metadata).
 *   - admin_set_keys_active: POST { user_id, active: boolean }.
 *     Deactivates or restores every API key the account owns.
 *   - admin_set_suspended: POST { user_id, suspended: boolean }.
 *     Bans or unbans the account at the auth layer (sign-in blocked).
 *   - admin_delete_user: POST { user_id, confirm_email }. Full wipe:
 *     memory-lane rows, auth user, api_keys. confirm_email must match the
 *     target's email exactly, as a fat-finger brake.
 *   - admin_recent_signups: GET. Legacy latest-100 signups list.
 *
 * Env:
 *   SUPABASE_URL                - project URL
 *   SUPABASE_SERVICE_ROLE_KEY   - service role (auth.admin.* requires it)
 *   ADMIN_EMAILS                - comma-separated env superuser allowlist
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import {
  deriveUserManagementRole,
  envAdminEmails,
  envGodEmails,
  guardTargetAction,
  type AdminRole,
  type ManageAction,
  type RoleSource,
} from "./lib/admin-roles.js";

function bearerFrom(req: VercelRequest): string {
  return (req.headers.authorization ?? "").replace(/^Bearer\s+/i, "").trim();
}

async function resolveSessionUser(
  token: string,
  supabaseUrl: string,
  serviceRoleKey: string,
): Promise<{ id: string; email: string | null; app_metadata: unknown } | null> {
  if (!token) return null;
  // api_keys (uc_* / agt_*) are never valid session JWTs; reject early.
  if (token.startsWith("uc_") || token.startsWith("agt_")) return null;
  try {
    const scoped = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { headers: { Authorization: `Bearer ${token}` } },
    });
    const { data, error } = await scoped.auth.getUser(token);
    if (error || !data?.user) return null;
    return {
      id: data.user.id,
      email: data.user.email ?? null,
      app_metadata: data.user.app_metadata ?? null,
    };
  } catch {
    return null;
  }
}

/** banned_until is present on admin API user payloads but not on the public type. */
function bannedUntilOf(u: User): string | null {
  const raw = (u as User & { banned_until?: string | null }).banned_until;
  return typeof raw === "string" && raw ? raw : null;
}

function isSuspended(u: User): boolean {
  const until = bannedUntilOf(u);
  if (!until) return false;
  const t = new Date(until).getTime();
  return Number.isFinite(t) && t > Date.now();
}

/**
 * Pull every auth user, paging until exhausted. Capped well above beta
 * scale; the cap is logged in the response so a silently truncated list
 * can never read as "everyone".
 */
const LIST_PAGE_SIZE = 200;
const LIST_MAX_PAGES = 10;

async function listAllUsers(supabase: SupabaseClient): Promise<{ users: User[]; truncated: boolean }> {
  const all: User[] = [];
  for (let page = 1; page <= LIST_MAX_PAGES; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: LIST_PAGE_SIZE });
    if (error) throw error;
    const batch = data?.users ?? [];
    all.push(...batch);
    if (batch.length < LIST_PAGE_SIZE) return { users: all, truncated: false };
  }
  return { users: all, truncated: true };
}

interface KeySummary {
  prefix: string;
  tier: string;
  active: boolean;
  usage_count: number;
  last_used_at: string | null;
}

interface KeyRollup {
  primary: KeySummary | null;
  worker_keys: number;
  any_active: boolean;
}

/** Summarise api_keys rows per user: freshest primary key + worker count. */
async function keyRollups(
  supabase: SupabaseClient,
  userIds: string[],
): Promise<Map<string, KeyRollup>> {
  const map = new Map<string, KeyRollup>();
  const CHUNK = 200;
  for (let i = 0; i < userIds.length; i += CHUNK) {
    const chunk = userIds.slice(i, i + CHUNK);
    const { data, error } = await supabase
      .from("api_keys")
      .select("user_id, key_prefix, tier, is_active, usage_count, last_used_at")
      .in("user_id", chunk);
    if (error) throw error;
    for (const row of (data ?? []) as Array<{
      user_id: string;
      key_prefix: string | null;
      tier: string | null;
      is_active: boolean | null;
      usage_count: number | null;
      last_used_at: string | null;
    }>) {
      const entry = map.get(row.user_id) ?? { primary: null, worker_keys: 0, any_active: false };
      if (row.is_active) entry.any_active = true;
      if (row.tier === "worker") {
        entry.worker_keys += 1;
      } else {
        const candidate: KeySummary = {
          prefix: row.key_prefix ?? "",
          tier: row.tier ?? "free",
          active: Boolean(row.is_active),
          usage_count: Number(row.usage_count ?? 0),
          last_used_at: row.last_used_at ?? null,
        };
        // Keep the freshest primary row, matching how the rest of the
        // codebase resolves "the" key (order by last_used_at desc).
        const prev = entry.primary;
        const prevT = prev?.last_used_at ? new Date(prev.last_used_at).getTime() : 0;
        const nextT = candidate.last_used_at ? new Date(candidate.last_used_at).getTime() : 0;
        if (!prev || nextT >= prevT) entry.primary = candidate;
      }
      map.set(row.user_id, entry);
    }
  }
  return map;
}

/** Best-effort audit trail; failures never block the action itself. */
async function auditAdminAction(
  supabase: SupabaseClient,
  caller: { id: string; email: string | null },
  action: string,
  payload: Record<string, unknown>,
): Promise<void> {
  try {
    await supabase.from("mc_admin_audit").insert({
      api_key_hash: `admin-users:${caller.id}`,
      action,
      payload: { ...payload, caller_email: caller.email },
    });
  } catch {
    /* audit is best effort */
  }
}

async function fetchTargetUser(
  supabase: SupabaseClient,
  userId: string,
): Promise<User | null> {
  if (!userId) return null;
  const { data, error } = await supabase.auth.admin.getUserById(userId);
  if (error || !data?.user) return null;
  return data.user;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const action = (req.query.action as string) ?? "";
  const supabaseUrl = process.env.SUPABASE_URL ?? "";
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

  if (!supabaseUrl || !serviceRoleKey) {
    return res.status(500).json({ error: "Server not configured" });
  }

  // All actions require a session JWT resolving to a superuser (or GOD).
  const token = bearerFrom(req);
  const caller = await resolveSessionUser(token, supabaseUrl, serviceRoleKey);
  if (!caller) return res.status(401).json({ error: "Unauthorized" });

  const envEmails = envAdminEmails();
  const godEmails = envGodEmails();
  const callerRole = deriveUserManagementRole(caller.email, caller.app_metadata, envEmails, godEmails);
  if (callerRole.role === "user") {
    // 403 is the signal the frontend uses to hide the surface entirely.
    return res.status(403).json({ error: "Forbidden" });
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  try {
    switch (action) {
      case "admin_list_users": {
        if (req.method !== "GET") {
          return res.status(405).json({ error: "GET required" });
        }
        const { users: authUsers, truncated } = await listAllUsers(supabase);
        const rollups = await keyRollups(supabase, authUsers.map((u) => u.id));

        const users = authUsers
          .map((u) => {
            const { role, source } = deriveUserManagementRole(
              u.email ?? null,
              u.app_metadata ?? null,
              envEmails,
              godEmails,
            );
            const keys = rollups.get(u.id) ?? { primary: null, worker_keys: 0, any_active: false };
            return {
              id: u.id,
              email: u.email ?? null,
              provider:
                (u.app_metadata as { provider?: string } | undefined)?.provider ?? "email",
              created_at: u.created_at,
              last_sign_in_at: u.last_sign_in_at ?? null,
              confirmed: Boolean(u.email_confirmed_at ?? u.phone_confirmed_at),
              role: role as AdminRole,
              role_source: source as RoleSource,
              suspended: isSuspended(u),
              key: keys.primary,
              worker_keys: keys.worker_keys,
              any_key_active: keys.any_active,
            };
          })
          .sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
          );

        return res.status(200).json({
          users,
          total: users.length,
          truncated,
          caller: { id: caller.id, email: caller.email, role: callerRole.role },
        });
      }

      case "admin_set_role": {
        if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
        const userId = typeof req.body?.user_id === "string" ? req.body.user_id : "";
        const nextRole = req.body?.role;
        if (nextRole !== "superuser" && nextRole !== "user") {
          return res.status(400).json({ error: "role must be 'superuser' or 'user'" });
        }
        const target = await fetchTargetUser(supabase, userId);
        if (!target) return res.status(404).json({ error: "User not found" });

        const verdict = guardTargetAction({
          action: "set_role" satisfies ManageAction,
          callerId: caller.id,
          target: { id: target.id, email: target.email ?? null, app_metadata: target.app_metadata ?? null },
          envEmails,
          godEmails,
          nextRole,
        });
        // "=== false" rather than "!": tsconfig.api.json runs with
        // strict:false, where truthiness does not narrow the union.
        if (verdict.allowed === false) return res.status(verdict.status).json({ error: verdict.reason });

        // GoTrue merges app_metadata shallowly, so this only touches our key.
        const { error } = await supabase.auth.admin.updateUserById(target.id, {
          app_metadata: { unclick_role: nextRole === "superuser" ? "superuser" : null },
        });
        if (error) throw error;

        await auditAdminAction(supabase, caller, "admin_set_role", {
          target_user_id: target.id,
          target_email: target.email,
          role: nextRole,
        });
        return res.status(200).json({ success: true, user_id: target.id, role: nextRole });
      }

      case "admin_set_keys_active": {
        if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
        const userId = typeof req.body?.user_id === "string" ? req.body.user_id : "";
        const active = Boolean(req.body?.active);
        const target = await fetchTargetUser(supabase, userId);
        if (!target) return res.status(404).json({ error: "User not found" });

        const verdict = guardTargetAction({
          action: "set_keys_active" satisfies ManageAction,
          callerId: caller.id,
          target: { id: target.id, email: target.email ?? null, app_metadata: target.app_metadata ?? null },
          envEmails,
          godEmails,
        });
        // "=== false" rather than "!": tsconfig.api.json runs with
        // strict:false, where truthiness does not narrow the union.
        if (verdict.allowed === false) return res.status(verdict.status).json({ error: verdict.reason });

        const { count, error } = await supabase
          .from("api_keys")
          .update({ is_active: active }, { count: "exact" })
          .eq("user_id", target.id);
        if (error) throw error;

        await auditAdminAction(supabase, caller, "admin_set_keys_active", {
          target_user_id: target.id,
          target_email: target.email,
          active,
          keys_affected: count ?? 0,
        });
        return res.status(200).json({ success: true, keys_affected: count ?? 0, active });
      }

      case "admin_set_suspended": {
        if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
        const userId = typeof req.body?.user_id === "string" ? req.body.user_id : "";
        const suspended = Boolean(req.body?.suspended);
        const target = await fetchTargetUser(supabase, userId);
        if (!target) return res.status(404).json({ error: "User not found" });

        const verdict = guardTargetAction({
          action: "set_suspended" satisfies ManageAction,
          callerId: caller.id,
          target: { id: target.id, email: target.email ?? null, app_metadata: target.app_metadata ?? null },
          envEmails,
          godEmails,
          suspending: suspended,
        });
        // "=== false" rather than "!": tsconfig.api.json runs with
        // strict:false, where truthiness does not narrow the union.
        if (verdict.allowed === false) return res.status(verdict.status).json({ error: verdict.reason });

        // "876000h" is GoTrue's idiom for an effectively permanent ban
        // (100 years); "none" lifts it. Sign-in fails while banned, but
        // the account and its data stay intact.
        const { error } = await supabase.auth.admin.updateUserById(target.id, {
          ban_duration: suspended ? "876000h" : "none",
        });
        if (error) throw error;

        await auditAdminAction(supabase, caller, "admin_set_suspended", {
          target_user_id: target.id,
          target_email: target.email,
          suspended,
        });
        return res.status(200).json({ success: true, user_id: target.id, suspended });
      }

      case "admin_delete_user": {
        if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
        const userId = typeof req.body?.user_id === "string" ? req.body.user_id : "";
        const confirmEmail =
          typeof req.body?.confirm_email === "string" ? req.body.confirm_email.trim() : "";
        const target = await fetchTargetUser(supabase, userId);
        if (!target) return res.status(404).json({ error: "User not found" });

        const verdict = guardTargetAction({
          action: "delete_user" satisfies ManageAction,
          callerId: caller.id,
          target: { id: target.id, email: target.email ?? null, app_metadata: target.app_metadata ?? null },
          envEmails,
          godEmails,
        });
        // "=== false" rather than "!": tsconfig.api.json runs with
        // strict:false, where truthiness does not narrow the union.
        if (verdict.allowed === false) return res.status(verdict.status).json({ error: verdict.reason });

        const targetEmail = (target.email ?? "").toLowerCase();
        if (!targetEmail || confirmEmail.toLowerCase() !== targetEmail) {
          return res.status(400).json({
            error: "confirm_email must match the target account's email exactly",
          });
        }

        // Resolve the account's memory lane the same way the self-serve
        // delete does (accounts-profile.ts#deleteAccount): the lane hash of
        // the freshest primary key is where the data actually lives.
        const keyRows = ((await supabase
          .from("api_keys")
          .select("key_hash, lane_hash, tier")
          .eq("user_id", target.id)
          .order("last_used_at", { ascending: false, nullsFirst: false })).data ?? []) as Array<{
            key_hash: string; lane_hash: string | null; tier: string | null }>;
        const allKeyHashes = keyRows.map((r) => r.key_hash).filter(Boolean);
        const primaryRow = keyRows.find((r) => r.tier !== "worker") ?? keyRows[0] ?? null;
        const apiKeyHash = primaryRow?.lane_hash ?? primaryRow?.key_hash ?? null;

        // Pre-deletion audit records, captured before any delete fires.
        try {
          await supabase.from("account_deletions_audit").insert({
            api_key_hash: apiKeyHash,
            email: target.email,
            reason: "admin_delete",
            tables_affected: [],
            rows_deleted: {},
          });
        } catch { /* audit failure must not block deletion */ }
        await auditAdminAction(supabase, caller, "admin_delete_user", {
          target_user_id: target.id,
          target_email: target.email,
        });

        // Lane-scoped wipe. This table list mirrors the self-serve
        // deleteAccount in api/lib/admin/accounts-profile.ts; keep the two
        // in sync when a new tenant-scoped table appears.
        const rowsDeleted: Record<string, number> = {};
        const stepErrors: Record<string, string> = {};
        async function delByHash(table: string, col = "api_key_hash") {
          if (!apiKeyHash) return;
          try {
            const { count, error } = await supabase
              .from(table)
              .delete({ count: "exact" })
              .eq(col, apiKeyHash);
            rowsDeleted[table] = count ?? 0;
            if (error) stepErrors[table] = error.message;
          } catch (e) {
            stepErrors[table] = String(e);
            rowsDeleted[table] = 0;
          }
        }

        if (apiKeyHash) {
          await delByHash("mc_run_messages");
          await delByHash("mc_crew_runs");
          await delByHash("mc_crews");
          await delByHash("mc_facts_audit");
          await delByHash("mc_extracted_facts");
          await delByHash("mc_session_summaries");
          await delByHash("mc_conversation_log");
          await delByHash("mc_code_dumps");
          await delByHash("mc_business_context");
          await delByHash("mc_knowledge_library");
          await delByHash("mc_knowledge_library_history");
          await delByHash("mc_canonical_docs");
          try {
            const { count, error } = await supabase
              .from("mc_agents")
              .delete({ count: "exact" })
              .eq("api_key_hash", apiKeyHash)
              .eq("is_system", false);
            rowsDeleted["mc_agents"] = count ?? 0;
            if (error) stepErrors["mc_agents"] = error.message;
          } catch (e) {
            stepErrors["mc_agents"] = String(e);
            rowsDeleted["mc_agents"] = 0;
          }
          await delByHash("memory_configs");
          await delByHash("memory_devices");
          await delByHash("tenant_settings");
          await delByHash("tool_detections");
          await delByHash("tool_usage_events");
          await delByHash("user_credentials");
          await delByHash("platform_credentials");
          await delByHash("agent_trace");
          await delByHash("metering_events", "key_hash");
        }

        const { error: authErr } = await supabase.auth.admin.deleteUser(target.id);
        if (authErr) {
          return res.status(500).json({
            error: `auth.users delete failed: ${authErr.message}`,
            step: "auth_user",
            step_errors: stepErrors,
            rows_deleted: rowsDeleted,
          });
        }

        // api_keys.user_id is ON DELETE SET NULL; clean up by hash.
        if (allKeyHashes.length > 0) {
          try {
            await supabase.from("api_keys").delete().in("key_hash", allKeyHashes);
            if (apiKeyHash) {
              await supabase
                .from("api_keys")
                .delete()
                .or(`key_hash.eq.${apiKeyHash},lane_hash.eq.${apiKeyHash}`);
            }
          } catch { /* best effort */ }
        }

        const hasPartialErrors = Object.keys(stepErrors).length > 0;
        return res.status(200).json({
          success: true,
          rows_deleted: rowsDeleted,
          ...(hasPartialErrors && { partial: true, step_errors: stepErrors }),
        });
      }

      case "admin_recent_signups": {
        if (req.method !== "GET") {
          return res.status(405).json({ error: "GET required" });
        }
        // auth.admin.listUsers is service-role-only; paginates 50/page.
        // We ask for 100 to see recent week+ of signups on a small tenant.
        const { data, error } = await supabase.auth.admin.listUsers({
          page: 1,
          perPage: 100,
        });
        if (error) throw error;

        const users = (data?.users ?? [])
          .map((u) => ({
            id: u.id,
            email: u.email ?? null,
            provider:
              (u.app_metadata as { provider?: string } | undefined)?.provider ?? "email",
            created_at: u.created_at,
            last_sign_in_at: u.last_sign_in_at ?? null,
            confirmed: Boolean(u.email_confirmed_at ?? u.phone_confirmed_at),
          }))
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
          );

        return res.status(200).json({ users });
      }
      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }
  } catch (err: unknown) {
    console.error(`Admin users error (${action}):`, (err as Error).message);
    return res
      .status(500)
      .json({ error: `Failed to execute ${action}: ${(err as Error).message}` });
  }
}
