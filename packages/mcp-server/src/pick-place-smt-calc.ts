export type PickPlaceSmtType =
  | "chip_shooter"
  | "turret_head"
  | "gantry_head"
  | "multi_head"
  | "flexible_placer";

interface PickPlaceSmtData {
  placementAccuracy: number;
  throughput: number;
  componentRange: number;
  feederCapacity: number;
  ppCost: number;
  highSpeed: boolean;
  forFine: boolean;
  placerConfig: string;
  bestUse: string;
}

const DATA: Record<PickPlaceSmtType, PickPlaceSmtData> = {
  chip_shooter: {
    placementAccuracy: 7, throughput: 10, componentRange: 5, feederCapacity: 8, ppCost: 7,
    highSpeed: true, forFine: false,
    placerConfig: "chip_shooter_smt_placer_turret_pick_shoot_passive_chip_fast",
    bestUse: "high_volume_smt_chip_shooter_passive_component_resistor_cap",
  },
  turret_head: {
    placementAccuracy: 8, throughput: 9, componentRange: 7, feederCapacity: 9, ppCost: 8,
    highSpeed: true, forFine: false,
    placerConfig: "turret_head_smt_placer_rotating_head_multi_nozzle_pick_place",
    bestUse: "mass_production_turret_head_smt_mixed_component_high_speed",
  },
  gantry_head: {
    placementAccuracy: 10, throughput: 6, componentRange: 10, feederCapacity: 7, ppCost: 9,
    highSpeed: false, forFine: true,
    placerConfig: "gantry_head_smt_placer_xy_precise_fine_pitch_bga_qfp_place",
    bestUse: "precision_smt_gantry_head_fine_pitch_bga_csp_flip_chip_place",
  },
  multi_head: {
    placementAccuracy: 9, throughput: 9, componentRange: 9, feederCapacity: 10, ppCost: 10,
    highSpeed: true, forFine: true,
    placerConfig: "multi_head_smt_placer_parallel_heads_simultaneous_pick_place",
    bestUse: "advanced_smt_multi_head_placer_mixed_high_speed_fine_pitch",
  },
  flexible_placer: {
    placementAccuracy: 8, throughput: 5, componentRange: 10, feederCapacity: 6, ppCost: 6,
    highSpeed: false, forFine: false,
    placerConfig: "flexible_smt_placer_manual_assist_small_batch_prototype_npi",
    bestUse: "prototype_lab_flexible_smt_placer_npi_small_batch_odd_form",
  },
};

function get(t: PickPlaceSmtType): PickPlaceSmtData {
  return DATA[t];
}

export const placementAccuracy = (t: PickPlaceSmtType) => get(t).placementAccuracy;
export const throughput = (t: PickPlaceSmtType) => get(t).throughput;
export const componentRange = (t: PickPlaceSmtType) => get(t).componentRange;
export const feederCapacity = (t: PickPlaceSmtType) => get(t).feederCapacity;
export const ppCost = (t: PickPlaceSmtType) => get(t).ppCost;
export const highSpeed = (t: PickPlaceSmtType) => get(t).highSpeed;
export const forFine = (t: PickPlaceSmtType) => get(t).forFine;
export const placerConfig = (t: PickPlaceSmtType) => get(t).placerConfig;
export const bestUse = (t: PickPlaceSmtType) => get(t).bestUse;
export const pickPlaceSmtTypes = (): PickPlaceSmtType[] =>
  Object.keys(DATA) as PickPlaceSmtType[];
