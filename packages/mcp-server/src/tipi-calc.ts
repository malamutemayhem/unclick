export type TipiCover = "buffalo_hide" | "elk_hide" | "canvas" | "birch_bark" | "modern_synthetic";

export function polesRequired(cover: TipiCover): number {
  const p: Record<TipiCover, number> = {
    buffalo_hide: 15, elk_hide: 12, canvas: 14, birch_bark: 10, modern_synthetic: 16,
  };
  return p[cover];
}

export function diameterMeters(cover: TipiCover): number {
  const d: Record<TipiCover, number> = {
    buffalo_hide: 5, elk_hide: 4, canvas: 5.5, birch_bark: 3.5, modern_synthetic: 6,
  };
  return d[cover];
}

export function setupTimeMinutes(cover: TipiCover): number {
  const m: Record<TipiCover, number> = {
    buffalo_hide: 30, elk_hide: 25, canvas: 20, birch_bark: 45, modern_synthetic: 15,
  };
  return m[cover];
}

export function smokeFlapsAdjustable(cover: TipiCover): boolean {
  return cover !== "birch_bark";
}

export function waterResistance(cover: TipiCover): number {
  const w: Record<TipiCover, number> = {
    buffalo_hide: 7, elk_hide: 6, canvas: 8, birch_bark: 9, modern_synthetic: 10,
  };
  return w[cover];
}

export function weightKg(cover: TipiCover): number {
  const w: Record<TipiCover, number> = {
    buffalo_hide: 50, elk_hide: 35, canvas: 25, birch_bark: 20, modern_synthetic: 15,
  };
  return w[cover];
}

export function hidesRequired(cover: TipiCover): number {
  const h: Record<TipiCover, number> = {
    buffalo_hide: 12, elk_hide: 18, canvas: 0, birch_bark: 0, modern_synthetic: 0,
  };
  return h[cover];
}

export function insulation(cover: TipiCover): number {
  const i: Record<TipiCover, number> = {
    buffalo_hide: 8, elk_hide: 7, canvas: 4, birch_bark: 5, modern_synthetic: 6,
  };
  return i[cover];
}

export function costEstimate(cover: TipiCover): number {
  const c: Record<TipiCover, number> = {
    buffalo_hide: 5000, elk_hide: 3000, canvas: 800, birch_bark: 400, modern_synthetic: 1500,
  };
  return c[cover];
}

export function tipiCovers(): TipiCover[] {
  return ["buffalo_hide", "elk_hide", "canvas", "birch_bark", "modern_synthetic"];
}
