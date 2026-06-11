export type DcDcConvType =
  | "buck_step_down"
  | "boost_step_up"
  | "buck_boost_invert"
  | "isolated_flyback"
  | "charge_pump_cap";

const DATA: Record<DcDcConvType, {
  efficiency: number; outputRipple: number; loadRange: number;
  inputRange: number; convCost: number; isolated: boolean;
  forBattery: boolean; topology: string; bestUse: string;
}> = {
  buck_step_down: { efficiency: 9, outputRipple: 7, loadRange: 9, inputRange: 6, convCost: 3, isolated: false, forBattery: true, topology: "inductor_switch_down", bestUse: "point_of_load_digital" },
  boost_step_up: { efficiency: 8, outputRipple: 6, loadRange: 7, inputRange: 7, convCost: 4, isolated: false, forBattery: true, topology: "inductor_switch_up", bestUse: "battery_to_higher_rail" },
  buck_boost_invert: { efficiency: 7, outputRipple: 5, loadRange: 6, inputRange: 10, convCost: 5, isolated: false, forBattery: true, topology: "inverting_buck_boost", bestUse: "wide_input_automotive" },
  isolated_flyback: { efficiency: 6, outputRipple: 4, loadRange: 5, inputRange: 8, convCost: 7, isolated: true, forBattery: false, topology: "transformer_coupled_fly", bestUse: "ac_dc_isolated_supply" },
  charge_pump_cap: { efficiency: 7, outputRipple: 5, loadRange: 3, inputRange: 4, convCost: 2, isolated: false, forBattery: true, topology: "switched_capacitor_mult", bestUse: "low_power_voltage_double" },
};

const get = (t: DcDcConvType) => DATA[t];

export const efficiency = (t: DcDcConvType) => get(t).efficiency;
export const outputRipple = (t: DcDcConvType) => get(t).outputRipple;
export const loadRange = (t: DcDcConvType) => get(t).loadRange;
export const inputRange = (t: DcDcConvType) => get(t).inputRange;
export const convCost = (t: DcDcConvType) => get(t).convCost;
export const isolated = (t: DcDcConvType) => get(t).isolated;
export const forBattery = (t: DcDcConvType) => get(t).forBattery;
export const topology = (t: DcDcConvType) => get(t).topology;
export const bestUse = (t: DcDcConvType) => get(t).bestUse;
export const dcDcConvs = (): DcDcConvType[] => Object.keys(DATA) as DcDcConvType[];
