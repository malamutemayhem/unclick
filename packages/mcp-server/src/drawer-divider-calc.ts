export type DrawerDividerType = "spring_loaded_adjust" | "bamboo_grid_set" | "fabric_box_foldable" | "acrylic_clear_modular" | "honeycomb_underwear_cell";

export function customization(t: DrawerDividerType): number {
  const m: Record<DrawerDividerType, number> = {
    spring_loaded_adjust: 10, bamboo_grid_set: 6, fabric_box_foldable: 7, acrylic_clear_modular: 8, honeycomb_underwear_cell: 5,
  };
  return m[t];
}

export function visibility(t: DrawerDividerType): number {
  const m: Record<DrawerDividerType, number> = {
    spring_loaded_adjust: 5, bamboo_grid_set: 7, fabric_box_foldable: 6, acrylic_clear_modular: 10, honeycomb_underwear_cell: 8,
  };
  return m[t];
}

export function durability(t: DrawerDividerType): number {
  const m: Record<DrawerDividerType, number> = {
    spring_loaded_adjust: 7, bamboo_grid_set: 9, fabric_box_foldable: 4, acrylic_clear_modular: 8, honeycomb_underwear_cell: 5,
  };
  return m[t];
}

export function cleanEase(t: DrawerDividerType): number {
  const m: Record<DrawerDividerType, number> = {
    spring_loaded_adjust: 7, bamboo_grid_set: 8, fabric_box_foldable: 6, acrylic_clear_modular: 10, honeycomb_underwear_cell: 5,
  };
  return m[t];
}

export function dividerCost(t: DrawerDividerType): number {
  const m: Record<DrawerDividerType, number> = {
    spring_loaded_adjust: 3, bamboo_grid_set: 4, fabric_box_foldable: 2, acrylic_clear_modular: 5, honeycomb_underwear_cell: 2,
  };
  return m[t];
}

export function foldable(t: DrawerDividerType): boolean {
  const m: Record<DrawerDividerType, boolean> = {
    spring_loaded_adjust: false, bamboo_grid_set: false, fabric_box_foldable: true, acrylic_clear_modular: false, honeycomb_underwear_cell: true,
  };
  return m[t];
}

export function fitAnyDrawer(t: DrawerDividerType): boolean {
  const m: Record<DrawerDividerType, boolean> = {
    spring_loaded_adjust: true, bamboo_grid_set: false, fabric_box_foldable: false, acrylic_clear_modular: true, honeycomb_underwear_cell: false,
  };
  return m[t];
}

export function dividerMaterial(t: DrawerDividerType): string {
  const m: Record<DrawerDividerType, string> = {
    spring_loaded_adjust: "abs_plastic_spring_clip",
    bamboo_grid_set: "natural_bamboo_slat",
    fabric_box_foldable: "nonwoven_fabric_card",
    acrylic_clear_modular: "clear_acrylic_snap",
    honeycomb_underwear_cell: "plastic_honeycomb_grid",
  };
  return m[t];
}

export function bestDrawer(t: DrawerDividerType): string {
  const m: Record<DrawerDividerType, string> = {
    spring_loaded_adjust: "kitchen_utensil_junk",
    bamboo_grid_set: "bathroom_vanity_makeup",
    fabric_box_foldable: "dresser_sock_underwear",
    acrylic_clear_modular: "office_desk_supply",
    honeycomb_underwear_cell: "lingerie_tie_belt",
  };
  return m[t];
}

export function drawerDividers(): DrawerDividerType[] {
  return ["spring_loaded_adjust", "bamboo_grid_set", "fabric_box_foldable", "acrylic_clear_modular", "honeycomb_underwear_cell"];
}
