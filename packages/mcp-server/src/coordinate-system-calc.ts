export type CoordinateSystem = "geographic" | "utm" | "state_plane" | "ecef" | "local";

export function globalCoverage(c: CoordinateSystem): number {
  const m: Record<CoordinateSystem, number> = {
    geographic: 10, utm: 9, state_plane: 3, ecef: 10, local: 1,
  };
  return m[c];
}

export function positionAccuracy(c: CoordinateSystem): number {
  const m: Record<CoordinateSystem, number> = {
    geographic: 6, utm: 8, state_plane: 9, ecef: 7, local: 10,
  };
  return m[c];
}

export function distortionLevel(c: CoordinateSystem): number {
  const m: Record<CoordinateSystem, number> = {
    geographic: 7, utm: 3, state_plane: 2, ecef: 5, local: 1,
  };
  return m[c];
}

export function complexityScore(c: CoordinateSystem): number {
  const m: Record<CoordinateSystem, number> = {
    geographic: 3, utm: 5, state_plane: 6, ecef: 8, local: 2,
  };
  return m[c];
}

export function gpsCompatibility(c: CoordinateSystem): number {
  const m: Record<CoordinateSystem, number> = {
    geographic: 10, utm: 7, state_plane: 5, ecef: 9, local: 2,
  };
  return m[c];
}

export function isProjected(c: CoordinateSystem): boolean {
  const m: Record<CoordinateSystem, boolean> = {
    geographic: false, utm: true, state_plane: true, ecef: false, local: true,
  };
  return m[c];
}

export function threeD(c: CoordinateSystem): boolean {
  const m: Record<CoordinateSystem, boolean> = {
    geographic: false, utm: false, state_plane: false, ecef: true, local: true,
  };
  return m[c];
}

export function primaryUse(c: CoordinateSystem): string {
  const m: Record<CoordinateSystem, string> = {
    geographic: "navigation_mapping", utm: "military_topographic",
    state_plane: "surveying_engineering", ecef: "satellite_systems",
    local: "construction_sites",
  };
  return m[c];
}

export function unitType(c: CoordinateSystem): string {
  const m: Record<CoordinateSystem, string> = {
    geographic: "degrees_lat_lon", utm: "meters_easting_northing",
    state_plane: "feet_or_meters", ecef: "meters_xyz",
    local: "arbitrary_units",
  };
  return m[c];
}

export function coordinateSystems(): CoordinateSystem[] {
  return ["geographic", "utm", "state_plane", "ecef", "local"];
}
