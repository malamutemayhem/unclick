export type BobbinType = "pirn" | "cop" | "flanged" | "paper_tube" | "quill";

export function bobbinLengthMm(type: BobbinType): number {
  const lengths: Record<BobbinType, number> = {
    pirn: 200, cop: 150, flanged: 120, paper_tube: 180, quill: 250,
  };
  return lengths[type];
}

export function bobbinDiameterMm(type: BobbinType): number {
  const diameters: Record<BobbinType, number> = {
    pirn: 25, cop: 20, flanged: 30, paper_tube: 22, quill: 15,
  };
  return diameters[type];
}

export function yarnCapacityM(type: BobbinType, yarnCountNm: number): number {
  const baseCapacity: Record<BobbinType, number> = {
    pirn: 500, cop: 350, flanged: 300, paper_tube: 450, quill: 600,
  };
  return Math.round(baseCapacity[type] * (yarnCountNm / 10));
}

export function windingSpeedRpm(type: BobbinType): number {
  const speeds: Record<BobbinType, number> = {
    pirn: 3000, cop: 2500, flanged: 2000, paper_tube: 2800, quill: 1500,
  };
  return speeds[type];
}

export function windingTimeMinutes(yarnLengthM: number, speedRpm: number): number {
  if (speedRpm <= 0) return 0;
  return parseFloat((yarnLengthM / (speedRpm * 0.3)).toFixed(1));
}

export function tensionGrams(yarnCountNm: number): number {
  return Math.round(1000 / yarnCountNm * 5);
}

export function bobbinsPerWarp(totalEnds: number, shuttleCount: number): number {
  if (shuttleCount <= 0) return 0;
  return Math.ceil(totalEnds / shuttleCount);
}

export function weightFullG(type: BobbinType): number {
  const weights: Record<BobbinType, number> = {
    pirn: 85, cop: 60, flanged: 95, paper_tube: 45, quill: 30,
  };
  return weights[type];
}

export function costPerBobbin(type: BobbinType): number {
  const costs: Record<BobbinType, number> = {
    pirn: 2.50, cop: 1.80, flanged: 3.20, paper_tube: 0.50, quill: 4.00,
  };
  return costs[type];
}

export function bobbinTypes(): BobbinType[] {
  return ["pirn", "cop", "flanged", "paper_tube", "quill"];
}
