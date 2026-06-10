export type SeaAnchor = "parachute" | "drogue" | "series" | "jordan" | "galerider";

export function driftReduction(a: SeaAnchor): number {
  const m: Record<SeaAnchor, number> = {
    parachute: 10, drogue: 6, series: 8, jordan: 7, galerider: 5,
  };
  return m[a];
}

export function sternStability(a: SeaAnchor): number {
  const m: Record<SeaAnchor, number> = {
    parachute: 4, drogue: 8, series: 10, jordan: 9, galerider: 7,
  };
  return m[a];
}

export function deploymentEase(a: SeaAnchor): number {
  const m: Record<SeaAnchor, number> = {
    parachute: 4, drogue: 8, series: 3, jordan: 5, galerider: 9,
  };
  return m[a];
}

export function retrievalDifficulty(a: SeaAnchor): number {
  const m: Record<SeaAnchor, number> = {
    parachute: 9, drogue: 4, series: 8, jordan: 7, galerider: 3,
  };
  return m[a];
}

export function storageSize(a: SeaAnchor): number {
  const m: Record<SeaAnchor, number> = {
    parachute: 8, drogue: 4, series: 9, jordan: 7, galerider: 3,
  };
  return m[a];
}

export function multihullSafe(a: SeaAnchor): boolean {
  const m: Record<SeaAnchor, boolean> = {
    parachute: false, drogue: true, series: true, jordan: true, galerider: true,
  };
  return m[a];
}

export function heavyWeatherRated(a: SeaAnchor): boolean {
  const m: Record<SeaAnchor, boolean> = {
    parachute: true, drogue: false, series: true, jordan: true, galerider: false,
  };
  return m[a];
}

export function primaryFunction(a: SeaAnchor): string {
  const m: Record<SeaAnchor, string> = {
    parachute: "bow_hold_position", drogue: "stern_speed_control",
    series: "stern_breaking_wave", jordan: "stern_storm_survival",
    galerider: "stern_moderate_weather",
  };
  return m[a];
}

export function designerOrigin(a: SeaAnchor): string {
  const m: Record<SeaAnchor, string> = {
    parachute: "para_tech_delta", drogue: "cone_fabric_classic",
    series: "don_jordan_invention", jordan: "jordan_drogue_variant",
    galerider: "hathaway_reiser_design",
  };
  return m[a];
}

export function seaAnchors(): SeaAnchor[] {
  return ["parachute", "drogue", "series", "jordan", "galerider"];
}
