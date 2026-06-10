export type FogType = "radiation" | "advection" | "upslope" | "evaporation" | "ice";

export function visibilityMeters(fog: FogType): number {
  const m: Record<FogType, number> = {
    radiation: 200, advection: 100, upslope: 300, evaporation: 500, ice: 150,
  };
  return m[fog];
}

export function durationHours(fog: FogType): number {
  const m: Record<FogType, number> = {
    radiation: 4, advection: 24, upslope: 12, evaporation: 2, ice: 8,
  };
  return m[fog];
}

export function formationSpeedMinutes(fog: FogType): number {
  const m: Record<FogType, number> = {
    radiation: 60, advection: 30, upslope: 120, evaporation: 15, ice: 45,
  };
  return m[fog];
}

export function densityRating(fog: FogType): number {
  const m: Record<FogType, number> = {
    radiation: 7, advection: 10, upslope: 5, evaporation: 3, ice: 8,
  };
  return m[fog];
}

export function aviationHazard(fog: FogType): number {
  const m: Record<FogType, number> = {
    radiation: 6, advection: 10, upslope: 7, evaporation: 3, ice: 9,
  };
  return m[fog];
}

export function diurnalCycle(fog: FogType): boolean {
  const m: Record<FogType, boolean> = {
    radiation: true, advection: false, upslope: false, evaporation: true, ice: false,
  };
  return m[fog];
}

export function requiresWindCalm(fog: FogType): boolean {
  const m: Record<FogType, boolean> = {
    radiation: true, advection: false, upslope: false, evaporation: true, ice: true,
  };
  return m[fog];
}

export function typicalSeason(fog: FogType): string {
  const m: Record<FogType, string> = {
    radiation: "autumn", advection: "spring", upslope: "year_round",
    evaporation: "autumn", ice: "winter",
  };
  return m[fog];
}

export function dissipationMechanism(fog: FogType): string {
  const m: Record<FogType, string> = {
    radiation: "solar_heating", advection: "wind_shift", upslope: "descending_air",
    evaporation: "surface_cooling", ice: "temperature_rise",
  };
  return m[fog];
}

export function fogTypes(): FogType[] {
  return ["radiation", "advection", "upslope", "evaporation", "ice"];
}
