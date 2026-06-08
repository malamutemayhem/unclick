export interface Message {
  role: "system" | "user" | "assistant" | "tool";
  content: string;
  tokenEstimate?: number;
}

export interface ContextWindowConfig {
  maxTokens: number;
  reserveTokens: number;
  systemPriority: boolean;
}

const DEFAULT_CONFIG: ContextWindowConfig = {
  maxTokens: 4096,
  reserveTokens: 512,
  systemPriority: true,
};

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

export class ContextWindow {
  private messages: Message[] = [];
  private config: ContextWindowConfig;

  constructor(config: Partial<ContextWindowConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  add(message: Message): void {
    if (!message.tokenEstimate) {
      message.tokenEstimate = estimateTokens(message.content);
    }
    this.messages.push(message);
    this.trim();
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  get totalTokens(): number {
    return this.messages.reduce((sum, m) => sum + (m.tokenEstimate ?? estimateTokens(m.content)), 0);
  }

  get availableTokens(): number {
    return Math.max(0, this.config.maxTokens - this.config.reserveTokens - this.totalTokens);
  }

  get messageCount(): number {
    return this.messages.length;
  }

  clear(): void {
    this.messages = [];
  }

  private trim(): void {
    const budget = this.config.maxTokens - this.config.reserveTokens;
    while (this.totalTokens > budget && this.messages.length > 1) {
      if (this.config.systemPriority) {
        const idx = this.messages.findIndex((m) => m.role !== "system");
        if (idx === -1) break;
        this.messages.splice(idx, 1);
      } else {
        this.messages.shift();
      }
    }
  }
}

export function fitMessages(messages: Message[], maxTokens: number): Message[] {
  const result: Message[] = [];
  let tokens = 0;
  for (let i = messages.length - 1; i >= 0; i--) {
    const est = messages[i].tokenEstimate ?? estimateTokens(messages[i].content);
    if (tokens + est > maxTokens) break;
    result.unshift(messages[i]);
    tokens += est;
  }
  return result;
}

export function summarizeMessages(messages: Message[]): string {
  const parts: string[] = [];
  for (const m of messages) {
    parts.push(`[${m.role}]: ${m.content.slice(0, 100)}${m.content.length > 100 ? "..." : ""}`);
  }
  return parts.join("\n");
}
