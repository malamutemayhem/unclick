export type CandleWax = "beeswax" | "soy" | "paraffin" | "tallow" | "bayberry";

export function burnTempCelsius(wax: CandleWax): number {
  const b: Record<CandleWax, number> = {
    beeswax: 64, soy: 46, paraffin: 55, tallow: 42, bayberry: 48,
  };
  return b[wax];
}

export function burnTimeMultiplier(wax: CandleWax): number {
  const t: Record<CandleWax, number> = {
    beeswax: 2.0, soy: 1.5, paraffin: 1.0, tallow: 0.8, bayberry: 1.8,
  };
  return t[wax];
}

export function aromaLevel(wax: CandleWax): number {
  const a: Record<CandleWax, number> = {
    beeswax: 7, soy: 4, paraffin: 2, tallow: 5, bayberry: 9,
  };
  return a[wax];
}

export function sootLevel(wax: CandleWax): number {
  const s: Record<CandleWax, number> = {
    beeswax: 1, soy: 2, paraffin: 8, tallow: 6, bayberry: 3,
  };
  return s[wax];
}

export function natural(wax: CandleWax): boolean {
  const n: Record<CandleWax, boolean> = {
    beeswax: true, soy: true, paraffin: false, tallow: true, bayberry: true,
  };
  return n[wax];
}

export function scentThrow(wax: CandleWax): number {
  const s: Record<CandleWax, number> = {
    beeswax: 5, soy: 8, paraffin: 9, tallow: 3, bayberry: 6,
  };
  return s[wax];
}

export function colorRetention(wax: CandleWax): number {
  const c: Record<CandleWax, number> = {
    beeswax: 4, soy: 7, paraffin: 10, tallow: 3, bayberry: 5,
  };
  return c[wax];
}

export function bestApplication(wax: CandleWax): string {
  const b: Record<CandleWax, string> = {
    beeswax: "tapers", soy: "containers", paraffin: "pillars",
    tallow: "emergency", bayberry: "holiday",
  };
  return b[wax];
}

export function costPerKg(wax: CandleWax): number {
  const c: Record<CandleWax, number> = {
    beeswax: 30, soy: 8, paraffin: 4, tallow: 6, bayberry: 50,
  };
  return c[wax];
}

export function candleWaxes(): CandleWax[] {
  return ["beeswax", "soy", "paraffin", "tallow", "bayberry"];
}
