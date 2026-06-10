export type SailboatType = "sloop" | "catamaran" | "ketch" | "schooner" | "dinghy";

export function hullSpeed(boat: SailboatType): number {
  const m: Record<SailboatType, number> = {
    sloop: 7, catamaran: 10, ketch: 6, schooner: 7, dinghy: 5,
  };
  return m[boat];
}

export function stabilityRating(boat: SailboatType): number {
  const m: Record<SailboatType, number> = {
    sloop: 6, catamaran: 10, ketch: 8, schooner: 7, dinghy: 3,
  };
  return m[boat];
}

export function crewSizeMin(boat: SailboatType): number {
  const m: Record<SailboatType, number> = {
    sloop: 1, catamaran: 2, ketch: 2, schooner: 4, dinghy: 1,
  };
  return m[boat];
}

export function lengthMeters(boat: SailboatType): number {
  const m: Record<SailboatType, number> = {
    sloop: 10, catamaran: 12, ketch: 14, schooner: 20, dinghy: 4,
  };
  return m[boat];
}

export function upwindAbility(boat: SailboatType): number {
  const m: Record<SailboatType, number> = {
    sloop: 9, catamaran: 7, ketch: 7, schooner: 6, dinghy: 8,
  };
  return m[boat];
}

export function multiHull(boat: SailboatType): boolean {
  const m: Record<SailboatType, boolean> = {
    sloop: false, catamaran: true, ketch: false, schooner: false, dinghy: false,
  };
  return m[boat];
}

export function liveaboard(boat: SailboatType): boolean {
  const m: Record<SailboatType, boolean> = {
    sloop: true, catamaran: true, ketch: true, schooner: true, dinghy: false,
  };
  return m[boat];
}

export function bestUse(boat: SailboatType): string {
  const m: Record<SailboatType, string> = {
    sloop: "cruising", catamaran: "charter", ketch: "bluewater",
    schooner: "classic_sail", dinghy: "racing",
  };
  return m[boat];
}

export function averagePriceUsd(boat: SailboatType): number {
  const m: Record<SailboatType, number> = {
    sloop: 50000, catamaran: 200000, ketch: 100000, schooner: 300000, dinghy: 5000,
  };
  return m[boat];
}

export function sailboatTypes(): SailboatType[] {
  return ["sloop", "catamaran", "ketch", "schooner", "dinghy"];
}
