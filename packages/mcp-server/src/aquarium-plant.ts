export type PlantType = "stem" | "rosette" | "rhizome" | "carpet" | "floating" | "moss";
export type LightLevel = "low" | "medium" | "high";

export function lightPar(level: LightLevel): { min: number; max: number } {
  const ranges: Record<LightLevel, { min: number; max: number }> = {
    low: { min: 15, max: 30 },
    medium: { min: 30, max: 80 },
    high: { min: 80, max: 150 },
  };
  return ranges[level];
}

export function photoperiod(level: LightLevel): number {
  const hours: Record<LightLevel, number> = { low: 8, medium: 10, high: 10 };
  return hours[level];
}

export function co2Needed(level: LightLevel): boolean {
  return level === "high";
}

export function co2BubbleRate(tankLiters: number): number {
  return Math.round(tankLiters / 30);
}

export function substrateDepth(plantType: PlantType): number {
  const cm: Record<PlantType, number> = {
    stem: 5, rosette: 7, rhizome: 0, carpet: 3, floating: 0, moss: 0,
  };
  return cm[plantType];
}

export function fertilizerDose(tankLiters: number, plantLoad: "light" | "moderate" | "heavy"): number {
  const mlPer50L: Record<string, number> = { light: 2, moderate: 5, heavy: 10 };
  return parseFloat((tankLiters / 50 * mlPer50L[plantLoad]).toFixed(1));
}

export function trimInterval(plantType: PlantType): number {
  const weeks: Record<PlantType, number> = {
    stem: 2, rosette: 6, rhizome: 8, carpet: 3, floating: 1, moss: 4,
  };
  return weeks[plantType];
}

export function plantsNeeded(areaCm2: number, spacingCm: number): number {
  if (spacingCm === 0) return 0;
  return Math.ceil(areaCm2 / (spacingCm ** 2));
}

export function growthRate(plantType: PlantType): string {
  const rates: Record<PlantType, string> = {
    stem: "fast", rosette: "slow", rhizome: "slow", carpet: "medium", floating: "fast", moss: "slow",
  };
  return rates[plantType];
}

export function waterChange(plantLoad: "light" | "moderate" | "heavy"): number {
  const pct: Record<string, number> = { light: 20, moderate: 30, heavy: 50 };
  return pct[plantLoad];
}

export function ironDose(tankLiters: number): number {
  return parseFloat((tankLiters * 0.01).toFixed(2));
}

export function algaeRisk(lightHours: number, co2: boolean, nutrients: "balanced" | "excess" | "deficient"): string {
  if (lightHours > 10 && !co2) return "high";
  if (nutrients === "excess") return "high";
  if (nutrients === "deficient" && lightHours > 8) return "medium";
  return "low";
}

export function plantTypes(): PlantType[] {
  return ["stem", "rosette", "rhizome", "carpet", "floating", "moss"];
}
