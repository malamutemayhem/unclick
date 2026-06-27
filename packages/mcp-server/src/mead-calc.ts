export type MeadStyle = "traditional" | "melomel" | "metheglin" | "cyser" | "braggot";

export function honeyKgPerLiter(targetAbv: number): number {
  return parseFloat((targetAbv * 0.03).toFixed(2));
}

export function originalGravity(honeyKgPerLiter: number): number {
  return parseFloat((1.0 + honeyKgPerLiter * 0.04).toFixed(3));
}

export function fermentationTempCelsius(style: MeadStyle): number {
  const temps: Record<MeadStyle, number> = {
    traditional: 18, melomel: 16, metheglin: 18, cyser: 15, braggot: 20,
  };
  return temps[style];
}

export function primaryFermentDays(style: MeadStyle): number {
  const days: Record<MeadStyle, number> = {
    traditional: 14, melomel: 21, metheglin: 14, cyser: 21, braggot: 10,
  };
  return days[style];
}

export function secondaryFermentWeeks(style: MeadStyle): number {
  const weeks: Record<MeadStyle, number> = {
    traditional: 8, melomel: 12, metheglin: 8, cyser: 10, braggot: 6,
  };
  return weeks[style];
}

export function agingMonths(style: MeadStyle): number {
  const months: Record<MeadStyle, number> = {
    traditional: 6, melomel: 4, metheglin: 6, cyser: 3, braggot: 2,
  };
  return months[style];
}

export function yeastNutrientGPerLiter(): number {
  return 1.5;
}

export function rackingCount(style: MeadStyle): number {
  const racks: Record<MeadStyle, number> = {
    traditional: 3, melomel: 4, metheglin: 3, cyser: 3, braggot: 2,
  };
  return racks[style];
}

export function costPerLiter(style: MeadStyle): number {
  const costs: Record<MeadStyle, number> = {
    traditional: 8, melomel: 10, metheglin: 12, cyser: 9, braggot: 7,
  };
  return costs[style];
}

export function meadStyles(): MeadStyle[] {
  return ["traditional", "melomel", "metheglin", "cyser", "braggot"];
}
