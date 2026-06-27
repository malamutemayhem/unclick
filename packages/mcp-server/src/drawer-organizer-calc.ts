export type DrawerOrganizerType = "bamboo_expandable_kitchen" | "acrylic_clear_makeup" | "felt_lined_jewelry" | "modular_grid_office" | "spring_loaded_divider";

export function compartmentCount(t: DrawerOrganizerType): number {
  const m: Record<DrawerOrganizerType, number> = {
    bamboo_expandable_kitchen: 7, acrylic_clear_makeup: 8, felt_lined_jewelry: 10, modular_grid_office: 9, spring_loaded_divider: 5,
  };
  return m[t];
}

export function customizability(t: DrawerOrganizerType): number {
  const m: Record<DrawerOrganizerType, number> = {
    bamboo_expandable_kitchen: 8, acrylic_clear_makeup: 4, felt_lined_jewelry: 3, modular_grid_office: 10, spring_loaded_divider: 9,
  };
  return m[t];
}

export function visibility(t: DrawerOrganizerType): number {
  const m: Record<DrawerOrganizerType, number> = {
    bamboo_expandable_kitchen: 6, acrylic_clear_makeup: 10, felt_lined_jewelry: 5, modular_grid_office: 7, spring_loaded_divider: 4,
  };
  return m[t];
}

export function itemProtection(t: DrawerOrganizerType): number {
  const m: Record<DrawerOrganizerType, number> = {
    bamboo_expandable_kitchen: 5, acrylic_clear_makeup: 6, felt_lined_jewelry: 10, modular_grid_office: 4, spring_loaded_divider: 7,
  };
  return m[t];
}

export function organizerCost(t: DrawerOrganizerType): number {
  const m: Record<DrawerOrganizerType, number> = {
    bamboo_expandable_kitchen: 5, acrylic_clear_makeup: 4, felt_lined_jewelry: 7, modular_grid_office: 6, spring_loaded_divider: 4,
  };
  return m[t];
}

export function stackable(t: DrawerOrganizerType): boolean {
  const m: Record<DrawerOrganizerType, boolean> = {
    bamboo_expandable_kitchen: false, acrylic_clear_makeup: true, felt_lined_jewelry: true, modular_grid_office: true, spring_loaded_divider: false,
  };
  return m[t];
}

export function nonSlipBase(t: DrawerOrganizerType): boolean {
  const m: Record<DrawerOrganizerType, boolean> = {
    bamboo_expandable_kitchen: true, acrylic_clear_makeup: true, felt_lined_jewelry: true, modular_grid_office: false, spring_loaded_divider: true,
  };
  return m[t];
}

export function trayMaterial(t: DrawerOrganizerType): string {
  const m: Record<DrawerOrganizerType, string> = {
    bamboo_expandable_kitchen: "moso_bamboo_expandable",
    acrylic_clear_makeup: "molded_acrylic_clear",
    felt_lined_jewelry: "velvet_lined_mdf",
    modular_grid_office: "polypropylene_clip_grid",
    spring_loaded_divider: "abs_spring_tension",
  };
  return m[t];
}

export function bestDrawer(t: DrawerOrganizerType): string {
  const m: Record<DrawerOrganizerType, string> = {
    bamboo_expandable_kitchen: "utensil_silverware_kitchen",
    acrylic_clear_makeup: "vanity_bathroom_cosmetics",
    felt_lined_jewelry: "dresser_jewelry_watches",
    modular_grid_office: "desk_supplies_stationery",
    spring_loaded_divider: "junk_catch_all_flexible",
  };
  return m[t];
}

export function drawerOrganizers(): DrawerOrganizerType[] {
  return ["bamboo_expandable_kitchen", "acrylic_clear_makeup", "felt_lined_jewelry", "modular_grid_office", "spring_loaded_divider"];
}
