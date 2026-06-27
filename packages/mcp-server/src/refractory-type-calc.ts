export type RefractoryType =
  | "fireclay_alumina_silicate"
  | "high_alumina_bauxite"
  | "magnesia_basic_mgo"
  | "silicon_carbide_sic"
  | "zirconia_zro2_ultra";

interface RefractoryData {
  tempLimit: number;
  strength: number;
  thermalShock: number;
  abrasion: number;
  rfCost: number;
  basic: boolean;
  forSteel: boolean;
  composition: string;
  bestUse: string;
}

const DATA: Record<RefractoryType, RefractoryData> = {
  fireclay_alumina_silicate: {
    tempLimit: 5, strength: 5, thermalShock: 7, abrasion: 5, rfCost: 2,
    basic: false, forSteel: false,
    composition: "alumina_silica_25_45_pct_al2o3",
    bestUse: "general_furnace_backup_lining",
  },
  high_alumina_bauxite: {
    tempLimit: 8, strength: 8, thermalShock: 6, abrasion: 7, rfCost: 5,
    basic: false, forSteel: true,
    composition: "bauxite_high_alumina_50_90_pct",
    bestUse: "blast_furnace_rotary_kiln_hot_zone",
  },
  magnesia_basic_mgo: {
    tempLimit: 9, strength: 7, thermalShock: 4, abrasion: 6, rfCost: 7,
    basic: true, forSteel: true,
    composition: "magnesite_mgo_80_plus_pct",
    bestUse: "bof_eaf_steelmaking_basic_slag",
  },
  silicon_carbide_sic: {
    tempLimit: 8, strength: 9, thermalShock: 10, abrasion: 10, rfCost: 8,
    basic: false, forSteel: false,
    composition: "silicon_carbide_bonded_nitride",
    bestUse: "kiln_furniture_incinerator_abrasive",
  },
  zirconia_zro2_ultra: {
    tempLimit: 10, strength: 8, thermalShock: 5, abrasion: 8, rfCost: 10,
    basic: false, forSteel: true,
    composition: "zirconium_oxide_stabilized",
    bestUse: "glass_contact_induction_coil_ultra",
  },
};

function get(t: RefractoryType): RefractoryData {
  return DATA[t];
}

export const tempLimit = (t: RefractoryType) => get(t).tempLimit;
export const strength = (t: RefractoryType) => get(t).strength;
export const thermalShock = (t: RefractoryType) => get(t).thermalShock;
export const abrasion = (t: RefractoryType) => get(t).abrasion;
export const rfCost = (t: RefractoryType) => get(t).rfCost;
export const basic = (t: RefractoryType) => get(t).basic;
export const forSteel = (t: RefractoryType) => get(t).forSteel;
export const composition = (t: RefractoryType) => get(t).composition;
export const bestUse = (t: RefractoryType) => get(t).bestUse;
export const refractoryTypes = (): RefractoryType[] =>
  Object.keys(DATA) as RefractoryType[];
