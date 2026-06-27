export type RibToolType = "wood_rib_kidney" | "metal_rib_steel" | "rubber_rib_flex" | "surform_rib_rasp" | "credit_card_rib";

export function smoothAbility(t: RibToolType): number {
  const m: Record<RibToolType, number> = {
    wood_rib_kidney: 8, metal_rib_steel: 9, rubber_rib_flex: 10, surform_rib_rasp: 3, credit_card_rib: 6,
  };
  return m[t];
}

export function shapeControl(t: RibToolType): number {
  const m: Record<RibToolType, number> = {
    wood_rib_kidney: 9, metal_rib_steel: 10, rubber_rib_flex: 7, surform_rib_rasp: 6, credit_card_rib: 5,
  };
  return m[t];
}

export function clayRemoval(t: RibToolType): number {
  const m: Record<RibToolType, number> = {
    wood_rib_kidney: 5, metal_rib_steel: 8, rubber_rib_flex: 3, surform_rib_rasp: 10, credit_card_rib: 4,
  };
  return m[t];
}

export function flexibility(t: RibToolType): number {
  const m: Record<RibToolType, number> = {
    wood_rib_kidney: 3, metal_rib_steel: 5, rubber_rib_flex: 10, surform_rib_rasp: 2, credit_card_rib: 7,
  };
  return m[t];
}

export function ribCost(t: RibToolType): number {
  const m: Record<RibToolType, number> = {
    wood_rib_kidney: 1, metal_rib_steel: 2, rubber_rib_flex: 2, surform_rib_rasp: 3, credit_card_rib: 1,
  };
  return m[t];
}

export function compresses(t: RibToolType): boolean {
  const m: Record<RibToolType, boolean> = {
    wood_rib_kidney: true, metal_rib_steel: true, rubber_rib_flex: true, surform_rib_rasp: false, credit_card_rib: true,
  };
  return m[t];
}

export function forTrimming(t: RibToolType): boolean {
  const m: Record<RibToolType, boolean> = {
    wood_rib_kidney: false, metal_rib_steel: true, rubber_rib_flex: false, surform_rib_rasp: true, credit_card_rib: false,
  };
  return m[t];
}

export function ribMaterial(t: RibToolType): string {
  const m: Record<RibToolType, string> = {
    wood_rib_kidney: "hardwood_curved_edge",
    metal_rib_steel: "spring_steel_blade",
    rubber_rib_flex: "silicone_rubber_sheet",
    surform_rib_rasp: "perforated_steel_rasp",
    credit_card_rib: "plastic_flat_card",
  };
  return m[t];
}

export function bestStage(t: RibToolType): string {
  const m: Record<RibToolType, string> = {
    wood_rib_kidney: "throwing_shape_form",
    metal_rib_steel: "trimming_refine_wall",
    rubber_rib_flex: "final_smooth_surface",
    surform_rib_rasp: "leather_hard_carve",
    credit_card_rib: "quick_smooth_fix",
  };
  return m[t];
}

export function ribTools(): RibToolType[] {
  return ["wood_rib_kidney", "metal_rib_steel", "rubber_rib_flex", "surform_rib_rasp", "credit_card_rib"];
}
