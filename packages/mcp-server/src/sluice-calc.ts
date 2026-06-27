export type GateType = "slide" | "radial" | "drum" | "flap" | "needle";

export function gateArea(widthM: number, heightM: number): number {
  return parseFloat((widthM * heightM).toFixed(2));
}

export function flowRate(gateAreaM2: number, headM: number, coefficient: number): number {
  return parseFloat((coefficient * gateAreaM2 * Math.sqrt(2 * 9.81 * headM)).toFixed(3));
}

export function headLoss(velocityMs: number, coefficient: number): number {
  return parseFloat((coefficient * velocityMs * velocityMs / (2 * 9.81)).toFixed(3));
}

export function liftForceKn(gateAreaM2: number, headM: number): number {
  return parseFloat((9.81 * gateAreaM2 * headM).toFixed(1));
}

export function screwTurns(liftHeightM: number, pitchMm: number): number {
  if (pitchMm <= 0) return 0;
  return Math.ceil((liftHeightM * 1000) / pitchMm);
}

export function sealPressureKpa(headM: number): number {
  return parseFloat((9.81 * headM).toFixed(1));
}

export function channelVelocity(flowM3s: number, channelAreaM2: number): number {
  if (channelAreaM2 <= 0) return 0;
  return parseFloat((flowM3s / channelAreaM2).toFixed(3));
}

export function sedimentTrap(flowRate: number, settleFactor: number): number {
  return parseFloat((flowRate * settleFactor * 100).toFixed(0));
}

export function fishLadderSteps(heightDiffM: number, stepRiseM: number): number {
  if (stepRiseM <= 0) return 0;
  return Math.ceil(heightDiffM / stepRiseM);
}

export function gateTypes(): GateType[] {
  return ["slide", "radial", "drum", "flap", "needle"];
}
