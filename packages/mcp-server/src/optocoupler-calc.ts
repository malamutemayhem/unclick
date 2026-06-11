export type OptocouplerType =
  | "phototransistor_4pin"
  | "phototriac_ac_switch"
  | "darlington_high_gain"
  | "high_speed_logic"
  | "linear_analog_iso";

const DATA: Record<OptocouplerType, {
  isolationVoltage: number; transferSpeed: number; ctrRatio: number;
  durability: number; optoCost: number; forAc: boolean;
  highSpeed: boolean; outputType: string; bestUse: string;
}> = {
  phototransistor_4pin: { isolationVoltage: 7, transferSpeed: 5, ctrRatio: 6, durability: 8, optoCost: 1, forAc: false, highSpeed: false, outputType: "npn_phototransistor", bestUse: "basic_signal_isolate" },
  phototriac_ac_switch: { isolationVoltage: 9, transferSpeed: 3, ctrRatio: 5, durability: 7, optoCost: 3, forAc: true, highSpeed: false, outputType: "triac_driver_output", bestUse: "mains_ac_relay_drive" },
  darlington_high_gain: { isolationVoltage: 7, transferSpeed: 4, ctrRatio: 9, durability: 7, optoCost: 2, forAc: false, highSpeed: false, outputType: "darlington_pair_out", bestUse: "low_input_current_drive" },
  high_speed_logic: { isolationVoltage: 6, transferSpeed: 9, ctrRatio: 4, durability: 8, optoCost: 5, forAc: false, highSpeed: true, outputType: "logic_gate_totem_pole", bestUse: "digital_bus_isolate" },
  linear_analog_iso: { isolationVoltage: 8, transferSpeed: 6, ctrRatio: 7, durability: 7, optoCost: 7, forAc: false, highSpeed: false, outputType: "linear_photodiode_amp", bestUse: "analog_feedback_loop" },
};

const get = (t: OptocouplerType) => DATA[t];

export const isolationVoltage = (t: OptocouplerType) => get(t).isolationVoltage;
export const transferSpeed = (t: OptocouplerType) => get(t).transferSpeed;
export const ctrRatio = (t: OptocouplerType) => get(t).ctrRatio;
export const durability = (t: OptocouplerType) => get(t).durability;
export const optoCost = (t: OptocouplerType) => get(t).optoCost;
export const forAc = (t: OptocouplerType) => get(t).forAc;
export const highSpeed = (t: OptocouplerType) => get(t).highSpeed;
export const outputType = (t: OptocouplerType) => get(t).outputType;
export const bestUse = (t: OptocouplerType) => get(t).bestUse;
export const optocouplers = (): OptocouplerType[] => Object.keys(DATA) as OptocouplerType[];
