export type GlazeType = "gloss" | "matte" | "satin" | "crystalline" | "ash" | "raku";
export type FiringCone = "06" | "6" | "10" | "11" | "12";

export function coneTemp(cone: FiringCone): number {
  const temps: Record<FiringCone, number> = {
    "06": 999, "6": 1222, "10": 1285, "11": 1294, "12": 1306,
  };
  return temps[cone];
}

export function glazeThickness(coats: number, specificGravity: number): number {
  const baseThicknessMm = 0.3;
  return parseFloat((baseThicknessMm * coats * specificGravity).toFixed(2));
}

export function glazeAmount(surfaceAreaCm2: number, coats: number, coverageCm2PerMl: number = 5): number {
  return parseFloat((surfaceAreaCm2 * coats / coverageCm2PerMl).toFixed(0));
}

export function shrinkagePercent(cone: FiringCone): number {
  const shrink: Record<FiringCone, number> = {
    "06": 3, "6": 6, "10": 10, "11": 11, "12": 12,
  };
  return shrink[cone];
}

export function finalSize(greenSizeCm: number, shrinkagePercent: number): number {
  return parseFloat((greenSizeCm * (1 - shrinkagePercent / 100)).toFixed(1));
}

export function firingTime(kilnVolumeLiters: number, cone: FiringCone): number {
  const targetTemp = coneTemp(cone);
  const rampHours = targetTemp / 150;
  const soakHours = cone === "06" ? 0.5 : 1;
  const coolHours = rampHours * 1.5;
  return parseFloat((rampHours + soakHours + coolHours).toFixed(1));
}

export function electricityCost(firingHours: number, kilnKw: number, costPerKwh: number): number {
  return parseFloat((firingHours * kilnKw * costPerKwh).toFixed(2));
}

export function batchCapacity(kilnDiameterCm: number, kilnHeightCm: number, pieceHeightCm: number): number {
  const shelfArea = Math.PI * (kilnDiameterCm / 2) ** 2;
  const shelves = Math.floor(kilnHeightCm / (pieceHeightCm + 3));
  const piecesPerShelf = Math.floor(shelfArea / (pieceHeightCm * pieceHeightCm));
  return piecesPerShelf * shelves;
}

export function dryingDays(thicknessWallCm: number, humidity: number): number {
  const baseDays = thicknessWallCm * 3;
  const humidityFactor = 1 + humidity / 100;
  return Math.ceil(baseDays * humidityFactor);
}

export function silicaFluxRatio(silicaG: number, fluxG: number): number {
  if (fluxG === 0) return 0;
  return parseFloat((silicaG / fluxG).toFixed(2));
}

export function defectRisk(glazeThicknessMm: number, firingCone: FiringCone): string {
  if (glazeThicknessMm > 2) return "high (crawling/running risk)";
  if (glazeThicknessMm < 0.3) return "high (pinholing risk)";
  return "normal";
}

export function glazeTypes(): GlazeType[] {
  return ["gloss", "matte", "satin", "crystalline", "ash", "raku"];
}
