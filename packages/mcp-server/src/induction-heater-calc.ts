export type InductionHeaterType =
  | "medium_frequency"
  | "high_frequency"
  | "super_audio"
  | "line_frequency"
  | "dual_frequency";

interface InductionHeaterData {
  heatingDepth: number;
  speed: number;
  efficiency: number;
  controlPrecision: number;
  ihCost: number;
  contactless: boolean;
  forHardening: boolean;
  coil: string;
  bestUse: string;
}

const DATA: Record<InductionHeaterType, InductionHeaterData> = {
  medium_frequency: {
    heatingDepth: 8, speed: 8, efficiency: 9, controlPrecision: 8, ihCost: 7,
    contactless: true, forHardening: true,
    coil: "solenoid_medium_freq_1_10khz_billet_bar_through_heating",
    bestUse: "forging_billet_preheat_bar_stock_through_heat_medium_depth",
  },
  high_frequency: {
    heatingDepth: 4, speed: 10, efficiency: 8, controlPrecision: 9, ihCost: 6,
    contactless: true, forHardening: true,
    coil: "concentrator_high_freq_100_400khz_surface_skin_effect",
    bestUse: "surface_hardening_gear_tooth_shaft_bearing_race_case_harden",
  },
  super_audio: {
    heatingDepth: 6, speed: 9, efficiency: 9, controlPrecision: 9, ihCost: 8,
    contactless: true, forHardening: true,
    coil: "custom_profile_super_audio_10_100khz_selective_zone_heat",
    bestUse: "selective_zone_hardening_crankshaft_camshaft_contour_heat",
  },
  line_frequency: {
    heatingDepth: 10, speed: 5, efficiency: 7, controlPrecision: 6, ihCost: 5,
    contactless: true, forHardening: false,
    coil: "channel_furnace_line_freq_50_60hz_molten_metal_holding",
    bestUse: "metal_melting_holding_furnace_cast_iron_aluminum_foundry",
  },
  dual_frequency: {
    heatingDepth: 7, speed: 9, efficiency: 9, controlPrecision: 10, ihCost: 10,
    contactless: true, forHardening: true,
    coil: "simultaneous_dual_freq_mf_hf_combined_uniform_profile",
    bestUse: "gear_hardening_uniform_tooth_root_flank_tip_profile_heat",
  },
};

function get(t: InductionHeaterType): InductionHeaterData {
  return DATA[t];
}

export const heatingDepth = (t: InductionHeaterType) => get(t).heatingDepth;
export const speed = (t: InductionHeaterType) => get(t).speed;
export const efficiency = (t: InductionHeaterType) => get(t).efficiency;
export const controlPrecision = (t: InductionHeaterType) => get(t).controlPrecision;
export const ihCost = (t: InductionHeaterType) => get(t).ihCost;
export const contactless = (t: InductionHeaterType) => get(t).contactless;
export const forHardening = (t: InductionHeaterType) => get(t).forHardening;
export const coil = (t: InductionHeaterType) => get(t).coil;
export const bestUse = (t: InductionHeaterType) => get(t).bestUse;
export const inductionHeaterTypes = (): InductionHeaterType[] =>
  Object.keys(DATA) as InductionHeaterType[];
