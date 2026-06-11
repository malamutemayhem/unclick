export type GroutType =
  | "cement_sanded_standard"
  | "cement_unsanded_thin"
  | "epoxy_chemical_resistant"
  | "urethane_stain_proof"
  | "furan_resin_acid_proof";

interface GroutData {
  strength: number;
  stainResist: number;
  chemical: number;
  flexibility: number;
  grCost: number;
  waterproof: boolean;
  forCommercial: boolean;
  binder: string;
  bestUse: string;
}

const DATA: Record<GroutType, GroutData> = {
  cement_sanded_standard: {
    strength: 7, stainResist: 4, chemical: 4, flexibility: 5, grCost: 2,
    waterproof: false, forCommercial: false,
    binder: "portland_cement_sand_polymer",
    bestUse: "floor_tile_wide_joint_basic",
  },
  cement_unsanded_thin: {
    strength: 5, stainResist: 4, chemical: 4, flexibility: 6, grCost: 2,
    waterproof: false, forCommercial: false,
    binder: "portland_cement_fine_powder",
    bestUse: "wall_tile_narrow_joint_1_8",
  },
  epoxy_chemical_resistant: {
    strength: 10, stainResist: 10, chemical: 10, flexibility: 7, grCost: 8,
    waterproof: true, forCommercial: true,
    binder: "two_part_epoxy_resin_hardener",
    bestUse: "commercial_kitchen_lab_floor",
  },
  urethane_stain_proof: {
    strength: 8, stainResist: 9, chemical: 7, flexibility: 9, grCost: 7,
    waterproof: true, forCommercial: true,
    binder: "single_component_urethane",
    bestUse: "residential_premium_stain_free",
  },
  furan_resin_acid_proof: {
    strength: 9, stainResist: 8, chemical: 10, flexibility: 5, grCost: 10,
    waterproof: true, forCommercial: true,
    binder: "furan_resin_carbon_filler",
    bestUse: "dairy_chemical_plant_acid_area",
  },
};

function get(t: GroutType): GroutData {
  return DATA[t];
}

export const strength = (t: GroutType) => get(t).strength;
export const stainResist = (t: GroutType) => get(t).stainResist;
export const chemical = (t: GroutType) => get(t).chemical;
export const flexibility = (t: GroutType) => get(t).flexibility;
export const grCost = (t: GroutType) => get(t).grCost;
export const waterproof = (t: GroutType) => get(t).waterproof;
export const forCommercial = (t: GroutType) => get(t).forCommercial;
export const binder = (t: GroutType) => get(t).binder;
export const bestUse = (t: GroutType) => get(t).bestUse;
export const groutTypes = (): GroutType[] =>
  Object.keys(DATA) as GroutType[];
