export type YarnBowlType = "ceramic_heavy_glaze" | "wood_turned_smooth" | "bamboo_light_eco" | "marble_stone_luxury" | "silicone_travel_fold";

export function yarnControl(t: YarnBowlType): number {
  const m: Record<YarnBowlType, number> = {
    ceramic_heavy_glaze: 9, wood_turned_smooth: 8, bamboo_light_eco: 7, marble_stone_luxury: 10, silicone_travel_fold: 6,
  };
  return m[t];
}

export function stability(t: YarnBowlType): number {
  const m: Record<YarnBowlType, number> = {
    ceramic_heavy_glaze: 9, wood_turned_smooth: 7, bamboo_light_eco: 5, marble_stone_luxury: 10, silicone_travel_fold: 4,
  };
  return m[t];
}

export function yarnSafe(t: YarnBowlType): number {
  const m: Record<YarnBowlType, number> = {
    ceramic_heavy_glaze: 8, wood_turned_smooth: 10, bamboo_light_eco: 9, marble_stone_luxury: 7, silicone_travel_fold: 8,
  };
  return m[t];
}

export function portability(t: YarnBowlType): number {
  const m: Record<YarnBowlType, number> = {
    ceramic_heavy_glaze: 3, wood_turned_smooth: 5, bamboo_light_eco: 7, marble_stone_luxury: 2, silicone_travel_fold: 10,
  };
  return m[t];
}

export function bowlCost(t: YarnBowlType): number {
  const m: Record<YarnBowlType, number> = {
    ceramic_heavy_glaze: 3, wood_turned_smooth: 4, bamboo_light_eco: 2, marble_stone_luxury: 5, silicone_travel_fold: 2,
  };
  return m[t];
}

export function breakResist(t: YarnBowlType): boolean {
  const m: Record<YarnBowlType, boolean> = {
    ceramic_heavy_glaze: false, wood_turned_smooth: true, bamboo_light_eco: true, marble_stone_luxury: false, silicone_travel_fold: true,
  };
  return m[t];
}

export function collapsible(t: YarnBowlType): boolean {
  const m: Record<YarnBowlType, boolean> = {
    ceramic_heavy_glaze: false, wood_turned_smooth: false, bamboo_light_eco: false, marble_stone_luxury: false, silicone_travel_fold: true,
  };
  return m[t];
}

export function bowlMaterial(t: YarnBowlType): string {
  const m: Record<YarnBowlType, string> = {
    ceramic_heavy_glaze: "stoneware_fired_glaze",
    wood_turned_smooth: "hardwood_lathe_turned",
    bamboo_light_eco: "laminated_bamboo_bowl",
    marble_stone_luxury: "solid_marble_carved",
    silicone_travel_fold: "food_grade_silicone",
  };
  return m[t];
}

export function bestProject(t: YarnBowlType): string {
  const m: Record<YarnBowlType, string> = {
    ceramic_heavy_glaze: "home_knit_station",
    wood_turned_smooth: "delicate_yarn_protect",
    bamboo_light_eco: "eco_craft_everyday",
    marble_stone_luxury: "gift_display_luxury",
    silicone_travel_fold: "travel_knit_portable",
  };
  return m[t];
}

export function yarnBowls(): YarnBowlType[] {
  return ["ceramic_heavy_glaze", "wood_turned_smooth", "bamboo_light_eco", "marble_stone_luxury", "silicone_travel_fold"];
}
