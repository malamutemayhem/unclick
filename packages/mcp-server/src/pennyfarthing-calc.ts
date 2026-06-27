export type FrameMaterial = "steel" | "wrought_iron" | "wood" | "aluminum";

export function gearRatio(frontDiameter: number, rearDiameter: number): number {
  if (rearDiameter <= 0) return 0;
  return parseFloat((frontDiameter / rearDiameter).toFixed(2));
}

export function speedKmh(wheelDiameterM: number, cadenceRpm: number): number {
  return parseFloat((Math.PI * wheelDiameterM * cadenceRpm * 60 / 1000).toFixed(1));
}

export function wheelCircumference(diameterInch: number): number {
  return parseFloat((Math.PI * diameterInch * 2.54).toFixed(1));
}

export function seatHeight(wheelDiameterInch: number): number {
  return parseFloat((wheelDiameterInch * 2.54 + 10).toFixed(0));
}

export function spokeCount(wheelDiameter: number): number {
  if (wheelDiameter < 40) return 20;
  if (wheelDiameter < 50) return 36;
  return 48;
}

export function spokeLength(hubRadius: number, rimRadius: number): number {
  return parseFloat((rimRadius - hubRadius).toFixed(1));
}

export function headerRisk(speedKmh: number, gradientPercent: number): string {
  const risk = speedKmh * (1 + gradientPercent / 10);
  if (risk < 15) return "low";
  if (risk < 30) return "moderate";
  return "high";
}

export function mountingStep(seatHeightCm: number): number {
  return parseFloat((seatHeightCm * 0.4).toFixed(0));
}

export function weightKg(material: FrameMaterial, wheelDiameter: number): number {
  const base: Record<FrameMaterial, number> = {
    steel: 15, wrought_iron: 18, wood: 12, aluminum: 10,
  };
  return parseFloat((base[material] + wheelDiameter * 0.1).toFixed(1));
}

export function brakingDistance(speedKmh: number, friction: number): number {
  if (friction <= 0) return 0;
  const speedMs = speedKmh / 3.6;
  return parseFloat((speedMs * speedMs / (2 * friction * 9.81)).toFixed(1));
}

export function frameMaterials(): FrameMaterial[] {
  return ["steel", "wrought_iron", "wood", "aluminum"];
}
