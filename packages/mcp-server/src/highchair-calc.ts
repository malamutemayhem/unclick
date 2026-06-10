export type HighchairType = "traditional_wood_classic" | "convertible_grow_with" | "clip_on_table_travel" | "space_saver_booster" | "modern_pedestal_design";

export function seatComfort(t: HighchairType): number {
  const m: Record<HighchairType, number> = {
    traditional_wood_classic: 7, convertible_grow_with: 9, clip_on_table_travel: 5, space_saver_booster: 6, modern_pedestal_design: 8,
  };
  return m[t];
}

export function cleanEase(t: HighchairType): number {
  const m: Record<HighchairType, number> = {
    traditional_wood_classic: 6, convertible_grow_with: 7, clip_on_table_travel: 9, space_saver_booster: 8, modern_pedestal_design: 10,
  };
  return m[t];
}

export function longevity(t: HighchairType): number {
  const m: Record<HighchairType, number> = {
    traditional_wood_classic: 8, convertible_grow_with: 10, clip_on_table_travel: 4, space_saver_booster: 5, modern_pedestal_design: 7,
  };
  return m[t];
}

export function footprint(t: HighchairType): number {
  const m: Record<HighchairType, number> = {
    traditional_wood_classic: 3, convertible_grow_with: 4, clip_on_table_travel: 10, space_saver_booster: 9, modern_pedestal_design: 5,
  };
  return m[t];
}

export function chairCost(t: HighchairType): number {
  const m: Record<HighchairType, number> = {
    traditional_wood_classic: 3, convertible_grow_with: 4, clip_on_table_travel: 2, space_saver_booster: 2, modern_pedestal_design: 5,
  };
  return m[t];
}

export function foldable(t: HighchairType): boolean {
  const m: Record<HighchairType, boolean> = {
    traditional_wood_classic: false, convertible_grow_with: false, clip_on_table_travel: true, space_saver_booster: false, modern_pedestal_design: false,
  };
  return m[t];
}

export function growsWithChild(t: HighchairType): boolean {
  const m: Record<HighchairType, boolean> = {
    traditional_wood_classic: false, convertible_grow_with: true, clip_on_table_travel: false, space_saver_booster: false, modern_pedestal_design: false,
  };
  return m[t];
}

export function trayType(t: HighchairType): string {
  const m: Record<HighchairType, string> = {
    traditional_wood_classic: "removable_wood_tray",
    convertible_grow_with: "dishwasher_safe_insert",
    clip_on_table_travel: "no_tray_table_edge",
    space_saver_booster: "snap_on_plastic_tray",
    modern_pedestal_design: "seamless_one_piece",
  };
  return m[t];
}

export function bestFamily(t: HighchairType): string {
  const m: Record<HighchairType, string> = {
    traditional_wood_classic: "heirloom_style_home",
    convertible_grow_with: "long_term_investment",
    clip_on_table_travel: "travel_restaurant_use",
    space_saver_booster: "small_kitchen_apartment",
    modern_pedestal_design: "design_conscious_parent",
  };
  return m[t];
}

export function highchairs(): HighchairType[] {
  return ["traditional_wood_classic", "convertible_grow_with", "clip_on_table_travel", "space_saver_booster", "modern_pedestal_design"];
}
