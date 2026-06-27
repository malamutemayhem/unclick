export type ProjectBagType = "drawstring_cotton_basic" | "zippered_clear_vinyl" | "snap_frame_wide" | "wristlet_small_travel" | "tote_multi_pocket";

export function capacity(t: ProjectBagType): number {
  const m: Record<ProjectBagType, number> = {
    drawstring_cotton_basic: 7, zippered_clear_vinyl: 6, snap_frame_wide: 9, wristlet_small_travel: 4, tote_multi_pocket: 10,
  };
  return m[t];
}

export function organization(t: ProjectBagType): number {
  const m: Record<ProjectBagType, number> = {
    drawstring_cotton_basic: 4, zippered_clear_vinyl: 6, snap_frame_wide: 7, wristlet_small_travel: 5, tote_multi_pocket: 10,
  };
  return m[t];
}

export function portability(t: ProjectBagType): number {
  const m: Record<ProjectBagType, number> = {
    drawstring_cotton_basic: 8, zippered_clear_vinyl: 7, snap_frame_wide: 5, wristlet_small_travel: 10, tote_multi_pocket: 6,
  };
  return m[t];
}

export function yarnProtect(t: ProjectBagType): number {
  const m: Record<ProjectBagType, number> = {
    drawstring_cotton_basic: 6, zippered_clear_vinyl: 9, snap_frame_wide: 7, wristlet_small_travel: 8, tote_multi_pocket: 8,
  };
  return m[t];
}

export function bagCost(t: ProjectBagType): number {
  const m: Record<ProjectBagType, number> = {
    drawstring_cotton_basic: 2, zippered_clear_vinyl: 3, snap_frame_wide: 4, wristlet_small_travel: 3, tote_multi_pocket: 5,
  };
  return m[t];
}

export function washable(t: ProjectBagType): boolean {
  const m: Record<ProjectBagType, boolean> = {
    drawstring_cotton_basic: true, zippered_clear_vinyl: true, snap_frame_wide: false, wristlet_small_travel: true, tote_multi_pocket: true,
  };
  return m[t];
}

export function seeThrough(t: ProjectBagType): boolean {
  const m: Record<ProjectBagType, boolean> = {
    drawstring_cotton_basic: false, zippered_clear_vinyl: true, snap_frame_wide: false, wristlet_small_travel: false, tote_multi_pocket: false,
  };
  return m[t];
}

export function bagMaterial(t: ProjectBagType): string {
  const m: Record<ProjectBagType, string> = {
    drawstring_cotton_basic: "cotton_canvas_natural",
    zippered_clear_vinyl: "pvc_clear_stitched",
    snap_frame_wide: "metal_frame_fabric",
    wristlet_small_travel: "nylon_ripstop_strap",
    tote_multi_pocket: "polyester_quilted_lined",
  };
  return m[t];
}

export function bestUse(t: ProjectBagType): string {
  const m: Record<ProjectBagType, string> = {
    drawstring_cotton_basic: "single_skein_simple",
    zippered_clear_vinyl: "color_sort_visible",
    snap_frame_wide: "large_blanket_afghan",
    wristlet_small_travel: "commute_knit_quick",
    tote_multi_pocket: "multi_project_organize",
  };
  return m[t];
}

export function projectBags(): ProjectBagType[] {
  return ["drawstring_cotton_basic", "zippered_clear_vinyl", "snap_frame_wide", "wristlet_small_travel", "tote_multi_pocket"];
}
