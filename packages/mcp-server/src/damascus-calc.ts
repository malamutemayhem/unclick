export type SteelType = "1095" | "15n20" | "L6" | "O1" | "W2";
export type PatternType = "random" | "twist" | "ladder" | "raindrop" | "feather" | "mosaic";

export function layerCount(folds: number): number {
  return Math.pow(2, folds);
}

export function billetWeight(steelKg: number, layers: number): number {
  return parseFloat((steelKg * (1 - layers * 0.002)).toFixed(2));
}

export function forgingTempC(steel: SteelType): number {
  const t: Record<SteelType, number> = {
    "1095": 1065, "15n20": 1100, L6: 1050, O1: 1010, W2: 1065,
  };
  return t[steel];
}

export function weldingTempC(): number {
  return 1200;
}

export function heatsRequired(folds: number): number {
  return folds + 2;
}

export function fluxType(): string {
  return "borax";
}

export function etchTime(acid: string): number {
  if (acid === "ferric_chloride") return 15;
  if (acid === "muriatic") return 5;
  return 10;
}

export function contrastRating(steel1: SteelType, steel2: SteelType): number {
  const nickel: Record<SteelType, number> = {
    "1095": 0, "15n20": 2, L6: 1.5, O1: 0, W2: 0,
  };
  return parseFloat(Math.abs(nickel[steel1] - nickel[steel2]).toFixed(1));
}

export function patternComplexity(pattern: PatternType): number {
  const c: Record<PatternType, number> = {
    random: 1, twist: 3, ladder: 4, raindrop: 6, feather: 7, mosaic: 10,
  };
  return c[pattern];
}

export function grindingGrit(finish: string): number {
  if (finish === "rough") return 120;
  if (finish === "satin") return 400;
  if (finish === "mirror") return 2000;
  return 800;
}

export function hardeningTempC(steel: SteelType): number {
  const t: Record<SteelType, number> = {
    "1095": 800, "15n20": 815, L6: 790, O1: 800, W2: 790,
  };
  return t[steel];
}

export function patternTypes(): PatternType[] {
  return ["random", "twist", "ladder", "raindrop", "feather", "mosaic"];
}
