export type SizingMachineType =
  | "single_end"
  | "slasher_sizer"
  | "hot_melt"
  | "foam_sizer"
  | "pre_wet_sizer";

interface SizingMachineData {
  sizePickup: number;
  throughput: number;
  dryingEfficiency: number;
  yarnStrength: number;
  smCost: number;
  waterBased: boolean;
  forCotton: boolean;
  sizerConfig: string;
  bestUse: string;
}

const DATA: Record<SizingMachineType, SizingMachineData> = {
  single_end: {
    sizePickup: 10, throughput: 4, dryingEfficiency: 7, yarnStrength: 10, smCost: 6,
    waterBased: true, forCotton: true,
    sizerConfig: "single_end_sizing_machine_individual_yarn_precise_coat_dry_wind",
    bestUse: "specialty_yarn_single_end_sizer_precise_individual_sizing_warp",
  },
  slasher_sizer: {
    sizePickup: 8, throughput: 10, dryingEfficiency: 7, yarnStrength: 8, smCost: 7,
    waterBased: true, forCotton: true,
    sizerConfig: "slasher_sizer_machine_sheet_dip_squeeze_multi_cylinder_dry",
    bestUse: "cotton_mill_slasher_sizer_high_speed_sheet_sizing_standard_warp",
  },
  hot_melt: {
    sizePickup: 7, throughput: 8, dryingEfficiency: 10, yarnStrength: 7, smCost: 9,
    waterBased: false, forCotton: false,
    sizerConfig: "hot_melt_sizing_machine_thermoplastic_coat_no_water_instant_set",
    bestUse: "synthetic_yarn_hot_melt_sizer_no_drying_instant_set_efficient",
  },
  foam_sizer: {
    sizePickup: 7, throughput: 9, dryingEfficiency: 9, yarnStrength: 7, smCost: 8,
    waterBased: true, forCotton: true,
    sizerConfig: "foam_sizer_machine_foamed_starch_apply_low_wet_pickup_fast_dry",
    bestUse: "modern_cotton_mill_foam_sizer_low_wet_pickup_energy_saving_dry",
  },
  pre_wet_sizer: {
    sizePickup: 9, throughput: 7, dryingEfficiency: 6, yarnStrength: 9, smCost: 7,
    waterBased: true, forCotton: true,
    sizerConfig: "pre_wet_sizer_machine_water_soak_then_size_deep_penetrate_coat",
    bestUse: "heavy_cotton_pre_wet_sizer_deep_size_penetration_strong_warp",
  },
};

function get(t: SizingMachineType): SizingMachineData {
  return DATA[t];
}

export const sizePickup = (t: SizingMachineType) => get(t).sizePickup;
export const throughput = (t: SizingMachineType) => get(t).throughput;
export const dryingEfficiency = (t: SizingMachineType) => get(t).dryingEfficiency;
export const yarnStrength = (t: SizingMachineType) => get(t).yarnStrength;
export const smCost = (t: SizingMachineType) => get(t).smCost;
export const waterBased = (t: SizingMachineType) => get(t).waterBased;
export const forCotton = (t: SizingMachineType) => get(t).forCotton;
export const sizerConfig = (t: SizingMachineType) => get(t).sizerConfig;
export const bestUse = (t: SizingMachineType) => get(t).bestUse;
export const sizingMachineTypes = (): SizingMachineType[] =>
  Object.keys(DATA) as SizingMachineType[];
