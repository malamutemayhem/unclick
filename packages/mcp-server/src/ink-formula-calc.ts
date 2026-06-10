export type InkType = "iron_gall" | "carbon" | "sepia" | "bistre" | "walnut";

export function pigmentWeightG(volumeMl: number, type: InkType): number {
  const ratios: Record<InkType, number> = {
    iron_gall: 0.05, carbon: 0.1, sepia: 0.03, bistre: 0.04, walnut: 0.02,
  };
  return parseFloat((volumeMl * ratios[type]).toFixed(1));
}

export function binderWeightG(volumeMl: number, type: InkType): number {
  const ratios: Record<InkType, number> = {
    iron_gall: 0.02, carbon: 0.05, sepia: 0.03, bistre: 0.02, walnut: 0.01,
  };
  return parseFloat((volumeMl * ratios[type]).toFixed(1));
}

export function waterMl(volumeMl: number): number {
  return parseFloat((volumeMl * 0.85).toFixed(1));
}

export function steepingDays(type: InkType): number {
  const days: Record<InkType, number> = {
    iron_gall: 14, carbon: 1, sepia: 3, bistre: 7, walnut: 21,
  };
  return days[type];
}

export function viscosity(type: InkType): number {
  const visc: Record<InkType, number> = {
    iron_gall: 5, carbon: 8, sepia: 3, bistre: 4, walnut: 2,
  };
  return visc[type];
}

export function lightfastnessRating(type: InkType): number {
  const ratings: Record<InkType, number> = {
    iron_gall: 7, carbon: 10, sepia: 4, bistre: 3, walnut: 2,
  };
  return ratings[type];
}

export function waterproofWhenDry(type: InkType): boolean {
  return type === "carbon" || type === "iron_gall";
}

export function shelfLifeMonths(type: InkType): number {
  const months: Record<InkType, number> = {
    iron_gall: 6, carbon: 24, sepia: 12, bistre: 8, walnut: 3,
  };
  return months[type];
}

export function phLevel(type: InkType): number {
  const ph: Record<InkType, number> = {
    iron_gall: 2.5, carbon: 7.0, sepia: 6.5, bistre: 5.0, walnut: 4.5,
  };
  return ph[type];
}

export function costPerLiter(type: InkType, baseCost: number): number {
  const mult: Record<InkType, number> = {
    iron_gall: 1.5, carbon: 2.0, sepia: 5.0, bistre: 1.0, walnut: 0.5,
  };
  return parseFloat((baseCost * mult[type]).toFixed(2));
}

export function inkTypes(): InkType[] {
  return ["iron_gall", "carbon", "sepia", "bistre", "walnut"];
}
