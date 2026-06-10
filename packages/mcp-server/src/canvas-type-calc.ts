export type CanvasType = "linen" | "cotton" | "jute" | "synthetic" | "panel";

export function textureGrade(canvas: CanvasType): number {
  const t: Record<CanvasType, number> = {
    linen: 8, cotton: 5, jute: 9, synthetic: 3, panel: 1,
  };
  return t[canvas];
}

export function tensileStrength(canvas: CanvasType): number {
  const s: Record<CanvasType, number> = {
    linen: 9, cotton: 6, jute: 5, synthetic: 8, panel: 10,
  };
  return s[canvas];
}

export function absorbency(canvas: CanvasType): number {
  const a: Record<CanvasType, number> = {
    linen: 6, cotton: 8, jute: 7, synthetic: 3, panel: 2,
  };
  return a[canvas];
}

export function weightGsm(canvas: CanvasType): number {
  const w: Record<CanvasType, number> = {
    linen: 400, cotton: 350, jute: 500, synthetic: 200, panel: 800,
  };
  return w[canvas];
}

export function dimensionalStability(canvas: CanvasType): number {
  const d: Record<CanvasType, number> = {
    linen: 9, cotton: 5, jute: 4, synthetic: 10, panel: 10,
  };
  return d[canvas];
}

export function primingRequired(canvas: CanvasType): boolean {
  const p: Record<CanvasType, boolean> = {
    linen: true, cotton: true, jute: true, synthetic: false, panel: true,
  };
  return p[canvas];
}

export function bestMedium(canvas: CanvasType): string {
  const b: Record<CanvasType, string> = {
    linen: "oil", cotton: "acrylic", jute: "mixed_media",
    synthetic: "digital_print", panel: "egg_tempera",
  };
  return b[canvas];
}

export function archivalYears(canvas: CanvasType): number {
  const a: Record<CanvasType, number> = {
    linen: 500, cotton: 200, jute: 100, synthetic: 300, panel: 600,
  };
  return a[canvas];
}

export function costPerM2(canvas: CanvasType): number {
  const c: Record<CanvasType, number> = {
    linen: 30, cotton: 12, jute: 8, synthetic: 15, panel: 40,
  };
  return c[canvas];
}

export function canvasTypes(): CanvasType[] {
  return ["linen", "cotton", "jute", "synthetic", "panel"];
}
