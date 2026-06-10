export type WindshieldWiperType = "conventional_frame_rubber" | "beam_bracketless_aero" | "hybrid_frame_aero_cover" | "winter_heavy_ice_boot" | "rear_window_short";

export function wipeQuality(t: WindshieldWiperType): number {
  const m: Record<WindshieldWiperType, number> = {
    conventional_frame_rubber: 5, beam_bracketless_aero: 9, hybrid_frame_aero_cover: 8, winter_heavy_ice_boot: 7, rear_window_short: 6,
  };
  return m[t];
}

export function windResist(t: WindshieldWiperType): number {
  const m: Record<WindshieldWiperType, number> = {
    conventional_frame_rubber: 4, beam_bracketless_aero: 10, hybrid_frame_aero_cover: 8, winter_heavy_ice_boot: 6, rear_window_short: 5,
  };
  return m[t];
}

export function durability(t: WindshieldWiperType): number {
  const m: Record<WindshieldWiperType, number> = {
    conventional_frame_rubber: 5, beam_bracketless_aero: 8, hybrid_frame_aero_cover: 7, winter_heavy_ice_boot: 9, rear_window_short: 6,
  };
  return m[t];
}

export function noiseLevel(t: WindshieldWiperType): number {
  const m: Record<WindshieldWiperType, number> = {
    conventional_frame_rubber: 4, beam_bracketless_aero: 9, hybrid_frame_aero_cover: 8, winter_heavy_ice_boot: 5, rear_window_short: 6,
  };
  return m[t];
}

export function wiperCost(t: WindshieldWiperType): number {
  const m: Record<WindshieldWiperType, number> = {
    conventional_frame_rubber: 2, beam_bracketless_aero: 5, hybrid_frame_aero_cover: 4, winter_heavy_ice_boot: 5, rear_window_short: 2,
  };
  return m[t];
}

export function allWeather(t: WindshieldWiperType): boolean {
  const m: Record<WindshieldWiperType, boolean> = {
    conventional_frame_rubber: false, beam_bracketless_aero: true, hybrid_frame_aero_cover: true, winter_heavy_ice_boot: true, rear_window_short: false,
  };
  return m[t];
}

export function iceResist(t: WindshieldWiperType): boolean {
  const m: Record<WindshieldWiperType, boolean> = {
    conventional_frame_rubber: false, beam_bracketless_aero: false, hybrid_frame_aero_cover: false, winter_heavy_ice_boot: true, rear_window_short: false,
  };
  return m[t];
}

export function bladeDesign(t: WindshieldWiperType): string {
  const m: Record<WindshieldWiperType, string> = {
    conventional_frame_rubber: "metal_frame_rubber_edge",
    beam_bracketless_aero: "curved_steel_spring_beam",
    hybrid_frame_aero_cover: "frame_aero_shell_cover",
    winter_heavy_ice_boot: "rubber_boot_sealed_pivot",
    rear_window_short: "compact_single_arm_snap",
  };
  return m[t];
}

export function bestSeason(t: WindshieldWiperType): string {
  const m: Record<WindshieldWiperType, string> = {
    conventional_frame_rubber: "mild_climate_budget",
    beam_bracketless_aero: "year_round_highway",
    hybrid_frame_aero_cover: "mixed_rain_season",
    winter_heavy_ice_boot: "snow_ice_freezing_rain",
    rear_window_short: "hatch_suv_rear_glass",
  };
  return m[t];
}

export function windshieldWipers(): WindshieldWiperType[] {
  return ["conventional_frame_rubber", "beam_bracketless_aero", "hybrid_frame_aero_cover", "winter_heavy_ice_boot", "rear_window_short"];
}
