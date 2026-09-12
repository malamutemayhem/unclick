// User Management - every account on UnClick in one AppsTable-style list.
//
// One compact, full-width, single-line row per account with sortable headers
// and instant search/role/status filtering, matching the Apps library table.
// Click a row to expand its detail panel with the management actions:
// grant/remove superuser, revoke/restore keys, suspend/unsuspend, and delete
// (typed-email confirm). Data comes from /api/admin-users, which shares its
// role model with the admin gate (api/lib/admin-roles.ts).
//
// The GOD account (surfaced by role "god") is protected end to end: the
// backend refuses every mutating action against it, and this page never
// offers one. Env-listed superusers (role_source "env") can only be demoted
// by editing the ADMIN_EMAILS env var, so that button explains itself
// instead of firing a request that would 409.

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  Ban,
  ChevronRight,
  Crown,
  KeyRound,
  Loader2,
  RefreshCw,
  Search,
  ShieldCheck,
  Trash2,
  Users,
} from "lucide-react";
import { useSession } from "@/lib/auth";
import { MasterConnectorsPanel } from "./MasterConnectorsPanel";

type Role = "god" | "superuser" | "user";
type RoleSource = "god" | "env" | "assigned" | null;

interface KeySummary {
  prefix: string;
  tier: string;
  active: boolean;
  usage_count: number;
  last_used_at: string | null;
}

interface AdminUserRow {
  id: string;
  email: string | null;
  provider: string;
  created_at: string;
  last_sign_in_at: string | null;
  confirmed: boolean;
  role: Role;
  role_source: RoleSource;
  suspended: boolean;
  key: KeySummary | null;
  worker_keys: number;
  any_key_active: boolean;
}

type SortKey = "email" | "role" | "tier" | "created_at" | "last_sign_in_at" | "usage" | "status";
type StatusFilter = "all" | "active" | "suspended" | "keys_revoked" | "no_key";

const ROLE_ORDER: Record<Role, number> = { god: 0, superuser: 1, user: 2 };

const ROLE_PILL: Record<Role, { label: string; tone: string }> = {
  god: {
    label: "GOD",
    tone: "border-[#E2B93B]/40 bg-[#E2B93B]/10 text-[#E2B93B]",
  },
  superuser: {
    label: "Superuser",
    tone: "border-[#61C1C4]/25 bg-[#61C1C4]/10 text-[#9be4e6]",
  },
  user: {
    label: "User",
    tone: "border-white/10 bg-white/[0.04] text-white/55",
  },
};

type StatusKind = "active" | "suspended" | "keys_revoked" | "no_key";

function statusOf(u: AdminUserRow): { kind: StatusKind; label: string; tone: string } {
  if (u.suspended) {
    return { kind: "suspended", label: "Suspended", tone: "border-red-300/25 bg-red-300/10 text-red-200" };
  }
  if (u.key && !u.any_key_active) {
    return { kind: "keys_revoked", label: "Keys revoked", tone: "border-amber-300/25 bg-amber-300/10 text-amber-100" };
  }
  if (!u.key) {
    return { kind: "no_key", label: "No key", tone: "border-white/10 bg-white/[0.04] text-white/40" };
  }
  return { kind: "active", label: "Active", tone: "border-emerald-300/25 bg-emerald-300/10 text-emerald-100" };
}

function dayOf(iso: string | null | undefined): string {
  return iso ? iso.slice(0, 10) : "-";
}

