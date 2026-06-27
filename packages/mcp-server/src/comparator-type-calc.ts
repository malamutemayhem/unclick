export type ComparatorType =
  | "open_drain_basic"
  | "rail_to_rail_out"
  | "latch_regenerative"
  | "window_dual_ref"
  | "strobed_clocked";

const DATA: Record<ComparatorType, {
  propagDelay: number; inputOffset: number; overdrive: number;
  hysteresis: number; compCost: number; builtin_hysteresis: boolean;
  forPower: boolean; output: string; bestUse: string;
}> = {
  open_drain_basic: {
    propagDelay: 5, inputOffset: 4, overdrive: 5,
    hysteresis: 3, compCost: 2, builtin_hysteresis: false,
    forPower: false, output: "open_collector_nmos",
    bestUse: "level_detect_general",
  },
  rail_to_rail_out: {
    propagDelay: 6, inputOffset: 6, overdrive: 6,
    hysteresis: 4, compCost: 4, builtin_hysteresis: false,
    forPower: false, output: "push_pull_cmos",
    bestUse: "battery_threshold",
  },
  latch_regenerative: {
    propagDelay: 10, inputOffset: 7, overdrive: 9,
    hysteresis: 5, compCost: 5, builtin_hysteresis: false,
    forPower: false, output: "diff_latch_q_qb",
    bestUse: "flash_adc_stage",
  },
  window_dual_ref: {
    propagDelay: 4, inputOffset: 5, overdrive: 4,
    hysteresis: 8, compCost: 6, builtin_hysteresis: true,
    forPower: true, output: "dual_open_drain",
    bestUse: "voltage_supervisor",
  },
  strobed_clocked: {
    propagDelay: 9, inputOffset: 8, overdrive: 8,
    hysteresis: 6, compCost: 7, builtin_hysteresis: true,
    forPower: false, output: "clocked_sr_latch",
    bestUse: "sar_adc_bit_decide",
  },
};

const get = (t: ComparatorType) => DATA[t];

export const propagDelay = (t: ComparatorType) => get(t).propagDelay;
export const inputOffset = (t: ComparatorType) => get(t).inputOffset;
export const overdrive = (t: ComparatorType) => get(t).overdrive;
export const hysteresis = (t: ComparatorType) => get(t).hysteresis;
export const compCost = (t: ComparatorType) => get(t).compCost;
export const builtinHysteresis = (t: ComparatorType) => get(t).builtin_hysteresis;
export const forPower = (t: ComparatorType) => get(t).forPower;
export const output = (t: ComparatorType) => get(t).output;
export const bestUse = (t: ComparatorType) => get(t).bestUse;
export const comparatorTypes = (): ComparatorType[] => Object.keys(DATA) as ComparatorType[];
