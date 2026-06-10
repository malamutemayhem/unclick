export type BabyWrapType = "stretchy_jersey_knit" | "woven_cotton_rigid" | "ring_sling_shoulder" | "mei_tai_soft_structured" | "hybrid_buckle_wrap";

export function newbornFit(t: BabyWrapType): number {
  const m: Record<BabyWrapType, number> = {
    stretchy_jersey_knit: 10, woven_cotton_rigid: 8, ring_sling_shoulder: 9, mei_tai_soft_structured: 7, hybrid_buckle_wrap: 7,
  };
  return m[t];
}

export function toddlerSupport(t: BabyWrapType): number {
  const m: Record<BabyWrapType, number> = {
    stretchy_jersey_knit: 4, woven_cotton_rigid: 10, ring_sling_shoulder: 6, mei_tai_soft_structured: 9, hybrid_buckle_wrap: 8,
  };
  return m[t];
}

export function learnCurve(t: BabyWrapType): number {
  const m: Record<BabyWrapType, number> = {
    stretchy_jersey_knit: 6, woven_cotton_rigid: 4, ring_sling_shoulder: 8, mei_tai_soft_structured: 7, hybrid_buckle_wrap: 9,
  };
  return m[t];
}

export function breathability(t: BabyWrapType): number {
  const m: Record<BabyWrapType, number> = {
    stretchy_jersey_knit: 6, woven_cotton_rigid: 9, ring_sling_shoulder: 8, mei_tai_soft_structured: 7, hybrid_buckle_wrap: 7,
  };
  return m[t];
}

export function wrapCost(t: BabyWrapType): number {
  const m: Record<BabyWrapType, number> = {
    stretchy_jersey_knit: 2, woven_cotton_rigid: 4, ring_sling_shoulder: 3, mei_tai_soft_structured: 3, hybrid_buckle_wrap: 4,
  };
  return m[t];
}

export function noTying(t: BabyWrapType): boolean {
  const m: Record<BabyWrapType, boolean> = {
    stretchy_jersey_knit: false, woven_cotton_rigid: false, ring_sling_shoulder: true, mei_tai_soft_structured: false, hybrid_buckle_wrap: true,
  };
  return m[t];
}

export function backCarry(t: BabyWrapType): boolean {
  const m: Record<BabyWrapType, boolean> = {
    stretchy_jersey_knit: false, woven_cotton_rigid: true, ring_sling_shoulder: false, mei_tai_soft_structured: true, hybrid_buckle_wrap: true,
  };
  return m[t];
}

export function fabricType(t: BabyWrapType): string {
  const m: Record<BabyWrapType, string> = {
    stretchy_jersey_knit: "cotton_spandex_blend",
    woven_cotton_rigid: "handloom_cotton_weave",
    ring_sling_shoulder: "linen_cotton_gathered",
    mei_tai_soft_structured: "canvas_padded_strap",
    hybrid_buckle_wrap: "woven_wrap_with_buckle",
  };
  return m[t];
}

export function bestStage(t: BabyWrapType): string {
  const m: Record<BabyWrapType, string> = {
    stretchy_jersey_knit: "newborn_first_months",
    woven_cotton_rigid: "infant_through_toddler",
    ring_sling_shoulder: "quick_hip_carry",
    mei_tai_soft_structured: "active_hiking_parent",
    hybrid_buckle_wrap: "ease_and_comfort_mix",
  };
  return m[t];
}

export function babyWraps(): BabyWrapType[] {
  return ["stretchy_jersey_knit", "woven_cotton_rigid", "ring_sling_shoulder", "mei_tai_soft_structured", "hybrid_buckle_wrap"];
}
