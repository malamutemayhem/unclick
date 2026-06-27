// ============================================================
// ChatMemberRail - the slim roster beside the chat canvas.
//
// Shows who is in the room: the operator (human, with their You-page
// avatar) and the AI seats. Click a seat to direct the next turn at it
// (it @mentions that seat in the composer). "Add AI seat" opens an inline
// picker that reuses the live OpenRouter catalog. Cross-account human
// members ("Invite member") are the next slice and shown as planned.
//
// Single-account only for now: every seat runs on the operator's own
// key, so there is no cross-tenant data here.
// ============================================================

import { useEffect, useState } from "react";
import { Plus, X, Bot, UserPlus } from "lucide-react";
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
import { cn } from "@/lib/utils";

export interface AiSeat {
  id: string;
  slug: string;
  model: string;
  label: string;
  handle: string;
}

const PROVIDER_OPTIONS: ComboOption[] = CHAT_PROVIDERS.map((p) => ({
  value: p.slug,
  label: p.label,
}));

function AddSeatForm({ onAdd }: { onAdd: (slug: string, model: string) => void }) {
  const [slug, setSlug] = useState(CHAT_PROVIDERS[0].slug);
  const [model, setModel] = useState(CHAT_PROVIDERS[0].models[0].value);
  const [live, setLive] = useState<ChatModelOption[] | null>(null);
  const [loading, setLoading] = useState(false);
  const provider = findChatProvider(slug);

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

  const modelOptions: ComboOption[] = slug === "openrouter" && live ? live : provider?.models ?? [];

  return (
    <div className="flex w-[min(20rem,90vw)] flex-col gap-2 p-3">
      <Combobox
        value={slug}
        options={PROVIDER_OPTIONS}
        onChange={(s) => {
          setSlug(s);
          const next = findChatProvider(s);
          if (next) setModel(next.models[0].value);
        }}
        searchPlaceholder="Search providers..."
        className="w-full"
      />
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
        onClick={() => onAdd(slug, model)}
        className="rounded-md bg-primary/90 px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary"
      >
        Add seat
      </button>
    </div>
  );
}

export function ChatMemberRail({
  user,
  seats,
  activeSeatId,
  onSelectSeat,
  onAddSeat,
  onRemoveSeat,
}: {
  user: User | null;
  seats: AiSeat[];
  activeSeatId: string | null;
  onSelectSeat: (seat: AiSeat) => void;
  onAddSeat: (slug: string, model: string) => void;
  onRemoveSeat: (id: string) => void;
}) {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <aside className="w-full shrink-0 space-y-1 rounded-lg border border-border/40 bg-card/30 p-3 md:w-60">
      <div className="px-1 pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/30">
        Members
      </div>

      <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
        <UserAvatar user={user} className="h-7 w-7" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm text-body">{user?.email ?? "You"}</p>
          <p className="text-[10px] text-muted-foreground">you (human)</p>
        </div>
      </div>

      {seats.map((s) => (
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
            "group flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors",
            activeSeatId === s.id ? "bg-primary/10" : "hover:bg-card/50",
          )}
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Bot className="h-4 w-4" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-body">{s.label}</p>
            <p className="truncate text-[10px] text-muted-foreground">@{s.handle}</p>
          </div>
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
      ))}

      <Popover open={addOpen} onOpenChange={setAddOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="mt-1 flex w-full items-center gap-2 rounded-md border border-dashed border-border/50 px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-body"
          >
            <Plus className="h-4 w-4 shrink-0" /> Add AI seat
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="p-0">
          <AddSeatForm
            onAdd={(slug, model) => {
              onAddSeat(slug, model);
              setAddOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>

      <div
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground/50"
        title="Chat with other UnClick member accounts - coming next."
      >
        <UserPlus className="h-4 w-4 shrink-0" /> Invite member
        <span className="ml-auto rounded border border-white/10 px-1 py-px text-[9px] uppercase tracking-wide">
          soon
        </span>
      </div>
    </aside>
  );
}
