export type BandsawBladeType =
  | "carbon_steel_regular"
  | "bimetal_hss_edge"
  | "carbide_tipped_brazed"
  | "diamond_grit_continuous"
  | "variable_pitch_vari_tooth";

interface BandsawBladeData {
  cutSpeed: number;
  bladeLife: number;
  finish_: number;
  versatility: number;
  bbCost: number;
  weldable: boolean;
  forMetal: boolean;
  tooth: string;
  bestUse: string;
}

const DATA: Record<BandsawBladeType, BandsawBladeData> = {
  carbon_steel_regular: {
    cutSpeed: 5, bladeLife: 4, finish_: 5, versatility: 7, bbCost: 2,
    weldable: true, forMetal: false,
    tooth: "regular_set_raker_pattern",
    bestUse: "wood_plastic_soft_nonferrous",
  },
  bimetal_hss_edge: {
    cutSpeed: 7, bladeLife: 8, finish_: 7, versatility: 9, bbCost: 5,
    weldable: true, forMetal: true,
    tooth: "hss_edge_welded_spring_back",
    bestUse: "structural_steel_general_metal",
  },
  carbide_tipped_brazed: {
    cutSpeed: 9, bladeLife: 9, finish_: 8, versatility: 6, bbCost: 8,
    weldable: false, forMetal: true,
    tooth: "carbide_insert_brazed_gullet",
    bestUse: "hard_alloy_titanium_inconel",
  },
  diamond_grit_continuous: {
    cutSpeed: 6, bladeLife: 10, finish_: 10, versatility: 3, bbCost: 9,
    weldable: false, forMetal: false,
    tooth: "diamond_particle_electroplated_rim",
    bestUse: "glass_ceramic_stone_composite",
  },
  variable_pitch_vari_tooth: {
    cutSpeed: 7, bladeLife: 7, finish_: 8, versatility: 8, bbCost: 4,
    weldable: true, forMetal: true,
    tooth: "alternating_pitch_reduced_vibration",
    bestUse: "mixed_cross_section_tube_bundle",
  },
};

function get(t: BandsawBladeType): BandsawBladeData {
  return DATA[t];
}

export const cutSpeed = (t: BandsawBladeType) => get(t).cutSpeed;
export const bladeLife = (t: BandsawBladeType) => get(t).bladeLife;
export const finish_ = (t: BandsawBladeType) => get(t).finish_;
export const versatility = (t: BandsawBladeType) => get(t).versatility;
export const bbCost = (t: BandsawBladeType) => get(t).bbCost;
export const weldable = (t: BandsawBladeType) => get(t).weldable;
export const forMetal = (t: BandsawBladeType) => get(t).forMetal;
export const tooth = (t: BandsawBladeType) => get(t).tooth;
export const bestUse = (t: BandsawBladeType) => get(t).bestUse;
export const bandsawBladeTypes = (): BandsawBladeType[] =>
  Object.keys(DATA) as BandsawBladeType[];
