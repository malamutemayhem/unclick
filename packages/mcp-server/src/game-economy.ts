export interface Transaction {
  from: string;
  to: string;
  currency: string;
  amount: number;
  timestamp: number;
  description?: string;
}

export class GameEconomy {
  private balances: Map<string, Map<string, number>> = new Map();
  private ledger: Transaction[] = [];
  private currencies: Set<string> = new Set();

  registerCurrency(name: string): void {
    this.currencies.add(name);
  }

  createAccount(id: string): void {
    if (!this.balances.has(id)) {
      this.balances.set(id, new Map());
    }
  }

  getBalance(accountId: string, currency: string): number {
    return this.balances.get(accountId)?.get(currency) ?? 0;
  }

  deposit(accountId: string, currency: string, amount: number): boolean {
    if (amount <= 0) return false;
    this.createAccount(accountId);
    const wallet = this.balances.get(accountId)!;
    wallet.set(currency, (wallet.get(currency) ?? 0) + amount);
    this.ledger.push({
      from: "system",
      to: accountId,
      currency,
      amount,
      timestamp: Date.now(),
    });
    return true;
  }

  withdraw(accountId: string, currency: string, amount: number): boolean {
    if (amount <= 0) return false;
    const balance = this.getBalance(accountId, currency);
    if (balance < amount) return false;
    const wallet = this.balances.get(accountId)!;
    wallet.set(currency, balance - amount);
    this.ledger.push({
      from: accountId,
      to: "system",
      currency,
      amount,
      timestamp: Date.now(),
    });
    return true;
  }

  transfer(
    from: string,
    to: string,
    currency: string,
    amount: number,
    description?: string,
  ): boolean {
    if (amount <= 0) return false;
    const fromBalance = this.getBalance(from, currency);
    if (fromBalance < amount) return false;
    this.createAccount(to);
    const fromWallet = this.balances.get(from)!;
    const toWallet = this.balances.get(to)!;
    fromWallet.set(currency, fromBalance - amount);
    toWallet.set(currency, (toWallet.get(currency) ?? 0) + amount);
    this.ledger.push({ from, to, currency, amount, timestamp: Date.now(), description });
    return true;
  }

  getAllBalances(accountId: string): Record<string, number> {
    const wallet = this.balances.get(accountId);
    if (!wallet) return {};
    const result: Record<string, number> = {};
    for (const [k, v] of wallet) {
      result[k] = v;
    }
    return result;
  }

  transactionHistory(accountId: string): Transaction[] {
    return this.ledger.filter((t) => t.from === accountId || t.to === accountId);
  }

  totalSupply(currency: string): number {
    let total = 0;
    for (const wallet of this.balances.values()) {
      total += wallet.get(currency) ?? 0;
    }
    return total;
  }

  accountCount(): number {
    return this.balances.size;
  }

  currencyCount(): number {
    return this.currencies.size;
  }

  transactionCount(): number {
    return this.ledger.length;
  }

  richestAccount(currency: string): string | null {
    let best = "";
    let max = -1;
    for (const [id, wallet] of this.balances) {
      const bal = wallet.get(currency) ?? 0;
      if (bal > max) {
        max = bal;
        best = id;
      }
    }
    return max >= 0 ? best : null;
  }
}
