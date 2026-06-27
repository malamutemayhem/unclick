export type PetBrushType = "slicker_wire" | "bristle_boar_hair" | "deshedding_blade" | "rubber_curry_comb" | "pin_brush_round";

export function sheddingRemoval(t: PetBrushType): number {
  const m: Record<PetBrushType, number> = {
    slicker_wire: 8, bristle_boar_hair: 4, deshedding_blade: 10, rubber_curry_comb: 6, pin_brush_round: 5,
  };
  return m[t];
}

export function gentleness(t: PetBrushType): number {
  const m: Record<PetBrushType, number> = {
    slicker_wire: 5, bristle_boar_hair: 9, deshedding_blade: 3, rubber_curry_comb: 10, pin_brush_round: 7,
  };
  return m[t];
}

export function detangling(t: PetBrushType): number {
  const m: Record<PetBrushType, number> = {
    slicker_wire: 9, bristle_boar_hair: 3, deshedding_blade: 5, rubber_curry_comb: 2, pin_brush_round: 7,
  };
  return m[t];
}

export function shineBoost(t: PetBrushType): number {
  const m: Record<PetBrushType, number> = {
    slicker_wire: 4, bristle_boar_hair: 10, deshedding_blade: 3, rubber_curry_comb: 7, pin_brush_round: 6,
  };
  return m[t];
}

export function brushCost(t: PetBrushType): number {
  const m: Record<PetBrushType, number> = {
    slicker_wire: 3, bristle_boar_hair: 4, deshedding_blade: 7, rubber_curry_comb: 2, pin_brush_round: 3,
  };
  return m[t];
}

export function selfCleaning(t: PetBrushType): boolean {
  const m: Record<PetBrushType, boolean> = {
    slicker_wire: true, bristle_boar_hair: false, deshedding_blade: false, rubber_curry_comb: true, pin_brush_round: false,
  };
  return m[t];
}

export function safeForKittens(t: PetBrushType): boolean {
  const m: Record<PetBrushType, boolean> = {
    slicker_wire: false, bristle_boar_hair: true, deshedding_blade: false, rubber_curry_comb: true, pin_brush_round: true,
  };
  return m[t];
}

export function bristleType(t: PetBrushType): string {
  const m: Record<PetBrushType, string> = {
    slicker_wire: "fine_bent_wire_pins",
    bristle_boar_hair: "natural_boar_bristle",
    deshedding_blade: "stainless_comb_edge",
    rubber_curry_comb: "flexible_rubber_nubs",
    pin_brush_round: "polished_steel_ball_tip",
  };
  return m[t];
}

export function bestCoat(t: PetBrushType): string {
  const m: Record<PetBrushType, string> = {
    slicker_wire: "long_curly_matting_prone",
    bristle_boar_hair: "short_smooth_finish_coat",
    deshedding_blade: "thick_double_coat_seasonal",
    rubber_curry_comb: "short_hair_sensitive_skin",
    pin_brush_round: "medium_wavy_show_prep",
  };
  return m[t];
}

export function petBrushes(): PetBrushType[] {
  return ["slicker_wire", "bristle_boar_hair", "deshedding_blade", "rubber_curry_comb", "pin_brush_round"];
}
