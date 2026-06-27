export type WhaleType = "blue" | "humpback" | "orca" | "sperm" | "beluga";

export function lengthMeters(whale: WhaleType): number {
  const m: Record<WhaleType, number> = {
    blue: 30, humpback: 15, orca: 8, sperm: 18, beluga: 5,
  };
  return m[whale];
}

export function weightTonnes(whale: WhaleType): number {
  const m: Record<WhaleType, number> = {
    blue: 150, humpback: 36, orca: 6, sperm: 45, beluga: 1.5,
  };
  return m[whale];
}

export function divingDepthMeters(whale: WhaleType): number {
  const m: Record<WhaleType, number> = {
    blue: 500, humpback: 200, orca: 300, sperm: 2000, beluga: 700,
  };
  return m[whale];
}

export function vocalizationComplexity(whale: WhaleType): number {
  const m: Record<WhaleType, number> = {
    blue: 5, humpback: 10, orca: 9, sperm: 7, beluga: 8,
  };
  return m[whale];
}

export function migrationDistanceKm(whale: WhaleType): number {
  const m: Record<WhaleType, number> = {
    blue: 10000, humpback: 16000, orca: 5000, sperm: 8000, beluga: 3000,
  };
  return m[whale];
}

export function filterFeeder(whale: WhaleType): boolean {
  const m: Record<WhaleType, boolean> = {
    blue: true, humpback: true, orca: false, sperm: false, beluga: false,
  };
  return m[whale];
}

export function arcticResident(whale: WhaleType): boolean {
  const m: Record<WhaleType, boolean> = {
    blue: false, humpback: false, orca: false, sperm: false, beluga: true,
  };
  return m[whale];
}

export function conservationStatus(whale: WhaleType): string {
  const m: Record<WhaleType, string> = {
    blue: "endangered", humpback: "least_concern", orca: "data_deficient",
    sperm: "vulnerable", beluga: "near_threatened",
  };
  return m[whale];
}

export function lifespanYears(whale: WhaleType): number {
  const m: Record<WhaleType, number> = {
    blue: 90, humpback: 50, orca: 60, sperm: 70, beluga: 40,
  };
  return m[whale];
}

export function whaleTypes(): WhaleType[] {
  return ["blue", "humpback", "orca", "sperm", "beluga"];
}
