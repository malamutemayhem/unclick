export type TideType = "spring" | "neap" | "king" | "perigean" | "proxigean";

export function tidalRangeMeters(tide: TideType): number {
  const m: Record<TideType, number> = {
    spring: 4, neap: 1.5, king: 5, perigean: 4.5, proxigean: 6,
  };
  return m[tide];
}

export function frequencyPerMonth(tide: TideType): number {
  const m: Record<TideType, number> = {
    spring: 2, neap: 2, king: 0.5, perigean: 1, proxigean: 0.1,
  };
  return m[tide];
}

export function currentStrength(tide: TideType): number {
  const m: Record<TideType, number> = {
    spring: 7, neap: 3, king: 9, perigean: 8, proxigean: 10,
  };
  return m[tide];
}

export function ecologicalImpact(tide: TideType): number {
  const m: Record<TideType, number> = {
    spring: 7, neap: 3, king: 8, perigean: 7, proxigean: 9,
  };
  return m[tide];
}

export function floodRisk(tide: TideType): number {
  const m: Record<TideType, number> = {
    spring: 5, neap: 1, king: 8, perigean: 6, proxigean: 10,
  };
  return m[tide];
}

export function lunarAligned(tide: TideType): boolean {
  const m: Record<TideType, boolean> = {
    spring: true, neap: true, king: true, perigean: true, proxigean: true,
  };
  return m[tide];
}

export function requiresPerigee(tide: TideType): boolean {
  const m: Record<TideType, boolean> = {
    spring: false, neap: false, king: false, perigean: true, proxigean: true,
  };
  return m[tide];
}

export function lunarPhase(tide: TideType): string {
  const m: Record<TideType, string> = {
    spring: "new_or_full", neap: "quarter", king: "new_or_full",
    perigean: "new_or_full", proxigean: "new_or_full",
  };
  return m[tide];
}

export function navigationHazard(tide: TideType): number {
  const m: Record<TideType, number> = {
    spring: 5, neap: 2, king: 8, perigean: 7, proxigean: 10,
  };
  return m[tide];
}

export function tideTypes(): TideType[] {
  return ["spring", "neap", "king", "perigean", "proxigean"];
}
