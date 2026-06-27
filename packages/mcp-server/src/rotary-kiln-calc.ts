export type RotaryKilnType =
  | "direct_fired_co_current"
  | "indirect_fired_shell"
  | "calcination_high_temp"
  | "incineration_waste"
  | "reduction_metallurgical";

interface RotaryKilnData {
  temperature: number;
  throughput: number;
  retention: number;
  versatility: number;
  rkCost: number;
  indirect: boolean;
  forCement: boolean;
  heating: string;
  bestUse: string;
}

const DATA: Record<RotaryKilnType, RotaryKilnData> = {
  direct_fired_co_current: {
    temperature: 7, throughput: 9, retention: 6, versatility: 8, rkCost: 5,
    indirect: false, forCement: false,
    heating: "gas_burner_direct_flame_co_flow",
    bestUse: "mineral_ore_drying_aggregate_heat",
  },
  indirect_fired_shell: {
    temperature: 8, throughput: 6, retention: 8, versatility: 7, rkCost: 8,
    indirect: true, forCement: false,
    heating: "external_shell_radiation_conduction",
    bestUse: "chemical_carbon_thermal_decompose",
  },
  calcination_high_temp: {
    temperature: 10, throughput: 8, retention: 7, versatility: 6, rkCost: 7,
    indirect: false, forCement: true,
    heating: "multi_zone_burner_refractory_lined",
    bestUse: "cement_clinker_lime_calcine_alumina",
  },
  incineration_waste: {
    temperature: 9, throughput: 7, retention: 9, versatility: 9, rkCost: 9,
    indirect: false, forCement: false,
    heating: "co_fired_waste_auxiliary_burner",
    bestUse: "hazardous_waste_soil_remediation",
  },
  reduction_metallurgical: {
    temperature: 10, throughput: 7, retention: 8, versatility: 5, rkCost: 10,
    indirect: false, forCement: false,
    heating: "reducing_atmosphere_carbon_coal_bed",
    bestUse: "iron_ore_reduction_titanium_process",
  },
};

function get(t: RotaryKilnType): RotaryKilnData {
  return DATA[t];
}

export const temperature = (t: RotaryKilnType) => get(t).temperature;
export const throughput = (t: RotaryKilnType) => get(t).throughput;
export const retention = (t: RotaryKilnType) => get(t).retention;
export const versatility = (t: RotaryKilnType) => get(t).versatility;
export const rkCost = (t: RotaryKilnType) => get(t).rkCost;
export const indirect = (t: RotaryKilnType) => get(t).indirect;
export const forCement = (t: RotaryKilnType) => get(t).forCement;
export const heating = (t: RotaryKilnType) => get(t).heating;
export const bestUse = (t: RotaryKilnType) => get(t).bestUse;
export const rotaryKilnTypes = (): RotaryKilnType[] =>
  Object.keys(DATA) as RotaryKilnType[];
