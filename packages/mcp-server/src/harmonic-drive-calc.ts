export type HarmonicDriveType =
  | "cup_type_hd"
  | "hat_type_hd"
  | "pancake_hd"
  | "hollow_shaft_hd"
  | "unit_type_hd";

interface HarmonicDriveData {
  torqueDensity: number;
  throughput: number;
  backlash: number;
  ratioRange: number;
  hdCost: number;
  zeroBacklash: boolean;
  forRobot: boolean;
  driveConfig: string;
  bestUse: string;
}

const DATA: Record<HarmonicDriveType, HarmonicDriveData> = {
  cup_type_hd: {
    torqueDensity: 9, throughput: 8, backlash: 10, ratioRange: 8, hdCost: 8,
    zeroBacklash: true, forRobot: true,
    driveConfig: "cup_type_harmonic_drive_flex_spline_wave_generator_high_ratio",
    bestUse: "robot_joint_cup_type_harmonic_drive_zero_backlash_compact_axis",
  },
  hat_type_hd: {
    torqueDensity: 8, throughput: 7, backlash: 10, ratioRange: 7, hdCost: 7,
    zeroBacklash: true, forRobot: true,
    driveConfig: "hat_type_harmonic_drive_short_axial_flat_profile_compact",
    bestUse: "compact_joint_hat_type_harmonic_drive_short_axial_flat_mount",
  },
  pancake_hd: {
    torqueDensity: 7, throughput: 6, backlash: 10, ratioRange: 6, hdCost: 9,
    zeroBacklash: true, forRobot: false,
    driveConfig: "pancake_harmonic_drive_ultra_flat_thin_profile_space_constrain",
    bestUse: "space_limit_pancake_harmonic_drive_ultra_flat_thin_tight_fit",
  },
  hollow_shaft_hd: {
    torqueDensity: 8, throughput: 7, backlash: 9, ratioRange: 7, hdCost: 9,
    zeroBacklash: true, forRobot: true,
    driveConfig: "hollow_shaft_harmonic_drive_through_bore_cable_route_wrist",
    bestUse: "robot_wrist_hollow_shaft_harmonic_drive_through_bore_cable",
  },
  unit_type_hd: {
    torqueDensity: 10, throughput: 8, backlash: 9, ratioRange: 9, hdCost: 7,
    zeroBacklash: true, forRobot: true,
    driveConfig: "unit_type_harmonic_drive_integrated_bearing_motor_ready_mount",
    bestUse: "servo_axis_unit_type_harmonic_drive_integrated_bearing_direct",
  },
};

function get(t: HarmonicDriveType): HarmonicDriveData {
  return DATA[t];
}

export const torqueDensity = (t: HarmonicDriveType) => get(t).torqueDensity;
export const throughput = (t: HarmonicDriveType) => get(t).throughput;
export const backlash = (t: HarmonicDriveType) => get(t).backlash;
export const ratioRange = (t: HarmonicDriveType) => get(t).ratioRange;
export const hdCost = (t: HarmonicDriveType) => get(t).hdCost;
export const zeroBacklash = (t: HarmonicDriveType) => get(t).zeroBacklash;
export const forRobot = (t: HarmonicDriveType) => get(t).forRobot;
export const driveConfig = (t: HarmonicDriveType) => get(t).driveConfig;
export const bestUse = (t: HarmonicDriveType) => get(t).bestUse;
export const harmonicDriveTypes = (): HarmonicDriveType[] =>
  Object.keys(DATA) as HarmonicDriveType[];
