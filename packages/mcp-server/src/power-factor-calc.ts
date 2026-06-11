export type PowerFactorMethod =
  | "passive_pfc_inductor"
  | "active_pfc_boost"
  | "bridgeless_totem"
  | "interleaved_dual"
  | "vienna_3level";

const DATA: Record<PowerFactorMethod, {
  powerFactor: number; efficiency: number; thd: number;
  complexity: number; methodCost: number; bridgeless: boolean;
  forServer: boolean; topology: string; bestUse: string;
}> = {
  passive_pfc_inductor: {
    powerFactor: 3, efficiency: 4, thd: 3,
    complexity: 1, methodCost: 2, bridgeless: false,
    forServer: false, topology: "series_choke_filter",
    bestUse: "low_power_adapter",
  },
  active_pfc_boost: {
    powerFactor: 8, efficiency: 7, thd: 8,
    complexity: 5, methodCost: 5, bridgeless: false,
    forServer: true, topology: "ccm_boost_pwm",
    bestUse: "atx_power_supply",
  },
  bridgeless_totem: {
    powerFactor: 9, efficiency: 9, thd: 9,
    complexity: 7, methodCost: 7, bridgeless: true,
    forServer: true, topology: "totem_pole_gan",
    bestUse: "high_eff_server_psu",
  },
  interleaved_dual: {
    powerFactor: 8, efficiency: 8, thd: 7,
    complexity: 8, methodCost: 8, bridgeless: false,
    forServer: true, topology: "phase_shifted_parallel",
    bestUse: "high_power_ups",
  },
  vienna_3level: {
    powerFactor: 10, efficiency: 8, thd: 10,
    complexity: 9, methodCost: 9, bridgeless: false,
    forServer: false, topology: "three_level_rectifier",
    bestUse: "ev_charger_onboard",
  },
};

const get = (t: PowerFactorMethod) => DATA[t];

export const powerFactor = (t: PowerFactorMethod) => get(t).powerFactor;
export const efficiency = (t: PowerFactorMethod) => get(t).efficiency;
export const thd = (t: PowerFactorMethod) => get(t).thd;
export const complexity = (t: PowerFactorMethod) => get(t).complexity;
export const methodCost = (t: PowerFactorMethod) => get(t).methodCost;
export const bridgeless = (t: PowerFactorMethod) => get(t).bridgeless;
export const forServer = (t: PowerFactorMethod) => get(t).forServer;
export const topology = (t: PowerFactorMethod) => get(t).topology;
export const bestUse = (t: PowerFactorMethod) => get(t).bestUse;
export const powerFactorMethods = (): PowerFactorMethod[] => Object.keys(DATA) as PowerFactorMethod[];
