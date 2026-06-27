export interface AmortizationEntry {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalInterest: number;
  totalPrincipal: number;
}

export class AmortizationSchedule {
  private principal: number;
  private annualRate: number;
  private periods: number;
  private extraPayment: number;

  constructor(
    principal: number,
    annualRate: number,
    periods: number,
    extraPayment = 0,
  ) {
    this.principal = principal;
    this.annualRate = annualRate;
    this.periods = periods;
    this.extraPayment = extraPayment;
  }

  monthlyPayment(): number {
    const r = this.annualRate / 12;
    if (r === 0) return this.principal / this.periods;
    return (this.principal * r * Math.pow(1 + r, this.periods)) /
      (Math.pow(1 + r, this.periods) - 1);
  }

  totalPayment(): number {
    const schedule = this.generate();
    return schedule.reduce((sum, e) => sum + e.payment, 0);
  }

  totalInterest(): number {
    return this.totalPayment() - this.principal;
  }

  generate(): AmortizationEntry[] {
    const r = this.annualRate / 12;
    const payment = this.monthlyPayment();
    let balance = this.principal;
    let totalInterest = 0;
    let totalPrincipal = 0;
    const schedule: AmortizationEntry[] = [];

    for (let period = 1; period <= this.periods && balance > 0; period++) {
      const interest = balance * r;
      let principalPart = payment - interest + this.extraPayment;
      if (principalPart > balance) principalPart = balance;
      balance -= principalPart;
      totalInterest += interest;
      totalPrincipal += principalPart;
      const actualPayment = principalPart + interest;

      schedule.push({
        period,
        payment: actualPayment,
        principal: principalPart,
        interest,
        balance: Math.max(0, balance),
        totalInterest,
        totalPrincipal,
      });

      if (balance <= 0) break;
    }

    return schedule;
  }

  payoffPeriods(): number {
    return this.generate().length;
  }

  interestSaved(extraPayment: number): number {
    const withoutExtra = new AmortizationSchedule(
      this.principal,
      this.annualRate,
      this.periods,
      0,
    );
    const withExtra = new AmortizationSchedule(
      this.principal,
      this.annualRate,
      this.periods,
      extraPayment,
    );
    return withoutExtra.totalInterest() - withExtra.totalInterest();
  }

  static affordableAmount(
    monthlyBudget: number,
    annualRate: number,
    periods: number,
  ): number {
    const r = annualRate / 12;
    if (r === 0) return monthlyBudget * periods;
    return (monthlyBudget * (Math.pow(1 + r, periods) - 1)) /
      (r * Math.pow(1 + r, periods));
  }
}
