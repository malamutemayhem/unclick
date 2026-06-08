export class Money {
  readonly cents: number;
  readonly currency: string;

  constructor(cents: number, currency = "USD") {
    this.cents = Math.round(cents);
    this.currency = currency;
  }

  static fromDollars(amount: number, currency = "USD"): Money {
    return new Money(Math.round(amount * 100), currency);
  }

  get dollars(): number {
    return this.cents / 100;
  }

  add(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.cents + other.cents, this.currency);
  }

  subtract(other: Money): Money {
    this.assertSameCurrency(other);
    return new Money(this.cents - other.cents, this.currency);
  }

  multiply(factor: number): Money {
    return new Money(Math.round(this.cents * factor), this.currency);
  }

  divide(divisor: number): Money {
    return new Money(Math.round(this.cents / divisor), this.currency);
  }

  equals(other: Money): boolean {
    return this.cents === other.cents && this.currency === other.currency;
  }

  isPositive(): boolean {
    return this.cents > 0;
  }

  isNegative(): boolean {
    return this.cents < 0;
  }

  isZero(): boolean {
    return this.cents === 0;
  }

  format(locale = "en-US"): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: this.currency,
    }).format(this.dollars);
  }

  toString(): string {
    return `${this.currency} ${this.dollars.toFixed(2)}`;
  }

  static sum(amounts: Money[]): Money {
    if (amounts.length === 0) return new Money(0);
    const currency = amounts[0].currency;
    const total = amounts.reduce((acc, m) => {
      if (m.currency !== currency) throw new Error("Currency mismatch");
      return acc + m.cents;
    }, 0);
    return new Money(total, currency);
  }

  private assertSameCurrency(other: Money): void {
    if (this.currency !== other.currency) throw new Error("Currency mismatch");
  }
}
