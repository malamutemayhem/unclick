export type CameraCageType = "half_cage_minimal" | "full_cage_rig" | "l_bracket_plate" | "modular_rail_system" | "smartphone_cage_mount";

export function accessoryMount(t: CameraCageType): number {
  const m: Record<CameraCageType, number> = {
    half_cage_minimal: 5, full_cage_rig: 10, l_bracket_plate: 3, modular_rail_system: 9, smartphone_cage_mount: 6,
  };
  return m[t];
}

export function cameraProtection(t: CameraCageType): number {
  const m: Record<CameraCageType, number> = {
    half_cage_minimal: 6, full_cage_rig: 10, l_bracket_plate: 4, modular_rail_system: 7, smartphone_cage_mount: 8,
  };
  return m[t];
}

export function portability(t: CameraCageType): number {
  const m: Record<CameraCageType, number> = {
    half_cage_minimal: 8, full_cage_rig: 3, l_bracket_plate: 9, modular_rail_system: 2, smartphone_cage_mount: 7,
  };
  return m[t];
}

export function gripComfort(t: CameraCageType): number {
  const m: Record<CameraCageType, number> = {
    half_cage_minimal: 7, full_cage_rig: 9, l_bracket_plate: 5, modular_rail_system: 8, smartphone_cage_mount: 7,
  };
  return m[t];
}

export function cageCost(t: CameraCageType): number {
  const m: Record<CameraCageType, number> = {
    half_cage_minimal: 3, full_cage_rig: 7, l_bracket_plate: 4, modular_rail_system: 9, smartphone_cage_mount: 2,
  };
  return m[t];
}

export function arcaCompatible(t: CameraCageType): boolean {
  const m: Record<CameraCageType, boolean> = {
    half_cage_minimal: true, full_cage_rig: true, l_bracket_plate: true, modular_rail_system: true, smartphone_cage_mount: false,
  };
  return m[t];
}

export function coldShoeMount(t: CameraCageType): boolean {
  const m: Record<CameraCageType, boolean> = {
    half_cage_minimal: true, full_cage_rig: true, l_bracket_plate: false, modular_rail_system: true, smartphone_cage_mount: true,
  };
  return m[t];
}

export function cageMaterial(t: CameraCageType): string {
  const m: Record<CameraCageType, string> = {
    half_cage_minimal: "aluminum_cnc_minimal",
    full_cage_rig: "aluminum_full_surround",
    l_bracket_plate: "arca_swiss_l_plate",
    modular_rail_system: "nato_rail_rod_system",
    smartphone_cage_mount: "aluminum_phone_clamp",
  };
  return m[t];
}

export function bestSetup(t: CameraCageType): string {
  const m: Record<CameraCageType, string> = {
    half_cage_minimal: "run_gun_light_rig",
    full_cage_rig: "video_production_full",
    l_bracket_plate: "tripod_portrait_switch",
    modular_rail_system: "cinema_follow_focus",
    smartphone_cage_mount: "phone_filmmaker_vlog",
  };
  return m[t];
}

export function cameraCages(): CameraCageType[] {
  return ["half_cage_minimal", "full_cage_rig", "l_bracket_plate", "modular_rail_system", "smartphone_cage_mount"];
}
