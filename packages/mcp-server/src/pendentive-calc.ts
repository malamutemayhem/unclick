export type PendentiveForm = "simple" | "compound" | "sail" | "squinch" | "decorated";

export function sphereRadiusM(squareSideM: number): number {
  return parseFloat((squareSideM * Math.SQRT2 / 2).toFixed(2));
}

export function surfaceAreaM2(radiusM: number): number {
  return parseFloat((2 * Math.PI * radiusM * radiusM * 0.15).toFixed(2));
}

export function thicknessCm(radiusM: number, form: PendentiveForm): number {
  const factors: Record<PendentiveForm, number> = {
    simple: 0.08, compound: 0.12, sail: 0.06, squinch: 0.1, decorated: 0.09,
  };
  return parseFloat((radiusM * 100 * factors[form]).toFixed(1));
}

export function weightKg(surfaceAreaM2: number, thicknessCm: number, densityKgPerM3: number): number {
  return parseFloat((surfaceAreaM2 * thicknessCm / 100 * densityKgPerM3).toFixed(0));
}

export function thrustForceKn(weightKg: number, angleDeg: number): number {
  if (angleDeg <= 0 || angleDeg >= 90) return 0;
  const rad = angleDeg * Math.PI / 180;
  return parseFloat((weightKg * 9.81 / 1000 / Math.tan(rad)).toFixed(2));
}

export function mosaicTesserae(surfaceAreaM2: number, tesseraSizeCm: number): number {
  if (tesseraSizeCm <= 0) return 0;
  const tesseraAreaM2 = (tesseraSizeCm / 100) ** 2;
  return Math.ceil(surfaceAreaM2 / tesseraAreaM2);
}

export function scaffoldPlatforms(heightM: number): number {
  return Math.ceil(heightM / 2);
}

export function carvingHours(form: PendentiveForm, surfaceAreaM2: number): number {
  const hoursPerM2: Record<PendentiveForm, number> = {
    simple: 5, compound: 12, sail: 3, squinch: 8, decorated: 20,
  };
  return parseFloat((surfaceAreaM2 * hoursPerM2[form]).toFixed(1));
}

export function crackMonitorPoints(surfaceAreaM2: number): number {
  return Math.max(4, Math.ceil(surfaceAreaM2 * 2));
}

export function restorationCostPerM2(form: PendentiveForm): number {
  const costs: Record<PendentiveForm, number> = {
    simple: 500, compound: 900, sail: 400, squinch: 700, decorated: 1500,
  };
  return costs[form];
}

export function pendentiveForms(): PendentiveForm[] {
  return ["simple", "compound", "sail", "squinch", "decorated"];
}
