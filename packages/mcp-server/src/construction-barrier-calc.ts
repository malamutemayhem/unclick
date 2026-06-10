export type ConstructionBarrier = "jersey_barrier" | "water_filled" | "steel_plate" | "chain_link_fence" | "delineator_post";

export function impactResistance(b: ConstructionBarrier): number {
  const m: Record<ConstructionBarrier, number> = {
    jersey_barrier: 10, water_filled: 7, steel_plate: 9, chain_link_fence: 2, delineator_post: 1,
  };
  return m[b];
}

export function portability(b: ConstructionBarrier): number {
  const m: Record<ConstructionBarrier, number> = {
    jersey_barrier: 3, water_filled: 7, steel_plate: 4, chain_link_fence: 6, delineator_post: 10,
  };
  return m[b];
}

export function visibility(b: ConstructionBarrier): number {
  const m: Record<ConstructionBarrier, number> = {
    jersey_barrier: 6, water_filled: 8, steel_plate: 5, chain_link_fence: 4, delineator_post: 9,
  };
  return m[b];
}

export function costPerUnit(b: ConstructionBarrier): number {
  const m: Record<ConstructionBarrier, number> = {
    jersey_barrier: 7, water_filled: 5, steel_plate: 9, chain_link_fence: 4, delineator_post: 2,
  };
  return m[b];
}

export function setupTime(b: ConstructionBarrier): number {
  const m: Record<ConstructionBarrier, number> = {
    jersey_barrier: 7, water_filled: 5, steel_plate: 8, chain_link_fence: 6, delineator_post: 2,
  };
  return m[b];
}

export function vehicleRated(b: ConstructionBarrier): boolean {
  const m: Record<ConstructionBarrier, boolean> = {
    jersey_barrier: true, water_filled: true, steel_plate: true, chain_link_fence: false, delineator_post: false,
  };
  return m[b];
}

export function stackable(b: ConstructionBarrier): boolean {
  const m: Record<ConstructionBarrier, boolean> = {
    jersey_barrier: true, water_filled: true, steel_plate: false, chain_link_fence: false, delineator_post: true,
  };
  return m[b];
}

export function materialComposition(b: ConstructionBarrier): string {
  const m: Record<ConstructionBarrier, string> = {
    jersey_barrier: "precast_concrete", water_filled: "rotomolded_polyethylene",
    steel_plate: "galvanized_steel", chain_link_fence: "woven_steel_wire",
    delineator_post: "flexible_polyurethane",
  };
  return m[b];
}

export function bestApplication(b: ConstructionBarrier): string {
  const m: Record<ConstructionBarrier, string> = {
    jersey_barrier: "highway_median_separation", water_filled: "temporary_lane_closure",
    steel_plate: "trench_plate_road_cover", chain_link_fence: "site_perimeter_security",
    delineator_post: "lane_guidance_merge_taper",
  };
  return m[b];
}

export function constructionBarriers(): ConstructionBarrier[] {
  return ["jersey_barrier", "water_filled", "steel_plate", "chain_link_fence", "delineator_post"];
}
