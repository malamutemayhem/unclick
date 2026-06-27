export type TanningDrumType =
  | "chrome_tanning"
  | "vegetable_tanning"
  | "combination_tan"
  | "retanning_drum"
  | "dyeing_drum";

interface TanningDrumData {
  penetration: number;
  throughput: number;
  leatherSoftness: number;
  colorFastness: number;
  tdCost_: number;
  ecoFriendly: boolean;
  forUpholstery: boolean;
  drumConfig: string;
  bestUse: string;
}

const DATA: Record<TanningDrumType, TanningDrumData> = {
  chrome_tanning: {
    penetration: 10, throughput: 10, leatherSoftness: 9, colorFastness: 8, tdCost_: 6,
    ecoFriendly: false, forUpholstery: true,
    drumConfig: "chrome_tanning_drum_cr3_salt_rotate_fast_tan_soft_supple_leather",
    bestUse: "commercial_tannery_chrome_drum_fast_tan_soft_garment_upholstery",
  },
  vegetable_tanning: {
    penetration: 6, throughput: 3, leatherSoftness: 5, colorFastness: 9, tdCost_: 5,
    ecoFriendly: true, forUpholstery: false,
    drumConfig: "vegetable_tanning_drum_bark_tannin_slow_rotate_firm_saddle_leather",
    bestUse: "artisan_tannery_vegetable_drum_bark_tannin_firm_saddle_belt_craft",
  },
  combination_tan: {
    penetration: 8, throughput: 7, leatherSoftness: 8, colorFastness: 9, tdCost_: 7,
    ecoFriendly: false, forUpholstery: true,
    drumConfig: "combination_tan_drum_chrome_veg_sequential_balance_soft_durable",
    bestUse: "quality_tannery_combination_drum_chrome_veg_balance_shoe_bag",
  },
  retanning_drum: {
    penetration: 7, throughput: 8, leatherSoftness: 9, colorFastness: 7, tdCost_: 4,
    ecoFriendly: false, forUpholstery: true,
    drumConfig: "retanning_drum_syntan_resin_fill_level_grain_correct_character",
    bestUse: "finishing_tannery_retanning_drum_syntan_fill_grain_correct_level",
  },
  dyeing_drum: {
    penetration: 9, throughput: 9, leatherSoftness: 7, colorFastness: 10, tdCost_: 5,
    ecoFriendly: false, forUpholstery: true,
    drumConfig: "dyeing_drum_aniline_dye_rotate_penetrate_through_color_uniform",
    bestUse: "color_tannery_dyeing_drum_aniline_through_dye_uniform_color_depth",
  },
};

function get(t: TanningDrumType): TanningDrumData {
  return DATA[t];
}

export const penetration = (t: TanningDrumType) => get(t).penetration;
export const throughput = (t: TanningDrumType) => get(t).throughput;
export const leatherSoftness = (t: TanningDrumType) => get(t).leatherSoftness;
export const colorFastness = (t: TanningDrumType) => get(t).colorFastness;
export const tdCost_ = (t: TanningDrumType) => get(t).tdCost_;
export const ecoFriendly = (t: TanningDrumType) => get(t).ecoFriendly;
export const forUpholstery = (t: TanningDrumType) => get(t).forUpholstery;
export const drumConfig = (t: TanningDrumType) => get(t).drumConfig;
export const bestUse = (t: TanningDrumType) => get(t).bestUse;
export const tanningDrumTypes = (): TanningDrumType[] =>
  Object.keys(DATA) as TanningDrumType[];
