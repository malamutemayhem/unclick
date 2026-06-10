export type AntCaste = "queen" | "worker" | "soldier" | "drone" | "major";

export function lifespan(c: AntCaste): number {
  const m: Record<AntCaste, number> = {
    queen: 10, worker: 4, soldier: 5, drone: 1, major: 5,
  };
  return m[c];
}

export function colonyImportance(c: AntCaste): number {
  const m: Record<AntCaste, number> = {
    queen: 10, worker: 9, soldier: 7, drone: 5, major: 6,
  };
  return m[c];
}

export function bodySize(c: AntCaste): number {
  const m: Record<AntCaste, number> = {
    queen: 9, worker: 3, soldier: 7, drone: 5, major: 8,
  };
  return m[c];
}

export function mandibleStrength(c: AntCaste): number {
  const m: Record<AntCaste, number> = {
    queen: 4, worker: 5, soldier: 10, drone: 2, major: 9,
  };
  return m[c];
}

export function populationPercent(c: AntCaste): number {
  const m: Record<AntCaste, number> = {
    queen: 1, worker: 10, soldier: 4, drone: 2, major: 3,
  };
  return m[c];
}

export function canReproduce(c: AntCaste): boolean {
  const m: Record<AntCaste, boolean> = {
    queen: true, worker: false, soldier: false, drone: true, major: false,
  };
  return m[c];
}

export function hasWings(c: AntCaste): boolean {
  const m: Record<AntCaste, boolean> = {
    queen: true, worker: false, soldier: false, drone: true, major: false,
  };
  return m[c];
}

export function primaryRole(c: AntCaste): string {
  const m: Record<AntCaste, string> = {
    queen: "egg_laying_colony_founding", worker: "foraging_nursing_building",
    soldier: "colony_defense", drone: "mating_flight",
    major: "seed_milling_heavy_defense",
  };
  return m[c];
}

export function developmentPath(c: AntCaste): string {
  const m: Record<AntCaste, string> = {
    queen: "fed_royal_jelly_larvae", worker: "standard_larval_diet",
    soldier: "enhanced_larval_nutrition", drone: "unfertilized_egg",
    major: "extended_larval_growth",
  };
  return m[c];
}

export function antCastes(): AntCaste[] {
  return ["queen", "worker", "soldier", "drone", "major"];
}
