export type TeaWithererType =
  | "trough_witherer"
  | "drum_witherer"
  | "tunnel_witherer"
  | "solar_witherer"
  | "indoor_rack";

interface TeaWithererData {
  moistureLoss: number;
  uniformity: number;
  throughput: number;
  aroma: number;
  twCost: number;
  forced: boolean;
  forOolong: boolean;
  withererConfig: string;
  bestUse: string;
}

const DATA: Record<TeaWithererType, TeaWithererData> = {
  trough_witherer: {
    moistureLoss: 8, uniformity: 8, throughput: 8, aroma: 7, twCost: 6,
    forced: true, forOolong: false,
    withererConfig: "trough_witherer_perforated_bed_fan_forced_air_controlled_moisture",
    bestUse: "standard_tea_factory_trough_witherer_forced_air_black_tea_process",
  },
  drum_witherer: {
    moistureLoss: 9, uniformity: 9, throughput: 10, aroma: 6, twCost: 8,
    forced: true, forOolong: false,
    withererConfig: "drum_witherer_rotating_cylinder_continuous_feed_rapid_wither_ctc",
    bestUse: "high_volume_ctc_factory_drum_witherer_continuous_rapid_wither",
  },
  tunnel_witherer: {
    moistureLoss: 9, uniformity: 10, throughput: 9, aroma: 7, twCost: 9,
    forced: true, forOolong: false,
    withererConfig: "tunnel_witherer_conveyor_multi_zone_temp_humidity_control_precise",
    bestUse: "large_tea_estate_tunnel_witherer_multi_zone_precise_wither_control",
  },
  solar_witherer: {
    moistureLoss: 6, uniformity: 5, throughput: 4, aroma: 9, twCost: 2,
    forced: false, forOolong: true,
    withererConfig: "solar_witherer_outdoor_tray_sunlight_natural_slow_oolong_white",
    bestUse: "oolong_white_tea_solar_wither_outdoor_tray_natural_aroma_develop",
  },
  indoor_rack: {
    moistureLoss: 7, uniformity: 7, throughput: 5, aroma: 10, twCost: 3,
    forced: false, forOolong: true,
    withererConfig: "indoor_rack_witherer_bamboo_shelf_ambient_air_slow_gentle_oolong",
    bestUse: "premium_oolong_indoor_rack_wither_bamboo_shelf_slow_aroma_complex",
  },
};

function get(t: TeaWithererType): TeaWithererData {
  return DATA[t];
}

export const moistureLoss = (t: TeaWithererType) => get(t).moistureLoss;
export const uniformity = (t: TeaWithererType) => get(t).uniformity;
export const throughput = (t: TeaWithererType) => get(t).throughput;
export const aroma = (t: TeaWithererType) => get(t).aroma;
export const twCost = (t: TeaWithererType) => get(t).twCost;
export const forced = (t: TeaWithererType) => get(t).forced;
export const forOolong = (t: TeaWithererType) => get(t).forOolong;
export const withererConfig = (t: TeaWithererType) => get(t).withererConfig;
export const bestUse = (t: TeaWithererType) => get(t).bestUse;
export const teaWithererTypes = (): TeaWithererType[] =>
  Object.keys(DATA) as TeaWithererType[];
