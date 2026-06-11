export type AutoclavePharmaType =
  | "gravity_displacement"
  | "prevacuum_pulsing"
  | "steam_air_mixture"
  | "superheated_water"
  | "ethylene_oxide";

interface AutoclavePharmaData {
  sterilizationEfficiency: number;
  throughput: number;
  temperatureUniformity: number;
  cycleSpeed: number;
  apCost: number;
  forLiquid: boolean;
  forHeatSensitive: boolean;
  autoclaveConfig: string;
  bestUse: string;
}

const DATA: Record<AutoclavePharmaType, AutoclavePharmaData> = {
  gravity_displacement: {
    sterilizationEfficiency: 8, throughput: 7, temperatureUniformity: 7, cycleSpeed: 6, apCost: 5,
    forLiquid: true, forHeatSensitive: false,
    autoclaveConfig: "gravity_displacement_autoclave_steam_downward_push_air_drain",
    bestUse: "hospital_pharma_gravity_autoclave_wrapped_instruments_glassware",
  },
  prevacuum_pulsing: {
    sterilizationEfficiency: 10, throughput: 9, temperatureUniformity: 10, cycleSpeed: 9, apCost: 8,
    forLiquid: false, forHeatSensitive: false,
    autoclaveConfig: "prevacuum_pulsing_autoclave_vacuum_pulse_steam_penetrate_pack",
    bestUse: "pharma_gmp_prevacuum_autoclave_porous_load_surgical_pack_rapid",
  },
  steam_air_mixture: {
    sterilizationEfficiency: 9, throughput: 8, temperatureUniformity: 9, cycleSpeed: 7, apCost: 7,
    forLiquid: true, forHeatSensitive: false,
    autoclaveConfig: "steam_air_mixture_autoclave_overpressure_liquid_container_safe",
    bestUse: "pharma_liquid_steam_air_autoclave_iv_bag_vial_overpressure_safe",
  },
  superheated_water: {
    sterilizationEfficiency: 9, throughput: 7, temperatureUniformity: 8, cycleSpeed: 6, apCost: 9,
    forLiquid: true, forHeatSensitive: false,
    autoclaveConfig: "superheated_water_autoclave_cascade_spray_uniform_heat_liquid",
    bestUse: "pharma_parenteral_superheated_water_autoclave_ampoule_prefilled",
  },
  ethylene_oxide: {
    sterilizationEfficiency: 8, throughput: 6, temperatureUniformity: 7, cycleSpeed: 3, apCost: 10,
    forLiquid: false, forHeatSensitive: true,
    autoclaveConfig: "ethylene_oxide_sterilizer_low_temp_gas_diffuse_aerate_desorb",
    bestUse: "medical_device_ethylene_oxide_sterilizer_plastic_electronic_heat_sensitive",
  },
};

function get(t: AutoclavePharmaType): AutoclavePharmaData {
  return DATA[t];
}

export const sterilizationEfficiency = (t: AutoclavePharmaType) => get(t).sterilizationEfficiency;
export const throughput = (t: AutoclavePharmaType) => get(t).throughput;
export const temperatureUniformity = (t: AutoclavePharmaType) => get(t).temperatureUniformity;
export const cycleSpeed = (t: AutoclavePharmaType) => get(t).cycleSpeed;
export const apCost = (t: AutoclavePharmaType) => get(t).apCost;
export const forLiquid = (t: AutoclavePharmaType) => get(t).forLiquid;
export const forHeatSensitive = (t: AutoclavePharmaType) => get(t).forHeatSensitive;
export const autoclaveConfig = (t: AutoclavePharmaType) => get(t).autoclaveConfig;
export const bestUse = (t: AutoclavePharmaType) => get(t).bestUse;
export const autoclavePharmaTypes = (): AutoclavePharmaType[] =>
  Object.keys(DATA) as AutoclavePharmaType[];
