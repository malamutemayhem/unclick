export type RedoxOrpType =
  | "platinum_band_standard"
  | "gold_ring_noble"
  | "silver_silver_chloride"
  | "combination_orp_gel"
  | "differential_orp_dual";

interface RedoxOrpData {
  accuracy: number;
  response: number;
  poisonResist: number;
  maintenance: number;
  roCost: number;
  combination: boolean;
  forChlorination: boolean;
  electrode: string;
  bestUse: string;
}

const DATA: Record<RedoxOrpType, RedoxOrpData> = {
  platinum_band_standard: {
    accuracy: 8, response: 8, poisonResist: 6, maintenance: 6, roCost: 4,
    combination: false, forChlorination: true,
    electrode: "platinum_band_sensing_ag_agcl_ref",
    bestUse: "water_treatment_chlorination_control",
  },
  gold_ring_noble: {
    accuracy: 8, response: 7, poisonResist: 8, maintenance: 7, roCost: 6,
    combination: false, forChlorination: false,
    electrode: "gold_ring_sensing_noble_metal_inert",
    bestUse: "cyanide_destruct_chrome_reduction_waste",
  },
  silver_silver_chloride: {
    accuracy: 7, response: 6, poisonResist: 5, maintenance: 5, roCost: 3,
    combination: false, forChlorination: false,
    electrode: "ag_agcl_reference_kcl_bridge_solution",
    bestUse: "lab_reference_standard_orp_calibration",
  },
  combination_orp_gel: {
    accuracy: 7, response: 9, poisonResist: 5, maintenance: 8, roCost: 4,
    combination: true, forChlorination: true,
    electrode: "platinum_tip_gel_filled_ref_combined",
    bestUse: "pool_spa_cooling_tower_simple_orp_read",
  },
  differential_orp_dual: {
    accuracy: 9, response: 7, poisonResist: 9, maintenance: 6, roCost: 7,
    combination: false, forChlorination: false,
    electrode: "dual_platinum_differential_noise_reject",
    bestUse: "harsh_chemical_process_sulfide_scrubber",
  },
};

function get(t: RedoxOrpType): RedoxOrpData {
  return DATA[t];
}

export const accuracy = (t: RedoxOrpType) => get(t).accuracy;
export const response = (t: RedoxOrpType) => get(t).response;
export const poisonResist = (t: RedoxOrpType) => get(t).poisonResist;
export const maintenance = (t: RedoxOrpType) => get(t).maintenance;
export const roCost = (t: RedoxOrpType) => get(t).roCost;
export const combination = (t: RedoxOrpType) => get(t).combination;
export const forChlorination = (t: RedoxOrpType) => get(t).forChlorination;
export const electrode = (t: RedoxOrpType) => get(t).electrode;
export const bestUse = (t: RedoxOrpType) => get(t).bestUse;
export const redoxOrpTypes = (): RedoxOrpType[] =>
  Object.keys(DATA) as RedoxOrpType[];
