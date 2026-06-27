export type DimmerSwitchType = "rotary_knob" | "slide_lever" | "toggle_tap" | "smart_wifi_app" | "touch_panel";

export function dimRange(t: DimmerSwitchType): number {
  const m: Record<DimmerSwitchType, number> = {
    rotary_knob: 9, slide_lever: 8, toggle_tap: 5, smart_wifi_app: 10, touch_panel: 9,
  };
  return m[t];
}

export function installEase(t: DimmerSwitchType): number {
  const m: Record<DimmerSwitchType, number> = {
    rotary_knob: 8, slide_lever: 8, toggle_tap: 7, smart_wifi_app: 5, touch_panel: 4,
  };
  return m[t];
}

export function bulbCompat(t: DimmerSwitchType): number {
  const m: Record<DimmerSwitchType, number> = {
    rotary_knob: 8, slide_lever: 7, toggle_tap: 6, smart_wifi_app: 9, touch_panel: 8,
  };
  return m[t];
}

export function aestheticClean(t: DimmerSwitchType): number {
  const m: Record<DimmerSwitchType, number> = {
    rotary_knob: 6, slide_lever: 7, toggle_tap: 5, smart_wifi_app: 8, touch_panel: 10,
  };
  return m[t];
}

export function switchCost(t: DimmerSwitchType): number {
  const m: Record<DimmerSwitchType, number> = {
    rotary_knob: 2, slide_lever: 2, toggle_tap: 3, smart_wifi_app: 7, touch_panel: 6,
  };
  return m[t];
}

export function voiceControl(t: DimmerSwitchType): boolean {
  const m: Record<DimmerSwitchType, boolean> = {
    rotary_knob: false, slide_lever: false, toggle_tap: false, smart_wifi_app: true, touch_panel: false,
  };
  return m[t];
}

export function needsNeutral(t: DimmerSwitchType): boolean {
  const m: Record<DimmerSwitchType, boolean> = {
    rotary_knob: false, slide_lever: false, toggle_tap: false, smart_wifi_app: true, touch_panel: true,
  };
  return m[t];
}

export function controlMethod(t: DimmerSwitchType): string {
  const m: Record<DimmerSwitchType, string> = {
    rotary_knob: "potentiometer_turn_dial",
    slide_lever: "linear_slide_track",
    toggle_tap: "preset_level_tap_cycle",
    smart_wifi_app: "wifi_app_voice_schedule",
    touch_panel: "capacitive_glass_swipe",
  };
  return m[t];
}

export function bestRoom(t: DimmerSwitchType): string {
  const m: Record<DimmerSwitchType, string> = {
    rotary_knob: "dining_room_chandelier",
    slide_lever: "bedroom_overhead_fan",
    toggle_tap: "bathroom_vanity_simple",
    smart_wifi_app: "whole_home_automation",
    touch_panel: "modern_living_room",
  };
  return m[t];
}

export function dimmerSwitches(): DimmerSwitchType[] {
  return ["rotary_knob", "slide_lever", "toggle_tap", "smart_wifi_app", "touch_panel"];
}
