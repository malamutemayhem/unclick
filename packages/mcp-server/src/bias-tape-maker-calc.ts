export type BiasTapeMakerType = "single_fold_metal" | "double_fold_wide" | "adjustable_multi_size" | "tape_gun_automatic" | "ruler_guide_manual";

export function foldPrecision(t: BiasTapeMakerType): number {
  const m: Record<BiasTapeMakerType, number> = {
    single_fold_metal: 8, double_fold_wide: 8, adjustable_multi_size: 7, tape_gun_automatic: 10, ruler_guide_manual: 6,
  };
  return m[t];
}

export function speedOutput(t: BiasTapeMakerType): number {
  const m: Record<BiasTapeMakerType, number> = {
    single_fold_metal: 7, double_fold_wide: 7, adjustable_multi_size: 6, tape_gun_automatic: 10, ruler_guide_manual: 3,
  };
  return m[t];
}

export function sizeRange(t: BiasTapeMakerType): number {
  const m: Record<BiasTapeMakerType, number> = {
    single_fold_metal: 4, double_fold_wide: 5, adjustable_multi_size: 10, tape_gun_automatic: 7, ruler_guide_manual: 8,
  };
  return m[t];
}

export function easeOfUse(t: BiasTapeMakerType): number {
  const m: Record<BiasTapeMakerType, number> = {
    single_fold_metal: 8, double_fold_wide: 7, adjustable_multi_size: 6, tape_gun_automatic: 9, ruler_guide_manual: 5,
  };
  return m[t];
}

export function makerCost(t: BiasTapeMakerType): number {
  const m: Record<BiasTapeMakerType, number> = {
    single_fold_metal: 1, double_fold_wide: 1, adjustable_multi_size: 2, tape_gun_automatic: 3, ruler_guide_manual: 1,
  };
  return m[t];
}

export function doubleFold(t: BiasTapeMakerType): boolean {
  const m: Record<BiasTapeMakerType, boolean> = {
    single_fold_metal: false, double_fold_wide: true, adjustable_multi_size: true, tape_gun_automatic: true, ruler_guide_manual: true,
  };
  return m[t];
}

export function needsIron(t: BiasTapeMakerType): boolean {
  const m: Record<BiasTapeMakerType, boolean> = {
    single_fold_metal: true, double_fold_wide: true, adjustable_multi_size: true, tape_gun_automatic: false, ruler_guide_manual: true,
  };
  return m[t];
}

export function feedMechanism(t: BiasTapeMakerType): string {
  const m: Record<BiasTapeMakerType, string> = {
    single_fold_metal: "pull_through_channel",
    double_fold_wide: "wide_slot_channel",
    adjustable_multi_size: "sliding_guide_plate",
    tape_gun_automatic: "motor_roller_feed",
    ruler_guide_manual: "ruler_edge_fold_guide",
  };
  return m[t];
}

export function bestProject(t: BiasTapeMakerType): string {
  const m: Record<BiasTapeMakerType, string> = {
    single_fold_metal: "garment_neckline_finish",
    double_fold_wide: "quilt_binding_edge",
    adjustable_multi_size: "mixed_project_variety",
    tape_gun_automatic: "production_batch_sewing",
    ruler_guide_manual: "precise_custom_width",
  };
  return m[t];
}

export function biasTapeMakers(): BiasTapeMakerType[] {
  return ["single_fold_metal", "double_fold_wide", "adjustable_multi_size", "tape_gun_automatic", "ruler_guide_manual"];
}
