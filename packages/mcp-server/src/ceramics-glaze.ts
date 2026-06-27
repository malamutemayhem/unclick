export type FiringType = "earthenware" | "stoneware" | "porcelain" | "raku";
export type GlazeFinish = "gloss" | "satin" | "matte" | "crystalline";
export type ConeNumber = "06" | "05" | "04" | "03" | "02" | "01" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10";

export interface GlazeRecipe {
  name: string;
  firingType: FiringType;
  cone: ConeNumber;
  finish: GlazeFinish;
  ingredients: { name: string; percent: number }[];
}

const CONE_TEMP: Record<ConeNumber, number> = {
  "06": 999, "05": 1046, "04": 1060, "03": 1101,
  "02": 1120, "01": 1137, "1": 1154, "2": 1162,
  "3": 1168, "4": 1186, "5": 1196, "6": 1222,
  "7": 1240, "8": 1263, "9": 1280, "10": 1305,
};

export function coneToTemp(cone: ConeNumber): number {
  return CONE_TEMP[cone];
}

export function tempToCone(tempC: number): ConeNumber | null {
  let closest: ConeNumber | null = null;
  let minDiff = Infinity;
  for (const [cone, t] of Object.entries(CONE_TEMP)) {
    const diff = Math.abs(t - tempC);
    if (diff < minDiff) {
      minDiff = diff;
      closest = cone as ConeNumber;
    }
  }
  return closest;
}

export function firingRange(type: FiringType): { minC: number; maxC: number } {
  const ranges: Record<FiringType, { minC: number; maxC: number }> = {
    earthenware: { minC: 900, maxC: 1150 },
    stoneware: { minC: 1200, maxC: 1300 },
    porcelain: { minC: 1260, maxC: 1400 },
    raku: { minC: 800, maxC: 1000 },
  };
  return ranges[type];
}

export function shrinkagePercent(type: FiringType): number {
  const shrinkage: Record<FiringType, number> = {
    earthenware: 5,
    stoneware: 12,
    porcelain: 15,
    raku: 3,
  };
  return shrinkage[type];
}

export function firedSize(greenSizeCm: number, type: FiringType): number {
  const shrink = shrinkagePercent(type);
  return parseFloat((greenSizeCm * (1 - shrink / 100)).toFixed(2));
}

export function greenSizeNeeded(targetCm: number, type: FiringType): number {
  const shrink = shrinkagePercent(type);
  return parseFloat((targetCm / (1 - shrink / 100)).toFixed(2));
}

export function glazeWeight(surfaceAreaCm2: number, thicknessMm: number = 1, densityGPerMl: number = 1.5): number {
  const volumeMl = surfaceAreaCm2 * thicknessMm * 0.1;
  return parseFloat((volumeMl * densityGPerMl).toFixed(1));
}

export function glazeBatchWeight(recipe: { name: string; percent: number }[], totalGrams: number): { name: string; grams: number }[] {
  return recipe.map(i => ({
    name: i.name,
    grams: parseFloat((totalGrams * i.percent / 100).toFixed(1)),
  }));
}

export function specificGravity(dryGrams: number, waterMl: number): number {
  const totalVolume = waterMl + dryGrams / 2.5;
  return parseFloat(((dryGrams + waterMl * 1) / totalVolume).toFixed(2));
}

export function glazeThicknessFromSG(sg: number): string {
  if (sg < 1.35) return "thin";
  if (sg < 1.50) return "medium";
  return "thick";
}

export function firingSchedule(type: FiringType): { rampCPerHour: number; holdMinutes: number; totalHours: number } {
  const schedules: Record<FiringType, { rampCPerHour: number; holdMinutes: number; totalHours: number }> = {
    earthenware: { rampCPerHour: 100, holdMinutes: 15, totalHours: 10 },
    stoneware: { rampCPerHour: 80, holdMinutes: 20, totalHours: 14 },
    porcelain: { rampCPerHour: 60, holdMinutes: 30, totalHours: 18 },
    raku: { rampCPerHour: 200, holdMinutes: 10, totalHours: 4 },
  };
  return schedules[type];
}

export function kilnCapacity(widthCm: number, depthCm: number, heightCm: number): number {
  return parseFloat((widthCm * depthCm * heightCm / 1000).toFixed(1));
}

export function electricityCost(kwh: number, hoursUsed: number, ratePerKwh: number): number {
  return parseFloat((kwh * hoursUsed * ratePerKwh).toFixed(2));
}

export function thermalExpansion(lengthCm: number, tempDeltaC: number, coefficient: number = 0.000007): number {
  return parseFloat((lengthCm * tempDeltaC * coefficient).toFixed(4));
}

export function crazingRisk(glazeExpansion: number, bodyExpansion: number): string {
  const diff = glazeExpansion - bodyExpansion;
  if (diff > 0.5) return "high";
  if (diff > 0) return "moderate";
  return "low";
}

export function firingTypes(): FiringType[] {
  return ["earthenware", "stoneware", "porcelain", "raku"];
}
