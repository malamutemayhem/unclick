export type AsepticFillerType =
  | "blow_fill_seal"
  | "form_fill_seal"
  | "pre_sterilize_fill"
  | "ultra_clean_fill"
  | "electron_beam_fill";

interface AsepticFillerData {
  sterility: number;
  throughput: number;
  containerRange: number;
  shelfLife: number;
  afCost_: number;
  singleStep: boolean;
  forPharma: boolean;
  fillerConfig: string;
  bestUse: string;
}

const DATA: Record<AsepticFillerType, AsepticFillerData> = {
  blow_fill_seal: {
    sterility: 10, throughput: 8, containerRange: 5, shelfLife: 10, afCost_: 9,
    singleStep: true, forPharma: true,
    fillerConfig: "blow_fill_seal_aseptic_filler_extrude_mold_fill_seal_one_step",
    bestUse: "pharma_vial_blow_fill_seal_aseptic_filler_one_step_sterile_pack",
  },
  form_fill_seal: {
    sterility: 8, throughput: 10, containerRange: 7, shelfLife: 9, afCost_: 7,
    singleStep: true, forPharma: false,
    fillerConfig: "form_fill_seal_aseptic_filler_roll_stock_form_sterile_fill_seal",
    bestUse: "juice_pouch_form_fill_seal_aseptic_filler_high_speed_roll_stock",
  },
  pre_sterilize_fill: {
    sterility: 9, throughput: 9, containerRange: 9, shelfLife: 10, afCost_: 8,
    singleStep: false, forPharma: false,
    fillerConfig: "pre_sterilize_fill_aseptic_h2o2_rinse_sterile_zone_fill_cap",
    bestUse: "milk_carton_pre_sterilize_aseptic_filler_h2o2_rinse_long_shelf",
  },
  ultra_clean_fill: {
    sterility: 7, throughput: 9, containerRange: 8, shelfLife: 7, afCost_: 5,
    singleStep: false, forPharma: false,
    fillerConfig: "ultra_clean_filler_hepa_clean_room_sanitize_extended_shelf_life",
    bestUse: "yogurt_cup_ultra_clean_filler_extended_shelf_life_chilled_dist",
  },
  electron_beam_fill: {
    sterility: 10, throughput: 7, containerRange: 6, shelfLife: 10, afCost_: 10,
    singleStep: false, forPharma: true,
    fillerConfig: "electron_beam_aseptic_filler_ebeam_sterilize_no_chemical_residue",
    bestUse: "biotech_electron_beam_aseptic_filler_no_chemical_residue_sterile",
  },
};

function get(t: AsepticFillerType): AsepticFillerData {
  return DATA[t];
}

export const sterility = (t: AsepticFillerType) => get(t).sterility;
export const throughput = (t: AsepticFillerType) => get(t).throughput;
export const containerRange = (t: AsepticFillerType) => get(t).containerRange;
export const shelfLife = (t: AsepticFillerType) => get(t).shelfLife;
export const afCost_ = (t: AsepticFillerType) => get(t).afCost_;
export const singleStep = (t: AsepticFillerType) => get(t).singleStep;
export const forPharma = (t: AsepticFillerType) => get(t).forPharma;
export const fillerConfig = (t: AsepticFillerType) => get(t).fillerConfig;
export const bestUse = (t: AsepticFillerType) => get(t).bestUse;
export const asepticFillerTypes = (): AsepticFillerType[] =>
  Object.keys(DATA) as AsepticFillerType[];
