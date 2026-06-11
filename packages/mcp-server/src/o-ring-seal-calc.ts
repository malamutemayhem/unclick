export type ORingSealType =
  | "nitrile_nbr_standard"
  | "viton_fkm_high_temp"
  | "epdm_steam_water"
  | "silicone_food_grade"
  | "perfluoro_ffkm_chem";

interface ORingSealData {
  tempRange: number;
  chemResist: number;
  compressionSet: number;
  abrasionResist: number;
  orCost: number;
  foodSafe: boolean;
  forChemical: boolean;
  compound: string;
  bestUse: string;
}

const DATA: Record<ORingSealType, ORingSealData> = {
  nitrile_nbr_standard: {
    tempRange: 6, chemResist: 6, compressionSet: 7, abrasionResist: 8, orCost: 2,
    foodSafe: false, forChemical: false,
    compound: "acrylonitrile_butadiene_rubber_oil_resistant",
    bestUse: "hydraulic_pneumatic_fuel_general_oil_seal",
  },
  viton_fkm_high_temp: {
    tempRange: 9, chemResist: 9, compressionSet: 8, abrasionResist: 7, orCost: 7,
    foodSafe: false, forChemical: true,
    compound: "fluorocarbon_rubber_high_temp_chemical_resist",
    bestUse: "automotive_fuel_system_chemical_process_high_t",
  },
  epdm_steam_water: {
    tempRange: 7, chemResist: 5, compressionSet: 7, abrasionResist: 6, orCost: 3,
    foodSafe: true, forChemical: false,
    compound: "ethylene_propylene_diene_monomer_steam_water",
    bestUse: "steam_hot_water_brake_fluid_phosphate_ester",
  },
  silicone_food_grade: {
    tempRange: 8, chemResist: 4, compressionSet: 5, abrasionResist: 3, orCost: 4,
    foodSafe: true, forChemical: false,
    compound: "silicone_rubber_food_grade_fda_wide_temp",
    bestUse: "food_beverage_medical_device_clean_room_seal",
  },
  perfluoro_ffkm_chem: {
    tempRange: 10, chemResist: 10, compressionSet: 9, abrasionResist: 6, orCost: 10,
    foodSafe: false, forChemical: true,
    compound: "perfluoroelastomer_universal_chemical_resist",
    bestUse: "semiconductor_pharma_extreme_chem_temp_seal",
  },
};

function get(t: ORingSealType): ORingSealData {
  return DATA[t];
}

export const tempRange = (t: ORingSealType) => get(t).tempRange;
export const chemResist = (t: ORingSealType) => get(t).chemResist;
export const compressionSet = (t: ORingSealType) => get(t).compressionSet;
export const abrasionResist = (t: ORingSealType) => get(t).abrasionResist;
export const orCost = (t: ORingSealType) => get(t).orCost;
export const foodSafe = (t: ORingSealType) => get(t).foodSafe;
export const forChemical = (t: ORingSealType) => get(t).forChemical;
export const compound = (t: ORingSealType) => get(t).compound;
export const bestUse = (t: ORingSealType) => get(t).bestUse;
export const oRingSealTypes = (): ORingSealType[] =>
  Object.keys(DATA) as ORingSealType[];
