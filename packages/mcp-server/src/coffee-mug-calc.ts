export type CoffeeMugType = "ceramic_classic_handle" | "enamel_camp_fire" | "glass_clear_double" | "travel_insulated_seal" | "ember_heated_smart";

export function heatRetention(t: CoffeeMugType): number {
  const m: Record<CoffeeMugType, number> = {
    ceramic_classic_handle: 4, enamel_camp_fire: 3, glass_clear_double: 6, travel_insulated_seal: 9, ember_heated_smart: 10,
  };
  return m[t];
}

export function gripComfort(t: CoffeeMugType): number {
  const m: Record<CoffeeMugType, number> = {
    ceramic_classic_handle: 9, enamel_camp_fire: 7, glass_clear_double: 6, travel_insulated_seal: 8, ember_heated_smart: 8,
  };
  return m[t];
}

export function capacity(t: CoffeeMugType): number {
  const m: Record<CoffeeMugType, number> = {
    ceramic_classic_handle: 7, enamel_camp_fire: 6, glass_clear_double: 5, travel_insulated_seal: 9, ember_heated_smart: 7,
  };
  return m[t];
}

export function aesthetics(t: CoffeeMugType): number {
  const m: Record<CoffeeMugType, number> = {
    ceramic_classic_handle: 8, enamel_camp_fire: 7, glass_clear_double: 9, travel_insulated_seal: 5, ember_heated_smart: 8,
  };
  return m[t];
}

export function mugCost(t: CoffeeMugType): number {
  const m: Record<CoffeeMugType, number> = {
    ceramic_classic_handle: 3, enamel_camp_fire: 4, glass_clear_double: 5, travel_insulated_seal: 6, ember_heated_smart: 10,
  };
  return m[t];
}

export function microwaveSafe(t: CoffeeMugType): boolean {
  const m: Record<CoffeeMugType, boolean> = {
    ceramic_classic_handle: true, enamel_camp_fire: false, glass_clear_double: true, travel_insulated_seal: false, ember_heated_smart: false,
  };
  return m[t];
}

export function hasHandle(t: CoffeeMugType): boolean {
  const m: Record<CoffeeMugType, boolean> = {
    ceramic_classic_handle: true, enamel_camp_fire: true, glass_clear_double: true, travel_insulated_seal: false, ember_heated_smart: false,
  };
  return m[t];
}

export function mugMaterial(t: CoffeeMugType): string {
  const m: Record<CoffeeMugType, string> = {
    ceramic_classic_handle: "stoneware_glazed_kiln",
    enamel_camp_fire: "steel_porcelain_enamel",
    glass_clear_double: "borosilicate_hand_blown",
    travel_insulated_seal: "stainless_vacuum_double",
    ember_heated_smart: "ceramic_coated_lithium",
  };
  return m[t];
}

export function bestScene(t: CoffeeMugType): string {
  const m: Record<CoffeeMugType, string> = {
    ceramic_classic_handle: "home_office_kitchen",
    enamel_camp_fire: "camping_outdoor_rustic",
    glass_clear_double: "cafe_latte_art_display",
    travel_insulated_seal: "commute_car_on_go",
    ember_heated_smart: "desk_precise_temperature",
  };
  return m[t];
}

export function coffeeMugs(): CoffeeMugType[] {
  return ["ceramic_classic_handle", "enamel_camp_fire", "glass_clear_double", "travel_insulated_seal", "ember_heated_smart"];
}
