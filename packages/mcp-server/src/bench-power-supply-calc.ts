// bench-power-supply-calc - bench power supply types

export type BenchPowerSupply =
  | "linear_regulated_std"
  | "switching_compact_mod"
  | "programmable_digital_pro"
  | "dual_channel_tracking"
  | "variable_analog_basic";

const DATA: Record<BenchPowerSupply, {
  outputStability: number; noiseLevel: number; currentRange: number; portability: number;
  cost: number; programmable: boolean; dualChannel: boolean; regulationType: string; bestUse: string;
}> = {
  linear_regulated_std:      { outputStability: 9, noiseLevel: 10, currentRange: 6, portability: 4, cost: 6, programmable: false, dualChannel: false, regulationType: "linear_series_pass", bestUse: "low_noise_analog_test" },
  switching_compact_mod:     { outputStability: 7, noiseLevel: 5, currentRange: 8, portability: 8, cost: 4, programmable: false, dualChannel: false, regulationType: "switching_buck_boost", bestUse: "general_bench_power" },
  programmable_digital_pro:  { outputStability: 10, noiseLevel: 8, currentRange: 10, portability: 3, cost: 9, programmable: true, dualChannel: false, regulationType: "digital_feedback_loop", bestUse: "automated_test_sequence" },
  dual_channel_tracking:     { outputStability: 8, noiseLevel: 9, currentRange: 7, portability: 4, cost: 8, programmable: false, dualChannel: true, regulationType: "tracking_linear_pair", bestUse: "split_rail_circuit" },
  variable_analog_basic:     { outputStability: 6, noiseLevel: 7, currentRange: 5, portability: 7, cost: 3, programmable: false, dualChannel: false, regulationType: "potentiometer_adjust", bestUse: "hobby_bench_supply" },
};

const get = (p: BenchPowerSupply) => DATA[p];
export const outputStability = (p: BenchPowerSupply) => get(p).outputStability;
export const noiseLevel = (p: BenchPowerSupply) => get(p).noiseLevel;
export const currentRange = (p: BenchPowerSupply) => get(p).currentRange;
export const portability = (p: BenchPowerSupply) => get(p).portability;
export const supplyCost = (p: BenchPowerSupply) => get(p).cost;
export const programmable = (p: BenchPowerSupply) => get(p).programmable;
export const dualChannel = (p: BenchPowerSupply) => get(p).dualChannel;
export const regulationType = (p: BenchPowerSupply) => get(p).regulationType;
export const bestUse = (p: BenchPowerSupply) => get(p).bestUse;
export const benchPowerSupplies = (): BenchPowerSupply[] => Object.keys(DATA) as BenchPowerSupply[];
