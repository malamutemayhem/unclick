export type CreamSeparatorType =
  | "gravity_settling"
  | "disc_stack_centrifuge"
  | "hermetic_centrifuge"
  | "bactofuge"
  | "cold_separation";

interface CreamSeparatorData {
  separationEfficiency: number;
  fatAccuracy: number;
  throughput: number;
  bacteriaRemoval: number;
  csCost_: number;
  selfCleaning: boolean;
  forButter: boolean;
  separatorConfig: string;
  bestUse: string;
}

const DATA: Record<CreamSeparatorType, CreamSeparatorData> = {
  gravity_settling: {
    separationEfficiency: 4, fatAccuracy: 3, throughput: 2, bacteriaRemoval: 2, csCost_: 2,
    selfCleaning: false, forButter: true,
    separatorConfig: "gravity_settling_cream_separator_pan_skim_traditional_farmstead",
    bestUse: "farmstead_dairy_gravity_settling_pan_skim_traditional_cream_butter",
  },
  disc_stack_centrifuge: {
    separationEfficiency: 9, fatAccuracy: 9, throughput: 9, bacteriaRemoval: 7, csCost_: 7,
    selfCleaning: true, forButter: true,
    separatorConfig: "disc_stack_centrifuge_cream_separator_bowl_disc_standardize_fat",
    bestUse: "commercial_dairy_disc_stack_centrifuge_precise_fat_standardize",
  },
  hermetic_centrifuge: {
    separationEfficiency: 10, fatAccuracy: 10, throughput: 10, bacteriaRemoval: 8, csCost_: 9,
    selfCleaning: true, forButter: true,
    separatorConfig: "hermetic_centrifuge_cream_separator_sealed_no_air_foam_free_fat",
    bestUse: "large_dairy_hermetic_centrifuge_air_free_foam_free_fat_precision",
  },
  bactofuge: {
    separationEfficiency: 8, fatAccuracy: 7, throughput: 8, bacteriaRemoval: 10, csCost_: 8,
    selfCleaning: true, forButter: false,
    separatorConfig: "bactofuge_bacteria_removal_centrifuge_spore_separate_clean_milk",
    bestUse: "uht_esl_dairy_bactofuge_bacteria_spore_removal_extended_shelf_life",
  },
  cold_separation: {
    separationEfficiency: 7, fatAccuracy: 8, throughput: 6, bacteriaRemoval: 5, csCost_: 6,
    selfCleaning: false, forButter: true,
    separatorConfig: "cold_separation_cream_low_temp_centrifuge_raw_milk_preserve_enzyme",
    bestUse: "raw_milk_dairy_cold_separation_low_temp_preserve_enzyme_flavor",
  },
};

function get(t: CreamSeparatorType): CreamSeparatorData {
  return DATA[t];
}

export const separationEfficiency = (t: CreamSeparatorType) => get(t).separationEfficiency;
export const fatAccuracy = (t: CreamSeparatorType) => get(t).fatAccuracy;
export const throughput = (t: CreamSeparatorType) => get(t).throughput;
export const bacteriaRemoval = (t: CreamSeparatorType) => get(t).bacteriaRemoval;
export const csCost_ = (t: CreamSeparatorType) => get(t).csCost_;
export const selfCleaning = (t: CreamSeparatorType) => get(t).selfCleaning;
export const forButter = (t: CreamSeparatorType) => get(t).forButter;
export const separatorConfig = (t: CreamSeparatorType) => get(t).separatorConfig;
export const bestUse = (t: CreamSeparatorType) => get(t).bestUse;
export const creamSeparatorTypes = (): CreamSeparatorType[] =>
  Object.keys(DATA) as CreamSeparatorType[];
