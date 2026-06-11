export type WarpBeamerType =
  | "direct_warper"
  | "sectional_warper"
  | "beam_to_beam"
  | "sample_warper"
  | "high_speed_warper";

interface WarpBeamerData {
  beamQuality: number;
  throughput: number;
  tensionControl: number;
  patternFlexibility: number;
  wbCost: number;
  automated: boolean;
  forDenim: boolean;
  beamerConfig: string;
  bestUse: string;
}

const DATA: Record<WarpBeamerType, WarpBeamerData> = {
  direct_warper: {
    beamQuality: 8, throughput: 10, tensionControl: 8, patternFlexibility: 5, wbCost: 7,
    automated: true, forDenim: true,
    beamerConfig: "direct_warper_beam_creel_wind_parallel_single_pass_high_speed",
    bestUse: "denim_mill_direct_warper_high_speed_single_color_long_run_beam",
  },
  sectional_warper: {
    beamQuality: 9, throughput: 6, tensionControl: 9, patternFlexibility: 10, wbCost: 8,
    automated: false, forDenim: false,
    beamerConfig: "sectional_warper_beam_drum_wind_section_by_section_pattern",
    bestUse: "pattern_weaving_sectional_warper_stripe_plaid_color_sequence",
  },
  beam_to_beam: {
    beamQuality: 7, throughput: 8, tensionControl: 7, patternFlexibility: 4, wbCost: 5,
    automated: true, forDenim: true,
    beamerConfig: "beam_to_beam_warper_rebeam_combine_multiple_beams_single_loom",
    bestUse: "large_weaving_mill_beam_to_beam_rebeam_combine_ends_loom_ready",
  },
  sample_warper: {
    beamQuality: 10, throughput: 3, tensionControl: 10, patternFlexibility: 10, wbCost: 9,
    automated: false, forDenim: false,
    beamerConfig: "sample_warper_beam_single_end_precise_pattern_prototype_short",
    bestUse: "design_studio_sample_warper_prototype_short_run_complex_pattern",
  },
  high_speed_warper: {
    beamQuality: 7, throughput: 10, tensionControl: 7, patternFlexibility: 4, wbCost: 10,
    automated: true, forDenim: true,
    beamerConfig: "high_speed_warper_beam_servo_drive_auto_creel_maximum_output",
    bestUse: "industrial_textile_high_speed_warper_maximum_output_commodity",
  },
};

function get(t: WarpBeamerType): WarpBeamerData {
  return DATA[t];
}

export const beamQuality = (t: WarpBeamerType) => get(t).beamQuality;
export const throughput = (t: WarpBeamerType) => get(t).throughput;
export const tensionControl = (t: WarpBeamerType) => get(t).tensionControl;
export const patternFlexibility = (t: WarpBeamerType) => get(t).patternFlexibility;
export const wbCost = (t: WarpBeamerType) => get(t).wbCost;
export const automated = (t: WarpBeamerType) => get(t).automated;
export const forDenim = (t: WarpBeamerType) => get(t).forDenim;
export const beamerConfig = (t: WarpBeamerType) => get(t).beamerConfig;
export const bestUse = (t: WarpBeamerType) => get(t).bestUse;
export const warpBeamerTypes = (): WarpBeamerType[] =>
  Object.keys(DATA) as WarpBeamerType[];
