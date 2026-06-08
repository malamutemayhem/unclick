export interface AmortizationEntry {
  period: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalInterest: number;
}

export class AmortizationCalc {
  static schedule(
    principal: number,
    annualRate: number,
    periods: number,
  ): AmortizationEntry[] {
    const monthlyRate = annualRate / 12 / 100;
    const payment = AmortizationCalc.payment(principal, annualRate, periods);
    const entries: AmortizationEntry[] = [];
    let balance = principal;
    let totalInterest = 0;

    for (let p = 1; p <= periods; p++) {
      const interest = balance * monthlyRate;
      const principalPaid = payment - interest;
      balance -= principalPaid;
      totalInterest += interest;
      entries.push({
        period: p,
        payment: Math.round(payment * 100) / 100,
        principal: Math.round(principalPaid * 100) / 100,
        interest: Math.round(interest * 100) / 100,
        balance: Math.round(Math.max(0, balance) * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
      });
    }
    return entries;
  }

  static payment(principal: number, annualRate: number, periods: number): number {
    const monthlyRate = annualRate / 12 / 100;
    if (monthlyRate === 0) return Math.round((principal / periods) * 100) / 100;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, periods)) /
      (Math.pow(1 + monthlyRate, periods) - 1);
    return Math.round(payment * 100) / 100;
  }

  static totalInterest(principal: number, annualRate: number, periods: number): number {
    const payment = AmortizationCalc.payment(principal, annualRate, periods);
    return Math.round((payment * periods - principal) * 100) / 100;
  }

  static totalCost(principal: number, annualRate: number, periods: number): number {
    const payment = AmortizationCalc.payment(principal, annualRate, periods);
    return Math.round(payment * periods * 100) / 100;
  }

  static extraPaymentSavings(
    principal: number,
    annualRate: number,
    periods: number,
    extraMonthly: number,
  ): { periodsSaved: number; interestSaved: number } {
    const normalInterest = AmortizationCalc.totalInterest(principal, annualRate, periods);
    const monthlyRate = annualRate / 12 / 100;
    const basePayment = AmortizationCalc.payment(principal, annualRate, periods);
    let balance = principal;
    let totalInterest = 0;
    let p = 0;

    while (balance > 0 && p < periods) {
      const interest = balance * monthlyRate;
      const totalPayment = Math.min(basePayment + extraMonthly, balance + interest);
      const principalPaid = totalPayment - interest;
      balance -= principalPaid;
      totalInterest += interest;
      p++;
    }

    return {
      periodsSaved: periods - p,
      interestSaved: Math.round((normalInterest - totalInterest) * 100) / 100,
    };
  }

  static affordability(
    monthlyIncome: number,
    annualRate: number,
    periods: number,
    maxDtiRatio: number = 0.28,
  ): number {
    const maxPayment = monthlyIncome * maxDtiRatio;
    const monthlyRate = annualRate / 12 / 100;
    if (monthlyRate === 0) return Math.round(maxPayment * periods * 100) / 100;
    const maxPrincipal = maxPayment *
      (Math.pow(1 + monthlyRate, periods) - 1) /
      (monthlyRate * Math.pow(1 + monthlyRate, periods));
    return Math.round(maxPrincipal * 100) / 100;
  }

  static balanceAt(principal: number, annualRate: number, periods: number, atPeriod: number): number {
    const schedule = AmortizationCalc.schedule(principal, annualRate, Math.min(periods, atPeriod));
    return schedule.length > 0 ? schedule[schedule.length - 1].balance : principal;
  }
}
