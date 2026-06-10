export type TideType = "semidiurnal" | "diurnal" | "mixed" | "meteorological" | "neap";

export function cyclesPerDay(tide: TideType): number {
  const c: Record<TideType, number> = {
    semidiurnal: 2, diurnal: 1, mixed: 2, meteorological: 0, neap: 2,
  };
  return c[tide];
}

export function amplitudeMeters(tide: TideType): number {
  const a: Record<TideType, number> = {
    semidiurnal: 3, diurnal: 1.5, mixed: 2, meteorological: 0.5, neap: 1,
  };
  return a[tide];
}

export function predictability(tide: TideType): number {
  const p: Record<TideType, number> = {
    semidiurnal: 9, diurnal: 8, mixed: 6, meteorological: 2, neap: 9,
  };
  return p[tide];
}

export function lunarInfluence(tide: TideType): number {
  const l: Record<TideType, number> = {
    semidiurnal: 10, diurnal: 8, mixed: 9, meteorological: 1, neap: 7,
  };
  return l[tide];
}

export function currentStrength(tide: TideType): number {
  const c: Record<TideType, number> = {
    semidiurnal: 7, diurnal: 4, mixed: 5, meteorological: 3, neap: 2,
  };
  return c[tide];
}

export function windDriven(tide: TideType): boolean {
  const w: Record<TideType, boolean> = {
    semidiurnal: false, diurnal: false, mixed: false, meteorological: true, neap: false,
  };
  return w[tide];
}

export function bestActivity(tide: TideType): string {
  const b: Record<TideType, string> = {
    semidiurnal: "fishing", diurnal: "beachcombing", mixed: "surfing",
    meteorological: "storm_watching", neap: "scuba_diving",
  };
  return b[tide];
}

export function navigationHazard(tide: TideType): number {
  const n: Record<TideType, number> = {
    semidiurnal: 6, diurnal: 3, mixed: 5, meteorological: 8, neap: 2,
  };
  return n[tide];
}

export function commonRegion(tide: TideType): string {
  const c: Record<TideType, string> = {
    semidiurnal: "atlantic", diurnal: "gulf_of_mexico", mixed: "pacific",
    meteorological: "baltic", neap: "any",
  };
  return c[tide];
}

export function tideTypes(): TideType[] {
  return ["semidiurnal", "diurnal", "mixed", "meteorological", "neap"];
}
