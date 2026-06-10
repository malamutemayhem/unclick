export type GardenCartType = "steel_dump_tilt" | "poly_tub_flatbed" | "folding_collapsible_wagon" | "wheelbarrow_single_wheel" | "utility_mesh_side";

export function loadCapacity(t: GardenCartType): number {
  const m: Record<GardenCartType, number> = {
    steel_dump_tilt: 9, poly_tub_flatbed: 7, folding_collapsible_wagon: 5, wheelbarrow_single_wheel: 6, utility_mesh_side: 8,
  };
  return m[t];
}

export function maneuverability(t: GardenCartType): number {
  const m: Record<GardenCartType, number> = {
    steel_dump_tilt: 6, poly_tub_flatbed: 7, folding_collapsible_wagon: 8, wheelbarrow_single_wheel: 9, utility_mesh_side: 7,
  };
  return m[t];
}

export function durability(t: GardenCartType): number {
  const m: Record<GardenCartType, number> = {
    steel_dump_tilt: 10, poly_tub_flatbed: 7, folding_collapsible_wagon: 5, wheelbarrow_single_wheel: 8, utility_mesh_side: 9,
  };
  return m[t];
}

export function storageSize(t: GardenCartType): number {
  const m: Record<GardenCartType, number> = {
    steel_dump_tilt: 2, poly_tub_flatbed: 3, folding_collapsible_wagon: 9, wheelbarrow_single_wheel: 4, utility_mesh_side: 3,
  };
  return m[t];
}

export function cartCost(t: GardenCartType): number {
  const m: Record<GardenCartType, number> = {
    steel_dump_tilt: 4, poly_tub_flatbed: 3, folding_collapsible_wagon: 3, wheelbarrow_single_wheel: 2, utility_mesh_side: 4,
  };
  return m[t];
}

export function dumpable(t: GardenCartType): boolean {
  const m: Record<GardenCartType, boolean> = {
    steel_dump_tilt: true, poly_tub_flatbed: false, folding_collapsible_wagon: false, wheelbarrow_single_wheel: true, utility_mesh_side: false,
  };
  return m[t];
}

export function foldable(t: GardenCartType): boolean {
  const m: Record<GardenCartType, boolean> = {
    steel_dump_tilt: false, poly_tub_flatbed: false, folding_collapsible_wagon: true, wheelbarrow_single_wheel: false, utility_mesh_side: false,
  };
  return m[t];
}

export function bedMaterial(t: GardenCartType): string {
  const m: Record<GardenCartType, string> = {
    steel_dump_tilt: "heavy_gauge_steel",
    poly_tub_flatbed: "rotomolded_polyethylene",
    folding_collapsible_wagon: "canvas_fabric_liner",
    wheelbarrow_single_wheel: "steel_tray_pressed",
    utility_mesh_side: "welded_steel_mesh",
  };
  return m[t];
}

export function bestTask(t: GardenCartType): string {
  const m: Record<GardenCartType, string> = {
    steel_dump_tilt: "heavy_soil_gravel_haul",
    poly_tub_flatbed: "plant_pot_transport",
    folding_collapsible_wagon: "farmers_market_carry",
    wheelbarrow_single_wheel: "narrow_path_single_load",
    utility_mesh_side: "firewood_bulk_haul",
  };
  return m[t];
}

export function gardenCarts(): GardenCartType[] {
  return ["steel_dump_tilt", "poly_tub_flatbed", "folding_collapsible_wagon", "wheelbarrow_single_wheel", "utility_mesh_side"];
}
