export type RoadSurface = "asphalt" | "concrete" | "gravel" | "cobblestone" | "permeable_paver";

export function loadCapacity(r: RoadSurface): number {
  const m: Record<RoadSurface, number> = {
    asphalt: 7, concrete: 10, gravel: 3, cobblestone: 6, permeable_paver: 5,
  };
  return m[r];
}

export function rideSmoothness(r: RoadSurface): number {
  const m: Record<RoadSurface, number> = {
    asphalt: 9, concrete: 7, gravel: 3, cobblestone: 4, permeable_paver: 6,
  };
  return m[r];
}

export function drainageAbility(r: RoadSurface): number {
  const m: Record<RoadSurface, number> = {
    asphalt: 4, concrete: 3, gravel: 8, cobblestone: 6, permeable_paver: 10,
  };
  return m[r];
}

export function constructionCost(r: RoadSurface): number {
  const m: Record<RoadSurface, number> = {
    asphalt: 5, concrete: 8, gravel: 2, cobblestone: 9, permeable_paver: 7,
  };
  return m[r];
}

export function lifespanYears(r: RoadSurface): number {
  const m: Record<RoadSurface, number> = {
    asphalt: 5, concrete: 9, gravel: 2, cobblestone: 10, permeable_paver: 6,
  };
  return m[r];
}

export function recyclable(r: RoadSurface): boolean {
  const m: Record<RoadSurface, boolean> = {
    asphalt: true, concrete: true, gravel: false, cobblestone: false, permeable_paver: true,
  };
  return m[r];
}

export function reduceHeatIsland(r: RoadSurface): boolean {
  const m: Record<RoadSurface, boolean> = {
    asphalt: false, concrete: true, gravel: true, cobblestone: false, permeable_paver: true,
  };
  return m[r];
}

export function maintenanceMethod(r: RoadSurface): string {
  const m: Record<RoadSurface, string> = {
    asphalt: "crack_seal_overlay", concrete: "joint_seal_slab_replace",
    gravel: "grade_add_material", cobblestone: "reset_individual_stones",
    permeable_paver: "vacuum_sweep_joint_refill",
  };
  return m[r];
}

export function bestUseCase(r: RoadSurface): string {
  const m: Record<RoadSurface, string> = {
    asphalt: "arterial_highway", concrete: "heavy_truck_route",
    gravel: "rural_low_traffic", cobblestone: "historic_pedestrian",
    permeable_paver: "parking_lot_stormwater",
  };
  return m[r];
}

export function roadSurfaces(): RoadSurface[] {
  return ["asphalt", "concrete", "gravel", "cobblestone", "permeable_paver"];
}
