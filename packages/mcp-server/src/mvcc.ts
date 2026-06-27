export interface MVCCVersion<T> {
  value: T;
  txId: number;
  created: number;
  expired: number;
}

export class MVCCStore<T> {
  private versions = new Map<string, MVCCVersion<T>[]>();
  private nextTx = 1;
  private activeTxs = new Map<number, number>();
  private committedTxs = new Set<number>();
  private abortedTxs = new Set<number>();

  begin(): number {
    const txId = this.nextTx++;
    this.activeTxs.set(txId, txId);
    return txId;
  }

  read(txId: number, key: string): T | null {
    const versions = this.versions.get(key);
    if (!versions) return null;

    for (let i = versions.length - 1; i >= 0; i--) {
      const v = versions[i];
      if (v.created <= txId && this.isVisible(v, txId)) {
        const expiredVisible = v.expired !== 0 && (v.expired === txId || this.committedTxs.has(v.expired));
        if (!expiredVisible) {
          return v.value;
        }
      }
    }
    return null;
  }

  write(txId: number, key: string, value: T): void {
    if (!this.activeTxs.has(txId)) throw new Error(`Transaction ${txId} is not active`);

    const versions = this.versions.get(key) || [];

    for (let i = versions.length - 1; i >= 0; i--) {
      const v = versions[i];
      if (v.expired === 0 && this.isVisible(v, txId)) {
        v.expired = txId;
        break;
      }
    }

    versions.push({ value, txId, created: txId, expired: 0 });
    this.versions.set(key, versions);
  }

  delete(txId: number, key: string): boolean {
    if (!this.activeTxs.has(txId)) throw new Error(`Transaction ${txId} is not active`);

    const versions = this.versions.get(key);
    if (!versions) return false;

    for (let i = versions.length - 1; i >= 0; i--) {
      const v = versions[i];
      if (v.expired === 0 && this.isVisible(v, txId)) {
        v.expired = txId;
        return true;
      }
    }
    return false;
  }

  commit(txId: number): void {
    this.activeTxs.delete(txId);
    this.committedTxs.add(txId);
  }

  abort(txId: number): void {
    this.activeTxs.delete(txId);
    this.abortedTxs.add(txId);

    for (const [, versions] of this.versions) {
      for (let i = versions.length - 1; i >= 0; i--) {
        if (versions[i].txId === txId) {
          versions.splice(i, 1);
        } else if (versions[i].expired === txId) {
          versions[i].expired = 0;
        }
      }
    }
  }

  private isVisible(version: MVCCVersion<T>, txId: number): boolean {
    if (version.txId === txId) return true;
    if (this.committedTxs.has(version.txId) && version.created <= txId) return true;
    return false;
  }

  snapshot(txId: number): Map<string, T> {
    const result = new Map<string, T>();
    for (const [key] of this.versions) {
      const val = this.read(txId, key);
      if (val !== null) result.set(key, val);
    }
    return result;
  }

  get activeTransactions(): number {
    return this.activeTxs.size;
  }

  get totalVersions(): number {
    let count = 0;
    for (const [, versions] of this.versions) count += versions.length;
    return count;
  }

  gc(olderThan: number): number {
    let removed = 0;
    for (const [key, versions] of this.versions) {
      const before = versions.length;
      const kept = versions.filter(v =>
        v.expired === 0 || v.expired > olderThan || !this.committedTxs.has(v.expired)
      );
      if (kept.length < before) {
        removed += before - kept.length;
        this.versions.set(key, kept);
      }
    }
    return removed;
  }
}
