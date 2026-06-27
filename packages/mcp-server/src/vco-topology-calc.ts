export type VcoTopology =
  | "lc_tank_cross"
  | "ring_cmos_delay"
  | "colpitts_bjt"
  | "clapp_crystal"
  | "relaxation_rc";

const DATA: Record<VcoTopology, {
  phaseNoise: number; tuningRange: number; powerDraw: number;
  frequency: number; vcoCost: number; integrated: boolean;
  forMmwave: boolean; resonator: string; bestUse: string;
}> = {
  lc_tank_cross: {
    phaseNoise: 9, tuningRange: 5, powerDraw: 6,
    frequency: 8, vcoCost: 7, integrated: true,
    forMmwave: true, resonator: "on_chip_spiral_inductor",
    bestUse: "rf_transceiver_lo",
  },
  ring_cmos_delay: {
    phaseNoise: 4, tuningRange: 9, powerDraw: 3,
    frequency: 6, vcoCost: 2, integrated: true,
    forMmwave: false, resonator: "inverter_delay_chain",
    bestUse: "clock_multiplication_pll",
  },
  colpitts_bjt: {
    phaseNoise: 8, tuningRange: 4, powerDraw: 7,
    frequency: 7, vcoCost: 6, integrated: false,
    forMmwave: false, resonator: "capacitive_divider_tank",
    bestUse: "low_noise_bench_source",
  },
  clapp_crystal: {
    phaseNoise: 10, tuningRange: 2, powerDraw: 5,
    frequency: 3, vcoCost: 5, integrated: false,
    forMmwave: false, resonator: "quartz_crystal_series",
    bestUse: "reference_frequency_standard",
  },
  relaxation_rc: {
    phaseNoise: 2, tuningRange: 10, powerDraw: 2,
    frequency: 4, vcoCost: 1, integrated: true,
    forMmwave: false, resonator: "rc_comparator_charge",
    bestUse: "low_cost_timer_clock",
  },
};

const get = (t: VcoTopology) => DATA[t];

export const phaseNoise = (t: VcoTopology) => get(t).phaseNoise;
export const tuningRange = (t: VcoTopology) => get(t).tuningRange;
export const powerDraw = (t: VcoTopology) => get(t).powerDraw;
export const frequency = (t: VcoTopology) => get(t).frequency;
export const vcoCost = (t: VcoTopology) => get(t).vcoCost;
export const integrated = (t: VcoTopology) => get(t).integrated;
export const forMmwave = (t: VcoTopology) => get(t).forMmwave;
export const resonator = (t: VcoTopology) => get(t).resonator;
export const bestUse = (t: VcoTopology) => get(t).bestUse;
export const vcoTopologies = (): VcoTopology[] => Object.keys(DATA) as VcoTopology[];
