export type WetsuitType = "full_suit_3_2" | "spring_suit_2mm" | "hooded_5_4" | "farmer_john_sleeveless" | "drysuit_sealed";

export function warmth(t: WetsuitType): number {
  const m: Record<WetsuitType, number> = {
    full_suit_3_2: 7, spring_suit_2mm: 4, hooded_5_4: 10, farmer_john_sleeveless: 5, drysuit_sealed: 9,
  };
  return m[t];
}

export function flexibility(t: WetsuitType): number {
  const m: Record<WetsuitType, number> = {
    full_suit_3_2: 8, spring_suit_2mm: 10, hooded_5_4: 5, farmer_john_sleeveless: 9, drysuit_sealed: 4,
  };
  return m[t];
}

export function entryEase(t: WetsuitType): number {
  const m: Record<WetsuitType, number> = {
    full_suit_3_2: 6, spring_suit_2mm: 9, hooded_5_4: 4, farmer_john_sleeveless: 8, drysuit_sealed: 3,
  };
  return m[t];
}

export function dryTime(t: WetsuitType): number {
  const m: Record<WetsuitType, number> = {
    full_suit_3_2: 5, spring_suit_2mm: 8, hooded_5_4: 3, farmer_john_sleeveless: 7, drysuit_sealed: 6,
  };
  return m[t];
}

export function suitCost(t: WetsuitType): number {
  const m: Record<WetsuitType, number> = {
    full_suit_3_2: 6, spring_suit_2mm: 4, hooded_5_4: 8, farmer_john_sleeveless: 5, drysuit_sealed: 10,
  };
  return m[t];
}

export function sealedSeams(t: WetsuitType): boolean {
  const m: Record<WetsuitType, boolean> = {
    full_suit_3_2: true, spring_suit_2mm: false, hooded_5_4: true, farmer_john_sleeveless: false, drysuit_sealed: true,
  };
  return m[t];
}

export function builtInHood(t: WetsuitType): boolean {
  const m: Record<WetsuitType, boolean> = {
    full_suit_3_2: false, spring_suit_2mm: false, hooded_5_4: true, farmer_john_sleeveless: false, drysuit_sealed: false,
  };
  return m[t];
}

export function neopreneTech(t: WetsuitType): string {
  const m: Record<WetsuitType, string> = {
    full_suit_3_2: "limestone_neoprene_gbs",
    spring_suit_2mm: "super_stretch_jersey",
    hooded_5_4: "thermal_lined_fireline",
    farmer_john_sleeveless: "standard_flatlock_panel",
    drysuit_sealed: "trilaminate_breathable_shell",
  };
  return m[t];
}

export function bestWater(t: WetsuitType): string {
  const m: Record<WetsuitType, string> = {
    full_suit_3_2: "temperate_ocean_surf",
    spring_suit_2mm: "warm_tropical_paddle",
    hooded_5_4: "cold_winter_dive",
    farmer_john_sleeveless: "lake_kayak_summer",
    drysuit_sealed: "ice_water_rescue",
  };
  return m[t];
}

export function wetsuits(): WetsuitType[] {
  return ["full_suit_3_2", "spring_suit_2mm", "hooded_5_4", "farmer_john_sleeveless", "drysuit_sealed"];
}
