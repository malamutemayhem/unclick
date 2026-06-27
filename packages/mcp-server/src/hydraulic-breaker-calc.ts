export type HydraulicBreakerType =
  | "heavy_top_mount_excavator"
  | "medium_carrier_mount"
  | "light_skid_steer_mini"
  | "handheld_jack_hammer"
  | "pedestal_boom_static";

interface HydraulicBreakerData {
  impact: number;
  frequency: number;
  weight: number;
  precision: number;
  hbCost: number;
  carrierMounted: boolean;
  forRock: boolean;
  chisel: string;
  bestUse: string;
}

const DATA: Record<HydraulicBreakerType, HydraulicBreakerData> = {
  heavy_top_mount_excavator: {
    impact: 10, frequency: 5, weight: 3, precision: 4, hbCost: 9,
    carrierMounted: true, forRock: true,
    chisel: "moil_point_large_diameter_tool",
    bestUse: "rock_break_quarry_foundation_mass",
  },
  medium_carrier_mount: {
    impact: 7, frequency: 7, weight: 5, precision: 6, hbCost: 7,
    carrierMounted: true, forRock: true,
    chisel: "chisel_blunt_flat_cross_cut",
    bestUse: "concrete_slab_road_break_secondary",
  },
  light_skid_steer_mini: {
    impact: 4, frequency: 9, weight: 7, precision: 7, hbCost: 4,
    carrierMounted: true, forRock: false,
    chisel: "narrow_chisel_compact_tool",
    bestUse: "trench_utility_patch_small_concrete",
  },
  handheld_jack_hammer: {
    impact: 3, frequency: 10, weight: 8, precision: 8, hbCost: 2,
    carrierMounted: false, forRock: false,
    chisel: "point_flat_chisel_spade_bit",
    bestUse: "sidewalk_patch_tile_remove_detail",
  },
  pedestal_boom_static: {
    impact: 9, frequency: 6, weight: 2, precision: 5, hbCost: 10,
    carrierMounted: false, forRock: true,
    chisel: "heavy_moil_pedestal_arm_boom",
    bestUse: "crusher_oversize_rock_break_station",
  },
};

function get(t: HydraulicBreakerType): HydraulicBreakerData {
  return DATA[t];
}

export const impact = (t: HydraulicBreakerType) => get(t).impact;
export const frequency = (t: HydraulicBreakerType) => get(t).frequency;
export const weight = (t: HydraulicBreakerType) => get(t).weight;
export const precision = (t: HydraulicBreakerType) => get(t).precision;
export const hbCost = (t: HydraulicBreakerType) => get(t).hbCost;
export const carrierMounted = (t: HydraulicBreakerType) => get(t).carrierMounted;
export const forRock = (t: HydraulicBreakerType) => get(t).forRock;
export const chisel = (t: HydraulicBreakerType) => get(t).chisel;
export const bestUse = (t: HydraulicBreakerType) => get(t).bestUse;
export const hydraulicBreakerTypes = (): HydraulicBreakerType[] =>
  Object.keys(DATA) as HydraulicBreakerType[];
