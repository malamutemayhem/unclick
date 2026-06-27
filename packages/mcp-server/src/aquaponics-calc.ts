export type FishType = "tilapia" | "trout" | "catfish" | "goldfish" | "koi" | "barramundi";
export type PlantType = "lettuce" | "basil" | "tomato" | "strawberry" | "cucumber" | "pepper";

export function tankVolume(lengthCm: number, widthCm: number, heightCm: number): number {
  return parseFloat((lengthCm * widthCm * heightCm / 1000).toFixed(1));
}

export function fishCapacity(tankLiters: number, fishType: FishType): number {
  const litersPerFish: Record<FishType, number> = {
    tilapia: 20,
    trout: 40,
    catfish: 30,
    goldfish: 10,
    koi: 50,
    barramundi: 60,
  };
  return Math.floor(tankLiters / litersPerFish[fishType]);
}

export function growBedArea(fishCount: number): number {
  return parseFloat((fishCount * 0.1).toFixed(1));
}

export function plantCapacity(growBedM2: number, plantType: PlantType): number {
  const plantsPerM2: Record<PlantType, number> = {
    lettuce: 16,
    basil: 12,
    tomato: 4,
    strawberry: 9,
    cucumber: 3,
    pepper: 6,
  };
  return Math.floor(growBedM2 * plantsPerM2[plantType]);
}

export function feedRate(fishCount: number, avgWeightG: number): number {
  return parseFloat((fishCount * avgWeightG * 0.02).toFixed(1));
}

export function waterTemp(fishType: FishType): { minC: number; maxC: number; idealC: number } {
  const temps: Record<FishType, { minC: number; maxC: number; idealC: number }> = {
    tilapia: { minC: 22, maxC: 32, idealC: 28 },
    trout: { minC: 10, maxC: 18, idealC: 14 },
    catfish: { minC: 20, maxC: 30, idealC: 26 },
    goldfish: { minC: 10, maxC: 24, idealC: 18 },
    koi: { minC: 12, maxC: 26, idealC: 20 },
    barramundi: { minC: 24, maxC: 32, idealC: 28 },
  };
  return temps[fishType];
}

export function phRange(): { min: number; max: number; ideal: number } {
  return { min: 6.8, max: 7.2, ideal: 7.0 };
}

export function pumpFlowRate(tankLiters: number, turnoversPerHour: number = 1): number {
  return parseFloat((tankLiters * turnoversPerHour / 60).toFixed(1));
}

export function aerationNeeded(tankLiters: number): number {
  return parseFloat((tankLiters * 0.01).toFixed(1));
}

export function nitrogenCycle(weekNumber: number): string {
  if (weekNumber <= 2) return "ammonia spike";
  if (weekNumber <= 4) return "nitrite spike";
  if (weekNumber <= 6) return "nitrate rising";
  return "cycled";
}

export function harvestTime(plantType: PlantType): number {
  const weeks: Record<PlantType, number> = {
    lettuce: 4,
    basil: 3,
    tomato: 12,
    strawberry: 8,
    cucumber: 8,
    pepper: 10,
  };
  return weeks[plantType];
}

export function electricityCost(pumpWatts: number, hoursPerDay: number, ratePerKwh: number): number {
  return parseFloat((pumpWatts / 1000 * hoursPerDay * 30 * ratePerKwh).toFixed(2));
}

export function waterUsage(tankLiters: number, evaporationPercent: number = 2): number {
  return parseFloat((tankLiters * evaporationPercent / 100).toFixed(1));
}

export function fishTypes(): FishType[] {
  return ["tilapia", "trout", "catfish", "goldfish", "koi", "barramundi"];
}

export function plantTypes(): PlantType[] {
  return ["lettuce", "basil", "tomato", "strawberry", "cucumber", "pepper"];
}
