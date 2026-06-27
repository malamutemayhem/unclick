export type SmokeCureMethod = "cold_smoke" | "hot_smoke" | "liquid_smoke" | "pit_smoke" | "chimney_smoke";

export function tempCelsius(method: SmokeCureMethod): number {
  const t: Record<SmokeCureMethod, number> = {
    cold_smoke: 25, hot_smoke: 80, liquid_smoke: 20, pit_smoke: 60, chimney_smoke: 45,
  };
  return t[method];
}

export function durationHours(method: SmokeCureMethod): number {
  const d: Record<SmokeCureMethod, number> = {
    cold_smoke: 48, hot_smoke: 6, liquid_smoke: 0.5, pit_smoke: 12, chimney_smoke: 24,
  };
  return d[method];
}

export function flavorIntensity(method: SmokeCureMethod): number {
  const f: Record<SmokeCureMethod, number> = {
    cold_smoke: 8, hot_smoke: 6, liquid_smoke: 3, pit_smoke: 9, chimney_smoke: 7,
  };
  return f[method];
}

export function preservationEffectiveness(method: SmokeCureMethod): number {
  const p: Record<SmokeCureMethod, number> = {
    cold_smoke: 9, hot_smoke: 7, liquid_smoke: 2, pit_smoke: 8, chimney_smoke: 8,
  };
  return p[method];
}

export function skillRequired(method: SmokeCureMethod): number {
  const s: Record<SmokeCureMethod, number> = {
    cold_smoke: 8, hot_smoke: 5, liquid_smoke: 1, pit_smoke: 7, chimney_smoke: 6,
  };
  return s[method];
}

export function equipmentNeeded(method: SmokeCureMethod): boolean {
  const e: Record<SmokeCureMethod, boolean> = {
    cold_smoke: true, hot_smoke: true, liquid_smoke: false, pit_smoke: false, chimney_smoke: true,
  };
  return e[method];
}

export function bestMeat(method: SmokeCureMethod): string {
  const b: Record<SmokeCureMethod, string> = {
    cold_smoke: "salmon", hot_smoke: "pork_ribs", liquid_smoke: "jerky",
    pit_smoke: "brisket", chimney_smoke: "ham",
  };
  return b[method];
}

export function shelfLifeWeeks(method: SmokeCureMethod): number {
  const s: Record<SmokeCureMethod, number> = {
    cold_smoke: 8, hot_smoke: 4, liquid_smoke: 2, pit_smoke: 6, chimney_smoke: 6,
  };
  return s[method];
}

export function costRating(method: SmokeCureMethod): number {
  const c: Record<SmokeCureMethod, number> = {
    cold_smoke: 7, hot_smoke: 5, liquid_smoke: 2, pit_smoke: 4, chimney_smoke: 6,
  };
  return c[method];
}

export function smokeCureMethods(): SmokeCureMethod[] {
  return ["cold_smoke", "hot_smoke", "liquid_smoke", "pit_smoke", "chimney_smoke"];
}
