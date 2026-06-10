export type SpringSteel = "blue_steel" | "white_steel" | "nivaflex" | "carbon" | "elgiloy";

export function springLengthMm(barrelDiameterMm: number, turns: number): number {
  return Math.round(barrelDiameterMm * Math.PI * turns);
}

export function thicknessMm(barrelDiameterMm: number): number {
  return parseFloat((barrelDiameterMm * 0.02).toFixed(2));
}

export function widthMm(barrelHeightMm: number): number {
  return parseFloat((barrelHeightMm * 0.75).toFixed(1));
}

export function powerReserveHours(turns: number, beatsPerHour: number): number {
  if (beatsPerHour <= 0) return 0;
  return parseFloat((turns * 3600 / beatsPerHour).toFixed(1));
}

export function torqueNmm(steel: SpringSteel, thicknessMm: number, widthMm: number): number {
  const factor: Record<SpringSteel, number> = {
    blue_steel: 2000, white_steel: 2200, nivaflex: 2500, carbon: 1800, elgiloy: 2400,
  };
  return parseFloat((factor[steel] * thicknessMm * thicknessMm * widthMm / 6).toFixed(1));
}

export function fatigueLifeCycles(steel: SpringSteel): number {
  const cycles: Record<SpringSteel, number> = {
    blue_steel: 50000, white_steel: 60000, nivaflex: 200000, carbon: 30000, elgiloy: 150000,
  };
  return cycles[steel];
}

export function corrosionResistance(steel: SpringSteel): number {
  const ratings: Record<SpringSteel, number> = {
    blue_steel: 2, white_steel: 2, nivaflex: 5, carbon: 1, elgiloy: 5,
  };
  return ratings[steel];
}

export function windingClickCount(turns: number): number {
  return turns * 2;
}

export function costEstimate(steel: SpringSteel): number {
  const costs: Record<SpringSteel, number> = {
    blue_steel: 15, white_steel: 18, nivaflex: 45, carbon: 8, elgiloy: 40,
  };
  return costs[steel];
}

export function springSteels(): SpringSteel[] {
  return ["blue_steel", "white_steel", "nivaflex", "carbon", "elgiloy"];
}
