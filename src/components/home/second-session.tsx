import { Bot, Brain, Check, RefreshCw, Users } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The second-session building blocks, shared by the option S preview
 * (src/pages/HomePreviewS.tsx) and the live Memory page
 * (src/pages/Memory.tsx). Born in the option S design pass
 * (2026-07-02): context is the lead claim, told as day one against
 * day two.
 *
 * Everything here is static DOM; the only motion comes from the
 * callers' scroll fades. Zero per-frame cost.
 */

/* ── The hero split: day one vs day two ─────────────────────── */

const WITHOUT_LINES = [
  "So, tell me about your business again?",
  "Which stack are you on?",
  "Where did we leave off last time?",
];

const WITH_LINES = [
  { from: "unclick", text: "identity, facts, and yesterday's session loaded" },
  { from: "ai", text: "Morning. Picking the pricing page back up where we stopped." },
  { from: "ai", text: "Your tone, your stack, your rules: already in the room." },
];

function SessionCard({ side }: { side: "without" | "with" }) {
  const withUnclick = side === "with";
  return (
    <div
      className={cn(
        "relative flex-1 rounded-2xl border p-5 sm:p-6",
        withUnclick
          ? "border-primary/40 bg-gradient-to-b from-[#0a2c3c]/95 to-[#071e29]/95 shadow-[0_0_60px_-24px_hsl(182_46%_57%/0.55)]"
          : "border-white/[0.08] bg-[#06202c]/60",
      )}
    >
      <div className="flex items-center justify-between">
        <p
          className={cn(
            "font-mono text-[10px] font-semibold uppercase tracking-[0.22em]",
            withUnclick ? "text-primary/80" : "text-muted-foreground/60",
          )}
        >
          {withUnclick ? "with UnClick" : "without UnClick"}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/50">
          {withUnclick ? "session 48" : "session 47"}
        </p>
      </div>

      <div className="mt-4 space-y-2.5">
        {withUnclick
          ? WITH_LINES.map((line) =>
              line.from === "unclick" ? (
                <div
                  key={line.text}
                  className="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/[0.07] px-3 py-2 font-mono text-[11.5px] text-primary/90"
                >
                  <Brain className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{line.text}</span>
                </div>
              ) : (
                <div
                  key={line.text}
                  className="rounded-lg rounded-tl-sm border border-white/[0.08] bg-[#0b3040]/80 px-3.5 py-2.5 text-[13.5px] text-body"
                >
                  {line.text}
                </div>
              ),
            )
          : WITHOUT_LINES.map((line) => (
              <div
                key={line}
                className="rounded-lg rounded-tl-sm border border-white/[0.06] bg-[#0a2531]/60 px-3.5 py-2.5 text-[13.5px] text-muted-foreground/75"
              >
                {line}
              </div>
            ))}
      </div>

      <p
        className={cn(
          "mt-4 flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em]",
          withUnclick ? "text-primary/75" : "text-muted-foreground/50",
        )}
      >
        {withUnclick ? (
          <>
            <Check className="h-3 w-3" />
            one call and it knows you
          </>
        ) : (
          <>
            <RefreshCw className="h-3 w-3" />
            every session starts from zero
          </>
        )}
      </p>
    </div>
  );
}

export function SessionSplit({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-4 sm:flex-row", className)}>
      <SessionCard side="without" />
      <SessionCard side="with" />
    </div>
  );
}

/* ── The AIs that plug in, converging on one memory ─────────── */

const AI_CHIPS = ["ChatGPT", "Claude", "Cursor", "Copilot", "local model"];

