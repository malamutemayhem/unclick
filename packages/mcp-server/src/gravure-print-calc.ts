export type GravurePrintType =
  | "publication_rotogravure"
  | "packaging_cylinder_chrome"
  | "decorative_woodgrain_laminate"
  | "security_intaglio_banknote"
  | "textile_roller_fabric";

interface GravureData {
  speed: number;
  quality: number;
  consistency: number;
  runLength: number;
  gpCost: number;
  engraved: boolean;
  forLongRun: boolean;
  cell: string;
  bestUse: string;
}

const DATA: Record<GravurePrintType, GravureData> = {
  publication_rotogravure: {
    speed: 10, quality: 8, consistency: 10, runLength: 10, gpCost: 9,
    engraved: true, forLongRun: true,
    cell: "electromechanical_stylus_engrave",
    bestUse: "magazine_catalog_million_run",
  },
  packaging_cylinder_chrome: {
    speed: 8, quality: 9, consistency: 9, runLength: 8, gpCost: 8,
    engraved: true, forLongRun: true,
    cell: "laser_engrave_chrome_plated",
    bestUse: "flexible_packaging_food_wrap",
  },
  decorative_woodgrain_laminate: {
    speed: 7, quality: 9, consistency: 9, runLength: 7, gpCost: 7,
    engraved: true, forLongRun: true,
    cell: "chemical_etch_pattern_repeat",
    bestUse: "laminate_flooring_furniture_surface",
  },
  security_intaglio_banknote: {
    speed: 4, quality: 10, consistency: 10, runLength: 6, gpCost: 10,
    engraved: true, forLongRun: false,
    cell: "hand_steel_die_deep_engrave",
    bestUse: "banknote_passport_stamp_security",
  },
  textile_roller_fabric: {
    speed: 7, quality: 7, consistency: 8, runLength: 8, gpCost: 6,
    engraved: true, forLongRun: true,
    cell: "copper_roller_acid_etch",
    bestUse: "fabric_print_wallpaper_repeat",
  },
};

function get(t: GravurePrintType): GravureData {
  return DATA[t];
}

export const speed = (t: GravurePrintType) => get(t).speed;
export const quality = (t: GravurePrintType) => get(t).quality;
export const consistency = (t: GravurePrintType) => get(t).consistency;
export const runLength = (t: GravurePrintType) => get(t).runLength;
export const gpCost = (t: GravurePrintType) => get(t).gpCost;
export const engraved = (t: GravurePrintType) => get(t).engraved;
export const forLongRun = (t: GravurePrintType) => get(t).forLongRun;
export const cell = (t: GravurePrintType) => get(t).cell;
export const bestUse = (t: GravurePrintType) => get(t).bestUse;
export const gravurePrintTypes = (): GravurePrintType[] =>
  Object.keys(DATA) as GravurePrintType[];
