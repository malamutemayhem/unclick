export type MegalithType = "menhir" | "dolmen" | "stone_circle" | "passage_tomb" | "trilithon";

export function heightMeters(meg: MegalithType): number {
  const m: Record<MegalithType, number> = {
    menhir: 6, dolmen: 3, stone_circle: 4, passage_tomb: 5, trilithon: 7,
  };
  return m[meg];
}

export function weightTonnes(meg: MegalithType): number {
  const m: Record<MegalithType, number> = {
    menhir: 20, dolmen: 40, stone_circle: 25, passage_tomb: 100, trilithon: 50,
  };
  return m[meg];
}

export function constructionLabor(meg: MegalithType): number {
  const m: Record<MegalithType, number> = {
    menhir: 3, dolmen: 5, stone_circle: 9, passage_tomb: 10, trilithon: 7,
  };
  return m[meg];
}

export function astronomicalAlignment(meg: MegalithType): number {
  const m: Record<MegalithType, number> = {
    menhir: 4, dolmen: 2, stone_circle: 10, passage_tomb: 8, trilithon: 7,
  };
  return m[meg];
}

export function preservationState(meg: MegalithType): number {
  const m: Record<MegalithType, number> = {
    menhir: 8, dolmen: 7, stone_circle: 6, passage_tomb: 5, trilithon: 4,
  };
  return m[meg];
}

export function funerary(meg: MegalithType): boolean {
  const m: Record<MegalithType, boolean> = {
    menhir: false, dolmen: true, stone_circle: false, passage_tomb: true, trilithon: false,
  };
  return m[meg];
}

export function multiStone(meg: MegalithType): boolean {
  const m: Record<MegalithType, boolean> = {
    menhir: false, dolmen: true, stone_circle: true, passage_tomb: true, trilithon: true,
  };
  return m[meg];
}

export function exampleSite(meg: MegalithType): string {
  const m: Record<MegalithType, string> = {
    menhir: "carnac", dolmen: "poulnabrone", stone_circle: "stonehenge",
    passage_tomb: "newgrange", trilithon: "baalbek",
  };
  return m[meg];
}

export function tourismAppeal(meg: MegalithType): number {
  const m: Record<MegalithType, number> = {
    menhir: 5, dolmen: 6, stone_circle: 10, passage_tomb: 9, trilithon: 8,
  };
  return m[meg];
}

export function megalithTypes(): MegalithType[] {
  return ["menhir", "dolmen", "stone_circle", "passage_tomb", "trilithon"];
}
