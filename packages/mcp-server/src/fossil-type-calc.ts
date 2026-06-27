export type FossilType = "body" | "trace" | "mold" | "cast" | "petrified";

export function preservationQuality(f: FossilType): number {
  const m: Record<FossilType, number> = {
    body: 10, trace: 4, mold: 7, cast: 8, petrified: 9,
  };
  return m[f];
}

export function abundanceScore(f: FossilType): number {
  const m: Record<FossilType, number> = {
    body: 6, trace: 9, mold: 7, cast: 5, petrified: 3,
  };
  return m[f];
}

export function informationContent(f: FossilType): number {
  const m: Record<FossilType, number> = {
    body: 10, trace: 6, mold: 5, cast: 7, petrified: 9,
  };
  return m[f];
}

export function formationTimeYears(f: FossilType): number {
  const m: Record<FossilType, number> = {
    body: 10000, trace: 5000, mold: 50000, cast: 100000, petrified: 1000000,
  };
  return m[f];
}

export function collectingDifficulty(f: FossilType): number {
  const m: Record<FossilType, number> = {
    body: 8, trace: 3, mold: 5, cast: 6, petrified: 7,
  };
  return m[f];
}

export function retainsOriginalMaterial(f: FossilType): boolean {
  const m: Record<FossilType, boolean> = {
    body: true, trace: false, mold: false, cast: false, petrified: false,
  };
  return m[f];
}

export function threeDimensional(f: FossilType): boolean {
  const m: Record<FossilType, boolean> = {
    body: true, trace: false, mold: false, cast: true, petrified: true,
  };
  return m[f];
}

export function exampleOrganism(f: FossilType): string {
  const m: Record<FossilType, string> = {
    body: "amber_insect", trace: "dinosaur_footprint",
    mold: "shell_impression", cast: "ammonite",
    petrified: "petrified_wood",
  };
  return m[f];
}

export function typicalRock(f: FossilType): string {
  const m: Record<FossilType, string> = {
    body: "amber", trace: "mudstone", mold: "limestone",
    cast: "sandstone", petrified: "silicified_rock",
  };
  return m[f];
}

export function fossilTypes(): FossilType[] {
  return ["body", "trace", "mold", "cast", "petrified"];
}
