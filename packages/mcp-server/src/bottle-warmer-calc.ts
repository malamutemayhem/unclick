export type BottleWarmerType = "steam_bath_rapid" | "water_bath_gentle" | "portable_usb" | "car_adapter_12v" | "smart_app_control";

export function warmSpeed(t: BottleWarmerType): number {
  const m: Record<BottleWarmerType, number> = {
    steam_bath_rapid: 10, water_bath_gentle: 5, portable_usb: 3, car_adapter_12v: 4, smart_app_control: 8,
  };
  return m[t];
}

export function evenHeat(t: BottleWarmerType): number {
  const m: Record<BottleWarmerType, number> = {
    steam_bath_rapid: 7, water_bath_gentle: 10, portable_usb: 5, car_adapter_12v: 6, smart_app_control: 9,
  };
  return m[t];
}

export function bottleFit(t: BottleWarmerType): number {
  const m: Record<BottleWarmerType, number> = {
    steam_bath_rapid: 8, water_bath_gentle: 9, portable_usb: 5, car_adapter_12v: 6, smart_app_control: 8,
  };
  return m[t];
}

export function portability(t: BottleWarmerType): number {
  const m: Record<BottleWarmerType, number> = {
    steam_bath_rapid: 3, water_bath_gentle: 3, portable_usb: 10, car_adapter_12v: 8, smart_app_control: 4,
  };
  return m[t];
}

export function warmerCost(t: BottleWarmerType): number {
  const m: Record<BottleWarmerType, number> = {
    steam_bath_rapid: 5, water_bath_gentle: 4, portable_usb: 3, car_adapter_12v: 4, smart_app_control: 9,
  };
  return m[t];
}

export function defrostMode(t: BottleWarmerType): boolean {
  const m: Record<BottleWarmerType, boolean> = {
    steam_bath_rapid: true, water_bath_gentle: true, portable_usb: false, car_adapter_12v: false, smart_app_control: true,
  };
  return m[t];
}

export function autoShutoff(t: BottleWarmerType): boolean {
  const m: Record<BottleWarmerType, boolean> = {
    steam_bath_rapid: true, water_bath_gentle: false, portable_usb: true, car_adapter_12v: true, smart_app_control: true,
  };
  return m[t];
}

export function heatMethod(t: BottleWarmerType): string {
  const m: Record<BottleWarmerType, string> = {
    steam_bath_rapid: "steam_chamber_vortex",
    water_bath_gentle: "warm_water_circulate",
    portable_usb: "heating_sleeve_wrap",
    car_adapter_12v: "insulated_cup_element",
    smart_app_control: "precision_steam_sensor",
  };
  return m[t];
}

export function bestSetup(t: BottleWarmerType): string {
  const m: Record<BottleWarmerType, string> = {
    steam_bath_rapid: "nightstand_quick_feed",
    water_bath_gentle: "kitchen_counter_gentle",
    portable_usb: "stroller_on_the_go",
    car_adapter_12v: "road_trip_car_seat",
    smart_app_control: "tech_parent_schedule",
  };
  return m[t];
}

export function bottleWarmers(): BottleWarmerType[] {
  return ["steam_bath_rapid", "water_bath_gentle", "portable_usb", "car_adapter_12v", "smart_app_control"];
}
