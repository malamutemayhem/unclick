import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useSession } from "@/lib/auth";
import { ChatMemberRail, type AiSeat } from "@/components/admin/ChatMemberRail";
import { ChatSessionList, type ChatThread } from "@/components/admin/ChatSessionList";
import { CacheKeyPrompt } from "@/components/admin/CacheKeyPrompt";
import type { HumanMember } from "@/components/admin/chatMembers";
import {
  CHAT_PROVIDERS,
  CHAT_API_ENDPOINT,
  findChatProvider,
  estimateTokens,
} from "@/components/admin/chatTransportConfig";

// Join the text parts of a UI message into a single string.
function messageText(parts: { type: string }[]): string {
  return parts
    .map((p) => (p.type === "text" ? (p as { type: "text"; text: string }).text : ""))
    .join("");
}

// A short, unique @handle derived from a model label, e.g.
// "Claude 3.5 Sonnet" -> "Claude3.5Sonnet". Appends a number on collision.
function makeHandle(label: string, taken: string[]): string {
  const base = label.replace(/[^A-Za-z0-9.]/g, "") || "ai";
  if (!taken.includes(base)) return base;
  let n = 2;
  while (taken.includes(`${base}${n}`)) n += 1;
  return `${base}${n}`;
}

function newSeat(slug: string, model: string, taken: string[]): AiSeat {
  const provider = findChatProvider(slug);
  const label = provider?.models.find((m) => m.value === model)?.label ?? model;
  return { id: crypto.randomUUID(), slug, model, label, handle: makeHandle(label, taken) };
}

const SEATS_STORAGE_KEY = "unclick_chat_seats";

