export interface LogEntry<T = unknown> {
  term: number;
  index: number;
  command: T;
}

export class RaftLog<T = unknown> {
  private entries: LogEntry<T>[] = [];
  private commitIndex = -1;
  private lastApplied = -1;

  append(term: number, command: T): LogEntry<T> {
    const entry: LogEntry<T> = {
      term,
      index: this.entries.length,
      command,
    };
    this.entries.push(entry);
    return entry;
  }

  appendEntries(prevIndex: number, prevTerm: number, entries: LogEntry<T>[]): boolean {
    if (prevIndex >= 0) {
      if (prevIndex >= this.entries.length) return false;
      if (this.entries[prevIndex].term !== prevTerm) return false;
    }

    for (const entry of entries) {
      if (entry.index < this.entries.length) {
        if (this.entries[entry.index].term !== entry.term) {
          this.entries.length = entry.index;
          this.entries.push(entry);
        }
      } else {
        this.entries.push(entry);
      }
    }
    return true;
  }

  get(index: number): LogEntry<T> | undefined {
    return this.entries[index];
  }

  lastIndex(): number {
    return this.entries.length - 1;
  }

  lastTerm(): number {
    if (this.entries.length === 0) return 0;
    return this.entries[this.entries.length - 1].term;
  }

  commit(index: number): void {
    if (index > this.lastIndex()) return;
    this.commitIndex = Math.max(this.commitIndex, index);
  }

  getCommitIndex(): number {
    return this.commitIndex;
  }

  applyNext(): LogEntry<T> | null {
    if (this.lastApplied >= this.commitIndex) return null;
    this.lastApplied++;
    return this.entries[this.lastApplied];
  }

  getLastApplied(): number {
    return this.lastApplied;
  }

  slice(from: number, to?: number): LogEntry<T>[] {
    return this.entries.slice(from, to);
  }

  length(): number {
    return this.entries.length;
  }

  isUpToDate(lastLogIndex: number, lastLogTerm: number): boolean {
    const myTerm = this.lastTerm();
    if (lastLogTerm !== myTerm) return lastLogTerm > myTerm;
    return lastLogIndex >= this.lastIndex();
  }
}
