export type HydraulicPressType =
  | "c_frame_gap_bench"
  | "h_frame_four_column"
  | "straightening_arbor"
  | "deep_draw_double_action"
  | "forging_closed_die";

interface HydraulicPressData {
  tonnage: number;
  speed: number;
  precision: number;
  versatility: number;
  hpCost: number;
  cnc: boolean;
  forProduction: boolean;
  cylinder: string;
  bestUse: string;
}

const DATA: Record<HydraulicPressType, HydraulicPressData> = {
  c_frame_gap_bench: {
    tonnage: 4, speed: 7, precision: 6, versatility: 8, hpCost: 3,
    cnc: false, forProduction: false,
    cylinder: "single_acting_top_mounted",
    bestUse: "maintenance_shop_bearing_press",
  },
  h_frame_four_column: {
    tonnage: 8, speed: 7, precision: 8, versatility: 9, hpCost: 6,
    cnc: true, forProduction: true,
    cylinder: "four_column_guided_platen",
    bestUse: "general_purpose_stamping_forming",
  },
  straightening_arbor: {
    tonnage: 5, speed: 6, precision: 9, versatility: 6, hpCost: 4,
    cnc: false, forProduction: false,
    cylinder: "precision_ram_dial_indicator",
    bestUse: "shaft_straightening_assembly_press",
  },
  deep_draw_double_action: {
    tonnage: 9, speed: 8, precision: 9, versatility: 6, hpCost: 9,
    cnc: true, forProduction: true,
    cylinder: "inner_outer_ram_blank_hold",
    bestUse: "automotive_deep_draw_panel",
  },
  forging_closed_die: {
    tonnage: 10, speed: 9, precision: 7, versatility: 4, hpCost: 10,
    cnc: true, forProduction: true,
    cylinder: "high_tonnage_isothermal_forge",
    bestUse: "aerospace_turbine_disc_forging",
  },
};

function get(t: HydraulicPressType): HydraulicPressData {
  return DATA[t];
}

export const tonnage = (t: HydraulicPressType) => get(t).tonnage;
export const speed = (t: HydraulicPressType) => get(t).speed;
export const precision = (t: HydraulicPressType) => get(t).precision;
export const versatility = (t: HydraulicPressType) => get(t).versatility;
export const hpCost = (t: HydraulicPressType) => get(t).hpCost;
export const cnc = (t: HydraulicPressType) => get(t).cnc;
export const forProduction = (t: HydraulicPressType) => get(t).forProduction;
export const cylinder = (t: HydraulicPressType) => get(t).cylinder;
export const bestUse = (t: HydraulicPressType) => get(t).bestUse;
export const hydraulicPressTypes = (): HydraulicPressType[] =>
  Object.keys(DATA) as HydraulicPressType[];
