export type NoriaType = "stream_driven" | "animal_powered" | "hand_cranked" | "tidal" | "modern_replica";

export function wheelDiameterMeters(type: NoriaType): number {
  const d: Record<NoriaType, number> = {
    stream_driven: 12, animal_powered: 8, hand_cranked: 3, tidal: 10, modern_replica: 6,
  };
  return d[type];
}

export function bucketsCount(type: NoriaType): number {
  const b: Record<NoriaType, number> = {
    stream_driven: 40, animal_powered: 30, hand_cranked: 12, tidal: 35, modern_replica: 24,
  };
  return b[type];
}

export function liftHeightMeters(type: NoriaType): number {
  const h: Record<NoriaType, number> = {
    stream_driven: 10, animal_powered: 7, hand_cranked: 2.5, tidal: 8, modern_replica: 5,
  };
  return h[type];
}

export function flowRateLitersPerMin(type: NoriaType): number {
  const f: Record<NoriaType, number> = {
    stream_driven: 200, animal_powered: 120, hand_cranked: 30, tidal: 150, modern_replica: 80,
  };
  return f[type];
}

export function powerSource(type: NoriaType): string {
  const p: Record<NoriaType, string> = {
    stream_driven: "river_current", animal_powered: "draft_animal",
    hand_cranked: "human", tidal: "tidal_flow", modern_replica: "electric_motor",
  };
  return p[type];
}

export function maintenanceFrequencyWeeks(type: NoriaType): number {
  const m: Record<NoriaType, number> = {
    stream_driven: 4, animal_powered: 2, hand_cranked: 8, tidal: 3, modern_replica: 12,
  };
  return m[type];
}

export function buildComplexity(type: NoriaType): number {
  const c: Record<NoriaType, number> = {
    stream_driven: 9, animal_powered: 7, hand_cranked: 4, tidal: 8, modern_replica: 6,
  };
  return c[type];
}

export function selfPowered(type: NoriaType): boolean {
  return type === "stream_driven" || type === "tidal";
}

export function costEstimate(type: NoriaType): number {
  const c: Record<NoriaType, number> = {
    stream_driven: 5000, animal_powered: 3000, hand_cranked: 500, tidal: 4000, modern_replica: 8000,
  };
  return c[type];
}

export function noriaTypes(): NoriaType[] {
  return ["stream_driven", "animal_powered", "hand_cranked", "tidal", "modern_replica"];
}
