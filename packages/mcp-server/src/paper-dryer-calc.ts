export type PaperDryerType =
  | "multi_cylinder"
  | "yankee_dryer"
  | "air_float"
  | "infrared_dryer"
  | "impulse_dryer";

interface PaperDryerData {
  dryingRate: number;
  energyEfficiency: number;
  paperQuality: number;
  throughput: number;
  drCost: number;
  contactDrying: boolean;
  forTissue: boolean;
  dryerConfig: string;
  bestUse: string;
}

const DATA: Record<PaperDryerType, PaperDryerData> = {
  multi_cylinder: {
    dryingRate: 7, energyEfficiency: 7, paperQuality: 8, throughput: 9, drCost: 7,
    contactDrying: true, forTissue: false,
    dryerConfig: "multi_cylinder_paper_dryer_steam_heated_drum_cascade_wrap_dry",
    bestUse: "paper_mill_multi_cylinder_dryer_standard_printing_writing_paper",
  },
  yankee_dryer: {
    dryingRate: 9, energyEfficiency: 8, paperQuality: 9, throughput: 10, drCost: 9,
    contactDrying: true, forTissue: true,
    dryerConfig: "yankee_dryer_paper_large_single_cylinder_steam_creping_tissue",
    bestUse: "tissue_mill_yankee_dryer_single_large_drum_creping_soft_tissue",
  },
  air_float: {
    dryingRate: 6, energyEfficiency: 6, paperQuality: 10, throughput: 7, drCost: 8,
    contactDrying: false, forTissue: false,
    dryerConfig: "air_float_paper_dryer_hot_air_cushion_contactless_coated_dry",
    bestUse: "coated_paper_air_float_dryer_contactless_preserve_coating_gloss",
  },
  infrared_dryer: {
    dryingRate: 10, energyEfficiency: 5, paperQuality: 7, throughput: 8, drCost: 6,
    contactDrying: false, forTissue: false,
    dryerConfig: "infrared_dryer_paper_radiant_heat_rapid_surface_dry_boost",
    bestUse: "paper_coating_infrared_dryer_rapid_surface_cure_boost_section",
  },
  impulse_dryer: {
    dryingRate: 10, energyEfficiency: 9, paperQuality: 8, throughput: 7, drCost: 10,
    contactDrying: true, forTissue: false,
    dryerConfig: "impulse_dryer_paper_high_pressure_hot_roll_flash_steam_dewater",
    bestUse: "advanced_paper_mill_impulse_dryer_high_pressure_flash_efficient",
  },
};

function get(t: PaperDryerType): PaperDryerData {
  return DATA[t];
}

export const dryingRate = (t: PaperDryerType) => get(t).dryingRate;
export const energyEfficiency = (t: PaperDryerType) => get(t).energyEfficiency;
export const paperQuality = (t: PaperDryerType) => get(t).paperQuality;
export const throughput = (t: PaperDryerType) => get(t).throughput;
export const drCost = (t: PaperDryerType) => get(t).drCost;
export const contactDrying = (t: PaperDryerType) => get(t).contactDrying;
export const forTissue = (t: PaperDryerType) => get(t).forTissue;
export const dryerConfig = (t: PaperDryerType) => get(t).dryerConfig;
export const bestUse = (t: PaperDryerType) => get(t).bestUse;
export const paperDryerTypes = (): PaperDryerType[] =>
  Object.keys(DATA) as PaperDryerType[];
