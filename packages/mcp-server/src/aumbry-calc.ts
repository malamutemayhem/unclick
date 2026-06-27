export type AumbryPurpose = "eucharist" | "relics" | "oils" | "vestments" | "books";

export function widthCm(purpose: AumbryPurpose): number {
  const widths: Record<AumbryPurpose, number> = {
    eucharist: 30, relics: 25, oils: 20, vestments: 45, books: 40,
  };
  return widths[purpose];
}

export function heightCm(purpose: AumbryPurpose): number {
  const heights: Record<AumbryPurpose, number> = {
    eucharist: 35, relics: 30, oils: 25, vestments: 60, books: 50,
  };
  return heights[purpose];
}

export function depthCm(wallThicknessCm: number): number {
  return parseFloat((wallThicknessCm * 0.55).toFixed(1));
}

export function volumeCm3(widthCm: number, heightCm: number, depthCm: number): number {
  return parseFloat((widthCm * heightCm * depthCm).toFixed(1));
}

export function doorPanelCount(purpose: AumbryPurpose): number {
  const panels: Record<AumbryPurpose, number> = {
    eucharist: 1, relics: 1, oils: 1, vestments: 2, books: 2,
  };
  return panels[purpose];
}

export function lockRequired(purpose: AumbryPurpose): boolean {
  return purpose === "eucharist" || purpose === "relics";
}

export function lintelThicknessCm(widthCm: number): number {
  return parseFloat((widthCm * 0.2).toFixed(1));
}

export function carvingHours(purpose: AumbryPurpose): number {
  const hours: Record<AumbryPurpose, number> = {
    eucharist: 16, relics: 14, oils: 8, vestments: 10, books: 12,
  };
  return hours[purpose];
}

export function consecrationRequired(purpose: AumbryPurpose): boolean {
  return purpose === "eucharist" || purpose === "relics" || purpose === "oils";
}

export function restorationCost(purpose: AumbryPurpose, costPerHour: number): number {
  return parseFloat((carvingHours(purpose) * 2 * costPerHour).toFixed(2));
}

export function aumbryPurposes(): AumbryPurpose[] {
  return ["eucharist", "relics", "oils", "vestments", "books"];
}
