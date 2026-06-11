export type ShrinkWrapperType =
  | "heat_tunnel"
  | "steam_tunnel"
  | "band_sealer"
  | "sleeve_wrapper"
  | "shrink_gun";

interface ShrinkWrapperData {
  wrapQuality: number;
  throughput: number;
  filmRange: number;
  shrinkUniformity: number;
  swCost: number;
  automated: boolean;
  forMultiPack: boolean;
  wrapperConfig: string;
  bestUse: string;
}

const DATA: Record<ShrinkWrapperType, ShrinkWrapperData> = {
  heat_tunnel: {
    wrapQuality: 8, throughput: 9, filmRange: 8, shrinkUniformity: 8, swCost: 7,
    automated: true, forMultiPack: true,
    wrapperConfig: "heat_tunnel_shrink_wrapper_conveyor_hot_air_recirculate_even_shrink",
    bestUse: "tray_bundle_heat_tunnel_shrink_wrapper_multi_pack_beverage_wrap",
  },
  steam_tunnel: {
    wrapQuality: 9, throughput: 7, filmRange: 6, shrinkUniformity: 9, swCost: 8,
    automated: true, forMultiPack: false,
    wrapperConfig: "steam_tunnel_shrink_wrapper_saturated_steam_gentle_even_contour",
    bestUse: "bottle_label_steam_tunnel_shrink_wrapper_sleeve_contour_conform",
  },
  band_sealer: {
    wrapQuality: 7, throughput: 8, filmRange: 7, shrinkUniformity: 7, swCost: 5,
    automated: true, forMultiPack: true,
    wrapperConfig: "band_sealer_shrink_wrapper_side_seal_bar_cut_film_feed_auto",
    bestUse: "box_overwrap_band_sealer_shrink_wrapper_side_seal_tamper_evident",
  },
  sleeve_wrapper: {
    wrapQuality: 8, throughput: 9, filmRange: 7, shrinkUniformity: 8, swCost: 7,
    automated: true, forMultiPack: true,
    wrapperConfig: "sleeve_wrapper_shrink_wrapper_film_sleeve_seal_cut_tunnel_shrink",
    bestUse: "retail_pack_sleeve_wrapper_shrink_wrapper_display_ready_collate",
  },
  shrink_gun: {
    wrapQuality: 5, throughput: 3, filmRange: 9, shrinkUniformity: 4, swCost: 2,
    automated: false, forMultiPack: false,
    wrapperConfig: "shrink_gun_shrink_wrapper_hand_held_heat_gun_spot_shrink_manual",
    bestUse: "odd_shape_shrink_gun_shrink_wrapper_hand_spot_shrink_one_off",
  },
};

function get(t: ShrinkWrapperType): ShrinkWrapperData {
  return DATA[t];
}

export const wrapQuality = (t: ShrinkWrapperType) => get(t).wrapQuality;
export const throughput = (t: ShrinkWrapperType) => get(t).throughput;
export const filmRange = (t: ShrinkWrapperType) => get(t).filmRange;
export const shrinkUniformity = (t: ShrinkWrapperType) => get(t).shrinkUniformity;
export const swCost = (t: ShrinkWrapperType) => get(t).swCost;
export const automated = (t: ShrinkWrapperType) => get(t).automated;
export const forMultiPack = (t: ShrinkWrapperType) => get(t).forMultiPack;
export const wrapperConfig = (t: ShrinkWrapperType) => get(t).wrapperConfig;
export const bestUse = (t: ShrinkWrapperType) => get(t).bestUse;
export const shrinkWrapperTypes = (): ShrinkWrapperType[] =>
  Object.keys(DATA) as ShrinkWrapperType[];
