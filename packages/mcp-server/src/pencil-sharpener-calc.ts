export type PencilSharpenerType = "manual_hand_crank" | "electric_desktop" | "battery_portable" | "helical_blade" | "sandpaper_block";

export function sharpnessResult(t: PencilSharpenerType): number {
  const m: Record<PencilSharpenerType, number> = {
    manual_hand_crank: 7, electric_desktop: 9, battery_portable: 7, helical_blade: 10, sandpaper_block: 5,
  };
  return m[t];
}

export function sharpSpeed(t: PencilSharpenerType): number {
  const m: Record<PencilSharpenerType, number> = {
    manual_hand_crank: 5, electric_desktop: 10, battery_portable: 8, helical_blade: 6, sandpaper_block: 2,
  };
  return m[t];
}

export function pencilSafe(t: PencilSharpenerType): number {
  const m: Record<PencilSharpenerType, number> = {
    manual_hand_crank: 8, electric_desktop: 6, battery_portable: 7, helical_blade: 9, sandpaper_block: 10,
  };
  return m[t];
}

export function noiseLevel(t: PencilSharpenerType): number {
  const m: Record<PencilSharpenerType, number> = {
    manual_hand_crank: 3, electric_desktop: 8, battery_portable: 6, helical_blade: 2, sandpaper_block: 1,
  };
  return m[t];
}

export function sharpenerCost(t: PencilSharpenerType): number {
  const m: Record<PencilSharpenerType, number> = {
    manual_hand_crank: 3, electric_desktop: 7, battery_portable: 5, helical_blade: 8, sandpaper_block: 1,
  };
  return m[t];
}

export function autoStop(t: PencilSharpenerType): boolean {
  const m: Record<PencilSharpenerType, boolean> = {
    manual_hand_crank: false, electric_desktop: true, battery_portable: true, helical_blade: false, sandpaper_block: false,
  };
  return m[t];
}

export function shavingsCatcher(t: PencilSharpenerType): boolean {
  const m: Record<PencilSharpenerType, boolean> = {
    manual_hand_crank: true, electric_desktop: true, battery_portable: true, helical_blade: true, sandpaper_block: false,
  };
  return m[t];
}

export function bladeType(t: PencilSharpenerType): string {
  const m: Record<PencilSharpenerType, string> = {
    manual_hand_crank: "single_steel_rotary",
    electric_desktop: "dual_motor_spiral",
    battery_portable: "compact_motor_blade",
    helical_blade: "multi_edge_helical_cutter",
    sandpaper_block: "abrasive_grit_surface",
  };
  return m[t];
}

export function bestUse(t: PencilSharpenerType): string {
  const m: Record<PencilSharpenerType, string> = {
    manual_hand_crank: "classroom_student_desk",
    electric_desktop: "office_high_volume",
    battery_portable: "travel_field_sketching",
    helical_blade: "artist_precision_point",
    sandpaper_block: "charcoal_pastel_art",
  };
  return m[t];
}

export function pencilSharpeners(): PencilSharpenerType[] {
  return ["manual_hand_crank", "electric_desktop", "battery_portable", "helical_blade", "sandpaper_block"];
}
