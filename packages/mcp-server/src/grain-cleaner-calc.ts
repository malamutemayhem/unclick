export type GrainCleanerType =
  | "air_screen"
  | "destoner_gravity"
  | "disc_separator"
  | "color_sorter"
  | "magnetic_separator";

interface GrainCleanerData {
  cleaningAccuracy: number;
  throughput: number;
  foreignRemoval: number;
  grainLoss: number;
  gcCost: number;
  automated: boolean;
  forWheat: boolean;
  cleanerConfig: string;
  bestUse: string;
}

const DATA: Record<GrainCleanerType, GrainCleanerData> = {
  air_screen: {
    cleaningAccuracy: 8, throughput: 9, foreignRemoval: 8, grainLoss: 8, gcCost: 6,
    automated: true, forWheat: true,
    cleanerConfig: "air_screen_grain_cleaner_aspiration_sieve_remove_light_oversize",
    bestUse: "flour_mill_intake_air_screen_cleaner_remove_chaff_straw_dust",
  },
  destoner_gravity: {
    cleaningAccuracy: 9, throughput: 8, foreignRemoval: 10, grainLoss: 9, gcCost: 7,
    automated: true, forWheat: true,
    cleanerConfig: "destoner_gravity_grain_cleaner_vibrating_deck_stratify_remove_stone",
    bestUse: "grain_processing_destoner_remove_stones_glass_metal_heavy_foreign",
  },
  disc_separator: {
    cleaningAccuracy: 9, throughput: 7, foreignRemoval: 9, grainLoss: 9, gcCost: 8,
    automated: true, forWheat: true,
    cleanerConfig: "disc_separator_grain_cleaner_indent_pocket_sort_by_length",
    bestUse: "seed_processing_disc_separator_remove_long_short_foreign_seeds",
  },
  color_sorter: {
    cleaningAccuracy: 10, throughput: 8, foreignRemoval: 10, grainLoss: 10, gcCost: 10,
    automated: true, forWheat: false,
    cleanerConfig: "color_sorter_grain_cleaner_optical_camera_air_jet_reject_defect",
    bestUse: "premium_grain_color_sorter_optical_reject_discolored_contaminated",
  },
  magnetic_separator: {
    cleaningAccuracy: 7, throughput: 10, foreignRemoval: 7, grainLoss: 10, gcCost: 5,
    automated: true, forWheat: true,
    cleanerConfig: "magnetic_separator_grain_cleaner_rare_earth_magnet_remove_metal",
    bestUse: "grain_intake_magnetic_separator_remove_ferrous_metal_contaminant",
  },
};

function get(t: GrainCleanerType): GrainCleanerData {
  return DATA[t];
}

export const cleaningAccuracy = (t: GrainCleanerType) => get(t).cleaningAccuracy;
export const throughput = (t: GrainCleanerType) => get(t).throughput;
export const foreignRemoval = (t: GrainCleanerType) => get(t).foreignRemoval;
export const grainLoss = (t: GrainCleanerType) => get(t).grainLoss;
export const gcCost = (t: GrainCleanerType) => get(t).gcCost;
export const automated = (t: GrainCleanerType) => get(t).automated;
export const forWheat = (t: GrainCleanerType) => get(t).forWheat;
export const cleanerConfig = (t: GrainCleanerType) => get(t).cleanerConfig;
export const bestUse = (t: GrainCleanerType) => get(t).bestUse;
export const grainCleanerTypes = (): GrainCleanerType[] =>
  Object.keys(DATA) as GrainCleanerType[];