export function AiTetherDiagram({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto max-w-2xl", className)}>
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {AI_CHIPS.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-[#06202c]/90 px-3 py-1.5 font-mono text-[12px] text-body/90"
          >
            <Bot className="h-3.5 w-3.5 text-primary/75" />
            {chip}
          </span>
        ))}
      </div>

      {/* Static tethers: five hairlines converging on the one memory
          card. An SVG that never changes after paint. */}
      <svg
        viewBox="0 0 400 56"
        preserveAspectRatio="none"
        className="mx-auto -my-1 block h-14 w-full max-w-md"
        aria-hidden="true"
      >
        {[30, 115, 200, 285, 370].map((x) => (
          <path
            key={x}
            d={`M ${x} 0 C ${x} 34, 200 22, 200 56`}
            fill="none"
            stroke="hsl(183 50% 62% / 0.35)"
            strokeWidth="1.5"
          />
        ))}
      </svg>

      <div className="mx-auto flex max-w-xs items-center justify-center gap-2.5 rounded-2xl border border-primary/40 bg-gradient-to-b from-[#0a2c3c]/95 to-[#071e29]/95 px-5 py-4 shadow-[0_0_50px_-18px_hsl(182_46%_57%/0.6)]">
        <Brain className="h-5 w-5 shrink-0 text-primary" />
        <p className="text-left font-mono text-[12.5px] leading-snug text-body">
          your memory
          <span className="block text-[10.5px] uppercase tracking-[0.14em] text-primary/70">
            one account · every seat
          </span>
        </p>
      </div>
    </div>
  );
}

/* ── The shared board and the honest team card ──────────────── */

const SEATS = [
  { name: "Sam", ai: "ChatGPT", img: "/faces/sam.svg" },
  { name: "Priya", ai: "Cursor", img: "/faces/priya.svg" },
  { name: "Sarah", ai: "Claude", img: "/faces/sarah.svg" },
  { name: "Leo", ai: "Copilot", img: "/faces/leo.svg" },
  { name: "Mia", ai: "local model", img: "/faces/mia.svg" },
];

const BOARD_POSTS = [
  { who: "Sarah's Claude", what: "posted: pricing copy drafted, ready for eyes", tag: "update" },
  { who: "Priya's Cursor", what: "handed off: broken link fix, tests green", tag: "handoff" },
  { who: "Sam's ChatGPT", what: "voted on: follow-up sequence idea", tag: "idea" },
];

export function SharedBoardCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl border border-[#86dadd]/15 bg-[#07222e]/70 p-5 sm:p-6", className)}>
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-primary/80" />
        <p className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.2em] text-primary/70">
          the shared board
        </p>
      </div>
      <div className="mt-4 space-y-2.5">
        {BOARD_POSTS.map((post) => (
          <div
            key={post.what}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.07] bg-[#06202c]/70 px-3.5 py-2.5"
          >
            <p className="min-w-0 text-[13px] text-body">
              <span className="font-semibold text-heading">{post.who}</span>{" "}
              <span className="text-body/85">{post.what}</span>
            </p>
            <span className="shrink-0 rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.1em] text-primary">
              {post.tag}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap items-end justify-center gap-x-4 gap-y-3">
        {SEATS.map((seat) => (
          <div key={seat.name} className="flex w-[76px] flex-col items-center">
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-primary/45 bg-[#07212d]/85">
              <img src={seat.img} alt="" className="h-full w-full" />
            </span>
            <span className="mt-1.5 text-[11.5px] font-semibold text-body">{seat.name}</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.06em] text-muted-foreground/70">
              {seat.ai}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InBuildTeamCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between rounded-2xl border border-dashed border-primary/35 bg-primary/[0.04] p-5 sm:p-6",
        className,
      )}
    >
      <div>
        <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em] text-primary">
          in build
        </span>
        <h3 className="mt-4 text-xl font-extrabold tracking-[-0.01em] text-heading">
          Invite your team.
        </h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-body/85">
          Same board, same memory, their own AI subscriptions. Ten people, ten different AIs, one
          shared floor. We run our own team on it first; you get it when it holds.
        </p>
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">
        dogfood first · claims second
      </p>
    </div>
  );
}
