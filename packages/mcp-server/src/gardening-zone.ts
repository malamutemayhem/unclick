export interface PlantingWindow {
  startMonth: number;
  endMonth: number;
  description: string;
}

export interface CropInfo {
  name: string;
  daysToHarvest: number;
  minTemp: number;
  maxTemp: number;
  spacing: number;
  depth: number;
  waterNeeds: "low" | "medium" | "high";
  sunNeeds: "full" | "partial" | "shade";
  companions: string[];
  enemies: string[];
}

export const CROPS: CropInfo[] = [
  { name: "tomato", daysToHarvest: 80, minTemp: 15, maxTemp: 35, spacing: 60, depth: 1, waterNeeds: "high", sunNeeds: "full", companions: ["basil", "carrot", "parsley"], enemies: ["cabbage", "fennel"] },
  { name: "lettuce", daysToHarvest: 45, minTemp: 4, maxTemp: 24, spacing: 20, depth: 0.5, waterNeeds: "medium", sunNeeds: "partial", companions: ["carrot", "radish", "strawberry"], enemies: ["celery"] },
  { name: "carrot", daysToHarvest: 70, minTemp: 7, maxTemp: 30, spacing: 5, depth: 1, waterNeeds: "medium", sunNeeds: "full", companions: ["lettuce", "onion", "tomato"], enemies: ["dill"] },
  { name: "basil", daysToHarvest: 60, minTemp: 15, maxTemp: 35, spacing: 25, depth: 0.5, waterNeeds: "medium", sunNeeds: "full", companions: ["tomato", "pepper"], enemies: ["sage"] },
  { name: "pepper", daysToHarvest: 75, minTemp: 18, maxTemp: 35, spacing: 45, depth: 1, waterNeeds: "medium", sunNeeds: "full", companions: ["basil", "carrot", "tomato"], enemies: ["fennel"] },
  { name: "cucumber", daysToHarvest: 55, minTemp: 15, maxTemp: 32, spacing: 30, depth: 2, waterNeeds: "high", sunNeeds: "full", companions: ["bean", "corn", "pea"], enemies: ["potato"] },
  { name: "bean", daysToHarvest: 55, minTemp: 15, maxTemp: 30, spacing: 10, depth: 3, waterNeeds: "medium", sunNeeds: "full", companions: ["corn", "cucumber", "potato"], enemies: ["onion", "garlic"] },
  { name: "radish", daysToHarvest: 25, minTemp: 4, maxTemp: 24, spacing: 5, depth: 1, waterNeeds: "low", sunNeeds: "full", companions: ["lettuce", "pea", "carrot"], enemies: [] },
  { name: "spinach", daysToHarvest: 40, minTemp: 2, maxTemp: 24, spacing: 10, depth: 1, waterNeeds: "medium", sunNeeds: "partial", companions: ["strawberry", "pea"], enemies: [] },
  { name: "potato", daysToHarvest: 90, minTemp: 7, maxTemp: 28, spacing: 30, depth: 10, waterNeeds: "medium", sunNeeds: "full", companions: ["bean", "corn"], enemies: ["tomato", "cucumber"] },
];

export function getCrop(name: string): CropInfo | null {
  return CROPS.find(c => c.name.toLowerCase() === name.toLowerCase()) ?? null;
}

export function isCompanion(crop1: string, crop2: string): boolean | null {
  const c = getCrop(crop1);
  if (!c) return null;
  return c.companions.includes(crop2.toLowerCase());
}

export function isEnemy(crop1: string, crop2: string): boolean | null {
  const c = getCrop(crop1);
  if (!c) return null;
  return c.enemies.includes(crop2.toLowerCase());
}

export function gardenArea(rows: number, rowLength: number, spacing: number): number {
  return Math.floor(rows * rowLength / spacing);
}

export function plantsPerArea(areaSqM: number, spacingCm: number): number {
  const spacingM = spacingCm / 100;
  return Math.floor(areaSqM / (spacingM * spacingM));
}

export function harvestDate(plantingDay: number, daysToHarvest: number): number {
  return plantingDay + daysToHarvest;
}

export function daysUntilHarvest(plantingDay: number, currentDay: number, daysToHarvest: number): number {
  return Math.max(0, plantingDay + daysToHarvest - currentDay);
}

export function wateringSchedule(crop: CropInfo): { frequencyDays: number; amountLiters: number } {
  const freq = crop.waterNeeds === "high" ? 1 : crop.waterNeeds === "medium" ? 2 : 4;
  const amount = crop.waterNeeds === "high" ? 2.5 : crop.waterNeeds === "medium" ? 1.5 : 0.5;
  return { frequencyDays: freq, amountLiters: amount };
}

export function companionGroups(crops: string[]): { compatible: string[][]; conflicts: [string, string][] } {
  const conflicts: [string, string][] = [];
  for (let i = 0; i < crops.length; i++) {
    for (let j = i + 1; j < crops.length; j++) {
      if (isEnemy(crops[i], crops[j]) || isEnemy(crops[j], crops[i])) {
        conflicts.push([crops[i], crops[j]]);
      }
    }
  }

  const compatible: string[][] = [];
  const used = new Set<string>();
  for (const crop of crops) {
    if (used.has(crop)) continue;
    const group = [crop];
    used.add(crop);
    for (const other of crops) {
      if (used.has(other)) continue;
      if (isCompanion(crop, other)) {
        group.push(other);
        used.add(other);
      }
    }
    compatible.push(group);
  }

  return { compatible, conflicts };
}

export function frostRisk(tempC: number): "none" | "light" | "moderate" | "severe" {
  if (tempC > 5) return "none";
  if (tempC > 0) return "light";
  if (tempC > -5) return "moderate";
  return "severe";
}

export function growingDegreeDays(tempMax: number, tempMin: number, baseTemp = 10): number {
  const avg = (tempMax + tempMin) / 2;
  return Math.max(0, avg - baseTemp);
}

export function soilMoistureLevel(lastWatered: number, currentDay: number, waterNeeds: "low" | "medium" | "high"): string {
  const daysSince = currentDay - lastWatered;
  const threshold = waterNeeds === "high" ? 1 : waterNeeds === "medium" ? 2 : 4;
  if (daysSince <= threshold) return "adequate";
  if (daysSince <= threshold * 2) return "low";
  return "critical";
}
