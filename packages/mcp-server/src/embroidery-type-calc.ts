export type EmbroideryType = "cross_stitch" | "crewel" | "blackwork" | "whitework" | "goldwork";

export function stitchComplexity(emb: EmbroideryType): number {
  const m: Record<EmbroideryType, number> = {
    cross_stitch: 2, crewel: 7, blackwork: 5, whitework: 8, goldwork: 10,
  };
  return m[emb];
}

export function colorRange(emb: EmbroideryType): number {
  const m: Record<EmbroideryType, number> = {
    cross_stitch: 10, crewel: 8, blackwork: 1, whitework: 1, goldwork: 3,
  };
  return m[emb];
}

export function textureDepth(emb: EmbroideryType): number {
  const m: Record<EmbroideryType, number> = {
    cross_stitch: 2, crewel: 9, blackwork: 3, whitework: 7, goldwork: 10,
  };
  return m[emb];
}

export function timePerSquareInch(emb: EmbroideryType): number {
  const m: Record<EmbroideryType, number> = {
    cross_stitch: 4, crewel: 7, blackwork: 6, whitework: 8, goldwork: 10,
  };
  return m[emb];
}

export function materialCost(emb: EmbroideryType): number {
  const m: Record<EmbroideryType, number> = {
    cross_stitch: 2, crewel: 4, blackwork: 2, whitework: 3, goldwork: 10,
  };
  return m[emb];
}

export function countedThread(emb: EmbroideryType): boolean {
  const m: Record<EmbroideryType, boolean> = {
    cross_stitch: true, crewel: false, blackwork: true, whitework: false, goldwork: false,
  };
  return m[emb];
}

export function raisedSurface(emb: EmbroideryType): boolean {
  const m: Record<EmbroideryType, boolean> = {
    cross_stitch: false, crewel: true, blackwork: false, whitework: true, goldwork: true,
  };
  return m[emb];
}

export function historicalOrigin(emb: EmbroideryType): string {
  const m: Record<EmbroideryType, string> = {
    cross_stitch: "ancient_egypt", crewel: "medieval_england",
    blackwork: "tudor_england", whitework: "renaissance", goldwork: "byzantine",
  };
  return m[emb];
}

export function bestFabric(emb: EmbroideryType): string {
  const m: Record<EmbroideryType, string> = {
    cross_stitch: "aida_cloth", crewel: "linen_twill", blackwork: "evenweave",
    whitework: "fine_linen", goldwork: "silk",
  };
  return m[emb];
}

export function embroideryTypes(): EmbroideryType[] {
  return ["cross_stitch", "crewel", "blackwork", "whitework", "goldwork"];
}
