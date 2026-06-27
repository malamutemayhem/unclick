export type EmiFilter =
  | "pi_lc_single_stage"
  | "common_mode_choke"
  | "feedthrough_capacitor"
  | "active_emc_cancel"
  | "waveguide_honeycomb";

const DATA: Record<EmiFilter, {
  insertion: number; bandwidth: number; powerHandle: number;
  size: number; filtCost: number; active: boolean;
  forPower: boolean; topology: string; bestUse: string;
}> = {
  pi_lc_single_stage: {
    insertion: 7, bandwidth: 6, powerHandle: 8,
    size: 5, filtCost: 3, active: false,
    forPower: true, topology: "cap_inductor_cap_ladder",
    bestUse: "smps_ac_input_filter",
  },
  common_mode_choke: {
    insertion: 8, bandwidth: 7, powerHandle: 7,
    size: 6, filtCost: 4, active: false,
    forPower: true, topology: "bifilar_wound_coupled",
    bestUse: "differential_pair_cm_reject",
  },
  feedthrough_capacitor: {
    insertion: 9, bandwidth: 9, powerHandle: 6,
    size: 8, filtCost: 5, active: false,
    forPower: false, topology: "coaxial_shield_wall_mount",
    bestUse: "enclosure_io_penetration",
  },
  active_emc_cancel: {
    insertion: 10, bandwidth: 8, powerHandle: 5,
    size: 4, filtCost: 9, active: true,
    forPower: false, topology: "sense_inject_feedback_loop",
    bestUse: "precision_instrument_noise",
  },
  waveguide_honeycomb: {
    insertion: 10, bandwidth: 10, powerHandle: 3,
    size: 7, filtCost: 8, active: false,
    forPower: false, topology: "cutoff_freq_below_vent_array",
    bestUse: "shielded_room_ventilation",
  },
};

const get = (t: EmiFilter) => DATA[t];

export const insertion = (t: EmiFilter) => get(t).insertion;
export const bandwidth = (t: EmiFilter) => get(t).bandwidth;
export const powerHandle = (t: EmiFilter) => get(t).powerHandle;
export const size = (t: EmiFilter) => get(t).size;
export const filtCost = (t: EmiFilter) => get(t).filtCost;
export const active = (t: EmiFilter) => get(t).active;
export const forPower = (t: EmiFilter) => get(t).forPower;
export const topology = (t: EmiFilter) => get(t).topology;
export const bestUse = (t: EmiFilter) => get(t).bestUse;
export const emiFilters = (): EmiFilter[] => Object.keys(DATA) as EmiFilter[];
