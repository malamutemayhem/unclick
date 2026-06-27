export interface WALEntry {
  lsn: number;
  txId: number;
  op: "write" | "delete" | "commit" | "abort" | "checkpoint";
  key?: string;
  before?: string;
  after?: string;
  timestamp: number;
}

export class WALLog {
  private entries: WALEntry[] = [];
  private nextLsn = 1;
  private committed = new Set<number>();
  private aborted = new Set<number>();
  private checkpointLsn = 0;

  append(txId: number, op: WALEntry["op"], key?: string, before?: string, after?: string): WALEntry {
    const entry: WALEntry = {
      lsn: this.nextLsn++,
      txId,
      op,
      key,
      before,
      after,
      timestamp: Date.now(),
    };
    this.entries.push(entry);

    if (op === "commit") this.committed.add(txId);
    if (op === "abort") this.aborted.add(txId);

    return entry;
  }

  write(txId: number, key: string, before: string, after: string): WALEntry {
    return this.append(txId, "write", key, before, after);
  }

  delete(txId: number, key: string, before: string): WALEntry {
    return this.append(txId, "delete", key, before);
  }

  commit(txId: number): WALEntry {
    return this.append(txId, "commit");
  }

  abort(txId: number): WALEntry {
    return this.append(txId, "abort");
  }

  checkpoint(): WALEntry {
    const entry = this.append(0, "checkpoint");
    this.checkpointLsn = entry.lsn;
    return entry;
  }

  redo(fromLsn = 0): WALEntry[] {
    return this.entries
      .filter(e => e.lsn > fromLsn && e.op === "write" && this.committed.has(e.txId))
      .sort((a, b) => a.lsn - b.lsn);
  }

  undo(): WALEntry[] {
    const activeTxIds = new Set<number>();
    for (const e of this.entries) {
      if (e.op === "write" || e.op === "delete") activeTxIds.add(e.txId);
    }
    for (const txId of this.committed) activeTxIds.delete(txId);
    for (const txId of this.aborted) activeTxIds.delete(txId);

    return this.entries
      .filter(e => (e.op === "write" || e.op === "delete") && activeTxIds.has(e.txId))
      .sort((a, b) => b.lsn - a.lsn);
  }

  recover(): { redo: WALEntry[]; undo: WALEntry[] } {
    return {
      redo: this.redo(this.checkpointLsn),
      undo: this.undo(),
    };
  }

  getEntries(txId?: number): WALEntry[] {
    if (txId !== undefined) return this.entries.filter(e => e.txId === txId);
    return [...this.entries];
  }

  isCommitted(txId: number): boolean {
    return this.committed.has(txId);
  }

  isAborted(txId: number): boolean {
    return this.aborted.has(txId);
  }

  get size(): number {
    return this.entries.length;
  }

  get lastLsn(): number {
    return this.nextLsn - 1;
  }

  get lastCheckpoint(): number {
    return this.checkpointLsn;
  }

  truncate(beforeLsn: number): number {
    const before = this.entries.length;
    this.entries = this.entries.filter(e => e.lsn >= beforeLsn);
    return before - this.entries.length;
  }
}
