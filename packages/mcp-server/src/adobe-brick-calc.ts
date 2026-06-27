export type AdobeMix = "traditional" | "stabilized" | "compressed" | "straw_rich" | "volcanic";

export function brickSizeCm(mix: AdobeMix): { l: number; w: number; h: number } {
  const sizes: Record<AdobeMix, { l: number; w: number; h: number }> = {
    traditional: { l: 40, w: 20, h: 10 },
    stabilized: { l: 35, w: 18, h: 10 },
    compressed: { l: 30, w: 15, h: 10 },
    straw_rich: { l: 40, w: 20, h: 12 },
    volcanic: { l: 35, w: 18, h: 10 },
  };
  return sizes[mix];
}

export function dryingDays(mix: AdobeMix): number {
  const days: Record<AdobeMix, number> = {
    traditional: 28, stabilized: 14, compressed: 7, straw_rich: 35, volcanic: 21,
  };
  return days[mix];
}

export function strawPercent(mix: AdobeMix): number {
  const pct: Record<AdobeMix, number> = {
    traditional: 5, stabilized: 3, compressed: 0, straw_rich: 15, volcanic: 2,
  };
  return pct[mix];
}

export function compressiveStrengthMpa(mix: AdobeMix): number {
  const strength: Record<AdobeMix, number> = {
    traditional: 2, stabilized: 4, compressed: 6, straw_rich: 1.5, volcanic: 3,
  };
  return strength[mix];
}

export function bricksPerM2Wall(): number {
  return 12;
}

export function waterResistance(mix: AdobeMix): number {
  const ratings: Record<AdobeMix, number> = {
    traditional: 1, stabilized: 4, compressed: 3, straw_rich: 1, volcanic: 3,
  };
  return ratings[mix];
}

export function insulationRValue(mix: AdobeMix): number {
  const rValues: Record<AdobeMix, number> = {
    traditional: 0.4, stabilized: 0.3, compressed: 0.25, straw_rich: 0.6, volcanic: 0.5,
  };
  return rValues[mix];
}

export function weightPerBrickKg(mix: AdobeMix): number {
  const weights: Record<AdobeMix, number> = {
    traditional: 12, stabilized: 14, compressed: 16, straw_rich: 10, volcanic: 11,
  };
  return weights[mix];
}

export function costPerBrick(mix: AdobeMix): number {
  const costs: Record<AdobeMix, number> = {
    traditional: 0.5, stabilized: 1.5, compressed: 2, straw_rich: 0.3, volcanic: 1,
  };
  return costs[mix];
}

export function adobeMixes(): AdobeMix[] {
  return ["traditional", "stabilized", "compressed", "straw_rich", "volcanic"];
}
