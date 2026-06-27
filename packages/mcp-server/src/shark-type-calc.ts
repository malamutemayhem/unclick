export type SharkType = "great_white" | "hammerhead" | "whale_shark" | "mako" | "bull";

export function lengthMeters(shark: SharkType): number {
  const m: Record<SharkType, number> = {
    great_white: 6, hammerhead: 4, whale_shark: 12, mako: 3.5, bull: 3.5,
  };
  return m[shark];
}

export function speedKmh(shark: SharkType): number {
  const m: Record<SharkType, number> = {
    great_white: 56, hammerhead: 40, whale_shark: 20, mako: 74, bull: 40,
  };
  return m[shark];
}

export function biteForceNewtons(shark: SharkType): number {
  const m: Record<SharkType, number> = {
    great_white: 18000, hammerhead: 12000, whale_shark: 0, mako: 8000, bull: 13000,
  };
  return m[shark];
}

export function depthRangeMeters(shark: SharkType): number {
  const m: Record<SharkType, number> = {
    great_white: 1200, hammerhead: 300, whale_shark: 1800, mako: 500, bull: 150,
  };
  return m[shark];
}

export function electroreceptionRange(shark: SharkType): number {
  const m: Record<SharkType, number> = {
    great_white: 7, hammerhead: 10, whale_shark: 3, mako: 6, bull: 5,
  };
  return m[shark];
}

export function filterFeeder(shark: SharkType): boolean {
  const m: Record<SharkType, boolean> = {
    great_white: false, hammerhead: false, whale_shark: true, mako: false, bull: false,
  };
  return m[shark];
}

export function freshwaterTolerant(shark: SharkType): boolean {
  const m: Record<SharkType, boolean> = {
    great_white: false, hammerhead: false, whale_shark: false, mako: false, bull: true,
  };
  return m[shark];
}

export function conservationStatus(shark: SharkType): string {
  const m: Record<SharkType, string> = {
    great_white: "vulnerable", hammerhead: "critically_endangered", whale_shark: "endangered",
    mako: "endangered", bull: "near_threatened",
  };
  return m[shark];
}

export function lifespanYears(shark: SharkType): number {
  const m: Record<SharkType, number> = {
    great_white: 70, hammerhead: 30, whale_shark: 100, mako: 30, bull: 25,
  };
  return m[shark];
}

export function sharkTypes(): SharkType[] {
  return ["great_white", "hammerhead", "whale_shark", "mako", "bull"];
}
