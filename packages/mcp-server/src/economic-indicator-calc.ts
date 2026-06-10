export type EconomicIndicator = "gdp" | "cpi" | "unemployment_rate" | "pmi" | "yield_curve";

export function publicAwareness(e: EconomicIndicator): number {
  const m: Record<EconomicIndicator, number> = {
    gdp: 10, cpi: 8, unemployment_rate: 9, pmi: 3, yield_curve: 4,
  };
  return m[e];
}

export function releaseFrequencyDays(e: EconomicIndicator): number {
  const m: Record<EconomicIndicator, number> = {
    gdp: 90, cpi: 30, unemployment_rate: 30, pmi: 30, yield_curve: 1,
  };
  return m[e];
}

export function marketImpact(e: EconomicIndicator): number {
  const m: Record<EconomicIndicator, number> = {
    gdp: 8, cpi: 9, unemployment_rate: 8, pmi: 6, yield_curve: 10,
  };
  return m[e];
}

export function forecastAccuracy(e: EconomicIndicator): number {
  const m: Record<EconomicIndicator, number> = {
    gdp: 6, cpi: 7, unemployment_rate: 5, pmi: 8, yield_curve: 9,
  };
  return m[e];
}

export function policyRelevance(e: EconomicIndicator): number {
  const m: Record<EconomicIndicator, number> = {
    gdp: 10, cpi: 9, unemployment_rate: 8, pmi: 5, yield_curve: 7,
  };
  return m[e];
}

export function leadingIndicator(e: EconomicIndicator): boolean {
  const m: Record<EconomicIndicator, boolean> = {
    gdp: false, cpi: false, unemployment_rate: false, pmi: true, yield_curve: true,
  };
  return m[e];
}

export function surveyBased(e: EconomicIndicator): boolean {
  const m: Record<EconomicIndicator, boolean> = {
    gdp: false, cpi: false, unemployment_rate: true, pmi: true, yield_curve: false,
  };
  return m[e];
}

export function measuredBy(e: EconomicIndicator): string {
  const m: Record<EconomicIndicator, string> = {
    gdp: "statistical_office", cpi: "labor_bureau", unemployment_rate: "labor_bureau",
    pmi: "private_survey", yield_curve: "treasury_market",
  };
  return m[e];
}

export function unitOfMeasure(e: EconomicIndicator): string {
  const m: Record<EconomicIndicator, string> = {
    gdp: "currency_value", cpi: "index_points", unemployment_rate: "percentage",
    pmi: "diffusion_index", yield_curve: "basis_points",
  };
  return m[e];
}

export function economicIndicators(): EconomicIndicator[] {
  return ["gdp", "cpi", "unemployment_rate", "pmi", "yield_curve"];
}
