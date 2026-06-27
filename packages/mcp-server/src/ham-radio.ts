export type Band = "160m" | "80m" | "40m" | "20m" | "15m" | "10m" | "6m" | "2m" | "70cm";
export type Mode = "ssb" | "cw" | "fm" | "ft8" | "am" | "rtty";

const BAND_MHZ: Record<Band, { low: number; high: number }> = {
  "160m": { low: 1.8, high: 2.0 },
  "80m": { low: 3.5, high: 4.0 },
  "40m": { low: 7.0, high: 7.3 },
  "20m": { low: 14.0, high: 14.35 },
  "15m": { low: 21.0, high: 21.45 },
  "10m": { low: 28.0, high: 29.7 },
  "6m": { low: 50.0, high: 54.0 },
  "2m": { low: 144.0, high: 148.0 },
  "70cm": { low: 420.0, high: 450.0 },
};

export function bandFrequency(band: Band): { low: number; high: number } {
  return BAND_MHZ[band];
}

export function wavelength(frequencyMhz: number): number {
  return parseFloat((300 / frequencyMhz).toFixed(2));
}

export function dipoleLength(frequencyMhz: number): number {
  return parseFloat((143 / frequencyMhz).toFixed(2));
}

export function quarterWaveVertical(frequencyMhz: number): number {
  return parseFloat((71.5 / frequencyMhz).toFixed(2));
}

export function eirp(powerWatts: number, antennaGainDbi: number, feedlineLossDb: number): number {
  const netGain = antennaGainDbi - feedlineLossDb;
  return parseFloat((powerWatts * Math.pow(10, netGain / 10)).toFixed(1));
}

export function swr(forward: number, reflected: number): number {
  if (reflected >= forward) return Infinity;
  const gamma = Math.sqrt(reflected / forward);
  return parseFloat(((1 + gamma) / (1 - gamma)).toFixed(2));
}

export function returnLoss(swrVal: number): number {
  return parseFloat((-20 * Math.log10((swrVal - 1) / (swrVal + 1))).toFixed(1));
}

export function pathLoss(distanceKm: number, frequencyMhz: number): number {
  return parseFloat((20 * Math.log10(distanceKm) + 20 * Math.log10(frequencyMhz) + 32.44).toFixed(1));
}

export function linkBudget(txPowerDbm: number, txGainDbi: number, rxGainDbi: number, pathLossDb: number): number {
  return parseFloat((txPowerDbm + txGainDbi + rxGainDbi - pathLossDb).toFixed(1));
}

export function wattsToDbm(watts: number): number {
  return parseFloat((10 * Math.log10(watts * 1000)).toFixed(1));
}

export function dbmToWatts(dbm: number): number {
  return parseFloat((Math.pow(10, dbm / 10) / 1000).toFixed(4));
}

export function repeaterOffset(band: Band): number {
  if (band === "2m") return 0.6;
  if (band === "70cm") return 5.0;
  return 0;
}

export function phoneticsForCall(callsign: string): string {
  const nato: Record<string, string> = {
    A: "Alpha", B: "Bravo", C: "Charlie", D: "Delta", E: "Echo",
    F: "Foxtrot", G: "Golf", H: "Hotel", I: "India", J: "Juliet",
    K: "Kilo", L: "Lima", M: "Mike", N: "November", O: "Oscar",
    P: "Papa", Q: "Quebec", R: "Romeo", S: "Sierra", T: "Tango",
    U: "Uniform", V: "Victor", W: "Whiskey", X: "X-ray", Y: "Yankee", Z: "Zulu",
  };
  return callsign.toUpperCase().split("").map(c => nato[c] ?? c).join(" ");
}

export function bands(): Band[] {
  return ["160m", "80m", "40m", "20m", "15m", "10m", "6m", "2m", "70cm"];
}
