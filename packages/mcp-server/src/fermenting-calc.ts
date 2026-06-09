export type FermentType = "beer" | "wine" | "kombucha" | "sauerkraut" | "yogurt" | "sourdough";

export interface FermentSpec {
  type: FermentType;
  volumeL: number;
  startSG: number;
  targetFG: number;
  abv: number;
  fermentDays: number;
  tempC: number;
}

export function specificGravityToPlato(sg: number): number {
  return parseFloat((-676.0831 + 1286.4831 * sg - 800.4168 * sg * sg + 190.0154 * sg * sg * sg).toFixed(1));
}

export function platoToSG(plato: number): number {
  return parseFloat((1 + plato / (258.6 - (plato / 258.2) * 227.1)).toFixed(4));
}

export function abvFromGravity(og: number, fg: number): number {
  return parseFloat(((og - fg) * 131.25).toFixed(1));
}

export function attenuationPercent(og: number, fg: number): number {
  const ogP = specificGravityToPlato(og);
  const fgP = specificGravityToPlato(fg);
  if (ogP === 0) return 0;
  return parseFloat(((ogP - fgP) / ogP * 100).toFixed(1));
}

export function caloriesPerServing(og: number, fg: number, servingMl: number = 355): number {
  const abv = abvFromGravity(og, fg) / 100;
  const re = specificGravityToPlato(fg) * 0.8114 + specificGravityToPlato(og) * 0.1886;
  const cal = servingMl * fg * (6.9 * abv + 4 * (re - 0.1));
  return Math.round(cal / 100);
}

export function co2Volumes(tempC: number, psi: number): number {
  return parseFloat(((psi + 14.695) * (0.01821 + 0.090115 * Math.exp(-tempC / 43.11))).toFixed(2));
}

export function primingSugar(volumeL: number, targetCO2: number, currentCO2: number = 0.85): number {
  const co2Needed = targetCO2 - currentCO2;
  const gramsPerLiter = co2Needed * 4;
  return parseFloat((gramsPerLiter * volumeL).toFixed(0));
}

export function yeastCells(og: number, volumeL: number, aleOrLager: "ale" | "lager"): number {
  const plato = specificGravityToPlato(og);
  const rate = aleOrLager === "ale" ? 0.75 : 1.5;
  return Math.round(rate * volumeL * plato);
}

export function fermentationTemp(type: FermentType): { min: number; max: number; ideal: number } {
  const temps: Record<FermentType, { min: number; max: number; ideal: number }> = {
    beer: { min: 15, max: 24, ideal: 19 },
    wine: { min: 12, max: 28, ideal: 18 },
    kombucha: { min: 20, max: 30, ideal: 24 },
    sauerkraut: { min: 15, max: 23, ideal: 18 },
    yogurt: { min: 37, max: 46, ideal: 43 },
    sourdough: { min: 20, max: 30, ideal: 24 },
  };
  return temps[type];
}

export function fermentDuration(type: FermentType): { min: number; max: number } {
  const days: Record<FermentType, { min: number; max: number }> = {
    beer: { min: 7, max: 21 },
    wine: { min: 14, max: 60 },
    kombucha: { min: 7, max: 14 },
    sauerkraut: { min: 14, max: 30 },
    yogurt: { min: 0, max: 1 },
    sourdough: { min: 0, max: 1 },
  };
  return days[type];
}

export function phTarget(type: FermentType): { min: number; max: number } {
  const ph: Record<FermentType, { min: number; max: number }> = {
    beer: { min: 4.0, max: 4.6 },
    wine: { min: 3.2, max: 3.8 },
    kombucha: { min: 2.5, max: 3.5 },
    sauerkraut: { min: 3.0, max: 3.5 },
    yogurt: { min: 4.0, max: 4.6 },
    sourdough: { min: 3.5, max: 4.5 },
  };
  return ph[type];
}

export function brixToSG(brix: number): number {
  return parseFloat((1 + brix / (258.6 - (brix / 258.2) * 227.1)).toFixed(4));
}

export function sgToBrix(sg: number): number {
  return specificGravityToPlato(sg);
}

export function dilution(currentSG: number, currentVolL: number, targetSG: number): number {
  const waterL = currentVolL * (currentSG - targetSG) / (targetSG - 1);
  return parseFloat(Math.max(0, waterL).toFixed(1));
}

export function boilOff(volumeL: number, boilMinutes: number, ratePerHour: number = 3.8): number {
  return parseFloat((volumeL - ratePerHour * boilMinutes / 60).toFixed(1));
}

export function ibu(alphaAcid: number, gramsHops: number, volumeL: number, boilMinutes: number): number {
  const utilization = 1.65 * Math.pow(0.000125, 0) * (1 - Math.exp(-0.04 * boilMinutes)) / 4.15;
  return parseFloat((alphaAcid / 100 * gramsHops * 1000 * utilization / volumeL).toFixed(1));
}

export function srm(grainColorLovibond: number, grainKg: number, volumeL: number): number {
  const mcu = grainColorLovibond * (grainKg * 2.205) / (volumeL * 0.2642);
  return parseFloat((1.4922 * Math.pow(mcu, 0.6859)).toFixed(1));
}

export function fermentTypes(): FermentType[] {
  return ["beer", "wine", "kombucha", "sauerkraut", "yogurt", "sourdough"];
}
