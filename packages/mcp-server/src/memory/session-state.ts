/**
 * Session state tracker for the UnClick MCP server.
 *
 * Records per-process state about the current MCP session so we can
 * answer "did startup context actually get loaded, and how?". Populated
 * by hooks in server.ts (Initialize, GetPrompt, ReadResource, CallTool)
 * and flushed to memory_load_events by load-events.ts.
 */

export type AutoloadMethod =
  | "instructions"
  | "prompt"
  | "resource"
  | "tool_description"
  | "manual"
  | "none";

export const LOG_READ_DECIDE_RECEIPT_WINDOW_MS = 30 * 60 * 1000;

export interface OrchestratorSavedTurn {
  sessionId: string;
  receiptId: string | null;
  savedAt: Date;
}

export type OrchestratorReadGateResult =
  | { ok: true; savedTurn: OrchestratorSavedTurn }
  | { ok: false; status: "CONTEXT_UNREAD"; missing: string; guidance: string };

export interface SessionState {
  sessionId: string;
  clientInfo: { name: string; version: string } | null;
  instructionsSent: boolean;
  contextLoaded: boolean;
  contextLoadMethod: AutoloadMethod | null;
  promptUsed: boolean;
  resourcesRead: string[];
  firstToolCall: string | null;
  toolsCalledBeforeContext: number;
  sessionStart: Date;
  logged: boolean;
  orchestratorSavedTurns: OrchestratorSavedTurn[];
}

function randomSessionId(): string {
  return `sess_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}

export const sessionState: SessionState = {
  sessionId: randomSessionId(),
  clientInfo: null,
  instructionsSent: false,
  contextLoaded: false,
  contextLoadMethod: null,
  promptUsed: false,
  resourcesRead: [],
  firstToolCall: null,
  toolsCalledBeforeContext: 0,
  sessionStart: new Date(),
  logged: false,
  orchestratorSavedTurns: [],
};

function normalizeSessionId(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeReceiptId(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function setClientInfo(info: { name?: string; version?: string } | undefined): void {
  if (!info) return;
  sessionState.clientInfo = {
    name: info.name ?? "unknown",
    version: info.version ?? "unknown",
  };
}

export function setInstructionsSent(sent: boolean): void {
  sessionState.instructionsSent = sent;
}

export function markPromptUsed(name: string): void {
  if (name === "load-memory" || name === "load_memory") {
    sessionState.promptUsed = true;
    if (!sessionState.contextLoaded) {
      sessionState.contextLoaded = true;
      sessionState.contextLoadMethod = "prompt";
    }
  }
}

export function markResourceRead(uri: string): void {
  if (!uri) return;
  if (!sessionState.resourcesRead.includes(uri)) {
    sessionState.resourcesRead.push(uri);
  }
  if (uri.startsWith("memory://") && !sessionState.contextLoaded) {
    sessionState.contextLoaded = true;
    sessionState.contextLoadMethod = "resource";
  }
}

export function markContextLoaded(method: AutoloadMethod): void {
  if (sessionState.contextLoaded) return;
  sessionState.contextLoaded = true;
  sessionState.contextLoadMethod = method;
}

export function recordToolCall(name: string): void {
  if (!sessionState.firstToolCall) {
    sessionState.firstToolCall = name;
  }
  // Treat get_startup_context itself as the "loaded via tool_description" path.
  if (name === "get_startup_context") {
    if (!sessionState.contextLoaded) {
      sessionState.contextLoaded = true;
      sessionState.contextLoadMethod =
        sessionState.contextLoadMethod ?? "tool_description";
    }
    return;
  }
  if (!sessionState.contextLoaded) {
    sessionState.toolsCalledBeforeContext += 1;
  }
}

export function evaluateOrchestratorContextReadGate(
  savedTurns: OrchestratorSavedTurn[],
  args: Record<string, unknown> = {},
  now = new Date(),
  windowMs = LOG_READ_DECIDE_RECEIPT_WINDOW_MS,
): OrchestratorReadGateResult {
  const requestedSessionId = normalizeSessionId(args.session_id);
  const nowMs = now.getTime();
  const savedTurn = savedTurns.find((turn) => {
    if (requestedSessionId && turn.sessionId !== requestedSessionId) return false;
    return nowMs - turn.savedAt.getTime() <= windowMs;
  });

  if (savedTurn) return { ok: true, savedTurn };

  const missing = requestedSessionId
    ? `No prior save_conversation_turn receipt for session_id='${requestedSessionId}' in this MCP server session.`
    : "No prior save_conversation_turn receipt in this MCP server session.";

  return {
    ok: false,
    status: "CONTEXT_UNREAD",
    missing,
    guidance:
      "Save the accepted wake or turn first with save_conversation_turn, keep the receipt id, then call read_orchestrator_context before deciding or acting.",
  };
}

export function markConversationTurnSaved(
  args: Record<string, unknown>,
  result: unknown,
  savedAt = new Date(),
): void {
  const sessionId = normalizeSessionId(args.session_id);
  if (!sessionId) return;
  const record = result && typeof result === "object" ? result as Record<string, unknown> : {};
  const receiptId =
    normalizeReceiptId(record.receipt_id) ??
    normalizeReceiptId(record.turn_id) ??
    normalizeReceiptId(record.id);
  const cutoffMs = savedAt.getTime() - LOG_READ_DECIDE_RECEIPT_WINDOW_MS;

  sessionState.orchestratorSavedTurns = [
    { sessionId, receiptId, savedAt },
    ...sessionState.orchestratorSavedTurns.filter((turn) =>
      turn.sessionId !== sessionId && turn.savedAt.getTime() >= cutoffMs
    ),
  ];
}

export function requireConversationTurnBeforeOrchestratorRead(args: Record<string, unknown>): OrchestratorReadGateResult {
  return evaluateOrchestratorContextReadGate(sessionState.orchestratorSavedTurns, args);
}

export function snapshotSessionState(): SessionState {
  return {
    ...sessionState,
    resourcesRead: [...sessionState.resourcesRead],
    orchestratorSavedTurns: sessionState.orchestratorSavedTurns.map((turn) => ({ ...turn })),
  };
}
