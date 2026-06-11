export type AnodizeProcessType =
  | "sulfuric_type_ii"
  | "hard_type_iii"
  | "chromic_type_i"
  | "phosphoric_bond_primer"
  | "tartaric_sulfuric_tsa";

interface AnodizeProcessData {
  hardness: number;
  corrosionResist: number;
  thickness: number;
  dyeAbsorb: number;
  apCost: number;
  milSpec: boolean;
  forWear: boolean;
  electrolyte: string;
  bestUse: string;
}

const DATA: Record<AnodizeProcessType, AnodizeProcessData> = {
  sulfuric_type_ii: {
    hardness: 6, corrosionResist: 7, thickness: 6, dyeAbsorb: 10, apCost: 4,
    milSpec: true, forWear: false,
    electrolyte: "sulfuric_acid_15pct_room_temp",
    bestUse: "decorative_color_consumer_enclosure",
  },
  hard_type_iii: {
    hardness: 10, corrosionResist: 9, thickness: 10, dyeAbsorb: 4, apCost: 8,
    milSpec: true, forWear: true,
    electrolyte: "sulfuric_acid_low_temp_high_v",
    bestUse: "piston_cylinder_firearm_receiver",
  },
  chromic_type_i: {
    hardness: 4, corrosionResist: 8, thickness: 3, dyeAbsorb: 5, apCost: 9,
    milSpec: true, forWear: false,
    electrolyte: "chromic_acid_5pct_40c",
    bestUse: "aerospace_fatigue_critical_part",
  },
  phosphoric_bond_primer: {
    hardness: 3, corrosionResist: 6, thickness: 2, dyeAbsorb: 3, apCost: 6,
    milSpec: false, forWear: false,
    electrolyte: "phosphoric_acid_bond_prep",
    bestUse: "adhesive_bond_surface_prep_wing",
  },
  tartaric_sulfuric_tsa: {
    hardness: 6, corrosionResist: 8, thickness: 5, dyeAbsorb: 8, apCost: 7,
    milSpec: true, forWear: false,
    electrolyte: "tartaric_sulfuric_acid_mix",
    bestUse: "chromic_replacement_reach_compliant",
  },
};

function get(t: AnodizeProcessType): AnodizeProcessData {
  return DATA[t];
}

export const hardness = (t: AnodizeProcessType) => get(t).hardness;
export const corrosionResist = (t: AnodizeProcessType) => get(t).corrosionResist;
export const thickness = (t: AnodizeProcessType) => get(t).thickness;
export const dyeAbsorb = (t: AnodizeProcessType) => get(t).dyeAbsorb;
export const apCost = (t: AnodizeProcessType) => get(t).apCost;
export const milSpec = (t: AnodizeProcessType) => get(t).milSpec;
export const forWear = (t: AnodizeProcessType) => get(t).forWear;
export const electrolyte = (t: AnodizeProcessType) => get(t).electrolyte;
export const bestUse = (t: AnodizeProcessType) => get(t).bestUse;
export const anodizeProcessTypes = (): AnodizeProcessType[] =>
  Object.keys(DATA) as AnodizeProcessType[];
