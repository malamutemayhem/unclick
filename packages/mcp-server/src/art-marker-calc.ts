export type ArtMarkerType = "alcohol_dual_tip" | "water_based_brush" | "acrylic_paint_pen" | "chalk_liquid" | "fabric_permanent";

export function colorVibrancy(t: ArtMarkerType): number {
  const m: Record<ArtMarkerType, number> = {
    alcohol_dual_tip: 10, water_based_brush: 7, acrylic_paint_pen: 9, chalk_liquid: 6, fabric_permanent: 7,
  };
  return m[t];
}

export function blendAbility(t: ArtMarkerType): number {
  const m: Record<ArtMarkerType, number> = {
    alcohol_dual_tip: 10, water_based_brush: 8, acrylic_paint_pen: 3, chalk_liquid: 2, fabric_permanent: 2,
  };
  return m[t];
}

export function lineControl(t: ArtMarkerType): number {
  const m: Record<ArtMarkerType, number> = {
    alcohol_dual_tip: 8, water_based_brush: 9, acrylic_paint_pen: 7, chalk_liquid: 5, fabric_permanent: 6,
  };
  return m[t];
}

export function surfaceRange(t: ArtMarkerType): number {
  const m: Record<ArtMarkerType, number> = {
    alcohol_dual_tip: 6, water_based_brush: 5, acrylic_paint_pen: 10, chalk_liquid: 8, fabric_permanent: 7,
  };
  return m[t];
}

export function markerCost(t: ArtMarkerType): number {
  const m: Record<ArtMarkerType, number> = {
    alcohol_dual_tip: 8, water_based_brush: 5, acrylic_paint_pen: 6, chalk_liquid: 3, fabric_permanent: 4,
  };
  return m[t];
}

export function refillable(t: ArtMarkerType): boolean {
  const m: Record<ArtMarkerType, boolean> = {
    alcohol_dual_tip: true, water_based_brush: false, acrylic_paint_pen: false, chalk_liquid: true, fabric_permanent: false,
  };
  return m[t];
}

export function waterproof(t: ArtMarkerType): boolean {
  const m: Record<ArtMarkerType, boolean> = {
    alcohol_dual_tip: true, water_based_brush: false, acrylic_paint_pen: true, chalk_liquid: false, fabric_permanent: true,
  };
  return m[t];
}

export function tipStyle(t: ArtMarkerType): string {
  const m: Record<ArtMarkerType, string> = {
    alcohol_dual_tip: "chisel_brush_dual_end",
    water_based_brush: "flexible_nylon_brush",
    acrylic_paint_pen: "valve_action_round",
    chalk_liquid: "felt_chisel_reversible",
    fabric_permanent: "fine_point_fiber",
  };
  return m[t];
}

export function bestProject(t: ArtMarkerType): string {
  const m: Record<ArtMarkerType, string> = {
    alcohol_dual_tip: "illustration_manga_render",
    water_based_brush: "calligraphy_lettering",
    acrylic_paint_pen: "rock_canvas_mixed_surface",
    chalk_liquid: "chalkboard_sign_menu",
    fabric_permanent: "tshirt_textile_custom",
  };
  return m[t];
}

export function artMarkers(): ArtMarkerType[] {
  return ["alcohol_dual_tip", "water_based_brush", "acrylic_paint_pen", "chalk_liquid", "fabric_permanent"];
}
