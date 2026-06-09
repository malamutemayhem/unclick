export interface NameParts {
  prefix: string;
  middle: string;
  suffix: string;
}

export type NameStyle = "fantasy" | "scifi" | "elvish" | "dwarven" | "demon" | "angelic" | "roman" | "japanese";

const PARTS: Record<NameStyle, { prefixes: string[]; middles: string[]; suffixes: string[] }> = {
  fantasy: {
    prefixes: ["Ar", "El", "Gar", "Mor", "Thr", "Val", "Bri", "Dra", "Fen", "Kor", "Lyn", "Nor", "Syl", "Tor", "Zar"],
    middles: ["an", "el", "in", "or", "un", "al", "en", "il", "on", "ur"],
    suffixes: ["dor", "wen", "mir", "dal", "gar", "iel", "oth", "ren", "wyn", "zar", "eth", "ion", "ius", "ara"],
  },
  scifi: {
    prefixes: ["Zyx", "Qor", "Nex", "Vel", "Kry", "Xan", "Pho", "Rho", "Sig", "Tau", "Vex", "Zel"],
    middles: ["ax", "ix", "ux", "ar", "or", "on", "en", "al"],
    suffixes: ["ton", "rix", "mus", "plex", "tron", "vex", "dax", "cor", "zon", "nex"],
  },
  elvish: {
    prefixes: ["Ae", "Cel", "Gal", "Lir", "Nim", "Thi", "Ela", "Ara", "Lor", "Eil", "Fae", "Sil"],
    middles: ["an", "el", "il", "ar", "ir", "ae", "ea", "ia"],
    suffixes: ["dil", "wen", "las", "riel", "dor", "mir", "thil", "iel", "wyn", "ael", "iel", "ath"],
  },
  dwarven: {
    prefixes: ["Dur", "Thr", "Gim", "Bal", "Mor", "Gor", "Bor", "Dor", "Kor", "Thor", "Brom", "Gron"],
    middles: ["in", "un", "an", "ur", "ar", "or"],
    suffixes: ["din", "gar", "rim", "rok", "dak", "grim", "dur", "thur", "nak", "bur"],
  },
  demon: {
    prefixes: ["Mal", "Bel", "Aza", "Mor", "Xar", "Zul", "Gor", "Nyx", "Vor", "Dra", "Kha", "Sha"],
    middles: ["ath", "oth", "uth", "az", "ez", "iz"],
    suffixes: ["goth", "zul", "moth", "rak", "thul", "gul", "zar", "nox", "vex", "kul"],
  },
  angelic: {
    prefixes: ["Ara", "Cel", "Gab", "Mich", "Raph", "Uri", "Ser", "Lum", "Div", "Aur", "Sol", "Lux"],
    middles: ["ae", "ie", "ia", "ea", "io", "el"],
    suffixes: ["iel", "ael", "ial", "ius", "ion", "ael", "iel", "ara", "iel", "ius"],
  },
  roman: {
    prefixes: ["Aug", "Cae", "Fab", "Jul", "Mar", "Oct", "Pom", "Ser", "Tib", "Val", "Luc", "Max"],
    middles: ["us", "ius", "anus", "us", "inus", "ius"],
    suffixes: ["ius", "us", "anus", "inus", "ulus", "icus", "atus", "inus"],
  },
  japanese: {
    prefixes: ["Aki", "Haru", "Kaze", "Mizu", "Saku", "Take", "Yuki", "Hana", "Ryu", "Asa", "Sora", "Tsu"],
    middles: ["no", "mi", "ra", "to", "ka", "ri", "hi", "ko"],
    suffixes: ["ki", "to", "ra", "mi", "shi", "ko", "ne", "ya", "ta", "ma"],
  },
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function pick<T>(arr: T[], rng: () => number): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function generateName(style: NameStyle, seed?: number): string {
  const rng = seed !== undefined ? seededRandom(seed) : Math.random;
  const parts = PARTS[style];
  const prefix = pick(parts.prefixes, rng);
  const middle = rng() > 0.4 ? pick(parts.middles, rng) : "";
  const suffix = pick(parts.suffixes, rng);
  return prefix + middle + suffix;
}

export function generateNames(style: NameStyle, count: number, seed?: number): string[] {
  const rng = seed !== undefined ? seededRandom(seed) : Math.random;
  const names: string[] = [];
  const used = new Set<string>();
  let attempts = 0;
  while (names.length < count && attempts < count * 10) {
    const parts = PARTS[style];
    const prefix = pick(parts.prefixes, rng);
    const middle = rng() > 0.4 ? pick(parts.middles, rng) : "";
    const suffix = pick(parts.suffixes, rng);
    const name = prefix + middle + suffix;
    if (!used.has(name)) {
      used.add(name);
      names.push(name);
    }
    attempts++;
  }
  return names;
}

export function generateFullName(style: NameStyle, seed?: number): { firstName: string; lastName: string } {
  const s = seed ?? Math.floor(Math.random() * 1e9);
  return {
    firstName: generateName(style, s),
    lastName: generateName(style, s + 1000),
  };
}

export function getStyles(): NameStyle[] {
  return Object.keys(PARTS) as NameStyle[];
}

export function blendStyles(style1: NameStyle, style2: NameStyle, seed?: number): string {
  const rng = seed !== undefined ? seededRandom(seed) : Math.random;
  const p1 = PARTS[style1];
  const p2 = PARTS[style2];
  const prefix = pick(p1.prefixes, rng);
  const middle = pick(rng() > 0.5 ? p1.middles : p2.middles, rng);
  const suffix = pick(p2.suffixes, rng);
  return prefix + middle + suffix;
}

export function syllableCount(name: string): number {
  const vowels = name.toLowerCase().match(/[aeiou]+/g);
  return vowels ? vowels.length : 1;
}

export function nameLength(name: string): number {
  return name.length;
}

export function alliterate(style: NameStyle, letter: string, count: number, seed?: number): string[] {
  const rng = seed !== undefined ? seededRandom(seed) : Math.random;
  const parts = PARTS[style];
  const matching = parts.prefixes.filter(p => p.toLowerCase().startsWith(letter.toLowerCase()));
  if (matching.length === 0) return [];

  const names: string[] = [];
  const used = new Set<string>();
  let attempts = 0;
  while (names.length < count && attempts < count * 20) {
    const prefix = pick(matching, rng);
    const middle = rng() > 0.4 ? pick(parts.middles, rng) : "";
    const suffix = pick(parts.suffixes, rng);
    const name = prefix + middle + suffix;
    if (!used.has(name)) {
      used.add(name);
      names.push(name);
    }
    attempts++;
  }
  return names;
}
