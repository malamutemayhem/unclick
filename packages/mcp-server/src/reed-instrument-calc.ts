export type CaneMaterial = "arundo_donax" | "synthetic" | "bamboo" | "plastic" | "carbon";

export function reedThicknessMm(strength: number): number {
  return parseFloat((0.1 + strength * 0.02).toFixed(2));
}

export function tipOpeningMm(strength: number): number {
  return parseFloat((1.5 - strength * 0.05).toFixed(2));
}

export function breakInMinutes(cane: CaneMaterial): number {
  const times: Record<CaneMaterial, number> = {
    arundo_donax: 15, synthetic: 0, bamboo: 10, plastic: 0, carbon: 5,
  };
  return times[cane];
}

export function lifespanHours(cane: CaneMaterial): number {
  const hours: Record<CaneMaterial, number> = {
    arundo_donax: 40, synthetic: 200, bamboo: 30, plastic: 150, carbon: 100,
  };
  return hours[cane];
}

export function humidityAffected(cane: CaneMaterial): boolean {
  return cane === "arundo_donax" || cane === "bamboo";
}

export function responseRating(cane: CaneMaterial): number {
  const ratings: Record<CaneMaterial, number> = {
    arundo_donax: 5, synthetic: 3, bamboo: 4, plastic: 2, carbon: 3,
  };
  return ratings[cane];
}

export function toneWarmthRating(cane: CaneMaterial): number {
  const ratings: Record<CaneMaterial, number> = {
    arundo_donax: 5, synthetic: 2, bamboo: 4, plastic: 1, carbon: 3,
  };
  return ratings[cane];
}

export function adjustabilityRating(cane: CaneMaterial): number {
  const ratings: Record<CaneMaterial, number> = {
    arundo_donax: 5, synthetic: 1, bamboo: 4, plastic: 1, carbon: 2,
  };
  return ratings[cane];
}

export function costPerReed(cane: CaneMaterial): number {
  const costs: Record<CaneMaterial, number> = {
    arundo_donax: 4, synthetic: 20, bamboo: 2, plastic: 8, carbon: 15,
  };
  return costs[cane];
}

export function caneMaterials(): CaneMaterial[] {
  return ["arundo_donax", "synthetic", "bamboo", "plastic", "carbon"];
}
