export type MeteorType = "stony" | "iron" | "stony_iron" | "carbonaceous" | "achondrite";

export function densityGCm3(meteor: MeteorType): number {
  const m: Record<MeteorType, number> = {
    stony: 3.4, iron: 7.8, stony_iron: 5.5, carbonaceous: 2.3, achondrite: 3.2,
  };
  return m[meteor];
}

export function abundancePercent(meteor: MeteorType): number {
  const m: Record<MeteorType, number> = {
    stony: 86, iron: 5, stony_iron: 1, carbonaceous: 4, achondrite: 4,
  };
  return m[meteor];
}

export function nickelContentPercent(meteor: MeteorType): number {
  const m: Record<MeteorType, number> = {
    stony: 1, iron: 8, stony_iron: 5, carbonaceous: 1.5, achondrite: 0.5,
  };
  return m[meteor];
}

export function fusionCrustRating(meteor: MeteorType): number {
  const m: Record<MeteorType, number> = {
    stony: 7, iron: 5, stony_iron: 6, carbonaceous: 8, achondrite: 7,
  };
  return m[meteor];
}

export function scientificValue(meteor: MeteorType): number {
  const m: Record<MeteorType, number> = {
    stony: 6, iron: 5, stony_iron: 7, carbonaceous: 10, achondrite: 9,
  };
  return m[meteor];
}

export function magneticResponse(meteor: MeteorType): boolean {
  const m: Record<MeteorType, boolean> = {
    stony: false, iron: true, stony_iron: true, carbonaceous: false, achondrite: false,
  };
  return m[meteor];
}

export function containsChondrules(meteor: MeteorType): boolean {
  const m: Record<MeteorType, boolean> = {
    stony: true, iron: false, stony_iron: false, carbonaceous: true, achondrite: false,
  };
  return m[meteor];
}

export function parentBody(meteor: MeteorType): string {
  const m: Record<MeteorType, string> = {
    stony: "asteroid_belt", iron: "asteroid_core", stony_iron: "core_mantle_boundary",
    carbonaceous: "outer_solar_system", achondrite: "differentiated_body",
  };
  return m[meteor];
}

export function collectorValuePerGram(meteor: MeteorType): number {
  const m: Record<MeteorType, number> = {
    stony: 5, iron: 3, stony_iron: 20, carbonaceous: 50, achondrite: 30,
  };
  return m[meteor];
}

export function meteorTypes(): MeteorType[] {
  return ["stony", "iron", "stony_iron", "carbonaceous", "achondrite"];
}
