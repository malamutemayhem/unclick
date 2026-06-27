export type ServoDriveType =
  | "ac_rotary_brushless"
  | "dc_brush_servo"
  | "direct_drive_torque"
  | "linear_motor_iron"
  | "piezo_ultrasonic";

interface ServoDriveData {
  torqueDensity: number;
  speed: number;
  precision: number;
  bandwidth: number;
  sdCost: number;
  brushless: boolean;
  forHighDynamic: boolean;
  motor: string;
  bestUse: string;
}

const DATA: Record<ServoDriveType, ServoDriveData> = {
  ac_rotary_brushless: {
    torqueDensity: 8, speed: 9, precision: 8, bandwidth: 8, sdCost: 6,
    brushless: true, forHighDynamic: true,
    motor: "permanent_magnet_synchronous_sinusoidal_commutation",
    bestUse: "cnc_axis_robot_joint_packaging_machine_general",
  },
  dc_brush_servo: {
    torqueDensity: 5, speed: 7, precision: 6, bandwidth: 7, sdCost: 3,
    brushless: false, forHighDynamic: false,
    motor: "wound_armature_carbon_brush_simple_drive_electronics",
    bestUse: "legacy_retrofit_simple_positioning_educational_lab",
  },
  direct_drive_torque: {
    torqueDensity: 10, speed: 4, precision: 10, bandwidth: 9, sdCost: 9,
    brushless: true, forHighDynamic: true,
    motor: "high_pole_count_frameless_zero_backlash_direct_couple",
    bestUse: "rotary_index_table_telescope_antenna_precision_axis",
  },
  linear_motor_iron: {
    torqueDensity: 7, speed: 10, precision: 10, bandwidth: 10, sdCost: 8,
    brushless: true, forHighDynamic: true,
    motor: "flat_ironcore_or_ironless_linear_direct_thrust",
    bestUse: "semiconductor_pick_place_laser_cutting_head_fast",
  },
  piezo_ultrasonic: {
    torqueDensity: 3, speed: 3, precision: 10, bandwidth: 6, sdCost: 7,
    brushless: true, forHighDynamic: false,
    motor: "piezo_ceramic_stick_slip_or_ultrasonic_nanometer",
    bestUse: "optics_alignment_microscopy_stage_nano_positioning",
  },
};

function get(t: ServoDriveType): ServoDriveData {
  return DATA[t];
}

export const torqueDensity = (t: ServoDriveType) => get(t).torqueDensity;
export const speed = (t: ServoDriveType) => get(t).speed;
export const precision = (t: ServoDriveType) => get(t).precision;
export const bandwidth = (t: ServoDriveType) => get(t).bandwidth;
export const sdCost = (t: ServoDriveType) => get(t).sdCost;
export const brushless = (t: ServoDriveType) => get(t).brushless;
export const forHighDynamic = (t: ServoDriveType) => get(t).forHighDynamic;
export const motor = (t: ServoDriveType) => get(t).motor;
export const bestUse = (t: ServoDriveType) => get(t).bestUse;
export const servoDriveTypes = (): ServoDriveType[] =>
  Object.keys(DATA) as ServoDriveType[];
