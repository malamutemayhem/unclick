export type AnimalBreedGroup = "herding" | "sporting" | "working" | "toy" | "hound";

export function avgWeightKg(a: AnimalBreedGroup): number {
  const m: Record<AnimalBreedGroup, number> = {
    herding: 30, sporting: 28, working: 45, toy: 4, hound: 25,
  };
  return m[a];
}

export function exerciseNeedHours(a: AnimalBreedGroup): number {
  const m: Record<AnimalBreedGroup, number> = {
    herding: 9, sporting: 10, working: 7, toy: 3, hound: 8,
  };
  return m[a];
}

export function trainabilityScore(a: AnimalBreedGroup): number {
  const m: Record<AnimalBreedGroup, number> = {
    herding: 10, sporting: 8, working: 7, toy: 4, hound: 5,
  };
  return m[a];
}

export function groomingNeed(a: AnimalBreedGroup): number {
  const m: Record<AnimalBreedGroup, number> = {
    herding: 7, sporting: 6, working: 5, toy: 8, hound: 3,
  };
  return m[a];
}

export function avgLifespanYears(a: AnimalBreedGroup): number {
  const m: Record<AnimalBreedGroup, number> = {
    herding: 13, sporting: 12, working: 10, toy: 15, hound: 12,
  };
  return m[a];
}

export function goodWithChildren(a: AnimalBreedGroup): boolean {
  const m: Record<AnimalBreedGroup, boolean> = {
    herding: true, sporting: true, working: false, toy: false, hound: true,
  };
  return m[a];
}

export function apartmentSuitable(a: AnimalBreedGroup): boolean {
  const m: Record<AnimalBreedGroup, boolean> = {
    herding: false, sporting: false, working: false, toy: true, hound: false,
  };
  return m[a];
}

export function originalPurpose(a: AnimalBreedGroup): string {
  const m: Record<AnimalBreedGroup, string> = {
    herding: "livestock_management", sporting: "game_retrieval",
    working: "guarding_pulling", toy: "companionship", hound: "tracking_hunting",
  };
  return m[a];
}

export function exampleBreed(a: AnimalBreedGroup): string {
  const m: Record<AnimalBreedGroup, string> = {
    herding: "border_collie", sporting: "golden_retriever",
    working: "rottweiler", toy: "chihuahua", hound: "beagle",
  };
  return m[a];
}

export function animalBreedGroups(): AnimalBreedGroup[] {
  return ["herding", "sporting", "working", "toy", "hound"];
}
