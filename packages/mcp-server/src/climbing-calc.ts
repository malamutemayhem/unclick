export type GradeSystem = "yds" | "french" | "uiaa" | "v_scale" | "font";

export interface Route {
  name: string;
  grade: string;
  system: GradeSystem;
  pitches: number;
  lengthM: number;
}

const YDS_TO_FRENCH: Record<string, string> = {
  "5.5": "4a", "5.6": "4b", "5.7": "4c", "5.8": "5a", "5.9": "5b",
  "5.10a": "6a", "5.10b": "6a+", "5.10c": "6b", "5.10d": "6b+",
  "5.11a": "6c", "5.11b": "6c+", "5.11c": "7a", "5.11d": "7a+",
  "5.12a": "7b", "5.12b": "7b+", "5.12c": "7c", "5.12d": "7c+",
  "5.13a": "8a", "5.13b": "8a+", "5.13c": "8b", "5.13d": "8b+",
  "5.14a": "8c", "5.14b": "8c+", "5.14c": "9a", "5.14d": "9a+",
};

const FRENCH_TO_YDS: Record<string, string> = {};
for (const [k, v] of Object.entries(YDS_TO_FRENCH)) {
  FRENCH_TO_YDS[v] = k;
}

export function convertGrade(grade: string, from: GradeSystem, to: GradeSystem): string | null {
  if (from === to) return grade;
  if (from === "yds" && to === "french") return YDS_TO_FRENCH[grade] ?? null;
  if (from === "french" && to === "yds") return FRENCH_TO_YDS[grade] ?? null;
  return null;
}

export function gradeNumeric(grade: string, system: GradeSystem): number {
  if (system === "v_scale") {
    const match = grade.match(/^V(\d+)$/);
    return match ? parseInt(match[1]) : -1;
  }
  if (system === "yds") {
    const match = grade.match(/^5\.(\d+)([a-d])?$/);
    if (!match) return -1;
    const base = parseInt(match[1]);
    const sub = match[2] ? match[2].charCodeAt(0) - 96 : 0;
    return base * 4 + sub;
  }
  return -1;
}

export function isHarder(g1: string, g2: string, system: GradeSystem): boolean {
  return gradeNumeric(g1, system) > gradeNumeric(g2, system);
}

export function fallFactor(fallDistance: number, ropeOut: number): number {
  if (ropeOut === 0) return 0;
  return parseFloat((fallDistance / ropeOut).toFixed(2));
}

export function impactForce(
  fallFact: number,
  climberKg: number,
  ropeModulusKn: number = 8,
): number {
  const g = 9.81;
  const force = climberKg * g * (1 + Math.sqrt(1 + 2 * fallFact * ropeModulusKn * 1000 / (climberKg * g)));
  return parseFloat((force / 1000).toFixed(2));
}

export function ropeStretch(fallFact: number, ropeLengthM: number, elongationPercent: number = 8): number {
  return parseFloat((ropeLengthM * elongationPercent / 100 * Math.sqrt(fallFact)).toFixed(2));
}

export function climbingTime(pitches: number, gradeAvg: number, restMinPerPitch: number = 5): number {
  const minsPerPitch = 15 + gradeAvg * 2;
  return Math.round(pitches * (minsPerPitch + restMinPerPitch));
}

export function caloriesBurned(weightKg: number, durationMin: number, intensity: "easy" | "moderate" | "hard"): number {
  const met: Record<string, number> = { easy: 5.8, moderate: 8.0, hard: 11.0 };
  return Math.round(met[intensity] * weightKg * (durationMin / 60));
}

export function ropeDrag(pitchLengthM: number, angles: number[]): number {
  const frictionCoeff = 0.03;
  const totalBend = angles.reduce((s, a) => s + Math.abs(a) * Math.PI / 180, 0);
  return parseFloat((pitchLengthM * frictionCoeff * Math.exp(frictionCoeff * totalBend)).toFixed(2));
}

export function gearWeight(items: { name: string; weightG: number; quantity: number }[]): number {
  return items.reduce((s, i) => s + i.weightG * i.quantity, 0);
}

export function rackWeight(cams: number, nuts: number, quickdraws: number, slings: number): number {
  return cams * 95 + nuts * 35 + quickdraws * 100 + slings * 70;
}

export function approachTime(distanceKm: number, elevationGainM: number, fitnessLevel: "low" | "average" | "high"): number {
  const speeds: Record<string, number> = { low: 3, average: 4.5, high: 6 };
  const horizontalTime = distanceKm / speeds[fitnessLevel] * 60;
  const verticalTime = elevationGainM / (fitnessLevel === "high" ? 500 : fitnessLevel === "average" ? 350 : 250) * 60;
  return Math.round(horizontalTime + verticalTime);
}

export function hydrationNeeded(durationHours: number, temperatureC: number): number {
  const base = 0.5;
  const tempFactor = temperatureC > 30 ? 1.5 : temperatureC > 20 ? 1.2 : 1.0;
  return parseFloat((durationHours * base * tempFactor).toFixed(1));
}

export function sunExposure(startHour: number, durationHours: number, wallAspect: "north" | "south" | "east" | "west"): string {
  const endHour = startHour + durationHours;
  if (wallAspect === "north") return "shade";
  if (wallAspect === "east" && startHour < 12) return "sun";
  if (wallAspect === "west" && endHour > 14) return "sun";
  if (wallAspect === "south") return "sun";
  return "shade";
}

export function restDays(sessionsPerWeek: number, intensity: "easy" | "moderate" | "hard"): number {
  const base = intensity === "hard" ? 2 : intensity === "moderate" ? 1 : 0;
  return Math.min(7, 7 - sessionsPerWeek + base);
}
