export type BuckConverter =
  | "sync_integrated_fet"
  | "async_ext_diode"
  | "cot_constant_on"
  | "multiphase_vrm"
  | "high_voltage_offline";

const DATA: Record<BuckConverter, {
  efficiency: number; transientResp: number; ripple: number;
  inputRange: number; buckCost: number; integrated: boolean;
  forMobile: boolean; control: string; bestUse: string;
}> = {
  sync_integrated_fet: {
    efficiency: 9, transientResp: 7, ripple: 7,
    inputRange: 5, buckCost: 4, integrated: true,
    forMobile: true, control: "peak_current_mode",
    bestUse: "phone_pmic_core_rail",
  },
  async_ext_diode: {
    efficiency: 5, transientResp: 5, ripple: 5,
    inputRange: 8, buckCost: 2, integrated: false,
    forMobile: false, control: "voltage_mode_pwm",
    bestUse: "industrial_24v_to_5v",
  },
  cot_constant_on: {
    efficiency: 8, transientResp: 10, ripple: 6,
    inputRange: 6, buckCost: 5, integrated: true,
    forMobile: true, control: "ripple_based_cot",
    bestUse: "ddr_memory_vtt",
  },
  multiphase_vrm: {
    efficiency: 8, transientResp: 9, ripple: 9,
    inputRange: 4, buckCost: 8, integrated: false,
    forMobile: false, control: "coupled_inductor_phase",
    bestUse: "cpu_gpu_vrm_12phase",
  },
  high_voltage_offline: {
    efficiency: 7, transientResp: 4, ripple: 6,
    inputRange: 10, buckCost: 6, integrated: false,
    forMobile: false, control: "peak_current_flyback",
    bestUse: "ac_dc_adapter_usbc",
  },
};

const get = (t: BuckConverter) => DATA[t];

export const efficiency = (t: BuckConverter) => get(t).efficiency;
export const transientResp = (t: BuckConverter) => get(t).transientResp;
export const ripple = (t: BuckConverter) => get(t).ripple;
export const inputRange = (t: BuckConverter) => get(t).inputRange;
export const buckCost = (t: BuckConverter) => get(t).buckCost;
export const integrated = (t: BuckConverter) => get(t).integrated;
export const forMobile = (t: BuckConverter) => get(t).forMobile;
export const control = (t: BuckConverter) => get(t).control;
export const bestUse = (t: BuckConverter) => get(t).bestUse;
export const buckConverters = (): BuckConverter[] => Object.keys(DATA) as BuckConverter[];
