export type RomanShadeType = "flat_fold_classic" | "hobbled_cascading" | "balloon_gathered_pouf" | "relaxed_soft_drape" | "woven_wood_natural";

export function elegance(t: RomanShadeType): number {
  const m: Record<RomanShadeType, number> = {
    flat_fold_classic: 8, hobbled_cascading: 10, balloon_gathered_pouf: 9, relaxed_soft_drape: 7, woven_wood_natural: 6,
  };
  return m[t];
}

export function lightControl(t: RomanShadeType): number {
  const m: Record<RomanShadeType, number> = {
    flat_fold_classic: 8, hobbled_cascading: 7, balloon_gathered_pouf: 5, relaxed_soft_drape: 6, woven_wood_natural: 4,
  };
  return m[t];
}

export function stackHeight(t: RomanShadeType): number {
  const m: Record<RomanShadeType, number> = {
    flat_fold_classic: 9, hobbled_cascading: 4, balloon_gathered_pouf: 3, relaxed_soft_drape: 7, woven_wood_natural: 8,
  };
  return m[t];
}

export function cleanEase(t: RomanShadeType): number {
  const m: Record<RomanShadeType, number> = {
    flat_fold_classic: 8, hobbled_cascading: 5, balloon_gathered_pouf: 3, relaxed_soft_drape: 6, woven_wood_natural: 7,
  };
  return m[t];
}

export function shadeCost(t: RomanShadeType): number {
  const m: Record<RomanShadeType, number> = {
    flat_fold_classic: 4, hobbled_cascading: 6, balloon_gathered_pouf: 7, relaxed_soft_drape: 5, woven_wood_natural: 5,
  };
  return m[t];
}

export function lined(t: RomanShadeType): boolean {
  const m: Record<RomanShadeType, boolean> = {
    flat_fold_classic: true, hobbled_cascading: true, balloon_gathered_pouf: true, relaxed_soft_drape: false, woven_wood_natural: false,
  };
  return m[t];
}

export function childSafe(t: RomanShadeType): boolean {
  const m: Record<RomanShadeType, boolean> = {
    flat_fold_classic: true, hobbled_cascading: true, balloon_gathered_pouf: true, relaxed_soft_drape: true, woven_wood_natural: true,
  };
  return m[t];
}

export function fabricStyle(t: RomanShadeType): string {
  const m: Record<RomanShadeType, string> = {
    flat_fold_classic: "crisp_fold_horizontal",
    hobbled_cascading: "waterfall_cascade_fold",
    balloon_gathered_pouf: "gathered_pouf_bottom",
    relaxed_soft_drape: "soft_swag_center_drape",
    woven_wood_natural: "bamboo_grass_reed_weave",
  };
  return m[t];
}

export function bestRoom(t: RomanShadeType): string {
  const m: Record<RomanShadeType, string> = {
    flat_fold_classic: "modern_clean_any_room",
    hobbled_cascading: "formal_dining_living",
    balloon_gathered_pouf: "french_country_bedroom",
    relaxed_soft_drape: "coastal_casual_bath",
    woven_wood_natural: "sunroom_natural_decor",
  };
  return m[t];
}

export function romanShades(): RomanShadeType[] {
  return ["flat_fold_classic", "hobbled_cascading", "balloon_gathered_pouf", "relaxed_soft_drape", "woven_wood_natural"];
}
