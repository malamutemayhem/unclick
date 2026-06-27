export type ClockType = "outflow" | "inflow" | "feedback" | "sinking_bowl" | "mercury";

export function vesselVolumeMl(durationMinutes: number, flowRateMlPerMin: number): number {
  return parseFloat((durationMinutes * flowRateMlPerMin).toFixed(1));
}

export function orificeDiameterMm(flowRateMlPerMin: number): number {
  return parseFloat((Math.sqrt(flowRateMlPerMin) * 0.8).toFixed(2));
}

export function headPressurePa(waterHeightCm: number): number {
  return parseFloat((waterHeightCm * 98.07).toFixed(1));
}

export function flowRateVariationPercent(type: ClockType): number {
  const variation: Record<ClockType, number> = {
    outflow: 15, inflow: 8, feedback: 3, sinking_bowl: 20, mercury: 5,
  };
  return variation[type];
}

export function accuracyMinutesPerDay(type: ClockType): number {
  const accuracy: Record<ClockType, number> = {
    outflow: 30, inflow: 15, feedback: 5, sinking_bowl: 45, mercury: 8,
  };
  return accuracy[type];
}

export function markerCount(durationHours: number): number {
  return durationHours * 4;
}

export function vesselMaterial(type: ClockType): string {
  const materials: Record<ClockType, string> = {
    outflow: "ceramic", inflow: "bronze", feedback: "brass", sinking_bowl: "copper", mercury: "iron",
  };
  return materials[type];
}

export function temperatureSensitivity(type: ClockType): number {
  const sensitivity: Record<ClockType, number> = {
    outflow: 7, inflow: 5, feedback: 3, sinking_bowl: 8, mercury: 2,
  };
  return sensitivity[type];
}

export function maintenanceIntervalDays(type: ClockType): number {
  const days: Record<ClockType, number> = {
    outflow: 7, inflow: 14, feedback: 30, sinking_bowl: 3, mercury: 60,
  };
  return days[type];
}

export function constructionCost(type: ClockType, baseCost: number): number {
  const mult: Record<ClockType, number> = {
    outflow: 1.0, inflow: 2.0, feedback: 5.0, sinking_bowl: 0.5, mercury: 8.0,
  };
  return parseFloat((baseCost * mult[type]).toFixed(2));
}

export function clockTypes(): ClockType[] {
  return ["outflow", "inflow", "feedback", "sinking_bowl", "mercury"];
}
