export type FluidType = "water" | "oil" | "glycol" | "hydraulic_fluid";

export function pascalPressure(forceN: number, areaM2: number): number {
  if (areaM2 <= 0) return 0;
  return parseFloat((forceN / areaM2).toFixed(2));
}

export function forceMultiplier(inputArea: number, outputArea: number): number {
  if (inputArea <= 0) return 0;
  return parseFloat((outputArea / inputArea).toFixed(2));
}

export function outputForce(inputForceN: number, multiplier: number): number {
  return parseFloat((inputForceN * multiplier).toFixed(1));
}

export function flowRate(velocityMs: number, areaM2: number): number {
  return parseFloat((velocityMs * areaM2 * 1000).toFixed(3));
}

export function reynoldsNumber(velocity: number, diameter: number, viscosity: number): number {
  if (viscosity <= 0) return 0;
  return parseFloat((velocity * diameter / viscosity).toFixed(0));
}

export function isLaminar(reynolds: number): boolean {
  return reynolds < 2300;
}

export function pressureDrop(length: number, diameter: number, velocity: number, friction: number): number {
  if (diameter <= 0) return 0;
  return parseFloat((friction * (length / diameter) * 0.5 * 1000 * velocity * velocity).toFixed(1));
}

export function cylinderForce(pressurePa: number, boreDiameterM: number): number {
  const area = Math.PI * Math.pow(boreDiameterM / 2, 2);
  return parseFloat((pressurePa * area).toFixed(1));
}

export function pumpPowerW(flowLpm: number, pressureBar: number): number {
  return parseFloat((flowLpm * pressureBar / 600).toFixed(2));
}

export function fluidDensity(fluid: FluidType): number {
  const kg: Record<FluidType, number> = {
    water: 1000, oil: 870, glycol: 1113, hydraulic_fluid: 860,
  };
  return kg[fluid];
}

export function viscosity(fluid: FluidType): number {
  const cst: Record<FluidType, number> = {
    water: 1, oil: 68, glycol: 15, hydraulic_fluid: 46,
  };
  return cst[fluid];
}

export function fluidTypes(): FluidType[] {
  return ["water", "oil", "glycol", "hydraulic_fluid"];
}
