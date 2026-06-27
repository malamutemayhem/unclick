export type MachineEra = "em" | "early_ss" | "dmd" | "lcd" | "modern";
export type ShotType = "ramp" | "orbit" | "target" | "scoop" | "spinner" | "kickback";

export function playfieldAngle(era: MachineEra): number {
  const degrees: Record<MachineEra, number> = {
    em: 6, early_ss: 6.5, dmd: 6.5, lcd: 7, modern: 7,
  };
  return degrees[era];
}

export function ballWeight(): number {
  return 80;
}

export function ballDiameter(): number {
  return 27;
}

export function flipperLength(era: MachineEra): number {
  const mm: Record<MachineEra, number> = {
    em: 76, early_ss: 76, dmd: 79, lcd: 79, modern: 79,
  };
  return mm[era];
}

export function shotValue(shotType: ShotType, multiplier: number = 1): number {
  const base: Record<ShotType, number> = {
    ramp: 500000, orbit: 250000, target: 100000, scoop: 750000, spinner: 50000, kickback: 1000000,
  };
  return base[shotType] * multiplier;
}

export function multiballMultiplier(ballsInPlay: number): number {
  return parseFloat((1 + (ballsInPlay - 1) * 0.5).toFixed(1));
}

export function comboBonus(consecutiveShots: number): number {
  return consecutiveShots * 100000;
}

export function tiltSensitivity(era: MachineEra): string {
  if (era === "em") return "very sensitive";
  if (era === "modern" || era === "lcd") return "adjustable";
  return "moderate";
}

export function coilVoltage(era: MachineEra): number {
  const volts: Record<MachineEra, number> = {
    em: 28, early_ss: 28, dmd: 50, lcd: 48, modern: 48,
  };
  return volts[era];
}

export function rubberAge(years: number): string {
  if (years < 2) return "good";
  if (years < 5) return "worn";
  return "replace";
}

export function ledReplacement(giCount: number): number {
  return giCount;
}

export function playfieldWear(gamesPlayed: number): string {
  if (gamesPlayed < 1000) return "minimal";
  if (gamesPlayed < 5000) return "moderate";
  return "significant";
}

export function competitionBalls(): number {
  return 3;
}

export function machineEras(): MachineEra[] {
  return ["em", "early_ss", "dmd", "lcd", "modern"];
}
