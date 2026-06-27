export type CementSiloType =
  | "flat_bottom"
  | "cone_bottom"
  | "multi_cell"
  | "dome_silo"
  | "blending_silo";

interface CementSiloData {
  storageCapacity: number;
  dischargeRate: number;
  blendingAbility: number;
  materialFlow: number;
  csCost_: number;
  aerated: boolean;
  forBulk: boolean;
  siloConfig: string;
  bestUse: string;
}

const DATA: Record<CementSiloType, CementSiloData> = {
  flat_bottom: {
    storageCapacity: 10, dischargeRate: 6, blendingAbility: 4, materialFlow: 5, csCost_: 6,
    aerated: false, forBulk: true,
    siloConfig: "flat_bottom_cement_silo_large_diameter_sweep_arm_discharge",
    bestUse: "cement_terminal_flat_bottom_silo_large_volume_long_term_storage",
  },
  cone_bottom: {
    storageCapacity: 7, dischargeRate: 9, blendingAbility: 5, materialFlow: 9, csCost_: 7,
    aerated: true, forBulk: true,
    siloConfig: "cone_bottom_cement_silo_gravity_discharge_aeration_pad_flow",
    bestUse: "cement_plant_cone_bottom_silo_gravity_discharge_reliable_flow",
  },
  multi_cell: {
    storageCapacity: 9, dischargeRate: 8, blendingAbility: 8, materialFlow: 8, csCost_: 8,
    aerated: true, forBulk: true,
    siloConfig: "multi_cell_cement_silo_separate_compartment_grade_store_blend",
    bestUse: "large_cement_plant_multi_cell_silo_multiple_grade_segregated",
  },
  dome_silo: {
    storageCapacity: 10, dischargeRate: 7, blendingAbility: 6, materialFlow: 7, csCost_: 9,
    aerated: true, forBulk: true,
    siloConfig: "dome_silo_cement_concrete_shell_large_span_weather_protect",
    bestUse: "bulk_cement_storage_dome_silo_weather_protected_large_capacity",
  },
  blending_silo: {
    storageCapacity: 7, dischargeRate: 8, blendingAbility: 10, materialFlow: 9, csCost_: 10,
    aerated: true, forBulk: false,
    siloConfig: "blending_silo_cement_multi_outlet_air_mix_homogenize_quality",
    bestUse: "cement_quality_blending_silo_homogenize_raw_meal_consistent",
  },
};

function get(t: CementSiloType): CementSiloData {
  return DATA[t];
}

export const storageCapacity = (t: CementSiloType) => get(t).storageCapacity;
export const dischargeRate = (t: CementSiloType) => get(t).dischargeRate;
export const blendingAbility = (t: CementSiloType) => get(t).blendingAbility;
export const materialFlow = (t: CementSiloType) => get(t).materialFlow;
export const csCost_ = (t: CementSiloType) => get(t).csCost_;
export const aerated = (t: CementSiloType) => get(t).aerated;
export const forBulk = (t: CementSiloType) => get(t).forBulk;
export const siloConfig = (t: CementSiloType) => get(t).siloConfig;
export const bestUse = (t: CementSiloType) => get(t).bestUse;
export const cementSiloTypes = (): CementSiloType[] =>
  Object.keys(DATA) as CementSiloType[];
