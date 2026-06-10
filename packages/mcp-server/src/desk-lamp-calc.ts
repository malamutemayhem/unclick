export type DeskLampType = "led_task" | "architect_swing" | "monitor_light_bar" | "clip_on_usb" | "ambient_smart";

export function brightness(t: DeskLampType): number {
  const m: Record<DeskLampType, number> = {
    led_task: 8, architect_swing: 9, monitor_light_bar: 7, clip_on_usb: 4, ambient_smart: 6,
  };
  return m[t];
}

export function colorAccuracy(t: DeskLampType): number {
  const m: Record<DeskLampType, number> = {
    led_task: 9, architect_swing: 8, monitor_light_bar: 10, clip_on_usb: 5, ambient_smart: 7,
  };
  return m[t];
}

export function glareReduction(t: DeskLampType): number {
  const m: Record<DeskLampType, number> = {
    led_task: 7, architect_swing: 6, monitor_light_bar: 10, clip_on_usb: 4, ambient_smart: 5,
  };
  return m[t];
}

export function deskFootprint(t: DeskLampType): number {
  const m: Record<DeskLampType, number> = {
    led_task: 5, architect_swing: 4, monitor_light_bar: 1, clip_on_usb: 1, ambient_smart: 3,
  };
  return m[t];
}

export function lampCost(t: DeskLampType): number {
  const m: Record<DeskLampType, number> = {
    led_task: 5, architect_swing: 7, monitor_light_bar: 8, clip_on_usb: 2, ambient_smart: 6,
  };
  return m[t];
}

export function dimmable(t: DeskLampType): boolean {
  const m: Record<DeskLampType, boolean> = {
    led_task: true, architect_swing: true, monitor_light_bar: true, clip_on_usb: false, ambient_smart: true,
  };
  return m[t];
}

export function colorTemp(t: DeskLampType): boolean {
  const m: Record<DeskLampType, boolean> = {
    led_task: true, architect_swing: false, monitor_light_bar: true, clip_on_usb: false, ambient_smart: true,
  };
  return m[t];
}

export function lightSource(t: DeskLampType): string {
  const m: Record<DeskLampType, string> = {
    led_task: "smd_led_panel_diffused", architect_swing: "high_cri_led_strip",
    monitor_light_bar: "asymmetric_led_bar", clip_on_usb: "cob_led_gooseneck",
    ambient_smart: "rgb_led_wifi_controlled",
  };
  return m[t];
}

export function bestDesk(t: DeskLampType): string {
  const m: Record<DeskLampType, string> = {
    led_task: "general_study_reading", architect_swing: "drafting_detail_work",
    monitor_light_bar: "dual_monitor_no_glare", clip_on_usb: "travel_laptop_only",
    ambient_smart: "mood_lighting_video_call",
  };
  return m[t];
}

export function deskLamps(): DeskLampType[] {
  return ["led_task", "architect_swing", "monitor_light_bar", "clip_on_usb", "ambient_smart"];
}
