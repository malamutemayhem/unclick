export type FlameType = "propane" | "natural_gas" | "mapp" | "oxy_propane" | "oxy_natural";

export function workingTempCelsius(flame: FlameType): number {
  const temps: Record<FlameType, number> = {
    propane: 1000, natural_gas: 950, mapp: 1050, oxy_propane: 1300, oxy_natural: 1250,
  };
  return temps[flame];
}

export function annealingTempCelsius(flame: FlameType): number {
  const temps: Record<FlameType, number> = {
    propane: 510, natural_gas: 510, mapp: 510, oxy_propane: 520, oxy_natural: 520,
  };
  return temps[flame];
}

export function annealingTimeMinutes(beadDiameterMm: number): number {
  return Math.max(30, Math.round(beadDiameterMm * 3));
}

export function mandrelDiameterMm(beadHoleMm: number): number {
  return parseFloat((beadHoleMm - 0.5).toFixed(1));
}

export function beadReleaseCoats(): number {
  return 2;
}

export function gasConsumptionLPerHour(flame: FlameType): number {
  const rates: Record<FlameType, number> = {
    propane: 1.5, natural_gas: 2.0, mapp: 1.8, oxy_propane: 3.0, oxy_natural: 3.5,
  };
  return rates[flame];
}

export function ventilationCfm(): number {
  return 150;
}

export function beadWeightG(diameterMm: number): number {
  const radius = diameterMm / 2;
  return parseFloat(((4 / 3) * Math.PI * Math.pow(radius / 10, 3) * 2.5).toFixed(1));
}

export function costPerHour(flame: FlameType): number {
  const costs: Record<FlameType, number> = {
    propane: 3, natural_gas: 2, mapp: 5, oxy_propane: 8, oxy_natural: 7,
  };
  return costs[flame];
}

export function flameTypes(): FlameType[] {
  return ["propane", "natural_gas", "mapp", "oxy_propane", "oxy_natural"];
}
