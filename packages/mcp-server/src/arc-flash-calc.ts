export type ArcFlashType =
  | "incident_energy"
  | "arc_rated_ppe"
  | "flash_boundary"
  | "bus_differential"
  | "arc_resist_gear";

interface ArcFlashData {
  protection: number;
  throughput: number;
  hazardReduction: number;
  clearanceSpeed: number;
  afCost: number;
  passive: boolean;
  forSwitchgear: boolean;
  flashConfig: string;
  bestUse: string;
}

const DATA: Record<ArcFlashType, ArcFlashData> = {
  incident_energy: {
    protection: 6, throughput: 7, hazardReduction: 5, clearanceSpeed: 5, afCost: 3,
    passive: true, forSwitchgear: false,
    flashConfig: "incident_energy_analysis_ieee_1584_calc_label_boundary_ppe_cat",
    bestUse: "panel_label_incident_energy_analysis_ieee_1584_ppe_category_set",
  },
  arc_rated_ppe: {
    protection: 7, throughput: 6, hazardReduction: 6, clearanceSpeed: 4, afCost: 4,
    passive: true, forSwitchgear: false,
    flashConfig: "arc_rated_ppe_cal_per_cm2_suit_glove_face_shield_layer_system",
    bestUse: "maintenance_arc_rated_ppe_cal_cm2_suit_glove_face_shield_safe",
  },
  flash_boundary: {
    protection: 5, throughput: 8, hazardReduction: 7, clearanceSpeed: 6, afCost: 2,
    passive: true, forSwitchgear: false,
    flashConfig: "flash_boundary_calc_approach_limit_restricted_prohibited_clear",
    bestUse: "work_planning_flash_boundary_approach_limit_zone_mark_restrict",
  },
  bus_differential: {
    protection: 9, throughput: 9, hazardReduction: 9, clearanceSpeed: 10, afCost: 8,
    passive: false, forSwitchgear: true,
    flashConfig: "bus_differential_relay_zone_interlocked_fast_clear_arc_energy_low",
    bestUse: "switchgear_bus_differential_relay_fast_clear_reduce_arc_energy",
  },
  arc_resist_gear: {
    protection: 10, throughput: 9, hazardReduction: 10, clearanceSpeed: 10, afCost: 10,
    passive: false, forSwitchgear: true,
    flashConfig: "arc_resistant_switchgear_vent_redirect_contain_ieee_c37_20_7",
    bestUse: "utility_arc_resistant_switchgear_contain_vent_redirect_safe",
  },
};

function get(t: ArcFlashType): ArcFlashData {
  return DATA[t];
}

export const protection = (t: ArcFlashType) => get(t).protection;
export const throughput = (t: ArcFlashType) => get(t).throughput;
export const hazardReduction = (t: ArcFlashType) => get(t).hazardReduction;
export const clearanceSpeed = (t: ArcFlashType) => get(t).clearanceSpeed;
export const afCost = (t: ArcFlashType) => get(t).afCost;
export const passive = (t: ArcFlashType) => get(t).passive;
export const forSwitchgear = (t: ArcFlashType) => get(t).forSwitchgear;
export const flashConfig = (t: ArcFlashType) => get(t).flashConfig;
export const bestUse = (t: ArcFlashType) => get(t).bestUse;
export const arcFlashTypes = (): ArcFlashType[] =>
  Object.keys(DATA) as ArcFlashType[];
