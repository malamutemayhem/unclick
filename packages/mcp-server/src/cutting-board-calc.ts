export type CuttingBoardType = "end_grain_wood" | "edge_grain_bamboo" | "plastic_dishwasher" | "glass_tempered" | "rubber_commercial";

export function knifeGentle(t: CuttingBoardType): number {
  const m: Record<CuttingBoardType, number> = {
    end_grain_wood: 10, edge_grain_bamboo: 7, plastic_dishwasher: 6, glass_tempered: 1, rubber_commercial: 8,
  };
  return m[t];
}

export function durability(t: CuttingBoardType): number {
  const m: Record<CuttingBoardType, number> = {
    end_grain_wood: 9, edge_grain_bamboo: 7, plastic_dishwasher: 5, glass_tempered: 8, rubber_commercial: 10,
  };
  return m[t];
}

export function hygieneLevel(t: CuttingBoardType): number {
  const m: Record<CuttingBoardType, number> = {
    end_grain_wood: 7, edge_grain_bamboo: 6, plastic_dishwasher: 8, glass_tempered: 10, rubber_commercial: 9,
  };
  return m[t];
}

export function gripSurface(t: CuttingBoardType): number {
  const m: Record<CuttingBoardType, number> = {
    end_grain_wood: 8, edge_grain_bamboo: 7, plastic_dishwasher: 6, glass_tempered: 2, rubber_commercial: 10,
  };
  return m[t];
}

export function boardCost(t: CuttingBoardType): number {
  const m: Record<CuttingBoardType, number> = {
    end_grain_wood: 8, edge_grain_bamboo: 4, plastic_dishwasher: 2, glass_tempered: 3, rubber_commercial: 6,
  };
  return m[t];
}

export function dishwasherSafe(t: CuttingBoardType): boolean {
  const m: Record<CuttingBoardType, boolean> = {
    end_grain_wood: false, edge_grain_bamboo: false, plastic_dishwasher: true, glass_tempered: true, rubber_commercial: true,
  };
  return m[t];
}

export function nonSlip(t: CuttingBoardType): boolean {
  const m: Record<CuttingBoardType, boolean> = {
    end_grain_wood: false, edge_grain_bamboo: false, plastic_dishwasher: false, glass_tempered: false, rubber_commercial: true,
  };
  return m[t];
}

export function boardMaterial(t: CuttingBoardType): string {
  const m: Record<CuttingBoardType, string> = {
    end_grain_wood: "walnut_maple_end_grain",
    edge_grain_bamboo: "moso_bamboo_edge_strip",
    plastic_dishwasher: "hdpe_poly_color_coded",
    glass_tempered: "tempered_glass_smooth",
    rubber_commercial: "synthetic_rubber_nsf",
  };
  return m[t];
}

export function bestTask(t: CuttingBoardType): string {
  const m: Record<CuttingBoardType, string> = {
    end_grain_wood: "butcher_heavy_prep",
    edge_grain_bamboo: "daily_veggie_fruit",
    plastic_dishwasher: "raw_meat_color_safe",
    glass_tempered: "pastry_rolling_clean",
    rubber_commercial: "restaurant_sushi_chef",
  };
  return m[t];
}

export function cuttingBoards(): CuttingBoardType[] {
  return ["end_grain_wood", "edge_grain_bamboo", "plastic_dishwasher", "glass_tempered", "rubber_commercial"];
}
