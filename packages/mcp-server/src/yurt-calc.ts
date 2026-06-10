export type YurtStyle = "mongolian_ger" | "turkic_yurt" | "kazakh" | "kyrgyz" | "modern_glamping";

export function diameterMeters(style: YurtStyle): number {
  const d: Record<YurtStyle, number> = {
    mongolian_ger: 6, turkic_yurt: 5, kazakh: 7, kyrgyz: 5.5, modern_glamping: 8,
  };
  return d[style];
}

export function wallSections(style: YurtStyle): number {
  const w: Record<YurtStyle, number> = {
    mongolian_ger: 5, turkic_yurt: 4, kazakh: 6, kyrgyz: 4, modern_glamping: 8,
  };
  return w[style];
}

export function setupTimeHours(style: YurtStyle): number {
  const h: Record<YurtStyle, number> = {
    mongolian_ger: 2, turkic_yurt: 3, kazakh: 2.5, kyrgyz: 3, modern_glamping: 8,
  };
  return h[style];
}

export function feltLayerCount(style: YurtStyle): number {
  const f: Record<YurtStyle, number> = {
    mongolian_ger: 3, turkic_yurt: 2, kazakh: 4, kyrgyz: 2, modern_glamping: 0,
  };
  return f[style];
}

export function windResistanceKph(style: YurtStyle): number {
  const w: Record<YurtStyle, number> = {
    mongolian_ger: 80, turkic_yurt: 60, kazakh: 90, kyrgyz: 65, modern_glamping: 50,
  };
  return w[style];
}

export function insulation(style: YurtStyle): number {
  const i: Record<YurtStyle, number> = {
    mongolian_ger: 8, turkic_yurt: 6, kazakh: 9, kyrgyz: 7, modern_glamping: 5,
  };
  return i[style];
}

export function portable(style: YurtStyle): boolean {
  return style !== "modern_glamping";
}

export function occupancyPersons(style: YurtStyle): number {
  const o: Record<YurtStyle, number> = {
    mongolian_ger: 6, turkic_yurt: 5, kazakh: 8, kyrgyz: 5, modern_glamping: 4,
  };
  return o[style];
}

export function costEstimate(style: YurtStyle): number {
  const c: Record<YurtStyle, number> = {
    mongolian_ger: 3000, turkic_yurt: 2000, kazakh: 4000, kyrgyz: 2500, modern_glamping: 15000,
  };
  return c[style];
}

export function yurtStyles(): YurtStyle[] {
  return ["mongolian_ger", "turkic_yurt", "kazakh", "kyrgyz", "modern_glamping"];
}
