export type ECoatType =
  | "anodic_epoxy"
  | "cathodic_epoxy"
  | "cathodic_acrylic"
  | "anodic_acrylic"
  | "autophoretic";

interface ECoatData {
  throwPower: number;
  throughput: number;
  corrosionResist: number;
  filmUniformity: number;
  ecCost: number;
  cathodic: boolean;
  forAutomotive: boolean;
  coatConfig: string;
  bestUse: string;
}

const DATA: Record<ECoatType, ECoatData> = {
  anodic_epoxy: {
    throwPower: 7, throughput: 8, corrosionResist: 7, filmUniformity: 8, ecCost: 5,
    cathodic: false, forAutomotive: false,
    coatConfig: "anodic_epoxy_e_coat_dip_tank_dc_attract_primer_general_metal",
    bestUse: "general_metal_anodic_epoxy_e_coat_dip_tank_primer_appliance",
  },
  cathodic_epoxy: {
    throwPower: 10, throughput: 9, corrosionResist: 10, filmUniformity: 10, ecCost: 8,
    cathodic: true, forAutomotive: true,
    coatConfig: "cathodic_epoxy_e_coat_dip_tank_high_throw_auto_body_corrosion",
    bestUse: "auto_body_cathodic_epoxy_e_coat_high_throw_corrosion_primer",
  },
  cathodic_acrylic: {
    throwPower: 9, throughput: 7, corrosionResist: 8, filmUniformity: 9, ecCost: 7,
    cathodic: true, forAutomotive: false,
    coatConfig: "cathodic_acrylic_e_coat_dip_tank_uv_stable_clear_top_finish",
    bestUse: "outdoor_fixture_cathodic_acrylic_e_coat_uv_stable_clear_coat",
  },
  anodic_acrylic: {
    throwPower: 7, throughput: 7, corrosionResist: 6, filmUniformity: 7, ecCost: 5,
    cathodic: false, forAutomotive: false,
    coatConfig: "anodic_acrylic_e_coat_dip_tank_clear_decorative_aluminum_trim",
    bestUse: "aluminum_trim_anodic_acrylic_e_coat_clear_decorative_finish",
  },
  autophoretic: {
    throwPower: 8, throughput: 6, corrosionResist: 9, filmUniformity: 8, ecCost: 6,
    cathodic: false, forAutomotive: false,
    coatConfig: "autophoretic_e_coat_chemical_immersion_no_electric_iron_steel",
    bestUse: "iron_steel_autophoretic_e_coat_chemical_immersion_no_current",
  },
};

function get(t: ECoatType): ECoatData {
  return DATA[t];
}

export const throwPower = (t: ECoatType) => get(t).throwPower;
export const throughput = (t: ECoatType) => get(t).throughput;
export const corrosionResist = (t: ECoatType) => get(t).corrosionResist;
export const filmUniformity = (t: ECoatType) => get(t).filmUniformity;
export const ecCost = (t: ECoatType) => get(t).ecCost;
export const cathodic = (t: ECoatType) => get(t).cathodic;
export const forAutomotive = (t: ECoatType) => get(t).forAutomotive;
export const coatConfig = (t: ECoatType) => get(t).coatConfig;
export const bestUse = (t: ECoatType) => get(t).bestUse;
export const eCoatTypes = (): ECoatType[] =>
  Object.keys(DATA) as ECoatType[];
