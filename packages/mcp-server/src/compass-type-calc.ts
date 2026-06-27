export type CompassType = "magnetic" | "gyroscopic" | "solar" | "astro" | "digital";

export function accuracyDegrees(comp: CompassType): number {
  const m: Record<CompassType, number> = {
    magnetic: 3, gyroscopic: 0.5, solar: 5, astro: 2, digital: 1,
  };
  return m[comp];
}

export function reliabilityScore(comp: CompassType): number {
  const m: Record<CompassType, number> = {
    magnetic: 8, gyroscopic: 9, solar: 4, astro: 5, digital: 7,
  };
  return m[comp];
}

export function portability(comp: CompassType): number {
  const m: Record<CompassType, number> = {
    magnetic: 10, gyroscopic: 4, solar: 8, astro: 6, digital: 9,
  };
  return m[comp];
}

export function powerRequirement(comp: CompassType): number {
  const m: Record<CompassType, number> = {
    magnetic: 0, gyroscopic: 8, solar: 0, astro: 0, digital: 5,
  };
  return m[comp];
}

export function costRating(comp: CompassType): number {
  const m: Record<CompassType, number> = {
    magnetic: 2, gyroscopic: 10, solar: 1, astro: 3, digital: 5,
  };
  return m[comp];
}

export function worksAtPoles(comp: CompassType): boolean {
  const m: Record<CompassType, boolean> = {
    magnetic: false, gyroscopic: true, solar: true, astro: true, digital: false,
  };
  return m[comp];
}

export function needsBattery(comp: CompassType): boolean {
  const m: Record<CompassType, boolean> = {
    magnetic: false, gyroscopic: true, solar: false, astro: false, digital: true,
  };
  return m[comp];
}

export function bestApplication(comp: CompassType): string {
  const m: Record<CompassType, string> = {
    magnetic: "hiking", gyroscopic: "ship_navigation", solar: "wilderness",
    astro: "astronomy", digital: "smartphone",
  };
  return m[comp];
}

export function inventionCentury(comp: CompassType): number {
  const m: Record<CompassType, number> = {
    magnetic: 11, gyroscopic: 19, solar: 0, astro: 0, digital: 20,
  };
  return m[comp];
}

export function compassTypes(): CompassType[] {
  return ["magnetic", "gyroscopic", "solar", "astro", "digital"];
}
