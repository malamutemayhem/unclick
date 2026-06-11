export type ExtruderRubberType =
  | "hot_feed"
  | "cold_feed"
  | "pin_barrel"
  | "vented_extruder"
  | "duplex_extruder";

interface ExtruderRubberData {
  profileAccuracy: number;
  throughput: number;
  temperatureControl: number;
  surfaceFinish: number;
  erCost: number;
  continuous: boolean;
  forSeal: boolean;
  extruderConfig: string;
  bestUse: string;
}

const DATA: Record<ExtruderRubberType, ExtruderRubberData> = {
  hot_feed: {
    profileAccuracy: 7, throughput: 8, temperatureControl: 6, surfaceFinish: 7, erCost: 5,
    continuous: true, forSeal: true,
    extruderConfig: "hot_feed_rubber_extruder_pre_warmed_strip_screw_die_shape",
    bestUse: "rubber_plant_hot_feed_extruder_pre_warmed_compound_profile_shape",
  },
  cold_feed: {
    profileAccuracy: 9, throughput: 9, temperatureControl: 8, surfaceFinish: 9, erCost: 8,
    continuous: true, forSeal: true,
    extruderConfig: "cold_feed_rubber_extruder_ambient_strip_screw_heat_plasticize",
    bestUse: "modern_rubber_cold_feed_extruder_seal_hose_profile_consistent",
  },
  pin_barrel: {
    profileAccuracy: 9, throughput: 10, temperatureControl: 9, surfaceFinish: 9, erCost: 9,
    continuous: true, forSeal: true,
    extruderConfig: "pin_barrel_rubber_extruder_barrel_pin_disrupt_flow_mix_homogenize",
    bestUse: "tire_tread_pin_barrel_extruder_homogenize_compound_precise_profile",
  },
  vented_extruder: {
    profileAccuracy: 8, throughput: 8, temperatureControl: 8, surfaceFinish: 10, erCost: 7,
    continuous: true, forSeal: false,
    extruderConfig: "vented_rubber_extruder_vacuum_port_degas_bubble_free_smooth",
    bestUse: "medical_rubber_vented_extruder_degas_bubble_free_smooth_surface",
  },
  duplex_extruder: {
    profileAccuracy: 10, throughput: 8, temperatureControl: 8, surfaceFinish: 9, erCost: 10,
    continuous: true, forSeal: false,
    extruderConfig: "duplex_rubber_extruder_two_compound_coextrude_multi_layer",
    bestUse: "automotive_rubber_duplex_extruder_coextrude_multi_layer_seal",
  },
};

function get(t: ExtruderRubberType): ExtruderRubberData {
  return DATA[t];
}

export const profileAccuracy = (t: ExtruderRubberType) => get(t).profileAccuracy;
export const throughput = (t: ExtruderRubberType) => get(t).throughput;
export const temperatureControl = (t: ExtruderRubberType) => get(t).temperatureControl;
export const surfaceFinish = (t: ExtruderRubberType) => get(t).surfaceFinish;
export const erCost = (t: ExtruderRubberType) => get(t).erCost;
export const continuous = (t: ExtruderRubberType) => get(t).continuous;
export const forSeal = (t: ExtruderRubberType) => get(t).forSeal;
export const extruderConfig = (t: ExtruderRubberType) => get(t).extruderConfig;
export const bestUse = (t: ExtruderRubberType) => get(t).bestUse;
export const extruderRubberTypes = (): ExtruderRubberType[] =>
  Object.keys(DATA) as ExtruderRubberType[];
