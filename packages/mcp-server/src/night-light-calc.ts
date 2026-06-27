export type NightLightType = "plug_in_led" | "motion_sensor" | "projector_star" | "salt_lamp_warm" | "rechargeable_portable";

export function brightness(t: NightLightType): number {
  const m: Record<NightLightType, number> = {
    plug_in_led: 5, motion_sensor: 7, projector_star: 4, salt_lamp_warm: 3, rechargeable_portable: 6,
  };
  return m[t];
}

export function sleepFriendly(t: NightLightType): number {
  const m: Record<NightLightType, number> = {
    plug_in_led: 7, motion_sensor: 9, projector_star: 6, salt_lamp_warm: 10, rechargeable_portable: 8,
  };
  return m[t];
}

export function energyUse(t: NightLightType): number {
  const m: Record<NightLightType, number> = {
    plug_in_led: 9, motion_sensor: 10, projector_star: 6, salt_lamp_warm: 5, rechargeable_portable: 8,
  };
  return m[t];
}

export function ambiance(t: NightLightType): number {
  const m: Record<NightLightType, number> = {
    plug_in_led: 4, motion_sensor: 3, projector_star: 10, salt_lamp_warm: 9, rechargeable_portable: 5,
  };
  return m[t];
}

export function lightCost(t: NightLightType): number {
  const m: Record<NightLightType, number> = {
    plug_in_led: 1, motion_sensor: 3, projector_star: 4, salt_lamp_warm: 5, rechargeable_portable: 3,
  };
  return m[t];
}

export function autoOnOff(t: NightLightType): boolean {
  const m: Record<NightLightType, boolean> = {
    plug_in_led: true, motion_sensor: true, projector_star: false, salt_lamp_warm: false, rechargeable_portable: false,
  };
  return m[t];
}

export function cordless(t: NightLightType): boolean {
  const m: Record<NightLightType, boolean> = {
    plug_in_led: false, motion_sensor: true, projector_star: false, salt_lamp_warm: false, rechargeable_portable: true,
  };
  return m[t];
}

export function lightSource(t: NightLightType): string {
  const m: Record<NightLightType, string> = {
    plug_in_led: "warm_white_led_chip",
    motion_sensor: "pir_sensor_led_array",
    projector_star: "laser_led_lens_project",
    salt_lamp_warm: "himalayan_salt_bulb",
    rechargeable_portable: "usb_charge_silicone_led",
  };
  return m[t];
}

export function bestRoom(t: NightLightType): string {
  const m: Record<NightLightType, string> = {
    plug_in_led: "hallway_bathroom_outlet",
    motion_sensor: "stairway_closet_path",
    projector_star: "kids_bedroom_ceiling",
    salt_lamp_warm: "meditation_bedside_calm",
    rechargeable_portable: "nursery_camping_travel",
  };
  return m[t];
}

export function nightLights(): NightLightType[] {
  return ["plug_in_led", "motion_sensor", "projector_star", "salt_lamp_warm", "rechargeable_portable"];
}
