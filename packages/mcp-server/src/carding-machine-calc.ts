export type CardingMachineType =
  | "flat_top_revolving"
  | "roller_card"
  | "random_card_crosslapper"
  | "cotton_card_chute"
  | "woolen_card_condenser";

interface CardingMachineData {
  webUniformity: number;
  productionRate: number;
  fiberOpening: number;
  nepsRemoval: number;
  cmCost: number;
  autoLeveling: boolean;
  forShortStaple: boolean;
  wireConfig: string;
  bestUse: string;
}

const DATA: Record<CardingMachineType, CardingMachineData> = {
  flat_top_revolving: {
    webUniformity: 9, productionRate: 9, fiberOpening: 9, nepsRemoval: 9, cmCost: 8,
    autoLeveling: true, forShortStaple: true,
    wireConfig: "revolving_flat_bar_main_cylinder_doffer_metallic_wire_strip",
    bestUse: "cotton_short_staple_high_speed_sliver_production_spinning_prep",
  },
  roller_card: {
    webUniformity: 7, productionRate: 7, fiberOpening: 8, nepsRemoval: 7, cmCost: 5,
    autoLeveling: false, forShortStaple: false,
    wireConfig: "worker_stripper_roller_pairs_around_main_cylinder_long_staple",
    bestUse: "long_staple_wool_synthetic_fiber_opening_web_formation_card",
  },
  random_card_crosslapper: {
    webUniformity: 10, productionRate: 8, fiberOpening: 7, nepsRemoval: 6, cmCost: 9,
    autoLeveling: true, forShortStaple: false,
    wireConfig: "random_roller_card_crosslap_multi_layer_web_nonwoven_batt",
    bestUse: "nonwoven_geotextile_automotive_insulation_crosslap_web_batt",
  },
  cotton_card_chute: {
    webUniformity: 8, productionRate: 10, fiberOpening: 10, nepsRemoval: 10, cmCost: 10,
    autoLeveling: true, forShortStaple: true,
    wireConfig: "chute_feed_triple_lickerin_advanced_flat_high_speed_cotton",
    bestUse: "premium_cotton_combed_yarn_high_nep_removal_clean_sliver_feed",
  },
  woolen_card_condenser: {
    webUniformity: 6, productionRate: 6, fiberOpening: 6, nepsRemoval: 5, cmCost: 6,
    autoLeveling: false, forShortStaple: false,
    wireConfig: "condenser_tape_divider_split_web_into_roving_strip_woolen",
    bestUse: "woolen_yarn_roving_direct_from_card_blanket_tweed_felt_fiber",
  },
};

function get(t: CardingMachineType): CardingMachineData {
  return DATA[t];
}

export const webUniformity = (t: CardingMachineType) => get(t).webUniformity;
export const productionRate = (t: CardingMachineType) => get(t).productionRate;
export const fiberOpening = (t: CardingMachineType) => get(t).fiberOpening;
export const nepsRemoval = (t: CardingMachineType) => get(t).nepsRemoval;
export const cmCost = (t: CardingMachineType) => get(t).cmCost;
export const autoLeveling = (t: CardingMachineType) => get(t).autoLeveling;
export const forShortStaple = (t: CardingMachineType) => get(t).forShortStaple;
export const wireConfig = (t: CardingMachineType) => get(t).wireConfig;
export const bestUse = (t: CardingMachineType) => get(t).bestUse;
export const cardingMachineTypes = (): CardingMachineType[] =>
  Object.keys(DATA) as CardingMachineType[];
