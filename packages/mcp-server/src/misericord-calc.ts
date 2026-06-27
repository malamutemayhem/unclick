export type CarvingSubject = "foliate" | "animal" | "human" | "grotesque" | "geometric";

export function seatWidthCm(stallWidthCm: number): number {
  return parseFloat((stallWidthCm * 0.85).toFixed(1));
}

export function ledgeProjectionCm(seatDepthCm: number): number {
  return parseFloat((seatDepthCm * 0.15).toFixed(1));
}

export function supportAngle(seatWidthCm: number, ledgeDepthCm: number): number {
  if (seatWidthCm <= 0) return 0;
  return parseFloat((Math.atan(ledgeDepthCm / (seatWidthCm / 2)) * 180 / Math.PI).toFixed(1));
}

export function loadCapacityKg(woodStrengthMpa: number, ledgeAreaCm2: number): number {
  return parseFloat((woodStrengthMpa * ledgeAreaCm2 / 100 * 10).toFixed(0));
}

export function carvingAreaCm2(widthCm: number, heightCm: number): number {
  return parseFloat((widthCm * heightCm * 0.7).toFixed(0));
}

export function carvingHours(subject: CarvingSubject, areaCm2: number): number {
  const hoursPerCm2: Record<CarvingSubject, number> = {
    foliate: 0.03, animal: 0.05, human: 0.08, grotesque: 0.06, geometric: 0.02,
  };
  return parseFloat((areaCm2 * hoursPerCm2[subject]).toFixed(1));
}

export function woodThicknessCm(ledgeProjectionCm: number): number {
  return parseFloat((ledgeProjectionCm * 2.5).toFixed(1));
}

export function hingeCount(seatWidthCm: number): number {
  if (seatWidthCm < 40) return 1;
  return 2;
}

export function polishCoats(highUse: boolean): number {
  return highUse ? 6 : 3;
}

export function restorationCostPerSeat(subject: CarvingSubject): number {
  const costs: Record<CarvingSubject, number> = {
    foliate: 500, animal: 800, human: 1200, grotesque: 1000, geometric: 300,
  };
  return costs[subject];
}

export function carvingSubjects(): CarvingSubject[] {
  return ["foliate", "animal", "human", "grotesque", "geometric"];
}
