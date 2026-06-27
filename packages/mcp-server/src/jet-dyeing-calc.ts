export type JetDyeingType =
  | "overflow_soft_flow"
  | "air_jet"
  | "full_flood_rapid"
  | "high_temp_hthp"
  | "sample_mini_jet";

interface JetDyeingData {
  liquorRatio: number;
  fabricSpeed: number;
  dyeUniformity: number;
  temperatureMax: number;
  jdCost: number;
  lowLiquor: boolean;
  forKnit: boolean;
  flowConfig: string;
  bestUse: string;
}

const DATA: Record<JetDyeingType, JetDyeingData> = {
  overflow_soft_flow: {
    liquorRatio: 7, fabricSpeed: 7, dyeUniformity: 9, temperatureMax: 7, jdCost: 6,
    lowLiquor: false, forKnit: true,
    flowConfig: "overflow_nozzle_gentle_fabric_transport_low_tension_soft_flow",
    bestUse: "knit_jersey_interlock_delicate_fabric_gentle_dyeing_low_crease",
  },
  air_jet: {
    liquorRatio: 10, fabricSpeed: 9, dyeUniformity: 8, temperatureMax: 8, jdCost: 9,
    lowLiquor: true, forKnit: true,
    flowConfig: "air_nozzle_fabric_transport_minimal_water_high_speed_low_bath",
    bestUse: "eco_dyeing_water_saving_knit_woven_low_liquor_ratio_air_flow",
  },
  full_flood_rapid: {
    liquorRatio: 5, fabricSpeed: 10, dyeUniformity: 7, temperatureMax: 8, jdCost: 7,
    lowLiquor: false, forKnit: false,
    flowConfig: "full_flood_nozzle_high_circulation_rapid_dye_uptake_fast_cycle",
    bestUse: "woven_polyester_rapid_dyeing_fast_cycle_time_high_production",
  },
  high_temp_hthp: {
    liquorRatio: 6, fabricSpeed: 6, dyeUniformity: 10, temperatureMax: 10, jdCost: 8,
    lowLiquor: false, forKnit: false,
    flowConfig: "pressurized_vessel_140c_disperse_dye_polyester_high_temp_jet",
    bestUse: "polyester_nylon_disperse_dye_high_temp_pressure_colorfastness",
  },
  sample_mini_jet: {
    liquorRatio: 4, fabricSpeed: 5, dyeUniformity: 6, temperatureMax: 7, jdCost: 3,
    lowLiquor: false, forKnit: true,
    flowConfig: "small_capacity_lab_sample_single_rope_mini_jet_color_matching",
    bestUse: "lab_sample_dyeing_color_matching_shade_development_small_batch",
  },
};

function get(t: JetDyeingType): JetDyeingData {
  return DATA[t];
}

export const liquorRatio = (t: JetDyeingType) => get(t).liquorRatio;
export const fabricSpeed = (t: JetDyeingType) => get(t).fabricSpeed;
export const dyeUniformity = (t: JetDyeingType) => get(t).dyeUniformity;
export const temperatureMax = (t: JetDyeingType) => get(t).temperatureMax;
export const jdCost = (t: JetDyeingType) => get(t).jdCost;
export const lowLiquor = (t: JetDyeingType) => get(t).lowLiquor;
export const forKnit = (t: JetDyeingType) => get(t).forKnit;
export const flowConfig = (t: JetDyeingType) => get(t).flowConfig;
export const bestUse = (t: JetDyeingType) => get(t).bestUse;
export const jetDyeingTypes = (): JetDyeingType[] =>
  Object.keys(DATA) as JetDyeingType[];
