import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type FileUIPart, type UIMessage } from "ai";
import { Hammer, Paperclip, X, Loader2, FileText } from "lucide-react";
import { useSession } from "@/lib/auth";
import {
  ACCEPT,
  MAX_FILES,
  processFile,
  type ProcessedAttachment,
} from "@/lib/chatAttachments";
import { getApiKey } from "@/lib/apiKeyStore";
import { ChatMemberRail, type AiSeat } from "@/components/admin/ChatMemberRail";
import {
  ChatSessionList,
  type ChatThread,
} from "@/components/admin/ChatSessionList";
import { CacheKeyPrompt } from "@/components/admin/CacheKeyPrompt";
import { Switch } from "@/components/ui/switch";
import { StartSharedRoomButton } from "@/components/admin/StartSharedRoomButton";
import {
  PendingHandshakeBanner,
  NeedsHandshakePrompt,
  type HandshakeBlock,
} from "@/components/admin/HandshakeBanner";
import {
  fetchRoomMembers,
  fetchPendingHandshakes,
  respondToHandshake,
  type HumanMember,
  type PendingHandshake,
} from "@/components/admin/chatMembers";
import {
  CHAT_PROVIDERS,
  CHAT_API_ENDPOINT,
  findChatProvider,
  estimateTokens,
} from "@/components/admin/chatTransportConfig";
import {
  councilReceiptFromMetadata,
  mergeThreadRows,
  nextCursor,
  rowToUiMessage,
  streamEndedSilently,
  type CouncilReceiptSeat,
  type ThreadMessageRow,
} from "@/components/admin/chatSync";

// How often an open shared room polls for new turns from other members and
// their seats. Incremental (?after=cursor), paused while a reply is
// streaming and while the tab is hidden.
const ROOM_POLL_MS = 5000;

// Join the text parts of a UI message into a single string. Non-text parts
// (tool calls, files, reasoning) are ignored, so a tool-call step never breaks
// rendering.
function messageText(parts: { type: string }[]): string {
  return parts
    .map((p) =>
      p.type === "text" ? (p as { type: "text"; text: string }).text : "",
    )
    .join("");
}

// Names of any tools the seat invoked in this message, derived from AI SDK tool
// parts. Typed tools arrive as `type: "tool-<name>"`; dynamic tools as
// `type: "dynamic-tool"` carrying a `toolName`. Used only for a tiny "used X"
// chip; anything unrecognised is skipped.
function messageToolNames(parts: { type: string }[]): string[] {
  const names: string[] = [];
  for (const p of parts) {
    if (p.type === "dynamic-tool") {
      const name = (p as { toolName?: string }).toolName;
      if (name) names.push(name);
    } else if (p.type.startsWith("tool-")) {
      names.push(p.type.slice("tool-".length));
    }
  }
  return names;
}

// Image file parts attached to a message (for thumbnail rendering in bubbles).
function messageImageParts(parts: { type: string }[]): FileUIPart[] {
  return parts.filter(
    (p): p is FileUIPart =>
      p.type === "file" &&
      typeof (p as FileUIPart).mediaType === "string" &&
      (p as FileUIPart).mediaType.startsWith("image/"),
  );
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
  return {
    id: crypto.randomUUID(),
    slug,
    model,
    label,
    handle: makeHandle(label, taken),
    active: true,
  };
}

function friendlyChatError(message: string): string {
  try {
    const parsed = JSON.parse(message) as {
      error?: string;
      message?: string;
      provider?: string;
    };
    if (parsed.error === "provider_key_missing") {
      return (
        parsed.message ??
        "That AI provider is not connected for this account yet."
      );
    }
    if (parsed.error?.startsWith("no saved key")) {
      return "That AI provider is not connected for this account yet. Add its API key, or choose a connected seat.";
    }
    return parsed.message || parsed.error || message;
  } catch {
    if (/no saved key/i.test(message)) {
      return "That AI provider is not connected for this account yet. Add its API key, or choose a connected seat.";
    }
    return message;
  }
}

const SEATS_STORAGE_KEY = "unclick_chat_seats";
type ChatToolMode = "read" | "build";
type CouncilRunSeat = Pick<
  AiSeat,
  "id" | "label" | "handle" | "slug" | "model"
>;

function seatsStorageKey(userId: string | undefined): string | null {
  return userId ? `${SEATS_STORAGE_KEY}:${userId}` : null;
}

