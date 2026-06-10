export type RodType = "philadelphia" | "lenker" | "metric_e" | "barcode" | "laser_target";

export function graduationMm(type: RodType): number {
  const grad: Record<RodType, number> = {
    philadelphia: 3.048, lenker: 3.048, metric_e: 1, barcode: 0.5, laser_target: 1,
  };
  return grad[type];
}

export function maxLengthM(type: RodType): number {
  const len: Record<RodType, number> = {
    philadelphia: 7.6, lenker: 4.9, metric_e: 5, barcode: 5, laser_target: 5,
  };
  return len[type];
}

export function sectionsCount(type: RodType): number {
  const sec: Record<RodType, number> = {
    philadelphia: 2, lenker: 3, metric_e: 4, barcode: 3, laser_target: 3,
  };
  return sec[type];
}

export function readabilityDistance(type: RodType): number {
  const dist: Record<RodType, number> = {
    philadelphia: 80, lenker: 100, metric_e: 60, barcode: 150, laser_target: 200,
  };
  return dist[type];
}

export function selfReading(type: RodType): boolean {
  return type === "barcode" || type === "laser_target";
}

export function materialPrimary(type: RodType): string {
  const mat: Record<RodType, string> = {
    philadelphia: "wood", lenker: "fiberglass", metric_e: "aluminum",
    barcode: "fiberglass", laser_target: "aluminum",
  };
  return mat[type];
}

export function weightKg(type: RodType): number {
  const w: Record<RodType, number> = {
    philadelphia: 2.5, lenker: 1.8, metric_e: 1.5, barcode: 1.6, laser_target: 1.2,
  };
  return w[type];
}

export function bubbleLevelBuiltIn(type: RodType): boolean {
  return type !== "philadelphia";
}

export function costEstimate(type: RodType): number {
  const c: Record<RodType, number> = {
    philadelphia: 50, lenker: 80, metric_e: 100, barcode: 250, laser_target: 150,
  };
  return c[type];
}

export function rodTypes(): RodType[] {
  return ["philadelphia", "lenker", "metric_e", "barcode", "laser_target"];
}
