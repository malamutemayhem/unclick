export type TraySealerType =
  | "manual_tabletop"
  | "semi_auto_inline"
  | "full_auto_map"
  | "skin_pack"
  | "vacuum_skin";

interface TraySealerData {
  sealSpeed: number;
  gasFlush: number;
  filmWaste: number;
  shelfLife: number;
  tsCost_: number;
  modified: boolean;
  forFresh: boolean;
  sealConfig: string;
  bestUse: string;
}

const DATA: Record<TraySealerType, TraySealerData> = {
  manual_tabletop: {
    sealSpeed: 3, gasFlush: 4, filmWaste: 5, shelfLife: 5, tsCost_: 2,
    modified: false, forFresh: true,
    sealConfig: "manual_tray_place_film_roll_heat_seal_cut_tabletop_simple_unit",
    bestUse: "small_deli_bakery_ready_meal_manual_seal_low_volume_counter",
  },
  semi_auto_inline: {
    sealSpeed: 7, gasFlush: 7, filmWaste: 7, shelfLife: 7, tsCost_: 5,
    modified: true, forFresh: true,
    sealConfig: "operator_load_tray_auto_cycle_gas_flush_seal_cut_semi_auto",
    bestUse: "medium_volume_fresh_produce_meat_map_tray_semi_auto_cycle",
  },
  full_auto_map: {
    sealSpeed: 10, gasFlush: 10, filmWaste: 9, shelfLife: 10, tsCost_: 9,
    modified: true, forFresh: true,
    sealConfig: "multi_lane_auto_denest_fill_gas_flush_seal_trim_high_speed",
    bestUse: "high_speed_fresh_meat_seafood_map_gas_flush_extended_shelf_life",
  },
  skin_pack: {
    sealSpeed: 6, gasFlush: 5, filmWaste: 8, shelfLife: 8, tsCost_: 7,
    modified: false, forFresh: true,
    sealConfig: "vacuum_skin_film_drape_tray_tight_contour_product_shape_seal",
    bestUse: "premium_meat_cheese_skin_tight_film_presentation_retail_pack",
  },
  vacuum_skin: {
    sealSpeed: 8, gasFlush: 8, filmWaste: 9, shelfLife: 9, tsCost_: 10,
    modified: true, forFresh: false,
    sealConfig: "vacuum_skin_plus_map_gas_headspace_tight_film_barrier_premium",
    bestUse: "premium_protein_vacuum_skin_map_combo_maximum_shelf_life_pack",
  },
};

function get(t: TraySealerType): TraySealerData {
  return DATA[t];
}

export const sealSpeed = (t: TraySealerType) => get(t).sealSpeed;
export const gasFlush = (t: TraySealerType) => get(t).gasFlush;
export const filmWaste = (t: TraySealerType) => get(t).filmWaste;
export const shelfLife = (t: TraySealerType) => get(t).shelfLife;
export const tsCost_ = (t: TraySealerType) => get(t).tsCost_;
export const modified = (t: TraySealerType) => get(t).modified;
export const forFresh = (t: TraySealerType) => get(t).forFresh;
export const sealConfig = (t: TraySealerType) => get(t).sealConfig;
export const bestUse = (t: TraySealerType) => get(t).bestUse;
export const traySealerTypes = (): TraySealerType[] =>
  Object.keys(DATA) as TraySealerType[];
