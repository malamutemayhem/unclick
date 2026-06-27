export type DecanterType = "classic_crystal_wine" | "wide_base_red_wine" | "duck_shape_novelty" | "whiskey_square_stopper" | "carafe_everyday_pour";

export function aerationSurface(t: DecanterType): number {
  const m: Record<DecanterType, number> = {
    classic_crystal_wine: 8, wide_base_red_wine: 10, duck_shape_novelty: 7, whiskey_square_stopper: 4, carafe_everyday_pour: 6,
  };
  return m[t];
}

export function pourControl(t: DecanterType): number {
  const m: Record<DecanterType, number> = {
    classic_crystal_wine: 8, wide_base_red_wine: 6, duck_shape_novelty: 5, whiskey_square_stopper: 9, carafe_everyday_pour: 10,
  };
  return m[t];
}

export function visualElegance(t: DecanterType): number {
  const m: Record<DecanterType, number> = {
    classic_crystal_wine: 9, wide_base_red_wine: 7, duck_shape_novelty: 10, whiskey_square_stopper: 8, carafe_everyday_pour: 4,
  };
  return m[t];
}

export function cleanEase(t: DecanterType): number {
  const m: Record<DecanterType, number> = {
    classic_crystal_wine: 5, wide_base_red_wine: 4, duck_shape_novelty: 2, whiskey_square_stopper: 8, carafe_everyday_pour: 10,
  };
  return m[t];
}

export function decanterCost(t: DecanterType): number {
  const m: Record<DecanterType, number> = {
    classic_crystal_wine: 7, wide_base_red_wine: 6, duck_shape_novelty: 8, whiskey_square_stopper: 7, carafe_everyday_pour: 3,
  };
  return m[t];
}

export function hasStopper(t: DecanterType): boolean {
  const m: Record<DecanterType, boolean> = {
    classic_crystal_wine: true, wide_base_red_wine: false, duck_shape_novelty: false, whiskey_square_stopper: true, carafe_everyday_pour: false,
  };
  return m[t];
}

export function leadFree(t: DecanterType): boolean {
  const m: Record<DecanterType, boolean> = {
    classic_crystal_wine: false, wide_base_red_wine: true, duck_shape_novelty: true, whiskey_square_stopper: true, carafe_everyday_pour: true,
  };
  return m[t];
}

export function glassMaterial(t: DecanterType): string {
  const m: Record<DecanterType, string> = {
    classic_crystal_wine: "leaded_crystal_hand_blown",
    wide_base_red_wine: "lead_free_crystal_flat",
    duck_shape_novelty: "borosilicate_hand_formed",
    whiskey_square_stopper: "lead_free_crystal_heavy",
    carafe_everyday_pour: "soda_lime_glass_simple",
  };
  return m[t];
}

export function bestSpirit(t: DecanterType): string {
  const m: Record<DecanterType, string> = {
    classic_crystal_wine: "aged_red_wine_bordeaux",
    wide_base_red_wine: "young_bold_cabernet",
    duck_shape_novelty: "conversation_piece_gift",
    whiskey_square_stopper: "bourbon_scotch_display",
    carafe_everyday_pour: "table_wine_water_daily",
  };
  return m[t];
}

export function decanters(): DecanterType[] {
  return ["classic_crystal_wine", "wide_base_red_wine", "duck_shape_novelty", "whiskey_square_stopper", "carafe_everyday_pour"];
}
