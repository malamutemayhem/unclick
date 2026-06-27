export type HackleType = "single_row_basic" | "double_row_fine" | "mini_hackle_clamp" | "flax_hackle_long" | "blending_hackle_wide";

export function fiberSplit(t: HackleType): number {
  const m: Record<HackleType, number> = {
    single_row_basic: 6, double_row_fine: 9, mini_hackle_clamp: 5, flax_hackle_long: 8, blending_hackle_wide: 7,
  };
  return m[t];
}

export function noilRemove(t: HackleType): number {
  const m: Record<HackleType, number> = {
    single_row_basic: 7, double_row_fine: 10, mini_hackle_clamp: 5, flax_hackle_long: 9, blending_hackle_wide: 6,
  };
  return m[t];
}

export function blendAbility(t: HackleType): number {
  const m: Record<HackleType, number> = {
    single_row_basic: 5, double_row_fine: 7, mini_hackle_clamp: 4, flax_hackle_long: 6, blending_hackle_wide: 10,
  };
  return m[t];
}

export function tineCount(t: HackleType): number {
  const m: Record<HackleType, number> = {
    single_row_basic: 4, double_row_fine: 9, mini_hackle_clamp: 3, flax_hackle_long: 7, blending_hackle_wide: 8,
  };
  return m[t];
}

export function hackleCost(t: HackleType): number {
  const m: Record<HackleType, number> = {
    single_row_basic: 1, double_row_fine: 2, mini_hackle_clamp: 1, flax_hackle_long: 2, blending_hackle_wide: 3,
  };
  return m[t];
}

export function clampMount(t: HackleType): boolean {
  const m: Record<HackleType, boolean> = {
    single_row_basic: false, double_row_fine: false, mini_hackle_clamp: true, flax_hackle_long: false, blending_hackle_wide: false,
  };
  return m[t];
}

export function forFlax(t: HackleType): boolean {
  const m: Record<HackleType, boolean> = {
    single_row_basic: false, double_row_fine: false, mini_hackle_clamp: false, flax_hackle_long: true, blending_hackle_wide: false,
  };
  return m[t];
}

export function tineGauge(t: HackleType): string {
  const m: Record<HackleType, string> = {
    single_row_basic: "medium_steel_round",
    double_row_fine: "fine_steel_tapered",
    mini_hackle_clamp: "short_steel_close",
    flax_hackle_long: "long_steel_sharp",
    blending_hackle_wide: "wide_spaced_steel",
  };
  return m[t];
}

export function bestUse(t: HackleType): string {
  const m: Record<HackleType, string> = {
    single_row_basic: "basic_fiber_align",
    double_row_fine: "fine_top_comb",
    mini_hackle_clamp: "small_sample_prep",
    flax_hackle_long: "flax_linen_process",
    blending_hackle_wide: "multi_fiber_blend",
  };
  return m[t];
}

export function hackles(): HackleType[] {
  return ["single_row_basic", "double_row_fine", "mini_hackle_clamp", "flax_hackle_long", "blending_hackle_wide"];
}
