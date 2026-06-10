export type PalmLeafRegion = "south_india" | "southeast_asia" | "sri_lanka" | "nepal" | "tibet";

export function leafLengthCm(region: PalmLeafRegion): number {
  const l: Record<PalmLeafRegion, number> = {
    south_india: 60, southeast_asia: 50, sri_lanka: 55, nepal: 40, tibet: 35,
  };
  return l[region];
}

export function leafWidthCm(region: PalmLeafRegion): number {
  const w: Record<PalmLeafRegion, number> = {
    south_india: 5, southeast_asia: 4, sri_lanka: 4.5, nepal: 6, tibet: 5.5,
  };
  return w[region];
}

export function linesPerSide(region: PalmLeafRegion): number {
  const l: Record<PalmLeafRegion, number> = {
    south_india: 8, southeast_asia: 6, sri_lanka: 7, nepal: 5, tibet: 4,
  };
  return l[region];
}

export function inscriptionMethod(region: PalmLeafRegion): string {
  const m: Record<PalmLeafRegion, string> = {
    south_india: "iron_stylus", southeast_asia: "metal_stylus",
    sri_lanka: "iron_stylus", nepal: "ink_brush", tibet: "ink_brush",
  };
  return m[region];
}

export function preservationOilRequired(region: PalmLeafRegion): boolean {
  return region === "south_india" || region === "sri_lanka" || region === "southeast_asia";
}

export function durabilityYears(region: PalmLeafRegion): number {
  const d: Record<PalmLeafRegion, number> = {
    south_india: 500, southeast_asia: 300, sri_lanka: 400, nepal: 200, tibet: 250,
  };
  return d[region];
}

export function palmSpecies(region: PalmLeafRegion): string {
  const s: Record<PalmLeafRegion, string> = {
    south_india: "borassus", southeast_asia: "corypha",
    sri_lanka: "corypha", nepal: "trachycarpus", tibet: "trachycarpus",
  };
  return s[region];
}

export function boardHoles(region: PalmLeafRegion): number {
  const h: Record<PalmLeafRegion, number> = {
    south_india: 2, southeast_asia: 1, sri_lanka: 2, nepal: 1, tibet: 1,
  };
  return h[region];
}

export function costPerLeaf(region: PalmLeafRegion): number {
  const c: Record<PalmLeafRegion, number> = {
    south_india: 3, southeast_asia: 2, sri_lanka: 3, nepal: 4, tibet: 5,
  };
  return c[region];
}

export function palmLeafRegions(): PalmLeafRegion[] {
  return ["south_india", "southeast_asia", "sri_lanka", "nepal", "tibet"];
}
