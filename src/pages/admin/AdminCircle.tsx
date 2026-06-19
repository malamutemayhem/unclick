import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth";
import { productName } from "@/config/product-names";
import { relativeTime } from "@/lib/relativeTime";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Loader2,
  Shield,
  ShieldOff,
  UserPlus,
  Users,
  X,
} from "lucide-react";

type PermissionKey = "shared_memory" | "shared_orchestrator";

interface PermissionState {
  give_enabled: boolean;
  give_accepted: boolean;
  give_active: boolean;
  receive_enabled: boolean;
  receive_offered: boolean;
  receive_active: boolean;
}

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

const PERMISSIONS: Array<{
  id: PermissionKey;
  giveLabel: string;
  receiveLabel: string;
  giveConsequence: string;
  receiveConsequence: string;
}> = [
  {
    id: "shared_memory",
    giveLabel: "They can see my memory",
    receiveLabel: "I can receive their memory",
    giveConsequence: "Facts, preferences, and session summaries become available only after both sides opt in.",
    receiveConsequence: "Their memory becomes available only after they share it and you opt in.",
  },
  {
    id: "shared_orchestrator",
    giveLabel: "They can see my chat log",
    receiveLabel: "I can receive their chat log",
    giveConsequence: "Conversation continuity becomes available only after both sides opt in.",
    receiveConsequence: "Their chat continuity becomes available only after they share it and you opt in.",
  },
];

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

function statusFor(state: PermissionState, side: "give" | "receive") {
  if (side === "give") {
    if (state.give_active) return { label: "Active", className: "text-emerald-300" };
    if (state.give_enabled) return { label: "Waiting for them", className: "text-amber-300" };
    if (state.give_accepted) return { label: "They opted in", className: "text-sky-300" };
    return { label: "Off", className: "text-muted-foreground" };
  }
  if (state.receive_active) return { label: "Active", className: "text-emerald-300" };
  if (state.receive_enabled) return { label: "Waiting for them", className: "text-amber-300" };
  if (state.receive_offered) return { label: "Offered", className: "text-sky-300" };
  return { label: "Off", className: "text-muted-foreground" };
}

function PermissionToggle({
  label,
  consequence,
  status,
  checked,
  busy,
  onChange,
}: {
  label: string;
  consequence: string;
  status: { label: string; className: string };
  checked: boolean;
  busy: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex min-h-[72px] items-start justify-between gap-4 border-t border-white/10 py-4 first:border-t-0">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <span className={`text-xs font-medium ${status.className}`}>{status.label}</span>
        </div>
        <p className="mt-1 max-w-[680px] text-xs leading-relaxed text-muted-foreground">{consequence}</p>
      </div>
      <Switch checked={checked} disabled={busy} onCheckedChange={onChange} aria-label={label} />
    </div>
  );
}

export default function AdminCircle() {
  const { session } = useSession();
  const circleName = productName("circle");
  const [data, setData] = useState<CircleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [working, setWorking] = useState<string | null>(null);

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

  async function runAction(action: string, body: Record<string, unknown>, key = action) {
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
  }

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
            Link human accounts and choose what is shared with each person.
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
              <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-muted-foreground">People</h2>
              {accepted.map((link) => (
                <Card key={link.id} className="rounded-lg border-white/10 bg-card/70">
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <PersonSummary link={link} />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (window.confirm(`Remove ${personLabel(link.person)} from ${circleName}?`)) {
                            void runAction("unlink", { link_id: link.id }, `unlink-${link.id}`);
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                    <div className="mt-4">
                      {PERMISSIONS.map((permission) => {
                        const state = link.permissions[permission.id];
                        return (
                          <div key={permission.id} className="grid gap-0 lg:grid-cols-2 lg:gap-6">
                            <PermissionToggle
                              label={permission.giveLabel}
                              consequence={permission.giveConsequence}
                              status={statusFor(state, "give")}
                              checked={state.give_enabled}
                              busy={working === `${link.id}-${permission.id}-give`}
                              onChange={(enabled) =>
                                void runAction(
                                  "set_permission",
                                  { link_id: link.id, permission: permission.id, direction: "give", enabled },
                                  `${link.id}-${permission.id}-give`,
                                )
                              }
                            />
                            <PermissionToggle
                              label={permission.receiveLabel}
                              consequence={permission.receiveConsequence}
                              status={statusFor(state, "receive")}
                              checked={state.receive_enabled}
                              busy={working === `${link.id}-${permission.id}-receive`}
                              onChange={(enabled) =>
                                void runAction(
                                  "set_permission",
                                  { link_id: link.id, permission: permission.id, direction: "receive", enabled },
                                  `${link.id}-${permission.id}-receive`,
                                )
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
