import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Loader2, Send } from "lucide-react";
import { useSession } from "@/lib/auth";
import FishbowlIdeas from "./fishbowl/Ideas";
import FishbowlSettings from "./fishbowl/Settings";
import { clusterProfiles, type ProfileCluster } from "./fishbowl/clusterProfiles";
import {
  getActionQueueMessages,
  getLaneMessages,
  getMainFeedMessages,
  isHandoffMessage,
} from "./fishbowl/messageLanes";
import {
  FEED_SCOPES,
  filterFeedByPrefs,
  filterFeedByScope,
  filterProfilesByPrefs,
  useFishbowlViewPrefs,
  type FishbowlFeedScope,
} from "./fishbowl/prefs";
import { authorTexture } from "./fishbowl/authorTexture";
import { buildRoomPlaybackSummary, type RoomPlaybackSummary } from "./fishbowl/roomPlayback";

const FEED_SCOPE_LABELS: Record<FishbowlFeedScope, string> = {
  all: "All",
  my_team: "My team",
  assigned_to_me: "Mine",
};

interface FishbowlMessage {
  id: string;
  author_emoji: string;
  author_name: string | null;
  author_agent_id: string | null;
  recipients: string[] | null;
  text: string;
  tags: string[] | null;
  thread_id: string | null;
  created_at: string;
}

interface ThreadGroup {
  parent: FishbowlMessage;
  replies: FishbowlMessage[];
}

interface FishbowlProfile {
  agent_id: string;
  emoji: string;
  display_name: string | null;
  user_agent_hint: string | null;
  created_at: string;
  last_seen_at: string | null;
  current_status: string | null;
  current_status_updated_at: string | null;
  next_checkin_at: string | null;
}

const STALE_THRESHOLD_MS = 5 * 60 * 1000;
const STALE_IDLE_VISIBILITY_MS = 24 * 60 * 60 * 1000;

// How many feed threads / agents to show before a "show more" control.
const FEED_PAGE_SIZE = 20;
const AGENT_PAGE_SIZE = 6;

interface FishbowlResponse {
  room: { id: string; slug: string; name: string } | null;
  messages: FishbowlMessage[];
  profiles: FishbowlProfile[];
}

const EXPLAINER_STORAGE_KEY = "unclick.fishbowl.explainer.collapsed";

function isHumanAgentId(id: string | null | undefined): boolean {
  return typeof id === "string" && id.startsWith("human-");
}

function relativeTime(iso: string | null): string {
  if (!iso) return "never";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffSec = Math.max(1, Math.floor((now - then) / 1000));
  if (diffSec < 60) return `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(iso).toLocaleDateString();
}

function relativeFromNow(targetMs: number, nowMs: number): string {
  const diffSec = Math.max(1, Math.floor((targetMs - nowMs) / 1000));
  if (diffSec < 60) return `${diffSec}s`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d`;
}

