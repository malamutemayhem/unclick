import { FormEvent, useCallback, useEffect, useMemo, useState, type ComponentType } from "react";
import { useSession } from "@/lib/auth";
import { productName } from "@/config/product-names";
import { relativeTime } from "@/lib/relativeTime";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  AppWindow,
  BookOpen,
  Brain,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Database,
  FileStack,
  FolderKanban,
  Loader2,
  MessageSquare,
  SearchCheck,
  Shield,
  ShieldOff,
  SlidersHorizontal,
  UserPlus,
  Users,
  X,
} from "lucide-react";

type PermissionKey = "shared_memory" | "shared_orchestrator";
type PermissionDirection = "give" | "receive";
type GlyphMode = "self" | "handshake" | "give" | "receive" | "neutral" | "locked";

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

interface MatrixRow {
  id: string;
  label: string;
  detail: string;
  icon: ComponentType<{ className?: string }>;
  permission?: PermissionKey;
  derivedFrom?: PermissionKey;
  dimmed?: boolean;
}

interface MatrixSection {
  id: string;
  label: string;
  accent?: "default" | "apps";
  rows: MatrixRow[];
}

const MATRIX_SECTIONS: MatrixSection[] = [
  {
    id: "memory",
    label: "Memory",
    rows: [
      {
        id: "memory-bundle",
        label: "Memory Bundle",
        detail: "Facts, preferences, summaries, and saved context.",
        icon: Brain,
        permission: "shared_memory",
      },
      {
        id: "saved-facts",
        label: "Saved Facts",
        detail: "Covered by Memory Bundle.",
        icon: Database,
        derivedFrom: "shared_memory",
        dimmed: true,
      },
      {
        id: "library",
        label: "Library",
        detail: "Covered by Memory Bundle.",
        icon: BookOpen,
        derivedFrom: "shared_memory",
        dimmed: true,
      },
      {
        id: "chats",
        label: "Chats",
        detail: "Covered by Orchestrator.",
        icon: MessageSquare,
        derivedFrom: "shared_orchestrator",
        dimmed: true,
      },
      {
        id: "files-notes",
        label: "Files & Notes",
        detail: "Covered by Memory Bundle.",
        icon: FileStack,
        derivedFrom: "shared_memory",
        dimmed: true,
      },
      {
        id: "project-briefs",
        label: "Project Briefs",
        detail: "Covered by Memory Bundle.",
        icon: FolderKanban,
        derivedFrom: "shared_memory",
        dimmed: true,
      },
      {
        id: "preferences",
        label: "Preferences",
        detail: "Covered by Memory Bundle.",
        icon: SlidersHorizontal,
        derivedFrom: "shared_memory",
        dimmed: true,
      },
      {
        id: "recall-check",
        label: "Recall Check",
        detail: "Covered by Memory Bundle.",
        icon: SearchCheck,
        derivedFrom: "shared_memory",
        dimmed: true,
      },
    ],
  },
  {
    id: "orchestrator",
    label: "Orchestrator",
    rows: [
      {
        id: "orchestrator-continuity",
        label: "Orchestrator",
        detail: "Chat continuity and session context.",
        icon: MessageSquare,
        permission: "shared_orchestrator",
      },
    ],
  },
  {
    id: "apps",
    label: "Apps",
    accent: "apps",
    rows: [
      {
        id: "app-mandates",
        label: "App Mandates",
        detail: "Scoped app delegation requires mandate receipts.",
        icon: AppWindow,
        dimmed: true,
      },
      { id: "dropbox", label: "Dropbox", detail: "No mandate active.", icon: AppWindow, dimmed: true },
      { id: "google-drive", label: "Google Drive", detail: "No mandate active.", icon: AppWindow, dimmed: true },
      { id: "gmail", label: "Gmail", detail: "No mandate active.", icon: AppWindow, dimmed: true },
      { id: "spotify", label: "Spotify", detail: "No mandate active.", icon: AppWindow, dimmed: true },
      { id: "onedrive", label: "OneDrive", detail: "No mandate active.", icon: AppWindow, dimmed: true },
      { id: "github", label: "GitHub", detail: "No mandate active.", icon: AppWindow, dimmed: true },
    ],
  },
];

function timeAgo(iso: string | null) {
  return relativeTime(iso, { justNow: true });
}

function initials(person: CirclePerson) {
  const source = person.display_name || person.email || "?";
  return source.slice(0, 2).toUpperCase();
}

