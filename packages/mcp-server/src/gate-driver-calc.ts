export type GateDriverType =
  | "low_side_single"
  | "high_side_bootstrap"
  | "half_bridge_dual"
  | "isolated_gate_opto"
  | "gan_specific_driver";

const DATA: Record<GateDriverType, {
  peakCurrent: number; propagDelay: number; driverVoltage: number;
  deadTime: number; driverCost: number; isolated: boolean;
  forGan: boolean; driveTopology: string; bestUse: string;
}> = {
  low_side_single: { peakCurrent: 5, propagDelay: 8, driverVoltage: 6, deadTime: 5, driverCost: 1, isolated: false, forGan: false, driveTopology: "totem_pole_output", bestUse: "single_nmos_switch" },
  high_side_bootstrap: { peakCurrent: 7, propagDelay: 7, driverVoltage: 8, deadTime: 7, driverCost: 3, isolated: false, forGan: false, driveTopology: "bootstrap_charge_pump", bestUse: "half_bridge_motor_drive" },
  half_bridge_dual: { peakCurrent: 8, propagDelay: 7, driverVoltage: 8, deadTime: 9, driverCost: 4, isolated: false, forGan: false, driveTopology: "dual_channel_adaptive", bestUse: "full_bridge_inverter" },
  isolated_gate_opto: { peakCurrent: 6, propagDelay: 5, driverVoltage: 9, deadTime: 6, driverCost: 7, isolated: true, forGan: false, driveTopology: "optocoupler_isolated", bestUse: "high_voltage_igbt_drive" },
  gan_specific_driver: { peakCurrent: 9, propagDelay: 10, driverVoltage: 7, deadTime: 10, driverCost: 8, isolated: false, forGan: true, driveTopology: "low_inductance_gan", bestUse: "high_freq_gan_converter" },
};

const get = (t: GateDriverType) => DATA[t];

export const peakCurrent = (t: GateDriverType) => get(t).peakCurrent;
export const propagDelay = (t: GateDriverType) => get(t).propagDelay;
export const driverVoltage = (t: GateDriverType) => get(t).driverVoltage;
export const deadTime = (t: GateDriverType) => get(t).deadTime;
export const driverCost = (t: GateDriverType) => get(t).driverCost;
export const isolated = (t: GateDriverType) => get(t).isolated;
export const forGan = (t: GateDriverType) => get(t).forGan;
export const driveTopology = (t: GateDriverType) => get(t).driveTopology;
export const bestUse = (t: GateDriverType) => get(t).bestUse;
export const gateDrivers = (): GateDriverType[] => Object.keys(DATA) as GateDriverType[];
