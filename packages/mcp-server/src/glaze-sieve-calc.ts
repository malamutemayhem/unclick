export type GlazeSieveType = "mesh_80_coarse" | "mesh_120_medium" | "mesh_200_fine" | "mesh_325_ultra" | "vibro_screen_power";

export function particleFilter(t: GlazeSieveType): number {
  const m: Record<GlazeSieveType, number> = {
    mesh_80_coarse: 4, mesh_120_medium: 6, mesh_200_fine: 8, mesh_325_ultra: 10, vibro_screen_power: 9,
  };
  return m[t];
}

export function flowRate(t: GlazeSieveType): number {
  const m: Record<GlazeSieveType, number> = {
    mesh_80_coarse: 10, mesh_120_medium: 8, mesh_200_fine: 6, mesh_325_ultra: 3, vibro_screen_power: 9,
  };
  return m[t];
}

export function easeOfClean(t: GlazeSieveType): number {
  const m: Record<GlazeSieveType, number> = {
    mesh_80_coarse: 9, mesh_120_medium: 7, mesh_200_fine: 5, mesh_325_ultra: 3, vibro_screen_power: 6,
  };
  return m[t];
}

export function durability(t: GlazeSieveType): number {
  const m: Record<GlazeSieveType, number> = {
    mesh_80_coarse: 9, mesh_120_medium: 8, mesh_200_fine: 6, mesh_325_ultra: 4, vibro_screen_power: 8,
  };
  return m[t];
}

export function sieveCost(t: GlazeSieveType): number {
  const m: Record<GlazeSieveType, number> = {
    mesh_80_coarse: 1, mesh_120_medium: 1, mesh_200_fine: 2, mesh_325_ultra: 2, vibro_screen_power: 3,
  };
  return m[t];
}

export function powered(t: GlazeSieveType): boolean {
  const m: Record<GlazeSieveType, boolean> = {
    mesh_80_coarse: false, mesh_120_medium: false, mesh_200_fine: false, mesh_325_ultra: false, vibro_screen_power: true,
  };
  return m[t];
}

export function forGlaze(t: GlazeSieveType): boolean {
  const m: Record<GlazeSieveType, boolean> = {
    mesh_80_coarse: false, mesh_120_medium: true, mesh_200_fine: true, mesh_325_ultra: true, vibro_screen_power: true,
  };
  return m[t];
}

export function meshMaterial(t: GlazeSieveType): string {
  const m: Record<GlazeSieveType, string> = {
    mesh_80_coarse: "brass_woven_wire",
    mesh_120_medium: "stainless_woven_wire",
    mesh_200_fine: "phosphor_bronze_mesh",
    mesh_325_ultra: "stainless_micro_mesh",
    vibro_screen_power: "polyester_screen_mesh",
  };
  return m[t];
}

export function bestUse(t: GlazeSieveType): string {
  const m: Record<GlazeSieveType, string> = {
    mesh_80_coarse: "dry_material_sift",
    mesh_120_medium: "standard_glaze_strain",
    mesh_200_fine: "smooth_glaze_filter",
    mesh_325_ultra: "terra_sigillata_prep",
    vibro_screen_power: "production_batch_sieve",
  };
  return m[t];
}

export function glazeSieves(): GlazeSieveType[] {
  return ["mesh_80_coarse", "mesh_120_medium", "mesh_200_fine", "mesh_325_ultra", "vibro_screen_power"];
}
