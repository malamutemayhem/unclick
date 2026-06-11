export type GravurePressType =
  | "publication"
  | "packaging"
  | "decorative"
  | "specialty"
  | "narrow_web";

interface GravurePressData {
  speed: number;
  imageQuality: number;
  runLength: number;
  inkDensity: number;
  gpCost: number;
  electronicEngraving: boolean;
  forLongRun: boolean;
  cylinder: string;
  bestUse: string;
}

const DATA: Record<GravurePressType, GravurePressData> = {
  publication: {
    speed: 10, imageQuality: 9, runLength: 10, inkDensity: 9, gpCost: 10,
    electronicEngraving: true, forLongRun: true,
    cylinder: "chrome_plated_copper_electromechanical_engraved_large_diameter",
    bestUse: "magazine_catalog_supplement_high_volume_color_publication",
  },
  packaging: {
    speed: 8, imageQuality: 10, runLength: 9, inkDensity: 10, gpCost: 9,
    electronicEngraving: true, forLongRun: true,
    cylinder: "laser_engraved_copper_chrome_solvent_or_water_based_ink",
    bestUse: "flexible_film_laminate_pouch_foil_wrapper_food_grade",
  },
  decorative: {
    speed: 7, imageQuality: 8, runLength: 8, inkDensity: 8, gpCost: 7,
    electronicEngraving: false, forLongRun: true,
    cylinder: "chemically_etched_pattern_cylinder_wood_grain_texture",
    bestUse: "laminate_flooring_wallpaper_furniture_surface_vinyl_wrap",
  },
  specialty: {
    speed: 6, imageQuality: 9, runLength: 7, inkDensity: 9, gpCost: 8,
    electronicEngraving: true, forLongRun: false,
    cylinder: "precision_engraved_micro_cell_security_feature_cylinder",
    bestUse: "banknote_stamp_security_document_hologram_base_print",
  },
  narrow_web: {
    speed: 7, imageQuality: 8, runLength: 7, inkDensity: 8, gpCost: 6,
    electronicEngraving: true, forLongRun: false,
    cylinder: "compact_narrow_web_cylinder_servo_driven_short_repeat",
    bestUse: "pressure_sensitive_label_tape_gift_wrap_narrow_format",
  },
};

function get(t: GravurePressType): GravurePressData {
  return DATA[t];
}

export const speed = (t: GravurePressType) => get(t).speed;
export const imageQuality = (t: GravurePressType) => get(t).imageQuality;
export const runLength = (t: GravurePressType) => get(t).runLength;
export const inkDensity = (t: GravurePressType) => get(t).inkDensity;
export const gpCost = (t: GravurePressType) => get(t).gpCost;
export const electronicEngraving = (t: GravurePressType) => get(t).electronicEngraving;
export const forLongRun = (t: GravurePressType) => get(t).forLongRun;
export const cylinder = (t: GravurePressType) => get(t).cylinder;
export const bestUse = (t: GravurePressType) => get(t).bestUse;
export const gravurePressTypes = (): GravurePressType[] =>
  Object.keys(DATA) as GravurePressType[];
