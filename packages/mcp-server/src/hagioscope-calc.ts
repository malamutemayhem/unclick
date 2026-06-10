export type HagioscopeAngle = "narrow" | "standard" | "wide" | "oblique" | "double";

export function openingWidthCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.15).toFixed(1));
}

export function openingHeightCm(widthCm: number): number {
  return parseFloat((widthCm * 2.5).toFixed(1));
}

export function splayAngleDeg(angleType: HagioscopeAngle): number {
  const angles: Record<HagioscopeAngle, number> = {
    narrow: 15, standard: 30, wide: 45, oblique: 60, double: 35,
  };
  return angles[angleType];
}

export function channelLengthCm(wallThicknessCm: number): number {
  return wallThicknessCm;
}

export function viewingAreaCm2(widthCm: number, heightCm: number): number {
  return parseFloat((widthCm * heightCm).toFixed(1));
}

export function sightLineLengthM(wallThicknessCm: number, splayDeg: number): number {
  const rad = splayDeg * Math.PI / 180;
  const extra = wallThicknessCm * Math.tan(rad);
  return parseFloat(((wallThicknessCm + extra) / 100).toFixed(2));
}

export function stoneRemovalVolumeCm3(widthCm: number, heightCm: number, wallThicknessCm: number): number {
  return parseFloat((widthCm * heightCm * wallThicknessCm * 1.3).toFixed(1));
}

export function carvingHours(wallThicknessCm: number, angleType: HagioscopeAngle): number {
  const base = wallThicknessCm * 0.3;
  const difficulty: Record<HagioscopeAngle, number> = {
    narrow: 1.0, standard: 1.2, wide: 1.5, oblique: 1.8, double: 2.5,
  };
  return parseFloat((base * difficulty[angleType]).toFixed(1));
}

export function lightTransmissionPercent(widthCm: number, wallThicknessCm: number): number {
  const ratio = widthCm / wallThicknessCm;
  return parseFloat((Math.min(ratio * 100, 80)).toFixed(1));
}

export function restorationCost(wallThicknessCm: number, costPerHour: number): number {
  const hours = wallThicknessCm * 0.5;
  return parseFloat((hours * costPerHour).toFixed(2));
}

export function hagioscopeAngles(): HagioscopeAngle[] {
  return ["narrow", "standard", "wide", "oblique", "double"];
}
