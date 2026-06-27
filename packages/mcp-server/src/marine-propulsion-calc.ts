export type MarinePropulsion = "outboard" | "inboard_diesel" | "sail" | "jet_drive" | "electric_pod";

export function topSpeed(p: MarinePropulsion): number {
  const m: Record<MarinePropulsion, number> = {
    outboard: 8, inboard_diesel: 7, sail: 4, jet_drive: 10, electric_pod: 6,
  };
  return m[p];
}

export function fuelEfficiency(p: MarinePropulsion): number {
  const m: Record<MarinePropulsion, number> = {
    outboard: 5, inboard_diesel: 7, sail: 10, jet_drive: 3, electric_pod: 8,
  };
  return m[p];
}

export function maintenanceCost(p: MarinePropulsion): number {
  const m: Record<MarinePropulsion, number> = {
    outboard: 5, inboard_diesel: 7, sail: 4, jet_drive: 8, electric_pod: 6,
  };
  return m[p];
}

export function noiseLevel(p: MarinePropulsion): number {
  const m: Record<MarinePropulsion, number> = {
    outboard: 7, inboard_diesel: 8, sail: 1, jet_drive: 9, electric_pod: 2,
  };
  return m[p];
}

export function maneuverability(p: MarinePropulsion): number {
  const m: Record<MarinePropulsion, number> = {
    outboard: 8, inboard_diesel: 5, sail: 4, jet_drive: 10, electric_pod: 7,
  };
  return m[p];
}

export function zeroCarbonOperation(p: MarinePropulsion): boolean {
  const m: Record<MarinePropulsion, boolean> = {
    outboard: false, inboard_diesel: false, sail: true, jet_drive: false, electric_pod: true,
  };
  return m[p];
}

export function shallowWaterSafe(p: MarinePropulsion): boolean {
  const m: Record<MarinePropulsion, boolean> = {
    outboard: true, inboard_diesel: false, sail: false, jet_drive: true, electric_pod: false,
  };
  return m[p];
}

export function typicalVessel(p: MarinePropulsion): string {
  const m: Record<MarinePropulsion, string> = {
    outboard: "runabout_fishing", inboard_diesel: "trawler_cruiser",
    sail: "sailboat_yacht", jet_drive: "personal_watercraft",
    electric_pod: "ferry_expedition",
  };
  return m[p];
}

export function powerSource(p: MarinePropulsion): string {
  const m: Record<MarinePropulsion, string> = {
    outboard: "gasoline_engine", inboard_diesel: "diesel_engine",
    sail: "wind_energy", jet_drive: "turbine_impeller",
    electric_pod: "battery_motor",
  };
  return m[p];
}

export function marinePropulsionTypes(): MarinePropulsion[] {
  return ["outboard", "inboard_diesel", "sail", "jet_drive", "electric_pod"];
}
