export type MarblingStyle = "suminagashi" | "ebru" | "stone" | "spanish" | "gelgit";

export function traySize(paperWidth: number, paperHeight: number): { width: number; height: number } {
  return {
    width: parseFloat((paperWidth + 10).toFixed(0)),
    height: parseFloat((paperHeight + 10).toFixed(0)),
  };
}

export function sizeConcentration(waterTemp: number): number {
  if (waterTemp < 15) return 2.0;
  if (waterTemp < 25) return 1.5;
  return 1.0;
}

export function paintDropSize(viscosity: number): number {
  return parseFloat((1 + viscosity * 0.5).toFixed(1));
}

export function rakeTeethSpacing(patternScale: number): number {
  return parseFloat((patternScale * 10).toFixed(0));
}

export function dropCount(trayAreaCm2: number, coveragePercent: number): number {
  return Math.ceil(trayAreaCm2 * coveragePercent / 100 / 4);
}

export function dryingTimeMin(paperGsm: number, humidity: number): number {
  const base = paperGsm * 0.1;
  const humidityFactor = 1 + (humidity - 50) * 0.02;
  return parseFloat((base * Math.max(0.5, humidityFactor)).toFixed(0));
}

export function alumConcentration(waterLiters: number): number {
  return parseFloat((waterLiters * 15).toFixed(0));
}

export function patternRepeatability(style: MarblingStyle): number {
  const ratings: Record<MarblingStyle, number> = {
    suminagashi: 20, ebru: 40, stone: 60, spanish: 50, gelgit: 70,
  };
  return ratings[style];
}

export function colorLayers(style: MarblingStyle): number {
  const layers: Record<MarblingStyle, number> = {
    suminagashi: 2, ebru: 5, stone: 8, spanish: 4, gelgit: 3,
  };
  return layers[style];
}

export function costPerSheet(paintMl: number, paperGsm: number): number {
  return parseFloat((paintMl * 0.05 + paperGsm * 0.01).toFixed(2));
}

export function marblingStyles(): MarblingStyle[] {
  return ["suminagashi", "ebru", "stone", "spanish", "gelgit"];
}
