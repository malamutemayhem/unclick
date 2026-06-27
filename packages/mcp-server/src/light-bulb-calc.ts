export type LightBulbType = "led_standard" | "cfl_spiral" | "incandescent_classic" | "halogen_bright" | "smart_wifi_color";

export function energyEfficiency(t: LightBulbType): number {
  const m: Record<LightBulbType, number> = {
    led_standard: 10, cfl_spiral: 7, incandescent_classic: 1, halogen_bright: 3, smart_wifi_color: 9,
  };
  return m[t];
}

export function lifespan(t: LightBulbType): number {
  const m: Record<LightBulbType, number> = {
    led_standard: 10, cfl_spiral: 7, incandescent_classic: 1, halogen_bright: 3, smart_wifi_color: 9,
  };
  return m[t];
}

export function colorRendering(t: LightBulbType): number {
  const m: Record<LightBulbType, number> = {
    led_standard: 8, cfl_spiral: 6, incandescent_classic: 10, halogen_bright: 10, smart_wifi_color: 7,
  };
  return m[t];
}

export function instantOn(t: LightBulbType): number {
  const m: Record<LightBulbType, number> = {
    led_standard: 10, cfl_spiral: 3, incandescent_classic: 10, halogen_bright: 10, smart_wifi_color: 9,
  };
  return m[t];
}

export function bulbCost(t: LightBulbType): number {
  const m: Record<LightBulbType, number> = {
    led_standard: 3, cfl_spiral: 2, incandescent_classic: 1, halogen_bright: 2, smart_wifi_color: 7,
  };
  return m[t];
}

export function dimmable(t: LightBulbType): boolean {
  const m: Record<LightBulbType, boolean> = {
    led_standard: true, cfl_spiral: false, incandescent_classic: true, halogen_bright: true, smart_wifi_color: true,
  };
  return m[t];
}

export function containsMercury(t: LightBulbType): boolean {
  const m: Record<LightBulbType, boolean> = {
    led_standard: false, cfl_spiral: true, incandescent_classic: false, halogen_bright: false, smart_wifi_color: false,
  };
  return m[t];
}

export function techType(t: LightBulbType): string {
  const m: Record<LightBulbType, string> = {
    led_standard: "semiconductor_diode_chip",
    cfl_spiral: "mercury_vapor_phosphor",
    incandescent_classic: "tungsten_filament_glass",
    halogen_bright: "tungsten_halogen_gas",
    smart_wifi_color: "led_rgb_wifi_chip",
  };
  return m[t];
}

export function bestUse(t: LightBulbType): string {
  const m: Record<LightBulbType, string> = {
    led_standard: "general_home_office",
    cfl_spiral: "budget_utility_space",
    incandescent_classic: "warm_ambient_decorative",
    halogen_bright: "task_reading_spotlight",
    smart_wifi_color: "mood_scene_voice_control",
  };
  return m[t];
}

export function lightBulbs(): LightBulbType[] {
  return ["led_standard", "cfl_spiral", "incandescent_classic", "halogen_bright", "smart_wifi_color"];
}
