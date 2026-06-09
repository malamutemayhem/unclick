export interface TidalConstituent {
  name: string;
  amplitude: number;
  phase: number;
  speed: number;
}

export interface TideStation {
  name: string;
  latitude: number;
  longitude: number;
  constituents: TidalConstituent[];
  datum: number;
}

export const STANDARD_SPEEDS: Record<string, number> = {
  M2: 28.984104,
  S2: 30.0,
  N2: 28.439730,
  K1: 15.041069,
  O1: 13.943035,
  P1: 14.958931,
  K2: 30.082138,
  Q1: 13.398661,
  M4: 57.968208,
  MS4: 58.984104,
};

export function createConstituent(name: string, amplitude: number, phaseDeg: number): TidalConstituent {
  const speed = STANDARD_SPEEDS[name] ?? 0;
  return { name, amplitude, phase: phaseDeg, speed };
}

export function createStation(
  name: string,
  lat: number,
  lon: number,
  constituents: TidalConstituent[],
  datum = 0
): TideStation {
  return { name, latitude: lat, longitude: lon, constituents, datum };
}

export function predictTide(station: TideStation, hoursFromEpoch: number): number {
  let height = station.datum;
  for (const c of station.constituents) {
    const angle = (c.speed * hoursFromEpoch + c.phase) * Math.PI / 180;
    height += c.amplitude * Math.cos(angle);
  }
  return Math.round(height * 1000) / 1000;
}

export function predictTideRange(station: TideStation, startHour: number, endHour: number, stepHours = 0.25): { time: number; height: number }[] {
  const results: { time: number; height: number }[] = [];
  for (let t = startHour; t <= endHour; t += stepHours) {
    results.push({ time: t, height: predictTide(station, t) });
  }
  return results;
}

export function findHighLow(
  station: TideStation,
  startHour: number,
  endHour: number,
  resolution = 0.1
): { time: number; height: number; type: "high" | "low" }[] {
  const extremes: { time: number; height: number; type: "high" | "low" }[] = [];
  let prev = predictTide(station, startHour);
  let prevDir = 0;

  for (let t = startHour + resolution; t <= endHour; t += resolution) {
    const h = predictTide(station, t);
    const dir = h > prev ? 1 : h < prev ? -1 : 0;

    if (prevDir > 0 && dir < 0) {
      extremes.push({ time: Math.round((t - resolution) * 100) / 100, height: prev, type: "high" });
    } else if (prevDir < 0 && dir > 0) {
      extremes.push({ time: Math.round((t - resolution) * 100) / 100, height: prev, type: "low" });
    }

    if (dir !== 0) prevDir = dir;
    prev = h;
  }

  return extremes;
}

export function tidalRange(station: TideStation, startHour: number, endHour: number): number {
  const extremes = findHighLow(station, startHour, endHour);
  if (extremes.length < 2) return 0;
  const heights = extremes.map(e => e.height);
  return Math.max(...heights) - Math.min(...heights);
}

export function meanTideLevel(station: TideStation, startHour: number, endHour: number, step = 0.5): number {
  let sum = 0, count = 0;
  for (let t = startHour; t <= endHour; t += step) {
    sum += predictTide(station, t);
    count++;
  }
  return count > 0 ? Math.round(sum / count * 1000) / 1000 : 0;
}

export function nextHighTide(station: TideStation, fromHour: number, maxSearch = 24): { time: number; height: number } | null {
  const extremes = findHighLow(station, fromHour, fromHour + maxSearch);
  const high = extremes.find(e => e.type === "high");
  return high ? { time: high.time, height: high.height } : null;
}

export function nextLowTide(station: TideStation, fromHour: number, maxSearch = 24): { time: number; height: number } | null {
  const extremes = findHighLow(station, fromHour, fromHour + maxSearch);
  const low = extremes.find(e => e.type === "low");
  return low ? { time: low.time, height: low.height } : null;
}

export function tidalCurrent(station: TideStation, hour: number, dt = 0.01): number {
  const h1 = predictTide(station, hour - dt);
  const h2 = predictTide(station, hour + dt);
  return Math.round((h2 - h1) / (2 * dt) * 1000) / 1000;
}

export function isTideRising(station: TideStation, hour: number): boolean {
  return tidalCurrent(station, hour) > 0;
}

export function simpleSemiDiurnal(amplitude = 1, phase = 0): TideStation {
  return createStation("Simple Semi-Diurnal", 0, 0, [
    createConstituent("M2", amplitude, phase),
  ]);
}

export function mixedTide(m2Amp = 1, k1Amp = 0.5): TideStation {
  return createStation("Mixed Tide", 0, 0, [
    createConstituent("M2", m2Amp, 0),
    createConstituent("K1", k1Amp, 0),
    createConstituent("S2", m2Amp * 0.46, 0),
  ]);
}
