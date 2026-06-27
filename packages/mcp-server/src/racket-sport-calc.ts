export type RacketSport = "tennis" | "badminton" | "squash" | "table_tennis" | "padel";

export function courtLengthM(r: RacketSport): number {
  const m: Record<RacketSport, number> = {
    tennis: 23.77, badminton: 13.4, squash: 9.75, table_tennis: 2.74, padel: 20,
  };
  return m[r];
}

export function shuttleSpeedKmh(r: RacketSport): number {
  const m: Record<RacketSport, number> = {
    tennis: 263, badminton: 493, squash: 281, table_tennis: 112, padel: 200,
  };
  return m[r];
}

export function rallyLength(r: RacketSport): number {
  const m: Record<RacketSport, number> = {
    tennis: 5, badminton: 8, squash: 12, table_tennis: 6, padel: 10,
  };
  return m[r];
}

export function fitnessRequirement(r: RacketSport): number {
  const m: Record<RacketSport, number> = {
    tennis: 8, badminton: 7, squash: 10, table_tennis: 5, padel: 6,
  };
  return m[r];
}

export function globalPopularity(r: RacketSport): number {
  const m: Record<RacketSport, number> = {
    tennis: 10, badminton: 8, squash: 5, table_tennis: 9, padel: 6,
  };
  return m[r];
}

export function usesWalls(r: RacketSport): boolean {
  const m: Record<RacketSport, boolean> = {
    tennis: false, badminton: false, squash: true, table_tennis: false, padel: true,
  };
  return m[r];
}

export function olympicSport(r: RacketSport): boolean {
  const m: Record<RacketSport, boolean> = {
    tennis: true, badminton: true, squash: false, table_tennis: true, padel: false,
  };
  return m[r];
}

export function racketMaterial(r: RacketSport): string {
  const m: Record<RacketSport, string> = {
    tennis: "graphite", badminton: "carbon_fiber", squash: "graphite_composite",
    table_tennis: "wood_rubber", padel: "fiberglass_foam",
  };
  return m[r];
}

export function scoringSystem(r: RacketSport): string {
  const m: Record<RacketSport, string> = {
    tennis: "love_15_30_40", badminton: "rally_point_21", squash: "point_a_rally_11",
    table_tennis: "point_a_rally_11", padel: "love_15_30_40",
  };
  return m[r];
}

export function racketSports(): RacketSport[] {
  return ["tennis", "badminton", "squash", "table_tennis", "padel"];
}
