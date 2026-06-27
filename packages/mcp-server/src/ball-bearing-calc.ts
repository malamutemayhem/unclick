export type BallBearingType =
  | "deep_groove_standard"
  | "angular_contact_single"
  | "angular_contact_double"
  | "self_aligning_ball"
  | "miniature_precision";

interface BallBearingData {
  loadCapacity: number;
  speedLimit: number;
  misalignment: number;
  precision: number;
  bbCost: number;
  sealable: boolean;
  forHighSpeed: boolean;
  config: string;
  bestUse: string;
}

const DATA: Record<BallBearingType, BallBearingData> = {
  deep_groove_standard: {
    loadCapacity: 7, speedLimit: 9, misalignment: 3, precision: 7, bbCost: 3,
    sealable: true, forHighSpeed: true,
    config: "single_row_deep_groove_radial_axial_combined",
    bestUse: "electric_motor_gearbox_general_purpose_wide",
  },
  angular_contact_single: {
    loadCapacity: 8, speedLimit: 8, misalignment: 2, precision: 9, bbCost: 6,
    sealable: false, forHighSpeed: true,
    config: "single_row_angular_contact_one_direction_axial",
    bestUse: "machine_tool_spindle_pump_paired_mounting",
  },
  angular_contact_double: {
    loadCapacity: 9, speedLimit: 7, misalignment: 2, precision: 8, bbCost: 7,
    sealable: true, forHighSpeed: false,
    config: "double_row_angular_contact_both_axial_dir",
    bestUse: "hub_unit_gearbox_shaft_two_direction_thrust",
  },
  self_aligning_ball: {
    loadCapacity: 5, speedLimit: 8, misalignment: 10, precision: 5, bbCost: 5,
    sealable: true, forHighSpeed: false,
    config: "double_row_spherical_outer_race_self_align",
    bestUse: "conveyor_agriculture_misaligned_shaft_flex",
  },
  miniature_precision: {
    loadCapacity: 3, speedLimit: 10, misalignment: 2, precision: 10, bbCost: 8,
    sealable: true, forHighSpeed: true,
    config: "miniature_abec7_abec9_ceramic_hybrid_option",
    bestUse: "dental_handpiece_instrument_spindle_micro",
  },
};

function get(t: BallBearingType): BallBearingData {
  return DATA[t];
}

export const loadCapacity = (t: BallBearingType) => get(t).loadCapacity;
export const speedLimit = (t: BallBearingType) => get(t).speedLimit;
export const misalignment = (t: BallBearingType) => get(t).misalignment;
export const precision = (t: BallBearingType) => get(t).precision;
export const bbCost = (t: BallBearingType) => get(t).bbCost;
export const sealable = (t: BallBearingType) => get(t).sealable;
export const forHighSpeed = (t: BallBearingType) => get(t).forHighSpeed;
export const config = (t: BallBearingType) => get(t).config;
export const bestUse = (t: BallBearingType) => get(t).bestUse;
export const ballBearingTypes = (): BallBearingType[] =>
  Object.keys(DATA) as BallBearingType[];
