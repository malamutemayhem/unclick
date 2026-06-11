export type VibratoryRollerType =
  | "single_drum_smooth"
  | "tandem_smooth"
  | "padfoot_sheepsfoot"
  | "pneumatic_tire"
  | "combination_roller";

interface VibratoryRollerData {
  compactionForce: number;
  speed: number;
  versatility: number;
  surfaceFinish: number;
  vrCost: number;
  vibrating: boolean;
  forAsphalt: boolean;
  drum: string;
  bestUse: string;
}

const DATA: Record<VibratoryRollerType, VibratoryRollerData> = {
  single_drum_smooth: {
    compactionForce: 9, speed: 7, versatility: 7, surfaceFinish: 7, vrCost: 7,
    vibrating: true, forAsphalt: false,
    drum: "single_smooth_steel_drum_vibration_eccentric_weight_rear_tire",
    bestUse: "earthwork_subgrade_granular_fill_road_base_compaction",
  },
  tandem_smooth: {
    compactionForce: 7, speed: 8, versatility: 6, surfaceFinish: 10, vrCost: 8,
    vibrating: true, forAsphalt: true,
    drum: "dual_smooth_steel_drum_front_rear_vibration_asphalt_finish",
    bestUse: "asphalt_surface_course_finish_rolling_smooth_pavement",
  },
  padfoot_sheepsfoot: {
    compactionForce: 10, speed: 6, versatility: 5, surfaceFinish: 3, vrCost: 7,
    vibrating: true, forAsphalt: false,
    drum: "protruding_pad_tamping_foot_kneading_action_cohesive_soil",
    bestUse: "clay_silt_cohesive_soil_dam_embankment_landfill_compaction",
  },
  pneumatic_tire: {
    compactionForce: 6, speed: 9, versatility: 8, surfaceFinish: 8, vrCost: 6,
    vibrating: false, forAsphalt: true,
    drum: "multiple_pneumatic_rubber_tire_kneading_sealed_surface_flex",
    bestUse: "asphalt_intermediate_rolling_chip_seal_proof_rolling_test",
  },
  combination_roller: {
    compactionForce: 8, speed: 7, versatility: 10, surfaceFinish: 8, vrCost: 9,
    vibrating: true, forAsphalt: true,
    drum: "front_smooth_drum_rear_pneumatic_tire_dual_action_compact",
    bestUse: "versatile_site_asphalt_and_soil_single_machine_solution",
  },
};

function get(t: VibratoryRollerType): VibratoryRollerData {
  return DATA[t];
}

export const compactionForce = (t: VibratoryRollerType) => get(t).compactionForce;
export const speed = (t: VibratoryRollerType) => get(t).speed;
export const versatility = (t: VibratoryRollerType) => get(t).versatility;
export const surfaceFinish = (t: VibratoryRollerType) => get(t).surfaceFinish;
export const vrCost = (t: VibratoryRollerType) => get(t).vrCost;
export const vibrating = (t: VibratoryRollerType) => get(t).vibrating;
export const forAsphalt = (t: VibratoryRollerType) => get(t).forAsphalt;
export const drum = (t: VibratoryRollerType) => get(t).drum;
export const bestUse = (t: VibratoryRollerType) => get(t).bestUse;
export const vibratoryRollerTypes = (): VibratoryRollerType[] =>
  Object.keys(DATA) as VibratoryRollerType[];
