export type SpiritCut = "foreshots" | "heads" | "hearts" | "tails" | "feints";

export function abvRangeHigh(cut: SpiritCut): number {
  const a: Record<SpiritCut, number> = {
    foreshots: 85, heads: 80, hearts: 70, tails: 55, feints: 45,
  };
  return a[cut];
}

export function volumePercent(cut: SpiritCut): number {
  const v: Record<SpiritCut, number> = {
    foreshots: 1, heads: 10, hearts: 30, tails: 25, feints: 34,
  };
  return v[cut];
}

export function flavorQuality(cut: SpiritCut): number {
  const f: Record<SpiritCut, number> = {
    foreshots: 0, heads: 4, hearts: 10, tails: 5, feints: 2,
  };
  return f[cut];
}

export function toxicCompounds(cut: SpiritCut): number {
  const t: Record<SpiritCut, number> = {
    foreshots: 10, heads: 6, hearts: 1, tails: 3, feints: 4,
  };
  return t[cut];
}

export function drinkable(cut: SpiritCut): boolean {
  const d: Record<SpiritCut, boolean> = {
    foreshots: false, heads: false, hearts: true, tails: false, feints: false,
  };
  return d[cut];
}

export function redistillable(cut: SpiritCut): boolean {
  const r: Record<SpiritCut, boolean> = {
    foreshots: false, heads: true, hearts: false, tails: true, feints: true,
  };
  return r[cut];
}

export function collectionOrder(cut: SpiritCut): number {
  const o: Record<SpiritCut, number> = {
    foreshots: 1, heads: 2, hearts: 3, tails: 4, feints: 5,
  };
  return o[cut];
}

export function aromaCharacter(cut: SpiritCut): string {
  const a: Record<SpiritCut, string> = {
    foreshots: "solvent", heads: "fruity_sharp", hearts: "clean_smooth",
    tails: "oily_heavy", feints: "bitter_harsh",
  };
  return a[cut];
}

export function valueRating(cut: SpiritCut): number {
  const v: Record<SpiritCut, number> = {
    foreshots: 0, heads: 3, hearts: 10, tails: 4, feints: 2,
  };
  return v[cut];
}

export function spiritCuts(): SpiritCut[] {
  return ["foreshots", "heads", "hearts", "tails", "feints"];
}
