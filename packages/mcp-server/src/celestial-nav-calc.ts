export type CelestialBody = "sun" | "polaris" | "sirius" | "vega" | "moon";

export function altitudeCorrection(bodyApparentAltDeg: number): number {
  return Math.round((bodyApparentAltDeg - 0.97 / Math.tan((bodyApparentAltDeg * Math.PI) / 180)) * 100) / 100;
}

export function hourAngleDeg(gha: number, longitude: number): number {
  let lha = gha + longitude;
  if (lha < 0) lha += 360;
  if (lha >= 360) lha -= 360;
  return Math.round(lha * 100) / 100;
}

export function magnitude(body: CelestialBody): number {
  const mags: Record<CelestialBody, number> = {
    sun: -26.7, polaris: 2.0, sirius: -1.5, vega: 0.0, moon: -12.7,
  };
  return mags[body];
}

export function bestObservationTime(body: CelestialBody): string {
  const times: Record<CelestialBody, string> = {
    sun: "noon", polaris: "night", sirius: "night", vega: "night", moon: "varies",
  };
  return times[body];
}

export function visibleFromLatitude(body: CelestialBody): { min: number; max: number } {
  const ranges: Record<CelestialBody, { min: number; max: number }> = {
    sun: { min: -90, max: 90 }, polaris: { min: 0, max: 90 },
    sirius: { min: -90, max: 73 }, vega: { min: -51, max: 90 },
    moon: { min: -90, max: 90 },
  };
  return ranges[body];
}

export function sextantRequired(): boolean {
  return true;
}

export function accuracyNauticalMiles(): number {
  return 1;
}

export function sightReductionSteps(): number {
  return 7;
}

export function almanacRequired(): boolean {
  return true;
}

export function celestialBodies(): CelestialBody[] {
  return ["sun", "polaris", "sirius", "vega", "moon"];
}
