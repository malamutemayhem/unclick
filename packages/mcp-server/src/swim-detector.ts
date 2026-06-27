export type NodeStatus = "alive" | "suspect" | "dead";

export interface SwimNode {
  id: string;
  status: NodeStatus;
  incarnation: number;
  lastUpdate: number;
}

export class SwimDetector {
  private members = new Map<string, SwimNode>();
  private suspectTimeout: number;
  private deadTimeout: number;
  private tick = 0;
  private events: { tick: number; type: string; nodeId: string; detail?: string }[] = [];

  constructor(suspectTimeout = 5, deadTimeout = 10) {
    this.suspectTimeout = suspectTimeout;
    this.deadTimeout = deadTimeout;
  }

  join(id: string): void {
    this.members.set(id, {
      id,
      status: "alive",
      incarnation: 0,
      lastUpdate: this.tick,
    });
    this.events.push({ tick: this.tick, type: "join", nodeId: id });
  }

  leave(id: string): void {
    this.members.delete(id);
    this.events.push({ tick: this.tick, type: "leave", nodeId: id });
  }

  ping(targetId: string): boolean {
    const node = this.members.get(targetId);
    if (!node) return false;
    if (node.status === "dead") return false;
    node.lastUpdate = this.tick;
    if (node.status === "suspect") {
      node.status = "alive";
      node.incarnation++;
      this.events.push({ tick: this.tick, type: "alive", nodeId: targetId });
    }
    return true;
  }

  pingReq(targetId: string, proxyIds: string[]): boolean {
    const target = this.members.get(targetId);
    if (!target || target.status === "dead") return false;

    for (const proxyId of proxyIds) {
      const proxy = this.members.get(proxyId);
      if (proxy && proxy.status === "alive") {
        target.lastUpdate = this.tick;
        if (target.status === "suspect") {
          target.status = "alive";
          target.incarnation++;
        }
        return true;
      }
    }
    return false;
  }

  advance(): { suspects: string[]; dead: string[] } {
    this.tick++;
    const suspects: string[] = [];
    const dead: string[] = [];

    for (const [, node] of this.members) {
      const elapsed = this.tick - node.lastUpdate;

      if (node.status === "alive" && elapsed > this.suspectTimeout) {
        node.status = "suspect";
        suspects.push(node.id);
        this.events.push({ tick: this.tick, type: "suspect", nodeId: node.id });
      } else if (node.status === "suspect" && elapsed > this.deadTimeout) {
        node.status = "dead";
        dead.push(node.id);
        this.events.push({ tick: this.tick, type: "dead", nodeId: node.id });
      }
    }

    return { suspects, dead };
  }

  getStatus(id: string): NodeStatus | undefined {
    return this.members.get(id)?.status;
  }

  getMembers(status?: NodeStatus): SwimNode[] {
    const result: SwimNode[] = [];
    for (const [, node] of this.members) {
      if (!status || node.status === status) {
        result.push({ ...node });
      }
    }
    return result;
  }

  get aliveCount(): number {
    let count = 0;
    for (const [, n] of this.members) {
      if (n.status === "alive") count++;
    }
    return count;
  }

  get memberCount(): number {
    return this.members.size;
  }

  get currentTick(): number {
    return this.tick;
  }

  getEvents(): typeof this.events {
    return [...this.events];
  }

  clearEvents(): void {
    this.events = [];
  }

  refute(id: string): void {
    const node = this.members.get(id);
    if (node && node.status === "suspect") {
      node.status = "alive";
      node.incarnation++;
      node.lastUpdate = this.tick;
      this.events.push({ tick: this.tick, type: "refute", nodeId: id });
    }
  }
}
