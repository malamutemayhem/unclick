export type WaterProfile = "pilsen" | "burton" | "dublin" | "munich" | "vienna";

export function calciumPpm(profile: WaterProfile): number {
  const c: Record<WaterProfile, number> = {
    pilsen: 7, burton: 275, dublin: 120, munich: 75, vienna: 200,
  };
  return c[profile];
}

export function sulfatePpm(profile: WaterProfile): number {
  const s: Record<WaterProfile, number> = {
    pilsen: 5, burton: 725, dublin: 55, munich: 10, vienna: 125,
  };
  return s[profile];
}

export function chloridePpm(profile: WaterProfile): number {
  const c: Record<WaterProfile, number> = {
    pilsen: 5, burton: 35, dublin: 20, munich: 2, vienna: 12,
  };
  return c[profile];
}

export function bicarbonatePpm(profile: WaterProfile): number {
  const b: Record<WaterProfile, number> = {
    pilsen: 15, burton: 260, dublin: 315, munich: 150, vienna: 120,
  };
  return b[profile];
}

export function magnesiumPpm(profile: WaterProfile): number {
  const m: Record<WaterProfile, number> = {
    pilsen: 2, burton: 40, dublin: 4, munich: 18, vienna: 60,
  };
  return m[profile];
}

export function hardnessRating(profile: WaterProfile): number {
  const h: Record<WaterProfile, number> = {
    pilsen: 1, burton: 10, dublin: 7, munich: 5, vienna: 8,
  };
  return h[profile];
}

export function hopAccentuation(profile: WaterProfile): number {
  const a: Record<WaterProfile, number> = {
    pilsen: 2, burton: 10, dublin: 3, munich: 2, vienna: 6,
  };
  return a[profile];
}

export function bestBeerStyle(profile: WaterProfile): string {
  const b: Record<WaterProfile, string> = {
    pilsen: "pilsner", burton: "ipa", dublin: "stout",
    munich: "dunkel", vienna: "vienna_lager",
  };
  return b[profile];
}

export function treatmentDifficulty(profile: WaterProfile): number {
  const t: Record<WaterProfile, number> = {
    pilsen: 2, burton: 8, dublin: 6, munich: 4, vienna: 5,
  };
  return t[profile];
}

export function waterProfiles(): WaterProfile[] {
  return ["pilsen", "burton", "dublin", "munich", "vienna"];
}
