export type TabletPressType =
  | "single_punch"
  | "rotary_standard"
  | "rotary_high_speed"
  | "bilayer_press"
  | "mini_tablet";

interface TabletPressData {
  outputRate: number;
  precision: number;
  flexibility: number;
  compression: number;
  tpCost: number;
  rotary: boolean;
  forProduction: boolean;
  tooling: string;
  bestUse: string;
}

const DATA: Record<TabletPressType, TabletPressData> = {
  single_punch: {
    outputRate: 3, precision: 6, flexibility: 8, compression: 5, tpCost: 3,
    rotary: false, forProduction: false,
    tooling: "single_station_upper_lower_punch_die_manual_fill_eccentric",
    bestUse: "rd_lab_small_batch_formulation_development_trial_tablet",
  },
  rotary_standard: {
    outputRate: 7, precision: 8, flexibility: 7, compression: 8, tpCost: 7,
    rotary: true, forProduction: true,
    tooling: "multi_station_turret_feeder_pre_compression_main_compress",
    bestUse: "pharmaceutical_production_standard_tablet_moderate_volume",
  },
  rotary_high_speed: {
    outputRate: 10, precision: 9, flexibility: 6, compression: 9, tpCost: 9,
    rotary: true, forProduction: true,
    tooling: "double_sided_turret_forced_feeder_high_speed_ejection",
    bestUse: "high_volume_otc_generic_tablet_mass_production_continuous",
  },
  bilayer_press: {
    outputRate: 6, precision: 10, flexibility: 5, compression: 9, tpCost: 10,
    rotary: true, forProduction: true,
    tooling: "dual_hopper_sequential_fill_compress_layer_check_reject",
    bestUse: "modified_release_combination_drug_two_layer_tablet_pharma",
  },
  mini_tablet: {
    outputRate: 5, precision: 9, flexibility: 7, compression: 6, tpCost: 6,
    rotary: true, forProduction: true,
    tooling: "multi_tip_punch_small_diameter_die_pediatric_capsule_fill",
    bestUse: "pediatric_dosage_capsule_fill_mini_tab_flexible_dosing",
  },
};

function get(t: TabletPressType): TabletPressData {
  return DATA[t];
}

export const outputRate = (t: TabletPressType) => get(t).outputRate;
export const precision = (t: TabletPressType) => get(t).precision;
export const flexibility = (t: TabletPressType) => get(t).flexibility;
export const compression = (t: TabletPressType) => get(t).compression;
export const tpCost = (t: TabletPressType) => get(t).tpCost;
export const rotary = (t: TabletPressType) => get(t).rotary;
export const forProduction = (t: TabletPressType) => get(t).forProduction;
export const tooling = (t: TabletPressType) => get(t).tooling;
export const bestUse = (t: TabletPressType) => get(t).bestUse;
export const tabletPressTypes = (): TabletPressType[] =>
  Object.keys(DATA) as TabletPressType[];
