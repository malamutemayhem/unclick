export type ConePackType = "small_cone_bar" | "large_cone_free" | "self_support_stand" | "junior_cone_mini" | "pyrometric_ring_disc";

export function tempAccuracy(t: ConePackType): number {
  const m: Record<ConePackType, number> = {
    small_cone_bar: 9, large_cone_free: 8, self_support_stand: 7, junior_cone_mini: 6, pyrometric_ring_disc: 10,
  };
  return m[t];
}

export function visibility(t: ConePackType): number {
  const m: Record<ConePackType, number> = {
    small_cone_bar: 6, large_cone_free: 10, self_support_stand: 8, junior_cone_mini: 5, pyrometric_ring_disc: 4,
  };
  return m[t];
}

export function easeOfUse(t: ConePackType): number {
  const m: Record<ConePackType, number> = {
    small_cone_bar: 7, large_cone_free: 6, self_support_stand: 10, junior_cone_mini: 8, pyrometric_ring_disc: 5,
  };
  return m[t];
}

export function rangeSpan(t: ConePackType): number {
  const m: Record<ConePackType, number> = {
    small_cone_bar: 10, large_cone_free: 10, self_support_stand: 8, junior_cone_mini: 7, pyrometric_ring_disc: 6,
  };
  return m[t];
}

export function coneCost(t: ConePackType): number {
  const m: Record<ConePackType, number> = {
    small_cone_bar: 1, large_cone_free: 1, self_support_stand: 2, junior_cone_mini: 1, pyrometric_ring_disc: 3,
  };
  return m[t];
}

export function selfStanding(t: ConePackType): boolean {
  const m: Record<ConePackType, boolean> = {
    small_cone_bar: false, large_cone_free: false, self_support_stand: true, junior_cone_mini: false, pyrometric_ring_disc: true,
  };
  return m[t];
}

export function reusable(t: ConePackType): boolean {
  const m: Record<ConePackType, boolean> = {
    small_cone_bar: false, large_cone_free: false, self_support_stand: false, junior_cone_mini: false, pyrometric_ring_disc: true,
  };
  return m[t];
}

export function coneBody(t: ConePackType): string {
  const m: Record<ConePackType, string> = {
    small_cone_bar: "ceramic_oxide_blend",
    large_cone_free: "ceramic_oxide_blend",
    self_support_stand: "oxide_with_base_pad",
    junior_cone_mini: "miniature_oxide_bar",
    pyrometric_ring_disc: "calibrated_ceramic_disc",
  };
  return m[t];
}

export function bestUse(t: ConePackType): string {
  const m: Record<ConePackType, string> = {
    small_cone_bar: "kiln_sitter_auto",
    large_cone_free: "peephole_visual_check",
    self_support_stand: "quick_no_plaque_fire",
    junior_cone_mini: "test_tile_small",
    pyrometric_ring_disc: "production_quality_log",
  };
  return m[t];
}

export function conePacks(): ConePackType[] {
  return ["small_cone_bar", "large_cone_free", "self_support_stand", "junior_cone_mini", "pyrometric_ring_disc"];
}
