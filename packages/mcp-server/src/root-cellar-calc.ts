export type CellarType = "hillside" | "basement" | "buried" | "spring_house" | "cold_room";

export function tempRangeCelsius(cellar: CellarType): number {
  const t: Record<CellarType, number> = {
    hillside: 4, basement: 8, buried: 3, spring_house: 5, cold_room: 6,
  };
  return t[cellar];
}

export function humidityPercent(cellar: CellarType): number {
  const h: Record<CellarType, number> = {
    hillside: 90, basement: 70, buried: 95, spring_house: 85, cold_room: 75,
  };
  return h[cellar];
}

export function storageMonths(cellar: CellarType): number {
  const s: Record<CellarType, number> = {
    hillside: 6, basement: 4, buried: 8, spring_house: 5, cold_room: 3,
  };
  return s[cellar];
}

export function constructionDays(cellar: CellarType): number {
  const c: Record<CellarType, number> = {
    hillside: 30, basement: 14, buried: 21, spring_house: 25, cold_room: 7,
  };
  return c[cellar];
}

export function capacityBushels(cellar: CellarType): number {
  const c: Record<CellarType, number> = {
    hillside: 200, basement: 100, buried: 150, spring_house: 80, cold_room: 60,
  };
  return c[cellar];
}

export function ventilationNeeded(cellar: CellarType): boolean {
  const v: Record<CellarType, boolean> = {
    hillside: true, basement: true, buried: true, spring_house: false, cold_room: true,
  };
  return v[cellar];
}

export function floodRisk(cellar: CellarType): number {
  const f: Record<CellarType, number> = {
    hillside: 2, basement: 6, buried: 4, spring_house: 8, cold_room: 1,
  };
  return f[cellar];
}

export function bestCrop(cellar: CellarType): string {
  const b: Record<CellarType, string> = {
    hillside: "potatoes", basement: "apples", buried: "root_vegetables",
    spring_house: "dairy", cold_room: "canned_goods",
  };
  return b[cellar];
}

export function costEstimate(cellar: CellarType): number {
  const c: Record<CellarType, number> = {
    hillside: 3000, basement: 1500, buried: 2000, spring_house: 2500, cold_room: 800,
  };
  return c[cellar];
}

export function cellarTypes(): CellarType[] {
  return ["hillside", "basement", "buried", "spring_house", "cold_room"];
}
