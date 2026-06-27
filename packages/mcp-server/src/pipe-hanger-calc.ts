export type PipeHangerType =
  | "clevis_hanger_std"
  | "spring_hanger_variable"
  | "constant_support_spring"
  | "rigid_strut_anchor"
  | "roller_support_slide";

interface PipeHangerData {
  loadCapacity: number;
  thermalMove: number;
  adjustability: number;
  installEase: number;
  phCost: number;
  springLoaded: boolean;
  forHotPipe: boolean;
  support: string;
  bestUse: string;
}

const DATA: Record<PipeHangerType, PipeHangerData> = {
  clevis_hanger_std: {
    loadCapacity: 7, thermalMove: 4, adjustability: 6, installEase: 9, phCost: 3,
    springLoaded: false, forHotPipe: false,
    support: "clevis_strap_rod_beam_clamp_simple_hang",
    bestUse: "general_utility_piping_cold_water_drain",
  },
  spring_hanger_variable: {
    loadCapacity: 8, thermalMove: 8, adjustability: 9, installEase: 6, phCost: 7,
    springLoaded: true, forHotPipe: true,
    support: "variable_spring_coil_travel_load_indicator",
    bestUse: "steam_piping_moderate_movement_power_plant",
  },
  constant_support_spring: {
    loadCapacity: 9, thermalMove: 10, adjustability: 8, installEase: 5, phCost: 9,
    springLoaded: true, forHotPipe: true,
    support: "constant_force_spring_mechanism_level_travel",
    bestUse: "critical_high_temp_piping_large_thermal_move",
  },
  rigid_strut_anchor: {
    loadCapacity: 10, thermalMove: 1, adjustability: 3, installEase: 8, phCost: 4,
    springLoaded: false, forHotPipe: false,
    support: "rigid_strut_clamp_fixed_point_anchor_bracket",
    bestUse: "pipe_anchor_point_thrust_restraint_seismic",
  },
  roller_support_slide: {
    loadCapacity: 8, thermalMove: 9, adjustability: 5, installEase: 7, phCost: 5,
    springLoaded: false, forHotPipe: true,
    support: "roller_or_slide_plate_horizontal_movement",
    bestUse: "long_run_hot_pipe_horizontal_expansion_slide",
  },
};

function get(t: PipeHangerType): PipeHangerData {
  return DATA[t];
}

export const loadCapacity = (t: PipeHangerType) => get(t).loadCapacity;
export const thermalMove = (t: PipeHangerType) => get(t).thermalMove;
export const adjustability = (t: PipeHangerType) => get(t).adjustability;
export const installEase = (t: PipeHangerType) => get(t).installEase;
export const phCost = (t: PipeHangerType) => get(t).phCost;
export const springLoaded = (t: PipeHangerType) => get(t).springLoaded;
export const forHotPipe = (t: PipeHangerType) => get(t).forHotPipe;
export const support = (t: PipeHangerType) => get(t).support;
export const bestUse = (t: PipeHangerType) => get(t).bestUse;
export const pipeHangerTypes = (): PipeHangerType[] =>
  Object.keys(DATA) as PipeHangerType[];
