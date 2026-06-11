export type GutterTypeType =
  | "k_style_ogee_residential"
  | "half_round_semicircle_classic"
  | "box_gutter_commercial_square"
  | "fascia_integrated_concealed"
  | "industrial_trough_wide_open";

interface GutterTypeData {
  capacity: number;
  aesthetic: number;
  durability: number;
  cleanEase: number;
  gtCost: number;
  seamless: boolean;
  forCommercial: boolean;
  material: string;
  bestUse: string;
}

const DATA: Record<GutterTypeType, GutterTypeData> = {
  k_style_ogee_residential: {
    capacity: 7, aesthetic: 7, durability: 7, cleanEase: 6, gtCost: 4,
    seamless: true, forCommercial: false,
    material: "aluminum_painted_roll_form",
    bestUse: "residential_home_standard_gutter",
  },
  half_round_semicircle_classic: {
    capacity: 5, aesthetic: 9, durability: 8, cleanEase: 9, gtCost: 6,
    seamless: false, forCommercial: false,
    material: "copper_zinc_half_round_section",
    bestUse: "historic_home_heritage_restoration",
  },
  box_gutter_commercial_square: {
    capacity: 9, aesthetic: 5, durability: 9, cleanEase: 7, gtCost: 7,
    seamless: false, forCommercial: true,
    material: "galvanized_steel_welded_box",
    bestUse: "commercial_flat_roof_parapet_drain",
  },
  fascia_integrated_concealed: {
    capacity: 6, aesthetic: 10, durability: 7, cleanEase: 5, gtCost: 8,
    seamless: true, forCommercial: false,
    material: "aluminum_fascia_board_integrated",
    bestUse: "modern_home_clean_line_concealed",
  },
  industrial_trough_wide_open: {
    capacity: 10, aesthetic: 3, durability: 10, cleanEase: 8, gtCost: 5,
    seamless: false, forCommercial: true,
    material: "heavy_gauge_galv_steel_trough",
    bestUse: "warehouse_factory_high_volume_drain",
  },
};

function get(t: GutterTypeType): GutterTypeData {
  return DATA[t];
}

export const capacity = (t: GutterTypeType) => get(t).capacity;
export const aesthetic = (t: GutterTypeType) => get(t).aesthetic;
export const durability = (t: GutterTypeType) => get(t).durability;
export const cleanEase = (t: GutterTypeType) => get(t).cleanEase;
export const gtCost = (t: GutterTypeType) => get(t).gtCost;
export const seamless = (t: GutterTypeType) => get(t).seamless;
export const forCommercial = (t: GutterTypeType) => get(t).forCommercial;
export const material = (t: GutterTypeType) => get(t).material;
export const bestUse = (t: GutterTypeType) => get(t).bestUse;
export const gutterTypeTypes = (): GutterTypeType[] =>
  Object.keys(DATA) as GutterTypeType[];
