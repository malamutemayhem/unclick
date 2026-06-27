export type SugarCentrifugeType =
  | "batch_basket"
  | "continuous_conical"
  | "pusher_centrifuge"
  | "screen_scroll"
  | "disc_separator";

interface SugarCentrifugeData {
  crystalPurity: number;
  throughput: number;
  crystalDamage: number;
  molassesRemoval: number;
  scCost: number;
  continuous: boolean;
  forWhite: boolean;
  centrifugeConfig: string;
  bestUse: string;
}

const DATA: Record<SugarCentrifugeType, SugarCentrifugeData> = {
  batch_basket: {
    crystalPurity: 10, throughput: 5, crystalDamage: 9, molassesRemoval: 10, scCost: 6,
    continuous: false, forWhite: true,
    centrifugeConfig: "batch_basket_sugar_centrifuge_perforated_basket_spin_wash_crystal",
    bestUse: "white_sugar_refinery_batch_basket_centrifuge_high_purity_crystal",
  },
  continuous_conical: {
    crystalPurity: 7, throughput: 10, crystalDamage: 6, molassesRemoval: 7, scCost: 7,
    continuous: true, forWhite: false,
    centrifugeConfig: "continuous_conical_sugar_centrifuge_cone_screen_scroll_discharge",
    bestUse: "raw_sugar_mill_continuous_conical_centrifuge_high_volume_raw_sugar",
  },
  pusher_centrifuge: {
    crystalPurity: 8, throughput: 9, crystalDamage: 7, molassesRemoval: 8, scCost: 8,
    continuous: true, forWhite: false,
    centrifugeConfig: "pusher_centrifuge_sugar_reciprocating_piston_push_crystal_discharge",
    bestUse: "large_sugar_factory_pusher_centrifuge_continuous_crystal_discharge",
  },
  screen_scroll: {
    crystalPurity: 7, throughput: 9, crystalDamage: 5, molassesRemoval: 7, scCost: 7,
    continuous: true, forWhite: false,
    centrifugeConfig: "screen_scroll_sugar_centrifuge_helical_conveyor_screen_continuous",
    bestUse: "bulk_raw_sugar_screen_scroll_centrifuge_helical_continuous_robust",
  },
  disc_separator: {
    crystalPurity: 9, throughput: 8, crystalDamage: 10, molassesRemoval: 9, scCost: 9,
    continuous: true, forWhite: true,
    centrifugeConfig: "disc_separator_sugar_centrifuge_stack_disc_fine_crystal_clarify",
    bestUse: "sugar_refinery_disc_separator_clarify_fine_crystal_syrup_polish",
  },
};

function get(t: SugarCentrifugeType): SugarCentrifugeData {
  return DATA[t];
}

export const crystalPurity = (t: SugarCentrifugeType) => get(t).crystalPurity;
export const throughput = (t: SugarCentrifugeType) => get(t).throughput;
export const crystalDamage = (t: SugarCentrifugeType) => get(t).crystalDamage;
export const molassesRemoval = (t: SugarCentrifugeType) => get(t).molassesRemoval;
export const scCost = (t: SugarCentrifugeType) => get(t).scCost;
export const continuous = (t: SugarCentrifugeType) => get(t).continuous;
export const forWhite = (t: SugarCentrifugeType) => get(t).forWhite;
export const centrifugeConfig = (t: SugarCentrifugeType) => get(t).centrifugeConfig;
export const bestUse = (t: SugarCentrifugeType) => get(t).bestUse;
export const sugarCentrifugeTypes = (): SugarCentrifugeType[] =>
  Object.keys(DATA) as SugarCentrifugeType[];
