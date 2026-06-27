export type TxStatus = "pending" | "committed" | "aborted" | "prepared";

export interface LogEntry {
  txId: number;
  operation: "begin" | "write" | "read" | "prepare" | "commit" | "abort" | "checkpoint";
  key?: string;
  oldValue?: string;
  newValue?: string;
  timestamp: number;
}

export interface Transaction {
  id: number;
  status: TxStatus;
  startTime: number;
  writes: Map<string, { old: string | undefined; new: string }>;
  reads: Set<string>;
}

export class TransactionLog {
  private log: LogEntry[] = [];
  private transactions = new Map<number, Transaction>();
  private store = new Map<string, string>();
  private nextTxId = 1;
  private clock = 0;

  begin(): number {
    const id = this.nextTxId++;
    this.transactions.set(id, {
      id,
      status: "pending",
      startTime: this.clock,
      writes: new Map(),
      reads: new Set(),
    });
    this.appendLog(id, "begin");
    return id;
  }

  read(txId: number, key: string): string | undefined {
    const tx = this.transactions.get(txId);
    if (!tx || tx.status !== "pending") return undefined;
    tx.reads.add(key);
    this.appendLog(txId, "read", key);
    const write = tx.writes.get(key);
    if (write) return write.new;
    return this.store.get(key);
  }

  write(txId: number, key: string, value: string): boolean {
    const tx = this.transactions.get(txId);
    if (!tx || tx.status !== "pending") return false;
    const oldValue = tx.writes.has(key) ? tx.writes.get(key)!.old : this.store.get(key);
    tx.writes.set(key, { old: oldValue, new: value });
    this.appendLog(txId, "write", key, oldValue, value);
    return true;
  }

  commit(txId: number): boolean {
    const tx = this.transactions.get(txId);
    if (!tx || tx.status !== "pending") return false;

    this.appendLog(txId, "prepare");
    tx.status = "prepared";

    for (const [key, { new: val }] of tx.writes) {
      this.store.set(key, val);
    }

    tx.status = "committed";
    this.appendLog(txId, "commit");
    return true;
  }

  abort(txId: number): boolean {
    const tx = this.transactions.get(txId);
    if (!tx || (tx.status !== "pending" && tx.status !== "prepared")) return false;

    if (tx.status === "prepared") {
      for (const [key, { old: oldVal }] of tx.writes) {
        if (oldVal === undefined) {
          this.store.delete(key);
        } else {
          this.store.set(key, oldVal);
        }
      }
    }

    tx.status = "aborted";
    this.appendLog(txId, "abort");
    return true;
  }

  checkpoint(): void {
    this.appendLog(0, "checkpoint");
  }

  recover(): number {
    let recovered = 0;
    for (const [, tx] of this.transactions) {
      if (tx.status === "pending" || tx.status === "prepared") {
        this.abort(tx.id);
        recovered++;
      }
    }
    return recovered;
  }

  getStore(): Map<string, string> {
    return new Map(this.store);
  }

  getLog(): LogEntry[] {
    return [...this.log];
  }

  logSize(): number {
    return this.log.length;
  }

  activeTransactions(): number {
    let count = 0;
    for (const tx of this.transactions.values()) {
      if (tx.status === "pending" || tx.status === "prepared") count++;
    }
    return count;
  }

  txStatus(txId: number): TxStatus | undefined {
    return this.transactions.get(txId)?.status;
  }

  private appendLog(
    txId: number,
    operation: LogEntry["operation"],
    key?: string,
    oldValue?: string,
    newValue?: string
  ): void {
    this.log.push({ txId, operation, key, oldValue, newValue, timestamp: this.clock++ });
  }
}
