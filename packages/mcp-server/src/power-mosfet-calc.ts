export type PowerMosfetType =
  | "n_channel_logic_level"
  | "p_channel_high_side"
  | "n_channel_high_voltage"
  | "smd_sot23_small"
  | "to220_heat_sink";

const DATA: Record<PowerMosfetType, {
  rdsOn: number; currentHandle: number; switchSpeed: number;
  thermalPerform: number; mosfetCost: number; logicLevel: boolean;
  forHighSide: boolean; packageStyle: string; bestUse: string;
}> = {
  n_channel_logic_level: { rdsOn: 8, currentHandle: 7, switchSpeed: 8, thermalPerform: 6, mosfetCost: 3, logicLevel: true, forHighSide: false, packageStyle: "to220_through_hole", bestUse: "mcu_direct_switch" },
  p_channel_high_side: { rdsOn: 5, currentHandle: 6, switchSpeed: 6, thermalPerform: 5, mosfetCost: 5, logicLevel: false, forHighSide: true, packageStyle: "to220_through_hole", bestUse: "high_side_power_switch" },
  n_channel_high_voltage: { rdsOn: 4, currentHandle: 9, switchSpeed: 5, thermalPerform: 7, mosfetCost: 7, logicLevel: false, forHighSide: false, packageStyle: "to247_bolt_mount", bestUse: "motor_inverter_stage" },
  smd_sot23_small: { rdsOn: 6, currentHandle: 3, switchSpeed: 9, thermalPerform: 3, mosfetCost: 1, logicLevel: true, forHighSide: false, packageStyle: "sot23_surface_mount", bestUse: "signal_level_switch" },
  to220_heat_sink: { rdsOn: 7, currentHandle: 8, switchSpeed: 7, thermalPerform: 9, mosfetCost: 4, logicLevel: false, forHighSide: false, packageStyle: "to220_with_heatsink", bestUse: "linear_regulator_pass" },
};

const get = (t: PowerMosfetType) => DATA[t];

export const rdsOn = (t: PowerMosfetType) => get(t).rdsOn;
export const currentHandle = (t: PowerMosfetType) => get(t).currentHandle;
export const switchSpeed = (t: PowerMosfetType) => get(t).switchSpeed;
export const thermalPerform = (t: PowerMosfetType) => get(t).thermalPerform;
export const mosfetCost = (t: PowerMosfetType) => get(t).mosfetCost;
export const logicLevel = (t: PowerMosfetType) => get(t).logicLevel;
export const forHighSide = (t: PowerMosfetType) => get(t).forHighSide;
export const packageStyle = (t: PowerMosfetType) => get(t).packageStyle;
export const bestUse = (t: PowerMosfetType) => get(t).bestUse;
export const powerMosfets = (): PowerMosfetType[] => Object.keys(DATA) as PowerMosfetType[];
