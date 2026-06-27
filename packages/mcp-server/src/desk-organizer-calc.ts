export type DeskOrganizerType = "mesh_metal_multi" | "bamboo_tiered" | "acrylic_clear" | "leather_valet" | "rotating_carousel";

export function compartments(t: DeskOrganizerType): number {
  const m: Record<DeskOrganizerType, number> = {
    mesh_metal_multi: 8, bamboo_tiered: 7, acrylic_clear: 6, leather_valet: 4, rotating_carousel: 10,
  };
  return m[t];
}

export function styleAppeal(t: DeskOrganizerType): number {
  const m: Record<DeskOrganizerType, number> = {
    mesh_metal_multi: 4, bamboo_tiered: 8, acrylic_clear: 7, leather_valet: 10, rotating_carousel: 5,
  };
  return m[t];
}

export function durability(t: DeskOrganizerType): number {
  const m: Record<DeskOrganizerType, number> = {
    mesh_metal_multi: 8, bamboo_tiered: 7, acrylic_clear: 4, leather_valet: 6, rotating_carousel: 7,
  };
  return m[t];
}

export function footprint(t: DeskOrganizerType): number {
  const m: Record<DeskOrganizerType, number> = {
    mesh_metal_multi: 6, bamboo_tiered: 7, acrylic_clear: 4, leather_valet: 5, rotating_carousel: 3,
  };
  return m[t];
}

export function organizerCost(t: DeskOrganizerType): number {
  const m: Record<DeskOrganizerType, number> = {
    mesh_metal_multi: 3, bamboo_tiered: 6, acrylic_clear: 5, leather_valet: 9, rotating_carousel: 4,
  };
  return m[t];
}

export function stackable(t: DeskOrganizerType): boolean {
  const m: Record<DeskOrganizerType, boolean> = {
    mesh_metal_multi: true, bamboo_tiered: true, acrylic_clear: true, leather_valet: false, rotating_carousel: false,
  };
  return m[t];
}

export function drawerIncluded(t: DeskOrganizerType): boolean {
  const m: Record<DeskOrganizerType, boolean> = {
    mesh_metal_multi: true, bamboo_tiered: true, acrylic_clear: false, leather_valet: false, rotating_carousel: false,
  };
  return m[t];
}

export function bodyMaterial(t: DeskOrganizerType): string {
  const m: Record<DeskOrganizerType, string> = {
    mesh_metal_multi: "powder_coated_steel_mesh",
    bamboo_tiered: "natural_bamboo_slot",
    acrylic_clear: "molded_clear_acrylic",
    leather_valet: "pu_leather_padded",
    rotating_carousel: "abs_plastic_swivel",
  };
  return m[t];
}

export function bestDesk(t: DeskOrganizerType): string {
  const m: Record<DeskOrganizerType, string> = {
    mesh_metal_multi: "office_cubicle_general",
    bamboo_tiered: "home_office_natural",
    acrylic_clear: "makeup_craft_display",
    leather_valet: "executive_reception",
    rotating_carousel: "art_supply_studio",
  };
  return m[t];
}

export function deskOrganizers(): DeskOrganizerType[] {
  return ["mesh_metal_multi", "bamboo_tiered", "acrylic_clear", "leather_valet", "rotating_carousel"];
}
