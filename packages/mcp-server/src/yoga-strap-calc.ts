export type YogaStrapType = "cotton_d_ring_basic" | "nylon_cinch_buckle" | "elastic_stretch_assist" | "hemp_natural_eco" | "silk_gentle_premium";

export function gripTexture(t: YogaStrapType): number {
  const m: Record<YogaStrapType, number> = {
    cotton_d_ring_basic: 8, nylon_cinch_buckle: 7, elastic_stretch_assist: 6, hemp_natural_eco: 9, silk_gentle_premium: 5,
  };
  return m[t];
}

export function stretchAssist(t: YogaStrapType): number {
  const m: Record<YogaStrapType, number> = {
    cotton_d_ring_basic: 7, nylon_cinch_buckle: 8, elastic_stretch_assist: 10, hemp_natural_eco: 7, silk_gentle_premium: 6,
  };
  return m[t];
}

export function durability(t: YogaStrapType): number {
  const m: Record<YogaStrapType, number> = {
    cotton_d_ring_basic: 8, nylon_cinch_buckle: 9, elastic_stretch_assist: 6, hemp_natural_eco: 9, silk_gentle_premium: 5,
  };
  return m[t];
}

export function skinComfort(t: YogaStrapType): number {
  const m: Record<YogaStrapType, number> = {
    cotton_d_ring_basic: 8, nylon_cinch_buckle: 6, elastic_stretch_assist: 7, hemp_natural_eco: 7, silk_gentle_premium: 10,
  };
  return m[t];
}

export function strapCost(t: YogaStrapType): number {
  const m: Record<YogaStrapType, number> = {
    cotton_d_ring_basic: 1, nylon_cinch_buckle: 1, elastic_stretch_assist: 2, hemp_natural_eco: 2, silk_gentle_premium: 3,
  };
  return m[t];
}

export function hasElasticity(t: YogaStrapType): boolean {
  const m: Record<YogaStrapType, boolean> = {
    cotton_d_ring_basic: false, nylon_cinch_buckle: false, elastic_stretch_assist: true, hemp_natural_eco: false, silk_gentle_premium: false,
  };
  return m[t];
}

export function machineWashable(t: YogaStrapType): boolean {
  const m: Record<YogaStrapType, boolean> = {
    cotton_d_ring_basic: true, nylon_cinch_buckle: true, elastic_stretch_assist: true, hemp_natural_eco: true, silk_gentle_premium: false,
  };
  return m[t];
}

export function buckleType(t: YogaStrapType): string {
  const m: Record<YogaStrapType, string> = {
    cotton_d_ring_basic: "metal_d_ring_double",
    nylon_cinch_buckle: "plastic_cinch_slide",
    elastic_stretch_assist: "loop_handle_sewn",
    hemp_natural_eco: "metal_d_ring_single",
    silk_gentle_premium: "wooden_toggle_clasp",
  };
  return m[t];
}

export function bestPose(t: YogaStrapType): string {
  const m: Record<YogaStrapType, string> = {
    cotton_d_ring_basic: "seated_forward_fold",
    nylon_cinch_buckle: "bound_angle_shoulder",
    elastic_stretch_assist: "dancer_pose_balance",
    hemp_natural_eco: "king_pigeon_deep",
    silk_gentle_premium: "restorative_gentle_hold",
  };
  return m[t];
}

export function yogaStraps(): YogaStrapType[] {
  return ["cotton_d_ring_basic", "nylon_cinch_buckle", "elastic_stretch_assist", "hemp_natural_eco", "silk_gentle_premium"];
}
