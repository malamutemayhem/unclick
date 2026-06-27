export type ServoPressType =
  | "direct_drive"
  | "link_drive"
  | "screw_drive"
  | "knuckle_joint"
  | "toggle_press";

interface ServoPressData {
  forceAccuracy: number;
  throughput: number;
  strokeControl: number;
  energyEfficiency: number;
  svCost: number;
  programmable: boolean;
  forPrecision: boolean;
  pressConfig: string;
  bestUse: string;
}

const DATA: Record<ServoPressType, ServoPressData> = {
  direct_drive: {
    forceAccuracy: 10, throughput: 8, strokeControl: 10, energyEfficiency: 9, svCost: 9,
    programmable: true, forPrecision: true,
    pressConfig: "direct_drive_servo_press_motor_crank_variable_speed_force_curve",
    bestUse: "auto_panel_direct_drive_servo_press_variable_speed_force_curve",
  },
  link_drive: {
    forceAccuracy: 9, throughput: 9, strokeControl: 8, energyEfficiency: 8, svCost: 8,
    programmable: true, forPrecision: true,
    pressConfig: "link_drive_servo_press_eccentric_gear_dwell_bottom_dead_center",
    bestUse: "deep_draw_link_drive_servo_press_dwell_bottom_dead_center",
  },
  screw_drive: {
    forceAccuracy: 8, throughput: 6, strokeControl: 9, energyEfficiency: 7, svCost: 7,
    programmable: true, forPrecision: false,
    pressConfig: "screw_drive_servo_press_ball_screw_linear_force_assembly_join",
    bestUse: "assembly_join_screw_drive_servo_press_ball_screw_linear_force",
  },
  knuckle_joint: {
    forceAccuracy: 8, throughput: 10, strokeControl: 7, energyEfficiency: 8, svCost: 7,
    programmable: true, forPrecision: false,
    pressConfig: "knuckle_joint_servo_press_toggle_multiply_force_coin_mint_size",
    bestUse: "coin_sizing_knuckle_joint_servo_press_toggle_high_force_mint",
  },
  toggle_press: {
    forceAccuracy: 7, throughput: 7, strokeControl: 7, energyEfficiency: 7, svCost: 6,
    programmable: false, forPrecision: false,
    pressConfig: "toggle_servo_press_mechanical_linkage_clamp_force_multiply",
    bestUse: "general_stamp_toggle_servo_press_linkage_clamp_force_blanking",
  },
};

function get(t: ServoPressType): ServoPressData {
  return DATA[t];
}

export const forceAccuracy = (t: ServoPressType) => get(t).forceAccuracy;
export const throughput = (t: ServoPressType) => get(t).throughput;
export const strokeControl = (t: ServoPressType) => get(t).strokeControl;
export const energyEfficiency = (t: ServoPressType) => get(t).energyEfficiency;
export const svCost = (t: ServoPressType) => get(t).svCost;
export const programmable = (t: ServoPressType) => get(t).programmable;
export const forPrecision = (t: ServoPressType) => get(t).forPrecision;
export const pressConfig = (t: ServoPressType) => get(t).pressConfig;
export const bestUse = (t: ServoPressType) => get(t).bestUse;
export const servoPressTypes = (): ServoPressType[] =>
  Object.keys(DATA) as ServoPressType[];
