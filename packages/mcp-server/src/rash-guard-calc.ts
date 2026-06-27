export type RashGuardType = "short_sleeve_upf50" | "long_sleeve_full_cover" | "sleeveless_tank_swim" | "hooded_surf_zip" | "compression_fit_athletic";

export function sunProtection(t: RashGuardType): number {
  const m: Record<RashGuardType, number> = {
    short_sleeve_upf50: 7, long_sleeve_full_cover: 10, sleeveless_tank_swim: 5, hooded_surf_zip: 10, compression_fit_athletic: 7,
  };
  return m[t];
}

export function mobility(t: RashGuardType): number {
  const m: Record<RashGuardType, number> = {
    short_sleeve_upf50: 9, long_sleeve_full_cover: 7, sleeveless_tank_swim: 10, hooded_surf_zip: 6, compression_fit_athletic: 8,
  };
  return m[t];
}

export function quickDry(t: RashGuardType): number {
  const m: Record<RashGuardType, number> = {
    short_sleeve_upf50: 8, long_sleeve_full_cover: 7, sleeveless_tank_swim: 9, hooded_surf_zip: 6, compression_fit_athletic: 9,
  };
  return m[t];
}

export function rashPrevent(t: RashGuardType): number {
  const m: Record<RashGuardType, number> = {
    short_sleeve_upf50: 7, long_sleeve_full_cover: 9, sleeveless_tank_swim: 5, hooded_surf_zip: 9, compression_fit_athletic: 8,
  };
  return m[t];
}

export function guardCost(t: RashGuardType): number {
  const m: Record<RashGuardType, number> = {
    short_sleeve_upf50: 2, long_sleeve_full_cover: 3, sleeveless_tank_swim: 2, hooded_surf_zip: 4, compression_fit_athletic: 3,
  };
  return m[t];
}

export function hasHood(t: RashGuardType): boolean {
  const m: Record<RashGuardType, boolean> = {
    short_sleeve_upf50: false, long_sleeve_full_cover: false, sleeveless_tank_swim: false, hooded_surf_zip: true, compression_fit_athletic: false,
  };
  return m[t];
}

export function hasZipper(t: RashGuardType): boolean {
  const m: Record<RashGuardType, boolean> = {
    short_sleeve_upf50: false, long_sleeve_full_cover: false, sleeveless_tank_swim: false, hooded_surf_zip: true, compression_fit_athletic: false,
  };
  return m[t];
}

export function fabricBlend(t: RashGuardType): string {
  const m: Record<RashGuardType, string> = {
    short_sleeve_upf50: "polyester_spandex_blend",
    long_sleeve_full_cover: "nylon_elastane_mesh",
    sleeveless_tank_swim: "lightweight_poly_wick",
    hooded_surf_zip: "neoprene_lycra_panel",
    compression_fit_athletic: "four_way_stretch_poly",
  };
  return m[t];
}

export function bestActivity(t: RashGuardType): string {
  const m: Record<RashGuardType, string> = {
    short_sleeve_upf50: "beach_swim_casual",
    long_sleeve_full_cover: "snorkel_dive_sun",
    sleeveless_tank_swim: "pool_lap_training",
    hooded_surf_zip: "surfing_board_sport",
    compression_fit_athletic: "triathlon_paddleboard",
  };
  return m[t];
}

export function rashGuards(): RashGuardType[] {
  return ["short_sleeve_upf50", "long_sleeve_full_cover", "sleeveless_tank_swim", "hooded_surf_zip", "compression_fit_athletic"];
}
