export type KneePadType = "foam_soft_gardening" | "gel_insert_flooring" | "hard_cap_construction" | "hinged_sport_brace" | "roller_wheel_creeper";

export function cushioning(t: KneePadType): number {
  const m: Record<KneePadType, number> = {
    foam_soft_gardening: 7, gel_insert_flooring: 10, hard_cap_construction: 6, hinged_sport_brace: 5, roller_wheel_creeper: 8,
  };
  return m[t];
}

export function impactProtect(t: KneePadType): number {
  const m: Record<KneePadType, number> = {
    foam_soft_gardening: 3, gel_insert_flooring: 7, hard_cap_construction: 10, hinged_sport_brace: 8, roller_wheel_creeper: 5,
  };
  return m[t];
}

export function mobility(t: KneePadType): number {
  const m: Record<KneePadType, number> = {
    foam_soft_gardening: 8, gel_insert_flooring: 5, hard_cap_construction: 4, hinged_sport_brace: 9, roller_wheel_creeper: 10,
  };
  return m[t];
}

export function stayInPlace(t: KneePadType): number {
  const m: Record<KneePadType, number> = {
    foam_soft_gardening: 4, gel_insert_flooring: 8, hard_cap_construction: 9, hinged_sport_brace: 10, roller_wheel_creeper: 6,
  };
  return m[t];
}

export function padCost(t: KneePadType): number {
  const m: Record<KneePadType, number> = {
    foam_soft_gardening: 1, gel_insert_flooring: 4, hard_cap_construction: 5, hinged_sport_brace: 6, roller_wheel_creeper: 7,
  };
  return m[t];
}

export function waterproof(t: KneePadType): boolean {
  const m: Record<KneePadType, boolean> = {
    foam_soft_gardening: false, gel_insert_flooring: true, hard_cap_construction: true, hinged_sport_brace: false, roller_wheel_creeper: true,
  };
  return m[t];
}

export function adjustableStrap(t: KneePadType): boolean {
  const m: Record<KneePadType, boolean> = {
    foam_soft_gardening: false, gel_insert_flooring: true, hard_cap_construction: true, hinged_sport_brace: true, roller_wheel_creeper: true,
  };
  return m[t];
}

export function capMaterial(t: KneePadType): string {
  const m: Record<KneePadType, string> = {
    foam_soft_gardening: "closed_cell_foam_neoprene",
    gel_insert_flooring: "gel_core_nylon_shell",
    hard_cap_construction: "polyethylene_hard_cap",
    hinged_sport_brace: "neoprene_metal_hinge",
    roller_wheel_creeper: "padded_platform_caster",
  };
  return m[t];
}

export function bestTask(t: KneePadType): string {
  const m: Record<KneePadType, string> = {
    foam_soft_gardening: "gardening_light_kneeling",
    gel_insert_flooring: "tile_flooring_install",
    hard_cap_construction: "concrete_roofing_rough",
    hinged_sport_brace: "volleyball_skating_active",
    roller_wheel_creeper: "auto_mechanic_crawl",
  };
  return m[t];
}

export function kneePads(): KneePadType[] {
  return ["foam_soft_gardening", "gel_insert_flooring", "hard_cap_construction", "hinged_sport_brace", "roller_wheel_creeper"];
}
