export type FirewoodSpecies = "white_oak" | "sugar_maple" | "birch" | "pine" | "ash";

export function btuPerCord(species: FirewoodSpecies): number {
  const b: Record<FirewoodSpecies, number> = {
    white_oak: 29, sugar_maple: 24, birch: 20, pine: 15, ash: 24,
  };
  return b[species];
}

export function seasoningMonths(species: FirewoodSpecies): number {
  const s: Record<FirewoodSpecies, number> = {
    white_oak: 24, sugar_maple: 12, birch: 6, pine: 6, ash: 8,
  };
  return s[species];
}

export function sparkLevel(species: FirewoodSpecies): number {
  const s: Record<FirewoodSpecies, number> = {
    white_oak: 2, sugar_maple: 3, birch: 4, pine: 8, ash: 1,
  };
  return s[species];
}

export function coalQuality(species: FirewoodSpecies): number {
  const c: Record<FirewoodSpecies, number> = {
    white_oak: 10, sugar_maple: 8, birch: 4, pine: 2, ash: 7,
  };
  return c[species];
}

export function splitEase(species: FirewoodSpecies): number {
  const s: Record<FirewoodSpecies, number> = {
    white_oak: 5, sugar_maple: 6, birch: 8, pine: 9, ash: 10,
  };
  return s[species];
}

export function creosoteRisk(species: FirewoodSpecies): number {
  const c: Record<FirewoodSpecies, number> = {
    white_oak: 2, sugar_maple: 3, birch: 5, pine: 9, ash: 2,
  };
  return c[species];
}

export function aromaRating(species: FirewoodSpecies): number {
  const a: Record<FirewoodSpecies, number> = {
    white_oak: 6, sugar_maple: 8, birch: 7, pine: 5, ash: 4,
  };
  return a[species];
}

export function densityKgPerM3(species: FirewoodSpecies): number {
  const d: Record<FirewoodSpecies, number> = {
    white_oak: 770, sugar_maple: 700, birch: 560, pine: 420, ash: 640,
  };
  return d[species];
}

export function costPerCord(species: FirewoodSpecies): number {
  const c: Record<FirewoodSpecies, number> = {
    white_oak: 300, sugar_maple: 280, birch: 200, pine: 150, ash: 250,
  };
  return c[species];
}

export function firewoodSpecies(): FirewoodSpecies[] {
  return ["white_oak", "sugar_maple", "birch", "pine", "ash"];
}
