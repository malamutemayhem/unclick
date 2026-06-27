export type StitchType = "saddle_stitch" | "cross_stitch" | "baseball_stitch" | "whip_stitch" | "lacing";

export function holesPerCm(type: StitchType): number {
  const h: Record<StitchType, number> = {
    saddle_stitch: 3, cross_stitch: 2, baseball_stitch: 2.5,
    whip_stitch: 4, lacing: 1.5,
  };
  return h[type];
}

export function threadLengthMultiplier(type: StitchType): number {
  const m: Record<StitchType, number> = {
    saddle_stitch: 4, cross_stitch: 5, baseball_stitch: 3.5,
    whip_stitch: 2.5, lacing: 3,
  };
  return m[type];
}

export function needlesRequired(type: StitchType): number {
  const n: Record<StitchType, number> = {
    saddle_stitch: 2, cross_stitch: 1, baseball_stitch: 1,
    whip_stitch: 1, lacing: 1,
  };
  return n[type];
}

export function strengthRating(type: StitchType): number {
  const s: Record<StitchType, number> = {
    saddle_stitch: 10, cross_stitch: 7, baseball_stitch: 8,
    whip_stitch: 5, lacing: 6,
  };
  return s[type];
}

export function decorativeRating(type: StitchType): number {
  const d: Record<StitchType, number> = {
    saddle_stitch: 7, cross_stitch: 9, baseball_stitch: 8,
    whip_stitch: 4, lacing: 8,
  };
  return d[type];
}

export function speedRating(type: StitchType): number {
  const s: Record<StitchType, number> = {
    saddle_stitch: 5, cross_stitch: 3, baseball_stitch: 6,
    whip_stitch: 8, lacing: 4,
  };
  return s[type];
}

export function ponyRequired(type: StitchType): boolean {
  return type === "saddle_stitch" || type === "cross_stitch";
}

export function bestForProject(type: StitchType): string {
  const p: Record<StitchType, string> = {
    saddle_stitch: "wallet", cross_stitch: "book_cover",
    baseball_stitch: "ball_glove", whip_stitch: "edge_binding",
    lacing: "moccasin",
  };
  return p[type];
}

export function costPerMeter(type: StitchType): number {
  const c: Record<StitchType, number> = {
    saddle_stitch: 2, cross_stitch: 3, baseball_stitch: 2.5,
    whip_stitch: 1, lacing: 4,
  };
  return c[type];
}

export function stitchTypes(): StitchType[] {
  return ["saddle_stitch", "cross_stitch", "baseball_stitch", "whip_stitch", "lacing"];
}
