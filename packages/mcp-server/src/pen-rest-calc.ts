export type PenRestType = "ceramic_groove_single" | "brass_roll_stop" | "bamboo_rack_multi" | "felt_pad_tray" | "acrylic_display_stand";

export function nibProtect(t: PenRestType): number {
  const m: Record<PenRestType, number> = {
    ceramic_groove_single: 9, brass_roll_stop: 7, bamboo_rack_multi: 8, felt_pad_tray: 10, acrylic_display_stand: 7,
  };
  return m[t];
}

export function penCapacity(t: PenRestType): number {
  const m: Record<PenRestType, number> = {
    ceramic_groove_single: 3, brass_roll_stop: 4, bamboo_rack_multi: 10, felt_pad_tray: 8, acrylic_display_stand: 9,
  };
  return m[t];
}

export function inkContain(t: PenRestType): number {
  const m: Record<PenRestType, number> = {
    ceramic_groove_single: 8, brass_roll_stop: 5, bamboo_rack_multi: 4, felt_pad_tray: 10, acrylic_display_stand: 6,
  };
  return m[t];
}

export function aesthetics(t: PenRestType): number {
  const m: Record<PenRestType, number> = {
    ceramic_groove_single: 9, brass_roll_stop: 8, bamboo_rack_multi: 7, felt_pad_tray: 5, acrylic_display_stand: 10,
  };
  return m[t];
}

export function restCost(t: PenRestType): number {
  const m: Record<PenRestType, number> = {
    ceramic_groove_single: 2, brass_roll_stop: 2, bamboo_rack_multi: 2, felt_pad_tray: 1, acrylic_display_stand: 3,
  };
  return m[t];
}

export function rollProof(t: PenRestType): boolean {
  const m: Record<PenRestType, boolean> = {
    ceramic_groove_single: true, brass_roll_stop: true, bamboo_rack_multi: true, felt_pad_tray: true, acrylic_display_stand: true,
  };
  return m[t];
}

export function multiPen(t: PenRestType): boolean {
  const m: Record<PenRestType, boolean> = {
    ceramic_groove_single: false, brass_roll_stop: false, bamboo_rack_multi: true, felt_pad_tray: true, acrylic_display_stand: true,
  };
  return m[t];
}

export function restMaterial(t: PenRestType): string {
  const m: Record<PenRestType, string> = {
    ceramic_groove_single: "glazed_porcelain_dish",
    brass_roll_stop: "solid_brass_bar",
    bamboo_rack_multi: "natural_bamboo_slot",
    felt_pad_tray: "wool_felt_lined",
    acrylic_display_stand: "clear_acrylic_tier",
  };
  return m[t];
}

export function bestSetup(t: PenRestType): string {
  const m: Record<PenRestType, string> = {
    ceramic_groove_single: "single_pen_desk",
    brass_roll_stop: "weighted_roll_stop",
    bamboo_rack_multi: "studio_brush_rack",
    felt_pad_tray: "ink_splash_protect",
    acrylic_display_stand: "collection_display_show",
  };
  return m[t];
}

export function penRests(): PenRestType[] {
  return ["ceramic_groove_single", "brass_roll_stop", "bamboo_rack_multi", "felt_pad_tray", "acrylic_display_stand"];
}
