export type PendulumType = "simple" | "compound" | "foucault" | "torsion" | "conical" | "double";

export function period(lengthM: number, g: number = 9.81): number {
  return parseFloat((2 * Math.PI * Math.sqrt(lengthM / g)).toFixed(4));
}

export function frequency(periodS: number): number {
  if (periodS <= 0) return 0;
  return parseFloat((1 / periodS).toFixed(4));
}

export function lengthFromPeriod(periodS: number, g: number = 9.81): number {
  return parseFloat((g * (periodS / (2 * Math.PI)) ** 2).toFixed(4));
}

export function maxVelocity(lengthM: number, amplitudeDeg: number): number {
  const amp = amplitudeDeg * Math.PI / 180;
  const g = 9.81;
  return parseFloat(Math.sqrt(2 * g * lengthM * (1 - Math.cos(amp))).toFixed(3));
}

export function maxAcceleration(lengthM: number, amplitudeDeg: number): number {
  const amp = amplitudeDeg * Math.PI / 180;
  const g = 9.81;
  return parseFloat((g * Math.sin(amp)).toFixed(3));
}

export function energy(massKg: number, lengthM: number, amplitudeDeg: number): number {
  const amp = amplitudeDeg * Math.PI / 180;
  const g = 9.81;
  return parseFloat((massKg * g * lengthM * (1 - Math.cos(amp))).toFixed(4));
}

export function dampingTime(periodS: number, qualityFactor: number): number {
  return parseFloat((periodS * qualityFactor / Math.PI).toFixed(1));
}

export function foucaultRotation(latitudeDeg: number, hours: number): number {
  const rate = 360 * Math.sin(latitudeDeg * Math.PI / 180) / 24;
  return parseFloat((rate * hours).toFixed(2));
}

export function foucaultFullRotation(latitudeDeg: number): number {
  const sinLat = Math.sin(latitudeDeg * Math.PI / 180);
  if (Math.abs(sinLat) < 0.001) return Infinity;
  return parseFloat((24 / Math.abs(sinLat)).toFixed(1));
}

export function bobWeight(lengthM: number): number {
  return parseFloat((lengthM * 2 + 0.5).toFixed(1));
}

export function stringTension(massKg: number, amplitudeDeg: number): number {
  const amp = amplitudeDeg * Math.PI / 180;
  const g = 9.81;
  return parseFloat((massKg * g * (3 * Math.cos(amp) - 2)).toFixed(2));
}

export function ticksPerDay(periodS: number): number {
  if (periodS <= 0) return 0;
  return Math.round(86400 / periodS);
}

export function pendulumTypes(): PendulumType[] {
  return ["simple", "compound", "foucault", "torsion", "conical", "double"];
}
