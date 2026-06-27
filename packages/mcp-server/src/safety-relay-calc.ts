export type SafetyRelayType =
  | "estop_single_channel"
  | "estop_dual_channel"
  | "light_curtain_monitor"
  | "speed_standstill_monitor"
  | "configurable_safety_plc";

const DATA: Record<SafetyRelayType, {
  sil: number; channels: number; diagnostics: number;
  flexibility: number; srCost: number; configurable: boolean;
  forMachine: boolean; category: string; bestUse: string;
}> = {
  estop_single_channel: {
    sil: 4, channels: 3, diagnostics: 3,
    flexibility: 2, srCost: 1, configurable: false,
    forMachine: true, category: "cat_1_single_fault_stop",
    bestUse: "simple_estop_single_machine",
  },
  estop_dual_channel: {
    sil: 8, channels: 7, diagnostics: 7,
    flexibility: 3, srCost: 2, configurable: false,
    forMachine: true, category: "cat_3_dual_redundant_monitor",
    bestUse: "estop_circuit_redundant_monitor",
  },
  light_curtain_monitor: {
    sil: 8, channels: 6, diagnostics: 8,
    flexibility: 5, srCost: 3, configurable: false,
    forMachine: true, category: "cat_4_optoelectronic_safeguard",
    bestUse: "press_brake_robot_cell_access",
  },
  speed_standstill_monitor: {
    sil: 7, channels: 5, diagnostics: 9,
    flexibility: 4, srCost: 3, configurable: false,
    forMachine: true, category: "cat_3_encoder_pulse_monitor",
    bestUse: "spindle_conveyor_safe_speed_zero",
  },
  configurable_safety_plc: {
    sil: 9, channels: 10, diagnostics: 10,
    flexibility: 10, srCost: 5, configurable: true,
    forMachine: true, category: "cat_4_programmable_sil3_plc",
    bestUse: "complex_multi_zone_safety_system",
  },
};

const get = (t: SafetyRelayType) => DATA[t];

export const sil = (t: SafetyRelayType) => get(t).sil;
export const channels = (t: SafetyRelayType) => get(t).channels;
export const diagnostics = (t: SafetyRelayType) => get(t).diagnostics;
export const flexibility = (t: SafetyRelayType) => get(t).flexibility;
export const srCost = (t: SafetyRelayType) => get(t).srCost;
export const configurable = (t: SafetyRelayType) => get(t).configurable;
export const forMachine = (t: SafetyRelayType) => get(t).forMachine;
export const category = (t: SafetyRelayType) => get(t).category;
export const bestUse = (t: SafetyRelayType) => get(t).bestUse;
export const safetyRelayTypes = (): SafetyRelayType[] => Object.keys(DATA) as SafetyRelayType[];
