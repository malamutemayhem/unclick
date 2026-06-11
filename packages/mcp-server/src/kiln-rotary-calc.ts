export type KilnRotaryType =
  | "direct_fired"
  | "indirect_fired"
  | "calcining"
  | "waste_incineration"
  | "lime_reburning";

interface KilnRotaryData {
  temperature: number;
  throughput: number;
  retention: number;
  fuelEfficiency: number;
  krCost: number;
  continuous: boolean;
  forCalcination: boolean;
  lining: string;
  bestUse: string;
}

const DATA: Record<KilnRotaryType, KilnRotaryData> = {
  direct_fired: {
    temperature: 9, throughput: 10, retention: 7, fuelEfficiency: 7, krCost: 7,
    continuous: true, forCalcination: true,
    lining: "refractory_brick_direct_flame_contact_high_temp_process",
    bestUse: "cement_clinker_production_limestone_calcination_high_volume",
  },
  indirect_fired: {
    temperature: 7, throughput: 6, retention: 8, fuelEfficiency: 8, krCost: 8,
    continuous: true, forCalcination: false,
    lining: "alloy_steel_shell_indirect_external_heat_no_gas_contact",
    bestUse: "activated_carbon_catalyst_regen_sensitive_material_no_gas",
  },
  calcining: {
    temperature: 10, throughput: 8, retention: 8, fuelEfficiency: 6, krCost: 8,
    continuous: true, forCalcination: true,
    lining: "high_alumina_refractory_calcination_zone_thermal_resistant",
    bestUse: "alumina_calcination_titanium_dioxide_mineral_thermal_treat",
  },
  waste_incineration: {
    temperature: 8, throughput: 9, retention: 9, fuelEfficiency: 5, krCost: 10,
    continuous: true, forCalcination: false,
    lining: "high_chrome_refractory_acid_resistant_waste_combustion",
    bestUse: "hazardous_waste_destruction_medical_waste_soil_remediation",
  },
  lime_reburning: {
    temperature: 9, throughput: 8, retention: 7, fuelEfficiency: 8, krCost: 6,
    continuous: true, forCalcination: true,
    lining: "magnesia_chrome_refractory_lime_mud_calcination_recycle",
    bestUse: "pulp_mill_lime_mud_recausticizing_quicklime_regeneration",
  },
};

function get(t: KilnRotaryType): KilnRotaryData {
  return DATA[t];
}

export const temperature = (t: KilnRotaryType) => get(t).temperature;
export const throughput = (t: KilnRotaryType) => get(t).throughput;
export const retention = (t: KilnRotaryType) => get(t).retention;
export const fuelEfficiency = (t: KilnRotaryType) => get(t).fuelEfficiency;
export const krCost = (t: KilnRotaryType) => get(t).krCost;
export const continuous = (t: KilnRotaryType) => get(t).continuous;
export const forCalcination = (t: KilnRotaryType) => get(t).forCalcination;
export const lining = (t: KilnRotaryType) => get(t).lining;
export const bestUse = (t: KilnRotaryType) => get(t).bestUse;
export const kilnRotaryTypes = (): KilnRotaryType[] =>
  Object.keys(DATA) as KilnRotaryType[];
