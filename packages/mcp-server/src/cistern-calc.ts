export type CisternShape = "rectangular" | "cylindrical" | "conical" | "dome";
export type Material = "stone" | "brick" | "concrete" | "ferrocement" | "polyethylene";

export function volumeLiters(shape: CisternShape, dim1Cm: number, dim2Cm: number, dim3Cm: number): number {
  let cc = 0;
  if (shape === "rectangular") cc = dim1Cm * dim2Cm * dim3Cm;
  else if (shape === "cylindrical") cc = Math.PI * Math.pow(dim1Cm / 2, 2) * dim2Cm;
  else if (shape === "conical") cc = (Math.PI * Math.pow(dim1Cm / 2, 2) * dim2Cm) / 3;
  else cc = (2 / 3) * Math.PI * Math.pow(dim1Cm / 2, 2) * dim2Cm;
  return parseFloat((cc / 1000).toFixed(1));
}

export function catchmentArea(rainfallMm: number, targetLiters: number): number {
  if (rainfallMm <= 0) return 0;
  return parseFloat((targetLiters / (rainfallMm * 0.8) * 1000).toFixed(1));
}

export function fillTime(volumeL: number, flowLpm: number): number {
  if (flowLpm <= 0) return 0;
  return parseFloat((volumeL / flowLpm).toFixed(1));
}

export function waterPressureKpa(depthM: number): number {
  return parseFloat((depthM * 9.81).toFixed(2));
}

export function wallThickness(depthM: number, material: Material): number {
  const base: Record<Material, number> = {
    stone: 30, brick: 20, concrete: 15, ferrocement: 5, polyethylene: 3,
  };
  return parseFloat((base[material] + depthM * 5).toFixed(0));
}

export function evaporationLoss(surfaceAreaM2: number, tempC: number): number {
  const rate = tempC > 30 ? 8 : tempC > 20 ? 5 : 3;
  return parseFloat((surfaceAreaM2 * rate / 1000).toFixed(2));
}

export function daysOfSupply(volumeL: number, dailyUsageL: number): number {
  if (dailyUsageL <= 0) return Infinity;
  return Math.floor(volumeL / dailyUsageL);
}

export function overflowPipe(maxFlowLpm: number): number {
  return parseFloat((Math.sqrt(maxFlowLpm / 10) * 25).toFixed(0));
}

export function sedimentTrap(volumeL: number): number {
  return parseFloat((volumeL * 0.05).toFixed(1));
}

export function materialCost(material: Material): number {
  const perL: Record<Material, number> = {
    stone: 0.5, brick: 0.35, concrete: 0.25, ferrocement: 0.15, polyethylene: 0.4,
  };
  return perL[material];
}

export function cisternShapes(): CisternShape[] {
  return ["rectangular", "cylindrical", "conical", "dome"];
}
