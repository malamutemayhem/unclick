export type OreWasherType =
  | "log_washer"
  | "trommel_scrubber"
  | "attrition_scrubber"
  | "spiral_washer"
  | "bucket_wheel";

interface OreWasherData {
  cleaningEfficiency: number;
  throughput: number;
  clayRemoval: number;
  waterUsage: number;
  owCost: number;
  heavy: boolean;
  forAlluvial: boolean;
  washerConfig: string;
  bestUse: string;
}

const DATA: Record<OreWasherType, OreWasherData> = {
  log_washer: {
    cleaningEfficiency: 9, throughput: 8, clayRemoval: 10, waterUsage: 7, owCost: 7,
    heavy: true, forAlluvial: true,
    washerConfig: "log_washer_twin_shaft_paddle_heavy_scrub_clay_break_rinse",
    bestUse: "aggregate_log_washer_heavy_clay_removal_gravel_sand_wash_plant",
  },
  trommel_scrubber: {
    cleaningEfficiency: 8, throughput: 9, clayRemoval: 8, waterUsage: 6, owCost: 6,
    heavy: true, forAlluvial: true,
    washerConfig: "trommel_scrubber_rotating_drum_screen_wash_size_separate_ore",
    bestUse: "alluvial_gold_trommel_scrubber_wash_screen_classify_placer",
  },
  attrition_scrubber: {
    cleaningEfficiency: 10, throughput: 6, clayRemoval: 9, waterUsage: 5, owCost: 8,
    heavy: false, forAlluvial: false,
    washerConfig: "attrition_scrubber_high_density_impeller_particle_on_particle",
    bestUse: "silica_sand_attrition_scrubber_surface_cleaning_iron_stain",
  },
  spiral_washer: {
    cleaningEfficiency: 7, throughput: 8, clayRemoval: 7, waterUsage: 8, owCost: 5,
    heavy: false, forAlluvial: true,
    washerConfig: "spiral_washer_inclined_trough_screw_conveyor_rinse_dewater_ore",
    bestUse: "sand_gravel_spiral_washer_continuous_rinse_dewater_classify",
  },
  bucket_wheel: {
    cleaningEfficiency: 7, throughput: 10, clayRemoval: 6, waterUsage: 9, owCost: 9,
    heavy: true, forAlluvial: true,
    washerConfig: "bucket_wheel_washer_rotating_wheel_scoop_rinse_dewater_sand",
    bestUse: "large_sand_plant_bucket_wheel_washer_high_volume_continuous",
  },
};

function get(t: OreWasherType): OreWasherData {
  return DATA[t];
}

export const cleaningEfficiency = (t: OreWasherType) => get(t).cleaningEfficiency;
export const throughput = (t: OreWasherType) => get(t).throughput;
export const clayRemoval = (t: OreWasherType) => get(t).clayRemoval;
export const waterUsage = (t: OreWasherType) => get(t).waterUsage;
export const owCost = (t: OreWasherType) => get(t).owCost;
export const heavy = (t: OreWasherType) => get(t).heavy;
export const forAlluvial = (t: OreWasherType) => get(t).forAlluvial;
export const washerConfig = (t: OreWasherType) => get(t).washerConfig;
export const bestUse = (t: OreWasherType) => get(t).bestUse;
export const oreWasherTypes = (): OreWasherType[] =>
  Object.keys(DATA) as OreWasherType[];
