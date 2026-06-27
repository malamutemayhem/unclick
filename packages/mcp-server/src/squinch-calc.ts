export type SquinchType = "arch" | "corbelled" | "conical" | "muqarnas" | "trompe";

export function spanCm(cornerDiagonalCm: number): number {
  return parseFloat((cornerDiagonalCm * 0.707).toFixed(1));
}

export function riseCm(spanCm: number, type: SquinchType): number {
  const ratios: Record<SquinchType, number> = {
    arch: 0.5, corbelled: 0.4, conical: 0.6, muqarnas: 0.7, trompe: 0.55,
  };
  return parseFloat((spanCm * ratios[type]).toFixed(1));
}

export function depthCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.8).toFixed(1));
}

export function corbelCourses(riseCm: number, courseHeightCm: number): number {
  if (courseHeightCm <= 0) return 0;
  return Math.ceil(riseCm / courseHeightCm);
}

export function stoneVolumeCm3(spanCm: number, riseCm: number, depthCm: number): number {
  return parseFloat((spanCm * riseCm * depthCm * 0.4).toFixed(0));
}

export function weightKg(volumeCm3: number, densityGPerCm3: number): number {
  return parseFloat((volumeCm3 * densityGPerCm3 / 1000).toFixed(1));
}

export function muqarnasTiers(riseCm: number): number {
  return Math.max(1, Math.floor(riseCm / 8));
}

export function loadCapacityKn(spanCm: number, depthCm: number): number {
  return parseFloat((spanCm * depthCm * 0.002).toFixed(1));
}

export function carvingHours(type: SquinchType, spanCm: number): number {
  const hoursPerCm: Record<SquinchType, number> = {
    arch: 0.2, corbelled: 0.15, conical: 0.3, muqarnas: 0.8, trompe: 0.25,
  };
  return parseFloat((spanCm * hoursPerCm[type]).toFixed(1));
}

export function transitionAngle(squareWidthCm: number, circleDiameterCm: number): number {
  if (circleDiameterCm <= 0) return 0;
  return parseFloat((Math.atan(squareWidthCm / circleDiameterCm) * 180 / Math.PI).toFixed(1));
}

export function squinchTypes(): SquinchType[] {
  return ["arch", "corbelled", "conical", "muqarnas", "trompe"];
}
