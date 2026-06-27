export type PouchFillerType =
  | "premade_rotary"
  | "form_fill_seal"
  | "stick_pack"
  | "spouted_pouch"
  | "vacuum_retort";

interface PouchFillerData {
  fillSpeed: number;
  fillAccuracy: number;
  pouchRange: number;
  sealIntegrity: number;
  pfCost: number;
  premade: boolean;
  forLiquid: boolean;
  fillerConfig: string;
  bestUse: string;
}

const DATA: Record<PouchFillerType, PouchFillerData> = {
  premade_rotary: {
    fillSpeed: 8, fillAccuracy: 9, pouchRange: 8, sealIntegrity: 9, pfCost: 7,
    premade: true, forLiquid: true,
    fillerConfig: "rotary_carousel_premade_pouch_open_fill_seal_zip_spout_ready",
    bestUse: "premade_standup_pouch_snack_pet_food_sauce_zip_lock_fill_seal",
  },
  form_fill_seal: {
    fillSpeed: 10, fillAccuracy: 8, pouchRange: 6, sealIntegrity: 8, pfCost: 8,
    premade: false, forLiquid: false,
    fillerConfig: "roll_stock_film_form_pouch_fill_product_seal_cut_continuous",
    bestUse: "high_speed_snack_chip_candy_pillow_bag_vertical_ffs_packaging",
  },
  stick_pack: {
    fillSpeed: 9, fillAccuracy: 10, pouchRange: 4, sealIntegrity: 8, pfCost: 6,
    premade: false, forLiquid: false,
    fillerConfig: "multi_lane_stick_pack_form_fill_seal_narrow_tube_sachet_line",
    bestUse: "single_serve_powder_sugar_coffee_stick_multi_lane_high_count",
  },
  spouted_pouch: {
    fillSpeed: 7, fillAccuracy: 8, pouchRange: 7, sealIntegrity: 10, pfCost: 9,
    premade: true, forLiquid: true,
    fillerConfig: "spouted_pouch_cap_apply_fill_through_spout_seal_cap_retort",
    bestUse: "baby_food_juice_beverage_spouted_pouch_cap_fill_retort_ready",
  },
  vacuum_retort: {
    fillSpeed: 6, fillAccuracy: 7, pouchRange: 6, sealIntegrity: 10, pfCost: 10,
    premade: true, forLiquid: true,
    fillerConfig: "vacuum_chamber_fill_seal_retort_pouch_shelf_stable_autoclave",
    bestUse: "shelf_stable_ready_meal_retort_pouch_military_mre_autoclave",
  },
};

function get(t: PouchFillerType): PouchFillerData {
  return DATA[t];
}

export const fillSpeed = (t: PouchFillerType) => get(t).fillSpeed;
export const fillAccuracy = (t: PouchFillerType) => get(t).fillAccuracy;
export const pouchRange = (t: PouchFillerType) => get(t).pouchRange;
export const sealIntegrity = (t: PouchFillerType) => get(t).sealIntegrity;
export const pfCost = (t: PouchFillerType) => get(t).pfCost;
export const premade = (t: PouchFillerType) => get(t).premade;
export const forLiquid = (t: PouchFillerType) => get(t).forLiquid;
export const fillerConfig = (t: PouchFillerType) => get(t).fillerConfig;
export const bestUse = (t: PouchFillerType) => get(t).bestUse;
export const pouchFillerTypes = (): PouchFillerType[] =>
  Object.keys(DATA) as PouchFillerType[];
