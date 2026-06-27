export type PowerDivider =
  | "wilkinson_2way"
  | "gysel_high_power"
  | "rat_race_hybrid"
  | "branchline_90deg"
  | "resistive_broadband";

const DATA: Record<PowerDivider, {
  bandwidth: number; isolation: number; insertionLoss: number;
  powerHandling: number; divCost: number; equalSplit: boolean;
  forArray: boolean; topology: string; bestUse: string;
}> = {
  wilkinson_2way: {
    bandwidth: 6, isolation: 9, insertionLoss: 8,
    powerHandling: 6, divCost: 3, equalSplit: true,
    forArray: true, topology: "quarter_wave_resistor",
    bestUse: "antenna_feed_network",
  },
  gysel_high_power: {
    bandwidth: 5, isolation: 8, insertionLoss: 7,
    powerHandling: 10, divCost: 6, equalSplit: true,
    forArray: false, topology: "ring_grounded_resistor",
    bestUse: "base_station_combiner",
  },
  rat_race_hybrid: {
    bandwidth: 4, isolation: 8, insertionLoss: 7,
    powerHandling: 7, divCost: 4, equalSplit: true,
    forArray: false, topology: "ring_180deg_hybrid",
    bestUse: "balanced_mixer_lo",
  },
  branchline_90deg: {
    bandwidth: 3, isolation: 7, insertionLoss: 7,
    powerHandling: 7, divCost: 4, equalSplit: true,
    forArray: true, topology: "quarter_wave_branch",
    bestUse: "circular_polarize_feed",
  },
  resistive_broadband: {
    bandwidth: 10, isolation: 5, insertionLoss: 4,
    powerHandling: 4, divCost: 2, equalSplit: true,
    forArray: false, topology: "resistor_star_tee",
    bestUse: "test_signal_split",
  },
};

const get = (t: PowerDivider) => DATA[t];

export const bandwidth = (t: PowerDivider) => get(t).bandwidth;
export const isolation = (t: PowerDivider) => get(t).isolation;
export const insertionLoss = (t: PowerDivider) => get(t).insertionLoss;
export const powerHandling = (t: PowerDivider) => get(t).powerHandling;
export const divCost = (t: PowerDivider) => get(t).divCost;
export const equalSplit = (t: PowerDivider) => get(t).equalSplit;
export const forArray = (t: PowerDivider) => get(t).forArray;
export const topology = (t: PowerDivider) => get(t).topology;
export const bestUse = (t: PowerDivider) => get(t).bestUse;
export const powerDividers = (): PowerDivider[] => Object.keys(DATA) as PowerDivider[];
