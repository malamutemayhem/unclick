export type PollinatorType = "honeybee" | "bumblebee" | "butterfly" | "hoverfly" | "wasp";

export function pollinationEfficiency(p: PollinatorType): number {
  const m: Record<PollinatorType, number> = {
    honeybee: 10, bumblebee: 9, butterfly: 5, hoverfly: 6, wasp: 4,
  };
  return m[p];
}

export function flightRange(p: PollinatorType): number {
  const m: Record<PollinatorType, number> = {
    honeybee: 8, bumblebee: 5, butterfly: 9, hoverfly: 4, wasp: 6,
  };
  return m[p];
}

export function coldTolerance(p: PollinatorType): number {
  const m: Record<PollinatorType, number> = {
    honeybee: 5, bumblebee: 10, butterfly: 3, hoverfly: 6, wasp: 4,
  };
  return m[p];
}

export function cropImportance(p: PollinatorType): number {
  const m: Record<PollinatorType, number> = {
    honeybee: 10, bumblebee: 8, butterfly: 4, hoverfly: 6, wasp: 3,
  };
  return m[p];
}

export function flowerSpecificity(p: PollinatorType): number {
  const m: Record<PollinatorType, number> = {
    honeybee: 4, bumblebee: 6, butterfly: 8, hoverfly: 3, wasp: 5,
  };
  return m[p];
}

export function socialInsect(p: PollinatorType): boolean {
  const m: Record<PollinatorType, boolean> = {
    honeybee: true, bumblebee: true, butterfly: false, hoverfly: false, wasp: true,
  };
  return m[p];
}

export function producesHoney(p: PollinatorType): boolean {
  const m: Record<PollinatorType, boolean> = {
    honeybee: true, bumblebee: false, butterfly: false, hoverfly: false, wasp: false,
  };
  return m[p];
}

export function preferredFlower(p: PollinatorType): string {
  const m: Record<PollinatorType, string> = {
    honeybee: "open_clustered_flowers", bumblebee: "deep_tubular_flowers",
    butterfly: "flat_topped_bright_colored", hoverfly: "small_open_umbels",
    wasp: "shallow_accessible_nectar",
  };
  return m[p];
}

export function activeSeason(p: PollinatorType): string {
  const m: Record<PollinatorType, string> = {
    honeybee: "spring_through_fall", bumblebee: "early_spring_late_fall",
    butterfly: "summer_peak", hoverfly: "spring_through_fall",
    wasp: "late_summer_fall",
  };
  return m[p];
}

export function pollinatorTypes(): PollinatorType[] {
  return ["honeybee", "bumblebee", "butterfly", "hoverfly", "wasp"];
}
