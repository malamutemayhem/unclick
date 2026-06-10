export type PunchType = "round" | "square" | "slotted" | "tapered" | "hollow";

export function holeSizeMm(type: PunchType): { min: number; max: number } {
  const sizes: Record<PunchType, { min: number; max: number }> = {
    round: { min: 3, max: 25 }, square: { min: 5, max: 20 },
    slotted: { min: 4, max: 30 }, tapered: { min: 2, max: 15 },
    hollow: { min: 6, max: 50 },
  };
  return sizes[type];
}

export function driftLengthCm(type: PunchType): number {
  const len: Record<PunchType, number> = {
    round: 20, square: 18, slotted: 22, tapered: 25, hollow: 15,
  };
  return len[type];
}

export function hammerBlowsRequired(type: PunchType): number {
  const blows: Record<PunchType, number> = {
    round: 5, square: 8, slotted: 10, tapered: 4, hollow: 3,
  };
  return blows[type];
}

export function materialRemoved(type: PunchType): boolean {
  return type === "hollow";
}

export function heatRequired(type: PunchType): boolean {
  return type !== "hollow" || true;
}

export function taperAngleDeg(type: PunchType): number {
  const angle: Record<PunchType, number> = {
    round: 2, square: 2, slotted: 1, tapered: 5, hollow: 0,
  };
  return angle[type];
}

export function toolSteelGrade(type: PunchType): string {
  const grade: Record<PunchType, string> = {
    round: "S2", square: "S2", slotted: "S7", tapered: "H13", hollow: "A2",
  };
  return grade[type];
}

export function regrindCycles(type: PunchType): number {
  const cycles: Record<PunchType, number> = {
    round: 20, square: 15, slotted: 10, tapered: 25, hollow: 8,
  };
  return cycles[type];
}

export function costEstimate(type: PunchType): number {
  const c: Record<PunchType, number> = {
    round: 15, square: 18, slotted: 25, tapered: 20, hollow: 35,
  };
  return c[type];
}

export function punchTypes(): PunchType[] {
  return ["round", "square", "slotted", "tapered", "hollow"];
}
