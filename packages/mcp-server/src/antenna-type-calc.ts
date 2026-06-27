export type AntennaType = "dipole" | "patch" | "yagi" | "parabolic" | "phased_array";

export function gainDbi(a: AntennaType): number {
  const m: Record<AntennaType, number> = {
    dipole: 2, patch: 6, yagi: 12, parabolic: 30, phased_array: 25,
  };
  return m[a];
}

export function beamwidthDeg(a: AntennaType): number {
  const m: Record<AntennaType, number> = {
    dipole: 360, patch: 70, yagi: 30, parabolic: 3, phased_array: 10,
  };
  return m[a];
}

export function sizeScore(a: AntennaType): number {
  const m: Record<AntennaType, number> = {
    dipole: 2, patch: 1, yagi: 5, parabolic: 10, phased_array: 7,
  };
  return m[a];
}

export function costScore(a: AntennaType): number {
  const m: Record<AntennaType, number> = {
    dipole: 1, patch: 3, yagi: 4, parabolic: 8, phased_array: 10,
  };
  return m[a];
}

export function bandwidthScore(a: AntennaType): number {
  const m: Record<AntennaType, number> = {
    dipole: 5, patch: 4, yagi: 3, parabolic: 7, phased_array: 9,
  };
  return m[a];
}

export function omnidirectional(a: AntennaType): boolean {
  const m: Record<AntennaType, boolean> = {
    dipole: true, patch: false, yagi: false, parabolic: false, phased_array: false,
  };
  return m[a];
}

export function electronicallySteerable(a: AntennaType): boolean {
  const m: Record<AntennaType, boolean> = {
    dipole: false, patch: false, yagi: false, parabolic: false, phased_array: true,
  };
  return m[a];
}

export function typicalUse(a: AntennaType): string {
  const m: Record<AntennaType, string> = {
    dipole: "fm_radio", patch: "gps_receivers",
    yagi: "tv_reception", parabolic: "satellite_dishes",
    phased_array: "radar_5g",
  };
  return m[a];
}

export function polarization(a: AntennaType): string {
  const m: Record<AntennaType, string> = {
    dipole: "linear", patch: "circular_or_linear",
    yagi: "linear", parabolic: "depends_on_feed",
    phased_array: "adaptive",
  };
  return m[a];
}

export function antennaTypes(): AntennaType[] {
  return ["dipole", "patch", "yagi", "parabolic", "phased_array"];
}
