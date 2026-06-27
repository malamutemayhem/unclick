export type GemstoneType = "diamond" | "ruby" | "sapphire" | "emerald" | "amethyst" | "opal" | "topaz" | "garnet";
export type CutType = "round" | "oval" | "cushion" | "pear" | "marquise" | "emerald_cut" | "cabochon";

const MOHS_HARDNESS: Record<GemstoneType, number> = {
  diamond: 10, ruby: 9, sapphire: 9, emerald: 7.5,
  amethyst: 7, opal: 6, topaz: 8, garnet: 7,
};

const SPECIFIC_GRAVITY: Record<GemstoneType, number> = {
  diamond: 3.52, ruby: 4.0, sapphire: 4.0, emerald: 2.72,
  amethyst: 2.65, opal: 2.1, topaz: 3.53, garnet: 3.8,
};

export function mohsHardness(gem: GemstoneType): number {
  return MOHS_HARDNESS[gem];
}

export function specificGravity(gem: GemstoneType): number {
  return SPECIFIC_GRAVITY[gem];
}

export function caratWeight(volumeMm3: number, gem: GemstoneType): number {
  const grams = volumeMm3 * SPECIFIC_GRAVITY[gem] / 1000;
  return parseFloat((grams * 5).toFixed(2));
}

export function mmToCarats(diameterMm: number, depthMm: number, gem: GemstoneType): number {
  const r = diameterMm / 2;
  const volumeMm3 = Math.PI * r * r * depthMm * 0.6;
  return caratWeight(volumeMm3, gem);
}

export function caratsToMm(carats: number, gem: GemstoneType): number {
  const grams = carats / 5;
  const volumeMm3 = grams * 1000 / SPECIFIC_GRAVITY[gem];
  const r = Math.pow(volumeMm3 / (Math.PI * 0.6), 1 / 3);
  return parseFloat((r * 2).toFixed(1));
}

export function roughToFinished(roughCarats: number, cutType: CutType): number {
  const yieldPercent: Record<CutType, number> = {
    round: 40,
    oval: 45,
    cushion: 50,
    pear: 42,
    marquise: 38,
    emerald_cut: 55,
    cabochon: 60,
  };
  return parseFloat((roughCarats * yieldPercent[cutType] / 100).toFixed(2));
}

export function gritSequence(gem: GemstoneType): number[] {
  const hardness = MOHS_HARDNESS[gem];
  if (hardness >= 9) return [100, 220, 600, 1200, 3000, 8000, 14000];
  if (hardness >= 7) return [100, 220, 600, 1200, 3000, 8000];
  return [100, 220, 400, 600, 1200, 3000];
}

export function cuttingSpeed(gem: GemstoneType): number {
  const hardness = MOHS_HARDNESS[gem];
  return Math.round(3000 - hardness * 200);
}

export function polishingTime(carats: number, gem: GemstoneType): number {
  const hardnessFactor = MOHS_HARDNESS[gem] / 7;
  return parseFloat((carats * 10 * hardnessFactor).toFixed(0));
}

export function dopAngle(cutType: CutType): number {
  const angles: Record<CutType, number> = {
    round: 43,
    oval: 40,
    cushion: 42,
    pear: 40,
    marquise: 40,
    emerald_cut: 45,
    cabochon: 0,
  };
  return angles[cutType];
}

export function crownAngle(): number {
  return 34.5;
}

export function pavilionAngle(): number {
  return 40.75;
}

export function tablePercent(cutType: CutType): number {
  const table: Record<CutType, number> = {
    round: 57,
    oval: 56,
    cushion: 60,
    pear: 55,
    marquise: 54,
    emerald_cut: 65,
    cabochon: 0,
  };
  return table[cutType];
}

export function pricePerCarat(gem: GemstoneType, quality: "low" | "medium" | "high"): number {
  const base: Record<GemstoneType, number> = {
    diamond: 5000, ruby: 3000, sapphire: 2000, emerald: 2500,
    amethyst: 20, opal: 100, topaz: 30, garnet: 25,
  };
  const mult: Record<string, number> = { low: 0.3, medium: 1, high: 3 };
  return Math.round(base[gem] * mult[quality]);
}

export function gemstoneTypes(): GemstoneType[] {
  return ["diamond", "ruby", "sapphire", "emerald", "amethyst", "opal", "topaz", "garnet"];
}
