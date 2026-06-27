export type MarketStructure = "perfect_competition" | "monopoly" | "oligopoly" | "monopolistic_competition" | "monopsony";

export function numFirms(m_: MarketStructure): number {
  const m: Record<MarketStructure, number> = {
    perfect_competition: 10000, monopoly: 1, oligopoly: 5, monopolistic_competition: 500, monopsony: 100,
  };
  return m[m_];
}

export function priceControlPower(m_: MarketStructure): number {
  const m: Record<MarketStructure, number> = {
    perfect_competition: 0, monopoly: 10, oligopoly: 7, monopolistic_competition: 3, monopsony: 8,
  };
  return m[m_];
}

export function barriersToEntry(m_: MarketStructure): number {
  const m: Record<MarketStructure, number> = {
    perfect_competition: 0, monopoly: 10, oligopoly: 8, monopolistic_competition: 2, monopsony: 5,
  };
  return m[m_];
}

export function productDifferentiation(m_: MarketStructure): number {
  const m: Record<MarketStructure, number> = {
    perfect_competition: 0, monopoly: 0, oligopoly: 5, monopolistic_competition: 8, monopsony: 3,
  };
  return m[m_];
}

export function consumerSurplus(m_: MarketStructure): number {
  const m: Record<MarketStructure, number> = {
    perfect_competition: 10, monopoly: 2, oligopoly: 5, monopolistic_competition: 7, monopsony: 4,
  };
  return m[m_];
}

export function priceTaker(m_: MarketStructure): boolean {
  const m: Record<MarketStructure, boolean> = {
    perfect_competition: true, monopoly: false, oligopoly: false, monopolistic_competition: false, monopsony: false,
  };
  return m[m_];
}

export function requiresRegulation(m_: MarketStructure): boolean {
  const m: Record<MarketStructure, boolean> = {
    perfect_competition: false, monopoly: true, oligopoly: true, monopolistic_competition: false, monopsony: true,
  };
  return m[m_];
}

export function realWorldExample(m_: MarketStructure): string {
  const m: Record<MarketStructure, string> = {
    perfect_competition: "agricultural_commodities", monopoly: "utility_companies",
    oligopoly: "airline_industry", monopolistic_competition: "restaurants",
    monopsony: "defense_contracting",
  };
  return m[m_];
}

export function efficiencyType(m_: MarketStructure): string {
  const m: Record<MarketStructure, string> = {
    perfect_competition: "allocatively_efficient", monopoly: "deadweight_loss",
    oligopoly: "interdependent_pricing", monopolistic_competition: "excess_capacity",
    monopsony: "buyer_exploitation",
  };
  return m[m_];
}

export function marketStructures(): MarketStructure[] {
  return ["perfect_competition", "monopoly", "oligopoly", "monopolistic_competition", "monopsony"];
}
