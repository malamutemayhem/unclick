export type MosfetSwitchType =
  | "nmos_enhance_logic"
  | "pmos_high_side"
  | "gan_hemt_power"
  | "sic_mosfet_high_v"
  | "trench_mosfet_low_r";

const DATA: Record<MosfetSwitchType, {
  rdsOn: number; switchSpeed: number; voltageRating: number;
  thermalPerf: number; switchCost: number; enhancementMode: boolean;
  forHighVoltage: boolean; technology: string; bestUse: string;
}> = {
  nmos_enhance_logic: { rdsOn: 7, switchSpeed: 7, voltageRating: 5, thermalPerf: 6, switchCost: 2, enhancementMode: true, forHighVoltage: false, technology: "planar_silicon_nmos", bestUse: "low_side_digital_switch" },
  pmos_high_side: { rdsOn: 5, switchSpeed: 5, voltageRating: 4, thermalPerf: 5, switchCost: 3, enhancementMode: true, forHighVoltage: false, technology: "planar_silicon_pmos", bestUse: "simple_high_side_switch" },
  gan_hemt_power: { rdsOn: 10, switchSpeed: 10, voltageRating: 7, thermalPerf: 8, switchCost: 9, enhancementMode: true, forHighVoltage: true, technology: "gallium_nitride_hemt", bestUse: "high_freq_power_stage" },
  sic_mosfet_high_v: { rdsOn: 8, switchSpeed: 8, voltageRating: 10, thermalPerf: 10, switchCost: 10, enhancementMode: true, forHighVoltage: true, technology: "silicon_carbide_mos", bestUse: "ev_inverter_high_temp" },
  trench_mosfet_low_r: { rdsOn: 9, switchSpeed: 6, voltageRating: 6, thermalPerf: 7, switchCost: 4, enhancementMode: true, forHighVoltage: false, technology: "trench_gate_silicon", bestUse: "high_current_load_switch" },
};

const get = (t: MosfetSwitchType) => DATA[t];

export const rdsOn = (t: MosfetSwitchType) => get(t).rdsOn;
export const switchSpeed = (t: MosfetSwitchType) => get(t).switchSpeed;
export const voltageRating = (t: MosfetSwitchType) => get(t).voltageRating;
export const thermalPerf = (t: MosfetSwitchType) => get(t).thermalPerf;
export const switchCost = (t: MosfetSwitchType) => get(t).switchCost;
export const enhancementMode = (t: MosfetSwitchType) => get(t).enhancementMode;
export const forHighVoltage = (t: MosfetSwitchType) => get(t).forHighVoltage;
export const technology = (t: MosfetSwitchType) => get(t).technology;
export const bestUse = (t: MosfetSwitchType) => get(t).bestUse;
export const mosfetSwitches = (): MosfetSwitchType[] => Object.keys(DATA) as MosfetSwitchType[];
