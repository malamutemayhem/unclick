export type WaffleMakerType = "classic_round_thin" | "belgian_deep_pocket" | "flip_rotating_even" | "mini_compact_snack" | "commercial_double_grid";

export function crispiness(t: WaffleMakerType): number {
  const m: Record<WaffleMakerType, number> = {
    classic_round_thin: 8, belgian_deep_pocket: 7, flip_rotating_even: 10, mini_compact_snack: 6, commercial_double_grid: 9,
  };
  return m[t];
}

export function pocketDepth(t: WaffleMakerType): number {
  const m: Record<WaffleMakerType, number> = {
    classic_round_thin: 3, belgian_deep_pocket: 10, flip_rotating_even: 8, mini_compact_snack: 2, commercial_double_grid: 7,
  };
  return m[t];
}

export function evenBrowning(t: WaffleMakerType): number {
  const m: Record<WaffleMakerType, number> = {
    classic_round_thin: 6, belgian_deep_pocket: 7, flip_rotating_even: 10, mini_compact_snack: 5, commercial_double_grid: 9,
  };
  return m[t];
}

export function compactSize(t: WaffleMakerType): number {
  const m: Record<WaffleMakerType, number> = {
    classic_round_thin: 7, belgian_deep_pocket: 4, flip_rotating_even: 3, mini_compact_snack: 10, commercial_double_grid: 2,
  };
  return m[t];
}

export function makerCost(t: WaffleMakerType): number {
  const m: Record<WaffleMakerType, number> = {
    classic_round_thin: 2, belgian_deep_pocket: 4, flip_rotating_even: 5, mini_compact_snack: 2, commercial_double_grid: 8,
  };
  return m[t];
}

export function removablePlates(t: WaffleMakerType): boolean {
  const m: Record<WaffleMakerType, boolean> = {
    classic_round_thin: false, belgian_deep_pocket: true, flip_rotating_even: true, mini_compact_snack: false, commercial_double_grid: true,
  };
  return m[t];
}

export function indicatorLight(t: WaffleMakerType): boolean {
  const m: Record<WaffleMakerType, boolean> = {
    classic_round_thin: true, belgian_deep_pocket: true, flip_rotating_even: true, mini_compact_snack: false, commercial_double_grid: true,
  };
  return m[t];
}

export function plateCoating(t: WaffleMakerType): string {
  const m: Record<WaffleMakerType, string> = {
    classic_round_thin: "nonstick_teflon_standard",
    belgian_deep_pocket: "nonstick_ceramic_deep",
    flip_rotating_even: "nonstick_cast_aluminum",
    mini_compact_snack: "nonstick_compact_plate",
    commercial_double_grid: "cast_iron_seasoned_grid",
  };
  return m[t];
}

export function bestUse(t: WaffleMakerType): string {
  const m: Record<WaffleMakerType, string> = {
    classic_round_thin: "quick_weekday_breakfast",
    belgian_deep_pocket: "topping_loaded_brunch",
    flip_rotating_even: "uniform_crisp_batch",
    mini_compact_snack: "kids_snack_dorm_room",
    commercial_double_grid: "cafe_high_volume_service",
  };
  return m[t];
}

export function waffleMakers(): WaffleMakerType[] {
  return ["classic_round_thin", "belgian_deep_pocket", "flip_rotating_even", "mini_compact_snack", "commercial_double_grid"];
}
