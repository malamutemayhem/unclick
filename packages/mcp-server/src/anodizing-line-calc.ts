export type AnodizingLineType =
  | "sulfuric_anodize"
  | "hard_coat_anodize"
  | "chromic_anodize"
  | "phosphoric_anodize"
  | "boric_sulfuric";

interface AnodizingLineData {
  coatingThickness: number;
  throughput: number;
  hardness: number;
  corrosionResist: number;
  alCost: number;
  dyeable: boolean;
  forAerospace: boolean;
  lineConfig: string;
  bestUse: string;
}

const DATA: Record<AnodizingLineType, AnodizingLineData> = {
  sulfuric_anodize: {
    coatingThickness: 7, throughput: 9, hardness: 6, corrosionResist: 7, alCost: 4,
    dyeable: true, forAerospace: false,
    lineConfig: "sulfuric_anodize_line_type_ii_15_25_micron_dye_seal_decorative",
    bestUse: "consumer_product_sulfuric_anodize_line_color_dye_decorative_protect",
  },
  hard_coat_anodize: {
    coatingThickness: 10, throughput: 7, hardness: 10, corrosionResist: 9, alCost: 7,
    dyeable: false, forAerospace: true,
    lineConfig: "hard_coat_anodize_line_type_iii_50_plus_micron_wear_resist_dense",
    bestUse: "hydraulic_cylinder_hard_coat_anodize_line_wear_resist_dense_thick",
  },
  chromic_anodize: {
    coatingThickness: 4, throughput: 7, hardness: 5, corrosionResist: 8, alCost: 8,
    dyeable: false, forAerospace: true,
    lineConfig: "chromic_anodize_line_type_i_thin_2_5_micron_fatigue_safe_primer",
    bestUse: "aircraft_skin_chromic_anodize_line_thin_fatigue_safe_paint_primer",
  },
  phosphoric_anodize: {
    coatingThickness: 3, throughput: 8, hardness: 3, corrosionResist: 5, alCost: 5,
    dyeable: false, forAerospace: true,
    lineConfig: "phosphoric_anodize_line_porous_oxide_adhesive_bond_prep_surface",
    bestUse: "structural_bond_phosphoric_anodize_line_adhesive_bond_prep_surface",
  },
  boric_sulfuric: {
    coatingThickness: 5, throughput: 8, hardness: 6, corrosionResist: 8, alCost: 6,
    dyeable: true, forAerospace: true,
    lineConfig: "boric_sulfuric_anodize_line_chromium_free_replace_type_i_compliant",
    bestUse: "defense_part_boric_sulfuric_anodize_line_chromium_free_compliant",
  },
};

function get(t: AnodizingLineType): AnodizingLineData {
  return DATA[t];
}

export const coatingThickness = (t: AnodizingLineType) => get(t).coatingThickness;
export const throughput = (t: AnodizingLineType) => get(t).throughput;
export const hardness = (t: AnodizingLineType) => get(t).hardness;
export const corrosionResist = (t: AnodizingLineType) => get(t).corrosionResist;
export const alCost = (t: AnodizingLineType) => get(t).alCost;
export const dyeable = (t: AnodizingLineType) => get(t).dyeable;
export const forAerospace = (t: AnodizingLineType) => get(t).forAerospace;
export const lineConfig = (t: AnodizingLineType) => get(t).lineConfig;
export const bestUse = (t: AnodizingLineType) => get(t).bestUse;
export const anodizingLineTypes = (): AnodizingLineType[] =>
  Object.keys(DATA) as AnodizingLineType[];
