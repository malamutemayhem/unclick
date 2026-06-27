export type BandsawMillType =
  | "horizontal_band"
  | "vertical_band"
  | "double_cut"
  | "resaw_band"
  | "portable_swing";

interface BandsawMillData {
  cutAccuracy: number;
  throughput: number;
  kerf: number;
  logCapacity: number;
  bsCost: number;
  portable: boolean;
  forHardwood: boolean;
  millConfig: string;
  bestUse: string;
}

const DATA: Record<BandsawMillType, BandsawMillData> = {
  horizontal_band: {
    cutAccuracy: 9, throughput: 7, kerf: 9, logCapacity: 9, bsCost: 6,
    portable: false, forHardwood: true,
    millConfig: "horizontal_band_mill_log_carriage_blade_traverse_slab_cut",
    bestUse: "sawmill_horizontal_band_mill_hardwood_lumber_production_custom",
  },
  vertical_band: {
    cutAccuracy: 8, throughput: 8, kerf: 8, logCapacity: 7, bsCost: 5,
    portable: false, forHardwood: true,
    millConfig: "vertical_band_mill_upright_blade_feed_table_resaw_lumber_slab",
    bestUse: "lumber_yard_vertical_band_mill_resaw_cant_board_thick_plank",
  },
  double_cut: {
    cutAccuracy: 9, throughput: 10, kerf: 8, logCapacity: 10, bsCost: 10,
    portable: false, forHardwood: true,
    millConfig: "double_cut_band_mill_twin_blade_both_directions_high_production",
    bestUse: "industrial_sawmill_double_cut_band_mill_maximum_throughput_log",
  },
  resaw_band: {
    cutAccuracy: 10, throughput: 8, kerf: 10, logCapacity: 6, bsCost: 7,
    portable: false, forHardwood: true,
    millConfig: "resaw_band_mill_thin_blade_precise_cut_veneer_thin_board_yield",
    bestUse: "specialty_lumber_resaw_band_mill_thin_cut_veneer_maximum_yield",
  },
  portable_swing: {
    cutAccuracy: 7, throughput: 4, kerf: 8, logCapacity: 8, bsCost: 3,
    portable: true, forHardwood: true,
    millConfig: "portable_swing_band_mill_trailer_mount_onsite_log_cut_mobile",
    bestUse: "farm_forestry_portable_swing_band_mill_onsite_custom_milling",
  },
};

function get(t: BandsawMillType): BandsawMillData {
  return DATA[t];
}

export const cutAccuracy = (t: BandsawMillType) => get(t).cutAccuracy;
export const throughput = (t: BandsawMillType) => get(t).throughput;
export const kerf = (t: BandsawMillType) => get(t).kerf;
export const logCapacity = (t: BandsawMillType) => get(t).logCapacity;
export const bsCost = (t: BandsawMillType) => get(t).bsCost;
export const portable = (t: BandsawMillType) => get(t).portable;
export const forHardwood = (t: BandsawMillType) => get(t).forHardwood;
export const millConfig = (t: BandsawMillType) => get(t).millConfig;
export const bestUse = (t: BandsawMillType) => get(t).bestUse;
export const bandsawMillTypes = (): BandsawMillType[] =>
  Object.keys(DATA) as BandsawMillType[];
