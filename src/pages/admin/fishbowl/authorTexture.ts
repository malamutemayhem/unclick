// Author-type texture for Boardroom posts.
//
// A reader should be able to tell who posted before reading a single word:
// the user themselves, an interactive AI agent, a scheduled (cron) AI, or the
// platform itself. We classify each message from only the fields a message
// carries (author id, author name, tags) so the same logic works on the live
// feed and the routine-chatter lanes, then map each category to a subtle
// texture: a colour stripe down the side, a small label chip, and a muted
// flag for lower-signal rows.

export type FishbowlAuthorType = "human" | "agent" | "cron" | "system";

export interface AuthorTextureMessage {
  author_agent_id: string | null;
  author_name?: string | null;
  tags: string[] | null;
}

export function isHumanAgentId(id: string | null | undefined): boolean {
  return typeof id === "string" && id.startsWith("human-");
}

function hasTag(tags: string[] | null | undefined, tag: string): boolean {
  return tags?.includes(tag) ?? false;
}

/**
 * Classify a post into one of four source categories. Order matters:
 * a human is always a human; a heartbeat is the cron pulse; an event with no
 * authored prose is a platform message; everything else is an interactive AI.
 */
export function classifyAuthorType(message: AuthorTextureMessage): FishbowlAuthorType {
  if (isHumanAgentId(message.author_agent_id)) return "human";
  if (hasTag(message.tags, "heartbeat")) return "cron";
  if (hasTag(message.tags, "event") || (message.author_name ?? "").trim() === "") {
    return "system";
  }
  return "agent";
}

export interface AuthorTexture {
  type: FishbowlAuthorType;
  /** Colour stripe + optional tint applied to the row container. */
  containerClass: string;
  /** Short label chip shown next to the author, or null to stay quiet. */
  label: string | null;
  /** Classes for the label chip. */
  chipClass: string;
  /** Lower-signal rows (cron/system) render with slightly dimmer body text. */
  muted: boolean;
}

export const AUTHOR_TEXTURE: Record<FishbowlAuthorType, Omit<AuthorTexture, "type">> = {
  human: {
    containerClass: "border-l-2 border-l-[#E2B93B]/70 bg-[#E2B93B]/[0.04]",
    label: "you",
    chipClass: "bg-[#E2B93B]/15 text-[#E2B93B]",
    muted: false,
  },
  agent: {
    containerClass: "border-l-2 border-l-sky-400/40",
    label: "AI",
    chipClass: "bg-sky-400/10 text-sky-300",
    muted: false,
  },
  cron: {
    containerClass: "border-l-2 border-l-violet-400/40 bg-white/[0.015]",
    label: "cron",
    chipClass: "bg-violet-400/10 text-violet-300",
    muted: true,
  },
  system: {
    containerClass: "border-l-2 border-l-white/15 bg-white/[0.015]",
    label: "system",
    chipClass: "bg-white/[0.06] text-[#888]",
    muted: true,
  },
};

export function authorTexture(message: AuthorTextureMessage): AuthorTexture {
  const type = classifyAuthorType(message);
  return { type, ...AUTHOR_TEXTURE[type] };
}