// Load saved seats. Seed one default seat ONLY on the very first visit (no
// stored value yet) - after that the stored list wins, so a seat the user
// removed stays removed instead of being re-seeded on every reload.
function loadSeats(): AiSeat[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SEATS_STORAGE_KEY);
    if (raw === null) {
      const p = CHAT_PROVIDERS[0];
      return [newSeat(p.slug, p.models[0].value, [])];
    }
    const parsed = JSON.parse(raw) as AiSeat[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Shape of a persisted row from /api/chat-threads?action=messages.
interface ThreadMessageRow {
  id: string;
  sender_id?: string | null;
  sender_kind?: string | null;
  model?: string | null;
  content?: string | null;
}

export default function AdminChatPage() {
  const { user, session } = useSession();
  const accessToken = session?.access_token ?? null;
  // Chat authenticates with the logged-in session: AI provider keys are
  // account-scoped + server-encrypted, so no cached UnClick key is needed and
  // master-key rotation has no effect. The chat endpoint resolves the session
  // to the account lane (see api/chat.ts + api/lib/account-lane.ts).
  const apiKey = accessToken;

  const [seats, setSeats] = useState<AiSeat[]>(loadSeats);
  const [activeSeatId, setActiveSeatId] = useState<string | null>(() => null);
  const [input, setInput] = useState("");
  const [seatByMsg, setSeatByMsg] = useState<Record<string, string>>({});
  const [humanMembers, setHumanMembers] = useState<HumanMember[]>([]);
  const targetSeatRef = useRef<AiSeat | null>(null);

  // Sessions (threads). Each is endless; "New session" starts a fresh one.
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const activeThreadRef = useRef<string | null>(null);
  activeThreadRef.current = activeThreadId;
  const didInit = useRef(false);

  const transport = useMemo(() => new DefaultChatTransport({ api: CHAT_API_ENDPOINT }), []);
  const { messages, sendMessage, status, stop, error, setMessages } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  const activeSeat = seats.find((s) => s.id === activeSeatId) ?? seats[0] ?? null;

  function authHeaders(json = false): Record<string, string> {
    const h: Record<string, string> = {};
    if (accessToken) h.Authorization = `Bearer ${accessToken}`;
    if (json) h["Content-Type"] = "application/json";
    return h;
  }

  async function refreshThreads() {
    if (!accessToken) return;
    try {
      const r = await fetch("/api/chat-threads?action=list", { headers: authHeaders() });
      const b = await r.json().catch(() => ({}));
      if (r.ok && Array.isArray(b.threads)) setThreads(b.threads as ChatThread[]);
    } catch {
      /* ignore */
    }
  }

  async function selectThread(id: string) {
    setActiveThreadId(id);
    if (!accessToken) return;
    try {
      const r = await fetch(
        `/api/chat-threads?action=messages&thread_id=${encodeURIComponent(id)}`,
        { headers: authHeaders() },
      );
      const b = await r.json().catch(() => ({}));
      const rows: ThreadMessageRow[] = r.ok && Array.isArray(b.messages) ? b.messages : [];
      const ui: UIMessage[] = rows.map((m) => ({
        id: m.id,
        role: m.sender_kind === "human" ? "user" : "assistant",
        parts: [{ type: "text", text: m.content ?? "" }],
      }));
      setMessages(ui);
      const attribution: Record<string, string> = {};
      for (const m of rows) {
        if (m.sender_kind !== "human") attribution[m.id] = m.sender_id || m.model || "AI";
      }
      setSeatByMsg(attribution);
    } catch {
      /* ignore */
    }
  }

  async function newSession() {
    setMessages([]);
    setSeatByMsg({});
    setActiveThreadId(null);
    if (!accessToken) return;
    try {
      const r = await fetch("/api/chat-threads?action=create", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({}),
      });
      const b = await r.json().catch(() => ({}));
      if (r.ok && b.id) {
        setActiveThreadId(b.id as string);
        await refreshThreads();
      }
    } catch {
      /* ignore */
    }
  }

  async function renameThread(id: string, title: string) {
    setThreads((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
    if (!accessToken) return;
    try {
      await fetch("/api/chat-threads?action=update", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({ thread_id: id, title }),
      });
    } catch {
      /* ignore */
    }
  }

  async function togglePin(id: string, pinned: boolean) {
    if (!accessToken) return;
    try {
      await fetch("/api/chat-threads?action=update", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({ thread_id: id, pinned }),
      });
      await refreshThreads();
    } catch {
      /* ignore */
    }
  }

  async function deleteThread(id: string) {
    if (!accessToken) return;
    try {
      await fetch("/api/chat-threads?action=delete", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({ thread_id: id }),
      });
      if (activeThreadRef.current === id) {
        setActiveThreadId(null);
        setMessages([]);
        setSeatByMsg({});
      }
      await refreshThreads();
    } catch {
      /* ignore */
    }
  }

  // On first load, list sessions and reopen the most recent one.
  useEffect(() => {
    if (!accessToken || didInit.current) return;
    didInit.current = true;
    void (async () => {
      try {
        const r = await fetch("/api/chat-threads?action=list", { headers: authHeaders() });
        const b = await r.json().catch(() => ({}));
        const list: ChatThread[] = r.ok && Array.isArray(b.threads) ? b.threads : [];
        setThreads(list);
        if (list.length > 0) void selectThread(list[0].id);
      } catch {
        /* ignore */
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // Attribute each assistant turn to the seat it was sent to, as it arrives.
  useEffect(() => {
    setSeatByMsg((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const m of messages) {
        if (m.role === "assistant" && !next[m.id]) {
          next[m.id] = targetSeatRef.current?.label ?? "AI";
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [messages]);

  // Persist seats so a removed seat stays removed across reloads.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try { window.localStorage.setItem(SEATS_STORAGE_KEY, JSON.stringify(seats)); } catch { /* ignore */ }
  }, [seats]);

  function addSeat(slug: string, model: string) {
    setSeats((prev) => [...prev, newSeat(slug, model, prev.map((s) => s.handle))]);
  }

  function removeSeat(id: string) {
    setSeats((prev) => prev.filter((s) => s.id !== id));
    setActiveSeatId((cur) => (cur === id ? null : cur));
  }

  function addHumanMember(member: HumanMember) {
    setHumanMembers((prev) => (prev.some((m) => m.id === member.id) ? prev : [...prev, member]));
  }

  function removeHumanMember(id: string) {
    setHumanMembers((prev) => prev.filter((m) => m.id !== id));
  }

  function selectSeat(seat: AiSeat) {
    setActiveSeatId(seat.id);
    targetSeatRef.current = seat;
    setInput((prev) => {
      const stripped = prev.replace(/^@\S+\s*/, "");
      return `@${seat.handle} ${stripped}`;
    });
  }

  // Decide which seat answers: a leading @handle wins, else the active seat.
  function resolveTarget(text: string): { seat: AiSeat | null; text: string } {
    const m = text.match(/^@(\S+)\s*/);
    if (m) {
      const seat = seats.find((s) => s.handle === m[1]);
      if (seat) return { seat, text: text.slice(m[0].length) };
    }
    return { seat: activeSeat, text };
  }

  async function onSend() {
    const raw = input.trim();
    if (!raw || !apiKey || busy) return;
    const { seat, text } = resolveTarget(raw);
    if (!seat) return;
    targetSeatRef.current = seat;
    setActiveSeatId(seat.id);
    const content = text.trim() || raw;
    setInput("");

    // Ensure a session exists (create one on the first turn).
    let tid = activeThreadRef.current;
    if (!tid && accessToken) {
      try {
        const r = await fetch("/api/chat-threads?action=create", {
          method: "POST",
          headers: authHeaders(true),
          body: JSON.stringify({}),
        });
        const b = await r.json().catch(() => ({}));
        if (r.ok && b.id) {
          tid = b.id as string;
          setActiveThreadId(tid);
        }
      } catch {
        /* ignore */
      }
    }

    // Persist the human turn (this also auto-titles the session server-side).
    if (tid && accessToken) {
      try {
        await fetch("/api/chat-threads?action=append", {
          method: "POST",
          headers: authHeaders(true),
          body: JSON.stringify({ thread_id: tid, content }),
        });
      } catch {
        /* ignore */
      }
    }

    sendMessage(
      { text: content },
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        body: { slug: seat.slug, model: seat.model, lane: "api", thread_id: tid ?? undefined },
      },
    );

    void refreshThreads();
  }

  const totalTokens = messages.reduce((sum, m) => sum + estimateTokens(messageText(m.parts)), 0);
  const canSend = Boolean(apiKey) && Boolean(activeSeat) && input.trim().length > 0;

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-heading">Chat</h1>
          <p className="mt-1 text-sm text-body">
            A room for you and your AI seats. Add seats, then @mention one to direct a turn. Each seat
            runs on your own provider key - the platform never bills for the call.
          </p>
        </div>
        <div className="shrink-0 text-xs text-muted-foreground">~{totalTokens} tokens (est)</div>
      </header>

      {!apiKey && <CacheKeyPrompt />}

      <div className="flex flex-col gap-4 md:h-[calc(100vh-13rem)] md:flex-row-reverse md:items-stretch">
        <ChatMemberRail
          user={user}
          accessToken={accessToken}
          seats={seats}
          activeSeatId={activeSeat?.id ?? null}
          humanMembers={humanMembers}
          onSelectSeat={selectSeat}
          onAddSeat={addSeat}
          onRemoveSeat={removeSeat}
          onAddHumanMember={addHumanMember}
          onRemoveHumanMember={removeHumanMember}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-3 md:min-h-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/admin/agents/api" className="text-primary hover:underline">
              Set up API keys
            </Link>
            <span className="text-border">|</span>
            <Link to="/admin/agents/local" className="text-primary hover:underline">
              Local models
            </Link>
          </div>

          <div className="min-h-[46vh] flex-1 space-y-3 overflow-y-auto rounded-lg border border-border/40 bg-card/30 p-4 md:min-h-0">
            {messages.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {activeSeat
                  ? `Ask ${activeSeat.label} anything, or @mention another seat. Replies show which seat answered and an estimated token cost.`
                  : "Add an AI seat from the members panel to start."}
              </p>
            )}
            {messages.map((m) => {
              const text = messageText(m.parts);
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={isUser ? "text-right" : "text-left"}>
                  <div
                    className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
                      isUser ? "bg-primary/10 text-foreground" : "bg-card/60 text-body"
                    }`}
                  >
                    {text || (busy ? "..." : "")}
                  </div>
                  {!isUser && text && (
                    <div className="mt-0.5 text-[10px] text-muted-foreground">
                      {seatByMsg[m.id] ?? "AI"} - ~{estimateTokens(text)} tokens (est)
                    </div>
                  )}
                </div>
              );
            })}
            {error && <div className="text-sm text-red-400">Error: {error.message}</div>}
          </div>

          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void onSend();
                }
              }}
              rows={2}
              placeholder={
                apiKey
                  ? activeSeat
                    ? `Message ${activeSeat.label}... (@mention to switch seat, Enter to send)`
                    : "Add an AI seat to chat"
                  : "Set your UnClick key to chat"
              }
              disabled={!apiKey || !activeSeat}
              className="flex-1 resize-none rounded-md border border-border/50 bg-card/40 px-3 py-2 text-sm text-body outline-none focus:border-primary/50"
            />
            {busy ? (
              <button
                type="button"
                onClick={() => stop()}
                className="rounded-md border border-border/50 px-4 py-2 text-sm font-medium text-body hover:bg-card/40"
              >
                Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={() => void onSend()}
                disabled={!canSend}
                className="rounded-md bg-primary/90 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary disabled:opacity-40"
              >
                Send
              </button>
            )}
          </div>
        </div>

        <ChatSessionList
          threads={threads}
          activeThreadId={activeThreadId}
          onNew={() => void newSession()}
          onSelect={(id) => void selectThread(id)}
          onRename={(id, title) => void renameThread(id, title)}
          onTogglePin={(id, pinned) => void togglePin(id, pinned)}
          onDelete={(id) => void deleteThread(id)}
        />
      </div>
    </div>
  );
}
