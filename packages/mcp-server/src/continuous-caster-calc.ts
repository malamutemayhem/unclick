export type ContinuousCasterType =
  | "vertical_bow"
  | "curved_mold"
  | "horizontal_cast"
  | "thin_slab"
  | "strip_cast";

interface ContinuousCasterData {
  productionRate: number;
  throughput: number;
  surfaceQuality: number;
  internalSoundness: number;
  ctCost: number;
  nearNetShape: boolean;
  forSteel: boolean;
  casterConfig: string;
  bestUse: string;
}

const DATA: Record<ContinuousCasterType, ContinuousCasterData> = {
  vertical_bow: {
    productionRate: 8, throughput: 8, surfaceQuality: 8, internalSoundness: 8, ctCost: 7,
    nearNetShape: false, forSteel: true,
    casterConfig: "vertical_bow_continuous_caster_mold_oscillate_spray_cool_strand",
    bestUse: "steel_slab_vertical_bow_continuous_caster_mold_spray_cool",
  },
  curved_mold: {
    productionRate: 9, throughput: 9, surfaceQuality: 8, internalSoundness: 8, ctCost: 8,
    nearNetShape: false, forSteel: true,
    casterConfig: "curved_mold_continuous_caster_radius_bend_straighten_billet",
    bestUse: "steel_billet_curved_mold_continuous_caster_radius_straighten",
  },
  horizontal_cast: {
    productionRate: 7, throughput: 7, surfaceQuality: 7, internalSoundness: 7, ctCost: 5,
    nearNetShape: false, forSteel: false,
    casterConfig: "horizontal_continuous_caster_breakout_free_copper_brass_rod",
    bestUse: "copper_rod_horizontal_continuous_caster_breakout_free_brass",
  },
  thin_slab: {
    productionRate: 9, throughput: 10, surfaceQuality: 9, internalSoundness: 9, ctCost: 9,
    nearNetShape: true, forSteel: true,
    casterConfig: "thin_slab_continuous_caster_funnel_mold_inline_roll_hot_strip",
    bestUse: "hot_strip_thin_slab_continuous_caster_funnel_mold_inline_roll",
  },
  strip_cast: {
    productionRate: 10, throughput: 9, surfaceQuality: 7, internalSoundness: 7, ctCost: 10,
    nearNetShape: true, forSteel: true,
    casterConfig: "strip_continuous_caster_twin_roll_near_net_shape_thin_gauge",
    bestUse: "thin_gauge_strip_continuous_caster_twin_roll_near_net_shape",
  },
};

function get(t: ContinuousCasterType): ContinuousCasterData {
  return DATA[t];
}

export const productionRate = (t: ContinuousCasterType) => get(t).productionRate;
export const throughput = (t: ContinuousCasterType) => get(t).throughput;
export const surfaceQuality = (t: ContinuousCasterType) => get(t).surfaceQuality;
export const internalSoundness = (t: ContinuousCasterType) => get(t).internalSoundness;
export const ctCost = (t: ContinuousCasterType) => get(t).ctCost;
export const nearNetShape = (t: ContinuousCasterType) => get(t).nearNetShape;
export const forSteel = (t: ContinuousCasterType) => get(t).forSteel;
export const casterConfig = (t: ContinuousCasterType) => get(t).casterConfig;
export const bestUse = (t: ContinuousCasterType) => get(t).bestUse;
export const continuousCasterTypes = (): ContinuousCasterType[] =>
  Object.keys(DATA) as ContinuousCasterType[];
