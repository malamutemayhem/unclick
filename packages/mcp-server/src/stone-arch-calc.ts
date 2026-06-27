export type ArchType = "semicircular" | "pointed" | "segmental" | "horseshoe" | "flat_jack";

export function riseToSpanRatio(type: ArchType): number {
  const r: Record<ArchType, number> = {
    semicircular: 0.5, pointed: 0.7, segmental: 0.3,
    horseshoe: 0.6, flat_jack: 0.1,
  };
  return r[type];
}

export function voussoirCount(type: ArchType, spanM: number): number {
  const perMeter: Record<ArchType, number> = {
    semicircular: 8, pointed: 10, segmental: 6,
    horseshoe: 9, flat_jack: 5,
  };
  return Math.ceil(perMeter[type] * spanM);
}

export function thrustAngleDeg(type: ArchType): number {
  const a: Record<ArchType, number> = {
    semicircular: 30, pointed: 20, segmental: 40,
    horseshoe: 25, flat_jack: 60,
  };
  return a[type];
}

export function keystoneRequired(type: ArchType): boolean {
  return type !== "flat_jack";
}

export function centeringRequired(type: ArchType): boolean {
  return true;
}

export function maxSpanM(type: ArchType): number {
  const s: Record<ArchType, number> = {
    semicircular: 15, pointed: 20, segmental: 10,
    horseshoe: 12, flat_jack: 3,
  };
  return s[type];
}

export function loadCapacityRating(type: ArchType): number {
  const l: Record<ArchType, number> = {
    semicircular: 8, pointed: 9, segmental: 6,
    horseshoe: 7, flat_jack: 4,
  };
  return l[type];
}

export function skillLevel(type: ArchType): number {
  const s: Record<ArchType, number> = {
    semicircular: 5, pointed: 7, segmental: 4,
    horseshoe: 8, flat_jack: 3,
  };
  return s[type];
}

export function costPerMeterSpan(type: ArchType): number {
  const c: Record<ArchType, number> = {
    semicircular: 500, pointed: 700, segmental: 400,
    horseshoe: 800, flat_jack: 300,
  };
  return c[type];
}

export function archTypes(): ArchType[] {
  return ["semicircular", "pointed", "segmental", "horseshoe", "flat_jack"];
}
