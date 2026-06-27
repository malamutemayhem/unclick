export interface PayrollInput {
  grossPay: number;
  federalTaxRate: number;
  stateTaxRate: number;
  socialSecurityRate: number;
  medicareRate: number;
  retirement401k: number;
  healthInsurance: number;
  otherDeductions: number;
}

export interface PayrollResult {
  grossPay: number;
  federalTax: number;
  stateTax: number;
  socialSecurity: number;
  medicare: number;
  retirement401k: number;
  healthInsurance: number;
  otherDeductions: number;
  totalDeductions: number;
  netPay: number;
}

export function computePayroll(input: PayrollInput): PayrollResult {
  const federalTax = round2(input.grossPay * input.federalTaxRate);
  const stateTax = round2(input.grossPay * input.stateTaxRate);
  const socialSecurity = round2(input.grossPay * input.socialSecurityRate);
  const medicare = round2(input.grossPay * input.medicareRate);
  const totalDeductions = round2(
    federalTax + stateTax + socialSecurity + medicare
    + input.retirement401k + input.healthInsurance + input.otherDeductions
  );

  return {
    grossPay: input.grossPay,
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    retirement401k: input.retirement401k,
    healthInsurance: input.healthInsurance,
    otherDeductions: input.otherDeductions,
    totalDeductions,
    netPay: round2(input.grossPay - totalDeductions),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

export function annualFromBiweekly(amount: number): number {
  return round2(amount * 26);
}

export function annualFromMonthly(amount: number): number {
  return round2(amount * 12);
}

export function biweeklyFromAnnual(annual: number): number {
  return round2(annual / 26);
}

export function monthlyFromAnnual(annual: number): number {
  return round2(annual / 12);
}

export function weeklyFromAnnual(annual: number): number {
  return round2(annual / 52);
}

export function hourlyFromAnnual(annual: number, hoursPerWeek = 40): number {
  return round2(annual / (52 * hoursPerWeek));
}

export function annualFromHourly(hourly: number, hoursPerWeek = 40): number {
  return round2(hourly * hoursPerWeek * 52);
}

export function overtime(hoursWorked: number, regularRate: number, overtimeMultiplier = 1.5, regularHours = 40): {
  regularPay: number;
  overtimePay: number;
  totalPay: number;
  overtimeHours: number;
} {
  const otHours = Math.max(0, hoursWorked - regularHours);
  const regHours = hoursWorked - otHours;
  const regularPay = round2(regHours * regularRate);
  const overtimePay = round2(otHours * regularRate * overtimeMultiplier);

  return {
    regularPay,
    overtimePay,
    totalPay: round2(regularPay + overtimePay),
    overtimeHours: otHours,
  };
}

export function employerCost(grossPay: number, employerSSRate = 0.062, employerMedicareRate = 0.0145, otherEmployerCosts = 0): number {
  return round2(
    grossPay + grossPay * employerSSRate + grossPay * employerMedicareRate + otherEmployerCosts
  );
}

export function takeHomePercent(netPay: number, grossPay: number): number {
  if (grossPay === 0) return 0;
  return round2((netPay / grossPay) * 100);
}

export function raiseImpact(
  currentGross: number,
  raisePercent: number,
  federalRate: number,
  stateRate: number
): { newGross: number; grossIncrease: number; netIncrease: number; effectiveTaxOnRaise: number } {
  const newGross = round2(currentGross * (1 + raisePercent));
  const grossIncrease = round2(newGross - currentGross);
  const taxOnIncrease = round2(grossIncrease * (federalRate + stateRate + 0.0765));
  const netIncrease = round2(grossIncrease - taxOnIncrease);

  return {
    newGross,
    grossIncrease,
    netIncrease,
    effectiveTaxOnRaise: grossIncrease > 0 ? round2(taxOnIncrease / grossIncrease * 100) : 0,
  };
}

export function bonus(amount: number, supplementalRate = 0.22): { gross: number; tax: number; net: number } {
  const tax = round2(amount * supplementalRate);
  return { gross: amount, tax, net: round2(amount - tax) };
}
