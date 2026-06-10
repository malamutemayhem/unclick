export type StitchType = "saddle" | "cross" | "baseball" | "running" | "backstitch";

export function stitchesPerCm(spi: number): number {
  return parseFloat((spi / 2.54).toFixed(1));
}

export function threadLengthCm(seamLengthCm: number, type: StitchType): number {
  const multipliers: Record<StitchType, number> = {
    saddle: 4.0, cross: 5.0, baseball: 3.5, running: 2.5, backstitch: 3.0,
  };
  return parseFloat((seamLengthCm * multipliers[type]).toFixed(1));
}

export function needleSizeMm(leatherThicknessMm: number): number {
  return parseFloat((leatherThicknessMm * 0.8 + 0.5).toFixed(1));
}

export function holeDiameterMm(needleSizeMm: number): number {
  return parseFloat((needleSizeMm * 0.9).toFixed(1));
}

export function holeSpacingMm(type: StitchType): number {
  const spacing: Record<StitchType, number> = {
    saddle: 4, cross: 5, baseball: 3, running: 3, backstitch: 3,
  };
  return spacing[type];
}

export function threadThicknessMm(leatherThicknessMm: number): number {
  return parseFloat((leatherThicknessMm * 0.3).toFixed(2));
}

export function stitchingTimeMins(seamLengthCm: number, skill: "beginner" | "intermediate" | "expert"): number {
  const rates: Record<string, number> = { beginner: 0.8, intermediate: 0.4, expert: 0.2 };
  return parseFloat((seamLengthCm * rates[skill]).toFixed(1));
}

export function strengthRating(type: StitchType): number {
  const ratings: Record<StitchType, number> = {
    saddle: 10, cross: 7, baseball: 8, running: 4, backstitch: 6,
  };
  return ratings[type];
}

export function waxRequired(threadLengthCm: number): boolean {
  return threadLengthCm > 0;
}

export function costPerMeter(type: StitchType, baseCost: number): number {
  const mult: Record<StitchType, number> = {
    saddle: 2.0, cross: 1.8, baseball: 1.5, running: 1.0, backstitch: 1.2,
  };
  return parseFloat((baseCost * mult[type]).toFixed(2));
}

export function stitchTypes(): StitchType[] {
  return ["saddle", "cross", "baseball", "running", "backstitch"];
}
