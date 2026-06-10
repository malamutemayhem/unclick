export type LonghouseStyle = "iroquois" | "viking" | "dayak" | "maori_wharenui" | "celtic";

export function lengthMeters(style: LonghouseStyle): number {
  const l: Record<LonghouseStyle, number> = {
    iroquois: 30, viking: 25, dayak: 50, maori_wharenui: 20, celtic: 15,
  };
  return l[style];
}

export function widthMeters(style: LonghouseStyle): number {
  const w: Record<LonghouseStyle, number> = {
    iroquois: 6, viking: 5, dayak: 8, maori_wharenui: 7, celtic: 5,
  };
  return w[style];
}

export function familiesHoused(style: LonghouseStyle): number {
  const f: Record<LonghouseStyle, number> = {
    iroquois: 10, viking: 4, dayak: 20, maori_wharenui: 1, celtic: 3,
  };
  return f[style];
}

export function centralHearthCount(style: LonghouseStyle): number {
  const h: Record<LonghouseStyle, number> = {
    iroquois: 5, viking: 1, dayak: 3, maori_wharenui: 1, celtic: 1,
  };
  return h[style];
}

export function constructionWeeks(style: LonghouseStyle): number {
  const w: Record<LonghouseStyle, number> = {
    iroquois: 8, viking: 12, dayak: 16, maori_wharenui: 10, celtic: 6,
  };
  return w[style];
}

export function raisedFloor(style: LonghouseStyle): boolean {
  return style === "dayak";
}

export function carvingDetail(style: LonghouseStyle): number {
  const c: Record<LonghouseStyle, number> = {
    iroquois: 4, viking: 7, dayak: 6, maori_wharenui: 10, celtic: 3,
  };
  return c[style];
}

export function roofMaterial(style: LonghouseStyle): string {
  const r: Record<LonghouseStyle, string> = {
    iroquois: "bark_sheets", viking: "turf_thatch", dayak: "palm_leaf",
    maori_wharenui: "raupo_thatch", celtic: "wattle_thatch",
  };
  return r[style];
}

export function lifespanYears(style: LonghouseStyle): number {
  const l: Record<LonghouseStyle, number> = {
    iroquois: 15, viking: 30, dayak: 20, maori_wharenui: 25, celtic: 12,
  };
  return l[style];
}

export function longhouseStyles(): LonghouseStyle[] {
  return ["iroquois", "viking", "dayak", "maori_wharenui", "celtic"];
}
