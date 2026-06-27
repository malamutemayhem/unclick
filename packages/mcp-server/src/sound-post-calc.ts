export type SoundPostType = "spruce_dowel_standard" | "carbon_fiber_modern" | "cedar_soft_warm" | "composite_hybrid_mix" | "adjustable_brass_thread";

export function toneTransfer(t: SoundPostType): number {
  const m: Record<SoundPostType, number> = {
    spruce_dowel_standard: 10, carbon_fiber_modern: 7, cedar_soft_warm: 8, composite_hybrid_mix: 6, adjustable_brass_thread: 5,
  };
  return m[t];
}

export function fitPrecision(t: SoundPostType): number {
  const m: Record<SoundPostType, number> = {
    spruce_dowel_standard: 7, carbon_fiber_modern: 8, cedar_soft_warm: 6, composite_hybrid_mix: 7, adjustable_brass_thread: 10,
  };
  return m[t];
}

export function stabilityClimate(t: SoundPostType): number {
  const m: Record<SoundPostType, number> = {
    spruce_dowel_standard: 5, carbon_fiber_modern: 10, cedar_soft_warm: 4, composite_hybrid_mix: 9, adjustable_brass_thread: 10,
  };
  return m[t];
}

export function warmth(t: SoundPostType): number {
  const m: Record<SoundPostType, number> = {
    spruce_dowel_standard: 9, carbon_fiber_modern: 5, cedar_soft_warm: 10, composite_hybrid_mix: 7, adjustable_brass_thread: 4,
  };
  return m[t];
}

export function postCost(t: SoundPostType): number {
  const m: Record<SoundPostType, number> = {
    spruce_dowel_standard: 1, carbon_fiber_modern: 2, cedar_soft_warm: 1, composite_hybrid_mix: 2, adjustable_brass_thread: 3,
  };
  return m[t];
}

export function selfAdjusting(t: SoundPostType): boolean {
  const m: Record<SoundPostType, boolean> = {
    spruce_dowel_standard: false, carbon_fiber_modern: false, cedar_soft_warm: false, composite_hybrid_mix: false, adjustable_brass_thread: true,
  };
  return m[t];
}

export function traditional(t: SoundPostType): boolean {
  const m: Record<SoundPostType, boolean> = {
    spruce_dowel_standard: true, carbon_fiber_modern: false, cedar_soft_warm: true, composite_hybrid_mix: false, adjustable_brass_thread: false,
  };
  return m[t];
}

export function postMaterial(t: SoundPostType): string {
  const m: Record<SoundPostType, string> = {
    spruce_dowel_standard: "quarter_sawn_spruce",
    carbon_fiber_modern: "carbon_fiber_rod",
    cedar_soft_warm: "western_red_cedar",
    composite_hybrid_mix: "wood_carbon_hybrid",
    adjustable_brass_thread: "threaded_brass_post",
  };
  return m[t];
}

export function bestUse(t: SoundPostType): string {
  const m: Record<SoundPostType, string> = {
    spruce_dowel_standard: "traditional_violin_tone",
    carbon_fiber_modern: "touring_climate_stable",
    cedar_soft_warm: "warm_dark_tone",
    composite_hybrid_mix: "balanced_hybrid_tone",
    adjustable_brass_thread: "easy_adjust_setup",
  };
  return m[t];
}

export function soundPosts(): SoundPostType[] {
  return ["spruce_dowel_standard", "carbon_fiber_modern", "cedar_soft_warm", "composite_hybrid_mix", "adjustable_brass_thread"];
}
