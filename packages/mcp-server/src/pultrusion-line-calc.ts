export type PultrusionLineType =
  | "standard_pultrude"
  | "pull_wind"
  | "pull_braid"
  | "thermoplastic_pultrude"
  | "curved_pultrude";

interface PultrusionLineData {
  profileAccuracy: number;
  throughput: number;
  fiberVolume: number;
  surfaceFinish: number;
  plCost: number;
  continuous: boolean;
  forStructural: boolean;
  lineConfig: string;
  bestUse: string;
}

const DATA: Record<PultrusionLineType, PultrusionLineData> = {
  standard_pultrude: {
    profileAccuracy: 8, throughput: 9, fiberVolume: 8, surfaceFinish: 7, plCost: 5,
    continuous: true, forStructural: true,
    lineConfig: "standard_pultrusion_line_roving_creel_resin_bath_heated_die",
    bestUse: "structural_beam_standard_pultrusion_line_roving_resin_die_pull",
  },
  pull_wind: {
    profileAccuracy: 8, throughput: 7, fiberVolume: 9, surfaceFinish: 7, plCost: 7,
    continuous: true, forStructural: true,
    lineConfig: "pull_wind_pultrusion_line_axial_roving_plus_hoop_wind_tube",
    bestUse: "utility_pole_pull_wind_pultrusion_line_axial_plus_hoop_tube",
  },
  pull_braid: {
    profileAccuracy: 8, throughput: 6, fiberVolume: 9, surfaceFinish: 8, plCost: 8,
    continuous: true, forStructural: true,
    lineConfig: "pull_braid_pultrusion_line_braider_over_axial_multi_angle_tube",
    bestUse: "drive_shaft_pull_braid_pultrusion_line_braider_multi_angle",
  },
  thermoplastic_pultrude: {
    profileAccuracy: 9, throughput: 8, fiberVolume: 8, surfaceFinish: 9, plCost: 9,
    continuous: true, forStructural: false,
    lineConfig: "thermoplastic_pultrusion_line_commingled_fiber_melt_consolidate",
    bestUse: "recyclable_profile_thermoplastic_pultrusion_line_melt_consol",
  },
  curved_pultrude: {
    profileAccuracy: 7, throughput: 5, fiberVolume: 8, surfaceFinish: 7, plCost: 8,
    continuous: false, forStructural: true,
    lineConfig: "curved_pultrusion_line_radius_die_arc_profile_arch_frame_bend",
    bestUse: "window_arch_curved_pultrusion_line_radius_die_arc_frame_bend",
  },
};

function get(t: PultrusionLineType): PultrusionLineData {
  return DATA[t];
}

export const profileAccuracy = (t: PultrusionLineType) => get(t).profileAccuracy;
export const throughput = (t: PultrusionLineType) => get(t).throughput;
export const fiberVolume = (t: PultrusionLineType) => get(t).fiberVolume;
export const surfaceFinish = (t: PultrusionLineType) => get(t).surfaceFinish;
export const plCost = (t: PultrusionLineType) => get(t).plCost;
export const continuous = (t: PultrusionLineType) => get(t).continuous;
export const forStructural = (t: PultrusionLineType) => get(t).forStructural;
export const lineConfig = (t: PultrusionLineType) => get(t).lineConfig;
export const bestUse = (t: PultrusionLineType) => get(t).bestUse;
export const pultrusionLineTypes = (): PultrusionLineType[] =>
  Object.keys(DATA) as PultrusionLineType[];
