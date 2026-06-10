export type CrystalHabit = "prismatic" | "tabular" | "acicular" | "botryoidal" | "massive";

export function symmetryScore(h: CrystalHabit): number {
  const m: Record<CrystalHabit, number> = {
    prismatic: 8, tabular: 7, acicular: 5, botryoidal: 3, massive: 1,
  };
  return m[h];
}

export function collectibility(h: CrystalHabit): number {
  const m: Record<CrystalHabit, number> = {
    prismatic: 9, tabular: 7, acicular: 8, botryoidal: 6, massive: 3,
  };
  return m[h];
}

export function fragility(h: CrystalHabit): number {
  const m: Record<CrystalHabit, number> = {
    prismatic: 5, tabular: 6, acicular: 9, botryoidal: 3, massive: 2,
  };
  return m[h];
}

export function displayQuality(h: CrystalHabit): number {
  const m: Record<CrystalHabit, number> = {
    prismatic: 9, tabular: 7, acicular: 8, botryoidal: 6, massive: 2,
  };
  return m[h];
}

export function formationTime(h: CrystalHabit): number {
  const m: Record<CrystalHabit, number> = {
    prismatic: 7, tabular: 6, acicular: 5, botryoidal: 8, massive: 9,
  };
  return m[h];
}

export function hasDefinedFaces(h: CrystalHabit): boolean {
  const m: Record<CrystalHabit, boolean> = {
    prismatic: true, tabular: true, acicular: true, botryoidal: false, massive: false,
  };
  return m[h];
}

export function commonInCollections(h: CrystalHabit): boolean {
  const m: Record<CrystalHabit, boolean> = {
    prismatic: true, tabular: true, acicular: true, botryoidal: true, massive: false,
  };
  return m[h];
}

export function exampleMineral(h: CrystalHabit): string {
  const m: Record<CrystalHabit, string> = {
    prismatic: "tourmaline_beryl", tabular: "barite_feldspar",
    acicular: "rutile_natrolite", botryoidal: "malachite_hematite",
    massive: "jasper_quartzite",
  };
  return m[h];
}

export function growthPattern(h: CrystalHabit): string {
  const m: Record<CrystalHabit, string> = {
    prismatic: "elongated_columns", tabular: "flat_plates",
    acicular: "needle_like", botryoidal: "rounded_globular",
    massive: "no_distinct_form",
  };
  return m[h];
}

export function crystalHabits(): CrystalHabit[] {
  return ["prismatic", "tabular", "acicular", "botryoidal", "massive"];
}
