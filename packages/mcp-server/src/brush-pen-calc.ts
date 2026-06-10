export type BrushPenType = "felt_tip_firm" | "nylon_bristle_flex" | "sable_hair_natural" | "water_brush_refill" | "fude_bent_tip";

export function lineVariation(t: BrushPenType): number {
  const m: Record<BrushPenType, number> = {
    felt_tip_firm: 5, nylon_bristle_flex: 9, sable_hair_natural: 10, water_brush_refill: 7, fude_bent_tip: 8,
  };
  return m[t];
}

export function controlEase(t: BrushPenType): number {
  const m: Record<BrushPenType, number> = {
    felt_tip_firm: 10, nylon_bristle_flex: 7, sable_hair_natural: 6, water_brush_refill: 8, fude_bent_tip: 7,
  };
  return m[t];
}

export function inkFlow(t: BrushPenType): number {
  const m: Record<BrushPenType, number> = {
    felt_tip_firm: 8, nylon_bristle_flex: 7, sable_hair_natural: 9, water_brush_refill: 10, fude_bent_tip: 7,
  };
  return m[t];
}

export function tipRecovery(t: BrushPenType): number {
  const m: Record<BrushPenType, number> = {
    felt_tip_firm: 6, nylon_bristle_flex: 9, sable_hair_natural: 10, water_brush_refill: 7, fude_bent_tip: 8,
  };
  return m[t];
}

export function brushCost(t: BrushPenType): number {
  const m: Record<BrushPenType, number> = {
    felt_tip_firm: 1, nylon_bristle_flex: 2, sable_hair_natural: 4, water_brush_refill: 1, fude_bent_tip: 2,
  };
  return m[t];
}

export function refillable(t: BrushPenType): boolean {
  const m: Record<BrushPenType, boolean> = {
    felt_tip_firm: false, nylon_bristle_flex: false, sable_hair_natural: true, water_brush_refill: true, fude_bent_tip: false,
  };
  return m[t];
}

export function bentTip(t: BrushPenType): boolean {
  const m: Record<BrushPenType, boolean> = {
    felt_tip_firm: false, nylon_bristle_flex: false, sable_hair_natural: false, water_brush_refill: false, fude_bent_tip: true,
  };
  return m[t];
}

export function tipMaterial(t: BrushPenType): string {
  const m: Record<BrushPenType, string> = {
    felt_tip_firm: "polyester_felt_hard",
    nylon_bristle_flex: "nylon_fiber_bundle",
    sable_hair_natural: "kolinsky_sable_hair",
    water_brush_refill: "nylon_water_reservoir",
    fude_bent_tip: "nylon_angled_bend",
  };
  return m[t];
}

export function bestStyle(t: BrushPenType): string {
  const m: Record<BrushPenType, string> = {
    felt_tip_firm: "hand_lettering_sign",
    nylon_bristle_flex: "brush_script_modern",
    sable_hair_natural: "east_asian_sumi",
    water_brush_refill: "watercolor_lettering",
    fude_bent_tip: "manga_effect_line",
  };
  return m[t];
}

export function brushPens(): BrushPenType[] {
  return ["felt_tip_firm", "nylon_bristle_flex", "sable_hair_natural", "water_brush_refill", "fude_bent_tip"];
}
