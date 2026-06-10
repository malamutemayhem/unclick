export type PaperFiber = "cotton_rag" | "kozo" | "flax" | "abaca" | "recycled";

export function fiberLengthMm(fiber: PaperFiber): number {
  const l: Record<PaperFiber, number> = {
    cotton_rag: 25, kozo: 12, flax: 30, abaca: 6, recycled: 3,
  };
  return l[fiber];
}

export function strengthRating(fiber: PaperFiber): number {
  const s: Record<PaperFiber, number> = {
    cotton_rag: 8, kozo: 9, flax: 7, abaca: 10, recycled: 3,
  };
  return s[fiber];
}

export function opacityRating(fiber: PaperFiber): number {
  const o: Record<PaperFiber, number> = {
    cotton_rag: 7, kozo: 4, flax: 8, abaca: 3, recycled: 6,
  };
  return o[fiber];
}

export function absorbencyRating(fiber: PaperFiber): number {
  const a: Record<PaperFiber, number> = {
    cotton_rag: 9, kozo: 7, flax: 6, abaca: 5, recycled: 8,
  };
  return a[fiber];
}

export function archivalYears(fiber: PaperFiber): number {
  const y: Record<PaperFiber, number> = {
    cotton_rag: 500, kozo: 1000, flax: 400, abaca: 300, recycled: 50,
  };
  return y[fiber];
}

export function acidFree(fiber: PaperFiber): boolean {
  return fiber !== "recycled";
}

export function beatingTimeMinutes(fiber: PaperFiber): number {
  const b: Record<PaperFiber, number> = {
    cotton_rag: 60, kozo: 30, flax: 90, abaca: 20, recycled: 10,
  };
  return b[fiber];
}

export function sheetFormingDifficulty(fiber: PaperFiber): number {
  const d: Record<PaperFiber, number> = {
    cotton_rag: 5, kozo: 7, flax: 6, abaca: 4, recycled: 3,
  };
  return d[fiber];
}

export function costPerKg(fiber: PaperFiber): number {
  const c: Record<PaperFiber, number> = {
    cotton_rag: 15, kozo: 40, flax: 20, abaca: 25, recycled: 3,
  };
  return c[fiber];
}

export function paperFibers(): PaperFiber[] {
  return ["cotton_rag", "kozo", "flax", "abaca", "recycled"];
}
