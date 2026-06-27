export type BaseType = "custard" | "philadelphia" | "gelato" | "sorbet" | "sherbet" | "frozen_yogurt";
export type Sweetener = "sugar" | "honey" | "maple" | "agave" | "stevia";

export function baseRatio(type: BaseType): { cream: number; milk: number; sugar: number } {
  const ratios: Record<BaseType, { cream: number; milk: number; sugar: number }> = {
    custard: { cream: 35, milk: 40, sugar: 18 },
    philadelphia: { cream: 40, milk: 40, sugar: 15 },
    gelato: { cream: 10, milk: 65, sugar: 20 },
    sorbet: { cream: 0, milk: 0, sugar: 25 },
    sherbet: { cream: 5, milk: 50, sugar: 25 },
    frozen_yogurt: { cream: 0, milk: 70, sugar: 15 },
  };
  return ratios[type];
}

export function fatPercent(type: BaseType): number {
  const fat: Record<BaseType, number> = {
    custard: 16, philadelphia: 18, gelato: 6, sorbet: 0, sherbet: 2, frozen_yogurt: 3,
  };
  return fat[type];
}

export function overrun(type: BaseType): number {
  const pct: Record<BaseType, number> = {
    custard: 50, philadelphia: 60, gelato: 25, sorbet: 20, sherbet: 30, frozen_yogurt: 40,
  };
  return pct[type];
}

export function yieldLiters(baseLiters: number, overrunPct: number): number {
  return parseFloat((baseLiters * (1 + overrunPct / 100)).toFixed(1));
}

export function servings(totalMl: number, scoopMl: number = 120): number {
  return Math.floor(totalMl / scoopMl);
}

export function churningTemp(): number {
  return -6;
}

export function churningTime(type: BaseType): number {
  const mins: Record<BaseType, number> = {
    custard: 25, philadelphia: 20, gelato: 30, sorbet: 25, sherbet: 20, frozen_yogurt: 25,
  };
  return mins[type];
}

export function hardeningTime(type: BaseType): number {
  const hours: Record<BaseType, number> = {
    custard: 4, philadelphia: 4, gelato: 2, sorbet: 3, sherbet: 3, frozen_yogurt: 4,
  };
  return hours[type];
}

export function servingTemp(type: BaseType): number {
  const temps: Record<BaseType, number> = {
    custard: -14, philadelphia: -14, gelato: -10, sorbet: -12, sherbet: -12, frozen_yogurt: -12,
  };
  return temps[type];
}

export function eggYolks(baseLiters: number, type: BaseType): number {
  if (type !== "custard") return 0;
  return Math.round(baseLiters * 6);
}

export function sweetenerAmount(baseMl: number, sweetenerType: Sweetener, sweetnessPct: number = 15): number {
  const factor: Record<Sweetener, number> = {
    sugar: 1, honey: 0.8, maple: 0.9, agave: 0.7, stevia: 0.02,
  };
  return parseFloat((baseMl * sweetnessPct / 100 * factor[sweetenerType]).toFixed(1));
}

export function mixInPercent(mixInG: number, totalG: number): number {
  if (totalG === 0) return 0;
  return parseFloat((mixInG / totalG * 100).toFixed(1));
}

export function baseTypes(): BaseType[] {
  return ["custard", "philadelphia", "gelato", "sorbet", "sherbet", "frozen_yogurt"];
}
