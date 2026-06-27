export type ImpedanceMatch =
  | "l_network_simple"
  | "pi_network_narrow"
  | "t_network_high_q"
  | "transformer_coupled"
  | "stub_quarter_wave";

const DATA: Record<ImpedanceMatch, {
  bandwidth: number; insertionLoss: number; complexity: number;
  qFactor: number; imCost: number; tunable: boolean;
  forPa: boolean; topology: string; bestUse: string;
}> = {
  l_network_simple: {
    bandwidth: 6, insertionLoss: 8, complexity: 10,
    qFactor: 5, imCost: 1, tunable: false,
    forPa: false, topology: "series_shunt_lc_pair",
    bestUse: "single_freq_lna_input",
  },
  pi_network_narrow: {
    bandwidth: 5, insertionLoss: 7, complexity: 7,
    qFactor: 8, imCost: 3, tunable: false,
    forPa: true, topology: "shunt_series_shunt_cap",
    bestUse: "pa_output_harmonic_filter",
  },
  t_network_high_q: {
    bandwidth: 4, insertionLoss: 6, complexity: 6,
    qFactor: 10, imCost: 4, tunable: false,
    forPa: false, topology: "series_shunt_series_ind",
    bestUse: "narrow_band_cavity_feed",
  },
  transformer_coupled: {
    bandwidth: 9, insertionLoss: 5, complexity: 5,
    qFactor: 3, imCost: 6, tunable: false,
    forPa: true, topology: "turns_ratio_wideband",
    bestUse: "broadband_push_pull_amp",
  },
  stub_quarter_wave: {
    bandwidth: 7, insertionLoss: 9, complexity: 8,
    qFactor: 6, imCost: 2, tunable: true,
    forPa: false, topology: "microstrip_open_short",
    bestUse: "pcb_microwave_transition",
  },
};

const get = (t: ImpedanceMatch) => DATA[t];

export const bandwidth = (t: ImpedanceMatch) => get(t).bandwidth;
export const insertionLoss = (t: ImpedanceMatch) => get(t).insertionLoss;
export const complexity = (t: ImpedanceMatch) => get(t).complexity;
export const qFactor = (t: ImpedanceMatch) => get(t).qFactor;
export const imCost = (t: ImpedanceMatch) => get(t).imCost;
export const tunable = (t: ImpedanceMatch) => get(t).tunable;
export const forPa = (t: ImpedanceMatch) => get(t).forPa;
export const topology = (t: ImpedanceMatch) => get(t).topology;
export const bestUse = (t: ImpedanceMatch) => get(t).bestUse;
export const impedanceMatches = (): ImpedanceMatch[] => Object.keys(DATA) as ImpedanceMatch[];
