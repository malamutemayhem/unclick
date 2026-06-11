export type ScrewFeederType =
  | "single_screw_feed"
  | "twin_screw_feed"
  | "flexible_screw"
  | "metering_screw"
  | "shaftless_screw";

interface ScrewFeederData {
  feedAccuracy: number;
  throughput: number;
  materialRange: number;
  bridgeBreak: number;
  sfCost: number;
  enclosed: boolean;
  forCohesive: boolean;
  feederConfig: string;
  bestUse: string;
}

const DATA: Record<ScrewFeederType, ScrewFeederData> = {
  single_screw_feed: {
    feedAccuracy: 7, throughput: 8, materialRange: 8, bridgeBreak: 6, sfCost: 4,
    enclosed: true, forCohesive: false,
    feederConfig: "single_screw_feeder_auger_flight_rotate_meter_bulk_solid_dose",
    bestUse: "cement_dose_single_screw_feeder_auger_meter_bulk_continuous_feed",
  },
  twin_screw_feed: {
    feedAccuracy: 9, throughput: 7, materialRange: 9, bridgeBreak: 8, sfCost: 8,
    enclosed: true, forCohesive: true,
    feederConfig: "twin_screw_feeder_intermesh_co_rotate_self_clean_accurate_dose",
    bestUse: "additive_blend_twin_screw_feeder_precise_ratio_multi_ingredient",
  },
  flexible_screw: {
    feedAccuracy: 6, throughput: 6, materialRange: 7, bridgeBreak: 5, sfCost: 3,
    enclosed: true, forCohesive: false,
    feederConfig: "flexible_screw_feeder_spiral_in_tube_route_any_angle_compact",
    bestUse: "spice_transfer_flexible_screw_feeder_compact_route_any_angle",
  },
  metering_screw: {
    feedAccuracy: 10, throughput: 5, materialRange: 6, bridgeBreak: 7, sfCost: 7,
    enclosed: true, forCohesive: false,
    feederConfig: "metering_screw_feeder_loss_in_weight_control_precise_gravimetric",
    bestUse: "pigment_dose_metering_screw_feeder_gravimetric_precise_color_add",
  },
  shaftless_screw: {
    feedAccuracy: 6, throughput: 9, materialRange: 7, bridgeBreak: 9, sfCost: 6,
    enclosed: true, forCohesive: true,
    feederConfig: "shaftless_screw_feeder_ribbon_flight_no_center_shaft_sticky_wet",
    bestUse: "sludge_feed_shaftless_screw_feeder_no_wrap_sticky_wet_material",
  },
};

function get(t: ScrewFeederType): ScrewFeederData {
  return DATA[t];
}

export const feedAccuracy = (t: ScrewFeederType) => get(t).feedAccuracy;
export const throughput = (t: ScrewFeederType) => get(t).throughput;
export const materialRange = (t: ScrewFeederType) => get(t).materialRange;
export const bridgeBreak = (t: ScrewFeederType) => get(t).bridgeBreak;
export const sfCost = (t: ScrewFeederType) => get(t).sfCost;
export const enclosed = (t: ScrewFeederType) => get(t).enclosed;
export const forCohesive = (t: ScrewFeederType) => get(t).forCohesive;
export const feederConfig = (t: ScrewFeederType) => get(t).feederConfig;
export const bestUse = (t: ScrewFeederType) => get(t).bestUse;
export const screwFeederTypes = (): ScrewFeederType[] =>
  Object.keys(DATA) as ScrewFeederType[];