// Load this account's saved seats. New accounts start empty; seats appear only
// after the user adds them, so a demo/provider seat cannot bleed between
// accounts in the same browser.
function loadSeats(storageKey: string | null): AiSeat[] {
  if (typeof window === "undefined") return [];
  try {
    if (!storageKey) return [];
    const raw = window.localStorage.getItem(storageKey);
    if (raw === null) return [];
    const parsed = JSON.parse(raw) as AiSeat[];
    if (!Array.isArray(parsed)) return [];
    return parsed.map((s) => ({ ...s, active: s.active ?? false }));
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

  const seatStoreKey = seatsStorageKey(user?.id);
  const [seats, setSeats] = useState<AiSeat[]>([]);
  const [loadedSeatStoreKey, setLoadedSeatStoreKey] = useState<string | null>(
    null,
  );
  const [activeSeatId, setActiveSeatId] = useState<string | null>(() => null);
  const [activeHumanMemberId, setActiveHumanMemberId] = useState<string | null>(
    () => null,
  );
  const [workingSeatIds, setWorkingSeatIds] = useState<string[]>([]);
  const [councilRunSeats, setCouncilRunSeats] = useState<CouncilRunSeat[]>([]);
  const [input, setInput] = useState("");
  const [toolMode, setToolMode] = useState<ChatToolMode>("build");

  // Pending attachments waiting to be sent with the next turn, plus a flag
  // while files are being read/extracted.
  const [attachments, setAttachments] = useState<ProcessedAttachment[]>([]);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [seatByMsg, setSeatByMsg] = useState<Record<string, string>>({});
  const [councilByMsg, setCouncilByMsg] = useState<
    Record<string, CouncilReceiptSeat[]>
  >({});
  // Which human sent each persisted human turn (sender_id from the row), so
  // another member's messages render left-aligned with their name instead of
  // being indistinguishable from the viewer's own turns.
  const [humanByMsg, setHumanByMsg] = useState<Record<string, string>>({});
  const [humanMembers, setHumanMembers] = useState<HumanMember[]>([]);
  const targetSeatLabelRef = useRef<string>("AI");
  // Incremental sync cursor: created_at of the newest persisted row this
  // client has seen for the active thread. Drives the ?after= room poll.
  const syncCursorRef = useRef<string | null>(null);
  // True between firing an AI send and the stream settling, so we can tell a
  // silent stall apart from a human-only send that never expects a reply.
  const awaitingReplyRef = useRef(false);
  const [stalledNotice, setStalledNotice] = useState(false);

  // Incoming Circle requests waiting on the operator (loud top banner), and a
  // one-off "you need to connect first" block raised when starting a shared
  // room could not add the contact yet.
  const [pendingHandshakes, setPendingHandshakes] = useState<
    PendingHandshake[]
  >([]);
  const [handshakeBusyId, setHandshakeBusyId] = useState<string | null>(null);
  const [handshakeBlock, setHandshakeBlock] = useState<HandshakeBlock | null>(
    null,
  );

  // Persisted chat sessions (threads). The page lists the account's
  // sessions in the left rail and keeps the active thread's messages in sync.
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const activeThreadRef = useRef<string | null>(null);
  const didInit = useRef(false);

  const transport = useMemo(
    () => new DefaultChatTransport({ api: CHAT_API_ENDPOINT }),
    [],
  );
  const { messages, setMessages, sendMessage, status, stop, error } = useChat({
    transport,
  });
  const busy = status === "submitted" || status === "streaming";
  const activeThread = threads.find((t) => t.id === activeThreadId) ?? null;
  // How this account signs its human turns in the shared stream. Falls back
  // to the legacy "you" for accounts without an email.
  const selfSenderId = (user?.email ?? "").trim().toLowerCase() || "you";
  // Mirror of `messages` for the room poll, so a tick merges against the
  // list as it is when the fetch returns (not a stale closure).
  const messagesRef = useRef<UIMessage[]>([]);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  function scrollMessagesToBottom(behavior: ScrollBehavior = "smooth") {
    window.setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ block: "end", behavior });
    }, 0);
  }

  useEffect(() => {
    if (!busy) {
      setWorkingSeatIds([]);
      setCouncilRunSeats([]);
      // A send was in flight and the stream settled: if it ended with no
      // visible answer (a tool loop that ran out of steps, a provider that
      // closed early), say so instead of leaving an empty canvas.
      if (awaitingReplyRef.current) {
        awaitingReplyRef.current = false;
        setStalledNotice(streamEndedSilently(messages, Boolean(error)));
      }
    }
  }, [busy, error, messages]);

  useEffect(() => {
    scrollMessagesToBottom(busy ? "auto" : "smooth");
  }, [busy, messages.length, status]);

  useEffect(() => {
    if (!seatStoreKey) {
      setSeats([]);
      setLoadedSeatStoreKey(null);
      setActiveSeatId(null);
      setWorkingSeatIds([]);
      setCouncilRunSeats([]);
      return;
    }
    setSeats(loadSeats(seatStoreKey));
    setLoadedSeatStoreKey(seatStoreKey);
    setActiveSeatId(null);
    setWorkingSeatIds([]);
    setCouncilRunSeats([]);
  }, [seatStoreKey]);

  function stripLeadingMention(text: string): string {
    return text.replace(/^@\S+\s*/, "");
  }

  function memberHandle(member: HumanMember): string {
    const source = member.label || member.email || "member";
    return source.replace(/[^A-Za-z0-9.]/g, "") || "member";
  }

  function clearSelectionFromInput() {
    setInput((prev) => stripLeadingMention(prev));
    setActiveSeatId(null);
    setActiveHumanMemberId(null);
  }

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
      const r = await fetch("/api/chat-threads?action=list", {
        headers: authHeaders(),
      });
      if (!r.ok) return;
      const b = (await r.json()) as { threads?: ChatThread[] };
      setThreads(Array.isArray(b.threads) ? b.threads : []);
    } catch {
      /* ignore */
    }
  }

  // Pull the operator's incoming connection requests (pending Circle links
  // they have not answered) for the loud top banner. Best-effort: a null
  // result (any failure) just leaves the banner empty.
  async function refreshPendingHandshakes() {
    if (!accessToken) return;
    const rows = await fetchPendingHandshakes(accessToken);
    if (rows) setPendingHandshakes(rows);
  }

  async function refreshRoomMembers(threadId: string) {
    if (!accessToken) {
      setHumanMembers([]);
      return;
    }
    const rows = await fetchRoomMembers(accessToken, threadId);
    if (!rows) return;
    setHumanMembers(
      rows.filter((member) => {
        if (member.userId && user?.id && member.userId === user.id)
          return false;
        if (
          member.email &&
          user?.email &&
          member.email.toLowerCase() === user.email.toLowerCase()
        )
          return false;
        return true;
      }),
    );
  }

  // Accept or decline an incoming request inline, then refresh both the banner
  // and the sessions list (an accepted contact can now be added to rooms).
  async function answerHandshake(
    linkId: string,
    decision: "accept" | "decline",
  ) {
    if (!accessToken || handshakeBusyId) return;
    setHandshakeBusyId(linkId);
    try {
      await respondToHandshake(accessToken, linkId, decision);
      await refreshPendingHandshakes();
      await refreshThreads();
    } finally {
      setHandshakeBusyId(null);
    }
  }

  // The new room created by StartSharedRoomButton: select it and refresh the
  // sessions list so it appears under Shared Sessions.
  async function onSharedRoomStarted(threadId: string) {
    setHandshakeBlock(null);
    await selectThread(threadId);
    await refreshThreads();
  }

  // Stamp the caller's read cursor on a room (fire-and-forget) and clear the
  // unread indicator locally without waiting for the next list refresh.
  function markThreadRead(id: string) {
    if (!accessToken) return;
    const readAt = new Date().toISOString();
    setThreads((prev) =>
      prev.map((t) => (t.id === id ? { ...t, my_last_read_at: readAt } : t)),
    );
    fetch("/api/chat-threads?action=mark_read", {
      method: "POST",
      headers: authHeaders(true),
      body: JSON.stringify({ thread_id: id }),
    }).catch(() => {});
  }

  // Rebuild attribution and council receipts for rows arriving from the DB
  // (initial load or room poll). Assistant rows show which model answered;
  // council rows carry the persisted run receipt.
  function absorbRowAnnotations(rows: ThreadMessageRow[]) {
    if (rows.length === 0) return;
    setSeatByMsg((prev) => {
      const next = { ...prev };
      for (const row of rows) {
        if (row.sender_kind !== "human") {
          next[row.id] = row.model ?? row.sender_id ?? "AI";
        }
      }
      return next;
    });
    setCouncilByMsg((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const row of rows) {
        const receipt = councilReceiptFromMetadata(row.metadata);
        if (receipt.length > 0) {
          next[row.id] = receipt;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
    setHumanByMsg((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const row of rows) {
        if (row.sender_kind === "human" && row.sender_id) {
          next[row.id] = row.sender_id;
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }

  // Open a thread: load its shared message stream into the chat UI and
  // rebuild the per-message seat attribution from the non-human rows.
  async function selectThread(id: string) {
    if (!accessToken) return;
    setActiveThread(id);
    setWorkingSeatIds([]);
    setCouncilRunSeats([]);
    setActiveSeatId(null);
    setActiveHumanMemberId(null);
    setInput("");
    setStalledNotice(false);
    syncCursorRef.current = null;
    try {
      const r = await fetch(
        `/api/chat-threads?action=messages&thread_id=${encodeURIComponent(id)}`,
        { headers: authHeaders() },
      );
      if (!r.ok) return;
      const b = (await r.json()) as { messages?: ThreadMessageRow[] };
      const rows = Array.isArray(b.messages) ? b.messages : [];
      setMessages(rows.map(rowToUiMessage));
      setCouncilByMsg({});
      setSeatByMsg({});
      setHumanByMsg({});
      absorbRowAnnotations(rows);
      syncCursorRef.current = nextCursor(rows, null);
      markThreadRead(id);
      await refreshRoomMembers(id);
    } catch {
      /* ignore */
    }
  }

  // Start a fresh session: clear the canvas, create a thread, make it active.
  async function newSession() {
    if (!accessToken) return;
    setMessages([]);
    setSeatByMsg({});
    setCouncilByMsg({});
    setHumanByMsg({});
    setStalledNotice(false);
    syncCursorRef.current = null;
    setWorkingSeatIds([]);
    setCouncilRunSeats([]);
    setHumanMembers([]);
    setActiveSeatId(null);
    setActiveHumanMemberId(null);
    setInput("");
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
        setCouncilByMsg({});
        setHumanByMsg({});
        setStalledNotice(false);
        syncCursorRef.current = null;
        setWorkingSeatIds([]);
        setCouncilRunSeats([]);
        setHumanMembers([]);
        setActiveSeatId(null);
        setActiveHumanMemberId(null);
        setInput("");
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
        setCouncilByMsg({});
        setHumanByMsg({});
        setStalledNotice(false);
        syncCursorRef.current = null;
        setWorkingSeatIds([]);
        setCouncilRunSeats([]);
        setHumanMembers([]);
        setActiveSeatId(null);
        setActiveHumanMemberId(null);
        setInput("");
      }
      await refreshThreads();
    } catch {
      /* ignore */
    }
  }

  // On first load, list sessions and reopen the most recent one, and pull any
  // incoming connection requests for the loud top banner.
  useEffect(() => {
    if (didInit.current || !accessToken) return;
    didInit.current = true;
    (async () => {
      try {
        const r = await fetch("/api/chat-threads?action=list", {
          headers: authHeaders(),
        });
        if (!r.ok) return;
        const b = (await r.json()) as { threads?: ChatThread[] };
        const list = Array.isArray(b.threads) ? b.threads : [];
        setThreads(list);
        if (list.length > 0) await selectThread(list[0].id);
      } catch {
        /* ignore */
      }
    })();
    void refreshPendingHandshakes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  // Keep an open shared room live. Without a socket layer this is the
  // classic fallback mainstream chat clients use: an incremental poll
  // (?after=cursor) that merges only genuinely new turns, paused while a
  // reply is streaming and while the tab is hidden. Solo threads skip it;
  // only this client writes to them.
  const roomIsLive = Boolean(activeThread?.shared || humanMembers.length > 0);
  useEffect(() => {
    if (!accessToken || !activeThreadId || !roomIsLive || busy) return;
    let cancelled = false;
    const threadId = activeThreadId;

    async function tick() {
      if (cancelled) return;
      if (
        typeof document !== "undefined" &&
        document.visibilityState === "hidden"
      )
        return;
      try {
        const cursor = syncCursorRef.current;
        const r = await fetch(
          `/api/chat-threads?action=messages&thread_id=${encodeURIComponent(threadId)}` +
            (cursor ? `&after=${encodeURIComponent(cursor)}` : ""),
          { headers: authHeaders() },
        );
        if (!r.ok || cancelled) return;
        const b = (await r.json()) as { messages?: ThreadMessageRow[] };
        const rows = Array.isArray(b.messages) ? b.messages : [];
        if (rows.length === 0) return;
        syncCursorRef.current = nextCursor(rows, syncCursorRef.current);
        if (cancelled) return;
        const { messages: merged, added } = mergeThreadRows(
          messagesRef.current,
          rows,
        );
        if (added.length === 0) return;
        setMessages(merged);
        absorbRowAnnotations(added);
        markThreadRead(threadId);
        void refreshThreads();
        scrollMessagesToBottom();
      } catch {
        /* ignore - the next tick retries */
      }
    }

    const timer = window.setInterval(() => void tick(), ROOM_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, activeThreadId, roomIsLive, busy]);

  const calledInSeats = seats.filter((s) => s.active);
  const calledInSeat = calledInSeats.length === 1 ? calledInSeats[0] : null;
  const selectedSeat = seats.find((s) => s.id === activeSeatId) ?? null;
  const activeSeat = selectedSeat ?? calledInSeat;
  const hasAiTarget = Boolean(selectedSeat) || calledInSeats.length > 0;
  const activeHumanMember =
    humanMembers.find((m) => m.id === activeHumanMemberId) ?? null;
  const canMessageRoomWithoutBot = Boolean(
    activeThread?.shared || humanMembers.length > 0,
  );

  useEffect(() => {
    const m = input.match(/^@(\S+)\s*/);
    if (!m) {
      if (activeSeatId) setActiveSeatId(null);
      if (activeHumanMemberId) setActiveHumanMemberId(null);
      return;
    }
    const handle = m[1];
    const mentionedSeat = seats.find((s) => s.handle === handle);
    if (mentionedSeat) {
      if (activeSeatId !== mentionedSeat.id) setActiveSeatId(mentionedSeat.id);
      if (activeHumanMemberId) setActiveHumanMemberId(null);
      return;
    }
    const mentionedHuman = humanMembers.find(
      (member) => memberHandle(member) === handle,
    );
    if (mentionedHuman) {
      if (activeHumanMemberId !== mentionedHuman.id)
        setActiveHumanMemberId(mentionedHuman.id);
      if (activeSeatId) setActiveSeatId(null);
      return;
    }
    if (activeSeatId) setActiveSeatId(null);
    if (activeHumanMemberId) setActiveHumanMemberId(null);
  }, [activeHumanMemberId, activeSeatId, humanMembers, input, seats]);

  // Attribute each assistant turn to the seat it was sent to, as it arrives.
  useEffect(() => {
    setSeatByMsg((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const m of messages) {
        if (m.role === "assistant" && !next[m.id]) {
          next[m.id] = targetSeatLabelRef.current || "AI";
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [messages]);

  // Persist seats so a removed seat stays removed across reloads.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!seatStoreKey || loadedSeatStoreKey !== seatStoreKey) return;
    try {
      window.localStorage.setItem(seatStoreKey, JSON.stringify(seats));
    } catch {
      /* ignore */
    }
  }, [loadedSeatStoreKey, seatStoreKey, seats]);

  function addSeat(slug: string, model: string) {
    setSeats((prev) => [
      ...prev,
      newSeat(
        slug,
        model,
        prev.map((s) => s.handle),
      ),
    ]);
  }

  function removeSeat(id: string) {
    setSeats((prev) => prev.filter((s) => s.id !== id));
    setActiveSeatId((cur) => (cur === id ? null : cur));
    setWorkingSeatIds((prev) => prev.filter((seatId) => seatId !== id));
    setCouncilRunSeats((prev) => prev.filter((seat) => seat.id !== id));
  }

  function toggleSeatActive(id: string) {
    setSeats((prev) => {
      const nextActive = !(prev.find((s) => s.id === id)?.active ?? false);
      return prev.map((s) => (s.id === id ? { ...s, active: nextActive } : s));
    });
  }

  async function addHumanMember(member: HumanMember) {
    if (!accessToken || !activeThreadId || !member.userId) {
      setHumanMembers((prev) =>
        prev.some((m) => m.id === member.id) ? prev : [...prev, member],
      );
      return;
    }
    try {
      const r = await fetch("/api/chat-threads?action=add_member", {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({
          thread_id: activeThreadId,
          member_user_id: member.userId,
        }),
      });
      if (r.ok) await refreshRoomMembers(activeThreadId);
      else
        setHumanMembers((prev) =>
          prev.some((m) => m.id === member.id) ? prev : [...prev, member],
        );
    } catch {
      setHumanMembers((prev) =>
        prev.some((m) => m.id === member.id) ? prev : [...prev, member],
      );
    }
  }

  function removeHumanMember(id: string) {
    setHumanMembers((prev) => prev.filter((m) => m.id !== id));
    setActiveHumanMemberId((cur) => (cur === id ? null : cur));
  }

  function selectSeat(seat: AiSeat) {
    if (activeSeatId === seat.id) {
      clearSelectionFromInput();
      return;
    }
    setActiveSeatId(seat.id);
    setActiveHumanMemberId(null);
    targetSeatLabelRef.current = seat.label;
    setInput((prev) => {
      const stripped = stripLeadingMention(prev);
      return `@${seat.handle} ${stripped}`;
    });
  }

  function selectHumanMember(member: HumanMember) {
    if (activeHumanMemberId === member.id) {
      clearSelectionFromInput();
      return;
    }
    setActiveHumanMemberId(member.id);
    setActiveSeatId(null);
    setInput((prev) => {
      const stripped = stripLeadingMention(prev);
      return `@${memberHandle(member)} ${stripped}`;
    });
  }

  // Decide which seats answer: a leading @handle always overrides to force a
  // specific seat for one turn. Without a mention, every called-in seat forms
  // the council roster. When no seat is selected or called in, a shared room
  // message is human-only and does not invoke a provider.
  function resolveTarget(text: string): { seats: AiSeat[]; text: string } {
    const m = text.match(/^@(\S+)\s*/);
    if (m) {
      const seat = seats.find((s) => s.handle === m[1]);
      if (seat) return { seats: [seat], text: text.slice(m[0].length) };
      const member = humanMembers.find((human) => memberHandle(human) === m[1]);
      if (member) return { seats: [], text };
    }
    if (calledInSeats.length > 0) return { seats: calledInSeats, text };
    return { seats: selectedSeat ? [selectedSeat] : [], text };
  }

  // Run picked/pasted files through processFile and append the results to the
  // pending tray. Caps the total at MAX_FILES so the tray never runs away.
  async function ingestFiles(files: File[]) {
    if (files.length === 0) return;
    setProcessing(true);
    try {
      const room = Math.max(0, MAX_FILES - attachments.length);
      const slice = files.slice(0, room);
      const processed = await Promise.all(slice.map((f) => processFile(f)));
      setAttachments((prev) => [...prev, ...processed].slice(0, MAX_FILES));
    } finally {
      setProcessing(false);
    }
  }

  // Paperclip picker: process each chosen file, then reset the input value so
  // re-picking the same file fires onChange again.
  async function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const list = e.target.files;
    const files = list ? Array.from(list) : [];
    e.target.value = "";
    await ingestFiles(files);
  }

  // Paste handler: pick up pasted files (and pasted image items, the
  // paste-image path) without blocking a normal text paste.
  async function onPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const dt = e.clipboardData;
    const files: File[] =
      dt.files && dt.files.length > 0 ? Array.from(dt.files) : [];
    if (files.length === 0 && dt.items) {
      for (const item of Array.from(dt.items)) {
        if (item.kind === "file") {
          const f = item.getAsFile();
          if (f) files.push(f);
        }
      }
    }
    if (files.length === 0) return; // let normal text paste proceed
    e.preventDefault();
    await ingestFiles(files);
  }

  function removeAttachment(id: string) {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  }

  async function onSend() {
    const raw = input.trim();
    const pending = attachments;
    if ((!raw && pending.length === 0) || !apiKey || busy || processing) return;
    setStalledNotice(false);
    const { seats: targetSeats, text } = resolveTarget(raw);
    const leadSeat = targetSeats[0] ?? null;
    const councilLabel =
      targetSeats.length > 1
        ? `Council: ${targetSeats.map((seat) => seat.label).join(", ")}`
        : (leadSeat?.label ?? "AI");
    if (!leadSeat && !canMessageRoomWithoutBot) return;
    targetSeatLabelRef.current = councilLabel;
    if (targetSeats.length === 1 && leadSeat) setActiveSeatId(leadSeat.id);
    if (targetSeats.length > 1) setActiveSeatId(null);
    setActiveHumanMemberId(null);
    setWorkingSeatIds(targetSeats.map((seat) => seat.id));
    setCouncilRunSeats(
      targetSeats.length > 1
        ? targetSeats.map(({ id, label, handle, slug, model }) => ({
            id,
            label,
            handle,
            slug,
            model,
          }))
        : [],
    );
    setInput("");
    setAttachments([]);
    scrollMessagesToBottom();

    // The typed text after stripping any leading @handle (falls back to raw).
    const typedText = (text.trim() || raw).trim();

    // Image attachments become vision file parts the model can see.
    const imageParts: FileUIPart[] = pending
      .filter((a) => a.kind === "image" && a.dataUrl)
      .map((a) => ({
        type: "file",
        mediaType: a.mediaType,
        url: a.dataUrl as string,
        filename: a.name,
      }));

    // Text attachments are inlined; unsupported ones leave a short note so the
    // model (and the persisted history) knows a file could not be read.
    const textBlocks = pending
      .filter((a) => a.kind === "text" && a.text)
      .map((a) => `\n\n--- ${a.name} ---\n${a.text}`);
    const unsupportedNotes = pending
      .filter((a) => a.kind === "unsupported")
      .map(
        (a) => `\n\n[attachment ${a.name}: ${a.error ?? "could not be read"}]`,
      );

    // Keep typed text first, then inlined file text. This is the human turn's
    // content for both the model call and the persisted thread history.
    const combined = [typedText, ...textBlocks, ...unsupportedNotes]
      .filter(Boolean)
      .join("");

    // Ensure a thread exists (create one on the first turn of a session).
    let threadId = activeThreadRef.current;
    if (!threadId) {
      try {
        const r = await fetch("/api/chat-threads?action=create", {
          method: "POST",
          headers: authHeaders(true),
          body: JSON.stringify({
            kind:
              targetSeats.length > 1
                ? "council"
                : leadSeat
                  ? "agent"
                  : "human",
          }),
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

    // Persist the human turn (this auto-titles the thread server-side). We
    // persist `combined` (typed text + inlined file text); images are NOT
    // saved to thread history in v1, so reopening a thread shows the text only.
    // The client_msg_id makes a retried request idempotent server-side.
    if (threadId) {
      try {
        await fetch("/api/chat-threads?action=append", {
          method: "POST",
          headers: authHeaders(true),
          body: JSON.stringify({
            thread_id: threadId,
            content: combined,
            sender_id: selfSenderId,
            client_msg_id: crypto.randomUUID(),
          }),
        });
      } catch {
        /* ignore */
      }
    }

    if (!leadSeat) {
      if (threadId) await selectThread(threadId);
      await refreshThreads();
      return;
    }

    // Chat authenticates with the logged-in session (Authorization). The cached
    // UnClick key, when present, rides along in a dedicated header ONLY so the
    // seat can reach connected apps (connector creds are zero-knowledge and a
    // session JWT cannot decrypt them). The server validates it to the same
    // account lane before use; absent it, memory + chat still work and
    // connectors degrade gracefully. The key never goes in the request body.
    const connectorKey = getApiKey();
    const sendHeaders: Record<string, string> = {
      Authorization: `Bearer ${apiKey}`,
    };
    if (connectorKey) sendHeaders["X-UnClick-Connector-Key"] = connectorKey;

    // AI SDK v3 sendMessage: the { text, files } overload accepts FileUIPart[]
    // for `files`; the server forwards image file parts to the model as vision
    // via convertToModelMessages (see api/chat.ts).
    awaitingReplyRef.current = true;
    sendMessage(
      imageParts.length > 0
        ? { text: combined, files: imageParts }
        : { text: combined },
      {
        headers: sendHeaders,
        body: {
          slug: leadSeat.slug,
          model: leadSeat.model,
          lane: "api",
          tool_mode: toolMode,
          thread_id: threadId ?? undefined,
          council_seats:
            targetSeats.length > 1
              ? targetSeats.map((seat) => ({
                  slug: seat.slug,
                  model: seat.model,
                  label: seat.label,
                  handle: seat.handle,
                }))
              : undefined,
        },
      },
    );

    await refreshThreads();
  }

  const totalTokens = messages.reduce(
    (sum, m) => sum + estimateTokens(messageText(m.parts)),
    0,
  );
  const canSend =
    Boolean(apiKey) &&
    (hasAiTarget || canMessageRoomWithoutBot) &&
    !processing &&
    (input.trim().length > 0 || attachments.length > 0);

  return (
    <div className="space-y-4">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-heading">
            Chat
          </h1>
          <p className="mt-1 text-sm text-body">
            A room for you, your people, and your AI seats. Call in one or more
            seats for a council answer, or @mention one to direct a single turn.
            Each seat runs on your own provider key.
          </p>
        </div>
        <div className="shrink-0 text-xs text-muted-foreground">
          ~{totalTokens} tokens (est)
        </div>
      </header>

      {!apiKey && <CacheKeyPrompt />}

      <div className="flex flex-col gap-4 md:h-[calc(100vh-13rem)] md:flex-row-reverse md:items-stretch">
        <ChatMemberRail
          user={user}
          accessToken={accessToken}
          seats={seats}
          activeSeatId={selectedSeat?.id ?? null}
          workingSeatIds={workingSeatIds}
          humanMembers={humanMembers}
          onSelectSeat={selectSeat}
          activeHumanMemberId={activeHumanMemberId}
          onSelectHumanMember={selectHumanMember}
          onAddSeat={addSeat}
          onRemoveSeat={removeSeat}
          onToggleSeatActive={toggleSeatActive}
          onAddHumanMember={addHumanMember}
          onRemoveHumanMember={removeHumanMember}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-3 md:min-h-0">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Link
                to="/admin/agents/api"
                className="text-primary hover:underline"
              >
                Set up API keys
              </Link>
              <span className="text-border">|</span>
              <Link
                to="/admin/agents/local"
                className="text-primary hover:underline"
              >
                Local models
              </Link>
            </div>
            <label
              className={`flex items-center gap-2 rounded-md border px-2 py-1 ${
                toolMode === "build"
                  ? "border-primary/40 bg-primary/10 text-primary"
                  : "border-border/50 bg-card/40"
              }`}
              title="Build mode lets called-in seats run non-destructive create, write, and generate connector actions. High-risk sends, deletes, payments, merges, deploys, and permission changes stay blocked."
            >
              <Hammer className="h-3.5 w-3.5" />
              <span>Build mode</span>
              <Switch
                checked={toolMode === "build"}
                onCheckedChange={(checked) =>
                  setToolMode(checked ? "build" : "read")
                }
                aria-label="Build mode"
                className="h-5 w-9 data-[state=checked]:bg-primary/80"
              />
            </label>
          </div>

          <PendingHandshakeBanner
            pending={pendingHandshakes}
            busyId={handshakeBusyId}
            onAccept={(id) => answerHandshake(id, "accept")}
            onDecline={(id) => answerHandshake(id, "decline")}
          />

          {handshakeBlock && (
            <NeedsHandshakePrompt
              block={handshakeBlock}
              onDismiss={() => setHandshakeBlock(null)}
            />
          )}

          <div className="min-h-[46vh] flex-1 space-y-3 overflow-y-auto rounded-lg border border-border/40 bg-card/30 p-4 md:min-h-0">
            {messages.length === 0 && (
              <p className="text-xs text-muted-foreground">
                {calledInSeats.length > 1
                  ? `${calledInSeats.length} seats called in - your next message routes as a council answer${toolMode === "build" ? " with Build mode on" : ""}. @mention one seat to override for a single turn.`
                  : activeSeat
                    ? calledInSeat
                      ? `${calledInSeat.label} called in - messages auto-route${toolMode === "build" ? " with Build mode on" : ""}. @mention to override. Replies show which seat answered and an estimated token cost.`
                      : `Ask ${activeSeat.label} anything, or @mention another seat. Call in a seat to skip the @mention. Replies show which seat answered and an estimated token cost.`
                  : canMessageRoomWithoutBot
                    ? "Send a room message, or select an AI seat when you want a bot to answer."
                    : seats.length > 0
                      ? "Select an AI seat from Members, or turn one on for auto-replies."
                      : "Add an AI seat from Members to start."}
              </p>
            )}
            {messages.map((m) => {
              const text = messageText(m.parts);
              const isUser = m.role === "user";
              const images = isUser ? messageImageParts(m.parts) : [];
              const toolNames = isUser ? [] : messageToolNames(m.parts);
              // Another member's persisted turn renders left-aligned with
              // their name; the viewer's own turns (and legacy "you" rows)
              // stay right-aligned.
              const humanSender = isUser ? (humanByMsg[m.id] ?? null) : null;
              const isSelfTurn =
                !humanSender ||
                humanSender === "you" ||
                humanSender.toLowerCase() === selfSenderId;
              const alignRight = isUser && isSelfTurn;
              return (
                <div
                  key={m.id}
                  className={alignRight ? "text-right" : "text-left"}
                >
                  {isUser && !isSelfTurn && humanSender && (
                    <div className="mb-0.5 text-[10px] text-muted-foreground">
                      {humanSender}
                    </div>
                  )}
                  {toolNames.length > 0 && (
                    <div className="mb-1 flex flex-wrap gap-1">
                      {toolNames.map((name, i) => (
                        <span
                          key={`${m.id}-tool-${i}`}
                          className="rounded-full border border-border/40 bg-card/40 px-2 py-0.5 text-[10px] text-muted-foreground"
                        >
                          used {name}
                        </span>
                      ))}
                    </div>
                  )}
                  {images.length > 0 && (
                    <div
                      className={`mb-1 flex flex-wrap gap-2 ${isUser ? "justify-end" : ""}`}
                    >
                      {images.map((img, i) => (
                        <img
                          key={`${m.id}-img-${i}`}
                          src={img.url}
                          alt={img.filename ?? "attachment"}
                          className="max-h-[40vh] max-w-[85%] rounded-lg border border-border/50 object-contain"
                        />
                      ))}
                    </div>
                  )}
                  {(text || (!isUser && busy)) && (
                    <div
                      className={`inline-block max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-[13px] leading-relaxed ${
                        isUser
                          ? "bg-primary/10 text-foreground"
                          : "bg-card/60 text-body"
                      }`}
                    >
                      {text || (busy ? "..." : "")}
                    </div>
                  )}
                  {!isUser && text && (
                    <div className="mt-0.5 text-[10px] text-muted-foreground">
                      {seatByMsg[m.id] ?? "AI"} - ~{estimateTokens(text)} tokens
                      (est)
                    </div>
                  )}
                  {!isUser && (councilByMsg[m.id]?.length ?? 0) > 1 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {councilByMsg[m.id].map((seat, i) => (
                        <span
                          key={`${m.id}-council-${i}`}
                          title={
                            seat.status === "answered"
                              ? (seat.brief ?? undefined)
                              : (seat.error ?? undefined)
                          }
                          className={`rounded-full border px-2 py-0.5 text-[10px] ${
                            seat.status === "answered"
                              ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-100/90"
                              : "border-amber-500/40 bg-amber-500/10 text-amber-200/90"
                          }`}
                        >
                          {seat.label || seat.model}:{" "}
                          {seat.status === "answered"
                            ? "contributed"
                            : seat.status}
                          {typeof seat.ms === "number"
                            ? ` (${(seat.ms / 1000).toFixed(1)}s)`
                            : ""}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            {busy && councilRunSeats.length > 1 && (
              <div className="text-left">
                <div className="inline-block max-w-[92%] rounded-lg border border-cyan-300/25 bg-cyan-400/10 px-3 py-2 text-[12px] text-body shadow-[0_0_0_1px_rgba(34,211,238,0.05)]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200/80">
                        Council working
                      </p>
                      <p className="mt-0.5 text-[12px] text-body">
                        {councilRunSeats.length} independent model passes are
                        being gathered, then one synthesis answer returns here.
                      </p>
                    </div>
                    <span className="flex items-center gap-1 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] text-cyan-100">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      synthesising
                    </span>
                  </div>
                  <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
                    {councilRunSeats.map((seat, index) => (
                      <div
                        key={seat.id}
                        className="flex min-w-0 items-center gap-2 rounded-md border border-cyan-300/15 bg-background/20 px-2 py-1.5"
                      >
                        <span className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/15 text-[10px] font-semibold text-cyan-100">
                          <span className="absolute inset-0 rounded-full border border-cyan-300/40 animate-ping" />
                          {index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12px] text-body">
                            {seat.label}
                          </span>
                          <span className="block truncate text-[10px] text-muted-foreground">
                            @{seat.handle} - independent brief
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] text-cyan-100/75">
                    <span className="rounded-full border border-cyan-300/20 px-2 py-0.5">
                      1. Briefs
                    </span>
                    <span className="rounded-full border border-cyan-300/20 px-2 py-0.5">
                      2. Compare
                    </span>
                    <span className="rounded-full border border-cyan-300/20 px-2 py-0.5">
                      3. Synthesis
                    </span>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="text-xs text-red-400">
                {friendlyChatError(error.message)}
              </div>
            )}
            {stalledNotice && !busy && !error && (
              <div className="rounded-md border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200/90">
                The seat stopped without a final answer. This usually means a
                tool-call loop ran out of steps or the provider ended the
                stream early. Try sending again, or rephrase the request.
              </div>
            )}
            <div ref={messagesEndRef} aria-hidden="true" />
          </div>

          {(attachments.length > 0 || processing) && (
            <div className="flex flex-wrap gap-2 rounded-md border border-border/50 bg-card/40 p-2">
              {attachments.map((a) => (
                <div key={a.id} className="relative">
                  {a.kind === "image" && a.dataUrl ? (
                    <div className="relative h-16 w-16 overflow-hidden rounded-md border border-border/50">
                      <img
                        src={a.dataUrl}
                        alt={a.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex max-w-[200px] items-center gap-1.5 rounded-md border px-2 py-1.5 text-[11px] ${
                        a.kind === "unsupported"
                          ? "border-amber-500/40 bg-amber-500/10 text-amber-200/90"
                          : "border-border/50 bg-card/60 text-body"
                      }`}
                    >
                      <FileText className="h-3.5 w-3.5 shrink-0 opacity-70" />
                      <span className="truncate">
                        {a.name}
                        {a.kind === "unsupported" && a.error
                          ? ` - ${a.error}`
                          : ""}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeAttachment(a.id)}
                    aria-label={`Remove ${a.name}`}
                    className="absolute -right-1.5 -top-1.5 rounded-full border border-border/50 bg-card p-0.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {processing && (
                <div className="flex items-center gap-1.5 rounded-md border border-border/50 bg-card/60 px-2 py-1.5 text-[11px] text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Reading files...
                </div>
              )}
            </div>
          )}

          <div className="flex items-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ACCEPT}
              onChange={onPickFiles}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={
                !apiKey ||
                (!hasAiTarget && !canMessageRoomWithoutBot) ||
                processing
              }
              aria-label="Attach files"
              title="Attach images, text, PDF, or DOCX"
              className="rounded-md border border-border/50 bg-card/40 p-2 text-muted-foreground hover:text-foreground disabled:opacity-40"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPaste={onPaste}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
              rows={2}
              placeholder={
                apiKey
                  ? calledInSeats.length > 1
                    ? toolMode === "build"
                      ? `Build with ${calledInSeats.length} AI seats`
                      : `Message ${calledInSeats.length} AI seats`
                    : activeSeat
                    ? toolMode === "build"
                      ? `Build with ${activeSeat.label}`
                      : `Message ${activeSeat.label}`
                    : activeHumanMember
                      ? `Message ${activeHumanMember.label}`
                      : canMessageRoomWithoutBot
                        ? "Message the room"
                        : seats.length > 0
                          ? "Select an AI seat from Members"
                          : "Add an AI seat from Members"
                  : "Set your UnClick key to chat"
              }
              disabled={!apiKey || (!hasAiTarget && !canMessageRoomWithoutBot)}
              className="flex-1 resize-none rounded-md border border-border/50 bg-card/40 px-3 py-2 text-[13px] text-body outline-none placeholder:text-muted-foreground/40 focus:border-primary/50"
            />
            {busy ? (
              <button
                type="button"
                onClick={() => stop()}
                className="rounded-md border border-border/50 px-4 py-1.5 text-xs font-medium text-body hover:bg-card/40"
              >
                Stop
              </button>
            ) : (
              <button
                type="button"
                onClick={onSend}
                disabled={!canSend}
                className="rounded-md bg-primary/90 px-4 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary disabled:opacity-40"
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
          startSharedRoom={
            <StartSharedRoomButton
              accessToken={accessToken}
              authHeaders={() => authHeaders(true)}
              onStarted={onSharedRoomStarted}
              onBlocked={setHandshakeBlock}
            />
          }
        />
      </div>
    </div>
  );
}
