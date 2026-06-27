export type CruckType = "base" | "full" | "upper" | "raised" | "jointed";

export function bladeLength(groundToRidgeM: number): number {
  return parseFloat((groundToRidgeM * 1.15).toFixed(1));
}

export function bladeThicknessCm(spanM: number): number {
  return parseFloat((spanM * 3.5).toFixed(1));
}

export function pairCount(buildingLengthM: number, spacingM: number): number {
  if (spacingM <= 0) return 0;
  return Math.ceil(buildingLengthM / spacingM) + 1;
}

export function spanM(bladeAngleDeg: number, bladeLengthM: number): number {
  const rad = bladeAngleDeg * Math.PI / 180;
  return parseFloat((2 * bladeLengthM * Math.sin(rad / 2)).toFixed(1));
}

export function tieBeamPosition(bladeLengthM: number): number {
  return parseFloat((bladeLengthM * 0.45).toFixed(1));
}

export function timberVolumeM3(bladeLength: number, thicknessCm: number, widthCm: number, pairCount: number): number {
  return parseFloat((bladeLength * thicknessCm / 100 * widthCm / 100 * 2 * pairCount).toFixed(2));
}

export function naturalCurveRequired(type: CruckType): boolean {
  return type === "base" || type === "full";
}

export function treeAgeYears(thicknessCm: number): number {
  return Math.ceil(thicknessCm * 2.5);
}

export function assemblyDays(pairCount: number, crewSize: number): number {
  if (crewSize <= 0) return 0;
  return Math.ceil(pairCount * 3 / crewSize);
}

export function loadCapacityKn(thicknessCm: number, widthCm: number): number {
  return parseFloat((thicknessCm * widthCm * 0.05).toFixed(1));
}

export function cruckTypes(): CruckType[] {
  return ["base", "full", "upper", "raised", "jointed"];
}
