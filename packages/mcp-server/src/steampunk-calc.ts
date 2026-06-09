export type GearMaterial = "brass" | "copper" | "steel" | "bronze" | "cast_iron";
export type MotionType = "rotary" | "linear" | "oscillating" | "reciprocating";

export function gearRatio(driverTeeth: number, drivenTeeth: number): number {
  if (driverTeeth <= 0) return 0;
  return parseFloat((drivenTeeth / driverTeeth).toFixed(3));
}

export function outputRpm(inputRpm: number, ratio: number): number {
  if (ratio <= 0) return 0;
  return parseFloat((inputRpm / ratio).toFixed(1));
}

export function torqueMultiplier(ratio: number): number {
  return parseFloat(ratio.toFixed(3));
}

export function gearDiameterMm(teeth: number, moduleMm: number): number {
  return parseFloat((teeth * moduleMm).toFixed(1));
}

export function pipeFlowLpm(diameterMm: number, pressureKpa: number): number {
  if (diameterMm <= 0 || pressureKpa <= 0) return 0;
  const area = Math.PI * (diameterMm / 2000) * (diameterMm / 2000);
  const velocity = Math.sqrt(2 * pressureKpa * 1000 / 1000);
  return parseFloat((area * velocity * 60000).toFixed(1));
}

export function steamPressurePsi(tempC: number): number {
  if (tempC < 100) return 0;
  return parseFloat(((tempC - 100) * 0.5).toFixed(1));
}

export function boilerVolumeLiters(powerWatts: number): number {
  return parseFloat((powerWatts / 500).toFixed(1));
}

export function rivetCount(plateLengthCm: number, spacingCm: number): number {
  if (spacingCm <= 0) return 0;
  return Math.ceil(plateLengthCm / spacingCm) + 1;
}

export function patinaDays(material: GearMaterial): number {
  const days: Record<GearMaterial, number> = {
    brass: 30, copper: 14, steel: 7, bronze: 60, cast_iron: 21,
  };
  return days[material];
}

export function materialDensity(material: GearMaterial): number {
  const g: Record<GearMaterial, number> = {
    brass: 8.5, copper: 8.9, steel: 7.8, bronze: 8.8, cast_iron: 7.2,
  };
  return g[material];
}

export function aestheticScore(gears: number, pipes: number, gauges: number): number {
  return Math.min(10, parseFloat(((gears * 1.5 + pipes + gauges * 2) / 3).toFixed(1)));
}

export function gearMaterials(): GearMaterial[] {
  return ["brass", "copper", "steel", "bronze", "cast_iron"];
}
