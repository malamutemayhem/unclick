export type MadderSpecies = "rubia_tinctorum" | "rubia_cordifolia" | "galium" | "morinda" | "rubia_peregrina";

export function rootAgeYears(species: MadderSpecies): number {
  const a: Record<MadderSpecies, number> = {
    rubia_tinctorum: 3, rubia_cordifolia: 2, galium: 1, morinda: 4, rubia_peregrina: 2,
  };
  return a[species];
}

export function colorHue(species: MadderSpecies): string {
  const h: Record<MadderSpecies, string> = {
    rubia_tinctorum: "turkey_red", rubia_cordifolia: "rose_red",
    galium: "coral_pink", morinda: "brick_red", rubia_peregrina: "salmon",
  };
  return h[species];
}

export function lightfastness(species: MadderSpecies): number {
  const l: Record<MadderSpecies, number> = {
    rubia_tinctorum: 8, rubia_cordifolia: 7, galium: 4, morinda: 9, rubia_peregrina: 6,
  };
  return l[species];
}

export function mordantRequired(species: MadderSpecies): boolean {
  return true;
}

export function dyeBathTempCelsius(species: MadderSpecies): number {
  const t: Record<MadderSpecies, number> = {
    rubia_tinctorum: 70, rubia_cordifolia: 60, galium: 50, morinda: 80, rubia_peregrina: 65,
  };
  return t[species];
}

export function alizarinPercent(species: MadderSpecies): number {
  const a: Record<MadderSpecies, number> = {
    rubia_tinctorum: 3.5, rubia_cordifolia: 2.0, galium: 0.5, morinda: 1.5, rubia_peregrina: 1.0,
  };
  return a[species];
}

export function yieldGramsPerKgRoot(species: MadderSpecies): number {
  const y: Record<MadderSpecies, number> = {
    rubia_tinctorum: 35, rubia_cordifolia: 25, galium: 10, morinda: 20, rubia_peregrina: 15,
  };
  return y[species];
}

export function washFastness(species: MadderSpecies): number {
  const w: Record<MadderSpecies, number> = {
    rubia_tinctorum: 8, rubia_cordifolia: 7, galium: 5, morinda: 9, rubia_peregrina: 6,
  };
  return w[species];
}

export function costPerKg(species: MadderSpecies): number {
  const c: Record<MadderSpecies, number> = {
    rubia_tinctorum: 40, rubia_cordifolia: 35, galium: 20, morinda: 50, rubia_peregrina: 30,
  };
  return c[species];
}

export function madderSpecies(): MadderSpecies[] {
  return ["rubia_tinctorum", "rubia_cordifolia", "galium", "morinda", "rubia_peregrina"];
}