function SortHeader({
  label, col, sortKey, sortDir, onSort, className,
}: {
  label: string; col: SortKey; sortKey: SortKey; sortDir: "asc" | "desc";
  onSort: (k: SortKey) => void; className?: string;
}) {
  const active = sortKey === col;
  return (
    <button
      type="button"
      onClick={() => onSort(col)}
      className={`flex items-center gap-1 text-left text-[10px] font-semibold uppercase tracking-wide transition-colors ${active ? "text-white/70" : "text-white/35 hover:text-white/55"} ${className ?? ""}`}
    >
      {label}
      {active && (sortDir === "asc" ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
    </button>
  );
}

// Column template: User | Role | Tier | Joined | Last seen | Usage | Status
const COLS =
  "grid-cols-[minmax(0,1fr)_92px_100px] sm:grid-cols-[minmax(180px,1.6fr)_96px_72px_88px_88px_60px_110px]";

export default function AdminUsers() {
  const { session } = useSession();
  const [users, setUsers] = useState<AdminUserRow[] | null>(null);
  const [callerId, setCallerId] = useState<string | null>(null);
  const [truncated, setTruncated] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [query, setQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [busyId, setBusyId] = useState<string | null>(null);
  const [actionError, setActionError] = useState<{ id: string; message: string } | null>(null);
  const [deleteArmed, setDeleteArmed] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const token = session?.access_token;

  const load = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setLoadError(null);
    try {
      const r = await fetch("/api/admin-users?action=admin_list_users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const body = await r.json().catch(() => null);
      if (!r.ok) {
        throw new Error((body as { error?: string } | null)?.error ?? `HTTP ${r.status}`);
      }
      setUsers((body?.users ?? []) as AdminUserRow[]);
      setCallerId((body?.caller?.id as string | undefined) ?? null);
      setTruncated(Boolean(body?.truncated));
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  const doAction = useCallback(
    async (action: string, userId: string, body: Record<string, unknown>) => {
      if (!token) return;
      setBusyId(userId);
      setActionError(null);
      try {
        const r = await fetch(`/api/admin-users?action=${action}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_id: userId, ...body }),
        });
        const resBody = await r.json().catch(() => null);
        if (!r.ok) {
          throw new Error((resBody as { error?: string } | null)?.error ?? `HTTP ${r.status}`);
        }
        setDeleteArmed(null);
        setDeleteConfirm("");
        await load();
      } catch (e) {
        setActionError({ id: userId, message: e instanceof Error ? e.message : String(e) });
      } finally {
        setBusyId(null);
      }
    },
    [token, load],
  );

  function toggleSort(k: SortKey) {
    if (sortKey === k) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(k);
      setSortDir(k === "created_at" || k === "last_sign_in_at" || k === "usage" ? "desc" : "asc");
    }
  }

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const filtered = useMemo(() => {
    const list = users ?? [];
    const q = query.trim().toLowerCase();
    const matched = list.filter((u) => {
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (statusFilter !== "all" && statusOf(u).kind !== statusFilter) return false;
      if (!q) return true;
      return (
        (u.email ?? "").toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.provider.toLowerCase().includes(q) ||
        u.role.includes(q)
      );
    });
    const dir = sortDir === "asc" ? 1 : -1;
    const time = (iso: string | null) => (iso ? new Date(iso).getTime() : 0);
    return [...matched].sort((a, b) => {
      switch (sortKey) {
        case "email":
          return dir * (a.email ?? "").localeCompare(b.email ?? "");
        case "role":
          return dir * (ROLE_ORDER[a.role] - ROLE_ORDER[b.role]);
        case "tier":
          return dir * (a.key?.tier ?? "").localeCompare(b.key?.tier ?? "");
        case "created_at":
          return dir * (time(a.created_at) - time(b.created_at));
        case "last_sign_in_at":
          return dir * (time(a.last_sign_in_at) - time(b.last_sign_in_at));
        case "usage":
          return dir * ((a.key?.usage_count ?? 0) - (b.key?.usage_count ?? 0));
        case "status":
          return dir * statusOf(a).label.localeCompare(statusOf(b).label);
        default:
          return 0;
      }
    });
  }, [users, query, roleFilter, statusFilter, sortKey, sortDir]);

  const total = users?.length ?? 0;
  const superusers = (users ?? []).filter((u) => u.role !== "user").length;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Users className="h-6 w-6 text-[#E2B93B]" />
        <h1 className="text-2xl font-semibold text-white">User Management</h1>
        {users && (
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/50">
            {total} account{total === 1 ? "" : "s"} - {superusers} superuser{superusers === 1 ? "" : "s"}
          </span>
        )}
      </div>

      <MasterConnectorsPanel token={token} />

      {/* Controls: search, role/status dropdowns, refresh - same one-row
          layout as the Apps table. */}
      <div className="mb-3 mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex w-full flex-wrap items-center gap-2 lg:flex-1">
          <div className="relative min-w-[200px] flex-1 sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users by email or id..."
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2 pl-9 pr-3 text-xs text-white placeholder:text-white/30 focus:border-[#61C1C4]/40 focus:outline-none"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as Role | "all")}
            aria-label="Filter by role"
            className="rounded-lg border border-white/[0.08] bg-[#0b2533] px-2.5 py-2 text-xs text-white/70 focus:border-[#61C1C4]/40 focus:outline-none"
          >
            <option value="all">All roles</option>
            <option value="god">GOD</option>
            <option value="superuser">Superuser</option>
            <option value="user">User</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            aria-label="Filter by status"
            className="rounded-lg border border-white/[0.08] bg-[#0b2533] px-2.5 py-2 text-xs text-white/70 focus:border-[#61C1C4]/40 focus:outline-none"
          >
            <option value="all">Any status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="keys_revoked">Keys revoked</option>
            <option value="no_key">No key</option>
          </select>
        </div>
        <div className="flex items-center gap-3 text-[11px] text-white/40">
          <span>{filtered.length} shown</span>
          <button
            type="button"
            disabled={loading}
            onClick={() => void load()}
            className="inline-flex items-center gap-1.5 rounded-md border border-[#61C1C4]/25 bg-[#61C1C4]/10 px-2.5 py-1 font-semibold text-[#9FE0E2] transition-colors hover:bg-[#61C1C4]/15 disabled:opacity-50"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </button>
        </div>
      </div>

      {truncated && (
        <div className="mb-3 rounded-lg border border-amber-300/20 bg-amber-300/[0.06] px-3 py-2 text-[11px] text-amber-100">
          The list hit the server page cap, so some older accounts are not shown here yet.
        </div>
      )}

      {/* Header row */}
      <div className={`grid ${COLS} items-center gap-3 border-b border-white/[0.08] px-3 py-2`}>
        <SortHeader label="User" col="email" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
        <SortHeader label="Role" col="role" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} />
        <SortHeader label="Tier" col="tier" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} className="hidden sm:flex" />
        <SortHeader label="Joined" col="created_at" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} className="hidden sm:flex" />
        <SortHeader label="Last seen" col="last_sign_in_at" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} className="hidden sm:flex" />
        <SortHeader label="Usage" col="usage" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} className="hidden justify-end sm:flex" />
        <SortHeader label="Status" col="status" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} className="justify-end" />
      </div>

      {/* Rows */}
      <div className="divide-y divide-white/[0.04]">
        {loading && !users ? (
          <div className="flex items-center justify-center gap-2 px-3 py-8 text-xs text-white/40">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading accounts...
          </div>
        ) : loadError ? (
          <div className="flex flex-col items-center gap-2 px-3 py-8 text-xs text-red-200">
            <span>Could not load users: {loadError}</span>
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-semibold text-white/60 hover:bg-white/[0.07]"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            {filtered.map((u) => {
              const open = expanded.has(u.id);
              const status = statusOf(u);
              const pill = ROLE_PILL[u.role];
              const isSelf = callerId != null && u.id === callerId;
              const isGod = u.role === "god";
              const busy = busyId === u.id;
              const rowError = actionError?.id === u.id ? actionError.message : null;
              const armed = deleteArmed === u.id;
              const emailMatches =
                (u.email ?? "").length > 0 &&
                deleteConfirm.trim().toLowerCase() === (u.email ?? "").toLowerCase();
              return (
                <div key={u.id}>
                  <div
                    role="button"
                    tabIndex={0}
                    aria-expanded={open}
                    onClick={() => toggleExpand(u.id)}
                    onKeyDown={(e) => {
                      if ((e.key === "Enter" || e.key === " ") && e.target === e.currentTarget) {
                        e.preventDefault();
                        toggleExpand(u.id);
                      }
                    }}
                    className={`grid ${COLS} cursor-pointer items-center gap-3 px-3 py-1.5 text-xs transition-colors hover:bg-white/[0.02] focus:bg-white/[0.03] focus:outline-none ${u.suspended ? "opacity-60" : ""}`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <ChevronRight className={`h-3 w-3 shrink-0 transition-transform ${open ? "rotate-90 text-[#61C1C4]" : "text-white/30"}`} />
                      {isGod && <Crown className="h-3.5 w-3.5 shrink-0 text-[#E2B93B]" />}
                      <span className="truncate font-medium text-white">
                        {u.email ?? u.id}
                      </span>
                      {isSelf && <span className="shrink-0 text-[10px] text-white/35">(you)</span>}
                    </span>
                    <span className={`justify-self-start rounded border px-1.5 py-0.5 text-[10px] font-medium ${pill.tone}`}>
                      {pill.label}
                    </span>
                    <span className="hidden truncate text-white/45 sm:block">{u.key?.tier ?? "-"}</span>
                    <span className="hidden text-white/45 sm:block">{dayOf(u.created_at)}</span>
                    <span className="hidden text-white/45 sm:block">{dayOf(u.last_sign_in_at)}</span>
                    <span className="hidden justify-self-end tabular-nums text-white/40 sm:block">
                      {u.key ? u.key.usage_count : "-"}
                    </span>
                    <span className={`justify-self-end rounded border px-1.5 py-0.5 text-[10px] font-medium ${status.tone}`}>
                      {status.label}
                    </span>
                  </div>

                  {open && (
                    <div className="bg-white/[0.015] px-3 pb-3 pt-1">
                      {/* Detail strip */}
                      <div className="mb-2 grid gap-x-6 gap-y-1 text-[11px] text-white/50 sm:grid-cols-2 lg:grid-cols-4">
                        <span className="truncate" title={u.id}>ID: <span className="font-mono text-white/60">{u.id}</span></span>
                        <span>Provider: <span className="text-white/60">{u.provider}</span></span>
                        <span>Email confirmed: <span className="text-white/60">{u.confirmed ? "yes" : "no"}</span></span>
                        <span>
                          Key: <span className="font-mono text-white/60">{u.key ? `${u.key.prefix}...` : "none"}</span>
                          {u.worker_keys > 0 && <span className="text-white/40"> (+{u.worker_keys} worker)</span>}
                        </span>
                      </div>

                      {rowError && (
                        <div className="mb-2 rounded-lg border border-red-300/20 bg-red-300/[0.06] px-3 py-2 text-[11px] text-red-200">
                          {rowError}
                        </div>
                      )}

                      {isGod ? (
                        <div className="flex items-center gap-2 rounded-lg border border-[#E2B93B]/20 bg-[#E2B93B]/[0.05] px-3 py-2 text-[11px] text-[#E2B93B]">
                          <Crown className="h-3.5 w-3.5" />
                          GOD account - protected. It cannot be modified or deleted from here by anyone.
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-2">
                          {/* Superuser grant / revoke */}
                          {u.role === "user" ? (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void doAction("admin_set_role", u.id, { role: "superuser" })}
                              className="inline-flex items-center gap-1.5 rounded-md border border-[#61C1C4]/25 bg-[#61C1C4]/10 px-2.5 py-1 text-[10px] font-semibold text-[#9FE0E2] transition-colors hover:bg-[#61C1C4]/15 disabled:opacity-50"
                            >
                              <ShieldCheck className="h-3 w-3" />
                              Make superuser
                            </button>
                          ) : u.role_source === "env" ? (
                            <span
                              title="Set in the ADMIN_EMAILS env var. Remove the email there to demote."
                              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-semibold text-white/35"
                            >
                              <ShieldCheck className="h-3 w-3" />
                              Superuser via env
                            </span>
                          ) : (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void doAction("admin_set_role", u.id, { role: "user" })}
                              className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold text-white/60 transition-colors hover:bg-white/[0.07] disabled:opacity-50"
                            >
                              <ShieldCheck className="h-3 w-3" />
                              Remove superuser
                            </button>
                          )}

                          {/* Keys */}
                          {u.key && (u.any_key_active ? (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void doAction("admin_set_keys_active", u.id, { active: false })}
                              className="inline-flex items-center gap-1.5 rounded-md border border-amber-300/25 bg-amber-300/10 px-2.5 py-1 text-[10px] font-semibold text-amber-100 transition-colors hover:bg-amber-300/15 disabled:opacity-50"
                            >
                              <KeyRound className="h-3 w-3" />
                              Revoke keys
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void doAction("admin_set_keys_active", u.id, { active: true })}
                              className="inline-flex items-center gap-1.5 rounded-md border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-100 transition-colors hover:bg-emerald-300/15 disabled:opacity-50"
                            >
                              <KeyRound className="h-3 w-3" />
                              Restore keys
                            </button>
                          ))}

                          {/* Suspend */}
                          {u.suspended ? (
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void doAction("admin_set_suspended", u.id, { suspended: false })}
                              className="inline-flex items-center gap-1.5 rounded-md border border-emerald-300/25 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-100 transition-colors hover:bg-emerald-300/15 disabled:opacity-50"
                            >
                              <Ban className="h-3 w-3" />
                              Unsuspend
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={busy || isSelf}
                              title={isSelf ? "You cannot suspend your own account." : undefined}
                              onClick={() => void doAction("admin_set_suspended", u.id, { suspended: true })}
                              className="inline-flex items-center gap-1.5 rounded-md border border-amber-300/25 bg-amber-300/10 px-2.5 py-1 text-[10px] font-semibold text-amber-100 transition-colors hover:bg-amber-300/15 disabled:opacity-50"
                            >
                              <Ban className="h-3 w-3" />
                              Suspend
                            </button>
                          )}

                          {/* Delete: two-step, typed-email confirm */}
                          {!armed ? (
                            <button
                              type="button"
                              disabled={busy || isSelf}
                              title={isSelf ? "Use account settings to delete your own account." : undefined}
                              onClick={() => {
                                setDeleteArmed(u.id);
                                setDeleteConfirm("");
                              }}
                              className="inline-flex items-center gap-1.5 rounded-md border border-red-300/25 px-2.5 py-1 text-[10px] font-semibold text-red-200 transition-colors hover:bg-red-300/10 disabled:opacity-50"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete user...
                            </button>
                          ) : (
                            <span className="inline-flex flex-wrap items-center gap-2 rounded-lg border border-red-300/20 bg-red-300/[0.05] px-2.5 py-1.5">
                              <span className="text-[10px] text-red-200">
                                Type the email to permanently delete this account and all its data:
                              </span>
                              <input
                                value={deleteConfirm}
                                onChange={(e) => setDeleteConfirm(e.target.value)}
                                placeholder={u.email ?? ""}
                                aria-label="Confirm email to delete"
                                className="rounded border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-white placeholder:text-white/25 focus:border-red-300/40 focus:outline-none"
                              />
                              <button
                                type="button"
                                disabled={busy || !emailMatches}
                                onClick={() =>
                                  void doAction("admin_delete_user", u.id, { confirm_email: deleteConfirm.trim() })
                                }
                                className="rounded-md border border-red-300/40 bg-red-300/15 px-2.5 py-1 text-[10px] font-semibold text-red-100 transition-colors hover:bg-red-300/20 disabled:opacity-40"
                              >
                                {busy ? <Loader2 className="h-3 w-3 animate-spin" /> : "Delete forever"}
                              </button>
                              <button
                                type="button"
                                disabled={busy}
                                onClick={() => {
                                  setDeleteArmed(null);
                                  setDeleteConfirm("");
                                }}
                                className="rounded-md border border-white/10 px-2.5 py-1 text-[10px] font-semibold text-white/50 hover:bg-white/[0.05]"
                              >
                                Cancel
                              </button>
                            </span>
                          )}

                          {busy && <Loader2 className="h-3.5 w-3.5 animate-spin text-white/40" />}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="px-3 py-8 text-center text-xs text-white/40">
                No accounts match that filter.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
