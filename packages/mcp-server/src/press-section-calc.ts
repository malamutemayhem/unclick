export type PressSectionType =
  | "straight_through"
  | "tri_nip"
  | "shoe_press"
  | "suction_press"
  | "blind_drilled";

interface PressSectionData {
  waterRemoval: number;
  sheetStrength: number;
  nipPressure: number;
  energySaving: number;
  psCost: number;
  extendedNip: boolean;
  forBoard: boolean;
  pressConfig: string;
  bestUse: string;
}

const DATA: Record<PressSectionType, PressSectionData> = {
  straight_through: {
    waterRemoval: 7, sheetStrength: 7, nipPressure: 7, energySaving: 6, psCost: 6,
    extendedNip: false, forBoard: false,
    pressConfig: "straight_through_press_felt_carry_sheet_two_nip_simple_layout",
    bestUse: "standard_printing_paper_straight_through_press_two_nip_simple",
  },
  tri_nip: {
    waterRemoval: 8, sheetStrength: 8, nipPressure: 8, energySaving: 7, psCost: 7,
    extendedNip: false, forBoard: true,
    pressConfig: "tri_nip_press_three_nip_compact_layout_board_heavy_basis_weight",
    bestUse: "board_heavy_basis_weight_tri_nip_press_compact_three_nip_layout",
  },
  shoe_press: {
    waterRemoval: 10, sheetStrength: 10, nipPressure: 10, energySaving: 10, psCost: 10,
    extendedNip: true, forBoard: true,
    pressConfig: "shoe_press_extended_nip_wide_contact_zone_high_dryness_energy",
    bestUse: "all_grades_shoe_press_extended_nip_high_dryness_dryer_energy_save",
  },
  suction_press: {
    waterRemoval: 6, sheetStrength: 6, nipPressure: 6, energySaving: 5, psCost: 5,
    extendedNip: false, forBoard: false,
    pressConfig: "suction_press_roll_vacuum_draw_water_through_felt_older_design",
    bestUse: "older_machine_retrofit_suction_press_vacuum_roll_basic_dewater",
  },
  blind_drilled: {
    waterRemoval: 8, sheetStrength: 7, nipPressure: 8, energySaving: 7, psCost: 7,
    extendedNip: false, forBoard: false,
    pressConfig: "blind_drilled_press_roll_groove_water_channel_nip_dewater_fast",
    bestUse: "tissue_towel_paper_blind_drilled_roll_groove_fast_nip_dewater",
  },
};

function get(t: PressSectionType): PressSectionData {
  return DATA[t];
}

export const waterRemoval = (t: PressSectionType) => get(t).waterRemoval;
export const sheetStrength = (t: PressSectionType) => get(t).sheetStrength;
export const nipPressure = (t: PressSectionType) => get(t).nipPressure;
export const energySaving = (t: PressSectionType) => get(t).energySaving;
export const psCost = (t: PressSectionType) => get(t).psCost;
export const extendedNip = (t: PressSectionType) => get(t).extendedNip;
export const forBoard = (t: PressSectionType) => get(t).forBoard;
export const pressConfig = (t: PressSectionType) => get(t).pressConfig;
export const bestUse = (t: PressSectionType) => get(t).bestUse;
export const pressSectionTypes = (): PressSectionType[] =>
  Object.keys(DATA) as PressSectionType[];
