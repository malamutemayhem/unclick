export type FlourBleacherType =
  | "chlorine_gas"
  | "benzoyl_peroxide"
  | "azodicarbonamide"
  | "natural_aging"
  | "ozone_treatment";

interface FlourBleacherData {
  whiteningEffect: number;
  bakingImprovement: number;
  treatmentSpeed: number;
  residueSafety: number;
  fbCost: number;
  chemical: boolean;
  forBread: boolean;
  bleacherConfig: string;
  bestUse: string;
}

const DATA: Record<FlourBleacherType, FlourBleacherData> = {
  chlorine_gas: {
    whiteningEffect: 10, bakingImprovement: 7, treatmentSpeed: 10, residueSafety: 5, fbCost: 6,
    chemical: true, forBread: false,
    bleacherConfig: "chlorine_gas_flour_bleacher_oxidize_pigment_modify_starch_cake",
    bestUse: "cake_flour_chlorine_gas_bleach_modify_starch_improve_cake_texture",
  },
  benzoyl_peroxide: {
    whiteningEffect: 9, bakingImprovement: 6, treatmentSpeed: 8, residueSafety: 7, fbCost: 5,
    chemical: true, forBread: true,
    bleacherConfig: "benzoyl_peroxide_flour_bleacher_oxidize_carotenoid_whiten_only",
    bestUse: "bread_flour_benzoyl_peroxide_bleach_whiten_without_maturing",
  },
  azodicarbonamide: {
    whiteningEffect: 7, bakingImprovement: 10, treatmentSpeed: 9, residueSafety: 6, fbCost: 5,
    chemical: true, forBread: true,
    bleacherConfig: "azodicarbonamide_flour_bleacher_oxidize_gluten_strengthen_dough",
    bestUse: "bread_flour_azodicarbonamide_mature_strengthen_gluten_network",
  },
  natural_aging: {
    whiteningEffect: 6, bakingImprovement: 8, treatmentSpeed: 3, residueSafety: 10, fbCost: 3,
    chemical: false, forBread: true,
    bleacherConfig: "natural_aging_flour_bleacher_air_oxidize_slow_mature_no_chemical",
    bestUse: "artisan_flour_natural_aging_slow_oxidation_clean_label_bread",
  },
  ozone_treatment: {
    whiteningEffect: 8, bakingImprovement: 7, treatmentSpeed: 9, residueSafety: 9, fbCost: 8,
    chemical: false, forBread: true,
    bleacherConfig: "ozone_treatment_flour_bleacher_gas_inject_oxidize_decompose_clean",
    bestUse: "modern_flour_mill_ozone_bleach_clean_label_no_residue_efficient",
  },
};

function get(t: FlourBleacherType): FlourBleacherData {
  return DATA[t];
}

export const whiteningEffect = (t: FlourBleacherType) => get(t).whiteningEffect;
export const bakingImprovement = (t: FlourBleacherType) => get(t).bakingImprovement;
export const treatmentSpeed = (t: FlourBleacherType) => get(t).treatmentSpeed;
export const residueSafety = (t: FlourBleacherType) => get(t).residueSafety;
export const fbCost = (t: FlourBleacherType) => get(t).fbCost;
export const chemical = (t: FlourBleacherType) => get(t).chemical;
export const forBread = (t: FlourBleacherType) => get(t).forBread;
export const bleacherConfig = (t: FlourBleacherType) => get(t).bleacherConfig;
export const bestUse = (t: FlourBleacherType) => get(t).bestUse;
export const flourBleacherTypes = (): FlourBleacherType[] =>
  Object.keys(DATA) as FlourBleacherType[];
