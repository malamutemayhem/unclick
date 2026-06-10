export type ShelterType = "lean_to" | "debris_hut" | "snow_cave" | "tarp_shelter" | "wickiup";

export function buildTimeMinutes(shelter: ShelterType): number {
  const b: Record<ShelterType, number> = {
    lean_to: 30, debris_hut: 120, snow_cave: 180, tarp_shelter: 15, wickiup: 90,
  };
  return b[shelter];
}

export function warmthRating(shelter: ShelterType): number {
  const w: Record<ShelterType, number> = {
    lean_to: 3, debris_hut: 8, snow_cave: 9, tarp_shelter: 2, wickiup: 6,
  };
  return w[shelter];
}

export function waterproofRating(shelter: ShelterType): number {
  const w: Record<ShelterType, number> = {
    lean_to: 4, debris_hut: 7, snow_cave: 10, tarp_shelter: 8, wickiup: 5,
  };
  return w[shelter];
}

export function windProtection(shelter: ShelterType): number {
  const p: Record<ShelterType, number> = {
    lean_to: 4, debris_hut: 8, snow_cave: 10, tarp_shelter: 3, wickiup: 7,
  };
  return p[shelter];
}

export function materialsNeeded(shelter: ShelterType): number {
  const m: Record<ShelterType, number> = {
    lean_to: 4, debris_hut: 8, snow_cave: 2, tarp_shelter: 3, wickiup: 7,
  };
  return m[shelter];
}

export function toolsRequired(shelter: ShelterType): boolean {
  const t: Record<ShelterType, boolean> = {
    lean_to: false, debris_hut: false, snow_cave: true, tarp_shelter: true, wickiup: false,
  };
  return t[shelter];
}

export function bestSeason(shelter: ShelterType): string {
  const b: Record<ShelterType, string> = {
    lean_to: "summer", debris_hut: "fall", snow_cave: "winter",
    tarp_shelter: "any", wickiup: "spring",
  };
  return b[shelter];
}

export function sleepCapacity(shelter: ShelterType): number {
  const s: Record<ShelterType, number> = {
    lean_to: 2, debris_hut: 1, snow_cave: 3, tarp_shelter: 2, wickiup: 4,
  };
  return s[shelter];
}

export function skillRequired(shelter: ShelterType): number {
  const s: Record<ShelterType, number> = {
    lean_to: 2, debris_hut: 5, snow_cave: 8, tarp_shelter: 3, wickiup: 6,
  };
  return s[shelter];
}

export function shelterTypes(): ShelterType[] {
  return ["lean_to", "debris_hut", "snow_cave", "tarp_shelter", "wickiup"];
}
