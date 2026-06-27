export type ClimbingType = "bouldering" | "sport" | "trad" | "ice" | "alpine";

export function heightMeters(climb: ClimbingType): number {
  const m: Record<ClimbingType, number> = {
    bouldering: 5, sport: 30, trad: 50, ice: 40, alpine: 500,
  };
  return m[climb];
}

export function gearRequired(climb: ClimbingType): number {
  const m: Record<ClimbingType, number> = {
    bouldering: 2, sport: 5, trad: 9, ice: 10, alpine: 10,
  };
  return m[climb];
}

export function strengthDemand(climb: ClimbingType): number {
  const m: Record<ClimbingType, number> = {
    bouldering: 10, sport: 7, trad: 6, ice: 8, alpine: 7,
  };
  return m[climb];
}

export function enduranceDemand(climb: ClimbingType): number {
  const m: Record<ClimbingType, number> = {
    bouldering: 3, sport: 7, trad: 8, ice: 9, alpine: 10,
  };
  return m[climb];
}

export function riskLevel(climb: ClimbingType): number {
  const m: Record<ClimbingType, number> = {
    bouldering: 3, sport: 4, trad: 7, ice: 9, alpine: 10,
  };
  return m[climb];
}

export function indoor(climb: ClimbingType): boolean {
  const m: Record<ClimbingType, boolean> = {
    bouldering: true, sport: true, trad: false, ice: false, alpine: false,
  };
  return m[climb];
}

export function ropeRequired(climb: ClimbingType): boolean {
  const m: Record<ClimbingType, boolean> = {
    bouldering: false, sport: true, trad: true, ice: true, alpine: true,
  };
  return m[climb];
}

export function bestSeason(climb: ClimbingType): string {
  const m: Record<ClimbingType, string> = {
    bouldering: "year_round", sport: "spring_fall", trad: "summer",
    ice: "winter", alpine: "summer",
  };
  return m[climb];
}

export function learningMonths(climb: ClimbingType): number {
  const m: Record<ClimbingType, number> = {
    bouldering: 3, sport: 6, trad: 24, ice: 12, alpine: 36,
  };
  return m[climb];
}

export function climbingTypes(): ClimbingType[] {
  return ["bouldering", "sport", "trad", "ice", "alpine"];
}
