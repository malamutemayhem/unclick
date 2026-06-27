export type MashMethod = "infusion" | "decoction" | "step" | "cereal" | "turbid";

export function waterToGrainRatio(method: MashMethod): number {
  const ratios: Record<MashMethod, number> = {
    infusion: 2.5, decoction: 3.0, step: 2.8, cereal: 3.5, turbid: 4.0,
  };
  return ratios[method];
}

export function strikeWaterLiters(grainKg: number, ratio: number): number {
  return parseFloat((grainKg * ratio).toFixed(1));
}

export function strikeTemperatureCelsius(targetMashC: number, grainTempC: number): number {
  return parseFloat((targetMashC + 0.4 * (targetMashC - grainTempC)).toFixed(1));
}

export function mashDurationMinutes(method: MashMethod): number {
  const mins: Record<MashMethod, number> = {
    infusion: 60, decoction: 120, step: 90, cereal: 90, turbid: 180,
  };
  return mins[method];
}

export function spargeWaterLiters(grainKg: number): number {
  return parseFloat((grainKg * 3.2).toFixed(1));
}

export function preboilVolumeLiters(batchSizeLiters: number): number {
  return parseFloat((batchSizeLiters * 1.3).toFixed(1));
}

export function efficiencyPercent(method: MashMethod): number {
  const eff: Record<MashMethod, number> = {
    infusion: 72, decoction: 80, step: 75, cereal: 70, turbid: 65,
  };
  return eff[method];
}

export function grainBedDepthCm(grainKg: number, tunDiameterCm: number): number {
  if (tunDiameterCm <= 0) return 0;
  const tunAreaCm2 = Math.PI * (tunDiameterCm / 2) ** 2;
  return parseFloat((grainKg * 700 / tunAreaCm2).toFixed(1));
}

export function lauterTimeMinutes(grainKg: number): number {
  return Math.round(grainKg * 5 + 15);
}

export function tunVolumeLiters(batchSizeLiters: number): number {
  return parseFloat((batchSizeLiters * 1.5).toFixed(0));
}

export function mashMethods(): MashMethod[] {
  return ["infusion", "decoction", "step", "cereal", "turbid"];
}
