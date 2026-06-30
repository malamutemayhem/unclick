// ============================================================
// ChatMemberRail - the full-height roster beside the chat canvas.
//
// Shows who is in the room: the operator (human, with their You-page
// avatar), connected human members, and the AI seats. Click a seat to
// direct the next turn at it (it @mentions that seat in the composer).
// "Add AI seat" opens an inline picker that lists ONLY the providers you
// have actually connected a key for (read from /api/ai-provider-key), so
// the list reflects what you can use instead of the whole catalog.
// "Invite member" lists the accounts you are connected to (accepted
// Circle links) so you can add them to the room.
//
// Each AI seat runs on the operator's own key. Human members are added
// from the existing cross-account connection graph; live messaging with
// them is a later slice, so they appear here as present in the room.
// ============================================================

import { useEffect, useState } from "react";
import { Plus, X, Bot, UserPlus, Power, Check } from "lucide-react";
import type { User } from "@supabase/supabase-js";
import UserAvatar from "@/components/UserAvatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Combobox, type ComboOption } from "@/components/admin/Combobox";
import {
  CHAT_PROVIDERS,
  findChatProvider,
  fetchOpenRouterModels,
  type ChatModelOption,
} from "@/components/admin/chatTransportConfig";
import { fetchConnectedMembers, type HumanMember } from "@/components/admin/chatMembers";
import { cn } from "@/lib/utils";

export interface AiSeat {
  id: string;
  slug: string;
  model: string;
  label: string;
  handle: string;
  active: boolean;
}

// A small avatar for a human member: their picture if we have one, else
// initials. Keeps the rail readable without coupling to UserAvatar's
// full Supabase User shape (we only hold email + avatar for members).
function MemberAvatar({ member }: { member: HumanMember }) {
  if (member.avatarUrl) {
    return (
      <img src={member.avatarUrl} alt="" className="h-7 w-7 shrink-0 rounded-full object-cover" />
    );
  }
  const initials = (member.label || member.email || "?").slice(0, 2).toUpperCase();
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-[10px] font-medium text-sky-300">
      {initials}
    </span>
  );
}

