export type TrySquareType = "steel_blade_wood" | "all_steel_machinist" | "combination_multi_use" | "double_square_small" | "saddle_square_wide";

export function squareAccuracy(t: TrySquareType): number {
  const m: Record<TrySquareType, number> = {
    steel_blade_wood: 8, all_steel_machinist: 10, combination_multi_use: 7, double_square_small: 9, saddle_square_wide: 6,
  };
  return m[t];
}

export function markingEase(t: TrySquareType): number {
  const m: Record<TrySquareType, number> = {
    steel_blade_wood: 9, all_steel_machinist: 7, combination_multi_use: 8, double_square_small: 6, saddle_square_wide: 10,
  };
  return m[t];
}

export function versatility(t: TrySquareType): number {
  const m: Record<TrySquareType, number> = {
    steel_blade_wood: 6, all_steel_machinist: 7, combination_multi_use: 10, double_square_small: 5, saddle_square_wide: 4,
  };
  return m[t];
}

export function durability(t: TrySquareType): number {
  const m: Record<TrySquareType, number> = {
    steel_blade_wood: 7, all_steel_machinist: 10, combination_multi_use: 8, double_square_small: 9, saddle_square_wide: 6,
  };
  return m[t];
}

export function squareCost(t: TrySquareType): number {
  const m: Record<TrySquareType, number> = {
    steel_blade_wood: 1, all_steel_machinist: 2, combination_multi_use: 2, double_square_small: 2, saddle_square_wide: 1,
  };
  return m[t];
}

export function hasRule(t: TrySquareType): boolean {
  const m: Record<TrySquareType, boolean> = {
    steel_blade_wood: true, all_steel_machinist: true, combination_multi_use: true, double_square_small: true, saddle_square_wide: false,
  };
  return m[t];
}

export function multiFunction(t: TrySquareType): boolean {
  const m: Record<TrySquareType, boolean> = {
    steel_blade_wood: false, all_steel_machinist: false, combination_multi_use: true, double_square_small: false, saddle_square_wide: false,
  };
  return m[t];
}

export function stockMaterial(t: TrySquareType): string {
  const m: Record<TrySquareType, string> = {
    steel_blade_wood: "rosewood_brass_face",
    all_steel_machinist: "hardened_steel_ground",
    combination_multi_use: "cast_iron_steel_blade",
    double_square_small: "steel_precision_ground",
    saddle_square_wide: "wide_aluminum_stock",
  };
  return m[t];
}

export function bestUse(t: TrySquareType): string {
  const m: Record<TrySquareType, string> = {
    steel_blade_wood: "woodwork_right_angle",
    all_steel_machinist: "machine_shop_check",
    combination_multi_use: "multi_angle_layout",
    double_square_small: "small_precise_check",
    saddle_square_wide: "wide_board_mark",
  };
  return m[t];
}

export function trySquares(): TrySquareType[] {
  return ["steel_blade_wood", "all_steel_machinist", "combination_multi_use", "double_square_small", "saddle_square_wide"];
}
