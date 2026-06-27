export type BabyBottleType = "standard_narrow_neck" | "wide_neck_natural_latch" | "anti_colic_vented" | "glass_borosilicate_safe" | "silicone_squeezable_soft";

export function latchEase(t: BabyBottleType): number {
  const m: Record<BabyBottleType, number> = {
    standard_narrow_neck: 6, wide_neck_natural_latch: 9, anti_colic_vented: 7, glass_borosilicate_safe: 7, silicone_squeezable_soft: 10,
  };
  return m[t];
}

export function colicReduce(t: BabyBottleType): number {
  const m: Record<BabyBottleType, number> = {
    standard_narrow_neck: 4, wide_neck_natural_latch: 6, anti_colic_vented: 10, glass_borosilicate_safe: 5, silicone_squeezable_soft: 7,
  };
  return m[t];
}

export function cleanEase(t: BabyBottleType): number {
  const m: Record<BabyBottleType, number> = {
    standard_narrow_neck: 5, wide_neck_natural_latch: 8, anti_colic_vented: 4, glass_borosilicate_safe: 9, silicone_squeezable_soft: 7,
  };
  return m[t];
}

export function durability(t: BabyBottleType): number {
  const m: Record<BabyBottleType, number> = {
    standard_narrow_neck: 7, wide_neck_natural_latch: 7, anti_colic_vented: 6, glass_borosilicate_safe: 5, silicone_squeezable_soft: 9,
  };
  return m[t];
}

export function bottleCost(t: BabyBottleType): number {
  const m: Record<BabyBottleType, number> = {
    standard_narrow_neck: 1, wide_neck_natural_latch: 2, anti_colic_vented: 3, glass_borosilicate_safe: 4, silicone_squeezable_soft: 3,
  };
  return m[t];
}

export function bpaFree(t: BabyBottleType): boolean {
  const m: Record<BabyBottleType, boolean> = {
    standard_narrow_neck: true, wide_neck_natural_latch: true, anti_colic_vented: true, glass_borosilicate_safe: true, silicone_squeezable_soft: true,
  };
  return m[t];
}

export function dishwasherSafe(t: BabyBottleType): boolean {
  const m: Record<BabyBottleType, boolean> = {
    standard_narrow_neck: true, wide_neck_natural_latch: true, anti_colic_vented: true, glass_borosilicate_safe: true, silicone_squeezable_soft: false,
  };
  return m[t];
}

export function bottleMaterial(t: BabyBottleType): string {
  const m: Record<BabyBottleType, string> = {
    standard_narrow_neck: "polypropylene_bpa_free",
    wide_neck_natural_latch: "ppsu_amber_plastic",
    anti_colic_vented: "pp_with_vent_system",
    glass_borosilicate_safe: "borosilicate_tempered",
    silicone_squeezable_soft: "food_grade_silicone",
  };
  return m[t];
}

export function bestStage(t: BabyBottleType): string {
  const m: Record<BabyBottleType, string> = {
    standard_narrow_neck: "newborn_hospital_start",
    wide_neck_natural_latch: "breast_to_bottle_transition",
    anti_colic_vented: "gassy_reflux_baby",
    glass_borosilicate_safe: "eco_conscious_parent",
    silicone_squeezable_soft: "self_feeding_toddler",
  };
  return m[t];
}

export function babyBottles(): BabyBottleType[] {
  return ["standard_narrow_neck", "wide_neck_natural_latch", "anti_colic_vented", "glass_borosilicate_safe", "silicone_squeezable_soft"];
}
