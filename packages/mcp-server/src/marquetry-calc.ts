export type VeneerCut = "rotary" | "flat_sliced" | "quarter_sawn" | "rift" | "burl";

export function piecesPerDesign(complexityLevel: 1 | 2 | 3 | 4 | 5): number {
  return complexityLevel * 25;
}

export function veneerThicknessMm(cut: VeneerCut): number {
  const thicknesses: Record<VeneerCut, number> = {
    rotary: 0.6, flat_sliced: 0.5, quarter_sawn: 0.5, rift: 0.5, burl: 0.8,
  };
  return thicknesses[cut];
}

export function wasteFactor(cut: VeneerCut): number {
  const waste: Record<VeneerCut, number> = {
    rotary: 1.15, flat_sliced: 1.2, quarter_sawn: 1.25, rift: 1.2, burl: 1.4,
  };
  return waste[cut];
}

export function glueWeightGPerM2(technique: "hammer" | "vacuum" | "press"): number {
  const weights: Record<string, number> = { hammer: 80, vacuum: 120, press: 100 };
  return weights[technique];
}

export function cuttingTimeMinutes(pieceCount: number, avgSizeCm2: number): number {
  return parseFloat((pieceCount * (avgSizeCm2 * 0.02 + 1)).toFixed(1));
}

export function assemblyTimeHours(pieceCount: number): number {
  return parseFloat((pieceCount * 0.15).toFixed(1));
}

export function sanderGritSequence(): number[] {
  return [120, 180, 220, 320, 400];
}

export function finishCoats(use: "decorative" | "furniture" | "floor"): number {
  const coats: Record<string, number> = { decorative: 2, furniture: 3, floor: 5 };
  return coats[use];
}

export function shrinkageRiskRating(cut: VeneerCut): number {
  const risk: Record<VeneerCut, number> = {
    rotary: 7, flat_sliced: 5, quarter_sawn: 3, rift: 4, burl: 8,
  };
  return risk[cut];
}

export function costPerM2(cut: VeneerCut, baseCost: number): number {
  const mult: Record<VeneerCut, number> = {
    rotary: 1.0, flat_sliced: 1.5, quarter_sawn: 2.0, rift: 1.8, burl: 5.0,
  };
  return parseFloat((baseCost * mult[cut]).toFixed(2));
}

export function veneerCuts(): VeneerCut[] {
  return ["rotary", "flat_sliced", "quarter_sawn", "rift", "burl"];
}
