export type HipFlaskType = "stainless_classic_curved" | "pewter_engraved_heavy" | "titanium_ultralight" | "leather_wrapped_vintage" | "glass_liner_pure";

export function capacity(t: HipFlaskType): number {
  const m: Record<HipFlaskType, number> = {
    stainless_classic_curved: 7, pewter_engraved_heavy: 8, titanium_ultralight: 5, leather_wrapped_vintage: 7, glass_liner_pure: 6,
  };
  return m[t];
}

export function portability(t: HipFlaskType): number {
  const m: Record<HipFlaskType, number> = {
    stainless_classic_curved: 9, pewter_engraved_heavy: 5, titanium_ultralight: 10, leather_wrapped_vintage: 8, glass_liner_pure: 6,
  };
  return m[t];
}

export function tasteNeutral(t: HipFlaskType): number {
  const m: Record<HipFlaskType, number> = {
    stainless_classic_curved: 7, pewter_engraved_heavy: 5, titanium_ultralight: 9, leather_wrapped_vintage: 6, glass_liner_pure: 10,
  };
  return m[t];
}

export function durability(t: HipFlaskType): number {
  const m: Record<HipFlaskType, number> = {
    stainless_classic_curved: 9, pewter_engraved_heavy: 7, titanium_ultralight: 10, leather_wrapped_vintage: 6, glass_liner_pure: 3,
  };
  return m[t];
}

export function flaskCost(t: HipFlaskType): number {
  const m: Record<HipFlaskType, number> = {
    stainless_classic_curved: 4, pewter_engraved_heavy: 8, titanium_ultralight: 9, leather_wrapped_vintage: 6, glass_liner_pure: 7,
  };
  return m[t];
}

export function leakProof(t: HipFlaskType): boolean {
  const m: Record<HipFlaskType, boolean> = {
    stainless_classic_curved: true, pewter_engraved_heavy: true, titanium_ultralight: true, leather_wrapped_vintage: true, glass_liner_pure: false,
  };
  return m[t];
}

export function engravable(t: HipFlaskType): boolean {
  const m: Record<HipFlaskType, boolean> = {
    stainless_classic_curved: true, pewter_engraved_heavy: true, titanium_ultralight: true, leather_wrapped_vintage: false, glass_liner_pure: false,
  };
  return m[t];
}

export function flaskMaterial(t: HipFlaskType): string {
  const m: Record<HipFlaskType, string> = {
    stainless_classic_curved: "food_grade_304_steel",
    pewter_engraved_heavy: "lead_free_pewter_alloy",
    titanium_ultralight: "grade_2_pure_titanium",
    leather_wrapped_vintage: "steel_core_leather_wrap",
    glass_liner_pure: "borosilicate_steel_shell",
  };
  return m[t];
}

export function bestOccasion(t: HipFlaskType): string {
  const m: Record<HipFlaskType, string> = {
    stainless_classic_curved: "everyday_pocket_carry",
    pewter_engraved_heavy: "gift_groomsman_ceremony",
    titanium_ultralight: "hiking_ultralight_travel",
    leather_wrapped_vintage: "gentleman_classic_style",
    glass_liner_pure: "whiskey_tasting_purist",
  };
  return m[t];
}

export function hipFlasks(): HipFlaskType[] {
  return ["stainless_classic_curved", "pewter_engraved_heavy", "titanium_ultralight", "leather_wrapped_vintage", "glass_liner_pure"];
}
