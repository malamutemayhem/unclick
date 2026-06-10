export type SnapPressType = "hand_plier_squeeze" | "table_press_heavy" | "kam_snap_plastic" | "metal_rivet_setter" | "sew_on_snap_ring";

export function snapStrength(t: SnapPressType): number {
  const m: Record<SnapPressType, number> = {
    hand_plier_squeeze: 7, table_press_heavy: 10, kam_snap_plastic: 6, metal_rivet_setter: 9, sew_on_snap_ring: 5,
  };
  return m[t];
}

export function easeOfUse(t: SnapPressType): number {
  const m: Record<SnapPressType, number> = {
    hand_plier_squeeze: 9, table_press_heavy: 6, kam_snap_plastic: 8, metal_rivet_setter: 5, sew_on_snap_ring: 7,
  };
  return m[t];
}

export function portability(t: SnapPressType): number {
  const m: Record<SnapPressType, number> = {
    hand_plier_squeeze: 10, table_press_heavy: 2, kam_snap_plastic: 8, metal_rivet_setter: 7, sew_on_snap_ring: 10,
  };
  return m[t];
}

export function snapVariety(t: SnapPressType): number {
  const m: Record<SnapPressType, number> = {
    hand_plier_squeeze: 6, table_press_heavy: 10, kam_snap_plastic: 8, metal_rivet_setter: 7, sew_on_snap_ring: 4,
  };
  return m[t];
}

export function pressCost(t: SnapPressType): number {
  const m: Record<SnapPressType, number> = {
    hand_plier_squeeze: 1, table_press_heavy: 3, kam_snap_plastic: 1, metal_rivet_setter: 2, sew_on_snap_ring: 1,
  };
  return m[t];
}

export function noSewing(t: SnapPressType): boolean {
  const m: Record<SnapPressType, boolean> = {
    hand_plier_squeeze: true, table_press_heavy: true, kam_snap_plastic: true, metal_rivet_setter: true, sew_on_snap_ring: false,
  };
  return m[t];
}

export function interchangeableDies(t: SnapPressType): boolean {
  const m: Record<SnapPressType, boolean> = {
    hand_plier_squeeze: false, table_press_heavy: true, kam_snap_plastic: false, metal_rivet_setter: true, sew_on_snap_ring: false,
  };
  return m[t];
}

export function snapMaterial(t: SnapPressType): string {
  const m: Record<SnapPressType, string> = {
    hand_plier_squeeze: "metal_prong_ring",
    table_press_heavy: "brass_nickel_assorted",
    kam_snap_plastic: "resin_plastic_color",
    metal_rivet_setter: "brass_copper_rivet",
    sew_on_snap_ring: "stainless_sewable_ring",
  };
  return m[t];
}

export function bestFabric(t: SnapPressType): string {
  const m: Record<SnapPressType, string> = {
    hand_plier_squeeze: "medium_weight_garment",
    table_press_heavy: "leather_canvas_heavy",
    kam_snap_plastic: "baby_clothes_diaper",
    metal_rivet_setter: "denim_jacket_bag",
    sew_on_snap_ring: "delicate_silk_knit",
  };
  return m[t];
}

export function snapPresses(): SnapPressType[] {
  return ["hand_plier_squeeze", "table_press_heavy", "kam_snap_plastic", "metal_rivet_setter", "sew_on_snap_ring"];
}
