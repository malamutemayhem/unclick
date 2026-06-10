export type AircraftType = "single_prop" | "twin_engine" | "jet" | "helicopter" | "glider";

export function cruiseSpeedKmh(ac: AircraftType): number {
  const m: Record<AircraftType, number> = {
    single_prop: 200, twin_engine: 350, jet: 900, helicopter: 250, glider: 100,
  };
  return m[ac];
}

export function rangeKm(ac: AircraftType): number {
  const m: Record<AircraftType, number> = {
    single_prop: 1000, twin_engine: 2500, jet: 10000, helicopter: 600, glider: 500,
  };
  return m[ac];
}

export function passengerCapacity(ac: AircraftType): number {
  const m: Record<AircraftType, number> = {
    single_prop: 4, twin_engine: 8, jet: 180, helicopter: 6, glider: 2,
  };
  return m[ac];
}

export function fuelEfficiency(ac: AircraftType): number {
  const m: Record<AircraftType, number> = {
    single_prop: 7, twin_engine: 5, jet: 3, helicopter: 2, glider: 10,
  };
  return m[ac];
}

export function pilotLicenseHours(ac: AircraftType): number {
  const m: Record<AircraftType, number> = {
    single_prop: 40, twin_engine: 100, jet: 250, helicopter: 60, glider: 20,
  };
  return m[ac];
}

export function verticalTakeoff(ac: AircraftType): boolean {
  const m: Record<AircraftType, boolean> = {
    single_prop: false, twin_engine: false, jet: false, helicopter: true, glider: false,
  };
  return m[ac];
}

export function enginePowered(ac: AircraftType): boolean {
  const m: Record<AircraftType, boolean> = {
    single_prop: true, twin_engine: true, jet: true, helicopter: true, glider: false,
  };
  return m[ac];
}

export function bestApplication(ac: AircraftType): string {
  const m: Record<AircraftType, string> = {
    single_prop: "training", twin_engine: "charter", jet: "airline",
    helicopter: "emergency", glider: "recreation",
  };
  return m[ac];
}

export function operatingCostPerHour(ac: AircraftType): number {
  const m: Record<AircraftType, number> = {
    single_prop: 150, twin_engine: 400, jet: 5000, helicopter: 800, glider: 50,
  };
  return m[ac];
}

export function aircraftTypes(): AircraftType[] {
  return ["single_prop", "twin_engine", "jet", "helicopter", "glider"];
}
