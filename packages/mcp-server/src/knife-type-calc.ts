export type KnifeType = "chef" | "santoku" | "paring" | "bread" | "cleaver";

export function bladeLengthCm(k: KnifeType): number {
  const m: Record<KnifeType, number> = {
    chef: 25, santoku: 18, paring: 10, bread: 23, cleaver: 18,
  };
  return m[k];
}

export function versatility(k: KnifeType): number {
  const m: Record<KnifeType, number> = {
    chef: 10, santoku: 9, paring: 5, bread: 3, cleaver: 4,
  };
  return m[k];
}

export function precision(k: KnifeType): number {
  const m: Record<KnifeType, number> = {
    chef: 7, santoku: 8, paring: 10, bread: 3, cleaver: 2,
  };
  return m[k];
}

export function weightGrams(k: KnifeType): number {
  const m: Record<KnifeType, number> = {
    chef: 200, santoku: 170, paring: 80, bread: 150, cleaver: 400,
  };
  return m[k];
}

export function edgeRetention(k: KnifeType): number {
  const m: Record<KnifeType, number> = {
    chef: 7, santoku: 8, paring: 6, bread: 9, cleaver: 5,
  };
  return m[k];
}

export function rocksOnBoard(k: KnifeType): boolean {
  const m: Record<KnifeType, boolean> = {
    chef: true, santoku: false, paring: false, bread: false, cleaver: false,
  };
  return m[k];
}

export function serrated(k: KnifeType): boolean {
  const m: Record<KnifeType, boolean> = {
    chef: false, santoku: false, paring: false, bread: true, cleaver: false,
  };
  return m[k];
}

export function bestTask(k: KnifeType): string {
  const m: Record<KnifeType, string> = {
    chef: "general_prep", santoku: "slicing_vegetables",
    paring: "peeling", bread: "slicing_bread",
    cleaver: "breaking_bones",
  };
  return m[k];
}

export function originRegion(k: KnifeType): string {
  const m: Record<KnifeType, string> = {
    chef: "france", santoku: "japan", paring: "europe",
    bread: "germany", cleaver: "china",
  };
  return m[k];
}

export function knifeTypes(): KnifeType[] {
  return ["chef", "santoku", "paring", "bread", "cleaver"];
}
