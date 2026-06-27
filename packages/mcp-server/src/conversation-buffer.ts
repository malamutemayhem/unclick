export interface Message {
  role: string;
  content: string;
  timestamp?: number;
}

export class ConversationBuffer {
  private messages: Message[] = [];
  private readonly maxMessages: number;
  private readonly maxTokens: number;

  constructor(maxMessages = 50, maxTokens = 4000) {
    this.maxMessages = maxMessages;
    this.maxTokens = maxTokens;
  }

  add(message: Message): void {
    this.messages.push({ ...message, timestamp: message.timestamp || Date.now() });
    this.trim();
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  getLastN(n: number): Message[] {
    return this.messages.slice(-n);
  }

  clear(): void {
    this.messages = [];
  }

  get size(): number {
    return this.messages.length;
  }

  summarize(summaryFn: (messages: Message[]) => string): Message[] {
    if (this.messages.length <= 4) return [...this.messages];
    const keepRecent = 2;
    const toSummarize = this.messages.slice(0, -keepRecent);
    const recent = this.messages.slice(-keepRecent);
    const summary = summaryFn(toSummarize);
    return [{ role: "system", content: summary }, ...recent];
  }

  private trim(): void {
    while (this.messages.length > this.maxMessages) {
      this.messages.shift();
    }
    let tokens = this.estimateTokens();
    while (tokens > this.maxTokens && this.messages.length > 1) {
      this.messages.shift();
      tokens = this.estimateTokens();
    }
  }

  private estimateTokens(): number {
    let total = 0;
    for (const msg of this.messages) {
      total += Math.ceil(msg.content.length / 4) + 4;
    }
    return total;
  }
}

export class SlidingWindowBuffer {
  private messages: Message[] = [];
  private readonly windowSize: number;

  constructor(windowSize: number) {
    this.windowSize = windowSize;
  }

  add(message: Message): void {
    this.messages.push(message);
    if (this.messages.length > this.windowSize) {
      this.messages.shift();
    }
  }

  getMessages(): Message[] {
    return [...this.messages];
  }

  get size(): number {
    return this.messages.length;
  }
}
