export type LumberDryerType =
  | "conventional_kiln"
  | "dehumidification"
  | "solar_kiln"
  | "vacuum_kiln"
  | "radio_frequency";

interface LumberDryerData {
  dryingUniformity: number;
  throughput: number;
  energyEfficiency: number;
  dryingSpeed: number;
  ldCost: number;
  lowTemp: boolean;
  forHardwood: boolean;
  dryerConfig: string;
  bestUse: string;
}

const DATA: Record<LumberDryerType, LumberDryerData> = {
  conventional_kiln: {
    dryingUniformity: 8, throughput: 9, energyEfficiency: 6, dryingSpeed: 8, ldCost: 7,
    lowTemp: false, forHardwood: true,
    dryerConfig: "conventional_kiln_lumber_dryer_steam_heat_fan_vent_schedule_mc",
    bestUse: "sawmill_conventional_kiln_dryer_softwood_hardwood_standard_mc",
  },
  dehumidification: {
    dryingUniformity: 9, throughput: 7, energyEfficiency: 9, dryingSpeed: 6, ldCost: 6,
    lowTemp: true, forHardwood: true,
    dryerConfig: "dehumidification_lumber_dryer_heat_pump_recirculate_low_temp",
    bestUse: "small_mill_dehumidification_dryer_energy_efficient_gentle_dry",
  },
  solar_kiln: {
    dryingUniformity: 6, throughput: 4, energyEfficiency: 10, dryingSpeed: 3, ldCost: 3,
    lowTemp: true, forHardwood: true,
    dryerConfig: "solar_kiln_lumber_dryer_greenhouse_sun_heat_fan_slow_gentle",
    bestUse: "hobby_farm_solar_kiln_dryer_free_energy_slow_gentle_drying",
  },
  vacuum_kiln: {
    dryingUniformity: 9, throughput: 6, energyEfficiency: 7, dryingSpeed: 10, ldCost: 9,
    lowTemp: true, forHardwood: true,
    dryerConfig: "vacuum_kiln_lumber_dryer_low_pressure_boil_water_fast_gentle",
    bestUse: "specialty_wood_vacuum_kiln_dryer_fast_gentle_thick_hardwood",
  },
  radio_frequency: {
    dryingUniformity: 10, throughput: 5, energyEfficiency: 5, dryingSpeed: 10, ldCost: 10,
    lowTemp: false, forHardwood: true,
    dryerConfig: "radio_frequency_lumber_dryer_rf_microwave_heat_inside_out_fast",
    bestUse: "thick_timber_rf_lumber_dryer_inside_out_fast_uniform_no_check",
  },
};

function get(t: LumberDryerType): LumberDryerData {
  return DATA[t];
}

export const dryingUniformity = (t: LumberDryerType) => get(t).dryingUniformity;
export const throughput = (t: LumberDryerType) => get(t).throughput;
export const energyEfficiency = (t: LumberDryerType) => get(t).energyEfficiency;
export const dryingSpeed = (t: LumberDryerType) => get(t).dryingSpeed;
export const ldCost = (t: LumberDryerType) => get(t).ldCost;
export const lowTemp = (t: LumberDryerType) => get(t).lowTemp;
export const forHardwood = (t: LumberDryerType) => get(t).forHardwood;
export const dryerConfig = (t: LumberDryerType) => get(t).dryerConfig;
export const bestUse = (t: LumberDryerType) => get(t).bestUse;
export const lumberDryerTypes = (): LumberDryerType[] =>
  Object.keys(DATA) as LumberDryerType[];
