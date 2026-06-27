export type BellowsType = "fireplace" | "forge" | "organ" | "accordion" | "blast_furnace";
export type Material = "leather" | "canvas" | "rubber" | "synthetic";

export function volumeLiters(type: BellowsType): number {
  const vol: Record<BellowsType, number> = {
    fireplace: 3, forge: 15, organ: 50, accordion: 2, blast_furnace: 500,
  };
  return vol[type];
}

export function airflowLpm(volumeL: number, cyclesPerMin: number): number {
  return parseFloat((volumeL * cyclesPerMin * 0.7).toFixed(1));
}

export function pressureKpa(type: BellowsType): number {
  const kpa: Record<BellowsType, number> = {
    fireplace: 0.5, forge: 3, organ: 1.5, accordion: 2, blast_furnace: 20,
  };
  return kpa[type];
}

export function plateArea(volumeL: number, strokeCm: number): number {
  if (strokeCm <= 0) return 0;
  return parseFloat((volumeL * 1000 / strokeCm).toFixed(1));
}

export function hingeAngle(strokeCm: number, plateLengthCm: number): number {
  if (plateLengthCm <= 0) return 0;
  const rad = Math.asin(Math.min(1, strokeCm / (2 * plateLengthCm)));
  return parseFloat((2 * rad * 180 / Math.PI).toFixed(1));
}

export function nozzleDiameter(flowLpm: number): number {
  return parseFloat((Math.sqrt(flowLpm / 50) * 10).toFixed(1));
}

export function leatherArea(plateLengthCm: number, plateWidthCm: number, folds: number): number {
  const perimeter = 2 * (plateLengthCm + plateWidthCm);
  return parseFloat((perimeter * folds * 3).toFixed(0));
}

export function foldCount(type: BellowsType): number {
  const folds: Record<BellowsType, number> = {
    fireplace: 1, forge: 1, organ: 6, accordion: 12, blast_furnace: 1,
  };
  return folds[type];
}

export function handleForceN(pressureKpa: number, areaM2: number): number {
  return parseFloat((pressureKpa * 1000 * areaM2).toFixed(1));
}

export function valveSize(nozzleDiameterMm: number): number {
  return parseFloat((nozzleDiameterMm * 1.5).toFixed(1));
}

export function lifespan(material: Material): number {
  const years: Record<Material, number> = {
    leather: 15, canvas: 8, rubber: 10, synthetic: 20,
  };
  return years[material];
}

export function bellowsTypes(): BellowsType[] {
  return ["fireplace", "forge", "organ", "accordion", "blast_furnace"];
}
