export type CureMethod = "dry_cure" | "wet_brine" | "equilibrium" | "sugar_cure" | "nitrate_cure";

export function saltPercentByWeight(method: CureMethod): number {
  const pcts: Record<CureMethod, number> = {
    dry_cure: 3.5, wet_brine: 6, equilibrium: 2.5, sugar_cure: 2, nitrate_cure: 3,
  };
  return pcts[method];
}

export function curingDaysPerKg(method: CureMethod): number {
  const days: Record<CureMethod, number> = {
    dry_cure: 7, wet_brine: 5, equilibrium: 10, sugar_cure: 8, nitrate_cure: 6,
  };
  return days[method];
}

export function tempCelsius(method: CureMethod): number {
  const temps: Record<CureMethod, number> = {
    dry_cure: 4, wet_brine: 3, equilibrium: 3, sugar_cure: 4, nitrate_cure: 3,
  };
  return temps[method];
}

export function moistureLossPercent(method: CureMethod): number {
  const loss: Record<CureMethod, number> = {
    dry_cure: 35, wet_brine: 10, equilibrium: 25, sugar_cure: 20, nitrate_cure: 30,
  };
  return loss[method];
}

export function shelfLifeWeeks(method: CureMethod): number {
  const weeks: Record<CureMethod, number> = {
    dry_cure: 12, wet_brine: 4, equilibrium: 8, sugar_cure: 6, nitrate_cure: 16,
  };
  return weeks[method];
}

export function flavorIntensity(method: CureMethod): number {
  const intensity: Record<CureMethod, number> = {
    dry_cure: 5, wet_brine: 3, equilibrium: 4, sugar_cure: 3, nitrate_cure: 4,
  };
  return intensity[method];
}

export function evenDistribution(method: CureMethod): number {
  const even: Record<CureMethod, number> = {
    dry_cure: 3, wet_brine: 5, equilibrium: 5, sugar_cure: 3, nitrate_cure: 4,
  };
  return even[method];
}

export function beginnerFriendly(method: CureMethod): boolean {
  return method === "wet_brine" || method === "equilibrium";
}

export function costPerKg(method: CureMethod): number {
  const costs: Record<CureMethod, number> = {
    dry_cure: 2, wet_brine: 1.5, equilibrium: 2, sugar_cure: 3, nitrate_cure: 2.5,
  };
  return costs[method];
}

export function cureMethods(): CureMethod[] {
  return ["dry_cure", "wet_brine", "equilibrium", "sugar_cure", "nitrate_cure"];
}
