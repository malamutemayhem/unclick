export type LeachingTankType =
  | "agitated_cyanide"
  | "heap_leach_pad"
  | "acid_pressure"
  | "vat_leach"
  | "bioleach_reactor";

interface LeachingTankData {
  extractionRate: number;
  throughput: number;
  reagentEfficiency: number;
  recoveryRate: number;
  ltCost: number;
  pressurized: boolean;
  forGold: boolean;
  tankConfig: string;
  bestUse: string;
}

const DATA: Record<LeachingTankType, LeachingTankData> = {
  agitated_cyanide: {
    extractionRate: 9, throughput: 8, reagentEfficiency: 8, recoveryRate: 9, ltCost: 7,
    pressurized: false, forGold: true,
    tankConfig: "agitated_cyanide_leach_tank_impeller_mix_nacn_dissolve_gold",
    bestUse: "gold_mine_cip_cil_agitated_cyanide_leach_tank_fine_grind_ore",
  },
  heap_leach_pad: {
    extractionRate: 6, throughput: 10, reagentEfficiency: 5, recoveryRate: 6, ltCost: 4,
    pressurized: false, forGold: true,
    tankConfig: "heap_leach_pad_stacked_ore_drip_irrigate_cyanide_acid_collect",
    bestUse: "low_grade_gold_copper_heap_leach_pad_large_tonnage_low_cost",
  },
  acid_pressure: {
    extractionRate: 10, throughput: 6, reagentEfficiency: 9, recoveryRate: 10, ltCost: 10,
    pressurized: true, forGold: false,
    tankConfig: "acid_pressure_leach_autoclave_sulfuric_acid_high_temp_pressure",
    bestUse: "nickel_cobalt_acid_pressure_leach_autoclave_refractory_ore",
  },
  vat_leach: {
    extractionRate: 7, throughput: 7, reagentEfficiency: 7, recoveryRate: 7, ltCost: 5,
    pressurized: false, forGold: true,
    tankConfig: "vat_leach_tank_concrete_vat_flood_ore_cyanide_percolate_drain",
    bestUse: "small_mine_vat_leach_coarse_gold_ore_simple_percolation",
  },
  bioleach_reactor: {
    extractionRate: 7, throughput: 5, reagentEfficiency: 10, recoveryRate: 8, ltCost: 8,
    pressurized: false, forGold: false,
    tankConfig: "bioleach_reactor_bacteria_oxidize_sulfide_mineral_liberate_metal",
    bestUse: "copper_zinc_bioleach_reactor_bacterial_oxidation_sulfide_ore",
  },
};

function get(t: LeachingTankType): LeachingTankData {
  return DATA[t];
}

export const extractionRate = (t: LeachingTankType) => get(t).extractionRate;
export const throughput = (t: LeachingTankType) => get(t).throughput;
export const reagentEfficiency = (t: LeachingTankType) => get(t).reagentEfficiency;
export const recoveryRate = (t: LeachingTankType) => get(t).recoveryRate;
export const ltCost = (t: LeachingTankType) => get(t).ltCost;
export const pressurized = (t: LeachingTankType) => get(t).pressurized;
export const forGold = (t: LeachingTankType) => get(t).forGold;
export const tankConfig = (t: LeachingTankType) => get(t).tankConfig;
export const bestUse = (t: LeachingTankType) => get(t).bestUse;
export const leachingTankTypes = (): LeachingTankType[] =>
  Object.keys(DATA) as LeachingTankType[];
