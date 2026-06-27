export type LawnMowerType = "gas_push" | "electric_corded" | "battery_self_propelled" | "robotic_auto" | "reel_manual";

export function cuttingPower(t: LawnMowerType): number {
  const m: Record<LawnMowerType, number> = {
    gas_push: 9, electric_corded: 6, battery_self_propelled: 8, robotic_auto: 5, reel_manual: 3,
  };
  return m[t];
}

export function noiseLevel(t: LawnMowerType): number {
  const m: Record<LawnMowerType, number> = {
    gas_push: 10, electric_corded: 5, battery_self_propelled: 4, robotic_auto: 2, reel_manual: 1,
  };
  return m[t];
}

export function runtimeMinutes(t: LawnMowerType): number {
  const m: Record<LawnMowerType, number> = {
    gas_push: 90, electric_corded: 999, battery_self_propelled: 50, robotic_auto: 120, reel_manual: 999,
  };
  return m[t];
}

export function maintenanceEffort(t: LawnMowerType): number {
  const m: Record<LawnMowerType, number> = {
    gas_push: 9, electric_corded: 3, battery_self_propelled: 4, robotic_auto: 2, reel_manual: 5,
  };
  return m[t];
}

export function mowerCost(t: LawnMowerType): number {
  const m: Record<LawnMowerType, number> = {
    gas_push: 5, electric_corded: 3, battery_self_propelled: 7, robotic_auto: 10, reel_manual: 1,
  };
  return m[t];
}

export function selfPropelled(t: LawnMowerType): boolean {
  const m: Record<LawnMowerType, boolean> = {
    gas_push: false, electric_corded: false, battery_self_propelled: true, robotic_auto: true, reel_manual: false,
  };
  return m[t];
}

export function mulchCapable(t: LawnMowerType): boolean {
  const m: Record<LawnMowerType, boolean> = {
    gas_push: true, electric_corded: true, battery_self_propelled: true, robotic_auto: true, reel_manual: false,
  };
  return m[t];
}

export function driveType(t: LawnMowerType): string {
  const m: Record<LawnMowerType, string> = {
    gas_push: "ohv_gas_engine", electric_corded: "ac_induction_motor",
    battery_self_propelled: "brushless_dc_motor", robotic_auto: "wheel_hub_motor",
    reel_manual: "human_push_force",
  };
  return m[t];
}

export function bestYard(t: LawnMowerType): string {
  const m: Record<LawnMowerType, string> = {
    gas_push: "large_thick_grass_lot", electric_corded: "small_suburban_lawn",
    battery_self_propelled: "medium_hilly_yard", robotic_auto: "daily_automated_trim",
    reel_manual: "tiny_eco_friendly_patch",
  };
  return m[t];
}

export function lawnMowers(): LawnMowerType[] {
  return ["gas_push", "electric_corded", "battery_self_propelled", "robotic_auto", "reel_manual"];
}
