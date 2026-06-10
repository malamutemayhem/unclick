export type MacrameCordType = "single_twist_soft" | "three_ply_twist" | "braided_core_round" | "cotton_warp_string" | "jute_natural_rough";

export function knotClarity(t: MacrameCordType): number {
  const m: Record<MacrameCordType, number> = {
    single_twist_soft: 10, three_ply_twist: 8, braided_core_round: 6, cotton_warp_string: 5, jute_natural_rough: 4,
  };
  return m[t];
}

export function fringeAbility(t: MacrameCordType): number {
  const m: Record<MacrameCordType, number> = {
    single_twist_soft: 10, three_ply_twist: 7, braided_core_round: 3, cotton_warp_string: 4, jute_natural_rough: 6,
  };
  return m[t];
}

export function tensileStrength(t: MacrameCordType): number {
  const m: Record<MacrameCordType, number> = {
    single_twist_soft: 5, three_ply_twist: 8, braided_core_round: 10, cotton_warp_string: 7, jute_natural_rough: 9,
  };
  return m[t];
}

export function softness(t: MacrameCordType): number {
  const m: Record<MacrameCordType, number> = {
    single_twist_soft: 9, three_ply_twist: 7, braided_core_round: 8, cotton_warp_string: 6, jute_natural_rough: 3,
  };
  return m[t];
}

export function cordCost(t: MacrameCordType): number {
  const m: Record<MacrameCordType, number> = {
    single_twist_soft: 2, three_ply_twist: 2, braided_core_round: 3, cotton_warp_string: 1, jute_natural_rough: 1,
  };
  return m[t];
}

export function combable(t: MacrameCordType): boolean {
  const m: Record<MacrameCordType, boolean> = {
    single_twist_soft: true, three_ply_twist: true, braided_core_round: false, cotton_warp_string: false, jute_natural_rough: false,
  };
  return m[t];
}

export function dyesFriendly(t: MacrameCordType): boolean {
  const m: Record<MacrameCordType, boolean> = {
    single_twist_soft: true, three_ply_twist: true, braided_core_round: true, cotton_warp_string: true, jute_natural_rough: false,
  };
  return m[t];
}

export function cordStructure(t: MacrameCordType): string {
  const m: Record<MacrameCordType, string> = {
    single_twist_soft: "single_strand_twist",
    three_ply_twist: "three_strand_twist",
    braided_core_round: "braided_outer_core",
    cotton_warp_string: "tightly_spun_string",
    jute_natural_rough: "natural_bast_fiber",
  };
  return m[t];
}

export function bestProject(t: MacrameCordType): string {
  const m: Record<MacrameCordType, string> = {
    single_twist_soft: "wall_hanging_feather",
    three_ply_twist: "plant_hanger_basket",
    braided_core_round: "bag_handle_strap",
    cotton_warp_string: "friendship_bracelet",
    jute_natural_rough: "outdoor_garden_hanger",
  };
  return m[t];
}

export function macrameCords(): MacrameCordType[] {
  return ["single_twist_soft", "three_ply_twist", "braided_core_round", "cotton_warp_string", "jute_natural_rough"];
}
