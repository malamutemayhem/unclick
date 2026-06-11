export type SplittingMachineType =
  | "band_knife_split"
  | "roller_split"
  | "screw_adjust"
  | "hydraulic_auto"
  | "wet_blue_split";

interface SplittingMachineData {
  splitAccuracy: number;
  throughput: number;
  surfaceQuality: number;
  thicknessRange: number;
  smCost: number;
  automated: boolean;
  forGrain: boolean;
  machineConfig: string;
  bestUse: string;
}

const DATA: Record<SplittingMachineType, SplittingMachineData> = {
  band_knife_split: {
    splitAccuracy: 9, throughput: 8, surfaceQuality: 9, thicknessRange: 9, smCost: 7,
    automated: true, forGrain: true,
    machineConfig: "band_knife_splitting_machine_endless_blade_precise_thickness_cut",
    bestUse: "standard_tannery_band_knife_splitter_grain_split_precise_thickness",
  },
  roller_split: {
    splitAccuracy: 8, throughput: 10, surfaceQuality: 7, thicknessRange: 7, smCost: 6,
    automated: true, forGrain: true,
    machineConfig: "roller_splitting_machine_feed_roller_blade_continuous_high_speed",
    bestUse: "high_volume_tannery_roller_splitter_continuous_fast_cattle_hide",
  },
  screw_adjust: {
    splitAccuracy: 7, throughput: 7, surfaceQuality: 8, thicknessRange: 8, smCost: 5,
    automated: false, forGrain: true,
    machineConfig: "screw_adjust_splitting_machine_manual_gap_set_blade_depth_control",
    bestUse: "mid_size_tannery_screw_adjust_splitter_manual_gap_versatile_hide",
  },
  hydraulic_auto: {
    splitAccuracy: 10, throughput: 9, surfaceQuality: 10, thicknessRange: 10, smCost: 10,
    automated: true, forGrain: true,
    machineConfig: "hydraulic_auto_splitting_machine_servo_gap_laser_measure_precise",
    bestUse: "premium_tannery_hydraulic_auto_splitter_laser_measure_servo_precise",
  },
  wet_blue_split: {
    splitAccuracy: 8, throughput: 9, surfaceQuality: 7, thicknessRange: 8, smCost: 7,
    automated: true, forGrain: false,
    machineConfig: "wet_blue_splitting_machine_chrome_tanned_hide_split_before_shave",
    bestUse: "chrome_tannery_wet_blue_splitter_post_tan_split_before_retan_dye",
  },
};

function get(t: SplittingMachineType): SplittingMachineData {
  return DATA[t];
}

export const splitAccuracy = (t: SplittingMachineType) => get(t).splitAccuracy;
export const throughput = (t: SplittingMachineType) => get(t).throughput;
export const surfaceQuality = (t: SplittingMachineType) => get(t).surfaceQuality;
export const thicknessRange = (t: SplittingMachineType) => get(t).thicknessRange;
export const smCost = (t: SplittingMachineType) => get(t).smCost;
export const automated = (t: SplittingMachineType) => get(t).automated;
export const forGrain = (t: SplittingMachineType) => get(t).forGrain;
export const machineConfig = (t: SplittingMachineType) => get(t).machineConfig;
export const bestUse = (t: SplittingMachineType) => get(t).bestUse;
export const splittingMachineTypes = (): SplittingMachineType[] =>
  Object.keys(DATA) as SplittingMachineType[];
