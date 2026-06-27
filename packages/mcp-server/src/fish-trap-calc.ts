export type FishTrapType = "weir" | "fyke_net" | "pot_trap" | "basket_trap" | "stone_maze";

export function catchRateKgPerDay(type: FishTrapType): number {
  const r: Record<FishTrapType, number> = {
    weir: 30, fyke_net: 15, pot_trap: 8, basket_trap: 5, stone_maze: 20,
  };
  return r[type];
}

export function constructionHours(type: FishTrapType): number {
  const h: Record<FishTrapType, number> = {
    weir: 40, fyke_net: 8, pot_trap: 4, basket_trap: 6, stone_maze: 60,
  };
  return h[type];
}

export function selectivityRating(type: FishTrapType): number {
  const s: Record<FishTrapType, number> = {
    weir: 3, fyke_net: 5, pot_trap: 7, basket_trap: 6, stone_maze: 2,
  };
  return s[type];
}

export function maintenanceWeekly(type: FishTrapType): boolean {
  return type !== "stone_maze";
}

export function durabilityMonths(type: FishTrapType): number {
  const d: Record<FishTrapType, number> = {
    weir: 24, fyke_net: 6, pot_trap: 12, basket_trap: 4, stone_maze: 120,
  };
  return d[type];
}

export function depthRangeMeters(type: FishTrapType): number {
  const d: Record<FishTrapType, number> = {
    weir: 2, fyke_net: 5, pot_trap: 30, basket_trap: 3, stone_maze: 1,
  };
  return d[type];
}

export function passive(type: FishTrapType): boolean {
  return true;
}

export function bycatchRisk(type: FishTrapType): number {
  const b: Record<FishTrapType, number> = {
    weir: 7, fyke_net: 5, pot_trap: 3, basket_trap: 4, stone_maze: 8,
  };
  return b[type];
}

export function costEstimate(type: FishTrapType): number {
  const c: Record<FishTrapType, number> = {
    weir: 500, fyke_net: 100, pot_trap: 50, basket_trap: 20, stone_maze: 200,
  };
  return c[type];
}

export function fishTrapTypes(): FishTrapType[] {
  return ["weir", "fyke_net", "pot_trap", "basket_trap", "stone_maze"];
}
