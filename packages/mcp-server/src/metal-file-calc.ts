export type MetalFileType = "bastard_cut_coarse" | "second_cut_medium" | "smooth_cut_fine" | "needle_file_precision" | "riffler_curved_reach";

export function materialRemoval(t: MetalFileType): number {
  const m: Record<MetalFileType, number> = {
    bastard_cut_coarse: 10, second_cut_medium: 7, smooth_cut_fine: 4, needle_file_precision: 2, riffler_curved_reach: 5,
  };
  return m[t];
}

export function surfaceFinish(t: MetalFileType): number {
  const m: Record<MetalFileType, number> = {
    bastard_cut_coarse: 3, second_cut_medium: 6, smooth_cut_fine: 9, needle_file_precision: 10, riffler_curved_reach: 7,
  };
  return m[t];
}

export function precisionControl(t: MetalFileType): number {
  const m: Record<MetalFileType, number> = {
    bastard_cut_coarse: 4, second_cut_medium: 6, smooth_cut_fine: 8, needle_file_precision: 10, riffler_curved_reach: 9,
  };
  return m[t];
}

export function shapeAccess(t: MetalFileType): number {
  const m: Record<MetalFileType, number> = {
    bastard_cut_coarse: 5, second_cut_medium: 6, smooth_cut_fine: 6, needle_file_precision: 8, riffler_curved_reach: 10,
  };
  return m[t];
}

export function fileCost(t: MetalFileType): number {
  const m: Record<MetalFileType, number> = {
    bastard_cut_coarse: 1, second_cut_medium: 1, smooth_cut_fine: 1, needle_file_precision: 2, riffler_curved_reach: 3,
  };
  return m[t];
}

export function forFinishing(t: MetalFileType): boolean {
  const m: Record<MetalFileType, boolean> = {
    bastard_cut_coarse: false, second_cut_medium: false, smooth_cut_fine: true, needle_file_precision: true, riffler_curved_reach: true,
  };
  return m[t];
}

export function curvedShape(t: MetalFileType): boolean {
  const m: Record<MetalFileType, boolean> = {
    bastard_cut_coarse: false, second_cut_medium: false, smooth_cut_fine: false, needle_file_precision: false, riffler_curved_reach: true,
  };
  return m[t];
}

export function toothPattern(t: MetalFileType): string {
  const m: Record<MetalFileType, string> = {
    bastard_cut_coarse: "single_cut_diagonal",
    second_cut_medium: "double_cut_crosshatch",
    smooth_cut_fine: "single_cut_fine_pitch",
    needle_file_precision: "swiss_pattern_fine",
    riffler_curved_reach: "curved_double_end",
  };
  return m[t];
}

export function bestTask(t: MetalFileType): string {
  const m: Record<MetalFileType, string> = {
    bastard_cut_coarse: "rough_shaping_fast",
    second_cut_medium: "general_fitting_work",
    smooth_cut_fine: "finish_before_polish",
    needle_file_precision: "jewelry_clock_detail",
    riffler_curved_reach: "sculpt_mold_contour",
  };
  return m[t];
}

export function metalFiles(): MetalFileType[] {
  return ["bastard_cut_coarse", "second_cut_medium", "smooth_cut_fine", "needle_file_precision", "riffler_curved_reach"];
}
