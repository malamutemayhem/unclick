export type ContourMethod = "index" | "intermediate" | "supplementary" | "depression" | "bathymetric";

export function intervalSize(c: ContourMethod): number {
  const m: Record<ContourMethod, number> = {
    index: 5, intermediate: 1, supplementary: 0, depression: 1, bathymetric: 3,
  };
  return m[c];
}

export function lineWeight(c: ContourMethod): number {
  const m: Record<ContourMethod, number> = {
    index: 10, intermediate: 5, supplementary: 3, depression: 5, bathymetric: 6,
  };
  return m[c];
}

export function labelFrequency(c: ContourMethod): number {
  const m: Record<ContourMethod, number> = {
    index: 10, intermediate: 3, supplementary: 1, depression: 5, bathymetric: 7,
  };
  return m[c];
}

export function detailLevel(c: ContourMethod): number {
  const m: Record<ContourMethod, number> = {
    index: 4, intermediate: 7, supplementary: 10, depression: 7, bathymetric: 6,
  };
  return m[c];
}

export function readabilityScore(c: ContourMethod): number {
  const m: Record<ContourMethod, number> = {
    index: 9, intermediate: 6, supplementary: 4, depression: 7, bathymetric: 5,
  };
  return m[c];
}

export function hasHachures(c: ContourMethod): boolean {
  const m: Record<ContourMethod, boolean> = {
    index: false, intermediate: false, supplementary: false, depression: true, bathymetric: false,
  };
  return m[c];
}

export function usedUnderwater(c: ContourMethod): boolean {
  const m: Record<ContourMethod, boolean> = {
    index: false, intermediate: false, supplementary: false, depression: false, bathymetric: true,
  };
  return m[c];
}

export function mapContext(c: ContourMethod): string {
  const m: Record<ContourMethod, string> = {
    index: "major_elevation_reference", intermediate: "standard_terrain",
    supplementary: "flat_terrain_detail", depression: "closed_depressions",
    bathymetric: "ocean_lake_depth",
  };
  return m[c];
}

export function lineStyle(c: ContourMethod): string {
  const m: Record<ContourMethod, string> = {
    index: "thick_solid_labeled", intermediate: "thin_solid",
    supplementary: "dashed", depression: "tick_marks_inside",
    bathymetric: "blue_solid",
  };
  return m[c];
}

export function contourMethods(): ContourMethod[] {
  return ["index", "intermediate", "supplementary", "depression", "bathymetric"];
}
