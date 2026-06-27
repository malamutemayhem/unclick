export type EscapementType = "verge" | "anchor" | "deadbeat" | "grasshopper" | "coaxial" | "lever";

export function beatRate(frequency: number): number {
  return parseFloat((frequency * 2).toFixed(1));
}

export function pendulumPeriod(lengthM: number): number {
  if (lengthM <= 0) return 0;
  return parseFloat((2 * Math.PI * Math.sqrt(lengthM / 9.81)).toFixed(4));
}

export function escapeWheelTeeth(type: EscapementType): number {
  const teeth: Record<EscapementType, number> = {
    verge: 13, anchor: 30, deadbeat: 30, grasshopper: 30, coaxial: 15, lever: 15,
  };
  return teeth[type];
}

export function dropAngle(type: EscapementType): number {
  const angles: Record<EscapementType, number> = {
    verge: 7.5, anchor: 1.5, deadbeat: 1.0, grasshopper: 0.5, coaxial: 1.2, lever: 2.0,
  };
  return angles[type];
}

export function impulseAngle(escapeTeeth: number): number {
  if (escapeTeeth <= 0) return 0;
  return parseFloat((360 / escapeTeeth / 2).toFixed(2));
}

export function palletSpan(escapeTeeth: number, wheelRadius: number): number {
  if (escapeTeeth <= 0) return 0;
  const angleRad = (Math.PI * 2.5 * 2) / escapeTeeth;
  return parseFloat((2 * wheelRadius * Math.sin(angleRad / 2)).toFixed(2));
}

export function accuracy(type: EscapementType): number {
  const secPerDay: Record<EscapementType, number> = {
    verge: 60, anchor: 15, deadbeat: 5, grasshopper: 1, coaxial: 0.5, lever: 10,
  };
  return secPerDay[type];
}

export function mainspringTurns(runHours: number, gearRatio: number): number {
  if (gearRatio <= 0) return 0;
  return parseFloat((runHours / gearRatio).toFixed(1));
}

export function oilInterval(type: EscapementType): number {
  const years: Record<EscapementType, number> = {
    verge: 2, anchor: 3, deadbeat: 5, grasshopper: 20, coaxial: 10, lever: 5,
  };
  return years[type];
}

export function tickVolume(wheelRadius: number, dropDeg: number): number {
  return parseFloat((wheelRadius * dropDeg * 0.01).toFixed(2));
}

export function escapementTypes(): EscapementType[] {
  return ["verge", "anchor", "deadbeat", "grasshopper", "coaxial", "lever"];
}
