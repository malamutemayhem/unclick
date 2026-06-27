export interface Earthquake {
  magnitude: number;
  depth: number;
  latitude: number;
  longitude: number;
  timestamp: number;
}

export function richterToEnergy(magnitude: number): number {
  return Math.pow(10, 1.5 * magnitude + 4.8);
}

export function energyToRichter(energyJoules: number): number {
  return parseFloat(((Math.log10(energyJoules) - 4.8) / 1.5).toFixed(2));
}

export function magnitudeCompare(m1: number, m2: number): { energyRatio: number; amplitudeRatio: number } {
  const energyRatio = Math.pow(10, 1.5 * (m1 - m2));
  const amplitudeRatio = Math.pow(10, m1 - m2);
  return {
    energyRatio: parseFloat(energyRatio.toFixed(2)),
    amplitudeRatio: parseFloat(amplitudeRatio.toFixed(2)),
  };
}

export function intensityDescription(magnitude: number): string {
  if (magnitude < 2.0) return "micro";
  if (magnitude < 3.0) return "minor";
  if (magnitude < 4.0) return "light";
  if (magnitude < 5.0) return "moderate";
  if (magnitude < 6.0) return "strong";
  if (magnitude < 7.0) return "major";
  if (magnitude < 8.0) return "great";
  return "massive";
}

export function estimatedFrequency(magnitude: number): string {
  if (magnitude >= 8) return "1 per year";
  if (magnitude >= 7) return "15 per year";
  if (magnitude >= 6) return "120 per year";
  if (magnitude >= 5) return "1300 per year";
  if (magnitude >= 4) return "13000 per year";
  if (magnitude >= 3) return "130000 per year";
  return "millions per year";
}

export function pWaveArrival(distanceKm: number, pVelocity = 6.0): number {
  return parseFloat((distanceKm / pVelocity).toFixed(2));
}

export function sWaveArrival(distanceKm: number, sVelocity = 3.5): number {
  return parseFloat((distanceKm / sVelocity).toFixed(2));
}

export function spTimeDifference(distanceKm: number, pVelocity = 6.0, sVelocity = 3.5): number {
  return parseFloat((sWaveArrival(distanceKm, sVelocity) - pWaveArrival(distanceKm, pVelocity)).toFixed(2));
}

export function distanceFromSPTime(spTimeSec: number, pVelocity = 6.0, sVelocity = 3.5): number {
  const distance = spTimeSec / (1 / sVelocity - 1 / pVelocity);
  return parseFloat(distance.toFixed(1));
}

export function peakGroundAcceleration(magnitude: number, distanceKm: number): number {
  const logPGA = 0.28 + 0.67 * magnitude - 1.6 * Math.log10(distanceKm + 10);
  return parseFloat(Math.pow(10, logPGA).toFixed(2));
}

export function mercalliFromPGA(pgaCmPerS2: number): number {
  if (pgaCmPerS2 < 0.17) return 1;
  if (pgaCmPerS2 < 1.4) return 3;
  if (pgaCmPerS2 < 3.9) return 4;
  if (pgaCmPerS2 < 9.2) return 5;
  if (pgaCmPerS2 < 18) return 6;
  if (pgaCmPerS2 < 34) return 7;
  if (pgaCmPerS2 < 65) return 8;
  if (pgaCmPerS2 < 124) return 9;
  return 10;
}

export function mercalliDescription(intensity: number): string {
  const descriptions = [
    "", "Not felt", "Weak", "Weak", "Light", "Moderate",
    "Strong", "Very strong", "Severe", "Violent", "Extreme",
  ];
  return descriptions[Math.min(intensity, 10)] ?? "Unknown";
}

export function tsunamiRisk(magnitude: number, depth: number, isUndersea: boolean): string {
  if (!isUndersea) return "none";
  if (magnitude < 6.5) return "very low";
  if (magnitude < 7.0) return "low";
  if (magnitude < 7.5 && depth < 70) return "moderate";
  if (magnitude < 8.0) return "high";
  return "very high";
}

export function aftershockEstimate(mainMagnitude: number): { magnitude: number; count: number } {
  const largestAftershock = mainMagnitude - 1.2;
  const count = Math.round(Math.pow(10, mainMagnitude - 4));
  return {
    magnitude: parseFloat(largestAftershock.toFixed(1)),
    count: Math.max(1, count),
  };
}

export function momentMagnitude(seismicMoment: number): number {
  return parseFloat(((2 / 3) * Math.log10(seismicMoment) - 6.07).toFixed(2));
}

export function seismicMoment(magnitude: number): number {
  return Math.pow(10, 1.5 * magnitude + 9.105);
}

export function faultLength(magnitude: number): number {
  return parseFloat(Math.pow(10, 0.5 * magnitude - 1.9).toFixed(1));
}

export function epicentralDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (d: number) => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return parseFloat((6371 * 2 * Math.asin(Math.sqrt(a))).toFixed(1));
}
