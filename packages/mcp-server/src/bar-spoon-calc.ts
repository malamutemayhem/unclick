export type BarSpoonType = "twisted_stem_classic" | "flat_end_muddler" | "disk_end_layering" | "trident_fork_garnish" | "japanese_teardrop_weighted";

export function stirControl(t: BarSpoonType): number {
  const m: Record<BarSpoonType, number> = {
    twisted_stem_classic: 8, flat_end_muddler: 6, disk_end_layering: 7, trident_fork_garnish: 7, japanese_teardrop_weighted: 10,
  };
  return m[t];
}

export function versatility(t: BarSpoonType): number {
  const m: Record<BarSpoonType, number> = {
    twisted_stem_classic: 6, flat_end_muddler: 9, disk_end_layering: 7, trident_fork_garnish: 10, japanese_teardrop_weighted: 5,
  };
  return m[t];
}

export function balance(t: BarSpoonType): number {
  const m: Record<BarSpoonType, number> = {
    twisted_stem_classic: 7, flat_end_muddler: 5, disk_end_layering: 8, trident_fork_garnish: 6, japanese_teardrop_weighted: 10,
  };
  return m[t];
}

export function layeringAbility(t: BarSpoonType): number {
  const m: Record<BarSpoonType, number> = {
    twisted_stem_classic: 6, flat_end_muddler: 3, disk_end_layering: 10, trident_fork_garnish: 5, japanese_teardrop_weighted: 8,
  };
  return m[t];
}

export function spoonCost(t: BarSpoonType): number {
  const m: Record<BarSpoonType, number> = {
    twisted_stem_classic: 3, flat_end_muddler: 4, disk_end_layering: 5, trident_fork_garnish: 5, japanese_teardrop_weighted: 7,
  };
  return m[t];
}

export function dualFunction(t: BarSpoonType): boolean {
  const m: Record<BarSpoonType, boolean> = {
    twisted_stem_classic: false, flat_end_muddler: true, disk_end_layering: false, trident_fork_garnish: true, japanese_teardrop_weighted: false,
  };
  return m[t];
}

export function weightedEnd(t: BarSpoonType): boolean {
  const m: Record<BarSpoonType, boolean> = {
    twisted_stem_classic: false, flat_end_muddler: false, disk_end_layering: true, trident_fork_garnish: false, japanese_teardrop_weighted: true,
  };
  return m[t];
}

export function stemFinish(t: BarSpoonType): string {
  const m: Record<BarSpoonType, string> = {
    twisted_stem_classic: "spiral_stainless_chrome",
    flat_end_muddler: "spiral_flat_paddle_end",
    disk_end_layering: "spiral_disk_float_end",
    trident_fork_garnish: "spiral_trident_prong_end",
    japanese_teardrop_weighted: "smooth_teardrop_counterweight",
  };
  return m[t];
}

export function bestDrink(t: BarSpoonType): string {
  const m: Record<BarSpoonType, string> = {
    twisted_stem_classic: "martini_manhattan_stirred",
    flat_end_muddler: "mojito_old_fashioned_muddle",
    disk_end_layering: "pousse_cafe_layered_shot",
    trident_fork_garnish: "olive_cherry_garnish_pick",
    japanese_teardrop_weighted: "precise_japanese_cocktail",
  };
  return m[t];
}

export function barSpoons(): BarSpoonType[] {
  return ["twisted_stem_classic", "flat_end_muddler", "disk_end_layering", "trident_fork_garnish", "japanese_teardrop_weighted"];
}
