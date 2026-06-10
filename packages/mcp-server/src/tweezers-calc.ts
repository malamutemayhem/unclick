export type TweezersType = "slant_tip_precision" | "point_tip_ingrown" | "flat_tip_splinter" | "round_tip_safety" | "scissor_handle_craft";

export function gripPrecision(t: TweezersType): number {
  const m: Record<TweezersType, number> = {
    slant_tip_precision: 9, point_tip_ingrown: 10, flat_tip_splinter: 7, round_tip_safety: 5, scissor_handle_craft: 8,
  };
  return m[t];
}

export function versatility(t: TweezersType): number {
  const m: Record<TweezersType, number> = {
    slant_tip_precision: 10, point_tip_ingrown: 6, flat_tip_splinter: 7, round_tip_safety: 8, scissor_handle_craft: 5,
  };
  return m[t];
}

export function safety(t: TweezersType): number {
  const m: Record<TweezersType, number> = {
    slant_tip_precision: 7, point_tip_ingrown: 3, flat_tip_splinter: 6, round_tip_safety: 10, scissor_handle_craft: 8,
  };
  return m[t];
}

export function fineHairGrip(t: TweezersType): number {
  const m: Record<TweezersType, number> = {
    slant_tip_precision: 9, point_tip_ingrown: 10, flat_tip_splinter: 5, round_tip_safety: 4, scissor_handle_craft: 7,
  };
  return m[t];
}

export function tweezCost(t: TweezersType): number {
  const m: Record<TweezersType, number> = {
    slant_tip_precision: 6, point_tip_ingrown: 7, flat_tip_splinter: 4, round_tip_safety: 5, scissor_handle_craft: 8,
  };
  return m[t];
}

export function travelSafe(t: TweezersType): boolean {
  const m: Record<TweezersType, boolean> = {
    slant_tip_precision: true, point_tip_ingrown: false, flat_tip_splinter: true, round_tip_safety: true, scissor_handle_craft: false,
  };
  return m[t];
}

export function alignedTips(t: TweezersType): boolean {
  const m: Record<TweezersType, boolean> = {
    slant_tip_precision: true, point_tip_ingrown: true, flat_tip_splinter: true, round_tip_safety: false, scissor_handle_craft: true,
  };
  return m[t];
}

export function tipMaterial(t: TweezersType): string {
  const m: Record<TweezersType, string> = {
    slant_tip_precision: "stainless_steel_tempered",
    point_tip_ingrown: "surgical_steel_sharp",
    flat_tip_splinter: "titanium_coated_flat",
    round_tip_safety: "rounded_steel_polished",
    scissor_handle_craft: "spring_steel_ergonomic",
  };
  return m[t];
}

export function bestUse(t: TweezersType): string {
  const m: Record<TweezersType, string> = {
    slant_tip_precision: "eyebrow_shaping_daily",
    point_tip_ingrown: "ingrown_hair_splinter",
    flat_tip_splinter: "tick_removal_first_aid",
    round_tip_safety: "baby_child_sensitive",
    scissor_handle_craft: "jewelry_electronics_craft",
  };
  return m[t];
}

export function tweezers(): TweezersType[] {
  return ["slant_tip_precision", "point_tip_ingrown", "flat_tip_splinter", "round_tip_safety", "scissor_handle_craft"];
}
