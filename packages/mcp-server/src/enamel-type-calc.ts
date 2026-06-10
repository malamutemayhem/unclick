export type EnamelType = "cloisonne" | "champleve" | "plique_a_jour" | "painted" | "vitreous";

export function firingTempCelsius(enamel: EnamelType): number {
  const m: Record<EnamelType, number> = {
    cloisonne: 800, champleve: 820, plique_a_jour: 780, painted: 750, vitreous: 850,
  };
  return m[enamel];
}

export function detailResolution(enamel: EnamelType): number {
  const m: Record<EnamelType, number> = {
    cloisonne: 9, champleve: 7, plique_a_jour: 8, painted: 10, vitreous: 5,
  };
  return m[enamel];
}

export function durabilityYears(enamel: EnamelType): number {
  const m: Record<EnamelType, number> = {
    cloisonne: 500, champleve: 400, plique_a_jour: 200, painted: 100, vitreous: 50,
  };
  return m[enamel];
}

export function craftDifficulty(enamel: EnamelType): number {
  const m: Record<EnamelType, number> = {
    cloisonne: 8, champleve: 7, plique_a_jour: 10, painted: 6, vitreous: 4,
  };
  return m[enamel];
}

export function colorVibrancy(enamel: EnamelType): number {
  const m: Record<EnamelType, number> = {
    cloisonne: 9, champleve: 8, plique_a_jour: 10, painted: 7, vitreous: 6,
  };
  return m[enamel];
}

export function translucent(enamel: EnamelType): boolean {
  const m: Record<EnamelType, boolean> = {
    cloisonne: false, champleve: false, plique_a_jour: true, painted: false, vitreous: false,
  };
  return m[enamel];
}

export function requiresMetal(enamel: EnamelType): boolean {
  const m: Record<EnamelType, boolean> = {
    cloisonne: true, champleve: true, plique_a_jour: true, painted: false, vitreous: true,
  };
  return m[enamel];
}

export function bestApplication(enamel: EnamelType): string {
  const m: Record<EnamelType, string> = {
    cloisonne: "jewelry", champleve: "plaques", plique_a_jour: "stained_glass_effect",
    painted: "miniatures", vitreous: "bathtubs",
  };
  return m[enamel];
}

export function collectorsValue(enamel: EnamelType): number {
  const m: Record<EnamelType, number> = {
    cloisonne: 9, champleve: 8, plique_a_jour: 10, painted: 6, vitreous: 2,
  };
  return m[enamel];
}

export function enamelTypes(): EnamelType[] {
  return ["cloisonne", "champleve", "plique_a_jour", "painted", "vitreous"];
}
