export type AnodizingType =
  | "sulfuric_type_ii"
  | "hard_coat_type_iii"
  | "chromic_type_i"
  | "phosphoric_acid"
  | "tartaric_sulfuric";

interface AnodizingData {
  coatingThickness: number;
  hardness: number;
  corrosionResistance: number;
  dyeAbsorption: number;
  anCost: number;
  colorable: boolean;
  forAerospace: boolean;
  electrolyte: string;
  bestUse: string;
}

const DATA: Record<AnodizingType, AnodizingData> = {
  sulfuric_type_ii: {
    coatingThickness: 7, hardness: 6, corrosionResistance: 7, dyeAbsorption: 10, anCost: 4,
    colorable: true, forAerospace: false,
    electrolyte: "sulfuric_acid_15_pct_21c_12v_dc_porous_oxide_layer_form",
    bestUse: "consumer_electronics_enclosure_architectural_color_finish",
  },
  hard_coat_type_iii: {
    coatingThickness: 10, hardness: 10, corrosionResistance: 9, dyeAbsorption: 5, anCost: 8,
    colorable: false, forAerospace: true,
    electrolyte: "sulfuric_acid_low_temp_0c_high_current_dense_oxide_50um",
    bestUse: "hydraulic_cylinder_piston_valve_body_wear_surface_military",
  },
  chromic_type_i: {
    coatingThickness: 4, hardness: 5, corrosionResistance: 8, dyeAbsorption: 3, anCost: 7,
    colorable: false, forAerospace: true,
    electrolyte: "chromic_acid_5_pct_thin_non_porous_fatigue_strength_retain",
    bestUse: "aerospace_fatigue_critical_part_thin_coat_rivet_hole_edge",
  },
  phosphoric_acid: {
    coatingThickness: 3, hardness: 3, corrosionResistance: 5, dyeAbsorption: 2, anCost: 5,
    colorable: false, forAerospace: true,
    electrolyte: "phosphoric_acid_porous_oxide_adhesive_bond_primer_prep",
    bestUse: "structural_adhesive_bond_prep_aircraft_skin_panel_splice",
  },
  tartaric_sulfuric: {
    coatingThickness: 6, hardness: 6, corrosionResistance: 8, dyeAbsorption: 8, anCost: 6,
    colorable: true, forAerospace: true,
    electrolyte: "tartaric_sulfuric_acid_mix_chrome_free_replacement_rohs",
    bestUse: "aerospace_chrome_free_alternative_rohs_compliant_coating",
  },
};

function get(t: AnodizingType): AnodizingData {
  return DATA[t];
}

export const coatingThickness = (t: AnodizingType) => get(t).coatingThickness;
export const hardness = (t: AnodizingType) => get(t).hardness;
export const corrosionResistance = (t: AnodizingType) => get(t).corrosionResistance;
export const dyeAbsorption = (t: AnodizingType) => get(t).dyeAbsorption;
export const anCost = (t: AnodizingType) => get(t).anCost;
export const colorable = (t: AnodizingType) => get(t).colorable;
export const forAerospace = (t: AnodizingType) => get(t).forAerospace;
export const electrolyte = (t: AnodizingType) => get(t).electrolyte;
export const bestUse = (t: AnodizingType) => get(t).bestUse;
export const anodizingTypes = (): AnodizingType[] =>
  Object.keys(DATA) as AnodizingType[];
