export interface Bracket {
  min: number;
  max: number;
  rate: number;
}

export interface TaxResult {
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  marginalRate: number;
  bracketBreakdown: BracketDetail[];
}

export interface BracketDetail {
  bracket: Bracket;
  taxableInBracket: number;
  taxInBracket: number;
}

export function computeTax(income: number, brackets: Bracket[]): TaxResult {
  const sorted = [...brackets].sort((a, b) => a.min - b.min);
  const breakdown: BracketDetail[] = [];
  let totalTax = 0;
  let marginalRate = 0;

  for (const bracket of sorted) {
    if (income <= bracket.min) break;
    const taxable = Math.min(income, bracket.max) - bracket.min;
    const tax = taxable * bracket.rate;
    totalTax += tax;
    marginalRate = bracket.rate;
    breakdown.push({ bracket, taxableInBracket: taxable, taxInBracket: tax });
  }

  return {
    taxableIncome: income,
    totalTax,
    effectiveRate: income > 0 ? totalTax / income : 0,
    marginalRate,
    bracketBreakdown: breakdown,
  };
}

export function afterTaxIncome(income: number, brackets: Bracket[]): number {
  return income - computeTax(income, brackets).totalTax;
}

export function marginalRate(income: number, brackets: Bracket[]): number {
  const sorted = [...brackets].sort((a, b) => a.min - b.min);
  for (let i = sorted.length - 1; i >= 0; i--) {
    if (income > sorted[i].min) return sorted[i].rate;
  }
  return 0;
}

export function taxOnNextDollar(income: number, brackets: Bracket[]): number {
  return marginalRate(income, brackets);
}

export function findIncomeForTax(targetTax: number, brackets: Bracket[]): number {
  const sorted = [...brackets].sort((a, b) => a.min - b.min);
  let remaining = targetTax;
  let income = 0;

  for (const bracket of sorted) {
    const bracketWidth = bracket.max - bracket.min;
    const maxTaxInBracket = bracketWidth * bracket.rate;

    if (remaining <= maxTaxInBracket) {
      income = bracket.min + remaining / bracket.rate;
      return income;
    }

    remaining -= maxTaxInBracket;
    income = bracket.max;
  }

  return income;
}

export function compareBrackets(
  income: number,
  brackets1: Bracket[],
  brackets2: Bracket[]
): { tax1: number; tax2: number; difference: number } {
  const tax1 = computeTax(income, brackets1).totalTax;
  const tax2 = computeTax(income, brackets2).totalTax;
  return { tax1, tax2, difference: tax2 - tax1 };
}

export const US_2024_SINGLE: Bracket[] = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

export const US_2024_MARRIED: Bracket[] = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

export const AU_2024: Bracket[] = [
  { min: 0, max: 18200, rate: 0 },
  { min: 18200, max: 45000, rate: 0.19 },
  { min: 45000, max: 120000, rate: 0.325 },
  { min: 120000, max: 180000, rate: 0.37 },
  { min: 180000, max: Infinity, rate: 0.45 },
];

export function withStandardDeduction(income: number, deduction: number, brackets: Bracket[]): TaxResult {
  return computeTax(Math.max(0, income - deduction), brackets);
}

export function formatBreakdown(result: TaxResult): string {
  const lines = result.bracketBreakdown.map(d => {
    const pct = (d.bracket.rate * 100).toFixed(0);
    return `${pct}%: $${d.taxableInBracket.toFixed(2)} -> $${d.taxInBracket.toFixed(2)}`;
  });
  lines.push(`Total Tax: $${result.totalTax.toFixed(2)}`);
  lines.push(`Effective Rate: ${(result.effectiveRate * 100).toFixed(1)}%`);
  return lines.join("\n");
}
