export type OffsetPressType =
  | "sheetfed_commercial"
  | "web_heatset"
  | "web_coldset"
  | "waterless"
  | "digital_offset";

interface OffsetPressData {
  speed: number;
  imageQuality: number;
  colorConsistency: number;
  makeready: number;
  opCost: number;
  usesWater: boolean;
  forShortRun: boolean;
  plate: string;
  bestUse: string;
}

const DATA: Record<OffsetPressType, OffsetPressData> = {
  sheetfed_commercial: {
    speed: 7, imageQuality: 10, colorConsistency: 9, makeready: 5, opCost: 7,
    usesWater: true, forShortRun: false,
    plate: "aluminum_presensitized_ctp_dampening_inking_blanket_transfer",
    bestUse: "brochure_annual_report_packaging_carton_premium_commercial",
  },
  web_heatset: {
    speed: 10, imageQuality: 8, colorConsistency: 8, makeready: 4, opCost: 9,
    usesWater: true, forShortRun: false,
    plate: "continuous_roll_web_heatset_dryer_chill_roll_folder",
    bestUse: "magazine_catalog_insert_high_volume_publication_gloss",
  },
  web_coldset: {
    speed: 9, imageQuality: 6, colorConsistency: 7, makeready: 4, opCost: 6,
    usesWater: true, forShortRun: false,
    plate: "continuous_roll_web_no_dryer_absorbent_newsprint_stock",
    bestUse: "newspaper_directory_flyer_uncoated_high_speed_daily",
  },
  waterless: {
    speed: 7, imageQuality: 10, colorConsistency: 10, makeready: 7, opCost: 8,
    usesWater: false, forShortRun: false,
    plate: "silicone_rubber_layer_ink_repellent_no_fountain_solution",
    bestUse: "fine_art_reproduction_color_critical_packaging_proof_grade",
  },
  digital_offset: {
    speed: 6, imageQuality: 9, colorConsistency: 9, makeready: 10, opCost: 5,
    usesWater: false, forShortRun: true,
    plate: "direct_imaging_on_press_plate_variable_data_hybrid",
    bestUse: "short_run_versioned_personalized_book_on_demand_variable",
  },
};

function get(t: OffsetPressType): OffsetPressData {
  return DATA[t];
}

export const speed = (t: OffsetPressType) => get(t).speed;
export const imageQuality = (t: OffsetPressType) => get(t).imageQuality;
export const colorConsistency = (t: OffsetPressType) => get(t).colorConsistency;
export const makeready = (t: OffsetPressType) => get(t).makeready;
export const opCost = (t: OffsetPressType) => get(t).opCost;
export const usesWater = (t: OffsetPressType) => get(t).usesWater;
export const forShortRun = (t: OffsetPressType) => get(t).forShortRun;
export const plate = (t: OffsetPressType) => get(t).plate;
export const bestUse = (t: OffsetPressType) => get(t).bestUse;
export const offsetPressTypes = (): OffsetPressType[] =>
  Object.keys(DATA) as OffsetPressType[];
