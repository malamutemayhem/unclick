import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth";
import { productName } from "@/config/product-names";
import { relativeTime } from "@/lib/relativeTime";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SharePill } from "@/components/circle/SharePill";
import { ShareLegend } from "@/components/circle/ShareLegend";
import { isWired, shareGroups, type PermissionKey, type PermissionState, type ShareResource } from "@/lib/circle/share";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  Loader2,
  Shield,
  ShieldOff,
  Sparkles,
  UserPlus,
  Users,
  X,
} from "lucide-react";

interface CirclePerson {
  user_id: string | null;
  email: string | null;
  display_name: string | null;
  avatar_url: string | null;
}

interface CircleLink {
  id: string;
  status: "pending" | "accepted";
  direction: "sent" | "received" | "linked";
  person: CirclePerson;
  created_at: string;
  accepted_at: string | null;
  permissions: Record<PermissionKey, PermissionState>;
}

interface AuditRow {
  id: string;
  action: string;
  permission: string | null;
  created_at: string;
  metadata?: Record<string, unknown>;
}

interface CircleResponse {
  me: { id: string; email: string | null };
  sharing_count: number;
  links: CircleLink[];
  audit: AuditRow[];
}

function timeAgo(iso: string | null) {
  return relativeTime(iso, { justNow: true });
}

function initials(person: CirclePerson) {
  const source = person.display_name || person.email || "?";
  return source.slice(0, 2).toUpperCase();
}

function personLabel(person: CirclePerson) {
  return person.display_name || person.email || "Pending account";
}

function actionLabel(action: string) {
  return action
    .split("_")
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}

