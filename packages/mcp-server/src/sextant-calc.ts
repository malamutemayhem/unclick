export type CelestialBody = "sun" | "moon" | "polaris" | "sirius" | "canopus" | "venus";

export function altitudeCorrection(observedAltDeg: number, heightOfEyeM: number): number {
  const dip = 1.76 * Math.sqrt(heightOfEyeM) / 60;
  const refraction = 0.97 / Math.tan((observedAltDeg + 10.3 / (observedAltDeg + 5.11)) * Math.PI / 180) / 60;
  return parseFloat((observedAltDeg - dip - refraction).toFixed(4));
}

export function dipCorrection(heightOfEyeM: number): number {
  return parseFloat((1.76 * Math.sqrt(heightOfEyeM) / 60).toFixed(4));
}

export function refractionCorrection(altDeg: number): number {
  if (altDeg <= 0) return 0;
  return parseFloat((0.97 / Math.tan((altDeg + 10.3 / (altDeg + 5.11)) * Math.PI / 180) / 60).toFixed(4));
}

export function indexError(onArc: number, offArc: number): number {
  return parseFloat(((onArc - offArc) / 2).toFixed(2));
}

export function latitude(altitudePolaris: number): number {
  return parseFloat(altitudePolaris.toFixed(4));
}

export function noonLatitude(sunDeclination: number, noonAltitude: number): number {
  return parseFloat((sunDeclination + 90 - noonAltitude).toFixed(4));
}

export function distanceToHorizonKm(heightM: number): number {
  return parseFloat((3.57 * Math.sqrt(heightM)).toFixed(1));
}

export function arcToTime(arcMinutes: number): number {
  return parseFloat((arcMinutes * 4).toFixed(1));
}

export function timeToArc(seconds: number): number {
  return parseFloat((seconds / 4).toFixed(2));
}

export function interceptDistance(computed: number, observed: number): number {
  return parseFloat(((observed - computed) * 60).toFixed(1));
}

export function accuracy(experience: string): number {
  if (experience === "expert") return 0.1;
  if (experience === "intermediate") return 0.5;
  return 2.0;
}

export function celestialBodies(): CelestialBody[] {
  return ["sun", "moon", "polaris", "sirius", "canopus", "venus"];
}
