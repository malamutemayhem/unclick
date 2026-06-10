export type CoralType = "staghorn" | "brain" | "table" | "mushroom" | "fire";

export function growthRateCmPerYear(coral: CoralType): number {
  const m: Record<CoralType, number> = {
    staghorn: 15, brain: 1, table: 8, mushroom: 2, fire: 5,
  };
  return m[coral];
}

export function maxColonySizeMeters(coral: CoralType): number {
  const m: Record<CoralType, number> = {
    staghorn: 3, brain: 2, table: 5, mushroom: 0.5, fire: 1,
  };
  return m[coral];
}

export function stormResistance(coral: CoralType): number {
  const m: Record<CoralType, number> = {
    staghorn: 2, brain: 10, table: 4, mushroom: 6, fire: 7,
  };
  return m[coral];
}

export function biodiversitySupport(coral: CoralType): number {
  const m: Record<CoralType, number> = {
    staghorn: 10, brain: 6, table: 9, mushroom: 4, fire: 3,
  };
  return m[coral];
}

export function depthRangeMeters(coral: CoralType): number {
  const m: Record<CoralType, number> = {
    staghorn: 30, brain: 40, table: 20, mushroom: 25, fire: 15,
  };
  return m[coral];
}

export function branching(coral: CoralType): boolean {
  const m: Record<CoralType, boolean> = {
    staghorn: true, brain: false, table: true, mushroom: false, fire: true,
  };
  return m[coral];
}

export function stinging(coral: CoralType): boolean {
  const m: Record<CoralType, boolean> = {
    staghorn: false, brain: false, table: false, mushroom: false, fire: true,
  };
  return m[coral];
}

export function reefZone(coral: CoralType): string {
  const m: Record<CoralType, string> = {
    staghorn: "fore_reef", brain: "reef_crest", table: "lagoon",
    mushroom: "back_reef", fire: "reef_flat",
  };
  return m[coral];
}

export function conservationStatus(coral: CoralType): string {
  const m: Record<CoralType, string> = {
    staghorn: "critically_endangered", brain: "near_threatened", table: "vulnerable",
    mushroom: "least_concern", fire: "least_concern",
  };
  return m[coral];
}

export function coralTypes(): CoralType[] {
  return ["staghorn", "brain", "table", "mushroom", "fire"];
}
