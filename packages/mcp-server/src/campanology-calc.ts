export type BellMetal = "bronze" | "cast_iron" | "steel" | "brass";

export function bellWeight(diameterCm: number): number {
  return parseFloat((Math.pow(diameterCm / 30, 3) * 100).toFixed(0));
}

export function frequency(diameterCm: number, thicknessCm: number): number {
  if (diameterCm <= 0) return 0;
  return parseFloat((15000 * thicknessCm / (diameterCm * diameterCm)).toFixed(1));
}

export function clapperWeight(bellWeightKg: number): number {
  return parseFloat((bellWeightKg * 0.04).toFixed(1));
}

export function swingAngle(fullCircle: boolean): number {
  return fullCircle ? 360 : 180;
}

export function stayLength(wheelDiameter: number): number {
  return parseFloat((wheelDiameter * 0.9).toFixed(1));
}

export function ropeLength(towerHeight: number, wheelDiam: number): number {
  return parseFloat((towerHeight + wheelDiam * Math.PI / 2).toFixed(1));
}

export function changesCount(bells: number): number {
  let result = 1;
  for (let i = 2; i <= bells; i++) {
    result *= i;
  }
  return result;
}

export function ringDuration(changes: number, strikeInterval: number): number {
  return parseFloat(((changes * strikeInterval) / 60).toFixed(1));
}

export function partials(fundamental: number): number[] {
  return [
    fundamental,
    parseFloat((fundamental * 2).toFixed(1)),
    parseFloat((fundamental * 2.5).toFixed(1)),
    parseFloat((fundamental * 3).toFixed(1)),
    parseFloat((fundamental * 4).toFixed(1)),
  ];
}

export function metalDensity(metal: BellMetal): number {
  const densities: Record<BellMetal, number> = {
    bronze: 8800, cast_iron: 7200, steel: 7800, brass: 8500,
  };
  return densities[metal];
}

export function bellMetals(): BellMetal[] {
  return ["bronze", "cast_iron", "steel", "brass"];
}
