export type TowerCraneType =
  | "hammerhead_fixed"
  | "luffing_jib"
  | "flat_top"
  | "self_erecting"
  | "climbing_internal";

interface TowerCraneData {
  maxLoad: number;
  jibLength: number;
  liftHeight: number;
  erectionSpeed: number;
  tcCost: number;
  selfErecting: boolean;
  forHighRise: boolean;
  jib: string;
  bestUse: string;
}

const DATA: Record<TowerCraneType, TowerCraneData> = {
  hammerhead_fixed: {
    maxLoad: 9, jibLength: 9, liftHeight: 8, erectionSpeed: 5, tcCost: 7,
    selfErecting: false, forHighRise: true,
    jib: "horizontal_hammerhead_jib_trolley_travel_counter_jib_weight",
    bestUse: "large_commercial_site_heavy_precast_steel_erection_general",
  },
  luffing_jib: {
    maxLoad: 10, jibLength: 8, liftHeight: 9, erectionSpeed: 5, tcCost: 9,
    selfErecting: false, forHighRise: true,
    jib: "luffing_variable_angle_jib_reduced_slew_radius_overlap",
    bestUse: "congested_city_site_multiple_crane_overlap_restricted_slew",
  },
  flat_top: {
    maxLoad: 8, jibLength: 9, liftHeight: 8, erectionSpeed: 6, tcCost: 8,
    selfErecting: false, forHighRise: true,
    jib: "flat_top_no_peak_modular_jib_easy_transport_quick_assembly",
    bestUse: "high_wind_site_multiple_crane_no_peak_interference_modular",
  },
  self_erecting: {
    maxLoad: 4, jibLength: 5, liftHeight: 4, erectionSpeed: 10, tcCost: 4,
    selfErecting: true, forHighRise: false,
    jib: "folding_mast_hydraulic_unfold_trailer_mounted_quick_setup",
    bestUse: "small_residential_site_quick_setup_no_assist_crane_needed",
  },
  climbing_internal: {
    maxLoad: 10, jibLength: 7, liftHeight: 10, erectionSpeed: 4, tcCost: 10,
    selfErecting: false, forHighRise: true,
    jib: "internal_climbing_frame_hydraulic_jack_floor_by_floor_rise",
    bestUse: "supertall_skyscraper_core_climb_extreme_height_construction",
  },
};

function get(t: TowerCraneType): TowerCraneData {
  return DATA[t];
}

export const maxLoad = (t: TowerCraneType) => get(t).maxLoad;
export const jibLength = (t: TowerCraneType) => get(t).jibLength;
export const liftHeight = (t: TowerCraneType) => get(t).liftHeight;
export const erectionSpeed = (t: TowerCraneType) => get(t).erectionSpeed;
export const tcCost = (t: TowerCraneType) => get(t).tcCost;
export const selfErecting = (t: TowerCraneType) => get(t).selfErecting;
export const forHighRise = (t: TowerCraneType) => get(t).forHighRise;
export const jib = (t: TowerCraneType) => get(t).jib;
export const bestUse = (t: TowerCraneType) => get(t).bestUse;
export const towerCraneTypes = (): TowerCraneType[] =>
  Object.keys(DATA) as TowerCraneType[];
