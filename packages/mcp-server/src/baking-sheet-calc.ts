export type BakingSheetType = "aluminum_half" | "stainless_steel" | "nonstick_coated" | "silicone_mat" | "stone_ceramic";

export function heatDistribution(t: BakingSheetType): number {
  const m: Record<BakingSheetType, number> = {
    aluminum_half: 9, stainless_steel: 7, nonstick_coated: 7, silicone_mat: 5, stone_ceramic: 10,
  };
  return m[t];
}

export function browningResult(t: BakingSheetType): number {
  const m: Record<BakingSheetType, number> = {
    aluminum_half: 9, stainless_steel: 7, nonstick_coated: 6, silicone_mat: 4, stone_ceramic: 10,
  };
  return m[t];
}

export function releaseEase(t: BakingSheetType): number {
  const m: Record<BakingSheetType, number> = {
    aluminum_half: 5, stainless_steel: 4, nonstick_coated: 10, silicone_mat: 10, stone_ceramic: 6,
  };
  return m[t];
}

export function durabilityScore(t: BakingSheetType): number {
  const m: Record<BakingSheetType, number> = {
    aluminum_half: 8, stainless_steel: 10, nonstick_coated: 4, silicone_mat: 6, stone_ceramic: 7,
  };
  return m[t];
}

export function sheetCost(t: BakingSheetType): number {
  const m: Record<BakingSheetType, number> = {
    aluminum_half: 4, stainless_steel: 7, nonstick_coated: 3, silicone_mat: 4, stone_ceramic: 8,
  };
  return m[t];
}

export function dishwasherSafe(t: BakingSheetType): boolean {
  const m: Record<BakingSheetType, boolean> = {
    aluminum_half: true, stainless_steel: true, nonstick_coated: false, silicone_mat: true, stone_ceramic: false,
  };
  return m[t];
}

export function ovenSafe500(t: BakingSheetType): boolean {
  const m: Record<BakingSheetType, boolean> = {
    aluminum_half: true, stainless_steel: true, nonstick_coated: false, silicone_mat: false, stone_ceramic: true,
  };
  return m[t];
}

export function surfaceFinish(t: BakingSheetType): string {
  const m: Record<BakingSheetType, string> = {
    aluminum_half: "raw_aluminum_commercial",
    stainless_steel: "polished_18_10_steel",
    nonstick_coated: "ptfe_silicone_spray",
    silicone_mat: "food_grade_silicone_sheet",
    stone_ceramic: "unglazed_cordierite_slab",
  };
  return m[t];
}

export function bestBake(t: BakingSheetType): string {
  const m: Record<BakingSheetType, string> = {
    aluminum_half: "cookie_roast_all_purpose",
    stainless_steel: "high_heat_broil_deglaze",
    nonstick_coated: "delicate_pastry_easy_clean",
    silicone_mat: "macaron_candy_no_stick",
    stone_ceramic: "pizza_bread_crispy_crust",
  };
  return m[t];
}

export function bakingSheets(): BakingSheetType[] {
  return ["aluminum_half", "stainless_steel", "nonstick_coated", "silicone_mat", "stone_ceramic"];
}
