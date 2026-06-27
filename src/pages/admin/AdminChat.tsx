import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useSession } from "@/lib/auth";
import { ChatMemberRail, type AiSeat } from "@/components/admin/ChatMemberRail";
import {
  CHAT_PROVIDERS,
  CHAT_API_ENDPOINT,
  findChatProvider,
  getChatApiKey,
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

export default function AdminChatPage() {
  const { user } = useSession();
  const apiKey = getChatApiKey();

  const [seats, setSeats] = useState<AiSeat[]>(() => {
    const p = CHAT_PROVIDERS[0];
    return [newSeat(p.slug, p.models[0].value, [])];
  });
  const [activeSeatId, setActiveSeatId] = useState<string | null>(() => null);
  const [input, setInput] = useState("");
  const [seatByMsg, setSeatByMsg] = useState<Record<string, string>>({});
  const targetSeatRef = useRef<AiSeat | null>(null);

  const transport = useMemo(() => new DefaultChatTransport({ api: CHAT_API_ENDPOINT }), []);
  const { messages, sendMessage, status, stop, error } = useChat({ transport });
  const busy = status === "submitted" || status === "streaming";

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

  function addSeat(slug: string, model: string) {
    setSeats((prev) => [...prev, newSeat(slug, model, prev.map((s) => s.handle))]);
  }

  function removeSeat(id: string) {
    setSeats((prev) => prev.filter((s) => s.id !== id));
    setActiveSeatId((cur) => (cur === id ? null : cur));
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

  function onSend() {
    const raw = input.trim();
    if (!raw || !apiKey || busy) return;
    const { seat, text } = resolveTarget(raw);
    if (!seat) return;
    targetSeatRef.current = seat;
    setActiveSeatId(seat.id);
    setInput("");
    sendMessage(
      { text: text.trim() || raw },
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        body: { slug: seat.slug, model: seat.model, lane: "api" },
      },
    );
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

      {!apiKey && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3 text-sm text-body">
          No UnClick key found in this browser. Open the admin from your dashboard so your key is set, then reload.
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row-reverse md:items-start">
        <ChatMemberRail
          user={user}
          seats={seats}
          activeSeatId={activeSeat?.id ?? null}
          onSelectSeat={selectSeat}
          onAddSeat={addSeat}
          onRemoveSeat={removeSeat}
        />

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link to="/admin/agents/api" className="text-primary hover:underline">
              Set up API keys
            </Link>
            <span className="text-border">|</span>
            <Link to="/admin/agents/local" className="text-primary hover:underline">
              Local models
            </Link>
          </div>

          <div className="min-h-[46vh] space-y-3 rounded-lg border border-border/40 bg-card/30 p-4">
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
      </div>
    </div>
  );
}