function initialsFromLabel(label: string | null | undefined) {
  return (label || "?").slice(0, 2).toUpperCase();
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

function stateMode(state: PermissionState | null | undefined): GlyphMode {
  if (!state) return "locked";
  const giveVisible = state.give_active || state.give_enabled || state.give_accepted;
  const receiveVisible = state.receive_active || state.receive_enabled || state.receive_offered;

  if (giveVisible && receiveVisible) return "handshake";
  if (giveVisible) return "give";
  if (receiveVisible) return "receive";
  return "neutral";
}

function stateLabel(state: PermissionState | null | undefined) {
  if (!state) return "Locked";
  if (state.give_active && state.receive_active) return "Two-way";
  if (state.give_active) return "Sharing";
  if (state.receive_active) return "Receiving";
  if (state.give_enabled || state.receive_enabled) return "Pending";
  if (state.give_accepted || state.receive_offered) return "Offered";
  return "Off";
}

function personStatus(link: CircleLink) {
  if (link.status === "accepted") return `Linked ${timeAgo(link.accepted_at)}`;
  return `Pending ${timeAgo(link.created_at)}`;
}

function PermissionGlyph({
  mode,
  dimmed = false,
  busy = false,
  className,
}: {
  mode: GlyphMode;
  dimmed?: boolean;
  busy?: boolean;
  className?: string;
}) {
  const live = mode === "self" || mode === "handshake" || mode === "give" || mode === "receive";
  const knobRight = mode === "self" || mode === "handshake" || mode === "give";
  const showArrows = mode !== "self" && mode !== "locked";

  return (
    <div
      className={cn(
        "relative mx-auto flex h-9 w-[96px] items-center justify-between overflow-hidden rounded-full border px-3 transition",
        live
          ? "border-[#7CF4AF]/70 bg-[#3CD783]/30 text-[#D9FFE8] shadow-[0_0_18px_rgba(124,244,175,0.35)]"
          : "border-white/15 bg-[#071821] text-white/30",
        mode === "locked" && "border-white/10 bg-white/[0.03] text-white/20",
        dimmed && "opacity-45 grayscale",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-1 h-7 w-7 rounded-full border transition-all",
          live
            ? "border-[#CFFFE2]/60 bg-[#CFFFE2] shadow-[0_0_12px_rgba(207,255,226,0.6)]"
            : "border-white/20 bg-white/[0.06]",
          knobRight ? "right-1" : "left-1",
        )}
      />
      {showArrows ? <ChevronLeft className="relative z-10 h-4 w-4" /> : <span className="relative z-10 h-4 w-4" />}
      {showArrows ? <ChevronRight className="relative z-10 h-4 w-4" /> : <span className="relative z-10 h-4 w-4" />}
      {busy && (
        <span className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-[#071821]/75">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </span>
      )}
    </div>
  );
}

function PermissionCell({
  link,
  row,
  state,
  busy,
  onChange,
}: {
  link: CircleLink;
  row: MatrixRow & { permission: PermissionKey };
  state: PermissionState;
  busy: boolean;
  onChange: (direction: PermissionDirection, enabled: boolean) => void;
}) {
  const label = personLabel(link.person);
  const mode = stateMode(state);

  return (
    <div className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 px-3 py-3">
      <div className="relative h-9 w-[96px]">
        <PermissionGlyph mode={mode} busy={busy} />
        <button
          type="button"
          aria-label={`Receive ${row.label} from ${label}`}
          aria-pressed={state.receive_enabled}
          title={`Receive ${row.label} from ${label}`}
          disabled={busy}
          onClick={() => onChange("receive", !state.receive_enabled)}
          className="absolute inset-y-0 left-0 z-30 w-1/2 rounded-l-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
        <button
          type="button"
          aria-label={`Share my ${row.label} with ${label}`}
          aria-pressed={state.give_enabled}
          title={`Share my ${row.label} with ${label}`}
          disabled={busy}
          onClick={() => onChange("give", !state.give_enabled)}
          className="absolute inset-y-0 right-0 z-30 w-1/2 rounded-r-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>
      <span className="max-w-[112px] truncate text-[11px] font-medium text-white/55">{stateLabel(state)}</span>
    </div>
  );
}

function VisualPermissionCell({
  state,
  unavailable = false,
}: {
  state?: PermissionState;
  unavailable?: boolean;
}) {
  const mode = unavailable ? "locked" : stateMode(state);
  return (
    <div className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 px-3 py-3">
      <PermissionGlyph mode={mode} dimmed />
      <span className="max-w-[112px] truncate text-[11px] font-medium text-white/30">
        {unavailable ? "Locked" : stateLabel(state)}
      </span>
    </div>
  );
}

function SelfPermissionCell({ available }: { available: boolean }) {
  return (
    <div className="flex min-h-[72px] flex-col items-center justify-center gap-1.5 px-3 py-3">
      <PermissionGlyph mode={available ? "self" : "locked"} dimmed={!available} />
      <span className="max-w-[112px] truncate text-[11px] font-medium text-primary/80">
        {available ? "Mine" : "Locked"}
      </span>
    </div>
  );
}

function PersonAvatar({ person, fallbackLabel }: { person?: CirclePerson; fallbackLabel: string }) {
  return (
    <div className="mx-auto flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-primary/35 bg-primary/10 text-sm font-semibold text-primary shadow-[0_0_18px_rgba(97,193,196,0.22)]">
      {person?.avatar_url ? (
        <img src={person.avatar_url} alt="" className="h-full w-full object-cover" />
      ) : (
        initialsFromLabel(person ? initials(person) : fallbackLabel)
      )}
    </div>
  );
}

function PersonColumnHeader({
  label,
  sublabel,
  person,
  highlighted = false,
}: {
  label: string;
  sublabel?: string | null;
  person?: CirclePerson;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[104px] flex-col items-center justify-end gap-2 border-l border-white/10 px-3 pb-3 text-center",
        highlighted && "bg-primary/[0.08] shadow-[inset_0_0_26px_rgba(124,244,175,0.16)]",
      )}
    >
      <PersonAvatar person={person} fallbackLabel={label} />
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-white">{label}</p>
        {sublabel && <p className="mt-0.5 truncate text-[11px] text-white/35">{sublabel}</p>}
      </div>
    </div>
  );
}

