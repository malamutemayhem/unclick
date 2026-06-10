export type EdgeFinish = "burnished" | "painted" | "waxed" | "folded" | "raw";

export function passesRequired(finish: EdgeFinish): number {
  const p: Record<EdgeFinish, number> = {
    burnished: 5, painted: 3, waxed: 2, folded: 1, raw: 0,
  };
  return p[finish];
}

export function dryingTimeMinutes(finish: EdgeFinish): number {
  const t: Record<EdgeFinish, number> = {
    burnished: 0, painted: 30, waxed: 10, folded: 0, raw: 0,
  };
  return t[finish];
}

export function durabilityRating(finish: EdgeFinish): number {
  const d: Record<EdgeFinish, number> = {
    burnished: 9, painted: 7, waxed: 6, folded: 8, raw: 2,
  };
  return d[finish];
}

export function waterResistance(finish: EdgeFinish): number {
  const w: Record<EdgeFinish, number> = {
    burnished: 7, painted: 9, waxed: 8, folded: 6, raw: 1,
  };
  return w[finish];
}

export function toolRequired(finish: EdgeFinish): string {
  const t: Record<EdgeFinish, string> = {
    burnished: "wood_slicker", painted: "edge_roller",
    waxed: "canvas_cloth", folded: "bone_folder", raw: "none",
  };
  return t[finish];
}

export function skillLevel(finish: EdgeFinish): number {
  const s: Record<EdgeFinish, number> = {
    burnished: 6, painted: 4, waxed: 3, folded: 8, raw: 1,
  };
  return s[finish];
}

export function timePerMeterMinutes(finish: EdgeFinish): number {
  const t: Record<EdgeFinish, number> = {
    burnished: 10, painted: 8, waxed: 5, folded: 15, raw: 0,
  };
  return t[finish];
}

export function aestheticRating(finish: EdgeFinish): number {
  const a: Record<EdgeFinish, number> = {
    burnished: 9, painted: 8, waxed: 7, folded: 10, raw: 2,
  };
  return a[finish];
}

export function costPerMeter(finish: EdgeFinish): number {
  const c: Record<EdgeFinish, number> = {
    burnished: 1, painted: 3, waxed: 2, folded: 5, raw: 0,
  };
  return c[finish];
}

export function edgeFinishes(): EdgeFinish[] {
  return ["burnished", "painted", "waxed", "folded", "raw"];
}
