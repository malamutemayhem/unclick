export type PastePaperTechnique = "combed" | "sponged" | "pulled" | "stamped" | "rolled";

export function pasteViscosity(tech: PastePaperTechnique): number {
  const v: Record<PastePaperTechnique, number> = {
    combed: 8, sponged: 5, pulled: 6, stamped: 7, rolled: 4,
  };
  return v[tech];
}

export function patternRepeatability(tech: PastePaperTechnique): number {
  const r: Record<PastePaperTechnique, number> = {
    combed: 8, sponged: 3, pulled: 2, stamped: 9, rolled: 7,
  };
  return r[tech];
}

export function colorLayersMax(tech: PastePaperTechnique): number {
  const l: Record<PastePaperTechnique, number> = {
    combed: 2, sponged: 4, pulled: 3, stamped: 2, rolled: 3,
  };
  return l[tech];
}

export function dryingTimeHours(tech: PastePaperTechnique): number {
  const d: Record<PastePaperTechnique, number> = {
    combed: 4, sponged: 6, pulled: 5, stamped: 4, rolled: 3,
  };
  return d[tech];
}

export function textureDepth(tech: PastePaperTechnique): number {
  const t: Record<PastePaperTechnique, number> = {
    combed: 8, sponged: 6, pulled: 4, stamped: 7, rolled: 3,
  };
  return t[tech];
}

export function toolRequired(tech: PastePaperTechnique): string {
  const t: Record<PastePaperTechnique, string> = {
    combed: "comb", sponged: "sponge", pulled: "hands",
    stamped: "stamp_block", rolled: "brayer",
  };
  return t[tech];
}

export function uniquenessPerSheet(tech: PastePaperTechnique): number {
  const u: Record<PastePaperTechnique, number> = {
    combed: 5, sponged: 8, pulled: 10, stamped: 3, rolled: 6,
  };
  return u[tech];
}

export function beginnerFriendly(tech: PastePaperTechnique): number {
  const b: Record<PastePaperTechnique, number> = {
    combed: 7, sponged: 9, pulled: 8, stamped: 6, rolled: 8,
  };
  return b[tech];
}

export function costPerSheet(tech: PastePaperTechnique): number {
  const c: Record<PastePaperTechnique, number> = {
    combed: 2, sponged: 1, pulled: 1, stamped: 3, rolled: 2,
  };
  return c[tech];
}

export function pastePaperTechniques(): PastePaperTechnique[] {
  return ["combed", "sponged", "pulled", "stamped", "rolled"];
}
