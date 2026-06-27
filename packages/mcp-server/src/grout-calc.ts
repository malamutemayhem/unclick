export type GroutType = "portland" | "epoxy" | "urethane" | "furan" | "sanded";

export function mixRatioWaterToGrout(groutType: GroutType): number {
  const ratios: Record<GroutType, number> = {
    portland: 0.25, epoxy: 0, urethane: 0, furan: 0, sanded: 0.22,
  };
  return ratios[groutType];
}

export function openTimeMinutes(groutType: GroutType): number {
  const times: Record<GroutType, number> = {
    portland: 30, epoxy: 45, urethane: 20, furan: 15, sanded: 30,
  };
  return times[groutType];
}

export function cureTimeHours(groutType: GroutType): number {
  const hours: Record<GroutType, number> = {
    portland: 24, epoxy: 16, urethane: 8, furan: 12, sanded: 24,
  };
  return hours[groutType];
}

export function coverageKgPerM2(jointWidthMm: number, jointDepthMm: number, tileSizeCm: number): number {
  if (tileSizeCm <= 0) return 0;
  const jointLengthPerM2 = (200 / tileSizeCm);
  return parseFloat((jointLengthPerM2 * jointWidthMm * jointDepthMm * 0.0016).toFixed(2));
}

export function chemicalResistance(groutType: GroutType): number {
  const ratings: Record<GroutType, number> = {
    portland: 2, epoxy: 5, urethane: 4, furan: 5, sanded: 2,
  };
  return ratings[groutType];
}

export function stainResistance(groutType: GroutType): number {
  const ratings: Record<GroutType, number> = {
    portland: 2, epoxy: 5, urethane: 4, furan: 4, sanded: 2,
  };
  return ratings[groutType];
}

export function flexibilityRating(groutType: GroutType): number {
  const ratings: Record<GroutType, number> = {
    portland: 1, epoxy: 3, urethane: 5, furan: 2, sanded: 1,
  };
  return ratings[groutType];
}

export function sealerRequired(groutType: GroutType): boolean {
  return groutType === "portland" || groutType === "sanded";
}

export function costPerKg(groutType: GroutType): number {
  const costs: Record<GroutType, number> = {
    portland: 5, epoxy: 25, urethane: 20, furan: 30, sanded: 6,
  };
  return costs[groutType];
}

export function groutTypes(): GroutType[] {
  return ["portland", "epoxy", "urethane", "furan", "sanded"];
}
