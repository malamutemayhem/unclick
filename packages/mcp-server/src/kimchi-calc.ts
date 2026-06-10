export type KimchiStyle = "baechu" | "kkakdugi" | "oi_sobagi" | "dongchimi" | "yeolmu";

export function saltingHours(style: KimchiStyle): number {
  const h: Record<KimchiStyle, number> = {
    baechu: 8, kkakdugi: 2, oi_sobagi: 1, dongchimi: 4, yeolmu: 1,
  };
  return h[style];
}

export function fermentationDays(style: KimchiStyle): number {
  const d: Record<KimchiStyle, number> = {
    baechu: 5, kkakdugi: 3, oi_sobagi: 2, dongchimi: 7, yeolmu: 2,
  };
  return d[style];
}

export function chiliFlakesPercent(style: KimchiStyle): number {
  const p: Record<KimchiStyle, number> = {
    baechu: 8, kkakdugi: 10, oi_sobagi: 6, dongchimi: 0, yeolmu: 5,
  };
  return p[style];
}

export function fishSauceRequired(style: KimchiStyle): boolean {
  return style !== "dongchimi";
}

export function crunchRetention(style: KimchiStyle): number {
  const c: Record<KimchiStyle, number> = {
    baechu: 6, kkakdugi: 9, oi_sobagi: 8, dongchimi: 4, yeolmu: 7,
  };
  return c[style];
}

export function liquidContent(style: KimchiStyle): number {
  const l: Record<KimchiStyle, number> = {
    baechu: 5, kkakdugi: 4, oi_sobagi: 6, dongchimi: 9, yeolmu: 5,
  };
  return l[style];
}

export function shelfLifeWeeks(style: KimchiStyle): number {
  const w: Record<KimchiStyle, number> = {
    baechu: 12, kkakdugi: 8, oi_sobagi: 2, dongchimi: 10, yeolmu: 2,
  };
  return w[style];
}

export function spiceLevel(style: KimchiStyle): number {
  const s: Record<KimchiStyle, number> = {
    baechu: 7, kkakdugi: 8, oi_sobagi: 5, dongchimi: 1, yeolmu: 4,
  };
  return s[style];
}

export function costPerKg(style: KimchiStyle): number {
  const c: Record<KimchiStyle, number> = {
    baechu: 8, kkakdugi: 10, oi_sobagi: 12, dongchimi: 6, yeolmu: 9,
  };
  return c[style];
}

export function kimchiStyles(): KimchiStyle[] {
  return ["baechu", "kkakdugi", "oi_sobagi", "dongchimi", "yeolmu"];
}
