export type ChalkLineType = "reel_snap_standard" | "fine_powder_precision" | "geared_fast_rewind" | "mini_pocket_compact" | "heavy_duty_100ft";

export function lineVisibility(t: ChalkLineType): number {
  const m: Record<ChalkLineType, number> = {
    reel_snap_standard: 7, fine_powder_precision: 9, geared_fast_rewind: 7, mini_pocket_compact: 5, heavy_duty_100ft: 8,
  };
  return m[t];
}

export function lineAccuracy(t: ChalkLineType): number {
  const m: Record<ChalkLineType, number> = {
    reel_snap_standard: 7, fine_powder_precision: 10, geared_fast_rewind: 7, mini_pocket_compact: 6, heavy_duty_100ft: 8,
  };
  return m[t];
}

export function rewindSpeed(t: ChalkLineType): number {
  const m: Record<ChalkLineType, number> = {
    reel_snap_standard: 5, fine_powder_precision: 6, geared_fast_rewind: 10, mini_pocket_compact: 4, heavy_duty_100ft: 7,
  };
  return m[t];
}

export function lineLength(t: ChalkLineType): number {
  const m: Record<ChalkLineType, number> = {
    reel_snap_standard: 7, fine_powder_precision: 6, geared_fast_rewind: 8, mini_pocket_compact: 3, heavy_duty_100ft: 10,
  };
  return m[t];
}

export function chalkCost(t: ChalkLineType): number {
  const m: Record<ChalkLineType, number> = {
    reel_snap_standard: 1, fine_powder_precision: 2, geared_fast_rewind: 2, mini_pocket_compact: 1, heavy_duty_100ft: 2,
  };
  return m[t];
}

export function geared(t: ChalkLineType): boolean {
  const m: Record<ChalkLineType, boolean> = {
    reel_snap_standard: false, fine_powder_precision: false, geared_fast_rewind: true, mini_pocket_compact: false, heavy_duty_100ft: false,
  };
  return m[t];
}

export function pocketSize(t: ChalkLineType): boolean {
  const m: Record<ChalkLineType, boolean> = {
    reel_snap_standard: false, fine_powder_precision: false, geared_fast_rewind: false, mini_pocket_compact: true, heavy_duty_100ft: false,
  };
  return m[t];
}

export function caseType(t: ChalkLineType): string {
  const m: Record<ChalkLineType, string> = {
    reel_snap_standard: "abs_plastic_reel",
    fine_powder_precision: "aluminum_body_seal",
    geared_fast_rewind: "gear_drive_case",
    mini_pocket_compact: "small_clip_case",
    heavy_duty_100ft: "reinforced_large_reel",
  };
  return m[t];
}

export function bestUse(t: ChalkLineType): string {
  const m: Record<ChalkLineType, string> = {
    reel_snap_standard: "general_layout_snap",
    fine_powder_precision: "finish_work_line",
    geared_fast_rewind: "fast_repeat_snap",
    mini_pocket_compact: "trim_detail_mark",
    heavy_duty_100ft: "long_distance_layout",
  };
  return m[t];
}

export function chalkLines(): ChalkLineType[] {
  return ["reel_snap_standard", "fine_powder_precision", "geared_fast_rewind", "mini_pocket_compact", "heavy_duty_100ft"];
}
