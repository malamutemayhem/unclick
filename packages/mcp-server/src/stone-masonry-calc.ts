export type StoneType = "granite" | "limestone" | "sandstone" | "slate" | "marble";

export function compressiveStrengthMpa(stone: StoneType): number {
  const c: Record<StoneType, number> = {
    granite: 200, limestone: 60, sandstone: 40, slate: 100, marble: 70,
  };
  return c[stone];
}

export function densityKgPerM3(stone: StoneType): number {
  const d: Record<StoneType, number> = {
    granite: 2700, limestone: 2300, sandstone: 2200, slate: 2800, marble: 2600,
  };
  return d[stone];
}

export function waterAbsorptionPercent(stone: StoneType): number {
  const w: Record<StoneType, number> = {
    granite: 0.4, limestone: 5, sandstone: 8, slate: 0.2, marble: 0.5,
  };
  return w[stone];
}

export function workability(stone: StoneType): number {
  const w: Record<StoneType, number> = {
    granite: 3, limestone: 8, sandstone: 9, slate: 5, marble: 7,
  };
  return w[stone];
}

export function frostResistance(stone: StoneType): number {
  const f: Record<StoneType, number> = {
    granite: 10, limestone: 5, sandstone: 4, slate: 9, marble: 6,
  };
  return f[stone];
}

export function polishable(stone: StoneType): boolean {
  const p: Record<StoneType, boolean> = {
    granite: true, limestone: false, sandstone: false, slate: false, marble: true,
  };
  return p[stone];
}

export function bestApplication(stone: StoneType): string {
  const b: Record<StoneType, string> = {
    granite: "foundations", limestone: "walls", sandstone: "facades",
    slate: "roofing", marble: "flooring",
  };
  return b[stone];
}

export function lifespanYears(stone: StoneType): number {
  const l: Record<StoneType, number> = {
    granite: 500, limestone: 200, sandstone: 150, slate: 400, marble: 300,
  };
  return l[stone];
}

export function costPerM3(stone: StoneType): number {
  const c: Record<StoneType, number> = {
    granite: 800, limestone: 400, sandstone: 350, slate: 900, marble: 1200,
  };
  return c[stone];
}

export function stoneTypes(): StoneType[] {
  return ["granite", "limestone", "sandstone", "slate", "marble"];
}
