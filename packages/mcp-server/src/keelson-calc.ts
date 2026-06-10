export type KeelsonType = "main" | "sister" | "rider" | "bilge" | "side";

export function depthCm(type: KeelsonType, hullDepthCm: number): number {
  const ratio: Record<KeelsonType, number> = {
    main: 0.12, sister: 0.08, rider: 0.10, bilge: 0.06, side: 0.07,
  };
  return parseFloat((hullDepthCm * ratio[type]).toFixed(1));
}

export function widthCm(type: KeelsonType, depthCm: number): number {
  const ratio: Record<KeelsonType, number> = {
    main: 0.8, sister: 0.6, rider: 0.7, bilge: 0.5, side: 0.55,
  };
  return parseFloat((depthCm * ratio[type]).toFixed(1));
}

export function boltSpacingCm(type: KeelsonType): number {
  const spacing: Record<KeelsonType, number> = {
    main: 30, sister: 40, rider: 35, bilge: 45, side: 45,
  };
  return spacing[type];
}

export function boltDiameterMm(keelsonDepthCm: number): number {
  return Math.round(keelsonDepthCm * 1.5);
}

export function scarfLengthCm(depthCm: number): number {
  return Math.round(depthCm * 6);
}

export function timberSpecies(type: KeelsonType): string {
  const species: Record<KeelsonType, string> = {
    main: "white_oak", sister: "white_oak", rider: "elm", bilge: "pine", side: "fir",
  };
  return species[type];
}

export function weightPerMeterKg(widthCm: number, depthCm: number): number {
  return parseFloat((widthCm / 100 * depthCm / 100 * 700).toFixed(1));
}

export function installationHoursPerM(type: KeelsonType): number {
  const hours: Record<KeelsonType, number> = {
    main: 4, sister: 3, rider: 3.5, bilge: 2, side: 2.5,
  };
  return hours[type];
}

export function costPerMeterTimber(type: KeelsonType): number {
  const costs: Record<KeelsonType, number> = {
    main: 120, sister: 80, rider: 90, bilge: 50, side: 60,
  };
  return costs[type];
}

export function keelsonTypes(): KeelsonType[] {
  return ["main", "sister", "rider", "bilge", "side"];
}
