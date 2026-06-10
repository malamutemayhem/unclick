export type RenewableSource = "solar_pv" | "onshore_wind" | "offshore_wind" | "geothermal" | "tidal";

export function capacityFactorPercent(r: RenewableSource): number {
  const m: Record<RenewableSource, number> = {
    solar_pv: 20, onshore_wind: 30, offshore_wind: 45, geothermal: 90, tidal: 25,
  };
  return m[r];
}

export function lcoeUsdPerMwh(r: RenewableSource): number {
  const m: Record<RenewableSource, number> = {
    solar_pv: 35, onshore_wind: 40, offshore_wind: 80, geothermal: 50, tidal: 120,
  };
  return m[r];
}

export function landUseKm2PerGw(r: RenewableSource): number {
  const m: Record<RenewableSource, number> = {
    solar_pv: 20, onshore_wind: 100, offshore_wind: 0, geothermal: 3, tidal: 0,
  };
  return m[r];
}

export function lifespanYears(r: RenewableSource): number {
  const m: Record<RenewableSource, number> = {
    solar_pv: 30, onshore_wind: 25, offshore_wind: 25, geothermal: 40, tidal: 50,
  };
  return m[r];
}

export function carbonPaybackMonths(r: RenewableSource): number {
  const m: Record<RenewableSource, number> = {
    solar_pv: 18, onshore_wind: 6, offshore_wind: 12, geothermal: 3, tidal: 24,
  };
  return m[r];
}

export function intermittent(r: RenewableSource): boolean {
  const m: Record<RenewableSource, boolean> = {
    solar_pv: true, onshore_wind: true, offshore_wind: true, geothermal: false, tidal: false,
  };
  return m[r];
}

export function requiresCoastal(r: RenewableSource): boolean {
  const m: Record<RenewableSource, boolean> = {
    solar_pv: false, onshore_wind: false, offshore_wind: true, geothermal: false, tidal: true,
  };
  return m[r];
}

export function topCountry(r: RenewableSource): string {
  const m: Record<RenewableSource, string> = {
    solar_pv: "china", onshore_wind: "china", offshore_wind: "united_kingdom",
    geothermal: "iceland", tidal: "south_korea",
  };
  return m[r];
}

export function storageNeeded(r: RenewableSource): string {
  const m: Record<RenewableSource, string> = {
    solar_pv: "battery", onshore_wind: "pumped_hydro", offshore_wind: "hydrogen",
    geothermal: "none", tidal: "minimal",
  };
  return m[r];
}

export function renewableSources(): RenewableSource[] {
  return ["solar_pv", "onshore_wind", "offshore_wind", "geothermal", "tidal"];
}
