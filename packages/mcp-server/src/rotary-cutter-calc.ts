export type RotaryCutterType = "standard_45mm" | "large_60mm" | "small_28mm" | "ergonomic_grip" | "electric_cordless";

export function cuttingSpeed(t: RotaryCutterType): number {
  const m: Record<RotaryCutterType, number> = {
    standard_45mm: 7, large_60mm: 9, small_28mm: 4, ergonomic_grip: 7, electric_cordless: 10,
  };
  return m[t];
}

export function precisionCut(t: RotaryCutterType): number {
  const m: Record<RotaryCutterType, number> = {
    standard_45mm: 7, large_60mm: 5, small_28mm: 10, ergonomic_grip: 8, electric_cordless: 6,
  };
  return m[t];
}

export function layerCapacity(t: RotaryCutterType): number {
  const m: Record<RotaryCutterType, number> = {
    standard_45mm: 6, large_60mm: 10, small_28mm: 2, ergonomic_grip: 6, electric_cordless: 8,
  };
  return m[t];
}

export function handComfort(t: RotaryCutterType): number {
  const m: Record<RotaryCutterType, number> = {
    standard_45mm: 6, large_60mm: 5, small_28mm: 7, ergonomic_grip: 10, electric_cordless: 8,
  };
  return m[t];
}

export function cutterCost(t: RotaryCutterType): number {
  const m: Record<RotaryCutterType, number> = {
    standard_45mm: 2, large_60mm: 3, small_28mm: 2, ergonomic_grip: 5, electric_cordless: 9,
  };
  return m[t];
}

export function safetyLock(t: RotaryCutterType): boolean {
  const m: Record<RotaryCutterType, boolean> = {
    standard_45mm: true, large_60mm: true, small_28mm: true, ergonomic_grip: true, electric_cordless: true,
  };
  return m[t];
}

export function replaceBlade(t: RotaryCutterType): boolean {
  const m: Record<RotaryCutterType, boolean> = {
    standard_45mm: true, large_60mm: true, small_28mm: true, ergonomic_grip: true, electric_cordless: false,
  };
  return m[t];
}

export function bladeType(t: RotaryCutterType): string {
  const m: Record<RotaryCutterType, string> = {
    standard_45mm: "circular_tungsten_45",
    large_60mm: "circular_tungsten_60",
    small_28mm: "circular_tungsten_28",
    ergonomic_grip: "soft_handle_contour_45",
    electric_cordless: "motorized_circular_blade",
  };
  return m[t];
}

export function bestProject(t: RotaryCutterType): string {
  const m: Record<RotaryCutterType, string> = {
    standard_45mm: "general_quilt_garment",
    large_60mm: "thick_denim_multi_layer",
    small_28mm: "curve_template_detail",
    ergonomic_grip: "long_session_arthritis",
    electric_cordless: "production_batch_cut",
  };
  return m[t];
}

export function rotaryCutters(): RotaryCutterType[] {
  return ["standard_45mm", "large_60mm", "small_28mm", "ergonomic_grip", "electric_cordless"];
}