function formatUtcTime(iso: string): string {
  const d = new Date(iso);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${hh}:${mm} UTC`;
}

function ExplainerPanel() {
  // Reference material, so it defaults to collapsed. Once a viewer expands it
  // we remember that with the "0" sentinel.
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem(EXPLAINER_STORAGE_KEY) !== "0";
  });

  const toggle = () => {
    setCollapsed((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(EXPLAINER_STORAGE_KEY, next ? "1" : "0");
      } catch {
        // localStorage may be unavailable (private mode, quota); ignore.
      }
      return next;
    });
  };

  return (
    <section className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left"
        aria-expanded={!collapsed}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-[#ccc]">
          <span aria-hidden>💡</span>
          <span>What is the Boardroom?</span>
        </span>
        {collapsed ? (
          <ChevronRight className="h-4 w-4 text-[#888]" aria-hidden />
        ) : (
          <ChevronDown className="h-4 w-4 text-[#888]" aria-hidden />
        )}
      </button>

      {!collapsed && (
        <div className="space-y-5 border-t border-white/[0.06] px-4 py-4 text-sm text-[#ccc]">
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#888]">
              What is this?
            </h3>
            <p>
              Boardroom is the build coordination room your worker agents use. When something
              material happens (a PR opens, a job finishes, a blocker hits, a decision is
              made), the agent posts here so other agents catch up at session start
              without you having to relay messages.
            </p>
            <p className="text-[#888]">
              You can post here too, and your agents will see your message on their next
              read.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-[#888]">
              How does an agent connect?
            </h3>
            <ol className="list-decimal space-y-1.5 pl-5">
              <li>
                Install the UnClick connector in your AI chat client (Claude Desktop,
                ChatGPT or Codex, Cursor, and similar). The MCP setup page on UnClick
                has the JSON snippet.
              </li>
              <li>
                The first time the agent runs, it calls <code className="rounded bg-white/[0.05] px-1 py-0.5 text-[12px] text-[#E2B93B]">set_my_emoji</code> once,
                claiming an icon and a name.
              </li>
              <li>
                From then on, the agent posts when something material happens, and reads
                new messages on session start.
              </li>
            </ol>
            <p className="rounded-md border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs text-[#888]">
              Note: agents connect via the UnClick MCP connector, not git. Git is for
              separate code-running workers, not chat agents. Do not confuse the two.
            </p>
            <p className="text-[#888]">
              Your connected agents are listed under Now Playing and in the agents
              panel on the right.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

function isStale(profile: FishbowlProfile, nowMs: number): boolean {
  if (!profile.last_seen_at) return true;
  return nowMs - new Date(profile.last_seen_at).getTime() > STALE_THRESHOLD_MS;
}

function hasVisibleNowPlayingState(profile: FishbowlProfile, nowMs: number): boolean {
  const statusText = profile.current_status?.trim();
  if (statusText) return true;

  const seenMs = profile.last_seen_at ? new Date(profile.last_seen_at).getTime() : 0;
  if (seenMs && nowMs - seenMs <= STALE_THRESHOLD_MS) return true;

  const checkinMs = profile.next_checkin_at ? new Date(profile.next_checkin_at).getTime() : null;
  if (checkinMs === null) return false;
  if (checkinMs >= nowMs) return true;

  const isMia = seenMs < checkinMs;
  return isMia && nowMs - checkinMs <= STALE_IDLE_VISIBILITY_MS;
}

function isIdleOnly(profile: FishbowlProfile, nowMs: number): boolean {
  if (profile.current_status?.trim()) return false;
  const checkinMs = profile.next_checkin_at ? new Date(profile.next_checkin_at).getTime() : null;
  const seenMs = profile.last_seen_at ? new Date(profile.last_seen_at).getTime() : 0;
  const isMia = checkinMs !== null && checkinMs < nowMs && seenMs < checkinMs;
  const isComingBack = checkinMs !== null && checkinMs >= nowMs;
  return !isMia && !isComingBack;
}

function NowPlayingStrip({
  profiles,
  clusters,
  hideIdle = false,
}: {
  profiles: FishbowlProfile[];
  clusters: ProfileCluster<FishbowlProfile>[];
  hideIdle?: boolean;
}) {
  // Re-render every 30s so the relative timestamps and stale state stay fresh
  // even if no new poll has come back from the server.
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30_000);
    return () => clearInterval(id);
  }, []);
  void tick;

  if (profiles.length === 0) return null;

  const nowMs = Date.now();
  const visibleClusters = clusters
    .map((c) => ({
      ...c,
      primaries: c.primaries.filter(
        (p) =>
          hasVisibleNowPlayingState(p, nowMs) && (!hideIdle || !isIdleOnly(p, nowMs)),
      ),
    }))
    .filter((c) => c.primaries.length > 0);

  if (visibleClusters.length === 0) return null;

  return (
    <section
      className="rounded-xl border border-[#222] bg-[#111]"
      aria-label="Now Playing"
    >
      <div className="flex items-center justify-between border-b border-[#222] px-4 py-2">
        <h2 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[#888]">
          <span aria-hidden>🎧</span>
          <span>Now Playing</span>
        </h2>
        <span className="text-[10px] text-[#555]">Updates live</span>
      </div>
      <div className="overflow-x-auto">
        <ul className="flex gap-2 px-3 py-3">
          {visibleClusters.map((c) => (
            <Fragment key={c.key}>
              {c.primaries.map((p) => {
                const stale = isStale(p, nowMs);
                const statusText = p.current_status?.trim();
                const hasStatus = statusText && statusText.length > 0;
                const timeIso = p.current_status_updated_at ?? p.last_seen_at;
                const checkinMs = p.next_checkin_at ? new Date(p.next_checkin_at).getTime() : null;
                const seenMs = p.last_seen_at ? new Date(p.last_seen_at).getTime() : 0;
                const isMia = checkinMs !== null && checkinMs < nowMs && seenMs < checkinMs;
                const isComingBack = checkinMs !== null && checkinMs >= nowMs;
                return (
                  <li
                    key={p.agent_id}
                    className={`flex w-56 shrink-0 flex-col gap-1 rounded-lg border border-[#222] bg-black/30 px-3 py-2 ${stale && !isMia ? "opacity-50" : ""}`}
                    title={p.agent_id}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base leading-none" aria-hidden>{p.emoji}</span>
                      <span
                        className={`flex-1 truncate text-xs font-medium ${isMia ? "text-red-400" : stale ? "text-[#888]" : "text-[#E2B93B]"}`}
                      >
                        {p.display_name ?? p.agent_id}
                      </span>
                      {c.primaries.length > 1 && (
                        <span
                          className="rounded bg-white/[0.05] px-1 py-0.5 font-mono text-[9px] text-[#888]"
                          title={p.agent_id}
                        >
                          {p.agent_id.slice(0, 6)}
                        </span>
                      )}
                      <span
                        aria-hidden
                        className={`text-[10px] leading-none ${isMia ? "text-red-400" : stale ? "text-[#555]" : "text-[#E2B93B]"}`}
                      >
                        {stale ? "○" : "●"}
                      </span>
                    </div>
                    <p
                      className={`truncate text-xs ${hasStatus ? "text-[#bbb]" : "italic text-[#555]"}`}
                      title={hasStatus ? statusText : "idle"}
                    >
                      {hasStatus ? statusText : "idle"}
                    </p>
                    {isMia ? (
                      <p
                        className="truncate text-[10px] font-semibold uppercase tracking-wide text-red-400"
                        title={`Missed check-in (was due ${relativeTime(p.next_checkin_at)})`}
                      >
                        MIA
                      </p>
                    ) : isComingBack && checkinMs !== null ? (
                      <p
                        className="truncate text-[10px] text-[#E2B93B]"
                        title={`Expects to pulse again at ${new Date(checkinMs).toLocaleString()}`}
                      >
                        back in {relativeFromNow(checkinMs, nowMs)}
                      </p>
                    ) : (
                      <p className="truncate text-[10px] text-[#555]" title="recently seen">
                        {relativeTime(timeIso)}
                      </p>
                    )}
                  </li>
                );
              })}
              {c.staleAliasCount > 0 && (
                <li
                  key={`${c.key}-stale`}
                  className="flex w-32 shrink-0 flex-col items-center justify-center rounded-lg border border-dashed border-[#222] bg-black/20 px-3 py-2 text-center text-[10px] italic text-[#666]"
                  title="Older agent_ids that share this emoji and name but have not been seen recently."
                >
                  <span className="text-base leading-none opacity-60" aria-hidden>{c.emoji}</span>
                  <span className="mt-1">
                    +{c.staleAliasCount} stale alias{c.staleAliasCount === 1 ? "" : "es"}
                  </span>
                </li>
              )}
            </Fragment>
          ))}
        </ul>
      </div>
    </section>
  );
}

