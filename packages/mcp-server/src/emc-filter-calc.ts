export type EmcFilterType =
  | "pi_filter_lc"
  | "feedthrough_cap"
  | "emi_choke_inline"
  | "power_line_filter"
  | "waveguide_vent";

const DATA: Record<EmcFilterType, {
  attenuation: number; bandwidth: number; insertionLoss: number;
  powerRating: number; filterCost: number; shielded: boolean;
  forPowerLine: boolean; topology: string; bestUse: string;
}> = {
  pi_filter_lc: { attenuation: 8, bandwidth: 7, insertionLoss: 6, powerRating: 6, filterCost: 4, shielded: false, forPowerLine: false, topology: "cap_inductor_cap", bestUse: "signal_line_emc_filter" },
  feedthrough_cap: { attenuation: 9, bandwidth: 9, insertionLoss: 8, powerRating: 5, filterCost: 5, shielded: true, forPowerLine: false, topology: "panel_mount_cap", bestUse: "enclosure_wall_filter" },
  emi_choke_inline: { attenuation: 6, bandwidth: 5, insertionLoss: 4, powerRating: 8, filterCost: 3, shielded: false, forPowerLine: true, topology: "wound_ferrite_inline", bestUse: "cable_common_mode_block" },
  power_line_filter: { attenuation: 10, bandwidth: 8, insertionLoss: 7, powerRating: 10, filterCost: 7, shielded: true, forPowerLine: true, topology: "multi_stage_lcl", bestUse: "ac_mains_emi_compliance" },
  waveguide_vent: { attenuation: 7, bandwidth: 10, insertionLoss: 9, powerRating: 3, filterCost: 8, shielded: true, forPowerLine: false, topology: "honeycomb_cutoff_array", bestUse: "shielded_enclosure_vent" },
};

const get = (t: EmcFilterType) => DATA[t];

export const attenuation = (t: EmcFilterType) => get(t).attenuation;
export const bandwidth = (t: EmcFilterType) => get(t).bandwidth;
export const insertionLoss = (t: EmcFilterType) => get(t).insertionLoss;
export const powerRating = (t: EmcFilterType) => get(t).powerRating;
export const filterCost = (t: EmcFilterType) => get(t).filterCost;
export const shielded = (t: EmcFilterType) => get(t).shielded;
export const forPowerLine = (t: EmcFilterType) => get(t).forPowerLine;
export const topology = (t: EmcFilterType) => get(t).topology;
export const bestUse = (t: EmcFilterType) => get(t).bestUse;
export const emcFilters = (): EmcFilterType[] => Object.keys(DATA) as EmcFilterType[];
