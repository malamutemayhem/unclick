export type MetalAlloy = "sterling_silver" | "gold_14k" | "platinum_950" | "rose_gold" | "white_gold";

export function purityPercent(alloy: MetalAlloy): number {
  const p: Record<MetalAlloy, number> = {
    sterling_silver: 92.5, gold_14k: 58.3, platinum_950: 95, rose_gold: 75, white_gold: 75,
  };
  return p[alloy];
}

export function meltingPointCelsius(alloy: MetalAlloy): number {
  const m: Record<MetalAlloy, number> = {
    sterling_silver: 893, gold_14k: 927, platinum_950: 1768, rose_gold: 1010, white_gold: 1060,
  };
  return m[alloy];
}

export function hardnessVickers(alloy: MetalAlloy): number {
  const h: Record<MetalAlloy, number> = {
    sterling_silver: 80, gold_14k: 130, platinum_950: 60, rose_gold: 150, white_gold: 155,
  };
  return h[alloy];
}

export function tarnishResistance(alloy: MetalAlloy): number {
  const t: Record<MetalAlloy, number> = {
    sterling_silver: 3, gold_14k: 8, platinum_950: 10, rose_gold: 7, white_gold: 6,
  };
  return t[alloy];
}

export function allergenRisk(alloy: MetalAlloy): number {
  const a: Record<MetalAlloy, number> = {
    sterling_silver: 2, gold_14k: 3, platinum_950: 1, rose_gold: 4, white_gold: 6,
  };
  return a[alloy];
}

export function rhodiumPlated(alloy: MetalAlloy): boolean {
  const r: Record<MetalAlloy, boolean> = {
    sterling_silver: false, gold_14k: false, platinum_950: false, rose_gold: false, white_gold: true,
  };
  return r[alloy];
}

export function bestApplication(alloy: MetalAlloy): string {
  const b: Record<MetalAlloy, string> = {
    sterling_silver: "chains", gold_14k: "rings", platinum_950: "engagement_rings",
    rose_gold: "bracelets", white_gold: "earrings",
  };
  return b[alloy];
}

export function densityGPerCm3(alloy: MetalAlloy): number {
  const d: Record<MetalAlloy, number> = {
    sterling_silver: 10.4, gold_14k: 13.1, platinum_950: 20.7, rose_gold: 14.2, white_gold: 15.7,
  };
  return d[alloy];
}

export function costPerGram(alloy: MetalAlloy): number {
  const c: Record<MetalAlloy, number> = {
    sterling_silver: 1, gold_14k: 40, platinum_950: 35, rose_gold: 45, white_gold: 42,
  };
  return c[alloy];
}

export function metalAlloys(): MetalAlloy[] {
  return ["sterling_silver", "gold_14k", "platinum_950", "rose_gold", "white_gold"];
}
