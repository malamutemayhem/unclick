export type ResinBezelType = "round_pendant_open" | "square_tray_flat" | "oval_cameo_deep" | "rectangle_frame_edge" | "freeform_wire_wrap";

export function resinCapacity(t: ResinBezelType): number {
  const m: Record<ResinBezelType, number> = {
    round_pendant_open: 6, square_tray_flat: 8, oval_cameo_deep: 9, rectangle_frame_edge: 7, freeform_wire_wrap: 5,
  };
  return m[t];
}

export function designFreedom(t: ResinBezelType): number {
  const m: Record<ResinBezelType, number> = {
    round_pendant_open: 6, square_tray_flat: 7, oval_cameo_deep: 7, rectangle_frame_edge: 8, freeform_wire_wrap: 10,
  };
  return m[t];
}

export function easeOfUse(t: ResinBezelType): number {
  const m: Record<ResinBezelType, number> = {
    round_pendant_open: 9, square_tray_flat: 10, oval_cameo_deep: 7, rectangle_frame_edge: 8, freeform_wire_wrap: 4,
  };
  return m[t];
}

export function leakResist(t: ResinBezelType): number {
  const m: Record<ResinBezelType, number> = {
    round_pendant_open: 6, square_tray_flat: 9, oval_cameo_deep: 10, rectangle_frame_edge: 8, freeform_wire_wrap: 3,
  };
  return m[t];
}

export function bezelCost(t: ResinBezelType): number {
  const m: Record<ResinBezelType, number> = {
    round_pendant_open: 2, square_tray_flat: 2, oval_cameo_deep: 3, rectangle_frame_edge: 3, freeform_wire_wrap: 4,
  };
  return m[t];
}

export function hasBack(t: ResinBezelType): boolean {
  const m: Record<ResinBezelType, boolean> = {
    round_pendant_open: false, square_tray_flat: true, oval_cameo_deep: true, rectangle_frame_edge: false, freeform_wire_wrap: false,
  };
  return m[t];
}

export function forPendant(t: ResinBezelType): boolean {
  const m: Record<ResinBezelType, boolean> = {
    round_pendant_open: true, square_tray_flat: true, oval_cameo_deep: true, rectangle_frame_edge: true, freeform_wire_wrap: true,
  };
  return m[t];
}

export function bezelMetal(t: ResinBezelType): string {
  const m: Record<ResinBezelType, string> = {
    round_pendant_open: "zinc_alloy_plated",
    square_tray_flat: "brass_silver_plate",
    oval_cameo_deep: "copper_antique_finish",
    rectangle_frame_edge: "stainless_steel_frame",
    freeform_wire_wrap: "copper_wire_formed",
  };
  return m[t];
}

export function bestUse(t: ResinBezelType): string {
  const m: Record<ResinBezelType, string> = {
    round_pendant_open: "photo_resin_pendant",
    square_tray_flat: "flat_art_preserve",
    oval_cameo_deep: "deep_pour_embed",
    rectangle_frame_edge: "open_back_window",
    freeform_wire_wrap: "unique_art_piece",
  };
  return m[t];
}

export function resinBezels(): ResinBezelType[] {
  return ["round_pendant_open", "square_tray_flat", "oval_cameo_deep", "rectangle_frame_edge", "freeform_wire_wrap"];
}
