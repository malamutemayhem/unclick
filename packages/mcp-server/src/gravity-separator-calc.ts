export type GravitySeparatorType =
  | "shaking_table"
  | "spiral_concentrator"
  | "jig_separator"
  | "centrifugal_bowl"
  | "dense_media";

interface GravitySeparatorData {
  separationAccuracy: number;
  throughput: number;
  recoveryRate: number;
  waterUsage: number;
  gsCost: number;
  continuous: boolean;
  forFinePart: boolean;
  separatorConfig: string;
  bestUse: string;
}

const DATA: Record<GravitySeparatorType, GravitySeparatorData> = {
  shaking_table: {
    separationAccuracy: 10, throughput: 4, recoveryRate: 9, waterUsage: 6, gsCost: 4,
    continuous: true, forFinePart: true,
    separatorConfig: "shaking_table_gravity_separator_riffle_deck_oscillate_stratify",
    bestUse: "tin_tungsten_shaking_table_fine_particle_gravity_concentrate",
  },
  spiral_concentrator: {
    separationAccuracy: 7, throughput: 8, recoveryRate: 7, waterUsage: 7, gsCost: 5,
    continuous: true, forFinePart: false,
    separatorConfig: "spiral_concentrator_helical_trough_gravity_flow_density_split",
    bestUse: "mineral_sands_spiral_concentrator_ilmenite_rutile_zircon_beach",
  },
  jig_separator: {
    separationAccuracy: 7, throughput: 9, recoveryRate: 8, waterUsage: 8, gsCost: 6,
    continuous: true, forFinePart: false,
    separatorConfig: "jig_separator_pulsating_water_stratify_heavy_light_separate",
    bestUse: "coal_wash_plant_jig_separator_density_stratify_clean_coal",
  },
  centrifugal_bowl: {
    separationAccuracy: 9, throughput: 6, recoveryRate: 10, waterUsage: 5, gsCost: 8,
    continuous: false, forFinePart: true,
    separatorConfig: "centrifugal_bowl_gravity_separator_high_g_force_fine_gold_trap",
    bestUse: "fine_gold_recovery_centrifugal_bowl_knelson_falcon_concentrate",
  },
  dense_media: {
    separationAccuracy: 8, throughput: 10, recoveryRate: 9, waterUsage: 7, gsCost: 9,
    continuous: true, forFinePart: false,
    separatorConfig: "dense_media_separator_ferrosilicon_slurry_sink_float_split",
    bestUse: "diamond_coal_dense_media_separator_sink_float_high_capacity",
  },
};

function get(t: GravitySeparatorType): GravitySeparatorData {
  return DATA[t];
}

export const separationAccuracy = (t: GravitySeparatorType) => get(t).separationAccuracy;
export const throughput = (t: GravitySeparatorType) => get(t).throughput;
export const recoveryRate = (t: GravitySeparatorType) => get(t).recoveryRate;
export const waterUsage = (t: GravitySeparatorType) => get(t).waterUsage;
export const gsCost = (t: GravitySeparatorType) => get(t).gsCost;
export const continuous = (t: GravitySeparatorType) => get(t).continuous;
export const forFinePart = (t: GravitySeparatorType) => get(t).forFinePart;
export const separatorConfig = (t: GravitySeparatorType) => get(t).separatorConfig;
export const bestUse = (t: GravitySeparatorType) => get(t).bestUse;
export const gravitySeparatorTypes = (): GravitySeparatorType[] =>
  Object.keys(DATA) as GravitySeparatorType[];
