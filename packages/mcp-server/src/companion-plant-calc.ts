export type CompanionPair = "tomato_basil" | "corn_beans" | "carrot_onion" | "rose_garlic" | "squash_nasturtium";

export function growthBoostPercent(pair: CompanionPair): number {
  const g: Record<CompanionPair, number> = {
    tomato_basil: 15, corn_beans: 20, carrot_onion: 10, rose_garlic: 8, squash_nasturtium: 12,
  };
  return g[pair];
}

export function pestReduction(pair: CompanionPair): number {
  const p: Record<CompanionPair, number> = {
    tomato_basil: 7, corn_beans: 5, carrot_onion: 8, rose_garlic: 9, squash_nasturtium: 10,
  };
  return p[pair];
}

export function spacingCm(pair: CompanionPair): number {
  const s: Record<CompanionPair, number> = {
    tomato_basil: 30, corn_beans: 20, carrot_onion: 15, rose_garlic: 25, squash_nasturtium: 40,
  };
  return s[pair];
}

export function nitrogenFixing(pair: CompanionPair): boolean {
  const n: Record<CompanionPair, boolean> = {
    tomato_basil: false, corn_beans: true, carrot_onion: false, rose_garlic: false, squash_nasturtium: false,
  };
  return n[pair];
}

export function pollinatorAttraction(pair: CompanionPair): number {
  const p: Record<CompanionPair, number> = {
    tomato_basil: 6, corn_beans: 3, carrot_onion: 4, rose_garlic: 7, squash_nasturtium: 9,
  };
  return p[pair];
}

export function soilImprovement(pair: CompanionPair): number {
  const s: Record<CompanionPair, number> = {
    tomato_basil: 4, corn_beans: 9, carrot_onion: 5, rose_garlic: 3, squash_nasturtium: 6,
  };
  return s[pair];
}

export function traditionalOrigin(pair: CompanionPair): string {
  const t: Record<CompanionPair, string> = {
    tomato_basil: "mediterranean", corn_beans: "mesoamerican", carrot_onion: "european",
    rose_garlic: "persian", squash_nasturtium: "andean",
  };
  return t[pair];
}

export function seasonOverlap(pair: CompanionPair): number {
  const s: Record<CompanionPair, number> = {
    tomato_basil: 8, corn_beans: 9, carrot_onion: 7, rose_garlic: 10, squash_nasturtium: 8,
  };
  return s[pair];
}

export function difficultyRating(pair: CompanionPair): number {
  const d: Record<CompanionPair, number> = {
    tomato_basil: 2, corn_beans: 4, carrot_onion: 3, rose_garlic: 2, squash_nasturtium: 1,
  };
  return d[pair];
}

export function companionPairs(): CompanionPair[] {
  return ["tomato_basil", "corn_beans", "carrot_onion", "rose_garlic", "squash_nasturtium"];
}
