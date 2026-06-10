export type SmokehouseType = "cold_smoke" | "hot_smoke" | "offset" | "pit_smoke" | "cabinet";

export function tempRangeCelsius(smokehouse: SmokehouseType): number {
  const t: Record<SmokehouseType, number> = {
    cold_smoke: 30, hot_smoke: 120, offset: 130, pit_smoke: 150, cabinet: 110,
  };
  return t[smokehouse];
}

export function smokingHoursTypical(smokehouse: SmokehouseType): number {
  const h: Record<SmokehouseType, number> = {
    cold_smoke: 48, hot_smoke: 6, offset: 12, pit_smoke: 16, cabinet: 4,
  };
  return h[smokehouse];
}

export function flavorIntensity(smokehouse: SmokehouseType): number {
  const f: Record<SmokehouseType, number> = {
    cold_smoke: 6, hot_smoke: 8, offset: 9, pit_smoke: 10, cabinet: 5,
  };
  return f[smokehouse];
}

export function moistureRetention(smokehouse: SmokehouseType): number {
  const m: Record<SmokehouseType, number> = {
    cold_smoke: 9, hot_smoke: 6, offset: 7, pit_smoke: 5, cabinet: 7,
  };
  return m[smokehouse];
}

export function capacityKg(smokehouse: SmokehouseType): number {
  const c: Record<SmokehouseType, number> = {
    cold_smoke: 20, hot_smoke: 15, offset: 50, pit_smoke: 100, cabinet: 10,
  };
  return c[smokehouse];
}

export function tempControlPrecision(smokehouse: SmokehouseType): number {
  const p: Record<SmokehouseType, number> = {
    cold_smoke: 6, hot_smoke: 7, offset: 5, pit_smoke: 3, cabinet: 9,
  };
  return p[smokehouse];
}

export function fuelType(smokehouse: SmokehouseType): string {
  const f: Record<SmokehouseType, string> = {
    cold_smoke: "wood_chips", hot_smoke: "wood_chunks", offset: "logs",
    pit_smoke: "hardwood", cabinet: "pellets",
  };
  return f[smokehouse];
}

export function skillLevel(smokehouse: SmokehouseType): number {
  const s: Record<SmokehouseType, number> = {
    cold_smoke: 7, hot_smoke: 4, offset: 6, pit_smoke: 8, cabinet: 2,
  };
  return s[smokehouse];
}

export function costEstimate(smokehouse: SmokehouseType): number {
  const c: Record<SmokehouseType, number> = {
    cold_smoke: 200, hot_smoke: 300, offset: 800, pit_smoke: 150, cabinet: 500,
  };
  return c[smokehouse];
}

export function smokehouseTypes(): SmokehouseType[] {
  return ["cold_smoke", "hot_smoke", "offset", "pit_smoke", "cabinet"];
}
