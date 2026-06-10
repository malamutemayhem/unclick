export type EdgeBurnishType = "wood_slick_hand" | "canvas_roller_wrap" | "cocobolo_multi_groove" | "bone_folder_flat" | "power_drill_mount";

export function polishQuality(t: EdgeBurnishType): number {
  const m: Record<EdgeBurnishType, number> = {
    wood_slick_hand: 8, canvas_roller_wrap: 6, cocobolo_multi_groove: 10, bone_folder_flat: 7, power_drill_mount: 9,
  };
  return m[t];
}

export function speedEfficiency(t: EdgeBurnishType): number {
  const m: Record<EdgeBurnishType, number> = {
    wood_slick_hand: 5, canvas_roller_wrap: 7, cocobolo_multi_groove: 6, bone_folder_flat: 4, power_drill_mount: 10,
  };
  return m[t];
}

export function sizeRange(t: EdgeBurnishType): number {
  const m: Record<EdgeBurnishType, number> = {
    wood_slick_hand: 6, canvas_roller_wrap: 8, cocobolo_multi_groove: 10, bone_folder_flat: 5, power_drill_mount: 7,
  };
  return m[t];
}

export function controlFeel(t: EdgeBurnishType): number {
  const m: Record<EdgeBurnishType, number> = {
    wood_slick_hand: 9, canvas_roller_wrap: 6, cocobolo_multi_groove: 8, bone_folder_flat: 7, power_drill_mount: 5,
  };
  return m[t];
}

export function burnishCost(t: EdgeBurnishType): number {
  const m: Record<EdgeBurnishType, number> = {
    wood_slick_hand: 1, canvas_roller_wrap: 1, cocobolo_multi_groove: 3, bone_folder_flat: 1, power_drill_mount: 2,
  };
  return m[t];
}

export function powered(t: EdgeBurnishType): boolean {
  const m: Record<EdgeBurnishType, boolean> = {
    wood_slick_hand: false, canvas_roller_wrap: false, cocobolo_multi_groove: false, bone_folder_flat: false, power_drill_mount: true,
  };
  return m[t];
}

export function multiGroove(t: EdgeBurnishType): boolean {
  const m: Record<EdgeBurnishType, boolean> = {
    wood_slick_hand: false, canvas_roller_wrap: false, cocobolo_multi_groove: true, bone_folder_flat: false, power_drill_mount: false,
  };
  return m[t];
}

export function toolMaterial(t: EdgeBurnishType): string {
  const m: Record<EdgeBurnishType, string> = {
    wood_slick_hand: "hardwood_smooth_shaped",
    canvas_roller_wrap: "canvas_wrapped_dowel",
    cocobolo_multi_groove: "cocobolo_turned_wood",
    bone_folder_flat: "genuine_bone_flat",
    power_drill_mount: "hardwood_chuck_mount",
  };
  return m[t];
}

export function bestUse(t: EdgeBurnishType): string {
  const m: Record<EdgeBurnishType, string> = {
    wood_slick_hand: "hand_edge_finish",
    canvas_roller_wrap: "rough_edge_prep",
    cocobolo_multi_groove: "multi_weight_edge",
    bone_folder_flat: "fold_crease_smooth",
    power_drill_mount: "production_edge_run",
  };
  return m[t];
}

export function edgeBurnishers(): EdgeBurnishType[] {
  return ["wood_slick_hand", "canvas_roller_wrap", "cocobolo_multi_groove", "bone_folder_flat", "power_drill_mount"];
}
