export type MarineNav = "gps" | "radar" | "chart_plotter" | "sextant" | "ais";

export function accuracyMeters(n: MarineNav): number {
  const m: Record<MarineNav, number> = {
    gps: 3, radar: 50, chart_plotter: 5, sextant: 1800, ais: 10,
  };
  return m[n];
}

export function allWeatherReliability(n: MarineNav): number {
  const m: Record<MarineNav, number> = {
    gps: 8, radar: 10, chart_plotter: 8, sextant: 3, ais: 9,
  };
  return m[n];
}

export function collisionAvoidance(n: MarineNav): number {
  const m: Record<MarineNav, number> = {
    gps: 3, radar: 9, chart_plotter: 5, sextant: 0, ais: 10,
  };
  return m[n];
}

export function powerConsumption(n: MarineNav): number {
  const m: Record<MarineNav, number> = {
    gps: 3, radar: 9, chart_plotter: 5, sextant: 0, ais: 4,
  };
  return m[n];
}

export function learningDifficulty(n: MarineNav): number {
  const m: Record<MarineNav, number> = {
    gps: 2, radar: 7, chart_plotter: 4, sextant: 10, ais: 5,
  };
  return m[n];
}

export function requiresElectricity(n: MarineNav): boolean {
  const m: Record<MarineNav, boolean> = {
    gps: true, radar: true, chart_plotter: true, sextant: false, ais: true,
  };
  return m[n];
}

export function tracksOtherVessels(n: MarineNav): boolean {
  const m: Record<MarineNav, boolean> = {
    gps: false, radar: true, chart_plotter: false, sextant: false, ais: true,
  };
  return m[n];
}

export function bestUse(n: MarineNav): string {
  const m: Record<MarineNav, string> = {
    gps: "position_fixing", radar: "fog_navigation",
    chart_plotter: "coastal_cruising", sextant: "offshore_backup",
    ais: "traffic_monitoring",
  };
  return m[n];
}

export function inventionDecade(n: MarineNav): string {
  const m: Record<MarineNav, string> = {
    gps: "1970s", radar: "1940s", chart_plotter: "1980s",
    sextant: "1730s", ais: "2000s",
  };
  return m[n];
}

export function marineNavs(): MarineNav[] {
  return ["gps", "radar", "chart_plotter", "sextant", "ais"];
}
