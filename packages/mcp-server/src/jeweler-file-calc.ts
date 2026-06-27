export type JewelerFileType = "barrette_flat_safe" | "pillar_narrow_thick" | "warding_thin_taper" | "escapement_tiny_fine" | "riffler_curved_end";

export function metalRemoval(t: JewelerFileType): number {
  const m: Record<JewelerFileType, number> = {
    barrette_flat_safe: 7, pillar_narrow_thick: 8, warding_thin_taper: 6, escapement_tiny_fine: 4, riffler_curved_end: 5,
  };
  return m[t];
}

export function precision(t: JewelerFileType): number {
  const m: Record<JewelerFileType, number> = {
    barrette_flat_safe: 8, pillar_narrow_thick: 7, warding_thin_taper: 8, escapement_tiny_fine: 10, riffler_curved_end: 9,
  };
  return m[t];
}

export function safeEdge(t: JewelerFileType): number {
  const m: Record<JewelerFileType, number> = {
    barrette_flat_safe: 10, pillar_narrow_thick: 6, warding_thin_taper: 5, escapement_tiny_fine: 7, riffler_curved_end: 8,
  };
  return m[t];
}

export function reachDepth(t: JewelerFileType): number {
  const m: Record<JewelerFileType, number> = {
    barrette_flat_safe: 5, pillar_narrow_thick: 8, warding_thin_taper: 9, escapement_tiny_fine: 6, riffler_curved_end: 10,
  };
  return m[t];
}

export function fileCost(t: JewelerFileType): number {
  const m: Record<JewelerFileType, number> = {
    barrette_flat_safe: 2, pillar_narrow_thick: 2, warding_thin_taper: 2, escapement_tiny_fine: 3, riffler_curved_end: 3,
  };
  return m[t];
}

export function oneSafeEdge(t: JewelerFileType): boolean {
  const m: Record<JewelerFileType, boolean> = {
    barrette_flat_safe: true, pillar_narrow_thick: false, warding_thin_taper: false, escapement_tiny_fine: false, riffler_curved_end: false,
  };
  return m[t];
}

export function curvedProfile(t: JewelerFileType): boolean {
  const m: Record<JewelerFileType, boolean> = {
    barrette_flat_safe: false, pillar_narrow_thick: false, warding_thin_taper: false, escapement_tiny_fine: false, riffler_curved_end: true,
  };
  return m[t];
}

export function cutGrade(t: JewelerFileType): string {
  const m: Record<JewelerFileType, string> = {
    barrette_flat_safe: "cut_2_smooth",
    pillar_narrow_thick: "cut_1_medium",
    warding_thin_taper: "cut_2_smooth",
    escapement_tiny_fine: "cut_4_dead_smooth",
    riffler_curved_end: "cut_3_fine",
  };
  return m[t];
}

export function bestUse(t: JewelerFileType): string {
  const m: Record<JewelerFileType, string> = {
    barrette_flat_safe: "bezel_edge_clean",
    pillar_narrow_thick: "channel_slot_shape",
    warding_thin_taper: "narrow_gap_access",
    escapement_tiny_fine: "watch_part_detail",
    riffler_curved_end: "recessed_area_smooth",
  };
  return m[t];
}

export function jewelerFiles(): JewelerFileType[] {
  return ["barrette_flat_safe", "pillar_narrow_thick", "warding_thin_taper", "escapement_tiny_fine", "riffler_curved_end"];
}
