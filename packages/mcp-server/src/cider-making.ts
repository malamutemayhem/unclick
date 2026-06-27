export type AppleType = "bittersweet" | "sharp" | "sweet" | "bittersharp";
export type CiderStyle = "dry" | "medium" | "sweet" | "ice" | "perry";

export function juiceYield(applesKg: number): number {
  return parseFloat((applesKg * 0.6).toFixed(1));
}

export function specificGravity(brix: number): number {
  return parseFloat((1 + brix / 230).toFixed(3));
}

export function potentialAbv(og: number, fg: number): number {
  return parseFloat(((og - fg) * 131.25).toFixed(1));
}

export function tanninLevel(appleType: AppleType): string {
  const levels: Record<AppleType, string> = {
    bittersweet: "high", bittersharp: "high", sharp: "low", sweet: "low",
  };
  return levels[appleType];
}

export function acidLevel(appleType: AppleType): string {
  const levels: Record<AppleType, string> = {
    bittersweet: "low", bittersharp: "high", sharp: "high", sweet: "low",
  };
  return levels[appleType];
}

export function blendRatio(): { bittersweet: number; sharp: number; sweet: number } {
  return { bittersweet: 40, sharp: 20, sweet: 40 };
}

export function fermentationTempC(style: CiderStyle): { min: number; max: number } {
  if (style === "ice") return { min: -3, max: 0 };
  return { min: 10, max: 18 };
}

export function fermentationWeeks(style: CiderStyle): number {
  const weeks: Record<CiderStyle, number> = {
    dry: 4, medium: 5, sweet: 6, ice: 12, perry: 6,
  };
  return weeks[style];
}

export function sulfiteAmount(juiceLiters: number, ppm: number = 50): number {
  return parseFloat((juiceLiters * ppm / 570).toFixed(2));
}

export function yeastAmount(juiceLiters: number): number {
  return parseFloat((juiceLiters / 23 * 5).toFixed(1));
}

export function bottleCount(liters: number, bottleMl: number = 500): number {
  return Math.floor(liters * 1000 / bottleMl);
}

export function primingSugar(liters: number, carbonationLevel: "still" | "petillant" | "sparkling"): number {
  const gPerLiter: Record<string, number> = { still: 0, petillant: 4, sparkling: 8 };
  return parseFloat((liters * gPerLiter[carbonationLevel]).toFixed(0));
}

export function agingMonths(style: CiderStyle): number {
  const months: Record<CiderStyle, number> = {
    dry: 3, medium: 4, sweet: 6, ice: 12, perry: 4,
  };
  return months[style];
}

export function ciderStyles(): CiderStyle[] {
  return ["dry", "medium", "sweet", "ice", "perry"];
}
