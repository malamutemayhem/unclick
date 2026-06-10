export type FurnaceType = "blast" | "reverberatory" | "electric_arc" | "cupola" | "induction";

export function chargeWeightKg(furnaceVolumeM3: number, type: FurnaceType): number {
  const densities: Record<FurnaceType, number> = {
    blast: 1800, reverberatory: 1500, electric_arc: 2000, cupola: 1600, induction: 2200,
  };
  return parseFloat((furnaceVolumeM3 * densities[type]).toFixed(0));
}

export function operatingTemperatureCelsius(type: FurnaceType): number {
  const temps: Record<FurnaceType, number> = {
    blast: 1500, reverberatory: 1200, electric_arc: 1800, cupola: 1400, induction: 1600,
  };
  return temps[type];
}

export function tapToTapMinutes(type: FurnaceType): number {
  const mins: Record<FurnaceType, number> = {
    blast: 240, reverberatory: 360, electric_arc: 60, cupola: 120, induction: 45,
  };
  return mins[type];
}

export function slagRatioPercent(type: FurnaceType): number {
  const ratios: Record<FurnaceType, number> = {
    blast: 30, reverberatory: 25, electric_arc: 15, cupola: 20, induction: 10,
  };
  return ratios[type];
}

export function fluxWeightKg(chargeKg: number, type: FurnaceType): number {
  const ratios: Record<FurnaceType, number> = {
    blast: 0.15, reverberatory: 0.1, electric_arc: 0.05, cupola: 0.12, induction: 0.03,
  };
  return parseFloat((chargeKg * ratios[type]).toFixed(1));
}

export function energyConsumptionKwhPerT(type: FurnaceType): number {
  const kwh: Record<FurnaceType, number> = {
    blast: 500, reverberatory: 400, electric_arc: 600, cupola: 350, induction: 550,
  };
  return kwh[type];
}

export function refractoryLifeHeats(type: FurnaceType): number {
  const heats: Record<FurnaceType, number> = {
    blast: 5000, reverberatory: 2000, electric_arc: 800, cupola: 3000, induction: 1500,
  };
  return heats[type];
}

export function emissionsRating(type: FurnaceType): number {
  const ratings: Record<FurnaceType, number> = {
    blast: 8, reverberatory: 7, electric_arc: 3, cupola: 6, induction: 2,
  };
  return ratings[type];
}

export function dailyOutputTonnes(type: FurnaceType, furnaceVolumeM3: number): number {
  const factor: Record<FurnaceType, number> = {
    blast: 2.0, reverberatory: 0.8, electric_arc: 3.0, cupola: 1.5, induction: 2.5,
  };
  return parseFloat((furnaceVolumeM3 * factor[type]).toFixed(1));
}

export function furnaceTypes(): FurnaceType[] {
  return ["blast", "reverberatory", "electric_arc", "cupola", "induction"];
}
