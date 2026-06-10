export type CatTunnelType = "crinkle_collapsible_nylon" | "s_curve_multi_way" | "cube_pop_up_combo" | "natural_felt_wool" | "outdoor_agility_tube";

export function playValue(t: CatTunnelType): number {
  const m: Record<CatTunnelType, number> = {
    crinkle_collapsible_nylon: 8, s_curve_multi_way: 10, cube_pop_up_combo: 9, natural_felt_wool: 6, outdoor_agility_tube: 7,
  };
  return m[t];
}

export function durability(t: CatTunnelType): number {
  const m: Record<CatTunnelType, number> = {
    crinkle_collapsible_nylon: 6, s_curve_multi_way: 7, cube_pop_up_combo: 7, natural_felt_wool: 5, outdoor_agility_tube: 9,
  };
  return m[t];
}

export function storageEase(t: CatTunnelType): number {
  const m: Record<CatTunnelType, number> = {
    crinkle_collapsible_nylon: 10, s_curve_multi_way: 6, cube_pop_up_combo: 8, natural_felt_wool: 4, outdoor_agility_tube: 3,
  };
  return m[t];
}

export function catInterest(t: CatTunnelType): number {
  const m: Record<CatTunnelType, number> = {
    crinkle_collapsible_nylon: 9, s_curve_multi_way: 10, cube_pop_up_combo: 8, natural_felt_wool: 7, outdoor_agility_tube: 6,
  };
  return m[t];
}

export function tunnelCost(t: CatTunnelType): number {
  const m: Record<CatTunnelType, number> = {
    crinkle_collapsible_nylon: 1, s_curve_multi_way: 3, cube_pop_up_combo: 3, natural_felt_wool: 4, outdoor_agility_tube: 4,
  };
  return m[t];
}

export function hasCrinkle(t: CatTunnelType): boolean {
  const m: Record<CatTunnelType, boolean> = {
    crinkle_collapsible_nylon: true, s_curve_multi_way: true, cube_pop_up_combo: true, natural_felt_wool: false, outdoor_agility_tube: false,
  };
  return m[t];
}

export function multiEntrance(t: CatTunnelType): boolean {
  const m: Record<CatTunnelType, boolean> = {
    crinkle_collapsible_nylon: false, s_curve_multi_way: true, cube_pop_up_combo: true, natural_felt_wool: false, outdoor_agility_tube: false,
  };
  return m[t];
}

export function tunnelMaterial(t: CatTunnelType): string {
  const m: Record<CatTunnelType, string> = {
    crinkle_collapsible_nylon: "ripstop_nylon_spring",
    s_curve_multi_way: "polyester_wire_frame",
    cube_pop_up_combo: "mesh_panel_fabric",
    natural_felt_wool: "thick_wool_felt",
    outdoor_agility_tube: "pvc_coated_canvas",
  };
  return m[t];
}

export function bestCat(t: CatTunnelType): string {
  const m: Record<CatTunnelType, string> = {
    crinkle_collapsible_nylon: "playful_kitten_solo",
    s_curve_multi_way: "multi_cat_household",
    cube_pop_up_combo: "hide_and_seek_explorer",
    natural_felt_wool: "senior_cat_gentle",
    outdoor_agility_tube: "catio_outdoor_enclosure",
  };
  return m[t];
}

export function catTunnels(): CatTunnelType[] {
  return ["crinkle_collapsible_nylon", "s_curve_multi_way", "cube_pop_up_combo", "natural_felt_wool", "outdoor_agility_tube"];
}
