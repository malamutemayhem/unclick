export type ScreenProtectorType = "tempered_glass_9h" | "matte_anti_glare" | "privacy_filter" | "hydrogel_self_heal" | "blue_light_block";

export function scratchResistance(t: ScreenProtectorType): number {
  const m: Record<ScreenProtectorType, number> = {
    tempered_glass_9h: 10, matte_anti_glare: 6, privacy_filter: 7, hydrogel_self_heal: 5, blue_light_block: 8,
  };
  return m[t];
}

export function touchSensitivity(t: ScreenProtectorType): number {
  const m: Record<ScreenProtectorType, number> = {
    tempered_glass_9h: 9, matte_anti_glare: 7, privacy_filter: 6, hydrogel_self_heal: 10, blue_light_block: 8,
  };
  return m[t];
}

export function clarity(t: ScreenProtectorType): number {
  const m: Record<ScreenProtectorType, number> = {
    tempered_glass_9h: 9, matte_anti_glare: 5, privacy_filter: 6, hydrogel_self_heal: 8, blue_light_block: 7,
  };
  return m[t];
}

export function installEase(t: ScreenProtectorType): number {
  const m: Record<ScreenProtectorType, number> = {
    tempered_glass_9h: 8, matte_anti_glare: 7, privacy_filter: 6, hydrogel_self_heal: 4, blue_light_block: 8,
  };
  return m[t];
}

export function protectorCost(t: ScreenProtectorType): number {
  const m: Record<ScreenProtectorType, number> = {
    tempered_glass_9h: 4, matte_anti_glare: 3, privacy_filter: 7, hydrogel_self_heal: 6, blue_light_block: 5,
  };
  return m[t];
}

export function shatterProof(t: ScreenProtectorType): boolean {
  const m: Record<ScreenProtectorType, boolean> = {
    tempered_glass_9h: true, matte_anti_glare: false, privacy_filter: false, hydrogel_self_heal: false, blue_light_block: true,
  };
  return m[t];
}

export function selfHealing(t: ScreenProtectorType): boolean {
  const m: Record<ScreenProtectorType, boolean> = {
    tempered_glass_9h: false, matte_anti_glare: false, privacy_filter: false, hydrogel_self_heal: true, blue_light_block: false,
  };
  return m[t];
}

export function surfaceFinish(t: ScreenProtectorType): string {
  const m: Record<ScreenProtectorType, string> = {
    tempered_glass_9h: "oleophobic_glass_coat",
    matte_anti_glare: "etched_diffusion_layer",
    privacy_filter: "micro_louver_angle_limit",
    hydrogel_self_heal: "tpu_flexible_membrane",
    blue_light_block: "blue_filter_glass_hybrid",
  };
  return m[t];
}

export function bestDevice(t: ScreenProtectorType): string {
  const m: Record<ScreenProtectorType, string> = {
    tempered_glass_9h: "daily_phone_tablet",
    matte_anti_glare: "outdoor_bright_light",
    privacy_filter: "public_transit_office",
    hydrogel_self_heal: "curved_edge_display",
    blue_light_block: "long_screen_session",
  };
  return m[t];
}

export function screenProtectors(): ScreenProtectorType[] {
  return ["tempered_glass_9h", "matte_anti_glare", "privacy_filter", "hydrogel_self_heal", "blue_light_block"];
}
