export type BridgeType = "bascule" | "vertical_lift" | "swing" | "drawbridge" | "transporter";

export function spanLength(bankWidth: number, clearance: number): number {
  return parseFloat((bankWidth + clearance * 2).toFixed(1));
}

export function counterweightTonnes(deckWeight: number, armRatio: number): number {
  if (armRatio <= 0) return 0;
  return parseFloat((deckWeight / armRatio).toFixed(1));
}

export function openingAngle(type: BridgeType): number {
  const angles: Record<BridgeType, number> = {
    bascule: 70, vertical_lift: 90, swing: 90, drawbridge: 80, transporter: 0,
  };
  return angles[type];
}

export function openingTimeS(spanM: number, speedDegPerS: number): number {
  if (speedDegPerS <= 0) return 0;
  return parseFloat(((spanM / 10) * (70 / speedDegPerS)).toFixed(1));
}

export function clearanceHeight(liftM: number, tideM: number): number {
  return parseFloat((liftM - tideM).toFixed(1));
}

export function chainLength(spanM: number, towerHeight: number): number {
  return parseFloat((Math.sqrt(spanM * spanM + towerHeight * towerHeight) * 1.05).toFixed(1));
}

export function hydraulicPressureBar(forceTonnes: number, cylinderAreaCm2: number): number {
  if (cylinderAreaCm2 <= 0) return 0;
  return parseFloat(((forceTonnes * 9810) / cylinderAreaCm2).toFixed(1));
}

export function maintenanceCost(ageYears: number, spanM: number): number {
  return parseFloat((spanM * 500 * (1 + ageYears * 0.03)).toFixed(0));
}

export function vesselClearance(mastHeight: number, bridgeHeight: number): number {
  return parseFloat((bridgeHeight - mastHeight).toFixed(1));
}

export function signalWarningS(openTimeS: number): number {
  return parseFloat((openTimeS + 30).toFixed(0));
}

export function bridgeTypes(): BridgeType[] {
  return ["bascule", "vertical_lift", "swing", "drawbridge", "transporter"];
}
