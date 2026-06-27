export type RecordSize = 7 | 10 | 12;
export type RecordSpeed = 33 | 45 | 78;
export type GradeCondition = "M" | "NM" | "VG+" | "VG" | "G+" | "G" | "F" | "P";

const GRADE_VALUE: Record<GradeCondition, number> = {
  M: 1.0, "NM": 0.85, "VG+": 0.6, VG: 0.4, "G+": 0.2, G: 0.1, F: 0.05, P: 0.02,
};

export function gradeMultiplier(grade: GradeCondition): number {
  return GRADE_VALUE[grade];
}

export function marketValue(baseValue: number, grade: GradeCondition): number {
  return parseFloat((baseValue * GRADE_VALUE[grade]).toFixed(2));
}

export function playingTime(size: RecordSize, speed: RecordSpeed): number {
  if (speed === 33 && size === 12) return 22;
  if (speed === 33 && size === 10) return 15;
  if (speed === 45 && size === 12) return 15;
  if (speed === 45 && size === 7) return 5;
  if (speed === 78 && size === 10) return 3;
  return 10;
}

export function grooveLength(size: RecordSize, speed: RecordSpeed, minutesPerSide: number): number {
  const rpm = speed;
  const revolutions = rpm * minutesPerSide;
  const avgCircumference = size * 25.4 * Math.PI * 0.4;
  return parseFloat((revolutions * avgCircumference / 1000).toFixed(0));
}

export function trackingForce(cartridgeType: "mm" | "mc"): { min: number; max: number } {
  if (cartridgeType === "mm") return { min: 1.5, max: 2.5 };
  return { min: 1.0, max: 2.0 };
}

export function antiSkate(trackingForceG: number): number {
  return parseFloat((trackingForceG * 1.0).toFixed(1));
}

export function stylusLife(hoursPlayed: number, maxHours: number = 1000): number {
  return parseFloat(((1 - hoursPlayed / maxHours) * 100).toFixed(1));
}

export function cleaningInterval(playsPerWeek: number): number {
  if (playsPerWeek >= 10) return 1;
  if (playsPerWeek >= 5) return 2;
  return 4;
}

export function innerSleeve(value: number): string {
  if (value > 100) return "MoFi or polylined";
  if (value > 30) return "polylined";
  return "standard paper";
}

export function storageTemp(): { minC: number; maxC: number } {
  return { minC: 18, maxC: 22 };
}

export function warpThreshold(): number {
  return 3;
}

export function pressWeight(gramsPerRecord: number): string {
  if (gramsPerRecord >= 180) return "heavyweight";
  if (gramsPerRecord >= 150) return "standard";
  return "lightweight";
}

export function recordSizes(): RecordSize[] {
  return [7, 10, 12];
}
