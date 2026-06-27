export type TaxType = "income" | "capital_gains" | "sales" | "property" | "excise";

export function revenueContribution(t: TaxType): number {
  const m: Record<TaxType, number> = {
    income: 10, capital_gains: 5, sales: 7, property: 6, excise: 3,
  };
  return m[t];
}

export function administrativeComplexity(t: TaxType): number {
  const m: Record<TaxType, number> = {
    income: 9, capital_gains: 8, sales: 4, property: 6, excise: 3,
  };
  return m[t];
}

export function complianceCost(t: TaxType): number {
  const m: Record<TaxType, number> = {
    income: 9, capital_gains: 7, sales: 3, property: 5, excise: 2,
  };
  return m[t];
}

export function economicDistortion(t: TaxType): number {
  const m: Record<TaxType, number> = {
    income: 7, capital_gains: 8, sales: 5, property: 3, excise: 6,
  };
  return m[t];
}

export function progressivity(t: TaxType): number {
  const m: Record<TaxType, number> = {
    income: 9, capital_gains: 7, sales: 2, property: 4, excise: 1,
  };
  return m[t];
}

export function progressive(t: TaxType): boolean {
  const m: Record<TaxType, boolean> = {
    income: true, capital_gains: true, sales: false, property: false, excise: false,
  };
  return m[t];
}

export function collectedAtPoint(t: TaxType): boolean {
  const m: Record<TaxType, boolean> = {
    income: false, capital_gains: false, sales: true, property: false, excise: true,
  };
  return m[t];
}

export function taxBase(t: TaxType): string {
  const m: Record<TaxType, string> = {
    income: "earned_income", capital_gains: "asset_appreciation",
    sales: "consumption", property: "real_estate_value",
    excise: "specific_goods",
  };
  return m[t];
}

export function collectionFrequency(t: TaxType): string {
  const m: Record<TaxType, string> = {
    income: "annual", capital_gains: "annual", sales: "per_transaction",
    property: "annual", excise: "per_transaction",
  };
  return m[t];
}

export function taxTypes(): TaxType[] {
  return ["income", "capital_gains", "sales", "property", "excise"];
}
