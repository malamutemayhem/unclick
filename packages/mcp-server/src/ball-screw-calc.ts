export type BallScrewType =
  | "precision_ground"
  | "rolled_ball_screw"
  | "miniature_ball_screw"
  | "high_speed_ball"
  | "heavy_load_ball";

interface BallScrewData {
  posAccuracy: number;
  throughput: number;
  loadCapacity: number;
  maxSpeed: number;
  bscCost: number;
  preloaded: boolean;
  forCnc: boolean;
  screwConfig: string;
  bestUse: string;
}

const DATA: Record<BallScrewType, BallScrewData> = {
  precision_ground: {
    posAccuracy: 10, throughput: 7, loadCapacity: 8, maxSpeed: 7, bscCost: 8,
    preloaded: true, forCnc: true,
    screwConfig: "precision_ground_ball_screw_c3_c5_grade_low_backlash_cnc_axis",
    bestUse: "cnc_axis_precision_ground_ball_screw_sub_micron_position_repeat",
  },
  rolled_ball_screw: {
    posAccuracy: 6, throughput: 9, loadCapacity: 7, maxSpeed: 8, bscCost: 4,
    preloaded: false, forCnc: false,
    screwConfig: "rolled_ball_screw_cold_form_thread_economical_transport_actuate",
    bestUse: "transport_actuate_rolled_ball_screw_economical_general_motion",
  },
  miniature_ball_screw: {
    posAccuracy: 9, throughput: 5, loadCapacity: 4, maxSpeed: 9, bscCost: 7,
    preloaded: true, forCnc: false,
    screwConfig: "miniature_ball_screw_small_diameter_compact_instrument_optics",
    bestUse: "optics_stage_miniature_ball_screw_compact_fine_position_small",
  },
  high_speed_ball: {
    posAccuracy: 8, throughput: 8, loadCapacity: 7, maxSpeed: 10, bscCost: 9,
    preloaded: true, forCnc: true,
    screwConfig: "high_speed_ball_screw_large_lead_cool_nut_rapid_traverse",
    bestUse: "rapid_traverse_high_speed_ball_screw_large_lead_fast_motion",
  },
  heavy_load_ball: {
    posAccuracy: 7, throughput: 6, loadCapacity: 10, maxSpeed: 5, bscCost: 8,
    preloaded: true, forCnc: true,
    screwConfig: "heavy_load_ball_screw_large_diameter_double_nut_press_inject",
    bestUse: "press_inject_heavy_load_ball_screw_large_diameter_high_thrust",
  },
};

function get(t: BallScrewType): BallScrewData {
  return DATA[t];
}

export const posAccuracy = (t: BallScrewType) => get(t).posAccuracy;
export const throughput = (t: BallScrewType) => get(t).throughput;
export const loadCapacity = (t: BallScrewType) => get(t).loadCapacity;
export const maxSpeed = (t: BallScrewType) => get(t).maxSpeed;
export const bscCost = (t: BallScrewType) => get(t).bscCost;
export const preloaded = (t: BallScrewType) => get(t).preloaded;
export const forCnc = (t: BallScrewType) => get(t).forCnc;
export const screwConfig = (t: BallScrewType) => get(t).screwConfig;
export const bestUse = (t: BallScrewType) => get(t).bestUse;
export const ballScrewTypes = (): BallScrewType[] =>
  Object.keys(DATA) as BallScrewType[];
