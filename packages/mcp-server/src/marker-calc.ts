export type MarkerType = "permanent_sharpie" | "dry_erase_whiteboard" | "alcohol_art_copic" | "water_based_brush" | "paint_opaque_tip";

export function colorVibrancy(t: MarkerType): number {
  const m: Record<MarkerType, number> = {
    permanent_sharpie: 8, dry_erase_whiteboard: 5, alcohol_art_copic: 10, water_based_brush: 7, paint_opaque_tip: 9,
  };
  return m[t];
}

export function blendability(t: MarkerType): number {
  const m: Record<MarkerType, number> = {
    permanent_sharpie: 2, dry_erase_whiteboard: 1, alcohol_art_copic: 10, water_based_brush: 8, paint_opaque_tip: 3,
  };
  return m[t];
}

export function lightfastness(t: MarkerType): number {
  const m: Record<MarkerType, number> = {
    permanent_sharpie: 9, dry_erase_whiteboard: 1, alcohol_art_copic: 7, water_based_brush: 5, paint_opaque_tip: 8,
  };
  return m[t];
}

export function surfaceRange(t: MarkerType): number {
  const m: Record<MarkerType, number> = {
    permanent_sharpie: 10, dry_erase_whiteboard: 3, alcohol_art_copic: 5, water_based_brush: 6, paint_opaque_tip: 9,
  };
  return m[t];
}

export function markerCost(t: MarkerType): number {
  const m: Record<MarkerType, number> = {
    permanent_sharpie: 1, dry_erase_whiteboard: 2, alcohol_art_copic: 9, water_based_brush: 4, paint_opaque_tip: 5,
  };
  return m[t];
}

export function refillable(t: MarkerType): boolean {
  const m: Record<MarkerType, boolean> = {
    permanent_sharpie: false, dry_erase_whiteboard: false, alcohol_art_copic: true, water_based_brush: false, paint_opaque_tip: false,
  };
  return m[t];
}

export function washable(t: MarkerType): boolean {
  const m: Record<MarkerType, boolean> = {
    permanent_sharpie: false, dry_erase_whiteboard: true, alcohol_art_copic: false, water_based_brush: true, paint_opaque_tip: false,
  };
  return m[t];
}

export function inkType(t: MarkerType): string {
  const m: Record<MarkerType, string> = {
    permanent_sharpie: "solvent_based_permanent",
    dry_erase_whiteboard: "alcohol_low_odor_dry",
    alcohol_art_copic: "alcohol_dye_refillable",
    water_based_brush: "water_pigment_flexible",
    paint_opaque_tip: "acrylic_opaque_valve",
  };
  return m[t];
}

export function bestUse(t: MarkerType): string {
  const m: Record<MarkerType, string> = {
    permanent_sharpie: "labeling_shipping_sign",
    dry_erase_whiteboard: "meeting_classroom_board",
    alcohol_art_copic: "illustration_manga_render",
    water_based_brush: "watercolor_calligraphy",
    paint_opaque_tip: "rock_glass_dark_surface",
  };
  return m[t];
}

export function markers(): MarkerType[] {
  return ["permanent_sharpie", "dry_erase_whiteboard", "alcohol_art_copic", "water_based_brush", "paint_opaque_tip"];
}
