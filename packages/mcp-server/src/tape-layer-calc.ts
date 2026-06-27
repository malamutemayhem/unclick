export type TapeLayerType =
  | "atl_flat"
  | "atl_contour"
  | "afp_thermoset"
  | "afp_thermoplastic"
  | "manual_layup";

interface TapeLayerData {
  layupSpeed: number;
  throughput: number;
  fiberSteering: number;
  gapLapControl: number;
  tlCost: number;
  automated: boolean;
  forLargePanel: boolean;
  layerConfig: string;
  bestUse: string;
}

const DATA: Record<TapeLayerType, TapeLayerData> = {
  atl_flat: {
    layupSpeed: 9, throughput: 9, fiberSteering: 4, gapLapControl: 8, tlCost: 8,
    automated: true, forLargePanel: true,
    layerConfig: "atl_flat_tape_layer_wide_tape_head_gantry_flat_tool_surface",
    bestUse: "wing_skin_atl_flat_tape_layer_wide_unidirectional_fast_layup",
  },
  atl_contour: {
    layupSpeed: 7, throughput: 7, fiberSteering: 6, gapLapControl: 7, tlCost: 9,
    automated: true, forLargePanel: true,
    layerConfig: "atl_contour_tape_layer_compliant_head_curved_tool_surface",
    bestUse: "fuselage_panel_atl_contour_tape_layer_curved_surface_layup",
  },
  afp_thermoset: {
    layupSpeed: 6, throughput: 6, fiberSteering: 9, gapLapControl: 9, tlCost: 9,
    automated: true, forLargePanel: false,
    layerConfig: "afp_thermoset_tape_layer_narrow_tow_robot_complex_contour",
    bestUse: "nacelle_cowl_afp_thermoset_tape_layer_tow_steer_complex_shape",
  },
  afp_thermoplastic: {
    layupSpeed: 5, throughput: 5, fiberSteering: 9, gapLapControl: 9, tlCost: 9,
    automated: true, forLargePanel: false,
    layerConfig: "afp_thermoplastic_tape_layer_laser_heat_in_situ_consolidate",
    bestUse: "bracket_rib_afp_thermoplastic_tape_layer_in_situ_no_autoclave",
  },
  manual_layup: {
    layupSpeed: 3, throughput: 3, fiberSteering: 5, gapLapControl: 4, tlCost: 3,
    automated: false, forLargePanel: false,
    layerConfig: "manual_layup_tape_layer_hand_cut_ply_template_vacuum_debulk",
    bestUse: "repair_patch_manual_layup_tape_layer_hand_place_field_repair",
  },
};

function get(t: TapeLayerType): TapeLayerData {
  return DATA[t];
}

export const layupSpeed = (t: TapeLayerType) => get(t).layupSpeed;
export const throughput = (t: TapeLayerType) => get(t).throughput;
export const fiberSteering = (t: TapeLayerType) => get(t).fiberSteering;
export const gapLapControl = (t: TapeLayerType) => get(t).gapLapControl;
export const tlCost = (t: TapeLayerType) => get(t).tlCost;
export const automated = (t: TapeLayerType) => get(t).automated;
export const forLargePanel = (t: TapeLayerType) => get(t).forLargePanel;
export const layerConfig = (t: TapeLayerType) => get(t).layerConfig;
export const bestUse = (t: TapeLayerType) => get(t).bestUse;
export const tapeLayerTypes = (): TapeLayerType[] =>
  Object.keys(DATA) as TapeLayerType[];
