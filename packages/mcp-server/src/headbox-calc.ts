export type HeadboxType =
  | "open_gravity"
  | "pressurized_hydraulic"
  | "dilution_control"
  | "multi_layer"
  | "gap_former";

interface HeadboxData {
  jetUniformity: number;
  speedRange: number;
  basisWeightControl: number;
  fiberOrientation: number;
  hbCost: number;
  pressurized: boolean;
  forMultiPly: boolean;
  headboxConfig: string;
  bestUse: string;
}

const DATA: Record<HeadboxType, HeadboxData> = {
  open_gravity: {
    jetUniformity: 5, speedRange: 4, basisWeightControl: 5, fiberOrientation: 5, hbCost: 4,
    pressurized: false, forMultiPly: false,
    headboxConfig: "open_gravity_overflow_weir_low_speed_board_tissue_simple_jet",
    bestUse: "low_speed_board_tissue_simple_open_gravity_headbox_overflow",
  },
  pressurized_hydraulic: {
    jetUniformity: 8, speedRange: 9, basisWeightControl: 8, fiberOrientation: 8, hbCost: 8,
    pressurized: true, forMultiPly: false,
    headboxConfig: "pressurized_hydraulic_headbox_tapered_header_rectifier_roll",
    bestUse: "high_speed_newsprint_printing_paper_pressurized_hydraulic_head",
  },
  dilution_control: {
    jetUniformity: 10, speedRange: 10, basisWeightControl: 10, fiberOrientation: 9, hbCost: 10,
    pressurized: true, forMultiPly: false,
    headboxConfig: "dilution_control_headbox_cd_profile_adjust_valve_array_precise",
    bestUse: "premium_fine_paper_dilution_control_cd_profile_precise_uniform",
  },
  multi_layer: {
    jetUniformity: 9, speedRange: 8, basisWeightControl: 9, fiberOrientation: 8, hbCost: 9,
    pressurized: true, forMultiPly: true,
    headboxConfig: "multi_layer_headbox_separate_stock_channel_laminar_merge_ply",
    bestUse: "multi_ply_board_packaging_liner_multi_layer_headbox_stratified",
  },
  gap_former: {
    jetUniformity: 9, speedRange: 10, basisWeightControl: 9, fiberOrientation: 10, hbCost: 9,
    pressurized: true, forMultiPly: false,
    headboxConfig: "gap_former_headbox_twin_wire_jet_between_fabric_high_speed_form",
    bestUse: "high_speed_printing_paper_gap_former_twin_wire_even_formation",
  },
};

function get(t: HeadboxType): HeadboxData {
  return DATA[t];
}

export const jetUniformity = (t: HeadboxType) => get(t).jetUniformity;
export const speedRange = (t: HeadboxType) => get(t).speedRange;
export const basisWeightControl = (t: HeadboxType) => get(t).basisWeightControl;
export const fiberOrientation = (t: HeadboxType) => get(t).fiberOrientation;
export const hbCost = (t: HeadboxType) => get(t).hbCost;
export const pressurized = (t: HeadboxType) => get(t).pressurized;
export const forMultiPly = (t: HeadboxType) => get(t).forMultiPly;
export const headboxConfig = (t: HeadboxType) => get(t).headboxConfig;
export const bestUse = (t: HeadboxType) => get(t).bestUse;
export const headboxTypes = (): HeadboxType[] =>
  Object.keys(DATA) as HeadboxType[];
