export type BoomerangType = "returning" | "hunting" | "sport" | "indoor" | "long_range";
export type Material = "plywood" | "hardwood" | "carbon_fiber" | "foam" | "3d_printed";

export function wingSpan(type: BoomerangType): number {
  const cm: Record<BoomerangType, number> = {
    returning: 30, hunting: 50, sport: 35, indoor: 20, long_range: 40,
  };
  return cm[type];
}

export function throwAngle(windSpeedKmh: number): number {
  return parseFloat(Math.min(60, 45 + windSpeedKmh * 0.5).toFixed(1));
}

export function tiltAngle(type: BoomerangType): number {
  const deg: Record<BoomerangType, number> = {
    returning: 20, hunting: 5, sport: 15, indoor: 30, long_range: 10,
  };
  return deg[type];
}

export function spinRate(throwSpeedKmh: number, wingSpanCm: number): number {
  if (wingSpanCm <= 0) return 0;
  return parseFloat((throwSpeedKmh * 100 / wingSpanCm).toFixed(0));
}

export function flightRadius(wingSpanCm: number, throwSpeedKmh: number): number {
  return parseFloat((wingSpanCm * throwSpeedKmh / 30).toFixed(1));
}

export function flightTime(radiusM: number): number {
  return parseFloat((2 * Math.PI * radiusM / 15).toFixed(1));
}

export function liftForce(speedMs: number, wingAreaCm2: number): number {
  const airDensity = 1.225;
  const cl = 0.3;
  const areaSqM = wingAreaCm2 / 10000;
  return parseFloat((0.5 * airDensity * speedMs * speedMs * areaSqM * cl).toFixed(3));
}

export function airfoilThickness(chordMm: number): number {
  return parseFloat((chordMm * 0.08).toFixed(1));
}

export function materialWeight(material: Material, volumeCc: number): number {
  const density: Record<Material, number> = {
    plywood: 0.55, hardwood: 0.75, carbon_fiber: 1.6, foam: 0.05, "3d_printed": 1.24,
  };
  return parseFloat((density[material] * volumeCc).toFixed(1));
}

export function tuningClips(wingCount: number): number {
  return wingCount * 2;
}

export function safetyRadius(type: BoomerangType): number {
  const m: Record<BoomerangType, number> = {
    returning: 50, hunting: 100, sport: 60, indoor: 10, long_range: 80,
  };
  return m[type];
}

export function boomerangTypes(): BoomerangType[] {
  return ["returning", "hunting", "sport", "indoor", "long_range"];
}
