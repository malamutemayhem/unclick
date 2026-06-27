export type MashFilterType =
  | "plate_frame"
  | "membrane_squeeze"
  | "thin_bed"
  | "pressure_vessel"
  | "micro_filter";

interface MashFilterData {
  extractYield: number;
  filterSpeed: number;
  wortClarity: number;
  automation: number;
  mfCost: number;
  highGravity: boolean;
  forLargeScale: boolean;
  filterConfig: string;
  bestUse: string;
}

const DATA: Record<MashFilterType, MashFilterData> = {
  plate_frame: {
    extractYield: 9, filterSpeed: 8, wortClarity: 9, automation: 7, mfCost: 8,
    highGravity: true, forLargeScale: true,
    filterConfig: "plate_frame_mash_filter_polypropylene_cloth_press_spent_grain_dry",
    bestUse: "large_brewery_plate_frame_mash_filter_high_extract_fine_grind",
  },
  membrane_squeeze: {
    extractYield: 10, filterSpeed: 9, wortClarity: 10, automation: 9, mfCost: 10,
    highGravity: true, forLargeScale: true,
    filterConfig: "membrane_squeeze_mash_filter_inflatable_diaphragm_max_extract",
    bestUse: "mega_brewery_membrane_squeeze_filter_maximum_extract_yield_dry",
  },
  thin_bed: {
    extractYield: 8, filterSpeed: 10, wortClarity: 8, automation: 8, mfCost: 7,
    highGravity: false, forLargeScale: true,
    filterConfig: "thin_bed_mash_filter_shallow_grain_bed_rapid_cycle_continuous",
    bestUse: "high_throughput_brewery_thin_bed_filter_rapid_cycle_continuous",
  },
  pressure_vessel: {
    extractYield: 7, filterSpeed: 6, wortClarity: 7, automation: 5, mfCost: 5,
    highGravity: false, forLargeScale: false,
    filterConfig: "pressure_vessel_mash_filter_enclosed_tank_screen_bottom_sparge",
    bestUse: "mid_size_brewery_pressure_vessel_filter_enclosed_sparge_collect",
  },
  micro_filter: {
    extractYield: 7, filterSpeed: 5, wortClarity: 10, automation: 6, mfCost: 6,
    highGravity: false, forLargeScale: false,
    filterConfig: "micro_filter_crossflow_membrane_sterile_wort_cold_side_clarify",
    bestUse: "specialty_brewery_micro_filter_crossflow_membrane_sterile_wort",
  },
};

function get(t: MashFilterType): MashFilterData {
  return DATA[t];
}

export const extractYield = (t: MashFilterType) => get(t).extractYield;
export const filterSpeed = (t: MashFilterType) => get(t).filterSpeed;
export const wortClarity = (t: MashFilterType) => get(t).wortClarity;
export const automation = (t: MashFilterType) => get(t).automation;
export const mfCost = (t: MashFilterType) => get(t).mfCost;
export const highGravity = (t: MashFilterType) => get(t).highGravity;
export const forLargeScale = (t: MashFilterType) => get(t).forLargeScale;
export const filterConfig = (t: MashFilterType) => get(t).filterConfig;
export const bestUse = (t: MashFilterType) => get(t).bestUse;
export const mashFilterTypes = (): MashFilterType[] =>
  Object.keys(DATA) as MashFilterType[];
