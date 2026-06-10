export type FabricMarkerType = "chalk_pencil_wax" | "water_soluble_pen" | "air_erasable_fade" | "heat_erasable_iron" | "tailor_chalk_wheel";

export function lineVisibility(t: FabricMarkerType): number {
  const m: Record<FabricMarkerType, number> = {
    chalk_pencil_wax: 7, water_soluble_pen: 9, air_erasable_fade: 8, heat_erasable_iron: 9, tailor_chalk_wheel: 6,
  };
  return m[t];
}

export function eraseEase(t: FabricMarkerType): number {
  const m: Record<FabricMarkerType, number> = {
    chalk_pencil_wax: 6, water_soluble_pen: 8, air_erasable_fade: 10, heat_erasable_iron: 9, tailor_chalk_wheel: 7,
  };
  return m[t];
}

export function linePrecision(t: FabricMarkerType): number {
  const m: Record<FabricMarkerType, number> = {
    chalk_pencil_wax: 7, water_soluble_pen: 9, air_erasable_fade: 8, heat_erasable_iron: 8, tailor_chalk_wheel: 5,
  };
  return m[t];
}

export function fabricRange(t: FabricMarkerType): number {
  const m: Record<FabricMarkerType, number> = {
    chalk_pencil_wax: 8, water_soluble_pen: 6, air_erasable_fade: 7, heat_erasable_iron: 9, tailor_chalk_wheel: 8,
  };
  return m[t];
}

export function markerCost(t: FabricMarkerType): number {
  const m: Record<FabricMarkerType, number> = {
    chalk_pencil_wax: 1, water_soluble_pen: 2, air_erasable_fade: 3, heat_erasable_iron: 3, tailor_chalk_wheel: 2,
  };
  return m[t];
}

export function selfErasing(t: FabricMarkerType): boolean {
  const m: Record<FabricMarkerType, boolean> = {
    chalk_pencil_wax: false, water_soluble_pen: false, air_erasable_fade: true, heat_erasable_iron: false, tailor_chalk_wheel: false,
  };
  return m[t];
}

export function needsWater(t: FabricMarkerType): boolean {
  const m: Record<FabricMarkerType, boolean> = {
    chalk_pencil_wax: false, water_soluble_pen: true, air_erasable_fade: false, heat_erasable_iron: false, tailor_chalk_wheel: false,
  };
  return m[t];
}

export function markMethod(t: FabricMarkerType): string {
  const m: Record<FabricMarkerType, string> = {
    chalk_pencil_wax: "wax_clay_pencil_drag",
    water_soluble_pen: "ink_pen_water_wash",
    air_erasable_fade: "vanishing_ink_air_fade",
    heat_erasable_iron: "friction_ink_heat_clear",
    tailor_chalk_wheel: "chalk_wheel_roll_line",
  };
  return m[t];
}

export function bestTask(t: FabricMarkerType): string {
  const m: Record<FabricMarkerType, string> = {
    chalk_pencil_wax: "dark_fabric_general",
    water_soluble_pen: "light_fabric_detail",
    air_erasable_fade: "quick_mark_fitting",
    heat_erasable_iron: "quilting_embroidery",
    tailor_chalk_wheel: "long_cut_line_pattern",
  };
  return m[t];
}

export function fabricMarkers(): FabricMarkerType[] {
  return ["chalk_pencil_wax", "water_soluble_pen", "air_erasable_fade", "heat_erasable_iron", "tailor_chalk_wheel"];
}
