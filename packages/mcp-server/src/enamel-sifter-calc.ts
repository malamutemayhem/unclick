export type EnamelSifterType = "mesh_80_coarse" | "mesh_150_medium" | "mesh_325_fine" | "mini_cup_sifter" | "salt_shaker_sprinkle";

export function particleSize(t: EnamelSifterType): number {
  const m: Record<EnamelSifterType, number> = {
    mesh_80_coarse: 3, mesh_150_medium: 6, mesh_325_fine: 10, mini_cup_sifter: 7, salt_shaker_sprinkle: 4,
  };
  return m[t];
}

export function coverageEven(t: EnamelSifterType): number {
  const m: Record<EnamelSifterType, number> = {
    mesh_80_coarse: 5, mesh_150_medium: 8, mesh_325_fine: 10, mini_cup_sifter: 7, salt_shaker_sprinkle: 6,
  };
  return m[t];
}

export function controlArea(t: EnamelSifterType): number {
  const m: Record<EnamelSifterType, number> = {
    mesh_80_coarse: 5, mesh_150_medium: 7, mesh_325_fine: 8, mini_cup_sifter: 10, salt_shaker_sprinkle: 6,
  };
  return m[t];
}

export function easeOfUse(t: EnamelSifterType): number {
  const m: Record<EnamelSifterType, number> = {
    mesh_80_coarse: 9, mesh_150_medium: 8, mesh_325_fine: 6, mini_cup_sifter: 7, salt_shaker_sprinkle: 10,
  };
  return m[t];
}

export function sifterCost(t: EnamelSifterType): number {
  const m: Record<EnamelSifterType, number> = {
    mesh_80_coarse: 1, mesh_150_medium: 1, mesh_325_fine: 2, mini_cup_sifter: 2, salt_shaker_sprinkle: 1,
  };
  return m[t];
}

export function forDetail(t: EnamelSifterType): boolean {
  const m: Record<EnamelSifterType, boolean> = {
    mesh_80_coarse: false, mesh_150_medium: false, mesh_325_fine: true, mini_cup_sifter: true, salt_shaker_sprinkle: false,
  };
  return m[t];
}

export function stackable(t: EnamelSifterType): boolean {
  const m: Record<EnamelSifterType, boolean> = {
    mesh_80_coarse: true, mesh_150_medium: true, mesh_325_fine: true, mini_cup_sifter: false, salt_shaker_sprinkle: false,
  };
  return m[t];
}

export function meshType(t: EnamelSifterType): string {
  const m: Record<EnamelSifterType, string> = {
    mesh_80_coarse: "woven_wire_80",
    mesh_150_medium: "woven_wire_150",
    mesh_325_fine: "woven_wire_325",
    mini_cup_sifter: "fine_mesh_cup",
    salt_shaker_sprinkle: "perforated_lid_holes",
  };
  return m[t];
}

export function bestUse(t: EnamelSifterType): string {
  const m: Record<EnamelSifterType, string> = {
    mesh_80_coarse: "texture_effect_coarse",
    mesh_150_medium: "general_sifting_coat",
    mesh_325_fine: "smooth_base_coat",
    mini_cup_sifter: "small_area_detail",
    salt_shaker_sprinkle: "quick_even_sprinkle",
  };
  return m[t];
}

export function enamelSifters(): EnamelSifterType[] {
  return ["mesh_80_coarse", "mesh_150_medium", "mesh_325_fine", "mini_cup_sifter", "salt_shaker_sprinkle"];
}
