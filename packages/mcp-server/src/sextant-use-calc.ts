export type SextantType = "marine" | "bubble" | "drum_micrometer" | "vernier" | "digital_sextant";

export function arcAccuracyMinutes(sextant: SextantType): number {
  const a: Record<SextantType, number> = {
    marine: 0.2, bubble: 2, drum_micrometer: 0.1, vernier: 1, digital_sextant: 0.1,
  };
  return a[sextant];
}

export function horizonRequired(sextant: SextantType): boolean {
  const h: Record<SextantType, boolean> = {
    marine: true, bubble: false, drum_micrometer: true, vernier: true, digital_sextant: false,
  };
  return h[sextant];
}

export function weightGrams(sextant: SextantType): number {
  const w: Record<SextantType, number> = {
    marine: 1500, bubble: 1200, drum_micrometer: 1600, vernier: 1400, digital_sextant: 800,
  };
  return w[sextant];
}

export function learningCurve(sextant: SextantType): number {
  const l: Record<SextantType, number> = {
    marine: 7, bubble: 5, drum_micrometer: 8, vernier: 6, digital_sextant: 3,
  };
  return l[sextant];
}

export function nightUsable(sextant: SextantType): boolean {
  const n: Record<SextantType, boolean> = {
    marine: true, bubble: true, drum_micrometer: true, vernier: false, digital_sextant: true,
  };
  return n[sextant];
}

export function durabilityRating(sextant: SextantType): number {
  const d: Record<SextantType, number> = {
    marine: 8, bubble: 6, drum_micrometer: 9, vernier: 7, digital_sextant: 5,
  };
  return d[sextant];
}

export function bestEnvironment(sextant: SextantType): string {
  const b: Record<SextantType, string> = {
    marine: "ocean", bubble: "aircraft", drum_micrometer: "survey",
    vernier: "coastal", digital_sextant: "recreational",
  };
  return b[sextant];
}

export function maintenanceLevel(sextant: SextantType): number {
  const m: Record<SextantType, number> = {
    marine: 6, bubble: 7, drum_micrometer: 8, vernier: 4, digital_sextant: 3,
  };
  return m[sextant];
}

export function costEstimate(sextant: SextantType): number {
  const c: Record<SextantType, number> = {
    marine: 500, bubble: 800, drum_micrometer: 2000, vernier: 300, digital_sextant: 1500,
  };
  return c[sextant];
}

export function sextantTypes(): SextantType[] {
  return ["marine", "bubble", "drum_micrometer", "vernier", "digital_sextant"];
}
