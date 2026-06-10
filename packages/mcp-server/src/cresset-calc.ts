export type CressetFuel = "pitch" | "tallow" | "beeswax" | "oil" | "resin";

export function bowlDiameterCm(mountHeightM: number): number {
  return parseFloat((mountHeightM * 8).toFixed(1));
}

export function bowlDepthCm(diameterCm: number): number {
  return parseFloat((diameterCm * 0.5).toFixed(1));
}

export function fuelCapacityMl(diameterCm: number, depthCm: number): number {
  const radiusCm = diameterCm / 2;
  return parseFloat((Math.PI * radiusCm ** 2 * depthCm * 0.7).toFixed(1));
}

export function burnTimeHours(capacityMl: number, fuel: CressetFuel): number {
  const rates: Record<CressetFuel, number> = {
    pitch: 15, tallow: 12, beeswax: 18, oil: 20, resin: 10,
  };
  return parseFloat((capacityMl / rates[fuel]).toFixed(1));
}

export function lightRadiusM(bowlDiameterCm: number, fuel: CressetFuel): number {
  const lumens: Record<CressetFuel, number> = {
    pitch: 3.0, tallow: 2.0, beeswax: 2.5, oil: 2.8, resin: 3.5,
  };
  return parseFloat((bowlDiameterCm / 10 * lumens[fuel]).toFixed(1));
}

export function heatOutputBtu(bowlDiameterCm: number): number {
  return parseFloat((bowlDiameterCm * bowlDiameterCm * 0.8).toFixed(1));
}

export function bracketWeightKg(mountHeightM: number): number {
  return parseFloat((mountHeightM * 3.5).toFixed(1));
}

export function smokeOutputIndex(fuel: CressetFuel): number {
  const smoke: Record<CressetFuel, number> = {
    pitch: 9, tallow: 7, beeswax: 2, oil: 4, resin: 8,
  };
  return smoke[fuel];
}

export function refillCostPerHour(fuel: CressetFuel, baseCost: number): number {
  const rates: Record<CressetFuel, number> = {
    pitch: 0.5, tallow: 0.8, beeswax: 2.5, oil: 1.2, resin: 0.7,
  };
  return parseFloat((rates[fuel] * baseCost).toFixed(2));
}

export function cressetFuels(): CressetFuel[] {
  return ["pitch", "tallow", "beeswax", "oil", "resin"];
}
