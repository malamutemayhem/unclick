export interface InboxMessage<T = unknown> {
  id: string;
  priority: number;
  payload: T;
  timestamp: number;
  read: boolean;
  tags: string[];
}

export class PriorityInbox<T = unknown> {
  private messages: InboxMessage<T>[] = [];
  private counter = 0;

  push(payload: T, priority = 0, tags: string[] = []): string {
    const id = `msg_${++this.counter}`;
    this.messages.push({ id, priority, payload, timestamp: Date.now(), read: false, tags });
    this.messages.sort((a, b) => b.priority - a.priority || a.timestamp - b.timestamp);
    return id;
  }

  peek(): InboxMessage<T> | undefined {
    return this.messages[0];
  }

  pop(): InboxMessage<T> | undefined {
    return this.messages.shift();
  }

  markRead(id: string): boolean {
    const msg = this.messages.find((m) => m.id === id);
    if (!msg) return false;
    msg.read = true;
    return true;
  }

  getUnread(): InboxMessage<T>[] {
    return this.messages.filter((m) => !m.read);
  }

  getByTag(tag: string): InboxMessage<T>[] {
    return this.messages.filter((m) => m.tags.includes(tag));
  }

  remove(id: string): boolean {
    const idx = this.messages.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    this.messages.splice(idx, 1);
    return true;
  }

  get size(): number {
    return this.messages.length;
  }

  get unreadCount(): number {
    return this.messages.filter((m) => !m.read).length;
  }

  all(): InboxMessage<T>[] {
    return [...this.messages];
  }

  clear(): void {
    this.messages = [];
  }
}
