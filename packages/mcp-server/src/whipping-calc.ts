export type WhippingType = "common" | "sailmaker" | "west_country" | "french" | "needle";

export function turnsPerCm(type: WhippingType): number {
  const turns: Record<WhippingType, number> = {
    common: 8, sailmaker: 10, west_country: 6, french: 12, needle: 10,
  };
  return turns[type];
}

export function whippingLengthDiameters(type: WhippingType): number {
  const diameters: Record<WhippingType, number> = {
    common: 1.5, sailmaker: 2, west_country: 1.5, french: 2.5, needle: 2,
  };
  return diameters[type];
}

export function threadLengthMultiplier(type: WhippingType): number {
  const mult: Record<WhippingType, number> = {
    common: 4, sailmaker: 6, west_country: 5, french: 8, needle: 6,
  };
  return mult[type];
}

export function durabilityRating(type: WhippingType): number {
  const dur: Record<WhippingType, number> = {
    common: 2, sailmaker: 5, west_country: 3, french: 4, needle: 5,
  };
  return dur[type];
}

export function slipResistance(type: WhippingType): number {
  const resist: Record<WhippingType, number> = {
    common: 2, sailmaker: 5, west_country: 4, french: 3, needle: 5,
  };
  return resist[type];
}

export function needleRequired(type: WhippingType): boolean {
  return type === "sailmaker" || type === "needle" || type === "french";
}

export function timeMinutesPerWhipping(type: WhippingType): number {
  const mins: Record<WhippingType, number> = {
    common: 3, sailmaker: 8, west_country: 5, french: 10, needle: 8,
  };
  return mins[type];
}

export function decorativeRating(type: WhippingType): number {
  const dec: Record<WhippingType, number> = {
    common: 1, sailmaker: 3, west_country: 2, french: 5, needle: 4,
  };
  return dec[type];
}

export function costPerWhipping(type: WhippingType): number {
  const costs: Record<WhippingType, number> = {
    common: 0.1, sailmaker: 0.5, west_country: 0.2, french: 0.8, needle: 0.5,
  };
  return costs[type];
}

export function whippingTypes(): WhippingType[] {
  return ["common", "sailmaker", "west_country", "french", "needle"];
}
