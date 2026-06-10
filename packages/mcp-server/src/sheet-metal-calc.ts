export type MetalType = "copper" | "brass" | "aluminum" | "mild_steel" | "stainless";

export function densityKgPerM3(metal: MetalType): number {
  const density: Record<MetalType, number> = {
    copper: 8960, brass: 8530, aluminum: 2700, mild_steel: 7850, stainless: 8000,
  };
  return density[metal];
}

export function sheetWeightKg(lengthM: number, widthM: number, thicknessMm: number, metal: MetalType): number {
  return Math.round(lengthM * widthM * (thicknessMm / 1000) * densityKgPerM3(metal) * 100) / 100;
}

export function minBendRadiusTimesThickness(metal: MetalType): number {
  const mult: Record<MetalType, number> = {
    copper: 0.5, brass: 1, aluminum: 1, mild_steel: 1.5, stainless: 2,
  };
  return mult[metal];
}

export function annealingTempCelsius(metal: MetalType): number {
  const temps: Record<MetalType, number> = {
    copper: 500, brass: 600, aluminum: 345, mild_steel: 720, stainless: 1050,
  };
  return temps[metal];
}

export function workHardeningRate(metal: MetalType): number {
  const rate: Record<MetalType, number> = {
    copper: 3, brass: 4, aluminum: 2, mild_steel: 3, stainless: 5,
  };
  return rate[metal];
}

export function solderability(metal: MetalType): number {
  const solder: Record<MetalType, number> = {
    copper: 5, brass: 5, aluminum: 1, mild_steel: 3, stainless: 2,
  };
  return solder[metal];
}

export function corrosionResistance(metal: MetalType): number {
  const resist: Record<MetalType, number> = {
    copper: 4, brass: 3, aluminum: 4, mild_steel: 1, stainless: 5,
  };
  return resist[metal];
}

export function machinability(metal: MetalType): number {
  const mach: Record<MetalType, number> = {
    copper: 3, brass: 5, aluminum: 5, mild_steel: 4, stainless: 2,
  };
  return mach[metal];
}

export function costPerKg(metal: MetalType): number {
  const costs: Record<MetalType, number> = {
    copper: 8, brass: 6, aluminum: 3, mild_steel: 1, stainless: 4,
  };
  return costs[metal];
}

export function metalTypes(): MetalType[] {
  return ["copper", "brass", "aluminum", "mild_steel", "stainless"];
}
