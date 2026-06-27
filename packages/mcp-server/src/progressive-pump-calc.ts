export type ProgressivePumpType =
  | "standard_pc"
  | "open_hopper_pc"
  | "bridgebreaker_pc"
  | "hygienic_pc"
  | "metering_pc";

interface ProgressivePumpData {
  flowSteady: number;
  throughput: number;
  viscosityRange: number;
  selfPriming: number;
  ppCost: number;
  gentleFlow: boolean;
  forAbrasive: boolean;
  pumpConfig: string;
  bestUse: string;
}

const DATA: Record<ProgressivePumpType, ProgressivePumpData> = {
  standard_pc: {
    flowSteady: 8, throughput: 7, viscosityRange: 8, selfPriming: 8, ppCost: 5,
    gentleFlow: true, forAbrasive: false,
    pumpConfig: "standard_pc_progressive_pump_single_screw_rotor_stator_steady",
    bestUse: "wastewater_standard_pc_progressive_pump_steady_flow_self_prime",
  },
  open_hopper_pc: {
    flowSteady: 7, throughput: 8, viscosityRange: 9, selfPriming: 6, ppCost: 7,
    gentleFlow: true, forAbrasive: false,
    pumpConfig: "open_hopper_pc_progressive_pump_wide_feed_thick_paste_screw_push",
    bestUse: "food_paste_open_hopper_pc_progressive_pump_thick_sauce_puree",
  },
  bridgebreaker_pc: {
    flowSteady: 7, throughput: 7, viscosityRange: 9, selfPriming: 5, ppCost: 7,
    gentleFlow: false, forAbrasive: true,
    pumpConfig: "bridgebreaker_pc_progressive_pump_auger_feed_break_bridge_solid",
    bestUse: "sludge_feed_bridgebreaker_pc_progressive_pump_break_bridge_pump",
  },
  hygienic_pc: {
    flowSteady: 8, throughput: 6, viscosityRange: 8, selfPriming: 7, ppCost: 8,
    gentleFlow: true, forAbrasive: false,
    pumpConfig: "hygienic_pc_progressive_pump_tri_clamp_polish_cip_dairy_grade",
    bestUse: "dairy_cream_hygienic_pc_progressive_pump_gentle_shear_clean",
  },
  metering_pc: {
    flowSteady: 9, throughput: 5, viscosityRange: 7, selfPriming: 7, ppCost: 6,
    gentleFlow: true, forAbrasive: false,
    pumpConfig: "metering_pc_progressive_pump_variable_speed_precise_dose_control",
    bestUse: "polymer_dose_metering_pc_progressive_pump_precise_rate_inject",
  },
};

function get(t: ProgressivePumpType): ProgressivePumpData {
  return DATA[t];
}

export const flowSteady = (t: ProgressivePumpType) => get(t).flowSteady;
export const throughput = (t: ProgressivePumpType) => get(t).throughput;
export const viscosityRange = (t: ProgressivePumpType) => get(t).viscosityRange;
export const selfPriming = (t: ProgressivePumpType) => get(t).selfPriming;
export const ppCost = (t: ProgressivePumpType) => get(t).ppCost;
export const gentleFlow = (t: ProgressivePumpType) => get(t).gentleFlow;
export const forAbrasive = (t: ProgressivePumpType) => get(t).forAbrasive;
export const pumpConfig = (t: ProgressivePumpType) => get(t).pumpConfig;
export const bestUse = (t: ProgressivePumpType) => get(t).bestUse;
export const progressivePumpTypes = (): ProgressivePumpType[] =>
  Object.keys(DATA) as ProgressivePumpType[];
