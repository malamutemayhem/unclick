export type RubberExtruderType =
  | "hot_feed"
  | "cold_feed"
  | "pin_barrel"
  | "twin_screw_rubber"
  | "strainer_filter";

interface RubberExtruderData {
  outputRate: number;
  mixingQuality: number;
  temperatureControl: number;
  profileAccuracy: number;
  reCost: number;
  continuous: boolean;
  forCompound: boolean;
  screw: string;
  bestUse: string;
}

const DATA: Record<RubberExtruderType, RubberExtruderData> = {
  hot_feed: {
    outputRate: 8, mixingQuality: 5, temperatureControl: 5, profileAccuracy: 6, reCost: 4,
    continuous: true, forCompound: false,
    screw: "short_screw_pre_warmed_strip_feed_low_shear_simple_design",
    bestUse: "tire_tread_sidewall_tube_extrusion_pre_mixed_compound",
  },
  cold_feed: {
    outputRate: 7, mixingQuality: 8, temperatureControl: 8, profileAccuracy: 8, reCost: 6,
    continuous: true, forCompound: false,
    screw: "long_l_d_screw_cold_strip_feed_self_warming_shear_mix",
    bestUse: "profile_seal_hose_gasket_general_purpose_rubber_extrusion",
  },
  pin_barrel: {
    outputRate: 6, mixingQuality: 10, temperatureControl: 7, profileAccuracy: 7, reCost: 7,
    continuous: true, forCompound: true,
    screw: "barrel_pin_interrupt_screw_flight_intensive_distributive",
    bestUse: "compound_mixing_silicone_fluorocarbon_specialty_rubber_mix",
  },
  twin_screw_rubber: {
    outputRate: 9, mixingQuality: 9, temperatureControl: 9, profileAccuracy: 7, reCost: 9,
    continuous: true, forCompound: true,
    screw: "co_rotating_twin_screw_self_cleaning_continuous_compound",
    bestUse: "continuous_compounding_masterbatch_color_additive_blend",
  },
  strainer_filter: {
    outputRate: 5, mixingQuality: 6, temperatureControl: 6, profileAccuracy: 9, reCost: 5,
    continuous: true, forCompound: false,
    screw: "screen_pack_breaker_plate_filter_foreign_particle_remove",
    bestUse: "compound_straining_quality_filter_before_calender_mold",
  },
};

function get(t: RubberExtruderType): RubberExtruderData {
  return DATA[t];
}

export const outputRate = (t: RubberExtruderType) => get(t).outputRate;
export const mixingQuality = (t: RubberExtruderType) => get(t).mixingQuality;
export const temperatureControl = (t: RubberExtruderType) => get(t).temperatureControl;
export const profileAccuracy = (t: RubberExtruderType) => get(t).profileAccuracy;
export const reCost = (t: RubberExtruderType) => get(t).reCost;
export const continuous = (t: RubberExtruderType) => get(t).continuous;
export const forCompound = (t: RubberExtruderType) => get(t).forCompound;
export const screw = (t: RubberExtruderType) => get(t).screw;
export const bestUse = (t: RubberExtruderType) => get(t).bestUse;
export const rubberExtruderTypes = (): RubberExtruderType[] =>
  Object.keys(DATA) as RubberExtruderType[];
