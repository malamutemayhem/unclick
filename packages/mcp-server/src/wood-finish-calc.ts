export type WoodFinish = "tung_oil" | "shellac" | "lacquer" | "polyurethane" | "wax";

export function dryTimeHours(finish: WoodFinish): number {
  const d: Record<WoodFinish, number> = {
    tung_oil: 48, shellac: 1, lacquer: 2, polyurethane: 24, wax: 4,
  };
  return d[finish];
}

export function durability(finish: WoodFinish): number {
  const r: Record<WoodFinish, number> = {
    tung_oil: 6, shellac: 4, lacquer: 8, polyurethane: 10, wax: 3,
  };
  return r[finish];
}

export function waterResistance(finish: WoodFinish): number {
  const w: Record<WoodFinish, number> = {
    tung_oil: 7, shellac: 2, lacquer: 8, polyurethane: 10, wax: 4,
  };
  return w[finish];
}

export function repairability(finish: WoodFinish): number {
  const r: Record<WoodFinish, number> = {
    tung_oil: 9, shellac: 10, lacquer: 5, polyurethane: 3, wax: 10,
  };
  return r[finish];
}

export function naturalGrain(finish: WoodFinish): number {
  const n: Record<WoodFinish, number> = {
    tung_oil: 10, shellac: 8, lacquer: 6, polyurethane: 5, wax: 9,
  };
  return n[finish];
}

export function foodSafe(finish: WoodFinish): boolean {
  const f: Record<WoodFinish, boolean> = {
    tung_oil: true, shellac: true, lacquer: false, polyurethane: false, wax: true,
  };
  return f[finish];
}

export function bestProject(finish: WoodFinish): string {
  const b: Record<WoodFinish, string> = {
    tung_oil: "cutting_boards", shellac: "antique_restoration",
    lacquer: "cabinets", polyurethane: "floors", wax: "turned_bowls",
  };
  return b[finish];
}

export function coatsNeeded(finish: WoodFinish): number {
  const c: Record<WoodFinish, number> = {
    tung_oil: 5, shellac: 3, lacquer: 4, polyurethane: 3, wax: 2,
  };
  return c[finish];
}

export function costPerLiter(finish: WoodFinish): number {
  const c: Record<WoodFinish, number> = {
    tung_oil: 30, shellac: 25, lacquer: 20, polyurethane: 15, wax: 35,
  };
  return c[finish];
}

export function woodFinishes(): WoodFinish[] {
  return ["tung_oil", "shellac", "lacquer", "polyurethane", "wax"];
}
