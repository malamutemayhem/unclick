export type RetainingWall = "gravity" | "cantilever" | "anchored" | "mechanically_stabilized" | "sheet_pile";

export function heightCapacity(r: RetainingWall): number {
  const m: Record<RetainingWall, number> = {
    gravity: 4, cantilever: 7, anchored: 10, mechanically_stabilized: 9, sheet_pile: 6,
  };
  return m[r];
}

export function lateralResistance(r: RetainingWall): number {
  const m: Record<RetainingWall, number> = {
    gravity: 6, cantilever: 7, anchored: 10, mechanically_stabilized: 8, sheet_pile: 5,
  };
  return m[r];
}

export function constructionSpeed(r: RetainingWall): number {
  const m: Record<RetainingWall, number> = {
    gravity: 5, cantilever: 6, anchored: 4, mechanically_stabilized: 8, sheet_pile: 9,
  };
  return m[r];
}

export function materialVolume(r: RetainingWall): number {
  const m: Record<RetainingWall, number> = {
    gravity: 10, cantilever: 6, anchored: 5, mechanically_stabilized: 7, sheet_pile: 3,
  };
  return m[r];
}

export function projectCost(r: RetainingWall): number {
  const m: Record<RetainingWall, number> = {
    gravity: 5, cantilever: 6, anchored: 9, mechanically_stabilized: 7, sheet_pile: 8,
  };
  return m[r];
}

export function requiresDeepFoundation(r: RetainingWall): boolean {
  const m: Record<RetainingWall, boolean> = {
    gravity: false, cantilever: true, anchored: true, mechanically_stabilized: false, sheet_pile: true,
  };
  return m[r];
}

export function allowsDrainage(r: RetainingWall): boolean {
  const m: Record<RetainingWall, boolean> = {
    gravity: true, cantilever: true, anchored: true, mechanically_stabilized: true, sheet_pile: false,
  };
  return m[r];
}

export function primaryMaterial(r: RetainingWall): string {
  const m: Record<RetainingWall, string> = {
    gravity: "mass_concrete_stone", cantilever: "reinforced_concrete_stem",
    anchored: "tieback_anchor_wall_face", mechanically_stabilized: "geogrid_reinforced_fill",
    sheet_pile: "interlocking_steel_sheet",
  };
  return m[r];
}

export function bestScenario(r: RetainingWall): string {
  const m: Record<RetainingWall, string> = {
    gravity: "low_wall_simple_site", cantilever: "standard_height_highway",
    anchored: "deep_excavation_urban", mechanically_stabilized: "highway_embankment_slope",
    sheet_pile: "waterfront_cofferdam",
  };
  return m[r];
}

export function retainingWalls(): RetainingWall[] {
  return ["gravity", "cantilever", "anchored", "mechanically_stabilized", "sheet_pile"];
}
