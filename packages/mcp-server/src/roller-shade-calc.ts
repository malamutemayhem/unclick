export type RollerShadeType = "light_filter_basic" | "blackout_total_dark" | "solar_screen_uv" | "dual_zebra_stripe" | "motorized_smart_remote";

export function lightControl(t: RollerShadeType): number {
  const m: Record<RollerShadeType, number> = {
    light_filter_basic: 5, blackout_total_dark: 10, solar_screen_uv: 6, dual_zebra_stripe: 8, motorized_smart_remote: 7,
  };
  return m[t];
}

export function uvProtection(t: RollerShadeType): number {
  const m: Record<RollerShadeType, number> = {
    light_filter_basic: 5, blackout_total_dark: 10, solar_screen_uv: 10, dual_zebra_stripe: 7, motorized_smart_remote: 7,
  };
  return m[t];
}

export function privacy(t: RollerShadeType): number {
  const m: Record<RollerShadeType, number> = {
    light_filter_basic: 4, blackout_total_dark: 10, solar_screen_uv: 6, dual_zebra_stripe: 8, motorized_smart_remote: 7,
  };
  return m[t];
}

export function easeOfUse(t: RollerShadeType): number {
  const m: Record<RollerShadeType, number> = {
    light_filter_basic: 8, blackout_total_dark: 7, solar_screen_uv: 8, dual_zebra_stripe: 7, motorized_smart_remote: 10,
  };
  return m[t];
}

export function shadeCost(t: RollerShadeType): number {
  const m: Record<RollerShadeType, number> = {
    light_filter_basic: 2, blackout_total_dark: 3, solar_screen_uv: 4, dual_zebra_stripe: 5, motorized_smart_remote: 8,
  };
  return m[t];
}

export function cordless(t: RollerShadeType): boolean {
  const m: Record<RollerShadeType, boolean> = {
    light_filter_basic: true, blackout_total_dark: true, solar_screen_uv: true, dual_zebra_stripe: true, motorized_smart_remote: true,
  };
  return m[t];
}

export function smartHome(t: RollerShadeType): boolean {
  const m: Record<RollerShadeType, boolean> = {
    light_filter_basic: false, blackout_total_dark: false, solar_screen_uv: false, dual_zebra_stripe: false, motorized_smart_remote: true,
  };
  return m[t];
}

export function fabricType(t: RollerShadeType): string {
  const m: Record<RollerShadeType, string> = {
    light_filter_basic: "polyester_light_filter",
    blackout_total_dark: "pvc_coated_blackout",
    solar_screen_uv: "open_weave_solar_mesh",
    dual_zebra_stripe: "alternating_sheer_opaque",
    motorized_smart_remote: "polyester_motor_tube",
  };
  return m[t];
}

export function bestRoom(t: RollerShadeType): string {
  const m: Record<RollerShadeType, string> = {
    light_filter_basic: "living_room_soft_glow",
    blackout_total_dark: "bedroom_media_room",
    solar_screen_uv: "sunroom_office_glare",
    dual_zebra_stripe: "modern_adjustable_privacy",
    motorized_smart_remote: "hard_to_reach_skylight",
  };
  return m[t];
}

export function rollerShades(): RollerShadeType[] {
  return ["light_filter_basic", "blackout_total_dark", "solar_screen_uv", "dual_zebra_stripe", "motorized_smart_remote"];
}
