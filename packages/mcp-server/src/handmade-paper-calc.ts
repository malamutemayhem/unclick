export type PaperFiber = "cotton" | "kozo" | "flax" | "hemp" | "abaca";

export function sheetWeightGsm(fiber: PaperFiber): number {
  const w: Record<PaperFiber, number> = {
    cotton: 90, kozo: 30, flax: 100, hemp: 80, abaca: 60,
  };
  return w[fiber];
}

export function fiberLengthMm(fiber: PaperFiber): number {
  const l: Record<PaperFiber, number> = {
    cotton: 25, kozo: 12, flax: 30, hemp: 20, abaca: 6,
  };
  return l[fiber];
}

export function tearStrength(fiber: PaperFiber): number {
  const t: Record<PaperFiber, number> = {
    cotton: 7, kozo: 10, flax: 8, hemp: 6, abaca: 9,
  };
  return t[fiber];
}

export function opacity(fiber: PaperFiber): number {
  const o: Record<PaperFiber, number> = {
    cotton: 8, kozo: 3, flax: 9, hemp: 7, abaca: 5,
  };
  return o[fiber];
}

export function absorbency(fiber: PaperFiber): number {
  const a: Record<PaperFiber, number> = {
    cotton: 9, kozo: 7, flax: 6, hemp: 8, abaca: 5,
  };
  return a[fiber];
}

export function archivalQuality(fiber: PaperFiber): number {
  const a: Record<PaperFiber, number> = {
    cotton: 10, kozo: 10, flax: 9, hemp: 8, abaca: 9,
  };
  return a[fiber];
}

export function bestUse(fiber: PaperFiber): string {
  const b: Record<PaperFiber, string> = {
    cotton: "printmaking", kozo: "shoji_screens", flax: "currency",
    hemp: "sketching", abaca: "tea_bags",
  };
  return b[fiber];
}

export function processingHours(fiber: PaperFiber): number {
  const p: Record<PaperFiber, number> = {
    cotton: 4, kozo: 8, flax: 6, hemp: 5, abaca: 3,
  };
  return p[fiber];
}

export function costPerKg(fiber: PaperFiber): number {
  const c: Record<PaperFiber, number> = {
    cotton: 15, kozo: 40, flax: 20, hemp: 12, abaca: 25,
  };
  return c[fiber];
}

export function paperFibers(): PaperFiber[] {
  return ["cotton", "kozo", "flax", "hemp", "abaca"];
}
