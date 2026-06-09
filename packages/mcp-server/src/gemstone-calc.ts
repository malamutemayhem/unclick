export type GemstoneType = "diamond" | "ruby" | "sapphire" | "emerald" | "opal" | "amethyst" | "topaz";
export type CutStyle = "round" | "princess" | "cushion" | "oval" | "pear" | "emerald_cut";

export function mohsHardness(gem: GemstoneType): number {
  const hardness: Record<GemstoneType, number> = {
    diamond: 10, ruby: 9, sapphire: 9, emerald: 7.5, opal: 6, amethyst: 7, topaz: 8,
  };
  return hardness[gem];
}

export function refractiveIndex(gem: GemstoneType): number {
  const ri: Record<GemstoneType, number> = {
    diamond: 2.42, ruby: 1.77, sapphire: 1.77, emerald: 1.58, opal: 1.45, amethyst: 1.55, topaz: 1.63,
  };
  return ri[gem];
}

export function specificGravity(gem: GemstoneType): number {
  const sg: Record<GemstoneType, number> = {
    diamond: 3.52, ruby: 4.0, sapphire: 4.0, emerald: 2.72, opal: 2.1, amethyst: 2.65, topaz: 3.53,
  };
  return sg[gem];
}

export function caratWeight(mm: number, gem: GemstoneType): number {
  const vol = (4 / 3) * Math.PI * (mm / 2) ** 3;
  const sg = specificGravity(gem);
  return parseFloat((vol * sg / 1000 * 5).toFixed(2));
}

export function pricePerCarat(gem: GemstoneType, quality: "commercial" | "fine" | "exceptional"): number {
  const base: Record<GemstoneType, number> = {
    diamond: 5000, ruby: 3000, sapphire: 2000, emerald: 2500, opal: 300, amethyst: 30, topaz: 50,
  };
  const factor: Record<string, number> = { commercial: 0.3, fine: 1, exceptional: 5 };
  return Math.round(base[gem] * factor[quality]);
}

export function cutLossPercent(style: CutStyle): number {
  const loss: Record<CutStyle, number> = {
    round: 50, princess: 20, cushion: 35, oval: 40, pear: 45, emerald_cut: 30,
  };
  return loss[style];
}

export function finishedWeight(roughCarats: number, cutLossPct: number): number {
  return parseFloat((roughCarats * (1 - cutLossPct / 100)).toFixed(2));
}

export function brilliance(ri: number): string {
  if (ri >= 2.0) return "exceptional";
  if (ri >= 1.7) return "high";
  if (ri >= 1.5) return "moderate";
  return "low";
}

export function durability(hardness: number): string {
  if (hardness >= 9) return "excellent (daily wear)";
  if (hardness >= 7) return "good (occasional wear)";
  if (hardness >= 5) return "fair (protected settings)";
  return "fragile (collector only)";
}

export function birthstone(month: number): string {
  const stones = [
    "garnet", "amethyst", "aquamarine", "diamond", "emerald", "pearl",
    "ruby", "peridot", "sapphire", "opal", "topaz", "tanzanite",
  ];
  if (month < 1 || month > 12) return "unknown";
  return stones[month - 1];
}

export function gemstoneTypes(): GemstoneType[] {
  return ["diamond", "ruby", "sapphire", "emerald", "opal", "amethyst", "topaz"];
}
