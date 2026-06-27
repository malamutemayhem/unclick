export type BabyCarrierType = "wrap_stretchy_newborn" | "ring_sling_hip" | "soft_structured_buckle" | "meh_dai_tie_hybrid" | "frame_backpack_hiking";

export function ergonomicSupport(t: BabyCarrierType): number {
  const m: Record<BabyCarrierType, number> = {
    wrap_stretchy_newborn: 7, ring_sling_hip: 5, soft_structured_buckle: 9, meh_dai_tie_hybrid: 8, frame_backpack_hiking: 10,
  };
  return m[t];
}

export function easeOfUse(t: BabyCarrierType): number {
  const m: Record<BabyCarrierType, number> = {
    wrap_stretchy_newborn: 4, ring_sling_hip: 7, soft_structured_buckle: 10, meh_dai_tie_hybrid: 6, frame_backpack_hiking: 8,
  };
  return m[t];
}

export function newbornFit(t: BabyCarrierType): number {
  const m: Record<BabyCarrierType, number> = {
    wrap_stretchy_newborn: 10, ring_sling_hip: 8, soft_structured_buckle: 7, meh_dai_tie_hybrid: 9, frame_backpack_hiking: 2,
  };
  return m[t];
}

export function breathability(t: BabyCarrierType): number {
  const m: Record<BabyCarrierType, number> = {
    wrap_stretchy_newborn: 4, ring_sling_hip: 7, soft_structured_buckle: 8, meh_dai_tie_hybrid: 6, frame_backpack_hiking: 10,
  };
  return m[t];
}

export function carrierCost(t: BabyCarrierType): number {
  const m: Record<BabyCarrierType, number> = {
    wrap_stretchy_newborn: 3, ring_sling_hip: 4, soft_structured_buckle: 7, meh_dai_tie_hybrid: 6, frame_backpack_hiking: 9,
  };
  return m[t];
}

export function breastfeedFriendly(t: BabyCarrierType): boolean {
  const m: Record<BabyCarrierType, boolean> = {
    wrap_stretchy_newborn: true, ring_sling_hip: true, soft_structured_buckle: false, meh_dai_tie_hybrid: true, frame_backpack_hiking: false,
  };
  return m[t];
}

export function hasStorage(t: BabyCarrierType): boolean {
  const m: Record<BabyCarrierType, boolean> = {
    wrap_stretchy_newborn: false, ring_sling_hip: false, soft_structured_buckle: true, meh_dai_tie_hybrid: false, frame_backpack_hiking: true,
  };
  return m[t];
}

export function carrierFabric(t: BabyCarrierType): string {
  const m: Record<BabyCarrierType, string> = {
    wrap_stretchy_newborn: "jersey_cotton_stretch",
    ring_sling_hip: "linen_woven_gathered",
    soft_structured_buckle: "padded_mesh_buckle",
    meh_dai_tie_hybrid: "cotton_canvas_tie_waist",
    frame_backpack_hiking: "aluminum_frame_cordura",
  };
  return m[t];
}

export function bestStage(t: BabyCarrierType): string {
  const m: Record<BabyCarrierType, string> = {
    wrap_stretchy_newborn: "newborn_skin_to_skin",
    ring_sling_hip: "quick_hip_carry_errands",
    soft_structured_buckle: "daily_all_day_versatile",
    meh_dai_tie_hybrid: "custom_fit_shared_carry",
    frame_backpack_hiking: "toddler_trail_hiking",
  };
  return m[t];
}

export function babyCarriers(): BabyCarrierType[] {
  return ["wrap_stretchy_newborn", "ring_sling_hip", "soft_structured_buckle", "meh_dai_tie_hybrid", "frame_backpack_hiking"];
}
