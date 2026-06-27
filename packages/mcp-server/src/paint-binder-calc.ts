export type PaintBinder = "linseed_oil" | "gum_arabic" | "egg_yolk" | "acrylic_polymer" | "casein";

export function dryTimeHours(binder: PaintBinder): number {
  const d: Record<PaintBinder, number> = {
    linseed_oil: 72, gum_arabic: 1, egg_yolk: 4, acrylic_polymer: 2, casein: 6,
  };
  return d[binder];
}

export function flexibility(binder: PaintBinder): number {
  const f: Record<PaintBinder, number> = {
    linseed_oil: 8, gum_arabic: 3, egg_yolk: 5, acrylic_polymer: 9, casein: 2,
  };
  return f[binder];
}

export function waterResistance(binder: PaintBinder): number {
  const w: Record<PaintBinder, number> = {
    linseed_oil: 9, gum_arabic: 1, egg_yolk: 4, acrylic_polymer: 8, casein: 3,
  };
  return w[binder];
}

export function pigmentLoad(binder: PaintBinder): number {
  const p: Record<PaintBinder, number> = {
    linseed_oil: 8, gum_arabic: 6, egg_yolk: 7, acrylic_polymer: 9, casein: 5,
  };
  return p[binder];
}

export function yellowing(binder: PaintBinder): number {
  const y: Record<PaintBinder, number> = {
    linseed_oil: 7, gum_arabic: 1, egg_yolk: 3, acrylic_polymer: 1, casein: 2,
  };
  return y[binder];
}

export function rewettable(binder: PaintBinder): boolean {
  const r: Record<PaintBinder, boolean> = {
    linseed_oil: false, gum_arabic: true, egg_yolk: false, acrylic_polymer: false, casein: false,
  };
  return r[binder];
}

export function bestSurface(binder: PaintBinder): string {
  const b: Record<PaintBinder, string> = {
    linseed_oil: "canvas", gum_arabic: "paper", egg_yolk: "wood_panel",
    acrylic_polymer: "any", casein: "wall",
  };
  return b[binder];
}

export function archivalQuality(binder: PaintBinder): number {
  const a: Record<PaintBinder, number> = {
    linseed_oil: 9, gum_arabic: 6, egg_yolk: 8, acrylic_polymer: 7, casein: 5,
  };
  return a[binder];
}

export function costPerLiter(binder: PaintBinder): number {
  const c: Record<PaintBinder, number> = {
    linseed_oil: 15, gum_arabic: 25, egg_yolk: 5, acrylic_polymer: 10, casein: 8,
  };
  return c[binder];
}

export function paintBinders(): PaintBinder[] {
  return ["linseed_oil", "gum_arabic", "egg_yolk", "acrylic_polymer", "casein"];
}
