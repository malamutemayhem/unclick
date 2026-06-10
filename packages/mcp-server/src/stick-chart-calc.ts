export type StickChartType = "mattang" | "meddo" | "rebbelib" | "wapepe" | "tutorial";

export function islandsCovered(type: StickChartType): number {
  const i: Record<StickChartType, number> = {
    mattang: 4, meddo: 15, rebbelib: 30, wapepe: 8, tutorial: 2,
  };
  return i[type];
}

export function swellPatternsShown(type: StickChartType): number {
  const s: Record<StickChartType, number> = {
    mattang: 2, meddo: 5, rebbelib: 8, wapepe: 4, tutorial: 1,
  };
  return s[type];
}

export function stickCount(type: StickChartType): number {
  const c: Record<StickChartType, number> = {
    mattang: 8, meddo: 25, rebbelib: 50, wapepe: 15, tutorial: 4,
  };
  return c[type];
}

export function shellMarkers(type: StickChartType): number {
  const m: Record<StickChartType, number> = {
    mattang: 4, meddo: 15, rebbelib: 30, wapepe: 8, tutorial: 2,
  };
  return m[type];
}

export function constructionHours(type: StickChartType): number {
  const h: Record<StickChartType, number> = {
    mattang: 2, meddo: 8, rebbelib: 20, wapepe: 5, tutorial: 1,
  };
  return h[type];
}

export function readingDifficulty(type: StickChartType): number {
  const d: Record<StickChartType, number> = {
    mattang: 3, meddo: 6, rebbelib: 9, wapepe: 5, tutorial: 1,
  };
  return d[type];
}

export function personalToNavigator(type: StickChartType): boolean {
  return type !== "tutorial";
}

export function rangeNauticalMiles(type: StickChartType): number {
  const r: Record<StickChartType, number> = {
    mattang: 20, meddo: 80, rebbelib: 200, wapepe: 50, tutorial: 5,
  };
  return r[type];
}

export function culturalOrigin(): string {
  return "marshallese";
}

export function stickChartTypes(): StickChartType[] {
  return ["mattang", "meddo", "rebbelib", "wapepe", "tutorial"];
}
