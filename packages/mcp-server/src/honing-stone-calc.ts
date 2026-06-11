export type HoningStoneType =
  | "aluminum_oxide_conventional"
  | "silicon_carbide_green"
  | "cbn_cubic_boron_nitride"
  | "diamond_superabrasive"
  | "ceramic_microcrystalline";

interface HoningStoneData {
  finish_: number;
  mrr: number;
  life: number;
  hardness: number;
  hsCost: number;
  superabrasive: boolean;
  forHardened: boolean;
  abrasive: string;
  bestUse: string;
}

const DATA: Record<HoningStoneType, HoningStoneData> = {
  aluminum_oxide_conventional: {
    finish_: 6, mrr: 7, life: 5, hardness: 5, hsCost: 2,
    superabrasive: false, forHardened: false,
    abrasive: "fused_alumina_vitrified_bond",
    bestUse: "cast_iron_cylinder_general_bore",
  },
  silicon_carbide_green: {
    finish_: 7, mrr: 6, life: 4, hardness: 6, hsCost: 3,
    superabrasive: false, forHardened: false,
    abrasive: "green_sic_resinoid_bond",
    bestUse: "nonferrous_aluminum_ceramic_glass",
  },
  cbn_cubic_boron_nitride: {
    finish_: 9, mrr: 8, life: 9, hardness: 9, hsCost: 8,
    superabrasive: true, forHardened: true,
    abrasive: "cbn_crystal_electroplated_metal",
    bestUse: "hardened_steel_gear_bore_precision",
  },
  diamond_superabrasive: {
    finish_: 10, mrr: 7, life: 10, hardness: 10, hsCost: 9,
    superabrasive: true, forHardened: true,
    abrasive: "synthetic_diamond_metal_bond",
    bestUse: "carbide_ceramic_hard_chrome_bore",
  },
  ceramic_microcrystalline: {
    finish_: 8, mrr: 8, life: 7, hardness: 7, hsCost: 5,
    superabrasive: false, forHardened: false,
    abrasive: "seeded_gel_ceramic_alumina",
    bestUse: "high_production_auto_engine_bore",
  },
};

function get(t: HoningStoneType): HoningStoneData {
  return DATA[t];
}

export const finish_ = (t: HoningStoneType) => get(t).finish_;
export const mrr = (t: HoningStoneType) => get(t).mrr;
export const life = (t: HoningStoneType) => get(t).life;
export const hardness = (t: HoningStoneType) => get(t).hardness;
export const hsCost = (t: HoningStoneType) => get(t).hsCost;
export const superabrasive = (t: HoningStoneType) => get(t).superabrasive;
export const forHardened = (t: HoningStoneType) => get(t).forHardened;
export const abrasive = (t: HoningStoneType) => get(t).abrasive;
export const bestUse = (t: HoningStoneType) => get(t).bestUse;
export const honingStoneTypes = (): HoningStoneType[] =>
  Object.keys(DATA) as HoningStoneType[];
