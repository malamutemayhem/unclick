export type ClipboardType = "hardboard_spring_clip" | "aluminum_low_profile" | "storage_box_lid" | "folding_nurse_pocket" | "magnetic_dry_erase";

export function clipStrength(t: ClipboardType): number {
  const m: Record<ClipboardType, number> = {
    hardboard_spring_clip: 7, aluminum_low_profile: 8, storage_box_lid: 6, folding_nurse_pocket: 5, magnetic_dry_erase: 4,
  };
  return m[t];
}

export function writeSurface(t: ClipboardType): number {
  const m: Record<ClipboardType, number> = {
    hardboard_spring_clip: 7, aluminum_low_profile: 9, storage_box_lid: 6, folding_nurse_pocket: 5, magnetic_dry_erase: 8,
  };
  return m[t];
}

export function storageSpace(t: ClipboardType): number {
  const m: Record<ClipboardType, number> = {
    hardboard_spring_clip: 1, aluminum_low_profile: 2, storage_box_lid: 10, folding_nurse_pocket: 6, magnetic_dry_erase: 1,
  };
  return m[t];
}

export function portability(t: ClipboardType): number {
  const m: Record<ClipboardType, number> = {
    hardboard_spring_clip: 7, aluminum_low_profile: 8, storage_box_lid: 4, folding_nurse_pocket: 10, magnetic_dry_erase: 5,
  };
  return m[t];
}

export function boardCost(t: ClipboardType): number {
  const m: Record<ClipboardType, number> = {
    hardboard_spring_clip: 1, aluminum_low_profile: 4, storage_box_lid: 5, folding_nurse_pocket: 6, magnetic_dry_erase: 7,
  };
  return m[t];
}

export function hasStorage(t: ClipboardType): boolean {
  const m: Record<ClipboardType, boolean> = {
    hardboard_spring_clip: false, aluminum_low_profile: false, storage_box_lid: true, folding_nurse_pocket: true, magnetic_dry_erase: false,
  };
  return m[t];
}

export function erasable(t: ClipboardType): boolean {
  const m: Record<ClipboardType, boolean> = {
    hardboard_spring_clip: false, aluminum_low_profile: false, storage_box_lid: false, folding_nurse_pocket: false, magnetic_dry_erase: true,
  };
  return m[t];
}

export function boardMaterial(t: ClipboardType): string {
  const m: Record<ClipboardType, string> = {
    hardboard_spring_clip: "masonite_hardboard_brown",
    aluminum_low_profile: "anodized_aluminum_slim",
    storage_box_lid: "polypropylene_hinged_box",
    folding_nurse_pocket: "vinyl_coated_foldover",
    magnetic_dry_erase: "steel_core_whiteboard",
  };
  return m[t];
}

export function bestUse(t: ClipboardType): string {
  const m: Record<ClipboardType, string> = {
    hardboard_spring_clip: "classroom_test_proctor",
    aluminum_low_profile: "warehouse_inventory_check",
    storage_box_lid: "jobsite_form_storage",
    folding_nurse_pocket: "healthcare_patient_rounds",
    magnetic_dry_erase: "coaching_play_diagram",
  };
  return m[t];
}

export function clipboards(): ClipboardType[] {
  return ["hardboard_spring_clip", "aluminum_low_profile", "storage_box_lid", "folding_nurse_pocket", "magnetic_dry_erase"];
}
