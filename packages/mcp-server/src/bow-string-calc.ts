export type BowStringType = "dacron_b50_traditional" | "fastflight_plus_dyneema" | "bcyx_blend_hybrid" | "trophy_8190_speed" | "flemish_twist_handmade";

export function speed(t: BowStringType): number {
  const m: Record<BowStringType, number> = {
    dacron_b50_traditional: 4, fastflight_plus_dyneema: 9, bcyx_blend_hybrid: 8, trophy_8190_speed: 10, flemish_twist_handmade: 5,
  };
  return m[t];
}

export function durability(t: BowStringType): number {
  const m: Record<BowStringType, number> = {
    dacron_b50_traditional: 7, fastflight_plus_dyneema: 8, bcyx_blend_hybrid: 9, trophy_8190_speed: 7, flemish_twist_handmade: 6,
  };
  return m[t];
}

export function stretch(t: BowStringType): number {
  const m: Record<BowStringType, number> = {
    dacron_b50_traditional: 10, fastflight_plus_dyneema: 2, bcyx_blend_hybrid: 4, trophy_8190_speed: 1, flemish_twist_handmade: 8,
  };
  return m[t];
}

export function noiseLevel(t: BowStringType): number {
  const m: Record<BowStringType, number> = {
    dacron_b50_traditional: 3, fastflight_plus_dyneema: 7, bcyx_blend_hybrid: 5, trophy_8190_speed: 8, flemish_twist_handmade: 3,
  };
  return m[t];
}

export function stringCost(t: BowStringType): number {
  const m: Record<BowStringType, number> = {
    dacron_b50_traditional: 3, fastflight_plus_dyneema: 7, bcyx_blend_hybrid: 8, trophy_8190_speed: 9, flemish_twist_handmade: 6,
  };
  return m[t];
}

export function lowCreep(t: BowStringType): boolean {
  const m: Record<BowStringType, boolean> = {
    dacron_b50_traditional: false, fastflight_plus_dyneema: true, bcyx_blend_hybrid: true, trophy_8190_speed: true, flemish_twist_handmade: false,
  };
  return m[t];
}

export function servingIncluded(t: BowStringType): boolean {
  const m: Record<BowStringType, boolean> = {
    dacron_b50_traditional: true, fastflight_plus_dyneema: true, bcyx_blend_hybrid: true, trophy_8190_speed: true, flemish_twist_handmade: false,
  };
  return m[t];
}

export function fiberMaterial(t: BowStringType): string {
  const m: Record<BowStringType, string> = {
    dacron_b50_traditional: "polyester_dacron_b50",
    fastflight_plus_dyneema: "dyneema_sk75_ultra",
    bcyx_blend_hybrid: "vectran_dyneema_blend",
    trophy_8190_speed: "hmpe_8190_low_creep",
    flemish_twist_handmade: "dacron_b55_twisted",
  };
  return m[t];
}

export function bestBow(t: BowStringType): string {
  const m: Record<BowStringType, string> = {
    dacron_b50_traditional: "longbow_recurve_classic",
    fastflight_plus_dyneema: "modern_recurve_target",
    bcyx_blend_hybrid: "compound_hunting_general",
    trophy_8190_speed: "compound_speed_target",
    flemish_twist_handmade: "traditional_selfbow",
  };
  return m[t];
}

export function bowStrings(): BowStringType[] {
  return ["dacron_b50_traditional", "fastflight_plus_dyneema", "bcyx_blend_hybrid", "trophy_8190_speed", "flemish_twist_handmade"];
}
