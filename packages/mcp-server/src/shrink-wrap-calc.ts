export type ShrinkWrapType =
  | "heat_tunnel"
  | "sleeve_sealer"
  | "l_bar_sealer"
  | "side_sealer"
  | "shrink_bundler";

interface ShrinkWrapData {
  speed: number;
  filmUsage: number;
  sealQuality: number;
  flexibility: number;
  swCost: number;
  continuous: boolean;
  forRetail: boolean;
  film: string;
  bestUse: string;
}

const DATA: Record<ShrinkWrapType, ShrinkWrapData> = {
  heat_tunnel: {
    speed: 9, filmUsage: 7, sealQuality: 8, flexibility: 7, swCost: 5,
    continuous: true, forRetail: true,
    film: "polyolefin_crosslinked_shrink_film_hot_air_tunnel_wrap",
    bestUse: "individual_product_wrap_dvd_box_cosmetic_retail_display",
  },
  sleeve_sealer: {
    speed: 10, filmUsage: 8, sealQuality: 9, flexibility: 8, swCost: 7,
    continuous: true, forRetail: true,
    film: "center_fold_polyolefin_sleeve_cut_seal_shrink_tight_wrap",
    bestUse: "bottle_can_tray_multipak_bundle_high_speed_beverage_line",
  },
  l_bar_sealer: {
    speed: 6, filmUsage: 6, sealQuality: 8, flexibility: 9, swCost: 4,
    continuous: false, forRetail: true,
    film: "flat_polyolefin_sheet_l_bar_cut_seal_manual_semi_auto",
    bestUse: "small_batch_gift_basket_book_stationery_manual_wrap_shop",
  },
  side_sealer: {
    speed: 10, filmUsage: 9, sealQuality: 9, flexibility: 6, swCost: 8,
    continuous: true, forRetail: true,
    film: "center_fold_pe_film_continuous_side_seal_inline_high_output",
    bestUse: "corrugated_case_tray_pallet_overwrap_high_volume_line",
  },
  shrink_bundler: {
    speed: 9, filmUsage: 8, sealQuality: 7, flexibility: 7, swCost: 6,
    continuous: true, forRetail: false,
    film: "pe_shrink_film_collation_bundle_multipack_tray_group",
    bestUse: "beverage_multipack_canned_food_collation_bundle_no_tray",
  },
};

function get(t: ShrinkWrapType): ShrinkWrapData {
  return DATA[t];
}

export const speed = (t: ShrinkWrapType) => get(t).speed;
export const filmUsage = (t: ShrinkWrapType) => get(t).filmUsage;
export const sealQuality = (t: ShrinkWrapType) => get(t).sealQuality;
export const flexibility = (t: ShrinkWrapType) => get(t).flexibility;
export const swCost = (t: ShrinkWrapType) => get(t).swCost;
export const continuous = (t: ShrinkWrapType) => get(t).continuous;
export const forRetail = (t: ShrinkWrapType) => get(t).forRetail;
export const film = (t: ShrinkWrapType) => get(t).film;
export const bestUse = (t: ShrinkWrapType) => get(t).bestUse;
export const shrinkWrapTypes = (): ShrinkWrapType[] =>
  Object.keys(DATA) as ShrinkWrapType[];
