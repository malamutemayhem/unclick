export type ShowerShelfType = "corner_tension_pole" | "suction_cup_basket" | "adhesive_wall_mount" | "hanging_caddy_over_head" | "recessed_niche_built_in";

export function loadCapacity(t: ShowerShelfType): number {
  const m: Record<ShowerShelfType, number> = {
    corner_tension_pole: 8, suction_cup_basket: 4, adhesive_wall_mount: 6, hanging_caddy_over_head: 7, recessed_niche_built_in: 10,
  };
  return m[t];
}

export function installEase(t: ShowerShelfType): number {
  const m: Record<ShowerShelfType, number> = {
    corner_tension_pole: 9, suction_cup_basket: 10, adhesive_wall_mount: 8, hanging_caddy_over_head: 10, recessed_niche_built_in: 1,
  };
  return m[t];
}

export function drainage(t: ShowerShelfType): number {
  const m: Record<ShowerShelfType, number> = {
    corner_tension_pole: 8, suction_cup_basket: 9, adhesive_wall_mount: 7, hanging_caddy_over_head: 9, recessed_niche_built_in: 6,
  };
  return m[t];
}

export function aesthetics(t: ShowerShelfType): number {
  const m: Record<ShowerShelfType, number> = {
    corner_tension_pole: 5, suction_cup_basket: 4, adhesive_wall_mount: 7, hanging_caddy_over_head: 5, recessed_niche_built_in: 10,
  };
  return m[t];
}

export function shelfCost(t: ShowerShelfType): number {
  const m: Record<ShowerShelfType, number> = {
    corner_tension_pole: 2, suction_cup_basket: 1, adhesive_wall_mount: 2, hanging_caddy_over_head: 2, recessed_niche_built_in: 5,
  };
  return m[t];
}

export function noDrilling(t: ShowerShelfType): boolean {
  const m: Record<ShowerShelfType, boolean> = {
    corner_tension_pole: true, suction_cup_basket: true, adhesive_wall_mount: true, hanging_caddy_over_head: true, recessed_niche_built_in: false,
  };
  return m[t];
}

export function rustProof(t: ShowerShelfType): boolean {
  const m: Record<ShowerShelfType, boolean> = {
    corner_tension_pole: true, suction_cup_basket: false, adhesive_wall_mount: true, hanging_caddy_over_head: false, recessed_niche_built_in: true,
  };
  return m[t];
}

export function mountMethod(t: ShowerShelfType): string {
  const m: Record<ShowerShelfType, string> = {
    corner_tension_pole: "spring_tension_floor_ceiling",
    suction_cup_basket: "vacuum_suction_cup",
    adhesive_wall_mount: "waterproof_adhesive_strip",
    hanging_caddy_over_head: "hook_over_shower_head",
    recessed_niche_built_in: "tile_mortar_flush",
  };
  return m[t];
}

export function bestShower(t: ShowerShelfType): string {
  const m: Record<ShowerShelfType, string> = {
    corner_tension_pole: "rental_no_damage",
    suction_cup_basket: "temporary_guest_bath",
    adhesive_wall_mount: "modern_minimal_wall",
    hanging_caddy_over_head: "dorm_quick_setup",
    recessed_niche_built_in: "new_build_renovation",
  };
  return m[t];
}

export function showerShelves(): ShowerShelfType[] {
  return ["corner_tension_pole", "suction_cup_basket", "adhesive_wall_mount", "hanging_caddy_over_head", "recessed_niche_built_in"];
}
