export type TectonicBoundary = "divergent" | "convergent" | "transform" | "hotspot" | "subduction";

export function seismicActivity(boundary: TectonicBoundary): number {
  const m: Record<TectonicBoundary, number> = {
    divergent: 5, convergent: 9, transform: 8, hotspot: 3, subduction: 10,
  };
  return m[boundary];
}

export function volcanicActivity(boundary: TectonicBoundary): number {
  const m: Record<TectonicBoundary, number> = {
    divergent: 7, convergent: 8, transform: 1, hotspot: 9, subduction: 9,
  };
  return m[boundary];
}

export function mountainBuilding(boundary: TectonicBoundary): number {
  const m: Record<TectonicBoundary, number> = {
    divergent: 2, convergent: 10, transform: 1, hotspot: 3, subduction: 8,
  };
  return m[boundary];
}

export function spreadRateCmPerYear(boundary: TectonicBoundary): number {
  const m: Record<TectonicBoundary, number> = {
    divergent: 5, convergent: 3, transform: 4, hotspot: 8, subduction: 6,
  };
  return m[boundary];
}

export function tsunamiRisk(boundary: TectonicBoundary): number {
  const m: Record<TectonicBoundary, number> = {
    divergent: 2, convergent: 8, transform: 3, hotspot: 1, subduction: 10,
  };
  return m[boundary];
}

export function createsOceanFloor(boundary: TectonicBoundary): boolean {
  const m: Record<TectonicBoundary, boolean> = {
    divergent: true, convergent: false, transform: false, hotspot: false, subduction: false,
  };
  return m[boundary];
}

export function destroysCrust(boundary: TectonicBoundary): boolean {
  const m: Record<TectonicBoundary, boolean> = {
    divergent: false, convergent: true, transform: false, hotspot: false, subduction: true,
  };
  return m[boundary];
}

export function exampleLocation(boundary: TectonicBoundary): string {
  const m: Record<TectonicBoundary, string> = {
    divergent: "mid_atlantic_ridge", convergent: "himalayas", transform: "san_andreas",
    hotspot: "hawaii", subduction: "mariana_trench",
  };
  return m[boundary];
}

export function trenchFormation(boundary: TectonicBoundary): number {
  const m: Record<TectonicBoundary, number> = {
    divergent: 1, convergent: 5, transform: 1, hotspot: 1, subduction: 10,
  };
  return m[boundary];
}

export function tectonicBoundaries(): TectonicBoundary[] {
  return ["divergent", "convergent", "transform", "hotspot", "subduction"];
}
