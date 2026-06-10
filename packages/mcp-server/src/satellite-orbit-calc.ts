export type OrbitType = "leo" | "meo" | "geo" | "heo" | "sso";

export function altitudeKm(o: OrbitType): number {
  const m: Record<OrbitType, number> = {
    leo: 500, meo: 20000, geo: 35786, heo: 40000, sso: 800,
  };
  return m[o];
}

export function orbitalPeriodMinutes(o: OrbitType): number {
  const m: Record<OrbitType, number> = {
    leo: 90, meo: 720, geo: 1440, heo: 1500, sso: 100,
  };
  return m[o];
}

export function signalLatencyMs(o: OrbitType): number {
  const m: Record<OrbitType, number> = {
    leo: 5, meo: 100, geo: 600, heo: 700, sso: 8,
  };
  return m[o];
}

export function coverageArea(o: OrbitType): number {
  const m: Record<OrbitType, number> = {
    leo: 3, meo: 6, geo: 10, heo: 8, sso: 4,
  };
  return m[o];
}

export function launchCost(o: OrbitType): number {
  const m: Record<OrbitType, number> = {
    leo: 3, meo: 6, geo: 9, heo: 10, sso: 4,
  };
  return m[o];
}

export function geostationary(o: OrbitType): boolean {
  const m: Record<OrbitType, boolean> = {
    leo: false, meo: false, geo: true, heo: false, sso: false,
  };
  return m[o];
}

export function sunSynchronous(o: OrbitType): boolean {
  const m: Record<OrbitType, boolean> = {
    leo: false, meo: false, geo: false, heo: false, sso: true,
  };
  return m[o];
}

export function primaryUse(o: OrbitType): string {
  const m: Record<OrbitType, string> = {
    leo: "earth_observation", meo: "navigation",
    geo: "communications", heo: "arctic_coverage",
    sso: "remote_sensing",
  };
  return m[o];
}

export function exampleConstellation(o: OrbitType): string {
  const m: Record<OrbitType, string> = {
    leo: "starlink", meo: "gps", geo: "intelsat",
    heo: "molniya", sso: "landsat",
  };
  return m[o];
}

export function orbitTypes(): OrbitType[] {
  return ["leo", "meo", "geo", "heo", "sso"];
}
