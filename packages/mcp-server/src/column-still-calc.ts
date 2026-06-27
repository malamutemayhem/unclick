export type ColumnStillType =
  | "coffey_patent"
  | "packed_column"
  | "plate_column"
  | "multi_column"
  | "vacuum_column";

interface ColumnStillData {
  purity: number;
  throughput: number;
  energyEfficiency: number;
  flavorRetention: number;
  csCost: number;
  continuous: boolean;
  forNeutral: boolean;
  stillConfig: string;
  bestUse: string;
}

const DATA: Record<ColumnStillType, ColumnStillData> = {
  coffey_patent: {
    purity: 8, throughput: 9, energyEfficiency: 8, flavorRetention: 6, csCost: 8,
    continuous: true, forNeutral: false,
    stillConfig: "coffey_patent_still_two_column_analyzer_rectifier_continuous",
    bestUse: "grain_whisky_bourbon_coffey_patent_still_continuous_distill",
  },
  packed_column: {
    purity: 9, throughput: 7, energyEfficiency: 8, flavorRetention: 5, csCost: 6,
    continuous: true, forNeutral: true,
    stillConfig: "packed_column_still_random_structured_packing_high_purity_neutral",
    bestUse: "neutral_spirit_vodka_packed_column_high_purity_clean_distillate",
  },
  plate_column: {
    purity: 8, throughput: 10, energyEfficiency: 7, flavorRetention: 7, csCost: 9,
    continuous: true, forNeutral: false,
    stillConfig: "plate_column_still_bubble_cap_sieve_tray_rum_tequila_character",
    bestUse: "rum_tequila_plate_column_still_bubble_cap_tray_flavor_character",
  },
  multi_column: {
    purity: 10, throughput: 10, energyEfficiency: 9, flavorRetention: 3, csCost: 10,
    continuous: true, forNeutral: true,
    stillConfig: "multi_column_system_extractive_rectifying_demethylizing_neutral",
    bestUse: "industrial_ethanol_neutral_spirit_multi_column_high_purity_plant",
  },
  vacuum_column: {
    purity: 9, throughput: 6, energyEfficiency: 10, flavorRetention: 9, csCost: 9,
    continuous: true, forNeutral: false,
    stillConfig: "vacuum_column_low_pressure_low_temp_delicate_flavor_preserve",
    bestUse: "delicate_fruit_brandy_eau_de_vie_vacuum_column_low_temp_preserve",
  },
};

function get(t: ColumnStillType): ColumnStillData {
  return DATA[t];
}

export const purity = (t: ColumnStillType) => get(t).purity;
export const throughput = (t: ColumnStillType) => get(t).throughput;
export const energyEfficiency = (t: ColumnStillType) => get(t).energyEfficiency;
export const flavorRetention = (t: ColumnStillType) => get(t).flavorRetention;
export const csCost = (t: ColumnStillType) => get(t).csCost;
export const continuous = (t: ColumnStillType) => get(t).continuous;
export const forNeutral = (t: ColumnStillType) => get(t).forNeutral;
export const stillConfig = (t: ColumnStillType) => get(t).stillConfig;
export const bestUse = (t: ColumnStillType) => get(t).bestUse;
export const columnStillTypes = (): ColumnStillType[] =>
  Object.keys(DATA) as ColumnStillType[];
