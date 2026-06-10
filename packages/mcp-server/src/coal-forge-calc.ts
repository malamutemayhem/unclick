export type CoalType = "bituminous" | "anthracite" | "coke" | "charcoal" | "lignite";

export function btuPerPound(coal: CoalType): number {
  const btu: Record<CoalType, number> = {
    bituminous: 12000, anthracite: 14000, coke: 13000, charcoal: 9000, lignite: 7000,
  };
  return btu[coal];
}

export function maxTempCelsius(coal: CoalType): number {
  const temps: Record<CoalType, number> = {
    bituminous: 1500, anthracite: 1600, coke: 1650, charcoal: 1300, lignite: 1100,
  };
  return temps[coal];
}

export function ashPercent(coal: CoalType): number {
  const ash: Record<CoalType, number> = {
    bituminous: 8, anthracite: 10, coke: 3, charcoal: 2, lignite: 15,
  };
  return ash[coal];
}

export function sulfurPercent(coal: CoalType): number {
  const sulfur: Record<CoalType, number> = {
    bituminous: 2, anthracite: 0.5, coke: 0.3, charcoal: 0, lignite: 3,
  };
  return sulfur[coal];
}

export function airBlastCfm(firepotDiameterCm: number): number {
  return Math.round(firepotDiameterCm * 3);
}

export function consumptionKgPerHour(coal: CoalType): number {
  const rates: Record<CoalType, number> = {
    bituminous: 5, anthracite: 4, coke: 4.5, charcoal: 8, lignite: 7,
  };
  return rates[coal];
}

export function clinkerFormation(coal: CoalType): number {
  const ratings: Record<CoalType, number> = {
    bituminous: 4, anthracite: 2, coke: 1, charcoal: 0, lignite: 5,
  };
  return ratings[coal];
}

export function smokeLevel(coal: CoalType): number {
  const ratings: Record<CoalType, number> = {
    bituminous: 5, anthracite: 1, coke: 1, charcoal: 2, lignite: 5,
  };
  return ratings[coal];
}

export function costPerKg(coal: CoalType): number {
  const costs: Record<CoalType, number> = {
    bituminous: 0.3, anthracite: 0.5, coke: 0.6, charcoal: 1.0, lignite: 0.2,
  };
  return costs[coal];
}

export function coalTypes(): CoalType[] {
  return ["bituminous", "anthracite", "coke", "charcoal", "lignite"];
}
