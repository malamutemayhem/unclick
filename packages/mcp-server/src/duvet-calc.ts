export type DuvetType = "goose_down_luxury" | "synthetic_poly_fill" | "wool_natural_temp" | "silk_lightweight_drape" | "bamboo_eco_blend";

export function warmth(t: DuvetType): number {
  const m: Record<DuvetType, number> = {
    goose_down_luxury: 10, synthetic_poly_fill: 7, wool_natural_temp: 8, silk_lightweight_drape: 5, bamboo_eco_blend: 6,
  };
  return m[t];
}

export function breathability(t: DuvetType): number {
  const m: Record<DuvetType, number> = {
    goose_down_luxury: 8, synthetic_poly_fill: 4, wool_natural_temp: 10, silk_lightweight_drape: 9, bamboo_eco_blend: 8,
  };
  return m[t];
}

export function weight(t: DuvetType): number {
  const m: Record<DuvetType, number> = {
    goose_down_luxury: 9, synthetic_poly_fill: 5, wool_natural_temp: 4, silk_lightweight_drape: 10, bamboo_eco_blend: 7,
  };
  return m[t];
}

export function moistureWicking(t: DuvetType): number {
  const m: Record<DuvetType, number> = {
    goose_down_luxury: 6, synthetic_poly_fill: 3, wool_natural_temp: 10, silk_lightweight_drape: 8, bamboo_eco_blend: 9,
  };
  return m[t];
}

export function duvetCost(t: DuvetType): number {
  const m: Record<DuvetType, number> = {
    goose_down_luxury: 9, synthetic_poly_fill: 3, wool_natural_temp: 7, silk_lightweight_drape: 8, bamboo_eco_blend: 6,
  };
  return m[t];
}

export function veganFriendly(t: DuvetType): boolean {
  const m: Record<DuvetType, boolean> = {
    goose_down_luxury: false, synthetic_poly_fill: true, wool_natural_temp: false, silk_lightweight_drape: false, bamboo_eco_blend: true,
  };
  return m[t];
}

export function machineWash(t: DuvetType): boolean {
  const m: Record<DuvetType, boolean> = {
    goose_down_luxury: false, synthetic_poly_fill: true, wool_natural_temp: false, silk_lightweight_drape: false, bamboo_eco_blend: true,
  };
  return m[t];
}

export function fillPower(t: DuvetType): string {
  const m: Record<DuvetType, string> = {
    goose_down_luxury: "800_plus_fill_power_cluster",
    synthetic_poly_fill: "hollow_fiber_polyester",
    wool_natural_temp: "merino_wool_batt_crimped",
    silk_lightweight_drape: "mulberry_silk_long_strand",
    bamboo_eco_blend: "bamboo_rayon_poly_blend",
  };
  return m[t];
}

export function bestSeason(t: DuvetType): string {
  const m: Record<DuvetType, string> = {
    goose_down_luxury: "winter_cold_climate_cozy",
    synthetic_poly_fill: "allergy_friendly_year_round",
    wool_natural_temp: "all_season_temp_regulate",
    silk_lightweight_drape: "summer_warm_night_cool",
    bamboo_eco_blend: "spring_fall_moderate",
  };
  return m[t];
}

export function duvets(): DuvetType[] {
  return ["goose_down_luxury", "synthetic_poly_fill", "wool_natural_temp", "silk_lightweight_drape", "bamboo_eco_blend"];
}
