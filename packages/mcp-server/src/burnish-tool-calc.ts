export type BurnishToolType = "wood_slicker_round" | "canvas_cloth_manual" | "cocobolo_multi_groove" | "power_dremel_wheel" | "bone_folder_flat";

export function edgeGloss(t: BurnishToolType): number {
  const m: Record<BurnishToolType, number> = {
    wood_slicker_round: 8, canvas_cloth_manual: 6, cocobolo_multi_groove: 10, power_dremel_wheel: 9, bone_folder_flat: 7,
  };
  return m[t];
}

export function speedOutput(t: BurnishToolType): number {
  const m: Record<BurnishToolType, number> = {
    wood_slicker_round: 6, canvas_cloth_manual: 4, cocobolo_multi_groove: 7, power_dremel_wheel: 10, bone_folder_flat: 5,
  };
  return m[t];
}

export function controlFeel(t: BurnishToolType): number {
  const m: Record<BurnishToolType, number> = {
    wood_slicker_round: 9, canvas_cloth_manual: 10, cocobolo_multi_groove: 9, power_dremel_wheel: 6, bone_folder_flat: 8,
  };
  return m[t];
}

export function edgeProfile(t: BurnishToolType): number {
  const m: Record<BurnishToolType, number> = {
    wood_slicker_round: 7, canvas_cloth_manual: 5, cocobolo_multi_groove: 10, power_dremel_wheel: 6, bone_folder_flat: 4,
  };
  return m[t];
}

export function toolCost(t: BurnishToolType): number {
  const m: Record<BurnishToolType, number> = {
    wood_slicker_round: 1, canvas_cloth_manual: 1, cocobolo_multi_groove: 3, power_dremel_wheel: 3, bone_folder_flat: 1,
  };
  return m[t];
}

export function needsPower(t: BurnishToolType): boolean {
  const m: Record<BurnishToolType, boolean> = {
    wood_slicker_round: false, canvas_cloth_manual: false, cocobolo_multi_groove: false, power_dremel_wheel: true, bone_folder_flat: false,
  };
  return m[t];
}

export function multiGroove(t: BurnishToolType): boolean {
  const m: Record<BurnishToolType, boolean> = {
    wood_slicker_round: false, canvas_cloth_manual: false, cocobolo_multi_groove: true, power_dremel_wheel: false, bone_folder_flat: false,
  };
  return m[t];
}

export function surfaceMaterial(t: BurnishToolType): string {
  const m: Record<BurnishToolType, string> = {
    wood_slicker_round: "hardwood_smooth_grain",
    canvas_cloth_manual: "cotton_canvas_weave",
    cocobolo_multi_groove: "exotic_hardwood_dense",
    power_dremel_wheel: "felt_buffing_disc",
    bone_folder_flat: "polished_bone_edge",
  };
  return m[t];
}

export function bestFinish(t: BurnishToolType): string {
  const m: Record<BurnishToolType, string> = {
    wood_slicker_round: "belt_edge_round",
    canvas_cloth_manual: "quick_rough_finish",
    cocobolo_multi_groove: "wallet_luxury_edge",
    power_dremel_wheel: "production_batch_edge",
    bone_folder_flat: "book_binding_crease",
  };
  return m[t];
}

export function burnishTools(): BurnishToolType[] {
  return ["wood_slicker_round", "canvas_cloth_manual", "cocobolo_multi_groove", "power_dremel_wheel", "bone_folder_flat"];
}
