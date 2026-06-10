export type BlockWood = "cherry" | "boxwood" | "pear" | "maple" | "linden";

export function blockThicknessMm(wood: BlockWood): number {
  const thicknesses: Record<BlockWood, number> = {
    cherry: 22, boxwood: 18, pear: 20, maple: 25, linden: 28,
  };
  return thicknesses[wood];
}

export function carvingHoursPerCm2(wood: BlockWood): number {
  const hours: Record<BlockWood, number> = {
    cherry: 0.15, boxwood: 0.25, pear: 0.18, maple: 0.12, linden: 0.1,
  };
  return hours[wood];
}

export function impressionsPerBlock(wood: BlockWood): number {
  const counts: Record<BlockWood, number> = {
    cherry: 5000, boxwood: 20000, pear: 8000, maple: 3000, linden: 2000,
  };
  return counts[wood];
}

export function inkCoverageMlPerPrint(printAreaCm2: number): number {
  return parseFloat((printAreaCm2 * 0.003).toFixed(2));
}

export function pressurePsi(technique: "hand" | "baren" | "press"): number {
  const psi: Record<string, number> = { hand: 5, baren: 15, press: 50 };
  return psi[technique];
}

export function registrationMarksCount(colorCount: number): number {
  return colorCount > 1 ? 2 : 0;
}

export function paperDampeningMinutes(paperType: "washi" | "rag" | "newsprint"): number {
  const mins: Record<string, number> = { washi: 10, rag: 15, newsprint: 5 };
  return mins[paperType];
}

export function dryingTimeBetweenColorsHours(inkType: "water" | "oil"): number {
  return inkType === "oil" ? 24 : 1;
}

export function gougeSetCount(detail: "coarse" | "fine" | "extra_fine"): number {
  const counts: Record<string, number> = { coarse: 4, fine: 8, extra_fine: 12 };
  return counts[detail];
}

export function costPerBlock(wood: BlockWood, baseCost: number): number {
  const mult: Record<BlockWood, number> = {
    cherry: 2.0, boxwood: 5.0, pear: 3.0, maple: 1.5, linden: 1.0,
  };
  return parseFloat((baseCost * mult[wood]).toFixed(2));
}

export function blockWoods(): BlockWood[] {
  return ["cherry", "boxwood", "pear", "maple", "linden"];
}
