export type DanceStyle = "ballet" | "salsa" | "hip_hop" | "waltz" | "breakdance";

export function tempoBeatsPerMin(dance: DanceStyle): number {
  const m: Record<DanceStyle, number> = {
    ballet: 80, salsa: 180, hip_hop: 100, waltz: 90, breakdance: 120,
  };
  return m[dance];
}

export function flexibilityRequired(dance: DanceStyle): number {
  const m: Record<DanceStyle, number> = {
    ballet: 10, salsa: 5, hip_hop: 6, waltz: 3, breakdance: 9,
  };
  return m[dance];
}

export function strengthRequired(dance: DanceStyle): number {
  const m: Record<DanceStyle, number> = {
    ballet: 8, salsa: 4, hip_hop: 7, waltz: 2, breakdance: 10,
  };
  return m[dance];
}

export function learningYears(dance: DanceStyle): number {
  const m: Record<DanceStyle, number> = {
    ballet: 10, salsa: 2, hip_hop: 3, waltz: 1, breakdance: 5,
  };
  return m[dance];
}

export function caloriesPerHour(dance: DanceStyle): number {
  const m: Record<DanceStyle, number> = {
    ballet: 400, salsa: 350, hip_hop: 450, waltz: 200, breakdance: 600,
  };
  return m[dance];
}

export function partnered(dance: DanceStyle): boolean {
  const m: Record<DanceStyle, boolean> = {
    ballet: false, salsa: true, hip_hop: false, waltz: true, breakdance: false,
  };
  return m[dance];
}

export function competitive(dance: DanceStyle): boolean {
  const m: Record<DanceStyle, boolean> = {
    ballet: false, salsa: true, hip_hop: true, waltz: true, breakdance: true,
  };
  return m[dance];
}

export function originCountry(dance: DanceStyle): string {
  const m: Record<DanceStyle, string> = {
    ballet: "france", salsa: "cuba", hip_hop: "usa",
    waltz: "austria", breakdance: "usa",
  };
  return m[dance];
}

export function popularityScore(dance: DanceStyle): number {
  const m: Record<DanceStyle, number> = {
    ballet: 7, salsa: 8, hip_hop: 10, waltz: 5, breakdance: 9,
  };
  return m[dance];
}

export function danceStyles(): DanceStyle[] {
  return ["ballet", "salsa", "hip_hop", "waltz", "breakdance"];
}
