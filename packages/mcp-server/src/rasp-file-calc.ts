export type RaspFileType = "cabinet_rasp_hand" | "pattern_maker_rasp" | "needle_file_small" | "microplane_surform" | "riffler_curved_detail";

export function materialRemoval(t: RaspFileType): number {
  const m: Record<RaspFileType, number> = {
    cabinet_rasp_hand: 9, pattern_maker_rasp: 10, needle_file_small: 3, microplane_surform: 7, riffler_curved_detail: 5,
  };
  return m[t];
}

export function surfaceFinish(t: RaspFileType): number {
  const m: Record<RaspFileType, number> = {
    cabinet_rasp_hand: 7, pattern_maker_rasp: 9, needle_file_small: 10, microplane_surform: 5, riffler_curved_detail: 8,
  };
  return m[t];
}

export function shapeAccess(t: RaspFileType): number {
  const m: Record<RaspFileType, number> = {
    cabinet_rasp_hand: 6, pattern_maker_rasp: 7, needle_file_small: 8, microplane_surform: 5, riffler_curved_detail: 10,
  };
  return m[t];
}

export function durability(t: RaspFileType): number {
  const m: Record<RaspFileType, number> = {
    cabinet_rasp_hand: 8, pattern_maker_rasp: 10, needle_file_small: 6, microplane_surform: 5, riffler_curved_detail: 7,
  };
  return m[t];
}

export function raspCost(t: RaspFileType): number {
  const m: Record<RaspFileType, number> = {
    cabinet_rasp_hand: 3, pattern_maker_rasp: 5, needle_file_small: 1, microplane_surform: 2, riffler_curved_detail: 3,
  };
  return m[t];
}

export function handStitched(t: RaspFileType): boolean {
  const m: Record<RaspFileType, boolean> = {
    cabinet_rasp_hand: true, pattern_maker_rasp: true, needle_file_small: false, microplane_surform: false, riffler_curved_detail: true,
  };
  return m[t];
}

export function forMetal(t: RaspFileType): boolean {
  const m: Record<RaspFileType, boolean> = {
    cabinet_rasp_hand: false, pattern_maker_rasp: false, needle_file_small: true, microplane_surform: false, riffler_curved_detail: true,
  };
  return m[t];
}

export function toothPattern(t: RaspFileType): string {
  const m: Record<RaspFileType, string> = {
    cabinet_rasp_hand: "hand_cut_random",
    pattern_maker_rasp: "precision_stitch_grain",
    needle_file_small: "machine_cut_parallel",
    microplane_surform: "photo_etched_sharp",
    riffler_curved_detail: "hand_cut_double",
  };
  return m[t];
}

export function bestProject(t: RaspFileType): string {
  const m: Record<RaspFileType, string> = {
    cabinet_rasp_hand: "furniture_shape_curve",
    pattern_maker_rasp: "sculpture_smooth_form",
    needle_file_small: "jewelry_slot_detail",
    microplane_surform: "quick_round_chamfer",
    riffler_curved_detail: "instrument_scroll_shape",
  };
  return m[t];
}

export function raspFiles(): RaspFileType[] {
  return ["cabinet_rasp_hand", "pattern_maker_rasp", "needle_file_small", "microplane_surform", "riffler_curved_detail"];
}
