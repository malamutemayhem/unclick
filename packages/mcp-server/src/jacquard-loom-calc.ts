export type JacquardLoomType =
  | "mechanical_jacquard"
  | "electronic_jacquard"
  | "open_shed"
  | "double_lift"
  | "carpet_jacquard";

interface JacquardLoomData {
  patternComplexity: number;
  throughput: number;
  fabricQuality: number;
  hookCapacity: number;
  jlCost: number;
  electronic: boolean;
  forBrocade: boolean;
  loomConfig: string;
  bestUse: string;
}

const DATA: Record<JacquardLoomType, JacquardLoomData> = {
  mechanical_jacquard: {
    patternComplexity: 7, throughput: 5, fabricQuality: 8, hookCapacity: 6, jlCost: 4,
    electronic: false, forBrocade: true,
    loomConfig: "mechanical_jacquard_loom_punch_card_harness_lift_pattern_weave",
    bestUse: "traditional_brocade_mechanical_jacquard_punch_card_artisan_fabric",
  },
  electronic_jacquard: {
    patternComplexity: 10, throughput: 9, fabricQuality: 9, hookCapacity: 10, jlCost: 9,
    electronic: true, forBrocade: true,
    loomConfig: "electronic_jacquard_loom_solenoid_actuator_digital_pattern_fast",
    bestUse: "modern_textile_electronic_jacquard_complex_pattern_high_speed",
  },
  open_shed: {
    patternComplexity: 9, throughput: 8, fabricQuality: 9, hookCapacity: 9, jlCost: 8,
    electronic: true, forBrocade: true,
    loomConfig: "open_shed_jacquard_loom_full_shed_opening_clear_insertion_path",
    bestUse: "high_quality_fabric_open_shed_jacquard_clean_shed_clear_weave",
  },
  double_lift: {
    patternComplexity: 8, throughput: 10, fabricQuality: 8, hookCapacity: 8, jlCost: 7,
    electronic: true, forBrocade: false,
    loomConfig: "double_lift_jacquard_loom_two_position_fast_shed_change_speed",
    bestUse: "production_textile_double_lift_jacquard_fast_shed_high_output",
  },
  carpet_jacquard: {
    patternComplexity: 9, throughput: 7, fabricQuality: 10, hookCapacity: 10, jlCost: 10,
    electronic: true, forBrocade: false,
    loomConfig: "carpet_jacquard_loom_multi_frame_pile_wire_cut_loop_pattern",
    bestUse: "carpet_mill_jacquard_loom_complex_pile_pattern_axminster_wilton",
  },
};

function get(t: JacquardLoomType): JacquardLoomData {
  return DATA[t];
}

export const patternComplexity = (t: JacquardLoomType) => get(t).patternComplexity;
export const throughput = (t: JacquardLoomType) => get(t).throughput;
export const fabricQuality = (t: JacquardLoomType) => get(t).fabricQuality;
export const hookCapacity = (t: JacquardLoomType) => get(t).hookCapacity;
export const jlCost = (t: JacquardLoomType) => get(t).jlCost;
export const electronic = (t: JacquardLoomType) => get(t).electronic;
export const forBrocade = (t: JacquardLoomType) => get(t).forBrocade;
export const loomConfig = (t: JacquardLoomType) => get(t).loomConfig;
export const bestUse = (t: JacquardLoomType) => get(t).bestUse;
export const jacquardLoomTypes = (): JacquardLoomType[] =>
  Object.keys(DATA) as JacquardLoomType[];
