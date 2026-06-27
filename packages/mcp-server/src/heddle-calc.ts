export type HeddleType = "wire" | "string" | "flat_steel" | "inserted_eye" | "texsolv";

export function eyeSizeMm(yarnDiameterMm: number): number {
  return parseFloat((yarnDiameterMm * 2.5 + 1).toFixed(1));
}

export function heddlesPerShaft(totalEnds: number, shaftCount: number): number {
  return Math.ceil(totalEnds / shaftCount);
}

export function heddleLengthCm(loomType: "table" | "floor"): number {
  return loomType === "floor" ? 30 : 20;
}

export function weightPerHeddleG(type: HeddleType): number {
  const w: Record<HeddleType, number> = {
    wire: 2.5, string: 0.8, flat_steel: 3.2, inserted_eye: 4.0, texsolv: 1.2,
  };
  return w[type];
}

export function totalHeddleWeightKg(count: number, type: HeddleType): number {
  return parseFloat((count * weightPerHeddleG(type) / 1000).toFixed(2));
}

export function threadingOrder(shaftCount: number): number[] {
  const order: number[] = [];
  for (let i = 1; i <= shaftCount; i++) order.push(i);
  return order;
}

export function replacementIntervalYears(type: HeddleType): number {
  const years: Record<HeddleType, number> = {
    wire: 15, string: 2, flat_steel: 20, inserted_eye: 25, texsolv: 5,
  };
  return years[type];
}

export function noiseRating(type: HeddleType): number {
  const noise: Record<HeddleType, number> = {
    wire: 7, string: 2, flat_steel: 8, inserted_eye: 6, texsolv: 3,
  };
  return noise[type];
}

export function costPerHeddle(type: HeddleType): number {
  const cost: Record<HeddleType, number> = {
    wire: 0.15, string: 0.05, flat_steel: 0.25, inserted_eye: 0.40, texsolv: 0.10,
  };
  return cost[type];
}

export function heddleTypes(): HeddleType[] {
  return ["wire", "string", "flat_steel", "inserted_eye", "texsolv"];
}