function RowHeader({ row }: { row: MatrixRow }) {
  const Icon = row.icon;
  return (
    <div className="sticky left-0 z-10 flex min-h-[72px] items-center gap-3 border-r border-white/10 bg-[#071821] px-4 py-3">
      <Icon className={cn("h-5 w-5 shrink-0", row.dimmed ? "text-white/35" : "text-primary")} />
      <div className="min-w-0">
        <p className={cn("truncate text-sm font-semibold", row.dimmed ? "text-white/60" : "text-white")}>
          {row.label}
        </p>
        <p className="mt-0.5 line-clamp-2 text-xs leading-4 text-white/38">{row.detail}</p>
      </div>
    </div>
  );
}

function PermissionMatrix({
  me,
  links,
  working,
  onPermissionChange,
}: {
  me: CircleResponse["me"] | null | undefined;
  links: CircleLink[];
  working: string | null;
  onPermissionChange: (
    link: CircleLink,
    permission: PermissionKey,
    direction: PermissionDirection,
    enabled: boolean,
  ) => void;
}) {
  const gridTemplateColumns = `minmax(240px, 1.35fr) repeat(${links.length + 1}, minmax(126px, 0.7fr))`;

  return (
    <section className="space-y-4" aria-label="Permission matrix">
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Permissions</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-white/50">
          Memory, Orchestrator, and app mandate access by person.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-primary/20 bg-[#071821]/88 shadow-[0_0_38px_rgba(97,193,196,0.08)]">
        <div className="min-w-[760px]">
          <div
            className="grid border-b border-primary/20 bg-[#0A2632]/80"
            style={{ gridTemplateColumns }}
          >
            <div className="sticky left-0 z-20 flex min-h-[104px] items-end border-r border-white/10 bg-[#0A2632] px-4 pb-4">
              <span className="text-2xl font-semibold tracking-normal text-primary">Access</span>
            </div>
            <PersonColumnHeader label="You" sublabel={me?.email} highlighted />
            {links.map((link) => (
              <PersonColumnHeader
                key={link.id}
                label={personLabel(link.person)}
                sublabel={personStatus(link)}
                person={link.person}
              />
            ))}
          </div>

          {MATRIX_SECTIONS.map((section) => (
            <div key={section.id}>
              <div
                className={cn(
                  "grid border-b border-white/10",
                  section.accent === "apps" ? "bg-[#5B4212]/45" : "bg-primary/[0.08]",
                )}
                style={{ gridTemplateColumns }}
              >
                <div
                  className={cn(
                    "sticky left-0 z-20 flex min-h-12 items-center gap-2 border-r border-white/10 px-4",
                    section.accent === "apps" ? "bg-[#5B4212] text-[#FFE08A]" : "bg-[#0B2A34] text-primary",
                  )}
                >
                  <span className="text-lg font-semibold">{section.label}</span>
                </div>
                {Array.from({ length: links.length + 1 }).map((_, index) => (
                  <div key={`${section.id}-blank-${index}`} className="border-l border-white/10" />
                ))}
              </div>

              {section.rows.map((row) => (
                <div
                  key={row.id}
                  className="grid border-b border-white/10 last:border-b-0"
                  style={{ gridTemplateColumns }}
                >
                  <RowHeader row={row} />
                  <div className="border-l border-white/10 bg-primary/[0.05]">
                    <SelfPermissionCell available={Boolean(row.permission || row.derivedFrom)} />
                  </div>
                  {links.map((link) => {
                    if (row.permission) {
                      const key = `${link.id}-${row.permission}`;
                      return (
                        <div key={`${row.id}-${link.id}`} className="border-l border-white/10">
                          <PermissionCell
                            link={link}
                            row={row as MatrixRow & { permission: PermissionKey }}
                            state={link.permissions[row.permission]}
                            busy={working === `${key}-give` || working === `${key}-receive`}
                            onChange={(direction, enabled) =>
                              onPermissionChange(link, row.permission, direction, enabled)
                            }
                          />
                        </div>
                      );
                    }

                    const derived = row.derivedFrom ? link.permissions[row.derivedFrom] : undefined;
                    return (
                      <div key={`${row.id}-${link.id}`} className="border-l border-white/10">
                        <VisualPermissionCell state={derived} unavailable={!derived} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <PermissionLegend />
    </section>
  );
}

function PermissionLegend() {
  const items: Array<{ mode: GlyphMode; label: string; dimmed?: boolean }> = [
    { mode: "neutral", label: "Neutral, nothing shared" },
    { mode: "handshake", label: "Handshake, two-way shared" },
    { mode: "receive", label: "3rd party requesting handshake" },
    { mode: "give", label: "You sharing to a 3rd party" },
    { mode: "locked", label: "Locked / view only", dimmed: true },
  ];

  return (
    <div className="rounded-lg border border-primary/15 bg-[#071821]/78 p-4">
      <h3 className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.18em] text-primary/80">Key</h3>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <PermissionGlyph mode={item.mode} dimmed={item.dimmed} />
            <span className="text-xs font-medium leading-5 text-white/62">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PendingInviteSection({
  title,
  links,
  action,
  working,
  onAction,
}: {
  title: string;
  links: CircleLink[];
  action: "incoming" | "outgoing";
  working: string | null;
  onAction: (action: string, body: Record<string, unknown>, key?: string) => void;
}) {
  if (links.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">{title}</h2>
      <div className="grid gap-3 lg:grid-cols-2">
        {links.map((link) => (
          <div key={link.id} className="rounded-lg border border-white/10 bg-card/55 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <PersonSummary link={link} />
              {action === "incoming" ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => onAction("accept", { link_id: link.id }, `accept-${link.id}`)}
                    disabled={working === `accept-${link.id}`}
                  >
                    {working === `accept-${link.id}` ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-4 w-4" />
                    )}
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onAction("decline", { link_id: link.id }, `decline-${link.id}`)}
                    disabled={working === `decline-${link.id}`}
                  >
                    <X className="h-4 w-4" />
                    Decline
                  </Button>
                </div>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAction("cancel", { link_id: link.id }, `cancel-${link.id}`)}
                  disabled={working === `cancel-${link.id}`}
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function AuditSection({ rows }: { rows: AuditRow[] }) {
  if (rows.length === 0) return null;

  return (
    <section className="space-y-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Access audit</h2>
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#071821]/50">
        {rows.slice(0, 8).map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 text-sm first:border-t-0"
          >
            <span className="min-w-0 truncate text-foreground">{actionLabel(row.action)}</span>
            <span className="shrink-0 text-xs text-muted-foreground">{timeAgo(row.created_at)}</span>
          </div>
        ))}
      </div>
    </section>
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
    <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-4 border-b border-white/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Users className="h-3.5 w-3.5" />
            {accepted.length + 1} account{accepted.length === 0 ? "" : "s"}
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
          <PendingInviteSection
            title="Waiting on you"
            links={pendingIn}
            action="incoming"
            working={working}
            onAction={(action, body, key) => void runAction(action, body, key)}
          />

          {accepted.length > 0 ? (
            <PermissionMatrix
              me={data?.me}
              links={accepted}
              working={working}
              onPermissionChange={(link, permission, direction, enabled) =>
                void runAction(
                  "set_permission",
                  { link_id: link.id, permission, direction, enabled },
                  `${link.id}-${permission}-${direction}`,
                )
              }
            />
          ) : (
            <div className="rounded-lg border border-dashed border-white/15 p-8 text-center text-sm text-muted-foreground">
              No one is in your {circleName} yet.
            </div>
          )}

          <PendingInviteSection
            title="Invites sent"
            links={pendingOut}
            action="outgoing"
            working={working}
            onAction={(action, body, key) => void runAction(action, body, key)}
          />

          <AuditSection rows={data?.audit ?? []} />
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
