export type OringType =
  | "nitrile_buna_n_general"
  | "viton_fkm_chemical"
  | "silicone_vvm_food"
  | "epdm_steam_water"
  | "ptfe_encapsulated";

interface OringData {
  chemResist: number;
  tempRange: number;
  compression: number;
  wear: number;
  orCost: number;
  fdaApproved: boolean;
  forHydraulic: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<OringType, OringData> = {
  nitrile_buna_n_general: {
    chemResist: 6, tempRange: 6, compression: 8, wear: 8, orCost: 3,
    fdaApproved: false, forHydraulic: true,
    material: "acrylonitrile_butadiene_rubber",
    bestUse: "hydraulic_pneumatic_fuel_general",
  },
  viton_fkm_chemical: {
    chemResist: 10, tempRange: 9, compression: 7, wear: 7, orCost: 7,
    fdaApproved: false, forHydraulic: false,
    material: "fluoroelastomer_vinylidene_hex",
    bestUse: "chemical_fuel_solvent_acid_seal",
  },
  silicone_vvm_food: {
    chemResist: 5, tempRange: 10, compression: 6, wear: 5, orCost: 5,
    fdaApproved: true, forHydraulic: false,
    material: "platinum_cured_silicone_rubber",
    bestUse: "food_beverage_pharma_medical_seal",
  },
  epdm_steam_water: {
    chemResist: 7, tempRange: 8, compression: 8, wear: 7, orCost: 4,
    fdaApproved: true, forHydraulic: false,
    material: "ethylene_propylene_diene_monomer",
    bestUse: "steam_hot_water_brake_fluid_seal",
  },
  ptfe_encapsulated: {
    chemResist: 10, tempRange: 9, compression: 5, wear: 6, orCost: 9,
    fdaApproved: true, forHydraulic: false,
    material: "ptfe_jacket_silicone_fkm_core",
    bestUse: "universal_chemical_pharma_flange",
  },
};

function get(t: OringType): OringData {
  return DATA[t];
}

export const chemResist = (t: OringType) => get(t).chemResist;
export const tempRange = (t: OringType) => get(t).tempRange;
export const compression = (t: OringType) => get(t).compression;
export const wear = (t: OringType) => get(t).wear;
export const orCost = (t: OringType) => get(t).orCost;
export const fdaApproved = (t: OringType) => get(t).fdaApproved;
export const forHydraulic = (t: OringType) => get(t).forHydraulic;
export const material = (t: OringType) => get(t).material;
export const bestUse = (t: OringType) => get(t).bestUse;
export const oringTypes = (): OringType[] =>
  Object.keys(DATA) as OringType[];
