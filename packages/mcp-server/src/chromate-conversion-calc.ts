export type ChromateConversionType =
  | "hex_chrome_gold"
  | "hex_chrome_clear"
  | "trivalent_chrome"
  | "tcp_pretreatment"
  | "zirconium_based";

interface ChromateConversionData {
  corrosionResistance: number;
  paintAdhesion: number;
  selfHealing: number;
  thickness: number;
  ccCost_: number;
  rohs: boolean;
  forAluminum: boolean;
  chemistry: string;
  bestUse: string;
}

const DATA: Record<ChromateConversionType, ChromateConversionData> = {
  hex_chrome_gold: {
    corrosionResistance: 10, paintAdhesion: 9, selfHealing: 10, thickness: 8, ccCost_: 4,
    rohs: false, forAluminum: true,
    chemistry: "chromic_acid_cr6_gold_iridescent_thick_conversion_coat",
    bestUse: "military_aerospace_legacy_spec_maximum_corrosion_protection",
  },
  hex_chrome_clear: {
    corrosionResistance: 7, paintAdhesion: 10, selfHealing: 7, thickness: 5, ccCost_: 3,
    rohs: false, forAluminum: true,
    chemistry: "chromic_acid_cr6_thin_clear_coat_paint_primer_adhesion_base",
    bestUse: "paint_primer_base_coat_adhesion_promoter_electrical_contact",
  },
  trivalent_chrome: {
    corrosionResistance: 8, paintAdhesion: 9, selfHealing: 5, thickness: 6, ccCost_: 5,
    rohs: true, forAluminum: true,
    chemistry: "trivalent_chromium_cr3_sulfate_fluoride_rohs_compliant_coat",
    bestUse: "rohs_compliant_electronics_consumer_product_eu_regulation",
  },
  tcp_pretreatment: {
    corrosionResistance: 8, paintAdhesion: 10, selfHealing: 4, thickness: 4, ccCost_: 6,
    rohs: true, forAluminum: true,
    chemistry: "trivalent_chrome_phosphate_thin_film_non_rinse_spray_apply",
    bestUse: "aerospace_chrome_free_replacement_boeing_bac_5632_approved",
  },
  zirconium_based: {
    corrosionResistance: 7, paintAdhesion: 9, selfHealing: 3, thickness: 3, ccCost_: 5,
    rohs: true, forAluminum: true,
    chemistry: "hexafluorozirconic_acid_nano_ceramic_coat_chrome_free_thin",
    bestUse: "automotive_oem_paint_prep_multi_metal_line_chrome_free_eco",
  },
};

function get(t: ChromateConversionType): ChromateConversionData {
  return DATA[t];
}

export const corrosionResistance = (t: ChromateConversionType) => get(t).corrosionResistance;
export const paintAdhesion = (t: ChromateConversionType) => get(t).paintAdhesion;
export const selfHealing = (t: ChromateConversionType) => get(t).selfHealing;
export const thickness = (t: ChromateConversionType) => get(t).thickness;
export const ccCost_ = (t: ChromateConversionType) => get(t).ccCost_;
export const rohs = (t: ChromateConversionType) => get(t).rohs;
export const forAluminum = (t: ChromateConversionType) => get(t).forAluminum;
export const chemistry = (t: ChromateConversionType) => get(t).chemistry;
export const bestUse = (t: ChromateConversionType) => get(t).bestUse;
export const chromateConversionTypes = (): ChromateConversionType[] =>
  Object.keys(DATA) as ChromateConversionType[];
