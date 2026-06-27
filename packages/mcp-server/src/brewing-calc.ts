export function abv(og: number, fg: number): number {
  return round2((og - fg) * 131.25);
}

export function abw(og: number, fg: number): number {
  return round2(abv(og, fg) * 0.7894);
}

export function apparentAttenuation(og: number, fg: number): number {
  if (og <= 1) return 0;
  return round1((1 - (fg - 1) / (og - 1)) * 100);
}

export function realAttenuation(og: number, fg: number): number {
  return round1(apparentAttenuation(og, fg) * 0.8192);
}

export function calories(og: number, fg: number, volumeOz = 12): number {
  const abvVal = abv(og, fg) / 100;
  const re = 0.1808 * platoFromSG(og) + 0.8192 * platoFromSG(fg);
  const caloriesPerOz = (6.9 * abvVal + 4 * (re - 0.1)) * fg;
  return Math.round(caloriesPerOz * volumeOz);
}

export function sgToPlato(sg: number): number {
  return round2(-616.868 + 1111.14 * sg - 630.272 * sg * sg + 135.997 * sg * sg * sg);
}

export function platoToSG(plato: number): number {
  return round4(1 + plato / (258.6 - (plato / 258.2) * 227.1));
}

function platoFromSG(sg: number): number {
  return sgToPlato(sg);
}

export function ibu(
  alphaAcid: number,
  weightOz: number,
  boilMinutes: number,
  batchGallons: number,
  wortGravity: number
): number {
  const utilization = bignessFactor(wortGravity) * boilTimeFactor(boilMinutes);
  return round1((alphaAcid / 100) * weightOz * 7490 * utilization / batchGallons);
}

function bignessFactor(gravity: number): number {
  return 1.65 * Math.pow(0.000125, gravity - 1);
}

function boilTimeFactor(minutes: number): number {
  return (1 - Math.pow(Math.E, -0.04 * minutes)) / 4.15;
}

export function srm(mcu: number): number {
  return round1(1.4922 * Math.pow(mcu, 0.6859));
}

export function mcu(lovibond: number, weightLbs: number, batchGallons: number): number {
  if (batchGallons <= 0) return 0;
  return round1(lovibond * weightLbs / batchGallons);
}

export function srmToHex(srmValue: number): string {
  const r = Math.round(Math.min(255, Math.max(0, 255 * Math.pow(0.975, srmValue))));
  const g = Math.round(Math.min(255, Math.max(0, 245 * Math.pow(0.88, srmValue))));
  const b = Math.round(Math.min(255, Math.max(0, 220 * Math.pow(0.7, srmValue))));
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export function strikeWaterTemp(
  grainTempF: number,
  targetMashTempF: number,
  waterToGrainRatio: number
): number {
  return round1(
    (0.2 / waterToGrainRatio) * (targetMashTempF - grainTempF) + targetMashTempF
  );
}

export function boilOffVolume(startGallons: number, boilMinutes: number, evapRateGPH = 1.5): number {
  return round2(evapRateGPH * boilMinutes / 60);
}

export function preboilVolume(targetGallons: number, boilMinutes: number, evapRateGPH = 1.5): number {
  return round2(targetGallons + boilOffVolume(targetGallons, boilMinutes, evapRateGPH));
}

export function dilution(currentOG: number, currentVolume: number, targetOG: number): number {
  if (targetOG <= 1) return 0;
  const targetVolume = currentVolume * (currentOG - 1) / (targetOG - 1);
  return round2(targetVolume - currentVolume);
}

export function carbonation(tempF: number, volumes: number): number {
  const tempC = (tempF - 32) * 5 / 9;
  return round1((volumes - 3.0378 + 0.050062 * tempC + 0.00026555 * tempC * tempC) * 14.6959);
}

export interface BeerStyle {
  name: string;
  ogMin: number;
  ogMax: number;
  fgMin: number;
  fgMax: number;
  ibuMin: number;
  ibuMax: number;
  srmMin: number;
  srmMax: number;
  abvMin: number;
  abvMax: number;
}

export const STYLES: BeerStyle[] = [
  { name: "American Light Lager", ogMin: 1.028, ogMax: 1.040, fgMin: 0.998, fgMax: 1.008, ibuMin: 8, ibuMax: 12, srmMin: 2, srmMax: 3, abvMin: 2.8, abvMax: 4.2 },
  { name: "American Pale Ale", ogMin: 1.045, ogMax: 1.060, fgMin: 1.010, fgMax: 1.015, ibuMin: 30, ibuMax: 50, srmMin: 5, srmMax: 10, abvMin: 4.5, abvMax: 6.2 },
  { name: "IPA", ogMin: 1.056, ogMax: 1.070, fgMin: 1.008, fgMax: 1.014, ibuMin: 40, ibuMax: 70, srmMin: 6, srmMax: 14, abvMin: 5.5, abvMax: 7.5 },
  { name: "Stout", ogMin: 1.036, ogMax: 1.052, fgMin: 1.007, fgMax: 1.011, ibuMin: 25, ibuMax: 45, srmMin: 25, srmMax: 40, abvMin: 4.0, abvMax: 5.5 },
  { name: "Wheat Beer", ogMin: 1.044, ogMax: 1.052, fgMin: 1.010, fgMax: 1.014, ibuMin: 8, ibuMax: 15, srmMin: 2, srmMax: 6, abvMin: 4.3, abvMax: 5.6 },
];

function round1(n: number): number { return Math.round(n * 10) / 10; }
function round2(n: number): number { return Math.round(n * 100) / 100; }
function round4(n: number): number { return Math.round(n * 10000) / 10000; }
