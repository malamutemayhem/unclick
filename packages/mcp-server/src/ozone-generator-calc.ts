export type OzoneGeneratorType =
  | "corona_discharge"
  | "uv_ozone"
  | "electrolytic_ozone"
  | "cold_plasma"
  | "oxygen_fed_corona";

interface OzoneGeneratorData {
  ozoneOutput: number;
  throughput: number;
  energyEfficiency: number;
  purity: number;
  ogCost: number;
  portable: boolean;
  forPotable: boolean;
  generatorConfig: string;
  bestUse: string;
}

const DATA: Record<OzoneGeneratorType, OzoneGeneratorData> = {
  corona_discharge: {
    ozoneOutput: 9, throughput: 10, energyEfficiency: 8, purity: 8, ogCost: 7,
    portable: false, forPotable: true,
    generatorConfig: "corona_discharge_ozone_generator_dielectric_gap_high_voltage",
    bestUse: "municipal_water_corona_discharge_ozone_high_capacity_disinfect",
  },
  uv_ozone: {
    ozoneOutput: 4, throughput: 3, energyEfficiency: 5, purity: 7, ogCost: 3,
    portable: true, forPotable: false,
    generatorConfig: "uv_ozone_generator_185nm_lamp_photolysis_oxygen_split_low_conc",
    bestUse: "lab_small_pool_uv_ozone_generator_low_concentration_simple",
  },
  electrolytic_ozone: {
    ozoneOutput: 6, throughput: 5, energyEfficiency: 7, purity: 10, ogCost: 8,
    portable: true, forPotable: true,
    generatorConfig: "electrolytic_ozone_generator_pem_water_split_pure_o3_no_nox",
    bestUse: "pharma_food_electrolytic_ozone_ultra_pure_no_byproduct_clean",
  },
  cold_plasma: {
    ozoneOutput: 7, throughput: 6, energyEfficiency: 6, purity: 7, ogCost: 6,
    portable: false, forPotable: false,
    generatorConfig: "cold_plasma_ozone_generator_dbd_plasma_field_reactive_species",
    bestUse: "industrial_odor_cold_plasma_ozone_voc_treatment_air_purify",
  },
  oxygen_fed_corona: {
    ozoneOutput: 10, throughput: 10, energyEfficiency: 9, purity: 9, ogCost: 10,
    portable: false, forPotable: true,
    generatorConfig: "oxygen_fed_corona_ozone_generator_lox_psa_feed_high_conc_o3",
    bestUse: "large_utility_oxygen_fed_ozone_generator_high_dose_crypto",
  },
};

function get(t: OzoneGeneratorType): OzoneGeneratorData {
  return DATA[t];
}

export const ozoneOutput = (t: OzoneGeneratorType) => get(t).ozoneOutput;
export const throughput = (t: OzoneGeneratorType) => get(t).throughput;
export const energyEfficiency = (t: OzoneGeneratorType) => get(t).energyEfficiency;
export const purity = (t: OzoneGeneratorType) => get(t).purity;
export const ogCost = (t: OzoneGeneratorType) => get(t).ogCost;
export const portable = (t: OzoneGeneratorType) => get(t).portable;
export const forPotable = (t: OzoneGeneratorType) => get(t).forPotable;
export const generatorConfig = (t: OzoneGeneratorType) => get(t).generatorConfig;
export const bestUse = (t: OzoneGeneratorType) => get(t).bestUse;
export const ozoneGeneratorTypes = (): OzoneGeneratorType[] =>
  Object.keys(DATA) as OzoneGeneratorType[];
