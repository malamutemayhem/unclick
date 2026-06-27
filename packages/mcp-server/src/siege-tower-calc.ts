export type SiegeTowerCover = "rawhide" | "iron_plate" | "wet_cloth" | "earth_fill" | "timber";

export function heightM(wallHeightM: number): number {
  return parseFloat((wallHeightM + 2).toFixed(2));
}

export function baseWidthM(heightM: number): number {
  return parseFloat((heightM * 0.35).toFixed(2));
}

export function platformCount(heightM: number): number {
  return Math.max(2, Math.ceil(heightM / 3));
}

export function crewCapacity(platformCount: number): number {
  return platformCount * 8;
}

export function timberVolumeM3(heightM: number, baseWidthM: number): number {
  return parseFloat((heightM * baseWidthM * baseWidthM * 0.15).toFixed(2));
}

export function wheelCount(baseWidthM: number): number {
  return baseWidthM > 4 ? 6 : 4;
}

export function totalWeightKg(timberVolumeM3: number, cover: SiegeTowerCover): number {
  const coverWeightPerM3: Record<SiegeTowerCover, number> = {
    rawhide: 50, iron_plate: 200, wet_cloth: 30, earth_fill: 150, timber: 0,
  };
  const baseWeight = timberVolumeM3 * 600;
  return parseFloat((baseWeight + timberVolumeM3 * coverWeightPerM3[cover]).toFixed(1));
}

export function pushCrewNeeded(totalWeightKg: number): number {
  return Math.max(10, Math.ceil(totalWeightKg / 200));
}

export function constructionDays(timberVolumeM3: number): number {
  return Math.max(3, Math.ceil(timberVolumeM3 * 2));
}

export function fireResistance(cover: SiegeTowerCover): number {
  const resistance: Record<SiegeTowerCover, number> = {
    rawhide: 5, iron_plate: 9, wet_cloth: 7, earth_fill: 8, timber: 2,
  };
  return resistance[cover];
}

export function siegeTowerCovers(): SiegeTowerCover[] {
  return ["rawhide", "iron_plate", "wet_cloth", "earth_fill", "timber"];
}
