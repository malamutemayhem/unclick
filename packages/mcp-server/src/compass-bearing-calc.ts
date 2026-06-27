export type CompassType = "magnetic" | "gyroscopic" | "solar" | "astro" | "digital";

export function accuracyDegrees(compass: CompassType): number {
  const a: Record<CompassType, number> = {
    magnetic: 3, gyroscopic: 0.1, solar: 5, astro: 1, digital: 0.5,
  };
  return a[compass];
}

export function reliabilityRating(compass: CompassType): number {
  const r: Record<CompassType, number> = {
    magnetic: 7, gyroscopic: 9, solar: 4, astro: 6, digital: 8,
  };
  return r[compass];
}

export function powerRequired(compass: CompassType): boolean {
  const p: Record<CompassType, boolean> = {
    magnetic: false, gyroscopic: true, solar: false, astro: false, digital: true,
  };
  return p[compass];
}

export function weatherDependence(compass: CompassType): number {
  const w: Record<CompassType, number> = {
    magnetic: 1, gyroscopic: 0, solar: 9, astro: 8, digital: 0,
  };
  return w[compass];
}

export function polarUsable(compass: CompassType): boolean {
  const p: Record<CompassType, boolean> = {
    magnetic: false, gyroscopic: true, solar: true, astro: true, digital: true,
  };
  return p[compass];
}

export function portability(compass: CompassType): number {
  const p: Record<CompassType, number> = {
    magnetic: 10, gyroscopic: 4, solar: 8, astro: 6, digital: 9,
  };
  return p[compass];
}

export function learningCurve(compass: CompassType): number {
  const l: Record<CompassType, number> = {
    magnetic: 3, gyroscopic: 5, solar: 7, astro: 9, digital: 2,
  };
  return l[compass];
}

export function bestUseCase(compass: CompassType): string {
  const b: Record<CompassType, string> = {
    magnetic: "hiking", gyroscopic: "aviation", solar: "desert",
    astro: "ocean_sailing", digital: "geocaching",
  };
  return b[compass];
}

export function costEstimate(compass: CompassType): number {
  const c: Record<CompassType, number> = {
    magnetic: 30, gyroscopic: 5000, solar: 50, astro: 200, digital: 100,
  };
  return c[compass];
}

export function compassTypes(): CompassType[] {
  return ["magnetic", "gyroscopic", "solar", "astro", "digital"];
}
