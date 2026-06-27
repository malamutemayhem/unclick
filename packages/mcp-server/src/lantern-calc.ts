export type LanternFuel = "candle" | "oil" | "kerosene" | "gas" | "electric";

export function burnTimeHours(fuelMl: number, consumptionMlPerHour: number): number {
  if (consumptionMlPerHour <= 0) return 0;
  return parseFloat((fuelMl / consumptionMlPerHour).toFixed(1));
}

export function lightRadiusM(candlePower: number): number {
  return parseFloat((Math.sqrt(candlePower) * 0.8).toFixed(1));
}

export function glassPanelArea(heightCm: number, widthCm: number, panelCount: number): number {
  return parseFloat((heightCm * widthCm * panelCount / 10000).toFixed(3));
}

export function wickLengthCm(burnHours: number, consumptionCmPerHour: number): number {
  return parseFloat((burnHours * consumptionCmPerHour).toFixed(1));
}

export function heatOutputBtu(fuelType: LanternFuel): number {
  const btuMap: Record<LanternFuel, number> = {
    candle: 80, oil: 900, kerosene: 1200, gas: 1500, electric: 0,
  };
  return btuMap[fuelType];
}

export function windResistanceKph(glassThicknessMm: number, panelCount: number): number {
  return parseFloat((glassThicknessMm * panelCount * 8).toFixed(0));
}

export function chimneyDraftCfm(heightCm: number, diameterCm: number): number {
  const areaCm2 = Math.PI * (diameterCm / 2) ** 2;
  return parseFloat((areaCm2 * heightCm / 1000000 * 35.3 * 100).toFixed(2));
}

export function fuelCostPerHour(fuelPricePerLiter: number, consumptionMlPerHour: number): number {
  return parseFloat((fuelPricePerLiter * consumptionMlPerHour / 1000).toFixed(3));
}

export function reflectorGain(polishPercent: number): number {
  return parseFloat((1 + polishPercent / 100 * 1.5).toFixed(2));
}

export function maintenanceIntervalDays(hoursPerDay: number, cleaningThresholdHours: number): number {
  if (hoursPerDay <= 0) return 0;
  return Math.floor(cleaningThresholdHours / hoursPerDay);
}

export function lanternFuels(): LanternFuel[] {
  return ["candle", "oil", "kerosene", "gas", "electric"];
}
