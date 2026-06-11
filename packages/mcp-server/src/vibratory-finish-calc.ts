export type VibratoryFinishType =
  | "round_bowl_vib"
  | "tub_trough_vib"
  | "centrifugal_disc"
  | "centrifugal_barrel"
  | "linear_flow_vib";

interface VibratoryFinishData {
  finishQuality: number;
  throughput: number;
  mediaRange: number;
  partGentleness: number;
  vfCost_: number;
  continuous: boolean;
  forDeburr: boolean;
  finishConfig: string;
  bestUse: string;
}

const DATA: Record<VibratoryFinishType, VibratoryFinishData> = {
  round_bowl_vib: {
    finishQuality: 7, throughput: 8, mediaRange: 8, partGentleness: 7, vfCost_: 4,
    continuous: false, forDeburr: true,
    finishConfig: "round_bowl_vibratory_finisher_spiral_flow_separate_screen_batch",
    bestUse: "general_deburr_round_bowl_vibratory_finisher_batch_versatile_easy",
  },
  tub_trough_vib: {
    finishQuality: 7, throughput: 9, mediaRange: 9, partGentleness: 6, vfCost_: 5,
    continuous: true, forDeburr: true,
    finishConfig: "tub_trough_vibratory_finisher_linear_flow_large_part_unload_end",
    bestUse: "large_part_tub_trough_vibratory_finisher_long_part_through_feed",
  },
  centrifugal_disc: {
    finishQuality: 9, throughput: 10, mediaRange: 7, partGentleness: 8, vfCost_: 7,
    continuous: false, forDeburr: true,
    finishConfig: "centrifugal_disc_finisher_high_speed_rotate_fast_cut_short_cycle",
    bestUse: "high_volume_centrifugal_disc_finisher_fast_cycle_precision_deburr",
  },
  centrifugal_barrel: {
    finishQuality: 10, throughput: 7, mediaRange: 6, partGentleness: 5, vfCost_: 8,
    continuous: false, forDeburr: false,
    finishConfig: "centrifugal_barrel_finisher_turret_rotate_high_force_super_finish",
    bestUse: "jewelry_centrifugal_barrel_finisher_high_energy_mirror_polish",
  },
  linear_flow_vib: {
    finishQuality: 6, throughput: 9, mediaRange: 8, partGentleness: 9, vfCost_: 5,
    continuous: true, forDeburr: true,
    finishConfig: "linear_flow_vibratory_finisher_straight_path_gentle_fragile_part",
    bestUse: "electronics_linear_flow_vibratory_finisher_gentle_fragile_deflash",
  },
};

function get(t: VibratoryFinishType): VibratoryFinishData {
  return DATA[t];
}

export const finishQuality = (t: VibratoryFinishType) => get(t).finishQuality;
export const throughput = (t: VibratoryFinishType) => get(t).throughput;
export const mediaRange = (t: VibratoryFinishType) => get(t).mediaRange;
export const partGentleness = (t: VibratoryFinishType) => get(t).partGentleness;
export const vfCost_ = (t: VibratoryFinishType) => get(t).vfCost_;
export const continuous = (t: VibratoryFinishType) => get(t).continuous;
export const forDeburr = (t: VibratoryFinishType) => get(t).forDeburr;
export const finishConfig = (t: VibratoryFinishType) => get(t).finishConfig;
export const bestUse = (t: VibratoryFinishType) => get(t).bestUse;
export const vibratoryFinishTypes = (): VibratoryFinishType[] =>
  Object.keys(DATA) as VibratoryFinishType[];
