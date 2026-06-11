export type TeaDryerType =
  | "fluidized_bed"
  | "endless_chain"
  | "rotary_drum"
  | "pan_fired"
  | "sun_dried";

interface TeaDryerData {
  moistureControl: number;
  throughput: number;
  flavorPreserve: number;
  energyEfficiency: number;
  tdCost: number;
  continuous: boolean;
  forGreen: boolean;
  dryerConfig: string;
  bestUse: string;
}

const DATA: Record<TeaDryerType, TeaDryerData> = {
  fluidized_bed: {
    moistureControl: 10, throughput: 9, flavorPreserve: 8, energyEfficiency: 8, tdCost: 8,
    continuous: true, forGreen: false,
    dryerConfig: "fluidized_bed_tea_dryer_hot_air_levitate_leaf_uniform_moisture",
    bestUse: "large_tea_factory_fluidized_bed_dryer_uniform_moisture_ctc_black",
  },
  endless_chain: {
    moistureControl: 8, throughput: 10, flavorPreserve: 7, energyEfficiency: 7, tdCost: 7,
    continuous: true, forGreen: false,
    dryerConfig: "endless_chain_tea_dryer_perforated_tray_conveyor_multi_stage_dry",
    bestUse: "commercial_tea_factory_endless_chain_dryer_high_volume_multi_stage",
  },
  rotary_drum: {
    moistureControl: 7, throughput: 8, flavorPreserve: 6, energyEfficiency: 6, tdCost: 5,
    continuous: true, forGreen: false,
    dryerConfig: "rotary_drum_tea_dryer_tumbling_cylinder_hot_air_rapid_bulk_dry",
    bestUse: "bulk_tea_processing_rotary_drum_dryer_rapid_high_volume_commodity",
  },
  pan_fired: {
    moistureControl: 8, throughput: 5, flavorPreserve: 10, energyEfficiency: 5, tdCost: 4,
    continuous: false, forGreen: true,
    dryerConfig: "pan_fired_tea_dryer_heated_wok_drum_enzyme_kill_green_tea_aroma",
    bestUse: "chinese_green_tea_pan_fired_wok_kill_green_enzyme_halt_aroma_fix",
  },
  sun_dried: {
    moistureControl: 4, throughput: 3, flavorPreserve: 9, energyEfficiency: 10, tdCost: 1,
    continuous: false, forGreen: false,
    dryerConfig: "sun_dried_tea_bamboo_tray_outdoor_natural_slow_white_pu_erh",
    bestUse: "white_pu_erh_tea_sun_dried_natural_slow_ambient_traditional_method",
  },
};

function get(t: TeaDryerType): TeaDryerData {
  return DATA[t];
}

export const moistureControl = (t: TeaDryerType) => get(t).moistureControl;
export const throughput = (t: TeaDryerType) => get(t).throughput;
export const flavorPreserve = (t: TeaDryerType) => get(t).flavorPreserve;
export const energyEfficiency = (t: TeaDryerType) => get(t).energyEfficiency;
export const tdCost = (t: TeaDryerType) => get(t).tdCost;
export const continuous = (t: TeaDryerType) => get(t).continuous;
export const forGreen = (t: TeaDryerType) => get(t).forGreen;
export const dryerConfig = (t: TeaDryerType) => get(t).dryerConfig;
export const bestUse = (t: TeaDryerType) => get(t).bestUse;
export const teaDryerTypes = (): TeaDryerType[] =>
  Object.keys(DATA) as TeaDryerType[];
