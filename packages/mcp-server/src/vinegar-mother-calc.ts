export type VinegarBase = "wine" | "cider" | "malt" | "rice" | "coconut";

export function fermentationWeeks(base: VinegarBase): number {
  const f: Record<VinegarBase, number> = {
    wine: 8, cider: 6, malt: 10, rice: 12, coconut: 8,
  };
  return f[base];
}

export function acidityPercent(base: VinegarBase): number {
  const a: Record<VinegarBase, number> = {
    wine: 6, cider: 5, malt: 5, rice: 4, coconut: 4,
  };
  return a[base];
}

export function flavorComplexity(base: VinegarBase): number {
  const f: Record<VinegarBase, number> = {
    wine: 9, cider: 7, malt: 6, rice: 5, coconut: 8,
  };
  return f[base];
}

export function motherViability(base: VinegarBase): number {
  const m: Record<VinegarBase, number> = {
    wine: 8, cider: 9, malt: 6, rice: 5, coconut: 7,
  };
  return m[base];
}

export function agingMonths(base: VinegarBase): number {
  const a: Record<VinegarBase, number> = {
    wine: 6, cider: 3, malt: 4, rice: 12, coconut: 2,
  };
  return a[base];
}

export function bestCulinaryUse(base: VinegarBase): string {
  const b: Record<VinegarBase, string> = {
    wine: "vinaigrettes", cider: "pickling", malt: "fish_and_chips",
    rice: "sushi", coconut: "curries",
  };
  return b[base];
}

export function sugarContentNeeded(base: VinegarBase): boolean {
  const s: Record<VinegarBase, boolean> = {
    wine: false, cider: false, malt: false, rice: true, coconut: true,
  };
  return s[base];
}

export function pasteurized(base: VinegarBase): boolean {
  const p: Record<VinegarBase, boolean> = {
    wine: false, cider: false, malt: true, rice: true, coconut: false,
  };
  return p[base];
}

export function costPerLiter(base: VinegarBase): number {
  const c: Record<VinegarBase, number> = {
    wine: 12, cider: 6, malt: 4, rice: 8, coconut: 10,
  };
  return c[base];
}

export function vinegarBases(): VinegarBase[] {
  return ["wine", "cider", "malt", "rice", "coconut"];
}
