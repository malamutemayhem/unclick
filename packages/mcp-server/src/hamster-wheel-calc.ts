export type HamsterWheelType = "wire_mesh_open" | "solid_plastic" | "silent_spinner" | "flying_saucer" | "wood_cork_natural";

export function runSurface(t: HamsterWheelType): number {
  const m: Record<HamsterWheelType, number> = {
    wire_mesh_open: 4, solid_plastic: 8, silent_spinner: 9, flying_saucer: 7, wood_cork_natural: 10,
  };
  return m[t];
}

export function noiseLevel(t: HamsterWheelType): number {
  const m: Record<HamsterWheelType, number> = {
    wire_mesh_open: 8, solid_plastic: 5, silent_spinner: 1, flying_saucer: 3, wood_cork_natural: 4,
  };
  return m[t];
}

export function pawSafety(t: HamsterWheelType): number {
  const m: Record<HamsterWheelType, number> = {
    wire_mesh_open: 3, solid_plastic: 8, silent_spinner: 9, flying_saucer: 10, wood_cork_natural: 9,
  };
  return m[t];
}

export function cleanability(t: HamsterWheelType): number {
  const m: Record<HamsterWheelType, number> = {
    wire_mesh_open: 5, solid_plastic: 9, silent_spinner: 8, flying_saucer: 10, wood_cork_natural: 3,
  };
  return m[t];
}

export function wheelCost(t: HamsterWheelType): number {
  const m: Record<HamsterWheelType, number> = {
    wire_mesh_open: 1, solid_plastic: 3, silent_spinner: 6, flying_saucer: 5, wood_cork_natural: 8,
  };
  return m[t];
}

export function freestanding(t: HamsterWheelType): boolean {
  const m: Record<HamsterWheelType, boolean> = {
    wire_mesh_open: false, solid_plastic: true, silent_spinner: true, flying_saucer: true, wood_cork_natural: true,
  };
  return m[t];
}

export function chewResistant(t: HamsterWheelType): boolean {
  const m: Record<HamsterWheelType, boolean> = {
    wire_mesh_open: true, solid_plastic: false, silent_spinner: false, flying_saucer: false, wood_cork_natural: false,
  };
  return m[t];
}

export function spinMechanism(t: HamsterWheelType): string {
  const m: Record<HamsterWheelType, string> = {
    wire_mesh_open: "axle_clip_basic",
    solid_plastic: "center_post_bushing",
    silent_spinner: "ball_bearing_sealed",
    flying_saucer: "angled_disc_pivot",
    wood_cork_natural: "axle_bearing_smooth",
  };
  return m[t];
}

export function bestPet(t: HamsterWheelType): string {
  const m: Record<HamsterWheelType, string> = {
    wire_mesh_open: "budget_basic_hamster",
    solid_plastic: "dwarf_hamster_gerbil",
    silent_spinner: "bedroom_quiet_night",
    flying_saucer: "multiple_small_pets",
    wood_cork_natural: "eco_natural_habitat",
  };
  return m[t];
}

export function hamsterWheels(): HamsterWheelType[] {
  return ["wire_mesh_open", "solid_plastic", "silent_spinner", "flying_saucer", "wood_cork_natural"];
}
