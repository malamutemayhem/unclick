export type NetType = "gill" | "seine" | "cast" | "hammock" | "cargo";

export function meshSizeCm(type: NetType): number {
  const sizes: Record<NetType, number> = {
    gill: 5, seine: 2, cast: 3, hammock: 4, cargo: 10,
  };
  return sizes[type];
}

export function twineWeightGPerM2(type: NetType): number {
  const weights: Record<NetType, number> = {
    gill: 20, seine: 30, cast: 25, hammock: 40, cargo: 80,
  };
  return weights[type];
}

export function knotsPerM2(type: NetType): number {
  const knots: Record<NetType, number> = {
    gill: 400, seine: 2500, cast: 1100, hammock: 625, cargo: 100,
  };
  return knots[type];
}

export function meshesPerRow(widthCm: number, meshSizeCm: number): number {
  if (meshSizeCm <= 0) return 0;
  return Math.ceil(widthCm / meshSizeCm);
}

export function shuttleLoads(totalMeshes: number): number {
  return Math.ceil(totalMeshes / 200);
}

export function breakingStrengthKg(type: NetType): number {
  const strength: Record<NetType, number> = {
    gill: 15, seine: 20, cast: 10, hammock: 50, cargo: 200,
  };
  return strength[type];
}

export function repairTimeMinsPerHole(type: NetType): number {
  const mins: Record<NetType, number> = {
    gill: 5, seine: 3, cast: 4, hammock: 8, cargo: 15,
  };
  return mins[type];
}

export function lifespanYears(type: NetType): number {
  const years: Record<NetType, number> = {
    gill: 2, seine: 3, cast: 3, hammock: 10, cargo: 15,
  };
  return years[type];
}

export function costPerM2(type: NetType): number {
  const costs: Record<NetType, number> = {
    gill: 8, seine: 12, cast: 10, hammock: 15, cargo: 25,
  };
  return costs[type];
}

export function netTypes(): NetType[] {
  return ["gill", "seine", "cast", "hammock", "cargo"];
}
