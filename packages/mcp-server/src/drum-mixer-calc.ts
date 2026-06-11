export type DrumMixerType =
  | "rotating_drum_batch"
  | "double_cone_blend"
  | "v_blender_tumble"
  | "bin_blender_ibc"
  | "continuous_drum_flow";

interface DrumMixerData {
  blendUniformity: number;
  gentleness: number;
  scaleUp: number;
  cleanability: number;
  dmCost: number;
  continuous: boolean;
  forPowder: boolean;
  geometry: string;
  bestUse: string;
}

const DATA: Record<DrumMixerType, DrumMixerData> = {
  rotating_drum_batch: {
    blendUniformity: 7, gentleness: 9, scaleUp: 8, cleanability: 6, dmCost: 4,
    continuous: false, forPowder: true,
    geometry: "horizontal_cylinder_rotation_tumble_blend",
    bestUse: "mineral_powder_fertilizer_gentle_batch_mix",
  },
  double_cone_blend: {
    blendUniformity: 8, gentleness: 10, scaleUp: 9, cleanability: 9, dmCost: 6,
    continuous: false, forPowder: true,
    geometry: "double_cone_symmetric_tumble_no_dead_zone",
    bestUse: "pharma_powder_blend_fragile_granule_uniform",
  },
  v_blender_tumble: {
    blendUniformity: 9, gentleness: 9, scaleUp: 7, cleanability: 8, dmCost: 5,
    continuous: false, forPowder: true,
    geometry: "v_shape_shell_split_recombine_tumble_blend",
    bestUse: "pharma_dry_powder_blend_free_flowing_material",
  },
  bin_blender_ibc: {
    blendUniformity: 7, gentleness: 10, scaleUp: 10, cleanability: 10, dmCost: 7,
    continuous: false, forPowder: true,
    geometry: "ibc_container_tumble_on_frame_no_transfer",
    bestUse: "gmp_pharma_contained_blend_no_cross_contam",
  },
  continuous_drum_flow: {
    blendUniformity: 6, gentleness: 7, scaleUp: 9, cleanability: 5, dmCost: 5,
    continuous: true, forPowder: false,
    geometry: "inclined_rotating_drum_continuous_through",
    bestUse: "aggregate_coating_seed_treatment_continuous",
  },
};

function get(t: DrumMixerType): DrumMixerData {
  return DATA[t];
}

export const blendUniformity = (t: DrumMixerType) => get(t).blendUniformity;
export const gentleness = (t: DrumMixerType) => get(t).gentleness;
export const scaleUp = (t: DrumMixerType) => get(t).scaleUp;
export const cleanability = (t: DrumMixerType) => get(t).cleanability;
export const dmCost = (t: DrumMixerType) => get(t).dmCost;
export const continuous = (t: DrumMixerType) => get(t).continuous;
export const forPowder = (t: DrumMixerType) => get(t).forPowder;
export const geometry = (t: DrumMixerType) => get(t).geometry;
export const bestUse = (t: DrumMixerType) => get(t).bestUse;
export const drumMixerTypes = (): DrumMixerType[] =>
  Object.keys(DATA) as DrumMixerType[];
