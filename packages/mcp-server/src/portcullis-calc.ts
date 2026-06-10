export type GateMethod = "winch" | "counterweight" | "hydraulic" | "manual";

export function grillWeight(widthM: number, heightM: number, barDiameterCm: number): number {
  const bars = Math.ceil(widthM / 0.15) + Math.ceil(heightM / 0.15);
  const lengthPerBar = (widthM + heightM) / 2;
  const volumePerBar = Math.PI * Math.pow(barDiameterCm / 200, 2) * lengthPerBar;
  return parseFloat((bars * volumePerBar * 7800).toFixed(0));
}

export function liftForceN(weightKg: number, friction: number): number {
  return parseFloat((weightKg * 9.81 * (1 + friction)).toFixed(0));
}

export function chainStrength(weightKg: number, safetyFactor: number): number {
  return parseFloat((weightKg * 9.81 * safetyFactor).toFixed(0));
}

export function liftTimeS(heightM: number, speedMPerS: number): number {
  if (speedMPerS <= 0) return 0;
  return parseFloat((heightM / speedMPerS).toFixed(1));
}

export function counterweightKg(gateWeightKg: number, efficiency: number): number {
  if (efficiency <= 0) return 0;
  return parseFloat((gateWeightKg / efficiency).toFixed(0));
}

export function grooveDepthCm(barDiameterCm: number): number {
  return parseFloat((barDiameterCm * 1.5).toFixed(1));
}

export function murderHoleCount(gatewayLength: number, spacing: number): number {
  if (spacing <= 0) return 0;
  return Math.floor(gatewayLength / spacing);
}

export function winchTurns(heightM: number, drumDiameterCm: number): number {
  if (drumDiameterCm <= 0) return 0;
  const circumference = Math.PI * drumDiameterCm / 100;
  return Math.ceil(heightM / circumference);
}

export function dropTimeS(heightM: number): number {
  return parseFloat(Math.sqrt((2 * heightM) / 9.81).toFixed(2));
}

export function gateMethods(): GateMethod[] {
  return ["winch", "counterweight", "hydraulic", "manual"];
}
