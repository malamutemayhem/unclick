export type MushroomType = "oyster" | "shiitake" | "lions_mane" | "reishi" | "maitake" | "enoki";
export type SubstrateType = "hardwood" | "straw" | "sawdust" | "coffee_grounds" | "grain";

export function substrateWeight(containerLiters: number, type: SubstrateType): number {
  const densityKgPerL: Record<SubstrateType, number> = {
    hardwood: 0.45,
    straw: 0.15,
    sawdust: 0.35,
    coffee_grounds: 0.55,
    grain: 0.65,
  };
  return parseFloat((containerLiters * densityKgPerL[type]).toFixed(1));
}

export function spawnRate(substrateKg: number, percent: number = 10): number {
  return parseFloat((substrateKg * percent / 100).toFixed(2));
}

export function moistureContent(dryWeightG: number, wetWeightG: number): number {
  if (wetWeightG === 0) return 0;
  return parseFloat(((wetWeightG - dryWeightG) / wetWeightG * 100).toFixed(1));
}

export function idealMoisture(type: SubstrateType): number {
  const moisture: Record<SubstrateType, number> = {
    hardwood: 60,
    straw: 70,
    sawdust: 55,
    coffee_grounds: 65,
    grain: 50,
  };
  return moisture[type];
}

export function colonizationDays(mushroom: MushroomType): { min: number; max: number } {
  const days: Record<MushroomType, { min: number; max: number }> = {
    oyster: { min: 10, max: 21 },
    shiitake: { min: 60, max: 120 },
    lions_mane: { min: 14, max: 28 },
    reishi: { min: 30, max: 60 },
    maitake: { min: 30, max: 60 },
    enoki: { min: 12, max: 21 },
  };
  return days[mushroom];
}

export function fruitingTemp(mushroom: MushroomType): { minC: number; maxC: number; idealC: number } {
  const temps: Record<MushroomType, { minC: number; maxC: number; idealC: number }> = {
    oyster: { minC: 15, maxC: 25, idealC: 20 },
    shiitake: { minC: 10, maxC: 20, idealC: 15 },
    lions_mane: { minC: 15, maxC: 22, idealC: 18 },
    reishi: { minC: 20, maxC: 30, idealC: 25 },
    maitake: { minC: 10, maxC: 18, idealC: 14 },
    enoki: { minC: 5, maxC: 12, idealC: 8 },
  };
  return temps[mushroom];
}

export function fruitingHumidity(mushroom: MushroomType): number {
  const humidity: Record<MushroomType, number> = {
    oyster: 85,
    shiitake: 80,
    lions_mane: 90,
    reishi: 85,
    maitake: 85,
    enoki: 90,
  };
  return humidity[mushroom];
}

export function expectedYield(substrateKg: number, mushroom: MushroomType): number {
  const efficiency: Record<MushroomType, number> = {
    oyster: 100,
    shiitake: 75,
    lions_mane: 60,
    reishi: 30,
    maitake: 50,
    enoki: 80,
  };
  return parseFloat((substrateKg * efficiency[mushroom] / 100).toFixed(2));
}

export function flushCount(mushroom: MushroomType): number {
  const flushes: Record<MushroomType, number> = {
    oyster: 3,
    shiitake: 4,
    lions_mane: 2,
    reishi: 1,
    maitake: 2,
    enoki: 2,
  };
  return flushes[mushroom];
}

export function harvestWindow(mushroom: MushroomType): number {
  const days: Record<MushroomType, number> = {
    oyster: 5,
    shiitake: 7,
    lions_mane: 7,
    reishi: 14,
    maitake: 10,
    enoki: 5,
  };
  return days[mushroom];
}

export function sterilizationTime(substrateKg: number, method: "pressure" | "steam" | "cold_water"): number {
  const minutesPerKg: Record<string, number> = { pressure: 15, steam: 45, cold_water: 1440 };
  return Math.round(substrateKg * minutesPerKg[method]);
}

export function costPerKg(substrateCost: number, spawnCost: number, yieldKg: number): number {
  if (yieldKg <= 0) return 0;
  return parseFloat(((substrateCost + spawnCost) / yieldKg).toFixed(2));
}

export function mushroomTypes(): MushroomType[] {
  return ["oyster", "shiitake", "lions_mane", "reishi", "maitake", "enoki"];
}
