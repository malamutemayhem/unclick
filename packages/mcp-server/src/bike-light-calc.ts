export type BikeLightType = "front_usb_rechargeable" | "rear_tail_flash" | "dynamo_hub" | "helmet_mount" | "spoke_wheel";

export function brightness(t: BikeLightType): number {
  const m: Record<BikeLightType, number> = {
    front_usb_rechargeable: 9, rear_tail_flash: 5, dynamo_hub: 8, helmet_mount: 7, spoke_wheel: 3,
  };
  return m[t];
}

export function runtime(t: BikeLightType): number {
  const m: Record<BikeLightType, number> = {
    front_usb_rechargeable: 6, rear_tail_flash: 8, dynamo_hub: 10, helmet_mount: 5, spoke_wheel: 10,
  };
  return m[t];
}

export function visibility(t: BikeLightType): number {
  const m: Record<BikeLightType, number> = {
    front_usb_rechargeable: 8, rear_tail_flash: 9, dynamo_hub: 7, helmet_mount: 8, spoke_wheel: 7,
  };
  return m[t];
}

export function mountEase(t: BikeLightType): number {
  const m: Record<BikeLightType, number> = {
    front_usb_rechargeable: 9, rear_tail_flash: 10, dynamo_hub: 2, helmet_mount: 7, spoke_wheel: 5,
  };
  return m[t];
}

export function lightCost(t: BikeLightType): number {
  const m: Record<BikeLightType, number> = {
    front_usb_rechargeable: 4, rear_tail_flash: 2, dynamo_hub: 9, helmet_mount: 5, spoke_wheel: 3,
  };
  return m[t];
}

export function weatherproof(t: BikeLightType): boolean {
  const m: Record<BikeLightType, boolean> = {
    front_usb_rechargeable: true, rear_tail_flash: true, dynamo_hub: true, helmet_mount: false, spoke_wheel: true,
  };
  return m[t];
}

export function needsCharging(t: BikeLightType): boolean {
  const m: Record<BikeLightType, boolean> = {
    front_usb_rechargeable: true, rear_tail_flash: true, dynamo_hub: false, helmet_mount: true, spoke_wheel: false,
  };
  return m[t];
}

export function powerSource(t: BikeLightType): string {
  const m: Record<BikeLightType, string> = {
    front_usb_rechargeable: "lithium_ion_usb_c", rear_tail_flash: "cr2032_coin_cell",
    dynamo_hub: "hub_generator_magnetic", helmet_mount: "rechargeable_18650",
    spoke_wheel: "motion_powered_led",
  };
  return m[t];
}

export function bestRide(t: BikeLightType): string {
  const m: Record<BikeLightType, string> = {
    front_usb_rechargeable: "night_commute_road", rear_tail_flash: "daytime_visibility_safety",
    dynamo_hub: "long_distance_touring", helmet_mount: "trail_mountain_night",
    spoke_wheel: "urban_style_side_visible",
  };
  return m[t];
}

export function bikeLights(): BikeLightType[] {
  return ["front_usb_rechargeable", "rear_tail_flash", "dynamo_hub", "helmet_mount", "spoke_wheel"];
}
