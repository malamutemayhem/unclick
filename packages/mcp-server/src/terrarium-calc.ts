export type TerrariumType = "closed" | "open" | "succulent" | "moss" | "orchid" | "carnivorous";
export type ContainerShape = "sphere" | "cylinder" | "cube" | "bowl";

export function containerVolume(shape: ContainerShape, dimensionCm: number): number {
  const r = dimensionCm / 2;
  let vol: number;
  switch (shape) {
    case "sphere":
      vol = (4 / 3) * Math.PI * r * r * r;
      break;
    case "cylinder":
      vol = Math.PI * r * r * dimensionCm;
      break;
    case "cube":
      vol = dimensionCm * dimensionCm * dimensionCm;
      break;
    case "bowl":
      vol = (2 / 3) * Math.PI * r * r * r;
      break;
  }
  return parseFloat(vol.toFixed(1));
}

export function drainageLayerDepth(containerHeightCm: number): number {
  return parseFloat((containerHeightCm * 0.1).toFixed(1));
}

export function charcoalLayerDepth(): number {
  return 1.0;
}

export function soilDepth(containerHeightCm: number): number {
  return parseFloat((containerHeightCm * 0.25).toFixed(1));
}

export function plantingDepth(containerHeightCm: number): number {
  const drainage = drainageLayerDepth(containerHeightCm);
  const charcoal = charcoalLayerDepth();
  const soil = soilDepth(containerHeightCm);
  return parseFloat((containerHeightCm - drainage - charcoal - soil).toFixed(1));
}

export function soilAmount(containerVolumeCm3: number): number {
  return parseFloat((containerVolumeCm3 * 0.25 / 1000).toFixed(2));
}

export function gravelAmount(containerVolumeCm3: number): number {
  return parseFloat((containerVolumeCm3 * 0.1 / 1000).toFixed(2));
}

export function plantCount(containerDiameterCm: number, type: TerrariumType): number {
  const spacingCm: Record<TerrariumType, number> = {
    closed: 5,
    open: 6,
    succulent: 4,
    moss: 3,
    orchid: 8,
    carnivorous: 5,
  };
  const area = Math.PI * (containerDiameterCm / 2) * (containerDiameterCm / 2);
  const plantArea = Math.PI * (spacingCm[type] / 2) * (spacingCm[type] / 2);
  return Math.max(1, Math.floor(area / plantArea * 0.6));
}

export function wateringFrequency(type: TerrariumType): { days: number; description: string } {
  const freq: Record<TerrariumType, { days: number; description: string }> = {
    closed: { days: 30, description: "Monthly misting if condensation drops" },
    open: { days: 7, description: "Weekly light watering" },
    succulent: { days: 14, description: "Every two weeks, let soil dry completely" },
    moss: { days: 3, description: "Every few days, keep moist" },
    orchid: { days: 7, description: "Weekly, avoid standing water" },
    carnivorous: { days: 3, description: "Every few days with distilled water" },
  };
  return freq[type];
}

export function lightRequirement(type: TerrariumType): string {
  const light: Record<TerrariumType, string> = {
    closed: "indirect bright",
    open: "indirect bright",
    succulent: "direct bright",
    moss: "low to medium",
    orchid: "indirect bright",
    carnivorous: "direct bright",
  };
  return light[type];
}

export function humidityLevel(type: TerrariumType): number {
  const humidity: Record<TerrariumType, number> = {
    closed: 90,
    open: 50,
    succulent: 30,
    moss: 80,
    orchid: 70,
    carnivorous: 75,
  };
  return humidity[type];
}

export function temperatureRange(type: TerrariumType): { minC: number; maxC: number } {
  const temps: Record<TerrariumType, { minC: number; maxC: number }> = {
    closed: { minC: 15, maxC: 25 },
    open: { minC: 15, maxC: 28 },
    succulent: { minC: 10, maxC: 35 },
    moss: { minC: 10, maxC: 22 },
    orchid: { minC: 18, maxC: 28 },
    carnivorous: { minC: 5, maxC: 30 },
  };
  return temps[type];
}

export function maintenanceInterval(type: TerrariumType): number {
  const weeks: Record<TerrariumType, number> = {
    closed: 8,
    open: 4,
    succulent: 6,
    moss: 2,
    orchid: 4,
    carnivorous: 4,
  };
  return weeks[type];
}

export function costEstimate(containerPrice: number, plantCount: number, pricePerPlant: number, suppliesCost: number = 15): number {
  return parseFloat((containerPrice + plantCount * pricePerPlant + suppliesCost).toFixed(2));
}

export function terrariumTypes(): TerrariumType[] {
  return ["closed", "open", "succulent", "moss", "orchid", "carnivorous"];
}
