export type DeckShape = "popsicle" | "cruiser" | "longboard" | "old_school" | "mini";
export type WheelDurometer = "78a" | "87a" | "95a" | "99a" | "101a";

export function deckWidth(shoeSize: number): number {
  if (shoeSize < 7) return 7.5;
  if (shoeSize < 9) return 8.0;
  if (shoeSize < 11) return 8.25;
  if (shoeSize < 13) return 8.5;
  return 8.75;
}

export function wheelbase(deckLengthInch: number): number {
  return parseFloat((deckLengthInch * 0.55).toFixed(1));
}

export function truckWidth(deckWidthInch: number): number {
  return parseFloat((deckWidthInch - 0.25).toFixed(2));
}

export function wheelDiameter(ridingStyle: "street" | "park" | "vert" | "cruising"): number {
  const sizes: Record<string, number> = { street: 52, park: 54, vert: 56, cruising: 60 };
  return sizes[ridingStyle];
}

export function wheelContact(diameterMm: number, durometer: WheelDurometer): number {
  const hardness: Record<WheelDurometer, number> = {
    "78a": 0.6, "87a": 0.5, "95a": 0.4, "99a": 0.35, "101a": 0.3,
  };
  return parseFloat((diameterMm * hardness[durometer]).toFixed(1));
}

export function bearingAbec(usage: "casual" | "street" | "downhill"): number {
  const ratings: Record<string, number> = { casual: 5, street: 7, downhill: 9 };
  return ratings[usage];
}

export function speedFromSlope(slopeDeg: number, frictionCoeff: number = 0.02): number {
  const rad = slopeDeg * Math.PI / 180;
  const accel = 9.81 * (Math.sin(rad) - frictionCoeff * Math.cos(rad));
  if (accel <= 0) return 0;
  const speedMs = Math.sqrt(2 * accel * 100);
  return parseFloat((speedMs * 3.6).toFixed(1));
}

export function ollieHeight(popAngleDeg: number, legForceN: number): number {
  const rad = popAngleDeg * Math.PI / 180;
  const vertForce = legForceN * Math.sin(rad);
  const heightM = vertForce / (80 * 9.81) * 0.5;
  return parseFloat((heightM * 100).toFixed(1));
}

export function rampSpeed(rampHeightM: number): number {
  return parseFloat((Math.sqrt(2 * 9.81 * rampHeightM) * 3.6).toFixed(1));
}

export function griptapeFriction(material: "silicon_carbide" | "aluminum_oxide"): number {
  return material === "silicon_carbide" ? 0.85 : 0.75;
}

export function bushingHardness(riderWeightKg: number): string {
  if (riderWeightKg < 55) return "soft (78a-85a)";
  if (riderWeightKg < 80) return "medium (87a-92a)";
  return "hard (93a-100a)";
}

export function riserHeight(wheelDiameterMm: number): number {
  if (wheelDiameterMm <= 54) return 0;
  if (wheelDiameterMm <= 58) return 3;
  return 6;
}

export function setupCost(deckPrice: number, truckPrice: number, wheelPrice: number, bearingPrice: number, griptapePrice: number): number {
  return deckPrice + truckPrice + wheelPrice + bearingPrice + griptapePrice;
}

export function deckShapes(): DeckShape[] {
  return ["popsicle", "cruiser", "longboard", "old_school", "mini"];
}
