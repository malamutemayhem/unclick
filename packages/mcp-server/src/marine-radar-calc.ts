export type MarineRadarType =
  | "x_band_magnetron"
  | "s_band_magnetron"
  | "solid_state_x_band"
  | "dual_band"
  | "fmcw_broadband";

interface MarineRadarData {
  range: number;
  resolution: number;
  clutterReject: number;
  targetTracking: number;
  mrCost: number;
  solidState: boolean;
  forCommercial: boolean;
  technology: string;
  bestUse: string;
}

const DATA: Record<MarineRadarType, MarineRadarData> = {
  x_band_magnetron: {
    range: 7, resolution: 8, clutterReject: 6, targetTracking: 7, mrCost: 5,
    solidState: false, forCommercial: true,
    technology: "magnetron_pulse_x_band_9ghz_waveguide_scanner_rotating",
    bestUse: "commercial_vessel_standard_navigation_collision_avoidance",
  },
  s_band_magnetron: {
    range: 10, resolution: 6, clutterReject: 9, targetTracking: 7, mrCost: 7,
    solidState: false, forCommercial: true,
    technology: "magnetron_pulse_s_band_3ghz_large_antenna_long_range",
    bestUse: "large_vessel_tanker_heavy_rain_clutter_long_range_detect",
  },
  solid_state_x_band: {
    range: 7, resolution: 9, clutterReject: 8, targetTracking: 8, mrCost: 8,
    solidState: true, forCommercial: true,
    technology: "solid_state_transistor_x_band_no_magnetron_instant_on",
    bestUse: "modern_vessel_upgrade_low_maintenance_no_magnetron_replace",
  },
  dual_band: {
    range: 10, resolution: 9, clutterReject: 9, targetTracking: 10, mrCost: 10,
    solidState: true, forCommercial: true,
    technology: "combined_x_s_band_solid_state_integrated_display_arpa",
    bestUse: "vlcc_container_ship_premium_navigation_suite_full_coverage",
  },
  fmcw_broadband: {
    range: 6, resolution: 10, clutterReject: 8, targetTracking: 7, mrCost: 6,
    solidState: true, forCommercial: false,
    technology: "frequency_modulated_continuous_wave_low_power_broadband",
    bestUse: "yacht_leisure_craft_low_power_bird_mode_close_range_detail",
  },
};

function get(t: MarineRadarType): MarineRadarData {
  return DATA[t];
}

export const range = (t: MarineRadarType) => get(t).range;
export const resolution = (t: MarineRadarType) => get(t).resolution;
export const clutterReject = (t: MarineRadarType) => get(t).clutterReject;
export const targetTracking = (t: MarineRadarType) => get(t).targetTracking;
export const mrCost = (t: MarineRadarType) => get(t).mrCost;
export const solidState = (t: MarineRadarType) => get(t).solidState;
export const forCommercial = (t: MarineRadarType) => get(t).forCommercial;
export const technology = (t: MarineRadarType) => get(t).technology;
export const bestUse = (t: MarineRadarType) => get(t).bestUse;
export const marineRadarTypes = (): MarineRadarType[] =>
  Object.keys(DATA) as MarineRadarType[];
