export type OutdoorCushionType = "sunbrella_fade_proof" | "olefin_budget" | "polyester_water_repel" | "memory_foam_luxury" | "quick_dry_mesh_core";

export function comfort(t: OutdoorCushionType): number {
  const m: Record<OutdoorCushionType, number> = {
    sunbrella_fade_proof: 8, olefin_budget: 5, polyester_water_repel: 6, memory_foam_luxury: 10, quick_dry_mesh_core: 7,
  };
  return m[t];
}

export function fadeResistance(t: OutdoorCushionType): number {
  const m: Record<OutdoorCushionType, number> = {
    sunbrella_fade_proof: 10, olefin_budget: 7, polyester_water_repel: 5, memory_foam_luxury: 4, quick_dry_mesh_core: 6,
  };
  return m[t];
}

export function drySpeed(t: OutdoorCushionType): number {
  const m: Record<OutdoorCushionType, number> = {
    sunbrella_fade_proof: 7, olefin_budget: 5, polyester_water_repel: 6, memory_foam_luxury: 2, quick_dry_mesh_core: 10,
  };
  return m[t];
}

export function stainResist(t: OutdoorCushionType): number {
  const m: Record<OutdoorCushionType, number> = {
    sunbrella_fade_proof: 9, olefin_budget: 6, polyester_water_repel: 7, memory_foam_luxury: 4, quick_dry_mesh_core: 5,
  };
  return m[t];
}

export function cushionCost(t: OutdoorCushionType): number {
  const m: Record<OutdoorCushionType, number> = {
    sunbrella_fade_proof: 8, olefin_budget: 2, polyester_water_repel: 4, memory_foam_luxury: 9, quick_dry_mesh_core: 5,
  };
  return m[t];
}

export function machineWash(t: OutdoorCushionType): boolean {
  const m: Record<OutdoorCushionType, boolean> = {
    sunbrella_fade_proof: true, olefin_budget: true, polyester_water_repel: true, memory_foam_luxury: false, quick_dry_mesh_core: true,
  };
  return m[t];
}

export function mildewResistant(t: OutdoorCushionType): boolean {
  const m: Record<OutdoorCushionType, boolean> = {
    sunbrella_fade_proof: true, olefin_budget: false, polyester_water_repel: false, memory_foam_luxury: false, quick_dry_mesh_core: true,
  };
  return m[t];
}

export function fillType(t: OutdoorCushionType): string {
  const m: Record<OutdoorCushionType, string> = {
    sunbrella_fade_proof: "polyester_fiber_fill",
    olefin_budget: "poly_foam_slab",
    polyester_water_repel: "recycled_poly_cluster",
    memory_foam_luxury: "gel_memory_foam_dense",
    quick_dry_mesh_core: "open_cell_reticulated_foam",
  };
  return m[t];
}

export function bestUse(t: OutdoorCushionType): string {
  const m: Record<OutdoorCushionType, string> = {
    sunbrella_fade_proof: "full_sun_pool_deck",
    olefin_budget: "covered_patio_seasonal",
    polyester_water_repel: "rainy_climate_porch",
    memory_foam_luxury: "sheltered_lounge_reading",
    quick_dry_mesh_core: "boat_dock_marine",
  };
  return m[t];
}

export function outdoorCushions(): OutdoorCushionType[] {
  return ["sunbrella_fade_proof", "olefin_budget", "polyester_water_repel", "memory_foam_luxury", "quick_dry_mesh_core"];
}
