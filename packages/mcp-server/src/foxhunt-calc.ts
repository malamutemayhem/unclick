export type HuntType = "classic" | "speed" | "orienteering" | "mobile" | "foxoring";
export type BandMHz = 2 | 80 | 144 | 440;

export function signalStrengthDbm(powerW: number, distanceKm: number, freqMHz: number): number {
  if (distanceKm <= 0 || freqMHz <= 0) return 0;
  const fspl = 20 * Math.log10(distanceKm) + 20 * Math.log10(freqMHz) + 32.44;
  return parseFloat((10 * Math.log10(powerW * 1000) - fspl).toFixed(1));
}

export function bearingError(snrDb: number): number {
  if (snrDb <= 0) return 90;
  return parseFloat(Math.max(1, 30 / snrDb).toFixed(1));
}

export function huntDuration(type: HuntType): number {
  const min: Record<HuntType, number> = {
    classic: 120, speed: 30, orienteering: 90, mobile: 60, foxoring: 45,
  };
  return min[type];
}

export function transmitterCount(type: HuntType): number {
  const count: Record<HuntType, number> = {
    classic: 5, speed: 5, orienteering: 10, mobile: 1, foxoring: 15,
  };
  return count[type];
}

export function antennaElements(band: BandMHz): number {
  if (band === 2) return 1;
  if (band === 80) return 1;
  if (band === 144) return 3;
  return 5;
}

export function wavelengthM(freqMHz: number): number {
  if (freqMHz <= 0) return 0;
  return parseFloat((300 / freqMHz).toFixed(3));
}

export function attenuatorSteps(): number {
  return 6;
}

export function searchRadius(powerW: number, freqMHz: number): number {
  return parseFloat((Math.sqrt(powerW) * 300 / freqMHz).toFixed(1));
}

export function scorePoints(foxesFound: number, timeMin: number, maxTime: number): number {
  if (foxesFound <= 0) return 0;
  const timeBonus = Math.max(0, maxTime - timeMin);
  return parseFloat((foxesFound * 100 + timeBonus).toFixed(0));
}

export function huntTypes(): HuntType[] {
  return ["classic", "speed", "orienteering", "mobile", "foxoring"];
}
