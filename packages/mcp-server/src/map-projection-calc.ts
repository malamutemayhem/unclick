export type MapProjection = "mercator" | "robinson" | "mollweide" | "stereographic" | "azimuthal";

export function areaDistortion(projection: MapProjection): number {
  const a: Record<MapProjection, number> = {
    mercator: 9, robinson: 4, mollweide: 1, stereographic: 6, azimuthal: 5,
  };
  return a[projection];
}

export function shapeDistortion(projection: MapProjection): number {
  const s: Record<MapProjection, number> = {
    mercator: 1, robinson: 4, mollweide: 7, stereographic: 2, azimuthal: 3,
  };
  return s[projection];
}

export function directionAccuracy(projection: MapProjection): number {
  const d: Record<MapProjection, number> = {
    mercator: 10, robinson: 6, mollweide: 4, stereographic: 8, azimuthal: 9,
  };
  return d[projection];
}

export function distanceAccuracy(projection: MapProjection): number {
  const d: Record<MapProjection, number> = {
    mercator: 3, robinson: 7, mollweide: 6, stereographic: 5, azimuthal: 8,
  };
  return d[projection];
}

export function conformal(projection: MapProjection): boolean {
  const c: Record<MapProjection, boolean> = {
    mercator: true, robinson: false, mollweide: false, stereographic: true, azimuthal: false,
  };
  return c[projection];
}

export function equalArea(projection: MapProjection): boolean {
  const e: Record<MapProjection, boolean> = {
    mercator: false, robinson: false, mollweide: true, stereographic: false, azimuthal: false,
  };
  return e[projection];
}

export function bestUse(projection: MapProjection): string {
  const b: Record<MapProjection, string> = {
    mercator: "navigation", robinson: "world_maps", mollweide: "thematic_maps",
    stereographic: "polar_regions", azimuthal: "flight_planning",
  };
  return b[projection];
}

export function polarSuitability(projection: MapProjection): number {
  const p: Record<MapProjection, number> = {
    mercator: 1, robinson: 5, mollweide: 6, stereographic: 10, azimuthal: 10,
  };
  return p[projection];
}

export function popularityRating(projection: MapProjection): number {
  const p: Record<MapProjection, number> = {
    mercator: 10, robinson: 8, mollweide: 5, stereographic: 4, azimuthal: 3,
  };
  return p[projection];
}

export function mapProjections(): MapProjection[] {
  return ["mercator", "robinson", "mollweide", "stereographic", "azimuthal"];
}
