export type TumbleBlenderType =
  | "double_cone"
  | "v_shell"
  | "bin_blender"
  | "octagonal_blender"
  | "slant_cone";

interface TumbleBlenderData {
  blendUniformity: number;
  throughput: number;
  gentleness: number;
  cleanability: number;
  tbCost: number;
  freefall: boolean;
  forPharma: boolean;
  blenderConfig: string;
  bestUse: string;
}

const DATA: Record<TumbleBlenderType, TumbleBlenderData> = {
  double_cone: {
    blendUniformity: 7, throughput: 7, gentleness: 9, cleanability: 8, tbCost: 5,
    freefall: true, forPharma: true,
    blenderConfig: "double_cone_tumble_blender_two_cone_rotate_gentle_freefall_blend",
    bestUse: "pharma_powder_double_cone_tumble_blender_gentle_fragile_granule",
  },
  v_shell: {
    blendUniformity: 8, throughput: 7, gentleness: 8, cleanability: 7, tbCost: 6,
    freefall: true, forPharma: true,
    blenderConfig: "v_shell_tumble_blender_split_merge_flow_pattern_diffusive_blend",
    bestUse: "tablet_premix_v_shell_tumble_blender_split_merge_even_distribute",
  },
  bin_blender: {
    blendUniformity: 7, throughput: 9, gentleness: 8, cleanability: 10, tbCost: 7,
    freefall: true, forPharma: true,
    blenderConfig: "bin_blender_ibc_tumble_rotate_contain_transfer_no_clean_between",
    bestUse: "multi_batch_bin_blender_ibc_contain_no_transfer_loss_flexible",
  },
  octagonal_blender: {
    blendUniformity: 8, throughput: 8, gentleness: 7, cleanability: 7, tbCost: 6,
    freefall: true, forPharma: true,
    blenderConfig: "octagonal_tumble_blender_eight_side_baffle_internal_intensifier",
    bestUse: "nutraceutical_octagonal_tumble_blender_baffle_intensifier_rapid",
  },
  slant_cone: {
    blendUniformity: 9, throughput: 6, gentleness: 8, cleanability: 7, tbCost: 7,
    freefall: true, forPharma: false,
    blenderConfig: "slant_cone_tumble_blender_asymmetric_cone_three_axis_motion_mix",
    bestUse: "specialty_chem_slant_cone_tumble_blender_three_axis_thorough_mix",
  },
};

function get(t: TumbleBlenderType): TumbleBlenderData {
  return DATA[t];
}

export const blendUniformity = (t: TumbleBlenderType) => get(t).blendUniformity;
export const throughput = (t: TumbleBlenderType) => get(t).throughput;
export const gentleness = (t: TumbleBlenderType) => get(t).gentleness;
export const cleanability = (t: TumbleBlenderType) => get(t).cleanability;
export const tbCost = (t: TumbleBlenderType) => get(t).tbCost;
export const freefall = (t: TumbleBlenderType) => get(t).freefall;
export const forPharma = (t: TumbleBlenderType) => get(t).forPharma;
export const blenderConfig = (t: TumbleBlenderType) => get(t).blenderConfig;
export const bestUse = (t: TumbleBlenderType) => get(t).bestUse;
export const tumbleBlenderTypes = (): TumbleBlenderType[] =>
  Object.keys(DATA) as TumbleBlenderType[];
