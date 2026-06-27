export type YarnWeight = "lace" | "fingering" | "dk" | "worsted" | "bulky";

export function stitchesPer10cm(weight: YarnWeight): number {
  const stitches: Record<YarnWeight, number> = {
    lace: 32, fingering: 28, dk: 22, worsted: 18, bulky: 14,
  };
  return stitches[weight];
}

export function rowsPer10cm(weight: YarnWeight): number {
  const rows: Record<YarnWeight, number> = {
    lace: 40, fingering: 36, dk: 30, worsted: 24, bulky: 18,
  };
  return rows[weight];
}

export function needleSizeMm(weight: YarnWeight): number {
  const sizes: Record<YarnWeight, number> = {
    lace: 2.25, fingering: 2.75, dk: 4, worsted: 5, bulky: 6.5,
  };
  return sizes[weight];
}

export function yarnMetersPerProject(widthCm: number, lengthCm: number, stitchesPer10cm: number, rowsPer10cm: number): number {
  const totalStitches = (widthCm / 10) * stitchesPer10cm * (lengthCm / 10) * rowsPer10cm;
  return Math.round(totalStitches * 0.025);
}

export function yarnBallsNeeded(totalMeters: number, metersPerBall: number): number {
  if (metersPerBall <= 0) return 0;
  return Math.ceil(totalMeters / metersPerBall);
}

export function metersPerBall(weight: YarnWeight): number {
  const meters: Record<YarnWeight, number> = {
    lace: 800, fingering: 400, dk: 250, worsted: 200, bulky: 120,
  };
  return meters[weight];
}

export function knittingSpeedStitchesPerMin(experience: "beginner" | "intermediate" | "expert"): number {
  const speeds: Record<string, number> = { beginner: 15, intermediate: 30, expert: 50 };
  return speeds[experience];
}

export function projectTimeHours(totalStitches: number, stitchesPerMin: number): number {
  if (stitchesPerMin <= 0) return 0;
  return parseFloat((totalStitches / stitchesPerMin / 60).toFixed(1));
}

export function costPerBall(weight: YarnWeight): number {
  const costs: Record<YarnWeight, number> = {
    lace: 12, fingering: 10, dk: 8, worsted: 7, bulky: 9,
  };
  return costs[weight];
}

export function yarnWeights(): YarnWeight[] {
  return ["lace", "fingering", "dk", "worsted", "bulky"];
}
