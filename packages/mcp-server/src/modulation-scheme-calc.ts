export type ModulationScheme = "qpsk" | "qam16" | "qam64" | "ofdm" | "fsk";

export function bitsPerSymbol(m: ModulationScheme): number {
  const map: Record<ModulationScheme, number> = {
    qpsk: 2, qam16: 4, qam64: 6, ofdm: 6, fsk: 1,
  };
  return map[m];
}

export function spectralEfficiency(m: ModulationScheme): number {
  const map: Record<ModulationScheme, number> = {
    qpsk: 4, qam16: 6, qam64: 9, ofdm: 8, fsk: 2,
  };
  return map[m];
}

export function noiseResistance(m: ModulationScheme): number {
  const map: Record<ModulationScheme, number> = {
    qpsk: 8, qam16: 6, qam64: 3, ofdm: 7, fsk: 9,
  };
  return map[m];
}

export function implementationComplexity(m: ModulationScheme): number {
  const map: Record<ModulationScheme, number> = {
    qpsk: 3, qam16: 5, qam64: 7, ofdm: 9, fsk: 1,
  };
  return map[m];
}

export function peakToAverageRatio(m: ModulationScheme): number {
  const map: Record<ModulationScheme, number> = {
    qpsk: 3, qam16: 5, qam64: 7, ofdm: 10, fsk: 1,
  };
  return map[m];
}

export function requiresLinearAmplifier(m: ModulationScheme): boolean {
  const map: Record<ModulationScheme, boolean> = {
    qpsk: true, qam16: true, qam64: true, ofdm: true, fsk: false,
  };
  return map[m];
}

export function multiCarrier(m: ModulationScheme): boolean {
  const map: Record<ModulationScheme, boolean> = {
    qpsk: false, qam16: false, qam64: false, ofdm: true, fsk: false,
  };
  return map[m];
}

export function commonApplication(m: ModulationScheme): string {
  const map: Record<ModulationScheme, string> = {
    qpsk: "satellite_comms", qam16: "cable_tv",
    qam64: "high_speed_wifi", ofdm: "lte_wifi",
    fsk: "low_power_iot",
  };
  return map[m];
}

export function constellationType(m: ModulationScheme): string {
  const map: Record<ModulationScheme, string> = {
    qpsk: "four_point_circle", qam16: "sixteen_point_grid",
    qam64: "sixty_four_point_grid", ofdm: "subcarrier_array",
    fsk: "frequency_shift",
  };
  return map[m];
}

export function modulationSchemes(): ModulationScheme[] {
  return ["qpsk", "qam16", "qam64", "ofdm", "fsk"];
}
