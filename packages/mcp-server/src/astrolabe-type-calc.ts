export type AstrolabeType = "planispheric" | "mariner" | "universal" | "spherical" | "quadrant";

export function starCount(astrolabe: AstrolabeType): number {
  const m: Record<AstrolabeType, number> = {
    planispheric: 30, mariner: 15, universal: 40, spherical: 50, quadrant: 10,
  };
  return m[astrolabe];
}

export function latitudeRange(astrolabe: AstrolabeType): number {
  const m: Record<AstrolabeType, number> = {
    planispheric: 3, mariner: 5, universal: 9, spherical: 8, quadrant: 4,
  };
  return m[astrolabe];
}

export function portability(astrolabe: AstrolabeType): number {
  const m: Record<AstrolabeType, number> = {
    planispheric: 7, mariner: 8, universal: 5, spherical: 3, quadrant: 9,
  };
  return m[astrolabe];
}

export function craftComplexity(astrolabe: AstrolabeType): number {
  const m: Record<AstrolabeType, number> = {
    planispheric: 7, mariner: 5, universal: 9, spherical: 10, quadrant: 4,
  };
  return m[astrolabe];
}

export function altitudeMeasurement(astrolabe: AstrolabeType): number {
  const m: Record<AstrolabeType, number> = {
    planispheric: 7, mariner: 8, universal: 7, spherical: 6, quadrant: 9,
  };
  return m[astrolabe];
}

export function timekeeping(astrolabe: AstrolabeType): boolean {
  const m: Record<AstrolabeType, boolean> = {
    planispheric: true, mariner: false, universal: true, spherical: true, quadrant: false,
  };
  return m[astrolabe];
}

export function navigation(astrolabe: AstrolabeType): boolean {
  const m: Record<AstrolabeType, boolean> = {
    planispheric: false, mariner: true, universal: true, spherical: false, quadrant: true,
  };
  return m[astrolabe];
}

export function bestEra(astrolabe: AstrolabeType): string {
  const m: Record<AstrolabeType, string> = {
    planispheric: "islamic_golden_age", mariner: "age_of_exploration",
    universal: "renaissance", spherical: "hellenistic", quadrant: "medieval",
  };
  return m[astrolabe];
}

export function craftCost(astrolabe: AstrolabeType): number {
  const m: Record<AstrolabeType, number> = {
    planispheric: 500, mariner: 300, universal: 800, spherical: 1200, quadrant: 200,
  };
  return m[astrolabe];
}

export function astrolabeTypes(): AstrolabeType[] {
  return ["planispheric", "mariner", "universal", "spherical", "quadrant"];
}
