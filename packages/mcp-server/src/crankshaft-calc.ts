export type ShaftMaterial = "cast_iron" | "forged_steel" | "billet" | "nodular_iron";

export function strokeLength(crankRadiusMm: number): number {
  return crankRadiusMm * 2;
}

export function crankAngle(cylinderNumber: number, totalCylinders: number): number {
  if (totalCylinders <= 0) return 0;
  return parseFloat(((cylinderNumber - 1) * 720 / totalCylinders).toFixed(1));
}

export function journalDiameter(torqueNm: number, material: ShaftMaterial): number {
  const strength: Record<ShaftMaterial, number> = { cast_iron: 200, forged_steel: 400, billet: 500, nodular_iron: 300 };
  return parseFloat(Math.pow(16 * torqueNm / (Math.PI * strength[material]), 1 / 3).toFixed(1));
}

export function bearingLoad(rpm: number, crankRadiusMm: number, recipMassKg: number): number {
  const omega = rpm * 2 * Math.PI / 60;
  return parseFloat((recipMassKg * omega * omega * crankRadiusMm / 1000).toFixed(0));
}

export function counterweightMass(crankMassKg: number, crankRadiusMm: number, cwRadiusMm: number): number {
  if (cwRadiusMm <= 0) return 0;
  return parseFloat((crankMassKg * crankRadiusMm / cwRadiusMm).toFixed(2));
}

export function torsionalVibrationHz(shaftLengthMm: number, shaftDiameterMm: number): number {
  if (shaftLengthMm <= 0) return 0;
  return parseFloat((shaftDiameterMm * 50 / shaftLengthMm).toFixed(1));
}

export function oilFlowLpm(journalCount: number, rpm: number): number {
  return parseFloat((journalCount * rpm * 0.0001 + 0.5).toFixed(2));
}

export function firingOrder(cylinders: number): number[] {
  if (cylinders === 4) return [1, 3, 4, 2];
  if (cylinders === 6) return [1, 5, 3, 6, 2, 4];
  if (cylinders === 8) return [1, 8, 4, 3, 6, 5, 7, 2];
  return Array.from({ length: cylinders }, (_, i) => i + 1);
}

export function balanceFactor(counterweightPercent: number): string {
  if (counterweightPercent >= 90) return "fully_balanced";
  if (counterweightPercent >= 50) return "partially_balanced";
  return "unbalanced";
}

export function shaftMaterials(): ShaftMaterial[] {
  return ["cast_iron", "forged_steel", "billet", "nodular_iron"];
}
