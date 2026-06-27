export type PultrusionDieType =
  | "open_bath_wetout"
  | "injection_chamber"
  | "thermoplastic_pull"
  | "pull_wind_combo"
  | "continuous_panel";

interface PultrusionDieData {
  pullSpeed: number;
  profileAccuracy: number;
  fiberLoading: number;
  surfaceFinish: number;
  pdCost: number;
  continuous: boolean;
  forStructural: boolean;
  dieConfig: string;
  bestUse: string;
}

const DATA: Record<PultrusionDieType, PultrusionDieData> = {
  open_bath_wetout: {
    pullSpeed: 8, profileAccuracy: 7, fiberLoading: 8, surfaceFinish: 6, pdCost: 5,
    continuous: true, forStructural: true,
    dieConfig: "open_resin_bath_fiber_wetout_heated_die_pull_cure_continuous",
    bestUse: "fiberglass_rebar_rod_channel_open_bath_standard_pultrusion",
  },
  injection_chamber: {
    pullSpeed: 7, profileAccuracy: 9, fiberLoading: 9, surfaceFinish: 9, pdCost: 8,
    continuous: true, forStructural: true,
    dieConfig: "closed_injection_chamber_resin_inject_fiber_wet_clean_process",
    bestUse: "precision_structural_profile_beam_clean_injection_aerospace",
  },
  thermoplastic_pull: {
    pullSpeed: 6, profileAccuracy: 8, fiberLoading: 7, surfaceFinish: 8, pdCost: 9,
    continuous: true, forStructural: true,
    dieConfig: "thermoplastic_matrix_preheat_consolidation_die_cool_pull_form",
    bestUse: "recyclable_thermoplastic_composite_profile_automotive_transit",
  },
  pull_wind_combo: {
    pullSpeed: 5, profileAccuracy: 8, fiberLoading: 10, surfaceFinish: 7, pdCost: 7,
    continuous: true, forStructural: true,
    dieConfig: "pull_wind_combination_axial_fiber_hoop_wind_tube_pipe_strong",
    bestUse: "composite_tube_pipe_pole_pull_wind_hoop_axial_fiber_strength",
  },
  continuous_panel: {
    pullSpeed: 10, profileAccuracy: 6, fiberLoading: 6, surfaceFinish: 7, pdCost: 6,
    continuous: true, forStructural: false,
    dieConfig: "continuous_flat_panel_line_double_belt_press_sheet_laminate",
    bestUse: "flat_panel_sheet_wall_cladding_roofing_continuous_belt_press",
  },
};

function get(t: PultrusionDieType): PultrusionDieData {
  return DATA[t];
}

export const pullSpeed = (t: PultrusionDieType) => get(t).pullSpeed;
export const profileAccuracy = (t: PultrusionDieType) => get(t).profileAccuracy;
export const fiberLoading = (t: PultrusionDieType) => get(t).fiberLoading;
export const surfaceFinish = (t: PultrusionDieType) => get(t).surfaceFinish;
export const pdCost = (t: PultrusionDieType) => get(t).pdCost;
export const continuous = (t: PultrusionDieType) => get(t).continuous;
export const forStructural = (t: PultrusionDieType) => get(t).forStructural;
export const dieConfig = (t: PultrusionDieType) => get(t).dieConfig;
export const bestUse = (t: PultrusionDieType) => get(t).bestUse;
export const pultrusionDieTypes = (): PultrusionDieType[] =>
  Object.keys(DATA) as PultrusionDieType[];
