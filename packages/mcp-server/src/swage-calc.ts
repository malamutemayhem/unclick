export type SwageShape = "round" | "square" | "hexagonal" | "octagonal" | "vee";

export function cavityDepthMm(stockDiameterMm: number, shape: SwageShape): number {
  const factors: Record<SwageShape, number> = {
    round: 0.5, square: 0.45, hexagonal: 0.4, octagonal: 0.42, vee: 0.6,
  };
  return parseFloat((stockDiameterMm * factors[shape]).toFixed(1));
}

export function cavityWidthMm(stockDiameterMm: number, shape: SwageShape): number {
  const factors: Record<SwageShape, number> = {
    round: 1.02, square: 1.0, hexagonal: 1.05, octagonal: 1.03, vee: 1.2,
  };
  return parseFloat((stockDiameterMm * factors[shape]).toFixed(1));
}

export function blowsRequired(material: "mild_steel" | "medium_carbon" | "high_carbon"): number {
  const blows: Record<string, number> = { mild_steel: 4, medium_carbon: 6, high_carbon: 8 };
  return blows[material];
}

export function workingTemperatureCelsius(material: "mild_steel" | "medium_carbon" | "high_carbon"): number {
  const temps: Record<string, number> = { mild_steel: 1100, medium_carbon: 1000, high_carbon: 950 };
  return temps[material];
}

export function swageBlockWeightKg(sizeCm: number): number {
  return parseFloat((sizeCm ** 3 * 0.0078).toFixed(1));
}

export function topSwageHandleLengthCm(blockSizeCm: number): number {
  return Math.round(blockSizeCm + 30);
}

export function springSwageOpeningMm(stockDiameterMm: number): number {
  return parseFloat((stockDiameterMm * 1.5 + 5).toFixed(0));
}

export function finishQualityRating(shape: SwageShape): number {
  const ratings: Record<SwageShape, number> = {
    round: 9, square: 7, hexagonal: 8, octagonal: 8, vee: 6,
  };
  return ratings[shape];
}

export function materialRemovalPercent(shape: SwageShape): number {
  const removal: Record<SwageShape, number> = {
    round: 0, square: 5, hexagonal: 3, octagonal: 2, vee: 8,
  };
  return removal[shape];
}

export function swageShapes(): SwageShape[] {
  return ["round", "square", "hexagonal", "octagonal", "vee"];
}
