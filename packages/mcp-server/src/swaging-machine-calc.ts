export type SwagingMachineType =
  | "rotary_swage"
  | "stationary_die"
  | "tube_swage"
  | "point_swage"
  | "radial_forge";

interface SwagingMachineData {
  dimensionalAccuracy: number;
  throughput: number;
  reductionRatio: number;
  surfaceFinish: number;
  smCost: number;
  cold: boolean;
  forTubing: boolean;
  swagerConfig: string;
  bestUse: string;
}

const DATA: Record<SwagingMachineType, SwagingMachineData> = {
  rotary_swage: {
    dimensionalAccuracy: 9, throughput: 8, reductionRatio: 8, surfaceFinish: 8, smCost: 7,
    cold: true, forTubing: true,
    swagerConfig: "rotary_swage_machine_die_close_open_rapid_hammer_reduce_taper",
    bestUse: "cable_ferrule_rotary_swage_machine_die_hammer_reduce_taper",
  },
  stationary_die: {
    dimensionalAccuracy: 8, throughput: 7, reductionRatio: 9, surfaceFinish: 7, smCost: 6,
    cold: true, forTubing: false,
    swagerConfig: "stationary_die_swage_machine_push_pull_rod_bar_reduce_point",
    bestUse: "rod_point_stationary_die_swage_machine_push_pull_reduce_taper",
  },
  tube_swage: {
    dimensionalAccuracy: 9, throughput: 8, reductionRatio: 8, surfaceFinish: 9, smCost: 7,
    cold: true, forTubing: true,
    swagerConfig: "tube_swage_machine_internal_mandrel_wall_control_taper_neck",
    bestUse: "medical_tube_swage_machine_mandrel_wall_control_taper_neck",
  },
  point_swage: {
    dimensionalAccuracy: 7, throughput: 9, reductionRatio: 7, surfaceFinish: 7, smCost: 5,
    cold: true, forTubing: false,
    swagerConfig: "point_swage_machine_feed_roll_taper_tip_nail_screw_rivet_point",
    bestUse: "fastener_point_swage_machine_feed_roll_taper_nail_screw_tip",
  },
  radial_forge: {
    dimensionalAccuracy: 10, throughput: 6, reductionRatio: 10, surfaceFinish: 9, smCost: 10,
    cold: false, forTubing: false,
    swagerConfig: "radial_forge_swage_machine_four_die_hot_reduce_alloy_preform",
    bestUse: "superalloy_billet_radial_forge_swage_machine_four_die_reduce",
  },
};

function get(t: SwagingMachineType): SwagingMachineData {
  return DATA[t];
}

export const dimensionalAccuracy = (t: SwagingMachineType) => get(t).dimensionalAccuracy;
export const throughput = (t: SwagingMachineType) => get(t).throughput;
export const reductionRatio = (t: SwagingMachineType) => get(t).reductionRatio;
export const surfaceFinish = (t: SwagingMachineType) => get(t).surfaceFinish;
export const smCost = (t: SwagingMachineType) => get(t).smCost;
export const cold = (t: SwagingMachineType) => get(t).cold;
export const forTubing = (t: SwagingMachineType) => get(t).forTubing;
export const swagerConfig = (t: SwagingMachineType) => get(t).swagerConfig;
export const bestUse = (t: SwagingMachineType) => get(t).bestUse;
export const swagingMachineTypes = (): SwagingMachineType[] =>
  Object.keys(DATA) as SwagingMachineType[];
