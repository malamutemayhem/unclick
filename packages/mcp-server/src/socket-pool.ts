export interface SocketInfo {
  id: number;
  host: string;
  port: number;
  state: "idle" | "active" | "closed";
  createdAt: number;
  lastUsedAt: number;
  useCount: number;
}

export class SocketPool {
  private sockets = new Map<number, SocketInfo>();
  private hostPools = new Map<string, Set<number>>();
  private nextId = 0;
  private maxPerHost: number;
  private maxTotal: number;
  private maxIdleTime: number;

  constructor(maxPerHost = 6, maxTotal = 50, maxIdleTime = 30000) {
    this.maxPerHost = maxPerHost;
    this.maxTotal = maxTotal;
    this.maxIdleTime = maxIdleTime;
  }

  acquire(host: string, port: number, now = Date.now()): SocketInfo | null {
    const key = `${host}:${port}`;
    const pool = this.hostPools.get(key);

    if (pool) {
      for (const id of pool) {
        const sock = this.sockets.get(id)!;
        if (sock.state === "idle") {
          sock.state = "active";
          sock.lastUsedAt = now;
          sock.useCount++;
          return { ...sock };
        }
      }
    }

    const hostCount = pool ? pool.size : 0;
    if (hostCount >= this.maxPerHost) return null;
    if (this.sockets.size >= this.maxTotal) return null;

    const id = this.nextId++;
    const sock: SocketInfo = {
      id,
      host,
      port,
      state: "active",
      createdAt: now,
      lastUsedAt: now,
      useCount: 1,
    };
    this.sockets.set(id, sock);

    if (!this.hostPools.has(key)) this.hostPools.set(key, new Set());
    this.hostPools.get(key)!.add(id);

    return { ...sock };
  }

  release(id: number, now = Date.now()): boolean {
    const sock = this.sockets.get(id);
    if (!sock || sock.state !== "active") return false;
    sock.state = "idle";
    sock.lastUsedAt = now;
    return true;
  }

  close(id: number): boolean {
    const sock = this.sockets.get(id);
    if (!sock) return false;
    sock.state = "closed";
    const key = `${sock.host}:${sock.port}`;
    this.hostPools.get(key)?.delete(id);
    this.sockets.delete(id);
    return true;
  }

  evictIdle(now = Date.now()): number {
    let evicted = 0;
    for (const [id, sock] of this.sockets) {
      if (sock.state === "idle" && now - sock.lastUsedAt > this.maxIdleTime) {
        const key = `${sock.host}:${sock.port}`;
        this.hostPools.get(key)?.delete(id);
        this.sockets.delete(id);
        evicted++;
      }
    }
    return evicted;
  }

  getSocket(id: number): SocketInfo | null {
    const s = this.sockets.get(id);
    return s ? { ...s } : null;
  }

  getHostStats(host: string, port: number): { total: number; idle: number; active: number } {
    const key = `${host}:${port}`;
    const pool = this.hostPools.get(key);
    if (!pool) return { total: 0, idle: 0, active: 0 };
    let idle = 0;
    let active = 0;
    for (const id of pool) {
      const s = this.sockets.get(id)!;
      if (s.state === "idle") idle++;
      else if (s.state === "active") active++;
    }
    return { total: pool.size, idle, active };
  }

  get totalSockets(): number {
    return this.sockets.size;
  }

  get idleSockets(): number {
    let count = 0;
    for (const s of this.sockets.values()) {
      if (s.state === "idle") count++;
    }
    return count;
  }

  get activeSockets(): number {
    let count = 0;
    for (const s of this.sockets.values()) {
      if (s.state === "active") count++;
    }
    return count;
  }

  closeAll(): void {
    this.sockets.clear();
    this.hostPools.clear();
  }

  list(): SocketInfo[] {
    return [...this.sockets.values()].map((s) => ({ ...s }));
  }
}
