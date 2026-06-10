export type PenguinType = "emperor" | "king" | "adelie" | "gentoo" | "macaroni";

export function heightCm(penguin: PenguinType): number {
  const m: Record<PenguinType, number> = {
    emperor: 115, king: 95, adelie: 70, gentoo: 80, macaroni: 70,
  };
  return m[penguin];
}

export function divingDepthMeters(penguin: PenguinType): number {
  const m: Record<PenguinType, number> = {
    emperor: 560, king: 300, adelie: 175, gentoo: 200, macaroni: 100,
  };
  return m[penguin];
}

export function swimmingSpeedKmh(penguin: PenguinType): number {
  const m: Record<PenguinType, number> = {
    emperor: 9, king: 12, adelie: 8, gentoo: 36, macaroni: 15,
  };
  return m[penguin];
}

export function coldTolerance(penguin: PenguinType): number {
  const m: Record<PenguinType, number> = {
    emperor: 10, king: 7, adelie: 9, gentoo: 6, macaroni: 5,
  };
  return m[penguin];
}

export function colonySize(penguin: PenguinType): number {
  const m: Record<PenguinType, number> = {
    emperor: 5000, king: 40000, adelie: 250000, gentoo: 5000, macaroni: 100000,
  };
  return m[penguin];
}

export function antarcticResident(penguin: PenguinType): boolean {
  const m: Record<PenguinType, boolean> = {
    emperor: true, king: false, adelie: true, gentoo: true, macaroni: false,
  };
  return m[penguin];
}

export function crestedHead(penguin: PenguinType): boolean {
  const m: Record<PenguinType, boolean> = {
    emperor: false, king: false, adelie: false, gentoo: false, macaroni: true,
  };
  return m[penguin];
}

export function breedingSeason(penguin: PenguinType): string {
  const m: Record<PenguinType, string> = {
    emperor: "antarctic_winter", king: "summer", adelie: "spring",
    gentoo: "spring", macaroni: "late_spring",
  };
  return m[penguin];
}

export function populationTrend(penguin: PenguinType): number {
  const m: Record<PenguinType, number> = {
    emperor: 4, king: 6, adelie: 5, gentoo: 7, macaroni: 3,
  };
  return m[penguin];
}

export function penguinTypes(): PenguinType[] {
  return ["emperor", "king", "adelie", "gentoo", "macaroni"];
}
