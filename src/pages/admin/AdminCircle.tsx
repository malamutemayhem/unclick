import { FormEvent, useCallback, useEffect, useMemo, useState, type ComponentType } from "react";
import { useSession } from "@/lib/auth";
import { productName } from "@/config/product-names";
import { relativeTime } from "@/lib/relativeTime";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  AlertTriangle,
  AppWindow,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  MessageSquare,
  MessagesSquare,
  Shield,
  ShieldOff,
  UserPlus,
  Users,
  X,
} from "lucide-react";

// ============================================================
// Circle permissions matrix v2.
//
// Design: docs/prd/circle-permissions-matrix-v2.md. The five-state toggle
// vocabulary (neutral, >, <, <>, master) renders the four stored bits per
// person + resource; one tap moves MY whole side (offer out + standing
// acceptance), the You column is the row master across everyone, sections
// collapse to one compact row by default, and incoming handshake requests
// glow amber and auto-expand their section. Fine control mode exposes the
// give/receive halves separately for experts.
// ============================================================

type PermissionKey = "shared_memory" | "shared_orchestrator" | "shared_chat";
type PermissionDirection = "give" | "receive" | "both";
type GlyphMode = "master-on" | "master-mixed" | "handshake" | "give" | "receive" | "neutral" | "locked";

interface PermissionState {
  give_enabled: boolean;
  give_accepted: boolean;
  give_active: boolean;
  receive_enabled: boolean;
  receive_offered: boolean;
  receive_active: boolean;
}

const BLANK_STATE: PermissionState = {
  give_enabled: false,
  give_accepted: false,
  give_active: false,
  receive_enabled: false,
  receive_offered: false,
  receive_active: false,
};

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
  permissions: Partial<Record<PermissionKey, PermissionState>>;
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

interface MatrixSection {
  id: string;
  label: string;
  detail: string;
  icon: ComponentType<{ className?: string }>;
  permission?: PermissionKey;
  // Muted single line listing what this section will cover once enforced.
  futureNote?: string;
  accent?: "default" | "apps";
}

const MATRIX_SECTIONS: MatrixSection[] = [
  {
    id: "memory",
    label: "Memory",
    detail: "Facts, preferences, summaries, and saved context.",
    icon: Brain,
    permission: "shared_memory",
    futureNote:
      "Per-scope sharing (Saved Facts, Library, Chats, Files & Notes, Project Briefs, Preferences, Recall Check) is coming; today Memory shares as one bundle.",
  },
  {
    id: "orchestrator",
    label: "Orchestrator",
    detail: "Chat continuity and session context.",
    icon: MessageSquare,
    permission: "shared_orchestrator",
  },
  {
    id: "rooms",
    label: "Chat rooms",
    detail: "Allow adding each other to shared chat rooms.",
    icon: MessagesSquare,
    permission: "shared_chat",
  },
  {
    id: "apps",
    label: "Apps",
    detail: "Scoped app delegation requires mandate receipts.",
    icon: AppWindow,
    accent: "apps",
    futureNote:
      "App sharing is asymmetric (your connections vs theirs) and ships with scoped mandates and per-call receipts. Nothing is shared until then.",
  },
];

const SECTION_STORE_KEY = "unclick_circle_sections_v2";

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

function stateFor(link: CircleLink, permission: PermissionKey): PermissionState {
  return link.permissions[permission] ?? BLANK_STATE;
}

// My side of a cell: my offer out or my standing acceptance in.
export function mySideOn(state: PermissionState): boolean {
  return state.give_enabled || state.receive_enabled;
}

// An incoming handshake request waiting on me.
export function hasIncomingRequest(state: PermissionState): boolean {
  return state.receive_offered && !state.receive_enabled;
}

// My offer is out but the other side has not accepted yet.
export function isPendingOutbound(state: PermissionState): boolean {
  return state.give_enabled && !state.give_accepted;
}

// The arrows render INTENT that exists: my offer out (>) and their offer in
// (<). My standing acceptance alone draws nothing; a handshake needs both
// parties' offers, exactly like the mockup key.
export function stateMode(state: PermissionState): GlyphMode {
  const giveVisible = state.give_enabled;
  const receiveVisible = state.receive_offered;
  if (giveVisible && receiveVisible) return "handshake";
  if (giveVisible) return "give";
  if (receiveVisible) return "receive";
  return "neutral";
}