export default function AdminCircle() {
  const { session } = useSession();
  const circleName = productName("circle");
  const [data, setData] = useState<CircleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [working, setWorking] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const accessToken = session?.access_token ?? "";
  const authHeader = useMemo(
    () => (accessToken ? { Authorization: `Bearer ${accessToken}` } : null),
    [accessToken],
  );

  const load = useCallback(async () => {
    if (!authHeader) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/account-links?action=list", { headers: authHeader });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Circle failed to load.");
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Circle failed to load.");
    } finally {
      setLoading(false);
    }
  }, [authHeader]);

  useEffect(() => {
    void load();
  }, [load]);

  const runAction = useCallback(
    async (action: string, body: Record<string, unknown>, key = action) => {
      if (!authHeader) return;
      setWorking(key);
      setError(null);
      try {
        const res = await fetch(`/api/account-links?action=${action}`, {
          method: "POST",
          headers: { ...authHeader, "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Circle action failed.");
        await load();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Circle action failed.");
      } finally {
        setWorking(null);
      }
    },
    [authHeader, load],
  );

  async function submitInvite(event: FormEvent) {
    event.preventDefault();
    const nextEmail = email.trim();
    if (!nextEmail) return;
    await runAction("invite", { email: nextEmail }, "invite");
    setEmail("");
  }

  const links = data?.links ?? [];
  const accepted = links.filter((link) => link.status === "accepted");
  const pendingIn = links.filter((link) => link.status === "pending" && link.direction === "received");
  const pendingOut = links.filter((link) => link.status === "pending" && link.direction === "sent");
  const hasActiveSharing = (data?.sharing_count ?? 0) > 0;

  function togglePermission(link: CircleLink, key: PermissionKey, direction: "give" | "receive") {
    const state = link.permissions[key];
    const enabled = direction === "give" ? !state.give_enabled : !state.receive_enabled;
    void runAction(
      "set_permission",
      { link_id: link.id, permission: key, direction, enabled },
      `${link.id}-${key}-${direction}`,
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
      <header className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Users className="h-3.5 w-3.5" />
            {data?.sharing_count ?? 0} sharing
          </div>
          <h1 className="text-3xl font-semibold tracking-normal text-foreground">{circleName}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Link human accounts and choose what is shared with each person. Each toggle is a handshake: it goes live only
            when both sides opt in.
          </p>
        </div>
        <Button
          variant={hasActiveSharing ? "destructive" : "outline"}
          disabled={!hasActiveSharing || working === "stop-all"}
          onClick={() => {
            if (window.confirm("Stop all active sharing from your account?")) {
              void runAction("stop_all_sharing", {}, "stop-all");
            }
          }}
        >
          {working === "stop-all" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldOff className="h-4 w-4" />}
          Stop all sharing
        </Button>
      </header>

      <form onSubmit={submitInvite} className="flex flex-col gap-3 rounded-lg border border-white/10 bg-card/40 p-4 sm:flex-row">
        <Input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="person@example.com"
          type="email"
          className="min-h-10 flex-1"
          aria-label="Circle invite email"
        />
        <Button type="submit" disabled={!email.trim() || working === "invite"} className="min-h-10">
          {working === "invite" ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
          Add to {circleName}
        </Button>
      </form>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex min-h-[240px] items-center justify-center text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Loading {circleName}
        </div>
      ) : (
        <>
          {pendingIn.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Waiting on you</h2>
              {pendingIn.map((link) => (
                <Card key={link.id} className="rounded-lg border-white/10 bg-card/70">
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <PersonSummary link={link} />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => void runAction("accept", { link_id: link.id }, `accept-${link.id}`)}>
                        <CheckCircle2 className="h-4 w-4" />
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => void runAction("decline", { link_id: link.id }, `decline-${link.id}`)}>
                        <X className="h-4 w-4" />
                        Decline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </section>
          )}

          {accepted.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">People</h2>
                <span className="text-xs text-muted-foreground">Click a chevron: left to receive, right to share.</span>
              </div>
              <ShareMatrix
                accepted={accepted}
                expanded={expanded}
                onToggleExpand={(id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))}
                working={working}
                onTogglePermission={togglePermission}
                onRemove={(link) => {
                  if (window.confirm(`Remove ${personLabel(link.person)} from ${circleName}?`)) {
                    void runAction("unlink", { link_id: link.id }, `unlink-${link.id}`);
                  }
                }}
              />
              <ShareLegend />
            </section>
          )}

          {pendingOut.length > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Invites sent</h2>
              {pendingOut.map((link) => (
                <Card key={link.id} className="rounded-lg border-white/10 bg-card/70">
                  <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <PersonSummary link={link} />
                    <Button size="sm" variant="outline" onClick={() => void runAction("cancel", { link_id: link.id }, `cancel-${link.id}`)}>
                      <X className="h-4 w-4" />
                      Cancel
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </section>
          )}

          {links.length === 0 && (
            <div className="rounded-lg border border-dashed border-white/15 p-8 text-center text-sm text-muted-foreground">
              No one is in your {circleName} yet.
            </div>
          )}

          {(data?.audit?.length ?? 0) > 0 && (
            <section className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">Access audit</h2>
              <div className="overflow-hidden rounded-lg border border-white/10">
                {data?.audit.slice(0, 8).map((row) => (
                  <div key={row.id} className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 text-sm first:border-t-0">
                    <span className="min-w-0 truncate text-foreground">{actionLabel(row.action)}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(row.created_at)}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

function ShareMatrix({
  accepted,
  expanded,
  onToggleExpand,
  working,
  onTogglePermission,
  onRemove,
}: {
  accepted: CircleLink[];
  expanded: Record<string, boolean>;
  onToggleExpand: (id: string) => void;
  working: string | null;
  onTogglePermission: (link: CircleLink, key: PermissionKey, direction: "give" | "receive") => void;
  onRemove: (link: CircleLink) => void;
}) {
  const gridTemplateColumns = `minmax(190px, 1.4fr) repeat(${accepted.length}, minmax(88px, 1fr))`;

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10 bg-card/40">
      <div className="min-w-max">
        {/* Header: people across the top */}
        <div className="grid items-end border-b border-white/10" style={{ gridTemplateColumns }}>
          <div className="px-4 py-3 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">Sharing</div>
          {accepted.map((link) => (
            <div key={link.id} className="flex flex-col items-center gap-1 px-2 py-3">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-primary/10 text-xs font-semibold text-primary">
                {link.person.avatar_url ? (
                  <img src={link.person.avatar_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  initials(link.person)
                )}
              </div>
              <span className="max-w-[96px] truncate text-xs text-foreground" title={personLabel(link.person)}>
                {personLabel(link.person)}
              </span>
              <button
                type="button"
                onClick={() => onRemove(link)}
                className="text-[10px] text-muted-foreground/70 underline-offset-2 hover:text-red-300 hover:underline"
              >
                remove
              </button>
            </div>
          ))}
        </div>

        {/* Rows: resources down the side */}
        {shareGroups().map(({ group, children }) => {
          const wired = isWired(group);
          const open = !!expanded[group.id];
          return (
            <div key={group.id}>
              <div className="grid items-center border-t border-white/[0.06]" style={{ gridTemplateColumns }}>
                <div className="flex items-center gap-2 px-4 py-3">
                  {children.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => onToggleExpand(group.id)}
                      className="flex h-5 w-5 items-center justify-center rounded text-muted-foreground hover:bg-white/5 hover:text-foreground"
                      aria-label={open ? `Collapse ${group.label}` : `Expand ${group.label}`}
                    >
                      {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </button>
                  ) : (
                    <span className="h-5 w-5" />
                  )}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{group.label}</span>
                      {!wired && <SoonChip sensitive={group.sensitive} />}
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{group.description}</p>
                  </div>
                </div>
                {accepted.map((link) => (
                  <div key={link.id} className="flex justify-center px-2 py-3">
                    {wired && group.backendKey ? (
                      <SharePill
                        state={link.permissions[group.backendKey]}
                        busy={
                          working === `${link.id}-${group.backendKey}-give` ||
                          working === `${link.id}-${group.backendKey}-receive`
                        }
                        onToggle={(direction) => onTogglePermission(link, group.backendKey as PermissionKey, direction)}
                        label={`${group.label} sharing with ${personLabel(link.person)}`}
                      />
                    ) : (
                      <SharePill state={undefined} disabled onToggle={() => {}} />
                    )}
                  </div>
                ))}
              </div>

              {open &&
                children.map((child) => (
                  <ChildRow key={child.id} child={child} accepted={accepted} gridTemplateColumns={gridTemplateColumns} />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChildRow({
  child,
  accepted,
  gridTemplateColumns,
}: {
  child: ShareResource;
  accepted: CircleLink[];
  gridTemplateColumns: string;
}) {
  return (
    <div className="grid items-center border-t border-white/[0.04] bg-white/[0.015]" style={{ gridTemplateColumns }}>
      <div className="flex items-center gap-2 py-2.5 pl-11 pr-4">
        <span className="text-xs text-muted-foreground">{child.label}</span>
        <SoonChip />
      </div>
      {accepted.map((link) => (
        <div key={link.id} className="flex justify-center px-2 py-2.5">
          <SharePill state={undefined} disabled onToggle={() => {}} />
        </div>
      ))}
    </div>
  );
}

function SoonChip({ sensitive }: { sensitive?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-1.5 py-0.5 text-[10px] text-muted-foreground">
      <Sparkles className="h-2.5 w-2.5" />
      {sensitive ? "needs sign-off" : "soon"}
    </span>
  );
}

function PersonSummary({ link }: { link: CircleLink }) {
  const label = personLabel(link.person);
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-primary/10 text-sm font-semibold text-primary">
        {link.person.avatar_url ? <img src={link.person.avatar_url} alt="" className="h-full w-full object-cover" /> : initials(link.person)}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-foreground">{label}</p>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          {link.status === "accepted" ? (
            <>
              <Shield className="h-3 w-3 text-primary" />
              Linked {timeAgo(link.accepted_at)}
            </>
          ) : (
            <>
              <Clock className="h-3 w-3 text-amber-300" />
              Pending {timeAgo(link.created_at)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
