export type MilkClarifierType =
  | "disc_centrifugal"
  | "self_desludging"
  | "hermetic_clarifier"
  | "cold_clarifier"
  | "inline_filter";

interface MilkClarifierData {
  particleRemoval: number;
  throughput: number;
  somaticCellReduction: number;
  milkQuality: number;
  mcCost: number;
  continuous: boolean;
  forRaw: boolean;
  clarifierConfig: string;
  bestUse: string;
}

const DATA: Record<MilkClarifierType, MilkClarifierData> = {
  disc_centrifugal: {
    particleRemoval: 8, throughput: 9, somaticCellReduction: 7, milkQuality: 8, mcCost: 6,
    continuous: true, forRaw: true,
    clarifierConfig: "disc_centrifugal_milk_clarifier_bowl_disc_sediment_remove_clean",
    bestUse: "standard_dairy_disc_centrifugal_clarifier_sediment_somatic_remove",
  },
  self_desludging: {
    particleRemoval: 9, throughput: 10, somaticCellReduction: 8, milkQuality: 9, mcCost: 8,
    continuous: true, forRaw: true,
    clarifierConfig: "self_desludging_milk_clarifier_auto_eject_sludge_continuous_clean",
    bestUse: "large_dairy_self_desludging_clarifier_auto_eject_continuous_run",
  },
  hermetic_clarifier: {
    particleRemoval: 10, throughput: 9, somaticCellReduction: 9, milkQuality: 10, mcCost: 9,
    continuous: true, forRaw: true,
    clarifierConfig: "hermetic_milk_clarifier_sealed_air_free_no_foam_gentle_quality",
    bestUse: "premium_dairy_hermetic_clarifier_air_free_gentle_maximum_quality",
  },
  cold_clarifier: {
    particleRemoval: 7, throughput: 7, somaticCellReduction: 6, milkQuality: 8, mcCost: 7,
    continuous: true, forRaw: true,
    clarifierConfig: "cold_clarifier_low_temp_raw_milk_preserve_enzyme_flavor_profile",
    bestUse: "raw_milk_dairy_cold_clarifier_low_temp_preserve_natural_enzyme",
  },
  inline_filter: {
    particleRemoval: 5, throughput: 8, somaticCellReduction: 3, milkQuality: 6, mcCost: 3,
    continuous: true, forRaw: false,
    clarifierConfig: "inline_filter_milk_screen_mesh_large_particle_debris_pre_filter",
    bestUse: "small_dairy_inline_filter_pre_clarification_screen_debris_remove",
  },
};

function get(t: MilkClarifierType): MilkClarifierData {
  return DATA[t];
}

export const particleRemoval = (t: MilkClarifierType) => get(t).particleRemoval;
export const throughput = (t: MilkClarifierType) => get(t).throughput;
export const somaticCellReduction = (t: MilkClarifierType) => get(t).somaticCellReduction;
export const milkQuality = (t: MilkClarifierType) => get(t).milkQuality;
export const mcCost = (t: MilkClarifierType) => get(t).mcCost;
export const continuous = (t: MilkClarifierType) => get(t).continuous;
export const forRaw = (t: MilkClarifierType) => get(t).forRaw;
export const clarifierConfig = (t: MilkClarifierType) => get(t).clarifierConfig;
export const bestUse = (t: MilkClarifierType) => get(t).bestUse;
export const milkClarifierTypes = (): MilkClarifierType[] =>
  Object.keys(DATA) as MilkClarifierType[];
