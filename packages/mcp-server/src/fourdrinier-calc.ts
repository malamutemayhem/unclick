export type FourdrinierType =
  | "single_wire"
  | "twin_wire"
  | "top_former"
  | "crescent_former"
  | "suction_breast_roll";

interface FourdrinierData {
  formationQuality: number;
  drainageRate: number;
  machineSpeed: number;
  sheetWidth: number;
  ffCost: number;
  twinWire: boolean;
  forTissue: boolean;
  formerConfig: string;
  bestUse: string;
}

const DATA: Record<FourdrinierType, FourdrinierData> = {
  single_wire: {
    formationQuality: 7, drainageRate: 7, machineSpeed: 8, sheetWidth: 9, ffCost: 7,
    twinWire: false, forTissue: false,
    formerConfig: "single_fourdrinier_wire_table_hydrofoil_suction_box_drainage",
    bestUse: "printing_writing_paper_single_fourdrinier_wire_table_standard",
  },
  twin_wire: {
    formationQuality: 9, drainageRate: 10, machineSpeed: 10, sheetWidth: 9, ffCost: 9,
    twinWire: true, forTissue: false,
    formerConfig: "twin_wire_gap_former_blade_roll_both_side_drain_high_speed",
    bestUse: "high_speed_newsprint_fine_paper_twin_wire_gap_former_even_drain",
  },
  top_former: {
    formationQuality: 8, drainageRate: 8, machineSpeed: 9, sheetWidth: 9, ffCost: 8,
    twinWire: true, forTissue: false,
    formerConfig: "top_former_secondary_wire_on_fourdrinier_hybrid_two_side_drain",
    bestUse: "multi_ply_board_linerboard_top_former_hybrid_fourdrinier_drain",
  },
  crescent_former: {
    formationQuality: 8, drainageRate: 9, machineSpeed: 10, sheetWidth: 7, ffCost: 8,
    twinWire: true, forTissue: true,
    formerConfig: "crescent_former_tissue_wire_felt_wrap_suction_roll_high_speed",
    bestUse: "tissue_towel_crescent_former_high_speed_wrap_suction_roll_form",
  },
  suction_breast_roll: {
    formationQuality: 6, drainageRate: 6, machineSpeed: 7, sheetWidth: 8, ffCost: 6,
    twinWire: false, forTissue: false,
    formerConfig: "suction_breast_roll_fourdrinier_open_draw_board_machine_basic",
    bestUse: "board_packaging_paper_suction_breast_roll_basic_fourdrinier",
  },
};

function get(t: FourdrinierType): FourdrinierData {
  return DATA[t];
}

export const formationQuality = (t: FourdrinierType) => get(t).formationQuality;
export const drainageRate = (t: FourdrinierType) => get(t).drainageRate;
export const machineSpeed = (t: FourdrinierType) => get(t).machineSpeed;
export const sheetWidth = (t: FourdrinierType) => get(t).sheetWidth;
export const ffCost = (t: FourdrinierType) => get(t).ffCost;
export const twinWire = (t: FourdrinierType) => get(t).twinWire;
export const forTissue = (t: FourdrinierType) => get(t).forTissue;
export const formerConfig = (t: FourdrinierType) => get(t).formerConfig;
export const bestUse = (t: FourdrinierType) => get(t).bestUse;
export const fourdrinierTypes = (): FourdrinierType[] =>
  Object.keys(DATA) as FourdrinierType[];
