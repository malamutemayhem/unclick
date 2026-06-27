export class Money {
  readonly amount: number;
  readonly currency: string;

  constructor(amount: number, currency: string) {
    this.amount = Math.round(amount * 100) / 100;
    this.currency = currency.toUpperCase();
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount + other.amount, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.amount - other.amount, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(this.amount * factor, this.currency);
  }

  divide(divisor: number): Money {
    if (divisor === 0) throw new Error("Division by zero");
    return new Money(this.amount / divisor, this.currency);
  }

  equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }

  isZero(): boolean { return this.amount === 0; }
  isPositive(): boolean { return this.amount > 0; }
  isNegative(): boolean { return this.amount < 0; }

  abs(): Money { return new Money(Math.abs(this.amount), this.currency); }
  negate(): Money { return new Money(-this.amount, this.currency); }

  format(locale = "en-US"): string {
    return new Intl.NumberFormat(locale, { style: "currency", currency: this.currency }).format(this.amount);
  }

  toString(): string {
    return `${this.amount.toFixed(2)} ${this.currency}`;
  }

  allocate(ratios: number[]): Money[] {
    const total = ratios.reduce((a, b) => a + b, 0);
    const cents = Math.round(this.amount * 100);
    let remainder = cents;
    const results = ratios.map((ratio) => {
      const share = Math.floor((cents * ratio) / total);
      remainder -= share;
      return share;
    });
    for (let i = 0; remainder > 0; i++) {
      results[i % results.length]++;
      remainder--;
    }
    return results.map((c) => new Money(c / 100, this.currency));
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) throw new Error(`Currency mismatch: ${this.currency} vs ${other.currency}`);
  }
}

export function money(amount: number, currency: string): Money {
  return new Money(amount, currency);
}
