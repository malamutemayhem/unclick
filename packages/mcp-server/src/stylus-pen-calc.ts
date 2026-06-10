export type StylusPenType = "rubber_tip_passive" | "fine_tip_active" | "apple_pencil_pro" | "mesh_fiber_universal" | "disc_tip_precision";

export function writingPrecision(t: StylusPenType): number {
  const m: Record<StylusPenType, number> = {
    rubber_tip_passive: 4, fine_tip_active: 9, apple_pencil_pro: 10, mesh_fiber_universal: 5, disc_tip_precision: 7,
  };
  return m[t];
}

export function pressureSensitivity(t: StylusPenType): number {
  const m: Record<StylusPenType, number> = {
    rubber_tip_passive: 1, fine_tip_active: 8, apple_pencil_pro: 10, mesh_fiber_universal: 1, disc_tip_precision: 1,
  };
  return m[t];
}

export function deviceCompat(t: StylusPenType): number {
  const m: Record<StylusPenType, number> = {
    rubber_tip_passive: 10, fine_tip_active: 6, apple_pencil_pro: 2, mesh_fiber_universal: 10, disc_tip_precision: 9,
  };
  return m[t];
}

export function comfort(t: StylusPenType): number {
  const m: Record<StylusPenType, number> = {
    rubber_tip_passive: 6, fine_tip_active: 8, apple_pencil_pro: 10, mesh_fiber_universal: 5, disc_tip_precision: 7,
  };
  return m[t];
}

export function stylusCost(t: StylusPenType): number {
  const m: Record<StylusPenType, number> = {
    rubber_tip_passive: 1, fine_tip_active: 5, apple_pencil_pro: 10, mesh_fiber_universal: 2, disc_tip_precision: 3,
  };
  return m[t];
}

export function needsBattery(t: StylusPenType): boolean {
  const m: Record<StylusPenType, boolean> = {
    rubber_tip_passive: false, fine_tip_active: true, apple_pencil_pro: true, mesh_fiber_universal: false, disc_tip_precision: false,
  };
  return m[t];
}

export function tiltDetect(t: StylusPenType): boolean {
  const m: Record<StylusPenType, boolean> = {
    rubber_tip_passive: false, fine_tip_active: false, apple_pencil_pro: true, mesh_fiber_universal: false, disc_tip_precision: false,
  };
  return m[t];
}

export function tipMaterial(t: StylusPenType): string {
  const m: Record<StylusPenType, string> = {
    rubber_tip_passive: "conductive_rubber_dome",
    fine_tip_active: "hard_plastic_active_point",
    apple_pencil_pro: "pixel_perfect_active_tip",
    mesh_fiber_universal: "conductive_mesh_weave",
    disc_tip_precision: "clear_disc_floating_point",
  };
  return m[t];
}

export function bestUse(t: StylusPenType): string {
  const m: Record<StylusPenType, string> = {
    rubber_tip_passive: "basic_scroll_tap_navigate",
    fine_tip_active: "note_taking_annotation",
    apple_pencil_pro: "digital_art_procreate",
    mesh_fiber_universal: "glove_friendly_winter",
    disc_tip_precision: "drawing_on_any_screen",
  };
  return m[t];
}

export function stylusPens(): StylusPenType[] {
  return ["rubber_tip_passive", "fine_tip_active", "apple_pencil_pro", "mesh_fiber_universal", "disc_tip_precision"];
}
