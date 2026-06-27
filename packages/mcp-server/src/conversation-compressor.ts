export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: number;
}

export interface CompressedConversation {
  messages: Message[];
  originalCount: number;
  compressedCount: number;
  compressionRatio: number;
}

export function compress(
  messages: Message[],
  maxMessages: number,
  options: { keepSystem?: boolean; keepRecent?: number; summarize?: (msgs: Message[]) => string } = {},
): CompressedConversation {
  const { keepSystem = true, keepRecent = 2, summarize } = options;
  if (messages.length <= maxMessages) {
    return { messages: [...messages], originalCount: messages.length, compressedCount: messages.length, compressionRatio: 1 };
  }

  const systemMsgs = keepSystem ? messages.filter((m) => m.role === "system") : [];
  const nonSystem = messages.filter((m) => m.role !== "system");
  const recentCount = Math.min(keepRecent, nonSystem.length);
  const recent = nonSystem.slice(-recentCount);
  const toCompress = nonSystem.slice(0, nonSystem.length - recentCount);

  const result: Message[] = [...systemMsgs];

  if (toCompress.length > 0) {
    const summaryText = summarize
      ? summarize(toCompress)
      : defaultSummarize(toCompress);
    result.push({ role: "system", content: `[Conversation summary: ${summaryText}]` });
  }

  result.push(...recent);

  return {
    messages: result,
    originalCount: messages.length,
    compressedCount: result.length,
    compressionRatio: result.length / messages.length,
  };
}

function defaultSummarize(msgs: Message[]): string {
  const userMsgs = msgs.filter((m) => m.role === "user");
  const topics = userMsgs.map((m) => m.content.slice(0, 50).replace(/\n/g, " "));
  return `${msgs.length} messages covering: ${topics.slice(0, 3).join("; ")}${topics.length > 3 ? "..." : ""}`;
}

export function estimateTokenCount(messages: Message[]): number {
  return messages.reduce((sum, m) => sum + Math.ceil(m.content.length / 4) + 4, 0);
}

export function trimToTokenBudget(messages: Message[], budget: number): Message[] {
  const result: Message[] = [];
  let used = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    const tokens = Math.ceil(messages[i].content.length / 4) + 4;
    if (used + tokens > budget) break;
    result.unshift(messages[i]);
    used += tokens;
  }
  return result;
}
