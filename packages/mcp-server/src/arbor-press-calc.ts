export type ArborPressType =
  | "rack_pinion"
  | "compound_lever"
  | "pneumatic_arbor"
  | "electric_arbor"
  | "hand_arbor";

interface ArborPressData {
  forceRange: number;
  throughput: number;
  alignment: number;
  repeatability: number;
  apCost: number;
  powered: boolean;
  forBearing: boolean;
  pressConfig: string;
  bestUse: string;
}

const DATA: Record<ArborPressType, ArborPressData> = {
  rack_pinion: {
    forceRange: 7, throughput: 6, alignment: 8, repeatability: 7, apCost: 4,
    powered: false, forBearing: true,
    pressConfig: "rack_pinion_arbor_press_lever_handle_gear_mesh_bearing_insert",
    bestUse: "bearing_insert_rack_pinion_arbor_press_lever_gear_mesh_press",
  },
  compound_lever: {
    forceRange: 8, throughput: 5, alignment: 7, repeatability: 7, apCost: 5,
    powered: false, forBearing: true,
    pressConfig: "compound_lever_arbor_press_toggle_multiply_force_heavy_press",
    bestUse: "heavy_pin_compound_lever_arbor_press_toggle_multiply_force",
  },
  pneumatic_arbor: {
    forceRange: 8, throughput: 9, alignment: 8, repeatability: 9, apCost: 7,
    powered: true, forBearing: true,
    pressConfig: "pneumatic_arbor_press_air_cylinder_foot_pedal_fast_cycle_press",
    bestUse: "production_line_pneumatic_arbor_press_air_cylinder_fast_cycle",
  },
  electric_arbor: {
    forceRange: 9, throughput: 8, alignment: 9, repeatability: 10, apCost: 8,
    powered: true, forBearing: true,
    pressConfig: "electric_arbor_press_servo_motor_force_monitor_data_log_press",
    bestUse: "quality_critical_electric_arbor_press_servo_force_monitor_log",
  },
  hand_arbor: {
    forceRange: 5, throughput: 4, alignment: 6, repeatability: 5, apCost: 2,
    powered: false, forBearing: false,
    pressConfig: "hand_arbor_press_simple_lever_small_shop_light_duty_stake_set",
    bestUse: "small_shop_hand_arbor_press_simple_lever_light_duty_stake_set",
  },
};

function get(t: ArborPressType): ArborPressData {
  return DATA[t];
}

export const forceRange = (t: ArborPressType) => get(t).forceRange;
export const throughput = (t: ArborPressType) => get(t).throughput;
export const alignment = (t: ArborPressType) => get(t).alignment;
export const repeatability = (t: ArborPressType) => get(t).repeatability;
export const apCost = (t: ArborPressType) => get(t).apCost;
export const powered = (t: ArborPressType) => get(t).powered;
export const forBearing = (t: ArborPressType) => get(t).forBearing;
export const pressConfig = (t: ArborPressType) => get(t).pressConfig;
export const bestUse = (t: ArborPressType) => get(t).bestUse;
export const arborPressTypes = (): ArborPressType[] =>
  Object.keys(DATA) as ArborPressType[];
