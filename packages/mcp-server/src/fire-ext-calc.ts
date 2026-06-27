export type FireExtType = "water_class_a" | "co2_class_b" | "dry_powder_abc" | "foam_afff" | "wet_chemical_k";

export function fireRating(t: FireExtType): number {
  const m: Record<FireExtType, number> = {
    water_class_a: 6, co2_class_b: 5, dry_powder_abc: 9, foam_afff: 8, wet_chemical_k: 7,
  };
  return m[t];
}

export function rechargeEase(t: FireExtType): number {
  const m: Record<FireExtType, number> = {
    water_class_a: 9, co2_class_b: 5, dry_powder_abc: 7, foam_afff: 6, wet_chemical_k: 4,
  };
  return m[t];
}

export function cleanupMess(t: FireExtType): number {
  const m: Record<FireExtType, number> = {
    water_class_a: 6, co2_class_b: 1, dry_powder_abc: 10, foam_afff: 7, wet_chemical_k: 5,
  };
  return m[t];
}

export function sprayRange(t: FireExtType): number {
  const m: Record<FireExtType, number> = {
    water_class_a: 8, co2_class_b: 3, dry_powder_abc: 7, foam_afff: 6, wet_chemical_k: 5,
  };
  return m[t];
}

export function extCost(t: FireExtType): number {
  const m: Record<FireExtType, number> = {
    water_class_a: 2, co2_class_b: 6, dry_powder_abc: 3, foam_afff: 5, wet_chemical_k: 8,
  };
  return m[t];
}

export function electricalSafe(t: FireExtType): boolean {
  const m: Record<FireExtType, boolean> = {
    water_class_a: false, co2_class_b: true, dry_powder_abc: true, foam_afff: false, wet_chemical_k: false,
  };
  return m[t];
}

export function cookingSafe(t: FireExtType): boolean {
  const m: Record<FireExtType, boolean> = {
    water_class_a: false, co2_class_b: false, dry_powder_abc: false, foam_afff: false, wet_chemical_k: true,
  };
  return m[t];
}

export function agentType(t: FireExtType): string {
  const m: Record<FireExtType, string> = {
    water_class_a: "pressurized_water_stream", co2_class_b: "carbon_dioxide_gas_smother",
    dry_powder_abc: "monoammonium_phosphate", foam_afff: "aqueous_film_forming_foam",
    wet_chemical_k: "potassium_acetate_mist",
  };
  return m[t];
}

export function bestHazard(t: FireExtType): string {
  const m: Record<FireExtType, string> = {
    water_class_a: "wood_paper_textile_fire", co2_class_b: "server_room_electronics",
    dry_powder_abc: "garage_workshop_general", foam_afff: "flammable_liquid_spill",
    wet_chemical_k: "commercial_kitchen_fryer",
  };
  return m[t];
}

export function fireExtinguishers(): FireExtType[] {
  return ["water_class_a", "co2_class_b", "dry_powder_abc", "foam_afff", "wet_chemical_k"];
}
