export type FeederType = "tube" | "hopper" | "platform" | "suet" | "hummingbird" | "nyjer";
export type SeedType = "sunflower" | "safflower" | "nyjer" | "millet" | "peanut" | "suet";

export function feederCapacity(type: FeederType): number {
  const cupsMap: Record<FeederType, number> = {
    tube: 4, hopper: 8, platform: 6, suet: 2, hummingbird: 2, nyjer: 3,
  };
  return cupsMap[type];
}

export function refillDays(capacityCups: number, birdsPerDay: number, cupsPerBird: number = 0.05): number {
  if (birdsPerDay === 0 || cupsPerBird === 0) return Infinity;
  return parseFloat((capacityCups / (birdsPerDay * cupsPerBird)).toFixed(1));
}

export function seedCost(poundsNeeded: number, pricePerPound: number): number {
  return parseFloat((poundsNeeded * pricePerPound).toFixed(2));
}

export function monthlySeedPounds(birdsPerDay: number, cupsPerBird: number = 0.05): number {
  return parseFloat((birdsPerDay * cupsPerBird * 30 * 0.3).toFixed(1));
}

export function bestSeed(feederType: FeederType): SeedType {
  const best: Record<FeederType, SeedType> = {
    tube: "sunflower", hopper: "sunflower", platform: "millet",
    suet: "suet", hummingbird: "sunflower", nyjer: "nyjer",
  };
  return best[feederType];
}

export function squirrelBaffle(poleDiameterInch: number): number {
  return parseFloat((poleDiameterInch + 16).toFixed(0));
}

export function mountingHeight(feederType: FeederType): number {
  const feetMap: Record<FeederType, number> = {
    tube: 5, hopper: 5, platform: 3, suet: 5, hummingbird: 4, nyjer: 5,
  };
  return feetMap[feederType];
}

export function cleaningInterval(feederType: FeederType): number {
  const days: Record<FeederType, number> = {
    tube: 14, hopper: 14, platform: 3, suet: 7, hummingbird: 3, nyjer: 14,
  };
  return days[feederType];
}

export function nectarRecipe(cupsWater: number): { sugarCups: number; totalCups: number } {
  return {
    sugarCups: parseFloat((cupsWater / 4).toFixed(2)),
    totalCups: parseFloat((cupsWater + cupsWater / 4).toFixed(2)),
  };
}

export function windowStrikeRisk(distanceFt: number): string {
  if (distanceFt < 3) return "low (too close for speed)";
  if (distanceFt < 15) return "high (danger zone)";
  return "low (birds slow down)";
}

export function speciesAttracted(seed: SeedType): number {
  const counts: Record<SeedType, number> = {
    sunflower: 40, safflower: 15, nyjer: 8, millet: 25, peanut: 20, suet: 30,
  };
  return counts[seed];
}

export function annualCost(birdsPerDay: number, pricePerPound: number): number {
  const monthlyLbs = monthlySeedPounds(birdsPerDay);
  return parseFloat((monthlyLbs * 12 * pricePerPound).toFixed(2));
}

export function feederTypes(): FeederType[] {
  return ["tube", "hopper", "platform", "suet", "hummingbird", "nyjer"];
}
