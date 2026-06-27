export type RfCoupler =
  | "directional_branch"
  | "hybrid_90_degree"
  | "rat_race_180"
  | "lange_interdigital"
  | "wilkinson_divider";

const DATA: Record<RfCoupler, {
  coupling: number; directivity: number; bandwidth: number;
  isolation: number; cpCost: number; balanced: boolean;
  forMeasurement: boolean; structure: string; bestUse: string;
}> = {
  directional_branch: {
    coupling: 7, directivity: 8, bandwidth: 6,
    isolation: 8, cpCost: 3, balanced: false,
    forMeasurement: true, structure: "quarter_wave_branch_arm",
    bestUse: "power_monitor_tap",
  },
  hybrid_90_degree: {
    coupling: 8, directivity: 7, bandwidth: 7,
    isolation: 9, cpCost: 4, balanced: true,
    forMeasurement: false, structure: "branchline_quadrature",
    bestUse: "balanced_amplifier_combine",
  },
  rat_race_180: {
    coupling: 8, directivity: 8, bandwidth: 5,
    isolation: 9, cpCost: 4, balanced: true,
    forMeasurement: false, structure: "ring_3lambda_4_sum_diff",
    bestUse: "mixer_lo_rf_if_split",
  },
  lange_interdigital: {
    coupling: 9, directivity: 9, bandwidth: 10,
    isolation: 7, cpCost: 6, balanced: true,
    forMeasurement: false, structure: "interdigitated_strip_pair",
    bestUse: "octave_band_quadrature",
  },
  wilkinson_divider: {
    coupling: 6, directivity: 6, bandwidth: 8,
    isolation: 10, cpCost: 2, balanced: false,
    forMeasurement: true, structure: "resistive_isolated_split",
    bestUse: "equal_power_split_combine",
  },
};

const get = (t: RfCoupler) => DATA[t];

export const coupling = (t: RfCoupler) => get(t).coupling;
export const directivity = (t: RfCoupler) => get(t).directivity;
export const bandwidth = (t: RfCoupler) => get(t).bandwidth;
export const isolation = (t: RfCoupler) => get(t).isolation;
export const cpCost = (t: RfCoupler) => get(t).cpCost;
export const balanced = (t: RfCoupler) => get(t).balanced;
export const forMeasurement = (t: RfCoupler) => get(t).forMeasurement;
export const structure = (t: RfCoupler) => get(t).structure;
export const bestUse = (t: RfCoupler) => get(t).bestUse;
export const rfCouplers = (): RfCoupler[] => Object.keys(DATA) as RfCoupler[];