// The seat picker, scoped to the providers you have actually connected a key
// for. connectedSlugs comes from /api/ai-provider-key, so a "✓" here means a
// real connection, not just the current selection.
function AddSeatForm({
  connectedSlugs,
  onAdd,
}: {
  connectedSlugs: string[];
  onAdd: (slug: string, model: string) => void;
}) {
  const connectedProviders = CHAT_PROVIDERS.filter((p) => connectedSlugs.includes(p.slug));
  const first = connectedProviders[0];

  const [slug, setSlug] = useState(first?.slug ?? "");
  const [model, setModel] = useState(first?.models[0]?.value ?? "");
  const [live, setLive] = useState<ChatModelOption[] | null>(null);
  const [loading, setLoading] = useState(false);
  const provider = findChatProvider(slug);

  // Once connected providers load, lock onto a real one.
  useEffect(() => {
    if (!slug && first) {
      setSlug(first.slug);
      setModel(first.models[0]?.value ?? "");
    }
  }, [first, slug]);

  useEffect(() => {
    if (slug !== "openrouter") {
      setLive(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchOpenRouterModels()
      .then((rows) => {
        if (!cancelled) setLive(rows);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (connectedProviders.length === 0) {
    return (
      <div className="w-[min(18rem,90vw)] p-3 text-sm">
        <p className="text-body">No AI provider keys connected yet.</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
          Add a provider key in{" "}
          <a href="/admin/agents/api" className="text-primary hover:underline">
            API keys
          </a>{" "}
          and it shows up here.
        </p>
      </div>
    );
  }

  const providerOptions: ComboOption[] = connectedProviders.map((p) => ({
    value: p.slug,
    label: p.label,
  }));
  const modelOptions: ComboOption[] = slug === "openrouter" && live ? live : provider?.models ?? [];

  return (
    <div className="flex w-[min(18rem,90vw)] flex-col gap-2 p-3">
      {connectedProviders.length > 1 ? (
        <Combobox
          value={slug}
          options={providerOptions}
          onChange={(s) => {
            setSlug(s);
            const next = findChatProvider(s);
            if (next) setModel(next.models[0]?.value ?? "");
          }}
          searchPlaceholder="Search your providers..."
          className="w-full"
        />
      ) : (
        <div className="flex items-center gap-2 rounded-md border border-border/50 bg-card/40 px-3 py-1.5 text-sm text-body">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
          <span className="flex-1 truncate">{first?.label}</span>
          <span className="text-[10px] text-muted-foreground">connected</span>
        </div>
      )}
      <Combobox
        value={model}
        options={modelOptions}
        onChange={setModel}
        placeholder="Pick a model"
        searchPlaceholder="Search models..."
        emptyText={loading ? "Loading..." : "No match - type a custom id."}
        allowCustom
        loading={loading && modelOptions.length === 0}
        className="w-full"
      />
      <button
        type="button"
        onClick={() => {
          if (slug && model) onAdd(slug, model);
        }}
        className="rounded-md bg-primary/90 px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary"
      >
        Add seat
      </button>
      <a
        href="/admin/agents/api"
        className="pt-0.5 text-center text-[10px] text-muted-foreground transition-colors hover:text-primary hover:underline"
      >
        + Connect another provider
      </a>
    </div>
  );
}

// Lists the accounts you are connected to (accepted Circle links) that
// are not already in the room, so you can add them as human members.
function InviteMemberForm({
  accessToken,
  added,
  onAdd,
}: {
  accessToken: string | null;
  added: HumanMember[];
  onAdd: (member: HumanMember) => void;
}) {
  const [members, setMembers] = useState<HumanMember[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) {
      setMembers([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchConnectedMembers(accessToken)
      .then((rows) => {
        if (!cancelled) setMembers(rows ?? []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  const addedIds = new Set(added.map((m) => m.id));
  const available = (members ?? []).filter((m) => !addedIds.has(m.id));

  return (
    <div className="flex w-[min(20rem,90vw)] flex-col gap-1 p-3">
      <p className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
        Your connections
      </p>
      {loading && <p className="px-1 py-2 text-sm text-muted-foreground">Loading...</p>}
      {!loading && available.length === 0 && (
        <p className="px-1 py-2 text-xs leading-relaxed text-muted-foreground">
          No connected members to add yet. Connect with people in{" "}
          <a href="/admin/circle" className="text-primary hover:underline">
            Circle
          </a>
          , then they show up here.
        </p>
      )}
      {available.map((m) => (
        <button
          key={m.id}
          type="button"
          onClick={() => onAdd(m)}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors hover:bg-card/50"
        >
          <MemberAvatar member={m} />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm text-body">{m.label}</span>
            {m.email && m.email !== m.label && (
              <span className="block truncate text-[10px] text-muted-foreground">{m.email}</span>
            )}
          </span>
          <Plus className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        </button>
      ))}
    </div>
  );
}

export function ChatMemberRail({
  user,
  accessToken,
  seats,
  activeSeatId,
  workingSeatIds,
  humanMembers,
  onSelectSeat,
  onAddSeat,
  onRemoveSeat,
  onToggleSeatActive,
  onAddHumanMember,
  onRemoveHumanMember,
}: {
  user: User | null;
  accessToken: string | null;
  seats: AiSeat[];
  activeSeatId: string | null;
  workingSeatIds?: string[];
  humanMembers: HumanMember[];
  onSelectSeat: (seat: AiSeat) => void;
  onAddSeat: (slug: string, model: string) => void;
  onRemoveSeat: (id: string) => void;
  onToggleSeatActive: (id: string) => void;
  onAddHumanMember: (member: HumanMember) => void;
  onRemoveHumanMember: (id: string) => void;
}) {
  const [addOpen, setAddOpen] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [connectedSlugs, setConnectedSlugs] = useState<string[]>([]);

  // Which AI providers this account has connected a key for. Drives the seat
  // picker so it only offers usable providers. Refetches when the picker opens.
  useEffect(() => {
    if (!accessToken) {
      setConnectedSlugs([]);
      return;
    }
    let cancelled = false;
    fetch("/api/ai-provider-key", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then((r) => (r.ok ? r.json() : null))
      .then((body) => {
        if (cancelled || !body) return;
        const rows = Array.isArray(body.providers) ? body.providers : [];
        const slugs = Array.from(
          new Set(
            rows
              .map((p: { platform_slug?: string }) => p.platform_slug)
              .filter((s: unknown): s is string => typeof s === "string" && s.length > 0),
          ),
        ) as string[];
        setConnectedSlugs(slugs);
      })
      .catch(() => {
        if (!cancelled) setConnectedSlugs([]);
      });
    return () => {
      cancelled = true;
    };
  }, [accessToken, addOpen]);

  return (
    <aside className="flex h-full w-full shrink-0 flex-col rounded-lg border border-border/40 bg-card/30 p-3 md:w-64">
      <div className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
        Members
      </div>

      <div className="-mx-1 flex-1 space-y-1 overflow-y-auto px-1">
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
          <UserAvatar user={user} className="h-7 w-7" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-body">{user?.email ?? "You"}</p>
            <p className="text-[10px] text-muted-foreground">you (human)</p>
          </div>
        </div>

        {humanMembers.map((m) => (
          <div key={m.id} className="group flex items-center gap-2 rounded-md px-2 py-1.5">
            <MemberAvatar member={m} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-body">{m.label}</p>
              <p className="truncate text-[10px] text-muted-foreground">member - messaging soon</p>
            </div>
            <button
              type="button"
              onClick={() => onRemoveHumanMember(m.id)}
              className="text-muted-foreground opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
              aria-label={`Remove ${m.label}`}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}

        {seats.map((s) => {
          const isSelected = activeSeatId === s.id;
          const isWorking = Boolean(workingSeatIds?.includes(s.id));
          return (
            <div
              key={s.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelectSeat(s)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectSeat(s);
                }
              }}
              className={cn(
                "group relative flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1.5 transition-all",
                s.active
                  ? "border-emerald-300/45 bg-emerald-500/10 shadow-[0_0_0_1px_rgba(52,211,153,0.08),0_10px_26px_rgba(16,185,129,0.08)]"
                  : isSelected
                    ? "border-primary/25 bg-primary/10"
                    : "border-transparent hover:bg-card/50",
                isWorking && "border-cyan-300/60 bg-cyan-400/10",
              )}
            >
              {s.active && (
                <span
                  className="absolute right-1.5 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-400 text-[9px] text-slate-950 shadow-sm"
                  aria-hidden="true"
                >
                  <Check className="h-2.5 w-2.5" />
                </span>
              )}
              <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                {isWorking && (
                  <span className="absolute inset-0 rounded-full border border-cyan-300/60 animate-ping" />
                )}
                <span
                  className={cn(
                    "relative flex h-7 w-7 items-center justify-center rounded-full",
                    isWorking
                      ? "bg-cyan-400/20 text-cyan-200"
                      : s.active
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-primary/15 text-primary",
                  )}
                >
                  <Bot className={cn("h-4 w-4", isWorking && "animate-pulse")} />
                </span>
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-body">{s.label}</p>
                <p className="flex min-h-4 items-center gap-1 truncate text-[10px] text-muted-foreground">
                  <span className="truncate">@{s.handle}</span>
                  <span className="shrink-0">
                    {isWorking ? "- thinking" : s.active ? "- called in" : "- standby"}
                  </span>
                  {isWorking && (
                    <span className="ml-0.5 flex shrink-0 items-end gap-0.5" aria-hidden="true">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="h-1 w-1 rounded-full bg-cyan-300 animate-bounce"
                          style={{ animationDelay: `${i * 110}ms` }}
                        />
                      ))}
                    </span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSeatActive(s.id);
                }}
                className={cn(
                  "shrink-0 rounded p-1 transition-colors",
                  s.active
                    ? "text-emerald-300 hover:bg-emerald-500/20 hover:text-emerald-200"
                    : "text-muted-foreground opacity-0 hover:bg-card/60 hover:text-body group-hover:opacity-100",
                )}
                aria-label={s.active ? `Bench ${s.label}` : `Call in ${s.label}`}
                title={s.active ? "Bench (stop auto-responding)" : "Call in (auto-respond)"}
              >
                <Power className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveSeat(s.id);
                }}
                className="text-muted-foreground opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100"
                aria-label={`Remove ${s.label}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-2 space-y-1 border-t border-border/40 pt-2">
        <Popover open={addOpen} onOpenChange={setAddOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-md border border-dashed border-border/50 px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-body"
            >
              <Plus className="h-4 w-4 shrink-0" /> Add AI seat
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-0">
            <AddSeatForm
              connectedSlugs={connectedSlugs}
              onAdd={(slug, model) => {
                onAddSeat(slug, model);
                setAddOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>

        <Popover open={inviteOpen} onOpenChange={setInviteOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center gap-2 rounded-md border border-dashed border-border/50 px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-body"
            >
              <UserPlus className="h-4 w-4 shrink-0" /> Invite member
            </button>
          </PopoverTrigger>
          <PopoverContent align="start" className="p-0">
            <InviteMemberForm
              accessToken={accessToken}
              added={humanMembers}
              onAdd={(member) => {
                onAddHumanMember(member);
                setInviteOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
}
