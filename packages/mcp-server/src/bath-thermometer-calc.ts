export type BathThermometerType = "floating_duck_toy" | "digital_strip_stick" | "infrared_gun_instant" | "faucet_mount_inline" | "color_change_card";

export function accuracy(t: BathThermometerType): number {
  const m: Record<BathThermometerType, number> = {
    floating_duck_toy: 6, digital_strip_stick: 8, infrared_gun_instant: 10, faucet_mount_inline: 9, color_change_card: 4,
  };
  return m[t];
}

export function readSpeed(t: BathThermometerType): number {
  const m: Record<BathThermometerType, number> = {
    floating_duck_toy: 5, digital_strip_stick: 7, infrared_gun_instant: 10, faucet_mount_inline: 9, color_change_card: 6,
  };
  return m[t];
}

export function easeOfUse(t: BathThermometerType): number {
  const m: Record<BathThermometerType, number> = {
    floating_duck_toy: 9, digital_strip_stick: 8, infrared_gun_instant: 7, faucet_mount_inline: 6, color_change_card: 10,
  };
  return m[t];
}

export function childAppeal(t: BathThermometerType): number {
  const m: Record<BathThermometerType, number> = {
    floating_duck_toy: 10, digital_strip_stick: 5, infrared_gun_instant: 3, faucet_mount_inline: 2, color_change_card: 7,
  };
  return m[t];
}

export function thermCost(t: BathThermometerType): number {
  const m: Record<BathThermometerType, number> = {
    floating_duck_toy: 1, digital_strip_stick: 2, infrared_gun_instant: 4, faucet_mount_inline: 4, color_change_card: 1,
  };
  return m[t];
}

export function needsBattery(t: BathThermometerType): boolean {
  const m: Record<BathThermometerType, boolean> = {
    floating_duck_toy: true, digital_strip_stick: true, infrared_gun_instant: true, faucet_mount_inline: true, color_change_card: false,
  };
  return m[t];
}

export function waterproof(t: BathThermometerType): boolean {
  const m: Record<BathThermometerType, boolean> = {
    floating_duck_toy: true, digital_strip_stick: true, infrared_gun_instant: false, faucet_mount_inline: true, color_change_card: true,
  };
  return m[t];
}

export function sensorType(t: BathThermometerType): string {
  const m: Record<BathThermometerType, string> = {
    floating_duck_toy: "ntc_thermistor_sealed",
    digital_strip_stick: "digital_probe_tip",
    infrared_gun_instant: "ir_pyrometer_lens",
    faucet_mount_inline: "flow_through_sensor",
    color_change_card: "liquid_crystal_strip",
  };
  return m[t];
}

export function bestUse(t: BathThermometerType): string {
  const m: Record<BathThermometerType, string> = {
    floating_duck_toy: "baby_bath_safe_fun",
    digital_strip_stick: "precise_bath_monitor",
    infrared_gun_instant: "quick_check_no_touch",
    faucet_mount_inline: "always_on_fill_watch",
    color_change_card: "simple_visual_check",
  };
  return m[t];
}

export function bathThermometers(): BathThermometerType[] {
  return ["floating_duck_toy", "digital_strip_stick", "infrared_gun_instant", "faucet_mount_inline", "color_change_card"];
}
