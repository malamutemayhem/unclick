export type PotStillType =
  | "alembic_copper"
  | "onion_shape"
  | "lantern_neck"
  | "lomond"
  | "hybrid_column_pot";

interface PotStillData {
  flavorComplexity: number;
  distillationRate: number;
  copperContact: number;
  refluxControl: number;
  psCost_: number;
  batchProcess: boolean;
  forWhisky: boolean;
  stillConfig: string;
  bestUse: string;
}

const DATA: Record<PotStillType, PotStillData> = {
  alembic_copper: {
    flavorComplexity: 10, distillationRate: 5, copperContact: 10, refluxControl: 6, psCost_: 7,
    batchProcess: true, forWhisky: true,
    stillConfig: "alembic_copper_pot_still_swan_neck_lyne_arm_condenser_batch",
    bestUse: "single_malt_whisky_cognac_brandy_alembic_copper_pot_batch_still",
  },
  onion_shape: {
    flavorComplexity: 9, distillationRate: 6, copperContact: 9, refluxControl: 7, psCost_: 8,
    batchProcess: true, forWhisky: true,
    stillConfig: "onion_shape_pot_still_wide_body_tall_neck_reflux_scotch_whisky",
    bestUse: "scotch_whisky_onion_shape_pot_still_tall_neck_reflux_character",
  },
  lantern_neck: {
    flavorComplexity: 8, distillationRate: 7, copperContact: 8, refluxControl: 9, psCost_: 9,
    batchProcess: true, forWhisky: true,
    stillConfig: "lantern_neck_pot_still_boil_ball_reflux_plate_lighter_spirit",
    bestUse: "lighter_spirit_irish_whiskey_lantern_neck_boil_ball_reflux",
  },
  lomond: {
    flavorComplexity: 7, distillationRate: 7, copperContact: 7, refluxControl: 10, psCost_: 8,
    batchProcess: true, forWhisky: true,
    stillConfig: "lomond_still_cylindrical_neck_internal_plate_variable_reflux",
    bestUse: "variable_character_spirit_lomond_still_adjustable_plate_reflux",
  },
  hybrid_column_pot: {
    flavorComplexity: 7, distillationRate: 9, copperContact: 8, refluxControl: 9, psCost_: 10,
    batchProcess: true, forWhisky: false,
    stillConfig: "hybrid_pot_column_combination_still_craft_gin_vodka_versatile",
    bestUse: "craft_gin_vodka_rum_hybrid_pot_column_versatile_multi_spirit",
  },
};

function get(t: PotStillType): PotStillData {
  return DATA[t];
}

export const flavorComplexity = (t: PotStillType) => get(t).flavorComplexity;
export const distillationRate = (t: PotStillType) => get(t).distillationRate;
export const copperContact = (t: PotStillType) => get(t).copperContact;
export const refluxControl = (t: PotStillType) => get(t).refluxControl;
export const psCost_ = (t: PotStillType) => get(t).psCost_;
export const batchProcess = (t: PotStillType) => get(t).batchProcess;
export const forWhisky = (t: PotStillType) => get(t).forWhisky;
export const stillConfig = (t: PotStillType) => get(t).stillConfig;
export const bestUse = (t: PotStillType) => get(t).bestUse;
export const potStillTypes = (): PotStillType[] =>
  Object.keys(DATA) as PotStillType[];
