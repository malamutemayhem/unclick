export type StampingPressType =
  | "mechanical_crank_flywheel"
  | "hydraulic_deep_draw"
  | "servo_mechanical_flex"
  | "transfer_press_multi_die"
  | "progressive_die_coil_fed";

interface StampingPressData {
  speed: number;
  force: number;
  precision: number;
  flexibility: number;
  spCost: number;
  servoControl: boolean;
  forHighVolume: boolean;
  drive: string;
  bestUse: string;
}

const DATA: Record<StampingPressType, StampingPressData> = {
  mechanical_crank_flywheel: {
    speed: 10, force: 8, precision: 7, flexibility: 5, spCost: 5,
    servoControl: false, forHighVolume: true,
    drive: "flywheel_crankshaft_eccentric",
    bestUse: "bracket_clip_washer_high_speed",
  },
  hydraulic_deep_draw: {
    speed: 5, force: 10, precision: 8, flexibility: 9, spCost: 6,
    servoControl: false, forHighVolume: false,
    drive: "hydraulic_cylinder_variable_speed",
    bestUse: "kitchen_sink_fuel_tank_deep_draw",
  },
  servo_mechanical_flex: {
    speed: 8, force: 9, precision: 10, flexibility: 10, spCost: 10,
    servoControl: true, forHighVolume: true,
    drive: "servo_motor_direct_crank_link",
    bestUse: "ev_motor_lamination_precision",
  },
  transfer_press_multi_die: {
    speed: 7, force: 9, precision: 8, flexibility: 7, spCost: 9,
    servoControl: false, forHighVolume: true,
    drive: "multi_station_transfer_bar",
    bestUse: "auto_body_panel_multi_operation",
  },
  progressive_die_coil_fed: {
    speed: 10, force: 7, precision: 9, flexibility: 4, spCost: 7,
    servoControl: false, forHighVolume: true,
    drive: "coil_feed_progressive_strip",
    bestUse: "connector_terminal_spring_clip",
  },
};

function get(t: StampingPressType): StampingPressData {
  return DATA[t];
}

export const speed = (t: StampingPressType) => get(t).speed;
export const force = (t: StampingPressType) => get(t).force;
export const precision = (t: StampingPressType) => get(t).precision;
export const flexibility = (t: StampingPressType) => get(t).flexibility;
export const spCost = (t: StampingPressType) => get(t).spCost;
export const servoControl = (t: StampingPressType) => get(t).servoControl;
export const forHighVolume = (t: StampingPressType) => get(t).forHighVolume;
export const drive = (t: StampingPressType) => get(t).drive;
export const bestUse = (t: StampingPressType) => get(t).bestUse;
export const stampingPressTypes = (): StampingPressType[] =>
  Object.keys(DATA) as StampingPressType[];
