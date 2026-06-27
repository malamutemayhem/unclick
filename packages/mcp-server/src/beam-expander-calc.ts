export type BeamExpanderType =
  | "galilean_expander"
  | "keplerian_expander"
  | "variable_zoom"
  | "anamorphic_prism"
  | "diffractive_expander";

interface BeamExpanderData {
  beamQuality: number;
  throughput: number;
  magnification: number;
  wavefrontError: number;
  beCost: number;
  adjustable: boolean;
  forHighPower: boolean;
  expanderConfig: string;
  bestUse: string;
}

const DATA: Record<BeamExpanderType, BeamExpanderData> = {
  galilean_expander: {
    beamQuality: 8, throughput: 9, magnification: 6, wavefrontError: 8, beCost: 4,
    adjustable: false, forHighPower: true,
    expanderConfig: "galilean_beam_expander_concave_convex_no_focus_short_compact",
    bestUse: "laser_cutting_galilean_beam_expander_compact_no_focus_high_power",
  },
  keplerian_expander: {
    beamQuality: 9, throughput: 8, magnification: 8, wavefrontError: 9, beCost: 5,
    adjustable: false, forHighPower: false,
    expanderConfig: "keplerian_beam_expander_two_convex_internal_focus_spatial_filter",
    bestUse: "research_lab_keplerian_beam_expander_spatial_filter_clean_beam",
  },
  variable_zoom: {
    beamQuality: 7, throughput: 8, magnification: 10, wavefrontError: 7, beCost: 8,
    adjustable: true, forHighPower: false,
    expanderConfig: "variable_zoom_beam_expander_motorized_lens_adjust_magnification",
    bestUse: "multi_process_variable_zoom_beam_expander_switch_spot_size_recipe",
  },
  anamorphic_prism: {
    beamQuality: 7, throughput: 9, magnification: 5, wavefrontError: 6, beCost: 3,
    adjustable: true, forHighPower: false,
    expanderConfig: "anamorphic_prism_pair_one_axis_expand_circularize_diode_beam",
    bestUse: "diode_laser_anamorphic_prism_pair_circularize_elliptical_beam",
  },
  diffractive_expander: {
    beamQuality: 10, throughput: 7, magnification: 7, wavefrontError: 10, beCost: 9,
    adjustable: false, forHighPower: true,
    expanderConfig: "diffractive_beam_expander_thin_element_lightweight_aberration_free",
    bestUse: "space_optics_diffractive_beam_expander_ultra_light_aberration_free",
  },
};

function get(t: BeamExpanderType): BeamExpanderData {
  return DATA[t];
}

export const beamQuality = (t: BeamExpanderType) => get(t).beamQuality;
export const throughput = (t: BeamExpanderType) => get(t).throughput;
export const magnification = (t: BeamExpanderType) => get(t).magnification;
export const wavefrontError = (t: BeamExpanderType) => get(t).wavefrontError;
export const beCost = (t: BeamExpanderType) => get(t).beCost;
export const adjustable = (t: BeamExpanderType) => get(t).adjustable;
export const forHighPower = (t: BeamExpanderType) => get(t).forHighPower;
export const expanderConfig = (t: BeamExpanderType) => get(t).expanderConfig;
export const bestUse = (t: BeamExpanderType) => get(t).bestUse;
export const beamExpanderTypes = (): BeamExpanderType[] =>
  Object.keys(DATA) as BeamExpanderType[];
