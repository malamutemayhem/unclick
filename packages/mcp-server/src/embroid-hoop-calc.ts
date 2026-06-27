export type EmbroidHoopType = "wood_round_classic" | "spring_tension_metal" | "plastic_snap_frame" | "scroll_frame_bar" | "quilting_hoop_stand";

export function fabricHold(t: EmbroidHoopType): number {
  const m: Record<EmbroidHoopType, number> = {
    wood_round_classic: 7, spring_tension_metal: 9, plastic_snap_frame: 8, scroll_frame_bar: 10, quilting_hoop_stand: 8,
  };
  return m[t];
}

export function easeOfUse(t: EmbroidHoopType): number {
  const m: Record<EmbroidHoopType, number> = {
    wood_round_classic: 9, spring_tension_metal: 10, plastic_snap_frame: 8, scroll_frame_bar: 5, quilting_hoop_stand: 6,
  };
  return m[t];
}

export function fabricSafe(t: EmbroidHoopType): number {
  const m: Record<EmbroidHoopType, number> = {
    wood_round_classic: 8, spring_tension_metal: 6, plastic_snap_frame: 9, scroll_frame_bar: 10, quilting_hoop_stand: 9,
  };
  return m[t];
}

export function sizeRange(t: EmbroidHoopType): number {
  const m: Record<EmbroidHoopType, number> = {
    wood_round_classic: 8, spring_tension_metal: 6, plastic_snap_frame: 7, scroll_frame_bar: 10, quilting_hoop_stand: 9,
  };
  return m[t];
}

export function hoopCost(t: EmbroidHoopType): number {
  const m: Record<EmbroidHoopType, number> = {
    wood_round_classic: 1, spring_tension_metal: 2, plastic_snap_frame: 2, scroll_frame_bar: 4, quilting_hoop_stand: 5,
  };
  return m[t];
}

export function handsFree(t: EmbroidHoopType): boolean {
  const m: Record<EmbroidHoopType, boolean> = {
    wood_round_classic: false, spring_tension_metal: false, plastic_snap_frame: false, scroll_frame_bar: false, quilting_hoop_stand: true,
  };
  return m[t];
}

export function forDisplay(t: EmbroidHoopType): boolean {
  const m: Record<EmbroidHoopType, boolean> = {
    wood_round_classic: true, spring_tension_metal: false, plastic_snap_frame: true, scroll_frame_bar: false, quilting_hoop_stand: false,
  };
  return m[t];
}

export function frameMaterial(t: EmbroidHoopType): string {
  const m: Record<EmbroidHoopType, string> = {
    wood_round_classic: "bamboo_beech_ring",
    spring_tension_metal: "spring_steel_ring",
    plastic_snap_frame: "abs_plastic_snap",
    scroll_frame_bar: "hardwood_dowel_bar",
    quilting_hoop_stand: "wood_clamp_floor",
  };
  return m[t];
}

export function bestProject(t: EmbroidHoopType): string {
  const m: Record<EmbroidHoopType, string> = {
    wood_round_classic: "small_embroidery_art",
    spring_tension_metal: "machine_embroidery_hold",
    plastic_snap_frame: "display_finish_frame",
    scroll_frame_bar: "large_tapestry_scroll",
    quilting_hoop_stand: "quilt_hand_stitch",
  };
  return m[t];
}

export function embroidHoops(): EmbroidHoopType[] {
  return ["wood_round_classic", "spring_tension_metal", "plastic_snap_frame", "scroll_frame_bar", "quilting_hoop_stand"];
}