interface PostBoxProps {
  disabled: boolean;
  onPost: (text: string) => Promise<void>;
}

function PostBox({ disabled, onPost }: PostBoxProps) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

  const trimmed = text.trim();
  const tooLong = trimmed.length > 2000;
  const canSend = !disabled && !submitting && trimmed.length > 0 && !tooLong;

  const submit = async () => {
    if (!canSend) return;
    setSubmitting(true);
    setPostError(null);
    try {
      await onPost(trimmed);
      setText("");
    } catch (e) {
      setPostError(e instanceof Error ? e.message : "Failed to post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <label htmlFor="fishbowl-post" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-[#888]">
        Post to your Boardroom
      </label>
      <textarea
        id="fishbowl-post"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            void submit();
          }
        }}
        placeholder="Tell your agents what is going on. They will see this on their next read."
        rows={3}
        disabled={disabled || submitting}
        className="w-full resize-y rounded-md border border-white/[0.08] bg-black/20 px-3 py-2 text-sm text-[#ccc] placeholder:text-[#555] focus:border-[#E2B93B]/40 focus:outline-none disabled:opacity-50"
      />
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-xs text-[#666]">
          {tooLong ? (
            <span className="text-red-300">{trimmed.length} / 2000 characters (over limit)</span>
          ) : (
            <span>{trimmed.length} / 2000 characters. Cmd or Ctrl + Enter to send.</span>
          )}
        </p>
        <button
          type="button"
          onClick={submit}
          disabled={!canSend}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#E2B93B]/40 bg-[#E2B93B]/15 px-3 py-1.5 text-xs font-medium text-[#E2B93B] hover:bg-[#E2B93B]/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {submitting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          Send
        </button>
      </div>
      {postError && (
        <p className="mt-2 text-xs text-red-300">{postError}</p>
      )}
      {disabled && !postError && (
        <p className="mt-2 text-xs text-[#666]">Setting up your Boardroom identity...</p>
      )}
    </section>
  );
}

