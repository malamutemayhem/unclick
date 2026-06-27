export type TeaOxidizerType =
  | "open_floor"
  | "trough_controlled"
  | "drum_continuous"
  | "climate_chamber"
  | "bamboo_basket";

interface TeaOxidizerData {
  oxidationControl: number;
  throughput: number;
  colorDevelop: number;
  flavorDepth: number;
  toCost: number;
  automated: boolean;
  forBlack: boolean;
  oxidizerConfig: string;
  bestUse: string;
}

const DATA: Record<TeaOxidizerType, TeaOxidizerData> = {
  open_floor: {
    oxidationControl: 5, throughput: 6, colorDevelop: 7, flavorDepth: 8, toCost: 2,
    automated: false, forBlack: true,
    oxidizerConfig: "open_floor_oxidation_spread_leaf_cool_humid_room_natural_enzyme",
    bestUse: "traditional_black_tea_open_floor_oxidation_natural_enzyme_browning",
  },
  trough_controlled: {
    oxidationControl: 8, throughput: 8, colorDevelop: 8, flavorDepth: 7, toCost: 6,
    automated: true, forBlack: true,
    oxidizerConfig: "trough_controlled_oxidation_humidified_air_temp_monitor_timer",
    bestUse: "commercial_black_tea_trough_controlled_oxidation_consistent_batch",
  },
  drum_continuous: {
    oxidationControl: 7, throughput: 10, colorDevelop: 7, flavorDepth: 6, toCost: 7,
    automated: true, forBlack: true,
    oxidizerConfig: "drum_continuous_oxidation_rotating_cylinder_conveyor_ctc_line_feed",
    bestUse: "ctc_tea_line_drum_continuous_oxidation_high_volume_inline_process",
  },
  climate_chamber: {
    oxidationControl: 10, throughput: 7, colorDevelop: 9, flavorDepth: 9, toCost: 9,
    automated: true, forBlack: true,
    oxidizerConfig: "climate_chamber_oxidation_precise_temp_humidity_o2_sensor_control",
    bestUse: "premium_tea_climate_chamber_oxidation_precise_temp_humidity_o2_control",
  },
  bamboo_basket: {
    oxidationControl: 6, throughput: 3, colorDevelop: 8, flavorDepth: 10, toCost: 2,
    automated: false, forBlack: false,
    oxidizerConfig: "bamboo_basket_partial_oxidation_toss_bruise_oolong_edge_oxidize",
    bestUse: "artisan_oolong_bamboo_basket_toss_partial_oxidation_edge_bruise",
  },
};

function get(t: TeaOxidizerType): TeaOxidizerData {
  return DATA[t];
}

export const oxidationControl = (t: TeaOxidizerType) => get(t).oxidationControl;
export const throughput = (t: TeaOxidizerType) => get(t).throughput;
export const colorDevelop = (t: TeaOxidizerType) => get(t).colorDevelop;
export const flavorDepth = (t: TeaOxidizerType) => get(t).flavorDepth;
export const toCost = (t: TeaOxidizerType) => get(t).toCost;
export const automated = (t: TeaOxidizerType) => get(t).automated;
export const forBlack = (t: TeaOxidizerType) => get(t).forBlack;
export const oxidizerConfig = (t: TeaOxidizerType) => get(t).oxidizerConfig;
export const bestUse = (t: TeaOxidizerType) => get(t).bestUse;
export const teaOxidizerTypes = (): TeaOxidizerType[] =>
  Object.keys(DATA) as TeaOxidizerType[];
