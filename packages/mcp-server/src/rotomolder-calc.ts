export type RotomolderType =
  | "biaxial_rock_roll"
  | "clamshell_shuttle"
  | "carousel_multi_arm"
  | "swing_arm"
  | "open_flame_direct";

interface RotomolderData {
  moldSpeed: number;
  wallThickness: number;
  partSize: number;
  surfaceFinish: number;
  rmCost: number;
  multiLayer: boolean;
  forTank: boolean;
  molderConfig: string;
  bestUse: string;
}

const DATA: Record<RotomolderType, RotomolderData> = {
  biaxial_rock_roll: {
    moldSpeed: 7, wallThickness: 8, partSize: 9, surfaceFinish: 7, rmCost: 7,
    multiLayer: true, forTank: true,
    molderConfig: "biaxial_rotation_oven_rock_roll_two_axis_uniform_wall_hollow",
    bestUse: "large_tank_kayak_playground_equipment_biaxial_hollow_rotation",
  },
  clamshell_shuttle: {
    moldSpeed: 8, wallThickness: 7, partSize: 8, surfaceFinish: 8, rmCost: 6,
    multiLayer: false, forTank: true,
    molderConfig: "clamshell_oven_shuttle_mold_in_out_quick_change_medium_part",
    bestUse: "medium_tank_container_pallet_clamshell_shuttle_quick_changeover",
  },
  carousel_multi_arm: {
    moldSpeed: 10, wallThickness: 8, partSize: 9, surfaceFinish: 8, rmCost: 9,
    multiLayer: true, forTank: true,
    molderConfig: "multi_arm_carousel_continuous_rotation_station_high_throughput",
    bestUse: "high_volume_tank_bin_barrel_carousel_continuous_production_run",
  },
  swing_arm: {
    moldSpeed: 6, wallThickness: 9, partSize: 7, surfaceFinish: 7, rmCost: 5,
    multiLayer: false, forTank: false,
    molderConfig: "swing_arm_single_station_open_flame_simple_part_low_volume",
    bestUse: "low_volume_custom_part_prototype_swing_arm_simple_setup_flex",
  },
  open_flame_direct: {
    moldSpeed: 5, wallThickness: 6, partSize: 6, surfaceFinish: 5, rmCost: 4,
    multiLayer: false, forTank: false,
    molderConfig: "open_flame_direct_heat_simple_mold_manual_rotation_basic_part",
    bestUse: "basic_hollow_part_small_batch_open_flame_manual_low_cost_entry",
  },
};

function get(t: RotomolderType): RotomolderData {
  return DATA[t];
}

export const moldSpeed = (t: RotomolderType) => get(t).moldSpeed;
export const wallThickness = (t: RotomolderType) => get(t).wallThickness;
export const partSize = (t: RotomolderType) => get(t).partSize;
export const surfaceFinish = (t: RotomolderType) => get(t).surfaceFinish;
export const rmCost = (t: RotomolderType) => get(t).rmCost;
export const multiLayer = (t: RotomolderType) => get(t).multiLayer;
export const forTank = (t: RotomolderType) => get(t).forTank;
export const molderConfig = (t: RotomolderType) => get(t).molderConfig;
export const bestUse = (t: RotomolderType) => get(t).bestUse;
export const rotomolderTypes = (): RotomolderType[] =>
  Object.keys(DATA) as RotomolderType[];
