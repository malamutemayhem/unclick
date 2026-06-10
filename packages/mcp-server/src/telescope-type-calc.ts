export type TelescopeType = "refractor" | "reflector" | "catadioptric" | "radio" | "space";

export function apertureRangeCm(t: TelescopeType): number {
  const m: Record<TelescopeType, number> = {
    refractor: 15, reflector: 30, catadioptric: 20, radio: 10000, space: 240,
  };
  return m[t];
}

export function imageSharpness(t: TelescopeType): number {
  const m: Record<TelescopeType, number> = {
    refractor: 9, reflector: 7, catadioptric: 8, radio: 4, space: 10,
  };
  return m[t];
}

export function portability(t: TelescopeType): number {
  const m: Record<TelescopeType, number> = {
    refractor: 7, reflector: 5, catadioptric: 8, radio: 1, space: 0,
  };
  return m[t];
}

export function lightGathering(t: TelescopeType): number {
  const m: Record<TelescopeType, number> = {
    refractor: 5, reflector: 8, catadioptric: 7, radio: 3, space: 10,
  };
  return m[t];
}

export function costPerformanceRatio(t: TelescopeType): number {
  const m: Record<TelescopeType, number> = {
    refractor: 6, reflector: 9, catadioptric: 7, radio: 3, space: 1,
  };
  return m[t];
}

export function usesLenses(t: TelescopeType): boolean {
  const m: Record<TelescopeType, boolean> = {
    refractor: true, reflector: false, catadioptric: true, radio: false, space: false,
  };
  return m[t];
}

export function groundBased(t: TelescopeType): boolean {
  const m: Record<TelescopeType, boolean> = {
    refractor: true, reflector: true, catadioptric: true, radio: true, space: false,
  };
  return m[t];
}

export function bestTarget(t: TelescopeType): string {
  const m: Record<TelescopeType, string> = {
    refractor: "planets", reflector: "deep_sky",
    catadioptric: "astrophotography", radio: "pulsars",
    space: "distant_galaxies",
  };
  return m[t];
}

export function exampleTelescope(t: TelescopeType): string {
  const m: Record<TelescopeType, string> = {
    refractor: "galilean", reflector: "newtonian",
    catadioptric: "schmidt_cassegrain", radio: "arecibo",
    space: "james_webb",
  };
  return m[t];
}

export function telescopeTypes(): TelescopeType[] {
  return ["refractor", "reflector", "catadioptric", "radio", "space"];
}
