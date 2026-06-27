export type KilnType = "updraft" | "downdraft" | "crossdraft" | "anagama" | "electric";

export function chamberVolumeLiters(diameterCm: number, heightCm: number): number {
  const radiusCm = diameterCm / 2;
  return parseFloat((Math.PI * radiusCm ** 2 * heightCm / 1000).toFixed(1));
}

export function firingTemperatureCelsius(type: KilnType): number {
  const temps: Record<KilnType, number> = {
    updraft: 1000, downdraft: 1280, crossdraft: 1100, anagama: 1350, electric: 1260,
  };
  return temps[type];
}

export function heatingRateCPerHour(type: KilnType): number {
  const rates: Record<KilnType, number> = {
    updraft: 100, downdraft: 60, crossdraft: 80, anagama: 40, electric: 120,
  };
  return rates[type];
}

export function firingHours(targetTempC: number, heatingRate: number): number {
  if (heatingRate <= 0) return 0;
  return parseFloat((targetTempC / heatingRate + 2).toFixed(1));
}

export function fuelKg(chamberVolumeLiters: number, type: KilnType): number {
  const fuelPerLiter: Record<KilnType, number> = {
    updraft: 0.3, downdraft: 0.25, crossdraft: 0.28, anagama: 0.5, electric: 0,
  };
  return parseFloat((chamberVolumeLiters * fuelPerLiter[type]).toFixed(1));
}

export function capacityPieces(chamberVolumeLiters: number, avgPieceVolumeMl: number): number {
  if (avgPieceVolumeMl <= 0) return 0;
  return Math.floor(chamberVolumeLiters * 1000 * 0.6 / avgPieceVolumeMl);
}

export function coolingHours(firingTemperatureCelsius: number): number {
  return parseFloat((firingTemperatureCelsius / 50).toFixed(1));
}

export function shelfCount(heightCm: number, shelfSpacingCm: number): number {
  if (shelfSpacingCm <= 0) return 0;
  return Math.floor(heightCm / shelfSpacingCm);
}

export function energyCostPerFiring(type: KilnType, fuelCostPerKg: number, chamberVolumeLiters: number): number {
  if (type === "electric") {
    return parseFloat((chamberVolumeLiters * 0.5).toFixed(2));
  }
  return parseFloat((fuelKg(chamberVolumeLiters, type) * fuelCostPerKg).toFixed(2));
}

export function lifespanFirings(type: KilnType): number {
  const firings: Record<KilnType, number> = {
    updraft: 200, downdraft: 500, crossdraft: 300, anagama: 100, electric: 1000,
  };
  return firings[type];
}

export function kilnTypes(): KilnType[] {
  return ["updraft", "downdraft", "crossdraft", "anagama", "electric"];
}
