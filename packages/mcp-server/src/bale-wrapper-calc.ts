export type BaleWrapperType =
  | "inline_round"
  | "individual_satellite"
  | "tube_wrapper"
  | "square_bale"
  | "combination_baler";

interface BaleWrapperData {
  speed: number;
  filmUsage: number;
  sealQuality: number;
  baleSize: number;
  bwCost: number;
  selfLoading: boolean;
  forSilage: boolean;
  wrap: string;
  bestUse: string;
}

const DATA: Record<BaleWrapperType, BaleWrapperData> = {
  inline_round: {
    speed: 10, filmUsage: 8, sealQuality: 9, baleSize: 8, bwCost: 8,
    selfLoading: true, forSilage: true,
    wrap: "inline_continuous_wrap_pre_stretched_film_6_layer_round",
    bestUse: "high_volume_silage_dairy_farm_continuous_inline_wrapping",
  },
  individual_satellite: {
    speed: 7, filmUsage: 7, sealQuality: 8, baleSize: 9, bwCost: 5,
    selfLoading: false, forSilage: true,
    wrap: "satellite_arm_rotate_bale_on_table_individual_wrap_round",
    bestUse: "general_purpose_round_bale_hay_silage_straw_small_farm",
  },
  tube_wrapper: {
    speed: 9, filmUsage: 9, sealQuality: 10, baleSize: 8, bwCost: 7,
    selfLoading: true, forSilage: true,
    wrap: "continuous_tube_film_bale_fed_into_tube_line_airtight",
    bestUse: "large_dairy_operation_tube_line_silage_maximum_air_exclude",
  },
  square_bale: {
    speed: 6, filmUsage: 6, sealQuality: 7, baleSize: 10, bwCost: 9,
    selfLoading: false, forSilage: true,
    wrap: "square_bale_platform_wrapper_stretch_film_large_rectangular",
    bestUse: "large_square_bale_haylage_commercial_dairy_feed_storage",
  },
  combination_baler: {
    speed: 8, filmUsage: 8, sealQuality: 9, baleSize: 7, bwCost: 10,
    selfLoading: true, forSilage: true,
    wrap: "integrated_baler_wrapper_one_pass_bale_and_wrap_combined",
    bestUse: "one_pass_field_operation_bale_wrap_combined_time_saving",
  },
};

function get(t: BaleWrapperType): BaleWrapperData {
  return DATA[t];
}

export const speed = (t: BaleWrapperType) => get(t).speed;
export const filmUsage = (t: BaleWrapperType) => get(t).filmUsage;
export const sealQuality = (t: BaleWrapperType) => get(t).sealQuality;
export const baleSize = (t: BaleWrapperType) => get(t).baleSize;
export const bwCost = (t: BaleWrapperType) => get(t).bwCost;
export const selfLoading = (t: BaleWrapperType) => get(t).selfLoading;
export const forSilage = (t: BaleWrapperType) => get(t).forSilage;
export const wrap = (t: BaleWrapperType) => get(t).wrap;
export const bestUse = (t: BaleWrapperType) => get(t).bestUse;
export const baleWrapperTypes = (): BaleWrapperType[] =>
  Object.keys(DATA) as BaleWrapperType[];
