// fresco-secco-calc - fresco secco (dry fresco) technique types

export type FrescoSecco =
  | "lime_secco_classic"
  | "casein_secco_matte"
  | "silicate_secco_mineral"
  | "acrylic_secco_modern"
  | "egg_secco_tempera";

const DATA: Record<FrescoSecco, {
  bondStrength: number; colorFast: number; breathable: number; repairEase: number;
  cost: number; traditional: boolean; forExterior: boolean; binderMethod: string; bestUse: string;
}> = {
  lime_secco_classic:      { bondStrength: 8, colorFast: 9, breathable: 10, repairEase: 7, cost: 4, traditional: true, forExterior: true, binderMethod: "lime_water_binder", bestUse: "traditional_wall_mural" },
  casein_secco_matte:      { bondStrength: 9, colorFast: 8, breathable: 8, repairEase: 6, cost: 5, traditional: true, forExterior: false, binderMethod: "casein_glue_binder", bestUse: "interior_matte_mural" },
  silicate_secco_mineral:  { bondStrength: 10, colorFast: 10, breathable: 9, repairEase: 4, cost: 8, traditional: false, forExterior: true, binderMethod: "potassium_silicate_fix", bestUse: "durable_exterior_mural" },
  acrylic_secco_modern:    { bondStrength: 7, colorFast: 7, breathable: 4, repairEase: 9, cost: 6, traditional: false, forExterior: false, binderMethod: "acrylic_emulsion_coat", bestUse: "modern_indoor_mural" },
  egg_secco_tempera:       { bondStrength: 7, colorFast: 8, breathable: 7, repairEase: 5, cost: 5, traditional: true, forExterior: false, binderMethod: "egg_yolk_tempera", bestUse: "detailed_panel_secco" },
};

const get = (f: FrescoSecco) => DATA[f];
export const bondStrength = (f: FrescoSecco) => get(f).bondStrength;
export const colorFast = (f: FrescoSecco) => get(f).colorFast;
export const breathable = (f: FrescoSecco) => get(f).breathable;
export const repairEase = (f: FrescoSecco) => get(f).repairEase;
export const seccoCost = (f: FrescoSecco) => get(f).cost;
export const traditional = (f: FrescoSecco) => get(f).traditional;
export const forExterior = (f: FrescoSecco) => get(f).forExterior;
export const binderMethod = (f: FrescoSecco) => get(f).binderMethod;
export const bestUse = (f: FrescoSecco) => get(f).bestUse;
export const frescoSeccos = (): FrescoSecco[] => Object.keys(DATA) as FrescoSecco[];
