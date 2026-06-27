export type BaleType = "two_string" | "three_string" | "jumbo" | "rice_straw" | "barley";

export function baleSizeCm(type: BaleType): { l: number; w: number; h: number } {
  const sizes: Record<BaleType, { l: number; w: number; h: number }> = {
    two_string: { l: 90, w: 45, h: 35 },
    three_string: { l: 105, w: 55, h: 40 },
    jumbo: { l: 240, w: 120, h: 90 },
    rice_straw: { l: 85, w: 42, h: 33 },
    barley: { l: 90, w: 45, h: 36 },
  };
  return sizes[type];
}

export function densityKgPerM3(type: BaleType): number {
  const d: Record<BaleType, number> = {
    two_string: 110, three_string: 130, jumbo: 150, rice_straw: 90, barley: 100,
  };
  return d[type];
}

export function rValuePerCm(type: BaleType): number {
  const r: Record<BaleType, number> = {
    two_string: 0.30, three_string: 0.30, jumbo: 0.28, rice_straw: 0.32, barley: 0.29,
  };
  return r[type];
}

export function balesPerM2Wall(type: BaleType): number {
  const bales: Record<BaleType, number> = {
    two_string: 7, three_string: 5, jumbo: 1, rice_straw: 8, barley: 7,
  };
  return bales[type];
}

export function moistureMaxPercent(): number {
  return 20;
}

export function fireResistanceHours(): number {
  return 2;
}

export function pinSpacingCm(): number {
  return 60;
}

export function compressionPercent(type: BaleType): number {
  const comp: Record<BaleType, number> = {
    two_string: 10, three_string: 8, jumbo: 5, rice_straw: 12, barley: 11,
  };
  return comp[type];
}

export function costPerBale(type: BaleType): number {
  const costs: Record<BaleType, number> = {
    two_string: 4, three_string: 6, jumbo: 25, rice_straw: 3, barley: 3.5,
  };
  return costs[type];
}

export function baleTypes(): BaleType[] {
  return ["two_string", "three_string", "jumbo", "rice_straw", "barley"];
}
