export type HiveType = "langstroth" | "top_bar" | "warre" | "flow";
export type Season = "spring" | "summer" | "autumn" | "winter";

export interface HiveSpec {
  type: HiveType;
  frames: number;
  supers: number;
  colonies: number;
}

const FRAME_HONEY_KG: Record<HiveType, number> = {
  langstroth: 2.3,
  top_bar: 1.5,
  warre: 1.8,
  flow: 3.0,
};

export function honeyPerFrame(hiveType: HiveType): number {
  return FRAME_HONEY_KG[hiveType];
}

export function honeyYield(frames: number, hiveType: HiveType, fillPercent: number = 80): number {
  return parseFloat((frames * FRAME_HONEY_KG[hiveType] * fillPercent / 100).toFixed(1));
}

export function honeyJars(honeyKg: number, jarMl: number = 500): number {
  const honeyMl = honeyKg * 1000 / 1.42;
  return Math.floor(honeyMl / jarMl);
}

export function waxYield(honeyKg: number): number {
  return parseFloat((honeyKg * 0.015).toFixed(2));
}

export function beePopulation(frames: number, season: Season): number {
  const beesPerFrame: Record<Season, number> = {
    spring: 2000,
    summer: 3000,
    autumn: 2000,
    winter: 1000,
  };
  return frames * beesPerFrame[season];
}

export function foragingRange(tempC: number): number {
  if (tempC < 10) return 0;
  if (tempC < 15) return 1.5;
  if (tempC < 25) return 3.0;
  return 5.0;
}

export function sugarSyrupRatio(season: Season): { sugar: number; water: number } {
  if (season === "autumn" || season === "winter") {
    return { sugar: 2, water: 1 };
  }
  return { sugar: 1, water: 1 };
}

export function feedAmount(colonies: number, season: Season): number {
  const kgPerColony: Record<Season, number> = {
    spring: 5,
    summer: 0,
    autumn: 10,
    winter: 15,
  };
  return colonies * kgPerColony[season];
}

export function inspectionInterval(season: Season): number {
  const days: Record<Season, number> = {
    spring: 7,
    summer: 10,
    autumn: 14,
    winter: 30,
  };
  return days[season];
}

export function swarmRisk(frames: number, queenAge: number, season: Season): string {
  if (season === "winter") return "low";
  let score = 0;
  if (frames > 8) score += 2;
  if (queenAge > 2) score += 2;
  if (season === "spring") score += 2;
  if (season === "summer") score += 1;
  if (score >= 4) return "high";
  if (score >= 2) return "moderate";
  return "low";
}

export function varroaTreatmentWindow(season: Season): boolean {
  return season === "summer" || season === "autumn";
}

export function queenReplacementInterval(): number {
  return 2;
}

export function hiveWeight(type: HiveType, supers: number, honeyKg: number): number {
  const baseKg: Record<HiveType, number> = {
    langstroth: 30,
    top_bar: 15,
    warre: 20,
    flow: 35,
  };
  const superKg = 3;
  return parseFloat((baseKg[type] + supers * superKg + honeyKg).toFixed(1));
}

export function pollinationValue(hectares: number, cropType: "almond" | "apple" | "blueberry" | "general"): number {
  const perHa: Record<string, number> = {
    almond: 500,
    apple: 400,
    blueberry: 600,
    general: 300,
  };
  return hectares * (perHa[cropType] ?? 300);
}

export function annualCostPerHive(type: HiveType): number {
  const costs: Record<HiveType, number> = {
    langstroth: 150,
    top_bar: 100,
    warre: 120,
    flow: 80,
  };
  return costs[type];
}

export function breakEvenJars(annualCost: number, pricePerJar: number, costPerJar: number): number {
  const margin = pricePerJar - costPerJar;
  if (margin <= 0) return Infinity;
  return Math.ceil(annualCost / margin);
}

export function hiveTypes(): HiveType[] {
  return ["langstroth", "top_bar", "warre", "flow"];
}
