export type RfFilterType =
  | "lc_bandpass_discrete"
  | "saw_filter_ceramic"
  | "crystal_filter_narrow"
  | "cavity_filter_high_q"
  | "helical_filter_compact";

const DATA: Record<RfFilterType, {
  selectivity: number; insertionLoss: number; powerHandle: number;
  sizeCompact: number; filterCost: number; tunable: boolean;
  forNarrowband: boolean; filterTopology: string; bestUse: string;
}> = {
  lc_bandpass_discrete: { selectivity: 5, insertionLoss: 6, powerHandle: 8, sizeCompact: 4, filterCost: 2, tunable: true, forNarrowband: false, filterTopology: "lumped_inductor_cap", bestUse: "ham_radio_frontend" },
  saw_filter_ceramic: { selectivity: 8, insertionLoss: 7, powerHandle: 4, sizeCompact: 9, filterCost: 4, tunable: false, forNarrowband: true, filterTopology: "surface_acoustic_wave", bestUse: "mobile_if_filter" },
  crystal_filter_narrow: { selectivity: 10, insertionLoss: 5, powerHandle: 3, sizeCompact: 7, filterCost: 6, tunable: false, forNarrowband: true, filterTopology: "quartz_lattice_network", bestUse: "ssb_receiver_select" },
  cavity_filter_high_q: { selectivity: 9, insertionLoss: 9, powerHandle: 10, sizeCompact: 1, filterCost: 9, tunable: true, forNarrowband: true, filterTopology: "resonant_metal_cavity", bestUse: "base_station_duplexer" },
  helical_filter_compact: { selectivity: 7, insertionLoss: 7, powerHandle: 5, sizeCompact: 6, filterCost: 5, tunable: true, forNarrowband: false, filterTopology: "helical_resonator_coil", bestUse: "vhf_receiver_preselector" },
};

const get = (t: RfFilterType) => DATA[t];

export const selectivity = (t: RfFilterType) => get(t).selectivity;
export const insertionLoss = (t: RfFilterType) => get(t).insertionLoss;
export const powerHandle = (t: RfFilterType) => get(t).powerHandle;
export const sizeCompact = (t: RfFilterType) => get(t).sizeCompact;
export const filterCost = (t: RfFilterType) => get(t).filterCost;
export const tunable = (t: RfFilterType) => get(t).tunable;
export const forNarrowband = (t: RfFilterType) => get(t).forNarrowband;
export const filterTopology = (t: RfFilterType) => get(t).filterTopology;
export const bestUse = (t: RfFilterType) => get(t).bestUse;
export const rfFilters = (): RfFilterType[] => Object.keys(DATA) as RfFilterType[];
