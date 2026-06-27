export type PiscinaShape = "round" | "quatrefoil" | "trefoil" | "pointed" | "rectangular";

export function basinDiameterCm(nicheWidthCm: number): number {
  return parseFloat((nicheWidthCm * 0.6).toFixed(1));
}

export function basinDepthCm(diameterCm: number): number {
  return parseFloat((diameterCm * 0.4).toFixed(1));
}

export function basinVolumeMl(diameterCm: number, depthCm: number, shape: PiscinaShape): number {
  const radiusCm = diameterCm / 2;
  let area: number;
  if (shape === "rectangular") {
    area = diameterCm * diameterCm * 0.8;
  } else {
    area = Math.PI * radiusCm ** 2;
  }
  return parseFloat((area * depthCm).toFixed(1));
}

export function drainDiameterCm(basinDiameterCm: number): number {
  return parseFloat((basinDiameterCm * 0.1).toFixed(1));
}

export function nicheHeightCm(nicheWidthCm: number): number {
  return parseFloat((nicheWidthCm * 1.8).toFixed(1));
}

export function shelfWidthCm(nicheWidthCm: number): number {
  return parseFloat((nicheWidthCm * 0.15).toFixed(1));
}

export function carvingHours(shape: PiscinaShape): number {
  const hours: Record<PiscinaShape, number> = {
    round: 8, quatrefoil: 18, trefoil: 15, pointed: 10, rectangular: 6,
  };
  return hours[shape];
}

export function stoneWeightKg(nicheWidthCm: number, nicheHeightCm: number, depthCm: number): number {
  const volumeCm3 = nicheWidthCm * nicheHeightCm * depthCm * 0.4;
  return parseFloat((volumeCm3 * 2.5 / 1000).toFixed(1));
}

export function consecrationRequired(): boolean {
  return true;
}

export function restorationCost(shape: PiscinaShape, baseCost: number): number {
  const multipliers: Record<PiscinaShape, number> = {
    round: 1.0, quatrefoil: 2.2, trefoil: 1.8, pointed: 1.3, rectangular: 0.8,
  };
  return parseFloat((baseCost * multipliers[shape]).toFixed(2));
}

export function piscinaShapes(): PiscinaShape[] {
  return ["round", "quatrefoil", "trefoil", "pointed", "rectangular"];
}
