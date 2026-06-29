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

  // Persisted chat sessions (threads). The page lists the account's
  // sessions in the left rail and keeps the active thread's messages in sync.
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const activeThreadRef = useRef<string | null>(null);
  const didInit = useRef(false);

  const transport = useMemo(() => new DefaultChatTransport({ api: CHAT_API_ENDPOINT }), []);
  const { messages, setMessages, sendMessage, status, stop, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

  // Auth headers for the chat-threads endpoint, using the logged-in session.
  function authHeaders(json = false): Record<string, string> {
    const h: Record<string, string> = {};
    if (accessToken) h.Authorization = `Bearer ${accessToken}`;
    if (json) h["Content-Type"] = "application/json";
    return h;
  }

  function setActiveThread(id: string | null) {
    activeThreadRef.current = id;
    setActiveThreadId(id);
  }

  // List the account's sessions for the rail.
  async function refreshThreads() {
    if (!accessToken) return;
    try {
      const r = await fetch("/api/chat-threads?action=list", { headers: authHeaders() });
      if (!r.ok) return;
      const b = (await r.json()) as { threads?: ChatThread[] };
      setThreads(Array.isArray(b.threads) ? b.threads : []);
    } catch {
      /* ignore */
    }
  }

  // Row shape returned by ?action=messages.
  interface ThreadMessageRow {
    id: string;
    sender_kind: string;
    sender_id: string | null;
    model: string | null;
    content: string | null;
  }

  // Open a thread: load its shared message stream into the chat UI and
  // rebuild the per-message seat attribution from the non-human rows.
  async function selectThread(id: string) {
    if (!accessToken) return;
    setActiveThread(id);
    try {
      const r = await fetch(
        `/api/chat-threads?action=messages&thread_id=${encodeURIComponent(id)}`,
        { headers: authHeaders() },
      );
      if (!r.ok) return;
      const b = (await r.json()) as { messages?: ThreadMessageRow[] };
      const rows = Array.isArray(b.messages) ? b.messages : [];
      const uiMessages: UIMessage[] = rows.map((row) => ({
        id: row.id,
        role: row.sender_kind === "human" ? "user" : "assistant",
        parts: [{ type: "text", text: row.content ?? "" }],
      }));
      setMessages(uiMessages);
      // Rebuild seat attribution: assistant rows show which model answered.
      const attribution: Record<string, string> = {};
      for (const row of rows) {
        if (row.sender_kind !== "human") {
          attribution[row.id] = row.model ?? row.sender_id ?? "AI";
        }
      }
      setSeatByMsg(attribution);
    } catch {
      /* ignore */
    }
  }

  // Start a fresh session: clear the canvas, create a thread, make it active.
  async function newSession() {
    if (!accessToken) return;
    setMessages([]);
    setSeatByMsg({});
    try {
      const r = await fetch("/api/chat-threads?action=create", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({}),
      });
      if (!r.ok) return;
      const b = (await r.json()) as { id?: string };
      if (b.id) setActiveThread(b.id);
      await refreshThreads();
    } catch {
      /* ignore */
    }
  }

  async function renameThread(id: string, title: string) {
    if (!accessToken) return;
    try {
      await fetch("/api/chat-threads?action=update", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({ thread_id: id, title }),
      });
      await refreshThreads();
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
        setActiveThread(null);
        setMessages([]);
        setSeatByMsg({});
      }
      await refreshThreads();
    } catch {
      /* ignore */
    }
  }

  // Leave a shared room (sets the caller's own membership to 'left').
  async function leaveThread(id: string) {
    if (!accessToken) return;
    try {
      await fetch("/api/chat-threads?action=leave", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({ thread_id: id }),
      });
      if (activeThreadRef.current === id) {
        setActiveThread(null);
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
    if (didInit.current || !accessToken) return;
    didInit.current = true;
    (async () => {
      try {
        const r = await fetch("/api/chat-threads?action=list", { headers: authHeaders() });
        if (!r.ok) return;
        const b = (await r.json()) as { threads?: ChatThread[] };
        const list = Array.isArray(b.threads) ? b.threads : [];
        setThreads(list);
        if (list.length > 0) await selectThread(list[0].id);
      } catch {
        /* ignore */
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const activeSeat = seats.find((s) => s.id === activeSeatId) ?? seats[0] ?? null;

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
    setInput("");

    const content = text.trim() || raw;

    // Ensure a thread exists (create one on the first turn of a session).
    let threadId = activeThreadRef.current;
    if (!threadId) {
      try {
        const r = await fetch("/api/chat-threads?action=create", {
          method: "POST",
          headers: authHeaders(true),
          body: JSON.stringify({}),
        });
        if (r.ok) {
          const b = (await r.json()) as { id?: string };
          if (b.id) {
            threadId = b.id;
            setActiveThread(b.id);
          }
        }
      } catch {
        /* ignore - fall back to a transient (unpersisted) turn */
      }
    }

    // Persist the human turn (this auto-titles the thread server-side).
    if (threadId) {
      try {
        await fetch("/api/chat-threads?action=append", {
          method: "POST",
          headers: authHeaders(true),
          body: JSON.stringify({ thread_id: threadId, content }),
        });
      } catch {
        /* ignore */
      }
    }

    sendMessage(
      { text: content },
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        body: { slug: seat.slug, model: seat.model, lane: "api", thread_id: threadId ?? undefined },
      },
    );

    await refreshThreads();
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
                  onSend();
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
                onClick={onSend}
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
          onNew={newSession}
          onSelect={selectThread}
          onRename={renameThread}
          onTogglePin={togglePin}
          onDelete={deleteThread}
          onLeave={leaveThread}
        />
      </div>
    </div>
  );
}
