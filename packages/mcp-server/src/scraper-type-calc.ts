export type ScraperType =
  | "single_engine_open_bowl"
  | "twin_engine_push_pull"
  | "elevating_self_loading"
  | "auger_self_loading"
  | "pull_behind_towed";

interface ScraperData {
  capacity: number;
  speed: number;
  loadTime: number;
  haul: number;
  scCost: number;
  selfLoading: boolean;
  forEarthwork: boolean;
  bowl: string;
  bestUse: string;
}

const DATA: Record<ScraperType, ScraperData> = {
  single_engine_open_bowl: {
    capacity: 8, speed: 8, loadTime: 5, haul: 9, scCost: 7,
    selfLoading: false, forEarthwork: true,
    bowl: "open_bowl_apron_ejector",
    bestUse: "large_cut_fill_with_pusher",
  },
  twin_engine_push_pull: {
    capacity: 9, speed: 8, loadTime: 7, haul: 9, scCost: 9,
    selfLoading: false, forEarthwork: true,
    bowl: "tandem_bowl_push_pull_pair",
    bestUse: "large_volume_no_pusher_needed",
  },
  elevating_self_loading: {
    capacity: 7, speed: 7, loadTime: 9, haul: 8, scCost: 8,
    selfLoading: true, forEarthwork: true,
    bowl: "elevator_flight_chain_self_load",
    bestUse: "medium_haul_no_pusher_available",
  },
  auger_self_loading: {
    capacity: 6, speed: 7, loadTime: 8, haul: 7, scCost: 7,
    selfLoading: true, forEarthwork: true,
    bowl: "auger_spiral_self_loading_bowl",
    bestUse: "sticky_clay_cohesive_self_load",
  },
  pull_behind_towed: {
    capacity: 4, speed: 6, loadTime: 4, haul: 5, scCost: 3,
    selfLoading: false, forEarthwork: false,
    bowl: "towed_bowl_tractor_pulled",
    bestUse: "farm_land_level_small_earthwork",
  },
};

function get(t: ScraperType): ScraperData {
  return DATA[t];
}

export const capacity = (t: ScraperType) => get(t).capacity;
export const speed = (t: ScraperType) => get(t).speed;
export const loadTime = (t: ScraperType) => get(t).loadTime;
export const haul = (t: ScraperType) => get(t).haul;
export const scCost = (t: ScraperType) => get(t).scCost;
export const selfLoading = (t: ScraperType) => get(t).selfLoading;
export const forEarthwork = (t: ScraperType) => get(t).forEarthwork;
export const bowl = (t: ScraperType) => get(t).bowl;
export const bestUse = (t: ScraperType) => get(t).bestUse;
export const scraperTypes = (): ScraperType[] =>
  Object.keys(DATA) as ScraperType[];
