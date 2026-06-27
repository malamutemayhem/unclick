export type ToasterType = "pop_up_2_slice" | "pop_up_4_slice" | "toaster_oven" | "conveyor_commercial" | "smart_screen";

export function toastEvenness(t: ToasterType): number {
  const m: Record<ToasterType, number> = {
    pop_up_2_slice: 7, pop_up_4_slice: 7, toaster_oven: 8, conveyor_commercial: 9, smart_screen: 10,
  };
  return m[t];
}

export function speedToast(t: ToasterType): number {
  const m: Record<ToasterType, number> = {
    pop_up_2_slice: 8, pop_up_4_slice: 8, toaster_oven: 5, conveyor_commercial: 10, smart_screen: 7,
  };
  return m[t];
}

export function versatility(t: ToasterType): number {
  const m: Record<ToasterType, number> = {
    pop_up_2_slice: 3, pop_up_4_slice: 4, toaster_oven: 10, conveyor_commercial: 5, smart_screen: 7,
  };
  return m[t];
}

export function counterSpace(t: ToasterType): number {
  const m: Record<ToasterType, number> = {
    pop_up_2_slice: 10, pop_up_4_slice: 7, toaster_oven: 3, conveyor_commercial: 1, smart_screen: 6,
  };
  return m[t];
}

export function toasterCost(t: ToasterType): number {
  const m: Record<ToasterType, number> = {
    pop_up_2_slice: 2, pop_up_4_slice: 3, toaster_oven: 5, conveyor_commercial: 9, smart_screen: 8,
  };
  return m[t];
}

export function bagelMode(t: ToasterType): boolean {
  const m: Record<ToasterType, boolean> = {
    pop_up_2_slice: true, pop_up_4_slice: true, toaster_oven: false, conveyor_commercial: false, smart_screen: true,
  };
  return m[t];
}

export function canBake(t: ToasterType): boolean {
  const m: Record<ToasterType, boolean> = {
    pop_up_2_slice: false, pop_up_4_slice: false, toaster_oven: true, conveyor_commercial: false, smart_screen: true,
  };
  return m[t];
}

export function heatingElement(t: ToasterType): string {
  const m: Record<ToasterType, string> = {
    pop_up_2_slice: "nichrome_wire_slot",
    pop_up_4_slice: "nichrome_wire_wide_slot",
    toaster_oven: "quartz_infrared_element",
    conveyor_commercial: "continuous_belt_radiant",
    smart_screen: "precision_quartz_sensor",
  };
  return m[t];
}

export function bestKitchen(t: ToasterType): string {
  const m: Record<ToasterType, string> = {
    pop_up_2_slice: "small_apartment_quick",
    pop_up_4_slice: "family_breakfast_rush",
    toaster_oven: "mini_oven_replacement",
    conveyor_commercial: "cafe_restaurant_volume",
    smart_screen: "tech_enthusiast_precise",
  };
  return m[t];
}

export function toasters(): ToasterType[] {
  return ["pop_up_2_slice", "pop_up_4_slice", "toaster_oven", "conveyor_commercial", "smart_screen"];
}
