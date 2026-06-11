export type ChocolateTempererType =
  | "table_marble"
  | "continuous_multi_zone"
  | "seed_injection"
  | "scraped_surface"
  | "batch_kettle";

interface ChocolateTempererData {
  crystalControl: number;
  throughput: number;
  snapQuality: number;
  glossFinish: number;
  ctCost: number;
  continuous: boolean;
  forCouverture: boolean;
  tempererConfig: string;
  bestUse: string;
}

const DATA: Record<ChocolateTempererType, ChocolateTempererData> = {
  table_marble: {
    crystalControl: 9, throughput: 2, snapQuality: 10, glossFinish: 10, ctCost: 2,
    continuous: false, forCouverture: true,
    tempererConfig: "table_marble_temperer_hand_spread_cool_fold_form_v_crystal_artisan",
    bestUse: "artisan_chocolatier_marble_table_temper_hand_craft_truffle_bonbon",
  },
  continuous_multi_zone: {
    crystalControl: 9, throughput: 10, snapQuality: 9, glossFinish: 9, ctCost: 9,
    continuous: true, forCouverture: true,
    tempererConfig: "continuous_multi_zone_temperer_heat_cool_reheat_inline_production",
    bestUse: "large_chocolate_factory_continuous_multi_zone_temper_inline_mold",
  },
  seed_injection: {
    crystalControl: 10, throughput: 8, snapQuality: 10, glossFinish: 10, ctCost: 10,
    continuous: true, forCouverture: true,
    tempererConfig: "seed_injection_temperer_cocoa_butter_crystal_seed_precise_nucleate",
    bestUse: "premium_couverture_seed_injection_temper_precise_crystal_perfect",
  },
  scraped_surface: {
    crystalControl: 8, throughput: 9, snapQuality: 8, glossFinish: 8, ctCost: 7,
    continuous: true, forCouverture: true,
    tempererConfig: "scraped_surface_temperer_jacketed_cylinder_blade_scrape_cool_wall",
    bestUse: "commercial_chocolate_scraped_surface_temperer_reliable_consistent",
  },
  batch_kettle: {
    crystalControl: 7, throughput: 5, snapQuality: 7, glossFinish: 7, ctCost: 4,
    continuous: false, forCouverture: true,
    tempererConfig: "batch_kettle_temperer_jacketed_bowl_agitator_small_batch_manual",
    bestUse: "small_confectionery_batch_kettle_temper_small_lot_seasonal_product",
  },
};

function get(t: ChocolateTempererType): ChocolateTempererData {
  return DATA[t];
}

export const crystalControl = (t: ChocolateTempererType) => get(t).crystalControl;
export const throughput = (t: ChocolateTempererType) => get(t).throughput;
export const snapQuality = (t: ChocolateTempererType) => get(t).snapQuality;
export const glossFinish = (t: ChocolateTempererType) => get(t).glossFinish;
export const ctCost = (t: ChocolateTempererType) => get(t).ctCost;
export const continuous = (t: ChocolateTempererType) => get(t).continuous;
export const forCouverture = (t: ChocolateTempererType) => get(t).forCouverture;
export const tempererConfig = (t: ChocolateTempererType) => get(t).tempererConfig;
export const bestUse = (t: ChocolateTempererType) => get(t).bestUse;
export const chocolateTempererTypes = (): ChocolateTempererType[] =>
  Object.keys(DATA) as ChocolateTempererType[];
