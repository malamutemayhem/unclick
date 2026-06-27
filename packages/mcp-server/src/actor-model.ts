export type Message = { type: string; payload?: unknown; sender?: string };
export type Behavior<S> = (state: S, msg: Message) => { state: S; messages?: Array<{ to: string; msg: Message }> };

export interface Actor<S = unknown> {
  id: string;
  state: S;
  behavior: Behavior<S>;
  mailbox: Message[];
  processed: number;
}

export class ActorSystem {
  private actors = new Map<string, Actor>();
  private deadLetters: Array<{ to: string; msg: Message }> = [];
  private totalMessages = 0;

  spawn<S>(id: string, initialState: S, behavior: Behavior<S>): string {
    if (this.actors.has(id)) return id;
    this.actors.set(id, {
      id,
      state: initialState,
      behavior: behavior as Behavior<unknown>,
      mailbox: [],
      processed: 0,
    });
    return id;
  }

  send(to: string, msg: Message): boolean {
    const actor = this.actors.get(to);
    if (!actor) {
      this.deadLetters.push({ to, msg });
      return false;
    }
    actor.mailbox.push(msg);
    this.totalMessages++;
    return true;
  }

  tick(): number {
    let processed = 0;
    for (const actor of this.actors.values()) {
      if (actor.mailbox.length === 0) continue;
      const msg = actor.mailbox.shift()!;
      const result = actor.behavior(actor.state, msg);
      actor.state = result.state;
      actor.processed++;
      processed++;
      if (result.messages) {
        for (const outgoing of result.messages) {
          this.send(outgoing.to, outgoing.msg);
        }
      }
    }
    return processed;
  }

  run(maxTicks = 100): number {
    let totalProcessed = 0;
    for (let i = 0; i < maxTicks; i++) {
      const processed = this.tick();
      totalProcessed += processed;
      if (processed === 0) break;
    }
    return totalProcessed;
  }

  getState<S>(id: string): S | undefined {
    const actor = this.actors.get(id);
    return actor?.state as S | undefined;
  }

  mailboxSize(id: string): number {
    return this.actors.get(id)?.mailbox.length ?? 0;
  }

  processedCount(id: string): number {
    return this.actors.get(id)?.processed ?? 0;
  }

  stop(id: string): boolean {
    return this.actors.delete(id);
  }

  actorCount(): number {
    return this.actors.size;
  }

  getDeadLetters(): Array<{ to: string; msg: Message }> {
    return [...this.deadLetters];
  }

  totalMessagesSent(): number {
    return this.totalMessages;
  }

  actorIds(): string[] {
    return [...this.actors.keys()].sort();
  }

  broadcast(msg: Message, exclude?: string): number {
    let count = 0;
    for (const id of this.actors.keys()) {
      if (id === exclude) continue;
      this.send(id, msg);
      count++;
    }
    return count;
  }
}
