export type CoinGrade = "poor" | "good" | "fine" | "extremely_fine" | "uncirculated";

export function marketValue(g: CoinGrade): number {
  const m: Record<CoinGrade, number> = {
    poor: 1, good: 3, fine: 5, extremely_fine: 8, uncirculated: 10,
  };
  return m[g];
}

export function detailVisibility(g: CoinGrade): number {
  const m: Record<CoinGrade, number> = {
    poor: 2, good: 4, fine: 6, extremely_fine: 8, uncirculated: 10,
  };
  return m[g];
}

export function surfaceQuality(g: CoinGrade): number {
  const m: Record<CoinGrade, number> = {
    poor: 1, good: 3, fine: 5, extremely_fine: 8, uncirculated: 10,
  };
  return m[g];
}

export function collectibility(g: CoinGrade): number {
  const m: Record<CoinGrade, number> = {
    poor: 3, good: 5, fine: 7, extremely_fine: 9, uncirculated: 10,
  };
  return m[g];
}

export function wearLevel(g: CoinGrade): number {
  const m: Record<CoinGrade, number> = {
    poor: 10, good: 7, fine: 5, extremely_fine: 2, uncirculated: 0,
  };
  return m[g];
}

export function slabWorthy(g: CoinGrade): boolean {
  const m: Record<CoinGrade, boolean> = {
    poor: false, good: false, fine: true, extremely_fine: true, uncirculated: true,
  };
  return m[g];
}

export function investmentGrade(g: CoinGrade): boolean {
  const m: Record<CoinGrade, boolean> = {
    poor: false, good: false, fine: false, extremely_fine: true, uncirculated: true,
  };
  return m[g];
}

export function sheldonScale(g: CoinGrade): string {
  const m: Record<CoinGrade, string> = {
    poor: "po_1", good: "g_4_to_6",
    fine: "f_12_to_15", extremely_fine: "ef_40_to_45",
    uncirculated: "ms_60_to_70",
  };
  return m[g];
}

export function typicalSource(g: CoinGrade): string {
  const m: Record<CoinGrade, string> = {
    poor: "metal_detector_finds", good: "circulation_pulls",
    fine: "estate_collections", extremely_fine: "dealer_inventory",
    uncirculated: "mint_rolls_sets",
  };
  return m[g];
}

export function coinGrades(): CoinGrade[] {
  return ["poor", "good", "fine", "extremely_fine", "uncirculated"];
}
