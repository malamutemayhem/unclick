export type LinearActuatorType =
  | "ball_screw_servo"
  | "belt_drive_long_travel"
  | "rack_pinion_heavy"
  | "linear_motor_direct"
  | "piezo_nano_position";

interface LinearActuatorData {
  force: number;
  speed: number;
  precision: number;
  stroke: number;
  laCost: number;
  directDrive: boolean;
  forCleanroom: boolean;
  mechanism: string;
  bestUse: string;
}

const DATA: Record<LinearActuatorType, LinearActuatorData> = {
  ball_screw_servo: {
    force: 9, speed: 7, precision: 9, stroke: 6, laCost: 7,
    directDrive: false, forCleanroom: false,
    mechanism: "recirculating_ball_nut_preloaded",
    bestUse: "cnc_axis_press_position_control",
  },
  belt_drive_long_travel: {
    force: 5, speed: 10, precision: 6, stroke: 10, laCost: 5,
    directDrive: false, forCleanroom: false,
    mechanism: "timing_belt_profile_rail_guide",
    bestUse: "gantry_pick_place_long_stroke",
  },
  rack_pinion_heavy: {
    force: 10, speed: 8, precision: 7, stroke: 9, laCost: 6,
    directDrive: false, forCleanroom: false,
    mechanism: "helical_rack_planetary_pinion",
    bestUse: "heavy_gantry_portal_cnc_travel",
  },
  linear_motor_direct: {
    force: 7, speed: 10, precision: 10, stroke: 7, laCost: 10,
    directDrive: true, forCleanroom: true,
    mechanism: "ironless_linear_motor_air_bearing",
    bestUse: "semiconductor_wafer_ultra_precise",
  },
  piezo_nano_position: {
    force: 3, speed: 9, precision: 10, stroke: 2, laCost: 9,
    directDrive: true, forCleanroom: true,
    mechanism: "piezo_stack_flexure_nanometer",
    bestUse: "optics_microscopy_nano_align",
  },
};

function get(t: LinearActuatorType): LinearActuatorData {
  return DATA[t];
}

export const force = (t: LinearActuatorType) => get(t).force;
export const speed = (t: LinearActuatorType) => get(t).speed;
export const precision = (t: LinearActuatorType) => get(t).precision;
export const stroke = (t: LinearActuatorType) => get(t).stroke;
export const laCost = (t: LinearActuatorType) => get(t).laCost;
export const directDrive = (t: LinearActuatorType) => get(t).directDrive;
export const forCleanroom = (t: LinearActuatorType) => get(t).forCleanroom;
export const mechanism = (t: LinearActuatorType) => get(t).mechanism;
export const bestUse = (t: LinearActuatorType) => get(t).bestUse;
export const linearActuatorTypes = (): LinearActuatorType[] =>
  Object.keys(DATA) as LinearActuatorType[];
