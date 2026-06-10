export type FingerJointType = "through" | "mitered" | "double" | "decorative" | "end_grain";

export function fingersPerCm(type: FingerJointType): number {
  const f: Record<FingerJointType, number> = {
    through: 2, mitered: 1.5, double: 3, decorative: 4, end_grain: 2,
  };
  return f[type];
}

export function glueAreaMultiplier(type: FingerJointType): number {
  const g: Record<FingerJointType, number> = {
    through: 3, mitered: 2.5, double: 5, decorative: 4, end_grain: 2,
  };
  return g[type];
}

export function strengthRating(type: FingerJointType): number {
  const s: Record<FingerJointType, number> = {
    through: 7, mitered: 6, double: 9, decorative: 5, end_grain: 4,
  };
  return s[type];
}

export function visibleEndGrain(type: FingerJointType): boolean {
  return type !== "mitered";
}

export function routerBitRequired(type: FingerJointType): boolean {
  return true;
}

export function setupTimeMinutes(type: FingerJointType): number {
  const t: Record<FingerJointType, number> = {
    through: 15, mitered: 30, double: 25, decorative: 20, end_grain: 10,
  };
  return t[type];
}

export function difficultyRating(type: FingerJointType): number {
  const d: Record<FingerJointType, number> = {
    through: 4, mitered: 8, double: 7, decorative: 6, end_grain: 3,
  };
  return d[type];
}

export function decorativeValue(type: FingerJointType): number {
  const d: Record<FingerJointType, number> = {
    through: 6, mitered: 5, double: 7, decorative: 10, end_grain: 4,
  };
  return d[type];
}

export function wastePercent(type: FingerJointType): number {
  const w: Record<FingerJointType, number> = {
    through: 5, mitered: 10, double: 8, decorative: 12, end_grain: 3,
  };
  return w[type];
}

export function fingerJointTypes(): FingerJointType[] {
  return ["through", "mitered", "double", "decorative", "end_grain"];
}
