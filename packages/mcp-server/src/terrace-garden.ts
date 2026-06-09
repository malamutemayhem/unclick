export type ContainerType = "pot" | "raised_bed" | "grow_bag" | "hanging" | "window_box" | "vertical";
export type PlantCategory = "herb" | "vegetable" | "flower" | "succulent" | "fruit";

export function containerVolume(type: ContainerType, sizeCm: number): number {
  const factors: Record<ContainerType, number> = {
    pot: 0.5, raised_bed: 0.9, grow_bag: 0.8, hanging: 0.3, window_box: 0.6, vertical: 0.2,
  };
  return parseFloat((sizeCm ** 3 / 1000 * factors[type]).toFixed(1));
}

export function soilNeeded(volumeLiters: number): number {
  return parseFloat((volumeLiters * 0.85).toFixed(1));
}

export function drainageLayer(volumeLiters: number): number {
  return parseFloat((volumeLiters * 0.15).toFixed(1));
}

export function plantsPerContainer(containerDiamCm: number, spacingCm: number): number {
  if (spacingCm === 0) return 0;
  const areaCm2 = Math.PI * (containerDiamCm / 2) ** 2;
  return Math.max(1, Math.floor(areaCm2 / (spacingCm ** 2)));
}

export function wateringFrequency(tempC: number, containerType: ContainerType): string {
  const baseDays = containerType === "hanging" || containerType === "pot" ? 1 : 2;
  if (tempC > 30) return "daily";
  if (tempC > 20) return baseDays === 1 ? "daily" : "every 2 days";
  return baseDays === 1 ? "every 2 days" : "every 3 days";
}

export function fertilizerAmount(volumeLiters: number, feedType: "liquid" | "slow_release"): number {
  if (feedType === "liquid") return parseFloat((volumeLiters * 0.5).toFixed(1));
  return parseFloat((volumeLiters * 2).toFixed(0));
}

export function sunlightHours(category: PlantCategory): number {
  const hours: Record<PlantCategory, number> = {
    herb: 6, vegetable: 8, flower: 6, succulent: 4, fruit: 8,
  };
  return hours[category];
}

export function harvestWeeks(category: PlantCategory): number {
  const weeks: Record<PlantCategory, number> = {
    herb: 6, vegetable: 10, flower: 8, succulent: 0, fruit: 16,
  };
  return weeks[category];
}

export function companionPlanting(plant1: PlantCategory, plant2: PlantCategory): boolean {
  const good = new Set(["herb-vegetable", "vegetable-herb", "flower-vegetable", "vegetable-flower", "herb-flower", "flower-herb"]);
  return good.has(`${plant1}-${plant2}`);
}

export function weightCapacity(balconySqM: number, loadKgPerSqM: number = 300): number {
  return Math.round(balconySqM * loadKgPerSqM);
}

export function potWeight(volumeLiters: number): number {
  return parseFloat((volumeLiters * 1.2 + 2).toFixed(1));
}

export function costEstimate(containerCount: number, avgContainerPrice: number, soilLiters: number, soilPricePerLiter: number): number {
  return parseFloat((containerCount * avgContainerPrice + soilLiters * soilPricePerLiter).toFixed(2));
}

export function containerTypes(): ContainerType[] {
  return ["pot", "raised_bed", "grow_bag", "hanging", "window_box", "vertical"];
}
