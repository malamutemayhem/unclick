export type LeatherFinish = "resolene" | "beeswax" | "neatsfoot_oil" | "mink_oil" | "carnauba_wax";

export function sheenLevel(finish: LeatherFinish): number {
  const s: Record<LeatherFinish, number> = {
    resolene: 9, beeswax: 5, neatsfoot_oil: 3, mink_oil: 4, carnauba_wax: 8,
  };
  return s[finish];
}

export function waterproofing(finish: LeatherFinish): number {
  const w: Record<LeatherFinish, number> = {
    resolene: 8, beeswax: 9, neatsfoot_oil: 4, mink_oil: 7, carnauba_wax: 6,
  };
  return w[finish];
}

export function conditioningEffect(finish: LeatherFinish): number {
  const c: Record<LeatherFinish, number> = {
    resolene: 2, beeswax: 5, neatsfoot_oil: 10, mink_oil: 9, carnauba_wax: 3,
  };
  return c[finish];
}

export function darkeningEffect(finish: LeatherFinish): number {
  const d: Record<LeatherFinish, number> = {
    resolene: 1, beeswax: 3, neatsfoot_oil: 7, mink_oil: 6, carnauba_wax: 2,
  };
  return d[finish];
}

export function reapplicationWeeks(finish: LeatherFinish): number {
  const r: Record<LeatherFinish, number> = {
    resolene: 26, beeswax: 8, neatsfoot_oil: 4, mink_oil: 6, carnauba_wax: 12,
  };
  return r[finish];
}

export function natural(finish: LeatherFinish): boolean {
  const n: Record<LeatherFinish, boolean> = {
    resolene: false, beeswax: true, neatsfoot_oil: true, mink_oil: true, carnauba_wax: true,
  };
  return n[finish];
}

export function buffable(finish: LeatherFinish): boolean {
  const b: Record<LeatherFinish, boolean> = {
    resolene: false, beeswax: true, neatsfoot_oil: false, mink_oil: false, carnauba_wax: true,
  };
  return b[finish];
}

export function bestFor(finish: LeatherFinish): string {
  const b: Record<LeatherFinish, string> = {
    resolene: "tooled_leather", beeswax: "holsters", neatsfoot_oil: "saddles",
    mink_oil: "boots", carnauba_wax: "wallets",
  };
  return b[finish];
}

export function costPerLiter(finish: LeatherFinish): number {
  const c: Record<LeatherFinish, number> = {
    resolene: 35, beeswax: 20, neatsfoot_oil: 15, mink_oil: 25, carnauba_wax: 30,
  };
  return c[finish];
}

export function leatherFinishes(): LeatherFinish[] {
  return ["resolene", "beeswax", "neatsfoot_oil", "mink_oil", "carnauba_wax"];
}
