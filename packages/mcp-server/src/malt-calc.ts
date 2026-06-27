export type MaltType = "pale" | "pilsner" | "munich" | "crystal" | "roasted";

export function colorSrm(type: MaltType): number {
  const colors: Record<MaltType, number> = {
    pale: 3, pilsner: 2, munich: 10, crystal: 60, roasted: 500,
  };
  return colors[type];
}

export function potentialGravityPoints(type: MaltType): number {
  const ppg: Record<MaltType, number> = {
    pale: 36, pilsner: 37, munich: 34, crystal: 33, roasted: 25,
  };
  return ppg[type];
}

export function maxPercentOfGrist(type: MaltType): number {
  const maxPct: Record<MaltType, number> = {
    pale: 100, pilsner: 100, munich: 100, crystal: 20, roasted: 10,
  };
  return maxPct[type];
}

export function moisturePercent(type: MaltType): number {
  const moisture: Record<MaltType, number> = {
    pale: 4, pilsner: 3.5, munich: 4.5, crystal: 5, roasted: 2,
  };
  return moisture[type];
}

export function diasticPowerLintner(type: MaltType): number {
  const dp: Record<MaltType, number> = {
    pale: 120, pilsner: 130, munich: 70, crystal: 0, roasted: 0,
  };
  return dp[type];
}

export function proteinPercent(type: MaltType): number {
  const protein: Record<MaltType, number> = {
    pale: 11, pilsner: 10, munich: 11.5, crystal: 13, roasted: 12,
  };
  return protein[type];
}

export function crushGapMm(type: MaltType): number {
  const gaps: Record<MaltType, number> = {
    pale: 1.0, pilsner: 0.9, munich: 1.0, crystal: 1.2, roasted: 0.8,
  };
  return gaps[type];
}

export function gravityContribution(weightKg: number, ppg: number, volumeL: number, efficiency: number): number {
  if (volumeL <= 0) return 0;
  const points = weightKg * 2.205 * ppg * (efficiency / 100);
  return parseFloat((1 + points / (volumeL * 0.264172) / 1000).toFixed(4));
}

export function storageLifeMonths(type: MaltType): number {
  const months: Record<MaltType, number> = {
    pale: 12, pilsner: 12, munich: 10, crystal: 18, roasted: 24,
  };
  return months[type];
}

export function maltTypes(): MaltType[] {
  return ["pale", "pilsner", "munich", "crystal", "roasted"];
}
