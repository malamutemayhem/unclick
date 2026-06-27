export type BagMakerType =
  | "pillow_bag"
  | "gusseted_bag"
  | "stand_up_pouch"
  | "wicketed_bag"
  | "side_seal_bag";

interface BagMakerData {
  sealStrength: number;
  throughput: number;
  filmRange: number;
  bagVariety: number;
  bmCost: number;
  inlineFill: boolean;
  forRetail: boolean;
  makerConfig: string;
  bestUse: string;
}

const DATA: Record<BagMakerType, BagMakerData> = {
  pillow_bag: {
    sealStrength: 7, throughput: 9, filmRange: 8, bagVariety: 5, bmCost: 5,
    inlineFill: true, forRetail: false,
    makerConfig: "pillow_bag_maker_fin_seal_back_seam_cross_seal_cut_fill_vertical",
    bestUse: "snack_pack_pillow_bag_maker_vffs_fill_seal_chip_cracker_cereal",
  },
  gusseted_bag: {
    sealStrength: 8, throughput: 7, filmRange: 7, bagVariety: 7, bmCost: 7,
    inlineFill: true, forRetail: true,
    makerConfig: "gusseted_bag_maker_side_fold_tuck_bottom_flat_stand_shelf_stable",
    bestUse: "coffee_bag_gusseted_bag_maker_side_gusset_valve_shelf_stand",
  },
  stand_up_pouch: {
    sealStrength: 8, throughput: 6, filmRange: 7, bagVariety: 8, bmCost: 8,
    inlineFill: true, forRetail: true,
    makerConfig: "stand_up_pouch_bag_maker_bottom_gusset_zip_close_spout_fitment",
    bestUse: "liquid_refill_stand_up_pouch_bag_maker_spout_zip_reseal_retail",
  },
  wicketed_bag: {
    sealStrength: 7, throughput: 8, filmRange: 6, bagVariety: 4, bmCost: 4,
    inlineFill: false, forRetail: false,
    makerConfig: "wicketed_bag_maker_stack_on_wire_lip_open_auto_load_bread_bakery",
    bestUse: "bread_loaf_wicketed_bag_maker_stack_wire_auto_open_bakery_line",
  },
  side_seal_bag: {
    sealStrength: 7, throughput: 9, filmRange: 8, bagVariety: 6, bmCost: 5,
    inlineFill: false, forRetail: false,
    makerConfig: "side_seal_bag_maker_two_side_seal_cut_stack_flat_poly_bag_ship",
    bestUse: "poly_mailer_side_seal_bag_maker_flat_bag_ecommerce_ship_pack",
  },
};

function get(t: BagMakerType): BagMakerData {
  return DATA[t];
}

export const sealStrength = (t: BagMakerType) => get(t).sealStrength;
export const throughput = (t: BagMakerType) => get(t).throughput;
export const filmRange = (t: BagMakerType) => get(t).filmRange;
export const bagVariety = (t: BagMakerType) => get(t).bagVariety;
export const bmCost = (t: BagMakerType) => get(t).bmCost;
export const inlineFill = (t: BagMakerType) => get(t).inlineFill;
export const forRetail = (t: BagMakerType) => get(t).forRetail;
export const makerConfig = (t: BagMakerType) => get(t).makerConfig;
export const bestUse = (t: BagMakerType) => get(t).bestUse;
export const bagMakerTypes = (): BagMakerType[] =>
  Object.keys(DATA) as BagMakerType[];
