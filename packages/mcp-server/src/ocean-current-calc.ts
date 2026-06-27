export type OceanCurrent = "gulf_stream" | "kuroshio" | "humboldt" | "antarctic_circumpolar" | "agulhas";

export function speedKnots(current: OceanCurrent): number {
  const m: Record<OceanCurrent, number> = {
    gulf_stream: 4, kuroshio: 3, humboldt: 1, antarctic_circumpolar: 2, agulhas: 3.5,
  };
  return m[current];
}

export function widthKm(current: OceanCurrent): number {
  const m: Record<OceanCurrent, number> = {
    gulf_stream: 80, kuroshio: 100, humboldt: 900, antarctic_circumpolar: 200, agulhas: 100,
  };
  return m[current];
}

export function depthMeters(current: OceanCurrent): number {
  const m: Record<OceanCurrent, number> = {
    gulf_stream: 1000, kuroshio: 800, humboldt: 200, antarctic_circumpolar: 4000, agulhas: 1500,
  };
  return m[current];
}

export function temperatureInfluence(current: OceanCurrent): number {
  const m: Record<OceanCurrent, number> = {
    gulf_stream: 10, kuroshio: 8, humboldt: 7, antarctic_circumpolar: 5, agulhas: 6,
  };
  return m[current];
}

export function marineProductivity(current: OceanCurrent): number {
  const m: Record<OceanCurrent, number> = {
    gulf_stream: 5, kuroshio: 6, humboldt: 10, antarctic_circumpolar: 7, agulhas: 4,
  };
  return m[current];
}

export function warmCurrent(current: OceanCurrent): boolean {
  const m: Record<OceanCurrent, boolean> = {
    gulf_stream: true, kuroshio: true, humboldt: false, antarctic_circumpolar: false, agulhas: true,
  };
  return m[current];
}

export function windDriven(current: OceanCurrent): boolean {
  const m: Record<OceanCurrent, boolean> = {
    gulf_stream: true, kuroshio: true, humboldt: true, antarctic_circumpolar: true, agulhas: false,
  };
  return m[current];
}

export function affectedCoast(current: OceanCurrent): string {
  const m: Record<OceanCurrent, string> = {
    gulf_stream: "eastern_north_america", kuroshio: "japan", humboldt: "south_america_west",
    antarctic_circumpolar: "southern_ocean", agulhas: "southern_africa",
  };
  return m[current];
}

export function climateImportance(current: OceanCurrent): number {
  const m: Record<OceanCurrent, number> = {
    gulf_stream: 10, kuroshio: 7, humboldt: 8, antarctic_circumpolar: 9, agulhas: 6,
  };
  return m[current];
}

export function oceanCurrents(): OceanCurrent[] {
  return ["gulf_stream", "kuroshio", "humboldt", "antarctic_circumpolar", "agulhas"];
}
