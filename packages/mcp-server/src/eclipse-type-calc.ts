export type EclipseType = "total_solar" | "partial_solar" | "annular_solar" | "total_lunar" | "penumbral_lunar";

export function durationMinutes(eclipse: EclipseType): number {
  const m: Record<EclipseType, number> = {
    total_solar: 7, partial_solar: 120, annular_solar: 12, total_lunar: 100, penumbral_lunar: 240,
  };
  return m[eclipse];
}

export function spectacularRating(eclipse: EclipseType): number {
  const m: Record<EclipseType, number> = {
    total_solar: 10, partial_solar: 5, annular_solar: 8, total_lunar: 7, penumbral_lunar: 2,
  };
  return m[eclipse];
}

export function frequencyPerCentury(eclipse: EclipseType): number {
  const m: Record<EclipseType, number> = {
    total_solar: 70, partial_solar: 120, annular_solar: 65, total_lunar: 85, penumbral_lunar: 90,
  };
  return m[eclipse];
}

export function scientificValue(eclipse: EclipseType): number {
  const m: Record<EclipseType, number> = {
    total_solar: 10, partial_solar: 3, annular_solar: 6, total_lunar: 5, penumbral_lunar: 2,
  };
  return m[eclipse];
}

export function viewingPathWidthKm(eclipse: EclipseType): number {
  const m: Record<EclipseType, number> = {
    total_solar: 250, partial_solar: 5000, annular_solar: 300, total_lunar: 10000, penumbral_lunar: 10000,
  };
  return m[eclipse];
}

export function safeWithoutFilter(eclipse: EclipseType): boolean {
  const m: Record<EclipseType, boolean> = {
    total_solar: false, partial_solar: false, annular_solar: false, total_lunar: true, penumbral_lunar: true,
  };
  return m[eclipse];
}

export function coronaVisible(eclipse: EclipseType): boolean {
  const m: Record<EclipseType, boolean> = {
    total_solar: true, partial_solar: false, annular_solar: false, total_lunar: false, penumbral_lunar: false,
  };
  return m[eclipse];
}

export function bestObservation(eclipse: EclipseType): string {
  const m: Record<EclipseType, string> = {
    total_solar: "path_of_totality", partial_solar: "solar_filter", annular_solar: "ring_of_fire_path",
    total_lunar: "anywhere_nightside", penumbral_lunar: "careful_observation",
  };
  return m[eclipse];
}

export function photographyDifficulty(eclipse: EclipseType): number {
  const m: Record<EclipseType, number> = {
    total_solar: 9, partial_solar: 5, annular_solar: 7, total_lunar: 4, penumbral_lunar: 8,
  };
  return m[eclipse];
}

export function eclipseTypes(): EclipseType[] {
  return ["total_solar", "partial_solar", "annular_solar", "total_lunar", "penumbral_lunar"];
}
