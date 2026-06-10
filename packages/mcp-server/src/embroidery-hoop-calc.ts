export type EmbroideryHoopType = "bamboo_round" | "plastic_spring_tension" | "wooden_oval" | "q_snap_frame" | "machine_clamp";

export function fabricTension(t: EmbroideryHoopType): number {
  const m: Record<EmbroideryHoopType, number> = {
    bamboo_round: 7, plastic_spring_tension: 9, wooden_oval: 6, q_snap_frame: 10, machine_clamp: 8,
  };
  return m[t];
}

export function easeOfUse(t: EmbroideryHoopType): number {
  const m: Record<EmbroideryHoopType, number> = {
    bamboo_round: 9, plastic_spring_tension: 10, wooden_oval: 7, q_snap_frame: 6, machine_clamp: 4,
  };
  return m[t];
}

export function fabricFriendly(t: EmbroideryHoopType): number {
  const m: Record<EmbroideryHoopType, number> = {
    bamboo_round: 8, plastic_spring_tension: 6, wooden_oval: 9, q_snap_frame: 10, machine_clamp: 5,
  };
  return m[t];
}

export function sizeRange(t: EmbroideryHoopType): number {
  const m: Record<EmbroideryHoopType, number> = {
    bamboo_round: 8, plastic_spring_tension: 6, wooden_oval: 7, q_snap_frame: 10, machine_clamp: 5,
  };
  return m[t];
}

export function hoopCost(t: EmbroideryHoopType): number {
  const m: Record<EmbroideryHoopType, number> = {
    bamboo_round: 1, plastic_spring_tension: 2, wooden_oval: 3, q_snap_frame: 5, machine_clamp: 7,
  };
  return m[t];
}

export function displayReady(t: EmbroideryHoopType): boolean {
  const m: Record<EmbroideryHoopType, boolean> = {
    bamboo_round: true, plastic_spring_tension: false, wooden_oval: true, q_snap_frame: false, machine_clamp: false,
  };
  return m[t];
}

export function handsFree(t: EmbroideryHoopType): boolean {
  const m: Record<EmbroideryHoopType, boolean> = {
    bamboo_round: false, plastic_spring_tension: false, wooden_oval: false, q_snap_frame: true, machine_clamp: true,
  };
  return m[t];
}

export function frameMaterial(t: EmbroideryHoopType): string {
  const m: Record<EmbroideryHoopType, string> = {
    bamboo_round: "natural_bamboo_screw_top",
    plastic_spring_tension: "abs_spring_clip_inner",
    wooden_oval: "hardwood_brass_screw",
    q_snap_frame: "pvc_tube_snap_clamp",
    machine_clamp: "metal_arm_stabilizer",
  };
  return m[t];
}

export function bestStitch(t: EmbroideryHoopType): string {
  const m: Record<EmbroideryHoopType, string> = {
    bamboo_round: "beginner_cross_stitch",
    plastic_spring_tension: "quick_small_project",
    wooden_oval: "heirloom_fine_work",
    q_snap_frame: "large_quilt_block",
    machine_clamp: "machine_embroidery_auto",
  };
  return m[t];
}

export function embroideryHoops(): EmbroideryHoopType[] {
  return ["bamboo_round", "plastic_spring_tension", "wooden_oval", "q_snap_frame", "machine_clamp"];
}