export function stateLabel(state: PermissionState): string {
  if (state.give_active && state.receive_active) return "Two-way";
  if (hasIncomingRequest(state) && state.give_enabled) return "Request in";
  if (state.give_active) return "Sharing";
  if (state.receive_active) return "Receiving";
  if (hasIncomingRequest(state)) return "Request";
  if (isPendingOutbound(state)) return "Trying to share";
  if (state.receive_enabled) return "Open to theirs";
  return "Off";
}

function personStatus(link: CircleLink) {
  if (link.status === "accepted") return `Linked ${timeAgo(link.accepted_at)}`;
  return `Pending ${timeAgo(link.created_at)}`;
}

// ── the compact pill ─────────────────────────────────────────────

function PermissionGlyph({
  mode,
  attention = false,
  pending = false,
  dimmed = false,
  busy = false,
  className,
}: {
  mode: GlyphMode;
  // Amber salience: an incoming request is waiting on the viewer.
  attention?: boolean;
  // My offer is out, not yet accepted: soft pulse instead of full solid.
  pending?: boolean;
  dimmed?: boolean;
  busy?: boolean;
  className?: string;
}) {
  const live =
    mode === "master-on" || mode === "handshake" || mode === "give" || mode === "receive";
  const knobRight = mode === "master-on" || mode === "handshake" || mode === "give";
  const showArrows = mode !== "master-on" && mode !== "master-mixed" && mode !== "locked";
  const half = mode === "master-mixed";

  return (
    <div
      className={cn(
        "relative mx-auto flex h-6 w-14 items-center justify-between overflow-hidden rounded-full border px-1.5 transition",
        live && !attention &&
          "border-[#7CF4AF]/70 bg-[#3CD783]/25 text-[#D9FFE8] shadow-[0_0_10px_rgba(124,244,175,0.3)]",
        live && attention &&
          "border-amber-300/70 bg-amber-400/15 text-amber-100 shadow-[0_0_10px_rgba(251,191,36,0.35)]",
        !live && !half && "border-white/15 bg-[#071821] text-white/30",
        half && "border-[#7CF4AF]/40 bg-[#3CD783]/10 text-[#D9FFE8]/70",
        mode === "locked" && "border-white/10 bg-white/[0.03] text-white/20",
        pending && "animate-pulse",
        dimmed && "opacity-45 grayscale",
        className,
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full border transition-all",
          live && !attention && "border-[#CFFFE2]/60 bg-[#CFFFE2] shadow-[0_0_8px_rgba(207,255,226,0.55)]",
          live && attention && "border-amber-100/70 bg-amber-100 shadow-[0_0_8px_rgba(253,230,138,0.55)]",
          !live && !half && "border-white/20 bg-white/[0.06]",
          half && "border-[#CFFFE2]/40 bg-[#CFFFE2]/45 left-1/2 -translate-x-1/2",
          !half && (knobRight ? "right-0.5" : "left-0.5"),
        )}
      />
      {showArrows && (mode === "receive" || mode === "handshake") ? (
        <ChevronLeft className="relative z-10 h-3 w-3" />
      ) : (
        <span className="relative z-10 h-3 w-3" />
      )}
      {showArrows && (mode === "give" || mode === "handshake") ? (
        <ChevronRight className="relative z-10 h-3 w-3" />
      ) : (
        <span className="relative z-10 h-3 w-3" />
      )}
      {busy && (
        <span className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-[#071821]/75">
          <Loader2 className="h-3 w-3 animate-spin text-primary" />
        </span>
      )}
    </div>
  );
}

// One person + one resource. One tap = my whole side on or off. Fine control
// swaps to explicit give/receive halves.
function PermissionCell({
  link,
  label,
  permission,
  state,
  busy,
  fineControl,
  onChange,
}: {
  link: CircleLink;
  label: string;
  permission: PermissionKey;
  state: PermissionState;
  busy: boolean;
  fineControl: boolean;
  onChange: (direction: PermissionDirection, enabled: boolean) => void;
}) {
  const person = personLabel(link.person);
  const mode = stateMode(state);
  const attention = hasIncomingRequest(state);
  const pending = isPendingOutbound(state) && !attention;

  return (
    <div className="flex min-h-12 flex-col items-center justify-center gap-1 px-2 py-2">
      <div className="relative h-6 w-14">
        <PermissionGlyph mode={mode} attention={attention} pending={pending} busy={busy} />
        {fineControl ? (
          <>
            <button
              type="button"
              aria-label={`Receive ${label} from ${person}`}
              aria-pressed={state.receive_enabled}
              title={`Receive ${label} from ${person}`}
              disabled={busy}
              onClick={() => onChange("receive", !state.receive_enabled)}
              className="absolute inset-y-0 left-0 z-30 w-1/2 rounded-l-full border-r border-dashed border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            <button
              type="button"
              aria-label={`Share my ${label} with ${person}`}
              aria-pressed={state.give_enabled}
              title={`Share my ${label} with ${person}`}
              disabled={busy}
              onClick={() => onChange("give", !state.give_enabled)}
              className="absolute inset-y-0 right-0 z-30 w-1/2 rounded-r-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </>
        ) : (
          <button
            type="button"
            aria-label={`${mySideOn(state) ? "Stop sharing" : "Share"} ${label} with ${person}`}
            aria-pressed={mySideOn(state)}
            title={
              attention
                ? `${person} is requesting ${label}. Tap to complete the handshake.`
                : `${mySideOn(state) ? "Stop sharing" : "Share"} ${label} with ${person}`
            }
            disabled={busy}
            onClick={() => onChange("both", !mySideOn(state))}
            className="absolute inset-0 z-30 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        )}
      </div>
      <span
        className={cn(
          "max-w-[88px] truncate text-[10px] font-medium",
          attention ? "text-amber-200/90" : "text-white/50",
        )}
      >
        {stateLabel(state)}
      </span>
    </div>
  );
}

// The You column: the row master. On = my side is on with everyone.
function RowMasterCell({
  label,
  allOn,
  someOn,
  busy,
  disabled,
  onToggle,
}: {
  label: string;
  allOn: boolean;
  someOn: boolean;
  busy: boolean;
  disabled: boolean;
  onToggle: (enabled: boolean) => void;
}) {
  const mode: GlyphMode = disabled ? "locked" : allOn ? "master-on" : someOn ? "master-mixed" : "neutral";
  return (
    <div className="flex min-h-12 flex-col items-center justify-center gap-1 px-2 py-2">
      <div className="relative h-6 w-14">
        <PermissionGlyph mode={mode} busy={busy} dimmed={disabled} />
        {!disabled && (
          <button
            type="button"
            aria-label={`${allOn ? "Stop sharing" : "Share"} ${label} with everyone`}
            aria-pressed={allOn}
            title={`${allOn ? "Stop sharing" : "Share"} ${label} with everyone in your Circle`}
            disabled={busy}
            onClick={() => onToggle(!allOn)}
            className="absolute inset-0 z-30 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        )}
      </div>
      <span className="max-w-[88px] truncate text-[10px] font-medium text-primary/80">
        {disabled ? "Locked" : allOn ? "Everyone" : someOn ? "Mixed" : "Off"}
      </span>
    </div>
  );
}

function PersonAvatar({ person, fallbackLabel }: { person?: CirclePerson; fallbackLabel: string }) {
  return (
    <div className="mx-auto flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-primary/35 bg-primary/10 text-xs font-semibold text-primary">
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
        "flex min-h-[72px] flex-col items-center justify-end gap-1 border-l border-white/10 px-2 pb-2 text-center",
        highlighted && "bg-primary/[0.08]",
      )}
    >
      <PersonAvatar person={person} fallbackLabel={label} />
      <div className="min-w-0">
        <p className="truncate text-xs font-semibold text-white">{label}</p>
        {sublabel && <p className="mt-0.5 truncate text-[10px] text-white/35">{sublabel}</p>}
      </div>
    </div>
  );
}

interface SectionSummary {
  sharing: number;
  receiving: number;
  requests: number;
}

function summarizeSection(links: CircleLink[], permission: PermissionKey): SectionSummary {
  let sharing = 0;
  let receiving = 0;
  let requests = 0;
  for (const link of links) {
    const state = stateFor(link, permission);
    if (state.give_active) sharing += 1;
    if (state.receive_active) receiving += 1;
    if (hasIncomingRequest(state)) requests += 1;
  }
  return { sharing, receiving, requests };
}

function summaryText(summary: SectionSummary): string {
  const parts: string[] = [];
  if (summary.sharing) parts.push(`sharing with ${summary.sharing}`);
  if (summary.receiving) parts.push(`receiving ${summary.receiving}`);
  if (parts.length === 0) return "nothing shared";
  return parts.join(", ");
}

function loadSectionPrefs(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(SECTION_STORE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function PermissionMatrix({
  me,
  links,
  working,
  onPermissionChange,
  onPermissionAll,
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
  onPermissionAll: (permission: PermissionKey, enabled: boolean) => void;
}) {
  const [fineControl, setFineControl] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => loadSectionPrefs());

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(SECTION_STORE_KEY, JSON.stringify(expanded));
    } catch {
      /* ignore */
    }
  }, [expanded]);

  const gridTemplateColumns = `minmax(200px, 1.3fr) repeat(${links.length + 1}, minmax(84px, 0.6fr))`;

  return (
    <section className="space-y-3" aria-label="Permission matrix">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Permissions</h2>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-white/50">
            Tap a cell to share with that person; tap again to stop. The You column shares with everyone at once.
          </p>
        </div>
        <label className="flex items-center gap-2 rounded-md border border-border/50 bg-card/40 px-2 py-1 text-xs text-muted-foreground">
          <span>Fine control</span>
          <Switch
            checked={fineControl}
            onCheckedChange={setFineControl}
            aria-label="Fine control (separate give and receive)"
            className="h-5 w-9"
          />
        </label>
      </div>

      <div className="overflow-x-auto rounded-lg border border-primary/20 bg-[#071821]/88">
        <div className="min-w-[640px]">
          <div className="grid border-b border-primary/20 bg-[#0A2632]/80" style={{ gridTemplateColumns }}>
            <div className="sticky left-0 z-20 flex min-h-[72px] items-end border-r border-white/10 bg-[#0A2632] px-3 pb-2">
              <span className="text-lg font-semibold text-primary">Access</span>
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

          {MATRIX_SECTIONS.map((section) => {
            const permission = section.permission;
            const summary = permission ? summarizeSection(links, permission) : null;
            // A section with a pending request defaults open so a handshake
            // request is never buried, but an explicit user collapse wins
            // (the amber badge stays visible on the header either way).
            const isOpen =
              expanded[section.id] !== undefined
                ? Boolean(expanded[section.id])
                : Boolean(summary && summary.requests > 0);
            const states = permission ? links.map((link) => stateFor(link, permission)) : [];
            const allOn = states.length > 0 && states.every(mySideOn);
            const someOn = states.some(mySideOn);
            const Icon = section.icon;
            const masterBusy = permission ? working === `all-${permission}` : false;

            return (
              <div key={section.id}>
                <div
                  className={cn(
                    "grid border-b border-white/10",
                    section.accent === "apps" ? "bg-[#5B4212]/45" : "bg-primary/[0.08]",
                  )}
                  style={{ gridTemplateColumns }}
                >
                  <button
                    type="button"
                    onClick={() => setExpanded((prev) => ({ ...prev, [section.id]: !isOpen }))}
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${section.label}`}
                    className={cn(
                      "sticky left-0 z-20 flex min-h-11 items-center gap-2 border-r border-white/10 px-3 text-left",
                      section.accent === "apps" ? "bg-[#5B4212] text-[#FFE08A]" : "bg-[#0B2A34] text-primary",
                    )}
                  >
                    <ChevronDown
                      className={cn("h-4 w-4 shrink-0 transition-transform", !isOpen && "-rotate-90")}
                    />
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="text-sm font-semibold">{section.label}</span>
                    {summary && (
                      <span className="ml-1 hidden truncate text-[11px] font-normal text-white/45 lg:inline">
                        {summaryText(summary)}
                      </span>
                    )}
                    {summary && summary.requests > 0 && (
                      <span className="ml-auto shrink-0 rounded-full border border-amber-300/50 bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                        {summary.requests} request{summary.requests === 1 ? "" : "s"}
                      </span>
                    )}
                  </button>
                  <div className="border-l border-white/10">
                    {permission && !isOpen ? (
                      <RowMasterCell
                        label={section.label}
                        allOn={allOn}
                        someOn={someOn}
                        busy={masterBusy}
                        disabled={links.length === 0}
                        onToggle={(enabled) => onPermissionAll(permission, enabled)}
                      />
                    ) : permission ? (
                      <div className="min-h-11" />
                    ) : (
                      <div className="flex min-h-11 items-center justify-center">
                        <PermissionGlyph mode="locked" dimmed />
                      </div>
                    )}
                  </div>
                  {links.map((link) => {
                    if (!permission || isOpen) {
                      return (
                        <div key={`${section.id}-head-${link.id}`} className="border-l border-white/10" />
                      );
                    }
                    // Collapsed: the section header row doubles as the live
                    // cells so the matrix stays one row tall per section.
                    const key = `${link.id}-${permission}`;
                    return (
                      <div key={`${section.id}-head-${link.id}`} className="border-l border-white/10">
                        <PermissionCell
                          link={link}
                          label={section.label}
                          permission={permission}
                          state={stateFor(link, permission)}
                          busy={working === `${key}-both` || working === `${key}-give` || working === `${key}-receive`}
                          fineControl={fineControl}
                          onChange={(direction, enabled) =>
                            onPermissionChange(link, permission, direction, enabled)
                          }
                        />
                      </div>
                    );
                  })}
                </div>

                {isOpen && permission && (
                  <div className="grid border-b border-white/10" style={{ gridTemplateColumns }}>
                    <div className="sticky left-0 z-10 flex min-h-12 items-center gap-2 border-r border-white/10 bg-[#071821] px-3 py-2">
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-white">{section.label}</p>
                        <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-white/38">{section.detail}</p>
                      </div>
                    </div>
                    <div className="border-l border-white/10 bg-primary/[0.05]">
                      <RowMasterCell
                        label={section.label}
                        allOn={allOn}
                        someOn={someOn}
                        busy={masterBusy}
                        disabled={links.length === 0}
                        onToggle={(enabled) => onPermissionAll(permission, enabled)}
                      />
                    </div>
                    {links.map((link) => {
                      const key = `${link.id}-${permission}`;
                      return (
                        <div key={`${section.id}-row-${link.id}`} className="border-l border-white/10">
                          <PermissionCell
                            link={link}
                            label={section.label}
                            permission={permission}
                            state={stateFor(link, permission)}
                            busy={working === `${key}-both` || working === `${key}-give` || working === `${key}-receive`}
                            fineControl={fineControl}
                            onChange={(direction, enabled) =>
                              onPermissionChange(link, permission, direction, enabled)
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {isOpen && section.futureNote && (
                  <div className="grid border-b border-white/10" style={{ gridTemplateColumns }}>
                    <div className="sticky left-0 z-10 border-r border-white/10 bg-[#071821] px-3 py-2 text-[11px] leading-4 text-white/35">
                      {section.futureNote}
                    </div>
                    {Array.from({ length: links.length + 1 }).map((_, index) => (
                      <div key={`${section.id}-note-${index}`} className="border-l border-white/10" />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <PermissionLegend />
    </section>
  );
}

function PermissionLegend() {
  const items: Array<{
    mode: GlyphMode;
    label: string;
    attention?: boolean;
    dimmed?: boolean;
  }> = [
    { mode: "neutral", label: "Neutral, nothing shared" },
    { mode: "handshake", label: "Handshake, two-way shared" },
    { mode: "receive", label: "3rd party requesting handshake", attention: true },
    { mode: "give", label: "You sharing to a 3rd party" },
    { mode: "master-on", label: "Master, on for everyone" },
    { mode: "locked", label: "Visual info only", dimmed: true },
  ];

  return (
    <div className="rounded-lg border border-primary/15 bg-[#071821]/78 p-3">
      <h3 className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">Key</h3>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-6">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <PermissionGlyph mode={item.mode} attention={item.attention} dimmed={item.dimmed} />
            <span className="text-[11px] font-medium leading-4 text-white/62">{item.label}</span>
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
              onPermissionAll={(permission, enabled) =>
                void runAction("set_permission_all", { permission, enabled }, `all-${permission}`)
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
