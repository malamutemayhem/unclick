export type WinePressType =
  | "basket_vertical"
  | "bladder_membrane"
  | "screw_continuous"
  | "pneumatic_tank"
  | "open_top_punch";

interface WinePressData {
  juiceClarity: number;
  pressureControl: number;
  throughput: number;
  gentleness: number;
  wpCost: number;
  continuous: boolean;
  forWhite: boolean;
  pressConfig: string;
  bestUse: string;
}

const DATA: Record<WinePressType, WinePressData> = {
  basket_vertical: {
    juiceClarity: 8, pressureControl: 5, throughput: 4, gentleness: 9, wpCost: 4,
    continuous: false, forWhite: true,
    pressConfig: "basket_vertical_wine_press_traditional_wood_slat_gravity_drain",
    bestUse: "small_artisan_winery_basket_press_traditional_gentle_whole_cluster",
  },
  bladder_membrane: {
    juiceClarity: 10, pressureControl: 10, throughput: 8, gentleness: 10, wpCost: 9,
    continuous: false, forWhite: true,
    pressConfig: "bladder_membrane_wine_press_inflatable_rubber_gentle_cycle_program",
    bestUse: "premium_white_wine_bladder_membrane_press_gentle_low_phenolic",
  },
  screw_continuous: {
    juiceClarity: 5, pressureControl: 4, throughput: 10, gentleness: 3, wpCost: 6,
    continuous: true, forWhite: false,
    pressConfig: "screw_continuous_wine_press_auger_high_volume_juice_concentrate",
    bestUse: "bulk_wine_juice_production_screw_press_continuous_high_throughput",
  },
  pneumatic_tank: {
    juiceClarity: 9, pressureControl: 9, throughput: 7, gentleness: 9, wpCost: 8,
    continuous: false, forWhite: true,
    pressConfig: "pneumatic_tank_wine_press_closed_inert_gas_oxidation_protect",
    bestUse: "quality_winery_pneumatic_tank_press_inert_atmosphere_oxidation_free",
  },
  open_top_punch: {
    juiceClarity: 6, pressureControl: 3, throughput: 5, gentleness: 7, wpCost: 3,
    continuous: false, forWhite: false,
    pressConfig: "open_top_punch_down_ferment_press_red_wine_cap_management_extract",
    bestUse: "red_wine_producer_open_top_punch_down_cap_management_extraction",
  },
};

function get(t: WinePressType): WinePressData {
  return DATA[t];
}

export const juiceClarity = (t: WinePressType) => get(t).juiceClarity;
export const pressureControl = (t: WinePressType) => get(t).pressureControl;
export const throughput = (t: WinePressType) => get(t).throughput;
export const gentleness = (t: WinePressType) => get(t).gentleness;
export const wpCost = (t: WinePressType) => get(t).wpCost;
export const continuous = (t: WinePressType) => get(t).continuous;
export const forWhite = (t: WinePressType) => get(t).forWhite;
export const pressConfig = (t: WinePressType) => get(t).pressConfig;
export const bestUse = (t: WinePressType) => get(t).bestUse;
export const winePressTypes = (): WinePressType[] =>
  Object.keys(DATA) as WinePressType[];
