export type PrepregCutterType =
  | "ultrasonic_knife"
  | "reciprocating_blade"
  | "drag_knife"
  | "laser_ply"
  | "water_jet_ply";

interface PrepregCutterData {
  cutAccuracy: number;
  throughput: number;
  edgeQuality: number;
  nestingEfficiency: number;
  ppCost: number;
  contactFree: boolean;
  forMultiPly: boolean;
  cutterConfig: string;
  bestUse: string;
}

const DATA: Record<PrepregCutterType, PrepregCutterData> = {
  ultrasonic_knife: {
    cutAccuracy: 9, throughput: 8, edgeQuality: 9, nestingEfficiency: 8, ppCost: 8,
    contactFree: false, forMultiPly: true,
    cutterConfig: "ultrasonic_knife_prepreg_cutter_vibrate_blade_clean_edge_stack",
    bestUse: "wing_ply_ultrasonic_knife_prepreg_cutter_clean_edge_composite",
  },
  reciprocating_blade: {
    cutAccuracy: 7, throughput: 9, edgeQuality: 7, nestingEfficiency: 7, ppCost: 5,
    contactFree: false, forMultiPly: true,
    cutterConfig: "reciprocating_blade_prepreg_cutter_fast_cut_thick_stack_rugged",
    bestUse: "panel_blank_reciprocating_blade_prepreg_cutter_fast_thick_stack",
  },
  drag_knife: {
    cutAccuracy: 8, throughput: 7, edgeQuality: 8, nestingEfficiency: 9, ppCost: 6,
    contactFree: false, forMultiPly: false,
    cutterConfig: "drag_knife_prepreg_cutter_swivel_blade_single_ply_tight_nest",
    bestUse: "detail_ply_drag_knife_prepreg_cutter_tight_nest_single_layer",
  },
  laser_ply: {
    cutAccuracy: 9, throughput: 6, edgeQuality: 8, nestingEfficiency: 9, ppCost: 9,
    contactFree: true, forMultiPly: false,
    cutterConfig: "laser_ply_prepreg_cutter_co2_beam_sealed_edge_no_contact_cut",
    bestUse: "aerospace_ply_laser_prepreg_cutter_sealed_edge_thermoset_film",
  },
  water_jet_ply: {
    cutAccuracy: 8, throughput: 7, edgeQuality: 7, nestingEfficiency: 8, ppCost: 7,
    contactFree: true, forMultiPly: true,
    cutterConfig: "water_jet_ply_prepreg_cutter_low_pressure_no_heat_affect_zone",
    bestUse: "thick_laminate_water_jet_prepreg_cutter_no_heat_stack_profile",
  },
};

function get(t: PrepregCutterType): PrepregCutterData {
  return DATA[t];
}

export const cutAccuracy = (t: PrepregCutterType) => get(t).cutAccuracy;
export const throughput = (t: PrepregCutterType) => get(t).throughput;
export const edgeQuality = (t: PrepregCutterType) => get(t).edgeQuality;
export const nestingEfficiency = (t: PrepregCutterType) => get(t).nestingEfficiency;
export const ppCost = (t: PrepregCutterType) => get(t).ppCost;
export const contactFree = (t: PrepregCutterType) => get(t).contactFree;
export const forMultiPly = (t: PrepregCutterType) => get(t).forMultiPly;
export const cutterConfig = (t: PrepregCutterType) => get(t).cutterConfig;
export const bestUse = (t: PrepregCutterType) => get(t).bestUse;
export const prepregCutterTypes = (): PrepregCutterType[] =>
  Object.keys(DATA) as PrepregCutterType[];
