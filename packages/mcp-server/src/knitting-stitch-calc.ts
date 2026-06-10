export type KnittingStitch = "stockinette" | "garter" | "ribbing" | "cable" | "seed";

export function difficulty(stitch: KnittingStitch): number {
  const m: Record<KnittingStitch, number> = {
    stockinette: 2, garter: 1, ribbing: 3, cable: 8, seed: 4,
  };
  return m[stitch];
}

export function elasticity(stitch: KnittingStitch): number {
  const m: Record<KnittingStitch, number> = {
    stockinette: 5, garter: 8, ribbing: 10, cable: 3, seed: 4,
  };
  return m[stitch];
}

export function yarnUsageMultiplier(stitch: KnittingStitch): number {
  const m: Record<KnittingStitch, number> = {
    stockinette: 1, garter: 1.1, ribbing: 1.2, cable: 1.5, seed: 1.1,
  };
  return m[stitch];
}

export function textureDepth(stitch: KnittingStitch): number {
  const m: Record<KnittingStitch, number> = {
    stockinette: 2, garter: 5, ribbing: 6, cable: 10, seed: 7,
  };
  return m[stitch];
}

export function speedRowsPerHour(stitch: KnittingStitch): number {
  const m: Record<KnittingStitch, number> = {
    stockinette: 10, garter: 10, ribbing: 7, cable: 4, seed: 6,
  };
  return m[stitch];
}

export function reversible(stitch: KnittingStitch): boolean {
  const m: Record<KnittingStitch, boolean> = {
    stockinette: false, garter: true, ribbing: true, cable: false, seed: true,
  };
  return m[stitch];
}

export function curls(stitch: KnittingStitch): boolean {
  const m: Record<KnittingStitch, boolean> = {
    stockinette: true, garter: false, ribbing: false, cable: true, seed: false,
  };
  return m[stitch];
}

export function bestProject(stitch: KnittingStitch): string {
  const m: Record<KnittingStitch, string> = {
    stockinette: "sweater_body", garter: "scarf", ribbing: "cuffs",
    cable: "aran_sweater", seed: "blanket",
  };
  return m[stitch];
}

export function warmthRating(stitch: KnittingStitch): number {
  const m: Record<KnittingStitch, number> = {
    stockinette: 6, garter: 8, ribbing: 7, cable: 10, seed: 7,
  };
  return m[stitch];
}

export function knittingStitches(): KnittingStitch[] {
  return ["stockinette", "garter", "ribbing", "cable", "seed"];
}
