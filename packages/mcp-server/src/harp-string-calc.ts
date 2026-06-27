export type HarpSize = "lap" | "celtic" | "lever" | "pedal" | "wire_strung";

export function stringCount(size: HarpSize): number {
  const s: Record<HarpSize, number> = {
    lap: 15, celtic: 26, lever: 34, pedal: 47, wire_strung: 30,
  };
  return s[size];
}

export function octaveRange(size: HarpSize): number {
  const o: Record<HarpSize, number> = {
    lap: 2, celtic: 3.5, lever: 5, pedal: 6.5, wire_strung: 4,
  };
  return o[size];
}

export function heightCm(size: HarpSize): number {
  const h: Record<HarpSize, number> = {
    lap: 60, celtic: 90, lever: 130, pedal: 180, wire_strung: 100,
  };
  return h[size];
}

export function weightKg(size: HarpSize): number {
  const w: Record<HarpSize, number> = {
    lap: 3, celtic: 7, lever: 15, pedal: 40, wire_strung: 12,
  };
  return w[size];
}

export function portability(size: HarpSize): number {
  const p: Record<HarpSize, number> = {
    lap: 10, celtic: 7, lever: 4, pedal: 1, wire_strung: 5,
  };
  return p[size];
}

export function chromaticCapable(size: HarpSize): boolean {
  const c: Record<HarpSize, boolean> = {
    lap: false, celtic: false, lever: true, pedal: true, wire_strung: false,
  };
  return c[size];
}

export function sustainCharacter(size: HarpSize): number {
  const s: Record<HarpSize, number> = {
    lap: 4, celtic: 6, lever: 7, pedal: 9, wire_strung: 10,
  };
  return s[size];
}

export function bestGenre(size: HarpSize): string {
  const b: Record<HarpSize, string> = {
    lap: "folk", celtic: "celtic", lever: "classical",
    pedal: "orchestral", wire_strung: "early_music",
  };
  return b[size];
}

export function costEstimate(size: HarpSize): number {
  const c: Record<HarpSize, number> = {
    lap: 300, celtic: 800, lever: 3000, pedal: 15000, wire_strung: 2000,
  };
  return c[size];
}

export function harpSizes(): HarpSize[] {
  return ["lap", "celtic", "lever", "pedal", "wire_strung"];
}
