export type InvestmentVehicle = "stocks" | "bonds" | "real_estate" | "etf" | "cryptocurrency";

export function avgReturnPercent(i: InvestmentVehicle): number {
  const m: Record<InvestmentVehicle, number> = {
    stocks: 10, bonds: 4, real_estate: 8, etf: 9, cryptocurrency: 15,
  };
  return m[i];
}

export function volatility(i: InvestmentVehicle): number {
  const m: Record<InvestmentVehicle, number> = {
    stocks: 7, bonds: 2, real_estate: 4, etf: 6, cryptocurrency: 10,
  };
  return m[i];
}

export function liquidity(i: InvestmentVehicle): number {
  const m: Record<InvestmentVehicle, number> = {
    stocks: 9, bonds: 7, real_estate: 2, etf: 10, cryptocurrency: 8,
  };
  return m[i];
}

export function minInvestmentBarrier(i: InvestmentVehicle): number {
  const m: Record<InvestmentVehicle, number> = {
    stocks: 3, bonds: 5, real_estate: 10, etf: 1, cryptocurrency: 1,
  };
  return m[i];
}

export function diversificationBenefit(i: InvestmentVehicle): number {
  const m: Record<InvestmentVehicle, number> = {
    stocks: 5, bonds: 6, real_estate: 7, etf: 10, cryptocurrency: 3,
  };
  return m[i];
}

export function passiveIncome(i: InvestmentVehicle): boolean {
  const m: Record<InvestmentVehicle, boolean> = {
    stocks: true, bonds: true, real_estate: true, etf: true, cryptocurrency: false,
  };
  return m[i];
}

export function regulated(i: InvestmentVehicle): boolean {
  const m: Record<InvestmentVehicle, boolean> = {
    stocks: true, bonds: true, real_estate: true, etf: true, cryptocurrency: false,
  };
  return m[i];
}

export function incomeType(i: InvestmentVehicle): string {
  const m: Record<InvestmentVehicle, string> = {
    stocks: "dividends", bonds: "coupon_payments", real_estate: "rental_income",
    etf: "distributions", cryptocurrency: "capital_appreciation",
  };
  return m[i];
}

export function bestTimeHorizon(i: InvestmentVehicle): string {
  const m: Record<InvestmentVehicle, string> = {
    stocks: "long_term", bonds: "medium_term", real_estate: "very_long_term",
    etf: "any_horizon", cryptocurrency: "speculative",
  };
  return m[i];
}

export function investmentVehicles(): InvestmentVehicle[] {
  return ["stocks", "bonds", "real_estate", "etf", "cryptocurrency"];
}
