export type GreywaterType =
  | "gravity_drum_filter"
  | "membrane_bioreactor"
  | "constructed_wetland"
  | "sand_media_filter"
  | "uv_ozone_disinfect";

interface GreywaterData {
  treatment: number;
  capacity: number;
  energy: number;
  footprint: number;
  gwCost: number;
  automated: boolean;
  forIrrigation: boolean;
  process: string;
  bestUse: string;
}

const DATA: Record<GreywaterType, GreywaterData> = {
  gravity_drum_filter: {
    treatment: 5, capacity: 4, energy: 9, footprint: 8, gwCost: 2,
    automated: false, forIrrigation: true,
    process: "gravity_screen_drum_settle",
    bestUse: "residential_garden_irrigation",
  },
  membrane_bioreactor: {
    treatment: 10, capacity: 8, energy: 5, footprint: 7, gwCost: 9,
    automated: true, forIrrigation: false,
    process: "mbr_ultrafiltration_bio_treat",
    bestUse: "commercial_toilet_flush_reuse",
  },
  constructed_wetland: {
    treatment: 7, capacity: 7, energy: 10, footprint: 3, gwCost: 5,
    automated: false, forIrrigation: true,
    process: "subsurface_flow_wetland_cells",
    bestUse: "campus_eco_park_large_site",
  },
  sand_media_filter: {
    treatment: 6, capacity: 6, energy: 8, footprint: 6, gwCost: 4,
    automated: false, forIrrigation: true,
    process: "multi_media_sand_gravel_filter",
    bestUse: "small_commercial_laundry_reuse",
  },
  uv_ozone_disinfect: {
    treatment: 9, capacity: 9, energy: 6, footprint: 9, gwCost: 7,
    automated: true, forIrrigation: false,
    process: "uv_ozone_polish_stage_combo",
    bestUse: "high_rise_non_potable_reclaim",
  },
};

function get(t: GreywaterType): GreywaterData {
  return DATA[t];
}

export const treatment = (t: GreywaterType) => get(t).treatment;
export const capacity = (t: GreywaterType) => get(t).capacity;
export const energy = (t: GreywaterType) => get(t).energy;
export const footprint = (t: GreywaterType) => get(t).footprint;
export const gwCost = (t: GreywaterType) => get(t).gwCost;
export const automated = (t: GreywaterType) => get(t).automated;
export const forIrrigation = (t: GreywaterType) => get(t).forIrrigation;
export const process = (t: GreywaterType) => get(t).process;
export const bestUse = (t: GreywaterType) => get(t).bestUse;
export const greywaterTypes = (): GreywaterType[] =>
  Object.keys(DATA) as GreywaterType[];
