export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalInterest: number;
  totalPrincipal: number;
}

export interface LoanSummary {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  schedule: AmortizationRow[];
}

export function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 12;
  return principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1);
}

export function amortize(principal: number, annualRate: number, months: number, extraPayment = 0): LoanSummary {
  const payment = monthlyPayment(principal, annualRate, months);
  const schedule: AmortizationRow[] = [];
  let balance = principal;
  let totalInterest = 0;
  let totalPrincipal = 0;

  for (let m = 1; m <= months && balance > 0; m++) {
    const interest = balance * annualRate / 12;
    let principalPart = payment - interest + extraPayment;
    if (principalPart > balance) principalPart = balance;
    balance = Math.max(0, balance - principalPart);
    totalInterest += interest;
    totalPrincipal += principalPart;

    schedule.push({
      month: m,
      payment: round2(principalPart + interest),
      principal: round2(principalPart),
      interest: round2(interest),
      balance: round2(balance),
      totalInterest: round2(totalInterest),
      totalPrincipal: round2(totalPrincipal),
    });

    if (balance <= 0) break;
  }

  return {
    monthlyPayment: round2(payment),
    totalPayment: round2(totalPrincipal + totalInterest),
    totalInterest: round2(totalInterest),
    schedule,
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function totalInterest(principal: number, annualRate: number, months: number): number {
  const payment = monthlyPayment(principal, annualRate, months);
  return round2(payment * months - principal);
}

export function affordablePrice(monthlyBudget: number, annualRate: number, months: number, downPayment = 0): number {
  if (annualRate === 0) return round2(monthlyBudget * months + downPayment);
  const r = annualRate / 12;
  const loanAmount = monthlyBudget * (Math.pow(1 + r, months) - 1) / (r * Math.pow(1 + r, months));
  return round2(loanAmount + downPayment);
}

export function remainingBalance(principal: number, annualRate: number, months: number, paymentsElapsed: number): number {
  if (annualRate === 0) return round2(principal * (1 - paymentsElapsed / months));
  const r = annualRate / 12;
  const payment = monthlyPayment(principal, annualRate, months);
  const balance = principal * Math.pow(1 + r, paymentsElapsed) - payment * (Math.pow(1 + r, paymentsElapsed) - 1) / r;
  return round2(Math.max(0, balance));
}

export function payoffMonths(principal: number, annualRate: number, payment: number): number {
  if (annualRate === 0) return Math.ceil(principal / payment);
  const r = annualRate / 12;
  if (payment <= principal * r) return Infinity;
  return Math.ceil(-Math.log(1 - principal * r / payment) / Math.log(1 + r));
}

export function refinanceSavings(
  currentBalance: number,
  currentRate: number,
  currentRemainingMonths: number,
  newRate: number,
  newTermMonths: number,
  closingCosts = 0
): { monthlySavings: number; totalSavings: number; breakEvenMonths: number } {
  const currentPayment = monthlyPayment(currentBalance, currentRate, currentRemainingMonths);
  const newPayment = monthlyPayment(currentBalance, newRate, newTermMonths);
  const monthlySavings = round2(currentPayment - newPayment);
  const currentTotal = currentPayment * currentRemainingMonths;
  const newTotal = newPayment * newTermMonths + closingCosts;
  const totalSavings = round2(currentTotal - newTotal);
  const breakEvenMonths = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : Infinity;

  return { monthlySavings, totalSavings, breakEvenMonths };
}

export function extraPaymentImpact(principal: number, annualRate: number, months: number, extraMonthly: number): {
  originalMonths: number;
  newMonths: number;
  monthsSaved: number;
  interestSaved: number;
} {
  const original = amortize(principal, annualRate, months);
  const withExtra = amortize(principal, annualRate, months, extraMonthly);

  return {
    originalMonths: original.schedule.length,
    newMonths: withExtra.schedule.length,
    monthsSaved: original.schedule.length - withExtra.schedule.length,
    interestSaved: round2(original.totalInterest - withExtra.totalInterest),
  };
}

export function loanToValue(loanAmount: number, propertyValue: number): number {
  if (propertyValue === 0) return 0;
  return round2(loanAmount / propertyValue * 100);
}

export function debtToIncome(monthlyDebt: number, monthlyIncome: number): number {
  if (monthlyIncome === 0) return 0;
  return round2(monthlyDebt / monthlyIncome * 100);
}
