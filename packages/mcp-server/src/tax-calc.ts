export interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface TaxResult {
  grossIncome: number;
  taxableIncome: number;
  totalTax: number;
  effectiveRate: number;
  marginalRate: number;
  netIncome: number;
  breakdown: Array<{ bracket: TaxBracket; taxAmount: number }>;
}

export class ProgressiveTaxCalculator {
  private brackets: TaxBracket[];

  constructor(brackets: TaxBracket[]) {
    this.brackets = [...brackets].sort((a, b) => a.min - b.min);
  }

  calculate(grossIncome: number, deductions = 0): TaxResult {
    const taxableIncome = Math.max(0, grossIncome - deductions);
    let totalTax = 0;
    let marginalRate = 0;
    const breakdown: Array<{ bracket: TaxBracket; taxAmount: number }> = [];

    for (const bracket of this.brackets) {
      if (taxableIncome <= bracket.min) break;
      const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
      const taxAmount = taxableInBracket * bracket.rate;
      totalTax += taxAmount;
      marginalRate = bracket.rate;
      breakdown.push({ bracket, taxAmount });
    }

    return {
      grossIncome,
      taxableIncome,
      totalTax,
      effectiveRate: taxableIncome > 0 ? totalTax / taxableIncome : 0,
      marginalRate,
      netIncome: grossIncome - totalTax,
      breakdown,
    };
  }

  getBrackets(): TaxBracket[] {
    return [...this.brackets];
  }

  bracketCount(): number {
    return this.brackets.length;
  }
}

export class FlatTaxCalculator {
  private rate: number;
  private exemption: number;

  constructor(rate: number, exemption = 0) {
    this.rate = rate;
    this.exemption = exemption;
  }

  calculate(income: number): { tax: number; netIncome: number; effectiveRate: number } {
    const taxable = Math.max(0, income - this.exemption);
    const tax = taxable * this.rate;
    return {
      tax,
      netIncome: income - tax,
      effectiveRate: income > 0 ? tax / income : 0,
    };
  }

  getRate(): number {
    return this.rate;
  }
}

export class SalesTaxCalculator {
  private rates: Map<string, number> = new Map();

  addRegion(name: string, rate: number): void {
    this.rates.set(name, rate);
  }

  calculate(
    amount: number,
    region: string,
  ): { subtotal: number; tax: number; total: number; rate: number } | null {
    const rate = this.rates.get(region);
    if (rate === undefined) return null;
    const tax = amount * rate;
    return { subtotal: amount, tax, total: amount + tax, rate };
  }

  regionCount(): number {
    return this.rates.size;
  }

  compareRegions(amount: number): Array<{ region: string; tax: number; total: number }> {
    const results: Array<{ region: string; tax: number; total: number }> = [];
    for (const [region, rate] of this.rates) {
      const tax = amount * rate;
      results.push({ region, tax, total: amount + tax });
    }
    return results.sort((a, b) => a.tax - b.tax);
  }
}
