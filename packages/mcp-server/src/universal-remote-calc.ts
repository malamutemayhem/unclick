export type UniversalRemoteType = "infrared_basic_multidevice" | "smart_hub_wifi_app" | "voice_activated_assistant" | "touchscreen_color_lcd" | "simple_senior_large_button";

export function deviceSupport(t: UniversalRemoteType): number {
  const m: Record<UniversalRemoteType, number> = {
    infrared_basic_multidevice: 7, smart_hub_wifi_app: 10, voice_activated_assistant: 8, touchscreen_color_lcd: 9, simple_senior_large_button: 4,
  };
  return m[t];
}

export function easeOfSetup(t: UniversalRemoteType): number {
  const m: Record<UniversalRemoteType, number> = {
    infrared_basic_multidevice: 6, smart_hub_wifi_app: 5, voice_activated_assistant: 7, touchscreen_color_lcd: 4, simple_senior_large_button: 9,
  };
  return m[t];
}

export function easeOfUse(t: UniversalRemoteType): number {
  const m: Record<UniversalRemoteType, number> = {
    infrared_basic_multidevice: 7, smart_hub_wifi_app: 6, voice_activated_assistant: 9, touchscreen_color_lcd: 5, simple_senior_large_button: 10,
  };
  return m[t];
}

export function customization(t: UniversalRemoteType): number {
  const m: Record<UniversalRemoteType, number> = {
    infrared_basic_multidevice: 4, smart_hub_wifi_app: 10, voice_activated_assistant: 7, touchscreen_color_lcd: 9, simple_senior_large_button: 2,
  };
  return m[t];
}

export function remoteCost(t: UniversalRemoteType): number {
  const m: Record<UniversalRemoteType, number> = {
    infrared_basic_multidevice: 2, smart_hub_wifi_app: 7, voice_activated_assistant: 5, touchscreen_color_lcd: 9, simple_senior_large_button: 2,
  };
  return m[t];
}

export function needsWifi(t: UniversalRemoteType): boolean {
  const m: Record<UniversalRemoteType, boolean> = {
    infrared_basic_multidevice: false, smart_hub_wifi_app: true, voice_activated_assistant: true, touchscreen_color_lcd: true, simple_senior_large_button: false,
  };
  return m[t];
}

export function hasScreen(t: UniversalRemoteType): boolean {
  const m: Record<UniversalRemoteType, boolean> = {
    infrared_basic_multidevice: false, smart_hub_wifi_app: false, voice_activated_assistant: false, touchscreen_color_lcd: true, simple_senior_large_button: false,
  };
  return m[t];
}

export function signalType(t: UniversalRemoteType): string {
  const m: Record<UniversalRemoteType, string> = {
    infrared_basic_multidevice: "infrared_line_of_sight",
    smart_hub_wifi_app: "wifi_bluetooth_ir_hub",
    voice_activated_assistant: "wifi_voice_ir_blaster",
    touchscreen_color_lcd: "wifi_rf_ir_combo",
    simple_senior_large_button: "infrared_preprogrammed",
  };
  return m[t];
}

export function bestSetup(t: UniversalRemoteType): string {
  const m: Record<UniversalRemoteType, string> = {
    infrared_basic_multidevice: "budget_few_devices",
    smart_hub_wifi_app: "smart_home_full_control",
    voice_activated_assistant: "hands_free_voice_user",
    touchscreen_color_lcd: "enthusiast_home_theater",
    simple_senior_large_button: "elderly_accessibility",
  };
  return m[t];
}

export function universalRemotes(): UniversalRemoteType[] {
  return ["infrared_basic_multidevice", "smart_hub_wifi_app", "voice_activated_assistant", "touchscreen_color_lcd", "simple_senior_large_button"];
}
