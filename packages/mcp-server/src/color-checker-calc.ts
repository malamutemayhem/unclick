export type ColorCheckerType = "classic_24_patch" | "passport_compact_fold" | "digital_sg_140_patch" | "grey_card_18_percent" | "spyder_cube_3d";

export function colorAccuracy(t: ColorCheckerType): number {
  const m: Record<ColorCheckerType, number> = {
    classic_24_patch: 9, passport_compact_fold: 8, digital_sg_140_patch: 10, grey_card_18_percent: 5, spyder_cube_3d: 7,
  };
  return m[t];
}

export function portability(t: ColorCheckerType): number {
  const m: Record<ColorCheckerType, number> = {
    classic_24_patch: 6, passport_compact_fold: 10, digital_sg_140_patch: 3, grey_card_18_percent: 9, spyder_cube_3d: 8,
  };
  return m[t];
}

export function easeOfUse(t: ColorCheckerType): number {
  const m: Record<ColorCheckerType, number> = {
    classic_24_patch: 8, passport_compact_fold: 9, digital_sg_140_patch: 5, grey_card_18_percent: 10, spyder_cube_3d: 6,
  };
  return m[t];
}

export function patchCount(t: ColorCheckerType): number {
  const m: Record<ColorCheckerType, number> = {
    classic_24_patch: 6, passport_compact_fold: 5, digital_sg_140_patch: 10, grey_card_18_percent: 1, spyder_cube_3d: 3,
  };
  return m[t];
}

export function checkerCost(t: ColorCheckerType): number {
  const m: Record<ColorCheckerType, number> = {
    classic_24_patch: 2, passport_compact_fold: 2, digital_sg_140_patch: 3, grey_card_18_percent: 1, spyder_cube_3d: 2,
  };
  return m[t];
}

export function softwareIncluded(t: ColorCheckerType): boolean {
  const m: Record<ColorCheckerType, boolean> = {
    classic_24_patch: true, passport_compact_fold: true, digital_sg_140_patch: true, grey_card_18_percent: false, spyder_cube_3d: false,
  };
  return m[t];
}

export function forWhiteBalance(t: ColorCheckerType): boolean {
  const m: Record<ColorCheckerType, boolean> = {
    classic_24_patch: true, passport_compact_fold: true, digital_sg_140_patch: true, grey_card_18_percent: true, spyder_cube_3d: true,
  };
  return m[t];
}

export function targetFormat(t: ColorCheckerType): string {
  const m: Record<ColorCheckerType, string> = {
    classic_24_patch: "flat_card_rigid_board",
    passport_compact_fold: "tri_fold_pocket_case",
    digital_sg_140_patch: "large_flat_chart",
    grey_card_18_percent: "single_card_neutral",
    spyder_cube_3d: "cube_multi_surface_3d",
  };
  return m[t];
}

export function bestUse(t: ColorCheckerType): string {
  const m: Record<ColorCheckerType, string> = {
    classic_24_patch: "studio_product_portrait",
    passport_compact_fold: "travel_on_location",
    digital_sg_140_patch: "lab_archive_reproduce",
    grey_card_18_percent: "quick_exposure_check",
    spyder_cube_3d: "highlight_shadow_check",
  };
  return m[t];
}

export function colorCheckers(): ColorCheckerType[] {
  return ["classic_24_patch", "passport_compact_fold", "digital_sg_140_patch", "grey_card_18_percent", "spyder_cube_3d"];
}
