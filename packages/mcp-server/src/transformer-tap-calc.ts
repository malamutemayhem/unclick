export type TransformerTapType =
  | "no_load_tap"
  | "on_load_tap"
  | "auto_voltage_reg"
  | "reactor_tap"
  | "thyristor_tap";

interface TransformerTapData {
  voltageRange: number;
  throughput: number;
  stepResolution: number;
  switchSpeed: number;
  ttCost: number;
  loadBreak: boolean;
  forDistribution: boolean;
  tapConfig: string;
  bestUse: string;
}

const DATA: Record<TransformerTapType, TransformerTapData> = {
  no_load_tap: {
    voltageRange: 5, throughput: 6, stepResolution: 5, switchSpeed: 3, ttCost: 3,
    loadBreak: false, forDistribution: false,
    tapConfig: "no_load_tap_changer_manual_deenergize_switch_fixed_ratio_set",
    bestUse: "factory_set_no_load_tap_changer_fixed_voltage_ratio_seasonal",
  },
  on_load_tap: {
    voltageRange: 8, throughput: 9, stepResolution: 8, switchSpeed: 7, ttCost: 8,
    loadBreak: true, forDistribution: true,
    tapConfig: "on_load_tap_changer_oil_switch_live_adjust_no_interrupt",
    bestUse: "substation_on_load_tap_changer_auto_regulate_voltage_profile",
  },
  auto_voltage_reg: {
    voltageRange: 7, throughput: 8, stepResolution: 9, switchSpeed: 8, ttCost: 7,
    loadBreak: true, forDistribution: true,
    tapConfig: "auto_voltage_regulator_step_boost_buck_line_drop_compensate",
    bestUse: "feeder_auto_voltage_regulator_line_drop_compensate_remote",
  },
  reactor_tap: {
    voltageRange: 9, throughput: 7, stepResolution: 7, switchSpeed: 6, ttCost: 6,
    loadBreak: true, forDistribution: false,
    tapConfig: "reactor_tap_changer_preventive_autotransformer_bridging_impedance",
    bestUse: "power_plant_reactor_tap_changer_high_voltage_smooth_transition",
  },
  thyristor_tap: {
    voltageRange: 10, throughput: 10, stepResolution: 10, switchSpeed: 10, ttCost: 10,
    loadBreak: true, forDistribution: true,
    tapConfig: "thyristor_tap_changer_solid_state_zero_wear_instant_switch",
    bestUse: "critical_load_thyristor_tap_changer_instant_switch_zero_wear",
  },
};

function get(t: TransformerTapType): TransformerTapData {
  return DATA[t];
}

export const voltageRange = (t: TransformerTapType) => get(t).voltageRange;
export const throughput = (t: TransformerTapType) => get(t).throughput;
export const stepResolution = (t: TransformerTapType) => get(t).stepResolution;
export const switchSpeed = (t: TransformerTapType) => get(t).switchSpeed;
export const ttCost = (t: TransformerTapType) => get(t).ttCost;
export const loadBreak = (t: TransformerTapType) => get(t).loadBreak;
export const forDistribution = (t: TransformerTapType) => get(t).forDistribution;
export const tapConfig = (t: TransformerTapType) => get(t).tapConfig;
export const bestUse = (t: TransformerTapType) => get(t).bestUse;
export const transformerTapTypes = (): TransformerTapType[] =>
  Object.keys(DATA) as TransformerTapType[];
