export type UvDisinfectorType =
  | "low_pressure"
  | "medium_pressure"
  | "amalgam_lamp"
  | "led_uv"
  | "open_channel";

interface UvDisinfectorData {
  disinfectionRate: number;
  throughput: number;
  energyEfficiency: number;
  lampLife: number;
  udCost: number;
  chemical: boolean;
  forDrinking: boolean;
  disinfectorConfig: string;
  bestUse: string;
}

const DATA: Record<UvDisinfectorType, UvDisinfectorData> = {
  low_pressure: {
    disinfectionRate: 9, throughput: 7, energyEfficiency: 9, lampLife: 8, udCost: 6,
    chemical: false, forDrinking: true,
    disinfectorConfig: "low_pressure_uv_disinfector_monochromatic_254nm_germicidal_lamp",
    bestUse: "municipal_drinking_low_pressure_uv_disinfection_pathogen_kill",
  },
  medium_pressure: {
    disinfectionRate: 10, throughput: 9, energyEfficiency: 6, lampLife: 5, udCost: 8,
    chemical: false, forDrinking: true,
    disinfectorConfig: "medium_pressure_uv_disinfector_polychromatic_broad_spectrum",
    bestUse: "large_municipal_medium_pressure_uv_high_flow_broad_spectrum",
  },
  amalgam_lamp: {
    disinfectionRate: 9, throughput: 8, energyEfficiency: 10, lampLife: 10, udCost: 7,
    chemical: false, forDrinking: true,
    disinfectorConfig: "amalgam_lamp_uv_disinfector_high_output_stable_long_life_254nm",
    bestUse: "water_utility_amalgam_uv_lamp_long_life_high_output_efficient",
  },
  led_uv: {
    disinfectionRate: 7, throughput: 5, energyEfficiency: 8, lampLife: 9, udCost: 9,
    chemical: false, forDrinking: true,
    disinfectorConfig: "led_uv_disinfector_solid_state_compact_instant_on_265nm",
    bestUse: "point_of_use_led_uv_disinfector_compact_instant_portable",
  },
  open_channel: {
    disinfectionRate: 8, throughput: 10, energyEfficiency: 7, lampLife: 7, udCost: 10,
    chemical: false, forDrinking: false,
    disinfectorConfig: "open_channel_uv_disinfector_submerged_lamp_gravity_flow_treat",
    bestUse: "wastewater_effluent_open_channel_uv_disinfection_high_volume",
  },
};

function get(t: UvDisinfectorType): UvDisinfectorData {
  return DATA[t];
}

export const disinfectionRate = (t: UvDisinfectorType) => get(t).disinfectionRate;
export const throughput = (t: UvDisinfectorType) => get(t).throughput;
export const energyEfficiency = (t: UvDisinfectorType) => get(t).energyEfficiency;
export const lampLife = (t: UvDisinfectorType) => get(t).lampLife;
export const udCost = (t: UvDisinfectorType) => get(t).udCost;
export const chemical = (t: UvDisinfectorType) => get(t).chemical;
export const forDrinking = (t: UvDisinfectorType) => get(t).forDrinking;
export const disinfectorConfig = (t: UvDisinfectorType) => get(t).disinfectorConfig;
export const bestUse = (t: UvDisinfectorType) => get(t).bestUse;
export const uvDisinfectorTypes = (): UvDisinfectorType[] =>
  Object.keys(DATA) as UvDisinfectorType[];
