export type GutStringAnimal = "sheep" | "cattle" | "goat" | "cat" | "hog";

export function tensileStrengthMpa(animal: GutStringAnimal): number {
  const t: Record<GutStringAnimal, number> = {
    sheep: 300, cattle: 280, goat: 320, cat: 350, hog: 250,
  };
  return t[animal];
}

export function diameterMm(animal: GutStringAnimal): number {
  const d: Record<GutStringAnimal, number> = {
    sheep: 0.7, cattle: 1.2, goat: 0.6, cat: 0.5, hog: 1.0,
  };
  return d[animal];
}

export function brightnessRating(animal: GutStringAnimal): number {
  const b: Record<GutStringAnimal, number> = {
    sheep: 7, cattle: 5, goat: 8, cat: 9, hog: 4,
  };
  return b[animal];
}

export function warmthRating(animal: GutStringAnimal): number {
  const w: Record<GutStringAnimal, number> = {
    sheep: 8, cattle: 6, goat: 7, cat: 5, hog: 9,
  };
  return w[animal];
}

export function humiditySensitivity(animal: GutStringAnimal): number {
  const h: Record<GutStringAnimal, number> = {
    sheep: 7, cattle: 5, goat: 8, cat: 9, hog: 4,
  };
  return h[animal];
}

export function stretchPercent(animal: GutStringAnimal): number {
  const s: Record<GutStringAnimal, number> = {
    sheep: 12, cattle: 8, goat: 14, cat: 16, hog: 6,
  };
  return s[animal];
}

export function processingDays(animal: GutStringAnimal): number {
  const p: Record<GutStringAnimal, number> = {
    sheep: 14, cattle: 21, goat: 12, cat: 10, hog: 18,
  };
  return p[animal];
}

export function bestForInstrument(animal: GutStringAnimal): string {
  const b: Record<GutStringAnimal, string> = {
    sheep: "violin", cattle: "harp", goat: "lute", cat: "baroque_violin", hog: "bass",
  };
  return b[animal];
}

export function costPerMeter(animal: GutStringAnimal): number {
  const c: Record<GutStringAnimal, number> = {
    sheep: 15, cattle: 10, goat: 18, cat: 25, hog: 8,
  };
  return c[animal];
}

export function gutStringAnimals(): GutStringAnimal[] {
  return ["sheep", "cattle", "goat", "cat", "hog"];
}