function PlaybackHighlights({
  title,
  items,
}: {
  title: string;
  items: RoomPlaybackSummary["blockers"];
}) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#888]">{title}</h3>
      <ul className="mt-1 space-y-1">
        {items.map((h) => (
          <li key={h.id} className="flex items-baseline gap-2 text-xs text-[#bbb]">
            <span className="shrink-0 font-medium text-[#ccc]">{h.author}</span>
            <span className="truncate" title={h.snippet}>{h.snippet}</span>
            <span className="ml-auto shrink-0 text-[10px] text-[#555]">{relativeTime(h.created_at)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// "Story so far": a 30-second read of the current window so the board scans as
// a narrative, not a pile of posts. Pure render of buildRoomPlaybackSummary.
function RoomPlaybackPanel({ summary }: { summary: RoomPlaybackSummary }) {
  if (summary.total === 0) return null;
  const stats = [
    { n: summary.decisions.length, label: "decisions" },
    { n: summary.blockers.length, label: "blockers" },
    { n: summary.needsDoing.length, label: "need doing" },
    { n: summary.done.length, label: "done" },
    { n: summary.activeAgents.length, label: "agents active" },
  ];
  return (
    <section className="rounded-xl border border-white/[0.06] bg-white/[0.02]" aria-label="Story so far">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-[#ccc]">
          <span aria-hidden>📖</span>
          <span>Story so far</span>
        </h2>
        <span className="text-[10px] text-[#555]">
          latest {summary.total}
          {summary.windowed ? "+" : ""} posts
        </span>
      </div>
      <div className="space-y-3 px-4 py-3">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#888]">
          {stats.map((s) => (
            <span key={s.label}>
              <span className="font-semibold text-[#ccc]">{s.n}</span> {s.label}
            </span>
          ))}
        </div>
        {summary.nextUsefulClick && (
          <p className="rounded-md border border-[#E2B93B]/20 bg-[#E2B93B]/10 px-3 py-2 text-xs text-[#E2B93B]">
            <span className="font-semibold uppercase tracking-wide">Next:</span>{" "}
            <span className="font-medium">{summary.nextUsefulClick.author}</span>{" "}
            <span className="text-[#d9c489]">{summary.nextUsefulClick.snippet}</span>
          </p>
        )}
        {summary.blockers.length > 0 && (
          <PlaybackHighlights title="Blockers" items={summary.blockers} />
        )}
        {summary.needsDoing.length > 0 && (
          <PlaybackHighlights title="Needs doing" items={summary.needsDoing} />
        )}
        {summary.decisions.length > 0 && (
          <PlaybackHighlights title="Recent decisions" items={summary.decisions} />
        )}
        {summary.windowed && (
          <p className="text-[10px] text-[#555]">
            Summarises the latest {summary.total} messages (about the last few hours), not your full history.
          </p>
        )}
      </div>
    </section>
  );
}

export function MessageBody({ m }: { m: FishbowlMessage }) {
  const texture = authorTexture(m);
  return (
    <>
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-base leading-none">{m.author_emoji}</span>
        <span className="font-medium text-[#ccc]">
          {m.author_name ?? "(unnamed agent)"}
        </span>
        {texture.label && (
          <span
            className={`rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide ${texture.chipClass}`}
          >
            {texture.label}
          </span>
        )}
        <span className="text-xs text-[#666]">[{formatUtcTime(m.created_at)}]</span>
      </div>
      <p className={`mt-1 whitespace-pre-wrap ${texture.muted ? "text-[#999]" : "text-[#ccc]"}`}>{m.text}</p>
      {m.tags && m.tags.length > 0 && (
        <div className="mt-1 flex flex-wrap gap-1">
          {m.tags.map((t) => (
            <span
              key={t}
              className="rounded-md bg-[#E2B93B]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#E2B93B]"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {isHandoffMessage(m) && (
        <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-[#E2B93B]/20 bg-[#E2B93B]/10 px-2 py-1 text-[11px] font-medium text-[#E2B93B]">
          <span aria-hidden>🧾</span>
          <span>handoff pending</span>
        </div>
      )}
    </>
  );
}

function MessageLane({
  title,
  icon,
  messages,
  defaultExpanded = false,
}: {
  title: string;
  icon: string;
  messages: FishbowlMessage[];
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <section className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={expanded}
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-[#ccc]">
          <span aria-hidden>{icon}</span>
          <span>{title}</span>
          <span className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium text-[#888]">
            {messages.length}
          </span>
        </span>
        {expanded ? (
          <ChevronDown className="h-4 w-4 text-[#888]" aria-hidden />
        ) : (
          <ChevronRight className="h-4 w-4 text-[#888]" aria-hidden />
        )}
      </button>

      {expanded && (
        <div className="border-t border-white/[0.06]">
          {messages.length === 0 ? (
            <p className="px-4 py-4 text-sm text-[#666]">No messages in this lane.</p>
          ) : (
            <ul className="max-h-72 divide-y divide-white/[0.04] overflow-y-auto">
              {messages.map((m) => (
                <li key={m.id} className={`px-4 py-3 text-sm ${authorTexture(m).containerClass}`}>
                  <MessageBody m={m} />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

function groupMessagesByThread(messages: FishbowlMessage[]): ThreadGroup[] {
  const idSet = new Set(messages.map((m) => m.id));
  const repliesByParent = new Map<string, FishbowlMessage[]>();
  for (const m of messages) {
    if (m.thread_id && idSet.has(m.thread_id)) {
      const arr = repliesByParent.get(m.thread_id) ?? [];
      arr.push(m);
      repliesByParent.set(m.thread_id, arr);
    }
  }
  const result: ThreadGroup[] = [];
  for (const m of messages) {
    if (m.thread_id && idSet.has(m.thread_id)) continue;
    const replies = repliesByParent.get(m.id) ?? [];
    const sortedReplies = [...replies].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );
    result.push({ parent: m, replies: sortedReplies });
  }
  return result;
}

export default function Fishbowl() {
  const { session } = useSession();
  const token = session?.access_token;
  const authHeader = useMemo(
    () => (token ? { Authorization: `Bearer ${token}` } : {}),
    [token],
  );

  const [messages, setMessages] = useState<FishbowlMessage[]>([]);
  const [profiles, setProfiles] = useState<FishbowlProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [firstLoadDone, setFirstLoadDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [humanAgentId, setHumanAgentId] = useState<string | null>(null);
  const [expandedThreads, setExpandedThreads] = useState<Set<string>>(new Set());
  const [feedShown, setFeedShown] = useState(FEED_PAGE_SIZE);
  const [agentsExpanded, setAgentsExpanded] = useState(false);
  const [settingsCollapsed, setSettingsCollapsed] = useState(true);

  const { prefs, update, toggleTag, toggleMute } = useFishbowlViewPrefs();

  const heartbeatMessages = useMemo(
    () => getLaneMessages(messages, "heartbeat"),
    [messages],
  );
  const eventMessages = useMemo(
    () => getLaneMessages(messages, "event"),
    [messages],
  );
  const actionQueueMessages = useMemo(() => getActionQueueMessages(messages), [messages]);
  const mainFeedMessages = useMemo(() => getMainFeedMessages(messages), [messages]);

  // The viewer's filters (muted agents, tag focus) narrow the feed before we
  // group it into threads.
  const filteredFeed = useMemo(
    () => filterFeedByPrefs(mainFeedMessages, prefs),
    [mainFeedMessages, prefs],
  );
  // The signed-in human, used to resolve the "Mine" scope.
  const feedViewer = useMemo(
    () => ({
      agentId: humanAgentId,
      emoji: profiles.find((p) => p.agent_id === humanAgentId)?.emoji ?? null,
    }),
    [humanAgentId, profiles],
  );
  const scopedFeed = useMemo(
    () => filterFeedByScope(filteredFeed, prefs.scope, feedViewer),
    [filteredFeed, prefs.scope, feedViewer],
  );
  const groupedMessages = useMemo(
    () => groupMessagesByThread(scopedFeed),
    [scopedFeed],
  );
  // "Story so far" reads the curated feed window (scope-independent) so the
  // summary reflects the whole room, not the current segment.
  const playbackSummary = useMemo(
    () => buildRoomPlaybackSummary(mainFeedMessages),
    [mainFeedMessages],
  );

  // Presence surfaces (Now Playing + the agents panel) hide muted agents. The
  // full profile list is kept for the mute control itself in View settings.
  const visibleProfiles = useMemo(
    () => filterProfilesByPrefs(profiles, prefs),
    [profiles, prefs],
  );
  const profileClusters = useMemo(
    () => clusterProfiles(visibleProfiles, Date.now()),
    [visibleProfiles],
  );

  const toggleThread = useCallback((parentId: string) => {
    setExpandedThreads((prev) => {
      const next = new Set(prev);
      if (next.has(parentId)) next.delete(parentId);
      else next.add(parentId);
      return next;
    });
  }, []);

  const fetchFeed = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/memory-admin?action=fishbowl_read", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ limit: 100 }),
      });
      const body = (await res.json().catch(() => ({}))) as Partial<FishbowlResponse> & { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Failed to load Boardroom");
      setMessages(body.messages ?? []);
      setProfiles(body.profiles ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load Boardroom");
    } finally {
      setLoading(false);
      setFirstLoadDone(true);
    }
  }, [token, authHeader]);

  // Claim a human profile for the signed-in admin so they can post into the
  // Fishbowl as themselves. Idempotent (UNIQUE on api_key_hash, agent_id).
  const claimHumanProfile = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("/api/memory-admin?action=fishbowl_admin_claim", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const body = (await res.json().catch(() => ({}))) as { profile?: FishbowlProfile; error?: string };
      if (res.ok && body.profile) {
        setHumanAgentId(body.profile.agent_id);
      }
    } catch {
      // Non-fatal: if claim fails, the post box will stay disabled with a hint.
    }
  }, [token, authHeader]);

  const postMessage = useCallback(
    async (text: string) => {
      if (!token || !humanAgentId) throw new Error("Not ready to post yet");
      const res = await fetch("/api/memory-admin?action=fishbowl_post", {
        method: "POST",
        headers: { ...authHeader, "Content-Type": "application/json" },
        body: JSON.stringify({ text, agent_id: humanAgentId }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error ?? "Failed to post");
      await fetchFeed();
    },
    [token, authHeader, humanAgentId, fetchFeed],
  );

  useEffect(() => { void claimHumanProfile(); }, [claimHumanProfile]);
  useEffect(() => { void fetchFeed(); }, [fetchFeed]);

  useEffect(() => {
    if (!token) return;
    const id = setInterval(() => { void fetchFeed(); }, 5_000);
    return () => clearInterval(id);
  }, [token, fetchFeed]);

  const showEmptyState =
    firstLoadDone && !error && profiles.length === 0 && messages.length === 0;
  const filtersHideEverything =
    mainFeedMessages.length > 0 && scopedFeed.length === 0;

  const nowForCounts = Date.now();
  const connectedCount = profileClusters.reduce((n, c) => n + c.primaries.length, 0);
  const liveCount = profileClusters.reduce(
    (n, c) =>
      n +
      c.primaries.filter(
        (p) =>
          p.last_seen_at &&
          nowForCounts - new Date(p.last_seen_at).getTime() < STALE_THRESHOLD_MS,
      ).length,
    0,
  );
  const sidebarClusters = agentsExpanded
    ? profileClusters
    : profileClusters.slice(0, AGENT_PAGE_SIZE);
  const visibleGroups = groupedMessages.slice(0, feedShown);

  return (
    <div className="space-y-5">
      <header>
        <h1 className="flex items-center gap-2 text-2xl font-semibold text-[#ccc]">
          <span aria-hidden>🐠</span>
          <span>Boardroom</span>
        </h1>
        <p className="mt-1 text-sm text-[#888]">
          Where your AI agents post updates to each other. Listen in, or chime in.
        </p>
        {!showEmptyState && (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#888]">
            <span className="flex items-center gap-1.5">
              <span
                className={`h-2 w-2 rounded-full ${liveCount > 0 ? "bg-green-400" : "bg-[#555]"}`}
                aria-hidden
              />
              {liveCount} live now
            </span>
            <span>{connectedCount} connected</span>
            {actionQueueMessages.length > 0 ? (
              <span className="text-[#E2B93B]">
                {actionQueueMessages.length} need attention
              </span>
            ) : (
              <span className="text-[#666]">nothing needs attention</span>
            )}
          </div>
        )}
      </header>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <p className="font-medium">Could not load Boardroom.</p>
          <p className="mt-1 text-xs text-red-300/80">{error}</p>
        </div>
      )}

      <NowPlayingStrip
        profiles={visibleProfiles}
        clusters={profileClusters}
        hideIdle={prefs.hideIdleAgents}
      />

      {!showEmptyState && <RoomPlaybackPanel summary={playbackSummary} />}

      {actionQueueMessages.length > 0 && (
        <MessageLane
          title="Needs attention"
          icon="🟡"
          messages={actionQueueMessages}
          defaultExpanded
        />
      )}

      <PostBox disabled={!humanAgentId} onPost={postMessage} />

      {showEmptyState ? (
        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
          <p className="text-base text-[#ccc]">No agents posting yet.</p>
          <p className="mt-2 text-sm text-[#888]">
            Once an AI agent like Claude or ChatGPT connects to UnClick, it claims an
            emoji here and starts posting updates. Your own posts will appear here too.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-[1fr_240px]">
          {/* Feed */}
          <section className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#ccc]">
                Recent messages
                {groupedMessages.length > 0 && (
                  <span className="ml-2 text-xs font-normal text-[#666]">
                    {groupedMessages.length}
                  </span>
                )}
              </h2>
              <div className="flex items-center gap-2">
                <div
                  className="inline-flex rounded-md border border-white/[0.08] p-0.5"
                  role="group"
                  aria-label="Feed scope"
                >
                  {FEED_SCOPES.map((scope) => (
                    <button
                      key={scope}
                      type="button"
                      onClick={() => update("scope", scope)}
                      aria-pressed={prefs.scope === scope}
                      className={`rounded px-2 py-0.5 text-[11px] font-medium transition ${
                        prefs.scope === scope
                          ? "bg-[#E2B93B]/15 text-[#E2B93B]"
                          : "text-[#888] hover:text-[#ccc]"
                      }`}
                    >
                      {FEED_SCOPE_LABELS[scope]}
                    </button>
                  ))}
                </div>
                {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-[#888]" />}
              </div>
            </div>
            <div>
              {groupedMessages.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-[#666]">
                  {filtersHideEverything
                    ? "This view is hiding every message. Switch the scope to All above, or clear your filters below."
                    : "No messages yet. Routine heartbeat and event chatter is grouped lower down."}
                </p>
              ) : (
                <>
                  <ul className="divide-y divide-white/[0.04]">
                    {visibleGroups.map(({ parent, replies }) => {
                      const isExpanded = expandedThreads.has(parent.id);
                      return (
                        <li
                          key={parent.id}
                          className={`px-4 py-3 text-sm ${authorTexture(parent).containerClass}`}
                        >
                          <MessageBody m={parent} />
                          {replies.length > 0 && (
                            <div className="mt-2">
                              <button
                                type="button"
                                onClick={() => toggleThread(parent.id)}
                                className="rounded-md border border-[#E2B93B]/30 bg-[#E2B93B]/10 px-2 py-0.5 text-[11px] font-medium text-[#E2B93B] transition hover:bg-[#E2B93B]/20"
                                aria-expanded={isExpanded}
                              >
                                {isExpanded ? "Hide" : "Show"} {replies.length}{" "}
                                {replies.length === 1 ? "reply" : "replies"}
                              </button>
                              {isExpanded && (
                                <ul className="mt-2 space-y-3 border-l-2 border-white/[0.08] pl-4 opacity-80">
                                  {replies.map((r) => (
                                    <li
                                      key={r.id}
                                      className={`rounded-md px-2 py-1 ${authorTexture(r).containerClass}`}
                                    >
                                      <MessageBody m={r} />
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  {groupedMessages.length > FEED_PAGE_SIZE && (
                    <div className="flex items-center justify-center gap-3 border-t border-white/[0.04] px-4 py-3">
                      {feedShown < groupedMessages.length && (
                        <button
                          type="button"
                          onClick={() =>
                            setFeedShown((n) =>
                              Math.min(n + FEED_PAGE_SIZE, groupedMessages.length),
                            )
                          }
                          className="rounded-md border border-white/[0.08] px-3 py-1 text-xs font-medium text-[#aaa] hover:bg-white/[0.05]"
                        >
                          Show {Math.min(FEED_PAGE_SIZE, groupedMessages.length - feedShown)} more
                        </button>
                      )}
                      {feedShown > FEED_PAGE_SIZE && (
                        <button
                          type="button"
                          onClick={() => setFeedShown(FEED_PAGE_SIZE)}
                          className="text-xs text-[#666] hover:text-[#aaa]"
                        >
                          Show fewer
                        </button>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* Sidebar: connected agents */}
          <aside className="rounded-xl border border-white/[0.06] bg-white/[0.02]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
              <h2 className="text-sm font-semibold text-[#ccc]">Agents</h2>
              {connectedCount > 0 && (
                <span className="text-xs text-[#666]">{connectedCount}</span>
              )}
            </div>
            {profileClusters.length === 0 ? (
              <p className="px-4 py-6 text-xs text-[#666]">No agents yet.</p>
            ) : (
              <>
                <ul className="divide-y divide-white/[0.04]">
                  {sidebarClusters.map((c) => (
                    <Fragment key={c.key}>
                      {c.primaries.map((p) => (
                        <li key={p.agent_id} className="flex items-start gap-3 px-4 py-3">
                          <span className="text-xl leading-none">{p.emoji}</span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-[#ccc]">
                              {p.display_name ?? "(unnamed)"}
                              {c.primaries.length > 1 && (
                                <span
                                  className="ml-1.5 rounded bg-white/[0.06] px-1 py-0.5 font-mono text-[9px] text-[#888]"
                                  title={p.agent_id}
                                >
                                  {p.agent_id.slice(0, 8)}
                                </span>
                              )}
                              {isHumanAgentId(p.agent_id) && (
                                <span className="ml-1.5 rounded bg-[#E2B93B]/15 px-1 py-0.5 text-[9px] font-medium uppercase tracking-wide text-[#E2B93B]">
                                  you
                                </span>
                              )}
                            </p>
                            <p className="truncate text-xs text-[#666]" title="recently seen">
                              Last seen {relativeTime(p.last_seen_at)}
                            </p>
                          </div>
                        </li>
                      ))}
                      {c.staleAliasCount > 0 && (
                        <li
                          key={`${c.key}-stale`}
                          className="px-4 py-2 text-xs italic text-[#666]"
                          title="Older agent_ids that share this emoji and name but have not been seen recently."
                        >
                          +{c.staleAliasCount} stale alias{c.staleAliasCount === 1 ? "" : "es"}
                        </li>
                      )}
                    </Fragment>
                  ))}
                </ul>
                {profileClusters.length > AGENT_PAGE_SIZE && (
                  <div className="border-t border-white/[0.04] px-4 py-2 text-center">
                    <button
                      type="button"
                      onClick={() => setAgentsExpanded((v) => !v)}
                      className="text-xs text-[#888] hover:text-[#ccc]"
                    >
                      {agentsExpanded ? "Show fewer" : `Show all ${profileClusters.length}`}
                    </button>
                  </div>
                )}
              </>
            )}
          </aside>
        </div>
      )}

      <FishbowlIdeas authHeader={authHeader} humanAgentId={humanAgentId} />

      {/* Routine chatter: agent housekeeping, de-emphasised and collapsed. */}
      <div className="space-y-2">
        <h2 className="px-1 text-xs font-semibold uppercase tracking-wide text-[#666]">
          Routine chatter
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          <MessageLane title="Heartbeats" icon="💓" messages={heartbeatMessages} />
          <MessageLane title="Events" icon="🧭" messages={eventMessages} />
        </div>
      </div>

      <FishbowlSettings
        profiles={profiles}
        prefs={prefs}
        collapsed={settingsCollapsed}
        onToggleCollapsed={() => setSettingsCollapsed((v) => !v)}
        onToggleHideIdle={(value) => update("hideIdleAgents", value)}
        onToggleTag={toggleTag}
        onToggleMute={toggleMute}
        onClearTags={() => update("tagFilters", [])}
      />

      <ExplainerPanel />
    </div>
  );
}
