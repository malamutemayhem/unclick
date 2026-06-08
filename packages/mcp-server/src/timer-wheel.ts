export interface TimerEntry {
  id: number;
  callback: () => void;
  expiry: number;
  interval?: number;
}

export class TimerWheel {
  private slots: Map<number, TimerEntry[]>[];
  private resolution: number;
  private currentTick: number;
  private size: number;
  private nextId: number;
  private entries: Map<number, { level: number; slot: number }>;

  constructor(resolution = 1, levels = 4, slotsPerLevel = 64) {
    this.resolution = resolution;
    this.currentTick = 0;
    this.size = slotsPerLevel;
    this.nextId = 1;
    this.entries = new Map();
    this.slots = [];
    for (let i = 0; i < levels; i++) {
      const level = new Map<number, TimerEntry[]>();
      this.slots.push(level);
    }
  }

  get tick(): number {
    return this.currentTick;
  }

  schedule(delay: number, callback: () => void): number {
    const id = this.nextId++;
    const expiry = this.currentTick + Math.max(1, Math.ceil(delay / this.resolution));
    const entry: TimerEntry = { id, callback, expiry };
    this.insertEntry(entry);
    return id;
  }

  scheduleInterval(delay: number, callback: () => void): number {
    const id = this.nextId++;
    const ticks = Math.max(1, Math.ceil(delay / this.resolution));
    const expiry = this.currentTick + ticks;
    const entry: TimerEntry = { id, callback, expiry, interval: ticks };
    this.insertEntry(entry);
    return id;
  }

  cancel(id: number): boolean {
    const loc = this.entries.get(id);
    if (!loc) return false;
    const slot = this.slots[loc.level].get(loc.slot);
    if (slot) {
      const idx = slot.findIndex((e) => e.id === id);
      if (idx >= 0) slot.splice(idx, 1);
    }
    this.entries.delete(id);
    return true;
  }

  advance(ticks = 1): (() => void)[] {
    const fired: (() => void)[] = [];
    for (let t = 0; t < ticks; t++) {
      this.currentTick++;
      this.cascadeHigherLevels();
      const slot0 = this.currentTick % this.size;
      const entries = this.slots[0].get(slot0);
      if (entries) {
        const toFire = entries.filter((e) => e.expiry <= this.currentTick);
        const remaining = entries.filter((e) => e.expiry > this.currentTick);
        this.slots[0].set(slot0, remaining);
        for (const entry of toFire) {
          this.entries.delete(entry.id);
          fired.push(entry.callback);
          if (entry.interval) {
            const newExpiry = this.currentTick + entry.interval;
            const rescheduled: TimerEntry = {
              id: entry.id,
              callback: entry.callback,
              expiry: newExpiry,
              interval: entry.interval,
            };
            this.insertEntry(rescheduled);
          }
        }
      }
    }
    return fired;
  }

  advanceAndRun(ticks = 1): number {
    const callbacks = this.advance(ticks);
    for (const cb of callbacks) cb();
    return callbacks.length;
  }

  pending(): number {
    return this.entries.size;
  }

  private insertEntry(entry: TimerEntry): void {
    const delta = entry.expiry - this.currentTick;
    let level = 0;
    let d = delta;
    while (d >= this.size && level < this.slots.length - 1) {
      d = Math.floor(d / this.size);
      level++;
    }
    const slot = entry.expiry % (this.size * Math.pow(this.size, level));
    const slotIdx = Math.floor(slot / Math.pow(this.size, level)) % this.size;
    if (!this.slots[level].has(slotIdx)) {
      this.slots[level].set(slotIdx, []);
    }
    this.slots[level].get(slotIdx)!.push(entry);
    this.entries.set(entry.id, { level, slot: slotIdx });
  }

  private cascadeHigherLevels(): void {
    for (let level = 1; level < this.slots.length; level++) {
      const divisor = Math.pow(this.size, level);
      if (this.currentTick % divisor !== 0) break;
      const slotIdx = Math.floor(this.currentTick / divisor) % this.size;
      const entries = this.slots[level].get(slotIdx);
      if (!entries || entries.length === 0) continue;
      const toMove = [...entries];
      this.slots[level].set(slotIdx, []);
      for (const entry of toMove) {
        this.entries.delete(entry.id);
        if (entry.expiry <= this.currentTick) {
          const slot0 = this.currentTick % this.size;
          if (!this.slots[0].has(slot0)) this.slots[0].set(slot0, []);
          this.slots[0].get(slot0)!.push(entry);
          this.entries.set(entry.id, { level: 0, slot: slot0 });
        } else {
          this.insertEntry(entry);
        }
      }
    }
  }
}

export class Scheduler {
  private wheel: TimerWheel;
  private time: number;

  constructor(resolution = 1) {
    this.wheel = new TimerWheel(resolution);
    this.time = 0;
  }

  get currentTime(): number {
    return this.time;
  }

  after(delay: number, callback: () => void): number {
    return this.wheel.schedule(delay, callback);
  }

  every(interval: number, callback: () => void): number {
    return this.wheel.scheduleInterval(interval, callback);
  }

  cancel(id: number): boolean {
    return this.wheel.cancel(id);
  }

  tick(amount = 1): number {
    this.time += amount;
    return this.wheel.advanceAndRun(amount);
  }

  pending(): number {
    return this.wheel.pending();
  }
}
