export type VoltageRegulatorType =
  | "linear_ldo_low_drop"
  | "buck_switching_step_down"
  | "boost_switching_step_up"
  | "buck_boost_combo"
  | "shunt_zener_simple";

const DATA: Record<VoltageRegulatorType, {
  efficiency: number; outputStability: number; noiseLevel: number;
  thermalPerform: number; regCost: number; switching: boolean;
  adjustable: boolean; topology: string; bestUse: string;
}> = {
  linear_ldo_low_drop: { efficiency: 4, outputStability: 9, noiseLevel: 9, thermalPerform: 4, regCost: 2, switching: false, adjustable: true, topology: "series_pass_element", bestUse: "noise_sensitive_analog" },
  buck_switching_step_down: { efficiency: 9, outputStability: 7, noiseLevel: 5, thermalPerform: 8, regCost: 5, switching: true, adjustable: true, topology: "inductor_switch_diode", bestUse: "high_current_digital" },
  boost_switching_step_up: { efficiency: 8, outputStability: 6, noiseLevel: 4, thermalPerform: 7, regCost: 6, switching: true, adjustable: true, topology: "inductor_switch_cap", bestUse: "battery_to_5v_boost" },
  buck_boost_combo: { efficiency: 7, outputStability: 7, noiseLevel: 4, thermalPerform: 7, regCost: 8, switching: true, adjustable: true, topology: "dual_inductor_bridge", bestUse: "variable_input_stable_out" },
  shunt_zener_simple: { efficiency: 3, outputStability: 5, noiseLevel: 7, thermalPerform: 3, regCost: 1, switching: false, adjustable: false, topology: "parallel_shunt_resistor", bestUse: "low_current_reference" },
};

const get = (t: VoltageRegulatorType) => DATA[t];

export const efficiency = (t: VoltageRegulatorType) => get(t).efficiency;
export const outputStability = (t: VoltageRegulatorType) => get(t).outputStability;
export const noiseLevel = (t: VoltageRegulatorType) => get(t).noiseLevel;
export const thermalPerform = (t: VoltageRegulatorType) => get(t).thermalPerform;
export const regCost = (t: VoltageRegulatorType) => get(t).regCost;
export const switching = (t: VoltageRegulatorType) => get(t).switching;
export const adjustable = (t: VoltageRegulatorType) => get(t).adjustable;
export const topology = (t: VoltageRegulatorType) => get(t).topology;
export const bestUse = (t: VoltageRegulatorType) => get(t).bestUse;
export const voltageRegulators = (): VoltageRegulatorType[] => Object.keys(DATA) as VoltageRegulatorType[];
