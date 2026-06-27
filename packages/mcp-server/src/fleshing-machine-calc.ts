export type FleshingMachineType =
  | "rotary_blade"
  | "spiral_blade"
  | "cylinder_knife"
  | "band_knife"
  | "manual_beam";

interface FleshingMachineData {
  fleshRemoval: number;
  hideDamage: number;
  throughput: number;
  thicknessControl: number;
  fmCost: number;
  automated: boolean;
  forHeavy: boolean;
  machineConfig: string;
  bestUse: string;
}

const DATA: Record<FleshingMachineType, FleshingMachineData> = {
  rotary_blade: {
    fleshRemoval: 9, hideDamage: 7, throughput: 9, thicknessControl: 7, fmCost: 7,
    automated: true, forHeavy: true,
    machineConfig: "rotary_blade_fleshing_machine_spinning_cylinder_knife_auto_feed",
    bestUse: "commercial_tannery_rotary_blade_fleshing_high_volume_cattle_hide",
  },
  spiral_blade: {
    fleshRemoval: 10, hideDamage: 6, throughput: 10, thicknessControl: 8, fmCost: 9,
    automated: true, forHeavy: true,
    machineConfig: "spiral_blade_fleshing_machine_helical_knife_continuous_feed_even",
    bestUse: "large_tannery_spiral_blade_fleshing_continuous_even_cut_high_speed",
  },
  cylinder_knife: {
    fleshRemoval: 8, hideDamage: 8, throughput: 7, thicknessControl: 9, fmCost: 6,
    automated: true, forHeavy: false,
    machineConfig: "cylinder_knife_fleshing_machine_adjustable_gap_precise_depth_cut",
    bestUse: "quality_tannery_cylinder_knife_fleshing_precise_depth_sheep_goat",
  },
  band_knife: {
    fleshRemoval: 7, hideDamage: 9, throughput: 6, thicknessControl: 10, fmCost: 8,
    automated: true, forHeavy: false,
    machineConfig: "band_knife_fleshing_machine_endless_blade_loop_fine_thickness_split",
    bestUse: "specialty_leather_band_knife_fleshing_fine_thickness_exotic_skin",
  },
  manual_beam: {
    fleshRemoval: 5, hideDamage: 10, throughput: 2, thicknessControl: 5, fmCost: 2,
    automated: false, forHeavy: false,
    machineConfig: "manual_beam_fleshing_wooden_beam_hand_knife_traditional_artisan",
    bestUse: "artisan_tanner_manual_beam_fleshing_hand_knife_small_batch_craft",
  },
};

function get(t: FleshingMachineType): FleshingMachineData {
  return DATA[t];
}

export const fleshRemoval = (t: FleshingMachineType) => get(t).fleshRemoval;
export const hideDamage = (t: FleshingMachineType) => get(t).hideDamage;
export const throughput = (t: FleshingMachineType) => get(t).throughput;
export const thicknessControl = (t: FleshingMachineType) => get(t).thicknessControl;
export const fmCost = (t: FleshingMachineType) => get(t).fmCost;
export const automated = (t: FleshingMachineType) => get(t).automated;
export const forHeavy = (t: FleshingMachineType) => get(t).forHeavy;
export const machineConfig = (t: FleshingMachineType) => get(t).machineConfig;
export const bestUse = (t: FleshingMachineType) => get(t).bestUse;
export const fleshingMachineTypes = (): FleshingMachineType[] =>
  Object.keys(DATA) as FleshingMachineType[];
