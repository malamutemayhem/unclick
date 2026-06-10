export type PlyStructure = "two_ply" | "three_ply" | "cable" | "navajo_ply" | "crepe";

export function strengthMultiplier(ply: PlyStructure): number {
  const m: Record<PlyStructure, number> = {
    two_ply: 1.8, three_ply: 2.5, cable: 3.5, navajo_ply: 1.6, crepe: 1.2,
  };
  return m[ply];
}

export function yardageReduction(ply: PlyStructure): number {
  const r: Record<PlyStructure, number> = {
    two_ply: 15, three_ply: 20, cable: 30, navajo_ply: 10, crepe: 25,
  };
  return r[ply];
}

export function roundnessRating(ply: PlyStructure): number {
  const r: Record<PlyStructure, number> = {
    two_ply: 6, three_ply: 9, cable: 10, navajo_ply: 4, crepe: 3,
  };
  return r[ply];
}

export function colorBlending(ply: PlyStructure): number {
  const c: Record<PlyStructure, number> = {
    two_ply: 7, three_ply: 8, cable: 5, navajo_ply: 1, crepe: 6,
  };
  return c[ply];
}

export function preservesColorOrder(ply: PlyStructure): boolean {
  return ply === "navajo_ply";
}

export function twistDirectionChanges(ply: PlyStructure): number {
  const t: Record<PlyStructure, number> = {
    two_ply: 1, three_ply: 1, cable: 2, navajo_ply: 1, crepe: 3,
  };
  return t[ply];
}

export function elasticity(ply: PlyStructure): number {
  const e: Record<PlyStructure, number> = {
    two_ply: 6, three_ply: 5, cable: 3, navajo_ply: 7, crepe: 8,
  };
  return e[ply];
}

export function difficultyRating(ply: PlyStructure): number {
  const d: Record<PlyStructure, number> = {
    two_ply: 2, three_ply: 4, cable: 7, navajo_ply: 6, crepe: 5,
  };
  return d[ply];
}

export function bestForProject(ply: PlyStructure): string {
  const p: Record<PlyStructure, string> = {
    two_ply: "knitting", three_ply: "crochet", cable: "rope",
    navajo_ply: "color_work", crepe: "weaving",
  };
  return p[ply];
}

export function plyStructures(): PlyStructure[] {
  return ["two_ply", "three_ply", "cable", "navajo_ply", "crepe"];
}
