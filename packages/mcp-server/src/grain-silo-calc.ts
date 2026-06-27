export type SiloType = "pit_storage" | "clay_bin" | "wicker_granary" | "stone_tower" | "raised_crib";

export function capacityTonnes(type: SiloType): number {
  const c: Record<SiloType, number> = {
    pit_storage: 5, clay_bin: 2, wicker_granary: 1, stone_tower: 20, raised_crib: 3,
  };
  return c[type];
}

export function moistureControlRating(type: SiloType): number {
  const m: Record<SiloType, number> = {
    pit_storage: 4, clay_bin: 7, wicker_granary: 8, stone_tower: 6, raised_crib: 9,
  };
  return m[type];
}

export function pestResistance(type: SiloType): number {
  const p: Record<SiloType, number> = {
    pit_storage: 8, clay_bin: 6, wicker_granary: 3, stone_tower: 9, raised_crib: 5,
  };
  return p[type];
}

export function ventilationRating(type: SiloType): number {
  const v: Record<SiloType, number> = {
    pit_storage: 2, clay_bin: 4, wicker_granary: 9, stone_tower: 5, raised_crib: 8,
  };
  return v[type];
}

export function storageMonths(type: SiloType): number {
  const s: Record<SiloType, number> = {
    pit_storage: 24, clay_bin: 12, wicker_granary: 6, stone_tower: 36, raised_crib: 8,
  };
  return s[type];
}

export function belowGround(type: SiloType): boolean {
  return type === "pit_storage";
}

export function buildDays(type: SiloType): number {
  const d: Record<SiloType, number> = {
    pit_storage: 3, clay_bin: 5, wicker_granary: 2, stone_tower: 30, raised_crib: 4,
  };
  return d[type];
}

export function repairability(type: SiloType): number {
  const r: Record<SiloType, number> = {
    pit_storage: 9, clay_bin: 5, wicker_granary: 7, stone_tower: 3, raised_crib: 8,
  };
  return r[type];
}

export function costEstimate(type: SiloType): number {
  const c: Record<SiloType, number> = {
    pit_storage: 50, clay_bin: 100, wicker_granary: 30, stone_tower: 500, raised_crib: 80,
  };
  return c[type];
}

export function siloTypes(): SiloType[] {
  return ["pit_storage", "clay_bin", "wicker_granary", "stone_tower", "raised_crib"];
}
